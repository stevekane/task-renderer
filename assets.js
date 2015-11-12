export default {
  Stage(style) {
    this.uuid = 'stage'
    this.type = 'stage'
    this.onClick = null
    this.style = style
  },

  Image(uuid, parentUUID, src, style, keyFrames) {
    this.uuid = uuid
    this.parentUUID = parentUUID 
    this.type = 'image'
    this.onClick = null
    this.src = src
    this.style = style
    this.keyFrames = keyFrames
  },

  Container(uuid, parentUUID, tag, text, style, keyFrames) {
    this.uuid = uuid
    this.parentUUID = parentUUID 
    this.type = 'container'
    this.onClick = null
    this.tag = tag
    this.text = text
    this.style = style
    this.keyFrames = keyFrames
  },

  Text(uuid, parentUUID, tag, text, style, keyFrames) {
    this.uuid = uuid
    this.parentUUID = parentUUID  
    this.type = 'text'
    this.onClick = null
    this.tag = tag
    this.text = text
    this.style = style
    this.keyFrames = keyFrames
  },

  Audio(uuid, src, keyFrames) {
    this.uuid = uuid
    this.type = 'audio'
    this.onClick = null
    this.src = src 
    this.keyFrames = keyFrames
  }
}
