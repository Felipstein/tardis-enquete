'use client';

import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { ReactNode, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { PollTimeline } from '@tardis-enquete/contracts';
import { Button } from '@/app/components/common/Button';
import { pollService } from '@/services/api/pollService';
import { queryClient } from '@/libs/queryClient';
import { queryKeys } from '@/config/queryKeys';

export type PollDeleteAlertDialogProps = {
  pollId: string;
  children: ReactNode;
};

export function PollDeleteAlertDialog({ pollId, children }: PollDeleteAlertDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: deletePollRequest, isPending: isDeletingPoll } = useMutation({
    mutationFn: pollService.delete,
  });

  function deletePoll() {
    deletePollRequest(
      { pollId },
      {
        onSuccess() {
          queryClient.removeQueries({ queryKey: queryKeys.poll(pollId) });

          let polls = queryClient.getQueryData<PollTimeline[]>(queryKeys.polls());

          if (polls) {
            polls = polls.filter((poll) => poll.id !== pollId);

            queryClient.setQueryData(queryKeys.polls(), polls);
          }

          toast.success('Enquete excluída com sucesso');

          setIsOpen(false);
        },
        onError(error) {
          toast.error(error.message);
        },
      },
    );
  }

  return (
    <AlertDialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-40 bg-primary-900/40 backdrop-blur-sm" />
        <AlertDialog.Overlay className="fixed inset-0 z-40 bg-gradient-to-br from-black/30 to-zinc-600/10" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-gradient-to-br from-primary-950 to-primary-900 p-[25px] shadow-md focus:outline-none">
          <AlertDialog.Title className="text-lg font-medium text-primary-50">
            Você tem certeza absoluta?
          </AlertDialog.Title>
          <AlertDialog.Description className="mb-5 mt-4 text-sm leading-normal text-primary-100">
            Essa ação não poderá ser desfeita. Isso irá deletar permanentemente a enquete e todos os votos serão
            perdidos.
          </AlertDialog.Description>
          <div className="flex justify-end gap-6">
            <AlertDialog.Cancel asChild>
              <Button variant="ghost">Cancelar</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button
                variant="danger"
                onClick={(event) => {
                  event.preventDefault();
                  deletePoll();
                }}
                isLoading={isDeletingPoll}
              >
                Sim, deletar enquete
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
