<<<<<<< HEAD
=======
import { useForm } from "react-hook-form";
>>>>>>> 1c63bba4a1bf91dd72bd2f1e2cad474037f51b62
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";

import {
  registerSchema,
  type RegisterFormData,
} from "../../schemas/register_schema";
import { authService } from "@/modules/core/services/auth-services/auth.services";

import paths from "@/modules/core/routes/paths/path";
import { Button } from "@/components/ui/button";
import FormField from "@/components/custom/FormField";
import { AuthLayout } from "../../components/AuthLayout";

function RegisterPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await authService.register(data);
      console.log("Registro exitoso:", response);
      navigate(paths.login);
    } catch (error: any) {
      console.error("Error en el registro:", {
        status: error.response?.status,
        message: error.response?.data?.message || "Error desconocido",
      });
    }
  };

  const namesField = register("names");
  const firstLastnameField = register("first_lastname");
  const secondLastnameField = register("second_lastname");
  const emailField = register("email");
  const passwordField = register("password");
  const repeatPasswordField = register("repeat_password");

  return (
    <AuthLayout title="Crea tu cuenta" contentPosition="right">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
        noValidate
      >
        <div className="col-span-2">
          <FormField
            label="Nombre(s)"
            type="text"
            placeholder="Escribe tu nombre"
            name={namesField.name}
            onChange={namesField.onChange}
            onBlur={namesField.onBlur}
            inputRef={namesField.ref}
            error={errors.names?.message}
          />
        </div>
        <div>
          <FormField
            label="Apellido paterno"
            type="text"
            placeholder="Escribe tu primer apellido"
            name={firstLastnameField.name}
            onChange={firstLastnameField.onChange}
            onBlur={firstLastnameField.onBlur}
            inputRef={firstLastnameField.ref}
            error={errors.first_lastname?.message}
          />
        </div>
        <div>
          <FormField
            label="Apellido materno"
            type="text"
            placeholder="Escribe tu segundo apellido"
            name={secondLastnameField.name}
            onChange={secondLastnameField.onChange}
            onBlur={secondLastnameField.onBlur}
            inputRef={secondLastnameField.ref}
            error={errors.second_lastname?.message}
          />
        </div>
        <div className="col-span-2">
          <FormField
            label="Correo electrónico"
            type="email"
            placeholder="Escribe tu correo"
            name={emailField.name}
            onChange={emailField.onChange}
            onBlur={emailField.onBlur}
            inputRef={emailField.ref}
            error={errors.email?.message}
          />
        </div>
        <div>
          <FormField
            label="Contraseña"
            type="password"
            placeholder="Escribe tu contraseña"
            name={passwordField.name}
            onChange={passwordField.onChange}
            onBlur={passwordField.onBlur}
            inputRef={passwordField.ref}
            error={errors.password?.message}
          />
        </div>
        <div>
          <FormField
            label="Confirmar contraseña"
            type="password"
            placeholder="Repite tu contraseña"
            name={repeatPasswordField.name}
            onChange={repeatPasswordField.onChange}
            onBlur={repeatPasswordField.onBlur}
            inputRef={repeatPasswordField.ref}
            error={errors.repeat_password?.message}
          />
        </div>

<<<<<<< HEAD
        <FormField label="Nombre Completo" name="name" type="text" placeholder="Tu nombre aquí" value={formData.name} onChange={handleChange} />

        <FormField label="Correo Electrónico" name="email" type="email" placeholder="tu@gmail.com" value={formData.email} onChange={handleChange} />

        <FormField label="Contraseña" name="password" type="password" placeholder="Crea una contraseña segura" value={formData.password} onChange={handleChange} />

        <Button type="submit" className="w-full h-10 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 font-semibold shadow-lg mt-6">Registrarse</Button>

        <p className="text-center text-sm text-muted-foreground">¿Ya tienes cuenta? <a href="/login" className="text-primary hover:underline font-medium">Inicia sesión</a></p>
=======
        <Button type="submit" className="w-full h-10 col-span-2">
          Crear cuenta
        </Button>
>>>>>>> 1c63bba4a1bf91dd72bd2f1e2cad474037f51b62
      </form>
      <div>
        <p className="text-center text-sm text-muted-foreground">
          ¿Ya tienes cuenta?{" "}
          <Link
            to={paths.login}
            className="text-primary hover:underline font-medium"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export default RegisterPage;
