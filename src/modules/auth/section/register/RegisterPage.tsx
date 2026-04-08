import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

import {
  registerSchema,
  type RegisterFormData,
} from "../../schemas/register_schema";
import { authService } from "@/modules/core/services/auth-services/auth.services";
import paths from "@/modules/core/routes/paths/path";

import { Button } from "@/components/ui/button";
import { AuthLayout } from "../../components/AuthLayout";
import FormField from "@/components/custom/FormField";
import Loading from "@/components/custom/Loading";

function RegisterPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await authService.register(data);
      toast.success("Registro exitoso");
      navigate(paths.login);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Crea tu cuenta" contentPosition="right">
      {isLoading && <Loading />}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
        noValidate
      >
        <div className="col-span-2">
          <FormField
            label="Nombre(s)"
            type="text"
            {...register("names")}
            error={errors.names?.message}
          />
        </div>
        <FormField
          label="Apellido paterno"
          {...register("first_lastname")}
          error={errors.first_lastname?.message}
        />
        <FormField
          label="Apellido materno"
          {...register("second_lastname")}
          error={errors.second_lastname?.message}
        />
        <div className="col-span-2">
          <FormField
            label="Correo electrónico"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />
        </div>
        <FormField
          label="Contraseña"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />
        <FormField
          label="Confirmar contraseña"
          type="password"
          {...register("repeat_password")}
          error={errors.repeat_password?.message}
        />

        <Button
          type="submit"
          className="w-full h-10 col-span-2"
          disabled={isLoading}
        >
          Crear cuenta
        </Button>
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
