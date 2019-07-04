import React, { Component } from "react";
import { Playlist } from "../models/playlist";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Track } from "../models/Track";

interface Props {
    track: Track;
}

interface State {
}

class TrackComponent extends Component<Props, State>{

    render() {
        return (
            <Card>
                <Card.Body>
                    <Card.Img variant="top" src={this.props.track.albumCover} />
                    <Card.Title>
                        {this.props.track.trackTitle} - {this.props.track.trackArtist}
                        <Link to={"/track/" + this.props.track.ID}><i className="fas fa-play-circle"></i></Link>
                        <a onClick={this.deleteTrack}><i className="fas fa-trash-alt"></i></a>
                    </Card.Title>
                    <Card.Text>
                        {this.props.track.albumName}
                        Duration: {this.props.track.trackDuration}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }

    deleteTrack() {

    }
}

export default TrackComponent;