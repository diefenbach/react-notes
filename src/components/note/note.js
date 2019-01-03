import React, { Component } from 'react';

class Note extends Component {
    state = {
        note: {},
    }

    componentDidMount() {
        this.loadData(this.props.match.params.noteId);
    }

    componentDidUpdate() {
        if (this.props.match.params.noteId !== this.state.note.id) {
            this.loadData(this.props.match.params.noteId)
        }
    }

    loadData(noteId) {
        // Alternative could be anxious
        fetch('http://localhost:8000/api/notes/' + noteId)
            .then(data => {
                return data.json();
            })
            .then(note => {
                this.setState({
                    note: note,
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