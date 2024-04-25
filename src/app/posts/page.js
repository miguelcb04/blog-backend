// Referencias:
// - https://www.youtube.com/watch?v=SXmni_7B0r4
// - https://gist.github.com/joschan21/7adf028d81a75536abcb1e98100ac661



import Link from 'next/link'
import { auth } from "@/auth"
import Post from '@/components/Posts'
import { getPosts, getPostsWithCategory } from '@/lib/actions'
import PaginationControls from '@/components/PaginationControls'
import { PAGE, PER_PAGE } from '@/lib/pagination'


export const dynamic = 'force-dynamic'

export default async function Home({ searchParams }) {
 
    const session = await auth()

    const page = Number(searchParams['page'] ?? PAGE)
    const per_page = Number(searchParams['per_page'] ?? PER_PAGE)
    const category = searchParams['category'] ?? ''

    const posts = await getPostsWithCategory(category)


    // mocked, skipped and limited in the real app
    const start = (page - 1) * per_page // 0, 5, 10 ...
    const end = start + per_page    // 5, 10, 15 ...

    let entries = []

    if (start >= 0 && start < posts.length)   // check limits
        entries = posts.slice(start, end)       // get posts slice



    // console.log("Bicicletas:", bicicletas); // Registrar las bicicletas en la consola
    // console.log("Sesión:", session); // Registrar la sesión en la consola

    return (
        <div>
            {/* {session?.user?.role === 'USER' && (
                <div>
                    {articulos.map((cliente) => (
                        <Articulo key={cliente.id} cliente={cliente} >
                        </Articulo>
                    ))}
                </div>
            )} */}
            {/* <div>
                    <Link className='enlace' href="/posts/new"> Nuevo post </Link>
                    {posts.map((post) => (
                        <Post key={post.id} post={post} >
                            <Link
                               className='enlace'
                            href={{ pathname: '/posts/edit', query: { id: post.id } }}>
                            Editar post
                        </Link>
                                <Link
                                   className='enlace'
                                href={{ pathname: '/posts/delete', query: { id: post.id } }}>
                                Eliminar post
                                </Link>
                        </Post>
                    ))}
                </div> */}
            {/* Muestra los enlaces solo si el usuario es un administrador */}
            {session?.user?.role === 'ADMIN' && (
                <div>
                    <Link className='enlace' href="/posts/new"> Nuevo post </Link>
                    {entries.map((post) => (
                        <Post key={post.id} post={post} >
                            <Link
                                className='enlace'
                                href={{ pathname: '/posts/edit', query: { id: post.id } }}>
                                Editar post
                            </Link>
                            <Link
                                className='enlace'
                                href={{ pathname: '/posts/delete', query: { id: post.id } }}>
                                Eliminar post
                            </Link>
                        </Post>
                    ))}
                </div>
            )}
            <PaginationControls
                hasNextPage={end < posts.length}
                hasPrevPage={start > 0}
                total={posts.length}
            />
        </div>
    )
}




