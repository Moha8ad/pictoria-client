import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import decode from 'jwt-decode';

import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';

import { account } from '../../redux/actions/auth.action';

import useStyles from './styles';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const location = useLocation();
  const classes = useStyles();

  const user = useSelector(state => state.auth?.authData);
  
  const logout = () => { 
    dispatch(account({}))
    navigateTo('/');
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer} >
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Pictoria</Typography>
      </div>
      <Toolbar className={classes.toolbar} >
        {user?.result ? (
          <div className={classes.profile} >
            <Button className={classes.btn} component={Link} to="/profile" variant="outlined" color="primary">Profile</Button>
            <Button className={classes.btn} variant="outlined" color="secondary" onClick={logout}>Logout</Button>
            <div className={classes.userInfo} >
              <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
              <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            </div>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}

      </Toolbar>
    </AppBar>
  );
};
  
export default Navbar;