
import JobList from '@/src/components/JobList';
import Navbar from '@/src/components/Navbar';
import StatsBar from '@/src/components/Status';
import { prisma } from '../../src/lib/prismaClient';
import { getSystemStats } from './actions';
import Footer from '@/src/components/Footer';

export const revalidate = 30;

export default async function Home() {
  const stats = await getSystemStats();
  const initialJobs = await prisma.job.findMany({
    take: 20,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Navbar />
      
      <main className="mx-auto max-w-5xl px-4 sm:px-6">
        
        <header className="py-16 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Encontre sua vaga de TI <span className="text-blue-600">agora.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Nosso robô varre a internet 24 horas por dia para centralizar as melhores oportunidades de desenvolvimento, dados e infraestrutura.
          </p>
        </header>

        <StatsBar total={stats.totalJobs} today={stats.jobsToday} />

        <section id="vagas" className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-slate-800">Últimas Oportunidades</h2>
          <JobList initialJobs={initialJobs} availableOrigins={stats.origins} />
        </section>


      </main>
        <Footer/>
    </div>
  );
}