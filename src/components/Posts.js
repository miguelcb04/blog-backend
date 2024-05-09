

function post({ children, post }) {
    return (
        <div style={{ 'border': '1px solid black', 'padding': '50px' }}>
            <p><strong>{post.author}</strong></p>
            <p><strong>{post.title}</strong></p>
            <p><strong>{new Date(post.created).toLocaleString()}</strong></p>
            {/* <p dangerouslySetInnerHTML={{__html: post.post}}/> */}
            
            {children}
        </div>
    )
}

export default post