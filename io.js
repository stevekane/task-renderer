export default {
  Click(assetUUID) {
    this.assetUUID 
  },

  //Choice has ObjectID and associated value
  Select(variableName, [choices]) {
    this.variableName = variableName 
    this.choices = choices
  },
}

