"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Calendar,
  User,
  Share2,
  CheckCircle2,
  ArrowLeft,
  ArrowUpRight,
  Bookmark,
  Sparkles,
  Tag,
  Copy,
  Check,
} from "lucide-react";
import Reveal from "@/component/motion/Reveal";
import type { BlogPost } from "@/data/blogs";

interface BlogDetailProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogDetail({ post, relatedPosts }: BlogDetailProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className="bg-background py-12 sm:py-20 text-foreground transition-colors duration-300">
      <div className="container">
        {/* Top Navigation & Back Link */}
        <Reveal direction="up" delay={0}>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-foreground/10 pb-6 dark:border-white/10">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-base font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:-translate-x-1 dark:bg-primary/20">
                <ArrowLeft className="h-4 w-4" />
              </span>
              <span>Back to All Articles</span>
            </Link>

            {/* Category & Read Time Badges */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-[#006E5C]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#006E5C] dark:bg-teal-400/10 dark:text-teal-300 border border-[#006E5C]/20">
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground/5 px-3.5 py-1.5 text-xs font-medium text-foreground/75 dark:bg-white/5 dark:text-white/75 border border-foreground/10 dark:border-white/10">
                <Clock className="h-3.5 w-3.5 text-primary" />
                <span>{post.readTime}</span>
              </span>
            </div>
          </div>
        </Reveal>

        {/* Main Article Title & Metadata */}
        <div className="mx-auto max-w-4xl">
          <Reveal direction="up" delay={50}>
            <header className="mb-10 text-left">
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.15] mb-6">
                {post.title}
              </h1>

              <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed font-light mb-8">
                {post.excerpt}
              </p>

              {/* Author & Share Bar */}
              <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-foreground/10 dark:border-white/10 bg-foreground/[0.02] dark:bg-white/[0.03] p-5 backdrop-blur-md shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="relative h-13 w-13 overflow-hidden rounded-full border-2 border-primary/40 shadow-md">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-foreground leading-tight">
                      {post.author.name}
                    </h2>
                    <p className="text-sm text-foreground/65 mt-0.5">
                      {post.author.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm text-foreground/70">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{post.publishDate}</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyLink}
                    aria-label="Copy article link"
                    className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-background px-4 py-2 text-xs font-semibold text-foreground transition-all hover:border-primary hover:text-primary dark:border-white/15 cursor-pointer shadow-sm active:scale-95"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-emerald-500 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Share Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </header>
          </Reveal>

          {/* Hero Featured Image */}
          <Reveal direction="up" delay={100}>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-foreground/10 dark:border-white/10 bg-black shadow-2xl mb-12">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
          </Reveal>

          {/* Key Takeaways Box */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <Reveal direction="up" delay={150}>
              <div className="mb-12 rounded-3xl border border-primary/30 bg-primary/5 dark:bg-primary/10 p-6 sm:p-8 backdrop-blur-xl shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-md">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    Key Article Takeaways
                  </h3>
                </div>
                <ul className="space-y-3">
                  {post.keyTakeaways.map((point, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-base text-foreground/85 leading-relaxed"
                    >
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}

          {/* Body Content Sections */}
          <div className="space-y-10 text-left">
            {post.content.map((section, idx) => (
              <Reveal key={idx} direction="up" delay={180 + idx * 40}>
                <section className="space-y-4">
                  {section.heading && (
                    <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground tracking-tight pt-2">
                      {section.heading}
                    </h2>
                  )}

                  {section.paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-base sm:text-lg leading-relaxed text-foreground/80 font-normal"
                    >
                      {p}
                    </p>
                  ))}

                  {section.bulletPoints && section.bulletPoints.length > 0 && (
                    <ul className="list-disc space-y-2 pl-6 text-base sm:text-lg leading-relaxed text-foreground/80 my-4">
                      {section.bulletPoints.map((item, bIdx) => (
                        <li key={bIdx} className="pl-1">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.callout && (
                    <div className="rounded-2xl border-l-4 border-l-primary border border-foreground/10 dark:border-white/10 bg-foreground/[0.02] dark:bg-white/[0.03] p-5 sm:p-6 my-6">
                      <h4 className="font-bold text-foreground text-base sm:text-lg mb-1.5 flex items-center gap-2">
                        <Bookmark className="h-4 w-4 text-primary" />
                        {section.callout.title}
                      </h4>
                      <p className="text-base text-foreground/80 leading-relaxed italic">
                        {section.callout.text}
                      </p>
                    </div>
                  )}
                </section>
              </Reveal>
            ))}
          </div>

          {/* Tags Section */}
          {post.tags && post.tags.length > 0 && (
            <Reveal direction="up" delay={300}>
              <div className="mt-12 flex flex-wrap items-center gap-2.5 border-t border-foreground/10 pt-8 dark:border-white/10">
                <span className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-foreground/60 mr-2">
                  <Tag className="h-4 w-4 text-primary" />
                  Tags:
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-foreground/15 bg-foreground/5 px-4 py-1.5 text-xs font-semibold text-foreground/80 dark:border-white/15 dark:bg-white/5"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </Reveal>
          )}

          {/* Author Bio Box */}
          <Reveal direction="up" delay={350}>
            <div className="mt-12 rounded-3xl border border-foreground/10 dark:border-white/10 bg-foreground/[0.02] dark:bg-white/[0.03] p-8 backdrop-blur-xl shadow-lg flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-primary shadow-md">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Written by Specialist
                </span>
                <h3 className="font-heading text-xl font-bold text-foreground mt-0.5">
                  {post.author.name}
                </h3>
                <p className="text-sm font-semibold text-foreground/60 mb-3">
                  {post.author.role}
                </p>
                <p className="text-base text-foreground/80 leading-relaxed">
                  Passionate about aquascaping design, biotope precision, and
                  sustainable aquatic ecosystems. Leading design and maintenance
                  workshops across residential and commercial developments.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Consultation CTA Card */}
          <Reveal direction="up" delay={400}>
            <div className="mt-14 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#006E5C] via-[#00584a] to-[#01382f] p-8 sm:p-12 text-white shadow-2xl text-center relative">
              <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  Ready to Transform Your Living Space?
                </h3>
                <p className="text-base sm:text-lg text-white/85 leading-relaxed font-light">
                  Book a free one-on-one consultation with our master aquascapers
                  and discover the ideal aquatic ecosystem for your home or office.
                </p>
                <div className="pt-4">
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-bold text-[#006E5C] shadow-xl hover:bg-slate-100 hover:scale-105 transition-all duration-300 group"
                  >
                    <span>Book Free Consultation</span>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#006E5C]/15 text-[#006E5C] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Related Articles Section */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="mt-20 border-t border-foreground/10 pt-16 dark:border-white/10">
            <Reveal direction="up" delay={100}>
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2 uppercase tracking-wider">
                  Related Articles
                </h2>
                <p className="text-base text-foreground/75 leading-relaxed">
                  Continue learning with expert tips and aquatic inspiration
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {relatedPosts.map((rel, index) => (
                <Reveal
                  key={rel.id}
                  direction="up"
                  delay={150 + index * 80}
                  className="h-full flex flex-col"
                >
                  <Link
                    href={`/blog/${rel.slug}`}
                    className="group flex flex-col justify-between h-full rounded-[2rem] border border-foreground/10 dark:border-white/10 bg-white dark:bg-[#18181b] p-5 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-2xl"
                  >
                    <div>
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black mb-5 shadow-md">
                        <Image
                          src={rel.image}
                          alt={rel.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 z-10">
                          <span className="rounded-full bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1 text-xs font-semibold text-white">
                            {rel.category}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                        {rel.title}
                      </h3>
                      <p className="text-base text-foreground/75 leading-relaxed line-clamp-2 mb-4">
                        {rel.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-foreground/10 pt-4 dark:border-white/10 mt-auto">
                      <span className="text-xs font-semibold text-foreground/60 flex items-center gap-1">
                        <Clock className="h-3 w-3 text-primary" />
                        {rel.readTime}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:underline">
                        <span>Read Article</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
