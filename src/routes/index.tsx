import { createFileRoute } from "@tanstack/react-router";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Courses from "@/components/Courses";
import WhyUs from "@/components/WhyUs";
import About from "@/components/About";
import Process from "@/components/Process";
import Placement from "@/components/Placement";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const title = "BPMR SAP FICO Training Institute | SAP Finance Courses Online & Offline";
const description =
  "Learn SAP FICO from industry experts. Beginner to advanced S/4HANA Finance courses with live SAP access, real-time projects and placement support. Call +91 98850 76704.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: "BPMR SAP FICO Training Institute" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Courses />
        <WhyUs />
        <About />
        <Process />
        <Placement />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
