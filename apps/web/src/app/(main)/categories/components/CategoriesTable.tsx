import { PenSquare, Trash2 } from 'lucide-react';
import { Category } from '@tardis-enquete/contracts';
import { CategoryDeleteAlertDialog } from './CategoryDeleteAlertDialog';
import { CategoryEditDialog } from './CategoryEditDialog';
import { moment } from '@/utils/moment';
import { w } from '@/utils/w';
import { UserAvatar } from '@/app/components/UserAvatar';
import { Button } from '@/app/components/common/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/common/Table';

export type CategoriesTableProps = {
  categories: Category[];
};

export function CategoriesTable({ categories }: CategoriesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead className="text-center">Descrição</TableHead>
          <TableHead className="text-center">Total Enquetes</TableHead>
          <TableHead className="text-center">Criado por</TableHead>
          <TableHead className="text-center">Criado em</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell className="font-medium">{category.name}</TableCell>
            <TableCell className={w('text-center', !category.description && 'text-sm text-primary-300')}>
              {category.description || 'Sem descrição'}
            </TableCell>
            <TableCell className="text-center">{category.totalPolls}</TableCell>
            <TableCell className="flex items-center justify-center gap-1.5">
              <UserAvatar userId={category.author.id} avatar={category.author.avatar} />

              <strong className="text-xs sm:text-sm">{category.author.username}</strong>
            </TableCell>
            <TableCell className="text-center">{moment(category.createdAt).format('DD/MM/YYYY')}</TableCell>
            <TableCell className="flex justify-end gap-1">
              <CategoryEditDialog category={category}>
                <Button title="Editar" variant="thematic" className="group">
                  <PenSquare className="h-4 w-4 text-primary-300 transition-colors group-hover:text-white" />
                </Button>
              </CategoryEditDialog>

              <CategoryDeleteAlertDialog categoryId={category.id}>
                <Button title="Deletar" variant="thematic-danger" className="group">
                  <Trash2 className="h-4 w-4 text-primary-300 transition-colors group-hover:text-inherit" />
                </Button>
              </CategoryDeleteAlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
