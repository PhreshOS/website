import type { Metadata } from "next"
import Link from "next/link"
import { allPosts, blogRoute, postDate } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing about PhreshOS: what it is for, how it works, and how it compares.",
  alternates: { canonical: blogRoute, types: { "application/rss+xml": `${blogRoute}/feed.xml` } }
}

export default function Blog() {
  const posts = allPosts()
  return <section className="section blog">
    <h2 className="section-title">Blog</h2>
    <p className="section-lede">Writing about PhreshOS: what it is for, how it works, and how it compares.</p>
    {posts.length === 0
      ? <p className="muted blog-empty">Nothing here yet.</p>
      : <ol className="blog-list">
        {posts.map(post => <li key={post.url}>
          <time dateTime={post.data.date} className="muted">{postDate(post)}</time>
          <h3><Link href={post.url}>{post.data.title}</Link></h3>
          <p className="muted">{post.data.description}</p>
        </li>)}
      </ol>}
  </section>
}
