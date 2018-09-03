import React, { Component } from 'react'
// import electron from 'electron'
import jsmediatags from 'jsmediatags'
import walk from '../helpers//walk'
import path from 'path'

const { remote } = window.require('electron')
const fs = remote.require('fs')
const dialog = remote.dialog

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      src: '',
      seeking: false
    }
  }

  componentDidMount () {
    var audio = document.getElementById('audio')
    var seekslider = document.getElementById('seekslider')
    audio.addEventListener('timeupdate', () => {
      var currentTime = audio.currentTime
      var duration = audio.duration
      seekslider.value = currentTime
    })
    audio.addEventListener('loadeddata', () => {
      seekslider.max = audio.duration
    })
    audio.addEventListener('loadedmetadata', (e) => {
      console.log(e)
      console.log('loaded metadata')
    })
  }

  seek () {
    var audio = document.getElementById('audio')
    var seekslider = document.getElementById('seekslider')
    var seekto = seekslider.value
    audio.currentTime = seekto
  }

  handleClick () {
    dialog.showOpenDialog({
      properties: ['openDirectory']
    }, (result) => {
      if (result === undefined) return
      var songs = walk(result[0])
      console.log(songs)
      fs.readFile(songs[32], (err, data) => {
        var extension = path.extname(songs[32])
        var lrcPath = songs[32].replace(extension, '.lrc')
        console.log(lrcPath)
        var file = path.basename(songs[32], extension)
        // replace extension with .lrc
        console.log(file)
        const audioBlob = new Blob([data], {type: 'audio/*'})
        // From remote host
        jsmediatags.read(audioBlob, {
          onSuccess: function (tag) {
            console.log(tag)
          },
          onError: function (error) {
            console.log(error)
          }
        })
        this.setState({
          src: URL.createObjectURL(audioBlob)
        })
      })
    })
  }

  render () {
    return (
      <div className='App'>
        <input
          id='seekslider'
          type='range'
          min='0'
          max='0'
          defaultValue='0'
          step='1'
          style={{width: '50%'}}
          onChange={(e) => this.seek(e)}
        /><br />
        <button onClick={() => this.handleClick()}>
          Load Files
        </button><br />
        <audio
          id='audio'
          controls
          src={this.state.src}>
          Your browser does not support the <code>audio</code> element.
        </audio><br />
      </div>
    )
  }
}

export default App
