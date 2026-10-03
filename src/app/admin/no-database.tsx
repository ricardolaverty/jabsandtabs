export function NoDatabaseNotice() {
  return (
    <div role="status" className="rounded-xl border bg-warning p-5 text-warning-foreground">
      <p className="font-semibold">No database configured</p>
      <p className="mt-1 text-sm">
        The admin edits data in PostgreSQL. Set <code>DATABASE_URL</code>, run <code>npm run db:push</code> and{" "}
        <code>npm run db:seed</code>, then reload. Without a database the site uses the static files in <code>src/data</code>.
      </p>
    </div>
  );
}
