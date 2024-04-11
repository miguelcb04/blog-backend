

function post({ children, post }) {
    return (
        <div style={{ 'border': '1px solid lightgrey', 'padding': '50px' }}>
            <p><strong>{post.id}</strong></p>
            <p><strong>{post.author}</strong></p>
            <p><strong>{post.title}</strong></p>
            <p><strong>{post.image}</strong></p>
            <p><strong>{post.post}</strong></p>
            {children}
        </div>
    )
}

export default post