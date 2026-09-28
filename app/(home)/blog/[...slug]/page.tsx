import type { Metadata } from "next"
import type { ComponentProps } from "react"
import Image, { type StaticImageData } from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { StructuredData, blogPostData } from "@/components/structured-data"
import { blog, blogRoute, postDate } from "@/lib/blog"

export const dynamicParams = false

export default async function Post(props: PageProps<"/blog/[...slug]">) {
  const post = blog.getPage((await props.params).slug)
  if (!post) notFound()
  const Body = post.data.body

  return <article className="section article">
    <StructuredData data={blogPostData({ title: post.data.title, description: post.data.description, url: post.url, date: post.data.date, author: post.data.author })} />
    <p className="muted article-meta">
      <Link href={blogRoute}>Blog</Link> · <time dateTime={post.data.date}>{postDate(post)}</time> · {post.data.author}
    </p>
    <h1>{post.data.title}</h1>
    <p className="article-lede">{post.data.description}</p>
    <div className="article-body"><Body components={{ img: PostImage }} /></div>
  </article>
}

/** An image in a post. Posts keep their images beside them, so each arrives imported with its size. */
function PostImage({ src, alt }: ComponentProps<"img">) {
  return <Image src={src as unknown as StaticImageData} alt={alt ?? ""} sizes="(max-width: 760px) 100vw, 760px" />
}

export function generateStaticParams() {
  return blog.generateParams()
}

export async function generateMetadata(props: PageProps<"/blog/[...slug]">): Promise<Metadata> {
  const post = blog.getPage((await props.params).slug)
  if (!post) notFound()
  return {
    title: post.data.title,
    description: post.data.description,
    authors: [{ name: post.data.author }],
    alternates: { canonical: post.url },
    openGraph: { type: "article", title: post.data.title, description: post.data.description, url: post.url, publishedTime: post.data.date, authors: [post.data.author] }
  }
}
