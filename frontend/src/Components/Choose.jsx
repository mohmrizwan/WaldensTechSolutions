import React from "react";

const features = [
  {
    icon: "ri-sparkling-2-line",
    title: "Modern Design",
    desc: "Premium visuals that make your brand feel current and credible.",
  },
  {
    icon: "fa-solid fa-bolt",
    title: "Fast Performance",
    desc: "Lightweight pages optimized for speed and smooth interactions.",
  },
  {
    icon: "fa-solid fa-mobile",
    title: "Mobile Responsive",
    desc: "Every layout is tuned for desktop, tablet, and phone experiences.",
  },
  {
    icon: "fa-solid fa-magnifying-glass",
    title: "SEO Friendly",
    desc: "Clean structure, helpful metadata, and content hierarchy from day one.",
  },
  {
    icon: "fa-solid fa-dollar-sign",
    title: "Affordable Pricing",
    desc: "Flexible packages designed for startups and growing businesses.",
  },
  {
    icon: "fa-regular fa-handshake",
    title: "Ongoing Support",
    desc: "Post-launch guidance, updates, and improvements when you need them.",
  },
];

const Choose = () => {
  return (
    <div className="service-wrapper mx-auto px-7 mt-20">
      <div className="service-inner">
        <div className="service-head">
          <h3 className="text-3xl tracking-wider text-center font-space text-[#F4C95D]">
            WHY CHOOSE US
          </h3>
        </div>
        <div className="service-title mt-4">
          <h2 className="text-6xl font-bold text-white font-space text-center">
            A lean agency process built for <br /> speed, clarity, and long-term
            growth.
          </h2>
        </div>

        <div className="service-cards mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-[#0B1220] p-8 transition-all duration-500 hover:scale-[1.03]"
            >
              {/* Top accent bar - grows on hover */}
              <div className="absolute top-0 left-0 h-[3px] w-0 bg-[#F4C95D] transition-all duration-500 group-hover:w-full"></div>

              {/* Static border, brightens on hover */}
              <div className="absolute inset-0 rounded-2xl border border-[#24304A] transition-colors duration-500 group-hover:border-[#F4C95D]/50 pointer-events-none"></div>

              <div className="relative z-10 flex items-start gap-5">
                {/* Icon - rotates and fills gold on hover */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#F4C95D]/30 transition-all duration-500 group-hover:rotate-12 group-hover:bg-[#F4C95D] group-hover:border-[#F4C95D]">
                  <i
                    className={`${item.icon} text-lg text-[#F4C95D] transition-colors duration-500 group-hover:text-[#0B1220]`}
                  ></i>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white font-space">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[#B8C0D0] text-base leading-7">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Choose;
