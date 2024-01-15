'use client';

import { motion, useDragControls } from 'framer-motion';
import { ChevronDown, Grip } from 'lucide-react';
import { useState } from 'react';
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
  const [isExpanded, setIsExpanded] = useState(false);

  const dragControls = useDragControls();

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
    <motion.form
      drag
      dragListener={false}
      dragMomentum={false}
      dragControls={dragControls}
      className="fixed bottom-6 right-20 z-50 max-w-2xl rounded-md border border-primary-700 bg-gradient-to-br from-slate-900 to-slate-800 px-5 py-3 shadow-md"
      noValidate
      onSubmit={handleSubmit(sendFeedback)}
    >
      <header className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-primary-50">Envie um feedback!</h1>

        <div className="flex items-center gap-3.5">
          <div
            className="cursor-grab touch-none p-1 text-primary-300 transition-colors hover:text-primary-100"
            onPointerDown={(event) => dragControls.start(event)}
          >
            <Grip className="h-4 w-4" />
          </div>

          <button
            type="button"
            className="p-1 text-primary-300 transition-colors hover:text-primary-100"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <ChevronDown
              data-expanded={isExpanded}
              className="h-4 w-4 transition-transform data-[expanded=false]:rotate-180"
            />
          </button>
        </div>
      </header>

      <motion.div
        animate={isExpanded ? 'expanded' : 'collapsed'}
        variants={{ expanded: { height: 'auto' }, collapsed: { height: 0 } }}
        className="overflow-hidden"
      >
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
      </motion.div>
    </motion.form>
  );
}
