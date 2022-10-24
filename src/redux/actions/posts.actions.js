import PostActionTypes from '../constants/posts.types.js';

import * as api from '../../api/index.js';

export const currentPage = pageNumber => ({
  type: PostActionTypes.CURRENT_PAGE, 
  payload: pageNumber
})

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({ 
      type: PostActionTypes.FETCH_ALL, 
      payload: data 
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ 
        type: PostActionTypes.CREATE, 
        payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ 
        type: PostActionTypes.UPDATE, 
        payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ 
        type: PostActionTypes.LIKE, 
        payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ 
        type: PostActionTypes.DELETE, 
        payload: id });
  } catch (error) {
    console.log(error.message);
  }
};