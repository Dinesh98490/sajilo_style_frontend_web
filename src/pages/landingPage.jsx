import React from "react";
import { HeroSection } from "../components/landingpagecomponents/herosection/heroSection";
import MostPopularSection from "../components/landingpagecomponents/mostsaleandpopular/mostPopularSection";  
import  OnSaleSection from "../components/landingpagecomponents/mostsaleandpopular/onSaleSection";
import AboutUs from "../components/landingpagecomponents/aboutus/aboutUs";

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <MostPopularSection />
      <OnSaleSection />
      <AboutUs/>
      
    </div>
  );
};

export default LandingPage;
