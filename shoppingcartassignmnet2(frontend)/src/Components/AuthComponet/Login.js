import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { userLogin } from "../ReduxComponent/Actions/AuthAction"
import store from '../ReduxComponent/store';
import { withRouter } from '../RouteComponent/WithRoute';
// import { withRouter } from "react-router"
import './AuthComponent.css'




class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            res: ""

        };
    }
    submitData = (event) => {
        event.preventDefault()
        if (this.state.email === "" || this.state.password === "" || this.state.email === " " || this.state.password === " ") {
            this.setState({ res: "Field should not be blank" })
        } else {

            const data = {
                email: this.state.email,
                password: this.state.password,
            }
            this.props.userLogin(data)
            store.subscribe(() => {
                const isToken = localStorage.getItem("token")
                
                if (isToken) {
                    
                    this.props.navigate("/dashbord")
                }
            });

        }
    }
    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {

        return (

            <div className='Lbody'>
                <div className="Lcontainer" id="Lcontainer">

                    <div className="Lform-container Lsign-in-container">
                        <form className='Lform' onSubmit={this.submitData}>
                            <h1 className='Lh1'>Sign in</h1>


                            <input className='Linput' type="email" placeholder="Email" name="email" onChange={this.handleInput} />
                            <input className='Linput' type="password" placeholder="Password" name="password" onChange={this.handleInput} />

                            {/* <Link to="/dashbord"><button className='Lbutton'>Sign In</button></Link> */}
                            <button className='Lbutton'>Sign In</button>
                            {
                                this.props.user.user !== " " ?
                                    this.props.user.user === "Success Login !" ?
                                        <h4 style={{ color: "green" }}></h4> :
                                        this.props.user.user === "Successfully registered !" ?
                                            <h4 style={{ color: "green" }}></h4> :
                                            <h4 style={{ color: "red" }}>{this.props.user.user}</h4> :
                                    <h4></h4>
                            }
                            {
                                this.state.res === "" ?
                                    <h4></h4>
                                    :
                                    <h4 style={{ color: "red" }}>{this.state.res}</h4>
                            }
                        </form>
                    </div>
                    <div className="Loverlay-container">
                        <div className="Loverlay">
                            <div className="Loverlay-panel Loverlay-left">
                                <h1 className='Lh1'>Welcome Back!</h1>
                                <p className='Lp'>To keep connected with us please login with your personal info</p>
                                <button className="Lghost" id="signIn">Sign In</button>
                            </div>
                            <div className="Loverlay-panel Loverlay-right">
                                <h1 className='Lh1'>Hello, Friend!</h1>
                                <p className='Lp'>Enter your personal details and start journey with us</p>
                                <Link to="/signup"><button className="Lghost Lbutton" id="signUp">Sign Up</button></Link>
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
}), { userLogin })(Login))