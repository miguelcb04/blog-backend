import { Suspense } from 'react'
import ListaCategory from './ListaCategory';
import TipTap from './TipTap';

function Form({ children, action, title, post, disabled }) {

  return (
    <>
      <form action={action} className="w-full max-w-full">
        <input type='hidden' name='id' value={post?.id} />
        <fieldset disabled={disabled} className="space-y-4">
          <div className="flex items-center space-x-4">
            <label htmlFor='author' className="w-1/4">Author</label>
            <input type='text' id='author' name='author'
              placeholder='Author'
              defaultValue={post?.author}
              className="w-3/4 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100"
              autoFocus
            />
          </div>
          <div className="flex items-center space-x-4">
            <label htmlFor='title' className="w-1/4">Title</label>
            <input type='text' id='title' name='title'
              placeholder='Title'
              defaultValue={post?.title}
              className="w-3/4 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100"
            />
          </div>
          {/* Agrega el resto de los campos con el mismo estilo */}
          <div className="flex items-center space-x-4">
            <label htmlFor='image' className="w-1/4">Image</label>
            <input type='text' id='image' name='image'
              placeholder='Image'
              defaultValue={post?.image}
              className="w-3/4 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100"
            />
          </div>
          <label htmlFor='post'>Post<br></br></label>
          <TipTap contenido={post?.post} />

          {children}
          <label htmlFor='slug'>Slug</label>
          <input type='text' id='slug' name='slug'
            placeholder='Slug'
            defaultValue={post?.slug}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100"
          />
          <label htmlFor='views'>Views</label>
          <input
            type='number'
            id='views'
            name='views'
            min='0'
            placeholder='Views'
            defaultValue={post?.views}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100"
            disabled
          />

          <Suspense fallback={'Loading ...'}>
            <ListaCategory postId={post?.id} disabled={disabled} />
          </Suspense>
        </fieldset>
        <button type='submit' className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-4">{title}</button>
      </form>

    </>


  )
}

export default Form