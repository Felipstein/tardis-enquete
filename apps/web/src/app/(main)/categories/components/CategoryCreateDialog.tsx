'use client';

import { ReactNode, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Dialog } from '@/app/components/common/Dialog';
import { CategoryFomComponent, CategoryForm, CategoryFormData } from '@/app/components/forms/CategoryForm';
import { Button } from '@/app/components/common/Button';
import { categoryService } from '@/services/api/categoryService';
import { queryClient } from '@/libs/queryClient';
import { queryKeys } from '@/config/queryKeys';

export type CategoryCreateDialogProps = {
  children: ReactNode;
};

export function CategoryCreateDialog({ children }: CategoryCreateDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const categoryFormRef = useRef<CategoryFomComponent>(null);

  const { mutate: createCategoryRequest, isPending: isCreatingCategory } = useMutation({
    mutationFn: categoryService.create,
  });

  function createCategory({ name, description }: CategoryFormData) {
    createCategoryRequest(
      { name, description: description || undefined },
      {
        async onSuccess() {
          await Promise.all([
            queryClient.invalidateQueries({ queryKey: queryKeys.categories() }),
            queryClient.invalidateQueries({ queryKey: queryKeys.categoriesFilter() }),
            queryClient.invalidateQueries({ queryKey: queryKeys.categoriesSelect() }),
          ]);

          toast.success('Categoria atualizada com êxito');

          setIsOpen(false);
        },
        onError(error) {
          toast.error(error.message);
        },
      },
    );
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Criar categoria</Dialog.Title>

        <CategoryForm
          ref={categoryFormRef}
          onSubmit={createCategory}
          onIsValid={setIsValid}
          disableFields={isCreatingCategory}
        >
          <Dialog.Footer>
            <Button
              isDisabled={isCreatingCategory}
              onClick={() => categoryFormRef.current?.resetFields()}
              variant="ghost"
            >
              Limpar
            </Button>

            <Button type="submit" isDisabled={!isValid} isLoading={isCreatingCategory}>
              Criar categoria
            </Button>
          </Dialog.Footer>
        </CategoryForm>
      </Dialog.Content>
    </Dialog.Root>
  );
}
