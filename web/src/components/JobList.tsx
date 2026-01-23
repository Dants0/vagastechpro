'use client'

import { useState } from 'react';
import { fetchJobs } from '@/app/actions';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';


export default function JobList({ initialJobs, availableOrigins }: JobListProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filtering, setFiltering] = useState(false); // Estado para loading do filtro

  // Filtros
  const [search, setSearch] = useState('');
  const [origin, setOrigin] = useState('todos');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setFiltering(true);
    // Reinicia paginação ao buscar
    const data = await fetchJobs(1, search, origin);
    setJobs(data.jobs);
    setHasMore(data.hasMore);
    setPage(1);
    setFiltering(false);
  };

  const loadMore = async () => {
    setLoading(true);
    const nextPage = page + 1;
    const data = await fetchJobs(nextPage, search, origin);

    // Adiciona os novos jobs à lista existente
    setJobs([...jobs, ...data.jobs]);
    setHasMore(data.hasMore);
    setPage(nextPage);
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Área de Filtros Responsiva */}
      <div className="rounded-xl bg-white p-4 shadow-sm border border-slate-100">
        <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-2.5 text-slate-400">🔍</span>
            <input
              className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              placeholder="Buscar por cargo, tecnologia..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          >
            <option value="todos">Todas as fontes</option>
            {availableOrigins.map(org => (
              <option key={org} value={org}>{org}</option>
            ))}
          </select>

          <button
            type="submit"
            disabled={filtering}
            className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {filtering ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                Filtrando...
              </>
            ) : 'Filtrar'}
          </button>
        </form>
      </div>

      {/* Grid de Vagas Responsivo */}
      {/* Skeleton Loading State (Se estiver filtrando) */}
      {filtering ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-40 rounded-xl bg-slate-100 animate-pulse border border-slate-200"></div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <a
              key={job.id}
              href={job.link}
              target="_blank"
              className="group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-md dark:bg-slate-900 dark:border-slate-800 dark:hover:border-blue-500/50"
            >
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 border border-blue-100 dark:bg-slate-800 dark:text-blue-300 dark:border-slate-700">
                    {job.origin}
                  </span>
                  <span className="text-xs font-medium text-slate-400 group-hover:text-blue-500 transition-colors">
                    {formatDistanceToNow(new Date(job.createdAt), { locale: ptBR, addSuffix: true })}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 dark:text-slate-100 dark:group-hover:text-blue-400">
                  {job.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-slate-500 flex items-center gap-1 dark:text-slate-400">
                  🏢 {job.company}
                </p>
              </div>

              <div className="mt-4 flex items-center text-sm font-semibold text-blue-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-blue-400">
                Ver vaga
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!filtering && jobs.length === 0 && (
        <div className="text-center py-12 rounded-xl border-2 border-dashed border-slate-200">
          <p className="text-4xl mb-2">😕</p>
          <p className="text-slate-500 font-medium">Nenhuma vaga encontrada com esses filtros.</p>
          <button
            onClick={() => { setSearch(''); setOrigin('todos'); handleSearch({ preventDefault: () => { } } as any); }}
            className="mt-4 text-sm text-blue-600 hover:underline"
          >
            Limpar filtros
          </button>
        </div>
      )}

      {/* Botão Carregar Mais */}
      {hasMore && !filtering && jobs.length > 0 && (
        <button
          onClick={loadMore}
          disabled={loading}
          className="w-full rounded-xl border border-blue-600 bg-white py-3 text-sm font-bold text-blue-600 transition-all hover:bg-blue-50 active:scale-[0.99] disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></span>
              Carregando...
            </span>
          ) : 'Carregar mais vagas 👇'}
        </button>
      )}

      {!hasMore && jobs.length > 0 && (
        <p className="text-center text-sm text-slate-400 py-6 border-t border-slate-100 mt-8">
          🎉 Você viu todas as vagas recentes!
        </p>
      )}
    </div>
  );
}