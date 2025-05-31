export type InputProps = {
  label: string;
  name: string;
  value: string;
  required?: boolean;
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
