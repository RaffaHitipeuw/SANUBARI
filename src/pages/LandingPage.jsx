import About from "../components/sections/About";
import FAQ from "../components/sections/Faq";
import Features from "../components/sections/Features";
import Hero from "../components/sections/Hero";
import Testimonial from "../components/sections/Testimonial";

export default function LandingPage() {
    return(
        <>
          <Hero/>
          <Features/>
          <About/>
          <Testimonial/>
          <FAQ/>
        </>
    )
}