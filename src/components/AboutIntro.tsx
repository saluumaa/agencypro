'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { title: 'Our Values', text: 'We believe in innovation, transparency, and empathy.' },
  { title: 'Our Mission', text: 'To empower businesses through smart digital solutions.' },
  { title: 'Our Vision', text: 'To be a global leader in digital transformation.' },
];

const AboutIntro = () => {
  const containerRef = useRef(null);
  const introRef = useRef(null);
  const stepsRef = useRef(null);
  const lineRef = useRef(null);
  const stepChildRef = useRef<(HTMLDivElement | null)[]>([]);

  // Animate transition from Intro to Steps
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: stepsRef.current,
        start: 'top center',
        onEnter: () =>
          gsap.to(introRef.current, {
            opacity: 0,
            y: -100,
            duration: 0.6,
            ease: 'power2.out',
          }),
        onLeaveBack: () =>
          gsap.to(introRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          }),
      });

      gsap.fromTo(
        stepsRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top center',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Animate vertical line and step cards
  useEffect(() => {
    gsap.fromTo(
      lineRef.current,
      { height: 0 },
      {
        height: '100%',
        scrollTrigger: {
          trigger: lineRef.current,
          start: 'top 90%',
          end: 'bottom 10%',
          scrub: true,
        },
      }
    );

    stepChildRef.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.2,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });
  }, []);

  return (
    <section id="about" ref={containerRef} className="relative bg-white overflow-hidden">
      {/* Intro Section */}
      <div
        ref={introRef}
        className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 px-6 lg:px-16 max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 text-center lg:text-left space-y-6"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">Who We Are</h2>
          <p className="text-gray-700 text-lg">
            We are a passionate team of creators, designers, and strategists committed to building impactful digital experiences.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1"
        >
          <Image
            src="/about.svg"
            alt="About us"
            width={500}
            height={400}
            className="w-full h-auto"
          />
        </motion.div>
      </div>

      {/* Steps Section */}
      <div
        ref={stepsRef}
        className="relative px-6 lg:px-0  max-w-5xl mx-auto"
      >
        <div
          ref={lineRef}
          className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-600 to-purple-600"
        ></div>

        <div className="flex flex-col gap-16 relative z-10">
          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => (stepChildRef.current[i] = el)}
              className="bg-white p-8 rounded-2xl shadow-lg text-center"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutIntro;
