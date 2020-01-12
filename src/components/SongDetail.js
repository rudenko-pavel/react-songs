import React, { Component } from 'react';
import { connect } from 'react-redux';


import './scss/SongDetail.scss';


const SongDetail=({song}) =>{
    console.log("SongDetail:", song);
    if (!song){ return  <div>Select a song...</div>}
    return(
        <div>
            <h3>Details for:</h3>
            <p>Title: {song.title}</p>
            <p>Duration: {song.duration}</p>
            
        </div>
    );
}

const mapStateToProps = (state) => {
    console.log("SongDetail->mapStateToProps: ",state);
    return {song: state.selectedSong};
}

export default connect(mapStateToProps)(SongDetail);