import React, { useEffect, useRef } from 'react';
import { IMAGE_PATHS } from '../../../common/imageConstant';

const AboutUs = () => {
  const countersRef = useRef([]);

  useEffect(() => {
    countersRef.current.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = Math.ceil(target / 200);

        if (count < target) {
          counter.innerText = count + increment;
          setTimeout(updateCount, 70);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  }, []);

  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16 bg-white">
      {/* Left Content */}
      <div className="md:w-1/2 mb-10 md:mb-0 animate-slide-up pr-4 md:pr-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          <span className="inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            About SajiloStyle
          </span>
        </h2>

        <p className="text-lg text-gray-600 mb-6 animate-fade-in delay-300">
          SajiloStyle is Nepal’s trusted online destination for stylish, comfortable, and affordable shoes.
          From casual to formal, we deliver quality footwear that matches your lifestyle—crafted with passion and delivered with care.
        </p>

        <div className="flex flex-wrap gap-8 mt-4">
          <div className="animate-zoom-in delay-200">
            <h3 className="text-3xl font-bold text-blue-600">
              <span ref={el => (countersRef.current[0] = el)} data-target="20000">0</span>+
            </h3>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div className="animate-zoom-in delay-300">
            <h3 className="text-3xl font-bold text-blue-600">
              <span ref={el => (countersRef.current[1] = el)} data-target="500">0</span>+
            </h3>
            <p className="text-gray-600">Pairs Sold Monthly</p>
          </div>
          <div className="animate-zoom-in delay-500">
            <h3 className="text-3xl font-bold text-blue-600">
              <span ref={el => (countersRef.current[2] = el)} data-target="120">0</span>+
            </h3>
            <p className="text-gray-600">Styles Launched</p>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="md:w-1/2 text-center md:text-right animate-fade-in delay-500 pr-0">
        <img
          src={IMAGE_PATHS.aboutus}
          alt="SajiloStyle shoes"
          className="rounded-xl w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto md:mx-0 shadow-xl transition-transform duration-500 hover:scale-105"
        />
      </div>
    </section>
  );
};

export default AboutUs;
