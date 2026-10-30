import { useRef, useState } from 'react';
import { Play, Volume2 } from 'lucide-react';

const VIDEO_SRC = '/assets/aistudio/Operax___Destravar_I.A_551e3f04.mp4';

export function VideoSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const handleTogglePlay = async (e: React.MouseEvent) => {
    // Se o clique veio diretamente de algum controle nativo da barra, não intercepta
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      setHasStarted(true);
      try {
        video.muted = false;
        await video.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn('Tentativa com som bloqueada pelo navegador, reproduzindo mudo:', err);
        try {
          video.muted = true;
          await video.play();
          setIsPlaying(true);
        } catch (e) {
          console.error('Falha ao reproduzir o vídeo:', e);
        }
      }
    } else {
      // Se já começou e o clique foi no overlay, pausa
      if (!hasStarted) {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="w-full max-w-[980px] mx-auto rounded-[22px] bg-[#07110b] border border-[#1d3a26] p-2 sm:p-2.5 shadow-[0_24px_64px_rgba(0,0,0,0.65)]">
      <div
        className="relative w-full bg-black rounded-[16px] overflow-hidden flex items-center justify-center sm:h-[680px] cursor-pointer group"
        onClick={handleTogglePlay}
      >
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          controls={hasStarted}
          playsInline
          preload="auto"
          onPlay={() => {
            setIsPlaying(true);
            setHasStarted(true);
          }}
          onPause={() => setIsPlaying(false)}
          className="w-full max-w-[382px] sm:max-w-none sm:h-full sm:w-auto object-contain bg-black"
        >
          Seu navegador não suporta a reprodução de vídeo.
        </video>

        {/* Overlay com botão de Play visível antes do lead tocar */}
        {!isPlaying && (
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/45 hover:bg-black/30 transition-all duration-200"
          >
            <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full operax-btn-primary text-[#041207] shadow-[0_0_35px_rgba(91,245,71,0.55)] transition-transform duration-200 group-hover:scale-110 active:scale-95">
              <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-[#041207] ml-1" />
            </div>
            <span className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#09160e]/95 border border-[#24482f] text-xs sm:text-sm font-bold text-[#f7fff6] shadow-lg backdrop-blur-sm">
              <Volume2 className="w-4 h-4 text-[#5bf547] shrink-0 animate-pulse" />
              Toque para assistir com som
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
