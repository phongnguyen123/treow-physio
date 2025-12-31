import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
}

async function fixAuthorSlugs() {
    console.log('🔍 Checking authors for missing slugs...')

    const authors = await prisma.author.findMany()

    let fixed = 0
    for (const author of authors) {
        // Check if slug is missing or empty
        if (!author.slug || author.slug.trim() === '') {
            const slug = generateSlug(author.name)
            console.log(`📝 Adding slug for "${author.name}": ${slug}`)

            await prisma.author.update({
                where: { id: author.id },
                data: { slug }
            })

            fixed++
        } else {
            console.log(`✅ "${author.name}" already has slug: ${author.slug}`)
        }
    }

    console.log(`\n✨ Fixed ${fixed} author(s)`)
    console.log(`📊 Total authors: ${authors.length}`)
}

fixAuthorSlugs()
    .catch((e) => {
        console.error('❌ Error:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
