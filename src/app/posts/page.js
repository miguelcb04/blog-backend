import Link from 'next/link'
import { auth } from "@/auth"
import Post from '@/components/Posts'
import { getPosts} from '@/lib/actions'

export const dynamic = 'force-dynamic'

export default async function Home() {
    const posts = await getPosts()
    const session = await auth()

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
             <div>
                    {posts.map((post) => (
                        <Post key={post.id} post={post} >
                        </Post>
                    ))}
                </div>
            {/* Muestra los enlaces solo si el usuario es un administrador */}
            {session?.user?.role === 'ADMIN' && (
                <div>
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
                </div>
            )}
        </div>
    )
}
