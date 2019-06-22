import { createStore } from 'redux';
import rootReducer from '../reducers/index';
import { Track } from '../models/Track';

export interface RootState{
    tracks: Track[];
}

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState);
}