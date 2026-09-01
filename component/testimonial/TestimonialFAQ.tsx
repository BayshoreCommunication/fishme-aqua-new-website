"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  BarChart3,
  Box,
  ChevronDown,
  Clock,
  Fish,
  PenTool,
  Wrench,
} from "lucide-react";
import Reveal from "@/component/motion/Reveal";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  image?: string;
  icon: React.ComponentType<{ className?: string }>;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "1. How long does an aquarium installation take?",
    answer:
      "The timeline depends on the project size and complexity. Most residential installations take a few days, while larger custom projects may require several weeks from design to completion.",
    image: "/assets/home/about-1.png",
    icon: Clock,
  },
  {
    id: 2,
    question: "2. What is included in your services?",
    answer:
      "Our comprehensive services include bespoke tank design, custom hardscaping, automated lighting and CO2 systems, filtration planning, live plant & livestock sourcing, and initial water conditioning.",
    icon: Box,
  },
  {
    id: 3,
    question: "3. What type of company is measured?",
    answer:
      "We design living ecosystems for a wide range of spaces — from luxury penthouses and private residences to corporate headquarters, luxury resorts, boutique hotels, and wellness spas.",
    icon: BarChart3,
  },
  {
    id: 4,
    question: "4. Do you provide custom aquarium designs?",
    answer:
      "Yes, every single system we build is 100% custom-tailored to complement your architectural layout, space dimensions, aesthetic preferences, and the specific needs of the ecosystem.",
    icon: PenTool,
  },
  {
    id: 5,
    question: "5. Do you offer aquarium maintenance services?",
    answer:
      "We offer dependable routine maintenance schedules (weekly, bi-weekly, or monthly) that include precision water testing, algae control, plant pruning, filter servicing, and emergency health checks.",
    icon: Wrench,
  },
  {
    id: 6,
    question: "6. What types of aquariums do you create?",
    answer:
      "Our portfolio spans planted nature aquascapes, marine reef ecosystems, paludariums combining land & water, indoor waterfalls, Japanese koi ponds, and custom glass terrariums.",
    icon: Fish,
  },
];

export default function TestimonialFAQ() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleAccordion = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="bg-background py-20 sm:py-28 text-foreground transition-colors duration-300">
      <div className="container">
        {/* Section Header */}
        <Reveal direction="up" delay={0}>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-heading text-3xl font-bold uppercase tracking-wider text-foreground sm:text-4xl mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
              Find answers to common questions about our services
            </p>
          </div>
        </Reveal>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openId === item.id;
            const Icon = item.icon;

            return (
              <Reveal
                key={item.id}
                direction="up"
                delay={100 + index * 60}
                className="w-full"
              >
                <div
                  className={`overflow-hidden rounded-2xl sm:rounded-3xl border transition-all duration-300 ${
                    isOpen
                      ? "border-primary/40 bg-white dark:bg-[#18181b] shadow-xl"
                      : "border-foreground/10 dark:border-white/10 bg-foreground/[0.02] dark:bg-white/[0.02] hover:border-foreground/20 dark:hover:border-white/20"
                  }`}
                >
                  {/* Question Header Button */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(item.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {/* Icon Badge */}
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-colors ${
                          isOpen
                            ? "bg-primary text-white shadow-md shadow-primary/20"
                            : "bg-primary/10 text-primary dark:bg-primary/20 dark:text-teal-300 border border-primary/20"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-foreground dark:text-white tracking-tight">
                        {item.question}
                      </h3>
                    </div>

                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${
                        isOpen
                          ? "rotate-180 text-primary"
                          : "text-foreground/50 dark:text-white/50"
                      }`}
                    >
                      <ChevronDown className="h-5 w-5" />
                    </div>
                  </button>

                  {/* Expanded Answer Content */}
                  {isOpen && (
                    <div className="border-t border-foreground/10 dark:border-white/10 p-5 sm:p-6 pt-4 sm:pt-6">
                      {item.image ? (
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                          <div className="md:col-span-5 relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black shadow-md">
                            <Image
                              src={item.image}
                              alt={item.question}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="md:col-span-7">
                            <p className="text-base leading-relaxed text-foreground/80 dark:text-white/80">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-base leading-relaxed text-foreground/80 dark:text-white/80">
                          {item.answer}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
