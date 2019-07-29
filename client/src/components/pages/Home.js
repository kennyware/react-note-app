import React, { Component } from 'react';
import NoteList from '../NoteList';
import AddNote from '../forms/AddNote';
import ViewNote from '../ViewNote';
import Pagination from  '../Pagination';

export class Home extends Component {
    state = {
        viewNote: false,
        noteText: ''
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(this.props.curPage !== prevProps.curPage) {
            this.props.history.push(`/?page=${this.props.curPage}`)
        }
    }

    paginate = (num) => {
        // console.log('Paginate', num)
        this.props.history.push(`/?page=${num}`)
        this.props.paginate(num)
    }

    viewNote = (title) => {
        this.setState({noteText: title})
    }

    select = (e) => {
        this.props.setNotesPerPage(e.target.value)
    }

    render() {
        return (
            <div id="home">
                <h1 className="heading">Home</h1>
                {this.props.loggedIn ? ([
                    <AddNote key={0} addNote={this.props.addNote} />,
                    this.props.notes.length > 0 && (
                        <div key={3} className="select">
                            Notes per page:{' '}
                            <select onChange={this.select} defaultValue={this.props.notesPerPage}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                            </select>
                        </div>
                    ),
                    <NoteList key={1} notes={this.props.notes} delNote={this.props.delNote} viewNote={this.viewNote} />,
                    <Pagination key={2} 
                        notesPerPage={this.props.notesPerPage} 
                        totalNotes={this.props.totalNotes} 
                        paginate={this.paginate}
                        curPage={this.props.curPage}
                    />
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
