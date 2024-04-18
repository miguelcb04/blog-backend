import Link from 'next/link';
import { auth } from "@/auth";
import { logout } from '@/lib/actions';

async function Header() {
    const session = await auth();

    return (
<nav className="py-4 bg-cover bg-center bg-gradient-to-r from-green-400 to-blue-500" style={{borderBottomLeftRadius: '2px', borderBottomRightRadius: '2px', borderBottom: '2px solid black', opacity: '0.8'}}>
    <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-4">
            <Link href="/" className="text-lg font-bold text-white hover:text-gray-100">
                Inicio
            </Link>
            {/* {session?.user?.role === 'ADMIN' && (
                <Link href="/admin" className="text-lg font-bold text-white hover:text-gray-100">Panel de Administrador
                </Link>
            )} */}
            {/* <Link href="/dashboard" className="text-lg font-bold text-white hover:text-gray-100">
                Cuenta
            </Link> */}
        </div>
        <div className="flex items-center space-x-4">
            {session ? (
                <form action={logout}>
                    <button type="submit" className="inline-flex items-center px-4 py-2 bg-white text-gray-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400">
                        SignOut
                    </button>
                </form>
            ) : (
                <div className="flex items-center space-x-4">
                    <Link href="/auth/register" className="text-lg font-bold text-white hover:text-gray-100">
                        SignUp
                    </Link>
                    <Link href="/auth/login" className="text-lg font-bold text-white hover:text-gray-100">
                        SignIn
                    </Link>
                </div>
            )}
        </div>
    </div>
</nav>

    )
    
}

export default Header;
