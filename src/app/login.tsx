'use client';

import { useSupabase } from '@/app/utils/supabase-provider';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
export default function Login() {
  const { supabase } = useSupabase();
  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    supabase?.auth.onAuthStateChange((event: any, currentSession: any) => {
      if (event === 'SIGNED_IN' || currentSession?.user) {
        router.push('/activity');
      }
    });
  }, [supabase]);

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email: 'mortellitimatteo@gmail.com',
      password: 'sup3rs3cur3',
    });
  };

  const handleLogin = async () => {
    const res = await supabase.auth.signInWithPassword({
      email: 'mortellitimatteo@gmail.com',
      password: 'sup3rs3cur3',
    });
    console.log({ res });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (!supabase) return <></>;

  return (
    <div>
      <button className="bg-gray-200" onClick={handleSignUp}>
        Sign Up
      </button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={['google']}
        redirectTo="/hello"
      />
    </div>
  );
}
