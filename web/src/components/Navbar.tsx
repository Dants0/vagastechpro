'use client'

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    // Adicionado dark:bg-slate-950/80 e dark:border-slate-800
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:bg-slate-950/80 dark:border-slate-800 transition-colors">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-bold text-blue-600 hover:text-blue-500 transition-colors">
            🤖 VagasTechBot
          </Link>
        </div>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Vagas</Link>
            <Link href="/sites" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Fontes</Link>
            <Link href="/sobre" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sobre</Link>
            <Link href="https://github.com/dants0/vagastechpro" target="_blank" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Repositório</Link>
          </div>
        </div>

        {/* Botão Mobile + Toggle Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <button 
            onClick={toggleMenu}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 focus:outline-none"
          >
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 shadow-lg dark:bg-slate-950 dark:border-slate-800">
          <div className="flex flex-col space-y-4 text-sm font-medium text-slate-600 dark:text-slate-300">
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400 py-2 border-b border-slate-50 dark:border-slate-900">
              🏠 Vagas
            </Link>
            <Link href="/sites" onClick={() => setIsOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400 py-2 border-b border-slate-50 dark:border-slate-900">
              🌐 Fontes
            </Link>
            <Link href="/sobre" onClick={() => setIsOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400 py-2 border-b border-slate-50 dark:border-slate-900">
              ℹ️ Sobre
            </Link>
            <Link href="https://github.com/dants0/vagastechpro" target="_blank" onClick={() => setIsOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400 py-2">
              💻 Repositório
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}