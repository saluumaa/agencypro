'use client'
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {gsap} from 'gsap';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLSectionElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Background parallax effect
    gsap.to(backgroundRef.current, {
      yPercent: -50,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Text animations
    tl.fromTo(
      titleRef.current?.children,
      { opacity: 0, y: 100 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        stagger: 0.2, // stagger is used to animate each letter of the title separately
        ease: 'power4.out' 
      }
    )
    .fromTo(
      subtitleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6' // what this is doing -=0.6 is it makes the subtitle animation start 0.6 seconds before the title animation ends
    )
    .fromTo(
      ctaRef.current?.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
      '-=0.4'
    );
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const element = document.querySelector('#services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <section 
      id="home"
      ref={heroRef}
    className="relative min-h-screen flex items-center justify-center overflow-hidden">
     
    {/* Animated Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      </div>
    
     {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 
        ref={titleRef} 
        className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
          <span className="block">Transform Your</span>
          <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Digital Presence
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          We create stunning digital experiences that captivate your audience 
          and drive meaningful results for your business.
        </p>

        <div 
        ref={ctaRef} 
        className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <motion.button
            onClick={scrollToContact}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-2xl transition-all duration-300 flex items-center space-x-2"
          >
            <span>Start Your Project</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>

          <motion.button
            onClick={scrollToServices}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 flex items-center space-x-2"
          >
            <Play className="h-5 w-5" />
            <span>Watch Our Work</span>
          </motion.button>
        </div>
      </div>
     
    </section>
  )
}

export default Hero