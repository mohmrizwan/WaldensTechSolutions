import React from "react";
import logo from "../assets/images/navbar-logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="walden-wrapper mx-auto px-4 sm:px-6 lg:px-4 my-5">
      {/* Top Divider */}
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#F4C95D] to-transparent"></div>

      {/* Main Footer */}
      <div className="walden-inner flex flex-col lg:flex-row justify-between gap-10 my-8">

        {/* Logo & About */}
        <div className="w-full lg:w-[40%]">
          <div className="footer-logo flex justify-center lg:justify-start">
            <img
              src={logo}
              alt="company-logo"
              className="w-56 sm:w-64 lg:w-72 h-auto"
            />
          </div>

          <div className="footer-para mt-5">
            <p className="text-[#FFFFFF] text-base sm:text-lg font-light font-space text-center lg:text-left lg:px-5">
              We design and develop modern, high-quality websites that combine
              outstanding UI/UX with clean, scalable development. Our goal is to
              help startups and growing businesses create a strong online
              presence through fast, responsive, and reliable digital
              experiences that deliver real business value.
            </p>
          </div>
        </div>

        {/* Company */}
        <div className="w-full lg:w-auto text-center lg:text-left">
          <h2 className="text-2xl font-bold font-space text-[#F4C95D] underline">
            Company
          </h2>

          <ul className="flex flex-col gap-4 mt-5 text-lg sm:text-xl font-space font-medium text-white">
            <Link
              to="/"
              className="hover:text-[#F4C95D] transition-all duration-300"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="hover:text-[#F4C95D] transition-all duration-300"
            >
              About
            </Link>

            <Link
              to="/service"
              className="hover:text-[#F4C95D] transition-all duration-300"
            >
              Services
            </Link>

            <Link
              to="/testimonials"
              className="hover:text-[#F4C95D] transition-all duration-300"
            >
              Testimonials
            </Link>

            <Link
              to="/contact"
              className="hover:text-[#F4C95D] transition-all duration-300"
            >
              Contact
            </Link>
          </ul>
        </div>

        {/* Contact */}
        <div className="w-full lg:w-auto text-center lg:text-left">
          <h2 className="text-2xl font-bold font-space text-[#F4C95D] underline">
            Contact
          </h2>

          <div className="mt-5 flex flex-col items-center lg:items-start gap-4">

            <a
              href="mailto:hello@waldenstechsolution.com"
              className="flex items-center gap-3 text-white hover:text-[#F4C95D] transition-all"
            >
              <i className="fa-regular fa-envelope"></i>
              <span className="font-space">
                hello@waldenstechsolution.com
              </span>
            </a>

            <a
              href="tel:+919826480948"
              className="flex items-center gap-3 text-white hover:text-[#F4C95D] transition-all"
            >
              <i className="fa-solid fa-phone"></i>
              <span className="font-space">
                +91 9826480948
              </span>
            </a>

            <p className="text-[#F4C95D] text-lg sm:text-xl font-space">
              Available For New Projects
            </p>
          </div>
        </div>

           {/* Social Icons */}
        <div className="w-full lg:w-auto flex justify-center lg:justify-end items-center">
          <svg width="0" height="0" style={{ position: "absolute" }}>
            <defs>
              <clipPath id="squircleClip" clipPathUnits="objectBoundingBox">
                <path d="M 0,0.5 C 0,0 0,0 0.5,0 S 1,0 1,0.5 1,1 0.5,1 0,1 0,0.5"></path>
              </clipPath>
            </defs>
          </svg>

          <div className="relative">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-xl rounded-2xl border border-[#F4C95D] shadow-2xl"></div>

            <div className="relative flex justify-center items-center gap-3 p-3">
              {/* Github */}
              <div
                title="Github"
                style={{ clipPath: "url(#squircleClip)" }}
                className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#f7ce67] to-[#F4C95D] rounded-xl flex items-center justify-center shadow-lg border border-gray-600/50 cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-2"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>

              {/* LinkedIn */}
              <div
                title="LinkedIn"
                style={{ clipPath: "url(#squircleClip)" }}
                className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#f7ce67] to-[#F4C95D] rounded-xl flex items-center justify-center shadow-lg border border-blue-500/50 cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-2"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#F4C95D] to-transparent my-6"></div>

      {/* Mini Footer */}
      <div className="mini-footer flex flex-col lg:flex-row justify-between items-center gap-4 text-center lg:text-left py-2">
        <p className="text-[#FFFFFF] font-light font-space text-sm sm:text-base">
          © 2026 Walden's Tech Solutions.
          <span className="text-[#F4C95D]"> All rights reserved</span>
        </p>

        <p className="text-[#FFFFFF] font-light font-space text-sm sm:text-base">
          Design &nbsp; • &nbsp; Development &nbsp; • &nbsp; Growth
        </p>
      </div>
    </footer>
  );
};

export default Footer;