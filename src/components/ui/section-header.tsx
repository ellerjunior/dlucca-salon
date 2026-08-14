import type { ReactNode } from "react";

export function SectionHeader({
  title,
  standfirst,
  headingLevel = "h2",
  className = "",
}: {
  title: ReactNode;
  standfirst?: ReactNode;
  headingLevel?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const Heading = headingLevel;
  return (
    <header className={`section-header ${className}`.trim()}>
      <Heading className="display-l">{title}</Heading>
      <span className="section-header__line" aria-hidden="true" />
      {standfirst ? <p className="standfirst section-header__standfirst">{standfirst}</p> : null}
    </header>
  );
}
