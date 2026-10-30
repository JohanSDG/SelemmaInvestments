import React from "react";
import londonDeVideo from "@/assets/VideoLondon_Selemma.mp4";

const InversionAlternativa = () => {
  return (
    <section id="servicios-financieros" className="w-full py-16 bg-white">
      {/* Encabezado Superior */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">
          Diversificación y Refugio de <span className="font-extrabold">Capital</span>
        </h2>
        <p className="text-lg text-gray-600">Materias Preciosas</p>
      </div>

      {/* Contenedor Principal con superposición */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Video de fondo (Izquierda) */}
          <div className="w-full lg:w-3/5 h-[500px] relative z-0 overflow-hidden rounded-lg shadow-md bg-black">
            <video
              src={londonDeVideo}
              autoPlay
              loop
              muted
              playsInline
              controls
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Tarjeta superpuesta (Derecha) */}
          <div className="w-full lg:w-1/2 bg-white p-10 md:p-14 shadow-2xl rounded-sm z-10 lg:-ml-32 mt-8 lg:mt-0 border border-gray-100">
            <h3 className="text-3xl text-gray-900 mb-6 font-medium">
              Pagaré <span className="font-bold">Renta Fija en Oro</span>
            </h3>

            <div className="space-y-5 text-gray-700 text-sm leading-relaxed">
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
              className="mt-8 inline-block bg-[#002B5B] hover:bg-[#001A38] text-white font-semibold py-3 px-8 rounded-sm transition duration-300"
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
