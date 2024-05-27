import { PAGE } from '@/lib/pagination';
import { getPostsWithCategoryApi, getAllPostsApi } from '@/lib/actionsApi';

export async function GET(request) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const page = parseInt(url.searchParams.get("page")) || PAGE; // Obtén el número de página de la consulta, o usa 1 por defecto

  let posts;
  
  if (category) {
    // Si se proporciona un parámetro de categoría, busca posts solo en esa categoría
    posts = await getPostsWithCategoryApi(category, page);
  } else {
    // Si no se proporciona un parámetro de categoría, obtener todas según la página
    posts = await getAllPostsApi(page);
  }

  return new Response(JSON.stringify(posts), {
    headers: { 'Content-Type': 'application/json' }
  });
}

