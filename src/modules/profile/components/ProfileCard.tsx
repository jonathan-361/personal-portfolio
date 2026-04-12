import { useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { InfoItem } from "@/modules/profile/components/InfoItem";
import {
  Edit2,
  Mail,
  Calendar,
  User as UserIcon,
  ShieldCheck,
} from "lucide-react";
import type { User } from "@/modules/home/models/user.model";
import { STATS_THEME } from "@/modules/core/data/theme.modules";
import paths from "@/modules/core/routes/paths/path";
import { getInitials } from "@/lib/getInitials";
import { formatDate } from "@/lib/formatters";
import { getFullName } from "@/lib/getFullName";
import { DeleteAccountDialog } from "@/modules/profile/components/DeleteAccountDialog";

interface ProfileCardProps {
  user: User;
  onEditClick?: () => void;
}

export function ProfileCard({ user }: ProfileCardProps) {
  const navigate = useNavigate();
  const theme = STATS_THEME.tasks;

  const fullName = getFullName(
    user.names,
    user.first_last_name,
    user.second_last_name,
  );

  const memberSince = user.created_at
    ? formatDate(user.created_at)
    : "No disponible";

  const goEditProfile = () => {
    navigate(paths.editProfile);
  };

  return (
    <Card
      className={`relative bg-[#050505] overflow-hidden shadow-2xl transition-all duration-300
        /* Contorno azul llamativo general */
        border border-blue-500/30 
        /* Doble contorno arriba: el border-t-2 y un shadow interno que simula otra línea */
        ${theme.border} border-t-4 
        shadow-[inset_0_1px_0_0_rgba(59,130,246,0.5)]`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.03] via-transparent to-indigo-600/[0.03] pointer-events-none" />
      <div className="relative h-32 w-full">
        <div
          className={`absolute inset-0 bg-gradient-to-b from-blue-600/20 ${theme.gradient} to-transparent`}
        />
        <div className="absolute inset-0 bg-[url('/textures/carbon-fibre.png')] opacity-30" />

        <Button
          variant="ghost"
          size="sm"
          onClick={goEditProfile}
          className="absolute top-4 right-4 gap-2 text-gray-400 hover:text-white hover:bg-gray-900/50 border border-white/10 transition-all backdrop-blur-sm z-10"
        >
          <Edit2 className="w-3.5 h-3.5" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Editar
          </span>
        </Button>
      </div>

      <CardContent className="px-8 pb-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-12 mb-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-blue-500/20 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition duration-500" />

            <Avatar className="w-32 h-32 rounded-2xl border-4 border-[#050505] shadow-2xl relative z-10">
              <AvatarImage
                src={user.profile_image_url || undefined}
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-tr from-blue-600 to-indigo-500 text-white text-3xl font-black rounded-xl">
                {getInitials(user)}
              </AvatarFallback>
            </Avatar>
            <div
              className={`absolute -bottom-1 -right-1 w-6 h-6 ${theme.bg} border-4 border-[#050505] rounded-full shadow-lg z-20`}
            />
          </div>

          <div className="flex-1 text-center md:text-left space-y-2">
            <h2 className="text-2xl font-black tracking-tighter text-white">
              {fullName}
            </h2>
            <p className="text-gray-500 text-sm font-medium flex items-center justify-center md:justify-start gap-2">
              <Mail className={`w-4 h-4 ${theme.color}`} />
              {user.email}
            </p>
          </div>
        </div>

        {/* Información Detallada */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem
            icon={UserIcon}
            label="Nombre Completo"
            value={fullName}
            colorClass={theme.color}
          />
          <InfoItem
            icon={Mail}
            label="Correo Electrónico"
            value={user.email}
            colorClass={theme.color}
          />
          <InfoItem
            icon={Calendar}
            label="Miembro desde"
            subValue={memberSince}
            colorClass={theme.color}
          />
          <InfoItem
            icon={ShieldCheck}
            label="Estado de cuenta"
            value="Activa / Verificada"
            colorClass="text-blue-400"
          />
        </div>
      </CardContent>
      <div className="px-8 pb-8 mt-4 relative z-10">
        <div className="pt-6 border-t border-gray-900/50 flex justify-center md:justify-end">
          <DeleteAccountDialog />
        </div>
      </div>
    </Card>
  );
}
