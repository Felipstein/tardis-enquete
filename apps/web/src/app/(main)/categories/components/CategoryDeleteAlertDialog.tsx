'use client';

import { ReactNode, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Button } from '@/app/components/common/Button';
import { queryKeys } from '@/config/queryKeys';
import { AlertDialog } from '@/app/components/common/AlertDialog';
import { categoryService } from '@/services/api/categoryService';

export type CategoryDeleteAlertDialogProps = {
  categoryId: string;
  children: ReactNode;
};

export function CategoryDeleteAlertDialog({ categoryId, children }: CategoryDeleteAlertDialogProps) {
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  const { mutate: deleteCategoryRequest, isPending: isDeletingPoll } = useMutation({
    mutationFn: categoryService.delete,
  });

  function deleteCategory() {
    deleteCategoryRequest(
      { categoryId },
      {
        async onSuccess() {
          await Promise.all([
            queryClient.invalidateQueries({ queryKey: queryKeys.categories() }),
            queryClient.invalidateQueries({ queryKey: queryKeys.categoriesFilter() }),
            queryClient.invalidateQueries({ queryKey: queryKeys.categoriesSelect() }),
            queryClient.invalidateQueries({ queryKey: queryKeys.polls() }),
          ]);

          queryClient.removeQueries({
            predicate: (query) => query.queryKey[0] === queryKeys.poll('')[0],
          });

          toast.success('Categoria excluída com sucesso');

          setIsOpen(false);
        },
        onError(error) {
          toast.error(error.message);
        },
      },
    );
  }

  return (
    <AlertDialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>

      <AlertDialog.Content>
        <AlertDialog.Title>Você tem certeza absoluta?</AlertDialog.Title>

        <AlertDialog.Description>
          Essa ação não poderá ser desfeita. Isso irá deletar permanentemente a categoria.
        </AlertDialog.Description>

        <AlertDialog.Description className="mt-1">
          Todas as enquetes vinculadas com essa categoria não serão afetadas, apenas serão desvinculadas e ficarão sem
          categoria definida.
        </AlertDialog.Description>

        <AlertDialog.Footer>
          <AlertDialog.Cancel label="Cancelar" />

          <AlertDialog.Action asChild>
            <Button
              variant="danger"
              onClick={(event) => {
                event.preventDefault();
                deleteCategory();
              }}
              isLoading={isDeletingPoll}
            >
              Sim, deletar categoria
            </Button>
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
