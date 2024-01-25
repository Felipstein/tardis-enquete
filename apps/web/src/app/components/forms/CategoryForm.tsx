'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Category } from '@tardis-enquete/contracts';
import { ReactNode, forwardRef, useEffect, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Label } from '../common/Label';
import { DebugEnvironment } from '../DebugEnvironment';
import { Input } from '../common/Input';
import { TextArea } from '../common/TextArea';
import { IDInputCopy } from './IDInputCopy';

const DESCRIPTION_LENGTH_LIMIT = 600;

const categoryFormSchema = z.object({
  name: z
    .string({
      required_error: 'Nome da categoria é obrigatório',
      invalid_type_error: 'Nome da categoria deve ser um texto',
    })
    .min(3, 'O nome deve possuir pelo menos 3 caracteres'),
  description: z.string({ invalid_type_error: 'Descrição deve ser um texto' }).optional(),
});

export type CategoryFormData = z.infer<typeof categoryFormSchema>;

export type CategoryFormProps = {
  defaultCategory?: Category;
  onSubmit: (data: CategoryFormData) => Promise<void> | void;
  onChangeForm?: (isChanged: boolean) => void;
  onIsValid?: (isValid: boolean) => void;
  disableFields?: boolean;
  children: ReactNode;
};

export type CategoryFomComponent = {
  resetFields: () => void;
};

export const CategoryForm = forwardRef<CategoryFomComponent, CategoryFormProps>(
  ({ defaultCategory, onSubmit, onChangeForm, onIsValid, disableFields, children }, ref) => {
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors, isDirty, isValid },
      reset: resetFields,
    } = useForm<CategoryFormData>({
      resolver: zodResolver(categoryFormSchema),
      mode: 'all',
      defaultValues: {
        name: defaultCategory?.name,
        description: defaultCategory?.description || undefined,
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
          {defaultCategory && (
            <DebugEnvironment>
              <div className="flex flex-col gap-1">
                <Label htmlFor="id">ID</Label>

                <IDInputCopy id={defaultCategory.id} />
              </div>
            </DebugEnvironment>
          )}

          <div className="flex flex-col gap-1">
            <Label htmlFor="title">Título</Label>

            <Input.Root>
              <Input.Input type="text" placeholder="Nome" id="name" disabled={disableFields} {...register('name')} />

              {errors.name?.message && <Input.ErrorFeedback>{errors.name.message}</Input.ErrorFeedback>}
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
        </div>

        {children}
      </form>
    );
  },
);
