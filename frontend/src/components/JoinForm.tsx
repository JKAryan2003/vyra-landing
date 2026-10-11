import React, { useEffect, useState } from "react";
import { getAreas } from "../services/api";
import type { Area } from "../types";

const JoinForm = ({currentStep, setCurrentStep}) => {

  // Area suggestions
  const [areas, setAreas] = useState<Area[]>([])
  const [loadingAreas, setLoadingAreas] = useState(true)
  const [areaError, setAreaError] = useState("")

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const data = await getAreas()
        setAreas(data)
      } catch (error) {
        setAreaError("Unable to fetch the Areas")
      } finally {
        setLoadingAreas(false)
      }
    }

    fetchAreas();
  }, [])


  return (
    <div className="w-full rounded-3xl bg-[#FFF8EE] p-5 sm:p-6 lg:p-7">
      <p className="mb-3 text-sm font-bold uppercase tracking-[3px] text-[#E73F1E]">
        Founding members
      </p>

      <h3 className="text-3xl font-black uppercase leading-tight tracking-[-1px] text-black sm:text-4xl">
        Get on the list.
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-black/65 sm:text-base">
        Be among the first to experience VYRA. Tell us what you love,
        and help shape what's coming next.
      </p>


      <div className="mt-5">
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-semibold text-black"
        >
          Your name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter your name"
          className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#E73F1E] focus:ring-2 focus:ring-[#E73F1E]/20"
        />
      </div>


      <div className="mt-4">
        <label
          htmlFor="mobile"
          className="mb-2 block text-sm font-semibold text-black"
        >
          Mobile number
        </label>

        <input
          id="mobile"
          name="mobile"
          type="tel"
          inputMode="numeric"
          maxLength={10}
          placeholder="Enter your 10-digit mobile number"
          className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#E73F1E] focus:ring-2 focus:ring-[#E73F1E]/20"
        />
      </div>


      <div className="mt-4">
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-semibold text-black"
        >
          Email address <span className="font-normal text-black/45">(optional)</span>
        </label>

        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#E73F1E] focus:ring-2 focus:ring-[#E73F1E]/20"
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-semibold text-black"
        >
          Your area in Bhubaneswar
        </label>

        <select
          id="area"
          name="area"
          defaultValue=""
          disabled={loadingAreas || areas.length === 0}
          className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-[#E73F1E] focus:ring-2 focus:ring-[#E73F1E]/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <option value="">
            {loadingAreas
              ? "Loading areas..."
              : areaError
                ? "Could not load areas"
                : areas.length === 0
                  ? "No areas available"
                  : "Select your area"}
          </option>

          {areas.map((area) => (
            <option key={area.id} value={area.id}>{area.name}</option>
          ))}
        </select>


      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          disabled={currentStep === 1}
          onClick={() => setCurrentStep((step) => step - 1)}
          className="rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ← Back
        </button>

        <button
          type="button"
          disabled={currentStep === 6}
          onClick={() => setCurrentStep((step) => step + 1)}
          className="rounded-full bg-[#FFDD9C] px-5 py-2 text-sm font-bold text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continue →
        </button>
      </div>


    </div>
  );
};

export default JoinForm;
