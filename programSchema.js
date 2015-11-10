import {AssetSchema, VariableSchema, ConnectionSchema} from './schemas'

const {Stage, Image, Text, Audio} = AssetSchema
const {Integer} = VariableSchema
const {Always, Expression} = ConnectionSchema
const {Parallel, Serial, Wait, IO, PlayAudio} = TaskSchema

export default {
  uuid: 'program',
  name: 'Emmi Player 2.0',
  variableSchemas: [
    new Integer('feature', 0, 3, 0)
  ],
  sequenceSchemas: [{
    name: 'intro',
    uuid: 'intro',
    connectionSchemas: [
      new Expression('$feature === 0', 'dynamic'),
      new Expression('$feature === 1', 'choice'),
      new Expression('$feature === 2', 'choice'),
      new Always('done'),
    ],
    assetSchemas: [
      new Stage({}),
      
    ]
  }]
}
