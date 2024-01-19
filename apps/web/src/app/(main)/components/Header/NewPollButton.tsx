'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/app/components/common/Button';

export function NewPollButton() {
  const pathname = usePathname();

  return (
    <Button variant="thematic" size="sm" isDisabled={pathname.includes('new')} asChild>
      <Link href="/new" className="flex items-center">
        <Plus className="mr-1 h-4 w-4" />
        Enquete
      </Link>
    </Button>
  );
}
