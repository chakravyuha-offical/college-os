import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/select-college';

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // ignore - called from Server Component
            }
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Check if user has a profile to determine redirect
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, college_id')
          .eq('auth_user_id', user.id)
          .single();

        if (profile?.college_id) {
          const redirectMap: Record<string, string> = {
            super_admin: '/superadmin/tenants',
            teacher: '/schedule',
            principal: '/home',
            vice_principal: '/home',
            coordinator: '/home',
            hod: '/home',
            student: '/home',
            parent: '/home',
          };
          return NextResponse.redirect(`${origin}${redirectMap[profile.role] || '/home'}`);
        }
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Return to login with error
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
