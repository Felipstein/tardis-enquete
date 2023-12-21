export interface APIErrorResponse<T extends Error = Error> {
  name: string;
  message: string;
  statusCode: number;
  debug?: {
    stack: string;
    internalServerError?: T;
  };
}
