import React from "react";
import video from "../../assets/8042293-uhd_4096_2160_25fps.mp4";

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-[#E73F1E] px-6 pb-10 pt-28 lg:pt-32">

      {/* RANDOM ABSTRACT DRAWINGS */}
      <div className="pointer-events-none absolute inset-0 z-0">

        {/* LEFT DRAWING */}
        <svg
          className="absolute -left-[180px] top-[3%] h-[650px] w-[650px]"
          viewBox="0 0 500 500"
          fill="none"
        >
          <path
            d="M420 80
         C350 40 280 90 300 150
         C320 210 410 190 390 250
         C370 310 250 280 220 340
         C190 400 280 440 210 460
         C150 475 90 420 110 350
         C125 290 190 270 150 220
         C110 170 45 210 60 140
         C75 80 150 65 190 100"
            stroke="#F9B637"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.35"
          />

          <path
            d="M90 60
         C140 120 70 160 130 200
         C200 245 100 280 160 330
         C210 370 170 420 250 440"
            stroke="#F9B637"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.25"
          />
        </svg>


        {/* RIGHT DRAWING */}
        <svg
          className="absolute -right-[180px] top-[10%] h-[650px] w-[650px]"
          viewBox="0 0 500 500"
          fill="none"
        >
          <path
            d="M80 100
         C140 40 230 80 210 150
         C190 220 90 190 120 260
         C150 330 280 270 300 340
         C320 400 250 450 330 460
         C400 470 450 410 420 350
         C390 290 330 310 370 240
         C410 170 460 210 440 130
         C425 75 350 65 310 105"
            stroke="#F9B637"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.35"
          />

          <path
            d="M410 70
         C350 130 430 170 370 210
         C300 255 400 290 340 340
         C290 380 330 430 250 450"
            stroke="#F9B637"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.25"
          />
        </svg>

      </div>
      {/* VIDEO + OVERLAPPING TEXT */}
      <div className="relative z-10 mx-auto w-full max-w-[850px] mt-8">

        {/* TOP TEXT */}
        <h1 className="absolute left-1/2 top-0 z-10 w-full -translate-x-1/2 -translate-y-13 text-center text-[64px] font-black uppercase leading-[0.85] tracking-[-4px] text-[#F9B637] md:text-[100px] lg:text-[80px]">
          Your pick
        </h1>

        {/* VIDEO */}
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="w-full rounded-[30px] object-cover"
        />

        {/* JOIN BUTTON */}
        <button
          type="button"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                     rounded-full border border-white px-8 py-4
                     text-lg font-bold text-white
                     transition-all duration-300
                     hover:border-[#b6ff00] hover:text-[#b6ff00]"
        >
          JOIN US
        </button>

        {/* BOTTOM TEXT */}
        <h2 className="absolute bottom-0 left-1/2 z-10 w-full -translate-x-1/2 translate-y-12 text-center text-[56px] font-black uppercase leading-[0.85] tracking-[-3px] text-[#F9B637] md:text-[90px] lg:text-[80px]">
          Delivered

          in 60
        </h2>

      </div>

    </section>
  );
};

export default Hero;