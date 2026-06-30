import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  center?: boolean;
}

export function SectionHeading({ eyebrow, title, intro, center }: SectionHeadingProps) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-3 text-balance text-3xl leading-[1.1] md:text-[2.6rem]">
        {title}
      </h2>
      {intro ? (
        <p className="mt-4 text-pretty text-[1.05rem] leading-relaxed text-ink-soft">
          {intro}
        </p>
      ) : null}
    </div>
  );
}
