import React, { Component } from 'react';
import NoteList from '../NoteList';
import Intro from '../Intro';
import AddNote from '../forms/AddNote';

export class Home extends Component {

    render() {
        return (
            <div id="home">
                <h1 className="heading">Home</h1>
                {this.props.loggedIn ? ([
                    <AddNote key={0} addNote={this.props.addNote}/>,
                    <NoteList key={1} notes={this.props.notes} delNote={this.props.delNote}/>
                ]) 
                : 
                (<Intro />)}
            </div>
        )
    }
}

export default Home
