import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { InstagramPost } from '../types';
import {
  Heart,
  MessageCircle,
  ExternalLink,
  BadgeCheck,
  PlusCircle,
  X,
  Instagram,
  DownloadCloud,
  Sparkles,
  Zap,
  Grid
} from 'lucide-react';

interface Props {
  onOpenAdmin: () => void;
}

export const InstagramFeedSection: React.FC<Props> = ({ onOpenAdmin }) => {
  const { instagramConfig } = usePortfolio();
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const widgetContainerRef = useRef<HTMLDivElement>(null);

  const cleanHandle = instagramConfig.handle.replace(/^@/, '');
  const instagramUrl = `https://instagram.com/${cleanHandle}`;

  // Execute widget scripts if in widget mode
  useEffect(() => {
    if (instagramConfig.feedMode === 'widget' && instagramConfig.widgetCode && widgetContainerRef.current) {
      widgetContainerRef.current.innerHTML = '';
      
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = instagramConfig.widgetCode;
      
      // Extract scripts and execute them properly
      const scripts = tempDiv.querySelectorAll('script');
      tempDiv.querySelectorAll('script').forEach((s) => s.remove());
      
      widgetContainerRef.current.appendChild(tempDiv);
      
      scripts.forEach((oldScript) => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        document.body.appendChild(newScript);
      });
    }
  }, [instagramConfig.feedMode, instagramConfig.widgetCode]);

  return (
    <section id="instagram-feed" className="py-7 sm:py-12 px-4 sm:px-6 max-w-xl mx-auto scroll-mt-16">
      {/* Section Header */}
      <div className="flex flex-col text-left mb-4">
        <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-1">
          05 · Instagram & Bastidores
        </span>
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight flex items-center gap-2">
            <span>Feed Oficial no Instagram</span>
          </h2>
          <button
            type="button"
            onClick={onOpenAdmin}
            className="text-[11px] text-zinc-200 hover:text-white inline-flex items-center gap-1.5 py-1 px-2.5 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 font-medium transition shadow-sm"
            title="Sincronizar feed e perfil do Instagram"
          >
            <DownloadCloud className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sincronizar</span>
          </button>
        </div>
        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
          Acompanhe os bastidores de nossas operações diárias em condomínios fechados e coberturas.
        </p>
      </div>

      {/* Instagram Profile Card (Quiet Luxury Styled) */}
      <div className="bg-zinc-900/70 border border-zinc-800/90 rounded-2xl p-4 mb-4 shadow-xl text-left">
        <div className="flex items-center justify-between gap-3">
          {/* Avatar with luxury gradient border */}
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-zinc-600 via-zinc-300 to-zinc-700">
              <img
                src={instagramConfig.profilePicUrl}
                alt={instagramConfig.profileName}
                className="w-full h-full object-cover rounded-full bg-zinc-950"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/src/assets/images/instagram_profile_avatar_1790144871581.jpg';
                }}
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-zinc-950 border border-zinc-700 flex items-center justify-center text-zinc-300">
              <Instagram className="w-3 h-3" />
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center justify-around flex-grow pl-2">
            <div className="text-center">
              <div className="text-sm font-bold text-zinc-100 font-mono">
                {instagramConfig.posts.length}
              </div>
              <div className="text-[10px] text-zinc-400">Publicações</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-zinc-100 font-mono">
                {instagramConfig.followersCount}
              </div>
              <div className="text-[10px] text-zinc-400">Seguidores</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-zinc-100 font-mono">
                {instagramConfig.followingCount}
              </div>
              <div className="text-[10px] text-zinc-400">Seguindo</div>
            </div>
          </div>
        </div>

        {/* Bio Details */}
        <div className="mt-3 text-left">
          <div className="flex items-center gap-1.5">
            <h3 className="text-xs font-bold text-zinc-100 tracking-tight">
              {instagramConfig.profileName}
            </h3>
            {instagramConfig.isVerified && (
              <BadgeCheck className="w-3.5 h-3.5 text-zinc-300 fill-zinc-300/20" />
            )}
          </div>
          <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
            @{cleanHandle}
          </p>

          <div className="text-xs text-zinc-300 mt-2 whitespace-pre-line leading-relaxed">
            {instagramConfig.bio}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-3.5 flex items-center gap-2">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-h-[38px] rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold flex items-center justify-center gap-1.5 transition active:scale-[0.98]"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>Seguir @{cleanHandle} no Instagram</span>
            <ExternalLink className="w-3 h-3 text-zinc-700" />
          </a>
        </div>
      </div>

      {/* RENDER CONDICIONAL: WIDGET OFICIAL EM TEMPO REAL OU GRADE NATIVA */}
      {instagramConfig.feedMode === 'widget' && instagramConfig.widgetCode ? (
        <div className="w-full rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 p-2">
          <div ref={widgetContainerRef} className="min-h-[200px]" />
        </div>
      ) : (
        /* Grid of Feed Posts (Mobile 2 columns, Desktop 2 or 3) */
        <div className="grid grid-cols-2 gap-2">
          {instagramConfig.posts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group relative aspect-square rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800/80 cursor-pointer shadow-md"
            >
              <img
                src={post.imageUrl}
                alt={post.caption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Hover/Touch Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white p-2">
                <div className="flex items-center gap-3 text-xs font-semibold">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-white text-white" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 fill-white text-white" />
                    {post.comments}
                  </span>
                </div>
                <span className="text-[10px] text-zinc-300 text-center line-clamp-2">
                  {post.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Live sync badge */}
      <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-500 px-1">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Sincronizado com @{cleanHandle}</span>
        </span>
        <button
          type="button"
          onClick={onOpenAdmin}
          className="text-zinc-400 hover:text-zinc-200 underline text-[10px]"
        >
          Opções de Sincronização Automática
        </button>
      </div>

      {/* Lightbox / Post Inspection Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-zinc-900 border border-zinc-700 rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-3 border-b border-zinc-800 bg-zinc-950/80">
              <div className="flex items-center gap-2">
                <img
                  src={instagramConfig.profilePicUrl}
                  alt={instagramConfig.profileName}
                  className="w-7 h-7 rounded-full object-cover border border-zinc-700"
                />
                <div className="text-left">
                  <span className="text-xs font-bold text-white block leading-none">
                    @{cleanHandle}
                  </span>
                  <span className="text-[10px] text-zinc-400 leading-none">
                    {selectedPost.date}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="w-7 h-7 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Post Image */}
            <div className="relative aspect-square w-full bg-black">
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.caption}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Post Metrics & Caption */}
            <div className="p-3.5 text-left">
              <div className="flex items-center justify-between text-xs text-zinc-300 mb-2">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 font-semibold text-rose-400">
                    <Heart className="w-4 h-4 fill-current" />
                    {selectedPost.likes} curtidas
                  </span>
                  <span className="flex items-center gap-1 text-zinc-400">
                    <MessageCircle className="w-4 h-4" />
                    {selectedPost.comments} comentários
                  </span>
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                <span className="font-bold text-white mr-1.5">@{cleanHandle}</span>
                {selectedPost.caption}
              </p>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-zinc-800">
                <a
                  href={selectedPost.postUrl || instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[38px] rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium flex items-center justify-center gap-1 transition"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Ver no Insta</span>
                </a>

                <a
                  href={`https://wa.me/5511987654321?text=Ol%C3%A1.%20Vi%20a%20publica%C3%A7%C3%A3o%20no%20Instagram%20da%20JK%20Vidros%20(${encodeURIComponent(selectedPost.caption.slice(0, 40))}...)%20e%20quero%20solicitar%20or%C3%A7amento.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[38px] rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold flex items-center justify-center gap-1 transition"
                >
                  <span>Orçamento</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
