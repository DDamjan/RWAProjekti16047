import React, { Component } from "react";
import { Playlist } from "../models/playlist";
import { Link } from "react-router-dom";
import { CardDeck } from "react-bootstrap";
import TrackComponent from "./TrackComponent";

interface Props{
    currentPlaylist: Playlist;
}

interface State{

}

class PlaylistDetailsComponent extends Component<Props, State>{
    render(){
        return(
            <div className="container">
                <div className="title">
                    <Link to="/"><h1>Reduxed player</h1></Link>
                    <Link to="/logout">Log out</Link>
                </div>
                <div className="addPlaylist">
                    <h3>Playlists</h3>
                    <form onSubmit={this.addSong}>
                        <input type='text' name='playlistName'>Search for a song</input>
                        <button>
                            <i className="fas fa-plus"></i>
                            Add a song
                        </button>
                    </form>
                </div>
                <div className="PlaylistGrid">
                    <CardDeck>
                        {
                            () => {
                                this.props.currentPlaylist.tracks.forEach(track=>{
                                    <TrackComponent track={track}/>
                                })
                            }
                        }
                    </CardDeck>

                </div>
            </div>
        )
    }

    addSong(){

    }
}