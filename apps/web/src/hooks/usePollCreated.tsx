'use client';

import { toast } from 'react-toastify';
import { useSocketEvent } from './useSocketEvent';
import { queryClient } from '@/libs/queryClient';
import { queryKeys } from '@/config/queryKeys';

export function usePollCreated() {
  useSocketEvent('pollCreate', ({ poll: pollCreated }) => {
    console.info('A poll has created, poll:', pollCreated);

    queryClient.invalidateQueries({ queryKey: queryKeys.polls() });

    toast.info(`Uma nova enquete foi criada: "${pollCreated.title}"`);
  });
}
