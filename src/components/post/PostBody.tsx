// components/post/PostBody.tsx
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { AdSlot } from '@/components/ui/AdSlot'

interface PostBodyProps {
  content: string
}

export function PostBody({ content }: PostBodyProps) {
  // Split markdown at the 3rd paragraph boundary
  const parts = content.split(/\n\n+/)
  const midIndex = 3 // after the 3rd paragraph

  const firstPart = parts.slice(0, midIndex).join('\n\n')
  const secondPart = parts.slice(midIndex).join('\n\n')

  return (
    <div className="prose prose-lg prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <a href={href} className="text-orange underline hover:no-underline">
              {children}
            </a>
          ),
        }}
      >
        {firstPart}
      </ReactMarkdown>

      <AdSlot position="mid-article" className="my-8" />

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <a href={href} className="text-orange underline hover:no-underline">
              {children}
            </a>
          ),
        }}
      >
        {secondPart}
      </ReactMarkdown>
    </div>
  )
}