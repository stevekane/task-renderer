export default {
  Expression(expression, sequenceUUID) {
    this.expression = expression
    this.sequenceUUID = sequenceUUID 
  },

  Always(sequenceUUID) {
    this.expression = 'true' 
    this.sequenceUUID = sequenceUUID
  }
}
