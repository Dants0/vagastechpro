"use client";

import { useState } from "react";
import { HiTerminal, HiOutlineClipboardCopy, HiOutlineCheck } from "react-icons/hi";

export default function TerminalDonate() {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  // Seu código Pix fornecido
  const pixCode = "00020126680014BR.GOV.BCB.PIX0136d992166a-8b0b-45dc-a7b6-c6c7bce074b70206donate52040000530398654043.005802BR5921Guilherme Dantas Goes6009SAO PAULO621405100SCPMO5lS96304EEDF";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Falha ao copiar:", err);
    }
  };

  return (
    <div className="bg-[#0d1117] text-zinc-300 p-0 rounded-xl border border-zinc-800 font-mono text-xs overflow-hidden shadow-2xl max-w-sm mx-auto">
      {/* Header Estilo MacOS/Terminal */}
      <div className="bg-[#161b22] px-4 py-2 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <div className="flex items-center gap-2 text-zinc-500 text-[10px]">
          <HiTerminal size={14} />
          <span>bash — donate.sh</span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-4 text-[11px]">
          <span className="text-purple-400">➜</span> <span className="text-cyan-400">~/codivatech</span> <span className="text-zinc-500">$</span>
          <span className="text-zinc-100 ml-2 italic"># support_open_source</span>
        </div>

        <p className="mb-4 leading-relaxed text-zinc-400">
          <span className="text-green-400">[status]</span> Ajude a manter o cluster <span className="text-zinc-100">CodivaTech</span> operando em alta disponibilidade.
        </p>

        {/* Tabs de Navegação */}
        <div className="flex bg-[#161b22] rounded-t-md border-x border-t border-zinc-800">
          <button
            onClick={() => setShowQR(false)}
            className={`flex-1 py-2 text-[10px] font-bold transition-all ${!showQR ? 'text-purple-400 border-b-2 border-purple-400 bg-black/20' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            PIX COPIA E COLA
          </button>
          <button
            onClick={() => setShowQR(true)}
            className={`flex-1 py-2 text-[10px] font-bold transition-all ${showQR ? 'text-purple-400 border-b-2 border-purple-400 bg-black/20' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            QR CODE
          </button>
        </div>

        {/* Console de Saída */}
        <div className="bg-black/50 p-4 border border-zinc-800 border-t-0 rounded-b-md mb-4 min-h-[140px] flex flex-col justify-center">
          {!showQR ? (
            <div
              onClick={handleCopy}
              className="group relative break-all cursor-pointer p-1"
            >
              <code className="text-[10px] text-zinc-500 group-hover:text-zinc-300 transition-colors leading-tight">
                {pixCode}
              </code>
              <div className="mt-3 flex items-center gap-2 text-[9px] text-purple-500 font-bold uppercase tracking-wider">
                {copied ? <HiOutlineCheck size={14} /> : <HiOutlineClipboardCopy size={14} />}
                {copied ? "Copiado!" : "Clique para copiar code"}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center animate-in fade-in duration-300">
              <div className="bg-white p-2 rounded-lg mb-2 shadow-inner">
                {/* Substitua o ícone pela sua imagem real */}
                <img
                  src="/pix-qrcode.jpeg"
                  alt="QR Code Pix Guilherme"
                  className="w-[120px] h-[120px] object-contain"
                />
              </div>
              <span className="text-[9px] text-zinc-500 italic">
                Aponte a câmera do seu banco para o código acima
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}