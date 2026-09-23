import React from 'react';
import { PRODUCTS_DATA } from '../data/content';
import { Droplets, Sparkles, ShieldCheck, Wrench, Layers, Eraser, Leaf } from 'lucide-react';

export const ProdutosSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Droplets': return <Droplets className="w-4 h-4" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'Eraser': return <Eraser className="w-4 h-4" />;
      case 'Wrench': return <Wrench className="w-4 h-4" />;
      case 'Layers': return <Layers className="w-4 h-4" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <section id="produtos" className="py-7 sm:py-12 px-4 sm:px-6 max-w-xl mx-auto scroll-mt-16">
      {/* Header */}
      <div className="flex flex-col text-left mb-5">
        <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-1">
          03 · Produtos Que Uso
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">
          Química neutra e instrumental de precisão
        </h2>
        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
          Formulações biocompatíveis que não agridem silicone estrutural, esquadrias pretas ou anodizadas.
        </p>
      </div>

      {/* 6 Products in 2 Columns on Mobile */}
      <div className="grid grid-cols-2 gap-2.5">
        {PRODUCTS_DATA.map((prod) => (
          <div
            key={prod.id}
            className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3.5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-zinc-800/70 text-zinc-200 flex items-center justify-center">
                  {getIcon(prod.iconName)}
                </div>
                {prod.isEco && (
                  <span className="text-[10px] text-zinc-400 flex items-center gap-1 font-mono">
                    <Leaf className="w-3 h-3 text-zinc-300" /> Eco
                  </span>
                )}
              </div>

              <span className="text-[9px] font-mono tracking-wider text-zinc-400 uppercase block">
                {prod.categoryLabel}
              </span>
              <h3 className="text-xs font-semibold text-zinc-100 mt-0.5 mb-1 leading-tight">
                {prod.name}
              </h3>
              <p className="text-[11px] text-zinc-400 leading-snug line-clamp-3">
                {prod.description}
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-zinc-800/60 text-[10px]">
              <span className="text-zinc-300 font-medium block truncate">
                · {prod.benefit}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
