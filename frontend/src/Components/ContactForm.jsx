import { useState } from "react";
import { useForm } from "react-hook-form";
import { sendContact } from "../api/contactApi";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [status, setStatus] = useState({ type: "idle", message: "" });

  const onSubmit = async (data) => {
    setStatus({ type: "idle", message: "" });

    try {
      await sendContact(data);
      setStatus({ type: "success", message: "Thanks! Your message has been sent — we'll be in touch soon." });
      reset();
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Unable to send message. Please try again later." });
    }
  };

  return (
    <div className="contact-wrapper mx-auto px-7 mt-24 mb-24">
      <div className="contact-inner grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
        {/* Left - Content */}
        <div className="lg:sticky lg:top-24">
          <h3 className="text-3xl tracking-wider font-space text-[#F4C95D]">
            GET IN TOUCH
          </h3>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white font-space">
            Let&apos;s talk about your project.
          </h2>
          <p className="mt-6 text-[#B8C0D0] text-lg leading-8">
            Fill out the form and we&apos;ll get back to you within 24 hours.
            Whether it&apos;s a new site, a redesign, or ongoing support, we&apos;re
            ready to help you build it right.
          </p>

          <div className="mt-10 flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#F4C95D]/20 bg-[#F4C95D]/10">
                <i className="fa-solid fa-envelope text-[#F4C95D] text-lg"></i>
              </span>
              <div>
                <p className="text-white font-space font-semibold">Email</p>
                <p className="text-[#B8C0D0] text-sm">mohmrizwan10@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#F4C95D]/20 bg-[#F4C95D]/10">
                <i className="fa-solid fa-phone text-[#F4C95D] text-lg"></i>
              </span>
              <div>
                <p className="text-white font-space font-semibold">Phone</p>
                <p className="text-[#B8C0D0] text-sm">+91 98264 80948</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#F4C95D]/20 bg-[#F4C95D]/10">
                <i className="fa-solid fa-location-dot text-[#F4C95D] text-lg"></i>
              </span>
              <div>
                <p className="text-white font-space font-semibold">Location</p>
                <p className="text-[#B8C0D0] text-sm">
                  Remote-first, working worldwide
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="rounded-3xl border border-[#24304A] bg-gradient-to-br from-[#101827] to-[#0B1220] p-8 md:p-10 flex flex-col gap-6"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-space font-medium text-white mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
              className={`w-full rounded-xl bg-[#0B1220] border ${
                errors.name ? "border-red-500" : "border-[#24304A]"
              } px-4 py-3 text-white placeholder-[#5C6885] outline-none transition-colors duration-300 focus:border-[#F4C95D]`}
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-space font-medium text-white mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="john@company.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              className={`w-full rounded-xl bg-[#0B1220] border ${
                errors.email ? "border-red-500" : "border-[#24304A]"
              } px-4 py-3 text-white placeholder-[#5C6885] outline-none transition-colors duration-300 focus:border-[#F4C95D]`}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-space font-medium text-white mb-2">
              Subject
            </label>
            <input
              type="text"
              placeholder="Website redesign or new project"
              {...register("subject", {
                required: "Subject is required",
                minLength: {
                  value: 5,
                  message: "Subject should be at least 5 characters",
                },
              })}
              className={`w-full rounded-xl bg-[#0B1220] border ${
                errors.subject ? "border-red-500" : "border-[#24304A]"
              } px-4 py-3 text-white placeholder-[#5C6885] outline-none transition-colors duration-300 focus:border-[#F4C95D]`}
            />
            {errors.subject && (
              <p className="mt-2 text-sm text-red-400">
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* Phone (optional) */}
          <div>
            <label className="block text-sm font-space font-medium text-white mb-2">
              Phone Number <span className="text-[#5C6885] font-normal">(optional)</span>
            </label>
            <input
              type="text"
              placeholder="+91 98765 43210"
              {...register("phone", {
                pattern: {
                  value: /^[0-9+\-\s()]{7,15}$/,
                  message: "Enter a valid phone number",
                },
              })}
              className={`w-full rounded-xl bg-[#0B1220] border ${
                errors.phone ? "border-red-500" : "border-[#24304A]"
              } px-4 py-3 text-white placeholder-[#5C6885] outline-none transition-colors duration-300 focus:border-[#F4C95D]`}
            />
            {errors.phone && (
              <p className="mt-2 text-sm text-red-400">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-space font-medium text-white mb-2">
              Project Details
            </label>
            <textarea
              rows={5}
              placeholder="Tell us a bit about what you're building..."
              {...register("message", {
                required: "Please share a few details about your project",
                minLength: {
                  value: 20,
                  message: "Please write at least 20 characters",
                },
              })}
              className={`w-full resize-none rounded-xl bg-[#0B1220] border ${
                errors.message ? "border-red-500" : "border-[#24304A]"
              } px-4 py-3 text-white placeholder-[#5C6885] outline-none transition-colors duration-300 focus:border-[#F4C95D]`}
            ></textarea>
            {errors.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#F4C95D] px-8 py-4 text-base font-space font-semibold text-[#0B1220] transition-all duration-300 hover:bg-white hover:gap-4 hover:shadow-[0_15px_40px_rgba(244,201,93,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
            {!isSubmitting && (
              <i className="fa-solid fa-arrow-right transition-transform duration-300 group-hover:translate-x-1"></i>
            )}
          </button>

          {status.type === "success" && (
            <p className="text-center text-sm text-[#F4C95D] font-space">
              {status.message}
            </p>
          )}
          {status.type === "error" && (
            <p className="text-center text-sm text-red-400 font-space">
              {status.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
