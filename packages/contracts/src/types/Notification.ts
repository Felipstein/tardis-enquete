export interface Notification {
  title?: string;
  description?: string;
  content?: {
    urlToRedirect?: string;
    buttonLabel?: string;
  };
  forUsers: {
    common: boolean;
    admin: boolean;
    developer: boolean;
  };
}
