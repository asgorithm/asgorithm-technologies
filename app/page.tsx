import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Manifesto } from "@/components/manifesto";
import { Work } from "@/components/work";
import { Capabilities } from "@/components/capabilities";
import { Method } from "@/components/method";
import { Journal } from "@/components/journal";
import { Studio } from "@/components/studio";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-signal focus:px-3 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Manifesto />
        <Work />
        <Capabilities />
        <Method />
        <Journal />
        <Studio />
        <Contact />
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
