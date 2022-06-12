import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import { ThumbUpAltOutlined, ThumbUpAlt, Delete, MoreHoriz } from '@material-ui/icons/';
import moment from 'moment';

import { likePost, deletePost } from '../../../redux/actions/posts.actions';

import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const userInfo = useSelector((state) => state.auth.authData?.result);
  
  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (userInfo?.googleId || userInfo?._id))
        ? (
          <><ThumbUpAlt fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>

      {(userInfo?.googleId === post?.name || userInfo?.name === post?.name) && (
        <div className={classes.overlay2}>
          <Button onClick={() => setCurrentId(post._id)} style={{ color: 'white' }} size="small">
            <MoreHoriz fontSize="default" />
          </Button>
        </div>
        )}

      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!userInfo} onClick={() => dispatch(likePost(post._id))}>
          <Likes />
        </Button>
        {(userInfo?.googleId === post?.name || userInfo?.name === post?.name) && (
          <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
            <Delete fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
      <div className={classes.messageInfo}>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
        </CardContent>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
      </div>
    </Card>
  );
};

export default Post;