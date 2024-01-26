'use client';

import { ExternalLink, MessageSquare, MoreHorizontal, PenSquare, Share, Subtitles, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { PollDeleteAlertDialog } from './PollDeleteAlertDialog';
import { Dropdown } from '@/app/components/common/Dropdown';
import { pollService } from '@/services/api/pollService';
import { w } from '@/utils/w';
import { LoaderIcon } from '@/app/components/common/LoaderIcon';

export type PollOptionsProps = {
  pollId: string;
  isClosed: boolean;
  isExpired: boolean;
  canEdit?: boolean;
};

export function PollOptions({ pollId, isClosed, isExpired, canEdit = false }: PollOptionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: changeClosedStatusRequest, isPending: isChangingClosedStatus } = useMutation({
    mutationFn: pollService.changeClosedStatus,
  });

  function changeClosedStatus() {
    changeClosedStatusRequest(
      { pollId, close: !isClosed },
      {
        onError(error) {
          toast.error(error.message);
        },
      },
    );
  }

  function handleCopyLink() {
    const url = `${window.location.origin}/poll/${pollId}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);

      toast.success('Link de compartilhamento copiado');
    }
  }

  const cannotOpenPoll = isExpired;

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
          <Link href={`/poll/${pollId}`}>
            <Dropdown.ItemIcon src={ExternalLink} />

            <span>Abrir em uma nova aba</span>
          </Link>
        </Dropdown.Item>

        <Dropdown.Item asChild className="flex items-center gap-2">
          <button type="button" onClick={handleCopyLink}>
            <Dropdown.ItemIcon src={Share} />

            <span>Compartilhar</span>
          </button>
        </Dropdown.Item>

        {canEdit && (
          <>
            <Dropdown.Separator />

            <Dropdown.Item asChild className="flex items-center gap-2">
              <Link href={`/edit/${pollId}`}>
                <Dropdown.ItemIcon src={PenSquare} />

                <span>Editar</span>
              </Link>
            </Dropdown.Item>

            <Dropdown.Item
              title={
                cannotOpenPoll
                  ? 'Não é possível abrir essa enquete pois ela já está expirada. Para abrir, mude a data de expiração.'
                  : undefined
              }
              asChild
              className={w(
                'flex items-center gap-2',
                (cannotOpenPoll || isChangingClosedStatus) && 'cursor-default opacity-40',
              )}
              disabled={cannotOpenPoll || isChangingClosedStatus}
            >
              <button type="button" onClick={() => (cannotOpenPoll ? undefined : changeClosedStatus())}>
                {isChangingClosedStatus ? (
                  <Dropdown.ItemIcon src={LoaderIcon} />
                ) : isClosed ? (
                  <Dropdown.ItemIcon src={Subtitles} />
                ) : (
                  <Dropdown.ItemIcon src={MessageSquare} />
                )}

                <span>{isClosed ? 'Abrir enquete' : 'Fechar enquete'}</span>
              </button>
            </Dropdown.Item>

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
          </>
        )}
      </Dropdown.Content>
    </Dropdown.Root>
  );
}
