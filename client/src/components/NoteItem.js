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

    delNote = (e) => {
        e.stopPropagation();
        this.props.delNote(this.props.id)
    }

    click = () => {
        this.props.viewNote(this.props.title)
    }

    render() {
        const { title } = this.props;
        return (
            <div className="note" onClick={this.click}>
                <div>{this.changeDate()}</div>
                <div className="note-title">{title}</div>                
                <span className="delete-btn" onClick={this.delNote}>x</span>
            </div>
        )
    }
}

export default NoteItem
