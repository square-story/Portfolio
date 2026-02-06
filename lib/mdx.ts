import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const db = path.join(process.cwd(), 'content')

export function getProjectMDX(slug: string) {
    const filePath = path.join(db, 'projects', `${slug}.mdx`)
    if (!fs.existsSync(filePath)) {
        return null
    }
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { content, data } = matter(fileContent)
    return {
        content,
        frontmatter: data,
        slug,
    }
}

export function getAllProjectsMDX() {
    const projectsDir = path.join(db, 'projects')
    if (!fs.existsSync(projectsDir)) {
        return []
    }
    const files = fs.readdirSync(projectsDir)
    return files
        .filter((file) => path.extname(file) === '.mdx')
        .map((file) => {
            const slug = file.replace('.mdx', '')
            return getProjectMDX(slug)
        })
}
