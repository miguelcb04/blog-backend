
function layoutPost({ children }) {
    return (
<div className="flex justify-center items-center mt-16">
  <section className="text-center">
    <h1 className="text-3xl font-bold mb-4">Categorias</h1>
    <div class=" bg-gray-200 p-6 rounded-lg shadow-md">
    {children}
    </div>
  </section>
</div>



    )
}

export default layoutPost