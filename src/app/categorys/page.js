import Link from 'next/link'
import { auth } from "@/auth"
import Category from '@/components/Categorys'
import { getCategorys} from '@/lib/actions'

export const dynamic = 'force-dynamic'

export default async function Home() {
    const category = await getCategorys()
    const session = await auth()
    
    return (
        <div >
            {session?.user?.role === 'ADMIN' && (
                <div >
                <Link className='bg-gray-300 px-4 rounded-md ' href="/categorys/new"> Nueva categoria </Link>
                {category.map((category) => (
                    <Category key={category.id} category={category} >
                        <Link
                           className='bg-gray-300  px-4 rounded-md mr-2'
                        href={{ pathname: '/categorys/edit', query: { id: category.id } }}>
                        Editar categoria
                    </Link>
                            <Link 
                               className='bg-gray-300 px-4 rounded-md mr-2  mt-12'
                            href={{ pathname: '/categorys/delete', query: { id: category.id } }}>
                            Eliminar categoria
                            </Link>
                    </Category>
                ))}
            </div>
            )}
        </div>
    )
}
