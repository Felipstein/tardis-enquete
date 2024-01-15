import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/app/components/common/Button';

export function NewPollButton() {
  return (
    <Button variant="thematic" size="sm" asChild>
      <Link href="/new" className="flex items-center">
        <Plus className="mr-1 h-4 w-4" />
        Enquete
      </Link>
    </Button>
  );
}
