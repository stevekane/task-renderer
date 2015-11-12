import {Integer} from './variables'
import {Stage, Image, Text, Container, Audio} from './assets'
import {Expression, Always} from './connections'
import {Click, Select} from './io'
import {Opacity, Parent} from './keyFrames'

const FPS = 24
const START_CHOICES = FPS * 1
const END_INTRO = FPS * 3
const ALL_FADE_OUT = END_INTRO - FPS / 2

export default {
  uuid: 'program',
  name: 'Emmi Player 2.0',
  fps: FPS,
  variables: {
    feature: new Integer(0, 3, 0)
  },
  sequences: [{
    name: 'intro',
    uuid: 'intro',
    duration: END_INTRO,
    connections: [
      new Expression('$.feature.value === 0', 'dynamic'),
      new Expression('$.feature.value === 1', 'branching'),
      new Expression('$.feature.value === 2', 'interaction'),
      new Always('done')
    ],
    assets: [
      new Stage({
        backgroundColor: 'black',
      }),
      new Image('1', 'stage', 'emmi.png', {}, {
        parent: [
          new Parent(0, 'stage'),
          new Parent(END_INTRO, null),
        ],
        opacity: [
          new Opacity('linear', 0, 0),
          new Opacity('linear', FPS / 2, 1),
          new Opacity('linear', ALL_FADE_OUT, 0),
        ]
      }),
      new Text('2', 'stage', 'h1', 'Demo', {}, {
        parent: [
          new Parent(0, 'stage'),
          new Parent(END_INTRO, null),
        ],
        opacity: [
          new Opacity('linear', 0, 0),
          new Opacity('linear', FPS / 2, 1),
          new Opacity('linear', ALL_FADE_OUT, 1),
          new Opacity('linear', END_INTRO, 0)
        ] 
      }),
      new Container('3', 'stage', 'button', 'BEGIN', {}, {
        parent: [
          new Parent(0, 'stage'),
          new Parent(END_INTRO, null),
        ],
        opacity: [
          new Opacity('linear', 0, 1),
          new Opacity('linear', ALL_FADE_OUT, 1),
          new Opacity('linear', END_INTRO, 0),
        ]
      }),

      //TODO: add more audio files for actual audio
      //new Audio('4', 'test.mp3', {}),
      //new Container('5', 'stage', 'ul', '', {}, {
      //
      //}),
      //new Text('6', 'stage', 'h1', 'This demo showcases', {}, {
      //
      //}),
      //new Text('7', '5', 'li', 'Branching', {}, {
      //
      //}),
      //new Text('8', '5', 'li', 'Dynamic Content', {}, {
      //
      //}),
      //new Text('9', '5', 'li', 'User Interaction', {}, {
      //
      //}),
    ],
  }, {
    name: 'dynamic',
    uuid: 'dynamic',
    duration: FPS,
    connections: [
      new Always('done')
    ],
    assets: [],
    tasks: [],
  }, {
    name: 'branching',
    uuid: 'branching',
    duration: FPS,
    connections: [
      new Always('done')
    ],
    assets: [],
    tasks: [],
  }, {
    name: 'interaction',
    uuid: 'interaction',
    duration: FPS,
    connections: [
      new Always('done')
    ],
    assets: [],
    tasks: [],
  }, {
    name: 'done',
    uuid: 'done',
    duration: FPS,
    connections: [
      new Always('intro')
    ],
    assets: [],
    tasks: [],
  }]
}
