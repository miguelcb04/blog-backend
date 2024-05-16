// pages/posts/index.js
import Link from 'next/link'
import { auth } from "@/auth"
import Post from '@/components/Posts'
import { getPostsWithCategory, getAllPosts } from '@/lib/actions'
import PaginationControls from '@/components/PaginationControls'
import { PAGE, PER_PAGE } from '@/lib/pagination'

export const dynamic = 'force-dynamic'

export default async function PostHome({ searchParams }) {
    const session = await auth()

    const page = Number(searchParams['page'] ?? PAGE)
    const per_page = Number(searchParams['per_page'] ?? PER_PAGE)
    const category = searchParams['category'] ?? ''

    let posts = []
    if (category) {
        posts = await getPostsWithCategory(category)
    } else {
        posts = await getAllPosts(page)
    }

    // mocked, skipped and limited in the real app
    const start = (page - 1) * per_page // 0, 5, 10 ...
    const end = start + per_page    // 5, 10, 15 ...

    let entries = []

    if (start >= 0 && start < posts.length)   // check limits
        entries = posts.slice(start, end)       // get posts slice

    return (
        <div>
            {session?.user?.role === 'ADMIN' && (
                <div>
                    <Link className='bg-gray-300 px-4 rounded-md ' href="/posts/new"> Nuevo post </Link>
                    {entries.map((post) => (
                        <Post key={post.id} post={post}>
                            <Link
                                className='bg-gray-300  px-4 rounded-md mr-2'
                                href={{ pathname: '/posts/edit', query: { id: post.id } }}>
                                Editar post
                            </Link>
                            <Link
                               className='bg-gray-300  px-4 rounded-md mr-2'
                                href={{ pathname: '/posts/delete', query: { id: post.id } }}>
                                Eliminar post
                            </Link>
                        </Post>
                    ))}
                </div>
            )}
            <PaginationControls
                currentPage={page}
                hasNextPage={end < posts.length}
                hasPrevPage={start > 0}
                total={posts.length}
            />
        </div>
    )
}
