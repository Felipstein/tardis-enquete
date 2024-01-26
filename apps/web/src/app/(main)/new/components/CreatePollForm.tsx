'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { PollTimeline } from '@tardis-enquete/contracts';
import PollForm, { PollFormComponent, PollFormData } from '@/app/components/forms/PollForm';
import { Button } from '@/app/components/common/Button';
import { queryKeys } from '@/config/queryKeys';
import { pollService } from '@/services/api/pollService';
import { queryClient } from '@/libs/queryClient';
import { categoryService } from '@/services/api/categoryService';

export default function CreatePollForm() {
  const router = useRouter();

  const [isValid, setIsValid] = useState(false);

  const pollFormRef = useRef<PollFormComponent>(null);

  const { mutate: createPollRequest, isPending: isCreatingPoll } = useMutation({
    mutationFn: pollService.create,
  });

  function createPoll({ description, expireAt, ...data }: PollFormData) {
    createPollRequest(
      { description: description || undefined, expireAt: expireAt || undefined, ...data },
      {
        async onSuccess(pollCreated) {
          const polls = queryClient.getQueryData<PollTimeline[]>(queryKeys.polls());

          const categories = await queryClient.fetchQuery({
            queryKey: queryKeys.categoriesFilter(),
            queryFn: categoryService.findCategoriesForFilter,
          });

          const category = categories.find((category) => category.id === pollCreated.categoryId);

          if (polls) {
            polls.unshift({
              id: pollCreated.id,
              title: pollCreated.title,
              description: pollCreated.description,
              expireAt: pollCreated.expireAt,
              createdAt: pollCreated.createdAt,
              author: pollCreated.author,
              closed: pollCreated.closed,
              category: category
                ? {
                    id: category.id,
                    name: category.name,
                  }
                : null,
              options: pollCreated.options.map((option) => ({
                id: option.id,
                text: option.text,
                votes: [],
              })),
            });

            queryClient.setQueryData(queryKeys.polls(), polls);
          }

          toast.success('Enquete criada com êxito');

          router.push('/');
        },
        onError(error) {
          toast.error(error.message);
        },
      },
    );
  }

  return (
    <div className="space-y-6">
      <header className="relative">
        <Link title="Voltar para Página Inicial" href="/" className="absolute -left-8 top-px">
          <ArrowLeft className="h-6 w-6 text-primary-100 transition-colors hover:text-white" />
        </Link>

        <h1 className="max-w-full truncate text-lg font-bold tracking-wide sm:text-xl">Criar enquete</h1>
      </header>

      <PollForm ref={pollFormRef} onSubmit={createPoll} onIsValid={setIsValid} disableFields={isCreatingPoll}>
        <footer className="flex items-center justify-between gap-4">
          <div className="flex w-full items-center justify-end gap-4">
            <Button variant="ghost" isDisabled={isCreatingPoll} onClick={() => pollFormRef.current?.resetFields()}>
              Limpar
            </Button>

            <Button type="submit" largePaddingX isDisabled={!isValid} isLoading={isCreatingPoll}>
              Criar
            </Button>
          </div>
        </footer>
      </PollForm>
    </div>
  );
}
