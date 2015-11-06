import {v4 as uuid} from 'node-uuid'

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
    this.style
    for (let key in style) {
      element.style[key] = style[key] 
    }
  }
}

//NOTE: UUID is faked here for this example.  In practice schema assets must have UUIDs
const program_schema = {
  sequences: {
    main: {
      assets: [{
        uuid: '123',
        type: 'image',
        src: ['emmi.png'],
        style: {} 
      }, {
        uuid: '456',
        type: 'audio',
        src: ['test.mp3']
      }, {
        uuid: '789',
        type: 'text',
        tag: 'p',
        text: 'Click the logo to continue',
        style: {
          font: '30px ariel, sans-serif',
          color: 'blue' 
        } 
      }],

      tasks: [{
        type: 'parallel',
        tasks: [{
          type: 'serial',
          tasks: [{
            type: 'insert', 
            parent: 'stage',
            subject: '123'
          }, {
            type: 'fade-in',
            subject: '123'
          }, {
            type: 'insert',
            parent: 'stage',
            subject: '789'
          }, {
            type: 'fade-in',
            subject: '789'
          }, {
            type: 'io',
            subject: '789'   
          }, {
            type: 'parallel',
            tasks: [{
              type: 'serial',
              tasks: [{
                type: 'fade-out',
                subject: '123'
              }, {
                type: 'remove',
                parent: 'stage',
                subject: '123'
              }]
            }, {
              type: 'serial',
              tasks: [{
                type: 'fade-out',
                subject: '789'
              }, {
                type: 'remove',
                parent: 'stage',
                subject: '789'
              }]
            }]  
          }] 
        }]   
      }, {
        type: 'audio-play',
        subject: '456'
      }]
    }       
  }
}

const assets = [
  new Stage(document.body, {}),
  new ImageAsset(new Image, 'emmi.png', {}),
  new AudioAsset(['test.mp3']),
  new TextAsset(document.createElement('p'), 'Click the logo to continue', {
    font: '30px ariel, sans-serif',
    color: 'blue',
  }),
]
const tasks = Parallel([
  Serial([
    Insert(assets[0], assets[1]),
    FadeIn(assets[1]), 
    Insert(assets[0], assets[3]),
    FadeIn(assets[3]), 
    IO(assets[1]), 
    Parallel([
      Serial([
        FadeOut(assets[1]),
        Remove(assets[0], assets[1])
      ]),
      Serial([
        FadeOut(assets[3]),
        Remove(assets[0], assets[3])
      ])
    ])
  ]),
  PlayAudio(assets[2]),
])
const sequence = new Sequence(assets, tasks)
const variables = {
  age: null,
  gender: null
}
const program = new Program(variables, sequence)

window.program = program
setInterval(makeUpdate(program), TICK_RATE)
