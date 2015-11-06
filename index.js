import {v4 as uuid} from 'node-uuid'
import {pp, log, clone} from './utils'
import programSchema from './programSchema'

const TICK_RATE = 24

function makeUpdate (app) {
  let lastTime = Date.now()
  let thisTime = lastTime
  let dT = 0

  return function () {
    lastTime = thisTime
    thisTime = Date.now()
    dT = thisTime - lastTime

    app.update(dT)
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
  let duration = 500
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
  let remaining = 500 
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

class Sequence {
  constructor(assets, tasks) {
    this.assets = assets
    this.tasks = tasks
  }
}

class Cache {
  constructor() {
    this.images = {}
    this.audio = {}
  }
}

class Program {
  constructor(schema) {
    let variables = {}

    this.cache = new Cache
    this.variables = {}

    for (let key in schema.variables) {
      Object.defineProperty(this.variables, key, {
        set: function (val) {
          variables[key] = val
          log('A variable has changed')
          pp(variables) 
        },
        get: function () {
          return variables[key]
        }
      })
      this.variables[key] = schema.variables[key].default
    }

    this.activeSequence = null
    this.schema = schema 
  }

  startSequence(name) {
    const schema = this.schema.sequences[name] 

    if (!schema) throw new Error(`No schema named ${name} was found`)

    let assets = {}
    for (let asset of schema.asset) {
      classifier:
      switch (asset.type) {
        case 'stage': {
          assets[asset.uuid] = new Stage(
            document.body, 
            clone(asset.style))
          break;
        }
        case 'text': {
          assets[asset.uuid] = new TextAsset(
            document.createElement(asset.tag),
            asset.text,
            clone(asset.style))
          break;
        } 
        case 'image': {
          assets[asset.uuid] = new ImageAsset(
            asset.src, clone(asset.style))
          break;
        }
        case 'audio': {
          assets[asset.uuid] = new AudioAsset(asset.src) 
          break;
        }
        default: throw new Error('Unrecognized asset type in schema')
      }
    }

    //TODO: temporary
    let tasks = Wait(2000)

    this.activeSequence = new Sequence(assets, tasks)
  }

  update(dT) {
    if (!this.activeSequence) return
    this.activeSequence.tasks.next(dT)
  }
}

class Asset {
  constructor(element) {
    this.uuid = uuid() 
  }
}

class DomAsset extends Asset {
  constructor(element, innerHTML, style) {
    super()
    this.element = element
    this.element.classList.add('asset')
    if (innerHTML !== null) this.element.innerHTML = innerHTML
    for (let key in style) {
      element.style[key] = style[key] 
    }
  }
}

class ImageAsset extends DomAsset {
  constructor(element, src, style) {
    super(element, null, style) 
    this.element.src = src
  }
}

class TextAsset extends DomAsset {
  constructor(element, text, style) {
    super(element, text, style)
  }
}

class AudioAsset extends Asset {
  constructor(src) {
    super()
    this.src = src
  }
}

class Stage {
  constructor(element, style) {
    this.element = element
    this.uuid = 'stage'
    for (let key in style) {
      element.style[key] = style[key] 
    }
  }
}

/* ARCHIVED FOR REFERENCE -- building from schema now
const assets = {
  stage: new Stage(document.body, {}),
  logo: new ImageAsset(new Image, 'emmi.png', {}),
  introSound: new AudioAsset(['test.mp3']),
  text: new TextAsset(document.createElement('p'), 'Click the logo to continue', {
    font: '30px ariel, sans-serif',
    color: 'blue',
  }),
}
const tasks = Parallel([
  Serial([
    Insert(assets.stage, assets.logo),
    FadeIn(assets.logo), 
    Insert(assets.stage, assets.text),
    FadeIn(assets.text), 
    IO(assets.logo), 
    Parallel([
      Serial([
        FadeOut(assets.logo),
        Remove(assets.stage, assets.logo)
      ]),
      Serial([
        FadeOut(assets.text),
        Remove(assets.stage, assets.text)
      ])
    ])
  ]),
  PlayAudio(assets.introSound),
])
const sequence = new Sequence(assets, tasks)
const variables = {
  age: null,
  gender: null
}
*/
const program = new Program(programSchema)

window.program = program
setInterval(makeUpdate(program), TICK_RATE)
