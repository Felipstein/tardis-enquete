import { MoreHorizontal } from 'lucide-react';

export function PollOptions() {
  return (
    <div className="group/item absolute -top-2.5 right-0">
      <button
        type="button"
        className="opacity-0 transition-opacity group-hover/item:opacity-80 group-hover/poll:opacity-40"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
    </div>
  );
}
