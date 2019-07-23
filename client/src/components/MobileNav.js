import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

export class MobileNav extends Component {

    toggleNav = () => {
        if(this.props.show === true) return {width: "100%"}

        return {width: "0%"}
    }

    login = (e) => {
        e.preventDefault();
        this.props.toggleLogin()
        this.props.click()
    }

   logout = (e) => {
       e.preventDefault();
       this.props.logout()
   }

    render() {
        return (
            <nav className="mobile-nav" style={this.toggleNav()}>
                <h2>Menu</h2>
                <button className="menu-close-btn" onClick={this.props.click}>X</button>
                <ul className="mobile-nav-list">
                    <li><NavLink exact to="/" activeClassName="active" onClick={this.props.click}>Home</NavLink></li>
                    <li><NavLink to="/about" activeClassName="active" onClick={this.props.click}>About</NavLink></li>
                    {!this.props.loggedIn ? [
                        <li key={0}><a href="!#" onClick={this.login} >Log In</a></li>,
                        <li key={1}><NavLink to="/signup" activeClassName="active" onClick={this.props.click}>Sign Up</NavLink></li>
                    ] 
                    : 
                    (<li><a href="!#" onClick={this.logout} >Log Out</a></li>)}
                </ul>
            </nav>
        )
    }
}

export default MobileNav
