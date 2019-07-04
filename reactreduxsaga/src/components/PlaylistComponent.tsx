import React, { Component } from "react";
import { Playlist } from "../models/playlist";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Props {
    playList: Playlist;
}

interface State {
}

class PlaylistComponent extends Component<Props, State>{

    render() {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>
                        {this.props.playList.name}
                        <Link to={"/playlist/" + this.props.playList.ID}><i className="fas fa-play-circle"></i></Link>
                        <a onClick={this.deletePlaylist}><i className="fas fa-trash-alt"></i></a>
                    </Card.Title>
                    <Card.Text>
                        {
                            () => {
                                if (this.props.playList.tracks.length > 0) {
                                    return `'${this.props.playList.tracks[0].trackTitle}',${this.props.playList.tracks[1].trackTitle} and ${this.props.playList.tracks.length - 2} more`;
                                }
                                else {
                                    return 'No songs added';
                                }
                            }
                        }
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }

    deletePlaylist() {

    }
}

export default PlaylistComponent;