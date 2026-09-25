import { AboutSection } from "@/components/AboutSection";
import { Amenities } from "@/components/Amenities";
import { BookingCTA } from "@/components/BookingCTA";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Location } from "@/components/Location";
import { QuickFacts } from "@/components/QuickFacts";
import { Reviews } from "@/components/Reviews";
import { RoomsSection } from "@/components/RoomsSection";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <QuickFacts />
        <AboutSection />
        <RoomsSection />
        <Amenities />
        <Gallery />
        <Location />
        <Reviews />
        <BookingCTA />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
