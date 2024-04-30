import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const posts = [
  {
    author: "John Doe",
    title: "Introduction to AI",
    image: "intro_ai.jpg",
    post: "<h1>AI is shaping our future.</h1><p>Let's explore its basics.</p>",
    slug: "introduction-to-aiI",
    views: 1500,
    categories: ["Technology", "Science"]
  },
  {
    author: "ejemplo",
    title: "Healthy Eating Habits",
    image: "healthy_eating.jpg",
    post: "<h1>Benefits of eating healthy.</h1><p>Discover how to improve your diet.</p>",
    slug: "healthy-eating-habits",
    views: 500,
    categories: ["Food", "Health"]
  }
];

const load = async () => {
  try {
    // Crear los posts
    for (const post of posts) {
      const createdPost = await prisma.posts.create({
        data: {
          author: post.author,
          title: post.title,
          image: post.image,
          post: post.post,
          slug: post.slug,
          views: post.views,
          categories: {
            connectOrCreate: post.categories.map(categoryName => ({
              where: { name: categoryName },
              create: { name: categoryName, slug: categoryName.toLowerCase().replace(/\s+/g, '-') }
            }))
          }
        },
        include: {
          categories: true // Incluir las categorías en la respuesta
        }
      });

      console.log(`Post creado con el ID ${createdPost.id} y categorías conectadas:`, createdPost.categories);
    }
  } catch (error) {
    console.error("Error al insertar datos:", error);
  } finally {
    await prisma.$disconnect();
  }
};

load();




// import { PrismaClient } from '@prisma/client'

// // DECLARACIÓN DE DATOS
// const posts = [
//     {
//         author: "John Doe",
//         title: "Introduction to AI",
//         image: "intro_ai.jpg",
//         post: "<h1>AI is shaping our future.</h1><p>Let's explore its basics.</p>",
//         slug:"introduction-to-aiI",
//         views: 1500,
//     }
// ];

// const categorys = [
//     {
//         name: "Technologys",
//         slug: "technologys",
//     }
// ];



// // INSERCIÓN DE DATOS
// const prisma = new PrismaClient();

// const load = async () => {
//     try {
//         await prisma.posts.deleteMany({});
//         console.log('Borrados los registros de la tabla posts');

//         // await prisma.$queryRaw`ALTER SEQUENCE posts_id_seq RESTART WITH 1`;
//         // console.log('reset post sequence to 1');

//         await prisma.posts.createMany({
//             data: posts,
//         });
//         console.log('Añadidos datos a tabla post');

//         await prisma.category.deleteMany({});
//         console.log('Borrados los registros de la tabla category');

//         // await prisma.$queryRaw`ALTER SEQUENCE category_id_seq RESTART WITH 1`;
//         // console.log('reset category sequence to 1');

//         await prisma.category.createMany({
//             data: categorys,
//         });
//         console.log('Añadidos datos a tabla category');

//     } catch (e) {
//         console.error(e);
//         process.exit(1);
//     } finally {
//         await prisma.$disconnect();
//     }
// };

// load();



// import { PrismaClient } from '@prisma/client'

// // DECLARACIÓN DE DATOS
// const posts = [
//     {
//         author: "John Doe",
//         title: "Introduction to AI",
//         image: "intro_ai.jpg",
//         post: "<h1>AI is shaping our future.</h1><p>Let's explore its basics.</p>",
//         views: 1500,
//     },
//     {
//         author: "ejemplo",
//         title: "Introduction to AI",
//         image: "intro_ai.jpg",
//         post: "<h1>AI is shaping our future.</h1><p>Let's explore its basics.</p>",
//         views: 150,
//         categories: {
//             connectOrCreate: {
//                 where: { slug: "food" },
//                 create: { name: "Food", slug: "food" }
//             }
//         }
//     }
// ];

// const categorys = [
//     {
//         name: "Technologys",
//         slug: "technologys",
//     },
//     {
//         name: "Food",
//         slug: "food",
//     }
// ];

// // INSERCIÓN DE DATOS
// const prisma = new PrismaClient();

// const load = async () => {
//     try {
//         await prisma.posts.deleteMany({});
//         console.log('Borrados los registros de la tabla posts');

//         for (let i = 0; i < posts.length; i++) {
//             const post = posts[i];
//             const slug = `${post.title.replace(/\s+/g, '-').toLowerCase()}-${i + 1}`;

//             await prisma.posts.create({
//                 data: {
//                     author: post.author,
//                     title: post.title,
//                     image: post.image,
//                     post: post.post,
//                     slug: slug,
//                     views: post.views,
//                     categories: {
//                         connectOrCreate: post.categories ? post.categories.connectOrCreate : undefined
//                     }
//                 }
//             });
//         }
//         console.log('Añadidos datos a tabla post');

//         await prisma.category.deleteMany({});
//         console.log('Borrados los registros de la tabla category');

//         await prisma.category.createMany({
//             data: categorys,
//         });
//         console.log('Añadidos datos a tabla category');

//     } catch (e) {
//         console.error(e);
//         process.exit(1);
//     } finally {
//         await prisma.$disconnect();
//     }
// };

// load();