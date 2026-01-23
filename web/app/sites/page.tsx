import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";

export default function SitesPage() {
  const sites = [
    { 
      name: 'LinkedIn', 
      status: 'Online', 
      type: 'Scraper Pesado', 
      color: 'text-green-600 dark:text-green-400', 
      bg: 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800' 
    },
    { 
      name: 'Indeed', 
      status: 'Online', 
      type: 'Scraper Pesado', 
      color: 'text-green-600 dark:text-green-400', 
      bg: 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800' 
    },
    { 
      name: 'Programathor', 
      status: 'Online', 
      type: 'Scraper Leve', 
      color: 'text-green-600 dark:text-green-400', 
      bg: 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800' 
    },
    { 
      name: 'RemoteOK', 
      status: 'Online', 
      type: 'API Pública', 
      color: 'text-blue-600 dark:text-blue-400', 
      bg: 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800' 
    },
    { 
      name: 'Workana', 
      status: 'Online', 
      type: 'Scraper Leve', 
      color: 'text-green-600 dark:text-green-400', 
      bg: 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800' 
    },
    { 
      name: 'InfoJobs', 
      status: 'Online', 
      type: 'Scraper Leve', 
      color: 'text-green-600 dark:text-green-400', 
      bg: 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800' 
    },
    { 
      name: 'GeekHunter', 
      status: 'Online', 
      type: 'Scraper Leve', 
      color: 'text-green-600 dark:text-green-400', 
      bg: 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800' 
    },
    { 
      name: 'Nerdin', 
      status: 'Online', 
      type: 'Scraper Leve', 
      color: 'text-green-600 dark:text-green-400', 
      bg: 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800' 
    },
    { 
      name: 'WeWorkRemotely', 
      status: 'Online', 
      type: 'Scraper Leve', 
      color: 'text-green-600 dark:text-green-400', 
      bg: 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800' 
    },
  ];

  return (
    // Fundo escuro aplicado
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Sites Monitorados</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Lista de plataformas que nosso bot verifica periodicamente em busca de novas vagas.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sites.map((site) => (
            <div
              key={site.name}
              // Card escuro e bordas ajustadas
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-blue-200 dark:bg-slate-900 dark:border-slate-800 dark:hover:border-blue-500/50"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{site.name}</h3>
                  {/* Badges com suporte a dark mode via props do array */}
                  <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${site.bg} ${site.color}`}>
                    {site.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                  Monitoramento Ativo
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="inline-block rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  🤖 {site.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
        <Footer />
    </div>
  );
}