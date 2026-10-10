import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { postBySlug, posts } from "@/lib/posts";

export const Route = createFileRoute("/blog/$slug")({ component: PostPage });

function PostPage() {
  const { slug } = Route.useParams();
  const post = postBySlug(slug);

  if (!post) {
    return (
      <Shell>
        <div className="mx-auto max-w-3xl px-5 py-20">
          <h1 className="font-display text-4xl">That note is not here</h1>
          <Link to="/blog" className="mt-4 inline-block text-pine">
            All posts
          </Link>
        </div>
      </Shell>
    );
  }

  const more = posts.filter((item) => item.slug !== post.slug);

  return (
    <Shell>
      <article className="mx-auto max-w-3xl px-5 py-12">
        <Link to="/blog" className="text-sm font-medium text-pine">
          Journal
        </Link>
        <p className="mt-4 text-sm text-muted">
          {post.date} · {post.author}
        </p>
        <h1 className="mt-2 font-display text-4xl leading-tight tracking-tight md:text-5xl">{post.title}</h1>
        <div className="mt-8 space-y-8">
          {post.sections.map((section) => (
            <section key={section.heading ?? section.paragraphs?.[0]}>
              {section.heading && <h2 className="font-display text-2xl">{section.heading}</h2>}
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-muted">
                  {paragraph}
                </p>
              ))}
              {section.items && (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
        <div className="mt-12 border-t border-line pt-6">
          <p className="text-sm font-medium">Keep reading</p>
          <ul className="mt-3 space-y-2">
            {more.map((item) => (
              <li key={item.slug}>
                <Link to="/blog/$slug" params={{ slug: item.slug }} className="text-pine">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Shell>
  );
}
