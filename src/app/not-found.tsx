import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">Error 404</p>
      <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="mx-auto mt-4 max-w-md text-muted-foreground">
        The page you were looking for does not exist or has moved. Try searching, or start from one of these pages.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/search">Search the site</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/guides">Browse guides</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/providers">Provider directory</Link>
        </Button>
      </div>
    </Container>
  );
}
