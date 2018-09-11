const { remote } = window.require('electron')
const jsmediatags = require('jsmediatags')
const path = require('path')
const walk = require('./walk')

const fs = remote.require('fs')
const dialog = remote.dialog

exports openDialog = () => {
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
      console.log(audioBlob)
      console.log(URL.createObjectURL(audioBlob))
      this.setState({
        src: URL.createObjectURL(audioBlob)
      })
    })
  })
}
