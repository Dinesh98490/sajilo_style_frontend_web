import React from "react";
import { HeroSection } from "../components/landingpagecomponents/herosection/heroSection";
import MostPopularSection from "../components/landingpagecomponents/mostsaleandpopular/mostPopularSection";  
// import  OnSaleSection from "../components/landingpagecomponents/mostsaleandpopular/onSaleSection";
import AboutUs from "../components/landingpagecomponents/aboutus/aboutUs";
import Testimonials from "../components/landingpagecomponents/testinomals/testinomals";
import ManSection from "../components/landingpagecomponents/man/ManSection";
import WomenSection from "../components/landingpagecomponents/women/WomenSection";
import KidsSection from "../components/landingpagecomponents/kid/KidSection";


const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <MostPopularSection />
      <ManSection/>
      <WomenSection/>
      <KidsSection/>

      {/* <OnSaleSection /> */}
      <AboutUs/>
      <Testimonials/>
      
    </div>
  );
};

export default LandingPage;
