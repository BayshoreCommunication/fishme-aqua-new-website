"use client";

import Image from "next/image";
import { useState } from "react";

const clients = [
  { name: "AVANT", image: "/assets/home/client-1.png", category: "Corporate" },
  { name: "brightly", image: "/assets/home/client-2.png", category: "Individuals" },
  { name: "CLOUDVA", image: "/assets/home/client-3.png", category: "Corporate" },
  { name: "DEVORA", image: "/assets/home/client-4.png", category: "Resorts" },
  { name: "enfinity", image: "/assets/home/client-5.png", category: "Corporate" },
  { name: "Greenly", image: "/assets/home/client-6.png", category: "Individuals" },
  { name: "Hexatek", image: "/assets/home/client-7.png", category: "Corporate" },
  { name: "KORVIA", image: "/assets/home/client-8.png", category: "Resorts" },
  { name: "matexo", image: "/assets/home/client-9.png", category: "Others" },
  { name: "Noventa", image: "/assets/home/client-10.png", category: "Others" },
];

const filters = ["All", "Corporate", "Resorts", "Individuals", "Others"];

export default function ClientsGrid() {
  const [activeFilter, setActiveFilter] = useState("All");
  const visibleClients = activeFilter === "All" ? clients : clients.filter((client) => client.category === activeFilter);
  const displayedClients = activeFilter === "All" ? Array.from({ length: 4 }, () => clients).flat() : visibleClients;

  return (
    <>
      <div className="flex justify-center gap-2 pb-10">
        {filters.map((filter) => <button key={filter} type="button" onClick={() => setActiveFilter(filter)} className={`rounded-full border px-3 py-1 text-[10px] transition-colors ${filter === activeFilter ? "border-primary bg-primary/10 text-primary" : "border-black/15 text-black/65 hover:border-primary/40"}`}>{filter}</button>)}
      </div>
      <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10">
        {displayedClients.map((client, index) => <div key={`${client.name}-${index}`} className="group flex h-11 items-center justify-center"><Image src={client.image} alt={client.name} width={110} height={42} className="max-h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105" /></div>)}
      </div>
    </>
  );
}
