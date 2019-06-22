import React from 'react';
import PropTypes from 'prop-types';

const ReleaseDetails = props => (
  <table className="release-details">
    <img src={props.albumDetails.albumCover} alt="album-cover" />
    <h3>{props.albumDetails.albumTitle}</h3>
    <tr className="table-header-tr">
      <th className="empty-space"></th>
      <th>#</th>
      <th>Title</th>
      <th>Artist</th>
      <th>Time</th>
      <th className="release-column">Released</th>
    </tr>
    {
      props.albumDetails.albumTracks.map((track, index) => (
        <tr className="album-track-tr">
          <td className="empty-space"></td>
          <td className="td-with-underline track-no">{index + 1}</td>
          <td className="td-with-underline track-title">{track.trackTitle}</td>
          <td className="td-with-underline track-artist">{track.trackArtist}</td>
          <td className="td-with-underline track-duration">{track.trackDuration}</td>
          <td className="td-with-underline release-column">{props.albumDetails.albumRelease}</td>
        </tr>
      ))
    }
  </table>
);

export default ReleaseDetails;

ReleaseDetails.propTypes = {
  albumDetails: PropTypes.object,
};
