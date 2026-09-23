import React from 'react';
import { ArrowUp, Lock } from 'lucide-react';

interface Props {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<Props> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-800/80 py-8 px-4 sm:px-6 text-zinc-500 text-xs mb-16 md:mb-0 max-w-xl mx-auto">
      <div className="flex flex-col gap-4 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xs tracking-wider text-zinc-200 uppercase">
              JK Vidros <span className="text-zinc-500 font-normal">Private</span>
            </span>
            <span className="text-zinc-700">·</span>
            <span className="text-[10px] text-zinc-500">Apresentação Oficial</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-200 transition"
          >
            <span>Voltar ao Início</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-[11px] text-zinc-400 pt-2 border-t border-zinc-900">
          <a href="#apresentacao-video" className="hover:text-zinc-200 transition">Vídeo</a>
          <a href="#o-que-faco" className="hover:text-zinc-200 transition">O Que Faço</a>
          <a href="#produtos" className="hover:text-zinc-200 transition">Produtos</a>
          <a href="#casas-limpei" className="hover:text-zinc-200 transition">Casas Limpas</a>
          <a href="#instagram-feed" className="hover:text-zinc-200 transition">Instagram</a>
          <a href="#parceiros" className="hover:text-zinc-200 transition">Parcerias</a>
          <a href="#orcamento" className="hover:text-zinc-200 transition">Orçamento</a>
          <span className="text-zinc-700">·</span>
          <button
            type="button"
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1 text-zinc-400 hover:text-zinc-200 transition"
          >
            <Lock className="w-3 h-3" />
            <span>Admin</span>
          </button>
        </div>

        <div className="text-[10px] text-zinc-400 text-center sm:text-left">
          © {new Date().getFullYear()} JK Vidros. Engenharia e tratamento de vidros nobres. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};
