import { Hero } from "@/components/landing/Hero";
import { TrustStrip } from "@/components/landing/TrustStrip";
import { NameShowcase } from "@/components/landing/NameShowcase";
import { Gallery } from "@/components/landing/Gallery";
import { Editions } from "@/components/landing/Editions";
import { OnRequest } from "@/components/landing/OnRequest";
import { WordsBand } from "@/components/landing/WordsBand";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Occasions } from "@/components/landing/Occasions";
import { FullBleedMoment } from "@/components/landing/FullBleedMoment";
import { AtelierTeaser } from "@/components/landing/AtelierTeaser";
import { Voices } from "@/components/landing/Voices";
import { ValuesStatement } from "@/components/landing/ValuesStatement";
import { Faq } from "@/components/landing/Faq";
import { CtaBanner } from "@/components/landing/CtaBanner";
import { StickyCta } from "@/components/landing/StickyCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <NameShowcase />
      <Gallery />
      <Editions />
      <OnRequest />
      <WordsBand />
      <HowItWorks />
      <Occasions />
      <FullBleedMoment />
      <AtelierTeaser />
      <Voices />
      {/* TEIL E – standardmäßig ausgeblendet (Flag in der Komponente) */}
      <ValuesStatement />
      <Faq />
      <CtaBanner />
      <StickyCta />
    </>
  );
}
