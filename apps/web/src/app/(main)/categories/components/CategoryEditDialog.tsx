'use client';

import { ReactNode, useRef, useState } from 'react';
import { Category } from '@tardis-enquete/contracts';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Dialog } from '@/app/components/common/Dialog';
import { CategoryFomComponent, CategoryForm, CategoryFormData } from '@/app/components/forms/CategoryForm';
import { Button } from '@/app/components/common/Button';
import { categoryService } from '@/services/api/categoryService';
import { queryClient } from '@/libs/queryClient';
import { queryKeys } from '@/config/queryKeys';

export type CategoryEditDialogProps = {
  category: Category;
  children: ReactNode;
};

export function CategoryEditDialog({ category, children }: CategoryEditDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const categoryFormRef = useRef<CategoryFomComponent>(null);

  const { mutate: updateCategoryRequest, isPending: isUpdatingCategory } = useMutation({
    mutationFn: categoryService.update,
  });

  function updateCategory({ name, description }: CategoryFormData) {
    updateCategoryRequest(
      { categoryId: category.id, name, description },
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
        <Dialog.Title>Editar {category.name}</Dialog.Title>

        <CategoryForm
          ref={categoryFormRef}
          defaultCategory={category}
          onSubmit={updateCategory}
          onChangeForm={setHasChanges}
          onIsValid={setIsValid}
          disableFields={isUpdatingCategory}
        >
          <Dialog.Footer>
            <Button
              isDisabled={!hasChanges || isUpdatingCategory}
              onClick={() => categoryFormRef.current?.resetFields()}
              variant="ghost"
            >
              Cancelar
            </Button>

            <Button type="submit" isDisabled={!hasChanges || !isValid} isLoading={isUpdatingCategory}>
              Editar Categoria
            </Button>
          </Dialog.Footer>
        </CategoryForm>
      </Dialog.Content>
    </Dialog.Root>
  );
}
