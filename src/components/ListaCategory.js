import { getPost, getCategorys } from '@/lib/actions';

async function ListaCategory({ postId, disabled }) {

    // Variables para almacenar la categoría seleccionada y las categorías
    const categorys = await getCategorys();
   
    let post = null;
    let selectedCategorys =[];

    if (postId) {
        post = await getPost(postId)
        selectedCategorys = post.categories.map(cat => cat.id);
    }
  console.log("select categorias" ,selectedCategorys)

    console.log("categorias " , categorys);
    return (
        <fieldset disabled={disabled}>
            <legend><h1>Categorias</h1></legend>
            {categorys.map((category) => (
                <div key={category.id}>
                    <p>
                    {selectedCategorys.includes(category.id) 
                    ? <input type='checkbox' name={category.id}  value={category.id} defaultChecked />
                    : <input type='checkbox' name={category.id}  value={category.id} /> }
                    {category.name}
                    </p>
                </div>
            ))}
        </fieldset>
    );
}

export default ListaCategory;
