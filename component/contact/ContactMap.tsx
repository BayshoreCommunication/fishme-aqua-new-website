"use client";

import React from "react";

export default function ContactMap() {
  return (
    <section className="w-full relative h-[400px] sm:h-[520px] bg-slate-100 dark:bg-[#121615] overflow-hidden border-y border-foreground/10 dark:border-white/10">
      <iframe
        title="Fish Me Aqua Location Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.104273299712!2d90.41249737599026!3d23.77929498800366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7715a40c603%3A0xec01cd05f2063987!2sGulshan%201%2C%20Dhaka%201212!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
        width="100%"
        height="100%"
        style={{ border: 0, filter: "contrast(1.05) saturate(1.1)" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full grayscale-[0.1] contrast-[1.05]"
      />
    </section>
  );
}
