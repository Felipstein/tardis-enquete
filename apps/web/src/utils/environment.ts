export function environment(): 'client' | 'server' {
  if (typeof window !== 'undefined') {
    return 'client';
  }

  return 'server';
}
