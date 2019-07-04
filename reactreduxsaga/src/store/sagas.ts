import { RegisterUser, registerUserSuccess, AuthUser, authUserSuccess, GetUserByID, getUserByIDSuccess } from "./actions/userActions";
import { dbAuthUser, dbRegisterUser, dbGetUserByID } from "../service/userService";
import { dbGetPlaylists, dbAddPlaylist, dbDeletePlaylist, dbAddTrack, dbRemoveTrack } from "../service/playlistService";
import { put } from "redux-saga/effects";
import { GetPlaylists, getPlaylistsSuccess, AddPlaylist, addPlaylistSuccess, DeletePlaylist, deletePlaylistSuccess, AddTrack, addTrackSuccess, RemoveTrack, RemoveTrackSuccess } from "./actions/playlistActions";

//users
export function* sAuthUser(user: AuthUser) {
    const dbUser = yield dbAuthUser(user.username, user.password);
    yield put(authUserSuccess(dbUser));

}

export function* sRegisterUser(user: RegisterUser) {
    const dbUser = yield dbRegisterUser(user.user);
    yield put(registerUserSuccess(dbUser));
}

export function* sGetUserByID(user: GetUserByID){
    const dbUser = yield dbGetUserByID(user.ID);
    yield put(getUserByIDSuccess(dbUser));
}


//playlists
export function* sFetchPlaylists(playlist: GetPlaylists) {
    const dbPlaylist = yield dbGetPlaylists(playlist.ID);
    yield put(getPlaylistsSuccess(dbPlaylist));
}

export function* sAddPlaylists(playlist: AddPlaylist) {
    const dbPlaylist = yield dbAddPlaylist(playlist.playlist);
    yield put(addPlaylistSuccess(dbPlaylist));
}

export function* sDeletePlaylist(playlist: DeletePlaylist) {
    const dbPlaylist = yield dbDeletePlaylist(playlist.ID);
    yield put(deletePlaylistSuccess(dbPlaylist));
}

export function* sAddTrack(track: AddTrack) {
    const dbTrack = yield dbAddTrack(track.track, track.playlistID);
    yield put(addTrackSuccess(dbTrack));
}

export function* sRemoveTrack(track: RemoveTrack) {
    const dbTrack = yield dbRemoveTrack(track.track, track.playlistID);
    yield put (RemoveTrackSuccess(dbTrack));
}