import axios from 'axios'

export default {
    user: {
        login = (email, password) => {
            axios.post('http://localhost:5000/api/auth', { email, password }).then(res => {
                const { data } = res;
                if(data.msg){
                    this.setState({httpRes: data.msg})
                } else {
                    this.setState({token: data.token, loggedIn: true})
                    localStorage.setItem('token', data.token)
                    this.getNotes(data.token)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        
        register = (firstName, lastName, email, password) => {
            axios.post('http://localhost:5000/api/users', { firstName, lastName, email, password }).then(res => {
                if(res.data.token){
                    this.setState({token: res.data.token, loggedIn: true})
                    localStorage.setItem('token', res.data.token)
                }
            })
        },

        checkLogin = (token) => {
            axios.defaults.headers.common = {'bearer-token': token}
            axios.get('http://localhost:5000/api/auth/user').then(res => {
                if(res.data.user){
                    this.getNotes()
                    this.setState({token, loggedIn: true})
                } else {
                    this.setState({loggedIn: false})
                }
            }).catch(err => this.setState({loggedIn: false}))
        }
    },
    notes: {
        getNotes = () => {
            axios.get('/api/notes').then(res => {
                this.setState({notes: res.data})
            })
        },

        delNote = (id) => {
            axios.delete(`http://localhost:5000/api/notes/${id}`).then(res => {
                console.log(res.data)
            })
        },
        
        addNote = (description) => {
            axios.post('http://localhost:5000/api/notes', {description})
        }
    }

}