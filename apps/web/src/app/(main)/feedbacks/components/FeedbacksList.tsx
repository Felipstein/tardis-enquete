'use client';

import { useQuery } from '@tanstack/react-query';
import { Feedback } from '@tardis-enquete/contracts';
import { RefreshCw } from 'lucide-react';
import { useMemo } from 'react';
import { queryKeys } from '@/config/queryKeys';
import { feedbackService } from '@/services/api/feedbackService';
import { LoaderIcon } from '@/app/components/common/LoaderIcon';
import { Button } from '@/app/components/common/Button';

export type FeedbacksListProps = {
  defaultFeedbacks?: Feedback[];
};

export function FeedbacksList({ defaultFeedbacks }: FeedbacksListProps) {
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

  const errorMessage = useMemo(() => {
    if (errorOnFetchFeedbacks instanceof Error) {
      return errorOnFetchFeedbacks.message;
    }

    if (typeof errorOnFetchFeedbacks === 'string') {
      return errorOnFetchFeedbacks;
    }

    return 'Ocorreu um erro inesperado.';
  }, [errorOnFetchFeedbacks]);

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
    <ul className="flex flex-col gap-3">
      {feedbacks.map((feedback) => (
        <li key={feedback.id}>
          <p>{feedback.text}</p>
        </li>
      ))}
    </ul>
  );
}
