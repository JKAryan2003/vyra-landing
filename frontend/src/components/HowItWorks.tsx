import React from "react";

const steps = [
  {
    number: "01",
    icon: "🛍️",
    title: "Tell us what you want.",
    back:
      "Share your style preferences, go-to brands, and what you would love delivered to your door in 60 minutes.",
  },
  {
    number: "02",
    icon: "📊",
    title: "We build around your demand.",
    back:
      "Your input directly shapes our inventory, brand partnerships, and launch categories for Bhubaneswar.",
  },
  {
    number: "03",
    icon: "⚡",
    title: "Get your style in 60.",
    back:
      "When VYRA launches, discover the right fit and get it delivered to your door in just 60 minutes.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="flex min-h-screen flex-col justify-center bg-white px-6 py-12 lg:px-20">

      {/* HEADING */}
      <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
        <p className="mb-4 text-sm font-bold uppercase tracking-[4px] text-[#E73F1E]">
          HOW IT WORKS
        </p>

        <h2 className="text-4xl font-black uppercase leading-[0.95] tracking-[-2px] text-black md:text-5xl lg:text-6xl">
          Three steps to
          <br />
          founding member
        </h2>
      </div>

      {/* CARDS */}
      <div className="mx-auto grid w-full max-w-7xl gap-5 md:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.number}
            className="group h-[320px] [perspective:1000px] md:h-[340px] lg:h-[360px]"
          >
            {/* FLIP CONTAINER */}
            <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

              {/* FRONT */}
              <div className="absolute inset-0 flex flex-col justify-between rounded-[28px] border border-black/10 bg-[#F7F7F5] p-6 md:p-7 lg:p-8 [backface-visibility:hidden]">
                <div className="flex items-start justify-between">
                  <span className="text-4xl">{step.icon}</span>
                  <span className="text-5xl font-bold text-black/10">
                    {step.number}
                  </span>
                </div>

                <div>
                  <h3 className="max-w-[300px] text-2xl font-black uppercase leading-[0.95] tracking-[-1px] lg:text-3xl">
                    {step.title}
                  </h3>

                  <p className="mt-5 text-xs font-medium uppercase tracking-[2px] text-[#E73F1E]">
                    Hover to discover ↗
                  </p>
                </div>
              </div>

              {/* BACK */}
              <div className="absolute inset-0 flex flex-col justify-between rounded-[28px] bg-[#E73F1E] p-6 text-[#FFDD9C] md:p-7 lg:p-8 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <span className="text-5xl font-bold text-[#FFDD9C]/30">
                  {step.number}
                </span>

                <div>
                  <h3 className="mb-4 text-xl font-black uppercase leading-tight lg:text-2xl">
                    {step.title}
                  </h3>

                  <p className="text-base leading-7 text-[#FFDD9C]/90">
                    {step.back}
                  </p>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default HowItWorks;
