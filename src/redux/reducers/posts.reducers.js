import PostActionTypes from "../constants/posts.types";

export const postsReducer = (posts = [], action) => {
  switch (action.type) {
    case PostActionTypes.FETCH_ALL:
      return action.payload;
    case PostActionTypes.LIKE:
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    case PostActionTypes.CREATE:
      return [...posts, action.payload];
    case PostActionTypes.UPDATE:
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    case PostActionTypes.DELETE:
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};

export default postsReducer;