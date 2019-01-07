import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Route, Link } from "react-router-dom";

import * as actionCreators from '../../store/actions';

import Folders from '../folders/folders';
import Note from '../note/note';


class Notes extends Component {
    constructor(props) {
        super(props);

        this.noteNameInput = React.createRef()

        this.state = {
            folderId: null,
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
            this.props.onAddNote(event.target.value, this.state.folderId).then(() => {
                this.noteNameInput.current.value = '';
                if (this.state.folderId && this.state.folderId !== 'all') {
                    this.props.onLoadFolder(this.state.folderId);
                } else {
                    this.props.onLoadNotes();
                }
            })
        }
    }

    onFilterKeyUp = event => {                
        const filter = event.target.value.toLowerCase();
        this.loadData(this.state.folderId, filter);
    }

    loadData(folderId, filter) {
        this.setState({
            folderId: folderId,
        });

        if (folderId === 'all') {
            this.props.onLoadNotes(filter);
        } else {
            this.props.onLoadFolder(folderId, filter);
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

                {this.props.notes.map(note => <div key={note.id}><Link to={this.props.match.url + "/note/" + note.id}>{note.title}</Link></div>)}
                <Route path={this.props.match.url + "/note/:noteId"} component={Note} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        notes: state.notes,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddNote: (title, folderId) => dispatch(actionCreators.addNote(title, folderId)),
        onAddedNote: (result) => dispatch(actionCreators.addedNote(result)),
        onLoadNotes: (filter) => dispatch(actionCreators.loadNotes(filter)),
        onLoadFolder: (folderId, filter) => dispatch(actionCreators.loadFolder(folderId, filter)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Notes);