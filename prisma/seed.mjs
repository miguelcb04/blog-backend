import { PrismaClient } from '@prisma/client'

// DECLARACIÓN DE DATOS
const posts = [
    {
        author: "John Doe",
        title: "Introduction to AI",
        image: "intro_ai.jpg",
        post: "<h1>AI is shaping our future.</h1><p>Let's explore its basics.</p>",
        slug:"introduction-to-aiI",
        views: 1500,
    }
];

const categorys = [
    {
        name: "Technologys",
        slug: "technologys",
    }
];



// INSERCIÓN DE DATOS
const prisma = new PrismaClient();

const load = async () => {
    try {
        await prisma.posts.deleteMany({});
        console.log('Borrados los registros de la tabla posts');

        // await prisma.$queryRaw`ALTER SEQUENCE posts_id_seq RESTART WITH 1`;
        // console.log('reset post sequence to 1');

        await prisma.posts.createMany({
            data: posts,
        });
        console.log('Añadidos datos a tabla post');

        await prisma.category.deleteMany({});
        console.log('Borrados los registros de la tabla category');

        // await prisma.$queryRaw`ALTER SEQUENCE category_id_seq RESTART WITH 1`;
        // console.log('reset category sequence to 1');

        await prisma.category.createMany({
            data: categorys,
        });
        console.log('Añadidos datos a tabla category');

    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

load();