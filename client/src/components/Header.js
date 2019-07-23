import React, { Component } from 'react'
import Navbar from './Navbar';
import MobileNav from './MobileNav'

export class Header extends Component {

    state = {
        showNav: false
    }

    click = () => {
        this.setState((state) => ({showNav: !state.showNav}))
    }
    
    render() {
        return (
            <header className="header">
                <h1>Note8</h1>
                <Navbar loggedIn={this.props.loggedIn} toggleLogin={this.props.toggleLogin} logout={this.props.logout} />
                <MobileNav loggedIn={this.props.loggedIn} toggleLogin={this.props.toggleLogin} logout={this.props.logout} show={this.state.showNav} click={this.click} />
                <button className="menu-btn" onClick={this.click}>
                    <svg height="15" width="20">
                        <g stroke="black" stroke-wdith="4">
                            <line x1="0" y1="1" x2="800" y2="1"/>
                            <line x1="0" y1="6" x2="800" y2="6"/>
                            <line x1="0" y1="11" x2="800" y2="11"/>
                        </g>
                        Sorry, your browser does not support inline SVG.
                    </svg>
                </button>
            </header>
        )
    }
}

export default Header
