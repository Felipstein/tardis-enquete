'use client';

import { MoreHorizontal, PenSquare, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { PollDeleteAlertDialog } from './PollDeleteAlertDialog';
import { Dropdown } from '@/app/components/common/Dropdown';

export type PollOptionsProps = {
  pollId: string;
};

export function PollOptions({ pollId }: PollOptionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dropdown.Trigger asChild>
        <div className="group/item absolute -top-2.5 right-0">
          <button
            type="button"
            data-open={isOpen}
            className="opacity-0 transition-opacity group-hover/item:!opacity-80 group-hover/poll:opacity-40 data-[open=true]:opacity-80"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </Dropdown.Trigger>

      <Dropdown.Content>
        <Dropdown.Item asChild className="flex items-center gap-2">
          <Link href={`/edit/${pollId}`}>
            <Dropdown.ItemIcon src={PenSquare} />

            <span>Editar</span>
          </Link>
        </Dropdown.Item>

        <Dropdown.Separator />

        <PollDeleteAlertDialog pollId={pollId}>
          <Dropdown.Item
            variant="danger"
            onSelect={(event) => event.preventDefault()}
            asChild
            className="flex items-center gap-2"
          >
            <button type="button" aria-label="Deletar">
              <Dropdown.ItemIcon src={Trash2} />

              <span>Deletar</span>
            </button>
          </Dropdown.Item>
        </PollDeleteAlertDialog>
      </Dropdown.Content>
    </Dropdown.Root>
  );
}
