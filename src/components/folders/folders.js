import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

class Folders extends Component {
    state = {
        folders: [],
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/folders').then(response => {
            this.setState({
                folders: response.data,
            });
        })
    }
    
    render() {
        return (
            <React.Fragment>
                <h1>Folders</h1> 
                <Link to='/folder/all'>All</Link>
                {this.state.folders.map(folder => <div key={folder.id}><Link to={'/folder/' + folder.id }>{folder.title}</Link></div>)}
            </React.Fragment>
        )
    }
}

export default Folders;