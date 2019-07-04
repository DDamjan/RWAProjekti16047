import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Track } from "../models/Track";
import { User } from "../models/user";
import { Playlist } from "../models/playlist";
import TrackDetailsComponent from "./TrackDetails";
import ReactMediaVisualizer from 'react-media-visualizer'

interface Props {
    track: Track;
    currentUser: User;
    playlist: Playlist;
}

interface State {
    playlistPlaying: boolean;
    currentTrackIndex: number;
}

class PlayerComponent extends Component<Props, State>{
    constructor(props: Props) {
        super(props);

        this.state = {
            playlistPlaying: true,
            currentTrackIndex: 0
        }
    }

    render() {
        return (
            <div className="container">
                <div className="title">
                    <Link to="/"><h1>Reduxed player</h1></Link>
                    <Link to="/logout">Log out</Link>
                </div>
                <div className="Playlist-bar">
                    <h3>{this.props.playlist.name}</h3>
                </div>
                <div className="Player-container">
                    <div className="player">
                        <TrackDetailsComponent currentTrack={this.props.playlist.tracks[0]} />
                    </div>
                    <div className="queue">
                        <ol>
                            {
                                () => {
                                    this.props.playlist.tracks.map(track => {
                                        return (<li>{track.trackTitle} - {track.albumName}</li>);
                                    })
                                }
                            }
                        </ol>
                    </div>
                </div>
                <ReactMediaVisualizer
                    playlist={this.props.playlist.trackURLs}
                    receiveStateUpdates={this.receiveStateUpdates}
                    playlistIsPlaying={this.state.playlistPlaying}
                    theme={'spotify'}
                    currentSongIndex={this.state.currentTrackIndex} />
            </div>
        )
    }

    receiveStateUpdates(payload) {
        this.setState = payload;
    }
}

export default PlayerComponent;