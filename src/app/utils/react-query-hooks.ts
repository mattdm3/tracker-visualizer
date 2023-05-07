import { Table } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteItem,
  getAllActivities,
  getAllItems,
  getAllLogs,
  getItem,
  getUser,
  insertItem,
  insertLog,
  updateItem,
} from './supabase-queries';
import supabaseClient from './supabase-browser';
import { useRef } from 'react';
import { toast } from 'react-hot-toast';

export const useUser = () => {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery(['user'], async () => {
    return getUser(supabaseClient);
  });

  return { user, isLoading, isError };
};
export const useActivities = () => {
  const {
    data: activities,
    isLoading,
    isError,
  } = useQuery<Array<Table<'activities'>>>(['activities'], async () => {
    return getAllActivities(supabaseClient);
  });

  return { activities, isLoading, isError };
};

export const useItems = (initialData: Array<Table<'items'>>) => {
  return useQuery<Array<Table<'items'>>>(
    ['items'],
    async () => {
      return getAllItems(supabaseClient);
    },
    {
      initialData,
    }
  );
};

export const useInsertLog = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  const toastRef = useRef<string | null>(null);
  return useMutation(
    async (log: {
      start_time: string;
      end_time: string;
      activity: string;
      duration: string;
      email: string;
    }) => {
      // Query the database for overlapping times
      const allLogs = await getAllLogs(supabaseClient, log);
      console.log({ allLogs });
      if (allLogs.length > 0) {
        throw new Error('Overlaps with existing log');
      } else {
        return insertLog(supabaseClient, log);
      }
    },
    {
      onMutate: () => {
        const toastId = toast.loading('Logging Activity');
        toastRef.current = toastId;
      },

      onSuccess: () => {
        toast.success('Activity Logged', { id: toastRef.current });
        toastRef.current = null;
        queryClient.invalidateQueries(['logs']);
        onSuccess?.();
      },
      onError: (err: Error) => {
        toast.error(err?.message || 'Failed to create item', {
          id: toastRef.current,
        });
        toastRef.current = null;
      },
    }
  );
};

export const useInsertItem = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  const toastRef = useRef<string | null>(null);
  return useMutation(
    async (item: { name: string; description: string }) => {
      return insertItem(supabaseClient, item);
    },
    {
      onMutate: () => {
        const toastId = toast.loading('Creating item');
        toastRef.current = toastId;
      },

      onSuccess: () => {
        toast.success('Item created', { id: toastRef.current });
        toastRef.current = null;
        queryClient.invalidateQueries(['items']);
        onSuccess?.();
      },
      onError: () => {
        toast.error('Failed to create item', { id: toastRef.current });
        toastRef.current = null;
      },
    }
  );
};

export const useUpdateItem = () => {
  const queryClient = useQueryClient();

  const toastRef = useRef<string | null>(null);

  return useMutation(
    async (item: { id: string; name: string; description: string }) => {
      return updateItem(supabaseClient, item);
    },
    {
      onMutate: () => {
        const toastId = toast.loading('Updating item');
        toastRef.current = toastId;
      },
      onSuccess: () => {
        toast.success('Item updated', { id: toastRef.current });
        toastRef.current = null;
        queryClient.invalidateQueries(['items']);
      },
      onError: () => {
        toast.error('Failed to update item', { id: toastRef.current });
        toastRef.current = null;
      },
    }
  );
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  const toastRef = useRef<string | null>(null);
  return useMutation(
    async (id: string) => {
      return deleteItem(supabaseClient, id);
    },
    {
      onMutate: () => {
        const toastId = toast.loading('Deleting item');
        toastRef.current = toastId;
      },
      onSuccess: () => {
        toast.success('Item deleted', { id: toastRef.current });
        toastRef.current = null;
        queryClient.invalidateQueries(['items']);
      },
      onError: () => {
        toast.error('Failed to delete item', { id: toastRef.current });
        toastRef.current = null;
      },
    }
  );
};

export const useGetItem = (id: string) => {
  return useQuery<Promise<Table<'items'>>>(['items', id], async () => {
    return getItem(supabaseClient, id);
  });
};
