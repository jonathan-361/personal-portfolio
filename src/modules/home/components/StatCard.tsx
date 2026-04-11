import { Card, CardContent } from "@/components/ui/card";
import { STATS_THEME } from "@/modules/core/data/theme.modules";

interface StatCardProps {
  title: string;
  value: number;
  subtitle?: string;
  type: keyof typeof STATS_THEME;
}

export function StatCard({ title, value, subtitle, type }: StatCardProps) {
  const theme = STATS_THEME[type];
  const Icon = theme.icon;

  return (
    <Card
      className={`
      relative overflow-hidden 
      bg-gradient-to-br from-gray-900/40 ${theme.gradient} 
      border-gray-800 border-t-4 ${theme.border} 
      transition-all duration-300 hover:scale-[1.02] hover:bg-gray-800/40
    `}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">
              {title}
            </p>
            <h2 className="text-4xl font-bold text-white tracking-tight">
              {value}
            </h2>
            {subtitle && (
              <p className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${theme.bg}`} />
                {subtitle}
              </p>
            )}
          </div>

          <div
            className={`p-3 rounded-xl bg-black/40 border border-white/5 ${theme.color}`}
          >
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
