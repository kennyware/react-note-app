import React, { Component } from 'react'

export class ViewNote extends Component {

    state = {
        noteText: ''
    }

    click = () => {
        this.props.hideNote('');
    }

    render() {
        return (
            <div className="modal">
                <div className="modal-content">
                    <button className="note-close-btn" onClick={this.click}>X</button>
                    <div className="note-text">{this.props.text}</div> 
                </div>
            </div>
        )
    }
}

export default ViewNote
