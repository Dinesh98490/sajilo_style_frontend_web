import React, { useEffect, useRef, useState } from 'react';
import { Element } from 'react-scroll'; 
import { IMAGE_PATHS } from '../../../common/imageConstant';

// A simple checkmark icon component for the counters
const CheckIcon = () => (
  <svg className="h-7 w-7 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AboutUs = () => {
  const sectionRef = useRef(null);
  const countersRef = useRef([]);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          countersRef.current.forEach(counter => {
            if (!counter) return;
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const updateCount = () => {
              const increment = Math.ceil(target / 100);
              if (count < target) {
                count += increment;
                if (count > target) count = target;
                counter.innerText = count.toLocaleString();
                requestAnimationFrame(updateCount);
              } else {
                counter.innerText = target.toLocaleString();
              }
            };
            requestAnimationFrame(updateCount);
          });
          observer.unobserve(section);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => { if (section) { observer.unobserve(section); } };
  }, [hasAnimated]);

  return (
    <Element name="about-us"> {/* Changed name for clarity */}
      <section ref={sectionRef} className="relative w-full bg-slate-50 overflow-hidden py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-16 items-center">
            {/* === Left Content: Text & Upgraded Counters === */}
            <div className="lg:pr-8">
              <p className="font-semibold text-orange-600">OUR STORY</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                About SajiloStyle
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                SajiloStyle is Nepal’s trusted online destination for stylish, comfortable, and affordable shoes.
                From casual to formal, we deliver quality footwear that matches your lifestyle—crafted with passion and delivered with care.
              </p>
              <dl className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-1">
                <div className="flex items-start gap-x-4">
                  <CheckIcon />
                  <div>
                    <dt className="text-lg font-medium text-gray-600">Happy Customers</dt>
                    <dd className="text-3xl font-bold tracking-tight text-gray-900">
                      <span ref={el => (countersRef.current[0] = el)} data-target="20000">0</span>+
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-x-4">
                  <CheckIcon />
                  <div>
                    <dt className="text-lg font-medium text-gray-600">Pairs Sold Monthly</dt>
                    <dd className="text-3xl font-bold tracking-tight text-gray-900">
                      <span ref={el => (countersRef.current[1] = el)} data-target="500">0</span>+
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-x-4">
                  <CheckIcon />
                  <div>
                    <dt className="text-lg font-medium text-gray-600">Styles Launched</dt>
                    <dd className="text-3xl font-bold tracking-tight text-gray-900">
                      <span ref={el => (countersRef.current[2] = el)} data-target="120">0</span>+
                    </dd>
                  </div>
                </div>
              </dl>
            </div>

            {/* === Right Content: Eye-Catching Image === */}
            {/* The line below has been changed to control the image size */}
            <div className="relative mt-16 h-80 lg:mt-0 lg:h-full lg:max-h-[550px]">
              <img
                src={IMAGE_PATHS.aboutus}
                alt="SajiloStyle shoes collection"
                className="relative z-10 w-full h-full object-cover rounded-xl shadow-xl ring-1 ring-gray-900/10"
              />
              <div
                aria-hidden="true"
                className="absolute z-0 inset-0 rounded-2xl bg-gradient-to-tr from-orange-100 to-amber-100 opacity-80 transform -rotate-3 scale-105"
              />
            </div>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default AboutUs;