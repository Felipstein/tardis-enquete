'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { Feedback, FeedbackStatuses, FeedbackType } from '@tardis-enquete/contracts';
import { RefreshCw, ShieldClose, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { queryKeys } from '@/config/queryKeys';
import { feedbackService } from '@/services/api/feedbackService';
import { LoaderIcon } from '@/app/components/common/LoaderIcon';
import { Button } from '@/app/components/common/Button';
import { UserAvatar } from '@/app/components/UserAvatar';
import { Badge } from '@/app/components/common/Badge';
import { Toggle } from '@/app/components/common/Toggle';
import { Label } from '@/app/components/common/Label';
import { queryClient } from '@/libs/queryClient';

const feedbackTypeLabel: Record<FeedbackType, string> = {
  suggestion: 'Sugestão',
  bug: 'Bug',
  other: 'Outro',
};

const feedbackStatusLabel: Record<FeedbackStatuses, string> = {
  open: 'Aberto',
  closed: 'Fechado',
};

const feedbackStatusColor: Record<FeedbackStatuses, string> = {
  open: 'green',
  closed: 'purple',
};

export type FeedbacksListProps = {
  defaultFeedbacks?: Feedback[];
};

export function FeedbacksList({ defaultFeedbacks }: FeedbacksListProps) {
  const [selectedFeedbackType, setSelectedFeedbackType] = useState<FeedbackType | null>(null);
  const [selectedFeedbackStatus, setSelectedFeedbackStatus] = useState<FeedbackStatuses | null>(null);

  const [feedbackThatIsClosing, setFeedbackThatIsClosing] = useState<string | null>(null);
  const [feedbackThatIsDeleting, setFeedbackThatIsDeleting] = useState<string | null>(null);

  const {
    data: feedbacks = [],
    isLoading: isLoadingFeedbacks,
    error: errorOnFetchFeedbacks,
    refetch: refetchFeedbacks,
  } = useQuery({
    queryKey: queryKeys.feedbacks(),
    queryFn: feedbackService.getFeedbacks,
    initialData: defaultFeedbacks,
  });

  const { mutate: closeFeedbackRequest } = useMutation({
    mutationFn: feedbackService.closeFeedback,
  });

  const { mutate: deleteFeedbackRequest } = useMutation({
    mutationFn: feedbackService.deleteFeedback,
  });

  const errorMessage = useMemo(() => {
    if (errorOnFetchFeedbacks instanceof Error) {
      return errorOnFetchFeedbacks.message;
    }

    if (typeof errorOnFetchFeedbacks === 'string') {
      return errorOnFetchFeedbacks;
    }

    return 'Ocorreu um erro inesperado.';
  }, [errorOnFetchFeedbacks]);

  const feedbacksFiltered = useMemo(() => {
    let feedbacksFiltered = feedbacks;

    if (selectedFeedbackType) {
      feedbacksFiltered = feedbacksFiltered.filter((feedback) => feedback.type === selectedFeedbackType);
    }

    if (selectedFeedbackStatus) {
      feedbacksFiltered = feedbacksFiltered.filter((feedback) => feedback.status === selectedFeedbackStatus);
    }

    return feedbacksFiltered;
  }, [feedbacks, selectedFeedbackType, selectedFeedbackStatus]);

  const totalOpenFeedbacks = useMemo(
    () => feedbacks.filter((feedback) => feedback.status === 'open').length,
    [feedbacks],
  );

  const totalClosedFeedbacks = useMemo(
    () => feedbacks.filter((feedback) => feedback.status === 'closed').length,
    [feedbacks],
  );

  function closeFeedback(feedbackId: string) {
    setFeedbackThatIsClosing(feedbackId);

    closeFeedbackRequest(
      {
        feedbackId,
      },
      {
        onSuccess() {
          let feedbacks = queryClient.getQueryData<Feedback[]>(queryKeys.feedbacks());

          feedbacks = feedbacks?.map((feedback) => {
            if (feedback.id === feedbackId) {
              return {
                ...feedback,
                status: 'closed',
              };
            }

            return feedback;
          });

          if (feedbacks) {
            queryClient.setQueryData<Feedback[]>(queryKeys.feedbacks(), feedbacks);
          }
        },
        onError(error) {
          toast.error(error.message);
        },
        onSettled() {
          setFeedbackThatIsClosing(null);
        },
      },
    );
  }

  function deleteFeedback(feedbackId: string) {
    setFeedbackThatIsDeleting(feedbackId);

    deleteFeedbackRequest(
      {
        feedbackId,
      },
      {
        onSuccess() {
          let feedbacks = queryClient.getQueryData<Feedback[]>(queryKeys.feedbacks());

          feedbacks = feedbacks?.filter((feedback) => feedback.id !== feedbackId);

          if (feedbacks) {
            queryClient.setQueryData<Feedback[]>(queryKeys.feedbacks(), feedbacks);
          }
        },
        onError(error) {
          toast.error(error.message);
        },
        onSettled() {
          setFeedbackThatIsDeleting(null);
        },
      },
    );
  }

  if (isLoadingFeedbacks) {
    return <LoaderIcon className="h-6 w-6" />;
  }

  if (errorOnFetchFeedbacks) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3.5">
        <p className="text-sm text-red-400">{errorMessage}</p>

        <Button icon={RefreshCw} onClick={() => refetchFeedbacks()} variant="danger">
          Tentar novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-stretch gap-6">
        <div className="flex flex-col gap-1">
          <Label>Filtrar por Status</Label>

          <div>
            <Toggle
              className="rounded-none rounded-l-md"
              pressed={selectedFeedbackStatus === 'open'}
              onPressedChange={(pressed) => setSelectedFeedbackStatus(pressed ? 'open' : null)}
            >
              Abertos
            </Toggle>
            <Toggle
              className="rounded-none rounded-r-md"
              pressed={selectedFeedbackStatus === 'closed'}
              onPressedChange={(pressed) => setSelectedFeedbackStatus(pressed ? 'closed' : null)}
            >
              Fechados
            </Toggle>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <Label>Filtrar por Tipo</Label>

          <div>
            <Toggle
              className="rounded-none rounded-l-md"
              pressed={selectedFeedbackType === 'suggestion'}
              onPressedChange={(pressed) => setSelectedFeedbackType(pressed ? 'suggestion' : null)}
            >
              Sugestão
            </Toggle>
            <Toggle
              className="rounded-none"
              pressed={selectedFeedbackType === 'bug'}
              onPressedChange={(pressed) => setSelectedFeedbackType(pressed ? 'bug' : null)}
            >
              Bug
            </Toggle>
            <Toggle
              className="rounded-none rounded-r-md"
              pressed={selectedFeedbackType === 'other'}
              onPressedChange={(pressed) => setSelectedFeedbackType(pressed ? 'other' : null)}
            >
              Outro
            </Toggle>
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm text-primary-300">
        {feedbacks.length} Feedbacks ({totalOpenFeedbacks} abertos / {totalClosedFeedbacks} fechados)
      </p>

      <ul className="mt-3 flex w-[95vw] flex-col gap-3">
        {feedbacksFiltered.map((feedback) => (
          <li key={feedback.id} className="flex items-stretch gap-2">
            <div className="relative flex w-full items-center justify-between gap-8 overflow-hidden rounded-md bg-black/20 px-6 py-4 font-medium">
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black/40 to-zinc-500/10" />

              <div className="flex flex-col items-start gap-1">
                <small className="text-xs text-primary-500">ID</small>

                <span className="text-sm">{feedback.id}</span>
              </div>

              <div className="flex flex-col items-start gap-1">
                <small className="text-xs text-primary-500">Texto</small>

                <span>{feedback.text}</span>
              </div>

              <div className="flex flex-col items-start gap-1">
                <small className="text-xs text-primary-500">Tipo</small>

                {feedbackTypeLabel[feedback.type]}
              </div>

              <div className="flex flex-col items-start gap-1">
                <small className="text-xs text-primary-500">Autor</small>

                <div className="flex items-center gap-1.5">
                  <UserAvatar userId={feedback.author.id} avatar={feedback.author.avatar} width={28} height={28} />

                  <strong className="text-sm">{feedback.author.username}</strong>
                </div>
              </div>

              <div className="flex flex-col items-start gap-1">
                <small className="text-xs text-primary-500">Status</small>

                <Badge color={feedbackStatusColor[feedback.status]}>{feedbackStatusLabel[feedback.status]}</Badge>
              </div>
            </div>

            <div className="flex flex-col justify-stretch gap-2">
              <Button
                title="Fechar"
                className="h-full"
                variant="thematic"
                largePaddingX
                isDisabled={feedback.status === 'closed' || feedbackThatIsDeleting === feedback.id}
                isLoading={feedbackThatIsClosing === feedback.id}
                onClick={() => closeFeedback(feedback.id)}
              >
                <ShieldClose className="h-4 w-4" />
              </Button>
              <Button
                className="h-full"
                variant="thematic-danger"
                largePaddingX
                isDisabled={feedbackThatIsClosing === feedback.id}
                isLoading={feedbackThatIsDeleting === feedback.id}
                onClick={() => deleteFeedback(feedback.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
