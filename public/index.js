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
    this.tasks = Serial([Wait(48), Parallel([PlayAudio((0, _utils.findWhere)('uuid', '456', this.assets)), Serial([Insert((0, _utils.findWhere)('uuid', 'stage', this.assets), (0, _utils.findWhere)('uuid', '123', this.assets)), FadeIn((0, _utils.findWhere)('uuid', '123', this.assets))])])]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIkM6L1VzZXJzL2thbmVzXzAwMC9wcm9qZWN0cy90YXNrLXJlbmRlcmVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL25vZGUtdXVpZC91dWlkLmpzIiwiQzovVXNlcnMva2FuZXNfMDAwL3Byb2plY3RzL3Rhc2stcmVuZGVyZXIvcHJvZ3JhbVNjaGVtYS5qcyIsIkM6L1VzZXJzL2thbmVzXzAwMC9wcm9qZWN0cy90YXNrLXJlbmRlcmVyL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O2lCQ3dDVyxRQUFRLEVBWVIsTUFBTSxFQVFOLElBQUksRUFVSixNQUFNLEVBa0JOLE9BQU8sRUFpQlAsTUFBTSxFQUlOLE1BQU0sRUFJTixFQUFFLEVBUUYsU0FBUzs7Ozt3QkF6SEssV0FBVzs7cUJBQ2tDLFNBQVM7OzZCQUNyRCxpQkFBaUI7Ozs7QUFFM0MsSUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFBO0FBQ2QsSUFBTSxnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFBOztBQUVuQyxJQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQ3RELElBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUE7O0FBRXZELElBQU0sYUFBYSxHQUFHO0FBQ3BCLFNBQU8sRUFBRSxDQUFDO0FBQ1YsT0FBSyxFQUFFLENBQUM7QUFDUixTQUFPLEVBQUUsQ0FBQztBQUNWLFFBQU0sRUFBRSxDQUFDO0FBQ1QsTUFBSSxFQUFFLENBQUM7Q0FDUixDQUFBOztBQUVELFNBQVMsVUFBVSxDQUFFLE9BQU8sRUFBRTtBQUM1QixNQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7QUFDekIsTUFBSSxRQUFR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Q0FBQTtDQUNsRixDQUFBO0FBQ0QsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7OztBQzFQeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztxQkN2UGU7QUFDYixNQUFJLEVBQUUsU0FBUztBQUNmLE1BQUksRUFBRSxjQUFjO0FBQ3BCLGlCQUFlLEVBQUUsQ0FBQztBQUNoQixRQUFJLEVBQUUsS0FBSztBQUNYLFFBQUksRUFBRSxRQUFRO0FBQ2QsT0FBRyxFQUFFLENBQUM7QUFDTixPQUFHLEVBQUUsR0FBRztBQUNSLFNBQUssRUFBRSxFQUFFO0dBQ1YsQ0FBQztBQUNGLGlCQUFlLEVBQUUsQ0FBQztBQUNoQixRQUFJLEVBQUUsUUFBUTtBQUNkLFFBQUksRUFBRSxLQUFLO0FBQ1gscUJBQWlCLEVBQUUsQ0FBQztBQUNsQixnQkFBVSxFQUFFLE1BQU07QUFDbEIsa0JBQVksRUFBRSxJQUFJO0tBQ25CLENBQUM7QUFDRixnQkFBWSxFQUFFLENBQUM7QUFDYixVQUFJLEVBQUUsT0FBTztBQUNiLFVBQUksRUFBRSxPQUFPO0FBQ2IsV0FBSyxFQUFFLEVBQUU7S0FDVixFQUFFO0FBQ0QsVUFBSSxFQUFFLEtBQUs7QUFDWCxVQUFJLEVBQUUsT0FBTztBQUNiLFNBQUcsRUFBRSxVQUFVO0FBQ2YsV0FBSyxFQUFFLEVBQUU7S0FDVixFQUFFO0FBQ0QsVUFBSSxFQUFFLEtBQUs7QUFDWCxVQUFJLEVBQUUsT0FBTztBQUNiLFNBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztLQUNsQixFQUFFO0FBQ0QsVUFBSSxFQUFFLEtBQUs7QUFDWCxVQUFJLEVBQUUsTUFBTTtBQUNaLFNBQUcsRUFBRSxHQUFHO0FBQ1IsVUFBSSxFQUFFLDRCQUE0QjtBQUNsQyxXQUFLLEVBQUU7QUFDTCxZQUFJLEVBQUUsd0JBQXdCO0FBQzlCLGFBQUssRUFBRSxNQUFNO09BQ2Q7S0FDRixDQUFDO0FBQ0YsZUFBVyxFQUFFLEVBQUU7R0FDaEIsRUFBRTtBQUNELFFBQUksRUFBRSxNQUFNO0FBQ1osUUFBSSxFQUFFLEtBQUs7QUFDWCxxQkFBaUIsRUFBRSxDQUFDO0FBQ2xCLGdCQUFVLEVBQUUsTUFBTTtBQUNsQixrQkFBWSxFQUFFLEtBQUs7S0FDcEIsQ0FBQztBQUNGLGdCQUFZLEVBQUUsQ0FBQztBQUNiLFVBQUksRUFBRSxPQUFPO0FBQ2IsVUFBSSxFQUFFLE9BQU87QUFDYixXQUFLLEVBQUUsRUFBRTtLQUNWLEVBQUU7QUFDRCxVQUFJLEVBQUUsS0FBSztBQUNYLFVBQUksRUFBRSxPQUFPO0FBQ2IsU0FBRyxFQUFFLFVBQVU7QUFDZixXQUFLLEVBQUUsRUFBRTtLQUNWLEVBQUU7QUFDRCxVQUFJLEVBQUUsS0FBSztBQUNYLFVBQUksRUFBRSxPQUFPO0FBQ2IsU0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0tBQ2xCLEVBQUU7QUFDRCxVQUFJLEVBQUUsS0FBSztBQUNYLFVBQUksRUFBRSxNQUFNO0FBQ1osU0FBRyxFQUFFLEdBQUc7QUFDUixVQUFJLEVBQUUsNEJBQTRCO0FBQ2xDLFdBQUssRUFBRTtBQUNMLFlBQUksRUFBRSx3QkFBd0I7QUFDOUIsYUFBSyxFQUFFLE1BQU07T0FDZDtLQUNGLENBQUM7O0FBRUYsZUFBVyxFQUFFLENBQUM7QUFDWixVQUFJLEVBQUUsVUFBVTtBQUNoQixpQkFBVyxFQUFFLENBQUM7QUFDWixZQUFJLEVBQUUsUUFBUTtBQUNkLG1CQUFXLEVBQUUsQ0FBQztBQUNaLGNBQUksRUFBRSxRQUFRO0FBQ2QsZ0JBQU0sRUFBRSxPQUFPO0FBQ2YsaUJBQU8sRUFBRSxLQUFLO1NBQ2YsRUFBRTtBQUNELGNBQUksRUFBRSxTQUFTO0FBQ2YsaUJBQU8sRUFBRSxLQUFLO1NBQ2YsRUFBRTtBQUNELGNBQUksRUFBRSxRQUFRO0FBQ2QsZ0JBQU0sRUFBRSxPQUFPO0FBQ2YsaUJBQU8sRUFBRSxLQUFLO1NBQ2YsRUFBRTtBQUNELGNBQUksRUFBRSxTQUFTO0FBQ2YsaUJBQU8sRUFBRSxLQUFLO1NBQ2YsRUFBRTtBQUNELGNBQUksRUFBRSxJQUFJO0FBQ1YsaUJBQU8sRUFBRSxLQUFLO1NBQ2YsRUFBRTtBQUNELGNBQUksRUFBRSxVQUFVO0FBQ2hCLHFCQUFXLEVBQUUsQ0FBQztBQUNaLGdCQUFJLEVBQUUsUUFBUTtBQUNkLHVCQUFXLEVBQUUsQ0FBQztBQUNaLGtCQUFJLEVBQUUsVUFBVTtBQUNoQixxQkFBTyxFQUFFLEtBQUs7YUFDZixFQUFFO0FBQ0Qsa0JBQUksRUFBRSxRQUFRO0FBQ2Qsb0JBQU0sRUFBRSxPQUFPO0FBQ2YscUJBQU8sRUFBRSxLQUFLO2FBQ2YsQ0FBQztXQUNILEVBQUU7QUFDRCxnQkFBSSxFQUFFLFFBQVE7QUFDZCx1QkFBVyxFQUFFLENBQUM7QUFDWixrQkFBSSxFQUFFLFVBQVU7QUFDaEIscUJBQU8sRUFBRSxLQUFLO2FBQ2YsRUFBRTtBQUNELGtCQUFJLEVBQUUsUUFBUTtBQUNkLG9CQUFNLEVBQUUsT0FBTztBQUNmLHFCQUFPLEVBQUUsS0FBSzthQUNmLENBQUM7V0FDSCxDQUFDO1NBQ0gsQ0FBQztPQUNILENBQUM7S0FDSCxFQUFFO0FBQ0QsVUFBSSxFQUFFLFlBQVk7QUFDbEIsYUFBTyxFQUFFLEtBQUs7S0FDZixDQUFDO0dBQ0gsQ0FBQztDQUNIOzs7Ozs7Ozs7Ozs7Ozs7O0FDM0hNLFNBQVMsRUFBRSxDQUFFLEdBQUcsRUFBRTtBQUN2QixTQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0NBQzFDOztBQUVNLElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBOzs7OztBQUdyQyxTQUFTLEtBQUssQ0FBRSxHQUFHLEVBQUU7QUFDMUIsTUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBOztBQUVaLE9BQUssSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFO0FBQ25CLFFBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0dBQ2pEO0FBQ0QsU0FBTyxHQUFHLENBQUE7Q0FDWDs7OztBQUdNLFNBQVMsTUFBTSxDQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDakMsT0FBSyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUU7QUFDcEIsUUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7R0FDbkQ7QUFDRCxTQUFPLEdBQUcsQ0FBQTtDQUNYOztBQUVNLFNBQVMsSUFBSSxDQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Ozs7OztBQUNuQyx5QkFBaUIsS0FBSyw4SEFBRTtVQUFmLElBQUk7O0FBQ1gsVUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxJQUFJLENBQUE7S0FDOUI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDRCxTQUFPLElBQUksQ0FBQTtDQUNaOztBQUVNLFNBQVMsU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFOzs7Ozs7QUFDekMsMEJBQWlCLEtBQUssbUlBQUU7VUFBZixJQUFJOztBQUNYLFVBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsRUFBRSxPQUFPLElBQUksQ0FBQTtLQUNuQzs7Ozs7Ozs7Ozs7Ozs7OztBQUNELFNBQU8sSUFBSSxDQUFBO0NBQ1o7O0FBRU0sU0FBUyxjQUFjLENBQUUsT0FBTyxFQUFFO0FBQ3ZDLFNBQU8sT0FBTyxDQUFDLFVBQVUsRUFBRTtBQUN6QixXQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQTtHQUN4QztDQUNGIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7djQgYXMgdXVpZH0gZnJvbSAnbm9kZS11dWlkJ1xyXG5pbXBvcnQge3BwLCBsb2csIGNsb25lLCBleHRlbmQsIGZpbmQsIGZpbmRXaGVyZSwgcmVtb3ZlQ2hpbGRyZW59IGZyb20gJy4vdXRpbHMnXHJcbmltcG9ydCBwcm9ncmFtU2NoZW1hIGZyb20gJy4vcHJvZ3JhbVNjaGVtYSdcclxuXHJcbmNvbnN0IEZQUyA9IDI0XHJcbmNvbnN0IFRJQ0tfSU5URVJWQUxfTVMgPSAxMDAwIC8gRlBTXHJcblxyXG5jb25zdCBTVEFHRV9FTEVNRU5UID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YWdlJylcclxuY29uc3QgVE9HR0xFX0JVVFRPTiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2dnbGUnKVxyXG5cclxuY29uc3QgUFJPR1JBTV9TVEFURSA9IHtcclxuICBMT0FESU5HOiAwLFxyXG4gIFJFQURZOiAxLFxyXG4gIFBMQVlJTkc6IDIsXHJcbiAgUEFVU0VEOiAzLFxyXG4gIERPTkU6IDRcclxufVxyXG5cclxuZnVuY3Rpb24gbWFrZVVwZGF0ZSAocHJvZ3JhbSkge1xyXG4gIGxldCBsYXN0VGltZSA9IERhdGUubm93KClcclxuICBsZXQgdGhpc1RpbWUgPSBsYXN0VGltZVxyXG4gIGxldCBkVCA9IDBcclxuXHJcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgIGxhc3RUaW1lID0gdGhpc1RpbWVcclxuICAgIHRoaXNUaW1lID0gRGF0ZS5ub3coKVxyXG4gICAgZFQgPSB0aGlzVGltZSAtIGxhc3RUaW1lXHJcblxyXG4gICAgLy9UT0RPOiBjaGVjayB0aGF0IGRUIGlzIGluIHZhbGlkIHJhbmdlIGZvciBcIm5vcm1hbCB0aWNrXCJcclxuICAgIGlmIChwcm9ncmFtLmFjdGl2ZVNlcXVlbmNlKSB7XHJcbiAgICAgIGlmIChwcm9ncmFtLmFjdGl2ZVNlcXVlbmNlLnRhc2tzLm5leHQocHJvZ3JhbS5zdGF0ZSkuZG9uZSkge1xyXG4gICAgICAgIGxldCB0YXJnZXRTZXF1ZW5jZSA9IHByb2dyYW0uYWN0aXZlU2VxdWVuY2UuZmluZE5leHQocHJvZ3JhbS52YXJpYWJsZXMpXHJcblxyXG4gICAgICAgIGlmICh0YXJnZXRTZXF1ZW5jZSkgcHJvZ3JhbS5zdGFydFNlcXVlbmNlKHRhcmdldFNlcXVlbmNlKSBcclxuICAgICAgICBlbHNlICAgICAgICAgICAgICAgIHByb2dyYW0uc3RhdGUgPSBQUk9HUkFNX1NUQVRFLkRPTkVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gKiBQYXJhbGxlbCAodGFza3MpIHtcclxuICB3aGlsZSAodGFza3MubGVuZ3RoKSB7XHJcbiAgICBsZXQgc3RhdGUgPSB5aWVsZFxyXG5cclxuICAgIGZvciAobGV0IHRhc2sgb2YgdGFza3MpIHtcclxuICAgICAgaWYgKHRhc2submV4dChzdGF0ZSkuZG9uZSkge1xyXG4gICAgICAgIHRhc2tzLnNwbGljZSh0YXNrcy5pbmRleE9mKHRhc2spLCAxKVxyXG4gICAgICB9XHJcbiAgICB9IFxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gKiBTZXJpYWwgKHRhc2tzKSB7XHJcbiAgd2hpbGUgKHRhc2tzLmxlbmd0aCkge1xyXG4gICAgbGV0IHN0YXRlID0geWllbGRcclxuXHJcbiAgICBpZiAodGFza3NbMF0ubmV4dChzdGF0ZSkuZG9uZSkgdGFza3Muc2hpZnQoKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gKiBXYWl0IChkdXJhdGlvbikge1xyXG4gIGxldCBlbGFwc2VkID0gMCBcclxuXHJcbiAgd2hpbGUgKGVsYXBzZWQgPCBkdXJhdGlvbikge1xyXG4gICAgbGV0IHN0YXRlID0geWllbGRcclxuXHJcbiAgICBpZiAoc3RhdGUgPT09IFBST0dSQU1fU1RBVEUuUExBWUlORykgZWxhcHNlZCsrXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiAqIEZhZGVJbiAoZG9tQXNzZXQpIHtcclxuICBsZXQgZWxhcHNlZCA9IDBcclxuICBsZXQgZHVyYXRpb24gPSAxMlxyXG4gIGxldCBjbGFzc0FkZGVkID0gZmFsc2VcclxuXHJcbiAgd2hpbGUgKGVsYXBzZWQgPCBkdXJhdGlvbikge1xyXG4gICAgbGV0IHN0YXRlID0geWllbGRcclxuXHJcbiAgICBpZiAoc3RhdGUgPT09IFBST0dSQU1fU1RBVEUuUExBWUlORykge1xyXG4gICAgICBpZiAoIWNsYXNzQWRkZWQpIHtcclxuICAgICAgICBkb21Bc3NldC5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbiAgICAgICAgY2xhc3NBZGRlZCA9IHRydWVcclxuICAgICAgfVxyXG4gICAgICBlbGFwc2VkKytcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uICogRmFkZU91dCAoZG9tQXNzZXQpIHtcclxuICBsZXQgcmVtYWluaW5nID0gMTJcclxuICBsZXQgY2xhc3NSZW1vdmVkID0gZmFsc2VcclxuXHJcbiAgd2hpbGUgKHJlbWFpbmluZyA+IDApIHtcclxuICAgIGxldCBzdGF0ZSA9IHlpZWxkXHJcblxyXG4gICAgaWYgKHN0YXRlID09PSBQUk9HUkFNX1NUQVRFLlBMQVlJTkcpIHtcclxuICAgICAgaWYgKCFjbGFzc1JlbW92ZWQpIHtcclxuICAgICAgICBkb21Bc3NldC5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXHJcbiAgICAgICAgY2xhc3NSZW1vdmVkID0gdHJ1ZVxyXG4gICAgICB9XHJcbiAgICAgIHJlbWFpbmluZy0tXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiAqIEluc2VydCAocGFyZW50LCBkb21Bc3NldCkge1xyXG4gIHBhcmVudC5lbGVtZW50LmFwcGVuZENoaWxkKGRvbUFzc2V0LmVsZW1lbnQpXHJcbn1cclxuXHJcbmZ1bmN0aW9uICogUmVtb3ZlIChwYXJlbnQsIGRvbUFzc2V0KSB7XHJcbiAgcGFyZW50LmVsZW1lbnQucmVtb3ZlQ2hpbGQoZG9tQXNzZXQuZWxlbWVudClcclxufVxyXG5cclxuZnVuY3Rpb24gKiBJTyAoZG9tQXNzZXQpIHtcclxuICBsZXQgZG9uZSA9IGZhbHNlICBcclxuICBsZXQgbGlzdGVuZXIgPSBkb21Bc3NldC5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gZG9uZSA9IHRydWUpXHJcblxyXG4gIHdoaWxlICghZG9uZSkgeWllbGRcclxuICBkb21Bc3NldC5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIobGlzdGVuZXIpXHJcbn1cclxuXHJcbmZ1bmN0aW9uICogUGxheUF1ZGlvIChhdWRpb0Fzc2V0KSB7XHJcbiAgbGV0IGRvbmUgPSBmYWxzZVxyXG4gIGxldCBzb3VuZCA9IG5ldyBIb3dsKHtcclxuICAgIHNyYzogYXVkaW9Bc3NldC5zcmMsXHJcbiAgICBvbmVuZDogKCkgPT4gZG9uZSA9IHRydWVcclxuICB9KVxyXG5cclxuICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgaWYgKGRvbmUpIGJyZWFrXHJcbiAgICBpZiAoc3RhdGUgPT09IFBST0dSQU1fU1RBVEUuUEFVU0VEICYmIHNvdW5kLnBsYXlpbmcoKSkgICBzb3VuZC5wYXVzZSgpXHJcbiAgICBpZiAoc3RhdGUgPT09IFBST0dSQU1fU1RBVEUuUExBWUlORyAmJiAhc291bmQucGxheWluZygpKSBzb3VuZC5wbGF5KClcclxuXHJcbiAgICBsZXQgc3RhdGUgPSB5aWVsZFxyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgQ29ubmVjdGlvbiB7XHJcbiAgY29uc3RydWN0b3Ioe2V4cHJlc3Npb24sIHNlcXVlbmNlVVVJRH0pIHtcclxuICAgIHRoaXMuZXhwcmVzc2lvbiA9IG5ldyBGdW5jdGlvbignJCcsIGByZXR1cm4gJHtleHByZXNzaW9ufWApIFxyXG4gICAgdGhpcy5zZXF1ZW5jZVVVSUQgPSBzZXF1ZW5jZVVVSURcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIFNlcXVlbmNlIHtcclxuICBjb25zdHJ1Y3Rvcih7dXVpZCwgbmFtZSwgYXNzZXRTY2hlbWFzLCB0YXNrU2NoZW1hcywgY29ubmVjdGlvblNjaGVtYXN9KSB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lXHJcbiAgICB0aGlzLnV1aWQgPSB1dWlkXHJcbiAgICB0aGlzLmFzc2V0cyA9IGFzc2V0U2NoZW1hcy5tYXAoQXNzZXQuZnJvbVNjaGVtYSlcclxuICAgIHRoaXMudGFza3MgPSBTZXJpYWwoW1xyXG4gICAgICBXYWl0KDQ4KSwgXHJcbiAgICAgIFBhcmFsbGVsKFtcclxuICAgICAgICBQbGF5QXVkaW8oZmluZFdoZXJlKCd1dWlkJywgJzQ1NicsIHRoaXMuYXNzZXRzKSksXHJcbiAgICAgICAgU2VyaWFsKFtcclxuICAgICAgICAgIEluc2VydChmaW5kV2hlcmUoJ3V1aWQnLCAnc3RhZ2UnLCB0aGlzLmFzc2V0cyksIGZpbmRXaGVyZSgndXVpZCcsICcxMjMnLCB0aGlzLmFzc2V0cykpLFxyXG4gICAgICAgICAgRmFkZUluKGZpbmRXaGVyZSgndXVpZCcsICcxMjMnLCB0aGlzLmFzc2V0cykpXHJcbiAgICAgICAgXSlcclxuICAgICAgXSlcclxuICAgIF0pXHJcbiAgICB0aGlzLmNvbm5lY3Rpb25zID0gY29ubmVjdGlvblNjaGVtYXMubWFwKHMgPT4gbmV3IENvbm5lY3Rpb24ocykpXHJcbiAgfVxyXG5cclxuICBmaW5kTmV4dCh2YXJpYWJsZXMpIHtcclxuICAgIGxldCBjb25uZWN0aW9uID0gZmluZCgoe2V4cHJlc3Npb259KSA9PiBleHByZXNzaW9uKHZhcmlhYmxlcyksIHRoaXMuY29ubmVjdGlvbnMpXHJcblxyXG4gICAgcmV0dXJuIGNvbm5lY3Rpb24gPyBjb25uZWN0aW9uLnNlcXVlbmNlVVVJRCA6IG51bGxcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIFByb2dyYW0ge1xyXG4gIGNvbnN0cnVjdG9yKHByb2dyYW1TY2hlbWEpIHtcclxuICAgIHRoaXMubmFtZSA9IHByb2dyYW1TY2hlbWEubmFtZVxyXG4gICAgdGhpcy51dWlkID0gcHJvZ3JhbVNjaGVtYS51dWlkXHJcbiAgICB0aGlzLnN0YXRlID0gUFJPR1JBTV9TVEFURS5SRUFEWVxyXG4gICAgdGhpcy5hY3RpdmVTZXF1ZW5jZSA9IG51bGxcclxuICAgIHRoaXMuc2NoZW1hID0gcHJvZ3JhbVNjaGVtYVxyXG4gICAgdGhpcy52YXJpYWJsZXMgPSB0aGlzLnNjaGVtYS52YXJpYWJsZVNjaGVtYXMucmVkdWNlKChtYXAsIHZhcmlhYmxlU2NoZW1hKSA9PiB7XHJcbiAgICAgIG1hcFt2YXJpYWJsZVNjaGVtYS5uYW1lXSA9IHZhcmlhYmxlU2NoZW1hLnZhbHVlXHJcbiAgICAgIHJldHVybiBtYXBcclxuICAgIH0sIHt9KVxyXG4gIH1cclxuXHJcbiAgc3RhcnRTZXF1ZW5jZSh1dWlkKSB7XHJcbiAgICBjb25zdCBzZXF1ZW5jZVNjaGVtYSA9IGZpbmRXaGVyZSgndXVpZCcsIHV1aWQsIHRoaXMuc2NoZW1hLnNlcXVlbmNlU2NoZW1hcylcclxuXHJcbiAgICBpZiAoIXNlcXVlbmNlU2NoZW1hKSB0aHJvdyBuZXcgRXJyb3IoYE5vIHNjaGVtYSBuYW1lZCAke25hbWV9IHdhcyBmb3VuZGApXHJcblxyXG4gICAgdGhpcy5hY3RpdmVTZXF1ZW5jZSA9IG5ldyBTZXF1ZW5jZShzZXF1ZW5jZVNjaGVtYSlcclxuICAgIHRoaXMuc3RhdGUgPSBQUk9HUkFNX1NUQVRFLlBMQVlJTkdcclxuICAgIHJlbW92ZUNoaWxkcmVuKFNUQUdFX0VMRU1FTlQpXHJcbiAgfVxyXG59XHJcblxyXG4vL1RPRE86IHJlYWxseSBub3QgYSBmYW4gb2YgdGhlIFwiYXNzZXRcIiBjbGFzcyBmb3Igb3BhY2l0eS4gIENvbnNpZGVyIGRpdGNoaW5nIENTUy4uLlxyXG5jb25zdCBBc3NldCA9IHtcclxuICBmcm9tU2NoZW1hKGFzc2V0U2NoZW1hKSB7XHJcbiAgICBzd2l0Y2ggKGFzc2V0U2NoZW1hLnR5cGUpIHtcclxuICAgICAgY2FzZSAnc3RhZ2UnOiByZXR1cm4gbmV3IEFzc2V0LlN0YWdlKGFzc2V0U2NoZW1hKVxyXG4gICAgICBjYXNlICdpbWFnZSc6IHJldHVybiBuZXcgQXNzZXQuSW1hZ2UoYXNzZXRTY2hlbWEpXHJcbiAgICAgIGNhc2UgJ2F1ZGlvJzogcmV0dXJuIG5ldyBBc3NldC5BdWRpbyhhc3NldFNjaGVtYSlcclxuICAgICAgY2FzZSAndGV4dCc6ICByZXR1cm4gbmV3IEFzc2V0LlRleHQoYXNzZXRTY2hlbWEpXHJcbiAgICAgIGRlZmF1bHQ6ICAgICAgcmV0dXJuIG5ldyBBc3NldC5Vbmtub3duKGFzc2V0U2NoZW1hKVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFN0YWdlKHtzdHlsZX0pIHtcclxuICAgIHRoaXMuZWxlbWVudCA9IFNUQUdFX0VMRU1FTlRcclxuICAgIHRoaXMudXVpZCA9ICdzdGFnZSdcclxuICAgIGV4dGVuZCh0aGlzLmVsZW1lbnQuc3R5bGUsIHN0eWxlKVxyXG4gIH0sXHJcblxyXG4gIEltYWdlKHt1dWlkLCBzcmMsIHN0eWxlfSkge1xyXG4gICAgdGhpcy51dWlkID0gdXVpZFxyXG4gICAgdGhpcy5lbGVtZW50ID0gbmV3IEltYWdlXHJcbiAgICB0aGlzLmVsZW1lbnQuc3JjID0gc3JjXHJcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYXNzZXQnKVxyXG4gICAgZXh0ZW5kKHRoaXMuZWxlbWVudC5zdHlsZSwgc3R5bGUpXHJcbiAgfSxcclxuXHJcbiAgVGV4dCh7dXVpZCwgdGFnLCB0ZXh0LCBzdHlsZX0pIHtcclxuICAgIHRoaXMudXVpZCA9IHV1aWRcclxuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKSBcclxuICAgIHRoaXMuZWxlbWVudC5pbm5lclRleHQgPSB0ZXh0XHJcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYXNzZXQnKVxyXG4gICAgZXh0ZW5kKHRoaXMuZWxlbWVudC5zdHlsZSwgc3R5bGUpXHJcbiAgfSxcclxuXHJcbiAgQXVkaW8oe3V1aWQsIHNyY30pIHtcclxuICAgIHRoaXMudXVpZCA9IHV1aWRcclxuICAgIHRoaXMuc3JjID0gc3JjXHJcbiAgfSxcclxuXHJcbiAgVW5rbm93bihzY2hlbWEpIHtcclxuICAgIHRoaXMudXVpZCA9IHNjaGVtYS51dWlkXHJcbiAgICB0aGlzLnNjaGVtYSA9IHNjaGVtYSBcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IHByb2dyYW0gPSBuZXcgUHJvZ3JhbShwcm9ncmFtU2NoZW1hKVxyXG5cclxucHJvZ3JhbS5zdGFydFNlcXVlbmNlKCdhYmMnKVxyXG5zZXRJbnRlcnZhbChtYWtlVXBkYXRlKHByb2dyYW0pLCBUSUNLX0lOVEVSVkFMX01TKVxyXG50b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgaWYgICAgICAocHJvZ3JhbS5zdGF0ZSA9PT0gUFJPR1JBTV9TVEFURS5QTEFZSU5HKSBwcm9ncmFtLnN0YXRlID0gUFJPR1JBTV9TVEFURS5QQVVTRURcclxuICBlbHNlIGlmIChwcm9ncmFtLnN0YXRlID09PSBQUk9HUkFNX1NUQVRFLlBBVVNFRCkgIHByb2dyYW0uc3RhdGUgPSBQUk9HUkFNX1NUQVRFLlBMQVlJTkdcclxuICBlbHNlICAgIHt9XHJcbn0pXHJcbndpbmRvdy5vbmJsdXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgaWYgKHByb2dyYW0uc3RhdGUgPT09IFBST0dSQU1fU1RBVEUuUExBWUlORykgcHJvZ3JhbS5zdGF0ZSA9IFBST0dSQU1fU1RBVEUuUEFVU0VEXHJcbn1cclxud2luZG93LnByb2dyYW0gPSBwcm9ncmFtXHJcbiIsIi8vICAgICB1dWlkLmpzXG4vL1xuLy8gICAgIENvcHlyaWdodCAoYykgMjAxMC0yMDEyIFJvYmVydCBLaWVmZmVyXG4vLyAgICAgTUlUIExpY2Vuc2UgLSBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cbihmdW5jdGlvbigpIHtcbiAgdmFyIF9nbG9iYWwgPSB0aGlzO1xuXG4gIC8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuICBXZSBmZWF0dXJlXG4gIC8vIGRldGVjdCB0byBkZXRlcm1pbmUgdGhlIGJlc3QgUk5HIHNvdXJjZSwgbm9ybWFsaXppbmcgdG8gYSBmdW5jdGlvbiB0aGF0XG4gIC8vIHJldHVybnMgMTI4LWJpdHMgb2YgcmFuZG9tbmVzcywgc2luY2UgdGhhdCdzIHdoYXQncyB1c3VhbGx5IHJlcXVpcmVkXG4gIHZhciBfcm5nO1xuXG4gIC8vIE5vZGUuanMgY3J5cHRvLWJhc2VkIFJORyAtIGh0dHA6Ly9ub2RlanMub3JnL2RvY3MvdjAuNi4yL2FwaS9jcnlwdG8uaHRtbFxuICAvL1xuICAvLyBNb2RlcmF0ZWx5IGZhc3QsIGhpZ2ggcXVhbGl0eVxuICBpZiAodHlwZW9mKF9nbG9iYWwucmVxdWlyZSkgPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRyeSB7XG4gICAgICB2YXIgX3JiID0gX2dsb2JhbC5yZXF1aXJlKCdjcnlwdG8nKS5yYW5kb21CeXRlcztcbiAgICAgIF9ybmcgPSBfcmIgJiYgZnVuY3Rpb24oKSB7cmV0dXJuIF9yYigxNik7fTtcbiAgICB9IGNhdGNoKGUpIHt9XG4gIH1cblxuICBpZiAoIV9ybmcgJiYgX2dsb2JhbC5jcnlwdG8gJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcykge1xuICAgIC8vIFdIQVRXRyBjcnlwdG8tYmFzZWQgUk5HIC0gaHR0cDovL3dpa2kud2hhdHdnLm9yZy93aWtpL0NyeXB0b1xuICAgIC8vXG4gICAgLy8gTW9kZXJhdGVseSBmYXN0LCBoaWdoIHF1YWxpdHlcbiAgICB2YXIgX3JuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuICAgIF9ybmcgPSBmdW5jdGlvbiB3aGF0d2dSTkcoKSB7XG4gICAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKF9ybmRzOCk7XG4gICAgICByZXR1cm4gX3JuZHM4O1xuICAgIH07XG4gIH1cblxuICBpZiAoIV9ybmcpIHtcbiAgICAvLyBNYXRoLnJhbmRvbSgpLWJhc2VkIChSTkcpXG4gICAgLy9cbiAgICAvLyBJZiBhbGwgZWxzZSBmYWlscywgdXNlIE1hdGgucmFuZG9tKCkuICBJdCdzIGZhc3QsIGJ1dCBpcyBvZiB1bnNwZWNpZmllZFxuICAgIC8vIHF1YWxpdHkuXG4gICAgdmFyICBfcm5kcyA9IG5ldyBBcnJheSgxNik7XG4gICAgX3JuZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIHI7IGkgPCAxNjsgaSsrKSB7XG4gICAgICAgIGlmICgoaSAmIDB4MDMpID09PSAwKSByID0gTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwO1xuICAgICAgICBfcm5kc1tpXSA9IHIgPj4+ICgoaSAmIDB4MDMpIDw8IDMpICYgMHhmZjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF9ybmRzO1xuICAgIH07XG4gIH1cblxuICAvLyBCdWZmZXIgY2xhc3MgdG8gdXNlXG4gIHZhciBCdWZmZXJDbGFzcyA9IHR5cGVvZihfZ2xvYmFsLkJ1ZmZlcikgPT0gJ2Z1bmN0aW9uJyA/IF9nbG9iYWwuQnVmZmVyIDogQXJyYXk7XG5cbiAgLy8gTWFwcyBmb3IgbnVtYmVyIDwtPiBoZXggc3RyaW5nIGNvbnZlcnNpb25cbiAgdmFyIF9ieXRlVG9IZXggPSBbXTtcbiAgdmFyIF9oZXhUb0J5dGUgPSB7fTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7IGkrKykge1xuICAgIF9ieXRlVG9IZXhbaV0gPSAoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpO1xuICAgIF9oZXhUb0J5dGVbX2J5dGVUb0hleFtpXV0gPSBpO1xuICB9XG5cbiAgLy8gKipgcGFyc2UoKWAgLSBQYXJzZSBhIFVVSUQgaW50byBpdCdzIGNvbXBvbmVudCBieXRlcyoqXG4gIGZ1bmN0aW9uIHBhcnNlKHMsIGJ1Ziwgb2Zmc2V0KSB7XG4gICAgdmFyIGkgPSAoYnVmICYmIG9mZnNldCkgfHwgMCwgaWkgPSAwO1xuXG4gICAgYnVmID0gYnVmIHx8IFtdO1xuICAgIHMudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bMC05YS1mXXsyfS9nLCBmdW5jdGlvbihvY3QpIHtcbiAgICAgIGlmIChpaSA8IDE2KSB7IC8vIERvbid0IG92ZXJmbG93IVxuICAgICAgICBidWZbaSArIGlpKytdID0gX2hleFRvQnl0ZVtvY3RdO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gWmVybyBvdXQgcmVtYWluaW5nIGJ5dGVzIGlmIHN0cmluZyB3YXMgc2hvcnRcbiAgICB3aGlsZSAoaWkgPCAxNikge1xuICAgICAgYnVmW2kgKyBpaSsrXSA9IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZjtcbiAgfVxuXG4gIC8vICoqYHVucGFyc2UoKWAgLSBDb252ZXJ0IFVVSUQgYnl0ZSBhcnJheSAoYWxhIHBhcnNlKCkpIGludG8gYSBzdHJpbmcqKlxuICBmdW5jdGlvbiB1bnBhcnNlKGJ1Ziwgb2Zmc2V0KSB7XG4gICAgdmFyIGkgPSBvZmZzZXQgfHwgMCwgYnRoID0gX2J5dGVUb0hleDtcbiAgICByZXR1cm4gIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dO1xuICB9XG5cbiAgLy8gKipgdjEoKWAgLSBHZW5lcmF0ZSB0aW1lLWJhc2VkIFVVSUQqKlxuICAvL1xuICAvLyBJbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vTGlvc0svVVVJRC5qc1xuICAvLyBhbmQgaHR0cDovL2RvY3MucHl0aG9uLm9yZy9saWJyYXJ5L3V1aWQuaHRtbFxuXG4gIC8vIHJhbmRvbSAjJ3Mgd2UgbmVlZCB0byBpbml0IG5vZGUgYW5kIGNsb2Nrc2VxXG4gIHZhciBfc2VlZEJ5dGVzID0gX3JuZygpO1xuXG4gIC8vIFBlciA0LjUsIGNyZWF0ZSBhbmQgNDgtYml0IG5vZGUgaWQsICg0NyByYW5kb20gYml0cyArIG11bHRpY2FzdCBiaXQgPSAxKVxuICB2YXIgX25vZGVJZCA9IFtcbiAgICBfc2VlZEJ5dGVzWzBdIHwgMHgwMSxcbiAgICBfc2VlZEJ5dGVzWzFdLCBfc2VlZEJ5dGVzWzJdLCBfc2VlZEJ5dGVzWzNdLCBfc2VlZEJ5dGVzWzRdLCBfc2VlZEJ5dGVzWzVdXG4gIF07XG5cbiAgLy8gUGVyIDQuMi4yLCByYW5kb21pemUgKDE0IGJpdCkgY2xvY2tzZXFcbiAgdmFyIF9jbG9ja3NlcSA9IChfc2VlZEJ5dGVzWzZdIDw8IDggfCBfc2VlZEJ5dGVzWzddKSAmIDB4M2ZmZjtcblxuICAvLyBQcmV2aW91cyB1dWlkIGNyZWF0aW9uIHRpbWVcbiAgdmFyIF9sYXN0TVNlY3MgPSAwLCBfbGFzdE5TZWNzID0gMDtcblxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2Jyb29mYS9ub2RlLXV1aWQgZm9yIEFQSSBkZXRhaWxzXG4gIGZ1bmN0aW9uIHYxKG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gICAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG4gICAgdmFyIGIgPSBidWYgfHwgW107XG5cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIHZhciBjbG9ja3NlcSA9IG9wdGlvbnMuY2xvY2tzZXEgIT0gbnVsbCA/IG9wdGlvbnMuY2xvY2tzZXEgOiBfY2xvY2tzZXE7XG5cbiAgICAvLyBVVUlEIHRpbWVzdGFtcHMgYXJlIDEwMCBuYW5vLXNlY29uZCB1bml0cyBzaW5jZSB0aGUgR3JlZ29yaWFuIGVwb2NoLFxuICAgIC8vICgxNTgyLTEwLTE1IDAwOjAwKS4gIEpTTnVtYmVycyBhcmVuJ3QgcHJlY2lzZSBlbm91Z2ggZm9yIHRoaXMsIHNvXG4gICAgLy8gdGltZSBpcyBoYW5kbGVkIGludGVybmFsbHkgYXMgJ21zZWNzJyAoaW50ZWdlciBtaWxsaXNlY29uZHMpIGFuZCAnbnNlY3MnXG4gICAgLy8gKDEwMC1uYW5vc2Vjb25kcyBvZmZzZXQgZnJvbSBtc2Vjcykgc2luY2UgdW5peCBlcG9jaCwgMTk3MC0wMS0wMSAwMDowMC5cbiAgICB2YXIgbXNlY3MgPSBvcHRpb25zLm1zZWNzICE9IG51bGwgPyBvcHRpb25zLm1zZWNzIDogbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAvLyBQZXIgNC4yLjEuMiwgdXNlIGNvdW50IG9mIHV1aWQncyBnZW5lcmF0ZWQgZHVyaW5nIHRoZSBjdXJyZW50IGNsb2NrXG4gICAgLy8gY3ljbGUgdG8gc2ltdWxhdGUgaGlnaGVyIHJlc29sdXRpb24gY2xvY2tcbiAgICB2YXIgbnNlY3MgPSBvcHRpb25zLm5zZWNzICE9IG51bGwgPyBvcHRpb25zLm5zZWNzIDogX2xhc3ROU2VjcyArIDE7XG5cbiAgICAvLyBUaW1lIHNpbmNlIGxhc3QgdXVpZCBjcmVhdGlvbiAoaW4gbXNlY3MpXG4gICAgdmFyIGR0ID0gKG1zZWNzIC0gX2xhc3RNU2VjcykgKyAobnNlY3MgLSBfbGFzdE5TZWNzKS8xMDAwMDtcblxuICAgIC8vIFBlciA0LjIuMS4yLCBCdW1wIGNsb2Nrc2VxIG9uIGNsb2NrIHJlZ3Jlc3Npb25cbiAgICBpZiAoZHQgPCAwICYmIG9wdGlvbnMuY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgICAgY2xvY2tzZXEgPSBjbG9ja3NlcSArIDEgJiAweDNmZmY7XG4gICAgfVxuXG4gICAgLy8gUmVzZXQgbnNlY3MgaWYgY2xvY2sgcmVncmVzc2VzIChuZXcgY2xvY2tzZXEpIG9yIHdlJ3ZlIG1vdmVkIG9udG8gYSBuZXdcbiAgICAvLyB0aW1lIGludGVydmFsXG4gICAgaWYgKChkdCA8IDAgfHwgbXNlY3MgPiBfbGFzdE1TZWNzKSAmJiBvcHRpb25zLm5zZWNzID09IG51bGwpIHtcbiAgICAgIG5zZWNzID0gMDtcbiAgICB9XG5cbiAgICAvLyBQZXIgNC4yLjEuMiBUaHJvdyBlcnJvciBpZiB0b28gbWFueSB1dWlkcyBhcmUgcmVxdWVzdGVkXG4gICAgaWYgKG5zZWNzID49IDEwMDAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3V1aWQudjEoKTogQ2FuXFwndCBjcmVhdGUgbW9yZSB0aGFuIDEwTSB1dWlkcy9zZWMnKTtcbiAgICB9XG5cbiAgICBfbGFzdE1TZWNzID0gbXNlY3M7XG4gICAgX2xhc3ROU2VjcyA9IG5zZWNzO1xuICAgIF9jbG9ja3NlcSA9IGNsb2Nrc2VxO1xuXG4gICAgLy8gUGVyIDQuMS40IC0gQ29udmVydCBmcm9tIHVuaXggZXBvY2ggdG8gR3JlZ29yaWFuIGVwb2NoXG4gICAgbXNlY3MgKz0gMTIyMTkyOTI4MDAwMDA7XG5cbiAgICAvLyBgdGltZV9sb3dgXG4gICAgdmFyIHRsID0gKChtc2VjcyAmIDB4ZmZmZmZmZikgKiAxMDAwMCArIG5zZWNzKSAlIDB4MTAwMDAwMDAwO1xuICAgIGJbaSsrXSA9IHRsID4+PiAyNCAmIDB4ZmY7XG4gICAgYltpKytdID0gdGwgPj4+IDE2ICYgMHhmZjtcbiAgICBiW2krK10gPSB0bCA+Pj4gOCAmIDB4ZmY7XG4gICAgYltpKytdID0gdGwgJiAweGZmO1xuXG4gICAgLy8gYHRpbWVfbWlkYFxuICAgIHZhciB0bWggPSAobXNlY3MgLyAweDEwMDAwMDAwMCAqIDEwMDAwKSAmIDB4ZmZmZmZmZjtcbiAgICBiW2krK10gPSB0bWggPj4+IDggJiAweGZmO1xuICAgIGJbaSsrXSA9IHRtaCAmIDB4ZmY7XG5cbiAgICAvLyBgdGltZV9oaWdoX2FuZF92ZXJzaW9uYFxuICAgIGJbaSsrXSA9IHRtaCA+Pj4gMjQgJiAweGYgfCAweDEwOyAvLyBpbmNsdWRlIHZlcnNpb25cbiAgICBiW2krK10gPSB0bWggPj4+IDE2ICYgMHhmZjtcblxuICAgIC8vIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYCAoUGVyIDQuMi4yIC0gaW5jbHVkZSB2YXJpYW50KVxuICAgIGJbaSsrXSA9IGNsb2Nrc2VxID4+PiA4IHwgMHg4MDtcblxuICAgIC8vIGBjbG9ja19zZXFfbG93YFxuICAgIGJbaSsrXSA9IGNsb2Nrc2VxICYgMHhmZjtcblxuICAgIC8vIGBub2RlYFxuICAgIHZhciBub2RlID0gb3B0aW9ucy5ub2RlIHx8IF9ub2RlSWQ7XG4gICAgZm9yICh2YXIgbiA9IDA7IG4gPCA2OyBuKyspIHtcbiAgICAgIGJbaSArIG5dID0gbm9kZVtuXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmID8gYnVmIDogdW5wYXJzZShiKTtcbiAgfVxuXG4gIC8vICoqYHY0KClgIC0gR2VuZXJhdGUgcmFuZG9tIFVVSUQqKlxuXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYnJvb2ZhL25vZGUtdXVpZCBmb3IgQVBJIGRldGFpbHNcbiAgZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgICAvLyBEZXByZWNhdGVkIC0gJ2Zvcm1hdCcgYXJndW1lbnQsIGFzIHN1cHBvcnRlZCBpbiB2MS4yXG4gICAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG5cbiAgICBpZiAodHlwZW9mKG9wdGlvbnMpID09ICdzdHJpbmcnKSB7XG4gICAgICBidWYgPSBvcHRpb25zID09ICdiaW5hcnknID8gbmV3IEJ1ZmZlckNsYXNzKDE2KSA6IG51bGw7XG4gICAgICBvcHRpb25zID0gbnVsbDtcbiAgICB9XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICB2YXIgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBfcm5nKSgpO1xuXG4gICAgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuICAgIHJuZHNbNl0gPSAocm5kc1s2XSAmIDB4MGYpIHwgMHg0MDtcbiAgICBybmRzWzhdID0gKHJuZHNbOF0gJiAweDNmKSB8IDB4ODA7XG5cbiAgICAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcbiAgICBpZiAoYnVmKSB7XG4gICAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgMTY7IGlpKyspIHtcbiAgICAgICAgYnVmW2kgKyBpaV0gPSBybmRzW2lpXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYnVmIHx8IHVucGFyc2Uocm5kcyk7XG4gIH1cblxuICAvLyBFeHBvcnQgcHVibGljIEFQSVxuICB2YXIgdXVpZCA9IHY0O1xuICB1dWlkLnYxID0gdjE7XG4gIHV1aWQudjQgPSB2NDtcbiAgdXVpZC5wYXJzZSA9IHBhcnNlO1xuICB1dWlkLnVucGFyc2UgPSB1bnBhcnNlO1xuICB1dWlkLkJ1ZmZlckNsYXNzID0gQnVmZmVyQ2xhc3M7XG5cbiAgaWYgKHR5cGVvZihtb2R1bGUpICE9ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgLy8gUHVibGlzaCBhcyBub2RlLmpzIG1vZHVsZVxuICAgIG1vZHVsZS5leHBvcnRzID0gdXVpZDtcbiAgfSBlbHNlICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgLy8gUHVibGlzaCBhcyBBTUQgbW9kdWxlXG4gICAgZGVmaW5lKGZ1bmN0aW9uKCkge3JldHVybiB1dWlkO30pO1xuIFxuXG4gIH0gZWxzZSB7XG4gICAgLy8gUHVibGlzaCBhcyBnbG9iYWwgKGluIGJyb3dzZXJzKVxuICAgIHZhciBfcHJldmlvdXNSb290ID0gX2dsb2JhbC51dWlkO1xuXG4gICAgLy8gKipgbm9Db25mbGljdCgpYCAtIChicm93c2VyIG9ubHkpIHRvIHJlc2V0IGdsb2JhbCAndXVpZCcgdmFyKipcbiAgICB1dWlkLm5vQ29uZmxpY3QgPSBmdW5jdGlvbigpIHtcbiAgICAgIF9nbG9iYWwudXVpZCA9IF9wcmV2aW91c1Jvb3Q7XG4gICAgICByZXR1cm4gdXVpZDtcbiAgICB9O1xuXG4gICAgX2dsb2JhbC51dWlkID0gdXVpZDtcbiAgfVxufSkuY2FsbCh0aGlzKTtcbiIsImV4cG9ydCBkZWZhdWx0IHtcclxuICB1dWlkOiAncHJvZ3JhbScsXHJcbiAgbmFtZTogJ1Rlc3QgcHJvZ3JhbScsXHJcbiAgdmFyaWFibGVTY2hlbWFzOiBbe1xyXG4gICAgbmFtZTogJ2FnZScsXHJcbiAgICB0eXBlOiBcIk51bWJlclwiLFxyXG4gICAgbWluOiAwLFxyXG4gICAgbWF4OiAyNTAsXHJcbiAgICB2YWx1ZTogMjBcclxuICB9XSxcclxuICBzZXF1ZW5jZVNjaGVtYXM6IFt7XHJcbiAgICBuYW1lOiAnc2Vjb25kJyxcclxuICAgIHV1aWQ6ICdkZWYnLFxyXG4gICAgY29ubmVjdGlvblNjaGVtYXM6IFt7XHJcbiAgICAgIGV4cHJlc3Npb246IFwidHJ1ZVwiLFxyXG4gICAgICBzZXF1ZW5jZVVVSUQ6IG51bGxcclxuICAgIH1dLFxyXG4gICAgYXNzZXRTY2hlbWFzOiBbe1xyXG4gICAgICB1dWlkOiAnc3RhZ2UnLFxyXG4gICAgICB0eXBlOiAnc3RhZ2UnLFxyXG4gICAgICBzdHlsZToge31cclxuICAgIH0sIHtcclxuICAgICAgdXVpZDogJzEyMycsXHJcbiAgICAgIHR5cGU6ICdpbWFnZScsXHJcbiAgICAgIHNyYzogJ2VtbWkucG5nJyxcclxuICAgICAgc3R5bGU6IHt9IFxyXG4gICAgfSwge1xyXG4gICAgICB1dWlkOiAnNDU2JyxcclxuICAgICAgdHlwZTogJ2F1ZGlvJyxcclxuICAgICAgc3JjOiBbJ3Rlc3QubXAzJ11cclxuICAgIH0sIHtcclxuICAgICAgdXVpZDogJzc4OScsXHJcbiAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgdGFnOiAncCcsXHJcbiAgICAgIHRleHQ6ICdDbGljayB0aGUgbG9nbyB0byBjb250aW51ZScsXHJcbiAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgZm9udDogJzMwcHggYXJpZWwsIHNhbnMtc2VyaWYnLFxyXG4gICAgICAgIGNvbG9yOiAnYmx1ZScgXHJcbiAgICAgIH0gXHJcbiAgICB9XSxcclxuICAgIHRhc2tTY2hlbWFzOiBbXVxyXG4gIH0sIHtcclxuICAgIG5hbWU6ICdtYWluJyxcclxuICAgIHV1aWQ6ICdhYmMnLFxyXG4gICAgY29ubmVjdGlvblNjaGVtYXM6IFt7XHJcbiAgICAgIGV4cHJlc3Npb246IFwidHJ1ZVwiLFxyXG4gICAgICBzZXF1ZW5jZVVVSUQ6IFwiZGVmXCJcclxuICAgIH1dLFxyXG4gICAgYXNzZXRTY2hlbWFzOiBbe1xyXG4gICAgICB1dWlkOiAnc3RhZ2UnLFxyXG4gICAgICB0eXBlOiAnc3RhZ2UnLFxyXG4gICAgICBzdHlsZToge31cclxuICAgIH0sIHtcclxuICAgICAgdXVpZDogJzEyMycsXHJcbiAgICAgIHR5cGU6ICdpbWFnZScsXHJcbiAgICAgIHNyYzogJ2VtbWkucG5nJyxcclxuICAgICAgc3R5bGU6IHt9IFxyXG4gICAgfSwge1xyXG4gICAgICB1dWlkOiAnNDU2JyxcclxuICAgICAgdHlwZTogJ2F1ZGlvJyxcclxuICAgICAgc3JjOiBbJ3Rlc3QubXAzJ11cclxuICAgIH0sIHtcclxuICAgICAgdXVpZDogJzc4OScsXHJcbiAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgdGFnOiAncCcsXHJcbiAgICAgIHRleHQ6ICdDbGljayB0aGUgbG9nbyB0byBjb250aW51ZScsXHJcbiAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgZm9udDogJzMwcHggYXJpZWwsIHNhbnMtc2VyaWYnLFxyXG4gICAgICAgIGNvbG9yOiAnYmx1ZScgXHJcbiAgICAgIH0gXHJcbiAgICB9XSxcclxuXHJcbiAgICB0YXNrU2NoZW1hczogW3tcclxuICAgICAgdHlwZTogJ3BhcmFsbGVsJyxcclxuICAgICAgdGFza1NjaGVtYXM6IFt7XHJcbiAgICAgICAgdHlwZTogJ3NlcmlhbCcsXHJcbiAgICAgICAgdGFza1NjaGVtYXM6IFt7XHJcbiAgICAgICAgICB0eXBlOiAnaW5zZXJ0JywgXHJcbiAgICAgICAgICBwYXJlbnQ6ICdzdGFnZScsXHJcbiAgICAgICAgICBzdWJqZWN0OiAnMTIzJ1xyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWRlLWluJyxcclxuICAgICAgICAgIHN1YmplY3Q6ICcxMjMnXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgdHlwZTogJ2luc2VydCcsXHJcbiAgICAgICAgICBwYXJlbnQ6ICdzdGFnZScsXHJcbiAgICAgICAgICBzdWJqZWN0OiAnNzg5J1xyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWRlLWluJyxcclxuICAgICAgICAgIHN1YmplY3Q6ICc3ODknXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgdHlwZTogJ2lvJyxcclxuICAgICAgICAgIHN1YmplY3Q6ICc3ODknICAgXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgdHlwZTogJ3BhcmFsbGVsJyxcclxuICAgICAgICAgIHRhc2tTY2hlbWFzOiBbe1xyXG4gICAgICAgICAgICB0eXBlOiAnc2VyaWFsJyxcclxuICAgICAgICAgICAgdGFza1NjaGVtYXM6IFt7XHJcbiAgICAgICAgICAgICAgdHlwZTogJ2ZhZGUtb3V0JyxcclxuICAgICAgICAgICAgICBzdWJqZWN0OiAnMTIzJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgdHlwZTogJ3JlbW92ZScsXHJcbiAgICAgICAgICAgICAgcGFyZW50OiAnc3RhZ2UnLFxyXG4gICAgICAgICAgICAgIHN1YmplY3Q6ICcxMjMnXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdzZXJpYWwnLFxyXG4gICAgICAgICAgICB0YXNrU2NoZW1hczogW3tcclxuICAgICAgICAgICAgICB0eXBlOiAnZmFkZS1vdXQnLFxyXG4gICAgICAgICAgICAgIHN1YmplY3Q6ICc3ODknXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICB0eXBlOiAncmVtb3ZlJyxcclxuICAgICAgICAgICAgICBwYXJlbnQ6ICdzdGFnZScsXHJcbiAgICAgICAgICAgICAgc3ViamVjdDogJzc4OSdcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICAgIH1dICBcclxuICAgICAgICB9XSBcclxuICAgICAgfV0gICBcclxuICAgIH0sIHtcclxuICAgICAgdHlwZTogJ2F1ZGlvLXBsYXknLFxyXG4gICAgICBzdWJqZWN0OiAnNDU2J1xyXG4gICAgfV1cclxuICB9XVxyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBwcCAob2JqKSB7XHJcbiAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkob2JqLCBudWxsLCAyKSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGxvZyA9IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSlcclxuXHJcbi8vc2hhbGxvdyBjbG9uZSAtLSBub3QgaWRlYWwgYXMgbWlnaHQgdHJpZ2dlciBkaWN0aW9uYXJ5IG1vZGU/XHJcbmV4cG9ydCBmdW5jdGlvbiBjbG9uZSAob2JqKSB7XHJcbiAgbGV0IG91dCA9IHt9XHJcblxyXG4gIGZvciAobGV0IGtleSBpbiBvYmopIHtcclxuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkgb3V0W2tleV0gPSBvYmpba2V5XSBcclxuICB9IFxyXG4gIHJldHVybiBvdXRcclxufVxyXG5cclxuLy9tdXRhdGl2ZSFcclxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZCAob2JqLCBuZXh0KSB7XHJcbiAgZm9yIChsZXQga2V5IGluIG5leHQpIHtcclxuICAgIGlmIChuZXh0Lmhhc093blByb3BlcnR5KGtleSkpIG9ialtrZXldID0gbmV4dFtrZXldXHJcbiAgfSBcclxuICByZXR1cm4gb2JqXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kIChwcmVkRm4sIGFycmF5KSB7XHJcbiAgZm9yIChsZXQgaXRlbSBvZiBhcnJheSkge1xyXG4gICAgaWYgKHByZWRGbihpdGVtKSkgcmV0dXJuIGl0ZW1cclxuICB9XHJcbiAgcmV0dXJuIG51bGxcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRXaGVyZShrZXksIHZhbCwgYXJyYXkpIHtcclxuICBmb3IgKGxldCBpdGVtIG9mIGFycmF5KSB7XHJcbiAgICBpZiAoaXRlbVtrZXldID09PSB2YWwpIHJldHVybiBpdGVtIFxyXG4gIH1cclxuICByZXR1cm4gbnVsbFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQ2hpbGRyZW4gKGVsZW1lbnQpIHtcclxuICB3aGlsZSAoZWxlbWVudC5maXJzdENoaWxkKSB7XHJcbiAgICBlbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQuZmlyc3RDaGlsZCkgXHJcbiAgfVxyXG59XHJcbiJdfQ==
