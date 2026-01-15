import { updateSession } from '@/lib/supabase/middleware';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { response, user, supabase } = await updateSession(request);

  const { pathname } = request.nextUrl;

  // Public routes that don't require auth
  const publicRoutes = ['/login', '/signup', '/pending-approval', '/forgot-password', '/set-password', '/api/auth', '/api/newsletter', '/api/health', '/api/invite', '/api/collab/agent'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // Admin routes - require auth but skip approval check
  const adminRoutes = ['/admin', '/api/admin'];
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));

  // Collab routes - require collaborator or admin role
  const collabRoutes = ['/collab', '/api/collab'];
  const isCollabRoute = collabRoutes.some(route => pathname.startsWith(route)) && !pathname.startsWith('/api/collab/agent');

  // Allow public routes
  if (isPublicRoute) {
    return response;
  }

  // Redirect to login if not authenticated
  if (!user) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Admin routes skip approval check (admin handles approvals)
  if (isAdminRoute) {
    // Admin check is done in the API endpoints
    return response;
  }

  // Check if user is approved and get role
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('approved, role')
    .eq('id', user.id)
    .single();

  // If no profile or not approved, redirect to pending page
  if (!profile || !profile.approved) {
    // Allow access to pending-approval page
    if (pathname === '/pending-approval') {
      return response;
    }
    return NextResponse.redirect(new URL('/pending-approval', request.url));
  }

  // Collab routes require collaborator or admin role
  if (isCollabRoute) {
    if (!['collaborator', 'admin'].includes(profile.role)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
