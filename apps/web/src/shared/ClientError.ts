export default class ClientError extends Error {
  name = 'ClientError';

  constructor(message: string, debugMessage = message) {
    super(process.env.NODE_ENV === 'development' ? debugMessage : message);
  }
}
