import React, { Component } from 'react';
import NoteList from '../NoteList';
import AddNote from '../forms/AddNote';
import ViewNote from '../ViewNote';

export class Home extends Component {

    state = {
        viewNote: false,
        noteText: ''
    }

    viewNote = (title) => {
        this.setState({noteText: title})
    }


    render() {
        return (
            <div id="home">
                <h1 className="heading">Home</h1>
                {this.props.loggedIn ? ([
                    <AddNote key={0} addNote={this.props.addNote}/>,
                    <NoteList key={1} notes={this.props.notes} delNote={this.props.delNote} viewNote={this.viewNote}/>
                ]) 
                : 
                (<div className="intro">
                    <p>Click the sign up link in the top right to get started or use the log in link and use the following credentials to get started right away. Email: johndoe@test.com, Password: abc123</p>
                </div>)}

                {this.state.noteText && 
                    <ViewNote text={this.state.noteText} hideNote={this.viewNote}/>
                }
            </div>
        )
    }
}

export default Home
