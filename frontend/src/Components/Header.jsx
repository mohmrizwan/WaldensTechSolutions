import React, { useState } from "react";
import logo from "../assets/images/navbar-logo.png";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Service", to: "/service" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Contact", to: "/contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="walden_header--wrapper relative h-20 bg-[#131B2E] mx-auto px-5">
      <div className="walden_header--inner flex justify-between items-center h-full">
        <div className="logo">
          <img src={logo} alt="company-logo" className="w-40 sm:w-56 lg:w-75 h-16 lg:h-20 object-contain" />
        </div>

        {/* Desktop nav */}
        <div className="nav hidden lg:block">
          <ul className="text-white gap-8 font-space font-medium text-xl flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                className="hover:text-[#F4C95D] transition-all duration-300"
                to={link.to}
              >
                {link.label}
              </Link>
            ))}
          </ul>
        </div>

        {/* Let's Talk button - desktop only */}
        {/* <-- From Uiverse.io by adamgiebl -->  */}
        <Link to={"/contact"} role="button" className="golden-button hidden lg:inline-flex">
          <span className="golden-text">Lets's Talk</span>
        </Link>

        {/* Hamburger toggle - tablet/mobile only */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          className="lg:hidden text-white text-3xl flex items-center justify-center w-10 h-10"
        >
          <i className={open ? "ri-close-line" : "ri-menu-line"}></i>
        </button>
      </div>

      {/* Mobile/tablet dropdown menu - opens from top */}
      <div
        className={`lg:hidden absolute left-0 top-full w-full bg-[#131B2E] border-t border-white/10 overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col items-center gap-6 py-8 text-white font-space font-medium text-lg">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              className="hover:text-[#F4C95D] transition-all duration-300"
              to={link.to}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;