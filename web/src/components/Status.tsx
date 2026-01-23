export default function StatsBar({ total, today }: { total: number, today: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 my-8">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-3xl font-bold text-blue-600">{total}</h3>
        <p className="text-sm font-medium text-slate-500">Vagas Rastreadas</p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-3xl font-bold text-emerald-500">+{today}</h3>
        <p className="text-sm font-medium text-slate-500">Novas Hoje</p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-3xl font-bold text-amber-500">24/7</h3>
        <p className="text-sm font-medium text-slate-500">Monitoramento Ativo</p>
      </div>
    </div>
  );
}