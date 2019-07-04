import { Track } from "./Track";

export interface Playlist{
    ID: number;
    name: string;
    ownerID: number;
    tracks: Track[];
    trackURLs: string[];
}