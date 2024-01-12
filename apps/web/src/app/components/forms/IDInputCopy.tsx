'use client';

import { Check, Copy } from 'lucide-react';
import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

export type IDInputCopyProps = {
  pollId: string;
};

export function IDInputCopy({ pollId }: IDInputCopyProps) {
  const [hasCopied, setHasCopied] = useState(false);

  // eslint-disable-next-line no-undef
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    },
    [],
  );

  function handleCopy() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(pollId);

      toast.success('ID copiado');
    }

    setHasCopied(true);
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      setHasCopied(false);
    }, 3000);
  }

  return (
    <div className="flex items-stretch gap-2">
      <Input.Root className="w-full">
        <Input.Input type="text" placeholder="ID" readOnly id="id" value={pollId} />
      </Input.Root>

      <Button variant="thematic" onClick={handleCopy} className="text-primary-100">
        {hasCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  );
}
