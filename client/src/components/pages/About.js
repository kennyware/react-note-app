import React, { Component } from 'react'

export class About extends Component {
    render() {
        return (
            <div>
                <h1>About</h1>
                <p>This app was created demonstrate my ability to create a full stack about using the MERN stack.</p>
                <p>One thing I would like to note is that, for this project I decided not use any state management like Redux in order to see how difficult it would be to created an app of this size without using a state manager. I ran into some obstacles here and there that forced me to deepen my understanding of React and state within it.</p> 
                <p>I'd like to reiterate that this project wasn't built with real-world use in mind, so I know that there are some issues on the backend and frontend.</p>
            </div>
        )
    }
}

export default About
