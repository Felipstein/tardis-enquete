'use client';

import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, forwardRef, useEffect, useImperativeHandle } from 'react';
import { Poll } from '@tardis-enquete/contracts';
import moment from 'moment';
import { Input } from '../common/Input';
import { Label } from '../common/Label';
import { DatePicker } from '../common/DatePicker';
import { TextArea } from '../common/TextArea';

const DESCRIPTION_LENGTH_LIMIT = 600;

const pollFormSchema = z.object({
  title: z
    .string()
    .min(3, 'O título deve possuir pelo menos 3 caracteres')
    .max(64, 'O título deve possuir no máximo 64 caracteres'),
  description: z
    .string()
    .max(DESCRIPTION_LENGTH_LIMIT, 'Mah rapaz, aí você foi longe pra burro')
    .optional()
    .transform((description) => (description === '' ? undefined : description)),
  expireAt: z.date().refine((date) => date.getTime() > Date.now(), { message: 'Escolha uma data futura, tongo' }),
  options: z
    .array(z.string().min(3, 'A opção deve possuir pelo menos 3 caracteres'))
    .min(2, 'Deve haver pelo menos 2 opções'),
});

type PollFormData = z.infer<typeof pollFormSchema>;

export type PollFormProps = {
  defaultPoll?: Poll;
  onSubmit: (data: PollFormData) => Promise<void> | void;
  onChangeForm?: (isChanged: boolean) => void;
  onIsValid?: (isValid: boolean) => void;
  children: ReactNode;
};

export type PollFormComponent = {
  resetFields: () => void;
};

const PollForm = forwardRef<PollFormComponent, PollFormProps>(
  ({ defaultPoll, onSubmit, onChangeForm, onIsValid, children }, ref) => {
    const {
      control,
      handleSubmit,
      register,
      watch,
      reset: resetFields,
      formState: { errors, isDirty, isValid },
    } = useForm<PollFormData>({
      resolver: zodResolver(pollFormSchema),
      mode: 'all',
      defaultValues: {
        title: defaultPoll?.title,
        description: defaultPoll?.description || undefined,
        expireAt: defaultPoll?.expireAt || moment().add(1, 'month').toDate(),
        options: defaultPoll?.options.map((option) => option.text),
      },
    });

    useImperativeHandle(
      ref,
      () => ({
        resetFields,
      }),
      [resetFields],
    );

    useEffect(() => {
      onChangeForm?.(isDirty);
    }, [onChangeForm, isDirty]);

    useEffect(() => {
      onIsValid?.(isValid);
    }, [onIsValid, isValid]);

    const descriptionLength = watch('description')?.length || 0;

    const showDescriptionLength = descriptionLength > (descriptionLength > 0 ? DESCRIPTION_LENGTH_LIMIT / 2 : 0);

    return (
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div className="space-y-3">
          <div className="flex flex-col gap-1">
            <Label htmlFor="title">Título</Label>

            <Input.Root>
              <Input.Input type="text" placeholder="Título" id="title" {...register('title')} />

              {errors.title?.message && <Input.ErrorFeedback>{errors.title.message}</Input.ErrorFeedback>}
            </Input.Root>
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="description">Descrição</Label>

            <TextArea.Root>
              <TextArea.Input placeholder="Descrição" id="description" {...register('description')} />

              <div
                data-error={!!errors.description?.message}
                className="flex items-center justify-end gap-4 truncate data-[error=true]:justify-between"
              >
                {errors.description?.message && (
                  <TextArea.ErrorFeedback>{errors.description.message}</TextArea.ErrorFeedback>
                )}

                {showDescriptionLength && (
                  <div className="text-xs text-primary-300">
                    {descriptionLength}/{DESCRIPTION_LENGTH_LIMIT}
                  </div>
                )}
              </div>
            </TextArea.Root>
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="description">Data de expiração</Label>

            <Controller
              control={control}
              name="expireAt"
              render={({ field: { value, onChange } }) => (
                <DatePicker value={value} onChange={onChange} errorFeedback={errors.expireAt?.message} />
              )}
            />
          </div>
        </div>

        {children}
      </form>
    );
  },
);

export default PollForm;
