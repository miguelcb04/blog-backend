import { getPosts,newPostJson } from "@/lib/actions";

export async function GET() {
  let posts = await getPosts();
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
// app.get('/posts', async(req, res) => {
//   const result = await prisma.posts.findMany({
//   posts:+req. query.posts,
//   category:req.query.category
// })
//   res.json(result)
  
//   })
const http = require('http');
const url = require('url');

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;

  if (pathname === '/posts') {
    const { posts, category } = query;
    let result;

    if (posts && category) {
      result = await prisma.posts.findMany({
        where: {
          posts: Number(posts), // Convierte posts a un número si es un string
          category: category,
        },
      });
    } else {
      // Si no se proporcionan posts o category, devolver todos los posts
      result = await prisma.posts.findMany();
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});