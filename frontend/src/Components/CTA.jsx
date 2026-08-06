import React from "react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <div className="cta-wrapper mx-auto px-7 mt-24 mb-24">
      <div className="cta-inner relative overflow-hidden rounded-3xl border border-[#24304A] bg-gradient-to-b from-[#101827] to-[#0B1220] px-8 py-20 text-center">
        {/* Glow background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-[#F4C95D]/15 blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[#F4C95D]/10 blur-[100px]"></div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-white font-space">
            Ready to build your next website?
          </h2>

          <p className="mt-6 text-[#B8C0D0] text-lg leading-8">
            Tell us what you're building and we'll help shape a fast, premium
            website plan around your goals.
          </p>

          <Link to={"/contact"} className="group mt-9 inline-flex items-center gap-2 rounded-full bg-[#F4C95D] px-8 py-4 text-base font-space font-semibold text-[#0B1220] transition-all duration-300 hover:bg-white hover:gap-4 hover:shadow-[0_15px_40px_rgba(244,201,93,0.3)]">
            <span>Let's Talk</span>
            <i className="fa-solid fa-arrow-right transition-transform duration-300 group-hover:translate-x-1"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CTA;