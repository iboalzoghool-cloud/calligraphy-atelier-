import type { ReactNode } from "react";
import { InkStroke } from "@/components/ui/InkStroke";
import { InkReveal } from "@/components/ui/InkReveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  center?: boolean;
  /** Selbstzeichnender Tinten-Strich unter dem Titel. */
  stroke?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center,
  stroke,
}: SectionHeadingProps) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <p
          className={`eyebrow flex items-center gap-3 ${
            center ? "justify-center" : ""
          }`}
        >
          <span className="h-px w-8 bg-gold" aria-hidden />
          {eyebrow}
          {center ? <span className="h-px w-8 bg-gold" aria-hidden /> : null}
        </p>
      ) : null}
      <InkReveal>
        <h2 className="mt-3 text-balance text-3xl leading-[1.1] md:text-[2.6rem]">
          {title}
        </h2>
      </InkReveal>
      {stroke ? (
        <InkStroke
          variant="underline"
          className={`mt-3 h-3 w-24 ${center ? "mx-auto" : ""}`}
          color="var(--color-rose)"
          width={2.5}
        />
      ) : null}
      {intro ? (
        <p className="mt-4 text-pretty text-[1.05rem] leading-relaxed text-ink-soft">
          {intro}
        </p>
      ) : null}
    </div>
  );
}
