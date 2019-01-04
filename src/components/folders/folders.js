import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

class Folders extends Component {
    constructor(props) {
        super(props);

        this.folderNameInput = React.createRef()

        this.state = {
            folders: [],
            folderName: '',
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/folders').then(response => {
            this.setState({
                folders: response.data,
            });
        })        
    }

    onAddFolderKeyDown = event => {                
        if (event.keyCode === 13) {
            const data = {title: event.target.value};
            axios.post('http://localhost:8000/api/folders', data).then(response => {
                this.folderNameInput.current.value = '';
                this.loadData();
            })
        }
    }

    loadData() {
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
                <div>
                    <input 
                        type="text"
                        name="folderName"
                        placeholder="Add folder" 
                        ref={this.folderNameInput}
                        onKeyDown={this.onAddFolderKeyDown} />
                </div>

                <Link to='/folder/all'>All</Link>
                {this.state.folders.map(folder => <div key={folder.id}><Link to={'/folder/' + folder.id }>{folder.title}</Link></div>)}
            </React.Fragment>
        )
    }
}

export default Folders;