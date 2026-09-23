import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { PortfolioHouse } from '../types';
import { MapPin, Calendar, Maximize2, X, PlusCircle } from 'lucide-react';

interface Props {
  onOpenAdmin: () => void;
}

export const CasasLimpeiSection: React.FC<Props> = ({ onOpenAdmin }) => {
  const { houses } = usePortfolio();
  const [filter, setFilter] = useState<'todos' | 'mansao' | 'cobertura' | 'corporativo'>('todos');
  const [selectedHouse, setSelectedHouse] = useState<PortfolioHouse | null>(null);

  const filteredHouses = houses.filter((h) => {
    if (filter === 'todos') return true;
    return h.category === filter;
  });

  return (
    <section id="casas-limpei" className="py-7 sm:py-12 px-4 sm:px-6 max-w-xl mx-auto scroll-mt-16">
      {/* Header */}
      <div className="flex flex-col text-left mb-4">
        <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-1">
          04 · Casas Que Já Limpei
        </span>
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">
            Portfólio de Obras Entregues
          </h2>
          <button
            type="button"
            onClick={onOpenAdmin}
            className="text-[11px] text-zinc-400 hover:text-zinc-200 inline-flex items-center gap-1 py-1 px-2 rounded border border-zinc-800 bg-zinc-900/60"
            title="Adicionar ou gerenciar fotos"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Gerenciar Fotos</span>
          </button>
        </div>
        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
          Residências em condomínios fechados, coberturas de luxo e grandes panos envidraçados.
        </p>
      </div>

      {/* Filter Tabs (Interactive Segmented Control, Clean Typography) */}
      <div className="flex items-center gap-1.5 p-1 bg-zinc-900/80 border border-zinc-800/80 rounded-xl mb-4 overflow-x-auto">
        {[
          { id: 'todos', label: 'Todas as Obras' },
          { id: 'mansao', label: 'Mansões' },
          { id: 'cobertura', label: 'Coberturas' },
          { id: 'corporativo', label: 'Corporativo' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id as typeof filter)}
            className={`min-h-[38px] px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              filter === tab.id
                ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Houses / Photos */}
      <div className="flex flex-col gap-3.5">
        {filteredHouses.length === 0 ? (
          <div className="p-8 text-center bg-zinc-900/40 border border-zinc-800 rounded-xl text-xs text-zinc-400">
            Nenhuma obra cadastrada nesta categoria.
          </div>
        ) : (
          filteredHouses.map((house) => (
            <div
              key={house.id}
              onClick={() => setSelectedHouse(house)}
              className="group bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 rounded-2xl overflow-hidden cursor-pointer transition-all active:scale-[0.99] shadow-lg"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
                <img
                  src={house.imageUrl}
                  alt={house.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to elegant placeholder if external or custom URL fails
                    (e.target as HTMLImageElement).src = '/src/assets/images/luxury_villa_facade_1790144087617.jpg';
                  }}
                />
                
                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Top Corner Meta */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-200 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                    {house.categoryLabel || house.category}
                  </span>
                </div>

                <div className="absolute top-2.5 right-2.5">
                  <span className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-zinc-300">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-2.5 left-3 right-3 text-left">
                  <h3 className="text-sm font-bold text-white tracking-tight leading-snug">
                    {house.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-zinc-300 mt-0.5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-zinc-400" />
                      {house.location}
                    </span>
                    <span aria-hidden="true" className="text-zinc-600">·</span>
                    <span className="font-mono tabular-nums text-zinc-200">
                      {house.areaM2} m²
                    </span>
                  </div>
                </div>
              </div>

              {/* Scope Description */}
              <div className="p-3 text-left text-[11px] text-zinc-400 border-t border-zinc-800/60 leading-relaxed">
                {house.scope}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Lightbox / Modal for Full Inspection */}
      {selectedHouse && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelectedHouse(null)}
        >
          <div
            className="bg-zinc-900 border border-zinc-700 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedHouse(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/70 text-zinc-200 flex items-center justify-center border border-white/10 hover:text-white"
              aria-label="Fechar visualização"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Image */}
            <div className="relative aspect-video w-full bg-black">
              <img
                src={selectedHouse.imageUrl}
                alt={selectedHouse.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Details */}
            <div className="p-4 text-left">
              <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-mono uppercase mb-1">
                <span>{selectedHouse.categoryLabel || selectedHouse.category}</span>
                <span>·</span>
                <span>{selectedHouse.dateCompleted}</span>
              </div>

              <h3 className="text-base font-bold text-white mb-1">
                {selectedHouse.title}
              </h3>

              <div className="flex items-center gap-2 text-xs text-zinc-300 mb-3">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  {selectedHouse.location}
                </span>
                <span>·</span>
                <span className="font-mono">{selectedHouse.areaM2} m² de vidro tratado</span>
              </div>

              <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-800 text-xs text-zinc-300 leading-relaxed mb-4">
                <span className="font-semibold text-zinc-100 block mb-0.5">Escopo Técnico Executado:</span>
                {selectedHouse.scope}
              </div>

              <a
                href={`https://wa.me/5511987654321?text=Ol%C3%A1.%20Vi%20a%20obra%20${encodeURIComponent(selectedHouse.title)}%20no%20portf%C3%B3lio%20da%20JK%20Vidros%20e%20gostaria%20de%20um%20or%C3%A7amento%20semelhante.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[44px] py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs flex items-center justify-center gap-2 transition"
              >
                <span>Solicitar Proposta Baseada Nesta Obra</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
