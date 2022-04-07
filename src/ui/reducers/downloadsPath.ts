import { APP_SETTINGS_LOADED } from '../../app/actions';
import { DOWNLOADS_PATH_CHANGED } from "../actions";

export default (state:any, action:any): string =>{
    
    switch(action.type){
        case APP_SETTINGS_LOADED:
            return action.payload.downloadsPath ?? '';
        case DOWNLOADS_PATH_CHANGED: {
            return action.payload;
        }
    }

    return state || '';
}