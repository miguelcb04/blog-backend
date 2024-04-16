import Form from "@/components/Form2"
import { newCategory } from "@/lib/actions"

function page() {
  return (
    <div>
        <h3>Nueva categoria</h3>
        <Form action={newCategory} title='Crear categoria' category={null}  />
    </div>
  )
}

export default page