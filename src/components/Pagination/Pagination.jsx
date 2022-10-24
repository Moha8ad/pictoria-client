import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { Pagination, PaginationItem } from '@material-ui/lab';

import useStyles from './styles';
import { currentPage } from '../../redux/actions/posts.actions';

const PaginationBox = ({ numberOfPages }) => {
  
  const classes = useStyles();

  const dispatch = useDispatch();

  const currPage = useSelector((state) => state.postsDB.currentPage);
 
  const pageNumber = parseFloat(useLocation().search.split(/[?page=]+/ig).join(''))

  useEffect(() => {

    dispatch(currentPage(pageNumber))
    
  }, [dispatch, pageNumber])
  
  return (
    <Pagination 
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={currPage}
      variant='outlined'
      color='primary'
      renderItem={(item)=> (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`}/>
      )}
    /> 
  )
}

export default PaginationBox; 