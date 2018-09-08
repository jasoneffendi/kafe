import walk from './walk'
const { remote } = window.require('electron')
// const jsmediatags = require('jsmediatags')
// const path = require('path')

const fs = remote.require('fs')
const dialog = remote.dialog

export function openDialog (callback) {
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }, async (result) => {
    if (result === undefined) callback(songs)
    let songs = walk(result[0])
    callback(songs)
  })
}
