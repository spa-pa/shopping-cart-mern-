import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import Login from '../AuthComponet/Login';
import SignUp from '../AuthComponet/SignUp';

const PublicRoute = () => {
  
  return (
    <Routes>
     <Route path='/' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/signin' element={<Login />}></Route>
    </Routes>
  )
}

export default PublicRoute;