import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { SignIn } from './signin';
import Home from './home';
import Wishlist from './wishlist';




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