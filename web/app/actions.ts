'use server'

import { prisma } from '../../src/lib/prismaClient'; // Ajuste o import conforme sua estrutura

const PAGE_SIZE = 20;

export async function searchJobs(formData: FormData) {
  const query = formData.get('query')?.toString() || '';
  
  // Busca no banco (Server-Side)
  const jobs = await prisma.job.findMany({
    where: {
      OR: [
        { title: { contains: query } }, // SQLite não suporta mode: 'insensitive' nativo facilmente, mas vamos tentar
        { company: { contains: query } }
      ]
    },
    orderBy: { createdAt: 'desc' },
    take: 20,
  });

  return jobs;
}

export async function fetchJobs(page: number = 1, search: string = '', origin: string = '') {
  // Constrói o filtro dinamicamente
  const where: any = {};
  
  if (search) {
    where.OR = [
      { title: { contains: search } }, // SQLite é case-sensitive por padrão, mas ok por agora
      { company: { contains: search } }
    ];
  }
  
  if (origin && origin !== 'todos') {
    where.origin = origin;
  }

  const jobs = await prisma.job.findMany({
    where,
    take: PAGE_SIZE,
    skip: (page - 1) * PAGE_SIZE,
    orderBy: { createdAt: 'desc' },
  });

  // Retorna também se tem mais páginas (para o botão "Carregar Mais")
  const totalCount = await prisma.job.count({ where });
  const hasMore = (page * PAGE_SIZE) < totalCount;

  return { jobs, hasMore };
}

export async function getSystemStats() {
  const totalJobs = await prisma.job.count();
  
  // Pega estatísticas de hoje
  const today = new Date().toISOString().split('T')[0];
  const statsToday = await prisma.dailyStats.findUnique({
    where: { date: today }
  });

  // Pega origens únicas para o filtro
  const origins = await prisma.job.groupBy({
    by: ['origin'],
  });

  return {
    totalJobs,
    jobsToday: statsToday?.jobCount || 0,
    origins: origins.map(o => o.origin)
  };
}