import React, { Component } from 'react'

export class Login extends Component {
    state = {
        email: '',
        password: '',
        showPassword: false
    }

    togglePassword = () => {
        this.setState(state => ({showPassword: !state.showPassword}))
    }

    textChange = (e) => {
        if(e.target.name === 'email') {
            this.setState({email: e.target.value})
        } else {
            this.setState({password: e.target.value})
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.login(this.state.email, this.state.password)
        this.props.history.push('/?page=' + 1)
    }

    btnClass = () => {
        let btnClass = 'login-btn btn';
        if(this.state.email === '' || this.state.password === ''){
            return btnClass.concat(' not-ready');
        } else {
            return btnClass
        }
    }

    cancel = (e) => {
        e.preventDefault()
        this.props.history.push('/')
    }
    
    render() {
        return (
            <div>
                <form id="login-form" onSubmit={this.onSubmit}>
                    <div className="container">
                        <h1 className="heading">Login</h1>
                        <div className="msg">
                            {this.props.httpRes && <div className="error-msg">{this.props.httpRes}</div>}
                        </div>
                        <div>
                            <label><b>Email</b></label>
                            <input type="email" name="email" onChange={this.textChange} value={this.state.email} required/>
                        </div>
                        <div>
                            <label><b>Password</b></label>
                            <input 
                                type={this.state.showPassword ? 'text' : 'password'} 
                                name="password" 
                                value={this.state.password} 
                                onChange={this.textChange} 
                                required
                            />
                            <input type="checkbox" onChange={this.togglePassword}/>Show Password
                        </div>
                        <div>
                            <button className={this.btnClass()} type="submit">Login</button>
                        </div>

                        <button className="cancel-btn btn" onClick={this.cancel}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login
