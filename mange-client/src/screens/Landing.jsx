// landing.jsx
import React from "react";
import { FooterSection } from "../components/FooterSection";
import { Why } from "../components/Info";
import { HeroSection } from "./HeroSection";


export const LandingPage = () => {
  return (
        <>
          <HeroSection />
            <Why/>
          <FooterSection />
        </>
  );
};


