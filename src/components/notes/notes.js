import React, { Component } from 'react';

import { Route, Link } from "react-router-dom";
import axios from 'axios';

import Folders from '../folders/folders';
import Note from '../note/note';


class Notes extends Component {
    constructor(props) {
        super(props);

        this.noteNameInput = React.createRef()

        this.state = {
            folderId: undefined,
            notes: [],    
        }    
    }
    
    componentDidUpdate() {
        if (this.props.match.params.folderId !== this.state.folderId) {
            this.loadData(this.props.match.params.folderId);
        }
    }

    componentDidMount() {
        this.loadData(this.props.match.params.folderId);
    }

    onAddNoteKeyDown = event => {
        if (event.keyCode === 13) {
            const data = {
                title: event.target.value,
                folder: this.state.folderId,
            };
    
            axios.post('http://localhost:8000/api/notes', data).then(response => {
                this.loadData(this.props.match.params.folderId);
                this.noteNameInput.current.value = '';
            })            
        }
    }

    onFilterKeyUp = event => {                
        const value = event.target.value.toLowerCase();
        if (this.state.folderId === 'all') {
            axios.get('http://localhost:8000/api/notes?q=' + value).then(response => {
                this.setState({
                    notes: response.data,
                });
            })            
        } else {
            axios.get('http://localhost:8000/api/folders/' + this.state.folderId).then(response => {
                const notes = response.data.notes.filter(note => note.title.toLowerCase().includes(value));
                this.setState({
                    notes: notes,
                });
            })            
        }
    }

    loadData(folderId) {
        if (folderId === 'all') {
            axios.get('http://localhost:8000/api/notes').then(response => {
                this.setState({
                    notes: response.data,
                    folderId: folderId,
                });
            })
        } else {
            axios.get('http://localhost:8000/api/folders/' + folderId).then(response => {
                this.setState({
                    notes: response.data.notes,
                    folderId: folderId,
                });
            })            
        }
    }

    render() {
        return (
            <React.Fragment>
                <input 
                    placeholder="filter" 
                    onKeyUp={this.onFilterKeyUp}/>
                <Folders />
                <h1>Notes</h1>
                <input 
                    type="text"
                    name="noteName"
                    placeholder="Add note" 
                    ref={this.noteNameInput}
                    onKeyDown={this.onAddNoteKeyDown} />

                {this.state.notes.map(note => <div key={note.id}><Link to={this.props.match.url + "/note/" + note.id}>{note.title}</Link></div>)}
                <Route path={this.props.match.url + "/note/:noteId"} component={Note} />
            </React.Fragment>
        )
    }
}

export default Notes;