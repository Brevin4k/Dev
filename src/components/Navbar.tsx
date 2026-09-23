import React, { useState, useEffect } from 'react';
import { Play, Sparkles, Beaker, Home, Users, Calculator, Lock, MessageSquare, Instagram } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface Props {
  scrollProgress: number;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<Props> = ({ scrollProgress, onOpenAdmin }) => {
  const { isAdminLoggedIn } = usePortfolio();
  const [activeSection, setActiveSection] = useState<string>('apresentacao-video');

  const navLinks = [
    { id: 'apresentacao-video', label: 'Vídeo', href: '#apresentacao-video', icon: Play },
    { id: 'o-que-faco', label: 'O Que Faço', href: '#o-que-faco', icon: Sparkles },
    { id: 'produtos', label: 'Produtos', href: '#produtos', icon: Beaker },
    { id: 'casas-limpei', label: 'Casas', href: '#casas-limpei', icon: Home },
    { id: 'instagram-feed', label: 'Instagram', href: '#instagram-feed', icon: Instagram },
    { id: 'parceiros', label: 'Parcerias', href: '#parceiros', icon: Users },
    { id: 'orcamento', label: 'Orçamento', href: '#orcamento', icon: Calculator },
  ];

  // Mobile bottom tab bar has the 5 primary chapters
  const mobileNavLinks = [
    { id: 'apresentacao-video', label: 'Vídeo', href: '#apresentacao-video', icon: Play },
    { id: 'o-que-faco', label: 'Serviço', href: '#o-que-faco', icon: Sparkles },
    { id: 'casas-limpei', label: 'Casas', href: '#casas-limpei', icon: Home },
    { id: 'instagram-feed', label: 'Instagram', href: '#instagram-feed', icon: Instagram },
    { id: 'orcamento', label: 'Orçamento', href: '#orcamento', icon: Calculator },
  ];

  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = ['apresentacao-video', 'o-que-faco', 'produtos', 'casas-limpei', 'instagram-feed', 'parceiros', 'orcamento'];
      const scrollPos = window.scrollY + 180;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Sticky Top Header (Presentation Deck Header) */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#090b0e]/95 backdrop-blur-md border-b border-zinc-800/80 transition-all duration-300">
        {/* Subtle Titanium Progress Line */}
        <div className="w-full h-[1.5px] bg-zinc-900">
          <div
            className="h-full bg-zinc-300 transition-all duration-100 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
          />
        </div>

        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-13 py-2">
            {/* Clean Brand Wordmark */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-7 h-7 rounded bg-zinc-100 text-zinc-950 font-bold flex items-center justify-center text-xs tracking-tight">
                JK
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xs tracking-wider text-zinc-100 uppercase">
                  JK Vidros <span className="text-zinc-400 font-medium">Private</span>
                </span>
                <span className="text-[9px] text-zinc-400 font-mono tracking-widest uppercase">
                  Apresentação Oficial
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-4 text-xs text-zinc-400">
              {navLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`transition-colors hover:text-zinc-100 ${
                    activeSection === item.id ? 'text-zinc-100 font-semibold' : ''
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Admin Key & WhatsApp Concierge */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenAdmin}
                className={`p-1.5 rounded-lg border transition ${
                  isAdminLoggedIn
                    ? 'bg-zinc-800 text-emerald-400 border-emerald-500/40'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                }`}
                title={isAdminLoggedIn ? 'Painel Admin Conectado' : 'Acesso Admin'}
                aria-label="Acesso Admin"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>

              <a
                href="https://wa.me/5511987654321?text=Ol%C3%A1.%20Assisti%20%C3%A0%20apresenta%C3%A7%C3%A3o%20da%20JK%20Vidros%20e%20gostaria%20de%20um%20atendimento%20executivo."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-zinc-100 hover:bg-white text-zinc-950 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg active:scale-95 transition-all shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Concierge</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Fixed Bottom Mobile App Tab Bar (Ergonomic Thumb Reach for Presentation) */}
      <nav
        aria-label="Roteiro da Apresentação"
        className="fixed bottom-0 left-0 right-0 z-40 bg-[#090b0e]/95 backdrop-blur-lg border-t border-zinc-800/80 px-2 py-1 pb-safe md:hidden"
      >
        <div className="max-w-md mx-auto grid grid-cols-5 items-center">
          {mobileNavLinks.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`min-h-[46px] flex flex-col items-center justify-center gap-1 py-1 rounded-lg transition-colors ${
                  isActive ? 'text-zinc-100' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-zinc-100' : 'text-zinc-400'}`} />
                <span className={`text-[10px] tracking-tight leading-none ${isActive ? 'font-semibold text-zinc-100' : 'font-normal'}`}>
                  {item.label}
                </span>
                {isActive && <span className="w-1 h-1 rounded-full bg-zinc-200 mt-0.5" />}
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
};
