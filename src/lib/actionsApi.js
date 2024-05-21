'use server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { signIn, signOut } from '@/auth';
import { getUserByEmail } from '@/lib/data';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

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