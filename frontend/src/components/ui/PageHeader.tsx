interface Props {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export default function PageHeader({
  title,
  description,
  children,
}: Props) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text)]">
          {title}
        </h1>

        {description && (
          <p className="mt-2 text-[var(--muted)]">
            {description}
          </p>
        )}
      </div>

      {children}
    </div>
  );
}