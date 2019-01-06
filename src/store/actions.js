import axios from 'axios';

export const ADD_FOLDER = 'ADD_FOLDER';
export const ADD_NOTE = 'ADD_NOTE';
export const LOAD_NOTES = 'LOAD_NOTES';
export const LOAD_FOLDER = 'LOAD_FOLDER';
export const LOAD_FOLDERS = 'LOAD_FOLDERS';

export const loadedNotes = result => {
    return {
        type: LOAD_NOTES,
        notes: result,
    };
}

export const loadNotes = filter => {    
    console.log(filter);
    return dispatch => {
        let url = 'http://localhost:8000/api/notes';

        if (filter) {
            url += '?q=' + filter
        }

        axios.get(url).then(response => {
            dispatch(loadedNotes(response.data));
        })
    }
};


export const loadedFolder = result => {            
    return {
        type: LOAD_FOLDER,
        notes: result,
    };
}

export const loadFolder = (folderId, filter = '') => {    
    return dispatch => {        
        let url = 'http://localhost:8000/api/folders/' + folderId;

        axios.get(url).then(response => {
            const notes = response.data.notes.filter(note => note.title.toLowerCase().includes(filter.toLowerCase()));
            dispatch(loadedFolder(notes));
        })
    }
}

export const loadedFolders = result => {            
    return {
        type: LOAD_FOLDERS,
        folders: result,
    };
}

export const loadFolders = () => {    
    return dispatch => {        
        axios.get('http://localhost:8000/api/folders').then(response => {
            dispatch(loadedFolders(response.data));
        })
    }
}


export const addedFolder = result => {
    return {
        type: ADD_FOLDER,
        newFolderId: result.id,
    };
}

export const addFolder = (title, history) => {
    return dispatch => {
        const data = {title: title};
        axios.post('http://localhost:8000/api/folders', data).then(response => {            
            history.push('/folder/' + response.data.id);
            dispatch(addedFolder(response.data));
            dispatch(loadFolders());
        })
    }
}


export const addedNote = result => {            
    return {
        type: ADD_NOTE,
    };
}

export const addNote = (title, folderId) => {
    return dispatch => {
        let url = 'http://localhost:8000/api/notes';

        const data = {title: title, folder: folderId};
        
        axios.post(url, data).then(response => {
            dispatch(addedNote());
            if (folderId && folderId !== 'all') {
                dispatch(loadFolder(folderId));
            } else {
                dispatch(loadNotes());
            }
        })
    }
}