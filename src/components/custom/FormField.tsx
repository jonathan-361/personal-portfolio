import { useState, forwardRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Eye, EyeOff } from "lucide-react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  allowSpaces?: boolean;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      type,
      placeholder,
      error,
      inputRef,
      allowSpaces = true,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!allowSpaces && e.key === " ") {
        e.preventDefault();
      }

      if (onKeyDown) {
        onKeyDown(e);
      }
    };

    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium">{label}</Label>

        <div className="relative">
          <Input
            {...props}
            type={inputType}
            placeholder={placeholder}
            ref={ref || inputRef}
            onKeyDown={handleKeyDown}
            className={`bg-slate-50 border-input/70 focus:border-primary pr-10 ${
              error ? "border-red-500 focus:ring-red-500" : ""
            }`}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
        </div>

        {error && (
          <p className="text-red-500 text-xs font-medium leading-tight animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  },
);

FormField.displayName = "FormField";

export default FormField;
