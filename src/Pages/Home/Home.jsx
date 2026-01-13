import React from "react";
import Banner from "../../Components/Banner";
import Featured from "../../Components/Featured";
import ContactUs from "../../Components/ContactUs";
import ImpactStats from "../../Components/ImpactStats";
import HowItWorks from "../../Components/HowItWorks";
import Testimonials from "../../Components/Testimonials";

const Home = () => {
  return (
    <div>
      <Banner />
      <ImpactStats />
      <Featured />
      <HowItWorks />
      <Testimonials />
      <ContactUs />
    </div>
  );
};

export default Home;
