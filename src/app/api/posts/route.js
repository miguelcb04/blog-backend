import { PAGE, PER_PAGE } from '@/lib/pagination';

export async function GET(request) {
  const category = request.nextUrl.searchParams.get("category");
  const page = request.nextUrl.searchParams.get("page") || PAGE; // Obtén el número de página de la consulta, o usa 1 por defecto

  let posts;
  
  if (category) {
    // Si se proporciona un parámetro de categoría, busca posts solo en esa categoría
    // http://localhost:3000/api/posts?category=desarrollo-web&page=2
    posts = await getPostsWithCategoryApi(category, page);
  } else {
    // Si no se proporciona un parámetro de categoría, obtener todas según la página
    // http://localhost:3000/api/posts?page=4
    // http://localhost:3000/api/posts
     posts = await getAllPostsApi(page);
  }

  return Response.json(posts);
}

async function getPostsWithCategoryApi(categoryName, page) {
  try {
    // Calcular el índice de inicio y el número de posts a mostrar
    const startIndex = (page - 1) * PER_PAGE;
    
    // Consulta para obtener los posts con la categoría especificada
    const posts = await prisma.posts.findMany({
      include: { categories: true },
      where: {
        categories: {
          some: {
            slug: categoryName
          }
        }
      },
      skip: startIndex,
      take: PER_PAGE
    });

    console.log('Posts:', posts);
    return posts;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}


async function getAllPostsApi(page) {
  try {
    // Calcular el índice de inicio y el número de posts a mostrar
    const startIndex = (page - 1) * PER_PAGE;
    
    // Consulta para obtener todos los posts
    const posts = await prisma.posts.findMany({
      include: { categories: true },
      skip: startIndex,
      take: PER_PAGE
    });

    console.log('All Posts:', posts);
    return posts;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}