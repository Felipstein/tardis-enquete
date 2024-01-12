'use client';

import { Poll } from '@tardis-enquete/contracts';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import PollForm, { PollFormComponent } from '@/app/components/forms/PollForm';
import { Button } from '@/app/components/common/Button';
import { queryKeys } from '@/config/queryKeys';
import { pollService } from '@/services/api/pollService';
import { LoaderIcon } from '@/app/components/common/LoaderIcon';

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

  if (isLoadingPoll) {
    return (
      <div className="flex w-full items-center justify-center">
        <LoaderIcon className="h-6 w-6" />
      </div>
    );
  }

  if (errorOnFetchPoll || !poll) {
    router.push('/');

    return null;
  }

  return (
    <div className="space-y-6">
      <h1 className="hidden max-w-full truncate text-lg font-bold tracking-wide sm:block sm:text-xl">
        Editar Enquete <strong className="text-blue-400">{poll.title}</strong>
      </h1>

      <h1 className="block max-w-full truncate text-lg font-bold tracking-wide sm:hidden sm:text-xl">{poll.title}</h1>

      <PollForm
        ref={pollFormRef}
        defaultPoll={poll}
        onSubmit={console.log}
        onChangeForm={setHasChanges}
        onIsValid={setIsValid}
      >
        <div className="flex items-center justify-end gap-4">
          <Button variant="ghost" isDisabled={!hasChanges} onClick={() => pollFormRef.current?.resetFields()}>
            Cancelar
          </Button>

          <Button type="submit" largePaddingX isDisabled={!hasChanges || !isValid}>
            Editar
          </Button>
        </div>
      </PollForm>
    </div>
  );
}
