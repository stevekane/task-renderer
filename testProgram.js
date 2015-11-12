import {Integer} from './variables'
import {Stage, Image, Text, Container, Audio} from './assets'
import {Expression, Always} from './connections'
import {Opacity, Parent} from './keyFrames'
import {Click, Choice} from './actions'

const FPS = 24
const START_CHOICES = FPS * 3
const END_INTRO = START_CHOICES + FPS / 2

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
    actions: [
      new Click(0, '3'),
      new Choice(START_CHOICES, 'feature', [
        { assetUUID: '5', value: 0 },
        { assetUUID: '6', value: 1 },
        { assetUUID: '7', value: 2 },
        { assetUUID: '8', value: 3 }
      ])
    ],
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
      new Text('1', 'stage', 'h1', 'Welcome to the player demo', {}, {
        parent: [
          new Parent(0, 'stage'),
          new Parent(END_INTRO, null),
        ],
        opacity: [
          new Opacity('linear', 0, 0),
          new Opacity('linear', FPS / 2, 1),
          new Opacity('linear', START_CHOICES, 1),
          new Opacity('linear', END_INTRO, 0)
        ] 
      }),
      new Image('2', 'stage', 'emmi.png', {}, {
        parent: [
          new Parent(0, 'stage'),
          new Parent(END_INTRO, null),
        ],
        opacity: [
          new Opacity('linear', 0, 0),
          new Opacity('linear', FPS / 2, 1),
          new Opacity('linear', START_CHOICES, 0),
        ]
      }),
      new Container('3', 'stage', 'button', 'begin', {}, {
        parent: [
          new Parent(0, 'stage'),
          new Parent(END_INTRO, null),
        ],
        opacity: [
          new Opacity('linear', 0, 1),
          new Opacity('linear', START_CHOICES, 1),
          new Opacity('linear', END_INTRO, 0),
        ]
      }),

      new Text('4', 'stage', 'h2', 'This demo showcases', {}, {
        parent: [
          new Parent(0, 'stage'),
          new Parent(END_INTRO, null),
        ],
        opacity: [
          new Opacity('linear', 0, 1),
          new Opacity('linear', START_CHOICES, 1),
          new Opacity('linear', END_INTRO, 0),
        ]
      }),
      new Container('5', 'stage', 'button', 'Dynamic Content', {}, {
        parent: [
          new Parent(0, 'stage'),
          new Parent(END_INTRO, null),
        ],
        opacity: [
          new Opacity('linear', 0, 1),
          new Opacity('linear', START_CHOICES, 1),
          new Opacity('linear', END_INTRO, 0),
        ]
      }),
      new Container('6', 'stage', 'button', 'Branching', {}, {
        parent: [
          new Parent(0, 'stage'),
          new Parent(END_INTRO, null),
        ],
        opacity: [
          new Opacity('linear', 0, 1),
          new Opacity('linear', START_CHOICES, 1),
          new Opacity('linear', END_INTRO, 0),
        ]
      }),
      new Container('7', 'stage', 'button', 'User Interaction', {}, {
        parent: [
          new Parent(0, 'stage'),
          new Parent(END_INTRO, null),
        ],
        opacity: [
          new Opacity('linear', 0, 1),
          new Opacity('linear', START_CHOICES, 1),
          new Opacity('linear', END_INTRO, 0),
        ]
      }),
      new Container('8', 'stage', 'button', 'Done', {}, {
        parent: [
          new Parent(0, 'stage'),
          new Parent(END_INTRO, null),
        ],
        opacity: [
          new Opacity('linear', 0, 1),
          new Opacity('linear', START_CHOICES, 1),
          new Opacity('linear', END_INTRO, 0),
        ]
      }),
    ],
  }, {
    name: 'dynamic',
    uuid: 'dynamic',
    duration: FPS,
    actions: [],
    connections: [
      new Always('done')
    ],
    assets: [],
    tasks: [],
  }, {
    name: 'branching',
    uuid: 'branching',
    duration: FPS,
    actions: [],
    connections: [
      new Always('done')
    ],
    assets: [],
    tasks: [],
  }, {
    name: 'interaction',
    uuid: 'interaction',
    duration: FPS,
    actions: [],
    connections: [
      new Always('done')
    ],
    assets: [],
    tasks: [],
  }, {
    name: 'done',
    uuid: 'done',
    duration: FPS,
    actions: [],
    connections: [
      new Always('intro')
    ],
    assets: [],
    tasks: [],
  }]
}
