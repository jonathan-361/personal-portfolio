import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera, Save, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useUserStore } from "@/modules/core/store/user.store";
import { userService } from "@/modules/core/services/user-services/user.services";
import { getInitials } from "@/lib/getInitials";
import type { UpdateUserDto } from "@/modules/home/models/user.model";

interface EditProfileFormProps {
  onCancel: () => void;
}

export function EditProfileForm({ onCancel }: EditProfileFormProps) {
  const { user, setUser } = useUserStore();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserDto>({
    defaultValues: {
      names: user?.names || "",
      first_last_name: user?.first_last_name || "",
      second_last_name: user?.second_last_name || "",
    },
  });

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
    if (
      !regex.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Tab" &&
      e.key !== "Enter"
    ) {
      e.preventDefault();
    }
  };

  const onSubmit = async (data: UpdateUserDto) => {
    if (!user?.id) return;
    setLoading(true);

    const cleanData: UpdateUserDto = {
      names: (data.names ?? "").trim(),
      first_last_name: (data.first_last_name ?? "").trim(),
      second_last_name: (data.second_last_name ?? "").trim(),
    };

    try {
      const response = await userService.update(user.id, cleanData);
      setUser(response.user);
      toast.success("Perfil actualizado correctamente");
      onCancel();
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el perfil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-[#050505] border-blue-500/30 border-t-4 border-t-blue-500 overflow-hidden shadow-2xl relative">
      <div className="absolute inset-0 bg-[url('/textures/carbon-fibre.png')] opacity-10 pointer-events-none" />

      <CardHeader className="border-b border-gray-900 bg-blue-600/5 relative z-10">
        <CardTitle className="text-white text-xl font-bold flex items-center gap-2">
          Editar Información Personal
        </CardTitle>
      </CardHeader>

      <CardContent className="p-8 relative z-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col items-center mb-8">
            <div className="relative group">
              <Avatar className="w-32 h-32 rounded-2xl border-4 border-gray-900 shadow-2xl relative z-10">
                <AvatarImage
                  src={user?.profile_image_url || undefined}
                  className="object-cover"
                />
                <AvatarFallback className="bg-gradient-to-tr from-blue-600 to-indigo-500 text-white text-3xl font-black rounded-xl">
                  {user ? getInitials(user) : "?"}
                </AvatarFallback>
              </Avatar>
              <button
                type="button"
                className="absolute -bottom-2 -right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg z-20 transition-transform hover:scale-110 border-4 border-[#050505]"
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombres ocupando el ancho completo para mayor comodidad */}
            <div className="space-y-2 md:col-span-2">
              <Label className="text-gray-400 text-xs uppercase font-bold">
                Nombres
              </Label>
              <Input
                {...register("names", {
                  required: "El nombre es requerido",
                  pattern: {
                    value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/,
                    message: "No se permiten números ni caracteres especiales",
                  },
                })}
                onKeyDown={handleKeyPress}
                placeholder="Ej. Juan Andrés"
                className="bg-[#0a0a0a] border-gray-800 text-white focus:border-blue-500/50"
              />
              {errors.names && (
                <span className="text-red-500 text-xs">
                  {errors.names.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-gray-400 text-xs uppercase font-bold">
                Primer Apellido
              </Label>
              <Input
                {...register("first_last_name", {
                  required: "Requerido",
                  pattern: {
                    value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/,
                    message: "Solo se permiten letras",
                  },
                })}
                onKeyDown={handleKeyPress}
                className="bg-[#0a0a0a] border-gray-800 text-white focus:border-blue-500/50"
              />
              {errors.first_last_name && (
                <span className="text-red-500 text-xs">
                  {errors.first_last_name.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-gray-400 text-xs uppercase font-bold">
                Segundo Apellido
              </Label>
              <Input
                {...register("second_last_name", {
                  pattern: {
                    value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/,
                    message: "Solo se permiten letras",
                  },
                })}
                onKeyDown={handleKeyPress}
                className="bg-[#0a0a0a] border-gray-800 text-white focus:border-blue-500/50"
              />
              {errors.second_last_name && (
                <span className="text-red-500 text-xs">
                  {errors.second_last_name.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-900">
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4 mr-2" /> Cancelar
            </Button>
            <Button
              disabled={loading}
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Guardar Cambios
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
