import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface FormFieldProps {
  label: string;
  type: string;
  placeholder: string;
  value?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  inputRef?: React.Ref<HTMLInputElement>;
}

export default function FormField({
  label,
  type,
  placeholder,
  value,
  error,
  onChange,
  name,
  onBlur,
  inputRef,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        onBlur={onBlur}
        ref={inputRef}
        required
        className="bg-background/50 border-input/30 focus:border-primary"
      />
      {error && <p className="text-red-500 text-xs leading-tight">{error}</p>}
    </div>
  );
}
