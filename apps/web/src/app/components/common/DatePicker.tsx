'use client';

import { DayPicker } from 'react-day-picker';
import * as Popover from '@radix-ui/react-popover';
import { useState } from 'react';
import moment from 'moment';
import { Input } from './Input';

export type DatePickerProps = {
  value?: Date;
  onChange?: (date?: Date) => void;
  errorFeedback?: string;
};

export function DatePicker({ value, onChange, errorFeedback }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <Input.Root>
          <Input.Input
            readOnly
            isFocused={isOpen}
            type="text"
            placeholder="Data de expiração"
            value={moment(value).format('DD/MM/YYYY') ?? ''}
          />

          {errorFeedback && <Input.ErrorFeedback>{errorFeedback}</Input.ErrorFeedback>}
        </Input.Root>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          sideOffset={5}
          align="start"
          className="z-40 min-w-40 rounded-md bg-gradient-to-br from-gray-950 to-gray-900 p-2 shadow-md backdrop-blur-sm"
        >
          <DayPicker
            mode="single"
            selected={value}
            onSelect={onChange ? (date) => onChange(date) : undefined}
            classNames={{
              months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
              month: 'space-y-4',
              caption: 'flex justify-center pt-1 relative items-center',
              caption_label: 'text-sm font-medium',
              nav: 'space-x-1 flex items-center',
              nav_button: 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
              nav_button_previous: 'absolute left-1',
              nav_button_next: 'absolute right-1',
              table: 'w-full border-collapse space-y-1',
              head_row: 'flex',
              head_cell: 'text-primary-300 rounded-md w-8 font-normal text-[0.8rem]',
              row: 'flex w-full mt-2',
              cell: 'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-primary-800/10 [&:has([aria-selected].day-outside)]:bg-primary-800/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected])]:rounded-md',
              day: 'h-8 w-8 p-0 font-normal aria-selected:opacity-100',
              day_selected: 'bg-primary-500/40 text-white font-semibold hover:bg-primary-800/80',
              day_today: 'text-blue-400',
              day_outside:
                'day-outside text-primary-300 opacity-50  aria-selected:bg-primary-800/50 aria-selected:text-primary-300 aria-selected:opacity-30',
              day_disabled: 'text-primary-300 opacity-50',
              day_range_middle: 'aria-selected:bg-primary-800/10 aria-selected:text-primary-800/10',
              day_hidden: 'invisible',
            }}
          />

          <Popover.Arrow className="fill-gray-950" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
