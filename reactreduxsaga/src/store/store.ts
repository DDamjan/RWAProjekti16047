import createSagaMiddleware from "@redux-saga/core";
import { applyMiddleware, createStore } from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers'
import { takeEvery } from '@redux-saga/core/effects';
import { REGISTER_USER, FETCH_PLAYLISTS, ADD_PLAYLIST, DELETE_PLAYLIST, ADD_TRACK, REMOVE_TRACK, AUTH_USER, GET_USER_BY_ID } from "./actions/types";
import { sAuthUser, sRegisterUser, sFetchPlaylists, sAddPlaylists, sDeletePlaylist, sAddTrack, sRemoveTrack, sGetUserByID } from "./sagas";
import { Playlist } from "../models/playlist";
import { Track } from "../models/Track";
import { userState } from "./reducers/userReducer";
import { playlistState } from "./reducers/playlistReducer";

export interface AppState {
    user: userState;
    currentPlaylist: Playlist;
    playlist: playlistState;
    currentTrack: Track;
}

function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = applyMiddleware(sagaMiddleware);
    const store = createStore(
        rootReducer,
        composeWithDevTools(middlewares)
    );
    sagaMiddleware.run(rootSaga);
    return store;
}

export function* rootSaga(){
    yield takeEvery (AUTH_USER, sAuthUser);
    yield takeEvery (FETCH_PLAYLISTS, sFetchPlaylists);
    yield takeEvery (ADD_PLAYLIST, sAddPlaylists);
    yield takeEvery (DELETE_PLAYLIST, sDeletePlaylist);
    yield takeEvery (ADD_TRACK, sAddTrack);
    yield takeEvery (REMOVE_TRACK, sRemoveTrack);
    yield takeEvery (GET_USER_BY_ID, sGetUserByID);
    yield takeEvery (REGISTER_USER, sRegisterUser);

}

export default configureStore();