import axios from 'axios'
import uuid from 'uuid/v4'
import { api, headers, hasWithCredentials } from '../utils/config'

axios.defaults.headers.common['Authorization'] = headers
axios.defaults.withCredentials = hasWithCredentials

export const POST_SORT_ORDER = 'POST_SORT_ORDER'
export const CURRENT_CATEGORY = 'CURRENT_CATEGORY'
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const FETCH_CATEGORY_POSTS = 'FETCH_CATEGORY_POSTS'
export const FETCH_POSTS = 'FETCH_POSTS'
export const CREATE_POST = 'CREATE_POST'
export const FETCH_POST = 'FETCH_POST'
export const VOTE_POST = 'VOTE_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const FETCH_COMMENTS_BY_POSTID = 'FETCH_COMMENTS_BY_POSTID'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const EDIT_COMMENT_POST = 'EDIT_COMMENT_POST'
export const DELETE_COMMENT_POST = 'DELETE_COMMENT_POST'
export const VOTE_COMMENT = 'VOTE_COMMENT'

const showError = (error) => console.log('Failed: ' , error.statusText)

// ---------------------- Filtering ------------------------- 

// Sorting posts
export function postSortOrder(sortType) {
    return {
        type: POST_SORT_ORDER,
        payload: sortType
    };
}

// Set Current category name
export function setCurrentCategory(data) {
    return {
        type: CURRENT_CATEGORY,
        payload: data
    };
}

// ----------------------- categories ------------------------

// GET /categories
const fetchCats = data => {
    return {
        type: FETCH_CATEGORIES,
        payload: data
    };
}
export const fetchCategories = () => {
    return dispatch => { // thunk returns a function
        axios.get(`${api}/categories`)
        .then(res => dispatch(fetchCats(res.data))) // returns everything
        .catch( error => showError(error));
    }
}

// GET /:category/posts
const fetchCatPosts = data => {
    return {
        type: FETCH_CATEGORY_POSTS,
        payload: data
    };
}

export const fetchCategoryPosts = categoryName => {
    return dispatch => {
        axios.get(categoryName === 'all' ? `${api}/posts` : `${api}/${categoryName}/posts`)
        .then(res => dispatch(fetchCatPosts(res.data))) 
        .catch( error => showError(error));
    }
}

// ----------------------- Posts ------------------------

// GET /posts
const getPosts = data => {
    return {
        type: FETCH_POSTS,
        payload: data
    };
}
export const fetchPosts = () => { 
    return dispatch => {
        axios.get(`${api}/posts`)
        .then(res => dispatch(getPosts(res.data)))
        .catch( error => showError(error))
    }
}

// Saving - POST /posts
const savePost = data => {
    return {
        type: CREATE_POST,
        payload: data
    };
}

export const createPost = (post, cb) => {
    return dispatch => {
        axios.post(`${api}/posts`, {
            id: uuid(),
            timestamp: Date.now(),
            ...post
        })
        .then(res => {
            dispatch(savePost(res.data))
          	cb()
        })
        .catch( error => showError(error))
    }
}

// GET /posts/:id
const getPostById = data => {
    return {
        type: FETCH_POST,
        payload: data
    };
}

export const fetchPost = id => {  
    return dispatch => {
        axios.get(`${api}/posts/${id}`)
        .then(res => dispatch(getPostById(res.data)))
    }
}

// voting -  POST /posts/:id
const getVote = data => {
    return {
        type: VOTE_POST,
        payload: data
    };
}

export const votePostUpDown = (id, vote) => {
    return dispatch => {
        axios.post(`${api}/posts/${id}`, { 
            option: vote 
        })
        .then(res => dispatch(getVote(res.data)))
        .catch( error => showError(error))
    }
}

// Editing - PUT /posts/:id
const modifyPost = data => {
    return {
        type: EDIT_POST,
        payload: data
    };
}
export const editPost = (id, values, cb) => {
    return dispatch => {
        axios.put(`${api}/posts/${id}`, values)
        .then(res => {
            dispatch(modifyPost(res.data))
            cb()
        })
        .catch( error => showError(error))
    }
}

// DELETE /posts/:id
const removePost = (id) => {
    return {
        type: DELETE_POST,
        payload: id
    };
}

export const deletePost = (id, cb) => {
    return dispatch => {
        axios.delete(`${api}/posts/${id}`)
        .then(res => {
            dispatch(removePost(id))
          	cb()
        })       
    }
}

// ----------------------- Comments ------------------------

// GET /posts/:id/comments
const getCommentsByPostId = data => {
    return {
        type: FETCH_COMMENTS_BY_POSTID,
        payload: data
    };
}

export const fetchCommentsByPostId = id => {  
    return dispatch => {
        axios.get(`${api}/posts/${id}/comments`)
        .then(res => dispatch(getCommentsByPostId(res.data)))
    }
}

// Save Comment /comments
const saveComment = data => {
    return {
        type: CREATE_COMMENT,
        payload: data
    };
}

export const addPostComment = (comment, parentId) => {
    return dispatch => {
        axios.post(`${api}/comments`, {
            id: uuid(),
            timestamp: Date.now(),
            parentId,
            ...comment
        })
        .then(res => dispatch(saveComment(res.data)))
        .catch( error => showError(error))
    }
}

// Voting - POST /comments/:id
const getCommentVote = data => {
    return {
        type: VOTE_COMMENT,
        payload: data
    };
}

export function voteForComment(id, vote) {
    return dispatch => {
        axios.post(`${api}/comments/${id}`, { 
            option: vote 
        })
        .then(res => dispatch(getCommentVote(res.data)))
        .catch( error => showError(error))
    }
}

// PUT /comments/:id
const modifyComment = data => {
    return {
        type: EDIT_COMMENT_POST,
        payload: data
    };
}

export function editPostComment(values, cb) {
    const commentId = values.id
    return dispatch => {
        axios.put(`${api}/comments/${commentId}`, {
            ...values
        })
        .then(res => {
            dispatch(modifyComment(res.data))
            cb()
        });
    }
}

// DELETE /comments/:id
const removeComment = (id) => {
    return {
        type: DELETE_COMMENT_POST,
        payload: id
    };
}

export function deleteComment(id, cb) {
     return dispatch => {
        axios.delete(`${api}/comments/${id}`)
        .then(res => {
            dispatch(removeComment(id))
            cb()
        });        
    }
}