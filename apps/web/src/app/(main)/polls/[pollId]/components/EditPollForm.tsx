'use client';

import { Poll } from '@tardis-enquete/contracts';
import PollForm from '@/app/components/forms/PollForm';
import { Button } from '@/app/components/common/Button';

export type EditPollFormProps = {
  poll: Poll;
};

export default function EditPollForm({ poll }: EditPollFormProps) {
  return (
    <PollForm defaultPoll={poll} onSubmit={console.log}>
      <div className="flex items-center justify-stretch">
        <Button>Editar</Button>
      </div>
    </PollForm>
  );
}
