import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";

export default function SitesPage() {
  const sites = [
    { name: 'LinkedIn', status: 'Online', type: 'Scraper Pesado', color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'Indeed', status: 'Online', type: 'Scraper Pesado', color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'Programathor', status: 'Online', type: 'Scraper Leve', color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'RemoteOK', status: 'Online', type: 'API Pública', color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Workana', status: 'Online', type: 'Scraper Leve', color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'InfoJobs', status: 'Online', type: 'Scraper Leve', color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'GeekHunter', status: 'Online', type: 'Scraper Leve', color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'Nerdin', status: 'Online', type: 'Scraper Leve', color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'WeWorkRemotely', status: 'Online', type: 'Scraper Leve', color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Sites Monitorados</h1>
          <p className="mt-2 text-slate-600">
            Lista de plataformas que nosso bot verifica periodicamente em busca de novas vagas.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sites.map((site) => (
            <div
              key={site.name}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-blue-200"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-800">{site.name}</h3>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${site.bg} ${site.color}`}>
                    {site.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Monitoramento Ativo
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <span className="inline-block rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
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