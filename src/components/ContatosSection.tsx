import React, { useState } from 'react';
import { FAQS_DATA } from '../data/content';
import { Phone, Mail, MessageSquare, Send, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

export const ContatosSection: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    mensagem: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contatos" className="py-7 sm:py-12 px-4 sm:px-6 max-w-xl mx-auto scroll-mt-16">
      {/* Header */}
      <div className="flex flex-col text-left mb-5">
        <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-1">
          05 · Atendimento & Contato
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">
          Agendamento de vistoria técnica presencial
        </h2>
        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
          Atendimento confidencial em São Paulo, Alphaville, Fazenda Boa Vista, Campinas, Litoral e regiões metropolitanas.
        </p>
      </div>

      <div className="flex flex-col gap-3.5 mb-6">
        {/* Direct Channels */}
        <div className="grid grid-cols-1 gap-2.5">
          {/* WhatsApp Direct */}
          <a
            href="https://wa.me/5511987654321?text=Ol%C3%A1.%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20executivo%20com%20a%20JK%20Vidros%20Private."
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[52px] bg-zinc-900/80 hover:bg-zinc-800/80 active:scale-98 border border-zinc-800 hover:border-zinc-700 rounded-xl p-3.5 flex items-center justify-between transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-200 flex items-center justify-center shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 block uppercase tracking-wider font-mono">Plantão Executivo</span>
                <span className="text-xs sm:text-sm font-semibold text-zinc-100">(11) 98765-4321</span>
              </div>
            </div>
            <span className="text-[11px] text-zinc-400 font-medium">WhatsApp →</span>
          </a>

          {/* Telefone */}
          <a
            href="tel:+551134567890"
            className="min-h-[52px] bg-zinc-900/50 hover:bg-zinc-800/60 active:scale-98 border border-zinc-800 rounded-xl p-3.5 flex items-center justify-between transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-200 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 block uppercase tracking-wider font-mono">Central Telefônica</span>
                <span className="text-xs sm:text-sm font-semibold text-zinc-100">(11) 3456-7890</span>
              </div>
            </div>
            <span className="text-[11px] text-zinc-400 font-medium">Ligar →</span>
          </a>

          {/* Email */}
          <a
            href="mailto:comercial@jkvidros.com.br"
            className="min-h-[52px] bg-zinc-900/50 hover:bg-zinc-800/60 active:scale-98 border border-zinc-800 rounded-xl p-3.5 flex items-center justify-between transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-200 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 block uppercase tracking-wider font-mono">E-mail Corporativo</span>
                <span className="text-xs sm:text-sm font-semibold text-zinc-100">comercial@jkvidros.com.br</span>
              </div>
            </div>
            <span className="text-[11px] text-zinc-400 font-medium">Enviar →</span>
          </a>
        </div>

        {/* Minimal Executive Form */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4 sm:p-5">
          <h3 className="text-xs sm:text-sm font-semibold text-zinc-100 mb-2">
            Solicitação de Proposta Técnica
          </h3>

          {submitted ? (
            <div className="py-5 text-center space-y-1.5">
              <CheckCircle2 className="w-7 h-7 text-zinc-300 mx-auto" />
              <h4 className="text-xs sm:text-sm font-semibold text-zinc-100">Solicitação Recebida</h4>
              <p className="text-[11px] text-zinc-400">Nosso engenheiro responsável entrará em contato via WhatsApp com o laudo inicial.</p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-[11px] text-zinc-300 underline pt-1"
              >
                Enviar nova solicitação
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2.5">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Nome do Responsável / Escritório"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full min-h-[44px] px-3 py-2 rounded-lg bg-zinc-950/80 border border-zinc-800 focus:border-zinc-400 text-xs text-zinc-100 placeholder-zinc-500 outline-none"
                />
              </div>

              <div>
                <input
                  type="tel"
                  required
                  placeholder="WhatsApp com DDD"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full min-h-[44px] px-3 py-2 rounded-lg bg-zinc-950/80 border border-zinc-800 focus:border-zinc-400 text-xs text-zinc-100 placeholder-zinc-500 outline-none"
                />
              </div>

              <div>
                <textarea
                  rows={2}
                  placeholder="Local do imóvel e particularidades da obra (ex: Mansão em Tamboré)"
                  value={formData.mensagem}
                  onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-950/80 border border-zinc-800 focus:border-zinc-400 text-xs text-zinc-100 placeholder-zinc-500 outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full min-h-[44px] py-2.5 rounded-lg bg-zinc-100 hover:bg-white active:scale-95 text-zinc-950 font-semibold text-xs flex items-center justify-center gap-2 transition shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Solicitar Vistoria Técnica Presencial</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 3 Executive FAQs */}
      <div className="space-y-1.5">
        {FAQS_DATA.map((faq, idx) => {
          const isOpen = openFaq === idx;
          return (
            <div
              key={idx}
              className="bg-zinc-900/40 border border-zinc-800/70 rounded-xl overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                className="w-full min-h-[44px] px-3.5 py-2.5 text-left flex items-center justify-between gap-2 hover:bg-zinc-800/40 transition"
              >
                <span className="text-xs font-medium text-zinc-200">
                  {faq.question}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                )}
              </button>
              {isOpen && (
                <div className="px-3.5 pb-3 text-[11px] text-zinc-400 leading-relaxed border-t border-zinc-800/50 pt-2">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
