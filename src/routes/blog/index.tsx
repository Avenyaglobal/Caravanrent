import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { posts } from "@/lib/posts";

export const Route = createFileRoute("/blog/")({ component: BlogIndex });

function BlogIndex() {
  return (
    <Shell>
      <div className="mx-auto max-w-3xl px-5 py-12">
        <p className="text-sm font-medium tracking-[0.16em] text-pine">JOURNAL</p>
        <h1 className="mt-2 font-display text-5xl tracking-tight">Notes from the road</h1>
        <p className="mt-3 text-muted">Practical pieces we published for people renting a motorhome in Spain.</p>
        <ul className="mt-10 space-y-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="block rounded-card border border-line bg-foam p-5 hover:border-pine"
              >
                <p className="text-xs text-muted">{post.date}</p>
                <h2 className="mt-1 font-display text-2xl">{post.title}</h2>
                <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Shell>
  );
}
