import Form from "@/components/Form2";
import {prisma} from "@/lib/prisma";
import { editCategory } from "@/lib/actions";

export const dynamic = "force-dynamic";

async function page({ searchParams }) {
  let category = null;

  try {
    category = await prisma.category.findUnique({
      where: {
        id: Number(searchParams.id),
      },
    });
  } catch (error) {
    console.error("Error al obtener la categoria:", error);
  }

  // Verificar si la categoria es null o undefined antes de usarlo
  if (!category) {
    return <div>categoria no encontrado</div>;
  }

  return (
<div className="flex justify-center items-center ">
  <div className="bg-white p-8 rounded-lg shadow-md text-blue-500 max-w-md w-full">
    <h3 className="text-2xl font-bold mb-4 text-center">Editar categoria {searchParams.id}</h3>
    <Form action={editCategory} title="Editar categoria" category={category} />
  </div>
</div>

  );
}

export default page;

