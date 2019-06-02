import * as actionTypes from '../constants/actionTypes';
import { Track } from '../models/Track';
import { Action } from 'redux';
import {setTracks} from '../actions/trackAction'

interface trackState {
    tracks: Track[];
};

const initialState: trackState = {
    tracks: new Array<Track>()
};

export default function (state: trackState = initialState, action: Action) {
    switch (action.type) {
        case actionTypes.TRACKS_SET:
            return {
                ...state,
                tracks: state.tracks
            };
    }
    return state;
}