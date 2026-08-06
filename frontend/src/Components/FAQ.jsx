import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="faq-wrapper mx-auto px-7 mt-24">
      <div className="faq-inner max-w-4xl mx-auto">
        <div className="faq-title">
          <h2 className="text-5xl md:text-6xl font-bold text-white font-space text-center">
            Questions before we start building?
          </h2>
        </div>

        <div className="faq-list mt-14 flex flex-col gap-4">
          {/* FAQ Item 1 */}
          <div className="rounded-2xl border border-[#24304A] bg-[#101827] overflow-hidden transition-colors duration-300 hover:border-[#F4C95D]/40">
            <button
              onClick={() => toggle(0)}
              className="w-full flex items-center justify-between gap-4 px-7 py-6 text-left"
            >
              <span className="text-lg md:text-xl font-bold text-white font-space">
                How long does a website project take?
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#F4C95D]/40">
                <i
                  className={`fa-solid fa-plus text-[#F4C95D] text-sm transition-transform duration-300 ${
                    openIndex === 0 ? "rotate-45" : ""
                  }`}
                ></i>
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                openIndex === 0
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-7 pb-6 text-[#B8C0D0] text-base leading-7 font-space text-lg">
                  Most projects take 2 to 4 weeks depending on scope, from
                  initial design to final launch.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Item 2 */}
          <div className="rounded-2xl border border-[#24304A] bg-[#101827] overflow-hidden transition-colors duration-300 hover:border-[#F4C95D]/40">
            <button
              onClick={() => toggle(1)}
              className="w-full flex items-center justify-between gap-4 px-7 py-6 text-left"
            >
              <span className="text-lg md:text-xl font-bold text-white font-space">
                Can you redesign our existing website?
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#F4C95D]/40">
                <i
                  className={`fa-solid fa-plus text-[#F4C95D] text-sm transition-transform duration-300 ${
                    openIndex === 1 ? "rotate-45" : ""
                  }`}
                ></i>
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                openIndex === 1
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden"> 
                <p className="px-7 pb-6 text-[#B8C0D0] text-base leading-7 font-space text-lg">
                  Yes, we specialize in modernizing outdated sites while
                  keeping the content and structure you want to preserve.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Item 3 */}
          <div className="rounded-2xl border border-[#24304A] bg-[#101827] overflow-hidden transition-colors duration-300 hover:border-[#F4C95D]/40">
            <button
              onClick={() => toggle(2)}
              className="w-full flex items-center justify-between gap-4 px-7 py-6 text-left"
            >
              <span className="text-lg md:text-xl font-bold text-white font-space">
                Will the website be mobile responsive?
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#F4C95D]/40">
                <i
                  className={`fa-solid fa-plus text-[#F4C95D] text-sm transition-transform duration-300 ${
                    openIndex === 2 ? "rotate-45" : ""
                  }`}
                ></i>
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                openIndex === 2
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-7 pb-6 text-[#B8C0D0] text-base leading-7 font-space text-lg">
                  Every project is built mobile-first and tested across
                  desktop, tablet, and phone screens before launch.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Item 4 */}
          <div className="rounded-2xl border border-[#24304A] bg-[#101827] overflow-hidden transition-colors duration-300 hover:border-[#F4C95D]/40">
            <button
              onClick={() => toggle(3)}
              className="w-full flex items-center justify-between gap-4 px-7 py-6 text-left"
            >
              <span className="text-lg md:text-xl font-bold text-white font-space">
                Do you provide support after launch?
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#F4C95D]/40">
                <i
                  className={`fa-solid fa-plus text-[#F4C95D] text-sm transition-transform duration-300 ${
                    openIndex === 3 ? "rotate-45" : ""
                  }`}
                ></i>
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                openIndex === 3
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-7 pb-6 text-[#B8C0D0] text-base font-space text-lg leading-7">
                  Yes, we offer ongoing support packages for updates, fixes,
                  and improvements after your site goes live.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;