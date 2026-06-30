import type { Metadata } from "next";
import { Configurator } from "@/components/configurator/Configurator";

export const metadata: Metadata = {
  title: "Gestalten",
  description:
    "Gestalte dein handgemaltes Kalligrafie-Unikat: Form, Farbwelt, Name, Spruch und Goldakzente – mit Live-Vorschau.",
};

export default function GestaltenPage() {
  return (
    <div className="bg-paper">
      <div className="container-page pt-10 md:pt-14">
        <p className="eyebrow">Konfigurator</p>
        <h1 className="mt-2 max-w-2xl text-balance text-3xl leading-[1.1] md:text-4xl">
          Gestalte dein Unikat
        </h1>
        <p className="mt-3 max-w-xl text-pretty text-ink-soft">
          In wenigen Schritten zu deinem Entwurf. Die Vorschau zeigt, wohin die
          Reise geht – gemalt wird danach alles von Hand.
        </p>
      </div>
      <Configurator />
    </div>
  );
}
