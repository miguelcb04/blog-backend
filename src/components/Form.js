import { Suspense } from 'react'
import ListaCategory from './ListaCategory';

function Form({ action, title, post, disabled }) {

    return (
        <form action={action} >
            <input type='hidden' name='id' value={post?.id} />
            <fieldset disabled={disabled}>
                <label htmlFor='author'>author</label>
                <input type='text' id='author' name='author'
                    placeholder='author'
                    defaultValue={post?.author} autoFocus ></input>
                <label htmlFor='title'>title</label>
                <input type='text' id='title' name='title'
                    placeholder='title'
                    defaultValue={post?.title} />
                <label htmlFor='image'>image</label>
                <input type='text' id='image' name='image' min='0' step={0.01}
                    placeholder='image'
                    defaultValue={post?.image} />
                <label htmlFor='post'>post</label>
                <input type='text' id='post' name='post' min='0' step={0.01}
                    placeholder='post'
                    defaultValue={post?.post} />
                    <label htmlFor='slug'>slug</label>
                <input type='text' id='slug' name='slug' min='0' step={0.01}
                    placeholder='slug'
                    defaultValue={post?.slug} />
                    <label htmlFor='views'>views</label>
                <input type='number' id='views' name='views' min='0' step={0.01}
                    placeholder='views'
                    defaultValue={post?.views} />
                <Suspense fallback={'Loading ...'}>
                    <ListaCategory postId={post?.id} disabled={disabled} />
                </Suspense>
            </fieldset>
            <button type='submit'>{title}</button>
        </form>
    )
}

export default Form