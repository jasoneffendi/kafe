// async version with basic error handling
const { remote } = window.require('electron');
const fs = remote.require('fs')
const path = require('path');
const supported = [
    '.flac'
]

const songs = []

function walk(currentDirPath, callback) {
    fs.readdir(currentDirPath, function (err, files) {
        if (err) {
            throw new Error(err);
        }
        files.forEach(function (name) {
            var filePath = path.join(currentDirPath, name);
            var stat = fs.statSync(filePath);
            if (stat.isFile() && supported.includes(path.extname(filePath))) {
                // console.log(path.extname(filePath))
                callback(filePath, stat);
            } else if (stat.isDirectory()) {
                walk(filePath, callback);
            }
        });
    });
}

function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = path.join(dir, files[i]);
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else if (supported.includes(path.extname(name))){
            files_.push(name);
        }
    }
    return files_;
}

export default getFiles