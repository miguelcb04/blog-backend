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

    return (
        <fieldset disabled={disabled}>
            <legend><h1>Categorias</h1></legend>
            {categorys.map((category) => {
                const idCat = `cat${category.id}`;
                return (
                    <div key={category.id}>
                        <label htmlFor={idCat}>
                            <input type='checkbox' id={idCat} name={category.id.toString()} value={category.id} 
                                defaultChecked={selectedCategorys.includes(category.id)} />
                            {category.name}
                        </label>
                    </div>
                );
            })}
        </fieldset>
    );
}

export default ListaCategory;

