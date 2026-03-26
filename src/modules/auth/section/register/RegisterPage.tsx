

import { useState } from "react";
import { AuthLayout } from "@/modules/auth/components/AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField = ({ label, name, type, placeholder, value, onChange }: FormFieldProps) => (
  <div className="space-y-2">
    <Label htmlFor={name} className="text-sm font-medium">{label}</Label>
    <Input id={name} name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} required className="bg-background/50 border-input/30 focus:border-primary" />
  </div>
);

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

//Evita que el formulario recargue la página//
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //esto se mnuestra en la consola//
    console.log("Datos de registro:", formData);
  };

  return (
    <AuthLayout title="Crear Cuenta" backgroundColor="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
      <form onSubmit={handleSubmit} className="space-y-5">

        <FormField label="Nombre Completo" name="name" type="text" placeholder="Tu nombre aquí" value={formData.name} onChange={handleChange} />

        <FormField label="Correo Electrónico" name="email" type="email" placeholder="tu@gmail.com" value={formData.email} onChange={handleChange} />

        <FormField label="Contraseña" name="password" type="password" placeholder="Crea una contraseña segura" value={formData.password} onChange={handleChange} />

        <Button type="submit" className="w-full h-10 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 font-semibold shadow-lg mt-6">Registrarse</Button>
        
        <p className="text-center text-sm text-muted-foreground">¿Ya tienes cuenta? <a href="/login" className="text-primary hover:underline font-medium">Inicia sesión</a></p>
      </form>
    </AuthLayout>
  );
}
