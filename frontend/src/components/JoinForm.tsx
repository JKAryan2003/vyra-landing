import React, { useEffect, useState } from "react";
import { createCustomer, getAreas, getCategories, getSubCategories, getBrands, getSpendRanges } from "../services/api";
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


  const [submitErrors, setSubmitErrors] = useState<Record<string, string[]>>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


  const parseBackendErrors = (error: unknown) => {
    if (!(error instanceof Error)) {
      return {
        fieldErrors: {} as Record<string, string[]>,
        generalError: "Something went wrong. Please try again.",
      };
    }

    try {
      const data = JSON.parse(error.message);

      if (data && typeof data === "object" && !Array.isArray(data)) {
        const fieldErrors: Record<string, string[]> = {};
        const generalMessages: string[] = [];

        for (const [field, value] of Object.entries(data)) {
          const messages = Array.isArray(value)
            ? value.map(String)
            : [String(value)];

          if (field === "detail" || field === "non_field_errors") {
            generalMessages.push(...messages);
          } else {
            fieldErrors[field] = messages;
          }
        }

        return {
          fieldErrors,
          generalError: generalMessages.join(" "),
        };
      }
    } catch {
      // The error message wasn't JSON.
    }

    return {
      fieldErrors: {} as Record<string, string[]>,
      generalError: error.message || "Something went wrong. Please try again.",
    };
  };



  const handleSubmit = async () => {
    setSubmitErrors({});
    setSubmitError("");
    setIsSubmitting(true);

    try {
      await createCustomer({
        name: name.trim(),
        mobile: mobile.trim(),
        email: email.trim(),
        area: selectedArea ? Number(selectedArea) : null,
        categories: selectedCategories,
        subcategories: selectedSubCategories,
        brands: selectedBrands,
        spend_range: selectedSpendRange,
        note: "",
        notify_me: notifyMe,
      });

      // Temporary success behavior; we'll improve this later.

      alert("Thank you! Your response has been submitted.");

      // Reset user details
      setName("");
      setMobile("");
      setEmail("");
      setSelectedArea("");

      // Reset selections
      setSelectedCategories([]);
      setSelectedSubCategories([]);
      setSelectedBrands([]);
      setSelectedSpendRange(null);

      // Reset notification preference
      setNotifyMe(true);

      // Reset validation errors
      setSubmitErrors({});
      setSubmitError("");

      // Return to the first step
      setCurrentStep(1);

    } catch (error: unknown) {
      const parsed = parseBackendErrors(error);

      setSubmitErrors(parsed.fieldErrors);
      setSubmitError(parsed.generalError);
    } finally {
      setIsSubmitting(false);
    }
  };


  // Continue button onClick


  const handleContinue = () => {
    setSubmitErrors({});
    setSubmitError("");

    if (currentStep === 1) {
      const errors: Record<string, string[]> = {};

      if (!name.trim()) {
        errors.name = ["Name is required."];
      }

      if (!/^\d{10}$/.test(mobile.trim())) {
        errors.mobile = ["Enter a valid 10-digit mobile number."];
      }

      if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        errors.email = ["Enter a valid email address."];
      }

      if (!selectedArea) {
        errors.area = ["Please select your area."];
      }

      if (Object.keys(errors).length > 0) {
        setSubmitErrors(errors);
        return;
      }
    }


    // Validate selections on steps 2–5
    const errors: Record<string, string[]> = {};

    if (currentStep === 2 && selectedCategories.length === 0) {
      errors.categories = ["Please select at least one category."];
    }

    if (currentStep === 3 && selectedSubCategories.length === 0) {
      errors.subcategories = ["Please select at least one subcategory."];
    }

    if (currentStep === 4 && selectedBrands.length === 0) {
      errors.brands = ["Please select at least one brand."];
    }

    if (currentStep === 5 && selectedSpendRange === null) {
      errors.spend_range = ["Please select a spend range."];
    }

    if (Object.keys(errors).length > 0) {
      setSubmitErrors(errors);
      return;
    }


    setCurrentStep((step) => Math.min(step + 1, 6));
  };



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


      {submitError && (
        <div
          role="alert"
          className="mb-4 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {submitError}
        </div>
      )}


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
              onChange={(event) => {
                setName(event.target.value);
                setSubmitErrors((prev) => ({ ...prev, name: [] }));
              }}
              type="text"
              placeholder="Enter your name"
              className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#E73F1E] focus:ring-2 focus:ring-[#E73F1E]/20"
            />


            {submitErrors.name && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {submitErrors.name.join(" ")}
              </p>
            )}

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
              onChange={(event) => {
                setMobile(event.target.value);
                setSubmitErrors((prev) => ({ ...prev, mobile: [] }));
              }}
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="Enter your 10-digit mobile number"
              className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#E73F1E] focus:ring-2 focus:ring-[#E73F1E]/20"
            />


            {submitErrors.mobile && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {submitErrors.mobile.join(" ")}
              </p>
            )}

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
              onChange={(event) => {
                setEmail(event.target.value);
                setSubmitErrors((prev) => ({ ...prev, email: [] }));
              }}
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#E73F1E] focus:ring-2 focus:ring-[#E73F1E]/20"
            />


            {submitErrors.email && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {submitErrors.email.join(" ")}
              </p>
            )}

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
              onChange={(event) => {
                setSelectedArea(event.target.value);
                setSubmitErrors((prev) => ({ ...prev, area: [] }));
              }}
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


            {submitErrors.area && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {submitErrors.area.join(" ")}
              </p>
            )}

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

                      setSubmitErrors((prev) => ({
                        ...prev,
                        categories: [],
                      }));
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


          {submitErrors.categories && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {submitErrors.categories.join(" ")}
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

                      setSubmitErrors((prev) => ({
                        ...prev,
                        subcategories: [],
                      }));
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


          {submitErrors.subcategories && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {submitErrors.subcategories.join(" ")}
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

                      setSubmitErrors((prev) => ({
                        ...prev,
                        brands: [],
                      }));
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



          {submitErrors.brands && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {submitErrors.brands.join(" ")}
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

                    onClick={() => {
                      setSelectedSpendRange(range.id);

                      setSubmitErrors((prev) => ({
                        ...prev,
                        spend_range: [],
                      }));
                    }}

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


          {submitErrors.spend_range && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {submitErrors.spend_range.join(" ")}
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

          {submitErrors.notify_me && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {submitErrors.notify_me.join(" ")}
            </p>
          )}

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
          disabled={isSubmitting || currentStep === 6}
          onClick={handleContinue}
          className="flex-1 rounded-full border border-[#E73F1E] px-5 py-3 text-[#E73F1E] transition hover:bg-[#E73F1E] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue →
        </button>

        {currentStep === 6 && (
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="flex-1 rounded-full bg-[#E73F1E] px-5 py-3 text-white transition hover:bg-[#c93418] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Finish"}
          </button>
        )}

      </div>


    </div>
  );
};

export default JoinForm;
