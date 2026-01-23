'use client'

import { useState } from 'react';
import { fetchJobs } from '@/app/actions';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Job = {
  id: string; title: string; company: string; 
  link: string; origin: string; createdAt: Date;
};

interface JobListProps {
  initialJobs: Job[];
  availableOrigins: string[];
}

export default function JobList({ initialJobs, availableOrigins }: JobListProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  
  // Filtros
  const [search, setSearch] = useState('');
  const [origin, setOrigin] = useState('todos');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Reinicia paginação ao buscar
    const data = await fetchJobs(1, search, origin);
    setJobs(data.jobs);
    setHasMore(data.hasMore);
    setPage(1);
    setLoading(false);
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
    <div className="space-y-6">
      {/* Área de Filtros */}
      <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row">
        <input 
          className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="🔍 Buscar (ex: React, Junior)..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        <select 
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
          disabled={loading}
          className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? '...' : 'Filtrar'}
        </button>
      </form>

      {/* Grid de Vagas */}
      <div className="grid gap-4">
        {jobs.map((job) => (
          <a 
            key={job.id} 
            href={job.link} 
            target="_blank" 
            className="group relative block rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
                {job.origin}
              </span>
              <span className="text-xs text-slate-400 group-hover:text-blue-500">
                {formatDistanceToNow(new Date(job.createdAt), { locale: ptBR, addSuffix: true })}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600">
              {job.title}
            </h3>
            <p className="mt-1 text-sm text-slate-500">🏢 {job.company}</p>
          </a>
        ))}
      </div>

      {/* Botão Carregar Mais */}
      {hasMore && (
        <button 
          onClick={loadMore} 
          disabled={loading}
          className="w-full rounded-lg border border-blue-600 py-3 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50 disabled:opacity-50"
        >
          {loading ? 'Carregando...' : 'Carregar mais vagas 👇'}
        </button>
      )}
      
      {!hasMore && jobs.length > 0 && (
        <p className="text-center text-sm text-slate-400 py-4">
          🎉 Você viu todas as vagas recentes!
        </p>
      )}
    </div>
  );
}