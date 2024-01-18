'use client';

import { ReactNode, useState } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { Grip, ChevronDown } from 'lucide-react';
import { w } from '@/utils/w';

export type ExpandPopupProps = {
  title: string;
  className?: string;
  children: ReactNode;
};

export function ExpandPopup({ title, className, children }: ExpandPopupProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const dragControls = useDragControls();

  return (
    <motion.div
      drag
      dragListener={false}
      dragMomentum={false}
      dragControls={dragControls}
      className={w(
        'fixed z-50 max-w-2xl rounded-md border border-primary-700 bg-gradient-to-br from-slate-900 to-slate-800 px-5 py-3 shadow-md',
        className,
      )}
    >
      <header className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-primary-50">{title}</h1>

        <div className="flex items-center gap-3.5">
          <div
            className="cursor-grab touch-none p-1 text-primary-300 transition-colors hover:text-primary-100"
            onPointerDown={(event) => dragControls.start(event)}
          >
            <Grip className="h-4 w-4" />
          </div>

          <button
            type="button"
            className="p-1 text-primary-300 transition-colors hover:text-primary-100"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <ChevronDown
              data-expanded={isExpanded}
              className="h-4 w-4 transition-transform data-[expanded=false]:rotate-180"
            />
          </button>
        </div>
      </header>

      <motion.div
        animate={isExpanded ? 'expanded' : 'collapsed'}
        variants={{ expanded: { height: 'auto' }, collapsed: { height: 0 } }}
        className="overflow-hidden"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
