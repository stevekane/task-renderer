export const Image = (asset) => (
  <img src={asset.src} />
)

export const Text = (asset) => {
  return React.createElement(asset.tag, {}, asset.text)
}

export const Stage = (program, frameNumber) => (
  <div>
    <h1>{program.name}</h1>
    <h2>{program.activeSequence.name}</h2>
    <h3>Frame: {frameNumber}</h3>
    <div>
    {
      program.activeSequence.assets
        .filter(a => a.parentUUID != null)
        .filter(a => a.type === 'image' || a.type === 'text')
        .map(asset => {
          switch (asset.type) {
            case 'image': return Image(asset) 
            case 'text':  return Text(asset) 
            default:      throw new Error('unreachable?')
          }
        })
    }
    </div>
  </div>
)
