import * as actionTypes from '../constants/actionTypes';
import { Track } from '../models/Track';
import { Action } from 'redux';

export interface setTracks extends Action{
  tracks: Track [];
}

export function setTracks(tracks: Track[]) {
  return {
    type: actionTypes.TRACKS_SET,
    tracks
  };
};