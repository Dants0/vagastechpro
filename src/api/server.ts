// src/api/server.ts
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { prisma } from '../lib/prismaClient'; //
import { generateHashtags } from '../utils/TagGenerator';
import 'dotenv/config';
// Importe o gerador de tags que vamos extrair do QueueWorker 

const app = Fastify({ logger: true });

app.register(cors);


app.addHook('onRequest', async (request, reply) => {
  const secret = request.headers['x-rapidapi-proxy-secret'];
  
  const mySecret = process.env.RAPIDAPI_SECRET; 

  if (!mySecret || secret !== mySecret) {
    return reply.code(401).send({ 
      error: 'Acesso negado. Endpoint exclusivo via RapidAPI Hub.' 
    });
  }
});

/**
 * ENDPOINT 1: Buscar Vagas
 */
app.get('/api/v1/jobs', async (req: any, reply) => {
  const { tech, remote, limit = 20, page = 1 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  const where: any = {};
  
  if (remote === 'true') {
    where.title = { contains: 'Remoto', mode: 'insensitive' };
  }
  
  if (tech) {
    where.OR = [
      { title: { contains: tech, mode: 'insensitive' } },
    ];
  }

  const jobs = await prisma.job.findMany({
    where,
    take: Number(limit),
    skip,
    orderBy: { createdAt: 'desc' },
    select: {
      title: true,
      company: true,
      link: true,
      origin: true,
      createdAt: true
    }
  });

  return { data: jobs, page: Number(page), count: jobs.length };
});

/**
 * ENDPOINT 2: Tech Trends
 */
app.get('/api/v1/trends', async (req, reply) => {
    // Busca vagas dos últimos 7 dias
    const jobs = await prisma.job.findMany({
        where: { 
            createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } 
        },
        select: { title: true }
    });

    const stats: Record<string, number> = {};
    const keywords = ['React', 'Node', 'Python', 'Java', 'Rust', 'Go', 'AWS', 'Docker', 'Kubernetes'];

    jobs.forEach(job => {
        keywords.forEach(tech => {
            if (job.title.toLowerCase().includes(tech.toLowerCase())) {
                stats[tech] = (stats[tech] || 0) + 1;
            }
        });
    });

    return { period: '7 days', trends: stats };
});

/**
 * ENDPOINT 3: Tagger AI
 */
app.post('/api/v1/extract-tags', async (req: any, reply) => {
    const { text, origin } = req.body;
    
    if (!text) {
        return reply.code(400).send({ error: 'Campo "text" é obrigatório.' });
    }

    const tags = await generateHashtags(text, origin || '');

    return { 
        original_text: text,
        tags: tags,
        tags_array: tags.split(' ') 
    };
});

export const startServer = async () => {
  try {
    const port = Number(process.env.PORT) || 7676;
    await app.listen({ port, host: '0.0.0.0' });
    console.log(`🚀 API Server rodando na porta ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};