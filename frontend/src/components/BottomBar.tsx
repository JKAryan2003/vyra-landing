import React from 'react'

const BottomBar = () => {
  return (
    <footer className="bg-[#FFF8EE] px-6 py-5 sm:px-10 lg:px-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <a
          href="#hero"
          className="text-2xl font-black tracking-tight text-[#E73F1E]"
        >
          VYRA<span className="text-xs align-top">®</span>
        </a>

        <nav className="flex flex-wrap items-center gap-5 text-sm text-black/70">
          <a href="#hero" className="transition hover:text-[#E73F1E]">
            Home
          </a>
          <a href="#how-it-works" className="transition hover:text-[#E73F1E]">
            How It Works
          </a>
          <a href="#join-us" className="transition hover:text-[#E73F1E]">
            Join Us
          </a>
        </nav>
      </div>

      <div className="mt-4 flex flex-col gap-1 border-t border-black/10 pt-3 text-xs text-black/55 sm:flex-row sm:items-center sm:justify-between">
        <p>Your style, delivered in 60 minutes.</p>
        <p>© {new Date().getFullYear()} VYRA. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default BottomBar