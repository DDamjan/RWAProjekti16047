/* eslint-disable no-unused-expressions */

import { User } from "../models/user";
import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import { CardDeck, Form, Button } from "react-bootstrap";
import PlaylistComponent from "./PlaylistComponent";
import { Dispatch, Action } from "redux";
import { AppState } from "../store/store";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import { getUserByID } from "../store/actions/userActions";
import '../style/home.css'
import { Playlist } from "../models/playlist";
import { addPlaylist } from "../store/actions/playlistActions";

interface Props {
    currentUser: any;
    fetchUser: (ID: number) => void;
    addPlaylist: (playlist: Playlist) => void;
}

interface State {
    playlistName: string;
}

class HomeComponent extends Component<Props, any>{

    constructor(props: Props) {
        super(props);
        this.state = {
            playlistName: "",
            redirect: false
        }
    }
    componentDidMount = () => {

        const cookies = new Cookies();
        let id = cookies.get('logedIn');

        this.props.fetchUser(id);

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
                    {this.renderRedirect}
                    <Link to="/" style={{ textDecoration: 'none', color: 'white' }}><h1>Reduxed player</h1></Link>
                    {this.renderName()}
                    <p style={{ cursor: 'pointer', color: 'white' }} onClick={this.logout.bind(this)}>Log out</p>
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
                                    placeholder="Playlist name"
                                    autoFocus
                                    value={this.state.playlistName}
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
                    <CardDeck>
                        {this.renderCards()}
                    </CardDeck>

                </div>
            </div>
        )
    }

    renderName() {
        if (this.props.currentUser.user !== undefined) return (<h3>Welcome {this.props.currentUser.user.Username}</h3>);
    }

    renderCards() {
        const cards = [];
        if (this.props.currentUser.user !== undefined)
            this.props.currentUser.user.playlists.forEach(playlist => {
                cards.push(<PlaylistComponent playList={playlist} />)
            })
        return cards;
    }

    validateForm() {
        return this.state.playlistName.length > 0;
    }

    handleChange = (event: any) => {
        this.setState({
            playlistName: event.target.value
        });
    }

    handleSubmit(event: any) {
        event.preventDefault();
        const playlist: Playlist = {
            name: this.state.playlistName,
            ownerID: this.props.currentUser.user.ID,
            trackURLs: [],
            tracks: [],
            ID: this.props.currentUser.user.playlists[this.props.currentUser.user.playlists.length-1].ID + 1
        }
        this.props.currentUser.user.playlists.push(playlist);

        this.props.addPlaylist(playlist);
        this.forceUpdate();
    }

    logout(){
        const cookies = new Cookies();
        cookies.remove('logedIn');
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
    return {
        fetchUser: (ID: number) => dispatch(getUserByID(ID)),
        addPlaylist: (playlist: Playlist) => dispatch(addPlaylist(playlist))
    }
}
function mapStateToProps(state: AppState) {
    return {
        currentUser: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);