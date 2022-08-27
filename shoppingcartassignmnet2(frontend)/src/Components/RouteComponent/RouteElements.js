
import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom'

import Login from '../AuthComponet/Login'
import SignUp from '../AuthComponet/SignUp'
import Main from '../StructureComponent/Main'





export default class RouteElements extends Component {
constructor(props){
  super(props)
  this.state={
    isLogin:localStorage.getItem("token")
  }
}
componentDidMount=()=>{
 
}

  render() {

   

    return (
      <div>
        <Routes>
          {/* {
            localStorage.getItem("token") ?
              <Route path='/' element={<Main />}></Route> :
              <Route path='/' element={<Login />}></Route>

          } */}
           {/* {
            !localStorage.getItem("token") ?
            <Route path='/dashbord' element={<Login />}></Route>
              :
              <Route path='/dashbord' element={<Main />}></Route>

          }  */}
          <Route path='/' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/signin' element={<Login />}></Route>
          {localStorage.getItem("token") ? <Route path='/dashbord' element={<Main />}></Route>
          :<Route path='/dashbord' element={<Login />}></Route>
          }
          
         
        </Routes>
        

      </div>
    )
  }
}
