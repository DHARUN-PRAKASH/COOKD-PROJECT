import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

import Home from './home';
import Wishlist from './wishlist';
import { SignIn } from './signin';
import SignUp from './signup';






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  sessionStorage.getItem('logged')
  ?
    <>
    <BrowserRouter>
        <Routes>
          <Route  path='/' Component={SignIn}/>
          <Route path='/home'  Component={Home}/>
          <Route path='/wishlist'  Component={Wishlist}/>
          <Route path='/signup'  Component={SignUp}/>

        </Routes>
    </BrowserRouter>
    </>
    :
    <>
     <BrowserRouter>
        <Routes>
          <Route  path='/' Component={SignIn}/>
        </Routes>
    </BrowserRouter>
    </>
  

);