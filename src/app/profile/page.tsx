"use client";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { WobbleCard } from "@/components/ui/wobble-card";
import Image from "next/image";
import AOS from "aos";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

export default function ProfilePage() {
  const router = useRouter();
  const currentPath = usePathname();

  const [showWobbleCards, setShowWobbleCards] = useState(false);

  useEffect(() => {
    AOS.init();
    const timer = setTimeout(() => {
      setShowWobbleCards(true);
    }, 500); // 0.5 seconds delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col md:flex-col overflow-x-hidden mt-4">
      {/* Main Content */}
      <div className="flex-1 px-4 md:p-10 overflow-y-auto">
        <h1
          className="text-bold mb-2 text-primary text-[26px] md:hidden font-primary"
          style={{
            fontWeight: "bold",
          }}
        >
          THE BMC INSIGHTS
        </h1>
        <HeroHighlight>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [20, -5, 0] }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
          >
            Your ultimate destination for everything happening at our school.
            <br />
            <Highlight className="text-black dark:text-white">
              THE BMC INSIGHTS
            </Highlight>
          </motion.h1>
        </HeroHighlight>
      </div>

      {/* Conditionally render WobbleCards after HeroHighlight animation */}
      {showWobbleCards && (
        <div className="max-w-full md:mr-3 mx-3">
          <h1 className="text-3xl md:ml-8 font-bold mb-4 underline decoration-sky-300">
            Explore
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-svh md:mx-8 ">
            <WobbleCard
              containerClassName="col-span-1 lg:col-span-2 h-full bg-fuchsia-950 min-h-[500px] lg:min-h-[300px]"
              className=""
            >
              <a href="/news" className="relative block w-full h-full">
                <div className="max-w-xs" data-aos="fade-up">
                  <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                    News
                  </h2>
                  <p className="mt-4 text-left text-base/6 text-neutral-200">
                    Our school's reddit. Post your own or read through posts
                    from other students.
                  </p>
                </div>
                <Image
                  src="/images/blogs.png"
                  width={500}
                  height={500}
                  alt="news image"
                  className="absolute right-0 lg:right-0 bottom-0 w-[80%] max-w-[300px] object-contain rounded-2xl"
                />
              </a>
            </WobbleCard>

            <WobbleCard containerClassName="col-span-1 min-h-[300px]">
              <a href="/blog" className="relative block w-full h-full">
                <div data-aos="fade-right">
                  <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                    Blog
                  </h2>
                  <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                    Get up-to-date with the latest news or read through our
                    journalists' writings.
                  </p>
                </div>
              </a>
            </WobbleCard>

            <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-sky-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
              <a href="/upcoming" className="relative block w-full h-full">
                <div className="max-w-sm" data-aos="fade-down">
                  <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                    Events
                  </h2>
                  <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                    Find out about the latest events happening at our school.
                  </p>
                </div>
                <Image
                  src="/images/blogs.png"
                  width={500}
                  height={500}
                  alt="events image"
                  className="absolute right-0 lg:right-0 bottom-0 w-[80%] max-w-[300px] object-contain rounded-2xl"
                />
              </a>
            </WobbleCard>
          </div>

          {/* Contact us section */}
          <div className="bg-[#010B13] p-6 mt-6 rounded-lg shadow-md max-w-full md:mr-8 md:ml-8 mb-4">
            <h1 className="text-4xl text-white font-semibold mb-4 underline decoration-sky-300">
              Contact Us
            </h1>
            <p className="text-lg text-white mb-4">
              If you have any questions or suggestions, feel free to reach out
              to us at:
            </p>
            <a
              href="mailto:insights@britishmodelcollege.edu.np"
              className="text-primary font-semibold text-lg hover:underline flex items-center"
            >
              insights@britishmodelcollege.edu.np
            </a>
            <div className="mt-6">
              <h2 className="text-xl text-white font-semibold">Follow us:</h2>
              <div className="flex space-x-4 mt-2">
                <a href="#" className="text-white hover:text-sky-300">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-white hover:text-sky-300">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
