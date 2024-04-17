'use server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { signIn, signOut } from '@/auth';
import { getUserByEmail } from '@/lib/data';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import category from '@/components/Categorys';
import post from '@/components/Posts';


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

async function getCategoryIds() {
  const CategoryIds = await prisma.category.findMany({
    select: { id: true }
  })
  return CategoryIds.map(category => category.id)
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


export async function getPost(postId) {
  const id = Number(postId)
  try {
    const post = await prisma.posts.findUnique({
      where: { id },
      include: { categories: true }
    })

    return post;
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

    const Ids = await getCategoryIds()
    console.log("Ids", Ids)
    const check = Ids.map(id => formData.get(id.toString()))
      .filter(id => id !== null)
      .map(id => Number(id))


    const connect = check.map(id => { return { id: Number(id) } })

    const posts = await prisma.posts.create({
      data: { author, title, image, post, slug, views , categories: { connect } },
      include: { categories: true }
    })

    console.log(posts);
    console.log("hola")
    revalidatePath('/posts')
  } catch (error) {
    console.log(error);
  }
  redirect('/posts');
}


export async function newPostJson({ author, title, image, post, slug, views }) {
  try {
    const newpost = await prisma.posts.create({
      data: { author, title, image, post, slug, views },
    })
    return newpost
  } catch (error) {
    console.log(error);
  }

}

export async function editPost(formData) {
  const id = Number(formData.get('id'))
  const author = formData.get('author');
  const title = formData.get('title');
  const image = formData.get('image');
  const post = formData.get('post');
  // const created = formData.get('created');
  // const modified = formData.get('modified');
  // const is_draft = formData.get('is_draft');
  const slug = formData.get('slug');
  const views = Number(formData.get('views'));

  const Ids = await getCategoryIds()
  console.log("Ids", Ids)
  const check = Ids.map(id => formData.get(id.toString()))
    .filter(id => id !== null)
    .map(id => Number(id))


  const connect = check.map(id => { return { id: Number(id) } })
  const diferencia = Ids.filter(id => !check.includes(id));
  const disconnect = diferencia.map(id => { return { id: Number(id) } });
  console.log("conect", connect)
  try {
    const posts = await prisma.posts.update({
      where: { id },
      data: { author, title, image, post, slug, views, categories: { connect, disconnect } },
      include: { categories: true }
    })
    console.log(posts);
    revalidatePath('/posts')
  } catch (error) {
    console.log(error);
  }
  redirect('/posts');
}


export async function editPostJson({ postId, author, title, image, post, slug, views }) {
  const id = Number(postId)
  try {
    const editpost = await prisma.posts.update({
      where: { id },
      data: { author, title, image, post, slug, views },
    })
    return editpost
  } catch (error) {
    console.log(error);
  }

}


export async function deletePost(formData) {
  try {
    const id = Number(formData.get('id'))

    const posts = await prisma.posts.delete({
      where: {
        id,
      },
    })
    console.log(posts);
    revalidatePath('/posts')
  } catch (error) {
    console.log(error);
  }

  redirect('/posts');
}


export async function deletePostJson(postId) {
  const id = Number(postId)
  try {

    const post = await prisma.posts.delete({
      where: {
        id,
      },
    })
    return post
  } catch (error) {
    console.log(error);
  }

}


export async function getCategorys() {
  try {
    const categorys = await prisma.category.findMany()
    console.log("ACTIONS")
    console.log(categorys)
    return categorys;
  } catch (error) {
    // console.log(error);  
    return null;
  }
}

export async function newCategory(formData) {
  try {
    const name = formData.get('name');
    const slug = formData.get('slug');


    const categorys = await prisma.category.create({
      data: { name, slug },
    })

    console.log(categorys);
    console.log("hola")
    revalidatePath('/categorys')
  } catch (error) {
    console.log(error);
  }
  redirect('/categorys');
}


export async function editCategory(formData) {
  const id = Number(formData.get('id'))
  const name = formData.get('name');
  const slug = formData.get('slug');

  try {
    const categorys = await prisma.category.update({
      where: { id },
      data: { name, slug },
    })
    console.log(categorys);
    revalidatePath('/categorys')
  } catch (error) {
    console.log(error);
  }
  redirect('/categorys');
}

export async function deleteCategory(formData) {
  try {
    const id = Number(formData.get('id'))

    const categorys = await prisma.category.delete({
      where: {
        id: id,
      },
    })
    console.log(categorys);
    revalidatePath('/categorys')
  } catch (error) {
    console.log(error);
  }

  redirect('/categorys');
}