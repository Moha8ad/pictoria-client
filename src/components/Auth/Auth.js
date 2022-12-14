import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { GoogleLogin, GoogleLogout } from 'react-google-login';

import { account, signin, signup } from '../../redux/actions/auth.action';

import Input from './Input';

import Icon from './Icon';

import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { LockOutlined, } from '@material-ui/icons';

import useStyles from './styles';

const Auth = () => {
  const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [ showPassword, setShowPassword ] = useState(false);
  const [ isSignup, setIsSignup ] = useState(false);
  const [ form, setForm ] = useState(initialState)

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password === form.confirmPassword) {

      if (isSignup) {
        dispatch(signup(form, navigateTo));
      } else {
        dispatch(signin(form, navigateTo));
      }
    } else {
      alert('passwords are not the same!')
    }
  }

  const handleChange = (e) => {
    setForm({ 
      ...form, 
      [e.target.name]: e.target.value 
    })
  };

  const handleShowPassword = () => setShowPassword(!showPassword)

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  }

  const clientId = process.env.REACT_APP_CLIENT_ID

  const onGoogleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId; 

    try {
        dispatch(account({result, token}))
        navigateTo("/");
      } catch(error) {
      console.log(error)
    }
  }

  const onGoogleFailure = (error) => {
      console.log('log in failed, error: ', error)
  }
  
  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant='h5'>
          {isSignup ? 'Sign up' : 'Sign in'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
              <>
                <Input 
                  name='firstName' 
                  label="First Name" 
                  handleChange={handleChange} 
                  autoFocus 
                  half 
                />
                <Input 
                  name='lastName'  
                  label="Last Name"  
                  handleChange={handleChange} 
                  half 
                />
              </>
            )}
            <Input 
              name='email' 
              label='Email Address' 
              type='email' 
              handleChange={handleChange}
            />
            <Input 
              name='password' 
              label='Password' 
              type={showPassword ? 'text' : 'password'} 
              handleShowPassword={handleShowPassword} 
              handleChange={handleChange}
            />
            {isSignup && 
              <Input 
                name='confirmPassword' 
                label='Repeat Password' 
                type='password' 
                handleChange={handleChange} 
              />
            }
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit} >
              {isSignup ? 'Sign up' : 'Sign in'} 
          </Button>
            <GoogleLogin 
              clientId={clientId}
              render={(renderProps) => (
                <Button 
                  className={classes.googleButton}
                  color='primary' 
                  fullWidth 
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant='contained'
                 >
                  Google Sign in 
                </Button>
              )}
              onSuccess={onGoogleSuccess}
              onFailure={onGoogleFailure}
              cookiePolicy='single_host_origin'
            />
          
          
          <Grid container justifyContent='flex-end'>
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"} 
                </Button>
              </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth;