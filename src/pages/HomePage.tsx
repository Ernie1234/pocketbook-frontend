import Footer from "@/components/footer/Footer";
import Header from "@/components/Homepage/Header";
import HeaderImage from "@/components/Homepage/HeaderImage";
import Revolution from "@/components/Homepage/Revolution";
import Testimonial from "@/components/Homepage/Testimonial";
import UnrivaledFeatures from "@/components/Homepage/UnrivaledFeatures";
import Navbar from "@/components/nav/Navbar";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <main>
        <section className="relative grid">
          <section className="col-start-1 col-end-2">
            <Header />
            <HeaderImage />
            <UnrivaledFeatures />
            <Revolution />
          </section>
        </section>
        <Testimonial />
      </main>
      <section className="relative grid">
        <section className="col-start-1 col-end-2">{/* <Pricing /> */}</section>
      </section>
      {/* <Newsletter /> */}
      <Footer />
    </div>
  );
}
