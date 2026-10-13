import React, { useEffect, useState } from "react";
import { getAreas, getCategories, getSubCategories, getBrands, getSpendRanges } from "../services/api";
import type { Area, Category, SubCategory, Brand, SpendRange } from "../types";

const JoinForm = ({ currentStep, setCurrentStep }) => {

  // Area suggestions
  const [areas, setAreas] = useState<Area[]>([])
  const [loadingAreas, setLoadingAreas] = useState(true)
  const [areaError, setAreaError] = useState("")

  // Category suggestions
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categoryError, setCategoryError] = useState("");

  // Subcategory suggestions
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<number[]>([]);
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);
  const [subCategoryError, setSubCategoryError] = useState("");

  // Brand suggestions
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [loadingBrands, setLoadingBrands] = useState(false);
  const [brandError, setBrandError] = useState("");

  // Spend Ranges
  const [spendRanges, setSpendRanges] = useState<SpendRange[]>([]);
  const [selectedSpendRange, setSelectedSpendRange] = useState<number | null>(null);
  const [loadingSpendRanges, setLoadingSpendRanges] = useState(false);
  const [spendRangeError, setSpendRangeError] = useState("");

  // Notify me
  const [notifyMe, setNotifyMe] = useState(true);

  // User Details
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [selectedArea, setSelectedArea] = useState("");


  // Validation
  const validateDetails = () => {
    if (!name.trim()) {
      alert("Please enter your name.");
      return false;
    }

    if (!/^\d{10}$/.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return false;
    }

    if (!selectedArea) {
      alert("Please select your area.");
      return false;
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  // Continue button onClick
  const handleContinue = () => {
    if (currentStep === 1 && !validateDetails()) {
      return;
    }

    setCurrentStep((step) => Math.min(step + 1, 6));
  }

  // Area use effect
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

  // Category use effect 
  useEffect(() => {
    if (currentStep !== 2 || categories.length > 0) return;

    const fetchCategories = async () => {
      setLoadingCategories(true);
      setCategoryError("");

      try {
        const data = await getCategories();
        setCategories(data);
      } catch {
        setCategoryError("Unable to load categories. Please try again.");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [currentStep, categories.length]);

  // Step 3 Subcategory
  useEffect(() => {
    if (currentStep !== 3 || subCategories.length > 0) return;

    const fetchSubCategories = async () => {
      setLoadingSubCategories(true);
      setSubCategoryError("");

      try {
        const data = await getSubCategories();
        setSubCategories(data);
      } catch {
        setSubCategoryError("Unable to load subcategories. Please try again.");
      } finally {
        setLoadingSubCategories(false);
      }
    };

    fetchSubCategories();
  }, [currentStep, subCategories.length]);

  // Step 4 Brand
  useEffect(() => {
    if (currentStep !== 4 || brands.length > 0) return;

    const fetchBrands = async () => {
      setLoadingBrands(true);
      setBrandError("");

      try {
        const data = await getBrands();
        setBrands(data);
      } catch {
        setBrandError("Unable to load brands. Please try again.");
      } finally {
        setLoadingBrands(false);
      }
    };

    fetchBrands();
  }, [currentStep, brands.length]);

  // Step 5 Spend Ranges

  useEffect(() => {
    if (currentStep !== 5 || spendRanges.length > 0) return;

    const fetchSpendRanges = async () => {
      setLoadingSpendRanges(true);
      setSpendRangeError("");

      try {
        const data = await getSpendRanges();
        setSpendRanges(data);
      } catch {
        setSpendRangeError("Unable to load spend ranges. Please try again.");
      } finally {
        setLoadingSpendRanges(false);
      }
    };

    fetchSpendRanges();
  }, [currentStep, spendRanges.length]);


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

      {/* Step 1 fields */}
      {currentStep === 1 && (
        <>
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
              value={name}
              onChange={(event) => setName(event.target.value)}
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
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
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
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
              value={selectedArea}
              onChange={(event) => setSelectedArea(event.target.value)}
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
        </>
      )
      }

      {/* Step 2 Categories */}

      {currentStep === 2 && (
        <div className="mt-6">
          <h4 className="text-lg font-bold text-black">
            What are you shopping for?
          </h4>

          <p className="mt-1 text-sm text-black/60">
            Select all that interest you.
          </p>

          {loadingCategories ? (
            <p className="mt-5 text-sm text-black/60">
              Loading categories...
            </p>
          ) : categoryError ? (
            <div className="mt-5">
              <p className="text-sm text-red-600">{categoryError}</p>
              <button
                type="button"
                onClick={() => setCategories([])}
                className="mt-2 text-sm font-semibold text-[#E73F1E]"
              >
                Try again
              </button>
            </div>
          ) : (
            <div className="mt-5 flex flex-wrap gap-3">
              {categories.map((category) => {
                const isSelected = selectedCategories.includes(category.id);

                return (
                  <button
                    key={category.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => {
                      setSelectedCategories((previous) =>
                        isSelected
                          ? previous.filter((id) => id !== category.id)
                          : [...previous, category.id]
                      );
                    }}
                    className={`rounded-full border px-4 py-3 text-sm font-semibold transition ${isSelected
                      ? "border-[#E73F1E] bg-[#E73F1E] text-white"
                      : "border-black/15 bg-white text-black hover:border-[#E73F1E]"
                      }`}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>
          )}

          {!loadingCategories && !categoryError && categories.length === 0 && (
            <p className="mt-4 text-sm text-black/60">
              No categories available yet.
            </p>
          )}

          {selectedCategories.length > 0 && (
            <p className="mt-4 text-xs text-black/60">
              {selectedCategories.length} categor
              {selectedCategories.length === 1 ? "y" : "ies"} selected
            </p>
          )}
        </div>
      )}

      {/* Step 3 Subcategories */}
      {currentStep === 3 && (
        <div className="mt-6">
          <h4 className="text-lg font-bold text-black">
            Choose your interests
          </h4>

          <p className="mt-1 text-sm text-black/60">
            Select the styles or departments you like.
          </p>

          {loadingSubCategories ? (
            <p className="mt-5 text-sm text-black/60">
              Loading subcategories...
            </p>
          ) : subCategoryError ? (
            <div className="mt-5">
              <p className="text-sm text-red-600">{subCategoryError}</p>
              <button
                type="button"
                onClick={() => setSubCategories([])}
                className="mt-2 text-sm font-semibold text-[#E73F1E]"
              >
                Try again
              </button>
            </div>
          ) : (
            <div className="mt-5 flex flex-wrap gap-3">
              {subCategories.map((subCategory) => {
                const isSelected = selectedSubCategories.includes(subCategory.id);

                return (
                  <button
                    key={subCategory.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => {
                      setSelectedSubCategories((previous) =>
                        isSelected
                          ? previous.filter((id) => id !== subCategory.id)
                          : [...previous, subCategory.id]
                      );
                    }}
                    className={`rounded-full border px-4 py-3 text-sm font-semibold transition ${isSelected
                      ? "border-[#E73F1E] bg-[#E73F1E] text-white"
                      : "border-black/15 bg-white text-black hover:border-[#E73F1E]"
                      }`}
                  >
                    {subCategory.name}
                  </button>
                );
              })}
            </div>
          )}

          {!loadingSubCategories &&
            !subCategoryError &&
            subCategories.length === 0 && (
              <p className="mt-4 text-sm text-black/60">
                No subcategories available yet.
              </p>
            )}

          {selectedSubCategories.length > 0 && (
            <p className="mt-4 text-xs text-black/60">
              {selectedSubCategories.length} subcategor
              {selectedSubCategories.length === 1 ? "y" : "ies"} selected
            </p>
          )}
        </div>
      )}

      {/* Step 4 Brand */}
      {currentStep === 4 && (
        <div className="mt-6">
          <h4 className="text-lg font-bold text-black">
            Which brands do you love?
          </h4>

          <p className="mt-1 text-sm text-black/60">
            Select all the brands you would like to explore.
          </p>

          {loadingBrands ? (
            <p className="mt-5 text-sm text-black/60">
              Loading brands...
            </p>
          ) : brandError ? (
            <div className="mt-5">
              <p className="text-sm text-red-600">{brandError}</p>
              <button
                type="button"
                onClick={() => setBrands([])}
                className="mt-2 text-sm font-semibold text-[#E73F1E]"
              >
                Try again
              </button>
            </div>
          ) : (
            <div className="mt-5 flex flex-wrap gap-3">
              {brands.map((brand) => {
                const isSelected = selectedBrands.includes(brand.id);

                return (
                  <button
                    key={brand.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => {
                      setSelectedBrands((previous) =>
                        isSelected
                          ? previous.filter((id) => id !== brand.id)
                          : [...previous, brand.id]
                      );
                    }}
                    className={`rounded-full border px-4 py-3 text-sm font-semibold transition ${isSelected
                      ? "border-[#E73F1E] bg-[#E73F1E] text-white"
                      : "border-black/15 bg-white text-black hover:border-[#E73F1E]"
                      }`}
                  >
                    {brand.name}
                  </button>
                );
              })}
            </div>
          )}

          {!loadingBrands && !brandError && brands.length === 0 && (
            <p className="mt-4 text-sm text-black/60">
              No brands available yet.
            </p>
          )}

          {selectedBrands.length > 0 && (
            <p className="mt-4 text-xs text-black/60">
              {selectedBrands.length} brand
              {selectedBrands.length === 1 ? "" : "s"} selected
            </p>
          )}
        </div>
      )}

      {/* Step 5 Spend Ranges */}

      {currentStep === 5 && (
        <div className="mt-6">
          <h4 className="text-lg font-bold text-black">
            What's your preferred budget?
          </h4>

          <p className="mt-1 text-sm text-black/60">
            Choose the spending range that suits you best.
          </p>

          {loadingSpendRanges ? (
            <p className="mt-5 text-sm text-black/60">
              Loading spend ranges...
            </p>
          ) : spendRangeError ? (
            <div className="mt-5">
              <p className="text-sm text-red-600">{spendRangeError}</p>
              <button
                type="button"
                onClick={() => setSpendRanges([])}
                className="mt-2 text-sm font-semibold text-[#E73F1E]"
              >
                Try again
              </button>
            </div>
          ) : (
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {spendRanges.map((range) => {
                const isSelected = selectedSpendRange === range.id;

                return (
                  <button
                    key={range.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedSpendRange(range.id)}
                    className={`rounded-xl border p-4 text-left transition ${isSelected
                      ? "border-[#E73F1E] bg-[#E73F1E]/10"
                      : "border-black/15 bg-white hover:border-[#E73F1E]"
                      }`}
                  >
                    <span className="block text-base font-bold text-black">
                      ₹{range.low_range.toLocaleString("en-IN")} – ₹
                      {range.high_range.toLocaleString("en-IN")}
                    </span>

                    <span className="mt-1 block text-xs text-black/55">
                      {isSelected ? "Selected" : "Tap to select"}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {!loadingSpendRanges &&
            !spendRangeError &&
            spendRanges.length === 0 && (
              <p className="mt-4 text-sm text-black/60">
                No spend ranges available yet.
              </p>
            )}
        </div>
      )}

      {/* Notify me */}

      {currentStep === 6 && (
        <div className="mt-6">
          <h4 className="text-lg font-bold text-black">
            Be the first to know.
          </h4>

          <p className="mt-2 text-sm leading-6 text-black/60">
            Get notified when VYRA launches and brings your favourite styles
            to your doorstep in 60 minutes.
          </p>

          <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-black/10 bg-white p-4">
            <input
              type="checkbox"
              checked={notifyMe}
              onChange={(event) => setNotifyMe(event.target.checked)}
              className="mt-1 h-4 w-4 accent-[#E73F1E]"
            />

            <span>
              <span className="block text-sm font-semibold text-black">
                Yes, notify me when VYRA launches
              </span>

              <span className="mt-1 block text-xs leading-5 text-black/55">
                We'll use your provided contact details for launch updates.
              </span>
            </span>
          </label>
        </div>
      )}



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
          onClick={() => handleContinue()}
          className="rounded-full bg-[#FFDD9C] px-5 py-2 text-sm font-bold text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continue →
        </button>
      </div>


    </div>
  );
};

export default JoinForm;
