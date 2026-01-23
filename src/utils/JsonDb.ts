import { prisma } from '../lib/prismaClient';

// Mantemos a interface compatível para não quebrar o resto do código
export interface Job {
  id: string;      
  title: string;
  company: string;
  link: string;    
  origin: string;
  createdAt: number; 
}

interface DailyStats {
  date: string;
  jobCount: number;
}

export const JsonDb = {
  // Limpa a URL (Mantive sua lógica original)
  cleanUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      return urlObj.origin + urlObj.pathname;
    } catch {
      return url;
    }
  },

  // --- ESTATÍSTICAS ---
  async getDailyStats(): Promise<DailyStats> {
    const today = new Date().toISOString().split('T')[0]; // "2026-01-23"

    // Busca ou cria o registro do dia
    const stats = await prisma.dailyStats.upsert({
      where: { date: today },
      update: {},
      create: { date: today, jobCount: 0 }
    });

    return { date: stats.date, jobCount: stats.jobCount };
  },

  async incrementStats(type: 'job') {
    const today = new Date().toISOString().split('T')[0];

    if (type === 'job') {
      await prisma.dailyStats.upsert({
        where: { date: today },
        update: { jobCount: { increment: 1 } },
        create: { date: today, jobCount: 1 }
      });
    }
  },

  // --- VERIFICAÇÃO E BACKLOG ---

  async isJobNew(rawLink: string): Promise<boolean> {
    const cleanLink = this.cleanUrl(rawLink);
    
    // Verifica se JÁ EXISTE no banco (mesmo que já tenha sido postado)
    const count = await prisma.job.count({
      where: { url: cleanLink }
    });

    return count === 0;
  },

  async addJobToBacklog(jobData: Omit<Job, 'createdAt' | 'id'>) {
    const cleanLink = this.cleanUrl(jobData.link);

    // Verificação extra para evitar erro de chave duplicada
    const exists = await prisma.job.findUnique({ where: { url: cleanLink } });
    if (exists) return;

    await prisma.job.create({
      data: {
        title: jobData.title,
        company: jobData.company,
        link: jobData.link,
        origin: jobData.origin,
        url: cleanLink,
        postedAt: null // null = está no Backlog esperando o Worker
      }
    });
  },

  async getNextJob(): Promise<Job | null> {
    // Pega o job mais antigo que ainda NÃO foi postado (FIFO)
    const job = await prisma.job.findFirst({
      where: { postedAt: null },
      orderBy: { createdAt: 'asc' }
    });

    if (!job) return null;

    // Marca como postado IMEDIATAMENTE para ninguém pegar ele de novo
    await prisma.job.update({
      where: { id: job.id },
      data: { postedAt: new Date() }
    });

    // Retorna no formato que o seu Worker espera
    return {
      id: job.url, 
      title: job.title,
      company: job.company,
      link: job.link,
      origin: job.origin,
      createdAt: job.createdAt.getTime()
    };
  }
};