/* eslint-disable no-unused-expressions */

import { Playlist } from "../../models/playlist";
import { Action } from "redux";
import { FETCH_PLAYLISTS_SUCCESS, ADD_PLAYLIST_SUCCESS, DELETE_PLAYLIST_SUCCESS, CURRENT_PLAYLIST, CURRENT_TRACK, ADD_TRACK_SUCCESS } from "../actions/types";
import { GetPlaylists, GetPlaylistsSuccess, AddPlaylistSuccess, DeletePlaylistSuccess, CurrentPlaylist, CurrentTrack, AddTrackSuccess } from "../actions/playlistActions";
import { Track } from "../../models/Track";

export interface playlistState {
    currentPlaylist: Playlist;
    playlists: Playlist[];
    currentTrack: Track;
}

const initialState: playlistState = {
    currentPlaylist: {ID: 1, ownerID: 1, name: "Name", tracks: [{ID: 1, URL: "/", albumCover: "/", albumName: "Album", trackArtist: "Artist", trackDuration: 0, trackTitle: "title"}], trackURLs: ['/']},
    playlists: [{ID: 1, ownerID: 1, name: "Name", tracks: [{ID: 1, URL: "/", albumCover: "/", albumName: "Album", trackArtist: "Artist", trackDuration: 0, trackTitle: "title"}], trackURLs: ['/']}],
    currentTrack: {ID: 1, URL: "/", albumCover: "/", albumName: "Album", trackArtist: "Artist", trackDuration: 0, trackTitle: "title"}
}

export default function (state = initialState, action: Action) {
    switch (action.type) {
        case FETCH_PLAYLISTS_SUCCESS: {
            const {playlists} = action as GetPlaylistsSuccess;
            return{
                ...state,
                playlists : playlists
            };
        }
        case ADD_PLAYLIST_SUCCESS:{
            const {playlist} = action as AddPlaylistSuccess;
            return{
                ...state,
                playlists:[...state.playlists,playlist]
            };
        }
        case DELETE_PLAYLIST_SUCCESS:{
            const {ID} = action as DeletePlaylistSuccess;
            return{
                ...state,
                playlists: state.playlists.filter((playlist: Playlist)=>playlist.ID != ID)
            }
        }
        case CURRENT_PLAYLIST:{
            const {ID} = action as CurrentPlaylist;
            return{
                ...state,
                currentPlaylist: state.playlists.filter((playlist: Playlist)=> playlist.ID === ID).pop()
            }
        }
        case CURRENT_TRACK:{
            const{ID} = action as CurrentTrack;
            return{
                ...state,
                currentTrack: state.currentPlaylist.tracks.filter((track: Track)=> track.ID === ID).pop()
            }
        }
        case ADD_TRACK_SUCCESS:{
            const {track} = action as AddTrackSuccess;
            return{
                ...state,
                currentPlaylist: state.currentPlaylist.tracks.push(track)
            }
        }
        case DELETE_PLAYLIST_SUCCESS:{
            const {ID} = action as DeletePlaylistSuccess;
            return{
                ...state,
                currentPlaylist: state.currentPlaylist.tracks.filter((track: Track)=> track.ID !== ID)
            }
        }
        default: return state;
    }
}