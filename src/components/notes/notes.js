import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";

import Folders from '../folders/folders';
import Note from '../note/note';


class Notes extends Component {
    state = {
        folderId: undefined,
        notes: [],
    }
    
    componentDidUpdate() {
        if (this.props.match.params.folderId !== this.state.folderId) {
            this.loadData(this.props.match.params.folderId);
        }
    }

    componentDidMount() {
        this.loadData(this.props.match.params.folderId);
    }

    loadData(folderId) {
        // Alternative could be anxious
        
        if (folderId === 'all') {
            fetch('http://localhost:8000/api/notes')
                .then(data => {
                    return data.json();
                })
                .then(notes => {
                    this.setState({
                        notes: notes,
                        folderId: folderId,
                    });
                })
        } else {
            fetch('http://localhost:8000/api/folders/' + folderId)
                .then(data => {
                    return data.json();
                })
                .then(folder => {
                    this.setState({
                        notes: folder.notes,
                        folderId: folderId,
                    });
                })            
        }
    }

    render() {
        return (
            <React.Fragment>
                <Folders />
                <h1>Notes</h1>
                {this.state.notes.map(note => <div key={note.id}><Link to={this.props.match.url + "/note/" + note.id}>{note.title}</Link></div>)}
                <Route path={this.props.match.url + "/note/:noteId"} component={Note} />
            </React.Fragment>
        )
    }
}

export default Notes;