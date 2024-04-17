import { getPosts, getCategorys } from '@/lib/actions';

function ListaCategory({ postId, disabled }) {
    // Variables para almacenar la categoría seleccionada y las categorías
    let selectedCategoryId = null;
    let categorys = [];

    // Función para obtener las categorías
    const fetchCategorys = async () => {
        categorys = await getCategorys();
    };

    // Función para obtener el post y su categoría asociada
    const fetchPostAndCategory = async () => {
        if (postId) {
            const post = await getPosts(postId);
            selectedCategoryId = post.categoryId;
        }
    };

    // Ejecutar la lógica de carga de datos solo en el cliente
    if (typeof window !== 'undefined') {
        fetchCategorys();
        fetchPostAndCategory();
    }

    console.log("hola");

    return (
        <option disabled={disabled}>
            <legend>Categorias</legend>
            {categorys.map((category) => (
                <div key={category.id}>
                    <p>
                        <input
                            type='radio'
                            name='categoryId'
                            value={category.id}
                            checked={selectedCategoryId === category.id}
                            onChange={() => { }}
                        />
                        {category.name}
                    </p>
                </div>
            ))}
        </option>
    );
}

export default ListaCategory;
