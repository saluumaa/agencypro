'use client';
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Palette, Code, Smartphone, Search, BarChart3, Megaphone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
     {
      icon: Palette,
      title: 'Brand Design',
      description: 'Creating compelling visual identities that resonate with your target audience and stand out in the marketplace.',
      features: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Print Materials']
    },
    {
      icon: Code,
      title: 'Web Development',
      description: 'Building responsive, fast, and user-friendly websites that convert visitors into customers.',
      features: ['Custom Development', 'CMS Integration', 'E-commerce', 'Performance Optimization']
    },
    {
      icon: Smartphone,
      title: 'Mobile Apps',
      description: 'Developing native and cross-platform mobile applications with exceptional user experiences.',
      features: ['iOS Development', 'Android Development', 'React Native', 'UI/UX Design']
    },
    {
      icon: Search,
      title: 'SEO Optimization',
      description: 'Improving your search engine rankings and driving organic traffic to your website.',
      features: ['Keyword Research', 'On-page SEO', 'Technical SEO', 'Content Strategy']
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Tracking and analyzing data to make informed decisions and optimize performance.',
      features: ['Google Analytics', 'Conversion Tracking', 'Performance Reports', 'Data Visualization']
    },
    {
      icon: Megaphone,
      title: 'Digital Marketing',
      description: 'Comprehensive marketing strategies to reach your audience and grow your business.',
      features: ['Social Media', 'PPC Advertising', 'Content Marketing', 'Email Campaigns']
    }
]

const Services = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  

  // Animation for the service cards
  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        {opacity:0, y: 50},
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse",
            markers: false,
          },
          delay: i * 0.2,}
      )
    })
  }, 
  []);


  // Animation for the section title
  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            markers: false,
          },
        }
      );
    }

  },[]);

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16"
          ref={titleRef}
          >
          <h2 className="text-4xl font-bold text-gray-900">Our Services</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            We offer a full suite of digital solutions to elevate your brand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el!)}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-4">{service.icon && <service.icon className="h-8 w-8 text-blue-600 mb-2" />
                }</div>
                
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services