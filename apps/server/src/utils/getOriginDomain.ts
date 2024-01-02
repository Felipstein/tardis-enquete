export function origin() {
  const origin = process.env.ORIGIN;

  const [protocol, domain] = origin.split('://');

  return { origin, protocol, domain };
}
