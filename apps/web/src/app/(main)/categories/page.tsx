'use client';

import { useQuery } from '@tanstack/react-query';
import { RefreshCw } from 'lucide-react';
import { useMemo } from 'react';
import { CategoriesHeader } from './components/CategoriesHeader';
import { CategoriesTable } from './components/CategoriesTable';
import { categoryService } from '@/services/api/categoryService';
import { queryKeys } from '@/config/queryKeys';
import { LoaderIcon } from '@/app/components/common/LoaderIcon';
import { Button } from '@/app/components/common/Button';
import { NextPage } from '@/types/NextPage';

export default function CategoriesPage({ searchParams }: NextPage<{}, { createDialog?: string }>) {
  const openCreateCategoryDialog = searchParams.createDialog === 'open';

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    error: errorOnFetchCategories,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: queryKeys.categories(),
    queryFn: categoryService.findCategories,
  });

  const errorMessage = useMemo(() => {
    const error = errorOnFetchCategories;

    if (!error) {
      return null;
    }

    if (error instanceof Error) {
      return error.message;
    }

    if (typeof error === 'string') {
      return error;
    }

    return 'Ocorreu um erro desconhecido ao tentar carregar as categorias.';
  }, [errorOnFetchCategories]);

  if (isLoadingCategories) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3.5">
        <LoaderIcon className="h-6 w-6" />
      </div>
    );
  }

  if (errorOnFetchCategories) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3.5">
        <p className="text-sm text-red-400">{errorMessage}</p>

        <Button icon={RefreshCw} onClick={() => refetchCategories()} variant="danger">
          Tentar novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="m-16 mx-auto flex h-full w-[95vw] max-w-[1280px] flex-col justify-center">
      <CategoriesHeader openCreateDialog={openCreateCategoryDialog} totalCategories={categories.length} />

      <CategoriesTable categories={categories} />
    </div>
  );
}
