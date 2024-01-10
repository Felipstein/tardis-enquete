export interface Poll {
  id: string;
  title: string;
  description: string | null;
  options: Array<{
    id: string;
    text: string;
  }>;
}
