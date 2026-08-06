import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import Services from "../Components/Services";
import Choose from "../Components/Choose";
import Project from "../Components/Project";
import Review from "../Components/Review";
import FAQ from "../Components/FAQ";
import CTA from "../Components/CTA";
import { fetchBanner } from "../api/bannerApi";

const Home = () => {
  const [banner, setBanner] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const loadBanner = async () => {
      try {
        const data = await fetchBanner();
        setBanner(data);
      } catch (error) {
        setLoadError("Unable to load homepage banner. Showing default content.");
      } finally {
        setIsLoading(false);
      }
    };

    loadBanner();
  }, []);

  const title = banner?.title || "Building Modern Websites";
  const highlight = banner?.highlight || "Websites";
  const subtitle =
    banner?.subtitle ||
    "We help startups and businesses create fast, responsive and user-friendly websites with exceptional UI/UX.";
  const primaryText = banner?.primaryCtaText || "Get a Free Consultation";
  const secondaryText = banner?.secondaryCtaText || "View Our Work";
  const primaryUrl = banner?.primaryCtaUrl || "/contact";
  const secondaryUrl = banner?.secondaryCtaUrl || "/project";
  const cards =
    banner?.cards?.length > 0
      ? banner.cards
      : [
          {
            title: "98%",
            value: "Client Satisfaction",
            description:
              "We build premium digital experiences with a strong focus on quality, communication, and long-term client success.",
          },
          {
            title: "100+",
            value: "Projects Delivered",
            description:
              "Modern business websites, landing pages, and scalable web applications designed to grow brands online.",
          },
          {
            title: "24/7",
            value: "Dedicated Support",
            description:
              "Ongoing maintenance, optimization, and technical support to ensure your website performs at its best.",
          },
        ];

  return (
    <>
      <Header />
      {/* banner section */}
      <div className="walden-banner-wrapper">
        <div className="walden-banner-inner px-5 flex justify-center flex-col items-center text-center">
          <div className="premium-border">
            <div className="premium flex items-center gap-2 font-space text-sm sm:text-base md:text-lg text-white">
              <i
                className="ri-sparkling-2-line"
                style={{ color: "0070FF" }}
              ></i>
              <span>Premium Websites For Ambitious Businesses</span>
            </div>
          </div>

          <div className="banner-title py-5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-extrabold font-space leading-tight">
              {title.replace(highlight, "")} 
              <span className="text-[#F4C95D] [text-shadow:0_0_8px_rgba(244,201,93,0.35),0_0_20px_rgba(244,201,93,0.25)]">
                {highlight}
              </span>
              <br className="hidden sm:block" />
            </h1>
          </div>

          <div className="banner-para">
            <p className="text-white text-center font-space text-base sm:text-lg md:text-xl px-2">
              {subtitle}
            </p>
          </div>

          <div className="banner-button flex flex-col sm:flex-row gap-4 sm:gap-5 my-5 w-full sm:w-auto items-center">
            <Link
              to={primaryUrl}
              className="group flex items-center justify-center gap-3 rounded-xl border border-[#F4C95D]/30 bg-[#0F172A] px-6 sm:px-7 py-3 sm:py-3.5 font-space font-semibold text-white transition-all duration-300 hover:border-[#F4C95D] hover:bg-[#131F33] hover:shadow-[0_0_25px_rgba(244,201,93,0.2)] w-full sm:w-auto"
            >
              <span className="transition-colors duration-300 text-base sm:text-lg group-hover:text-[#F4C95D]">
                {primaryText}
              </span>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5 text-[#F4C95D] transition-all duration-300 group-hover:translate-x-1 shrink-0"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                />
              </svg>
            </Link>

            <Link
              to={secondaryUrl}
              className="group flex items-center justify-center gap-3 rounded-xl border text-base sm:text-lg border-[#F4C95D]/40 bg-[#111827] px-6 py-3 font-space font-semibold text-white transition-all duration-300 hover:border-[#F4C95D] hover:shadow-[0_0_20px_rgba(244,201,93,0.25)] w-full sm:w-auto"
            >
              <span>{secondaryText}</span>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5 text-[#F4C95D] transition-transform duration-300 group-hover:translate-x-1 shrink-0"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                />
              </svg>
            </Link>
          </div>

          {loadError && (
            <div className="mt-3 rounded-xl border border-yellow-400/20 bg-yellow-400/10 px-4 py-3 text-sm text-yellow-100">
              {loadError}
            </div>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 mt-10">
          <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-3 bg-[#131B2E] p-6 sm:p-8 lg:p-10 rounded-3xl sm:rounded-4xl">
            {cards.map((card, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-[#23314F] bg-gradient-to-br from-[#0E1528] via-[#101827] to-[#0A1120] p-6 sm:p-8 transition-all duration-500 hover:-translate-y-3 hover:border-[#F4C95D] hover:shadow-[0_25px_60px_rgba(244,201,93,0.12)]"
              >
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#F4C95D]/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100"></div>

                <div className="mb-6 sm:mb-8 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl border border-[#F4C95D]/20 bg-[#F4C95D]/10">
                  <span className="text-2xl sm:text-3xl font-bold text-[#F4C95D] font-space">
                    {card.title}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold text-white font-space">
                  {card.value}
                </h3>

                <p className="mt-3 sm:mt-4 leading-7 sm:leading-8 text-[#9FA8BC] text-base sm:text-lg font-space">
                  {card.description}
                </p>

                <div className="mt-6 sm:mt-8 h-[2px] w-12 bg-[#F4C95D] transition-all duration-300 group-hover:w-24"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* banner section */}
      <Services />
      <Choose />
      <Project />
      <Review />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
};

export default Home;
