(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var marked0$0 = [Parallel, Serial, Wait, FadeIn, FadeOut, Insert, Remove, IO, PlayAudio].map(regeneratorRuntime.mark);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _nodeUuid = require('node-uuid');

var _utils = require('./utils');

var _programSchema = require('./programSchema');

var _programSchema2 = _interopRequireDefault(_programSchema);

var FPS = 24;
var TICK_INTERVAL_MS = 1000 / FPS;

var STAGE_ELEMENT = document.getElementById('stage');
var TOGGLE_BUTTON = document.getElementById('toggle');

var PROGRAM_STATE = {
  LOADING: 0,
  READY: 1,
  PLAYING: 2,
  PAUSED: 3,
  DONE: 4
};

function makeUpdate(program) {
  var lastTime = Date.now();
  var thisTime = lastTime;
  var dT = 0;

  return function () {
    lastTime = thisTime;
    thisTime = Date.now();
    dT = thisTime - lastTime;

    //TODO: check that dT is in valid range for "normal tick"
    if (program.activeSequence) {
      if (program.activeSequence.tasks.next(program.state).done) {
        var targetSequence = program.activeSequence.findNext(program.variables);

        if (targetSequence) program.startSequence(targetSequence);else program.state = PROGRAM_STATE.DONE;
      }
    }
  };
}

function Parallel(tasks) {
  var state, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, task;

  return regeneratorRuntime.wrap(function Parallel$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!tasks.length) {
          context$1$0.next = 25;
          break;
        }

        context$1$0.next = 3;
        return;

      case 3:
        state = context$1$0.sent;
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 7;

        for (_iterator = tasks[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          task = _step.value;

          if (task.next(state).done) {
            tasks.splice(tasks.indexOf(task), 1);
          }
        }
        context$1$0.next = 15;
        break;

      case 11:
        context$1$0.prev = 11;
        context$1$0.t0 = context$1$0['catch'](7);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 15:
        context$1$0.prev = 15;
        context$1$0.prev = 16;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 18:
        context$1$0.prev = 18;

        if (!_didIteratorError) {
          context$1$0.next = 21;
          break;
        }

        throw _iteratorError;

      case 21:
        return context$1$0.finish(18);

      case 22:
        return context$1$0.finish(15);

      case 23:
        context$1$0.next = 0;
        break;

      case 25:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this, [[7, 11, 15, 23], [16,, 18, 22]]);
}

function Serial(tasks) {
  var state;
  return regeneratorRuntime.wrap(function Serial$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!tasks.length) {
          context$1$0.next = 7;
          break;
        }

        context$1$0.next = 3;
        return;

      case 3:
        state = context$1$0.sent;

        if (tasks[0].next(state).done) tasks.shift();
        context$1$0.next = 0;
        break;

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[1], this);
}

function Wait(duration) {
  var elapsed, state;
  return regeneratorRuntime.wrap(function Wait$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        elapsed = 0;

      case 1:
        if (!(elapsed < duration)) {
          context$1$0.next = 8;
          break;
        }

        context$1$0.next = 4;
        return;

      case 4:
        state = context$1$0.sent;

        if (state === PROGRAM_STATE.PLAYING) elapsed++;
        context$1$0.next = 1;
        break;

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[2], this);
}

function FadeIn(domAsset) {
  var elapsed, duration, classAdded, state;
  return regeneratorRuntime.wrap(function FadeIn$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        elapsed = 0;
        duration = 12;
        classAdded = false;

      case 3:
        if (!(elapsed < duration)) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.next = 6;
        return;

      case 6:
        state = context$1$0.sent;

        if (state === PROGRAM_STATE.PLAYING) {
          if (!classAdded) {
            domAsset.element.classList.add('active');
            classAdded = true;
          }
          elapsed++;
        }
        context$1$0.next = 3;
        break;

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[3], this);
}

function FadeOut(domAsset) {
  var remaining, classRemoved, state;
  return regeneratorRuntime.wrap(function FadeOut$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        remaining = 12;
        classRemoved = false;

      case 2:
        if (!(remaining > 0)) {
          context$1$0.next = 9;
          break;
        }

        context$1$0.next = 5;
        return;

      case 5:
        state = context$1$0.sent;

        if (state === PROGRAM_STATE.PLAYING) {
          if (!classRemoved) {
            domAsset.element.classList.remove('active');
            classRemoved = true;
          }
          remaining--;
        }
        context$1$0.next = 2;
        break;

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[4], this);
}

function Insert(parent, domAsset) {
  return regeneratorRuntime.wrap(function Insert$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        parent.element.appendChild(domAsset.element);

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[5], this);
}

function Remove(parent, domAsset) {
  return regeneratorRuntime.wrap(function Remove$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        parent.element.removeChild(domAsset.element);

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[6], this);
}

function IO(domAsset) {
  var done, listener;
  return regeneratorRuntime.wrap(function IO$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        done = false;
        listener = domAsset.element.addEventListener('click', function () {
          return done = true;
        });

      case 2:
        if (done) {
          context$1$0.next = 7;
          break;
        }

        context$1$0.next = 5;
        return;

      case 5:
        context$1$0.next = 2;
        break;

      case 7:
        domAsset.element.removeEventListener(listener);

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[7], this);
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
  }, marked0$0[8], this);
}

var Connection = function Connection(_ref) {
  var expression = _ref.expression;
  var sequenceUUID = _ref.sequenceUUID;

  _classCallCheck(this, Connection);

  this.expression = new Function('$', 'return ' + expression);
  this.sequenceUUID = sequenceUUID;
};

var Sequence = (function () {
  function Sequence(_ref2) {
    var uuid = _ref2.uuid;
    var name = _ref2.name;
    var assetSchemas = _ref2.assetSchemas;
    var taskSchemas = _ref2.taskSchemas;
    var connectionSchemas = _ref2.connectionSchemas;

    _classCallCheck(this, Sequence);

    this.name = name;
    this.uuid = uuid;
    this.assets = assetSchemas.map(Asset.fromSchema);

    this.tasks = Serial([Wait(48), Parallel([PlayAudio((0, _utils.findWhere)('uuid', '456', this.assets)), Serial([Insert((0, _utils.findWhere)('uuid', 'stage', this.assets), (0, _utils.findWhere)('uuid', '123', this.assets)), FadeIn((0, _utils.findWhere)('uuid', '123', this.assets)), FadeOut((0, _utils.findWhere)('uuid', '123', this.assets))]), PlayAudio((0, _utils.findWhere)('uuid', '456', this.assets))])]);

    this.connections = connectionSchemas.map(function (s) {
      return new Connection(s);
    });
  }

  _createClass(Sequence, [{
    key: 'findNext',
    value: function findNext(variables) {
      var connection = (0, _utils.find)(function (_ref3) {
        var expression = _ref3.expression;
        return expression(variables);
      }, this.connections);

      return connection ? connection.sequenceUUID : null;
    }
  }]);

  return Sequence;
})();

var Program = (function () {
  function Program(programSchema) {
    _classCallCheck(this, Program);

    this.name = programSchema.name;
    this.uuid = programSchema.uuid;
    this.state = PROGRAM_STATE.READY;
    this.activeSequence = null;
    this.schema = programSchema;
    this.variables = this.schema.variableSchemas.reduce(function (map, variableSchema) {
      map[variableSchema.name] = variableSchema.value;
      return map;
    }, {});
  }

  //TODO: really not a fan of the "asset" class for opacity.  Consider ditching CSS...

  _createClass(Program, [{
    key: 'startSequence',
    value: function startSequence(uuid) {
      var sequenceSchema = (0, _utils.findWhere)('uuid', uuid, this.schema.sequenceSchemas);

      if (!sequenceSchema) throw new Error('No schema named ' + name + ' was found');

      this.activeSequence = new Sequence(sequenceSchema);
      this.state = PROGRAM_STATE.PLAYING;
      (0, _utils.removeChildren)(STAGE_ELEMENT);
    }
  }]);

  return Program;
})();

var Asset = {
  fromSchema: function fromSchema(assetSchema) {
    switch (assetSchema.type) {
      case 'stage':
        return new Asset.Stage(assetSchema);
      case 'image':
        return new Asset.Image(assetSchema);
      case 'audio':
        return new Asset.Audio(assetSchema);
      case 'text':
        return new Asset.Text(assetSchema);
      default:
        return new Asset.Unknown(assetSchema);
    }
  },

  Stage: function Stage(_ref4) {
    var style = _ref4.style;

    this.element = STAGE_ELEMENT;
    this.uuid = 'stage';
    (0, _utils.extend)(this.element.style, style);
  },

  Image: (function (_Image) {
    function Image(_x) {
      return _Image.apply(this, arguments);
    }

    Image.toString = function () {
      return _Image.toString();
    };

    return Image;
  })(function (_ref5) {
    var uuid = _ref5.uuid;
    var src = _ref5.src;
    var style = _ref5.style;

    this.uuid = uuid;
    this.element = new Image();
    this.element.src = src;
    this.element.classList.add('asset');
    (0, _utils.extend)(this.element.style, style);
  }),

  Text: function Text(_ref6) {
    var uuid = _ref6.uuid;
    var tag = _ref6.tag;
    var text = _ref6.text;
    var style = _ref6.style;

    this.uuid = uuid;
    this.element = document.createElement(tag);
    this.element.innerText = text;
    this.element.classList.add('asset');
    (0, _utils.extend)(this.element.style, style);
  },

  Audio: function Audio(_ref7) {
    var uuid = _ref7.uuid;
    var src = _ref7.src;

    this.uuid = uuid;
    this.src = src;
  },

  Unknown: function Unknown(schema) {
    this.uuid = schema.uuid;
    this.schema = schema;
  }
};

var program = new Program(_programSchema2['default']);

program.startSequence('abc');
setInterval(makeUpdate(program), TICK_INTERVAL_MS);
toggle.addEventListener('click', function () {
  if (program.state === PROGRAM_STATE.PLAYING) program.state = PROGRAM_STATE.PAUSED;else if (program.state === PROGRAM_STATE.PAUSED) program.state = PROGRAM_STATE.PLAYING;else {}
});
window.onblur = function () {
  if (program.state === PROGRAM_STATE.PLAYING) program.state = PROGRAM_STATE.PAUSED;
};
window.program = program;

},{"./programSchema":3,"./utils":4,"node-uuid":2}],2:[function(require,module,exports){
//     uuid.js
//
//     Copyright (c) 2010-2012 Robert Kieffer
//     MIT License - http://opensource.org/licenses/mit-license.php

(function() {
  var _global = this;

  // Unique ID creation requires a high quality random # generator.  We feature
  // detect to determine the best RNG source, normalizing to a function that
  // returns 128-bits of randomness, since that's what's usually required
  var _rng;

  // Node.js crypto-based RNG - http://nodejs.org/docs/v0.6.2/api/crypto.html
  //
  // Moderately fast, high quality
  if (typeof(_global.require) == 'function') {
    try {
      var _rb = _global.require('crypto').randomBytes;
      _rng = _rb && function() {return _rb(16);};
    } catch(e) {}
  }

  if (!_rng && _global.crypto && crypto.getRandomValues) {
    // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
    //
    // Moderately fast, high quality
    var _rnds8 = new Uint8Array(16);
    _rng = function whatwgRNG() {
      crypto.getRandomValues(_rnds8);
      return _rnds8;
    };
  }

  if (!_rng) {
    // Math.random()-based (RNG)
    //
    // If all else fails, use Math.random().  It's fast, but is of unspecified
    // quality.
    var  _rnds = new Array(16);
    _rng = function() {
      for (var i = 0, r; i < 16; i++) {
        if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
        _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
      }

      return _rnds;
    };
  }

  // Buffer class to use
  var BufferClass = typeof(_global.Buffer) == 'function' ? _global.Buffer : Array;

  // Maps for number <-> hex string conversion
  var _byteToHex = [];
  var _hexToByte = {};
  for (var i = 0; i < 256; i++) {
    _byteToHex[i] = (i + 0x100).toString(16).substr(1);
    _hexToByte[_byteToHex[i]] = i;
  }

  // **`parse()` - Parse a UUID into it's component bytes**
  function parse(s, buf, offset) {
    var i = (buf && offset) || 0, ii = 0;

    buf = buf || [];
    s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
      if (ii < 16) { // Don't overflow!
        buf[i + ii++] = _hexToByte[oct];
      }
    });

    // Zero out remaining bytes if string was short
    while (ii < 16) {
      buf[i + ii++] = 0;
    }

    return buf;
  }

  // **`unparse()` - Convert UUID byte array (ala parse()) into a string**
  function unparse(buf, offset) {
    var i = offset || 0, bth = _byteToHex;
    return  bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]];
  }

  // **`v1()` - Generate time-based UUID**
  //
  // Inspired by https://github.com/LiosK/UUID.js
  // and http://docs.python.org/library/uuid.html

  // random #'s we need to init node and clockseq
  var _seedBytes = _rng();

  // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
  var _nodeId = [
    _seedBytes[0] | 0x01,
    _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
  ];

  // Per 4.2.2, randomize (14 bit) clockseq
  var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

  // Previous uuid creation time
  var _lastMSecs = 0, _lastNSecs = 0;

  // See https://github.com/broofa/node-uuid for API details
  function v1(options, buf, offset) {
    var i = buf && offset || 0;
    var b = buf || [];

    options = options || {};

    var clockseq = options.clockseq != null ? options.clockseq : _clockseq;

    // UUID timestamps are 100 nano-second units since the Gregorian epoch,
    // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
    // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
    // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
    var msecs = options.msecs != null ? options.msecs : new Date().getTime();

    // Per 4.2.1.2, use count of uuid's generated during the current clock
    // cycle to simulate higher resolution clock
    var nsecs = options.nsecs != null ? options.nsecs : _lastNSecs + 1;

    // Time since last uuid creation (in msecs)
    var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

    // Per 4.2.1.2, Bump clockseq on clock regression
    if (dt < 0 && options.clockseq == null) {
      clockseq = clockseq + 1 & 0x3fff;
    }

    // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
    // time interval
    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs == null) {
      nsecs = 0;
    }

    // Per 4.2.1.2 Throw error if too many uuids are requested
    if (nsecs >= 10000) {
      throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
    }

    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq;

    // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
    msecs += 12219292800000;

    // `time_low`
    var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
    b[i++] = tl >>> 24 & 0xff;
    b[i++] = tl >>> 16 & 0xff;
    b[i++] = tl >>> 8 & 0xff;
    b[i++] = tl & 0xff;

    // `time_mid`
    var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
    b[i++] = tmh >>> 8 & 0xff;
    b[i++] = tmh & 0xff;

    // `time_high_and_version`
    b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
    b[i++] = tmh >>> 16 & 0xff;

    // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
    b[i++] = clockseq >>> 8 | 0x80;

    // `clock_seq_low`
    b[i++] = clockseq & 0xff;

    // `node`
    var node = options.node || _nodeId;
    for (var n = 0; n < 6; n++) {
      b[i + n] = node[n];
    }

    return buf ? buf : unparse(b);
  }

  // **`v4()` - Generate random UUID**

  // See https://github.com/broofa/node-uuid for API details
  function v4(options, buf, offset) {
    // Deprecated - 'format' argument, as supported in v1.2
    var i = buf && offset || 0;

    if (typeof(options) == 'string') {
      buf = options == 'binary' ? new BufferClass(16) : null;
      options = null;
    }
    options = options || {};

    var rnds = options.random || (options.rng || _rng)();

    // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;

    // Copy bytes to buffer, if provided
    if (buf) {
      for (var ii = 0; ii < 16; ii++) {
        buf[i + ii] = rnds[ii];
      }
    }

    return buf || unparse(rnds);
  }

  // Export public API
  var uuid = v4;
  uuid.v1 = v1;
  uuid.v4 = v4;
  uuid.parse = parse;
  uuid.unparse = unparse;
  uuid.BufferClass = BufferClass;

  if (typeof(module) != 'undefined' && module.exports) {
    // Publish as node.js module
    module.exports = uuid;
  } else  if (typeof define === 'function' && define.amd) {
    // Publish as AMD module
    define(function() {return uuid;});
 

  } else {
    // Publish as global (in browsers)
    var _previousRoot = _global.uuid;

    // **`noConflict()` - (browser only) to reset global 'uuid' var**
    uuid.noConflict = function() {
      _global.uuid = _previousRoot;
      return uuid;
    };

    _global.uuid = uuid;
  }
}).call(this);

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {
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
};
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pp = pp;
exports.clone = clone;
exports.extend = extend;
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9zdGV2ZW5rYW5lL3Rhc2stcmVuZGVyZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbm9kZS11dWlkL3V1aWQuanMiLCIvVXNlcnMvc3RldmVua2FuZS90YXNrLXJlbmRlcmVyL3Byb2dyYW1TY2hlbWEuanMiLCIvVXNlcnMvc3RldmVua2FuZS90YXNrLXJlbmRlcmVyL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O2lCQ3dDVyxRQUFRLEVBWVIsTUFBTSxFQVFOLElBQUksRUFVSixNQUFNLEVBa0JOLE9BQU8sRUFpQlAsTUFBTSxFQUlOLE1BQU0sRUFJTixFQUFFLEVBUUYsU0FBUzs7Ozt3QkF6SEssV0FBVzs7cUJBQ2tDLFNBQVM7OzZCQUNyRCxpQkFBaUI7Ozs7QUFFM0MsSUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFBO0FBQ2QsSUFBTSxnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFBOztBQUVuQyxJQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQ3RELElBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUE7O0FBRXZELElBQU0sYUFBYSxHQUFHO0FBQ3BCLFNBQU8sRUFBRSxDQUFDO0FBQ1YsT0FBSyxFQUFFLENBQUM7QUFDUixTQUFPLEVBQUUsQ0FBQztBQUNWLFFBQU0sRUFBRSxDQUFDO0FBQ1QsTUFBSSxFQUFFLENBQUM7Q0FDUixDQUFBOztBQUVELFNBQVMsVUFBVSxDQUFFLE9BQU8sRUFBRTtBQUM1QixNQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7QUFDekIsTUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFBO0FBQ3ZCLE1BQUksRUFBRSxH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QyxNQUFNLEdBQUcsWUFBWTtBQUMxQixNQUFJLE9BQU8sQ0FBQyxLQUFLLEtBQUssYUFBYSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUE7Q0FDbEYsQ0FBQTtBQUNELE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBOzs7QUNsUnhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QWYsSUFBSTs7QUFDWCxVQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLEVBQUUsT0FBTyxJQUFJLENBQUE7S0FDbkM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDRCxTQUFPLElBQUksQ0FBQTtDQUNaOztBQUVNLFNBQVMsY0FBYyxDQUFFLE9BQU8sRUFBRTtBQUN2QyxTQUFPLE9BQU8sQ0FBQyxVQUFVLEVBQUU7QUFDekIsV0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7R0FDeEM7Q0FDRiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQge3Y0IGFzIHV1aWR9IGZyb20gJ25vZGUtdXVpZCdcbmltcG9ydCB7cHAsIGxvZywgY2xvbmUsIGV4dGVuZCwgZmluZCwgZmluZFdoZXJlLCByZW1vdmVDaGlsZHJlbn0gZnJvbSAnLi91dGlscydcbmltcG9ydCBwcm9ncmFtU2NoZW1hIGZyb20gJy4vcHJvZ3JhbVNjaGVtYSdcblxuY29uc3QgRlBTID0gMjRcbmNvbnN0IFRJQ0tfSU5URVJWQUxfTVMgPSAxMDAwIC8gRlBTXG5cbmNvbnN0IFNUQUdFX0VMRU1FTlQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhZ2UnKVxuY29uc3QgVE9HR0xFX0JVVFRPTiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2dnbGUnKVxuXG5jb25zdCBQUk9HUkFNX1NUQVRFID0ge1xuICBMT0FESU5HOiAwLFxuICBSRUFEWTogMSxcbiAgUExBWUlORzogMixcbiAgUEFVU0VEOiAzLFxuICBET05FOiA0XG59XG5cbmZ1bmN0aW9uIG1ha2VVcGRhdGUgKHByb2dyYW0pIHtcbiAgbGV0IGxhc3RUaW1lID0gRGF0ZS5ub3coKVxuICBsZXQgdGhpc1RpbWUgPSBsYXN0VGltZVxuICBsZXQgZFQgPSAwXG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBsYXN0VGltZSA9IHRoaXNUaW1lXG4gICAgdGhpc1RpbWUgPSBEYXRlLm5vdygpXG4gICAgZFQgPSB0aGlzVGltZSAtIGxhc3RUaW1lXG5cbiAgICAvL1RPRE86IGNoZWNrIHRoYXQgZFQgaXMgaW4gdmFsaWQgcmFuZ2UgZm9yIFwibm9ybWFsIHRpY2tcIlxuICAgIGlmIChwcm9ncmFtLmFjdGl2ZVNlcXVlbmNlKSB7XG4gICAgICBpZiAocHJvZ3JhbS5hY3RpdmVTZXF1ZW5jZS50YXNrcy5uZXh0KHByb2dyYW0uc3RhdGUpLmRvbmUpIHtcbiAgICAgICAgbGV0IHRhcmdldFNlcXVlbmNlID0gcHJvZ3JhbS5hY3RpdmVTZXF1ZW5jZS5maW5kTmV4dChwcm9ncmFtLnZhcmlhYmxlcylcblxuICAgICAgICBpZiAodGFyZ2V0U2VxdWVuY2UpIHByb2dyYW0uc3RhcnRTZXF1ZW5jZSh0YXJnZXRTZXF1ZW5jZSkgXG4gICAgICAgIGVsc2UgICAgICAgICAgICAgICAgcHJvZ3JhbS5zdGF0ZSA9IFBST0dSQU1fU1RBVEUuRE9ORVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiAqIFBhcmFsbGVsICh0YXNrcykge1xuICB3aGlsZSAodGFza3MubGVuZ3RoKSB7XG4gICAgbGV0IHN0YXRlID0geWllbGRcblxuICAgIGZvciAobGV0IHRhc2sgb2YgdGFza3MpIHtcbiAgICAgIGlmICh0YXNrLm5leHQoc3RhdGUpLmRvbmUpIHtcbiAgICAgICAgdGFza3Muc3BsaWNlKHRhc2tzLmluZGV4T2YodGFzayksIDEpXG4gICAgICB9XG4gICAgfSBcbiAgfVxufVxuXG5mdW5jdGlvbiAqIFNlcmlhbCAodGFza3MpIHtcbiAgd2hpbGUgKHRhc2tzLmxlbmd0aCkge1xuICAgIGxldCBzdGF0ZSA9IHlpZWxkXG5cbiAgICBpZiAodGFza3NbMF0ubmV4dChzdGF0ZSkuZG9uZSkgdGFza3Muc2hpZnQoKVxuICB9XG59XG5cbmZ1bmN0aW9uICogV2FpdCAoZHVyYXRpb24pIHtcbiAgbGV0IGVsYXBzZWQgPSAwIFxuXG4gIHdoaWxlIChlbGFwc2VkIDwgZHVyYXRpb24pIHtcbiAgICBsZXQgc3RhdGUgPSB5aWVsZFxuXG4gICAgaWYgKHN0YXRlID09PSBQUk9HUkFNX1NUQVRFLlBMQVlJTkcpIGVsYXBzZWQrK1xuICB9XG59XG5cbmZ1bmN0aW9uICogRmFkZUluIChkb21Bc3NldCkge1xuICBsZXQgZWxhcHNlZCA9IDBcbiAgbGV0IGR1cmF0aW9uID0gMTJcbiAgbGV0IGNsYXNzQWRkZWQgPSBmYWxzZVxuXG4gIHdoaWxlIChlbGFwc2VkIDwgZHVyYXRpb24pIHtcbiAgICBsZXQgc3RhdGUgPSB5aWVsZFxuXG4gICAgaWYgKHN0YXRlID09PSBQUk9HUkFNX1NUQVRFLlBMQVlJTkcpIHtcbiAgICAgIGlmICghY2xhc3NBZGRlZCkge1xuICAgICAgICBkb21Bc3NldC5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgICAgIGNsYXNzQWRkZWQgPSB0cnVlXG4gICAgICB9XG4gICAgICBlbGFwc2VkKytcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gKiBGYWRlT3V0IChkb21Bc3NldCkge1xuICBsZXQgcmVtYWluaW5nID0gMTJcbiAgbGV0IGNsYXNzUmVtb3ZlZCA9IGZhbHNlXG5cbiAgd2hpbGUgKHJlbWFpbmluZyA+IDApIHtcbiAgICBsZXQgc3RhdGUgPSB5aWVsZFxuXG4gICAgaWYgKHN0YXRlID09PSBQUk9HUkFNX1NUQVRFLlBMQVlJTkcpIHtcbiAgICAgIGlmICghY2xhc3NSZW1vdmVkKSB7XG4gICAgICAgIGRvbUFzc2V0LmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgICAgICAgY2xhc3NSZW1vdmVkID0gdHJ1ZVxuICAgICAgfVxuICAgICAgcmVtYWluaW5nLS1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gKiBJbnNlcnQgKHBhcmVudCwgZG9tQXNzZXQpIHtcbiAgcGFyZW50LmVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9tQXNzZXQuZWxlbWVudClcbn1cblxuZnVuY3Rpb24gKiBSZW1vdmUgKHBhcmVudCwgZG9tQXNzZXQpIHtcbiAgcGFyZW50LmVsZW1lbnQucmVtb3ZlQ2hpbGQoZG9tQXNzZXQuZWxlbWVudClcbn1cblxuZnVuY3Rpb24gKiBJTyAoZG9tQXNzZXQpIHtcbiAgbGV0IGRvbmUgPSBmYWxzZSAgXG4gIGxldCBsaXN0ZW5lciA9IGRvbUFzc2V0LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBkb25lID0gdHJ1ZSlcblxuICB3aGlsZSAoIWRvbmUpIHlpZWxkXG4gIGRvbUFzc2V0LmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcilcbn1cblxuZnVuY3Rpb24gKiBQbGF5QXVkaW8gKGF1ZGlvQXNzZXQpIHtcbiAgbGV0IGRvbmUgPSBmYWxzZVxuICBsZXQgc291bmQgPSBuZXcgSG93bCh7XG4gICAgc3JjOiBhdWRpb0Fzc2V0LnNyYyxcbiAgICBvbmVuZDogKCkgPT4gZG9uZSA9IHRydWVcbiAgfSlcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIGlmIChkb25lKSBicmVha1xuICAgIGlmIChzdGF0ZSA9PT0gUFJPR1JBTV9TVEFURS5QQVVTRUQgJiYgc291bmQucGxheWluZygpKSAgIHNvdW5kLnBhdXNlKClcbiAgICBpZiAoc3RhdGUgPT09IFBST0dSQU1fU1RBVEUuUExBWUlORyAmJiAhc291bmQucGxheWluZygpKSBzb3VuZC5wbGF5KClcblxuICAgIGxldCBzdGF0ZSA9IHlpZWxkXG4gIH1cbn1cblxuY2xhc3MgQ29ubmVjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHtleHByZXNzaW9uLCBzZXF1ZW5jZVVVSUR9KSB7XG4gICAgdGhpcy5leHByZXNzaW9uID0gbmV3IEZ1bmN0aW9uKCckJywgYHJldHVybiAke2V4cHJlc3Npb259YCkgXG4gICAgdGhpcy5zZXF1ZW5jZVVVSUQgPSBzZXF1ZW5jZVVVSURcbiAgfVxufVxuXG5jbGFzcyBTZXF1ZW5jZSB7XG4gIGNvbnN0cnVjdG9yKHt1dWlkLCBuYW1lLCBhc3NldFNjaGVtYXMsIHRhc2tTY2hlbWFzLCBjb25uZWN0aW9uU2NoZW1hc30pIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lXG4gICAgdGhpcy51dWlkID0gdXVpZFxuICAgIHRoaXMuYXNzZXRzID0gYXNzZXRTY2hlbWFzLm1hcChBc3NldC5mcm9tU2NoZW1hKVxuXG5cblxuXG5cblxuXG5cblxuICAgIHRoaXMudGFza3MgPSBTZXJpYWwoW1xuICAgICAgV2FpdCg0OCksIFxuICAgICAgUGFyYWxsZWwoW1xuICAgICAgICBQbGF5QXVkaW8oZmluZFdoZXJlKCd1dWlkJywgJzQ1NicsIHRoaXMuYXNzZXRzKSksXG4gICAgICAgIFNlcmlhbChbXG4gICAgICAgICAgSW5zZXJ0KGZpbmRXaGVyZSgndXVpZCcsICdzdGFnZScsIHRoaXMuYXNzZXRzKSwgZmluZFdoZXJlKCd1dWlkJywgJzEyMycsIHRoaXMuYXNzZXRzKSksXG4gICAgICAgICAgRmFkZUluKGZpbmRXaGVyZSgndXVpZCcsICcxMjMnLCB0aGlzLmFzc2V0cykpLFxuICAgICAgICAgIEZhZGVPdXQoZmluZFdoZXJlKCd1dWlkJywgJzEyMycsIHRoaXMuYXNzZXRzKSlcbiAgICAgICAgXSksXG4gICAgICAgIFBsYXlBdWRpbyhmaW5kV2hlcmUoJ3V1aWQnLCAnNDU2JywgdGhpcy5hc3NldHMpKSxcbiAgICAgIF0pXG4gICAgXSlcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuICAgIHRoaXMuY29ubmVjdGlvbnMgPSBjb25uZWN0aW9uU2NoZW1hcy5tYXAocyA9PiBuZXcgQ29ubmVjdGlvbihzKSlcbiAgfVxuXG4gIGZpbmROZXh0KHZhcmlhYmxlcykge1xuICAgIGxldCBjb25uZWN0aW9uID0gZmluZCgoe2V4cHJlc3Npb259KSA9PiBleHByZXNzaW9uKHZhcmlhYmxlcyksIHRoaXMuY29ubmVjdGlvbnMpXG5cbiAgICByZXR1cm4gY29ubmVjdGlvbiA/IGNvbm5lY3Rpb24uc2VxdWVuY2VVVUlEIDogbnVsbFxuICB9XG59XG5cbmNsYXNzIFByb2dyYW0ge1xuICBjb25zdHJ1Y3Rvcihwcm9ncmFtU2NoZW1hKSB7XG4gICAgdGhpcy5uYW1lID0gcHJvZ3JhbVNjaGVtYS5uYW1lXG4gICAgdGhpcy51dWlkID0gcHJvZ3JhbVNjaGVtYS51dWlkXG4gICAgdGhpcy5zdGF0ZSA9IFBST0dSQU1fU1RBVEUuUkVBRFlcbiAgICB0aGlzLmFjdGl2ZVNlcXVlbmNlID0gbnVsbFxuICAgIHRoaXMuc2NoZW1hID0gcHJvZ3JhbVNjaGVtYVxuICAgIHRoaXMudmFyaWFibGVzID0gdGhpcy5zY2hlbWEudmFyaWFibGVTY2hlbWFzLnJlZHVjZSgobWFwLCB2YXJpYWJsZVNjaGVtYSkgPT4ge1xuICAgICAgbWFwW3ZhcmlhYmxlU2NoZW1hLm5hbWVdID0gdmFyaWFibGVTY2hlbWEudmFsdWVcbiAgICAgIHJldHVybiBtYXBcbiAgICB9LCB7fSlcbiAgfVxuXG4gIHN0YXJ0U2VxdWVuY2UodXVpZCkge1xuICAgIGNvbnN0IHNlcXVlbmNlU2NoZW1hID0gZmluZFdoZXJlKCd1dWlkJywgdXVpZCwgdGhpcy5zY2hlbWEuc2VxdWVuY2VTY2hlbWFzKVxuXG4gICAgaWYgKCFzZXF1ZW5jZVNjaGVtYSkgdGhyb3cgbmV3IEVycm9yKGBObyBzY2hlbWEgbmFtZWQgJHtuYW1lfSB3YXMgZm91bmRgKVxuXG4gICAgdGhpcy5hY3RpdmVTZXF1ZW5jZSA9IG5ldyBTZXF1ZW5jZShzZXF1ZW5jZVNjaGVtYSlcbiAgICB0aGlzLnN0YXRlID0gUFJPR1JBTV9TVEFURS5QTEFZSU5HXG4gICAgcmVtb3ZlQ2hpbGRyZW4oU1RBR0VfRUxFTUVOVClcbiAgfVxufVxuXG4vL1RPRE86IHJlYWxseSBub3QgYSBmYW4gb2YgdGhlIFwiYXNzZXRcIiBjbGFzcyBmb3Igb3BhY2l0eS4gIENvbnNpZGVyIGRpdGNoaW5nIENTUy4uLlxuY29uc3QgQXNzZXQgPSB7XG4gIGZyb21TY2hlbWEoYXNzZXRTY2hlbWEpIHtcbiAgICBzd2l0Y2ggKGFzc2V0U2NoZW1hLnR5cGUpIHtcbiAgICAgIGNhc2UgJ3N0YWdlJzogcmV0dXJuIG5ldyBBc3NldC5TdGFnZShhc3NldFNjaGVtYSlcbiAgICAgIGNhc2UgJ2ltYWdlJzogcmV0dXJuIG5ldyBBc3NldC5JbWFnZShhc3NldFNjaGVtYSlcbiAgICAgIGNhc2UgJ2F1ZGlvJzogcmV0dXJuIG5ldyBBc3NldC5BdWRpbyhhc3NldFNjaGVtYSlcbiAgICAgIGNhc2UgJ3RleHQnOiAgcmV0dXJuIG5ldyBBc3NldC5UZXh0KGFzc2V0U2NoZW1hKVxuICAgICAgZGVmYXVsdDogICAgICByZXR1cm4gbmV3IEFzc2V0LlVua25vd24oYXNzZXRTY2hlbWEpXG4gICAgfVxuICB9LFxuXG4gIFN0YWdlKHtzdHlsZX0pIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBTVEFHRV9FTEVNRU5UXG4gICAgdGhpcy51dWlkID0gJ3N0YWdlJ1xuICAgIGV4dGVuZCh0aGlzLmVsZW1lbnQuc3R5bGUsIHN0eWxlKVxuICB9LFxuXG4gIEltYWdlKHt1dWlkLCBzcmMsIHN0eWxlfSkge1xuICAgIHRoaXMudXVpZCA9IHV1aWRcbiAgICB0aGlzLmVsZW1lbnQgPSBuZXcgSW1hZ2VcbiAgICB0aGlzLmVsZW1lbnQuc3JjID0gc3JjXG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Fzc2V0JylcbiAgICBleHRlbmQodGhpcy5lbGVtZW50LnN0eWxlLCBzdHlsZSlcbiAgfSxcblxuICBUZXh0KHt1dWlkLCB0YWcsIHRleHQsIHN0eWxlfSkge1xuICAgIHRoaXMudXVpZCA9IHV1aWRcbiAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZykgXG4gICAgdGhpcy5lbGVtZW50LmlubmVyVGV4dCA9IHRleHRcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYXNzZXQnKVxuICAgIGV4dGVuZCh0aGlzLmVsZW1lbnQuc3R5bGUsIHN0eWxlKVxuICB9LFxuXG4gIEF1ZGlvKHt1dWlkLCBzcmN9KSB7XG4gICAgdGhpcy51dWlkID0gdXVpZFxuICAgIHRoaXMuc3JjID0gc3JjXG4gIH0sXG5cbiAgVW5rbm93bihzY2hlbWEpIHtcbiAgICB0aGlzLnV1aWQgPSBzY2hlbWEudXVpZFxuICAgIHRoaXMuc2NoZW1hID0gc2NoZW1hIFxuICB9XG59XG5cbmNvbnN0IHByb2dyYW0gPSBuZXcgUHJvZ3JhbShwcm9ncmFtU2NoZW1hKVxuXG5wcm9ncmFtLnN0YXJ0U2VxdWVuY2UoJ2FiYycpXG5zZXRJbnRlcnZhbChtYWtlVXBkYXRlKHByb2dyYW0pLCBUSUNLX0lOVEVSVkFMX01TKVxudG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICBpZiAgICAgIChwcm9ncmFtLnN0YXRlID09PSBQUk9HUkFNX1NUQVRFLlBMQVlJTkcpIHByb2dyYW0uc3RhdGUgPSBQUk9HUkFNX1NUQVRFLlBBVVNFRFxuICBlbHNlIGlmIChwcm9ncmFtLnN0YXRlID09PSBQUk9HUkFNX1NUQVRFLlBBVVNFRCkgIHByb2dyYW0uc3RhdGUgPSBQUk9HUkFNX1NUQVRFLlBMQVlJTkdcbiAgZWxzZSAgICB7fVxufSlcbndpbmRvdy5vbmJsdXIgPSBmdW5jdGlvbiAoKSB7XG4gIGlmIChwcm9ncmFtLnN0YXRlID09PSBQUk9HUkFNX1NUQVRFLlBMQVlJTkcpIHByb2dyYW0uc3RhdGUgPSBQUk9HUkFNX1NUQVRFLlBBVVNFRFxufVxud2luZG93LnByb2dyYW0gPSBwcm9ncmFtXG4iLCIvLyAgICAgdXVpZC5qc1xuLy9cbi8vICAgICBDb3B5cmlnaHQgKGMpIDIwMTAtMjAxMiBSb2JlcnQgS2llZmZlclxuLy8gICAgIE1JVCBMaWNlbnNlIC0gaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXG4oZnVuY3Rpb24oKSB7XG4gIHZhciBfZ2xvYmFsID0gdGhpcztcblxuICAvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiAgV2UgZmVhdHVyZVxuICAvLyBkZXRlY3QgdG8gZGV0ZXJtaW5lIHRoZSBiZXN0IFJORyBzb3VyY2UsIG5vcm1hbGl6aW5nIHRvIGEgZnVuY3Rpb24gdGhhdFxuICAvLyByZXR1cm5zIDEyOC1iaXRzIG9mIHJhbmRvbW5lc3MsIHNpbmNlIHRoYXQncyB3aGF0J3MgdXN1YWxseSByZXF1aXJlZFxuICB2YXIgX3JuZztcblxuICAvLyBOb2RlLmpzIGNyeXB0by1iYXNlZCBSTkcgLSBodHRwOi8vbm9kZWpzLm9yZy9kb2NzL3YwLjYuMi9hcGkvY3J5cHRvLmh0bWxcbiAgLy9cbiAgLy8gTW9kZXJhdGVseSBmYXN0LCBoaWdoIHF1YWxpdHlcbiAgaWYgKHR5cGVvZihfZ2xvYmFsLnJlcXVpcmUpID09ICdmdW5jdGlvbicpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIF9yYiA9IF9nbG9iYWwucmVxdWlyZSgnY3J5cHRvJykucmFuZG9tQnl0ZXM7XG4gICAgICBfcm5nID0gX3JiICYmIGZ1bmN0aW9uKCkge3JldHVybiBfcmIoMTYpO307XG4gICAgfSBjYXRjaChlKSB7fVxuICB9XG5cbiAgaWYgKCFfcm5nICYmIF9nbG9iYWwuY3J5cHRvICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAvLyBXSEFUV0cgY3J5cHRvLWJhc2VkIFJORyAtIGh0dHA6Ly93aWtpLndoYXR3Zy5vcmcvd2lraS9DcnlwdG9cbiAgICAvL1xuICAgIC8vIE1vZGVyYXRlbHkgZmFzdCwgaGlnaCBxdWFsaXR5XG4gICAgdmFyIF9ybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbiAgICBfcm5nID0gZnVuY3Rpb24gd2hhdHdnUk5HKCkge1xuICAgICAgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhfcm5kczgpO1xuICAgICAgcmV0dXJuIF9ybmRzODtcbiAgICB9O1xuICB9XG5cbiAgaWYgKCFfcm5nKSB7XG4gICAgLy8gTWF0aC5yYW5kb20oKS1iYXNlZCAoUk5HKVxuICAgIC8vXG4gICAgLy8gSWYgYWxsIGVsc2UgZmFpbHMsIHVzZSBNYXRoLnJhbmRvbSgpLiAgSXQncyBmYXN0LCBidXQgaXMgb2YgdW5zcGVjaWZpZWRcbiAgICAvLyBxdWFsaXR5LlxuICAgIHZhciAgX3JuZHMgPSBuZXcgQXJyYXkoMTYpO1xuICAgIF9ybmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCByOyBpIDwgMTY7IGkrKykge1xuICAgICAgICBpZiAoKGkgJiAweDAzKSA9PT0gMCkgciA9IE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDAwMDtcbiAgICAgICAgX3JuZHNbaV0gPSByID4+PiAoKGkgJiAweDAzKSA8PCAzKSAmIDB4ZmY7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfcm5kcztcbiAgICB9O1xuICB9XG5cbiAgLy8gQnVmZmVyIGNsYXNzIHRvIHVzZVxuICB2YXIgQnVmZmVyQ2xhc3MgPSB0eXBlb2YoX2dsb2JhbC5CdWZmZXIpID09ICdmdW5jdGlvbicgPyBfZ2xvYmFsLkJ1ZmZlciA6IEFycmF5O1xuXG4gIC8vIE1hcHMgZm9yIG51bWJlciA8LT4gaGV4IHN0cmluZyBjb252ZXJzaW9uXG4gIHZhciBfYnl0ZVRvSGV4ID0gW107XG4gIHZhciBfaGV4VG9CeXRlID0ge307XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgICBfYnl0ZVRvSGV4W2ldID0gKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnN1YnN0cigxKTtcbiAgICBfaGV4VG9CeXRlW19ieXRlVG9IZXhbaV1dID0gaTtcbiAgfVxuXG4gIC8vICoqYHBhcnNlKClgIC0gUGFyc2UgYSBVVUlEIGludG8gaXQncyBjb21wb25lbnQgYnl0ZXMqKlxuICBmdW5jdGlvbiBwYXJzZShzLCBidWYsIG9mZnNldCkge1xuICAgIHZhciBpID0gKGJ1ZiAmJiBvZmZzZXQpIHx8IDAsIGlpID0gMDtcblxuICAgIGJ1ZiA9IGJ1ZiB8fCBbXTtcbiAgICBzLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvWzAtOWEtZl17Mn0vZywgZnVuY3Rpb24ob2N0KSB7XG4gICAgICBpZiAoaWkgPCAxNikgeyAvLyBEb24ndCBvdmVyZmxvdyFcbiAgICAgICAgYnVmW2kgKyBpaSsrXSA9IF9oZXhUb0J5dGVbb2N0XTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFplcm8gb3V0IHJlbWFpbmluZyBieXRlcyBpZiBzdHJpbmcgd2FzIHNob3J0XG4gICAgd2hpbGUgKGlpIDwgMTYpIHtcbiAgICAgIGJ1ZltpICsgaWkrK10gPSAwO1xuICAgIH1cblxuICAgIHJldHVybiBidWY7XG4gIH1cblxuICAvLyAqKmB1bnBhcnNlKClgIC0gQ29udmVydCBVVUlEIGJ5dGUgYXJyYXkgKGFsYSBwYXJzZSgpKSBpbnRvIGEgc3RyaW5nKipcbiAgZnVuY3Rpb24gdW5wYXJzZShidWYsIG9mZnNldCkge1xuICAgIHZhciBpID0gb2Zmc2V0IHx8IDAsIGJ0aCA9IF9ieXRlVG9IZXg7XG4gICAgcmV0dXJuICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXTtcbiAgfVxuXG4gIC8vICoqYHYxKClgIC0gR2VuZXJhdGUgdGltZS1iYXNlZCBVVUlEKipcbiAgLy9cbiAgLy8gSW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL0xpb3NLL1VVSUQuanNcbiAgLy8gYW5kIGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS91dWlkLmh0bWxcblxuICAvLyByYW5kb20gIydzIHdlIG5lZWQgdG8gaW5pdCBub2RlIGFuZCBjbG9ja3NlcVxuICB2YXIgX3NlZWRCeXRlcyA9IF9ybmcoKTtcblxuICAvLyBQZXIgNC41LCBjcmVhdGUgYW5kIDQ4LWJpdCBub2RlIGlkLCAoNDcgcmFuZG9tIGJpdHMgKyBtdWx0aWNhc3QgYml0ID0gMSlcbiAgdmFyIF9ub2RlSWQgPSBbXG4gICAgX3NlZWRCeXRlc1swXSB8IDB4MDEsXG4gICAgX3NlZWRCeXRlc1sxXSwgX3NlZWRCeXRlc1syXSwgX3NlZWRCeXRlc1szXSwgX3NlZWRCeXRlc1s0XSwgX3NlZWRCeXRlc1s1XVxuICBdO1xuXG4gIC8vIFBlciA0LjIuMiwgcmFuZG9taXplICgxNCBiaXQpIGNsb2Nrc2VxXG4gIHZhciBfY2xvY2tzZXEgPSAoX3NlZWRCeXRlc1s2XSA8PCA4IHwgX3NlZWRCeXRlc1s3XSkgJiAweDNmZmY7XG5cbiAgLy8gUHJldmlvdXMgdXVpZCBjcmVhdGlvbiB0aW1lXG4gIHZhciBfbGFzdE1TZWNzID0gMCwgX2xhc3ROU2VjcyA9IDA7XG5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9icm9vZmEvbm9kZS11dWlkIGZvciBBUEkgZGV0YWlsc1xuICBmdW5jdGlvbiB2MShvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICAgIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuICAgIHZhciBiID0gYnVmIHx8IFtdO1xuXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICB2YXIgY2xvY2tzZXEgPSBvcHRpb25zLmNsb2Nrc2VxICE9IG51bGwgPyBvcHRpb25zLmNsb2Nrc2VxIDogX2Nsb2Nrc2VxO1xuXG4gICAgLy8gVVVJRCB0aW1lc3RhbXBzIGFyZSAxMDAgbmFuby1zZWNvbmQgdW5pdHMgc2luY2UgdGhlIEdyZWdvcmlhbiBlcG9jaCxcbiAgICAvLyAoMTU4Mi0xMC0xNSAwMDowMCkuICBKU051bWJlcnMgYXJlbid0IHByZWNpc2UgZW5vdWdoIGZvciB0aGlzLCBzb1xuICAgIC8vIHRpbWUgaXMgaGFuZGxlZCBpbnRlcm5hbGx5IGFzICdtc2VjcycgKGludGVnZXIgbWlsbGlzZWNvbmRzKSBhbmQgJ25zZWNzJ1xuICAgIC8vICgxMDAtbmFub3NlY29uZHMgb2Zmc2V0IGZyb20gbXNlY3MpIHNpbmNlIHVuaXggZXBvY2gsIDE5NzAtMDEtMDEgMDA6MDAuXG4gICAgdmFyIG1zZWNzID0gb3B0aW9ucy5tc2VjcyAhPSBudWxsID8gb3B0aW9ucy5tc2VjcyA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgLy8gUGVyIDQuMi4xLjIsIHVzZSBjb3VudCBvZiB1dWlkJ3MgZ2VuZXJhdGVkIGR1cmluZyB0aGUgY3VycmVudCBjbG9ja1xuICAgIC8vIGN5Y2xlIHRvIHNpbXVsYXRlIGhpZ2hlciByZXNvbHV0aW9uIGNsb2NrXG4gICAgdmFyIG5zZWNzID0gb3B0aW9ucy5uc2VjcyAhPSBudWxsID8gb3B0aW9ucy5uc2VjcyA6IF9sYXN0TlNlY3MgKyAxO1xuXG4gICAgLy8gVGltZSBzaW5jZSBsYXN0IHV1aWQgY3JlYXRpb24gKGluIG1zZWNzKVxuICAgIHZhciBkdCA9IChtc2VjcyAtIF9sYXN0TVNlY3MpICsgKG5zZWNzIC0gX2xhc3ROU2VjcykvMTAwMDA7XG5cbiAgICAvLyBQZXIgNC4yLjEuMiwgQnVtcCBjbG9ja3NlcSBvbiBjbG9jayByZWdyZXNzaW9uXG4gICAgaWYgKGR0IDwgMCAmJiBvcHRpb25zLmNsb2Nrc2VxID09IG51bGwpIHtcbiAgICAgIGNsb2Nrc2VxID0gY2xvY2tzZXEgKyAxICYgMHgzZmZmO1xuICAgIH1cblxuICAgIC8vIFJlc2V0IG5zZWNzIGlmIGNsb2NrIHJlZ3Jlc3NlcyAobmV3IGNsb2Nrc2VxKSBvciB3ZSd2ZSBtb3ZlZCBvbnRvIGEgbmV3XG4gICAgLy8gdGltZSBpbnRlcnZhbFxuICAgIGlmICgoZHQgPCAwIHx8IG1zZWNzID4gX2xhc3RNU2VjcykgJiYgb3B0aW9ucy5uc2VjcyA9PSBudWxsKSB7XG4gICAgICBuc2VjcyA9IDA7XG4gICAgfVxuXG4gICAgLy8gUGVyIDQuMi4xLjIgVGhyb3cgZXJyb3IgaWYgdG9vIG1hbnkgdXVpZHMgYXJlIHJlcXVlc3RlZFxuICAgIGlmIChuc2VjcyA+PSAxMDAwMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCd1dWlkLnYxKCk6IENhblxcJ3QgY3JlYXRlIG1vcmUgdGhhbiAxME0gdXVpZHMvc2VjJyk7XG4gICAgfVxuXG4gICAgX2xhc3RNU2VjcyA9IG1zZWNzO1xuICAgIF9sYXN0TlNlY3MgPSBuc2VjcztcbiAgICBfY2xvY2tzZXEgPSBjbG9ja3NlcTtcblxuICAgIC8vIFBlciA0LjEuNCAtIENvbnZlcnQgZnJvbSB1bml4IGVwb2NoIHRvIEdyZWdvcmlhbiBlcG9jaFxuICAgIG1zZWNzICs9IDEyMjE5MjkyODAwMDAwO1xuXG4gICAgLy8gYHRpbWVfbG93YFxuICAgIHZhciB0bCA9ICgobXNlY3MgJiAweGZmZmZmZmYpICogMTAwMDAgKyBuc2VjcykgJSAweDEwMDAwMDAwMDtcbiAgICBiW2krK10gPSB0bCA+Pj4gMjQgJiAweGZmO1xuICAgIGJbaSsrXSA9IHRsID4+PiAxNiAmIDB4ZmY7XG4gICAgYltpKytdID0gdGwgPj4+IDggJiAweGZmO1xuICAgIGJbaSsrXSA9IHRsICYgMHhmZjtcblxuICAgIC8vIGB0aW1lX21pZGBcbiAgICB2YXIgdG1oID0gKG1zZWNzIC8gMHgxMDAwMDAwMDAgKiAxMDAwMCkgJiAweGZmZmZmZmY7XG4gICAgYltpKytdID0gdG1oID4+PiA4ICYgMHhmZjtcbiAgICBiW2krK10gPSB0bWggJiAweGZmO1xuXG4gICAgLy8gYHRpbWVfaGlnaF9hbmRfdmVyc2lvbmBcbiAgICBiW2krK10gPSB0bWggPj4+IDI0ICYgMHhmIHwgMHgxMDsgLy8gaW5jbHVkZSB2ZXJzaW9uXG4gICAgYltpKytdID0gdG1oID4+PiAxNiAmIDB4ZmY7XG5cbiAgICAvLyBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGAgKFBlciA0LjIuMiAtIGluY2x1ZGUgdmFyaWFudClcbiAgICBiW2krK10gPSBjbG9ja3NlcSA+Pj4gOCB8IDB4ODA7XG5cbiAgICAvLyBgY2xvY2tfc2VxX2xvd2BcbiAgICBiW2krK10gPSBjbG9ja3NlcSAmIDB4ZmY7XG5cbiAgICAvLyBgbm9kZWBcbiAgICB2YXIgbm9kZSA9IG9wdGlvbnMubm9kZSB8fCBfbm9kZUlkO1xuICAgIGZvciAodmFyIG4gPSAwOyBuIDwgNjsgbisrKSB7XG4gICAgICBiW2kgKyBuXSA9IG5vZGVbbl07XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZiA/IGJ1ZiA6IHVucGFyc2UoYik7XG4gIH1cblxuICAvLyAqKmB2NCgpYCAtIEdlbmVyYXRlIHJhbmRvbSBVVUlEKipcblxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2Jyb29mYS9ub2RlLXV1aWQgZm9yIEFQSSBkZXRhaWxzXG4gIGZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gICAgLy8gRGVwcmVjYXRlZCAtICdmb3JtYXQnIGFyZ3VtZW50LCBhcyBzdXBwb3J0ZWQgaW4gdjEuMlxuICAgIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuXG4gICAgaWYgKHR5cGVvZihvcHRpb25zKSA9PSAnc3RyaW5nJykge1xuICAgICAgYnVmID0gb3B0aW9ucyA9PSAnYmluYXJ5JyA/IG5ldyBCdWZmZXJDbGFzcygxNikgOiBudWxsO1xuICAgICAgb3B0aW9ucyA9IG51bGw7XG4gICAgfVxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgX3JuZykoKTtcblxuICAgIC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcbiAgICBybmRzWzZdID0gKHJuZHNbNl0gJiAweDBmKSB8IDB4NDA7XG4gICAgcm5kc1s4XSA9IChybmRzWzhdICYgMHgzZikgfCAweDgwO1xuXG4gICAgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG4gICAgaWYgKGJ1Zikge1xuICAgICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IDE2OyBpaSsrKSB7XG4gICAgICAgIGJ1ZltpICsgaWldID0gcm5kc1tpaV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZiB8fCB1bnBhcnNlKHJuZHMpO1xuICB9XG5cbiAgLy8gRXhwb3J0IHB1YmxpYyBBUElcbiAgdmFyIHV1aWQgPSB2NDtcbiAgdXVpZC52MSA9IHYxO1xuICB1dWlkLnY0ID0gdjQ7XG4gIHV1aWQucGFyc2UgPSBwYXJzZTtcbiAgdXVpZC51bnBhcnNlID0gdW5wYXJzZTtcbiAgdXVpZC5CdWZmZXJDbGFzcyA9IEJ1ZmZlckNsYXNzO1xuXG4gIGlmICh0eXBlb2YobW9kdWxlKSAhPSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIC8vIFB1Ymxpc2ggYXMgbm9kZS5qcyBtb2R1bGVcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHV1aWQ7XG4gIH0gZWxzZSAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIC8vIFB1Ymxpc2ggYXMgQU1EIG1vZHVsZVxuICAgIGRlZmluZShmdW5jdGlvbigpIHtyZXR1cm4gdXVpZDt9KTtcbiBcblxuICB9IGVsc2Uge1xuICAgIC8vIFB1Ymxpc2ggYXMgZ2xvYmFsIChpbiBicm93c2VycylcbiAgICB2YXIgX3ByZXZpb3VzUm9vdCA9IF9nbG9iYWwudXVpZDtcblxuICAgIC8vICoqYG5vQ29uZmxpY3QoKWAgLSAoYnJvd3NlciBvbmx5KSB0byByZXNldCBnbG9iYWwgJ3V1aWQnIHZhcioqXG4gICAgdXVpZC5ub0NvbmZsaWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICBfZ2xvYmFsLnV1aWQgPSBfcHJldmlvdXNSb290O1xuICAgICAgcmV0dXJuIHV1aWQ7XG4gICAgfTtcblxuICAgIF9nbG9iYWwudXVpZCA9IHV1aWQ7XG4gIH1cbn0pLmNhbGwodGhpcyk7XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIHV1aWQ6ICdwcm9ncmFtJyxcbiAgbmFtZTogJ1Rlc3QgcHJvZ3JhbScsXG4gIHZhcmlhYmxlU2NoZW1hczogW3tcbiAgICBuYW1lOiAnYWdlJyxcbiAgICB0eXBlOiBcIk51bWJlclwiLFxuICAgIG1pbjogMCxcbiAgICBtYXg6IDI1MCxcbiAgICB2YWx1ZTogMjBcbiAgfV0sXG4gIHNlcXVlbmNlU2NoZW1hczogW3tcbiAgICBuYW1lOiAnc2Vjb25kJyxcbiAgICB1dWlkOiAnZGVmJyxcbiAgICBjb25uZWN0aW9uU2NoZW1hczogW3tcbiAgICAgIGV4cHJlc3Npb246IFwidHJ1ZVwiLFxuICAgICAgc2VxdWVuY2VVVUlEOiBudWxsXG4gICAgfV0sXG4gICAgYXNzZXRTY2hlbWFzOiBbe1xuICAgICAgdXVpZDogJ3N0YWdlJyxcbiAgICAgIHR5cGU6ICdzdGFnZScsXG4gICAgICBzdHlsZToge31cbiAgICB9LCB7XG4gICAgICB1dWlkOiAnMTIzJyxcbiAgICAgIHR5cGU6ICdpbWFnZScsXG4gICAgICBzcmM6ICdlbW1pLnBuZycsXG4gICAgICBzdHlsZToge30gXG4gICAgfSwge1xuICAgICAgdXVpZDogJzQ1NicsXG4gICAgICB0eXBlOiAnYXVkaW8nLFxuICAgICAgc3JjOiBbJ3Rlc3QubXAzJ11cbiAgICB9LCB7XG4gICAgICB1dWlkOiAnNzg5JyxcbiAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgIHRhZzogJ3AnLFxuICAgICAgdGV4dDogJ0NsaWNrIHRoZSBsb2dvIHRvIGNvbnRpbnVlJyxcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgIGZvbnQ6ICczMHB4IGFyaWVsLCBzYW5zLXNlcmlmJyxcbiAgICAgICAgY29sb3I6ICdibHVlJyBcbiAgICAgIH0gXG4gICAgfV0sXG4gICAgdGFza1NjaGVtYXM6IFtdXG4gIH0sIHtcbiAgICBuYW1lOiAnbWFpbicsXG4gICAgdXVpZDogJ2FiYycsXG4gICAgY29ubmVjdGlvblNjaGVtYXM6IFt7XG4gICAgICBleHByZXNzaW9uOiBcInRydWVcIixcbiAgICAgIHNlcXVlbmNlVVVJRDogXCJkZWZcIlxuICAgIH1dLFxuICAgIGFzc2V0U2NoZW1hczogW3tcbiAgICAgIHV1aWQ6ICdzdGFnZScsXG4gICAgICB0eXBlOiAnc3RhZ2UnLFxuICAgICAgc3R5bGU6IHt9XG4gICAgfSwge1xuICAgICAgdXVpZDogJzEyMycsXG4gICAgICB0eXBlOiAnaW1hZ2UnLFxuICAgICAgc3JjOiAnZW1taS5wbmcnLFxuICAgICAgc3R5bGU6IHt9IFxuICAgIH0sIHtcbiAgICAgIHV1aWQ6ICc0NTYnLFxuICAgICAgdHlwZTogJ2F1ZGlvJyxcbiAgICAgIHNyYzogWyd0ZXN0Lm1wMyddXG4gICAgfSwge1xuICAgICAgdXVpZDogJzc4OScsXG4gICAgICB0eXBlOiAndGV4dCcsXG4gICAgICB0YWc6ICdwJyxcbiAgICAgIHRleHQ6ICdDbGljayB0aGUgbG9nbyB0byBjb250aW51ZScsXG4gICAgICBzdHlsZToge1xuICAgICAgICBmb250OiAnMzBweCBhcmllbCwgc2Fucy1zZXJpZicsXG4gICAgICAgIGNvbG9yOiAnYmx1ZScgXG4gICAgICB9IFxuICAgIH1dLFxuXG4gICAgdGFza1NjaGVtYXM6IFt7XG4gICAgICB0eXBlOiAncGFyYWxsZWwnLFxuICAgICAgdGFza1NjaGVtYXM6IFt7XG4gICAgICAgIHR5cGU6ICdzZXJpYWwnLFxuICAgICAgICB0YXNrU2NoZW1hczogW3tcbiAgICAgICAgICB0eXBlOiAnaW5zZXJ0JywgXG4gICAgICAgICAgcGFyZW50OiAnc3RhZ2UnLFxuICAgICAgICAgIHN1YmplY3Q6ICcxMjMnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICB0eXBlOiAnZmFkZS1pbicsXG4gICAgICAgICAgc3ViamVjdDogJzEyMydcbiAgICAgICAgfSwge1xuICAgICAgICAgIHR5cGU6ICdpbnNlcnQnLFxuICAgICAgICAgIHBhcmVudDogJ3N0YWdlJyxcbiAgICAgICAgICBzdWJqZWN0OiAnNzg5J1xuICAgICAgICB9LCB7XG4gICAgICAgICAgdHlwZTogJ2ZhZGUtaW4nLFxuICAgICAgICAgIHN1YmplY3Q6ICc3ODknXG4gICAgICAgIH0sIHtcbiAgICAgICAgICB0eXBlOiAnaW8nLFxuICAgICAgICAgIHN1YmplY3Q6ICc3ODknICAgXG4gICAgICAgIH0sIHtcbiAgICAgICAgICB0eXBlOiAncGFyYWxsZWwnLFxuICAgICAgICAgIHRhc2tTY2hlbWFzOiBbe1xuICAgICAgICAgICAgdHlwZTogJ3NlcmlhbCcsXG4gICAgICAgICAgICB0YXNrU2NoZW1hczogW3tcbiAgICAgICAgICAgICAgdHlwZTogJ2ZhZGUtb3V0JyxcbiAgICAgICAgICAgICAgc3ViamVjdDogJzEyMydcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgdHlwZTogJ3JlbW92ZScsXG4gICAgICAgICAgICAgIHBhcmVudDogJ3N0YWdlJyxcbiAgICAgICAgICAgICAgc3ViamVjdDogJzEyMydcbiAgICAgICAgICAgIH1dXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgdHlwZTogJ3NlcmlhbCcsXG4gICAgICAgICAgICB0YXNrU2NoZW1hczogW3tcbiAgICAgICAgICAgICAgdHlwZTogJ2ZhZGUtb3V0JyxcbiAgICAgICAgICAgICAgc3ViamVjdDogJzc4OSdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgdHlwZTogJ3JlbW92ZScsXG4gICAgICAgICAgICAgIHBhcmVudDogJ3N0YWdlJyxcbiAgICAgICAgICAgICAgc3ViamVjdDogJzc4OSdcbiAgICAgICAgICAgIH1dXG4gICAgICAgICAgfV0gIFxuICAgICAgICB9XSBcbiAgICAgIH1dICAgXG4gICAgfSwge1xuICAgICAgdHlwZTogJ2F1ZGlvLXBsYXknLFxuICAgICAgc3ViamVjdDogJzQ1NidcbiAgICB9XVxuICB9XVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIHBwIChvYmopIHtcbiAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkob2JqLCBudWxsLCAyKSlcbn1cblxuZXhwb3J0IGNvbnN0IGxvZyA9IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSlcblxuLy9zaGFsbG93IGNsb25lIC0tIG5vdCBpZGVhbCBhcyBtaWdodCB0cmlnZ2VyIGRpY3Rpb25hcnkgbW9kZT9cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZSAob2JqKSB7XG4gIGxldCBvdXQgPSB7fVxuXG4gIGZvciAobGV0IGtleSBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIG91dFtrZXldID0gb2JqW2tleV0gXG4gIH0gXG4gIHJldHVybiBvdXRcbn1cblxuLy9tdXRhdGl2ZSFcbmV4cG9ydCBmdW5jdGlvbiBleHRlbmQgKG9iaiwgbmV4dCkge1xuICBmb3IgKGxldCBrZXkgaW4gbmV4dCkge1xuICAgIGlmIChuZXh0Lmhhc093blByb3BlcnR5KGtleSkpIG9ialtrZXldID0gbmV4dFtrZXldXG4gIH0gXG4gIHJldHVybiBvYmpcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmQgKHByZWRGbiwgYXJyYXkpIHtcbiAgZm9yIChsZXQgaXRlbSBvZiBhcnJheSkge1xuICAgIGlmIChwcmVkRm4oaXRlbSkpIHJldHVybiBpdGVtXG4gIH1cbiAgcmV0dXJuIG51bGxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRXaGVyZShrZXksIHZhbCwgYXJyYXkpIHtcbiAgZm9yIChsZXQgaXRlbSBvZiBhcnJheSkge1xuICAgIGlmIChpdGVtW2tleV0gPT09IHZhbCkgcmV0dXJuIGl0ZW0gXG4gIH1cbiAgcmV0dXJuIG51bGxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUNoaWxkcmVuIChlbGVtZW50KSB7XG4gIHdoaWxlIChlbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICBlbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQuZmlyc3RDaGlsZCkgXG4gIH1cbn1cbiJdfQ==
