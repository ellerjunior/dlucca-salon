export function Quote({ children, attribution }: { children: string; attribution: string }) {
  return (
    <figure className="quote">
      <blockquote>{children}</blockquote>
      <figcaption className="label">{attribution}</figcaption>
    </figure>
  );
}
