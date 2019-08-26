import React, { Component } from "react";
import { Track } from "../models/Track";

interface Props {
    track: Track;
}

interface State {
}

class TrackDetailsComponent extends Component<Props, State>{

    render() {
        return (
            <div className="container">
                <img src={this.props.track.albumCover}></img>
                <div className="trackDetails">
                    <h1>{this.props.track.trackTitle}</h1>
                    <h2>{this.props.track.trackArtist}</h2>
                    <h3>{this.props.track.albumName}</h3>
                </div>
            </div>
        )
    }
}

export default TrackDetailsComponent;