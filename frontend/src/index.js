import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

import Home from './home';
import Wishlist from './wishlist';
import { SignIn } from './signin';
import SignUp from './signup';






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  (sessionStorage.getItem('logged'))
  ?
    <>
    <BrowserRouter>
        <Routes>
        <Route exact path='/' Component={()=><Home/>}/>
        <Route exact path='/wishlist' Component={()=><Wishlist/>}/>
        <Route exact path='/signup' Component={()=><SignUp/>}/>
        </Routes>
    </BrowserRouter>
    </>
    :
    <SignIn/>
      
  

);