import React, { useEffect, useState } from "react";
import { fetchServices } from "../api/serviceApi";

const Services = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (err) {
        setError("Unable to load services right now.");
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
  }, []);

  return (
    <div className="service-wrapper mx-auto px-7 mt-20">
      <div className="service-inner">
        <div className="service-head">
          <h3 className="text-3xl tracking-wider text-center font-space text-[#F4C95D] ">
            SERVICES
          </h3>
        </div>
        <div className="service-title mt-4">
          <h2 className="text-6xl font-bold text-white font-space text-center">
            Everything you need to look credible, <br /> load fast, and convert
            better.
          </h2>
        </div>

        {isLoading ? (
          <div className="mt-14 text-center text-white">Loading services...</div>
        ) : error ? (
          <div className="mt-14 text-center text-yellow-200">{error}</div>
        ) : services.length === 0 ? (
          <div className="mt-14 text-center text-[#B8C0D0]">
            No services are available right now.
          </div>
        ) : (
          <div className="service-cards mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service._id || service.id}
                className="group relative overflow-hidden rounded-3xl border border-[#24304A] bg-gradient-to-br from-[#101827] to-[#0B1220] p-8 transition-all duration-500 hover:-translate-y-3 hover:border-[#F4C95D] hover:shadow-[0_25px_60px_rgba(244,201,93,0.15)]"
              >
                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[#F4C95D]/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100"></div>

                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#F4C95D]/20 bg-[#F4C95D]/10 transition-all duration-500 group-hover:bg-[#F4C95D]">
                  <i className={`fa-solid ${service.icon || "fa-code"} text-3xl text-[#F4C95D] transition duration-500 group-hover:text-[#0B1220]`}></i>
                </div>

                <h3 className="text-2xl font-bold text-white font-space transition duration-300 group-hover:text-[#F4C95D]">
                  {service.title}
                </h3>

                <p className="mt-5 text-[#B8C0D0] text-lg leading-8">
                  {service.description}
                </p>

                <div className="mt-8 h-[2px] w-12 bg-[#F4C95D] transition-all duration-500 group-hover:w-28"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
