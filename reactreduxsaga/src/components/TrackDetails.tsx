import React, { Component } from "react";
import { Track } from "../models/Track";

interface Props {
    currentTrack: Track;
}

interface State {
}

class TrackDetailsComponent extends Component<Props, State>{

    render() {
        return (
            <div className="container">
                <img src={this.props.currentTrack.albumCover}></img>
                <div className="trackDetails">
                    <h1>{this.props.currentTrack.trackTitle}</h1>
                    <h2>{this.props.currentTrack.trackArtist}</h2>
                    <h3>{this.props.currentTrack.albumName}</h3>
                </div>
            </div>
        )
    }
}

export default TrackDetailsComponent;