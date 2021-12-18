const { spawn } = require('child_process')
const fs = require('fs')

const os = require("os")

const POSSIBLE_BLENDER_PATHS = {
  darwin: [
    '/Applications/Blender.app/Contents/MacOS/Blender',
    '/Applications/Blender-3.0.app/Contents/MacOS/Blender',
  ],
  win32: [
    `& 'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Blender\\blender.exe'`
    // others?
  ]
}


const BLENDER_EXE = POSSIBLE_BLENDER_PATHS[os.type().toLowerCase()].find( _ => {
  return fs.existsSync(_)
})

function renderStart( options = {}) {

    const beforeStart = options.beforeStart || function(){}
    const afterComplete = options.afterComplete || function(){}
    // const frameStart = options.frameStart || 1
    // const frameEnd = options.frameEnd || 10
    // const sourceFileName = options.sourceFileName
    const sourceFilePath = options.sourceFilePath
    const workspace = options.workspace


    beforeStart(options)


    function render() {
      const command = `${BLENDER_EXE} -b ${sourceFilePath} -E CYCLES -o //${workspace}/ -a`

      console.log(command)
      const renderJob = spawn(command, {shell: true})

      renderJob.stdout.on('data', (data) => {
        const output = data.toString()
        console.log(output)
      })

      renderJob.stderr.on('data', (data) => {
        console.error(data)
      })

      renderJob.on('close', (code) => {
        afterComplete(code)
      })
    }

    function config() {
      const command = `${BLENDER_EXE} -b ${sourceFilePath}  --python prerender-config.py`

      console.log(command)
      const configJob = spawn(command, {shell: true})

      configJob.stdout.on('data', (data) => {
        const output = data.toString()
        console.log(output)
      })

      configJob.stderr.on('data', (data) => {
        console.error(data)
      })

      configJob.on('close', (code) => {
        render()
      })
    }



    config()

}

// run({
//     frameStart: 40,
//     frameEnd: 41,
//     beforeStart: command => {
//         console.log(command)
//     },
//     afterComplete: code => {
//         console.log(`child process exited with code ${code}`);
//     }
// })

module.exports = renderStart