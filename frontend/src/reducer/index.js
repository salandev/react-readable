import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import categories from './categories'
import posts from './posts'
import comments from './comments'
import postfilter from './posts_filter'

const rootReducer = combineReducers({
  categories,
  posts,
  comments,
  postfilter,
  form: formReducer
})

export default rootReducer