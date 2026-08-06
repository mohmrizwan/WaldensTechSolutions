import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export const About = () => {
  return (
    <>
      <Header />

      <div className="about-wrapper mx-auto px-7 mt-24">
        <div className="about-inner">
          {/* Centered intro */}
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl tracking-wider font-space text-[#F4C95D]">
              ABOUT US
            </h3>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white font-space leading-tight">
              A small team obsessed with getting it right.
            </h2>
            <p className="mt-6 text-[#B8C0D0] text-lg leading-8">
              We're a lean web design and development studio that partners with
              founders and teams who want their site to feel as good as their
              product — fast, clear, and built to last.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            {/* Left - Image with floating stat card */}
            <div className="relative">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-[#24304A] bg-[#0B1220]">
                <img
                  src=""
                  alt="About us"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-8 -right-6 rounded-2xl border border-[#F4C95D]/30 bg-gradient-to-br from-[#101827] to-[#0B1220] px-7 py-5 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                <h4 className="text-3xl font-bold text-[#F4C95D] font-space">
                  50+
                </h4>
                <p className="mt-1 text-sm text-[#B8C0D0]">Projects Shipped</p>
              </div>
            </div>

            {/* Right - Values list */}
            <div className="rounded-3xl border border-[#24304A] bg-gradient-to-br from-[#101827] to-[#0B1220] p-9 flex flex-col justify-center gap-6">
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#F4C95D]/30 bg-[#F4C95D]/10">
                  <i className="fa-solid fa-bullseye text-[#F4C95D]"></i>
                </span>
                <div>
                  <h4 className="text-lg font-bold text-white font-space">
                    Clarity over complexity
                  </h4>
                  <p className="mt-1 text-[#B8C0D0] leading-7">
                    Every decision is made to keep your site simple, fast, and
                    easy to maintain.
                  </p>
                </div>
              </div>

              <div className="h-px w-full bg-[#24304A]"></div>

              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#F4C95D]/30 bg-[#F4C95D]/10">
                  <i className="fa-solid fa-people-group text-[#F4C95D]"></i>
                </span>
                <div>
                  <h4 className="text-lg font-bold text-white font-space">
                    Direct, no middlemen
                  </h4>
                  <p className="mt-1 text-[#B8C0D0] leading-7">
                    You work with the people actually building your project —
                    not account managers.
                  </p>
                </div>
              </div>

              <div className="h-px w-full bg-[#24304A]"></div>

              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#F4C95D]/30 bg-[#F4C95D]/10">
                  <i className="fa-solid fa-arrow-trend-up text-[#F4C95D]"></i>
                </span>
                <div>
                  <h4 className="text-lg font-bold text-white font-space">
                    Built for growth
                  </h4>
                  <p className="mt-1 text-[#B8C0D0] leading-7">
                    We design and build with your next stage in mind, not just
                    the launch date.
                  </p>
                </div>
              </div>

              <div className="h-px w-full bg-[#24304A]"></div>

              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#F4C95D]/30 bg-[#F4C95D]/10">
                  <i className="fa-solid fa-gem text-[#F4C95D]"></i>
                </span>
                <div>
                  <h4 className="text-lg font-bold text-white font-space">
                    Quality over quantity
                  </h4>
                  <p className="mt-1 text-[#B8C0D0] leading-7">
                    We take on fewer projects at a time so every detail gets
                    proper attention.
                  </p>
                </div>
              </div>

              <div className="h-px w-full bg-[#24304A]"></div>

              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#F4C95D]/30 bg-[#F4C95D]/10">
                  <i className="fa-solid fa-comments text-[#F4C95D]"></i>
                </span>
                <div>
                  <h4 className="text-lg font-bold text-white font-space">
                    Transparent communication
                  </h4>
                  <p className="mt-1 text-[#B8C0D0] leading-7">
                    Clear updates at every step, so you always know exactly
                    where your project stands.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-14 text-center">
            <button className="group inline-flex items-center gap-2 rounded-full bg-[#F4C95D] px-8 py-4 text-base font-space font-semibold text-[#0B1220] transition-all duration-300 hover:bg-white hover:gap-4 hover:shadow-[0_15px_40px_rgba(244,201,93,0.3)]">
              <span>Let's Talk</span>
              <i className="fa-solid fa-arrow-right transition-transform duration-300 group-hover:translate-x-1"></i>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;