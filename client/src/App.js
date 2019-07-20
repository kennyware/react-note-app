import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Login from './components/forms/Login';
import Signup from './components/pages/Signup'
import { BrowserRouter, Route } from 'react-router-dom'
import axios from 'axios';



class App extends Component {
  state = {
    loggedIn: false,
    showLogin: false,
    httpRes: '',
    token: '',
    notes: [],
    ready: false
  }

  componentDidMount = () => {
    
    if(localStorage.getItem('token')) {
      this.checkLogin(localStorage.getItem('token'))
      setTimeout(() => {this.setState({ready: true})}, 3000)
    } else {
      this.setState({ready: true})
    }

    
  }

  getNotes = () => {
    axios.get('/api/notes').then(res => {
      if(res.data.msg) {
        return console.log(res.data.msg)
      }
      this.setState({notes: res.data});
    })
  }

  checkLogin = (token) => {
    axios.defaults.headers.common = {'bearer-token': token}
    axios.get('/api/auth/user').then(res => {
      if(res.data.user){
        this.getNotes()
        this.setState({token: token, loggedIn: true})
      } else {
        this.setState({loggedIn: false})
        localStorage.removeItem('token')
      }
    }).catch(err => this.setState({loggedIn: false}))
  }

  toggleLogin = () => {
    this.setState((state, props) => ({showLogin: !state.showLogin}))
  }

  login = (email, password) => {
    axios.post('/api/auth', { email, password }).then(res => {
      const { data } = res;
      if(data.msg){
        return this.setState({httpRes: data.msg})
      } else {
        this.setState({token: data.token, loggedIn: true, showLogin: false})
        localStorage.setItem('token', data.token)
        axios.defaults.headers.common = {'bearer-token': data.token}
      }
    }).catch(err => {
      return console.log(err)
    })
  }

  refreshLogin = () => {
    
  }

  register = (first_name, last_name, email, password) => {
    axios.post('/api/users', { first_name, last_name, email, password }).then(res => {
      if(res.data.token){
        this.setState({token: res.data.token, loggedIn: true})
        localStorage.setItem('token', res.data.token)
      }
    })
  }

  delNote = (id) => {
    
    axios.delete(`/api/notes/${id}`).then(res => {
      if(res.data.success === true) {
        const newNoteState = this.state.notes.filter(note => note._id !== id);
        this.setState({notes: newNoteState})
      }
    })
  }

  addNote = (description) => {
    axios.post('/api/notes', {description}).then(res => {
      let newNoteState = this.state.notes;
      newNoteState.push(res.data);
      this.setState({notes: newNoteState});
    })
  }

  logout = () => {
    this.setState({loggedIn: false, token: ''})
    localStorage.removeItem('token')
  }

  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <div className="container">
            {this.state.ready && [
            <Header key={0} loggedIn={this.state.loggedIn} toggleLogin={this.toggleLogin} logout={this.logout}/>,
            <Route key={1} exact path="/" render={(props) => 
              <Home {...props} 
              loggedIn={this.state.loggedIn} 
              notes={this.state.notes} 
              delNote={this.delNote}
              addNote={this.addNote}
              />} />,
            <Route key={2} path="/about" component={About} />,
            <Route key={3} path="/signup" render={(props) => <Signup {...props} register={this.register} />} />,
            <div key={4}>{this.state.showLogin &&
              <Login toggleLogin={this.toggleLogin} login={this.login} httpRes={this.state.httpRes}/>
            }</div>
          ]
          }
          </div>
        </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
