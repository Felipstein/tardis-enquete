'use client';

import { Poll } from '@tardis-enquete/contracts';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { AlertCircle } from 'lucide-react';
import PollForm, { PollFormComponent, PollFormData } from '@/app/components/forms/PollForm';
import { Button } from '@/app/components/common/Button';
import { queryKeys } from '@/config/queryKeys';
import { pollService } from '@/services/api/pollService';
import { LoaderIcon } from '@/app/components/common/LoaderIcon';
import { queryClient } from '@/libs/queryClient';
import { BackButton } from '@/app/components/BackButton';

export type EditPollFormProps = {
  pollId: string;
  defaultPollFetched?: Poll;
};

export default function EditPollForm({ pollId, defaultPollFetched }: EditPollFormProps) {
  const router = useRouter();

  const [hasChanges, setHasChanges] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const pollFormRef = useRef<PollFormComponent>(null);

  const {
    data: poll,
    isLoading: isLoadingPoll,
    error: errorOnFetchPoll,
  } = useQuery({
    queryKey: queryKeys.poll(pollId),
    queryFn: () => pollService.getPoll({ pollId }),
    initialData: defaultPollFetched,
  });

  const { mutate: updatePollRequest, isPending: isUpdatingPoll } = useMutation({
    mutationFn: pollService.update,
  });

  const hasVotes = useMemo(() => poll?.options.some((option) => option.totalVotes > 0), [poll?.options]);

  function updatePoll(data: PollFormData) {
    updatePollRequest(
      { pollId, ...data },
      {
        async onSuccess(data) {
          queryClient.setQueryData<Poll>(queryKeys.poll(pollId), data);
          queryClient.invalidateQueries({ queryKey: queryKeys.polls() });

          toast.success('Enquete atualizada com êxito');

          router.push('/');
        },
        onError(error) {
          toast.error(error.message);
        },
      },
    );
  }

  if (isLoadingPoll) {
    return (
      <div className="flex w-full items-center justify-center">
        <LoaderIcon className="h-6 w-6" />
      </div>
    );
  }

  if (errorOnFetchPoll || !poll) {
    if (errorOnFetchPoll) {
      toast.error(errorOnFetchPoll.message);
    }

    router.push('/');

    return null;
  }

  const isExpired = !isValid && poll.expireAt && new Date() > new Date(poll.expireAt);

  return (
    <div className="space-y-6">
      <header className="relative">
        <BackButton title="Voltar para Página Inicial" href="/" />

        <h1 className="hidden max-w-full truncate text-lg font-bold tracking-wide sm:block sm:text-xl">
          Editar Enquete <strong className="text-blue-400">{poll.title}</strong>
        </h1>
      </header>

      <h1 className="block max-w-full truncate text-lg font-bold tracking-wide sm:hidden sm:text-xl">{poll.title}</h1>

      <PollForm
        ref={pollFormRef}
        defaultPoll={poll}
        onSubmit={updatePoll}
        onChangeForm={setHasChanges}
        onIsValid={setIsValid}
        showOptionsWarn={hasVotes}
        disableFields={isUpdatingPoll}
      >
        <footer className="flex items-center justify-between gap-4">
          {hasChanges && (
            <div
              data-expired={isExpired}
              className="flex items-center gap-1.5 text-primary-500 data-[expired=true]:text-amber-500"
            >
              <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />

              <span className="inline-block w-fit text-sm">Há alterações não salvas</span>
            </div>
          )}

          <div className="flex w-full items-center justify-end gap-4">
            <Button
              variant="ghost"
              isDisabled={!hasChanges || isUpdatingPoll}
              onClick={() => pollFormRef.current?.resetFields()}
            >
              Cancelar
            </Button>

            <Button type="submit" largePaddingX isDisabled={!hasChanges} isLoading={isUpdatingPoll}>
              Editar
            </Button>
          </div>
        </footer>
      </PollForm>
    </div>
  );
}
