// PAGINACIÓN DESDE EL SERVIDOR
// Referencias:
// - https://www.youtube.com/watch?v=SXmni_7B0r4
// - https://gist.github.com/joschan21/7adf028d81a75536abcb1e98100ac661

import PaginationControls from '@/components/PaginationControls'
import { PAGE, PER_PAGE } from '@/app/api/pagination'
import { getPosts } from "@/lib/actions";

const data = [getPosts()];

export default function Home({ searchParams }) {
  const page = Number(searchParams['page'] ?? PAGE)
  const per_page = Number(searchParams['per_page'] ?? PER_PAGE)

  // mocked, skipped and limited in the real app
  const start = (page - 1) * per_page // 0, 5, 10 ...
  const end = start + per_page    // 5, 10, 15 ...

  let entries = []

  if (start >= 0 && start < data.length)   // check limits
    entries = data.slice(start, end)       // get data slice
  

  return (
    <div className='flex flex-col gap-2 items-center'>
      {entries.map((entry) => (
        <p key={entry}>{entry}</p>
      ))}

      <PaginationControls
        hasNextPage={end < data.length}
        hasPrevPage={start > 0}
      />
    </div>
  )
}

