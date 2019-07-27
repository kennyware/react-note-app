import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

export class Navbar extends Component {

   logout = (e) => {
       e.preventDefault();
       this.props.logout()
   }

    render() {
        return (
            <nav className="nav">
                <ul className="nav-list">
                    <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
                    <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
                    {!this.props.loggedIn ? [
                        <li key={0}><NavLink to="/login" activeClassName="active">Log In</NavLink></li>,
                        <li key={1}><NavLink to="/signup" activeClassName="active">Sign Up</NavLink></li>
                    ] 
                    : 
                    (<li><a href="!#" onClick={this.logout} >Log Out</a></li>)}
                </ul>
            </nav>
        )
    }
}

export default Navbar