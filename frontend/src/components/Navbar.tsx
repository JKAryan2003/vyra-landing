import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("hero");




  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        document.getElementById("hero"),
        document.getElementById("how-it-works"),
        document.getElementById("join-us"),
      ].filter(Boolean);

      // Find the section occupying the area just below the navbar.
      const navbarHeight = 80;
      const section = sections.find((element) => {
        const rect = element.getBoundingClientRect();
        return rect.top <= navbarHeight && rect.bottom > navbarHeight;
      });

      if (section) {
        setActiveSection(section.id);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);
  


  const isWhite = activeSection === "how-it-works";

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-8 py-4 transition-colors duration-500 ease-in-out lg:px-20 ${isWhite
        ? "bg-white text-[#E73F1E]"
        : "bg-[#E73F1E] text-[#FFDD9C]"
        }`}
    >
      <div className="text-2xl font-black uppercase tracking-[-1px]">
        VYRA
      </div>

      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>

        <span>60 Minutes</span>
      </div>
    </nav>
  );
};

export default Navbar;
