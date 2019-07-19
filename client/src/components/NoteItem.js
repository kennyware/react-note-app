import React, { Component } from 'react'

export class NoteItem extends Component {

    changeDate = () => {

        const d = new Date(this.props.date);
        const day = d.getDate().toString();
        const month = (d.getMonth() + 1).toString();
        const year = d.getFullYear().toString();
        const date = month.concat('/',day,'/',year)
        
        return date;

    }

    delNote = () => {
        this.props.delNote(this.props.id)
    }

    render() {
        const { title } = this.props;
        return (
            <div className="note">
                <span>{this.changeDate()}</span><span className="note-title">{title}</span>                
                <span className="delete-btn" onClick={this.delNote}>x</span>
            </div>
        )
    }
}

export default NoteItem
