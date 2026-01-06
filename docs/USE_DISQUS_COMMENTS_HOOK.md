# useDisqusComments Hook

This custom hook connects to Disqus to retrieve the comment count for a specific article.

## Features

- ✅ **Multiple retrieval methods**: Uses different strategies to obtain the most accurate count
- ✅ **Loading state**: Provides information about the loading state
- ✅ **Error handling**: Includes robust error handling
- ✅ **Fallbacks**: If one method fails, it tries other methods
- ✅ **Optimization**: Avoids loading duplicate scripts
- ✅ **TypeScript**: Fully typed

## Basic Usage

### Complete Hook

```tsx
import { useDisqusComments } from "@/hooks/use-disqus-comments"

function MyComponent({ articleSlug }: { articleSlug: string }) {
  const { count, isLoading, error } = useDisqusComments(articleSlug)

  if (isLoading) {
    return <span>Loading comments...</span>
  }

  if (error) {
    return <span>Error: {error}</span>
  }

  return (
    <span>
      {count} {count === 1 ? 'comment' : 'comments'}
    </span>
  )
}
```

### Simplified Hook

```tsx
import { useCommentCount } from "@/hooks/use-disqus-comments"

function MyComponent({ articleSlug }: { articleSlug: string }) {
  const commentCount = useCommentCount(articleSlug)

  return (
    <span>
      {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
    </span>
  )
}
```

## API

### useDisqusComments(identifier: string)

Returns an object with:

- `count: number` - Number of comments (default: 0)
- `isLoading: boolean` - Loading state
- `error: string | null` - Error message if a problem occurs

### useCommentCount(identifier: string)

Directly returns the comment count as `number`.

## Retrieval Methods

The hook uses multiple methods to retrieve the comment count:

1. **Disqus loaded check**: Verifies if Disqus is already loaded on the page
2. **count.js script**: Loads the official Disqus script for counting
3. **Existing elements**: Searches for existing elements with the count
4. **Temporary element**: Creates a temporary element for Disqus to process

## Required Configuration

Make sure you have the following environment variables configured:

```env
NEXT_PUBLIC_DISQUS_SHORTNAME=your-disqus-shortname
```

## Implementation Example

```tsx
// components/blog-article.tsx
import { useDisqusComments } from "@/hooks/use-disqus-comments"

export function BlogArticle({ slug }: { slug: string }) {
  const { count: commentCount, isLoading: commentLoading } = useDisqusComments(slug)

  return (
    <div className="article-stats">
      <div className="flex items-center gap-1">
        <MessageSquare className="h-4 w-4" />
        <span>
          {commentLoading ? (
            <span className="inline-flex items-center gap-1">
              <span className="w-3 h-3 bg-gray-400 rounded animate-pulse"></span>
              comments
            </span>
          ) : (
            `${commentCount} ${commentCount === 1 ? 'comment' : 'comments'}`
          )}
        </span>
      </div>
    </div>
  )
}
```

## Considerations

- The hook is optimistic and does not block the UI if it cannot retrieve the count
- Uses timeouts to avoid infinite loading
- Compatible with SSR (Server-Side Rendering)
- Automatically cleans up when the component unmounts
- Handles multiple instances of the same identifier

## Troubleshooting

### Count is always 0

1. Verify that `NEXT_PUBLIC_DISQUS_SHORTNAME` is configured
2. Make sure the domain is in Disqus "Trusted Domains"
3. Verify that the article has comments on Disqus

### Hook does not load

1. Check the browser console for errors
2. Verify internet connectivity
3. Make sure Disqus is not blocked by ad-blockers

### Performance

The hook is optimized for:
- Avoid duplicate script loads
- Use reasonable timeouts
- Automatically clean up resources
- Handle multiple instances efficiently