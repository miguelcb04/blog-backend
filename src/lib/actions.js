'use server'
import bcrypt from 'bcryptjs'
import {prisma}  from '@/lib/prisma'
import { signIn, signOut } from '@/auth';
import { getUserByEmail } from '@/lib/data';
import { redirect } from 'next/navigation';


// REGISTER
export async function register(formData) {
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    // Comprobamos si el usuario ya está registrado
    const user = await getUserByEmail(email);

    if (user) {
        return { error: 'El email ya está registrado' }
    }

    // Encriptamos password 
    const hashedPassword = await bcrypt.hash(password, 10)

    // Guardamos credenciales en base datos
    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    return { success: "Registro correcto" }
}



// LOGIN credentials
export async function login(formData) {
    const email = formData.get('email')
    const password = formData.get('password')

    // Comprobamos si el usuario está registrado
    const user = await getUserByEmail(email);

    if (!user) {
        return { error: 'Usuario no registrado.' }
    }

    // Comparamos password 
    const matchPassword = await bcrypt.compare(password, user.password)

    if (user && matchPassword) {  // && user.emailVerified
        await signIn('credentials',
            {
                email, password,
                redirectTo: globalThis.callbackUrl
                // redirectTo: user.role == 'ADMIN' ? '/admin' : '/dashboard'
            })
        return { success: "Inicio de sesión correcto" }
    } else {
        return { error: 'Credenciales incorrectas.' }
    }

}

// LOGIN google
export async function loginGoogle() {
    try {
        await signIn('google', { redirectTo: globalThis.callbackUrl })
    } catch (error) {
        console.log(error);
        throw error
    }
}

// LOGIN github
//globalThis.callbackUrl
export async function loginGithub() {
    try {
        await signIn('github', { redirectTo: globalThis.callbackUrl })
    } catch (error) {
        console.log(error);
        throw error
    }
}


export async function loginSpotify() {
    try {
        await signIn('spotify', { redirectTo: globalThis.callbackUrl })
    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function loginGitLab() {
    try {
        await signIn('gitlab', { redirectTo: globalThis.callbackUrl })
    } catch (error) {
        console.log(error);
        throw error
    }
}


// LOGOUT
export async function logout() {
    try {
        await signOut({ redirectTo: '/' })
    } catch (error) {
        throw error
    }
}


export async function getPosts() {
  try {
    const posts = await prisma.posts.findMany()
    console.log("ACTIONS")
    console.log(posts)
    return posts;
  } catch (error) {
    // console.log(error);  
    return null;
  }
}

export async function newPost(formData) {
  try {
    const author = formData.get('author');
    const title = formData.get('title');
    const image = formData.get('image');
    const post = formData.get('post');
    const slug = formData.get('slug');
    const views = Number(formData.get('views'));

    const posts = await prisma.posts.create({
      data: { author, title, image, post, slug, views  },
    })

    console.log(posts);
    console.log("hola")
    revalidatePath('/posts')
  } catch (error) {
    console.log(error);
  }
  redirect('/posts');
}


export async function editPost(formData) {
  const id = Number( formData.get('id') )
  const author = formData.get('author');
  const title = formData.get('title');
  const image = formData.get('image');
  const post = formData.get('post');
  // const created = formData.get('created');
  // const modified = formData.get('modified');
  // const is_draft = formData.get('is_draft');
  const slug = formData.get('slug');
  const views = Number(formData.get('views'));

  try {
    const posts = await prisma.posts.update({
      where: { id },
      data: {  author, title, image, post, slug, views },
    })
    console.log(posts);
    revalidatePath('/posts')
  } catch (error) {
    console.log(error);
  }
  redirect('/posts');
}

export async function deletePost(formData) {
  try {
    const id = Number(formData.get('id'))
  
    const posts = await prisma.posts.delete({
      where: {
        id: id,
      },
    })
    console.log(posts);
    revalidatePath('/posts')
  } catch (error) {
    console.log(error);
  }

  redirect('/posts');
}