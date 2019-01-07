import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { addFolder, loadFolders, addedFolder }  from '../../store/actions';


class Folders extends Component {
    constructor(props) {
        super(props);
        this.folderNameInput = React.createRef()
    }

    componentDidMount() {
        this.props.onLoadFolders();
    }

    onAddFolderKeyDown = event => {                        
        if (event.keyCode === 13) {    
            this.props.onAddFolder(event.target.value).then(response => {            
                this.folderNameInput.current.value = '';
                this.props.history.push('/folder/' + response.data.id);
                this.props.onLoadFolders();
            })
        }
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
                {this.props.folders.map(folder => <div key={folder.id}><Link to={'/folder/' + folder.id }>{folder.title}</Link></div>)}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        folders: state.folders,
        newFolderId: state.newFolderId,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddFolder: (title) => dispatch(addFolder(title)),
        onAddedFolder: (result) => dispatch(addedFolder(result)),
        onLoadFolders: () => dispatch(loadFolders()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Folders));