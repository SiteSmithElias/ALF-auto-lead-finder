export default function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`space-y-6 ${className}`}>
      {children}
    </section>
  );
}