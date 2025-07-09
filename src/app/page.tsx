'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import AboutIntro from '@/components/AboutIntro';
import AboutSteps from '@/components/AboutSteps';
import Footer from '@/components/Footer';
import Testimonials from '@/components/Testimonials';


// Register GSAP PLUGIN
if(typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}


export default function Home() {

  useEffect(() => {
    // Refresh ScrollTrigger on route changes
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (

    <main className="overflow-x-hidden">
      <Header />
      <Hero />
      <Services />
      
      <AboutIntro />
      <Testimonials />
      <Footer />
    </main>

  );
}
