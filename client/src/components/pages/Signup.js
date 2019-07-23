import React, { Component } from 'react'
import Register from '../forms/Register';

export class Signup extends Component {

    relocate = () => {
        this.props.history.push('/')
    }
    
    render() {
        return (
            <div id="signup">
                <h1 className="heading">Sign Up</h1>
                <Register register={this.props.register} relocate={this.relocate}/>
            </div>
        )
    }
}

export default Signup
