import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "@/modules/core/context/AuthContext";
import {
  loginSchema,
  type LoginFormData,
} from "@/modules/auth/schemas/login.schema";
import { authService } from "@/modules/core/services/auth-services/auth.services";
import { getErrorMessage } from "@/modules/core/error/handle.error";
import paths from "@/modules/core/routes/paths/path";
import { Button } from "@/components/ui/button";
import { AuthLayout } from "@/modules/auth/components/AuthLayout";
import FormField from "@/components/custom/FormField";
import Loading from "@/components/custom/Loading";
import { useUserStore } from "@/modules/core/store/user.store";
import { getFirstNameLastName } from "@/lib/getFirstNameLastName";
import image from "@/assets/login.jpg";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    const toastId = toast.loading("Verificando credenciales...");

    try {
      const response = await authService.login(data);
      login(response.token, response.user);
      setUser(response.user);
      const userName = getFirstNameLastName(response.user);
      toast.success(`¡Bienvenido, ${userName}!`, { id: toastId });
      const redirectPath =
        response.user.role === "ADMIN" ? paths.adminHome : paths.home;
      navigate(redirectPath, { replace: true });
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AuthLayout title="Iniciar sesión" imageUrl={image}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
          autoComplete="off"
        >
          <FormField
            label="Correo electrónico"
            type="email"
            placeholder="Escribe un correo"
            {...register("email")}
            error={errors.email?.message}
          />

          <FormField
            label="Contraseña"
            type="password"
            placeholder="Escribe tu contraseña"
            {...register("password")}
            error={
              touchedFields.password ? errors.password?.message : undefined
            }
          />

          <p className="text-right text-primary hover:underline font-medium text-sm">
            <Link to={paths.changePassword}>¿Olvidaste tu contraseña?</Link>
          </p>

          <Button type="submit" className="w-full h-10" disabled={isLoading}>
            {isLoading ? "Cargando..." : "Iniciar sesión"}
          </Button>
        </form>

        <div className="mt-4">
          <p className="text-center text-sm text-muted-foreground">
            ¿No tienes cuenta?{" "}
            <Link
              to={paths.register}
              className="text-primary hover:underline font-medium"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </AuthLayout>
      {isLoading && <Loading />}
    </>
  );
}
