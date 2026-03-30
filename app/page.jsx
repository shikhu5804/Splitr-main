"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import HeroSection from "@/components/hero";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { STEPS, TESTIMONIALS } from "@/lib/landing";

export default function LandingPage() {
  const containerRef = useRef(null);
  
  return (
    <div className="flex flex-col bg-background selection:bg-blue-200 dark:selection:bg-blue-900" ref={containerRef}>
      {/* ───── Hero (includes Stats & Features) ───── */}
      <HeroSection />

      {/* ───── How it works ───── */}
      <section id="how-it-work" className="py-32 relative overflow-hidden bg-slate-50 dark:bg-zinc-950 border-t border-slate-200 dark:border-white/5">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto mb-24"
          >
            <Badge variant="outline" className="mb-6 bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300">
              Simple Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              Splitting expenses has <br className="hidden md:block"/> never been easier
            </h2>
            <p className="text-xl text-slate-500 dark:text-slate-400">
              Follow these simple steps to start tracking and splitting expenses with friends.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-200 via-indigo-300 to-blue-200 dark:from-blue-900 dark:via-indigo-700 dark:to-blue-900" />
            
            {STEPS.map((step, i) => (
              <motion.div 
                key={step.id} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col items-center text-center space-y-6 group"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-400 dark:bg-blue-600 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                  <div className="w-24 h-24 rounded-full bg-white dark:bg-zinc-900 border-4 border-blue-100 dark:border-zinc-800 shadow-xl flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-500 ease-[0.16,1,0.3,1]">
                    {step.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg px-4">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Testimonials ───── */}
      <section id="testimonials" className="py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] dark:[mask-image:linear-gradient(180deg,black,rgba(0,0,0,0))] opacity-20" />
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <Badge variant="outline" className="mb-6 bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300">
              Wall of Love
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Loved by thousands <br className="hidden md:block"/> around the world
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-white dark:bg-zinc-900/80 border-slate-200 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 backdrop-blur-xl">
                  <CardContent className="p-8 flex flex-col justify-between h-full">
                    <div className="mb-8">
                      <div className="flex gap-1 mb-6 text-amber-500">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-lg text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-auto border-t border-slate-100 dark:border-zinc-800 pt-6">
                      <Avatar className="h-12 w-12 border-2 border-white dark:border-zinc-800 shadow-md">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback className="bg-blue-100 text-blue-700 font-bold">
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-foreground text-base">{testimonial.name}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Call‑to‑Action ───── */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-blue-600 dark:bg-blue-900" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/40 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto bg-white/10 dark:bg-black/20 backdrop-blur-2xl border border-white/20 p-12 md:p-20 rounded-[3rem] shadow-2xl"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6">
              Ready to Simplify Expense Sharing?
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto font-medium">
              Join thousands of users who have made splitting expenses entirely stress‑free.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" className="h-16 px-10 text-xl font-bold rounded-2xl bg-white text-blue-600 hover:bg-slate-50 shadow-xl transition-all">
                <Link href="/dashboard">
                  Create Your First Group
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Link>
              </Button>
            </motion.div>
            
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-blue-100">
              <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-300" /> No credit card required</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-300" /> Free forever plan</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-300" /> Cancel anytime</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───── Footer ───── */}
      <footer className="bg-slate-50 dark:bg-black border-t border-slate-200 dark:border-white/10 pt-20 pb-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-1">
              <Link href="/">
                <Image src="/logos/logo1.png" alt="Splitr Logo" width={180} height={60} className="h-12 w-auto object-contain dark:brightness-200" />
              </Link>
              <p className="mt-6 text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Settle smarter. Simplify group expenses and stay stress-free with Splitr. Never worry about who owes who again.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-foreground mb-6">Product</h3>
              <ul className="space-y-4 text-slate-500 dark:text-slate-400 font-medium">
                <li><Link href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</Link></li>
                <li><Link href="#how-it-work" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">How it Works</Link></li>
                <li><Link href="#testimonials" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Testimonials</Link></li>
                <li><Link href="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Dashboard</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-foreground mb-6">Legal</h3>
              <ul className="space-y-4 text-slate-500 dark:text-slate-400 font-medium">
                <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-foreground mb-6">Stay Updated</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-4 font-medium">Subscribe to our newsletter for the latest updates.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <Button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 font-medium text-sm">
            <p>© {new Date().getFullYear()} Splitr. Built with perfection.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="https://github.com/shikhu5804/Splitr-main" target="_blank" rel="noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">GitHub</a>
              <a href="https://www.linkedin.com/in/vrmashikhar/" target="_blank" rel="noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
