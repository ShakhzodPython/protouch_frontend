export type InputPropsType = {
  type: string;
  value: string;
  error?: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
