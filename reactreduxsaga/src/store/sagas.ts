import { RegisterUser, registerUserSuccess, AuthUser, authUserSuccess, GetUserByID, getUserByIDSuccess, registerUserFail } from "./actions/userActions";
import { dbAuthUser, dbRegisterUser, dbGetUserByID, dbCheckUsername } from "../service/userService";
import { dbGetPlaylists, dbAddPlaylist, dbDeletePlaylist, dbAddTrack, dbRemoveTrack } from "../service/playlistService";
import { put } from "redux-saga/effects";
import { GetPlaylists, getPlaylistsSuccess, AddPlaylist, addPlaylistSuccess, DeletePlaylist, deletePlaylistSuccess, AddTrack, addTrackSuccess, RemoveTrack, RemoveTrackSuccess } from "./actions/playlistActions";
import Cookies from "universal-cookie";

//users
export function* sAuthUser(user: AuthUser) {
    const dbUser = yield dbAuthUser(user.username, user.password);
    yield put(authUserSuccess(dbUser));

}

export function* sRegisterUser(user: RegisterUser) {
    const username = yield dbCheckUsername(user.user.Username);
    if (username.length === 0) {
        if (user.user.Password === user.user.confirmPassword) {
            debugger;
            const dbUser = yield dbRegisterUser(user.user.Username, user.user.Password);
            console.log(dbUser);
            debugger;
            const cookies = new Cookies();
            cookies.set('logedIn', dbUser[0].ID, { path: '/' });
            console.log(cookies);
            yield put(registerUserSuccess(dbUser));
        }
        else {
            yield put(registerUserFail("Passwords did not match!"));
        }
    }
    else {
        yield put(registerUserFail("Username already exists!"));
    }
}

export function* sGetUserByID(user: GetUserByID) {
    const dbUser = yield dbGetUserByID(user.ID);
    yield put(getUserByIDSuccess(dbUser));
}


//playlists
export function* sFetchPlaylists(playlist: GetPlaylists) {
    const dbPlaylist = yield dbGetPlaylists(playlist.ID);
    yield put(getPlaylistsSuccess(dbPlaylist));
}

export function* sAddPlaylists(playlist: AddPlaylist) {
    const dbPlaylist = yield dbAddPlaylist(playlist);
    console.log(dbPlaylist);
    yield put(addPlaylistSuccess(dbPlaylist[0]));
}

export function* sDeletePlaylist(playlist: DeletePlaylist) {
    const deletedPlaylistID = yield dbDeletePlaylist(playlist.ID);
    yield put(deletePlaylistSuccess(deletedPlaylistID.id));
}

export function* sAddTrack(track: AddTrack) {
    const dbTrack = yield dbAddTrack(track.track, track.playlistID);
    yield put(addTrackSuccess(dbTrack));
}

export function* sRemoveTrack(track: RemoveTrack) {
    const dbTrack = yield dbRemoveTrack(track.track, track.playlistID);
    yield put(RemoveTrackSuccess(dbTrack));
}