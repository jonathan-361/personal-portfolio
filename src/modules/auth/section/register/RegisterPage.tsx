import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import {
  registerSchema,
  type RegisterFormData,
} from "../../schemas/register.schema";
import { authService } from "@/modules/core/services/auth-services/auth.services";
import paths from "@/modules/core/routes/paths/path";
import image from "@/assets/register.jpg";
import { Button } from "@/components/ui/button";
import { AuthLayout } from "../../components/AuthLayout";
import FormField from "@/components/custom/FormField";
import Loading from "@/components/custom/Loading";
import { AUTH_THEME } from "@/modules/core/data/theme.modules";

function RegisterPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const theme = AUTH_THEME.register;

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
      toast.success("Cuenta creada exitosamente");
      navigate(paths.login);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error al registrar");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Registro de Usuario"
      contentPosition="right"
      imageUrl={image}
      variant="register"
    >
      {isLoading && <Loading isFullPage />}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-x-4 gap-y-5"
        noValidate
        autoComplete="off"
      >
        <div className="col-span-2">
          <FormField
            label="Nombre(s)"
            {...register("names")}
            error={errors.names?.message}
            className={theme.input}
            labelColor={theme.labelField}
            placeholder="Ej. Ricardo Pérez"
          />
        </div>

        <FormField
          label="Primer Apellido"
          {...register("first_last_name")}
          error={errors.first_last_name?.message}
          className={theme.input}
          labelColor={theme.labelField}
          placeholder="Apellido paterno"
        />
        <FormField
          label="Segundo Apellido"
          {...register("second_last_name")}
          error={errors.second_last_name?.message}
          className={theme.input}
          labelColor={theme.labelField}
          placeholder="Apellido materno"
        />

        <div className="col-span-2">
          <FormField
            label="Correo electrónico"
            type="email"
            {...register("email")}
            error={errors.email?.message}
            className={theme.input}
            labelColor={theme.labelField}
            placeholder="usuario@ejemplo.com"
          />
        </div>

        <FormField
          label="Contraseña"
          type="password"
          {...register("password")}
          error={errors.password?.message}
          className={theme.input}
          labelColor={theme.labelField}
          placeholder="••••••••"
        />
        <FormField
          label="Confirmar"
          type="password"
          {...register("repeat_password")}
          error={errors.repeat_password?.message}
          className={theme.input}
          labelColor={theme.labelField}
          placeholder="••••••••"
        />

        <Button
          type="submit"
          className={`w-full h-12 col-span-2 font-bold rounded-xl transition-all duration-300 mt-2 ${theme.button}`}
          disabled={isLoading}
        >
          Crear cuenta
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-800/50 text-center">
        <p className="text-sm text-gray-500">
          ¿Ya tienes una cuenta?{" "}
          <Link to={paths.login} className={`font-bold ${theme.link}`}>
            Inicia sesión
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export default RegisterPage;
