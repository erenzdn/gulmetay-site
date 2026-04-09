/**
 * Global API rate limit: /api altı için genel pencere + POST /api/iletisims için sıkı pencere.
 * OPTIONS (CORS preflight) sayılmaz. IP: CF-Connecting-IP > X-Forwarded-For (sol) > X-Real-IP > ctx.ip
 */
import type { Core } from '@strapi/strapi';
import type { Context, Next } from 'koa';
import createError from 'http-errors';
import { RateLimiterMemory, type RateLimiterRes } from 'rate-limiter-flexible';

export interface ApiRateLimitMiddlewareConfig {
  enabled?: boolean;
  apiMax?: number;
  apiWindowSec?: number;
  iletisimPostMax?: number;
  iletisimPostWindowSec?: number;
}

const ILETISIM_NORMALIZED_PATH = '/api/iletisims';

function normalizePath(path: string): string {
  if (path.length > 1 && path.endsWith('/')) {
    return path.slice(0, -1);
  }
  return path;
}

function headerFirstValue(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const first = value.split(',')[0]?.trim();
  return first || undefined;
}

function getClientIp(ctx: Context): string {
  const cf = headerFirstValue(ctx.get('cf-connecting-ip'));
  if (cf) return cf;

  const xff = headerFirstValue(ctx.get('x-forwarded-for'));
  if (xff) return xff;

  const realIp = headerFirstValue(ctx.get('x-real-ip'));
  if (realIp) return realIp;

  return ctx.ip || ctx.request.ip || '0.0.0.0';
}

function isRateLimiterRejected(value: unknown): value is RateLimiterRes {
  return (
    typeof value === 'object' &&
    value !== null &&
    'msBeforeNext' in value &&
    typeof (value as RateLimiterRes).msBeforeNext === 'number'
  );
}

export default (config: ApiRateLimitMiddlewareConfig, { strapi }: { strapi: Core.Strapi }) => {
  const enabled = config.enabled !== false;
  const apiMax = config.apiMax ?? 100;
  const apiWindowSec = config.apiWindowSec ?? 60;
  const iletisimPostMax = config.iletisimPostMax ?? 5;
  const iletisimPostWindowSec = config.iletisimPostWindowSec ?? 60;

  const generalApiLimiter = new RateLimiterMemory({
    points: apiMax,
    duration: apiWindowSec,
  });

  const iletisimPostLimiter = new RateLimiterMemory({
    points: iletisimPostMax,
    duration: iletisimPostWindowSec,
  });

  return async (ctx: Context, next: Next) => {
    if (!enabled) {
      return next();
    }

    if (ctx.method === 'OPTIONS') {
      return next();
    }

    const path = normalizePath(ctx.path);
    if (!path.startsWith('/api')) {
      return next();
    }

    const clientIp = getClientIp(ctx);

    try {
      await generalApiLimiter.consume(clientIp);

      if (ctx.method === 'POST' && path === ILETISIM_NORMALIZED_PATH) {
        await iletisimPostLimiter.consume(clientIp);
      }

      await next();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }

      if (!isRateLimiterRejected(error)) {
        throw error;
      }

      const retryAfterSec = Math.max(1, Math.ceil(error.msBeforeNext / 1000));

      const isIletisimPost = ctx.method === 'POST' && path === ILETISIM_NORMALIZED_PATH;
      const message = isIletisimPost
        ? 'Çok fazla iletişim formu gönderimi. Lütfen bir süre sonra tekrar deneyin.'
        : 'Çok fazla istek. Lütfen bir süre sonra tekrar deneyin.';

      strapi.log.debug(`API rate limit: ip=${clientIp} path=${path} method=${ctx.method} retryAfter=${retryAfterSec}s`);

      throw createError(429, message, {
        headers: { 'retry-after': String(retryAfterSec) },
        details: { retryAfter: retryAfterSec },
      });
    }
  };
};
