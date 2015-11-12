export const Image = (asset) => (
  <img style={asset.style} onClick={asset.onClick} src={asset.src} />
)

export const Node = (asset) => {
  return React.createElement(asset.tag, {
    onClick: asset.onClick,
    style: asset.style
  }, asset.text)
}

export const Stage = (program, frameNumber) => (
  <div>
    <h1>{program.name}</h1>
    <h2>{program.activeSequence.name}</h2>
    <h3>Frame: {frameNumber} / {program.activeSequence.duration}</h3>
    <div>
    {
      program.activeSequence.assets
        .filter(a => a.parentUUID != null)
        .filter(a => a.type === 'image' || 
                     a.type === 'text' || 
                     a.type === 'container')
        .map(asset => {
          switch (asset.type) {
            case 'image':     return Image(asset) 
            case 'text':      return Node(asset) 
            case 'container': return Node(asset)
            default:          throw new Error('unreachable?')
          }
        })
    }
    </div>
  </div>
)
