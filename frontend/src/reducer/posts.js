import _ from 'lodash'
import { FETCH_POSTS, FETCH_CATEGORY_POSTS, CREATE_POST, FETCH_POST, EDIT_POST, VOTE_POST, DELETE_POST} from '../actions';

const posts = (state = {}, action) => {
    switch (action.type) {
        case FETCH_POSTS:
        case FETCH_CATEGORY_POSTS:
            return _.mapKeys(action.payload, 'id')
        case CREATE_POST:
        case FETCH_POST:
        case EDIT_POST:
        case VOTE_POST:
        	return {
                ...state,
                [action.payload.id]: action.payload
            }
        case DELETE_POST:
            return _.omit(state, action.payload)
        
        default:
            return state;
    }
}

export default posts;