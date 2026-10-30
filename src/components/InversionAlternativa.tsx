import React, { useEffect, useRef } from "react";
import londonDeVideo from "@/assets/VideoLondon_Selemma.mp4";

const MAX_VIDEO_SECONDS = 8;

const InversionAlternativa = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeCheck = () => {
      if (video.currentTime >= MAX_VIDEO_SECONDS) {
        video.currentTime = 0;
        void video.play().catch(() => {});
      }
    };

    video.addEventListener("timeupdate", handleTimeCheck);
    const intervalId = window.setInterval(handleTimeCheck, 100);

    return () => {
      video.removeEventListener("timeupdate", handleTimeCheck);
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <section id="servicios-financieros" className="w-full pt-10 pb-20 bg-white">
      {/* Encabezado Superior */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 rounded-sm border border-[#C8A96A]/55 bg-[#FAF8F4] px-3.5 py-1 mb-3 shadow-2xs">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C8A96A]" />
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8C6D32]">
            Materias Preciosas · London DE Group
          </p>
        </div>
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">
          Diversificación y Refugio de <span className="font-extrabold">Capital</span>
        </h2>
      </div>

      {/* Contenedor Principal compacto y elegante con superposición */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 relative">
        <div className="flex flex-col lg:flex-row items-center justify-center">
          {/* Video de fondo (Izquierda) en proporción elegante y borde resaltado */}
          <div className="w-full lg:w-[430px] h-[360px] md:h-[430px] shrink-0 relative z-0 overflow-hidden rounded-sm bg-black border-2 border-[#C8A96A]/75 ring-1 ring-gray-900/15 shadow-[0_14px_36px_rgba(0,0,0,0.18)]">
            <video
              ref={videoRef}
              src={londonDeVideo}
              autoPlay
              loop
              muted
              playsInline
              onTimeUpdate={(e) => {
                const vid = e.currentTarget;
                if (vid.currentTime >= MAX_VIDEO_SECONDS) {
                  vid.currentTime = 0;
                  void vid.play().catch(() => {});
                }
              }}
              onEnded={(e) => {
                const vid = e.currentTarget;
                vid.currentTime = 0;
                void vid.play().catch(() => {});
              }}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Tarjeta superpuesta (Derecha) con borde definido y sombra elegante */}
          <div className="w-full lg:w-[540px] bg-white p-8 md:p-11 rounded-sm z-10 lg:-ml-16 mt-6 lg:mt-0 border border-gray-300/90 border-t-2 border-t-[#C8A96A] ring-1 ring-gray-900/5 shadow-[0_16px_48px_rgba(15,23,42,0.14)]">
            <h3 className="text-2xl md:text-[26px] text-gray-900 mb-5 font-medium tracking-tight">
              Pagaré <span className="font-bold">Renta Fija en Oro</span>
            </h3>

            <div className="space-y-4 text-gray-700 text-[13.5px] leading-relaxed">
              <p>
                En un entorno económico de inflación persistente e incertidumbre geopolítica, el oro y los metales preciosos siguen siendo uno de los activos más resilientes y líquidos del mundo para proteger su capital.
              </p>
              <p>
                Por ello, en alianza con London DE Group, ofrecemos acceso directo a una cadena de suministro global de oro y gemas. Estructuramos su participación en un instrumento financiero seguro que genera una rentabilidad fija del 18% anual, con pago de intereses mensuales.
              </p>
              <p>
                Nos enfocamos en diversificar su portafolio inmobiliario integrando activos refugio tangibles. Su inversión está respaldada por un fideicomiso en el Reino Unido con primer cargo sobre los activos, garantizando la preservación de su patrimonio a través de prácticas de extracción ética y sostenible.
              </p>
            </div>

            <a
              href="https://wa.me/573024700970?text=%C2%A1Hola!%20Quiero%20conocer%20m%C3%A1s%20sobre%20las%20opciones%20de%20London%20De"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-block bg-[#002B5B] hover:bg-[#001A38] text-white text-xs font-semibold py-3 px-7 rounded-sm shadow-sm transition duration-300"
            >
              Agendar Asesoría
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InversionAlternativa;
