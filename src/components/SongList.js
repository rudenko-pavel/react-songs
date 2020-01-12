import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectSong } from '../actions';

import './scss/SongList.scss';

class SongList extends Component{
    renderList(){
        return this.props.songs.map((song, index)=>{
            return(
                <div className="item" key={index}>
                    <div className="right floated content">
                        <button 
                            className="ui primary button"
                            onClick={() => this.props.selectSong(song)}    
                        >
                            Select
                        </button>
                    </div>
                    <div className="content">{song.title}</div>
                </div>
            );
        });
    }

    render(){ // this props === {songs: state.songs}
    console.log("SongList->render(): ",this.props);
        return(
            <div className="ui divided list">
                {this.renderList()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("SongList->mapStateToProps: ",state);
    return {songs: state.songs};
}

export default connect(mapStateToProps, {
    selectSong : selectSong
})(SongList);