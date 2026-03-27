import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { AuthLayout } from "@/modules/auth/components/AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import paths from "@/modules/core/routes/paths/path";

import EyeVisibility from "@/assets/svg/eye_visibility.svg?react";
import EyeVisibilityOff from "@/assets/svg/eye_visibility_off.svg?react";

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const FormField = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  error,
}: FormFieldProps) => (
  <div className="space-y-2">
    <Label htmlFor={name} className="text-sm font-medium">
      {label}
    </Label>
    <Input
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      className={`bg-background/50 focus:border-primary ${
        error ? "border-destructive" : "border-input/30"
      }`}
    />
    {error && <p className="text-xs text-destructive">{error}</p>}
  </div>
);

interface FormData {
  first_name: string;
  last_name: string;
  second_last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  first_name?: string;
  last_name?: string;
  second_last_name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    second_last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.first_name.trim())
      newErrors.first_name = "El nombre es requerido";
    if (!formData.last_name.trim())
      newErrors.last_name = "El apellido paterno es requerido";

    if (!formData.email.trim()) {
      newErrors.email = "El correo es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingresa un correo válido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 8) {
      newErrors.password = "Mínimo 8 caracteres";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirma tu contraseña";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const { confirmPassword, ...payload } = formData;
    console.log("Payload para POST /api/auth/register:", payload);

    navigate(paths.login);
  };

  return (
    <AuthLayout
      title="Crear Cuenta"
      backgroundColor="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950"
      contentPosition="right"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre */}
        <FormField
          label="Nombre(s)"
          name="first_name"
          type="text"
          placeholder="Ana"
          value={formData.first_name}
          onChange={handleChange}
          error={errors.first_name}
        />

        {/* Apellidos */}
        <div className="grid grid-cols-2 gap-3">
          <FormField
            label="Apellido paterno"
            name="last_name"
            type="text"
            placeholder="Navarrete"
            value={formData.last_name}
            onChange={handleChange}
            error={errors.last_name}
          />
          <FormField
            label="Apellido materno"
            name="second_last_name"
            type="text"
            placeholder="López"
            value={formData.second_last_name}
            onChange={handleChange}
            error={errors.second_last_name}
          />
        </div>

        {/* Correo */}
        <FormField
          label="Correo electrónico"
          name="email"
          type="email"
          placeholder="tu@correo.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        {/* Contraseñas con íconos */}
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <FormField
              label="Contraseña"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Mínimo 8 caracteres"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="absolute right-2 top-9.5 p-0.5 flex items-center justify-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeVisibilityOff className="w-5 h-5 text-gray-800" />
              ) : (
                <EyeVisibility className="w-5 h-5 text-gray-800" />
              )}
            </Button>
          </div>

          <div className="relative">
            <FormField
              label="Confirmar contraseña"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Repite tu contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="absolute right-2 top-9.5 p-0.5 flex items-center justify-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeVisibilityOff className="w-5 h-5 text-gray-800" />
              ) : (
                <EyeVisibility className="w-5 h-5 text-gray-800" />
              )}
            </Button>
          </div>
        </div>

        <Button type="submit" className="w-full h-10 mt-2">
          Crear cuenta
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          ¿Ya tienes cuenta?{" "}
          <Link
            to={paths.login}
            className="text-primary hover:underline font-medium"
          >
            Inicia sesión
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
