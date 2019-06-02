import React, { Component } from "react";
import { Track } from "../models/Track";

interface Props{
    Tracks: Track[];
}

interface State{

}

class StreamComponent extends Component<Props, State>{
    constructor(props: Props){
        super(props);
    }
    
    render(){
        return (
            <div>
                {
                    this.props.Tracks.map((track, key)=>{
                        return <div className="track" key={key}>{track.trackId}</div>
                    })
                }
            </div>
        )
    }
}

export default StreamComponent;