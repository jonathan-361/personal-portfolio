export function InfoItem({
  icon: Icon,
  label,
  value,
  subValue,
  colorClass,
}: any) {
  return (
    <div className="bg-[#0a0a0a] border border-gray-900 p-3 sm:p-4 rounded-xl flex items-center gap-3 sm:gap-4 group hover:border-gray-700 transition-colors min-w-0">
      <div className="p-2 sm:p-2.5 rounded-lg bg-black border border-gray-800 group-hover:scale-110 transition-transform shrink-0">
        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${colorClass}`} />
      </div>
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 truncate">
          {label}
        </span>
        <span className="text-xs sm:text-sm font-bold text-gray-200 truncate">
          {value || subValue}
        </span>
      </div>
    </div>
  );
}
