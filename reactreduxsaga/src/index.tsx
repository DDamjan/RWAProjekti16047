import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './stores/configureStore';
import * as actions from './actions';

import StreamComponent from './components/StreamComponent';

const tracks = [
  {
    trackId: 1
  },
  {
    trackId: 2
  }
];

const store = configureStore();
store.dispatch(actions.setTracks(tracks));

ReactDOM.render(
  <StreamComponent />,
  document.getElementById('root')
);
