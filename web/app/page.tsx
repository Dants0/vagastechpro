import JobList from '@/src/components/JobList';
import Navbar from '@/src/components/Navbar';
import StatsBar from '@/src/components/Status';
import { prisma } from '../../src/lib/prismaClient';
import { getSystemStats } from './actions';
import Footer from '@/src/components/Footer';
import SectionBot from '@/src/components/SectionBot';

export const revalidate = 30;
export const dynamic = 'force-dynamic';

export default async function Home() {
  const stats = await getSystemStats();
  const initialJobs = await prisma.job.findMany({
    take: 20,
    orderBy: { createdAt: 'desc' },
  });

  return (
    // 1. O container principal já está correto com dark:bg-slate-950
    <div className="min-h-screen bg-slate-50 pb-20 dark:bg-slate-950 transition-colors">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 sm:px-6">

        <header className="py-16 text-center">
          {/* 2. H1: Adicionado dark:text-white */}
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            Encontre sua vaga de TI <span className="text-blue-600 dark:text-blue-500">agora.</span>
          </h1>
          {/* 3. Parágrafo: Adicionado dark:text-slate-300 */}
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Nosso robô varre a internet 24 horas por dia para centralizar as melhores oportunidades de desenvolvimento, dados e infraestrutura.
          </p>
        </header>

        <StatsBar total={stats.totalJobs} today={stats.jobsToday} />

        <SectionBot />

        <section id="vagas" className="mt-12">
          {/* 4. H2: Adicionado dark:text-white */}
          <h2 className="mb-6 text-2xl font-bold text-slate-800 dark:text-white">Últimas Oportunidades</h2>
          <JobList initialJobs={initialJobs} availableOrigins={stats.origins} />
        </section>

      </main>
      <Footer />
    </div>
  );
}