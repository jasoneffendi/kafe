const fs = require('fs')
const mmd = require('music-metadata')

function loadFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) reject(err)
      mmd.parseFile(filePath, {
        native: true, skipCovers: true, fileSize: stats.size, duration: true
      })
        .then(metadata => {
          resolve(metadata)
        })
        .catch(err => {
          reject(err)
        })
    })
  })
}
