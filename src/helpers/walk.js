// async version with basic error handling
const { remote } = window.require('electron')
const fs = remote.require('fs')
const path = require('path')
const supported = [
  // MP3 / MP4
  '.mp3',
  '.mp4',
  '.aac',
  '.m4a',
  '.3gp',
  '.wav',

  // Opus
  '.ogg',
  '.ogv',
  '.ogm',
  '.opus',

  // Flac
  '.flac'
]

async function getFiles (dir, files_) {
  files_ = files_ || []
  var files = fs.readdirSync(dir)
  for (var i in files) {
    var filePath = path.join(dir, files[i])
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, files_)
    } else if (supported.includes(path.extname(filePath))) {
      let extension = path.extname(filePath)
      let lrcPath = filePath.replace(extension, '.lrc')
      let metadata = await window.loadFile(filePath)
      let { common, format } = metadata
      files_.push({key: filePath, path: filePath, lyricPath: lrcPath, ...common, ...format})
    }
  }
  return files_
}

export default getFiles
