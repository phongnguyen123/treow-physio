import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkAuthors() {
    console.log('🔍 Checking authors in database...\n')

    const authors = await prisma.author.findMany()

    console.log(`📊 Total authors: ${authors.length}\n`)

    for (const author of authors) {
        console.log(`👤 ${author.name}`)
        console.log(`   ID: ${author.id}`)
        console.log(`   Slug: ${author.slug || '❌ MISSING'}`)
        console.log(`   Role: ${author.role}`)
        console.log('')
    }
}

checkAuthors()
    .catch((e) => {
        console.error('❌ Error:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
