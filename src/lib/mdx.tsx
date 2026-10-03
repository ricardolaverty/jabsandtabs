import "server-only";
import * as runtime from "react/jsx-runtime";
import { evaluate, type EvaluateOptions } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import * as React from "react";
import { KeyTakeaways } from "@/components/content/key-takeaways";
import { Callout } from "@/components/content/callout";
import { MedicalDisclaimer } from "@/components/content/medical-disclaimer";
import { ProviderComparisonCTA } from "@/components/affiliate/provider-comparison-cta";
import { getCanonicalPathForSlug } from "@/lib/content";

/** Internal links use next/link; external links open safely in a new tab. */
function MdxLink({ href: rawHref = "", children, ...rest }: React.ComponentProps<"a">) {
  // Links to mounted pillars point straight at their canonical URL (avoids a 301 hop).
  const guide = /^\/guides\/([a-z0-9-]+)(#.*)?$/.exec(rawHref);
  const canonical = guide ? getCanonicalPathForSlug(guide[1]) : undefined;
  const href = canonical ? `${canonical}${guide?.[2] ?? ""}` : rawHref;
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

function MdxTable(props: React.ComponentProps<"table">) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border">
      <table {...props} />
    </div>
  );
}

/** The only components MDX articles may use (CONTRACTS.md §3). */
export const mdxComponents: MDXComponents = {
  KeyTakeaways,
  Callout,
  ProviderComparisonCTA,
  MedicalDisclaimer,
  a: MdxLink,
  table: MdxTable,
  // Articles must not use "#": the page title is the only H1.
  h1: (props: React.ComponentProps<"h2">) => <h2 {...props} />,
};

/** Compiles and renders an MDX string as a React Server Component. */
export async function renderMdx(source: string): Promise<React.ReactElement> {
  const options = {
    ...(runtime as unknown as Pick<EvaluateOptions, "Fragment" | "jsx" | "jsxs">),
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  } satisfies EvaluateOptions;
  const { default: Content } = await evaluate(source, options);
  return <Content components={mdxComponents} />;
}
