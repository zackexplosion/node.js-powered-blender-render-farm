const fs = require('fs')
const path = require('path')
const renderStart = require('./render-start')

const WATCH_DIR = './tmp'
const WATCH_EXT = '.blend'

function watcher() {
  const list = fs.readdirSync(WATCH_DIR).filter(_ => _.includes(WATCH_EXT))

  list.forEach(_ => {
    const dirName = path.basename(_, path.extname(_))
    const dirPath = path.join(WATCH_DIR, dirName)
    if(!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath)
      renderStart({
        sourceFileName: _,
        sourceFilePath: path.resolve(WATCH_DIR, _),
        workspace: dirName,
        beforeStart: command => {
          console.log(command)
        },
        afterComplete: code => {
          console.log(`child process exited with code ${code}`);
        }
      })
    }
  })

  setTimeout(() => {
    watcher()
  }, 1000)
}
watcher()