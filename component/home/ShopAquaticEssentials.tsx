"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

import Container from "@/component/layout/Container";
import Reveal from "@/component/motion/Reveal";
import ProductsData from "@/data/ProductsData.json";
const ArrowUpRightIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17L17 7M17 7H8M17 7V16" />
  </svg>
);

const ShopAquaticEssentials = () => {
  // Wishlist state tracking for hearts
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (id: number) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((item) => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  return (
    <section className="py-16 md:py-20 bg-background text-foreground transition-colors duration-300">
      <Container>
        {/* Header Section */}
        <Reveal direction="up" delay={0}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-3xl font-bold uppercase tracking-widest text-foreground sm:text-4xl mb-3">
              Shop Aquatic Essentials
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-foreground/70 sm:text-base mx-auto font-light">
              Premium products for maintaining your aquatic paradise
            </p>
          </div>
        </Reveal>

        {/* Products Grid */}
        <div className="grid items-start grid-cols-1 gap-6 mb-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {ProductsData.slice(0, 10).map((product, index: number) => {
            const isWishlisted = wishlist.includes(product.id);
            return (
              <Reveal key={product.id} direction="up" delay={index * 50}>
                <div className="relative h-[304px]">
                  <div className="group absolute inset-x-0 top-0 z-0 rounded-3xl border border-foreground/10 bg-foreground/2 p-4 shadow-lg backdrop-blur-xl transition-all duration-300 hover:z-20 hover:border-foreground/30 dark:border-white/15 dark:bg-white/3 dark:hover:border-white/30">
                    <div>
                      {/* Top Badges / Wishlist Icon */}
                      <div className="relative h-48 w-full overflow-hidden rounded-2xl mb-4 bg-foreground/5 dark:bg-white/5">
                        {/* Category Pill Tag */}
                        <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-[10px] font-semibold bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 backdrop-blur-md">
                          {product.category}
                        </span>

                        {/* Wishlist Heart Button */}
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          aria-label="Wishlist"
                          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 cursor-pointer ${
                            isWishlisted
                              ? "bg-rose-500 text-white shadow-md scale-110"
                              : "bg-white/80 dark:bg-white/20 text-slate-700 dark:text-white hover:scale-105"
                          }`}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              isWishlisted ? "fill-white" : ""
                            }`}
                          />
                        </button>

                        {/* Product Image */}
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          sizes="(max-width: 639px) 100vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, 20vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Product Title */}
                      <h3 className="text-base font-bold text-foreground mb-1 px-1 tracking-tight">
                        {product.title}
                      </h3>

                      {/* Price */}
                      <p className="text-teal-600 dark:text-teal-400 font-bold text-sm px-1 mb-4">
                        ৳ {product.price}
                      </p>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="max-h-0 overflow-hidden px-1 translate-y-2 opacity-0 transition-all duration-300 group-hover:mt-4 group-hover:max-h-12 group-hover:translate-y-0 group-hover:opacity-100">
                      <button
                        onClick={() => alert(`Added ${product.title} to cart!`)}
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#006E5C] hover:bg-[#008c75] text-white py-2.5 px-4 rounded-full text-xs font-medium transition-all duration-300 shadow-md hover:shadow-teal-500/25 cursor-pointer group/btn"
                      >
                        <span>Add to Cart</span>
                        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                          <ArrowUpRightIcon />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom Explore All CTA */}
        <Reveal direction="up" delay={300}>
          <div className="text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 border border-foreground/20 dark:border-white/20 hover:border-[#006E5C] bg-foreground/5 dark:bg-white/5 hover:bg-[#006E5C] hover:text-white text-foreground px-8 py-3.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 shadow-sm cursor-pointer group"
            >
              <span>Explore All Products</span>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-foreground/10 dark:bg-white/10 group-hover:bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRightIcon />
              </span>
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

export default ShopAquaticEssentials;
