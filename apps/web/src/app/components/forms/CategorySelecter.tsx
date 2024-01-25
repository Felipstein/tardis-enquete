'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Select } from '../common/Select';
import { queryKeys } from '@/config/queryKeys';
import { categoryService } from '@/services/api/categoryService';
import { useSocketEvent } from '@/hooks/useSocketEvent';

export type CategorySelecterProps = {
  selectedCategoryId?: string;
  onChange?: (value: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
  error?: string;
};

export function CategorySelecter({ selectedCategoryId, onChange, isLoading, disabled, error }: CategorySelecterProps) {
  const queryClient = useQueryClient();

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    error: errorOnFetchCategories,
  } = useQuery({
    queryKey: queryKeys.categoriesSelect(),
    queryFn: categoryService.findCategoriesForSelect,
  });

  useSocketEvent(
    'updateCategoriesSelect',
    ({ categories }) => {
      queryClient.setQueryData(queryKeys.categoriesSelect(), categories);
    },
    [queryClient],
  );

  return (
    <Select.Root value={selectedCategoryId} onValueChange={onChange}>
      <Select.Trigger
        loadingPlaceholder="Buscando categorias..."
        placeholder="Sem categoria"
        isLoading={isLoadingCategories || isLoading}
        disabled={disabled}
        error={errorOnFetchCategories?.message || error}
      />

      <Select.Content>
        <Select.Group>
          {categories.map((category) => (
            <Select.Item key={category.id} value={category.id}>
              {category.name}
            </Select.Item>
          ))}

          <Select.Separator />

          <Select.Button className="opacity-80 transition-all hover:opacity-100" asChild>
            <Link href="/categories?createDialog=open" target="_blank">
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Criar Categoria
            </Link>
          </Select.Button>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
