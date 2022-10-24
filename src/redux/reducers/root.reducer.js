import { combineReducers } from 'redux';

import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'; 

import posts from './posts.reducers';
import auth from './auth.reducers';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
}

const rootReducer = combineReducers({ 
    postsDB: posts, 
    auth: auth 
});


export default persistReducer(persistConfig, rootReducer);