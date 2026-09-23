/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { GlassBackgroundAnimation } from './components/GlassBackgroundAnimation';
import { Navbar } from './components/Navbar';
import { VideoSection } from './components/VideoSection';
import { HeroSection } from './components/HeroSection';
import { QuemSomosSection } from './components/QuemSomosSection';
import { ProdutosSection } from './components/ProdutosSection';
import { CasasLimpeiSection } from './components/CasasLimpeiSection';
import { InstagramFeedSection } from './components/InstagramFeedSection';
import { ParceirosSection } from './components/ParceirosSection';
import { PlanosSection } from './components/PlanosSection';
import { ContatosSection } from './components/ContatosSection';
import { Footer } from './components/Footer';
import { AdminModal } from './components/AdminModal';
import { MessageSquare } from 'lucide-react';

function AppContent() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const progress = Math.min(1, Math.max(0, window.scrollY / totalScroll));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#090b0e] text-zinc-100 overflow-x-hidden selection:bg-zinc-700 selection:text-white">
      {/* 1. Squeegee Glass Cleaning Animation (Background Layer) */}
      <GlassBackgroundAnimation scrollProgress={scrollProgress} />

      {/* 2. Executive Single-Page Presentation Stream */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Sticky Top Header & Bottom Mobile Navigation Bar */}
        <Navbar
          scrollProgress={scrollProgress}
          onOpenAdmin={() => setIsAdminModalOpen(true)}
        />

        {/* Main Presentation Body */}
        <main className="flex-grow pb-12">
          {/* Começo do Site: Vídeo de Apresentação Executiva */}
          <VideoSection />

          {/* 01. O Que Faço: Serviço Técnico & Antes/Depois Interativo */}
          <HeroSection />

          {/* Protocolo Técnico & Garantias Executivas */}
          <QuemSomosSection />

          {/* 02. Produtos Que Uso: Química Neutra & Instrumental */}
          <ProdutosSection />

          {/* 03. Casas Que Já Limpei: Portfólio de Fotos com Gestão Admin */}
          <CasasLimpeiSection onOpenAdmin={() => setIsAdminModalOpen(true)} />

          {/* 04. Instagram & Bastidores: Foto de Perfil, Bio & Fotos do Feed */}
          <InstagramFeedSection onOpenAdmin={() => setIsAdminModalOpen(true)} />

          {/* 05. Parcerias Que Possuo: Construtoras & Arquitetura */}
          <ParceirosSection />

          {/* 05. Orçamento & Planos de Serviços: Simulador Interativo */}
          <PlanosSection />

          {/* Agendamento & Contatos de Plantão */}
          <ContatosSection />
        </main>

        {/* Footer com Acesso ao Admin */}
        <Footer onOpenAdmin={() => setIsAdminModalOpen(true)} />
      </div>

      {/* Modal de Gestão Administrativa (Senha & Upload de Fotos) */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />

      {/* Floating Desktop WhatsApp Concierge Button */}
      <a
        id="btn-whatsapp-floating"
        href="https://wa.me/5511987654321?text=Ol%C3%A1.%20Assisti%20%C3%A0%20apresenta%C3%A7%C3%A3o%20da%20JK%20Vidros%20e%20gostaria%20de%20um%20atendimento%20executivo."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Atendimento Concierge WhatsApp"
        className="hidden md:flex fixed bottom-6 right-6 z-40 bg-zinc-100 hover:bg-white text-zinc-950 px-4 py-2.5 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all items-center gap-2 group font-semibold text-xs"
      >
        <MessageSquare className="w-4 h-4 fill-current" />
        <span>Concierge Executivo</span>
      </a>
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  );
}
