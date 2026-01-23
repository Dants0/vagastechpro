export default function SectionBot() {
  return (
    <section className="my-12">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 px-6 py-12 shadow-xl sm:px-12 sm:py-16">
        
        {/* Elementos decorativos de fundo (Círculos) */}
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
        <div className="absolute -left-12 -bottom-12 h-40 w-40 rounded-full bg-blue-400/20 blur-2xl"></div>

        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-8 md:flex-row md:justify-between">
          
          {/* Texto */}
          <div className="flex-1 text-center md:text-left">
            <div className="mb-4 inline-flex items-center rounded-full bg-blue-500/30 px-3 py-1 text-sm font-medium text-blue-100 backdrop-blur-sm border border-blue-400/30">
              <span className="mr-2 flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-200 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              Notificações em Tempo Real
            </div>
            
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
              Seja o primeiro a se candidatar! 🚀
            </h2>
            <p className="mt-4 text-lg text-blue-100/90 leading-relaxed max-w-xl">
              Nosso robô envia as vagas para o Telegram no exato momento em que elas são encontradas. Não perca oportunidades por chegar atrasado.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
              <a
                href="https://t.me/vagastechpro"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-bold text-blue-700 shadow-lg transition-all hover:bg-blue-50 hover:scale-105 active:scale-95"
              >
                {/* Ícone Telegram SVG */}
                <svg className="h-5 w-5 fill-current transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                Entrar no Canal Grátis
              </a>
              <span className="text-sm text-blue-200/80 sm:hidden block text-center mt-2">
                Mais de 500 devs já entraram
              </span>
            </div>
          </div>

          {/* Imagem / Ilustração (Mobile Only Hidden ou adaptada) */}
          <div className="relative hidden md:block">
            <div className="relative flex h-48 w-48 items-center justify-center rounded-full bg-white/10 backdrop-blur-md shadow-inner border border-white/20">
               <svg className="h-24 w-24 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
               </svg>
               
               {/* Badges Flutuantes (Decorativo) */}
               <div className="absolute -right-4 top-10 animate-bounce rounded-lg bg-white px-3 py-1 text-xs font-bold text-blue-600 shadow-lg">
                 Nova Vaga!
               </div>
               <div className="absolute -left-2 bottom-8 animate-pulse rounded-lg bg-green-400 px-3 py-1 text-xs font-bold text-white shadow-lg">
                 Online
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}