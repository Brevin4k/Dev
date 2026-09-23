import React, { useState } from 'react';
import { PLANS_DATA } from '../data/content';
import { Check, Calculator, ArrowRight } from 'lucide-react';

export const PlanosSection: React.FC = () => {
  // Simulator State
  const [propertyType, setPropertyType] = useState<'apartamento' | 'casa' | 'comercial'>('casa');
  const [areaM2, setAreaM2] = useState<number>(60);
  const [isSubscription, setIsSubscription] = useState<boolean>(true);

  // Estimation calculation
  const calculateEstimate = () => {
    let rate = 20;
    if (propertyType === 'apartamento') rate = 18;
    if (propertyType === 'casa') rate = 21;
    if (propertyType === 'comercial') rate = 24;

    const singleTotal = Math.max(580, Math.round(areaM2 * rate));
    const subPerVisit = Math.round(singleTotal * 0.75); // 25% off

    return isSubscription ? subPerVisit : singleTotal;
  };

  const estimatedValue = calculateEstimate();

  const getWhatsAppSimLink = () => {
    const propMap = {
      apartamento: 'Apartamento / Cobertura',
      casa: 'Residência / Mansão',
      comercial: 'Sede Corporativa / Comercial'
    };
    const modeText = isSubscription ? 'Concierge Recorrente (-25%)' : 'Pós-Obra Avulso';
    const text = encodeURIComponent(
      `Olá JK Vidros Private. Realizei uma estimativa técnica no site:\n` +
      `· Imóvel: ${propMap[propertyType]} (~${areaM2} m²)\n` +
      `· Modalidade: ${modeText} (Estimativa: R$ ${estimatedValue.toLocaleString('pt-BR')})\n` +
      `Gostaria de solicitar uma vistoria técnica presencial com laudo.`
    );
    return `https://wa.me/5511987654321?text=${text}`;
  };

  return (
    <section id="orcamento" className="py-7 sm:py-12 px-4 sm:px-6 max-w-xl mx-auto scroll-mt-16">
      {/* Header */}
      <div className="flex flex-col text-left mb-5">
        <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-1">
          06 · Orçamento & Planos
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">
          Pós-obra avulso ou assinatura concierge
        </h2>
        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
          Atendimento pontual para entrega de chaves ou manutenção periódica com 25% de benefício contínuo.
        </p>
      </div>

      {/* 3 Pricing Cards */}
      <div className="flex flex-col gap-3.5 mb-6">
        {PLANS_DATA.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-xl p-4 sm:p-5 flex flex-col justify-between transition-all ${
              plan.popular
                ? 'bg-zinc-900 border border-zinc-700 shadow-md'
                : 'bg-zinc-900/60 border border-zinc-800/80'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1 text-[11px]">
                <span className="font-mono text-zinc-400 uppercase">
                  {plan.frequency}
                </span>
                {plan.badge && (
                  <span className="text-[10px] text-zinc-200 bg-zinc-800/90 px-2 py-0.5 rounded border border-zinc-700">
                    {plan.badge}
                  </span>
                )}
              </div>

              <h3 className="text-sm sm:text-base font-bold text-zinc-100 mb-1">
                {plan.title}
              </h3>
              <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
                {plan.idealFor}
              </p>

              {/* Price */}
              <div className="my-2 pb-2.5 border-b border-zinc-800/80 flex items-baseline gap-1">
                <span className="text-[11px] text-zinc-400">A partir de</span>
                <span className="text-xl sm:text-2xl font-bold text-zinc-100 tabular-nums">
                  {plan.basePrice}
                </span>
                <span className="text-[11px] text-zinc-400">
                  {plan.type === 'assinatura' ? '/visita' : ''}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-1.5 mb-4 text-[11px] text-zinc-300">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={`https://wa.me/5511987654321?text=Ol%C3%A1.%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20o%20plano%20${encodeURIComponent(plan.title)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full min-h-[44px] py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center transition-all active:scale-95 ${
                plan.popular
                  ? 'bg-zinc-100 hover:bg-white text-zinc-950 shadow-sm'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
              }`}
            >
              {plan.ctaLabel}
            </a>
          </div>
        ))}
      </div>

      {/* Simulator */}
      <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <Calculator className="w-4 h-4 text-zinc-300" />
          <h3 className="text-xs sm:text-sm font-semibold text-zinc-100">
            Simulador de Estimativa Executiva
          </h3>
        </div>

        <div className="space-y-3.5">
          {/* Property Selector */}
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'casa', label: 'Residência' },
              { id: 'apartamento', label: 'Cobertura' },
              { id: 'comercial', label: 'Corporativo' },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPropertyType(p.id as typeof propertyType)}
                className={`min-h-[42px] py-2 px-1 rounded-lg text-[11px] font-medium border transition-all text-center ${
                  propertyType === p.id
                    ? 'bg-zinc-100 text-zinc-950 border-white font-semibold'
                    : 'bg-zinc-950/60 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Area Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-zinc-400">Área estimada de vidro:</span>
              <span className="font-bold text-zinc-100 tabular-nums">{areaM2} m²</span>
            </div>
            <input
              type="range"
              min="15"
              max="200"
              step="5"
              value={areaM2}
              onChange={(e) => setAreaM2(Number(e.target.value))}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-200"
            />
            {/* Quick Presets */}
            <div className="flex justify-between gap-1 mt-1.5">
              {[25, 50, 80, 120, 180].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAreaM2(val)}
                  className={`text-[10px] px-2 py-0.5 rounded border transition tabular-nums ${
                    areaM2 === val
                      ? 'bg-zinc-800 text-zinc-100 border-zinc-600 font-semibold'
                      : 'text-zinc-400 border-zinc-800/80 hover:text-zinc-200'
                  }`}
                >
                  {val}m²
                </button>
              ))}
            </div>
          </div>

          {/* Format Toggle & Result */}
          <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsSubscription(true)}
                className={`min-h-[38px] px-2.5 py-1 rounded text-[11px] font-medium transition ${
                  isSubscription ? 'bg-zinc-800 text-zinc-100 border border-zinc-700' : 'text-zinc-400'
                }`}
              >
                Assinatura (-25%)
              </button>
              <button
                type="button"
                onClick={() => setIsSubscription(false)}
                className={`min-h-[38px] px-2.5 py-1 rounded text-[11px] font-medium transition ${
                  !isSubscription ? 'bg-zinc-800 text-zinc-100 border border-zinc-700' : 'text-zinc-400'
                }`}
              >
                Avulso
              </button>
            </div>

            {/* Calculated estimate */}
            <div className="text-right">
              <span className="text-[9px] text-zinc-400 uppercase tracking-wider block">Estimativa:</span>
              <span className="text-base sm:text-lg font-bold text-zinc-100 tabular-nums">
                R$ {estimatedValue.toLocaleString('pt-BR')} {isSubscription ? <span className="text-[10px] font-normal text-zinc-400">/visita</span> : ''}
              </span>
            </div>
          </div>

          <a
            href={getWhatsAppSimLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[44px] py-2.5 rounded-lg bg-zinc-100 hover:bg-white active:scale-95 text-zinc-950 font-semibold text-xs flex items-center justify-center gap-1.5 transition mt-1 shadow-sm"
          >
            <span>Solicitar Vistoria Técnica Neste Valor</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
