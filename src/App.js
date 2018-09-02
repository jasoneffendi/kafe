import React, { Component } from 'react';
// import electron from 'electron'
import walk from './walk'
import path from 'path'
import logo from './logo.svg';
import './App.css';
const { remote } = window.require('electron');
const fs = remote.require('fs')
const dialog = remote.dialog

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      src: ''
    }
  }

  componentDidMount() {
    var player = document.getElementById('audio');
    var progressBar = document.getElementById('seekbar');
    var seekslider = document.getElementById("seekslider");
    player.addEventListener("timeupdate", function() {
      var currentTime = player.currentTime;
      var duration = player.duration;
      progressBar.value = (currentTime/duration || 0)
      seekslider.value = (currentTime/duration || 0) * 100
    });
  }

  seek(){
    var audio = document.getElementById('audio');
    var seekslider = document.getElementById("seekslider");
    var seekto = audio.duration * (seekslider.value / 100);
    audio.currentTime = seekto;
  }

  handleClick() {
    dialog.showOpenDialog({
      properties: ['openDirectory']
    }, (result) => {
      var songs = walk(result[0])
      // console.log(songs)
      fs.readFile(songs[0], (err, data) => {
        this.setState({
          src: URL.createObjectURL(new Blob([data], {type: "audio/*"}))
        })
      });
    })
  }

  render() {
    return (
      <div className="App">
        <progress id="seekbar" value="0" max="1" style={{width: '20%'}}></progress><br/>
        <input
          id="seekslider"
          type="range"
          min="0"
          max="100"
          defaultValue="0"
          step="1"
          onInput={(e) => this.seek(e)}
        >
        </input><br/>
        <button onClick={() => this.handleClick()}>
          Load Files
        </button><br/>
        <audio
          id="audio"
          controls
          onTimeUpdate={() => this.timeUpdate()}
          src={this.state.src}>
          Your browser does not support the <code>audio</code> element.
        </audio><br/>
      </div>
    );
  }
}

export default App;
