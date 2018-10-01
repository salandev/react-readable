import  { POST_SORT_ORDER, CURRENT_CATEGORY } from '../actions';

const postfilter = (state = { sortBy: 'votesUp', category: 'all' }, action) => {
    switch (action.type) {
        
        case POST_SORT_ORDER:
            return {
                ...state,
                sortBy: action.payload
            }
        case CURRENT_CATEGORY:
            return {
                ...state,
                category: action.payload
            }
       
        default:
            return state
    }
}

export default postfilter