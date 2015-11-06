//NOTE: UUID is faked here for this example.  In practice schema assets must have UUIDs
export default {
  resources: {
    images: [
      'emmi.png'  
    ], 
    audio: [
      'test.mp3' 
    ]
  },
  variables: {
    age: {
      type: "Number",
      min: 0,
      max: 250,
      default: 20
    }
  },
  sequences: {
    main: {
      connections: [{
        expression: true,
        sequenceName: null
      }],
      assets: [{
        uuid: 'stage',
        type: 'stage',
        style: {}
      }, {
        uuid: '123',
        type: 'image',
        src: 'emmi.png',
        style: {} 
      }, {
        uuid: '456',
        type: 'audio',
        src: ['test.mp3']
      }, {
        uuid: '789',
        type: 'text',
        tag: 'p',
        text: 'Click the logo to continue',
        style: {
          font: '30px ariel, sans-serif',
          color: 'blue' 
        } 
      }],

      tasks: [{
        type: 'parallel',
        tasks: [{
          type: 'serial',
          tasks: [{
            type: 'insert', 
            parent: 'stage',
            subject: '123'
          }, {
            type: 'fade-in',
            subject: '123'
          }, {
            type: 'insert',
            parent: 'stage',
            subject: '789'
          }, {
            type: 'fade-in',
            subject: '789'
          }, {
            type: 'io',
            subject: '789'   
          }, {
            type: 'parallel',
            tasks: [{
              type: 'serial',
              tasks: [{
                type: 'fade-out',
                subject: '123'
              }, {
                type: 'remove',
                parent: 'stage',
                subject: '123'
              }]
            }, {
              type: 'serial',
              tasks: [{
                type: 'fade-out',
                subject: '789'
              }, {
                type: 'remove',
                parent: 'stage',
                subject: '789'
              }]
            }]  
          }] 
        }]   
      }, {
        type: 'audio-play',
        subject: '456'
      }]
    }       
  }
}

