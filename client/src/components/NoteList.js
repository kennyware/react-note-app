import React, { Component } from 'react';
import NoteItem from './NoteItem';

export class NoteList extends Component {
    state = {
       notes: this.props.notes
    }

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
                {/* {this.genItems()} */}
                {this.props.notes.length > 0 ? (this.props.notes.map((note) => 
                <NoteItem  
                    key={note._id} 
                    id={note._id} 
                    title={note.description}
                    date={note.date}
                    delNote={this.props.delNote}
                />))
                :
                ('You currently have no notes')}
            </div>
        )
    }
}

export default NoteList
