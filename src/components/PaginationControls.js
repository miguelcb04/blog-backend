// components/PaginationControls.js
import Link from 'next/link'

export default function PaginationControls({ currentPage, hasNextPage, hasPrevPage, total }) {
    return (
        <div className="flex justify-between mt-4">
            {hasPrevPage ? (
                <Link href={`?page=${currentPage - 1}`} className="bg-gray-300 px-4 rounded-md">
                    Anterior
                </Link>
            ) : (
                <div className="px-4"></div>
            )}
            {hasNextPage ? (
                <Link href={`?page=${currentPage + 1}`} className="bg-gray-300 px-4 rounded-md">
                    Siguiente
                </Link>
            ) : (
                <div className="px-4"></div>
            )}
        </div>
    )
}
