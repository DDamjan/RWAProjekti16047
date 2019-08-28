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
                <img src={this.props.track.AlbumCover}></img>
                <div className="trackDetails">
                    <h1>{this.props.track.Title}</h1>
                    <h2>{this.props.track.Artist}</h2>
                    <h3>{this.props.track.Album}</h3>
                </div>
            </div>
        )
    }
}

export default TrackDetailsComponent;