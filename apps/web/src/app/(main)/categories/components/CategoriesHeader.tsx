import { Plus } from 'lucide-react';
import { CategoryCreateDialog } from './CategoryCreateDialog';
import { Button } from '@/app/components/common/Button';
import { BackButton } from '@/app/components/BackButton';

export type CategoriesHeaderProps = {
  totalCategories: number;
};

export function CategoriesHeader({ totalCategories }: CategoriesHeaderProps) {
  return (
    <header className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <BackButton title="Voltar para Página Inicial" href="/" />

        <h2 className="text-xl font-semibold tracking-wide text-primary-50">
          {totalCategories === 0
            ? 'Nenhuma categoria cadastrada ainda'
            : `${totalCategories} categoria${totalCategories > 1 ? 's' : ''} encontrada.`}
        </h2>
      </div>

      <CategoryCreateDialog>
        <Button variant="thematic">
          <Plus className="mr-1 h-4 w-4" />
          Categoria
        </Button>
      </CategoryCreateDialog>
    </header>
  );
}
