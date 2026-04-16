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
import paths from "@/modules/core/routes/paths/path";
import { Button } from "@/components/ui/button";
import { AuthLayout } from "@/modules/auth/components/AuthLayout";
import FormField from "@/components/custom/FormField";
import Loading from "@/components/custom/Loading";
import { useUserStore } from "@/modules/core/store/user.store";
import { getFirstNameLastName } from "@/lib/getFirstNameLastName";
import { AUTH_THEME } from "@/modules/core/data/theme.modules";
import image from "@/assets/login.jpg";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const theme = AUTH_THEME.login;

  const {
    register,
    handleSubmit,
    formState: { errors },
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
      toast.success(`¡Bienvenido, ${getFirstNameLastName(response.user)}!`, {
        id: toastId,
      });
      navigate(response.user.role === "ADMIN" ? paths.adminHome : paths.home);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error al iniciar sesión", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AuthLayout title="Iniciar Sesión" imageUrl={image} variant="login">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            label="Correo electrónico"
            type="email"
            placeholder="usuario@ejemplo.com"
            {...register("email")}
            error={errors.email?.message}
            className={theme.input}
            labelColor={theme.labelField}
          />

          <div className="space-y-2">
            <FormField
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              error={errors.password?.message}
              className={theme.input}
              labelColor={theme.labelField}
            />
            <div className="flex justify-end">
              <Link
                to={paths.changePassword}
                className={`text-xs font-semibold hover:underline ${theme.link}`}
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            className={`w-full h-12 text-white font-bold rounded-xl transition-all duration-300 ${theme.button}`}
            disabled={isLoading}
          >
            Ingresar
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-800/50 text-center">
          <p className="text-sm text-gray-500">
            ¿No tienes cuenta?{" "}
            <Link to={paths.register} className={`font-bold ${theme.link}`}>
              Regístrate
            </Link>
          </p>
        </div>
      </AuthLayout>
      {isLoading && <Loading isFullPage />}
    </>
  );
}
