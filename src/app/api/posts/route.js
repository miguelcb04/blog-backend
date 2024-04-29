import { getPosts, getPostsWithCategory,newPostJson } from "@/lib/actions";

export async function GET( request) {
  const category = request.nextUrl.searchParams.get("category")
  
  let posts = await getPostsWithCategory(category );
  console.log('api', posts)
  return Response.json(posts)
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