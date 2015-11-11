import {v4 as uuid} from 'node-uuid'
import {pp, log, clone, extend, find, findWhere, removeChildren} from './utils'
import programSchema from './programSchema'

const FPS = 24
const TICK_INTERVAL_MS = 1000 / FPS

const STAGE_ELEMENT = document.getElementById('stage')
const TOGGLE_BUTTON = document.getElementById('toggle')

const PROGRAM_STATE = {
  LOADING: 0,
  READY: 1,
  PLAYING: 2,
  PAUSED: 3,
  DONE: 4
}

function makeUpdate (program) {
  let lastTime = Date.now()
  let thisTime = lastTime
  let dT = 0

  return function () {
    lastTime = thisTime
    thisTime = Date.now()
    dT = thisTime - lastTime

    //TODO: check that dT is in valid range for "normal tick"
    if (program.activeSequence) {
      if (program.activeSequence.tasks.next(program.state).done) {
        let targetSequence = program.activeSequence.findNext(program.variables)
        if (targetSequence) program.startSequence(targetSequence) 
        else                program.state = PROGRAM_STATE.DONE
      }
    }
  }
}

function * Parallel (tasks) {
  while (tasks.length) {
    let state = yield

    for (let task of tasks) {
      if (task.next(state).done) {
        tasks.splice(tasks.indexOf(task), 1)
      }
    } 
  }
}

function * Serial (tasks) {
  while (tasks.length) {
    let state = yield

    if (tasks[0].next(state).done) tasks.shift()
  }
}

function * Wait (duration) {
  let elapsed = 0 

  while (elapsed < duration) {
    let state = yield

    if (state === PROGRAM_STATE.PLAYING) elapsed++
  }
}

function * FadeIn (domAsset) {
  let elapsed = 0
  let duration = 12
  let classAdded = false

  while (elapsed < duration) {
    let state = yield

    if (state === PROGRAM_STATE.PLAYING) {
      if (!classAdded) {
        domAsset.element.classList.add('active')
        classAdded = true
      }
      elapsed++
    }
  }
}

function * FadeOut (domAsset) {
  let remaining = 12
  let classRemoved = false

  while (remaining > 0) {
    let state = yield

    if (state === PROGRAM_STATE.PLAYING) {
      if (!classRemoved) {
        domAsset.element.classList.remove('active')
        classRemoved = true
      }
      remaining--
    }
  }
}

//Asset should possibly have pointer to parent directly?
//parent would likely differ for each asset anyway...
function * Insert (assets) {
  for (let asset of assets) {
    asset.parent.element.appendChild(asset.element)
  }
}

//Asset should possibly have pointer to parent directly?
//parent would likely differ for each asset anyway...
function * Remove (assets) {
  for (let asset of assets) {
    asset.parent.element.removeChild(asset.element)
  }
}

function * IO (domAsset) {
  let done = false  
  let listener = domAsset.element.addEventListener('click', () => done = true)

  while (!done) yield
  domAsset.element.removeEventListener(listener)
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

class Connection {
  constructor({expression, sequenceUUID}) {
    this.expression = new Function('$', `return ${expression}`) 
    this.sequenceUUID = sequenceUUID
  }
}

class Sequence {
  constructor({uuid, name, assetSchemas, taskSchemas, connectionSchemas}) {
    this.name = name
    this.uuid = uuid
    this.assets = assetSchemas.map(Asset.fromSchema)
    this.tasks = Wait(24)
    this.connections = connectionSchemas.map(s => new Connection(s))
  }

  findNext(variables) {
    let connection = find(({expression}) => expression(variables), this.connections)

    return connection ? connection.sequenceUUID : null
  }
}

class Program {
  constructor(programSchema) {
    this.name = programSchema.name
    this.uuid = programSchema.uuid
    this.state = PROGRAM_STATE.READY
    this.activeSequence = null
    this.schema = programSchema
    this.variables = this.schema.variableSchemas.reduce((map, variableSchema) => {
      map[variableSchema.name] = variableSchema.value
      return map
    }, {})
  }

  startSequence(uuid) {
    const sequenceSchema = findWhere('uuid', uuid, this.schema.sequenceSchemas)

    if (!sequenceSchema) throw new Error(`No schema named ${name} was found`)

    this.activeSequence = new Sequence(sequenceSchema)
    this.state = PROGRAM_STATE.PLAYING
    removeChildren(STAGE_ELEMENT)
    console.log(`Starting: ${this.activeSequence.name}`)
  }
}

//TODO: really not a fan of the "asset" class for opacity.  Consider ditching CSS...
const Asset = {
  fromSchema(assetSchema) {
    switch (assetSchema.type) {
      case 'stage':     return new Asset.Stage(assetSchema)
      case 'container': return new Asset.Container(assetSchema)
      case 'image':     return new Asset.Image(assetSchema)
      case 'text':      return new Asset.Text(assetSchema)
      case 'audio':     return new Asset.Audio(assetSchema)
      default:          return new Asset.Unknown(assetSchema)
    }
  },

  Stage({style}) {
    this.element = STAGE_ELEMENT
    this.uuid = 'stage'
    extend(this.element.style, style)
  },

  Container({uuid, parentUUID, tag, text, style}) {
    this.uuid = uuid
    this.parentUUID = parentUUID 
    this.element = document.createElement(tag)
    this.element.classList.add('asset')
    this.element.innerText = text
    extend(this.element.style, style)
  },

  Image({uuid, parentUUID, src, style}) {
    this.uuid = uuid
    this.parentUUID = parentUUID
    this.element = new Image
    this.element.src = src
    this.element.classList.add('asset')
    extend(this.element.style, style)
  },

  Text({uuid, parentUUID, tag, text, style}) {
    this.uuid = uuid
    this.parentUUID = parentUUID
    this.element = document.createElement(tag) 
    this.element.innerText = text
    this.element.classList.add('asset')
    extend(this.element.style, style)
  },

  Audio({uuid, src}) {
    this.uuid = uuid
    this.src = src
  },

  Unknown(schema) {
    this.uuid = schema.uuid
    this.schema = schema 
  }
}

const program = new Program(programSchema)

program.startSequence('intro')
setInterval(makeUpdate(program), TICK_INTERVAL_MS)
toggle.addEventListener('click', function () {
  if      (program.state === PROGRAM_STATE.PLAYING) program.state = PROGRAM_STATE.PAUSED
  else if (program.state === PROGRAM_STATE.PAUSED)  program.state = PROGRAM_STATE.PLAYING
  else    {}
})
window.onblur = function () {
  if (program.state === PROGRAM_STATE.PLAYING) program.state = PROGRAM_STATE.PAUSED
}
window.program = program
