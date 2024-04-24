'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { PAGE, PER_PAGE } from '@/app/api/pagination'


function PaginationControls ({hasNextPage,  hasPrevPage}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const page = Number (searchParams.get('page') ?? PAGE )
  const per_page = Number (searchParams.get('per_page') ?? PER_PAGE )

  return (
    <div className='flex gap-2'>
      <button
        className='bg-blue-500 text-white p-1'
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/?page=${page - 1}&per_page=${per_page}`)
        }}>
        prev page
      </button>

      <div>
        {page} / {Math.ceil(10 / per_page)}
      </div>

      <button
        className='bg-blue-500 text-white p-1'
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/?page=${page + 1}&per_page=${per_page}`)
        }}>
        next page
      </button>
    </div>
  )
}

export default PaginationControls
