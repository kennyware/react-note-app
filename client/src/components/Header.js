import React, { Component } from 'react'
import Navbar from './Navbar';

export class Header extends Component {

    // toggleLogin = () => {
    //     this.props.toggleLogin()
    // }

    click = () => {
        this.setState((state, props) => ({click: !state.click}))
    }
    
    render() {
        return (
            <header className="header">
                <h1>Note8</h1>
                <Navbar loggedIn={this.props.loggedIn} toggleLogin={this.props.toggleLogin} logout={this.props.logout} />
            </header>
        )
    }
}

export default Header
