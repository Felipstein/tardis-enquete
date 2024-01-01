'use client';

import { Slot } from '@radix-ui/react-slot';
import { ReactNode, useEffect, useRef } from 'react';

export type HeaderContainerProps = {
  children?: ReactNode;
};

export function HeaderContainer({ children }: HeaderContainerProps) {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      if (headerRef.current) {
        if (window.scrollY > 0) {
          headerRef.current.classList.add('shadow');
        } else {
          headerRef.current.classList.remove('shadow');
        }
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const headerHeight = headerRef.current?.getBoundingClientRect().height || 92;

  return (
    <>
      <div className="w-full" style={{ height: `${headerHeight}px` }} />

      <header ref={headerRef} className="fixed top-0 z-20 w-full overflow-hidden backdrop-blur-sm">
        <div className="absolute inset-0 h-screen bg-app-background opacity-80" />

        <Slot className="relative z-30">{children}</Slot>
      </header>
    </>
  );
}
