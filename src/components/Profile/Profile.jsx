import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';

import Post from '../Posts/Post/Post';

import useStyles from './styles';

const Profile = ({ setCurrentId }) => {
  const classes = useStyles();
  const posts = useSelector((state) => state.postsDB.posts);
  const userInfo = useSelector((state) => state?.auth?.authData?.result);

  console.log(userInfo)
  
  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.profileContainer} container alignItems="stretch" spacing={3}>
        {posts?.map((post) => (
          (userInfo?.googleId === post?.name || userInfo?.name === post?.name) && (
            <Grid key={post._id} item xs={12} sm={6} md={4}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          )))
        }
      </Grid>
    )
  );
};

export default Profile;