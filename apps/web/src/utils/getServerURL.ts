export function getServerURL() {
  const serverURL = process.env.NEXT_PUBLIC_API_URL;

  if (!serverURL) {
    throw new Error(
      process.env.NODE_ENV === 'production'
        ? 'Há problemas internos no seu cliente, por favor, entre em contato com o suporte'
        : 'NEXT_PUBLIC_API_URL not set',
    );
  }

  return serverURL;
}
