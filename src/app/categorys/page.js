// pages/categorys/index.js
import Link from 'next/link'
import { auth } from "@/auth"
import Category from '@/components/Categorys'
import PaginationControls from '@/components/PaginationControls'
import { getCategorys } from '@/lib/actions'
import { PAGE, PER_PAGE } from '@/lib/pagination'

export const dynamic = 'force-dynamic'

export default async function CategoryHome({ searchParams }) {
    const session = await auth()

    const page = Number(searchParams['page'] ?? PAGE)
    const per_page = Number(searchParams['per_page'] ?? PER_PAGE)

    const categories = await getCategorys()

    // Calcular el índice de inicio y final
    const start = (page - 1) * per_page
    const end = start + per_page

    // Obtener la porción de categorías según la página
    let entries = []

    if (start >= 0 && start < categories.length) {
        entries = categories.slice(start, end)
    }

    return (
        <div>
            {session?.user?.role === 'ADMIN' && (
                <div>
                    <Link className='bg-gray-300 px-4 rounded-md ' href="/categorys/new"> Nueva categoria </Link>
                    {entries.map((category) => (
                        <Category key={category.id} category={category}>
                            <Link
                                className='bg-gray-300 px-4 rounded-md mr-2'
                                href={{ pathname: '/categorys/edit', query: { id: category.id } }}
                            >
                                Editar categoria
                            </Link>
                            <Link
                                className='bg-gray-300 px-4 rounded-md mr-2'
                                href={{ pathname: '/categorys/delete', query: { id: category.id } }}
                            >
                                Eliminar categoria
                            </Link>
                        </Category>
                    ))}
                </div>
            )}
            <PaginationControls
                currentPage={page}
                hasNextPage={end < categories.length}
                hasPrevPage={start > 0}
                total={categories.length}
            />
        </div>
    )
}
