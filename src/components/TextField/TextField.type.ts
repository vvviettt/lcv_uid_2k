export interface TextFieldProps {
  isHidden?: boolean;
  onTextChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  height?: number;
}
