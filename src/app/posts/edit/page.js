import Form from "@/components/Form";
import {prisma} from "@/lib/prisma";
import { editPost } from "@/lib/actions";

export const dynamic = "force-dynamic";

async function page({ searchParams }) {
  let post = null;

  try {
    post = await prisma.post.findUnique({
      where: {
        id: Number(searchParams.id),
      },
    });
  } catch (error) {
    console.error("Error al obtener el post:", error);
  }

  // Verificar si post es null o undefined antes de usarlo
  if (!post) {
    return <div>post no encontrado</div>;
  }

  return (
<div className="flex justify-center items-center ">
  <div className="bg-white p-8 rounded-lg shadow-md text-blue-500 max-w-md w-full">
    <h3 className="text-2xl font-bold mb-4 text-center">Editar post {searchParams.id}</h3>
    <Form action={editPost} title="Editar post" post={post} />
  </div>
</div>

  );
}

export default page;

