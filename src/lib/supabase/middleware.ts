import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request: { headers: request.headers } });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    },
  );

  let user = null;
  try {
    const {
      data: { user: fetchedUser },
    } = await supabase.auth.getUser();
    user = fetchedUser;
  } catch {
    // Stale/invalid refresh token cookie: treat as signed out instead of
    // crashing the edge middleware on every request.
    user = null;
  }

  const path = request.nextUrl.pathname;

  // ICMS module (catering security checkpoints) lives entirely under /icms —
  // it has its own login/register pages and its own profile table, gated
  // independently from AVSEC Reports below.
  if (path.startsWith("/icms")) {
    const isIcmsPublic = path.startsWith("/icms/login") || path.startsWith("/icms/register");
    if (!user && !isIcmsPublic) {
      const url = request.nextUrl.clone();
      url.pathname = "/icms/login";
      url.searchParams.set("next", path);
      const redirectResponse = NextResponse.redirect(url);
      request.cookies.getAll().forEach(({ name }) => {
        if (name.startsWith("sb-")) redirectResponse.cookies.delete(name);
      });
      return redirectResponse;
    }
    if (user && path === "/icms/login") {
      const url = request.nextUrl.clone();
      url.pathname = "/icms";
      url.search = "";
      return NextResponse.redirect(url);
    }
    return response;
  }

  const isPublic =
    path.startsWith("/login") ||
    path.startsWith("/auth") ||
    path.startsWith("/_next") ||
    path.startsWith("/manifest") ||
    path.startsWith("/sw.js") ||
    path.startsWith("/icons") ||
    path === "/favicon.ico";

  if (!user && !isPublic) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirectedFrom", path);
    return NextResponse.redirect(url);
  }

  if (user && path === "/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }

  return response;
}
