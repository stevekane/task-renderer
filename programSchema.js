export default {
  uuid: 'program',
  name: 'Test program',
  variableSchemas: [{
    name: 'age',
    type: "Number",
    min: 0,
    max: 250,
    value: 20
  }],
  sequenceSchemas: [{
    name: 'second',
    uuid: 'def',
    connectionSchemas: [{
      expression: "true",
      sequenceUUID: null
    }],
    assetSchemas: [{
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
    taskSchemas: []
  }, {
    name: 'main',
    uuid: 'abc',
    connectionSchemas: [{
      expression: "true",
      sequenceUUID: "def"
    }],
    assetSchemas: [{
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

    taskSchemas: [{
      type: 'parallel',
      taskSchemas: [{
        type: 'serial',
        taskSchemas: [{
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
          taskSchemas: [{
            type: 'serial',
            taskSchemas: [{
              type: 'fade-out',
              subject: '123'
            }, {
              type: 'remove',
              parent: 'stage',
              subject: '123'
            }]
          }, {
            type: 'serial',
            taskSchemas: [{
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
  }]
}
