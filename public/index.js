(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Click = function Click(frame, assetUUID) {
  _classCallCheck(this, Click);

  this.type = 'click';
  this.frame = frame;
  this.assetUUID = assetUUID;
}

//choice :: { assetUUID, value }
;

exports.Click = Click;

var Choice = function Choice(frame, variableName, choices) {
  _classCallCheck(this, Choice);

  this.type = 'choice';
  this.frame = frame;
  this.variableName = variableName;
  this.choices = choices;
};

exports.Choice = Choice;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {
  Stage: function Stage(style) {
    this.uuid = 'stage';
    this.type = 'stage';
    this.onClick = null;
    this.style = style;
  },

  Image: function Image(uuid, parentUUID, src, style, keyFrames) {
    this.uuid = uuid;
    this.parentUUID = parentUUID;
    this.type = 'image';
    this.onClick = null;
    this.src = src;
    this.style = style;
    this.keyFrames = keyFrames;
  },

  Container: function Container(uuid, parentUUID, tag, text, style, keyFrames) {
    this.uuid = uuid;
    this.parentUUID = parentUUID;
    this.type = 'container';
    this.onClick = null;
    this.tag = tag;
    this.text = text;
    this.style = style;
    this.keyFrames = keyFrames;
  },

  Text: function Text(uuid, parentUUID, tag, text, style, keyFrames) {
    this.uuid = uuid;
    this.parentUUID = parentUUID;
    this.type = 'text';
    this.onClick = null;
    this.tag = tag;
    this.text = text;
    this.style = style;
    this.keyFrames = keyFrames;
  },

  Audio: function Audio(uuid, src, keyFrames) {
    this.uuid = uuid;
    this.type = 'audio';
    this.onClick = null;
    this.src = src;
    this.keyFrames = keyFrames;
  }
};
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var Image = function Image(asset) {
  return React.createElement('img', { style: asset.style, onClick: asset.onClick, src: asset.src });
};

exports.Image = Image;
var Node = function Node(asset) {
  return React.createElement(asset.tag, {
    onClick: asset.onClick,
    style: asset.style
  }, asset.text);
};

exports.Node = Node;
var Stage = function Stage(program, frameNumber) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      program.name
    ),
    React.createElement(
      'h2',
      null,
      program.activeSequence.name
    ),
    React.createElement(
      'h3',
      null,
      'Frame: ',
      frameNumber,
      ' / ',
      program.activeSequence.duration
    ),
    React.createElement(
      'div',
      null,
      program.activeSequence.assets.filter(function (a) {
        return a.parentUUID != null;
      }).filter(function (a) {
        return a.type === 'image' || a.type === 'text' || a.type === 'container';
      }).map(function (asset) {
        switch (asset.type) {
          case 'image':
            return Image(asset);
          case 'text':
            return Node(asset);
          case 'container':
            return Node(asset);
          default:
            throw new Error('unreachable?');
        }
      })
    )
  );
};
exports.Stage = Stage;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {
  Expression: function Expression(expression, sequenceUUID) {
    this.expression = expression;
    this.sequenceUUID = sequenceUUID;
  },

  Always: function Always(sequenceUUID) {
    this.expression = 'true';
    this.sequenceUUID = sequenceUUID;
  }
};
module.exports = exports['default'];

},{}],5:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var marked0$0 = [PlayAudio].map(regeneratorRuntime.mark);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utils = require('./utils');

var _testProgram = require('./testProgram');

var _testProgram2 = _interopRequireDefault(_testProgram);

var _componentsJsx = require('./components.jsx');

var FPS = 24;
var TICK_INTERVAL_MS = 1000 / FPS;

var STAGE_ELEMENT = document.getElementById('stage');

var PROGRAM_STATE = {
  READY: 0,
  PLAYING: 1,
  SUSPEND: 2,
  PAUSED: 3
};

function makeUpdate(program) {
  var lastTime = Date.now();
  var thisTime = lastTime;
  var frame = -1;
  var dT = 0;

  function render() {
    ReactDOM.render((0, _componentsJsx.Stage)(program, frame), STAGE_ELEMENT);
  }

  return function () {
    lastTime = thisTime;
    thisTime = Date.now();
    dT = thisTime - lastTime;

    var state = program.state;
    var activeSequence = program.activeSequence;
    var READY = PROGRAM_STATE.READY;
    var PLAYING = PROGRAM_STATE.PLAYING;
    var SUSPEND = PROGRAM_STATE.SUSPEND;
    var PAUSED = PROGRAM_STATE.PAUSED;

    if (!activeSequence) return;

    switch (state) {
      case READY:
        break;
      case SUSPEND:
        break;
      case PAUSED:
        {
          pauseAudio(program);
          break;
        }
      case PLAYING:
        {
          var sequenceDone = frame >= activeSequence.duration;

          frame = sequenceDone ? 0 : frame + 1;
          program.activeSequence = sequenceDone ? findNextSequence(program) : program.activeSequence;

          processAudio(program, frame);
          processActions(program, frame);
          requestAnimationFrame(render);
          break;
        }
      default:
        throw new Error('Player in invald state ' + state);
    }
  };
}

//currently only handles a single action for a given frame
//unclear if this should be enforced or relaxed?
function processActions(program, frame) {
  var action = (0, _utils.findWhere)('frame', frame, program.activeSequence.actions);
  var PLAYING = PROGRAM_STATE.PLAYING;
  var SUSPEND = PROGRAM_STATE.SUSPEND;

  var cb = function cb() {
    return program.state = PLAYING;
  };

  if (!action) return;

  program.state = SUSPEND;
  switch (action.type) {
    case 'click':
      {
        click(program.activeSequence, action.assetUUID, cb);
        break;
      }
    case 'choice':
      {
        choice(program, action.variableName, action.choices, cb);
        break;
      }
    default:
      cb();
  }
}

function pauseAudio(program, frame) {}

function processAudio(program, frame) {}

// Program -> Sequence || Null
function findNextSequence(program) {
  var variables = program.variables;
  var activeSequence = program.activeSequence;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {

    for (var _iterator = activeSequence.connections[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var connection = _step.value;

      if (new Function('$', 'return ' + connection.expression)(variables)) {
        return (0, _utils.findWhere)('uuid', connection.sequenceUUID, program.sequences);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

function click(sequence, assetUUID, cb) {
  var asset = (0, _utils.findWhere)('uuid', assetUUID, sequence.assets);

  if (!asset) throw new Error('no asset found with uuid ' + assetUUID);

  asset.onClick = function () {
    asset.onClick = null;
    cb();
  };
}

function choice(program, variableName, choices, cb) {
  var variable = program.variables[variableName];
  var sequence = program.activeSequence;

  if (!variable) throw new Error('no variable named ' + variableName);
  if (!sequence) throw new Error('no active sequence');

  var clickCb = function clickCb(value) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = choices[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _step2$value = _step2.value;
        var assetUUID = _step2$value.assetUUID;
        var _value = _step2$value.value;

        var asset = (0, _utils.findWhere)('uuid', assetUUID, sequence.assets);

        if (!asset) throw new Error('no asset found with uuid ' + assetUUID);

        asset.onClick = null;
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    variable.value = value;
    cb();
  };

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = choices[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _step3$value = _step3.value;
      var assetUUID = _step3$value.assetUUID;
      var value = _step3$value.value;

      var asset = (0, _utils.findWhere)('uuid', assetUUID, sequence.assets);

      if (!asset) throw new Error('no asset found with uuid ' + assetUUID);

      asset.onClick = clickCb.bind(null, value);
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3['return']) {
        _iterator3['return']();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }
}

function PlayAudio(audioAsset) {
  var done, sound, state;
  return regeneratorRuntime.wrap(function PlayAudio$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        done = false;
        sound = new Howl({
          src: audioAsset.src,
          onend: function onend() {
            return done = true;
          }
        });

      case 2:
        if (!true) {
          context$1$0.next = 12;
          break;
        }

        if (!done) {
          context$1$0.next = 5;
          break;
        }

        return context$1$0.abrupt('break', 12);

      case 5:
        if (state === PROGRAM_STATE.PAUSED && sound.playing()) sound.pause();
        if (state === PROGRAM_STATE.PLAYING && !sound.playing()) sound.play();

        context$1$0.next = 9;
        return;

      case 9:
        state = context$1$0.sent;
        context$1$0.next = 2;
        break;

      case 12:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

var Sequence = function Sequence(uuid, name, duration, actions, connections, assets) {
  _classCallCheck(this, Sequence);

  this.name = name;
  this.uuid = uuid;
  this.duration = duration;
  this.frameNumber = 0;
  this.actions = actions;
  this.connections = connections;
  this.assets = assets;
};

var Program = function Program(uuid, name, fps, sequences, variables) {
  _classCallCheck(this, Program);

  this.uuid = uuid;
  this.name = name;
  this.fps = fps;
  this.sequences = sequences;
  this.variables = variables;
  this.activeSequence = null;
  this.state = PROGRAM_STATE.READY;
};

window.onload = function () {
  _testProgram2['default'].activeSequence = _testProgram2['default'].sequences[0];
  _testProgram2['default'].state = PROGRAM_STATE.PLAYING;
  setInterval(makeUpdate(_testProgram2['default']), TICK_INTERVAL_MS);
  window.program = _testProgram2['default'];
};

},{"./components.jsx":3,"./testProgram":7,"./utils":8}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = {
  //type is name of easing-function
  Opacity: function Opacity(type, frame, value) {
    this.type = type;
    this.frame = frame;
    this.value = value;
  },

  Parent: function Parent(frame, assetUUID) {
    this.frame = frame;
    this.assetUUID = assetUUID;
  }
};
module.exports = exports["default"];

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _variables = require('./variables');

var _assets = require('./assets');

var _connections = require('./connections');

var _keyFrames = require('./keyFrames');

var _actions = require('./actions');

var FPS = 24;
var START_CHOICES = FPS * 3;
var END_INTRO = START_CHOICES + FPS / 2;

exports['default'] = {
  uuid: 'program',
  name: 'Emmi Player 2.0',
  fps: FPS,
  variables: {
    feature: new _variables.Integer(0, 3, 0)
  },
  sequences: [{
    name: 'intro',
    uuid: 'intro',
    duration: END_INTRO,
    actions: [new _actions.Click(0, '3'), new _actions.Choice(START_CHOICES, 'feature', [{ assetUUID: '5', value: 0 }, { assetUUID: '6', value: 1 }, { assetUUID: '7', value: 2 }, { assetUUID: '8', value: 3 }])],
    connections: [new _connections.Expression('$.feature.value === 0', 'dynamic'), new _connections.Expression('$.feature.value === 1', 'branching'), new _connections.Expression('$.feature.value === 2', 'interaction'), new _connections.Always('done')],
    assets: [new _assets.Stage({
      backgroundColor: 'black'
    }), new _assets.Text('1', 'stage', 'h1', 'Welcome to the player demo', {}, {
      parent: [new _keyFrames.Parent(0, 'stage'), new _keyFrames.Parent(END_INTRO, null)],
      opacity: [new _keyFrames.Opacity('linear', 0, 0), new _keyFrames.Opacity('linear', FPS / 2, 1), new _keyFrames.Opacity('linear', START_CHOICES, 1), new _keyFrames.Opacity('linear', END_INTRO, 0)]
    }), new _assets.Image('2', 'stage', 'emmi.png', {}, {
      parent: [new _keyFrames.Parent(0, 'stage'), new _keyFrames.Parent(END_INTRO, null)],
      opacity: [new _keyFrames.Opacity('linear', 0, 0), new _keyFrames.Opacity('linear', FPS / 2, 1), new _keyFrames.Opacity('linear', START_CHOICES, 0)]
    }), new _assets.Container('3', 'stage', 'button', 'begin', {}, {
      parent: [new _keyFrames.Parent(0, 'stage'), new _keyFrames.Parent(END_INTRO, null)],
      opacity: [new _keyFrames.Opacity('linear', 0, 1), new _keyFrames.Opacity('linear', START_CHOICES, 1), new _keyFrames.Opacity('linear', END_INTRO, 0)]
    }), new _assets.Text('4', 'stage', 'h2', 'This demo showcases', {}, {
      parent: [new _keyFrames.Parent(0, 'stage'), new _keyFrames.Parent(END_INTRO, null)],
      opacity: [new _keyFrames.Opacity('linear', 0, 1), new _keyFrames.Opacity('linear', START_CHOICES, 1), new _keyFrames.Opacity('linear', END_INTRO, 0)]
    }), new _assets.Container('5', 'stage', 'button', 'Dynamic Content', {}, {
      parent: [new _keyFrames.Parent(0, 'stage'), new _keyFrames.Parent(END_INTRO, null)],
      opacity: [new _keyFrames.Opacity('linear', 0, 1), new _keyFrames.Opacity('linear', START_CHOICES, 1), new _keyFrames.Opacity('linear', END_INTRO, 0)]
    }), new _assets.Container('6', 'stage', 'button', 'Branching', {}, {
      parent: [new _keyFrames.Parent(0, 'stage'), new _keyFrames.Parent(END_INTRO, null)],
      opacity: [new _keyFrames.Opacity('linear', 0, 1), new _keyFrames.Opacity('linear', START_CHOICES, 1), new _keyFrames.Opacity('linear', END_INTRO, 0)]
    }), new _assets.Container('7', 'stage', 'button', 'User Interaction', {}, {
      parent: [new _keyFrames.Parent(0, 'stage'), new _keyFrames.Parent(END_INTRO, null)],
      opacity: [new _keyFrames.Opacity('linear', 0, 1), new _keyFrames.Opacity('linear', START_CHOICES, 1), new _keyFrames.Opacity('linear', END_INTRO, 0)]
    }), new _assets.Container('8', 'stage', 'button', 'Done', {}, {
      parent: [new _keyFrames.Parent(0, 'stage'), new _keyFrames.Parent(END_INTRO, null)],
      opacity: [new _keyFrames.Opacity('linear', 0, 1), new _keyFrames.Opacity('linear', START_CHOICES, 1), new _keyFrames.Opacity('linear', END_INTRO, 0)]
    })]
  }, {
    name: 'dynamic',
    uuid: 'dynamic',
    duration: FPS,
    actions: [],
    connections: [new _connections.Always('done')],
    assets: [],
    tasks: []
  }, {
    name: 'branching',
    uuid: 'branching',
    duration: FPS,
    actions: [],
    connections: [new _connections.Always('done')],
    assets: [],
    tasks: []
  }, {
    name: 'interaction',
    uuid: 'interaction',
    duration: FPS,
    actions: [],
    connections: [new _connections.Always('done')],
    assets: [],
    tasks: []
  }, {
    name: 'done',
    uuid: 'done',
    duration: FPS,
    actions: [],
    connections: [new _connections.Always('intro')],
    assets: [],
    tasks: []
  }]
};
module.exports = exports['default'];

},{"./actions":1,"./assets":2,"./connections":4,"./keyFrames":6,"./variables":9}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pp = pp;
exports.clone = clone;
exports.extend = extend;
exports.last = last;
exports.find = find;
exports.findWhere = findWhere;
exports.removeChildren = removeChildren;

function pp(obj) {
  console.log(JSON.stringify(obj, null, 2));
}

var log = console.log.bind(console);

exports.log = log;
//shallow clone -- not ideal as might trigger dictionary mode?

function clone(obj) {
  var out = {};

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) out[key] = obj[key];
  }
  return out;
}

//mutative!

function extend(obj, next) {
  for (var key in next) {
    if (next.hasOwnProperty(key)) obj[key] = next[key];
  }
  return obj;
}

function last(array) {
  return array[array.length - 1];
}

function find(predFn, array) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      if (predFn(item)) return item;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"]) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return null;
}

function findWhere(key, val, array) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = array[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var item = _step2.value;

      if (item[key] === val) return item;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return null;
}

function removeChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {
  Integer: function Integer(min, max, value) {
    this.type = 'Number';
    this.min = min;
    this.max = max;
    this.value = value;
  }
};
module.exports = exports['default'];

},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9zdGV2ZW5rYW5lL3Rhc2stcmVuZGVyZXIvYWN0aW9ucy5qcyIsIi9Vc2Vycy9zdGV2ZW5rYW5lL3Rhc2stcmVuZGVyZXIvYXNzZXRzLmpzIiwiL1VzZXJzL3N0ZXZlbmthbmUvdGFzay1yZW5kZXJlci9jb21wb25lbnRzLmpzeCIsIi9Vc2Vycy9zdGV2ZW5rYW5lL3Rhc2stcmVuZGVyZXIvY29ubmVjdGlvbnMuanMiLCIvVXNlcnMvc3RldmVua2FuZS90YXNrLXJlbmRlcmVyL2luZGV4LmpzIiwiL1VzZXJzL3N0ZXZlbmthbmUvdGFzay1yZW5kZXJlci9rZXlGcmFtZXMuanMiLCIvVXNlcnMvc3RldmVua2FuZS90YXNrLXJlbmRlcmVyL3Rlc3RQcm9ncmFtLmpzIiwiL1VzZXJzL3N0ZXZlbmthbmUvdGFzay1yZW5kZXJlci91dGlscy5qcyIsIi9Vc2Vycy9zdGV2ZW5rYW5lL3Rhc2stcmVuZGVyZXIvdmFyaWFibGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7SUNBYSxLQUFLLEdBQ0wsU0FEQSxLQUFLLENBQ0osS0FBSyxFQUFFLFNBQVMsRUFBRTt3QkFEbkIsS0FBSzs7QUFFZCxNQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQTtBQUNuQixNQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtBQUNsQixNQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQTtDQUMzQjs7Ozs7OztJQUlVLE1BQU0sR0FDTixTQURBLE1BQU0sQ0FDTCxLQUFLLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRTt3QkFEL0IsTUFBTTs7QUFFZixNQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQTtBQUNwQixNQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtBQUNsQixNQUFJ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S0FBSyxFQUFFOzs7Ozs7QUFDekMsMEJBQWlCLEtBQUssbUlBQUU7VUFBZixJQUFJOztBQUNYLFVBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsRUFBRSxPQUFPLElBQUksQ0FBQTtLQUNuQzs7Ozs7Ozs7Ozs7Ozs7OztBQUNELFNBQU8sSUFBSSxDQUFBO0NBQ1o7O0FBRU0sU0FBUyxjQUFjLENBQUUsT0FBTyxFQUFFO0FBQ3ZDLFNBQU8sT0FBTyxDQUFDLFVBQVUsRUFBRTtBQUN6QixXQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQTtHQUN4QztDQUNGOzs7Ozs7OztxQkM5Q2M7QUFDYixTQUFPLEVBQUEsaUJBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUU7QUFDdkIsUUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUE7QUFDcEIsUUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUE7QUFDZCxRQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtBQUNkLFFBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO0dBQ25CO0NBQ0YiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGNsYXNzIENsaWNrIHtcbiAgY29uc3RydWN0b3IoZnJhbWUsIGFzc2V0VVVJRCkge1xuICAgIHRoaXMudHlwZSA9ICdjbGljaydcbiAgICB0aGlzLmZyYW1lID0gZnJhbWVcbiAgICB0aGlzLmFzc2V0VVVJRCA9IGFzc2V0VVVJRFxuICB9XG59XG5cbi8vY2hvaWNlIDo6IHsgYXNzZXRVVUlELCB2YWx1ZSB9XG5leHBvcnQgY2xhc3MgQ2hvaWNlIHtcbiAgY29uc3RydWN0b3IoZnJhbWUsIHZhcmlhYmxlTmFtZSwgY2hvaWNlcykge1xuICAgIHRoaXMudHlwZSA9ICdjaG9pY2UnXG4gICAgdGhpcy5mcmFtZSA9IGZyYW1lXG4gICAgdGhpcy52YXJpYWJsZU5hbWUgPSB2YXJpYWJsZU5hbWUgXG4gICAgdGhpcy5jaG9pY2VzID0gY2hvaWNlc1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIFN0YWdlKHN0eWxlKSB7XG4gICAgdGhpcy51dWlkID0gJ3N0YWdlJ1xuICAgIHRoaXMudHlwZSA9ICdzdGFnZSdcbiAgICB0aGlzLm9uQ2xpY2sgPSBudWxsXG4gICAgdGhpcy5zdHlsZSA9IHN0eWxlXG4gIH0sXG5cbiAgSW1hZ2UodXVpZCwgcGFyZW50VVVJRCwgc3JjLCBzdHlsZSwga2V5RnJhbWVzKSB7XG4gICAgdGhpcy51dWlkID0gdXVpZFxuICAgIHRoaXMucGFyZW50VVVJRCA9IHBhcmVudFVVSUQgXG4gICAgdGhpcy50eXBlID0gJ2ltYWdlJ1xuICAgIHRoaXMub25DbGljayA9IG51bGxcbiAgICB0aGlzLnNyYyA9IHNyY1xuICAgIHRoaXMuc3R5bGUgPSBzdHlsZVxuICAgIHRoaXMua2V5RnJhbWVzID0ga2V5RnJhbWVzXG4gIH0sXG5cbiAgQ29udGFpbmVyKHV1aWQsIHBhcmVudFVVSUQsIHRhZywgdGV4dCwgc3R5bGUsIGtleUZyYW1lcykge1xuICAgIHRoaXMudXVpZCA9IHV1aWRcbiAgICB0aGlzLnBhcmVudFVVSUQgPSBwYXJlbnRVVUlEIFxuICAgIHRoaXMudHlwZSA9ICdjb250YWluZXInXG4gICAgdGhpcy5vbkNsaWNrID0gbnVsbFxuICAgIHRoaXMudGFnID0gdGFnXG4gICAgdGhpcy50ZXh0ID0gdGV4dFxuICAgIHRoaXMuc3R5bGUgPSBzdHlsZVxuICAgIHRoaXMua2V5RnJhbWVzID0ga2V5RnJhbWVzXG4gIH0sXG5cbiAgVGV4dCh1dWlkLCBwYXJlbnRVVUlELCB0YWcsIHRleHQsIHN0eWxlLCBrZXlGcmFtZXMpIHtcbiAgICB0aGlzLnV1aWQgPSB1dWlkXG4gICAgdGhpcy5wYXJlbnRVVUlEID0gcGFyZW50VVVJRCAgXG4gICAgdGhpcy50eXBlID0gJ3RleHQnXG4gICAgdGhpcy5vbkNsaWNrID0gbnVsbFxuICAgIHRoaXMudGFnID0gdGFnXG4gICAgdGhpcy50ZXh0ID0gdGV4dFxuICAgIHRoaXMuc3R5bGUgPSBzdHlsZVxuICAgIHRoaXMua2V5RnJhbWVzID0ga2V5RnJhbWVzXG4gIH0sXG5cbiAgQXVkaW8odXVpZCwgc3JjLCBrZXlGcmFtZXMpIHtcbiAgICB0aGlzLnV1aWQgPSB1dWlkXG4gICAgdGhpcy50eXBlID0gJ2F1ZGlvJ1xuICAgIHRoaXMub25DbGljayA9IG51bGxcbiAgICB0aGlzLnNyYyA9IHNyYyBcbiAgICB0aGlzLmtleUZyYW1lcyA9IGtleUZyYW1lc1xuICB9XG59XG4iLCJleHBvcnQgY29uc3QgSW1hZ2UgPSAoYXNzZXQpID0+IChcbiAgPGltZyBzdHlsZT17YXNzZXQuc3R5bGV9IG9uQ2xpY2s9e2Fzc2V0Lm9uQ2xpY2t9IHNyYz17YXNzZXQuc3JjfSAvPlxuKVxuXG5leHBvcnQgY29uc3QgTm9kZSA9IChhc3NldCkgPT4ge1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChhc3NldC50YWcsIHtcbiAgICBvbkNsaWNrOiBhc3NldC5vbkNsaWNrLFxuICAgIHN0eWxlOiBhc3NldC5zdHlsZVxuICB9LCBhc3NldC50ZXh0KVxufVxuXG5leHBvcnQgY29uc3QgU3RhZ2UgPSAocHJvZ3JhbSwgZnJhbWVOdW1iZXIpID0+IChcbiAgPGRpdj5cbiAgICA8aDE+e3Byb2dyYW0ubmFtZX08L2gxPlxuICAgIDxoMj57cHJvZ3JhbS5hY3RpdmVTZXF1ZW5jZS5uYW1lfTwvaDI+XG4gICAgPGgzPkZyYW1lOiB7ZnJhbWVOdW1iZXJ9IC8ge3Byb2dyYW0uYWN0aXZlU2VxdWVuY2UuZHVyYXRpb259PC9oMz5cbiAgICA8ZGl2PlxuICAgIHtcbiAgICAgIHByb2dyYW0uYWN0aXZlU2VxdWVuY2UuYXNzZXRzXG4gICAgICAgIC5maWx0ZXIoYSA9PiBhLnBhcmVudFVVSUQgIT0gbnVsbClcbiAgICAgICAgLmZpbHRlcihhID0+IGEudHlwZSA9PT0gJ2ltYWdlJyB8fCBcbiAgICAgICAgICAgICAgICAgICAgIGEudHlwZSA9PT0gJ3RleHQnIHx8IFxuICAgICAgICAgICAgICAgICAgICAgYS50eXBlID09PSAnY29udGFpbmVyJylcbiAgICAgICAgLm1hcChhc3NldCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChhc3NldC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdpbWFnZSc6ICAgICByZXR1cm4gSW1hZ2UoYXNzZXQpIFxuICAgICAgICAgICAgY2FzZSAndGV4dCc6ICAgICAgcmV0dXJuIE5vZGUoYXNzZXQpIFxuICAgICAgICAgICAgY2FzZSAnY29udGFpbmVyJzogcmV0dXJuIE5vZGUoYXNzZXQpXG4gICAgICAgICAgICBkZWZhdWx0OiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VucmVhY2hhYmxlPycpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4pXG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIEV4cHJlc3Npb24oZXhwcmVzc2lvbiwgc2VxdWVuY2VVVUlEKSB7XG4gICAgdGhpcy5leHByZXNzaW9uID0gZXhwcmVzc2lvblxuICAgIHRoaXMuc2VxdWVuY2VVVUlEID0gc2VxdWVuY2VVVUlEIFxuICB9LFxuXG4gIEFsd2F5cyhzZXF1ZW5jZVVVSUQpIHtcbiAgICB0aGlzLmV4cHJlc3Npb24gPSAndHJ1ZScgXG4gICAgdGhpcy5zZXF1ZW5jZVVVSUQgPSBzZXF1ZW5jZVVVSURcbiAgfVxufVxuIiwiaW1wb3J0IHtmaW5kV2hlcmUsIGxhc3R9IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgcHJvZ3JhbSBmcm9tICcuL3Rlc3RQcm9ncmFtJ1xuaW1wb3J0IHtTdGFnZX0gZnJvbSAnLi9jb21wb25lbnRzLmpzeCdcblxuY29uc3QgRlBTID0gMjRcbmNvbnN0IFRJQ0tfSU5URVJWQUxfTVMgPSAxMDAwIC8gRlBTXG5cbmNvbnN0IFNUQUdFX0VMRU1FTlQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhZ2UnKVxuXG5jb25zdCBQUk9HUkFNX1NUQVRFID0ge1xuICBSRUFEWTogMCxcbiAgUExBWUlORzogMSxcbiAgU1VTUEVORDogMixcbiAgUEFVU0VEOiAzXG59XG5cbmZ1bmN0aW9uIG1ha2VVcGRhdGUgKHByb2dyYW0pIHtcbiAgbGV0IGxhc3RUaW1lID0gRGF0ZS5ub3coKVxuICBsZXQgdGhpc1RpbWUgPSBsYXN0VGltZVxuICBsZXQgZnJhbWUgPSAtMVxuICBsZXQgZFQgPSAwXG5cbiAgZnVuY3Rpb24gcmVuZGVyICgpIHtcbiAgICBSZWFjdERPTS5yZW5kZXIoU3RhZ2UocHJvZ3JhbSwgZnJhbWUpLCBTVEFHRV9FTEVNRU5UKVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBsYXN0VGltZSA9IHRoaXNUaW1lXG4gICAgdGhpc1RpbWUgPSBEYXRlLm5vdygpXG4gICAgZFQgPSB0aGlzVGltZSAtIGxhc3RUaW1lXG5cbiAgICBsZXQge3N0YXRlLCBhY3RpdmVTZXF1ZW5jZX0gPSBwcm9ncmFtXG4gICAgbGV0IHtSRUFEWSwgUExBWUlORywgU1VTUEVORCwgUEFVU0VEfSA9IFBST0dSQU1fU1RBVEVcblxuICAgIGlmICghYWN0aXZlU2VxdWVuY2UpIHJldHVyblxuXG4gICAgc3dpdGNoIChzdGF0ZSkge1xuICAgICAgY2FzZSBSRUFEWTogYnJlYWtcbiAgICAgIGNhc2UgU1VTUEVORDogYnJlYWtcbiAgICAgIGNhc2UgUEFVU0VEOiB7XG4gICAgICAgIHBhdXNlQXVkaW8ocHJvZ3JhbSlcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGNhc2UgUExBWUlORzoge1xuICAgICAgICBsZXQgc2VxdWVuY2VEb25lID0gZnJhbWUgPj0gYWN0aXZlU2VxdWVuY2UuZHVyYXRpb25cblxuICAgICAgICBmcmFtZSA9IHNlcXVlbmNlRG9uZSBcbiAgICAgICAgICA/IDBcbiAgICAgICAgICA6IGZyYW1lICsgMSBcbiAgICAgICAgcHJvZ3JhbS5hY3RpdmVTZXF1ZW5jZSA9IHNlcXVlbmNlRG9uZSBcbiAgICAgICAgICA/IGZpbmROZXh0U2VxdWVuY2UocHJvZ3JhbSkgXG4gICAgICAgICAgOiBwcm9ncmFtLmFjdGl2ZVNlcXVlbmNlXG5cbiAgICAgICAgcHJvY2Vzc0F1ZGlvKHByb2dyYW0sIGZyYW1lKVxuICAgICAgICBwcm9jZXNzQWN0aW9ucyhwcm9ncmFtLCBmcmFtZSlcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcilcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcihgUGxheWVyIGluIGludmFsZCBzdGF0ZSAke3N0YXRlfWApXG4gICAgfVxuICB9XG59XG5cbi8vY3VycmVudGx5IG9ubHkgaGFuZGxlcyBhIHNpbmdsZSBhY3Rpb24gZm9yIGEgZ2l2ZW4gZnJhbWVcbi8vdW5jbGVhciBpZiB0aGlzIHNob3VsZCBiZSBlbmZvcmNlZCBvciByZWxheGVkP1xuZnVuY3Rpb24gcHJvY2Vzc0FjdGlvbnMgKHByb2dyYW0sIGZyYW1lKSB7XG4gIGxldCBhY3Rpb24gPSBmaW5kV2hlcmUoJ2ZyYW1lJywgZnJhbWUsIHByb2dyYW0uYWN0aXZlU2VxdWVuY2UuYWN0aW9ucylcbiAgbGV0IHtQTEFZSU5HLCBTVVNQRU5EfSA9IFBST0dSQU1fU1RBVEVcbiAgbGV0IGNiID0gKCkgPT4gcHJvZ3JhbS5zdGF0ZSA9IFBMQVlJTkdcblxuICBpZiAoIWFjdGlvbikgcmV0dXJuXG5cbiAgcHJvZ3JhbS5zdGF0ZSA9IFNVU1BFTkRcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgJ2NsaWNrJzogIHtcbiAgICAgIGNsaWNrKHByb2dyYW0uYWN0aXZlU2VxdWVuY2UsIGFjdGlvbi5hc3NldFVVSUQsIGNiKVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgY2FzZSAnY2hvaWNlJzoge1xuICAgICAgY2hvaWNlKHByb2dyYW0sIGFjdGlvbi52YXJpYWJsZU5hbWUsIGFjdGlvbi5jaG9pY2VzLCBjYilcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIGRlZmF1bHQ6IGNiKClcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIHBhdXNlQXVkaW8gKHByb2dyYW0sIGZyYW1lKSB7XG5cbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0F1ZGlvIChwcm9ncmFtLCBmcmFtZSkge1xuXG59XG5cbi8vIFByb2dyYW0gLT4gU2VxdWVuY2UgfHwgTnVsbFxuZnVuY3Rpb24gZmluZE5leHRTZXF1ZW5jZSAocHJvZ3JhbSkge1xuICBsZXQge3ZhcmlhYmxlcywgYWN0aXZlU2VxdWVuY2V9ID0gcHJvZ3JhbVxuXG4gIGZvciAobGV0IGNvbm5lY3Rpb24gb2YgYWN0aXZlU2VxdWVuY2UuY29ubmVjdGlvbnMpIHtcbiAgICBpZiAobmV3IEZ1bmN0aW9uKCckJywgYHJldHVybiAke2Nvbm5lY3Rpb24uZXhwcmVzc2lvbn1gKSh2YXJpYWJsZXMpKSB7XG4gICAgICByZXR1cm4gZmluZFdoZXJlKCd1dWlkJywgY29ubmVjdGlvbi5zZXF1ZW5jZVVVSUQsIHByb2dyYW0uc2VxdWVuY2VzKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjbGljayAoc2VxdWVuY2UsIGFzc2V0VVVJRCwgY2IpIHtcbiAgbGV0IGFzc2V0ID0gZmluZFdoZXJlKCd1dWlkJywgYXNzZXRVVUlELCBzZXF1ZW5jZS5hc3NldHMpXG5cbiAgaWYgKCFhc3NldCkgdGhyb3cgbmV3IEVycm9yKGBubyBhc3NldCBmb3VuZCB3aXRoIHV1aWQgJHthc3NldFVVSUR9YClcblxuICBhc3NldC5vbkNsaWNrID0gZnVuY3Rpb24gKCkgeyBcbiAgICBhc3NldC5vbkNsaWNrID0gbnVsbFxuICAgIGNiKClcbiAgfVxufVxuXG5mdW5jdGlvbiBjaG9pY2UgKHByb2dyYW0sIHZhcmlhYmxlTmFtZSwgY2hvaWNlcywgY2IpIHtcbiAgbGV0IHZhcmlhYmxlID0gcHJvZ3JhbS52YXJpYWJsZXNbdmFyaWFibGVOYW1lXVxuICBsZXQgc2VxdWVuY2UgPSBwcm9ncmFtLmFjdGl2ZVNlcXVlbmNlXG5cbiAgaWYgKCF2YXJpYWJsZSkgdGhyb3cgbmV3IEVycm9yKGBubyB2YXJpYWJsZSBuYW1lZCAke3ZhcmlhYmxlTmFtZX1gKVxuICBpZiAoIXNlcXVlbmNlKSB0aHJvdyBuZXcgRXJyb3IoYG5vIGFjdGl2ZSBzZXF1ZW5jZWApXG5cbiAgbGV0IGNsaWNrQ2IgPSAodmFsdWUpID0+IHtcbiAgICBmb3IgKGxldCB7YXNzZXRVVUlELCB2YWx1ZX0gb2YgY2hvaWNlcykge1xuICAgICAgbGV0IGFzc2V0ID0gZmluZFdoZXJlKCd1dWlkJywgYXNzZXRVVUlELCBzZXF1ZW5jZS5hc3NldHMpXG5cbiAgICAgIGlmICghYXNzZXQpIHRocm93IG5ldyBFcnJvcihgbm8gYXNzZXQgZm91bmQgd2l0aCB1dWlkICR7YXNzZXRVVUlEfWApXG5cbiAgICAgIGFzc2V0Lm9uQ2xpY2sgPSBudWxsXG4gICAgfVxuICAgIHZhcmlhYmxlLnZhbHVlID0gdmFsdWVcbiAgICBjYigpXG4gIH1cblxuICBmb3IgKGxldCB7YXNzZXRVVUlELCB2YWx1ZX0gb2YgY2hvaWNlcykge1xuICAgIGxldCBhc3NldCA9IGZpbmRXaGVyZSgndXVpZCcsIGFzc2V0VVVJRCwgc2VxdWVuY2UuYXNzZXRzKVxuXG4gICAgaWYgKCFhc3NldCkgdGhyb3cgbmV3IEVycm9yKGBubyBhc3NldCBmb3VuZCB3aXRoIHV1aWQgJHthc3NldFVVSUR9YClcblxuICAgIGFzc2V0Lm9uQ2xpY2sgPSBjbGlja0NiLmJpbmQobnVsbCwgdmFsdWUpXG4gIH1cbn1cblxuZnVuY3Rpb24gKiBQbGF5QXVkaW8gKGF1ZGlvQXNzZXQpIHtcbiAgbGV0IGRvbmUgPSBmYWxzZVxuICBsZXQgc291bmQgPSBuZXcgSG93bCh7XG4gICAgc3JjOiBhdWRpb0Fzc2V0LnNyYyxcbiAgICBvbmVuZDogKCkgPT4gZG9uZSA9IHRydWVcbiAgfSlcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIGlmIChkb25lKSBicmVha1xuICAgIGlmIChzdGF0ZSA9PT0gUFJPR1JBTV9TVEFURS5QQVVTRUQgJiYgc291bmQucGxheWluZygpKSAgIHNvdW5kLnBhdXNlKClcbiAgICBpZiAoc3RhdGUgPT09IFBST0dSQU1fU1RBVEUuUExBWUlORyAmJiAhc291bmQucGxheWluZygpKSBzb3VuZC5wbGF5KClcblxuICAgIGxldCBzdGF0ZSA9IHlpZWxkXG4gIH1cbn1cblxuY2xhc3MgU2VxdWVuY2Uge1xuICBjb25zdHJ1Y3Rvcih1dWlkLCBuYW1lLCBkdXJhdGlvbiwgYWN0aW9ucywgY29ubmVjdGlvbnMsIGFzc2V0cykge1xuICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgICB0aGlzLnV1aWQgPSB1dWlkXG4gICAgdGhpcy5kdXJhdGlvbiA9IGR1cmF0aW9uXG4gICAgdGhpcy5mcmFtZU51bWJlciA9IDBcbiAgICB0aGlzLmFjdGlvbnMgPSBhY3Rpb25zXG4gICAgdGhpcy5jb25uZWN0aW9ucyA9IGNvbm5lY3Rpb25zXG4gICAgdGhpcy5hc3NldHMgPSBhc3NldHNcbiAgfVxufVxuXG5jbGFzcyBQcm9ncmFtIHtcbiAgY29uc3RydWN0b3IodXVpZCwgbmFtZSwgZnBzLCBzZXF1ZW5jZXMsIHZhcmlhYmxlcykge1xuICAgIHRoaXMudXVpZCA9IHV1aWRcbiAgICB0aGlzLm5hbWUgPSBuYW1lXG4gICAgdGhpcy5mcHMgPSBmcHNcbiAgICB0aGlzLnNlcXVlbmNlcyA9IHNlcXVlbmNlc1xuICAgIHRoaXMudmFyaWFibGVzID0gdmFyaWFibGVzXG4gICAgdGhpcy5hY3RpdmVTZXF1ZW5jZSA9IG51bGxcbiAgICB0aGlzLnN0YXRlID0gUFJPR1JBTV9TVEFURS5SRUFEWVxuICB9XG59XG5cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gIHByb2dyYW0uYWN0aXZlU2VxdWVuY2UgPSBwcm9ncmFtLnNlcXVlbmNlc1swXVxuICBwcm9ncmFtLnN0YXRlID0gUFJPR1JBTV9TVEFURS5QTEFZSU5HXG4gIHNldEludGVydmFsKG1ha2VVcGRhdGUocHJvZ3JhbSksIFRJQ0tfSU5URVJWQUxfTVMpXG4gIHdpbmRvdy5wcm9ncmFtID0gcHJvZ3JhbVxufVxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICAvL3R5cGUgaXMgbmFtZSBvZiBlYXNpbmctZnVuY3Rpb25cbiAgT3BhY2l0eSh0eXBlLCBmcmFtZSwgdmFsdWUpIHtcbiAgICB0aGlzLnR5cGUgPSB0eXBlXG4gICAgdGhpcy5mcmFtZSA9IGZyYW1lXG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlIFxuICB9LFxuXG4gIFBhcmVudChmcmFtZSwgYXNzZXRVVUlEKSB7XG4gICAgdGhpcy5mcmFtZSA9IGZyYW1lXG4gICAgdGhpcy5hc3NldFVVSUQgPSBhc3NldFVVSUQgXG4gIH1cbn1cbiIsImltcG9ydCB7SW50ZWdlcn0gZnJvbSAnLi92YXJpYWJsZXMnXG5pbXBvcnQge1N0YWdlLCBJbWFnZSwgVGV4dCwgQ29udGFpbmVyLCBBdWRpb30gZnJvbSAnLi9hc3NldHMnXG5pbXBvcnQge0V4cHJlc3Npb24sIEFsd2F5c30gZnJvbSAnLi9jb25uZWN0aW9ucydcbmltcG9ydCB7T3BhY2l0eSwgUGFyZW50fSBmcm9tICcuL2tleUZyYW1lcydcbmltcG9ydCB7Q2xpY2ssIENob2ljZX0gZnJvbSAnLi9hY3Rpb25zJ1xuXG5jb25zdCBGUFMgPSAyNFxuY29uc3QgU1RBUlRfQ0hPSUNFUyA9IEZQUyAqIDNcbmNvbnN0IEVORF9JTlRSTyA9IFNUQVJUX0NIT0lDRVMgKyBGUFMgLyAyXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdXVpZDogJ3Byb2dyYW0nLFxuICBuYW1lOiAnRW1taSBQbGF5ZXIgMi4wJyxcbiAgZnBzOiBGUFMsXG4gIHZhcmlhYmxlczoge1xuICAgIGZlYXR1cmU6IG5ldyBJbnRlZ2VyKDAsIDMsIDApXG4gIH0sXG4gIHNlcXVlbmNlczogW3tcbiAgICBuYW1lOiAnaW50cm8nLFxuICAgIHV1aWQ6ICdpbnRybycsXG4gICAgZHVyYXRpb246IEVORF9JTlRSTyxcbiAgICBhY3Rpb25zOiBbXG4gICAgICBuZXcgQ2xpY2soMCwgJzMnKSxcbiAgICAgIG5ldyBDaG9pY2UoU1RBUlRfQ0hPSUNFUywgJ2ZlYXR1cmUnLCBbXG4gICAgICAgIHsgYXNzZXRVVUlEOiAnNScsIHZhbHVlOiAwIH0sXG4gICAgICAgIHsgYXNzZXRVVUlEOiAnNicsIHZhbHVlOiAxIH0sXG4gICAgICAgIHsgYXNzZXRVVUlEOiAnNycsIHZhbHVlOiAyIH0sXG4gICAgICAgIHsgYXNzZXRVVUlEOiAnOCcsIHZhbHVlOiAzIH1cbiAgICAgIF0pXG4gICAgXSxcbiAgICBjb25uZWN0aW9uczogW1xuICAgICAgbmV3IEV4cHJlc3Npb24oJyQuZmVhdHVyZS52YWx1ZSA9PT0gMCcsICdkeW5hbWljJyksXG4gICAgICBuZXcgRXhwcmVzc2lvbignJC5mZWF0dXJlLnZhbHVlID09PSAxJywgJ2JyYW5jaGluZycpLFxuICAgICAgbmV3IEV4cHJlc3Npb24oJyQuZmVhdHVyZS52YWx1ZSA9PT0gMicsICdpbnRlcmFjdGlvbicpLFxuICAgICAgbmV3IEFsd2F5cygnZG9uZScpXG4gICAgXSxcbiAgICBhc3NldHM6IFtcbiAgICAgIG5ldyBTdGFnZSh7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2JsYWNrJyxcbiAgICAgIH0pLFxuICAgICAgbmV3IFRleHQoJzEnLCAnc3RhZ2UnLCAnaDEnLCAnV2VsY29tZSB0byB0aGUgcGxheWVyIGRlbW8nLCB7fSwge1xuICAgICAgICBwYXJlbnQ6IFtcbiAgICAgICAgICBuZXcgUGFyZW50KDAsICdzdGFnZScpLFxuICAgICAgICAgIG5ldyBQYXJlbnQoRU5EX0lOVFJPLCBudWxsKSxcbiAgICAgICAgXSxcbiAgICAgICAgb3BhY2l0eTogW1xuICAgICAgICAgIG5ldyBPcGFjaXR5KCdsaW5lYXInLCAwLCAwKSxcbiAgICAgICAgICBuZXcgT3BhY2l0eSgnbGluZWFyJywgRlBTIC8gMiwgMSksXG4gICAgICAgICAgbmV3IE9wYWNpdHkoJ2xpbmVhcicsIFNUQVJUX0NIT0lDRVMsIDEpLFxuICAgICAgICAgIG5ldyBPcGFjaXR5KCdsaW5lYXInLCBFTkRfSU5UUk8sIDApXG4gICAgICAgIF0gXG4gICAgICB9KSxcbiAgICAgIG5ldyBJbWFnZSgnMicsICdzdGFnZScsICdlbW1pLnBuZycsIHt9LCB7XG4gICAgICAgIHBhcmVudDogW1xuICAgICAgICAgIG5ldyBQYXJlbnQoMCwgJ3N0YWdlJyksXG4gICAgICAgICAgbmV3IFBhcmVudChFTkRfSU5UUk8sIG51bGwpLFxuICAgICAgICBdLFxuICAgICAgICBvcGFjaXR5OiBbXG4gICAgICAgICAgbmV3IE9wYWNpdHkoJ2xpbmVhcicsIDAsIDApLFxuICAgICAgICAgIG5ldyBPcGFjaXR5KCdsaW5lYXInLCBGUFMgLyAyLCAxKSxcbiAgICAgICAgICBuZXcgT3BhY2l0eSgnbGluZWFyJywgU1RBUlRfQ0hPSUNFUywgMCksXG4gICAgICAgIF1cbiAgICAgIH0pLFxuICAgICAgbmV3IENvbnRhaW5lcignMycsICdzdGFnZScsICdidXR0b24nLCAnYmVnaW4nLCB7fSwge1xuICAgICAgICBwYXJlbnQ6IFtcbiAgICAgICAgICBuZXcgUGFyZW50KDAsICdzdGFnZScpLFxuICAgICAgICAgIG5ldyBQYXJlbnQoRU5EX0lOVFJPLCBudWxsKSxcbiAgICAgICAgXSxcbiAgICAgICAgb3BhY2l0eTogW1xuICAgICAgICAgIG5ldyBPcGFjaXR5KCdsaW5lYXInLCAwLCAxKSxcbiAgICAgICAgICBuZXcgT3BhY2l0eSgnbGluZWFyJywgU1RBUlRfQ0hPSUNFUywgMSksXG4gICAgICAgICAgbmV3IE9wYWNpdHkoJ2xpbmVhcicsIEVORF9JTlRSTywgMCksXG4gICAgICAgIF1cbiAgICAgIH0pLFxuXG4gICAgICBuZXcgVGV4dCgnNCcsICdzdGFnZScsICdoMicsICdUaGlzIGRlbW8gc2hvd2Nhc2VzJywge30sIHtcbiAgICAgICAgcGFyZW50OiBbXG4gICAgICAgICAgbmV3IFBhcmVudCgwLCAnc3RhZ2UnKSxcbiAgICAgICAgICBuZXcgUGFyZW50KEVORF9JTlRSTywgbnVsbCksXG4gICAgICAgIF0sXG4gICAgICAgIG9wYWNpdHk6IFtcbiAgICAgICAgICBuZXcgT3BhY2l0eSgnbGluZWFyJywgMCwgMSksXG4gICAgICAgICAgbmV3IE9wYWNpdHkoJ2xpbmVhcicsIFNUQVJUX0NIT0lDRVMsIDEpLFxuICAgICAgICAgIG5ldyBPcGFjaXR5KCdsaW5lYXInLCBFTkRfSU5UUk8sIDApLFxuICAgICAgICBdXG4gICAgICB9KSxcbiAgICAgIG5ldyBDb250YWluZXIoJzUnLCAnc3RhZ2UnLCAnYnV0dG9uJywgJ0R5bmFtaWMgQ29udGVudCcsIHt9LCB7XG4gICAgICAgIHBhcmVudDogW1xuICAgICAgICAgIG5ldyBQYXJlbnQoMCwgJ3N0YWdlJyksXG4gICAgICAgICAgbmV3IFBhcmVudChFTkRfSU5UUk8sIG51bGwpLFxuICAgICAgICBdLFxuICAgICAgICBvcGFjaXR5OiBbXG4gICAgICAgICAgbmV3IE9wYWNpdHkoJ2xpbmVhcicsIDAsIDEpLFxuICAgICAgICAgIG5ldyBPcGFjaXR5KCdsaW5lYXInLCBTVEFSVF9DSE9JQ0VTLCAxKSxcbiAgICAgICAgICBuZXcgT3BhY2l0eSgnbGluZWFyJywgRU5EX0lOVFJPLCAwKSxcbiAgICAgICAgXVxuICAgICAgfSksXG4gICAgICBuZXcgQ29udGFpbmVyKCc2JywgJ3N0YWdlJywgJ2J1dHRvbicsICdCcmFuY2hpbmcnLCB7fSwge1xuICAgICAgICBwYXJlbnQ6IFtcbiAgICAgICAgICBuZXcgUGFyZW50KDAsICdzdGFnZScpLFxuICAgICAgICAgIG5ldyBQYXJlbnQoRU5EX0lOVFJPLCBudWxsKSxcbiAgICAgICAgXSxcbiAgICAgICAgb3BhY2l0eTogW1xuICAgICAgICAgIG5ldyBPcGFjaXR5KCdsaW5lYXInLCAwLCAxKSxcbiAgICAgICAgICBuZXcgT3BhY2l0eSgnbGluZWFyJywgU1RBUlRfQ0hPSUNFUywgMSksXG4gICAgICAgICAgbmV3IE9wYWNpdHkoJ2xpbmVhcicsIEVORF9JTlRSTywgMCksXG4gICAgICAgIF1cbiAgICAgIH0pLFxuICAgICAgbmV3IENvbnRhaW5lcignNycsICdzdGFnZScsICdidXR0b24nLCAnVXNlciBJbnRlcmFjdGlvbicsIHt9LCB7XG4gICAgICAgIHBhcmVudDogW1xuICAgICAgICAgIG5ldyBQYXJlbnQoMCwgJ3N0YWdlJyksXG4gICAgICAgICAgbmV3IFBhcmVudChFTkRfSU5UUk8sIG51bGwpLFxuICAgICAgICBdLFxuICAgICAgICBvcGFjaXR5OiBbXG4gICAgICAgICAgbmV3IE9wYWNpdHkoJ2xpbmVhcicsIDAsIDEpLFxuICAgICAgICAgIG5ldyBPcGFjaXR5KCdsaW5lYXInLCBTVEFSVF9DSE9JQ0VTLCAxKSxcbiAgICAgICAgICBuZXcgT3BhY2l0eSgnbGluZWFyJywgRU5EX0lOVFJPLCAwKSxcbiAgICAgICAgXVxuICAgICAgfSksXG4gICAgICBuZXcgQ29udGFpbmVyKCc4JywgJ3N0YWdlJywgJ2J1dHRvbicsICdEb25lJywge30sIHtcbiAgICAgICAgcGFyZW50OiBbXG4gICAgICAgICAgbmV3IFBhcmVudCgwLCAnc3RhZ2UnKSxcbiAgICAgICAgICBuZXcgUGFyZW50KEVORF9JTlRSTywgbnVsbCksXG4gICAgICAgIF0sXG4gICAgICAgIG9wYWNpdHk6IFtcbiAgICAgICAgICBuZXcgT3BhY2l0eSgnbGluZWFyJywgMCwgMSksXG4gICAgICAgICAgbmV3IE9wYWNpdHkoJ2xpbmVhcicsIFNUQVJUX0NIT0lDRVMsIDEpLFxuICAgICAgICAgIG5ldyBPcGFjaXR5KCdsaW5lYXInLCBFTkRfSU5UUk8sIDApLFxuICAgICAgICBdXG4gICAgICB9KSxcbiAgICBdLFxuICB9LCB7XG4gICAgbmFtZTogJ2R5bmFtaWMnLFxuICAgIHV1aWQ6ICdkeW5hbWljJyxcbiAgICBkdXJhdGlvbjogRlBTLFxuICAgIGFjdGlvbnM6IFtdLFxuICAgIGNvbm5lY3Rpb25zOiBbXG4gICAgICBuZXcgQWx3YXlzKCdkb25lJylcbiAgICBdLFxuICAgIGFzc2V0czogW10sXG4gICAgdGFza3M6IFtdLFxuICB9LCB7XG4gICAgbmFtZTogJ2JyYW5jaGluZycsXG4gICAgdXVpZDogJ2JyYW5jaGluZycsXG4gICAgZHVyYXRpb246IEZQUyxcbiAgICBhY3Rpb25zOiBbXSxcbiAgICBjb25uZWN0aW9uczogW1xuICAgICAgbmV3IEFsd2F5cygnZG9uZScpXG4gICAgXSxcbiAgICBhc3NldHM6IFtdLFxuICAgIHRhc2tzOiBbXSxcbiAgfSwge1xuICAgIG5hbWU6ICdpbnRlcmFjdGlvbicsXG4gICAgdXVpZDogJ2ludGVyYWN0aW9uJyxcbiAgICBkdXJhdGlvbjogRlBTLFxuICAgIGFjdGlvbnM6IFtdLFxuICAgIGNvbm5lY3Rpb25zOiBbXG4gICAgICBuZXcgQWx3YXlzKCdkb25lJylcbiAgICBdLFxuICAgIGFzc2V0czogW10sXG4gICAgdGFza3M6IFtdLFxuICB9LCB7XG4gICAgbmFtZTogJ2RvbmUnLFxuICAgIHV1aWQ6ICdkb25lJyxcbiAgICBkdXJhdGlvbjogRlBTLFxuICAgIGFjdGlvbnM6IFtdLFxuICAgIGNvbm5lY3Rpb25zOiBbXG4gICAgICBuZXcgQWx3YXlzKCdpbnRybycpXG4gICAgXSxcbiAgICBhc3NldHM6IFtdLFxuICAgIHRhc2tzOiBbXSxcbiAgfV1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBwcCAob2JqKSB7XG4gIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG9iaiwgbnVsbCwgMikpXG59XG5cbmV4cG9ydCBjb25zdCBsb2cgPSBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpXG5cbi8vc2hhbGxvdyBjbG9uZSAtLSBub3QgaWRlYWwgYXMgbWlnaHQgdHJpZ2dlciBkaWN0aW9uYXJ5IG1vZGU/XG5leHBvcnQgZnVuY3Rpb24gY2xvbmUgKG9iaikge1xuICBsZXQgb3V0ID0ge31cblxuICBmb3IgKGxldCBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSBvdXRba2V5XSA9IG9ialtrZXldIFxuICB9IFxuICByZXR1cm4gb3V0XG59XG5cbi8vbXV0YXRpdmUhXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kIChvYmosIG5leHQpIHtcbiAgZm9yIChsZXQga2V5IGluIG5leHQpIHtcbiAgICBpZiAobmV4dC5oYXNPd25Qcm9wZXJ0eShrZXkpKSBvYmpba2V5XSA9IG5leHRba2V5XVxuICB9IFxuICByZXR1cm4gb2JqXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsYXN0IChhcnJheSkge1xuICByZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmQgKHByZWRGbiwgYXJyYXkpIHtcbiAgZm9yIChsZXQgaXRlbSBvZiBhcnJheSkge1xuICAgIGlmIChwcmVkRm4oaXRlbSkpIHJldHVybiBpdGVtXG4gIH1cbiAgcmV0dXJuIG51bGxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRXaGVyZShrZXksIHZhbCwgYXJyYXkpIHtcbiAgZm9yIChsZXQgaXRlbSBvZiBhcnJheSkge1xuICAgIGlmIChpdGVtW2tleV0gPT09IHZhbCkgcmV0dXJuIGl0ZW0gXG4gIH1cbiAgcmV0dXJuIG51bGxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUNoaWxkcmVuIChlbGVtZW50KSB7XG4gIHdoaWxlIChlbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICBlbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQuZmlyc3RDaGlsZCkgXG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgSW50ZWdlcihtaW4sIG1heCwgdmFsdWUpIHtcbiAgICB0aGlzLnR5cGUgPSAnTnVtYmVyJyBcbiAgICB0aGlzLm1pbiA9IG1pblxuICAgIHRoaXMubWF4ID0gbWF4XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlXG4gIH1cbn1cbiJdfQ==
