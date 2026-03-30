"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FEATURES, statsData } from "@/lib/landing";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.95 },
    visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div ref={containerRef} className="relative overflow-hidden w-full">
      {/* Cinematic Animated Background Mesh */}
      <div className="absolute inset-0 -z-10 overflow-hidden bg-background">
        <div className="absolute -top-[20%] left-[10%] w-[60%] h-[60%] rounded-full bg-blue-500/10 dark:bg-blue-600/10 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 dark:bg-indigo-600/10 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-[pulse_12s_ease-in-out_infinite_2s]" />
      </div>

      {/* Main Hero Header */}
      <motion.section 
        className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-4 z-10 flex flex-col items-center justify-center min-h-[90vh]"
        style={{ opacity, scale }}
      >
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto max-w-6xl text-center space-y-8 flex flex-col items-center"
        >
          <motion.div variants={itemVariants}>
            <Badge variant="outline" className="px-5 py-2 rounded-full bg-white/60 dark:bg-white/10 backdrop-blur-md border border-blue-200/50 dark:border-white/20 text-blue-800 dark:text-blue-100 shadow-sm flex items-center gap-2 transition-all hover:scale-105">
              <Sparkles className="w-4 h-4 text-blue-500 dark:text-blue-300" />
              <span className="text-sm font-semibold tracking-wide">Split Expenses. Simplify Life.</span>
            </Badge>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-[5.5rem] font-black tracking-tighter leading-[1.05] text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-blue-900 to-blue-600 dark:from-white dark:via-blue-100 dark:to-blue-400 max-w-5xl"
          >
            The smartest way to <br className="hidden md:block"/> split bills with friends
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-medium mt-6 mb-8"
          >
            Track shared expenses, organize group trips, and settle up effortlessly. Never worry about who owes who again.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 pt-4"
          >
            <Button asChild size="lg" className="h-14 px-8 text-lg font-semibold rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-[0_10px_40px_-10px_rgba(59,130,246,0.6)] hover:shadow-[0_20px_50px_-10px_rgba(59,130,246,0.8)] transition-all duration-300 hover:-translate-y-1 border-0">
              <Link href="/dashboard">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg font-semibold rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-md hover:bg-white dark:hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 border border-slate-200 dark:border-white/10 dark:text-white border-2">
              <Link href="#how-it-work">
                See How It Works
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating UI Elements (Parallax) */}
        <motion.div className="absolute top-[25%] left-[5%] hidden lg:block" style={{ y: y1 }}>
          <div className="p-4 rounded-3xl bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-2xl border border-white/40 dark:border-white/10 flex items-center gap-4 transform -rotate-12 transition-transform hover:rotate-0 hover:scale-110 duration-500 cursor-pointer">
            <div className="w-14 h-14 rounded-full bg-green-500/20 dark:bg-green-500/30 flex items-center justify-center">
              <span className="text-green-600 dark:text-green-400 text-2xl font-bold">₹</span>
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">You are owed</p>
              <p className="font-bold text-xl text-foreground">₹2,450</p>
            </div>
          </div>
        </motion.div>

        <motion.div className="absolute bottom-[20%] right-[5%] hidden lg:block" style={{ y: y2 }}>
          <div className="p-4 rounded-3xl bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-2xl border border-white/40 dark:border-white/10 flex items-center gap-4 transform rotate-12 transition-transform hover:rotate-0 hover:scale-110 duration-500 cursor-pointer">
            <div className="flex -space-x-3">
               <div className="w-12 h-12 rounded-full bg-blue-500 border-2 border-background shadow-sm" />
               <div className="w-12 h-12 rounded-full bg-indigo-500 border-2 border-background shadow-sm" />
            </div>
            <div className="pl-2">
              <p className="text-sm font-semibold text-foreground">Dinner Party</p>
              <p className="text-sm font-bold text-blue-600 dark:text-blue-400">Settled up!</p>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Cinematic Image Reveal */}
      <div className="relative z-20 container mx-auto px-4 -mt-10 mb-32 perspective-1000 max-w-7xl">
        <motion.div
           initial={{ opacity: 0, rotateX: 20, y: 150, scale: 0.9 }}
           whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
           className="relative rounded-[2rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] ring-1 ring-slate-200/50 dark:ring-white/10 bg-black group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 mix-blend-overlay" />
          <Image
            src="/hero.jpeg"
            width={1600}
            height={900}
            alt="Splitr App Interface"
            className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
            priority
          />
        </motion.div>
      </div>

      {/* Minimalist Stats */}
      <section className="py-24 relative z-10 border-y border-slate-200/50 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/20 backdrop-blur-lg">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {statsData.map((stat, i) => (
              <motion.div 
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center space-y-3"
              >
                <h3 className="text-5xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                  {stat.value}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-[0.2em] text-xs">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Features Grid */}
      <section id="features" className="py-32 relative z-10 bg-background overflow-hidden">
        {/* Decorative background for features */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        
        <div className="container mx-auto px-4 max-w-7xl relative">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto mb-24"
          >
            <Badge variant="outline" className="mb-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300">
              Powerful Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-foreground leading-tight">
              Everything you need exactly <br className="hidden md:block"/> where you need it
            </h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed">
              Powerful tools under the hood, wrapped in a beautiful, intuitive interface that anyone can master in seconds.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative p-8 rounded-[2rem] bg-white dark:bg-zinc-900/50 border border-slate-200/60 dark:border-white/10 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden backdrop-blur-sm"
              >
                <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-20 dark:opacity-10 blur-2xl ${feature.bg} transition-transform group-hover:scale-150 duration-700`} />
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl ${feature.bg} flex items-center justify-center mb-8 shadow-inner`}>
                    <feature.Icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
