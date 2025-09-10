import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/mdx'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://filmrick.com'
  
  // Get all galleries and stories
  const galleries = getAllPosts('galleries')
  const stories = getAllPosts('stories')
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/galleries`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/stories`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]
  
  // Gallery pages
  const galleryPages = galleries.map((gallery) => ({
    url: `${baseUrl}/galleries/${gallery.metadata.slug}`,
    lastModified: gallery.metadata.date ? new Date(gallery.metadata.date) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
  
  // Story pages  
  const storyPages = stories.map((story) => ({
    url: `${baseUrl}/stories/${story.metadata.slug}`,
    lastModified: story.metadata.date ? new Date(story.metadata.date) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
  
  return [...staticPages, ...galleryPages, ...storyPages]
}