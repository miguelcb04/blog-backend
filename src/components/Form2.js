
function Form({ action, title, category, disabled }) {

    return (
        <form action={action} >
            <input type='hidden' name='id' value={category?.id} />
            <fieldset disabled={disabled}>
                <label htmlFor='name'>name</label>
                <input type='text' id='name' name='name'
                    placeholder='name'
                    defaultValue={category?.name} autoFocus ></input>
                <label htmlFor='slug'>slug</label>
                <input type='text' id='slug' name='slug'
                    placeholder='slug'
                    defaultValue={category?.slug} />
            </fieldset>
            <button type='submit'>{title}</button>
        </form>
    )
}

export default Form