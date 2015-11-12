export default {
  //type is name of easing-function
  Opacity(type, frame, value) {
    this.type = type
    this.frame = frame
    this.value = value 
  },

  Parent(frame, assetUUID) {
    this.frame = frame
    this.assetUUID = assetUUID 
  }
}
