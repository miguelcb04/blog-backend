

function category({ children, category }) {
    return (
        <div style={{ 'border': '1px solid black', 'padding': '50px' }}>
            <p><strong>{category.name}</strong></p>
            <p><strong>{category.slug}</strong></p>
            {/* <p dangerouslySetInnerHTML={{__html: category.category}}/> */}
            
            {children}
        </div>
    )
}

export default category