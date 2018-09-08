// function promiseAllP (filePaths, block) {
//   var promises = []
//   filePaths.forEach(function (filePath, index) {
//     promises.push(function (filePath, i) {
//       return new Promise(function (resolve, reject) {
//         return block.apply(this, [filePath, index, resolve, reject]);
//       })
//     }(filePath, index))
//   })
//   return Promise.all(promises)
// }

// function readFiles (dirname) {
//   return new Promise((resolve, reject) => {
//     fs.readdir(dirname, function (err, filenames) {
//       if (err) return reject(err)
//       promiseAllP(filenames,
//       // function to be excecuted in promise (block)
//         async (filePath, index, resolve, reject) => {
//           filePath = path.join(dirname, filePath)
//           let fileStat = fs.statSync(filePath)
//           if (fileStat.isDirectory()) {
//             console.log(filePath, 'directory')
//             return resolve({filePath: filePath})
//           } else {
//             console.log(filePath, 'file')
//             // fs.readFile(path.resolve(dirname, filePath), 'utf-8', function (err, content) {
//             //   if (err) return reject(err)
//             //   return resolve({filePath: filePath})
//             // })
//             if (supported.includes(path.extname(filePath))) {
//               // const data = await mmd.parseFile(filePath, {
//               //   native: true, skipCovers: true, fileSize: fileStat.size, duration: true
//               // })
//               // console.log(data)
//               console.log(await window.loadFile(filePath))
//               return resolve({filePath: filePath})
//             } else {
//               return resolve({filePath: ''})
//             }
//           }
//         })
//         .then(results => {
//           return resolve(results)
//         })
//         .catch(error => {
//           return reject(error)
//         })
//     })
//   })
// }