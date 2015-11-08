import {v4 as uuid} from 'node-uuid'
import {pp, log, clone, extend, find} from './utils'
import programSchema from './programSchema'

const TICK_RATE = 24
const STAGE_ELEMENT = document.body

const PROGRAM_STATE = {
  LOADING: 0,
  PLAYING: 1,
  PAUSED: 2,
  DONE: 3
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
      if (program.activeSequence.next(program.state).done()) {
        let targetSequence = program.activeState


      }
    }
  }
}

function * Parallel (tasks) {
  let time = 0
  let dT = 0

  while (tasks.length) {
    dT = yield
    time += dT
    for (let task of tasks) {
      if (task.next(dT).done) {
        tasks.splice(tasks.indexOf(task), 1)
      }
    } 
  }
}

function * Serial (tasks) {
  let time = 0
  let dT = 0

  while (tasks.length) {
    dT = yield
    time += dT
    if (tasks[0].next(dT).done) tasks.shift()
  }
}

function * Wait (duration) {
  let elapsed = 0 
  let dT = 0

  while (elapsed < duration) {
    dT = yield
    elapsed += dT 
  }
  console.log(`waited: ${elapsed}`)
}

function * FadeIn (domAsset) {
  let elapsed = 0
  let duration = 12
  let dT = 0

  dT = yield
  elapsed += dT 
  domAsset.element.classList.add("active")

  while (elapsed < duration) {
    dT = yield
    elapsed += dT 
  }
}

function * FadeOut (domAsset) {
  let remaining = 12
  let dT = 0

  dT = yield
  remaining -= dT 
  domAsset.element.classList.remove("active")

  while (remaining > 0) {
    dT = yield
    remaining -= dT 
  }
}

function * Insert (parent, domAsset) {
  parent.element.appendChild(domAsset.element)
}

function * Remove (parent, domAsset) {
  parent.element.removeChild(domAsset.element)
}

function * Do (fn, ...params) {
  fn.apply(null, params)
}

function * IO (domAsset) {
  let done = false  
  let listener = domAsset.element.addEventListener('click', () => done = true)

  console.log('please interact with the page')
  while (!done) yield

  console.log('thanks for your participation')
  domAsset.element.removeEventListener(listener)
}

function * PlayAudio (audioAsset) {
  let done = false
  let sound = new Howl({
    src: audioAsset.src,
    onend: () => done = true
  })

  sound.play()
  while (!done) yield
  console.log('audio completed')
}

class Connection {
  constructor({expression, sequenceUUID}) {
    this.expression = new Function('$', expression) 
    this.sequenceUUID = sequenceUUID
  }
}

class Sequence {
  constructor({uuid, name, assetSchemas, taskSchemas, connectionSchemas}) {
    this.name = name
    this.uuid = uuid
    this.assets = assetSchemas.map(Asset.fromSchema)
    this.tasks = Wait(48)
    this.connections = connectionSchemas.map(s => new Connection(s))
  }

  findNext(variables) {
    let connection = find(({expression}) => expression(variables))

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

  startSequence(name) {
    const sequenceSchema = this.schema.sequenceSchemas[name] 

    if (!schema) throw new Error(`No schema named ${name} was found`)

    this.activeSequence = new Sequence(assets, tasks)
    this.state = PROGRAM_STATE.READY
  }

  update(dT) {
    if (!this.activeSequence) return
    this.activeSequence.tasks.next(dT)
  }
}

const Asset = {
  fromSchema(assetSchema) {
    switch (assetSchema.type) {
      case 'stage': return new Asset.Stage(assetSchema)
      case 'image': return new Asset.Image(assetSchema)
      case 'audio': return new Asset.Audio(assetSchema)
      case 'text':  return new Asst.Text(assetSchema)
      default:      return new Asset.Unknown(assetSchema)
    }
  },

  Stage({style}) {
    this.element = STAGE_ELEMENT
    this.uuid = 'stage'
    extend(this.element.style, style)
  },

  Image({uuid, src, style}) {
    this.uuid = uuid
    this.element = new Image
    this.element.src = src
    extend(this.element.style, style)
  },

  Text({uuid, tag, text, style}) {
    this.uuid = uuid
    this.element = document.createElement(tag) 
    this.element.innerText = text
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

window.program = program
setInterval(makeUpdate(program), TICK_RATE)
