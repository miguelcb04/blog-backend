import { getPosts, getPostsWithCategory,newPostJson } from "@/lib/actions";

export async function GET(request) {
  const category = request.nextUrl.searchParams.get("category");
  const page = request.nextUrl.searchParams.get("page") || 1; // Obtén el número de página de la consulta, o usa 1 por defecto
  
  const postsPerPage = 2; // Número de publicaciones por página
  const startIndex = (page - 1) * postsPerPage; // Índice de inicio para la página actual
  const endIndex = startIndex + postsPerPage; // Índice de fin para la página actual

  let posts = await getPostsWithCategory(category); // Obtén todas las publicaciones con la categoría dada
  
  // Filtra las publicaciones para obtener solo las de la página actual
  const currentPagePosts = posts.slice(startIndex, endIndex);

  return Response.json(currentPagePosts);
}


export async function POST(request) {
  const content = request.headers.get('content-type')

  if (content != 'application/json')
    return Response.json({ message: 'Debes proporcionar datos JSON' })


  const postNuevo = await request.json()
  console.log(postNuevo)

  const post = await newPostJson(postNuevo);

  return Response.json(post)
}