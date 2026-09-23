import React, { useState, useRef } from 'react';
import { ArrowRight, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosFromClientX = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(pct);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      updatePosFromClientX(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      updatePosFromClientX(e.clientX);
    }
  };

  return (
    <section id="o-que-faco" className="pt-6 pb-8 sm:pt-8 sm:pb-12 px-4 sm:px-6 max-w-xl mx-auto scroll-mt-14">
      <div className="flex flex-col gap-4 text-left">
        
        {/* Subtle Executive Kicker */}
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
          <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-400">01 · O Que Faço</span>
          <span aria-hidden="true" className="text-zinc-700">·</span>
          <span className="text-[11px] text-zinc-400">Entrega de Obra</span>
        </div>

        {/* Executive Headline */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-zinc-100 tracking-tight leading-[1.2]">
          Desincrustação cirúrgica de vidros pós-obra.{' '}
          <span className="text-zinc-400 font-normal">
            Zero riscos.
          </span>
        </h2>

        {/* Short Executive Description */}
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          Tratamento especializado com química neutra biodegradável pH 7.0 e lâminas de precisão para remoção de cimento, tintas, silicone e películas em vidros importados e esquadrias nobres.
        </p>

        {/* Quantitative Proof Strip */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-zinc-800/80">
          <div>
            <div className="text-lg sm:text-xl font-bold text-zinc-100 tabular-nums">0%</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Risco em Vidro</div>
          </div>
          <div className="border-x border-zinc-800/80 px-2">
            <div className="text-lg sm:text-xl font-bold text-zinc-100 tabular-nums">R$ 5M</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Apólice Zurich</div>
          </div>
          <div>
            <div className="text-lg sm:text-xl font-bold text-zinc-100 tabular-nums">NR-35</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Altura Segura</div>
          </div>
        </div>

        {/* Executive Action CTAs */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href="#orcamento"
            className="min-h-[44px] inline-flex items-center justify-center gap-2 bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs px-4 py-2.5 rounded-xl shadow-sm active:scale-95 transition-all text-center"
          >
            <span>Simular Orçamento</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <a
            href="https://wa.me/5511987654321?text=Ol%C3%A1.%20Gostaria%20de%20solicitar%20um%20atendimento%20executivo%20da%20JK%20Vidros."
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800/90 text-zinc-200 border border-zinc-700/80 font-medium text-xs px-4 py-2.5 rounded-xl active:scale-95 transition-all text-center"
          >
            <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />
            <span>Concierge</span>
          </a>
        </div>

        {/* High-Fidelity Before / After Interactive Slider */}
        <div className="mt-2">
          <div className="relative rounded-2xl p-1 bg-zinc-900/60 border border-zinc-800/90 shadow-xl">
            <div
              ref={containerRef}
              id="interactive-slider-box"
              className="relative h-52 sm:h-64 w-full rounded-xl overflow-hidden cursor-ew-resize select-none border border-zinc-800 touch-none"
              onClick={(e) => updatePosFromClientX(e.clientX)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
            >
              {/* After: Pristine Architecture Villa Photo */}
              <div className="absolute inset-0">
                <img
                  src="/src/assets/images/luxury_villa_facade_1790144087617.jpg"
                  alt="Fachada de residência de alto padrão com vidros cristalinos"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
                
                <div className="absolute top-2.5 right-2.5">
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-zinc-200 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                    Depois · Cristalino
                  </span>
                </div>
                <div className="absolute bottom-2.5 right-2.5 text-[10px] text-zinc-300 font-medium bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                  100% livre de marcas
                </div>
              </div>

              {/* Before: Construction Haze & Splatters Clipped Layer */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`
                }}
              >
                <img
                  src="/src/assets/images/luxury_villa_facade_1790144087617.jpg"
                  alt="Vidro com respingos de obra"
                  className="w-full h-full object-cover filter brightness-[0.7] contrast-[0.85]"
                />
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[1px]" />
                
                {/* Splatters SVG */}
                <svg className="absolute inset-0 w-full h-full opacity-70" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20%" cy="40%" r="22" fill="#cbd5e1" opacity="0.7" />
                  <circle cx="15%" cy="65%" r="6" fill="#f8fafc" opacity="0.9" />
                  <circle cx="32%" cy="25%" r="5" fill="#ffffff" opacity="0.8" />
                  <ellipse cx="28%" cy="75%" rx="16" ry="10" fill="#94a3b8" opacity="0.75" />
                  <circle cx="40%" cy="50%" r="9" fill="#94a3b8" opacity="0.6" />
                  <circle cx="10%" cy="20%" r="4" fill="#f1f5f9" opacity="0.8" />
                </svg>

                <div className="absolute top-2.5 left-2.5">
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-zinc-300 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                    Antes · Pós-Obra
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-2.5 text-[10px] text-zinc-300 font-medium bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                  Cimento e tinta seca
                </div>
              </div>

              {/* Squeegee Slider Divider Line & Discrete Thumb */}
              <div
                className="absolute top-0 bottom-0 z-20 pointer-events-none"
                style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
              >
                <div className="w-[1.5px] h-full bg-zinc-200 shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                <div className="absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-6 rounded-full bg-zinc-900 border border-zinc-400 flex items-center justify-center pointer-events-auto shadow-md">
                  <span className="text-[8px] text-zinc-200 font-bold">◄►</span>
                </div>
              </div>
            </div>

            <div className="py-2 text-center text-[10px] text-zinc-400">
              Deslize o rodo para comparar antes e depois da limpeza
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
