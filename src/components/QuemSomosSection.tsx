import React from 'react';
import { ShieldCheck, HardHat, FileCheck, Eye, Sparkles, CheckCircle2 } from 'lucide-react';

export const QuemSomosSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Diagnóstico Estrutural',
      desc: 'Mapeamento do tipo de vidro laminado/temperado e acabamento de perfis.',
      icon: Eye
    },
    {
      num: '02',
      title: 'Amolecimento Molecular',
      desc: 'Química neutra pH 7.0 que desagrega cimento e tintas sem atrito a seco.',
      icon: Sparkles
    },
    {
      num: '03',
      title: 'Raspagem Cirúrgica',
      desc: 'Lâminas martensíticas descartadas a cada pano para evitar microrriscos.',
      icon: ShieldCheck
    },
    {
      num: '04',
      title: 'Trilhos & Nanoproteção',
      desc: 'Higienização interna de canaletas e escudo invisível hidrofóbico.',
      icon: CheckCircle2
    }
  ];

  return (
    <section id="quem-somos" className="py-7 sm:py-12 px-4 sm:px-6 max-w-xl mx-auto scroll-mt-16">
      {/* Header */}
      <div className="flex flex-col text-left mb-5">
        <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-1">
          01 · Quem Somos
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">
          Protocolo executivo para entrega de obra
        </h2>
        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
          Garantia total para vidros nobres, esquadrias importadas e pele de vidro arquitetônica.
        </p>
      </div>

      {/* 4 Steps in 2x2 on Mobile */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        {steps.map((st) => {
          const Icon = st.icon;
          return (
            <div
              key={st.num}
              className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold font-mono text-zinc-200">
                    {st.num}
                  </span>
                  <Icon className="w-3.5 h-3.5 text-zinc-400" />
                </div>
                <h3 className="text-xs font-semibold text-zinc-100 mb-1 leading-tight">
                  {st.title}
                </h3>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  {st.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3 Executive Trust Marks */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-zinc-900/40 border border-zinc-800/70 rounded-xl p-2.5 flex flex-col items-center text-center gap-1">
          <ShieldCheck className="w-4 h-4 text-zinc-300" />
          <div className="text-[10px] font-semibold text-zinc-100 leading-tight">Zero Riscos</div>
          <div className="text-[9px] text-zinc-400">Em Contrato</div>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800/70 rounded-xl p-2.5 flex flex-col items-center text-center gap-1">
          <FileCheck className="w-4 h-4 text-zinc-300" />
          <div className="text-[10px] font-semibold text-zinc-100 leading-tight">Seguro Zurich</div>
          <div className="text-[9px] text-zinc-400">Até R$ 5 Milhões</div>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800/70 rounded-xl p-2.5 flex flex-col items-center text-center gap-1">
          <HardHat className="w-4 h-4 text-zinc-300" />
          <div className="text-[10px] font-semibold text-zinc-100 leading-tight">Norma NR-35</div>
          <div className="text-[9px] text-zinc-400">Trabalho em Altura</div>
        </div>
      </div>
    </section>
  );
};
