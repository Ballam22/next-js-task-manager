import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  // script-src uses a per-request nonce (+ 'strict-dynamic' so Next's own
  // chunk-loading scripts, which load additional scripts at runtime, keep
  // working) instead of 'unsafe-inline', since the only inline script this
  // app renders is next-themes' anti-flash script, which accepts a nonce.
  // style-src allows 'unsafe-inline': the app uses React inline `style`
  // attributes (e.g. the homepage's animated gradient) that aren't
  // nonce-able the way <script>/<style> elements are. Inline styles are a
  // much weaker XSS primitive than inline scripts, so this is a standard,
  // pragmatic tradeoff rather than a strict-CSP violation.
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data:;
    font-src 'self';
    connect-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, ' ')
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  response.headers.set('Content-Security-Policy', cspHeader);
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload',
  );

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
