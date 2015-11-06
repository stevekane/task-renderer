import {v4 as uuid} from 'node-uuid'
import AudioSystem from './AudioSystem'
import schema from './sequence-schema'

const pp = obj => console.log(JSON.stringify(obj, null, 2))
const log = console.log.bind(console)

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
  parent.appendChild(domAsset.element)
}

function * Remove (parent, domAsset) {
  parent.removeChild(domAsset.element)
}

function * Do (fn, ...params) {
  fn.apply(null, params)
}

function * IO (domAsset) {
  let done = false  
  let listener = domAsset.element.addEventListener('click', () => done = true)

  console.log('please interact with the canvas')
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

//TODO: probably want to take a complete list of sequence schemas and hydrate them
//similar to simulation zones when they are actually to be played.
//Probably want concept of sequence manager that is reponsible for traversal
class Program {
  constructor(variables, sequence) {
    this.variables = variables
    this.sequence = sequence
  }

  update(dT) {
    this.sequence.tasks.next(dT)
  }
}

class Asset {
  constructor(element) {
    this.uuid = uuid() 
  }
}

class DomAsset extends Asset {
  constructor(element) {
    super()
    this.element = element
    this.element.classList.add('asset')
  }
}

class ImageAsset extends DomAsset {
  constructor(element, src) {
    super(element) 
    this.element.src = src
  }
}

class TextAsset extends DomAsset {
  constructor(element, text, style) {
    super(element)
    element.innerText = text
    for (let key in style) {
      element.style[key] = style[key] 
    }
  }
}

class AudioAsset extends Asset {
  constructor(src) {
    super()
    this.src = src
  }
}

const assets = [
  new ImageAsset(new Image, 'emmi.png'),
  new AudioAsset(['test.mp3']),
  new TextAsset(document.createElement('p'), 'Click the logo to continue', {
    font: '30px ariel, sans-serif',
    color: 'blue',
  })
]
const audioSystem = new AudioSystem('main')
const tasks = Parallel([
  Serial([
    Insert(document.body, assets[0]),
    FadeIn(assets[0]), 
    Insert(document.body, assets[2]),
    FadeIn(assets[2]), 
    IO(assets[0]), 
    Parallel([
      Serial([
        FadeOut(assets[0]),
        Remove(document.body, assets[0])
      ]),
      Serial([
        FadeOut(assets[2]),
        Remove(document.body, assets[2])
      ])
    ])
  ]),
  PlayAudio(assets[1]),
])
const sequence = new Sequence(assets, tasks)
const variables = {
  age: null,
  gender: null
}
const program = new Program(variables, sequence)

window.program = program
setInterval(makeUpdate(program), TICK_RATE)
