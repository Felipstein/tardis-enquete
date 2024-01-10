'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from 'react';
import { Poll } from '@tardis-enquete/contracts';
import { Input } from '../common/Input';

const pollFormSchema = z.object({
  title: z.string().min(3, 'O título deve possuir pelo menos 3 caracteres'),
  description: z.string().optional(),
  options: z
    .array(z.string().min(3, 'A opção deve possuir pelo menos 3 caracteres'))
    .min(2, 'Deve haver pelo menos 2 opções'),
});

type PollFormData = z.infer<typeof pollFormSchema>;

export type PollFormProps = {
  defaultPoll?: Poll;
  onSubmit: (data: PollFormData) => Promise<void> | void;
  children: ReactNode;
};

export default function PollForm({ defaultPoll, onSubmit, children }: PollFormProps) {
  const { handleSubmit, register } = useForm<PollFormData>({
    resolver: zodResolver(pollFormSchema),
    defaultValues: {
      title: defaultPoll?.title,
      description: defaultPoll?.description || undefined,
      options: defaultPoll?.options.map((option) => option.text),
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="space-y-3">
        <Input.Root>
          <Input.Input type="text" placeholder="Título" {...register('title')} />
        </Input.Root>

        <Input.Root>
          <Input.Input type="text" placeholder="Descrição" {...register('description')} />
        </Input.Root>
      </div>

      {children}
    </form>
  );
}
