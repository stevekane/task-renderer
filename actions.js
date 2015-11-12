export class Click {
  constructor(frame, assetUUID) {
    this.type = 'click'
    this.frame = frame
    this.assetUUID = assetUUID
  }
}

//choice :: { assetUUID, value }
export class Choice {
  constructor(frame, variableName, choices) {
    this.type = 'choice'
    this.frame = frame
    this.variableName = variableName 
    this.choices = choices
  }
}
