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

      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="how-it-works">
          <HowItWorks />
        </section>

        <section id="benefits">
          <Benefits />
        </section>

        <section id="assets">
          <Assets />
        </section>

        <section id="faq">
          <FAQ />
        </section>

        <section id="contact">
          <ContactUs />
        </section>
      </main>

      <Footer />
    </>
  );
}