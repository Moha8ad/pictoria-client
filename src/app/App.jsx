import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; 

import Home from '../components/Home/Home';
import PostDetails from '../components/PostDetails/PostDetails';
import Navbar from '../components/Navbar/Navbar';
import Auth from '../components/Auth/Auth';
import Profile from '../components/Profile/Profile';

import { Container } from '@material-ui/core';

import './styles.css';
import { useSelector } from 'react-redux';

const App = () => {

  const user = useSelector(state => state.auth.authData.result)

  return (
    <Container maxWidth="xl">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Navigate replace to="/posts" />}></Route>
        <Route path="/posts" exact element={<Home />}></Route>
        <Route path="/posts/search" exact element={<Home />}></Route>
        <Route path="/posts/:id" exact element={<PostDetails />}></Route>
        <Route path="/auth" exact element={!user ? <Auth /> : <Navigate replace to="/posts" />}></Route>
        <Route path="/profile" exact element={<Profile />}></Route>
      </Routes>
    </Container>
  ); 
};

export default App;