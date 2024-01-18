'use client';

import { z } from 'zod';
import { FeedbackType, feedbackTypes } from '@tardis-enquete/contracts';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { TextArea } from './common/TextArea';
import { Button } from './common/Button';
import { RadioGroup } from './common/RadioGroup';
import { Label } from './common/Label';
import { Input } from './common/Input';
import { ExpandPopup } from './ExpandPopup';
import { feedbackService } from '@/services/api/feedbackService';

const feedbackTypeLabels: Record<FeedbackType, string> = {
  suggestion: 'Sugestão',
  bug: 'Bug',
  other: 'Outro',
};

const feedbackFormSchema = z.object({
  text: z.string().min(3, 'O texto deve possuir pelo menos 3 caracteres'),
  type: z.enum(feedbackTypes),
});

type FeedbackFormData = z.infer<typeof feedbackFormSchema>;

export function FeedbackContainer() {
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackFormSchema),
    mode: 'all',
  });

  const { mutate: sendFeedbackRequest, isPending: isSendingFeedback } = useMutation({
    mutationFn: feedbackService.sendFeedback,
  });

  function sendFeedback(data: FeedbackFormData) {
    sendFeedbackRequest(data, {
      onSuccess() {
        toast.success('Seu feedback foi enviado com êxito, obrigado!');

        reset();
      },
      onError(error) {
        toast.error(error.message);
      },
    });
  }

  return (
    <ExpandPopup title="Envie um feedback!" className="bottom-6 right-20">
      <form noValidate onSubmit={handleSubmit(sendFeedback)}>
        <p className="mb-6 mt-4 text-sm text-primary-100">
          Encontrou algum bug ou tem alguma sugestão? Fique a vontade.
        </p>

        <TextArea.Root>
          <TextArea.Input placeholder="Olha, eu só acho que..." disabled={isSendingFeedback} {...register('text')} />

          {errors.text?.message && <TextArea.ErrorFeedback>{errors.text.message}</TextArea.ErrorFeedback>}
        </TextArea.Root>

        <div className="mt-3">
          <Label>Qual o tipo do Feedback?</Label>

          <Controller
            control={control}
            name="type"
            render={({ field: { value, onChange } }) => (
              <RadioGroup.Root
                disabled={isSendingFeedback}
                value={value}
                onValueChange={onChange}
                className="mt-2 flex-row justify-between gap-2"
              >
                {feedbackTypes.map((type) => (
                  <RadioGroup.Item key={type}>
                    <RadioGroup.Input value={type} id={type} />
                    <RadioGroup.Label htmlFor={type}>{feedbackTypeLabels[type]}</RadioGroup.Label>
                  </RadioGroup.Item>
                ))}
              </RadioGroup.Root>
            )}
          />

          {errors.type?.message && <Input.ErrorFeedback>{errors.type.message}</Input.ErrorFeedback>}
        </div>

        <footer className="mt-3 flex w-full justify-end">
          <Button type="submit" largePaddingX variant="thematic" isDisabled={!isValid} isLoading={isSendingFeedback}>
            Enviar
          </Button>
        </footer>
      </form>
    </ExpandPopup>
  );
}
