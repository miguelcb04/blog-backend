import Form from "@/components/Form"
import { newPost } from "@/lib/actions"

function page() {
  return (
    <div>
        <h3 className="font-bold text-center">Nuevo post</h3>
        <Form action={newPost} title='Crear post' post={null}  />
    </div>
  )
}

export default page