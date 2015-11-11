import {AssetSchema, VariableSchema, ConnectionSchema, TaskSchema} from './schemas'

const {Stage, Image, Container, Text, Audio} = AssetSchema
const {Integer} = VariableSchema
const {Always, Expression} = ConnectionSchema
const {Parallel, Serial, Wait, Insert, Remove, IO, PlayAudio} = TaskSchema

export default {
  //show initial screen, 
  //play intro audio
  //play animation of three key points
  //display radio checkbox for dynamic, branching, interaction, done
  //wait for button click to set 'feature' variable
  //fade out scene
  uuid: 'program',
  name: 'Emmi Player 2.0',
  variableSchemas: [
    new Integer('feature', 0, 3, 0)
  ],
  sequenceSchemas: [{
    name: 'intro',
    uuid: 'intro',
    connectionSchemas: [
      new Expression('$.feature === 0', 'dynamic'),
      new Expression('$.feature === 1', 'branching'),
      new Expression('$.feature === 2', 'interaction'),
      new Always('done')
    ],
    assetSchemas: [
      new Stage({
        backgroundColor: 'black',
      }),
      new Image('1', 'stage', 'emmi.png', {}),
      new Text('2', 'stage', 'h1', 'Welcome to the demo!', {
        color: 'white' 
      }),
      new Text('3', 'stage', 'h3', 'Press the button to begin', {
        color: 'gray' 
      }),
      new Container('4', 'stage', 'button', 'BEGIN', {}),

      //TODO: add more audio files for actual audio
      new Audio('5', 'test.mp3'),
      new Container('6', 'stage', 'ul', '', {}),
      new Text('7', 'stage', 'h1', 'This demo showcases', {
        color: 'white',
      }),
      new Text('8', '6', 'li', 'Branching', {
        color: 'white',
        font: '16px sans-serif', 
      }),
      new Text('9', '6', 'li', 'Dynamic Content', {
        color: 'white',
        font: '16px sans-serif', 
      }),
      new Text('10', '6', 'li', 'User Interaction', {
        color: 'white',
        font: '16px sans-serif', 
      }),
    ],
    taskSchemas: [
      new Serial('1', [
        //intro screen
        new Insert('2', ['1', '2', '3', '4']),
        new IO('3', '4'),
        new Remove('4', ['1', '2', '3', '4']),

        //three key points
        new Insert('5', ['6', '7']),
        new PlayAudio('6', 'test.mp3'), //three features..
        new Parallel('7', [
          new PlayAudio('8', 'test.mp3'), //dynamic content 
          new Insert('9', ['8']),
        ]),
        new Parallel('10', [
          new PlayAudio('11', 'test.mp3'), //dynamic content 
          new Insert('12', ['8']),
        ]),
        new Parallel('13', [
          new PlayAudio('14', 'test.mp3'), //dynamic content 
          new Insert('15', ['8']),
        ]),
      ])
    ]
  }, {
    name: 'dynamic',
    uuid: 'dynamic',
    connectionSchemas: [
      new Always('done')
    ],
    assetSchemas: [],
    taskSchemas: [],
  }, {
    name: 'branching',
    uuid: 'branching',
    connectionSchemas: [
      new Always('done')
    ],
    assetSchemas: [],
    taskSchemas: [],
  }, {
    name: 'interaction',
    uuid: 'interaction',
    connectionSchemas: [
      new Always('done')
    ],
    assetSchemas: [],
    taskSchemas: [],
  }, {
    name: 'done',
    uuid: 'done',
    connectionSchemas: [
      new Always(null)
    ],
    assetSchemas: [],
    taskSchemas: [],
  }]
}
