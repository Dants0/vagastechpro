export default function StatsBar({ total, today }: { total: number, today: number }) {
  // Classe base comum para os cards para facilitar
  const cardClass = "rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800";
  const labelClass = "text-sm font-medium text-slate-500 dark:text-slate-400";

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 my-8">
      <div className={cardClass}>
        <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">{total}</h3>
        <p className={labelClass}>Vagas Rastreadas</p>
      </div>
      <div className={cardClass}>
        <h3 className="text-3xl font-bold text-emerald-500 dark:text-emerald-400">+{today}</h3>
        <p className={labelClass}>Novas Hoje</p>
      </div>
      <div className={cardClass}>
        <h3 className="text-3xl font-bold text-amber-500 dark:text-amber-400">24/7</h3>
        <p className={labelClass}>Monitoramento Ativo</p>
      </div>
    </div>
  );
}