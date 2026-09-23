import React from 'react';
import { PARTNERS_DATA } from '../data/content';
import { Building2, Compass, Shield, Home, ArrowRight } from 'lucide-react';

export const ParceirosSection: React.FC = () => {
  return (
    <section id="parceiros" className="py-7 sm:py-12 px-4 sm:px-6 max-w-xl mx-auto scroll-mt-16">
      {/* Header */}
      <div className="flex flex-col text-left mb-5">
        <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-1">
          05 · Parcerias Que Possuo
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">
          Aprovada por construtoras e arquitetos de prestígio
        </h2>
        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
          Homologada para entrega de empreendimentos Triple-A e mansões em condomínios de alto padrão.
        </p>
      </div>

      {/* 4 Segment Badges in 2x2 on Mobile */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-3 flex items-center gap-2.5">
          <Building2 className="w-4 h-4 text-zinc-300 shrink-0" />
          <div>
            <div className="text-xs font-semibold text-zinc-100">Construtoras</div>
            <div className="text-[10px] text-zinc-400">Vistorias de entrega</div>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-3 flex items-center gap-2.5">
          <Compass className="w-4 h-4 text-zinc-300 shrink-0" />
          <div>
            <div className="text-xs font-semibold text-zinc-100">Arquitetura</div>
            <div className="text-[10px] text-zinc-400">Mansões & coberturas</div>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-3 flex items-center gap-2.5">
          <Shield className="w-4 h-4 text-zinc-300 shrink-0" />
          <div>
            <div className="text-xs font-semibold text-zinc-100">Esquadrias</div>
            <div className="text-[10px] text-zinc-400">Preservação de perfis</div>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-3 flex items-center gap-2.5">
          <Home className="w-4 h-4 text-zinc-300 shrink-0" />
          <div>
            <div className="text-xs font-semibold text-zinc-100">Condomínios</div>
            <div className="text-[10px] text-zinc-400">Manutenção periódica</div>
          </div>
        </div>
      </div>

      {/* Partner Quotes in 2x2 on Mobile */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        {PARTNERS_DATA.map((item) => (
          <div
            key={item.id}
            className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3.5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5 text-[10px]">
                <span className="font-mono text-zinc-400 tracking-wider uppercase">
                  {item.segment}
                </span>
                <span className="text-zinc-300 font-medium">
                  {item.metric}
                </span>
              </div>

              <p className="text-[11px] text-zinc-300 italic mb-2 leading-relaxed">
                "{item.quote}"
              </p>
            </div>

            <div className="pt-2 border-t border-zinc-800/60">
              <div className="text-xs font-medium text-zinc-100 truncate">{item.name}</div>
              <div className="text-[10px] text-zinc-400 truncate">{item.author} · {item.city}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Discrete Executive Partnership Callout */}
      <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-xs font-semibold text-zinc-100">
            É construtor, arquiteto ou gestor patrimonial?
          </h3>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            Cadastre seu escritório para tabela técnica com vistoria executiva prioritária.
          </p>
        </div>
        <a
          href="https://wa.me/5511987654321?text=Ol%C3%A1.%20Sou%20arquiteto/construtor%20e%20gostaria%20de%20parceria%20com%20a%20JK%20Vidros%20Private."
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[40px] inline-flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium text-xs px-3.5 py-2 rounded-lg transition shrink-0 active:scale-95"
        >
          <span>Canal de Parcerias</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
};
