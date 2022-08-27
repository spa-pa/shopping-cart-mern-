import React, { Component } from 'react'
import { connect } from 'react-redux'
import { usersignup } from "../ReduxComponent/Actions/AuthAction"
import { withRouter } from '../RouteComponent/WithRoute'
import store from '../ReduxComponent/store'
import { Link } from "react-router-dom";


import './AuthComponent.css'



class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            res:""

        };
    }
    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    submitData=(event)=>{
        event.preventDefault()
        if ( this.state.email=== "" || this.state.password === "" || this.state.email=== " " || this.state.password === " ") {
            this.setState({res:"Field should not be blank"})
        }
        else{
            const data = {
                email: this.state.email,
                password: this.state.password,
            }
            this.props.usersignup(data)
    
        store.subscribe(() => {
            
    
            var loggedInStatus = store.getState().user.user
         
            if (loggedInStatus==="Successfully registered !") {
    
                this.props.navigate('/signin')
    
            } else  {
                this.setState({res:"Check username or password"})
                
    
            } 
    
        });
        }
       
       
    }
    
    render() {
        return (

            <div className='Lbody'>
                <div className="Lcontainer" id="Lcontainer">

                    <div className="Lform-container Lsign-in-container">
                        <form className='Lform' onSubmit={this.submitData}>
                            <h1 className='Lh1'>Sign Up</h1>


                            <input className='Linput' type="email" placeholder="Email" name="email" onChange={this.handleInput} />
                            <input className='Linput' type="password" placeholder="Password" name="password" onChange={this.handleInput} />

                            <button className='Lbutton'>Sign Up</button>

                            {
                                this.state.res==="" ?
                                <h4></h4>
                                :
                                <h4 style={{ color: "red" }}>{this.state.res}</h4>
                            }
                        </form>
                    </div>
                    <div className="Loverlay-container">
                        <div className="Loverlay">
                            <div className="Loverlay-panel Loverlay-left">
                                {/* <h1 className='Lh1'>Welcome Back!</h1> */}
                                {/* <p className='Lp'>To keep connected with us please login with your personal info</p> */}
                                {/* <button className="Lghost" id="signIn">Sign In</button> */}
                            </div>
                            <div className="Loverlay-panel Loverlay-right">
                                <h1 className='Lh1'>Hello, Friend!</h1>
                                <p className='Lp'>Welcome to ShopCart</p>
                                <Link to="/signin"><button className="Lghost Lbutton" id="signIn">Sign In</button></Link> 
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        )
    }
}

export default withRouter(connect((state) => ({
    user: state.user
}), { usersignup })(SignUp))

