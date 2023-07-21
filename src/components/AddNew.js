const AddNew = ({handleBlogPost, setTitle, setAuthor, setUrl, author, title, url}) => {
    return (
    <div>
    <h2>Create new blog link</h2>
    <form onSubmit={handleBlogPost}>
			title: <input type='text' name='title' value={title} onChange={({target}) => {setTitle(target.value)}}/><br />
			author: <input type='text' name='author' value={author} onChange={({target}) => {setAuthor(target.value)}}/><br/>
			url: <input type='text' name='url' value={url} onChange={({target}) => {setUrl(target.value)}}/><br />
			<button type='submit'>Submit</button>
    </form>
    </div>
    )
}

export default AddNew