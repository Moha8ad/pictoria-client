import axios from 'axios';

const API = axios.create({ baseURL: 'https://pictoria-server.onrender.com/' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

const postsUrl = '/posts/';

export const fetchPosts = () => API.get(postsUrl);
export const createPost = (newPost) => API.post(postsUrl, newPost);
export const likePost = (id) => API.patch(`${postsUrl}/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`${postsUrl}/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`${postsUrl}/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData );
export const signUp = (formData) => API.post('/user/signup', formData );
