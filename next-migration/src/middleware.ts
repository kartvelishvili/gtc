import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["ka", "en", "ru"] as const;
const DEFAULT_LOCALE = "ka";

/** Paths that should bypass locale routing entirely */
const STATIC_PREFIXES = [
  "/_next/",
  "/icon.svg",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/admin",
];

const STATIC_EXTENSIONS = [
  ".png", ".svg", ".jpg", ".jpeg", ".webp",
  ".mp4", ".mov", ".ico", ".woff", ".woff2",
];

export function middleware(req: NextRequest) {
  const { nextUrl, headers } = req;
  const url = nextUrl.clone();
  const { pathname } = url;

  // Skip static assets & admin
  if (
    STATIC_PREFIXES.some((p) => pathname.startsWith(p)) ||
    STATIC_EXTENSIONS.some((ext) => pathname.includes(ext))
  ) {
    return NextResponse.next();
  }

  // Already has a valid locale prefix → continue
  if (LOCALES.some((loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`)) {
    return NextResponse.next();
  }

  // Detect preferred locale from Accept-Language header
  const acceptLang = headers.get("accept-language") || "";
  const userLang = acceptLang.split(",")[0]?.split("-")[0]?.toLowerCase();
  const matchedLocale = LOCALES.find((l) => l === userLang) ?? DEFAULT_LOCALE;

  // Redirect to locale-prefixed path
  url.pathname = `/${matchedLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
