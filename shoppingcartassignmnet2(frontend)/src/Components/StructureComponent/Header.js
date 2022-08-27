import React, { Component } from 'react'
import { withRouter } from '../RouteComponent/WithRoute'
import './Structure.css'

class Header extends Component {
  logout=()=>{
    localStorage.removeItem("token")
    this.props.navigate('/signin')
  }
  render() {
    return (
      <div className='header'>
      <a href="/">Shoping Cart</a>
      
      <button onClick={this.logout} style={{"position": "absolute","right": "5px"}}>Logout</button>
      
      </div>
    )
  }
}

export default withRouter(Header)