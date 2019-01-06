import { ADD_FOLDER, ADD_NOTE, LOAD_FOLDER, LOAD_FOLDERS, LOAD_NOTES } from './actions';


const initialState = {
    notes: [],
    folders: [],
    newFolderId: 0,
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_NOTES:
            return {
                ...state,
                notes: action.notes
            }
        case LOAD_FOLDER:
            return {
                ...state,
                notes: action.notes
            }
        case LOAD_FOLDERS:
            return {
                ...state,
                folders: action.folders
            }
        case ADD_NOTE:
            return state;
        case ADD_FOLDER:
            return {
                ...state,
                newFolderId: action.newFolderId
            }
        default: 
            return state;
    }
}

export default reducer;