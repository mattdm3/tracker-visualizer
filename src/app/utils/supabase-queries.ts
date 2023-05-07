import { AppSupabaseClient, Table } from '@/types';

export const getUser = async (supabase: AppSupabaseClient) => {
  return supabase.auth.getUser();
};

export const getAllActivities = async (supabase: AppSupabaseClient) => {
  const { data, error } = await supabase.from('activities').select('*');
  if (error) {
    console.log(error);
    throw error;
  }

  return data;
};
export const getAllItems = async (
  supabase: AppSupabaseClient
): Promise<Array<Table<'items'>>> => {
  const { data, error } = await supabase.from('items').select('*');

  if (error) {
    console.log(error);
    throw error;
  }

  return data;
};
type Log = {
  start_time: string;
  end_time: string;
  activity: string;
  duration: string;
  email: string;
};
export const getAllLogs = async (
  supabase: AppSupabaseClient,
  newLog?: Log
): Promise<Array<Table<'logs'>>> => {
  const logChain = supabase.from('logs').select('*');

  if (newLog) {
    logChain
      .eq('email', newLog.email)
      .or(
        `and(start_time.gte.${newLog.start_time},start_time.lte.${newLog.end_time}),and(end_time.lte.${newLog.end_time}, end_time.gte.${newLog.start_time})`
      );
  }
  const { data, error } = await logChain;

  if (error) {
    throw error;
  }
  return data;
};

export const insertLog = async (
  supabase: AppSupabaseClient,
  log: Log
): Promise<Table<'logs'>> => {
  const { data, error } = await supabase
    .from('logs')
    .insert(log)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const insertItem = async (
  supabase: AppSupabaseClient,
  item: { name: string; description: string }
): Promise<Table<'items'>> => {
  const { data, error } = await supabase
    .from('items')
    .insert(item)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const updateItem = async (
  supabase: AppSupabaseClient,
  item: { id: string; name: string; description: string }
) => {
  const { data, error } = await supabase.from('items').update(item).single();

  if (error) {
    throw error;
  }

  return data;
};

export const deleteItem = async (supabase: AppSupabaseClient, id: string) => {
  const { error } = await supabase.from('items').delete().match({ id });

  if (error) {
    throw error;
  }

  return true;
};

export const getItem = async (
  supabase: AppSupabaseClient,
  id: string
): Promise<Table<'items'>> => {
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};
