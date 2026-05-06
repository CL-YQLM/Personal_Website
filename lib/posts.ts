export type Post = {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  content: string;
};

export const posts: Post[] = [
  {
    slug: "npu-opinion",
    title: "NPUs Are Changing the Game — Here's What I Actually Think",
    date: "2026-04-22",
    readTime: "5 min read",
    excerpt:
      "Everyone's talking about NPUs like they're magic. As someone who works close to the hardware, I think the real story is more nuanced — and more interesting. My take on where neural processing units actually matter, where they don't, and why the edge AI shift is bigger than most people realize.",
    tags: ["AI", "Hardware", "NPU", "Opinion"],
    content: `Coming soon — full article in progress.`,
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
