import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { AuthLayout } from "../../components/AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import paths from "@/modules/core/routes/paths/path";

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
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
      className="bg-background/50 border-input/30 focus:border-primary"
    />
  </div>
);

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos de login:", formData);
    navigate(paths.home);
  };

  return (
    <AuthLayout title="Iniciar sesión" contentPosition="left">
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormField
          label="Correo Electrónico"
          name="email"
          type="email"
          placeholder="tu@gmail.com"
          value={formData.email}
          onChange={handleChange}
        />

        <FormField
          label="Contraseña"
          name="password"
          type="password"
          placeholder="Ingresa tu contraseña"
          value={formData.password}
          onChange={handleChange}
        />

        <Button type="submit" className="w-full h-10 mt-6">
          Iniciar sesión
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          ¿No tienes cuenta?{" "}
          <Link
            to={paths.register}
            className="text-primary hover:underline font-medium"
          >
            Regístrate
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
