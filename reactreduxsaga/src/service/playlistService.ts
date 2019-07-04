import { Playlist } from '../models/playlist';
import { Track } from '../models/Track';

const baseURL = 'http://localhost:8080/playlists/';

export function dbGetPlaylists(ID: number) {
    const url = baseURL + `?ID=${ID}`;

    return fetch(url).
        then(res => res.json());
}

export function dbAddPlaylist(playlist: Playlist) {
    const url = baseURL + "/addplaylist";

    return fetch(url, { method: "POST", body: JSON.stringify(playlist), headers: { "Content-Type": "application/json" } }).
        then(res=> res.json());
}

export function dbDeletePlaylist(ID: number) {
    const url = baseURL + "/delete";

    return fetch(url, { method: "POST", body: JSON.stringify(ID), headers: { "Content-Type": "application/json" } }).
        then(res=> res.json());
}

export function dbAddTrack(track: Track, trackID: number) {
    const url = baseURL + "/addTrack";
    const data = {
        track,
        trackID
    }

    return fetch(url, { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } }).
        then(res=> res.json());
}

export function dbRemoveTrack (track: Track, playlistID: number){
    const url = baseURL + "/removeTrack";
    const data = {
        track,
        playlistID
    }

    return fetch(url, { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } }).
        then(res=> res.json());
}