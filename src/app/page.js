import AvailableCars from "@/components/AvailableCars";
import HeroSection from "@/components/HeroSection";
import TestimonialSection from "@/components/TestimonialSection";
import WhyChooseUs from "@/components/WhyChoose";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AvailableCars />
      <WhyChooseUs />
      <TestimonialSection />
    </div>
  );
}
