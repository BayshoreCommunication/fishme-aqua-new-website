"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Clock,
  Layers,
  Lock,
  Mail,
  MapPin,
  Phone,
  Send,
  User,
  X,
} from "lucide-react";
import Reveal from "@/component/motion/Reveal";
import { services } from "@/data/services";
import emailjs from "@emailjs/browser";

interface ToastState {
  show: boolean;
  type: "success" | "error" | "info";
  title: string;
  message: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    description: "",
  });

  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [toast, setToast] = useState<ToastState>({
    show: false,
    type: "info",
    title: "",
    message: "",
  });

  // Handle clicking outside custom select
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsSelectOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Auto hide toast after 5 seconds
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectService = (serviceTitle: string) => {
    setFormData((prev) => ({ ...prev, service: serviceTitle }));
    setIsSelectOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone_number: formData.phone,
      service_interest: formData.service || "General Inquiry",
      message: formData.description,
      to_name: "Fish Me Aqua Team",
    };

    // If EmailJS credentials exist in environment
    if (serviceId && templateId && publicKey) {
      try {
        const res = await emailjs.send(
          serviceId,
          templateId,
          templateParams,
          publicKey,
        );

        if (res.status === 200 || res.text === "OK") {
          setStatus("success");
          setToast({
            show: true,
            type: "success",
            title: "Request Sent Successfully!",
            message:
              "Thank you for contacting Fish Me Aqua. Our team will review your project and get in touch within 24 hours.",
          });
          setFormData({
            name: "",
            phone: "",
            email: "",
            service: "",
            description: "",
          });
        } else {
          throw new Error("Failed to deliver message.");
        }
      } catch (err: unknown) {
        console.error("EmailJS Error:", err);
        const errorMsg =
          err instanceof Error
            ? err.message
            : "Could not send email. Please check your network or try again.";
        setStatus("error");
        setToast({
          show: true,
          type: "error",
          title: "Message Delivery Failed",
          message: errorMsg,
        });
      }
    } else {
      // Local dev simulation when API keys are pending
      console.log("EmailJS Params (Dev Test Mode):", templateParams);
      setTimeout(() => {
        setStatus("success");
        setToast({
          show: true,
          type: "success",
          title: "Consultation Request Submitted!",
          message:
            "Your message has been received! (Note: Add NEXT_PUBLIC_EMAILJS_* keys in .env.local to send direct inbox emails in production)",
        });
        setFormData({
          name: "",
          phone: "",
          email: "",
          service: "",
          description: "",
        });
      }, 700);
    }
  };

  return (
    <section className="bg-background py-16 sm:py-24 text-foreground transition-colors duration-300 relative">
      {/* ========================================================= */}
      {/* Modern Floating Toast Notification */}
      {/* ========================================================= */}
      {toast.show && (
        <div className="fixed top-24 right-4 sm:right-8 z-50 max-w-md w-full animate-in fade-in slide-in-from-top-5 duration-300">
          <div
            className={`rounded-2xl p-4.5 border backdrop-blur-xl shadow-2xl flex items-start gap-3.5 ${
              toast.type === "success"
                ? "bg-[#0b2922]/95 border-teal-500/30 text-white"
                : "bg-[#290b0b]/95 border-red-500/30 text-white"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="h-6 w-6 text-teal-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-6 w-6 text-red-400 shrink-0 mt-0.5" />
            )}

            <div className="flex-1">
              <h4 className="font-bold text-sm text-white tracking-wide">
                {toast.title}
              </h4>
              <p className="text-xs text-white/80 font-light mt-1 leading-relaxed">
                {toast.message}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setToast((prev) => ({ ...prev, show: false }))}
              className="text-white/60 hover:text-white transition-colors cursor-pointer"
              aria-label="Close notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <div className="container">
        {/* Section Header */}
        <Reveal direction="up" delay={0}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Let&apos;s Create Something Extraordinary
            </h2>
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-foreground/65 font-light">
              Connect with our team to discuss your project requirements,
              schedule a consultation, or request a site visit.
            </p>
          </div>
        </Reveal>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* ========================================================= */}
          {/* Left Column: Contact Information */}
          {/* ========================================================= */}
          <div className="lg:col-span-5">
            <Reveal direction="up" delay={100} className="h-full">
              <div className="h-full rounded-[2.5rem] border border-foreground/10 dark:border-white/10 bg-foreground/[0.02] dark:bg-white/[0.03] p-8 sm:p-10 backdrop-blur-xl shadow-xl flex flex-col justify-between">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-8 pb-3 border-b-2 border-primary/40 inline-block">
                    Contact Information
                  </h3>

                  <div className="space-y-6">
                    {/* Office */}
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-primary/20 dark:text-teal-300 border border-primary/20 shadow-sm">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground dark:text-white">
                          Our Office
                        </h4>
                        <p className="text-xs text-foreground/70 dark:text-white/70 font-light mt-0.5 leading-relaxed">
                          123 Ocean Drive
                          <br />
                          Aqua City, AC 12345
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-primary/20 dark:text-teal-300 border border-primary/20 shadow-sm">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground dark:text-white">
                          Phone
                        </h4>
                        <p className="text-xs text-foreground/70 dark:text-white/70 font-light mt-0.5">
                          +1 (555) 123-4567
                        </p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-primary/20 dark:text-teal-300 border border-primary/20 shadow-sm">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground dark:text-white">
                          Email
                        </h4>
                        <p className="text-xs text-foreground/70 dark:text-white/70 font-light mt-0.5">
                          hello@fishmeaqua.com
                        </p>
                      </div>
                    </div>

                    {/* Business Hours */}
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-primary/20 dark:text-teal-300 border border-primary/20 shadow-sm">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground dark:text-white">
                          Business Hours
                        </h4>
                        <p className="text-xs text-foreground/70 dark:text-white/70 font-light mt-0.5 leading-relaxed">
                          Mon-Fri: 9:00 AM - 6:00 PM
                          <br />
                          Sat: 10:00 AM - 4:00 PM
                          <br />
                          Sun: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-foreground/10 dark:border-white/10 mt-8">
                  <p className="text-[11px] text-foreground/50 dark:text-white/50 leading-relaxed font-light">
                    Professionally handling aquatic architecture and living
                    ecosystem projects, we&apos;re committed to protecting both
                    your property and your peace of mind in times of need.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ========================================================= */}
          {/* Right Column: Request a Free Consultation Form */}
          {/* ========================================================= */}
          <div className="lg:col-span-7">
            <Reveal direction="up" delay={200} className="h-full">
              <div className="h-full rounded-[2.5rem] border border-foreground/10 dark:border-white/10 bg-white dark:bg-[#18181b] p-8 sm:p-10 shadow-2xl flex flex-col justify-between">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-2 pb-3 border-b-2 border-primary/40 inline-block">
                    Request a Free Consultation
                  </h3>
                  <p className="text-xs text-foreground/60 dark:text-white/60 font-light mb-8 mt-1">
                    Professionally handling aquatic architecture projects,
                    we&apos;re committed to protecting both your property and
                    your peace of mind in times of need.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Row 1: Name and Number */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="flex items-center gap-1.5 text-xs font-semibold text-foreground/80 dark:text-white/80 mb-2"
                        >
                          <User className="h-3.5 w-3.5 text-primary" />
                          <span>Enter Name</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter Your Full Name..."
                          className="w-full rounded-xl border border-foreground/15 dark:border-white/15 bg-foreground/[0.02] dark:bg-white/[0.04] dark:text-white dark:caret-white px-4 py-3 text-xs sm:text-sm text-foreground placeholder:text-foreground/40 dark:placeholder:text-white/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>

                      {/* Number */}
                      <div>
                        <label
                          htmlFor="phone"
                          className="flex items-center gap-1.5 text-xs font-semibold text-foreground/80 dark:text-white/80 mb-2"
                        >
                          <Phone className="h-3.5 w-3.5 text-primary" />
                          <span>Enter Number</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter Your Phone Number..."
                          className="w-full rounded-xl border border-foreground/15 dark:border-white/15 bg-foreground/[0.02] dark:bg-white/[0.04] dark:text-white dark:caret-white px-4 py-3 text-xs sm:text-sm text-foreground placeholder:text-foreground/40 dark:placeholder:text-white/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 2: Email and Service Interest (Custom Select) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="flex items-center gap-1.5 text-xs font-semibold text-foreground/80 dark:text-white/80 mb-2"
                        >
                          <Mail className="h-3.5 w-3.5 text-primary" />
                          <span>Enter Email</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter Your Email Address..."
                          className="w-full rounded-xl border border-foreground/15 dark:border-white/15 bg-foreground/[0.02] dark:bg-white/[0.04] dark:text-white dark:caret-white px-4 py-3 text-xs sm:text-sm text-foreground placeholder:text-foreground/40 dark:placeholder:text-white/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>

                      {/* Service Interest (Custom Styled Select Dropdown) */}
                      <div className="relative" ref={selectRef}>
                        <label
                          htmlFor="service"
                          className="flex items-center gap-1.5 text-xs font-semibold text-foreground/80 dark:text-white/80 mb-2"
                        >
                          <Layers className="h-3.5 w-3.5 text-primary" />
                          <span>Service Interest</span>
                        </label>

                        {/* Custom Select Trigger */}
                        <button
                          id="service"
                          type="button"
                          onClick={() => setIsSelectOpen((prev) => !prev)}
                          aria-haspopup="listbox"
                          aria-expanded={isSelectOpen}
                          className="w-full rounded-xl border border-foreground/15 dark:border-white/15 bg-foreground/[0.02] dark:bg-white/[0.04] px-4 py-3 text-xs sm:text-sm text-left flex items-center justify-between transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                        >
                          <span
                            className={
                              formData.service
                                ? "text-foreground dark:text-white font-medium"
                                : "text-foreground/40 dark:text-white/40 font-light"
                            }
                          >
                            {formData.service ||
                              "Select Your Service Interest..."}
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 text-foreground/60 dark:text-white/60 transition-transform duration-300 ${
                              isSelectOpen ? "rotate-180 text-primary" : ""
                            }`}
                          />
                        </button>

                        {/* Floating Custom Dropdown Menu */}
                        {isSelectOpen && (
                          <div className="absolute left-0 right-0 z-50 mt-2 max-h-64 overflow-y-auto rounded-2xl border border-foreground/10 dark:border-white/15 bg-white/95 dark:bg-[#121615]/95 p-1.5 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200">
                            {services.map((s) => {
                              const isSelected = formData.service === s.title;
                              return (
                                <button
                                  key={s.slug}
                                  type="button"
                                  onClick={() => handleSelectService(s.title)}
                                  className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs sm:text-sm transition-all text-left cursor-pointer ${
                                    isSelected
                                      ? "bg-primary text-white font-semibold shadow-sm"
                                      : "text-foreground/80 dark:text-white/80 hover:bg-primary/10 hover:text-primary dark:hover:bg-white/10 dark:hover:text-teal-300"
                                  }`}
                                >
                                  <span>{s.title}</span>
                                  {isSelected && (
                                    <CheckCircle2 className="h-4 w-4 text-white shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Case Description */}
                    <div>
                      <label
                        htmlFor="description"
                        className="block text-xs font-semibold text-foreground/80 dark:text-white/80 mb-2"
                      >
                        Your Case Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={4}
                        required
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Tell us about your project..."
                        className="w-full rounded-xl border border-foreground/15 dark:border-white/15 bg-foreground/[0.02] dark:bg-white/[0.04] dark:text-white dark:caret-white p-4 text-xs sm:text-sm text-foreground placeholder:text-foreground/40 dark:placeholder:text-white/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-y"
                      />
                    </div>

                    {/* Bottom Security Assurance & Submit Button */}
                    <div className="pt-2">
                      <div className="flex items-center gap-2 text-xs text-foreground/50 dark:text-white/50 mb-4 font-light">
                        <Lock className="h-3.5 w-3.5 text-primary" />
                        <span>
                          Your information is secure and will never be shared.
                        </span>
                      </div>

                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="inline-flex items-center gap-2 rounded-full bg-[#006E5C] hover:bg-[#00584a] text-white px-8 py-3.5 text-xs sm:text-sm font-semibold transition-all duration-300 shadow-xl shadow-teal-900/20 hover:scale-[1.02] disabled:opacity-50 cursor-pointer"
                      >
                        {status === "loading" ? (
                          <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            <span>Sending Request...</span>
                          </>
                        ) : (
                          <>
                            <span>Book Free Consultation</span>
                            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white/20">
                              <Send className="h-2.5 w-2.5" />
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
