import React, { Component } from 'react'

export class Register extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPass: '',
        msg: ''
    }

    Submit = (e) => {
        e.preventDefault();
        const { firstName, lastName, email, password, confirmPass } = this.state;
        if(password !== confirmPass) {
            return this.setState({msg: 'Passwords do not match.'})
        }

        this.props.register(firstName, lastName, email, password)
        this.props.relocate()
    }

    textChange = (e) => {
        if(e.target.name === 'firstName') {
            this.setState({firstName: e.target.value})
        } else if(e.target.name === 'lastName') {
            this.setState({lastName: e.target.value})
        } else if(e.target.name === 'email') {
            this.setState({email: e.target.value})
        } else if(e.target.name === 'password') {
            this.setState({password: e.target.value})
        } else {
            this.setState({confirmPass: e.target.value})
        }
    }
    
    btnClass = () => {
        let btnClass = 'register-btn btn';
        if(this.state.firstName === '' || this.state.lastName === '' || this.state.email === '' || this.state.password === '' || this.state.confirmPass === ''){
            return btnClass.concat(' not-ready');
        } else {
            return btnClass
        }
    }

    cancel = (e) => {
        e.preventDefault()
        this.props.relocate()
    }

    render() {
        return (
            <form id="register-form" onSubmit={this.Submit}>
                <div className="container">
                <h1 className="heading">Sign Up</h1>
                    <div className="msg">
                        {this.state.msg && <div className="error-msg">{this.state.msg}</div>}
                    </div>
                
                    <div>
                        <label>First Name</label>
                        <input type="text" name="firstName" onChange={this.textChange} required/>
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input type="text" name="lastName" onChange={this.textChange} required/>
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="email" name="email" onChange={this.textChange} required/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" name="password" onChange={this.textChange} required/>
                    </div>
                    <div>
                        <label>Confirm Password</label>
                        <input type="password" name="confirmPass" onChange={this.textChange} required/>
                    </div>
                    <div>
                        <button type="submit" className={this.btnClass()}>Submit</button>
                    </div>
                    <button className="cancel-btn btn" onClick={this.cancel}>Cancel</button>
                </div>
            </form>
        )
    }
}

export default Register
