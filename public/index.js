(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {
  Stage: function Stage(style) {
    this.uuid = 'stage';
    this.type = 'stage';
    this.style = style;
  },

  Image: function Image(uuid, parentUUID, src, style, keyFrames) {
    this.uuid = uuid;
    this.parentUUID = parentUUID;
    this.type = 'image';
    this.src = src;
    this.style = style;
    this.keyFrames = keyFrames;
  },

  Container: function Container(uuid, parentUUID, tag, text, style, keyFrames) {
    this.uuid = uuid;
    this.parentUUID = parentUUID;
    this.type = 'container';
    this.tag = tag;
    this.text = text;
    this.style = style;
    this.keyFrames = keyFrames;
  },

  Text: function Text(uuid, parentUUID, tag, text, style, keyFrames) {
    this.uuid = uuid;
    this.parentUUID = parentUUID;
    this.type = 'text';
    this.tag = tag;
    this.text = text;
    this.style = style;
    this.keyFrames = keyFrames;
  },

  Audio: function Audio(uuid, src, keyFrames) {
    this.uuid = uuid;
    this.type = 'audio';
    this.src = src;
    this.keyFrames = keyFrames;
  }
};
module.exports = exports['default'];

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var Image = function Image(asset) {
  return React.createElement('img', { src: asset.src });
};

exports.Image = Image;
var Text = function Text(asset) {
  return React.createElement(asset.tag, {}, asset.text);
};

exports.Text = Text;
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
      frameNumber
    ),
    React.createElement(
      'div',
      null,
      program.activeSequence.assets.filter(function (a) {
        return a.parentUUID != null;
      }).filter(function (a) {
        return a.type === 'image' || a.type === 'text';
      }).map(function (asset) {
        switch (asset.type) {
          case 'image':
            return Image(asset);
          case 'text':
            return Text(asset);
          default:
            throw new Error('unreachable?');
        }
      })
    )
  );
};
exports.Stage = Stage;

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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
  IO: 2,
  PAUSED: 3
};

function makeUpdate(program) {
  var lastTime = Date.now();
  var thisTime = lastTime;
  var frameNumber = 0;
  var dT = 0;

  function render() {
    ReactDOM.render((0, _componentsJsx.Stage)(program, frameNumber), STAGE_ELEMENT);
  }

  return function () {
    lastTime = thisTime;
    thisTime = Date.now();
    dT = thisTime - lastTime;

    if (frameNumber < program.activeSequence.duration) {
      frameNumber++;
    } else {
      frameNumber = 0;
      program.activeSequence = findNextSequence(program);
    }
    requestAnimationFrame(render);
  };
}

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

var Sequence = function Sequence(uuid, name, duration, connections, assets) {
  _classCallCheck(this, Sequence);

  this.name = name;
  this.uuid = uuid;
  this.duration = duration;
  this.frameNumber = 0;
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
  setInterval(makeUpdate(_testProgram2['default']), TICK_INTERVAL_MS);
  window.program = _testProgram2['default'];
};

},{"./components.jsx":2,"./testProgram":7,"./utils":8}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

exports["default"] = {
  Click: function Click(assetUUID) {
    this.assetUUID;
  },

  //Choice has ObjectID and associated value
  Select: function Select(variableName, _ref) {
    var _ref2 = _slicedToArray(_ref, 1);

    var choices = _ref2[0];

    this.variableName = variableName;
    this.choices = choices;
  }
};
module.exports = exports["default"];

},{}],6:[function(require,module,exports){
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

var _io = require('./io');

var _keyFrames = require('./keyFrames');

var FPS = 24;
var START_CHOICES = FPS * 1;
var END_INTRO = FPS * 3;
var ALL_FADE_OUT = END_INTRO - FPS / 2;

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
    connections: [new _connections.Expression('$.feature.value === 0', 'dynamic'), new _connections.Expression('$.feature.value === 1', 'branching'), new _connections.Expression('$.feature.value === 2', 'interaction'), new _connections.Always('done')],
    assets: [new _assets.Stage({
      backgroundColor: 'black'
    }), new _assets.Image('1', 'stage', 'emmi.png', {}, {
      parent: [new _keyFrames.Parent(0, 'stage'), new _keyFrames.Parent(END_INTRO, null)],
      opacity: [new _keyFrames.Opacity('linear', 0, 0), new _keyFrames.Opacity('linear', FPS / 2, 1), new _keyFrames.Opacity('linear', ALL_FADE_OUT, 0)]
    }), new _assets.Text('2', 'stage', 'h1', 'Demo', {}, {
      parent: [new _keyFrames.Parent(0, 'stage'), new _keyFrames.Parent(END_INTRO, null)],
      opacity: [new _keyFrames.Opacity('linear', 0, 0), new _keyFrames.Opacity('linear', FPS / 2, 1), new _keyFrames.Opacity('linear', ALL_FADE_OUT, 1), new _keyFrames.Opacity('linear', END_INTRO, 0)]
    }), new _assets.Container('3', 'stage', 'button', 'BEGIN', {}, {
      parent: [new _keyFrames.Parent(0, 'stage'), new _keyFrames.Parent(END_INTRO, null)],
      opacity: [new _keyFrames.Opacity('linear', 0, 1), new _keyFrames.Opacity('linear', ALL_FADE_OUT, 1), new _keyFrames.Opacity('linear', END_INTRO, 0)]
    })]
  },

  //TODO: add more audio files for actual audio
  //new Audio('4', 'test.mp3', {}),
  //new Container('5', 'stage', 'ul', '', {}, {
  //
  //}),
  //new Text('6', 'stage', 'h1', 'This demo showcases', {}, {
  //
  //}),
  //new Text('7', '5', 'li', 'Branching', {}, {
  //
  //}),
  //new Text('8', '5', 'li', 'Dynamic Content', {}, {
  //
  //}),
  //new Text('9', '5', 'li', 'User Interaction', {}, {
  //
  //}),
  {
    name: 'dynamic',
    uuid: 'dynamic',
    duration: FPS,
    connections: [new _connections.Always('done')],
    assets: [],
    tasks: []
  }, {
    name: 'branching',
    uuid: 'branching',
    duration: FPS,
    connections: [new _connections.Always('done')],
    assets: [],
    tasks: []
  }, {
    name: 'interaction',
    uuid: 'interaction',
    duration: FPS,
    connections: [new _connections.Always('done')],
    assets: [],
    tasks: []
  }, {
    name: 'done',
    uuid: 'done',
    duration: FPS,
    connections: [new _connections.Always('intro')],
    assets: [],
    tasks: []
  }]
};
module.exports = exports['default'];

},{"./assets":1,"./connections":3,"./io":5,"./keyFrames":6,"./variables":9}],8:[function(require,module,exports){
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

},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9zdGV2ZW5rYW5lL3Rhc2stcmVuZGVyZXIvYXNzZXRzLmpzIiwiL1VzZXJzL3N0ZXZlbmthbmUvdGFzay1yZW5kZXJlci9jb21wb25lbnRzLmpzeCIsIi9Vc2Vycy9zdGV2ZW5rYW5lL3Rhc2stcmVuZGVyZXIvY29ubmVjdGlvbnMuanMiLCIvVXNlcnMvc3RldmVua2FuZS90YXNrLXJlbmRlcmVyL2luZGV4LmpzIiwiL1VzZXJzL3N0ZXZlbmthbmUvdGFzay1yZW5kZXJlci9pby5qcyIsIi9Vc2Vycy9zdGV2ZW5rYW5lL3Rhc2stcmVuZGVyZXIva2V5RnJhbWVzLmpzIiwiL1VzZXJzL3N0ZXZlbmthbmUvdGFzay1yZW5kZXJlci90ZXN0UHJvZ3JhbS5qcyIsIi9Vc2Vycy9zdGV2ZW5rYW5lL3Rhc2stcmVuZGVyZXIvdXRpbHMuanMiLCIvVXNlcnMvc3RldmVua2FuZS90YXNrLXJlbmRlcmVyL3ZhcmlhYmxlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O3FCQ0FlO0FBQ2IsT0FBSyxFQUFBLGVBQUMsS0FBSyxFQUFFO0FBQ1gsUUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUE7QUFDbkIsUUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUE7QUFDbkIsUUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7R0FDbkI7O0FBRUQsT0FBSyxFQUFBLGVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRTtBQUM3QyxRQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtBQUNoQixRQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQTtBQUM1QixRQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQTtBQUNuQixRQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtBQUNkLFFBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO0FBQ2xCLFFBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFBO0dBQzNCOztBQUVELFdBQVMsRUFBQSxtQkFBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRTtBQUN2RCxRQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtBQUNoQixRQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQTtBQUM1QixRQUFJLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQTtBQUN2QixRQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtBQUNkLFFBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO0FBQ2hCLFFBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO0FBQ2xCLFFBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFBO0dBQzNCOztBQUVELE1BQUksRUFBQSxjQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO0FBQ2xELFFBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO0FBQ2hCLFFBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFBO0FBQzVCLFFBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFBO0FBQ2xCLFFBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFBO0FBQ2QsUUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7QUFDaEIsUUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7QUFDbEIsUUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUE7R0FDM0I7O0FBRUQsT0FBSyxFQUFBLGVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUU7QUFDMUIsUUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7QUFDaEIsUUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUE7QUFD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QUU7QUFDM0IsU0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQTtDQUMvQjs7QUFFTSxTQUFTLElBQUksQ0FBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOzs7Ozs7QUFDbkMseUJBQWlCLEtBQUssOEhBQUU7VUFBZixJQUFJOztBQUNYLFVBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sSUFBSSxDQUFBO0tBQzlCOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0QsU0FBTyxJQUFJLENBQUE7Q0FDWjs7QUFFTSxTQUFTLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRTs7Ozs7O0FBQ3pDLDBCQUFpQixLQUFLLG1JQUFFO1VBQWYsSUFBSTs7QUFDWCxVQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLEVBQUUsT0FBTyxJQUFJLENBQUE7S0FDbkM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDRCxTQUFPLElBQUksQ0FBQTtDQUNaOztBQUVNLFNBQVMsY0FBYyxDQUFFLE9BQU8sRUFBRTtBQUN2QyxTQUFPLE9BQU8sQ0FBQyxVQUFVLEVBQUU7QUFDekIsV0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7R0FDeEM7Q0FDRjs7Ozs7Ozs7cUJDOUNjO0FBQ2IsU0FBTyxFQUFBLGlCQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFO0FBQ3ZCLFFBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFBO0FBQ3BCLFFBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFBO0FBQ2QsUUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUE7QUFDZCxRQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtHQUNuQjtDQUNGIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBkZWZhdWx0IHtcbiAgU3RhZ2Uoc3R5bGUpIHtcbiAgICB0aGlzLnV1aWQgPSAnc3RhZ2UnXG4gICAgdGhpcy50eXBlID0gJ3N0YWdlJ1xuICAgIHRoaXMuc3R5bGUgPSBzdHlsZVxuICB9LFxuXG4gIEltYWdlKHV1aWQsIHBhcmVudFVVSUQsIHNyYywgc3R5bGUsIGtleUZyYW1lcykge1xuICAgIHRoaXMudXVpZCA9IHV1aWRcbiAgICB0aGlzLnBhcmVudFVVSUQgPSBwYXJlbnRVVUlEIFxuICAgIHRoaXMudHlwZSA9ICdpbWFnZSdcbiAgICB0aGlzLnNyYyA9IHNyY1xuICAgIHRoaXMuc3R5bGUgPSBzdHlsZVxuICAgIHRoaXMua2V5RnJhbWVzID0ga2V5RnJhbWVzXG4gIH0sXG5cbiAgQ29udGFpbmVyKHV1aWQsIHBhcmVudFVVSUQsIHRhZywgdGV4dCwgc3R5bGUsIGtleUZyYW1lcykge1xuICAgIHRoaXMudXVpZCA9IHV1aWRcbiAgICB0aGlzLnBhcmVudFVVSUQgPSBwYXJlbnRVVUlEIFxuICAgIHRoaXMudHlwZSA9ICdjb250YWluZXInXG4gICAgdGhpcy50YWcgPSB0YWdcbiAgICB0aGlzLnRleHQgPSB0ZXh0XG4gICAgdGhpcy5zdHlsZSA9IHN0eWxlXG4gICAgdGhpcy5rZXlGcmFtZXMgPSBrZXlGcmFtZXNcbiAgfSxcblxuICBUZXh0KHV1aWQsIHBhcmVudFVVSUQsIHRhZywgdGV4dCwgc3R5bGUsIGtleUZyYW1lcykge1xuICAgIHRoaXMudXVpZCA9IHV1aWRcbiAgICB0aGlzLnBhcmVudFVVSUQgPSBwYXJlbnRVVUlEICBcbiAgICB0aGlzLnR5cGUgPSAndGV4dCdcbiAgICB0aGlzLnRhZyA9IHRhZ1xuICAgIHRoaXMudGV4dCA9IHRleHRcbiAgICB0aGlzLnN0eWxlID0gc3R5bGVcbiAgICB0aGlzLmtleUZyYW1lcyA9IGtleUZyYW1lc1xuICB9LFxuXG4gIEF1ZGlvKHV1aWQsIHNyYywga2V5RnJhbWVzKSB7XG4gICAgdGhpcy51dWlkID0gdXVpZFxuICAgIHRoaXMudHlwZSA9ICdhdWRpbydcbiAgICB0aGlzLnNyYyA9IHNyYyBcbiAgICB0aGlzLmtleUZyYW1lcyA9IGtleUZyYW1lc1xuICB9XG59XG4iLCJleHBvcnQgY29uc3QgSW1hZ2UgPSAoYXNzZXQpID0+IChcbiAgPGltZyBzcmM9e2Fzc2V0LnNyY30gLz5cbilcblxuZXhwb3J0IGNvbnN0IFRleHQgPSAoYXNzZXQpID0+IHtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoYXNzZXQudGFnLCB7fSwgYXNzZXQudGV4dClcbn1cblxuZXhwb3J0IGNvbnN0IFN0YWdlID0gKHByb2dyYW0sIGZyYW1lTnVtYmVyKSA9PiAoXG4gIDxkaXY+XG4gICAgPGgxPntwcm9ncmFtLm5hbWV9PC9oMT5cbiAgICA8aDI+e3Byb2dyYW0uYWN0aXZlU2VxdWVuY2UubmFtZX08L2gyPlxuICAgIDxoMz5GcmFtZToge2ZyYW1lTnVtYmVyfTwvaDM+XG4gICAgPGRpdj5cbiAgICB7XG4gICAgICBwcm9ncmFtLmFjdGl2ZVNlcXVlbmNlLmFzc2V0c1xuICAgICAgICAuZmlsdGVyKGEgPT4gYS5wYXJlbnRVVUlEICE9IG51bGwpXG4gICAgICAgIC5maWx0ZXIoYSA9PiBhLnR5cGUgPT09ICdpbWFnZScgfHwgYS50eXBlID09PSAndGV4dCcpXG4gICAgICAgIC5tYXAoYXNzZXQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAoYXNzZXQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnaW1hZ2UnOiByZXR1cm4gSW1hZ2UoYXNzZXQpIFxuICAgICAgICAgICAgY2FzZSAndGV4dCc6ICByZXR1cm4gVGV4dChhc3NldCkgXG4gICAgICAgICAgICBkZWZhdWx0OiAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWFjaGFibGU/JylcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbilcbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgRXhwcmVzc2lvbihleHByZXNzaW9uLCBzZXF1ZW5jZVVVSUQpIHtcbiAgICB0aGlzLmV4cHJlc3Npb24gPSBleHByZXNzaW9uXG4gICAgdGhpcy5zZXF1ZW5jZVVVSUQgPSBzZXF1ZW5jZVVVSUQgXG4gIH0sXG5cbiAgQWx3YXlzKHNlcXVlbmNlVVVJRCkge1xuICAgIHRoaXMuZXhwcmVzc2lvbiA9ICd0cnVlJyBcbiAgICB0aGlzLnNlcXVlbmNlVVVJRCA9IHNlcXVlbmNlVVVJRFxuICB9XG59XG4iLCJpbXBvcnQge2ZpbmRXaGVyZSwgbGFzdH0gZnJvbSAnLi91dGlscydcbmltcG9ydCBwcm9ncmFtIGZyb20gJy4vdGVzdFByb2dyYW0nXG5pbXBvcnQge1N0YWdlfSBmcm9tICcuL2NvbXBvbmVudHMuanN4J1xuXG5jb25zdCBGUFMgPSAyNFxuY29uc3QgVElDS19JTlRFUlZBTF9NUyA9IDEwMDAgLyBGUFNcblxuY29uc3QgU1RBR0VfRUxFTUVOVCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFnZScpXG5cbmNvbnN0IFBST0dSQU1fU1RBVEUgPSB7XG4gIFJFQURZOiAwLFxuICBQTEFZSU5HOiAxLFxuICBJTzogMixcbiAgUEFVU0VEOiAzXG59XG5cbmZ1bmN0aW9uIG1ha2VVcGRhdGUgKHByb2dyYW0pIHtcbiAgbGV0IGxhc3RUaW1lID0gRGF0ZS5ub3coKVxuICBsZXQgdGhpc1RpbWUgPSBsYXN0VGltZVxuICBsZXQgZnJhbWVOdW1iZXIgPSAwXG4gIGxldCBkVCA9IDBcblxuICBmdW5jdGlvbiByZW5kZXIgKCkge1xuICAgIFJlYWN0RE9NLnJlbmRlcihcbiAgICAgIFN0YWdlKHByb2dyYW0sIGZyYW1lTnVtYmVyKSwgXG4gICAgICBTVEFHRV9FTEVNRU5UKVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBsYXN0VGltZSA9IHRoaXNUaW1lXG4gICAgdGhpc1RpbWUgPSBEYXRlLm5vdygpXG4gICAgZFQgPSB0aGlzVGltZSAtIGxhc3RUaW1lXG5cbiAgICBpZiAoZnJhbWVOdW1iZXIgPCBwcm9ncmFtLmFjdGl2ZVNlcXVlbmNlLmR1cmF0aW9uKSB7XG4gICAgICBmcmFtZU51bWJlcisrXG4gICAgfSBlbHNlIHtcbiAgICAgIGZyYW1lTnVtYmVyID0gMFxuICAgICAgcHJvZ3JhbS5hY3RpdmVTZXF1ZW5jZSA9IGZpbmROZXh0U2VxdWVuY2UocHJvZ3JhbSkgICBcbiAgICB9XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcilcbiAgfVxufVxuXG4vLyBQcm9ncmFtIC0+IFNlcXVlbmNlIHx8IE51bGxcbmZ1bmN0aW9uIGZpbmROZXh0U2VxdWVuY2UgKHByb2dyYW0pIHtcbiAgbGV0IHt2YXJpYWJsZXMsIGFjdGl2ZVNlcXVlbmNlfSA9IHByb2dyYW1cblxuICBmb3IgKGxldCBjb25uZWN0aW9uIG9mIGFjdGl2ZVNlcXVlbmNlLmNvbm5lY3Rpb25zKSB7XG4gICAgaWYgKG5ldyBGdW5jdGlvbignJCcsIGByZXR1cm4gJHtjb25uZWN0aW9uLmV4cHJlc3Npb259YCkodmFyaWFibGVzKSkge1xuICAgICAgcmV0dXJuIGZpbmRXaGVyZSgndXVpZCcsIGNvbm5lY3Rpb24uc2VxdWVuY2VVVUlELCBwcm9ncmFtLnNlcXVlbmNlcylcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gKiBQbGF5QXVkaW8gKGF1ZGlvQXNzZXQpIHtcbiAgbGV0IGRvbmUgPSBmYWxzZVxuICBsZXQgc291bmQgPSBuZXcgSG93bCh7XG4gICAgc3JjOiBhdWRpb0Fzc2V0LnNyYyxcbiAgICBvbmVuZDogKCkgPT4gZG9uZSA9IHRydWVcbiAgfSlcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIGlmIChkb25lKSBicmVha1xuICAgIGlmIChzdGF0ZSA9PT0gUFJPR1JBTV9TVEFURS5QQVVTRUQgJiYgc291bmQucGxheWluZygpKSAgIHNvdW5kLnBhdXNlKClcbiAgICBpZiAoc3RhdGUgPT09IFBST0dSQU1fU1RBVEUuUExBWUlORyAmJiAhc291bmQucGxheWluZygpKSBzb3VuZC5wbGF5KClcblxuICAgIGxldCBzdGF0ZSA9IHlpZWxkXG4gIH1cbn1cblxuY2xhc3MgU2VxdWVuY2Uge1xuICBjb25zdHJ1Y3Rvcih1dWlkLCBuYW1lLCBkdXJhdGlvbiwgY29ubmVjdGlvbnMsIGFzc2V0cykge1xuICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgICB0aGlzLnV1aWQgPSB1dWlkXG4gICAgdGhpcy5kdXJhdGlvbiA9IGR1cmF0aW9uXG4gICAgdGhpcy5mcmFtZU51bWJlciA9IDBcbiAgICB0aGlzLmNvbm5lY3Rpb25zID0gY29ubmVjdGlvbnNcbiAgICB0aGlzLmFzc2V0cyA9IGFzc2V0c1xuICB9XG59XG5cbmNsYXNzIFByb2dyYW0ge1xuICBjb25zdHJ1Y3Rvcih1dWlkLCBuYW1lLCBmcHMsIHNlcXVlbmNlcywgdmFyaWFibGVzKSB7XG4gICAgdGhpcy51dWlkID0gdXVpZFxuICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgICB0aGlzLmZwcyA9IGZwc1xuICAgIHRoaXMuc2VxdWVuY2VzID0gc2VxdWVuY2VzXG4gICAgdGhpcy52YXJpYWJsZXMgPSB2YXJpYWJsZXNcbiAgICB0aGlzLmFjdGl2ZVNlcXVlbmNlID0gbnVsbFxuICAgIHRoaXMuc3RhdGUgPSBQUk9HUkFNX1NUQVRFLlJFQURZXG4gIH1cbn1cblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgcHJvZ3JhbS5hY3RpdmVTZXF1ZW5jZSA9IHByb2dyYW0uc2VxdWVuY2VzWzBdXG4gIHNldEludGVydmFsKG1ha2VVcGRhdGUocHJvZ3JhbSksIFRJQ0tfSU5URVJWQUxfTVMpXG4gIHdpbmRvdy5wcm9ncmFtID0gcHJvZ3JhbVxufVxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICBDbGljayhhc3NldFVVSUQpIHtcbiAgICB0aGlzLmFzc2V0VVVJRCBcbiAgfSxcblxuICAvL0Nob2ljZSBoYXMgT2JqZWN0SUQgYW5kIGFzc29jaWF0ZWQgdmFsdWVcbiAgU2VsZWN0KHZhcmlhYmxlTmFtZSwgW2Nob2ljZXNdKSB7XG4gICAgdGhpcy52YXJpYWJsZU5hbWUgPSB2YXJpYWJsZU5hbWUgXG4gICAgdGhpcy5jaG9pY2VzID0gY2hvaWNlc1xuICB9LFxufVxuXG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIC8vdHlwZSBpcyBuYW1lIG9mIGVhc2luZy1mdW5jdGlvblxuICBPcGFjaXR5KHR5cGUsIGZyYW1lLCB2YWx1ZSkge1xuICAgIHRoaXMudHlwZSA9IHR5cGVcbiAgICB0aGlzLmZyYW1lID0gZnJhbWVcbiAgICB0aGlzLnZhbHVlID0gdmFsdWUgXG4gIH0sXG5cbiAgUGFyZW50KGZyYW1lLCBhc3NldFVVSUQpIHtcbiAgICB0aGlzLmZyYW1lID0gZnJhbWVcbiAgICB0aGlzLmFzc2V0VVVJRCA9IGFzc2V0VVVJRCBcbiAgfVxufVxuIiwiaW1wb3J0IHtJbnRlZ2VyfSBmcm9tICcuL3ZhcmlhYmxlcydcbmltcG9ydCB7U3RhZ2UsIEltYWdlLCBUZXh0LCBDb250YWluZXIsIEF1ZGlvfSBmcm9tICcuL2Fzc2V0cydcbmltcG9ydCB7RXhwcmVzc2lvbiwgQWx3YXlzfSBmcm9tICcuL2Nvbm5lY3Rpb25zJ1xuaW1wb3J0IHtDbGljaywgU2VsZWN0fSBmcm9tICcuL2lvJ1xuaW1wb3J0IHtPcGFjaXR5LCBQYXJlbnR9IGZyb20gJy4va2V5RnJhbWVzJ1xuXG5jb25zdCBGUFMgPSAyNFxuY29uc3QgU1RBUlRfQ0hPSUNFUyA9IEZQUyAqIDFcbmNvbnN0IEVORF9JTlRSTyA9IEZQUyAqIDNcbmNvbnN0IEFMTF9GQURFX09VVCA9IEVORF9JTlRSTyAtIEZQUyAvIDJcblxuZXhwb3J0IGRlZmF1bHQge1xuICB1dWlkOiAncHJvZ3JhbScsXG4gIG5hbWU6ICdFbW1pIFBsYXllciAyLjAnLFxuICBmcHM6IEZQUyxcbiAgdmFyaWFibGVzOiB7XG4gICAgZmVhdHVyZTogbmV3IEludGVnZXIoMCwgMywgMClcbiAgfSxcbiAgc2VxdWVuY2VzOiBbe1xuICAgIG5hbWU6ICdpbnRybycsXG4gICAgdXVpZDogJ2ludHJvJyxcbiAgICBkdXJhdGlvbjogRU5EX0lOVFJPLFxuICAgIGNvbm5lY3Rpb25zOiBbXG4gICAgICBuZXcgRXhwcmVzc2lvbignJC5mZWF0dXJlLnZhbHVlID09PSAwJywgJ2R5bmFtaWMnKSxcbiAgICAgIG5ldyBFeHByZXNzaW9uKCckLmZlYXR1cmUudmFsdWUgPT09IDEnLCAnYnJhbmNoaW5nJyksXG4gICAgICBuZXcgRXhwcmVzc2lvbignJC5mZWF0dXJlLnZhbHVlID09PSAyJywgJ2ludGVyYWN0aW9uJyksXG4gICAgICBuZXcgQWx3YXlzKCdkb25lJylcbiAgICBdLFxuICAgIGFzc2V0czogW1xuICAgICAgbmV3IFN0YWdlKHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnYmxhY2snLFxuICAgICAgfSksXG4gICAgICBuZXcgSW1hZ2UoJzEnLCAnc3RhZ2UnLCAnZW1taS5wbmcnLCB7fSwge1xuICAgICAgICBwYXJlbnQ6IFtcbiAgICAgICAgICBuZXcgUGFyZW50KDAsICdzdGFnZScpLFxuICAgICAgICAgIG5ldyBQYXJlbnQoRU5EX0lOVFJPLCBudWxsKSxcbiAgICAgICAgXSxcbiAgICAgICAgb3BhY2l0eTogW1xuICAgICAgICAgIG5ldyBPcGFjaXR5KCdsaW5lYXInLCAwLCAwKSxcbiAgICAgICAgICBuZXcgT3BhY2l0eSgnbGluZWFyJywgRlBTIC8gMiwgMSksXG4gICAgICAgICAgbmV3IE9wYWNpdHkoJ2xpbmVhcicsIEFMTF9GQURFX09VVCwgMCksXG4gICAgICAgIF1cbiAgICAgIH0pLFxuICAgICAgbmV3IFRleHQoJzInLCAnc3RhZ2UnLCAnaDEnLCAnRGVtbycsIHt9LCB7XG4gICAgICAgIHBhcmVudDogW1xuICAgICAgICAgIG5ldyBQYXJlbnQoMCwgJ3N0YWdlJyksXG4gICAgICAgICAgbmV3IFBhcmVudChFTkRfSU5UUk8sIG51bGwpLFxuICAgICAgICBdLFxuICAgICAgICBvcGFjaXR5OiBbXG4gICAgICAgICAgbmV3IE9wYWNpdHkoJ2xpbmVhcicsIDAsIDApLFxuICAgICAgICAgIG5ldyBPcGFjaXR5KCdsaW5lYXInLCBGUFMgLyAyLCAxKSxcbiAgICAgICAgICBuZXcgT3BhY2l0eSgnbGluZWFyJywgQUxMX0ZBREVfT1VULCAxKSxcbiAgICAgICAgICBuZXcgT3BhY2l0eSgnbGluZWFyJywgRU5EX0lOVFJPLCAwKVxuICAgICAgICBdIFxuICAgICAgfSksXG4gICAgICBuZXcgQ29udGFpbmVyKCczJywgJ3N0YWdlJywgJ2J1dHRvbicsICdCRUdJTicsIHt9LCB7XG4gICAgICAgIHBhcmVudDogW1xuICAgICAgICAgIG5ldyBQYXJlbnQoMCwgJ3N0YWdlJyksXG4gICAgICAgICAgbmV3IFBhcmVudChFTkRfSU5UUk8sIG51bGwpLFxuICAgICAgICBdLFxuICAgICAgICBvcGFjaXR5OiBbXG4gICAgICAgICAgbmV3IE9wYWNpdHkoJ2xpbmVhcicsIDAsIDEpLFxuICAgICAgICAgIG5ldyBPcGFjaXR5KCdsaW5lYXInLCBBTExfRkFERV9PVVQsIDEpLFxuICAgICAgICAgIG5ldyBPcGFjaXR5KCdsaW5lYXInLCBFTkRfSU5UUk8sIDApLFxuICAgICAgICBdXG4gICAgICB9KSxcblxuICAgICAgLy9UT0RPOiBhZGQgbW9yZSBhdWRpbyBmaWxlcyBmb3IgYWN0dWFsIGF1ZGlvXG4gICAgICAvL25ldyBBdWRpbygnNCcsICd0ZXN0Lm1wMycsIHt9KSxcbiAgICAgIC8vbmV3IENvbnRhaW5lcignNScsICdzdGFnZScsICd1bCcsICcnLCB7fSwge1xuICAgICAgLy9cbiAgICAgIC8vfSksXG4gICAgICAvL25ldyBUZXh0KCc2JywgJ3N0YWdlJywgJ2gxJywgJ1RoaXMgZGVtbyBzaG93Y2FzZXMnLCB7fSwge1xuICAgICAgLy9cbiAgICAgIC8vfSksXG4gICAgICAvL25ldyBUZXh0KCc3JywgJzUnLCAnbGknLCAnQnJhbmNoaW5nJywge30sIHtcbiAgICAgIC8vXG4gICAgICAvL30pLFxuICAgICAgLy9uZXcgVGV4dCgnOCcsICc1JywgJ2xpJywgJ0R5bmFtaWMgQ29udGVudCcsIHt9LCB7XG4gICAgICAvL1xuICAgICAgLy99KSxcbiAgICAgIC8vbmV3IFRleHQoJzknLCAnNScsICdsaScsICdVc2VyIEludGVyYWN0aW9uJywge30sIHtcbiAgICAgIC8vXG4gICAgICAvL30pLFxuICAgIF0sXG4gIH0sIHtcbiAgICBuYW1lOiAnZHluYW1pYycsXG4gICAgdXVpZDogJ2R5bmFtaWMnLFxuICAgIGR1cmF0aW9uOiBGUFMsXG4gICAgY29ubmVjdGlvbnM6IFtcbiAgICAgIG5ldyBBbHdheXMoJ2RvbmUnKVxuICAgIF0sXG4gICAgYXNzZXRzOiBbXSxcbiAgICB0YXNrczogW10sXG4gIH0sIHtcbiAgICBuYW1lOiAnYnJhbmNoaW5nJyxcbiAgICB1dWlkOiAnYnJhbmNoaW5nJyxcbiAgICBkdXJhdGlvbjogRlBTLFxuICAgIGNvbm5lY3Rpb25zOiBbXG4gICAgICBuZXcgQWx3YXlzKCdkb25lJylcbiAgICBdLFxuICAgIGFzc2V0czogW10sXG4gICAgdGFza3M6IFtdLFxuICB9LCB7XG4gICAgbmFtZTogJ2ludGVyYWN0aW9uJyxcbiAgICB1dWlkOiAnaW50ZXJhY3Rpb24nLFxuICAgIGR1cmF0aW9uOiBGUFMsXG4gICAgY29ubmVjdGlvbnM6IFtcbiAgICAgIG5ldyBBbHdheXMoJ2RvbmUnKVxuICAgIF0sXG4gICAgYXNzZXRzOiBbXSxcbiAgICB0YXNrczogW10sXG4gIH0sIHtcbiAgICBuYW1lOiAnZG9uZScsXG4gICAgdXVpZDogJ2RvbmUnLFxuICAgIGR1cmF0aW9uOiBGUFMsXG4gICAgY29ubmVjdGlvbnM6IFtcbiAgICAgIG5ldyBBbHdheXMoJ2ludHJvJylcbiAgICBdLFxuICAgIGFzc2V0czogW10sXG4gICAgdGFza3M6IFtdLFxuICB9XVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIHBwIChvYmopIHtcbiAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkob2JqLCBudWxsLCAyKSlcbn1cblxuZXhwb3J0IGNvbnN0IGxvZyA9IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSlcblxuLy9zaGFsbG93IGNsb25lIC0tIG5vdCBpZGVhbCBhcyBtaWdodCB0cmlnZ2VyIGRpY3Rpb25hcnkgbW9kZT9cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZSAob2JqKSB7XG4gIGxldCBvdXQgPSB7fVxuXG4gIGZvciAobGV0IGtleSBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIG91dFtrZXldID0gb2JqW2tleV0gXG4gIH0gXG4gIHJldHVybiBvdXRcbn1cblxuLy9tdXRhdGl2ZSFcbmV4cG9ydCBmdW5jdGlvbiBleHRlbmQgKG9iaiwgbmV4dCkge1xuICBmb3IgKGxldCBrZXkgaW4gbmV4dCkge1xuICAgIGlmIChuZXh0Lmhhc093blByb3BlcnR5KGtleSkpIG9ialtrZXldID0gbmV4dFtrZXldXG4gIH0gXG4gIHJldHVybiBvYmpcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxhc3QgKGFycmF5KSB7XG4gIHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAxXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZCAocHJlZEZuLCBhcnJheSkge1xuICBmb3IgKGxldCBpdGVtIG9mIGFycmF5KSB7XG4gICAgaWYgKHByZWRGbihpdGVtKSkgcmV0dXJuIGl0ZW1cbiAgfVxuICByZXR1cm4gbnVsbFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZFdoZXJlKGtleSwgdmFsLCBhcnJheSkge1xuICBmb3IgKGxldCBpdGVtIG9mIGFycmF5KSB7XG4gICAgaWYgKGl0ZW1ba2V5XSA9PT0gdmFsKSByZXR1cm4gaXRlbSBcbiAgfVxuICByZXR1cm4gbnVsbFxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQ2hpbGRyZW4gKGVsZW1lbnQpIHtcbiAgd2hpbGUgKGVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5maXJzdENoaWxkKSBcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICBJbnRlZ2VyKG1pbiwgbWF4LCB2YWx1ZSkge1xuICAgIHRoaXMudHlwZSA9ICdOdW1iZXInIFxuICAgIHRoaXMubWluID0gbWluXG4gICAgdGhpcy5tYXggPSBtYXhcbiAgICB0aGlzLnZhbHVlID0gdmFsdWVcbiAgfVxufVxuIl19
