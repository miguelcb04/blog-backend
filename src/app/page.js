import Link from 'next/link'
import { auth } from "@/auth"
// import Articulo from '@/components/Articulos'
// import { getPosts } from '@/lib/actions'
export const dynamic = 'force-dynamic'

export default async function Home() {
    // const articulos = await getPosts()
    const session = await auth()

  return (
<main className="flex justify-center items-center h-screen bg-cover bg-black overflow-y-hidden" >
    <div className="text-center bg-gr p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Fedesoft</h1>
        <ul className="space-y-4">
            <hr className="my-4 border-t-2 border-gray-200" />
            <li>
                <div className="bg-blue-100 p-4 rounded-lg">
                    <Link href="/posts" className="text-blue-500 hover:underline">Listado de posts</Link>
                </div>
            </li>
        </ul>
    </div>
</main>
)
}
