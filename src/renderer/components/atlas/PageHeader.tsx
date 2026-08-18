export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="mb-8 flex items-end justify-between gap-6 animate-rise">
      <div>
        <h1 className="font-display text-[30px] font-semibold">{title}</h1>
        <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      {action}
    </header>
  );
}
