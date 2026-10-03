import Link from "next/link";
import { UserRound } from "lucide-react";
import type { Author } from "@/data/authors";

export function AuthorBox({ author, reviewer }: { author: Author | undefined; reviewer: Author | undefined }) {
  if (!author) return null;
  return (
    <section aria-label="About the author" className="my-12 rounded-xl border bg-card p-5 md:p-6">
      <div className="flex gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
          <UserRound aria-hidden className="size-6" />
        </div>
        <div className="text-sm leading-relaxed">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Written by</p>
          <p className="font-semibold">
            <Link href={`/authors/${author.slug}`} className="hover:underline">
              {author.name}
            </Link>
          </p>
          <p className="mt-1 text-muted-foreground">{author.bio}</p>
          <p className="mt-3 text-muted-foreground">
            {reviewer && reviewer.registration ? (
              <>
                Medically reviewed by{" "}
                <Link href={`/authors/${reviewer.slug}`} className="font-medium text-foreground underline">
                  {reviewer.name}
                </Link>{" "}
                ({reviewer.registration.body} {reviewer.registration.number}).
              </>
            ) : (
              <>
                This article has not yet been reviewed by a registered clinician. Read our{" "}
                <Link href="/editorial-policy" className="font-medium text-primary underline">
                  editorial policy
                </Link>{" "}
                to see how clinical review works.
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
