import React, { Component } from 'react';
import NoteItem from './NoteItem';

export class NoteList extends Component {

    genItems = () => {
        if(this.props.notes.length > 0) {
            return this.props.notes.map((note) => 
                <NoteItem  
                    key={note._id} 
                    id={note._id} 
                    title={note.description}
                    date={note.date}
                    delNote={this.props.delNote}
                />
            )
        } 

        return 'You currently have no notes'
    }

    render() {
        return (
            <div className="note-list">
                {this.props.notes.length > 0 ? (this.props.notes.map((note) => 
                <NoteItem  
                    key={note._id} 
                    id={note._id} 
                    title={note.description}
                    date={note.date}
                    delNote={this.props.delNote}
                    viewNote={this.props.viewNote}
                />))
                :
                ('You currently have no notes')}
            </div>
        )
    }
}

export default NoteList
