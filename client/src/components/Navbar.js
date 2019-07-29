import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

export class Navbar extends Component {

   logout = () => {
       this.props.logout()
   }

    render() {
        return (
            <nav className="nav">
                <ul className="nav-list">
                    <li><NavLink exact to="/">Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    {!this.props.loggedIn ? [
                        <li key={0}><NavLink to="/login">Log In</NavLink></li>,
                        <li key={1}><NavLink to="/signup">Sign Up</NavLink></li>
                    ] 
                    : 
                    (<li><NavLink to="/" activeClassName="" onClick={this.logout}>Log Out</NavLink></li>)}
                </ul>
            </nav>
        )
    }
}

export default Navbar