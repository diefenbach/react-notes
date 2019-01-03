import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Folders extends Component {
    state = {
        folders: [],
    }

    componentDidMount() {
        // Alternative could be anxious
        fetch('http://localhost:8000/api/folders')
            .then(data => {
                return data.json();
            })
            .then(folders => {
                this.setState({
                    folders: folders,
                });
            })
    }
    
    render() {
        return (
            <React.Fragment>
                <h1>Folders</h1> 
                {
                    this.state.folders.map(
                        folder => (
                            <React.Fragment key={folder.id}>                            
                                <div><Link to={'/folder/' + folder.id }>{folder.title}</Link></div>
                            </React.Fragment>                            
                        )
                    )
                }
            </React.Fragment>
        )
    }
}

export default Folders;