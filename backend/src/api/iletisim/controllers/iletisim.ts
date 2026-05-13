/**
 * iletisim controller
 */

import { factories } from '@strapi/strapi'

type TurnstileVerifyResponse = {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
  action?: string;
  cdata?: string;
};

const baseController = factories.createCoreController('api::iletisim.iletisim');

export default factories.createCoreController('api::iletisim.iletisim', ({ strapi }) => ({
  async create(ctx) {
    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (!secret) {
      ctx.throw(500, 'TURNSTILE_SECRET_KEY is not configured');
    }

    const verifyUrl =
      process.env.TURNSTILE_VERIFY_URL || 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

    const req = ctx.request as typeof ctx.request & { body?: Record<string, unknown> };
    const body = (req.body || {}) as Record<string, any>;
    const turnstileToken = body.turnstileToken as string | undefined;
    if (!turnstileToken) {
      ctx.throw(400, 'captcha_failed');
    }

    const form = new URLSearchParams();
    form.set('secret', secret);
    form.set('response', turnstileToken);
    if (ctx.request?.ip) form.set('remoteip', ctx.request.ip);

    let verifyJson: TurnstileVerifyResponse | null = null;
    try {
      const resp = await fetch(verifyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: form.toString(),
      });

      verifyJson = (await resp.json()) as TurnstileVerifyResponse;
    } catch (e) {
      ctx.throw(502, 'captcha_verify_unreachable');
    }

    if (!verifyJson?.success) {
      ctx.throw(400, 'captcha_failed');
    }

    // Optional hardening: Verify hostname if TURNSTILE_EXPECTED_HOSTNAME is configured
    const expectedHostname = process.env.TURNSTILE_EXPECTED_HOSTNAME;
    if (expectedHostname && verifyJson.hostname !== expectedHostname) {
      strapi.log.warn(`Turnstile verification hostname mismatch: expected ${expectedHostname}, got ${verifyJson.hostname}`);
      ctx.throw(400, 'captcha_failed');
    }

    // Do not persist token; only use it for verification.
    delete body.turnstileToken;
    req.body = body;

    // Continue with default Strapi create behavior.
    return await (baseController as any).create(ctx);
  },
}));
