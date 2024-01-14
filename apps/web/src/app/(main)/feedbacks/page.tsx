import { FeedbacksList } from './components/FeedbacksList';
import { feedbackService } from '@/services/api/feedbackService';

export default async function FeedbacksPage() {
  const feedbacks = await feedbackService.getFeedbacks();

  return (
    <div className="mt-8 flex items-center justify-center">
      <FeedbacksList defaultFeedbacks={feedbacks} />
    </div>
  );
}
