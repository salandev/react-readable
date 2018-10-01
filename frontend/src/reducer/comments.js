import _ from 'lodash';
import  { FETCH_COMMENTS_BY_POSTID, CREATE_COMMENT, EDIT_COMMENT_POST, DELETE_COMMENT_POST, VOTE_COMMENT } from '../actions';

const comments = (state = {}, action) => {
    switch (action.type) {

        case FETCH_COMMENTS_BY_POSTID:
            return _.mapKeys(action.payload, 'id')
        
        case CREATE_COMMENT:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case EDIT_COMMENT_POST:
            return {
                ...state,
                [action.payload.id]: action.payload
            }

        case DELETE_COMMENT_POST:
            return _.omit(state, action.payload)
        
        case VOTE_COMMENT:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
            
        default:
            return state;
    }
}

export default comments