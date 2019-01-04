import React, { Component } from 'react';
import axios from 'axios';

class Note extends Component {
    state = {
        note: {},
    }    

    componentDidMount() {
        this.loadData(this.props.match.params.noteId);
    }

    componentDidUpdate() {        
        if (+this.props.match.params.noteId !== this.state.note.id) {
            this.loadData(this.props.match.params.noteId)
        }
    }

    loadData(noteId) {
        axios.get('http://localhost:8000/api/notes/' + noteId).then(response => {
            this.setState({
                note: response.data,
            });
        })
    }
    
    render() {
        return (
            <React.Fragment>
                <h1>Note</h1>
                {this.state.note.title}
            </React.Fragment>
        )
    }
}

export default Note;