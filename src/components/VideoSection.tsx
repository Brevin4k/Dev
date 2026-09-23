import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const VideoSection: React.FC = () => {
  const { videoConfig } = usePortfolio();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [userInteractedSound, setUserInteractedSound] = useState<boolean>(false);

  // Autoplay immediately on mount (browsers permit autoplay when muted is true)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // If browser blocked even muted autoplay (e.g. low power mode),
          // trigger on the first user touch/click on the document
          const handleFirstGesture = () => {
            video.play().then(() => setIsPlaying(true)).catch(() => {});
            window.removeEventListener('touchstart', handleFirstGesture);
            window.removeEventListener('click', handleFirstGesture);
          };
          window.addEventListener('touchstart', handleFirstGesture, { once: true, passive: true });
          window.addEventListener('click', handleFirstGesture, { once: true });
        });
    }
  }, [videoConfig.videoUrl]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    const newMuted = !videoRef.current.muted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
    setUserInteractedSound(true);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section id="apresentacao-video" className="pt-16 pb-6 px-4 sm:px-6 max-w-xl mx-auto scroll-mt-14">
      {/* Executive Intro Kicker */}
      <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-300">
          Apresentação Oficial · Ao Vivo
        </span>
        <span aria-hidden="true" className="text-zinc-700">·</span>
        <span className="text-[11px] text-zinc-400">JK Vidros Private</span>
      </div>

      <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-100 tracking-tight leading-tight mb-2">
        {videoConfig.videoTitle || 'Apresentação Executiva: Limpeza Pós-Obra em Vidros Nobres'}
      </h1>

      <p className="text-xs text-zinc-400 leading-relaxed mb-4">
        {videoConfig.videoSubtitle || 'Assista em 1 minuto como tratamos o vidro de alto padrão sem riscos, química agressiva ou danos a esquadrias nobres.'}
      </p>

      {/* Video Frame */}
      <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl group">
        <div
          className="relative aspect-video w-full bg-black flex items-center justify-center cursor-pointer select-none"
          onClick={togglePlay}
        >
          <video
            ref={videoRef}
            src={videoConfig.videoUrl}
            poster="/src/assets/images/luxury_villa_facade_1790144087617.jpg"
            autoPlay
            muted={isMuted}
            playsInline
            loop
            preload="auto"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="w-full h-full object-cover"
          />

          {/* Prompt to unmute audio if muted and playing (Mobile ergonomic button) */}
          {isPlaying && isMuted && !userInteractedSound && (
            <button
              type="button"
              onClick={toggleMute}
              className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 hover:bg-black/90 text-zinc-100 text-[11px] font-medium border border-white/20 shadow-lg backdrop-blur-md transition transform active:scale-95 pointer-events-auto"
            >
              <VolumeX className="w-3.5 h-3.5 text-zinc-300" />
              <span>Toque para ativar som</span>
            </button>
          )}

          {/* Scrim Overlay only when Paused by the user */}
          {!isPlaying && (
            <div
              className="absolute inset-0 bg-black/55 backdrop-blur-[1px] flex flex-col items-center justify-center transition-all hover:bg-black/45"
            >
              <div className="w-14 h-14 rounded-full bg-zinc-100/95 text-zinc-950 flex items-center justify-center shadow-xl transform group-hover:scale-105 active:scale-95 transition-transform pl-1">
                <Play className="w-6 h-6 fill-current text-zinc-950" />
              </div>
              <span className="text-xs font-semibold text-zinc-200 mt-3 tracking-wide">
                Vídeo Pausado · Toque para Continuar
              </span>
            </div>
          )}

          {/* Quick HUD controls */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-auto bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 opacity-90 hover:opacity-100 transition-opacity z-10"
          >
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={togglePlay}
                className="p-1 text-zinc-200 hover:text-white transition"
                aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              </button>

              <button
                type="button"
                onClick={toggleMute}
                className="p-1 text-zinc-200 hover:text-white transition flex items-center gap-1"
                aria-label={isMuted ? 'Ativar áudio' : 'Desativar áudio'}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-4 h-4 text-zinc-300" />
                    <span className="text-[10px] text-zinc-400 hidden sm:inline">Mudo</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-[10px] text-emerald-400 font-medium hidden sm:inline">Som ativo</span>
                  </>
                )}
              </button>

              <span className="text-[10px] text-zinc-400 font-mono hidden xs:inline">
                {isPlaying ? 'Em reprodução' : 'Pausado'}
              </span>
            </div>

            <button
              type="button"
              onClick={handleFullscreen}
              className="p-1 text-zinc-200 hover:text-white transition"
              aria-label="Tela cheia"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Presentation Roadmap Micro-Indicator */}
      <div className="mt-3 flex items-center justify-between text-[10px] text-zinc-400 border-b border-zinc-800/80 pb-2">
        <span>Roteiro da apresentação:</span>
        <span className="text-zinc-300 font-medium">Role para baixo para ver o serviço ↓</span>
      </div>
    </section>
  );
};
