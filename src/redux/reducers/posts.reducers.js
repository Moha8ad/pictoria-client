import PostActionTypes from "../constants/posts.types";

const INITIAL_STATE = {
  currentPage: 1,
  posts: []
}

export const postsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PostActionTypes.CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      }
    case PostActionTypes.FETCH_ALL:
      return {
        ...state,
        posts: action.payload
      }
    case PostActionTypes.LIKE:
      return {
        ...state,
        posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))
      }
    case PostActionTypes.CREATE:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      }
    case PostActionTypes.UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))
      }
    case PostActionTypes.DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload)
      }
    default:
      return state;
  }
};

export default postsReducer;