import { Plus } from 'lucide-react';
import { Button } from '@/app/components/common/Button';

export type CategoriesHeaderProps = {
  totalCategories: number;
};

export function CategoriesHeader({ totalCategories }: CategoriesHeaderProps) {
  return (
    <header className="mb-3 flex items-center justify-between">
      <h2 className="text-xl font-semibold tracking-wide text-primary-50">
        {totalCategories === 0
          ? 'Nenhuma categoria cadastrada ainda'
          : `${totalCategories} categoria${totalCategories > 1 ? 's' : ''} encontrada.`}
      </h2>

      <Button variant="thematic">
        <Plus className="mr-1 h-4 w-4" />
        Categoria
      </Button>
    </header>
  );
}
