import React, { Component } from 'react'

export class AddNote extends Component {

    state = {
        desc: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addNote(this.state.desc)
        this.setState({desc: ''})
    }

    changeText = (e) => {
        this.setState({desc: e.target.value})
    }

    btnStyle = () => {
        return this.state.desc ? 'add-btn btn' : 'add-btn btn not-ready'
    }
    
    render() {
        return (
            <form onSubmit={this.onSubmit} id="note-form">
                <input type="text" value={this.state.desc} onChange={this.changeText} required/>
                <button type="submit" className={this.btnStyle()}>Add</button>
            </form>
        )
    }
}

export default AddNote
