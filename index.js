import {v4 as uuid} from 'node-uuid'
import {pp, log, clone, extend, find, findWhere} from './utils'
import programSchema from './programSchema'

const TICK_RATE = 24
const STAGE_ELEMENT = document.body

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
  console.log(`waited: ${elapsed}`)
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

function * Insert (parent, domAsset) {
  parent.element.appendChild(domAsset.element)
}

function * Remove (parent, domAsset) {
  parent.element.removeChild(domAsset.element)
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
    this.tasks = Serial([
      Wait(48), 
      Parallel([
        PlayAudio(findWhere('uuid', '456', this.assets)),
        Serial([
          Insert(findWhere('uuid', 'stage', this.assets), findWhere('uuid', '123', this.assets)),
          FadeIn(findWhere('uuid', '123', this.assets))
        ])
      ])
    ])
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
  }
}

//TODO: really not a fan of the "asset" class for opacity.  Consider ditching CSS...
const Asset = {
  fromSchema(assetSchema) {
    switch (assetSchema.type) {
      case 'stage': return new Asset.Stage(assetSchema)
      case 'image': return new Asset.Image(assetSchema)
      case 'audio': return new Asset.Audio(assetSchema)
      case 'text':  return new Asset.Text(assetSchema)
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
    this.element.classList.add('asset')
    extend(this.element.style, style)
  },

  Text({uuid, tag, text, style}) {
    this.uuid = uuid
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

program.startSequence('abc')
window.program = program
setInterval(makeUpdate(program), TICK_RATE)
