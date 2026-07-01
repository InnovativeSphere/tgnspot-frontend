import { getPostBySlug, getRelatedPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'
import { PostHero } from '@/components/post/PostHero'
import { PostBody } from '@/components/post/PostBody'
import { ReadingProgress } from '@/components/post/ReadingProgress'
import { DeadSilenceToggle } from '@/components/post/DeadSilenceToggle'
import { AdSlot } from '@/components/ui/AdSlot'
import { VerdictBar } from '@/components/post/VerdictBar'
import { RelatedPosts } from '@/components/post/RelatedPosts'
import { ShareSnippet } from '@/components/ui/ShareSnippet'
import { PostSlideshow } from '@/components/post/PostSlideshow'
import { PostWaves } from '@/components/post/PostWaves'
import { PSDivider } from '@/components/ui/PSDivider'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const related = await getRelatedPosts(post.id, 3)
  const slideshowImages: string[] = post.slideshow_images || []

  // Ensure category is an array
  const categoryArray: string[] = post.category || ['Gaming']

  return (
    <>
      <ReadingProgress />
      <DeadSilenceToggle />
      <PostWaves />

      <article id="post-body" className="mx-auto max-w-4xl px-6 py-12 relative z-10">
        <PostHero
          hero_image_url={post.hero_image_url}
          title={post.title}
          subtitle={post.subtitle}
          category={categoryArray}
          mood_primary={post.mood_primary}
          mood_secondary={post.mood_secondary}
          created_at={post.created_at}
          content={post.content}
          slug={post.slug}
        />

        <PSDivider />

        <AdSlot position="hero" className="my-8" />

        <PostBody content={post.content} />

        {slideshowImages.length > 0 && (
          <>
            <PSDivider />
            <PostSlideshow images={slideshowImages} />
          </>
        )}

        <AdSlot position="below-post" className="my-8" />

        <PSDivider />

        <VerdictBar verdict={post.verdict} />
      </article>

      <RelatedPosts posts={related} />
      <ShareSnippet slug={post.slug} />
    </>
  )
}