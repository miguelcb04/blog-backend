import Link from 'next/link'
import { auth } from "@/auth"
import Category from '@/components/Categorys'
import { getCategorys} from '@/lib/actions'

export const dynamic = 'force-dynamic'

export default async function Home() {
    const category = await getCategorys()
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
                    <Link className='enlace' href="/categorys/new"> Nueva categoria </Link>
                    {category.map((category) => (
                        <Category key={category.id} category={category} >
                            <Link
                               className='enlace'
                            href={{ pathname: '/categorys/edit', query: { id: category.id } }}>
                            Editar categoria
                        </Link>
                                <Link
                                   className='enlace'
                                href={{ pathname: '/categorys/delete', query: { id: category.id } }}>
                                Eliminar categoria
                                </Link>
                        </Category>
                    ))}
                </div>
            {/* Muestra los enlaces solo si el usuario es un administrador */}
            {session?.user?.role === 'ADMIN' && (
                <div>
                <Link className='enlace' href="/categorys/new"> Nueva categoria </Link>
                {categorys.map((category) => (
                    <Category key={category.id} category={category} >
                        <Link
                           className='enlace'
                        href={{ pathname: '/categorys/edit', query: { id: category.id } }}>
                        Editar categoria
                    </Link>
                            <Link
                               className='enlace'
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
