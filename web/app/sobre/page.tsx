import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
        <article className="prose prose-slate lg:prose-lg mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          
          <h1 className="text-3xl font-extrabold text-slate-900 mb-6">
            Sobre o Vagas Tech Bot
          </h1>
          
          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            Este projeto nasceu da necessidade de centralizar as vagas de tecnologia dispersas em dezenas de sites diferentes. 
            Em vez de perder horas procurando manualmente, nosso robô faz o trabalho pesado por você.
          </p>

          <hr className="my-8 border-slate-200" />

          <h2 className="text-2xl font-bold text-slate-800 mb-4">Como funciona?</h2>
          <ul className="space-y-4 list-none pl-0 mb-8">
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">1</span>
              <p className="text-slate-600">
                <strong className="text-slate-900">Coleta:</strong> Nossos scrapers (robôs) visitam sites como LinkedIn e Indeed a cada poucos minutos.
              </p>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">2</span>
              <p className="text-slate-600">
                <strong className="text-slate-900">Filtragem:</strong> Usamos inteligência para remover vagas duplicadas, spam ou fora do escopo de TI.
              </p>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">3</span>
              <p className="text-slate-600">
                <strong className="text-slate-900">Divulgação:</strong> As vagas aprovadas são enviadas instantaneamente para nosso canal no Telegram e atualizadas aqui no site.
              </p>
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-800 mb-4">Stack Tecnológica</h2>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="rounded-lg bg-slate-50 p-4 border border-slate-100">
              <h3 className="font-semibold text-slate-900">Backend & Bot</h3>
              <p className="text-sm text-slate-500">Node.js, Puppeteer, Telegraf</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4 border border-slate-100">
              <h3 className="font-semibold text-slate-900">Frontend & Web</h3>
              <p className="text-sm text-slate-500">Next.js 14, React, Tailwind CSS</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4 border border-slate-100">
              <h3 className="font-semibold text-slate-900">Banco de Dados</h3>
              <p className="text-sm text-slate-500">SQLite + Prisma ORM</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4 border border-slate-100">
              <h3 className="font-semibold text-slate-900">Infraestrutura</h3>
              <p className="text-sm text-slate-500">Docker, Linux</p>
            </div>
          </div>

          <div className="rounded-xl bg-blue-600 p-6 text-white text-center">
            <h3 className="text-xl font-bold mb-2">Projeto Open Source 🚀</h3>
            <p className="text-blue-100 mb-4">
              Desenvolvido com carinho pela CodivaTech. O código é aberto para a comunidade.
            </p>
            <a 
              href="https://codivatech.com" 
              target="_blank"
              className="inline-block rounded-lg bg-white px-6 py-2 font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
            >
              Conheça a CodivaTech
            </a>
          </div>

        </article>
        
      </main>
                <Footer/>
    </div>
  );
}