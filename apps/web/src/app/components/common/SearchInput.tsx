'use client';

import { Search } from 'lucide-react';
import { ChangeEvent, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { Input } from './Input';

import { w } from '@/utils/w';

export type SearchInputProps = {
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  shortcut?: boolean;
  className?: string;
};

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value: valueByProp, onChange: onChangeByProp, shortcut = false, className }, ref) => {
    const [value, setValue] = useState('');

    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    useEffect(() => {
      function handleShortcut(event: KeyboardEvent) {
        if (event.ctrlKey && event.key === 'f' && shortcut) {
          event.preventDefault();

          inputRef.current?.focus();
        }
      }

      window.addEventListener('keydown', handleShortcut);

      return () => {
        window.removeEventListener('keydown', handleShortcut);
      };
    }, [shortcut]);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      setValue(event.target.value);
    }

    const isTyped = value !== '';

    return (
      <Input.Root className={w('group w-full', className)} data-typed={isTyped}>
        <Input.Box left>
          <Search className="h-5 w-5 text-primary-500" />
        </Input.Box>
        <Input.Input
          ref={inputRef}
          type="text"
          placeholder="Pesquisar por enquete..."
          className="pl-[38px] group-data-[typed=false]:pr-14"
          value={valueByProp ?? value}
          onChange={onChangeByProp ?? handleChange}
        />

        {shortcut && (
          <Input.Box right className="group-data-[typed=true]:invisible">
            <span className="text-xs text-primary-700">Ctrl+F</span>
          </Input.Box>
        )}
      </Input.Root>
    );
  },
);
