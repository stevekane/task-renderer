import {extend} from './utils'

export const AssetSchema = {
  Stage(style) {
    this.uuid = 'stage'
    this.type = 'stage'
    this.style = style
  },

  Image(uuid, parentUUID, style) {
    this.uuid = uuid
    this.parentUUID = parentUUID 
    this.type = 'image'
    this.style = style
  },

  Text(uuid, parentUUID, tag, text, style) {
    this.uuid = uuid
    this.parentUUID = parentUUID  
    this.type = 'text'
    this.text = text
    this.style = style
  },

  Audio(uuid, src) {
    this.uuid = uuid
    this.type = 'audio'
    this.src = src 
  }
}

export const VariableSchema = {
  Integer(name, min, max, value) {
    this.name = name
    this.type = 'Number' 
    this.min = min
    this.max = max
    this.value = value
  }
}

export const ConnectionSchema = {
  Always(sequenceUUID) {
    this.expression = 'true'
    this.sequenceUUID = sequenceUUID
  },

  Expression(expression, sequenceUUID) {
    this.expression = expression 
    this.sequenceUUID = sequenceUUID
  }
}

export const TaskSchema = {
  Parallel(uuid, taskSchemas) {
    this.uuid = uuid 
    this.taskSchemas = taskSchemas
  },

  Serial(uuid, taskSchemas) {
    this.uuid = uuid
    this.taskSchemas = taskSchemas
  },

  Wait(uuid, duration) {
    this.uuid = uuid
    this.duration = duration 
  },

  IO(uuid, assetUUID) {
    this.uuid = uuid
    this.assetUUID 
  },

  PlayAudio(uuid, src) {
    this.uuid = uuid
    this.src = src 
  }
}
