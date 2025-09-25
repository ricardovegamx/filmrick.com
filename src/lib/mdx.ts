import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content')

export interface PostMetadata {
  title: string
  description?: string
  date?: string
  tags?: string[]
  cover?: string
  slug: string
}

export interface Post {
  metadata: PostMetadata
  content: string
}

export function getPostSlugs(section: string, language?: string): string[] {
  const sectionPath = path.join(contentDirectory, section)

  if (!fs.existsSync(sectionPath)) {
    return []
  }

  if (language === 'en') {
    // Get English posts from the en subdirectory
    const enPath = path.join(sectionPath, 'en')
    if (!fs.existsSync(enPath)) {
      return []
    }
    return fs.readdirSync(enPath)
      .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
      .map(file => file.replace(/\.mdx?$/, ''))
  } else {
    // Get Spanish posts from the main directory (exclude en subdirectory)
    return fs.readdirSync(sectionPath)
      .filter(item => {
        const fullPath = path.join(sectionPath, item)
        return !fs.statSync(fullPath).isDirectory() && (item.endsWith('.md') || item.endsWith('.mdx'))
      })
      .map(file => file.replace(/\.mdx?$/, ''))
  }
}

export function getPostBySlug(section: string, slug: string, language?: string): Post | null {
  let basePath: string

  if (language === 'en') {
    basePath = path.join(contentDirectory, section, 'en')
  } else {
    basePath = path.join(contentDirectory, section)
  }

  const fullPath = path.join(basePath, `${slug}.md`)
  const mdxPath = path.join(basePath, `${slug}.mdx`)

  let filePath: string
  if (fs.existsSync(mdxPath)) {
    filePath = mdxPath
  } else if (fs.existsSync(fullPath)) {
    filePath = fullPath
  } else {
    return null
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    metadata: {
      ...data,
      slug,
    } as PostMetadata,
    content,
  }
}

export function getAllPosts(section: string, language?: string): Post[] {
  const slugs = getPostSlugs(section, language)
  return slugs
    .map(slug => getPostBySlug(section, slug, language))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => {
      if (a.metadata.date && b.metadata.date) {
        return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
      }
      return 0
    })
}

export function getPaginatedPosts(section: string, page: number = 1, postsPerPage: number = 6, language?: string): {
  posts: Post[]
  totalPages: number
  currentPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
} {
  const allPosts = getAllPosts(section, language)
  const totalPages = Math.ceil(allPosts.length / postsPerPage)
  const startIndex = (page - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const posts = allPosts.slice(startIndex, endIndex)

  return {
    posts,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1
  }
}