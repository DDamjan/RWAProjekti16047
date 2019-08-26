import { Action } from "redux";
import { FETCH_PLAYLISTS, FETCH_PLAYLISTS_SUCCESS, ADD_PLAYLIST, ADD_PLAYLIST_SUCCESS, DELETE_PLAYLIST, DELETE_PLAYLIST_SUCCESS, CURRENT_PLAYLIST, CURRENT_TRACK, ADD_TRACK, ADD_TRACK_SUCCESS, FIND_TRACK, REMOVE_TRACK } from "./types";
import { Playlist } from "../../models/playlist";
import { Track } from "../../models/Track";

export interface GetPlaylists extends Action {
    ID: number;
}

export function getPlaylists(id: number): GetPlaylists {
    return {
        type: FETCH_PLAYLISTS,
        ID: id
    };
}

export interface GetPlaylistsSuccess extends Action {
    playlists: Playlist[];
}

export function getPlaylistsSuccess(_playlists: Playlist[]): GetPlaylistsSuccess {
    return {
        type: FETCH_PLAYLISTS_SUCCESS,
        playlists: _playlists
    };
}

export interface AddPlaylist extends Action {
    payload: any;
}

export function addPlaylist(payload: any): AddPlaylist {
    return {
        type: ADD_PLAYLIST,
        payload
    };
}

export interface AddPlaylistSuccess extends Action {
    playlist: Playlist;
}

export function addPlaylistSuccess(playlist: Playlist): AddPlaylistSuccess {
    return {
        type: ADD_PLAYLIST_SUCCESS,
        playlist
    };
}

export interface DeletePlaylist extends Action {
    ID: number;
}

export function deletePlaylist(id: number): DeletePlaylist {
    return {
        type: DELETE_PLAYLIST,
        ID: id
    };
}

export interface DeletePlaylistSuccess extends Action {
    ID: number;
}

export function deletePlaylistSuccess(ID: number): DeletePlaylistSuccess {
    return{
        type: DELETE_PLAYLIST_SUCCESS,
        ID
    };
}

export interface CurrentPlaylist extends Action{
    ID: number;
}

export function currentPlaylist(id: number): CurrentPlaylist{
    return {
        type: CURRENT_PLAYLIST,
        ID: id
    };
}

export interface CurrentTrack extends Action{
    ID: number;
}

export function currentTrack(id: number): CurrentTrack{
    return {
        type: CURRENT_TRACK,
        ID: id
    }
}

export interface AddTrack extends Action{
    track: Track;
    playlistID: number;
}

export function addTrack(t: Track, playlistID: number): AddTrack{
    return {
        type: ADD_TRACK,
        track: t,
        playlistID: playlistID
    };
}

export interface AddTrackSuccess extends Action{
    track: Track;
}

export function addTrackSuccess(t: Track): AddTrackSuccess{
    return{
        type: ADD_TRACK_SUCCESS,
        track: t
    };
}

export interface FindTrack extends Action{
    query: string;
}

export function findTrack(q: string): FindTrack{
    return{
        type: FIND_TRACK,
        query: q
    };
}

export interface RemoveTrack extends Action{
    track: Track;
    playlistID: number;
}

export function removeTrack(t: Track, playlistId): RemoveTrack{
    return {
        type: REMOVE_TRACK,
        track: t,
        playlistID: playlistId
    }
}

export interface RemoveTrackSuccess extends Action{
    track: Track;
}

export function RemoveTrackSuccess(t: Track): RemoveTrackSuccess{
    return {
        type: REMOVE_TRACK,
        track: t,
    }
}