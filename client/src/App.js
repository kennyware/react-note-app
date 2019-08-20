import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Footer from './components/Footer';
import NotFound from './components/pages/NotFound';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';



class App extends Component {
  state = {
    loggedIn: false,
    showLogin: false,
    httpRes: '',
    token: '',
    notes: [],
    ready: false,
    notesPerPage: 5,
    currentPage: 0,
    currentNotes: [],
    lastPage: 1,
    pageNumbers: []
  }

  componentDidMount = () => {
    
    if(localStorage.getItem('token')) {
      this.checkLogin(localStorage.getItem('token'))
      setTimeout(() => {
        this.setState({ready: true})
      }, 3000)
    } else {
      this.setState({ready: true}, () => {
        if(window.location.search) {
          window.location.href = window.location.origin.concat('/404')
        }
      })
    }
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if(this.state.notesPerPage !== prevState.notesPerPage) {
      this.paginate(this.state.notesPerPage)
    }
  }

  getNotes = () => {
    axios.get('/api/notes').then(res => {
      if(!res.data.msg) {
        this.setState({notes: res.data}, () => {
          const param = new URLSearchParams(window.location.search).get('page')
          // check url params
          if(param) {
            
            const pageNumbers = [];
            for(let i = 1; i <= Math.ceil(res.data.length / this.state.notesPerPage); i++) {
                pageNumbers.push(i)
            }
            

            if(parseInt(param) === 0){
              window.location.href = window.location.origin + '/404';
            } else if(parseInt(param.toString()) > pageNumbers.length) {
              window.location.href = window.location.origin + `/?page=${pageNumbers.length}`
            }
            this.paginate(parseInt(param.toString()))
          } else if(window.location.href === `${window.location.origin}/`){
              window.location.href = window.location.origin + '/?page=1'
          }
          
        });
      }
    }).catch(err => console.log(err))
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
    }).catch(err => {
      this.setState({loggedIn: false})
    })
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
        this.getNotes()
      }
    })
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
        this.setState({notes: newNoteState}, () => {
          this.setPage()
        });
      } else {
        this.logout();
      }
    })
  }

  addNote = (description) => {
    axios.post('/api/notes', {description}).then(res => {
      if(res.data) {
        let newNoteState = this.state.notes;
        newNoteState.push(res.data);
        this.setState({notes: newNoteState}, () => {
          if(this.state.currentPage > 0){
            this.paginate(this.state.currentPage)
          } else {
            this.paginate(1)
          }
        });
      } else {
        this.logout();
      }
    })
  }

  logout = () => {
    this.setState({loggedIn: false, token: ''}, () => {
      localStorage.removeItem('token')
    })    
  }

  setPage = () => {
    const lastNoteIndex = this.state.currentPage * this.state.notesPerPage;
    const firstNoteIndex = lastNoteIndex - this.state.notesPerPage;
    // Get Current Notes
    this.setState(state => ({        
      currentNotes: state.notes.slice(firstNoteIndex, lastNoteIndex)
    }), () => {
        if(this.state.currentNotes.length < 1 && this.state.currentPage > 1) {
          this.paginate(this.state.currentPage - 1)
        }
    })
    
  }

  paginate = (number) => {
    this.setState({currentPage: number}, () => {
      this.setPage()
    })
  }

  setNotesPerPage = (noteCount) => {
    this.setState({notesPerPage: noteCount})
  }

  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <div className="container">
            {this.state.ready && [
              <Header key={0} loggedIn={this.state.loggedIn} toggleLogin={this.toggleLogin} logout={this.logout}/>,
              <Switch key={1} >
                <Route exact path="/" render={(props) => 
                  <Home {...props} 
                    loggedIn={this.state.loggedIn} 
                    notes={this.state.currentNotes}
                    notesPerPage={this.state.notesPerPage}
                    setNotesPerPage={this.setNotesPerPage}
                    totalNotes={this.state.notes.length}
                    paginate={this.paginate}
                    curPage={this.state.currentPage}
                    delNote={this.delNote}
                    addNote={this.addNote} 
                  />
                }/>
                <Route path="/about" component={About} />
                <Route path="/signup" render={props => <Signup {...props} register={this.register} />} />
                <Route path="/login" render={props => 
                  <Login {...props}
                    login={this.login} 
                    httpRes={this.state.httpRes}
                  />}
                />
                <Route component={NotFound}/>
              </Switch>,
              <Footer key={2} />
            ]
          }
          </div>
        </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
