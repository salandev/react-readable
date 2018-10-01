import React from 'react'
import { Link } from 'react-router-dom'

const PostHeader = () => {
    return (
        <div className="text-right">
	        <Link className="btn btn-primary" to="/posts/new">
	          Create A New Post
	        </Link> 
        </div>
    ) 
}

export default PostHeader