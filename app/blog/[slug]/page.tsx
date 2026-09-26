import { notFound } from "next/navigation";
import { getPost, posts } from "@/lib/posts";
import Link from "next/link";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: `${post.title} — Cici Liu` };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const formatted = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="max-w-2xl mx-auto px-6 py-24">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-black/40 hover:text-black transition-colors mb-12 font-mono"
      >
        ← Back
      </Link>

      <div className="space-y-4 mb-10">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 bg-black/[0.04] rounded-full text-black/50"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-4xl font-bold tracking-tight leading-snug">{post.title}</h1>
        <p className="text-sm text-black/40 font-mono">
          {formatted} · {post.readTime}
        </p>
      </div>

      <article className="prose prose-neutral max-w-none text-black/70 leading-relaxed">
        {post.content}
      </article>
    </main>
  );
}
