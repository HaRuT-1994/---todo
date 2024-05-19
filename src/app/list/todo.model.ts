export interface TODO {
  title: string;
  expirationDate: Date | string;
  created: string;
  timeLeft?: string;
  favourite?: boolean;
}