'use client';

import { z } from 'zod';
import { Controller, FieldErrors, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, forwardRef, useEffect, useImperativeHandle } from 'react';
import { Poll } from '@tardis-enquete/contracts';
import { AlertCircle, List, Plus, Trash2 } from 'lucide-react';
import { DragDropContext, Draggable, OnDragEndResponder } from 'react-beautiful-dnd';
import { Input } from '../common/Input';
import { Label } from '../common/Label';
import { DatePicker } from '../common/DatePicker';
import { TextArea } from '../common/TextArea';
import { Button } from '../common/Button';
import { StrictModeDroppable } from '../StrictModeDroppable';
import { DebugEnvironment } from '../DebugEnvironment';
import { Checkbox } from '../common/Checkbox';
import { InputContainer } from '../common/InputContainer';
import { IDInputCopy } from './IDInputCopy';
import { CategorySelecter } from './CategorySelecter';

const DESCRIPTION_LENGTH_LIMIT = 600;

const pollDefaultFormSchema = z.object({
  title: z
    .string()
    .min(3, 'O título deve possuir pelo menos 3 caracteres')
    .max(64, 'O título deve possuir no máximo 64 caracteres'),
  description: z
    .string()
    .max(DESCRIPTION_LENGTH_LIMIT, 'Mah rapaz, aí você foi longe pra burro')
    .transform((description) => (description === '' ? null : description))
    .nullable()
    .optional(),
  categoryId: z.string().optional(),
  options: z
    .array(
      z.object({
        text: z.string().min(3, 'A opção deve possuir pelo menos 3 caracteres'),
        position: z.number().min(1, 'Posição deve ser maior ou igual a 1'),
      }),
    )
    .min(2, 'Deve haver pelo menos 2 opções'),
});

const pollExpireAtFormSchema = z.discriminatedUnion('neverExpireAt', [
  z.object({
    neverExpireAt: z.literal(true),
    expireAt: z
      .date({ required_error: 'A data de expiração é obrigatória', invalid_type_error: 'Data inválida' })
      .optional(),
  }),
  z.object({
    neverExpireAt: z.literal(false),
    expireAt: z.date({ required_error: 'A data de expiração é obrigatória', invalid_type_error: 'Data inválida' }),
  }),
]);

const pollFormSchema = pollDefaultFormSchema.and(pollExpireAtFormSchema);

type InternalPollFormData = z.infer<typeof pollFormSchema>;

export type PollFormData = z.infer<typeof pollDefaultFormSchema> & { expireAt?: Date | null };

export type PollFormProps = {
  defaultPoll?: Poll;
  onSubmit: (data: PollFormData) => Promise<void> | void;
  onChangeForm?: (isChanged: boolean) => void;
  onIsValid?: (isValid: boolean) => void;
  disableFields?: boolean;
  showOptionsWarn?: boolean;
  children: ReactNode;
};

export type PollFormComponent = {
  resetFields: () => void;
};

const PollForm = forwardRef<PollFormComponent, PollFormProps>(
  (
    { defaultPoll, onSubmit, onChangeForm, onIsValid, disableFields = false, showOptionsWarn = false, children },
    ref,
  ) => {
    const {
      control,
      handleSubmit,
      register,
      watch,
      setValue,
      reset: resetFields,
      formState: { errors, isDirty, isValid },
    } = useForm<InternalPollFormData>({
      resolver: zodResolver(pollFormSchema),
      mode: 'all',
      defaultValues: {
        title: defaultPoll?.title,
        description: defaultPoll?.description,
        neverExpireAt: defaultPoll ? !defaultPoll.expireAt : false,
        expireAt: defaultPoll?.expireAt || undefined,
        categoryId: defaultPoll?.categoryId || undefined,
        options: defaultPoll?.options || [
          { position: 1, text: '...' },
          { position: 2, text: '...' },
        ],
      },
    });

    const { fields, append, remove, move } = useFieldArray({
      // @ts-ignore
      name: 'options',
      control,
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

    const options = watch('options');

    const handleDragEnd: OnDragEndResponder = (result) => {
      if (!result.destination) {
        return;
      }

      const fromIndex = result.source.index;
      const toIndex = result.destination.index;

      if (toIndex > fromIndex) {
        // todo: move all
      }
    };

    function preSubmit(data: InternalPollFormData) {
      if (!onSubmit) {
        return;
      }

      if (data.neverExpireAt) {
        // @ts-expect-error
        data.expireAt = null;
      }

      // @ts-expect-error
      delete data.neverExpireAt;

      onSubmit(data);
    }

    function onSubmitError(error: FieldErrors<InternalPollFormData>) {
      console.error('Failed on submit form:', error);
    }

    const descriptionLength = watch('description')?.length || 0;

    const showDescriptionLength = descriptionLength > (descriptionLength > 0 ? DESCRIPTION_LENGTH_LIMIT / 2 : 0);

    const neverExpireAt = watch('neverExpireAt');

    return (
      <form onSubmit={handleSubmit(preSubmit, onSubmitError)} noValidate className="space-y-4">
        <div className="space-y-3">
          {defaultPoll && (
            <DebugEnvironment>
              <div className="flex flex-col gap-1">
                <Label htmlFor="id">ID</Label>

                <IDInputCopy id={defaultPoll.id} />
              </div>
            </DebugEnvironment>
          )}

          <div className="flex flex-col gap-1">
            <Label htmlFor="title">Título</Label>

            <Input.Root>
              <Input.Input
                type="text"
                placeholder="Título"
                id="title"
                disabled={disableFields}
                {...register('title')}
              />

              {errors.title?.message && <Input.ErrorFeedback>{errors.title.message}</Input.ErrorFeedback>}
            </Input.Root>
          </div>

          <div className="flex flex-col gap-1">
            <Label isOptional htmlFor="description">
              Descrição
            </Label>

            <TextArea.Root>
              <TextArea.Input
                placeholder="Descrição"
                id="description"
                disabled={disableFields}
                {...register('description')}
              />

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
            <Label isOptional htmlFor="category">
              Categoria
            </Label>

            <Controller
              control={control}
              name="categoryId"
              render={({ field: { value, onChange } }) => (
                <CategorySelecter
                  selectedCategoryId={value}
                  onChange={onChange}
                  disabled={disableFields}
                  error={errors.categoryId?.message}
                />
              )}
            />
          </div>

          <fieldset className="!my-6 flex flex-col gap-3">
            <Label htmlFor="expireAt">Data de expiração</Label>

            <Controller
              control={control}
              name="neverExpireAt"
              render={({ field: { value, onChange } }) => (
                <Checkbox.Root>
                  <Checkbox.Input
                    disabled={disableFields}
                    id="neverExpireAt"
                    checked={value}
                    onCheckedChange={onChange}
                  />

                  <Checkbox.Label htmlFor="neverExpireAt">Nunca expirar</Checkbox.Label>
                </Checkbox.Root>
              )}
            />

            {!neverExpireAt && (
              <div className="flex flex-col gap-1">
                <Controller
                  control={control}
                  name="expireAt"
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      value={value}
                      onChange={onChange}
                      placeholder="Data de expiração"
                      errorFeedback={errors.expireAt?.message}
                      disabled={disableFields}
                      showExpireAt
                    />
                  )}
                />
              </div>
            )}
          </fieldset>

          <div className="flex flex-col gap-1">
            <header className="flex w-full items-center justify-between">
              <div className="flex flex-col gap-2">
                <Label>Opções</Label>

                {showOptionsWarn && (
                  <div className="mb-2 flex items-center gap-1.5 text-amber-300">
                    <AlertCircle className="h-3.5 w-3.5" />

                    <span className="text-xs font-medium">
                      Há votos em algumas opções abaixo. Se você editar qualquer uma, os votos serão perdidos
                    </span>
                  </div>
                )}
              </div>

              <Button
                variant="thematic"
                className="h-[42px]"
                isDisabled={disableFields}
                onClick={() => append({ position: fields.length + 1, text: '' })}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </header>

            <DragDropContext onDragEnd={handleDragEnd}>
              {typeof window !== 'undefined' && (
                <StrictModeDroppable droppableId="options">
                  {(provided) => (
                    <ul ref={provided.innerRef} className="space-y-2" {...provided.droppableProps}>
                      {fields.map((optionField, index) => (
                        <Draggable key={optionField.id} draggableId={optionField.id} index={index}>
                          {(provided) => (
                            <li ref={provided.innerRef} className="flex items-stretch" {...provided.draggableProps}>
                              <Button
                                variant="thematic"
                                className="max-h-[42px] cursor-grab"
                                isDisabled={disableFields}
                                {...provided.dragHandleProps}
                              >
                                <List className="h-4 w-4" />
                              </Button>

                              <DebugEnvironment>
                                <InputContainer className="ml-1 w-fit" asChild>
                                  <span>{optionField.position}º</span>
                                </InputContainer>
                              </DebugEnvironment>

                              <Input.Root className="ml-1 mr-2 w-full">
                                <Input.Input
                                  type="text"
                                  placeholder="Descreva sua opção"
                                  disabled={disableFields}
                                  {...register(`options.${index}.text`)}
                                />

                                {errors.options?.[index]?.message && (
                                  <Input.ErrorFeedback>{errors.options?.[index]?.message}</Input.ErrorFeedback>
                                )}
                              </Input.Root>

                              <Button
                                variant="thematic-danger"
                                className="max-h-[42px]"
                                isDisabled={disableFields || fields.length <= 2}
                                onClick={() => remove(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </li>
                          )}
                        </Draggable>
                      ))}

                      {provided.placeholder}
                    </ul>
                  )}
                </StrictModeDroppable>
              )}
            </DragDropContext>

            {errors.options?.message && <Input.ErrorFeedback>{errors.options.message}</Input.ErrorFeedback>}
          </div>
        </div>

        {children}
      </form>
    );
  },
);

export default PollForm;
