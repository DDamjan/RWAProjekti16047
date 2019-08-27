/* eslint-disable no-unused-expressions */

import React, { Component } from "react";
import { Playlist } from "../models/playlist";
import { Link, Redirect } from "react-router-dom";
import TrackComponent from "./TrackComponent";
import { Form, Button } from "react-bootstrap";
import { Grid } from "@material-ui/core";
import { Track } from "../models/Track";
import Cookies from "universal-cookie";
import { searchTracks } from "../service/deezerService";
import TrackDetailsComponent from "./TrackDetailsComponent";
import { connect } from "react-redux";
import { Dispatch, Action } from "redux";
import { addTrack, currentPlaylist } from "../store/actions/playlistActions";
import { AppState } from "../store/store";
import '../style/home.css';

interface Props {
    currentPlaylist: Playlist;
    match: any;
    fetchPlaylist: (ID: number) => void;
    addTrack: (track: Track, playlistID: number) => void;
}

interface State {
    trackName: string;
    redirect: boolean
}


class PlaylistDetailsComponent extends Component<Props, any>{

    constructor(props: Props) {
        super(props);
        this.state = {
            trackName: "",
            redirect: false
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchPlaylist(id);

    }

    renderRedirect() {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }

    render() {
        return (
            <div className="container">
                <div className="title">
                    {this.renderRedirect()}
                    <Link to="/" style={{ textDecoration: 'none', color: 'white' }}><h1>Reduxed player</h1></Link>
                    <p onClick={this.logout.bind(this)}><Link to="/login" style={{ cursor: 'pointer', color: 'white' }}>Log out</Link></p>
                </div>
                <div className="addPlaylist">
                    <div className="playlist-container">
                        <h3>Playlists</h3>
                    </div>
                    <div className="form-container">
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <Form.Group controlId="playlistName"  >
                                <Form.Control
                                    type='text'
                                    placeholder="Track name"
                                    autoFocus
                                    value={this.state.trackName}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Button
                                block
                                disabled={!this.validateForm()}
                                type="submit"
                            >
                                Add playlist
                            </Button>
                        </Form>
                    </div>
                </div>
                <div className="PlaylistGrid">
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                    >
                        {this.renderCards()}
                    </Grid>

                </div>
            </div>
        )
    }

    logout() {
        const cookies = new Cookies();
        cookies.remove('logedIn');
    }

    handleSubmit(event: any) {
        event.preventDefault();
        searchTracks(this.state.trackName);
    }

    handleChange = (event: any) => {
        this.setState({
            trackName: event.target.value
        });
    }

    validateForm() {
        return this.state.trackName.length > 0;
    }

    renderCards() {
        if (this.props.currentPlaylist != undefined) {
            return this.props.currentPlaylist.tracks.map(track => {
                return (<TrackDetailsComponent track={track} key={track.ID} />)
            })
        }
        return null;
    }

    addSong() {

    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
    return {
        fetchPlaylist: (ID: number) => dispatch(currentPlaylist(ID)),
        addTrack: (payload: Track, playlistID: number) => dispatch(addTrack(payload, playlistID))
    }
}
function mapStateToProps(state: AppState) {
    return {
        currentPlaylist: state.currentPlaylist
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (PlaylistDetailsComponent);