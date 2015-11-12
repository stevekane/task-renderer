import {findWhere, last} from './utils'
import program from './testProgram'
import {Stage} from './components.jsx'

const FPS = 24
const TICK_INTERVAL_MS = 1000 / FPS

const STAGE_ELEMENT = document.getElementById('stage')

const PROGRAM_STATE = {
  READY: 0,
  PLAYING: 1,
  SUSPEND: 2,
  PAUSED: 3
}

function makeUpdate (program) {
  let lastTime = Date.now()
  let thisTime = lastTime
  let frame = -1
  let dT = 0

  function render () {
    ReactDOM.render(Stage(program, frame), STAGE_ELEMENT)
  }

  return function () {
    lastTime = thisTime
    thisTime = Date.now()
    dT = thisTime - lastTime

    let {state, activeSequence} = program
    let {READY, PLAYING, SUSPEND, PAUSED} = PROGRAM_STATE

    if (!activeSequence) return

    switch (state) {
      case READY: break
      case SUSPEND: break
      case PAUSED: {
        pauseAudio(program)
        break
      }
      case PLAYING: {
        let sequenceDone = frame >= activeSequence.duration

        frame = sequenceDone 
          ? 0
          : frame + 1 
        program.activeSequence = sequenceDone 
          ? findNextSequence(program) 
          : program.activeSequence

        processAudio(program, frame)
        processActions(program, frame)
        requestAnimationFrame(render)
        break
      }
      default: throw new Error(`Player in invald state ${state}`)
    }
  }
}

//currently only handles a single action for a given frame
//unclear if this should be enforced or relaxed?
function processActions (program, frame) {
  let action = findWhere('frame', frame, program.activeSequence.actions)
  let {PLAYING, SUSPEND} = PROGRAM_STATE
  let cb = () => program.state = PLAYING

  if (!action) return

  program.state = SUSPEND
  switch (action.type) {
    case 'click':  {
      click(program.activeSequence, action.assetUUID, cb)
      break
    }
    case 'choice': {
      choice(program, action.variableName, action.choices, cb)
      break
    }
    default: cb()
  }
}


function pauseAudio (program, frame) {

}

function processAudio (program, frame) {

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

function click (sequence, assetUUID, cb) {
  let asset = findWhere('uuid', assetUUID, sequence.assets)

  if (!asset) throw new Error(`no asset found with uuid ${assetUUID}`)

  asset.onClick = function () { 
    asset.onClick = null
    cb()
  }
}

function choice (program, variableName, choices, cb) {
  let variable = program.variables[variableName]
  let sequence = program.activeSequence

  if (!variable) throw new Error(`no variable named ${variableName}`)
  if (!sequence) throw new Error(`no active sequence`)

  let clickCb = (value) => {
    for (let {assetUUID, value} of choices) {
      let asset = findWhere('uuid', assetUUID, sequence.assets)

      if (!asset) throw new Error(`no asset found with uuid ${assetUUID}`)

      asset.onClick = null
    }
    variable.value = value
    cb()
  }

  for (let {assetUUID, value} of choices) {
    let asset = findWhere('uuid', assetUUID, sequence.assets)

    if (!asset) throw new Error(`no asset found with uuid ${assetUUID}`)

    asset.onClick = clickCb.bind(null, value)
  }
}

class Sequence {
  constructor(uuid, name, duration, actions, connections, assets) {
    this.name = name
    this.uuid = uuid
    this.duration = duration
    this.frameNumber = 0
    this.actions = actions
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
  program.state = PROGRAM_STATE.PLAYING
  setInterval(makeUpdate(program), TICK_INTERVAL_MS)
  window.program = program
}
