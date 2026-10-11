import React, { useState } from "react";
import JoinForm from "./JoinForm";

const SignupForm = () => {

  // Step transition
  const [currentStep, setCurrentStep] = useState(1);


  return (
    <section
      id="join-us"
      className="relative box-border flex min-h-screen items-center bg-[#E73F1E] px-6 py-6 lg:min-h-screen lg:min-h-0 lg:overflow-hidden lg:px-20"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-6 lg:grid-cols-[1fr_0.9fr] lg:gap-12">

        <div className="flex h-full flex-col justify-center lg:justify-start lg:pt-6">
          <div>
            <p className="mb-6 text-sm font-bold uppercase tracking-[3px] text-[#FFDD9C]">
              Your fashion dispatch
            </p>

            <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-2px] text-black sm:text-6xl lg:text-7xl">
              <span className="block">Tell us</span>
              <span className="block">what lands next.</span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-black/75 sm:text-lg">
              A few quick picks and your stylist knows exactly what to send.
              Help us bring the styles you love to your doorstep in 60 minutes.
            </p>
          </div>


          <div className="mt-16 max-w-md lg:mt-20">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-bold uppercase tracking-[2px] text-[#FFDD9C]">
                Your progress
              </p>

              <p className="text-sm font-semibold text-white">
                Step {currentStep} of 6
              </p>
            </div>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6].map((step) => (
                <div
                  key={step}
                  className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${step <= currentStep ? "bg-[#FFDD9C]" : "bg-white/30"
                    }`}
                />
              ))}
            </div>

            <p className="mt-3 text-xs uppercase tracking-[1.5px] text-white/70">
              {[
                "Your details",
                "Categories",
                "Subcategories",
                "Brands",
                "Spend range",
                "Notifications",
              ][currentStep - 1]}
            </p>

          </div>

        </div>

        <JoinForm currentStep={currentStep}  setCurrentStep={setCurrentStep}/>
      </div>
    </section>
  );
};

export default SignupForm;
