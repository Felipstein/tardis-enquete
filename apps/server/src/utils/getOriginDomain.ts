import { envParsed } from '../env';

export function origin() {
  const { ORIGINS } = envParsed();

  const origin = ORIGINS[0];

  const [protocol, domain] = origin.split('://');

  return { origin, protocol, domain };
}
