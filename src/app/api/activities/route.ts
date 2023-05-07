import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { headers, cookies } from 'next/headers';

import type { Database } from '@/lib/database.types';

export async function POST(request: Request) {
  const { name, colour, emoji } = await request.json();

  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  });

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const email = session?.user?.email;

  if (!email) {
    return NextResponse.error();
  }

  const { data, error } = await supabase
    .from('activities')
    .upsert({ name, colour, email, emoji })
    .select();

  if (error) {
    console.log({ error });
    return NextResponse.error();
  }

  return NextResponse.json(data);
}

// TODO: edit category route
// export async function PUT(request: Request) {
//   const { id, name, colour } = await request.json();

//   const supabase = createRouteHandlerSupabaseClient<Database>({
//     headers,
//     cookies,
//   });

//   const { data } = await supabase
//     .from('posts')
//     .update({ name, colour })
//     .match({ id })
//     .select();

//   return NextResponse.json(data);
// }
