import {findWhere, last} from './utils'
import program from './testProgram'
import {Stage} from './components.jsx'

const FPS = 24
const TICK_INTERVAL_MS = 1000 / FPS

const STAGE_ELEMENT = document.getElementById('stage')

const PROGRAM_STATE = {
  READY: 0,
  PLAYING: 1,
  IO: 2,
  PAUSED: 3
}

function makeUpdate (program) {
  let lastTime = Date.now()
  let thisTime = lastTime
  let frameNumber = 0
  let dT = 0

  function render () {
    ReactDOM.render(
      Stage(program, frameNumber), 
      STAGE_ELEMENT)
  }

  return function () {
    lastTime = thisTime
    thisTime = Date.now()
    dT = thisTime - lastTime

    if (frameNumber < program.activeSequence.duration) {
      frameNumber++
    } else {
      frameNumber = 0
      program.activeSequence = findNextSequence(program)   
    }
    requestAnimationFrame(render)
  }
}

// Program -> Sequence || Null
function findNextSequence (program) {
  let {variables, activeSequence} = program

  for (let connection of activeSequence.connections) {
    if (new Function('$', `return ${connection.expression}`)(variables)) {
      return findWhere('uuid', connection.sequenceUUID, program.sequences)
    }
  }
}

function * PlayAudio (audioAsset) {
  let done = false
  let sound = new Howl({
    src: audioAsset.src,
    onend: () => done = true
  })

  while (true) {
    if (done) break
    if (state === PROGRAM_STATE.PAUSED && sound.playing())   sound.pause()
    if (state === PROGRAM_STATE.PLAYING && !sound.playing()) sound.play()

    let state = yield
  }
}

class Sequence {
  constructor(uuid, name, duration, connections, assets) {
    this.name = name
    this.uuid = uuid
    this.duration = duration
    this.frameNumber = 0
    this.connections = connections
    this.assets = assets
  }
}

class Program {
  constructor(uuid, name, fps, sequences, variables) {
    this.uuid = uuid
    this.name = name
    this.fps = fps
    this.sequences = sequences
    this.variables = variables
    this.activeSequence = null
    this.state = PROGRAM_STATE.READY
  }
}

window.onload = function () {
  program.activeSequence = program.sequences[0]
  setInterval(makeUpdate(program), TICK_INTERVAL_MS)
  window.program = program
}
