"use client";

import { motion } from "framer-motion";
import { Code, Dumbbell, Gamepad2, Mountain, Music } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const categories = [
  {
    icon: Music,
    title: "Music & Concerts",
    image: "/images/category-music.jpg",
    count: "2,400+ events",
  },
  {
    icon: Dumbbell,
    title: "Sports & Fitness",
    image: "/images/category-sports.jpg",
    count: "1,800+ events",
  },
  {
    icon: Mountain,
    title: "Hiking & Outdoor",
    image: "/images/category-hiking.jpg",
    count: "1,200+ events",
  },
  {
    icon: Gamepad2,
    title: "Gaming & Social",
    image: "/images/category-gaming.jpg",
    count: "950+ events",
  },
  {
    icon: Code,
    title: "Tech & Meetups",
    image: "/images/category-tech.jpg",
    count: "750+ events",
  },
];

export function CategoriesSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            categories.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems((prev) =>
                  prev.includes(index) ? prev : [...prev, index],
                );
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.section
      id="categories"
      className="scroll-mt-24 py-20"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <section ref={sectionRef} className="py-24 sm:py-32" id="categories">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              Browse Categories
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-serif text-balance">
              Find Your Passion
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Explore diverse activities tailored to your interests.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {categories.map((category, index) => (
              <Link href="/events" key={index}>
                <div
                  className={`group relative h-64 rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ${
                    visibleItems.includes(index)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-lg bg-background/20 backdrop-blur-sm flex items-center justify-center">
                        <category.icon className="w-5 h-5 text-background" />
                      </div>
                    </div>
                    <h3 className="font-bold text-background text-lg">
                      {category.title}
                    </h3>
                    <p className="text-background/70 text-sm">
                      {category.count}
                    </p>
                  </div>

                  {/* Hover border effect */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-accent/50 transition-colors duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </motion.section>
  );
}
