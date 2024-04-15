
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
                {/* <label htmlFor='created'>created</label>
                <input type='text' id='created' name='created' min='0' step={0.01}
                    placeholder='created'
                    defaultValue={post?.created} />
                <label htmlFor='modified'>modified</label>
                <input type='text' id='modified' name='modified' min='0' step={0.01}
                    placeholder='modified'
                    defaultValue={post?.modified} />
                <label htmlFor='is_draft'>is_draft</label>
                <input type='text' id='is_draft' name='is_draft' min='0' step={0.01}
                    placeholder='is_draft'
                    defaultValue={post?.is_draft} /> */}
                    <label htmlFor='slug'>slug</label>
                <input type='text' id='slug' name='slug' min='0' step={0.01}
                    placeholder='slug'
                    defaultValue={post?.slug} />
                    <label htmlFor='views'>views</label>
                <input type='Integer' id='views' name='views' min='0' step={0.01}
                    placeholder='views'
                    defaultValue={post?.views} />
            </fieldset>
            <button type='submit'>{title}</button>
        </form>
    )
}

export default Form