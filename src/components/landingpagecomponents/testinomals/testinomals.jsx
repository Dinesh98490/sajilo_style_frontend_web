import React from 'react';
import { Element } from 'react-scroll'; 

// Import Swiper React components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

// --- MOCK DATA ---
const testimonials = [
  { id: 1, name: 'Anjali Sharma', role: 'Verified Buyer', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', rating: 5, quote: 'Absolutely love my new running shoes! They are so comfortable and stylish. The delivery from SajiloStyle was incredibly fast. Highly recommend!', },
  { id: 2, name: 'Rohan Pradhan', role: 'Verified Buyer', avatar: 'https://randomuser.me/api/portraits/men/46.jpg', rating: 5, quote: 'The quality of the leather boots I bought exceeded my expectations. They look even better in person. Fantastic customer service too.', },
  { id: 3, name: 'Priya Gurung', role: 'Verified Buyer', avatar: 'https://randomuser.me/api/portraits/women/47.jpg', rating: 4, quote: 'A great selection of casual sneakers. I found the perfect pair for daily wear. The checkout process was smooth and simple.', },
  { id: 4, name: 'Suresh Thapa', role: 'Verified Buyer', avatar: 'https://randomuser.me/api/portraits/men/48.jpg', rating: 5, quote: "I'm a repeat customer for a reason. SajiloStyle consistently delivers quality products with excellent service. My go-to for footwear.", },
  { id: 5, name: 'Sunita Rai', role: 'Verified Buyer', avatar: 'https://randomuser.me/api/portraits/women/49.jpg', rating: 5, quote: 'The sandals are perfect for summer! Lightweight and very durable. I was impressed by the eco-friendly packaging they used.', },
];

// --- Sub-components for better structure ---
const StarIcon = ({ isFilled }) => (
  <svg className={`w-5 h-5 ${isFilled ? 'text-amber-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const StarRating = ({ rating }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, index) => (
      <StarIcon key={index} isFilled={index < rating} />
    ))}
  </div>
);

// --- Main Testimonials Component ---
function Testimonials() {
  return (
    // 2. Wrap the section in an Element and give it a unique name
    <Element name="testimonials-section">
      <section className="relative w-full bg-slate-50 py-20 sm:py-28 overflow-hidden">
        <div className="container mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="max-w-xl text-center md:text-left">
              <p className="font-semibold text-orange-600">TESTIMONIALS</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Loved by Customers Worldwide
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                See what our happy customers have to say about their experience with SajiloStyle.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-x-2 shrink-0">
              <button className="swiper-button-prev-custom p-2.5 rounded-full ring-1 ring-inset ring-gray-300 transition hover:bg-gray-100">
                <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button className="swiper-button-next-custom p-2.5 rounded-full ring-1 ring-inset ring-gray-300 transition hover:bg-gray-100">
                <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
          <div className="relative mt-16">
            <Swiper
              modules={[Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{ nextEl: '.swiper-button-next-custom', prevEl: '.swiper-button-prev-custom' }}
              breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
              className="!pb-10"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="flex flex-col h-full bg-white p-8 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105">
                    <div className="flex-grow">
                      <StarRating rating={testimonial.rating} />
                      <blockquote className="mt-4 text-gray-700 text-lg leading-relaxed">"{testimonial.quote}"</blockquote>
                    </div>
                    <footer className="mt-6 flex items-center gap-4 pt-6 border-t border-gray-100">
                      <img src={testimonial.avatar} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover" />
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </footer>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </Element>
  );
}

export default Testimonials;