'use client';

import { ReactNode, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { PollTimeline } from '@tardis-enquete/contracts';
import { Button } from '@/app/components/common/Button';
import { pollService } from '@/services/api/pollService';
import { queryClient } from '@/libs/queryClient';
import { queryKeys } from '@/config/queryKeys';
import { AlertDialog } from '@/app/components/common/AlertDialog';

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

      <AlertDialog.Content>
        <AlertDialog.Title>Você tem certeza absoluta?</AlertDialog.Title>

        <AlertDialog.Description>
          Essa ação não poderá ser desfeita. Isso irá deletar permanentemente a enquete e todos os votos serão perdidos.
        </AlertDialog.Description>

        <AlertDialog.Footer>
          <AlertDialog.Cancel label="Cancelar" />

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
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
