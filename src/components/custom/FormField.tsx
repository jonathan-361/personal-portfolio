import { useState } from "react"; // 1. Importar useState
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Eye, EyeOff } from "lucide-react"; // 2. Importar iconos

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
  // 3. Estado para mostrar/ocultar contraseña
  const [showPassword, setShowPassword] = useState(false);

  // 4. Determinar el tipo de input dinámicamente
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="relative">
        {" "}
        {/* Contenedor relativo para posicionar el icono */}
        <Input
          type={inputType} // Usamos el tipo dinámico
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          onBlur={onBlur}
          ref={inputRef}
          required
          className="bg-background/50 border-input/30 focus:border-primary pr-10" // pr-10 para que el texto no pise el icono
        />
        {/* 5. Mostrar el botón solo si el tipo original era password */}
        {isPassword && (
          <button
            type="button" // IMPORTANTE: type="button" para que no haga submit al formulario
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-xs leading-tight">{error}</p>}
    </div>
  );
}
