import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
          🤖 VagasTechBot
        </Link>
        <div className="flex gap-6 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">Vagas</Link>
          <Link href="/sites" className="hover:text-blue-600 transition-colors">Fontes</Link>
          <Link href="/sobre" className="hover:text-blue-600 transition-colors">Sobre</Link>
          <Link href="https://github.com/dants0/vagastechpro" className="hover:text--600 transition-colors">Sobre</Link>
        </div>
      </div>
    </nav>
  );
}