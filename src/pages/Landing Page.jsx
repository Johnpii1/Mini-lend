
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HowItWorks from "../components/How It Work";
import Benefits from "../components/Benefit";
import Assets from "../components/Asset";
import FAQ from "../components/FAQ";
import ContactUs from "../components/Contact Us";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <>
      <Navbar />

      <main className="space-y-0">
        <section id="home">
          <Hero />
        </section>

        <section id="how-it-works" className="mt-[-1px]">
          <HowItWorks />
        </section>

        <section id="benefits" className="mt-[-1px]">
          <Benefits />
        </section>

        <section id="assets" className="mt-[-1px]">
          <Assets />
        </section>

        <section id="faq" className="mt-[-1px]">
          <FAQ />
        </section>

        <section id="contact" className="mt-[-1px]">
          <ContactUs />
        </section>
      </main>

      <Footer />
    </>
  );
}

