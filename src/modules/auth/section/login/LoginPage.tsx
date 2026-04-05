import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/modules/core/context/AuthContext";
import {
  loginSchema,
  type LoginFormData,
} from "@/modules/auth/schemas/login_schema";
import { authService } from "@/modules/core/services/auth-services/auth.services";

import paths from "@/modules/core/routes/paths/path";
import { Button } from "@/components/ui/button";
import { AuthLayout } from "../../components/AuthLayout";
import FormField from "@/components/custom/FormField";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await authService.login(data);
      login(response.token);

      console.log(`Bienvenido ${response.user.names}`);
      navigate(paths.home);
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Credenciales incorrectas";
      alert(message);
    }
  };

  const emailField = register("email");
  const passwordField = register("password");

  return (
    <AuthLayout title="Iniciar sesión">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FormField
          label="Correo electrónico"
          type="email"
          placeholder="Escribe un correo"
          name={emailField.name}
          onChange={emailField.onChange}
          onBlur={emailField.onBlur}
          inputRef={emailField.ref}
          error={errors.email?.message}
        />

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

        <div>
          <p className="text-right text-primary hover:underline font-medium">
            <Link to={paths.changePassword}>¿Olvidaste tu contraseña?</Link>
          </p>
        </div>

        <Button type="submit" className="w-full h-10">
          Iniciar sesión
        </Button>
      </form>
      <div>
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
  );
}
