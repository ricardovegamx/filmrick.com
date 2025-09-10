import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content')

export interface PostMetadata {
  title: string
  description?: string
  date?: string
  tags?: string[]
  slug: string
}

export interface Post {
  metadata: PostMetadata
  content: string
}

export function getPostSlugs(section: string): string[] {
  const sectionPath = path.join(contentDirectory, section)
  
  if (!fs.existsSync(sectionPath)) {
    return []
  }
  
  return fs.readdirSync(sectionPath)
    .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx?$/, ''))
}

export function getPostBySlug(section: string, slug: string): Post | null {
  const fullPath = path.join(contentDirectory, section, `${slug}.md`)
  const mdxPath = path.join(contentDirectory, section, `${slug}.mdx`)
  
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

export function getAllPosts(section: string): Post[] {
  const slugs = getPostSlugs(section)
  return slugs
    .map(slug => getPostBySlug(section, slug))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => {
      if (a.metadata.date && b.metadata.date) {
        return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
      }
      return 0
    })
}