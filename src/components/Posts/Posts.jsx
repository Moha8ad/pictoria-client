import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';

import Post from './Post/Post';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { currentPage } from '../../redux/actions/posts.actions';

const Posts = ({ setCurrentId, searchInput, postsPerPage }) => {

  const dispatch = useDispatch();

  const currPage = useSelector((state) => state.postsDB.currentPage);
 
  const pageNumber = parseFloat(useLocation().search.split(/[?page=]+/ig).join(''))

  useEffect(() => {

    dispatch(currentPage(pageNumber))
    
  }, [dispatch, pageNumber])
  
  const posts = useSelector((state) => state.postsDB.posts);
  
  const indexOfLastPost = currPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  const searchPosts = currentPosts.filter(post => 
    post.title.toLowerCase().includes(searchInput.toLowerCase( )) || 
    post.message.toLowerCase().includes(searchInput.toLowerCase( )) || 
    post.tags.join(',').toLowerCase().includes(searchInput.toLowerCase( ))
  )

  return (
    !posts?.length ?
    <CircularProgress /> 
    :
    <Grid container alignItems="stretch" spacing={3}>
    { !searchPosts?.length ? 
      <h3 style={{color:'white'}}>'NO RESULT'</h3>
      :
      searchPosts.map(post =>
        <Grid key={post._id} item xs={12} sm={6} md={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>  
      )}
    </Grid>
  );
};

export default Posts;