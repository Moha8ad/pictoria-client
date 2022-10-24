import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { getPosts } from '../../redux/actions/posts.actions';

import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import PaginationBox  from '../Pagination/Pagination';

import { Container, Grow, Grid, Paper, AppBar, TextField } from '@material-ui/core';
import useStyles from './styles';

const useQuery = () => {
  return new URLSearchParams(useLocation().search )
}

const Home = () => {
  
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const query = useQuery(); 
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const [searchInput, setSearchInput] =  useState('');

  const totalPosts = useSelector((state) => state.postsDB.posts).length
  const [postsPerPage] = useState(1);
  const currNumOfPages = totalPosts/postsPerPage;
  const mathCurrNumOfPage = Math.floor(currNumOfPages)
 
  const numberOfPages =  currNumOfPages > mathCurrNumOfPage ? mathCurrNumOfPage + 1 : currNumOfPages

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch, currentId]);


   return (
    <Grow in>
      <Container>
        <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}  >
          <Grid item xs={12} sm={6} md={8}>
            <Posts setCurrentId={setCurrentId} searchInput={searchInput} postsPerPage={postsPerPage}/>
          </Grid>
          <Grid item xs={12} sm={6} md={4}> 
            <AppBar className={classes.appBarSearch} position='static' color='inherit' >
              <TextField 
                name='search'
                label='Search Posts, Messages, Tags'
                variant='outlined'
                fullWidth
                value={searchInput}
                onChange={(e)=>{setSearchInput(e.target.value)}}
              />
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} numberOfPages={numberOfPages} postsPerPage={postsPerPage}/>
            <Paper className={classes.pagination} elevation={6} >
              <PaginationBox numberOfPages={numberOfPages} /> 
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
};

export default Home;