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

var TICK_RATE = 24;
var STAGE_ELEMENT = document.body;

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
        console.log('waited: ' + elapsed);

      case 9:
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

        domAsset.element.classList.remove("active");

      case 3:
        if (!(remaining > 0)) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.next = 6;
        return;

      case 6:
        state = context$1$0.sent;

        if (state === PROGRAM_STATE.PLAYING) {
          if (!classRemoved) {
            domAsset.element.classList.remove('active');
            classRemoved = true;
          }
          remaining--;
        }
        context$1$0.next = 3;
        break;

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[4], this);
}

function Insert(parent, domAsset) {
  return regeneratorRuntime.wrap(function Insert$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        console.log(parent, domAsset);
        parent.element.appendChild(domAsset.element);

      case 2:
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

        console.log('please interact with the page');

      case 3:
        if (done) {
          context$1$0.next = 8;
          break;
        }

        context$1$0.next = 6;
        return;

      case 6:
        context$1$0.next = 3;
        break;

      case 8:

        console.log('thanks for your participation');
        domAsset.element.removeEventListener(listener);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[7], this);
}

function PlayAudio(audioAsset) {
  var done, sound;
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

        sound.play();

      case 3:
        if (done) {
          context$1$0.next = 8;
          break;
        }

        context$1$0.next = 6;
        return;

      case 6:
        context$1$0.next = 3;
        break;

      case 8:
        console.log('audio completed');

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[8], this);
}

var Connection = function Connection(_ref) {
  var expression = _ref.expression;
  var sequenceUUID = _ref.sequenceUUID;

  _classCallCheck(this, Connection);

  this.expression = new Function('$', expression);
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
window.program = program;
setInterval(makeUpdate(program), TICK_RATE);

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
    name: 'main',
    uuid: 'abc',
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIkM6L1VzZXJzL2thbmVzXzAwMC9wcm9qZWN0cy90YXNrLXJlbmRlcmVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL25vZGUtdXVpZC91dWlkLmpzIiwiQzovVXNlcnMva2FuZXNfMDAwL3Byb2plY3RzL3Rhc2stcmVuZGVyZXIvcHJvZ3JhbVNjaGVtYS5qcyIsIkM6L1VzZXJzL2thbmVzXzAwMC9wcm9qZWN0cy90YXNrLXJlbmRlcmVyL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O2lCQ3FDVyxRQUFRLEVBWVIsTUFBTSxFQVFOLElBQUksRUFXSixNQUFNLEVBa0JOLE9BQU8sRUFtQlAsTUFBTSxFQUtOLE1BQU0sRUFJTixFQUFFLEVBV0YsU0FBUzs7Ozt3QkE3SEssV0FBVzs7cUJBQ2tCLFNBQVM7OzZCQUNyQyxpQkFBaUI7Ozs7QUFFM0MsSUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFBO0FBQ3BCLElBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUE7O0FBRW5DLElBQU0sYUFBYSxHQUFHO0FBQ3BCLFNBQU8sRUFBRSxDQUFDO0FBQ1YsT0FBSyxFQUFFLENBQUM7QUFDUixTQUFPLEVBQUUsQ0FBQztBQUNWLFFBQU0sRUFBRSxDQUFDO0FBQ1QsTUFBSSxFQUFFLENBQUM7Q0FDUixDQUFBOztBQUVELFNBQVMsVUFBVSxDQUFFLE9BQU8sRUFBRTtBQUM1QixNQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7QUFDekIsTUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFBO0FBQ3ZCLE1BQUksRUFBRSxHQUFHLENBQUMsQ0FBQTs7QUFFVixTQUFPLFlBQVk7QUFDakIsWUFBUSxHQUFHLFFBQVEsQ0FBQTtBQUNuQixZQUFRLEdBQUcsSUFBSSxDQUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztxQkN2UGU7QUFDYixNQUFJLEVBQUUsU0FBUztB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QyxDQUFBOzs7OztBQUdyQyxTQUFTLEtBQUssQ0FBRSxHQUFHLEVBQUU7QUFDMUIsTUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBOztBQUVaLE9BQUssSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFO0FBQ25CLFFBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0dBQ2pEO0FBQ0QsU0FBTyxHQUFHLENBQUE7Q0FDWDs7OztBQUdNLFNBQVMsTUFBTSxDQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDakMsT0FBSyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUU7QUFDcEIsUUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7R0FDbkQ7QUFDRCxTQUFPLEdBQUcsQ0FBQTtDQUNYOztBQUVNLFNBQVMsSUFBSSxDQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Ozs7OztBQUNuQyx5QkFBaUIsS0FBSyw4SEFBRTtVQUFmLElBQUk7O0FBQ1gsVUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxJQUFJLENBQUE7S0FDOUI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDRCxTQUFPLElBQUksQ0FBQTtDQUNaOztBQUVNLFNBQVMsU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFOzs7Ozs7QUFDekMsMEJBQWlCLEtBQUssbUlBQUU7VUFBZixJQUFJOztBQUNYLFVBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsRUFBRSxPQUFPLElBQUksQ0FBQTtLQUNuQzs7Ozs7Ozs7Ozs7Ozs7OztBQUNELFNBQU8sSUFBSSxDQUFBO0NBQ1oiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHt2NCBhcyB1dWlkfSBmcm9tICdub2RlLXV1aWQnXHJcbmltcG9ydCB7cHAsIGxvZywgY2xvbmUsIGV4dGVuZCwgZmluZCwgZmluZFdoZXJlfSBmcm9tICcuL3V0aWxzJ1xyXG5pbXBvcnQgcHJvZ3JhbVNjaGVtYSBmcm9tICcuL3Byb2dyYW1TY2hlbWEnXHJcblxyXG5jb25zdCBUSUNLX1JBVEUgPSAyNFxyXG5jb25zdCBTVEFHRV9FTEVNRU5UID0gZG9jdW1lbnQuYm9keVxyXG5cclxuY29uc3QgUFJPR1JBTV9TVEFURSA9IHtcclxuICBMT0FESU5HOiAwLFxyXG4gIFJFQURZOiAxLFxyXG4gIFBMQVlJTkc6IDIsXHJcbiAgUEFVU0VEOiAzLFxyXG4gIERPTkU6IDRcclxufVxyXG5cclxuZnVuY3Rpb24gbWFrZVVwZGF0ZSAocHJvZ3JhbSkge1xyXG4gIGxldCBsYXN0VGltZSA9IERhdGUubm93KClcclxuICBsZXQgdGhpc1RpbWUgPSBsYXN0VGltZVxyXG4gIGxldCBkVCA9IDBcclxuXHJcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgIGxhc3RUaW1lID0gdGhpc1RpbWVcclxuICAgIHRoaXNUaW1lID0gRGF0ZS5ub3coKVxyXG4gICAgZFQgPSB0aGlzVGltZSAtIGxhc3RUaW1lXHJcblxyXG4gICAgLy9UT0RPOiBjaGVjayB0aGF0IGRUIGlzIGluIHZhbGlkIHJhbmdlIGZvciBcIm5vcm1hbCB0aWNrXCJcclxuICAgIGlmIChwcm9ncmFtLmFjdGl2ZVNlcXVlbmNlKSB7XHJcbiAgICAgIGlmIChwcm9ncmFtLmFjdGl2ZVNlcXVlbmNlLnRhc2tzLm5leHQocHJvZ3JhbS5zdGF0ZSkuZG9uZSkge1xyXG4gICAgICAgIGxldCB0YXJnZXRTZXF1ZW5jZSA9IHByb2dyYW0uYWN0aXZlU2VxdWVuY2UuZmluZE5leHQocHJvZ3JhbS52YXJpYWJsZXMpXHJcblxyXG4gICAgICAgIGlmICh0YXJnZXRTZXF1ZW5jZSkgcHJvZ3JhbS5zdGFydFNlcXVlbmNlKHRhcmdldFNlcXVlbmNlKSBcclxuICAgICAgICBlbHNlICAgICAgICAgICAgICAgIHByb2dyYW0uc3RhdGUgPSBQUk9HUkFNX1NUQVRFLkRPTkVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gKiBQYXJhbGxlbCAodGFza3MpIHtcclxuICB3aGlsZSAodGFza3MubGVuZ3RoKSB7XHJcbiAgICBsZXQgc3RhdGUgPSB5aWVsZFxyXG5cclxuICAgIGZvciAobGV0IHRhc2sgb2YgdGFza3MpIHtcclxuICAgICAgaWYgKHRhc2submV4dChzdGF0ZSkuZG9uZSkge1xyXG4gICAgICAgIHRhc2tzLnNwbGljZSh0YXNrcy5pbmRleE9mKHRhc2spLCAxKVxyXG4gICAgICB9XHJcbiAgICB9IFxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gKiBTZXJpYWwgKHRhc2tzKSB7XHJcbiAgd2hpbGUgKHRhc2tzLmxlbmd0aCkge1xyXG4gICAgbGV0IHN0YXRlID0geWllbGRcclxuXHJcbiAgICBpZiAodGFza3NbMF0ubmV4dChzdGF0ZSkuZG9uZSkgdGFza3Muc2hpZnQoKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gKiBXYWl0IChkdXJhdGlvbikge1xyXG4gIGxldCBlbGFwc2VkID0gMCBcclxuXHJcbiAgd2hpbGUgKGVsYXBzZWQgPCBkdXJhdGlvbikge1xyXG4gICAgbGV0IHN0YXRlID0geWllbGRcclxuXHJcbiAgICBpZiAoc3RhdGUgPT09IFBST0dSQU1fU1RBVEUuUExBWUlORykgZWxhcHNlZCsrXHJcbiAgfVxyXG4gIGNvbnNvbGUubG9nKGB3YWl0ZWQ6ICR7ZWxhcHNlZH1gKVxyXG59XHJcblxyXG5mdW5jdGlvbiAqIEZhZGVJbiAoZG9tQXNzZXQpIHtcclxuICBsZXQgZWxhcHNlZCA9IDBcclxuICBsZXQgZHVyYXRpb24gPSAxMlxyXG4gIGxldCBjbGFzc0FkZGVkID0gZmFsc2VcclxuXHJcbiAgd2hpbGUgKGVsYXBzZWQgPCBkdXJhdGlvbikge1xyXG4gICAgbGV0IHN0YXRlID0geWllbGRcclxuXHJcbiAgICBpZiAoc3RhdGUgPT09IFBST0dSQU1fU1RBVEUuUExBWUlORykge1xyXG4gICAgICBpZiAoIWNsYXNzQWRkZWQpIHtcclxuICAgICAgICBkb21Bc3NldC5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbiAgICAgICAgY2xhc3NBZGRlZCA9IHRydWVcclxuICAgICAgfVxyXG4gICAgICBlbGFwc2VkKytcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uICogRmFkZU91dCAoZG9tQXNzZXQpIHtcclxuICBsZXQgcmVtYWluaW5nID0gMTJcclxuICBsZXQgY2xhc3NSZW1vdmVkID0gZmFsc2VcclxuXHJcbiAgZG9tQXNzZXQuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXHJcblxyXG4gIHdoaWxlIChyZW1haW5pbmcgPiAwKSB7XHJcbiAgICBsZXQgc3RhdGUgPSB5aWVsZFxyXG5cclxuICAgIGlmIChzdGF0ZSA9PT0gUFJPR1JBTV9TVEFURS5QTEFZSU5HKSB7XHJcbiAgICAgIGlmICghY2xhc3NSZW1vdmVkKSB7XHJcbiAgICAgICAgZG9tQXNzZXQuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG4gICAgICAgIGNsYXNzUmVtb3ZlZCA9IHRydWVcclxuICAgICAgfVxyXG4gICAgICByZW1haW5pbmctLVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gKiBJbnNlcnQgKHBhcmVudCwgZG9tQXNzZXQpIHtcclxuICBjb25zb2xlLmxvZyhwYXJlbnQsIGRvbUFzc2V0KVxyXG4gIHBhcmVudC5lbGVtZW50LmFwcGVuZENoaWxkKGRvbUFzc2V0LmVsZW1lbnQpXHJcbn1cclxuXHJcbmZ1bmN0aW9uICogUmVtb3ZlIChwYXJlbnQsIGRvbUFzc2V0KSB7XHJcbiAgcGFyZW50LmVsZW1lbnQucmVtb3ZlQ2hpbGQoZG9tQXNzZXQuZWxlbWVudClcclxufVxyXG5cclxuZnVuY3Rpb24gKiBJTyAoZG9tQXNzZXQpIHtcclxuICBsZXQgZG9uZSA9IGZhbHNlICBcclxuICBsZXQgbGlzdGVuZXIgPSBkb21Bc3NldC5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gZG9uZSA9IHRydWUpXHJcblxyXG4gIGNvbnNvbGUubG9nKCdwbGVhc2UgaW50ZXJhY3Qgd2l0aCB0aGUgcGFnZScpXHJcbiAgd2hpbGUgKCFkb25lKSB5aWVsZFxyXG5cclxuICBjb25zb2xlLmxvZygndGhhbmtzIGZvciB5b3VyIHBhcnRpY2lwYXRpb24nKVxyXG4gIGRvbUFzc2V0LmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcilcclxufVxyXG5cclxuZnVuY3Rpb24gKiBQbGF5QXVkaW8gKGF1ZGlvQXNzZXQpIHtcclxuICBsZXQgZG9uZSA9IGZhbHNlXHJcbiAgbGV0IHNvdW5kID0gbmV3IEhvd2woe1xyXG4gICAgc3JjOiBhdWRpb0Fzc2V0LnNyYyxcclxuICAgIG9uZW5kOiAoKSA9PiBkb25lID0gdHJ1ZVxyXG4gIH0pXHJcblxyXG4gIHNvdW5kLnBsYXkoKVxyXG4gIHdoaWxlICghZG9uZSkgeWllbGRcclxuICBjb25zb2xlLmxvZygnYXVkaW8gY29tcGxldGVkJylcclxufVxyXG5cclxuY2xhc3MgQ29ubmVjdGlvbiB7XHJcbiAgY29uc3RydWN0b3Ioe2V4cHJlc3Npb24sIHNlcXVlbmNlVVVJRH0pIHtcclxuICAgIHRoaXMuZXhwcmVzc2lvbiA9IG5ldyBGdW5jdGlvbignJCcsIGV4cHJlc3Npb24pIFxyXG4gICAgdGhpcy5zZXF1ZW5jZVVVSUQgPSBzZXF1ZW5jZVVVSURcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIFNlcXVlbmNlIHtcclxuICBjb25zdHJ1Y3Rvcih7dXVpZCwgbmFtZSwgYXNzZXRTY2hlbWFzLCB0YXNrU2NoZW1hcywgY29ubmVjdGlvblNjaGVtYXN9KSB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lXHJcbiAgICB0aGlzLnV1aWQgPSB1dWlkXHJcbiAgICB0aGlzLmFzc2V0cyA9IGFzc2V0U2NoZW1hcy5tYXAoQXNzZXQuZnJvbVNjaGVtYSlcclxuICAgIHRoaXMudGFza3MgPSBTZXJpYWwoW1xyXG4gICAgICBXYWl0KDQ4KSwgXHJcbiAgICAgIFBhcmFsbGVsKFtcclxuICAgICAgICBQbGF5QXVkaW8oZmluZFdoZXJlKCd1dWlkJywgJzQ1NicsIHRoaXMuYXNzZXRzKSksXHJcbiAgICAgICAgU2VyaWFsKFtcclxuICAgICAgICAgIEluc2VydChmaW5kV2hlcmUoJ3V1aWQnLCAnc3RhZ2UnLCB0aGlzLmFzc2V0cyksIGZpbmRXaGVyZSgndXVpZCcsICcxMjMnLCB0aGlzLmFzc2V0cykpLFxyXG4gICAgICAgICAgRmFkZUluKGZpbmRXaGVyZSgndXVpZCcsICcxMjMnLCB0aGlzLmFzc2V0cykpXHJcbiAgICAgICAgXSlcclxuICAgICAgXSlcclxuICAgIF0pXHJcbiAgICB0aGlzLmNvbm5lY3Rpb25zID0gY29ubmVjdGlvblNjaGVtYXMubWFwKHMgPT4gbmV3IENvbm5lY3Rpb24ocykpXHJcbiAgfVxyXG5cclxuICBmaW5kTmV4dCh2YXJpYWJsZXMpIHtcclxuICAgIGxldCBjb25uZWN0aW9uID0gZmluZCgoe2V4cHJlc3Npb259KSA9PiBleHByZXNzaW9uKHZhcmlhYmxlcyksIHRoaXMuY29ubmVjdGlvbnMpXHJcblxyXG4gICAgcmV0dXJuIGNvbm5lY3Rpb24gPyBjb25uZWN0aW9uLnNlcXVlbmNlVVVJRCA6IG51bGxcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIFByb2dyYW0ge1xyXG4gIGNvbnN0cnVjdG9yKHByb2dyYW1TY2hlbWEpIHtcclxuICAgIHRoaXMubmFtZSA9IHByb2dyYW1TY2hlbWEubmFtZVxyXG4gICAgdGhpcy51dWlkID0gcHJvZ3JhbVNjaGVtYS51dWlkXHJcbiAgICB0aGlzLnN0YXRlID0gUFJPR1JBTV9TVEFURS5SRUFEWVxyXG4gICAgdGhpcy5hY3RpdmVTZXF1ZW5jZSA9IG51bGxcclxuICAgIHRoaXMuc2NoZW1hID0gcHJvZ3JhbVNjaGVtYVxyXG4gICAgdGhpcy52YXJpYWJsZXMgPSB0aGlzLnNjaGVtYS52YXJpYWJsZVNjaGVtYXMucmVkdWNlKChtYXAsIHZhcmlhYmxlU2NoZW1hKSA9PiB7XHJcbiAgICAgIG1hcFt2YXJpYWJsZVNjaGVtYS5uYW1lXSA9IHZhcmlhYmxlU2NoZW1hLnZhbHVlXHJcbiAgICAgIHJldHVybiBtYXBcclxuICAgIH0sIHt9KVxyXG4gIH1cclxuXHJcbiAgc3RhcnRTZXF1ZW5jZSh1dWlkKSB7XHJcbiAgICBjb25zdCBzZXF1ZW5jZVNjaGVtYSA9IGZpbmRXaGVyZSgndXVpZCcsIHV1aWQsIHRoaXMuc2NoZW1hLnNlcXVlbmNlU2NoZW1hcylcclxuXHJcbiAgICBpZiAoIXNlcXVlbmNlU2NoZW1hKSB0aHJvdyBuZXcgRXJyb3IoYE5vIHNjaGVtYSBuYW1lZCAke25hbWV9IHdhcyBmb3VuZGApXHJcblxyXG4gICAgdGhpcy5hY3RpdmVTZXF1ZW5jZSA9IG5ldyBTZXF1ZW5jZShzZXF1ZW5jZVNjaGVtYSlcclxuICAgIHRoaXMuc3RhdGUgPSBQUk9HUkFNX1NUQVRFLlBMQVlJTkdcclxuICB9XHJcbn1cclxuXHJcbi8vVE9ETzogcmVhbGx5IG5vdCBhIGZhbiBvZiB0aGUgXCJhc3NldFwiIGNsYXNzIGZvciBvcGFjaXR5LiAgQ29uc2lkZXIgZGl0Y2hpbmcgQ1NTLi4uXHJcbmNvbnN0IEFzc2V0ID0ge1xyXG4gIGZyb21TY2hlbWEoYXNzZXRTY2hlbWEpIHtcclxuICAgIHN3aXRjaCAoYXNzZXRTY2hlbWEudHlwZSkge1xyXG4gICAgICBjYXNlICdzdGFnZSc6IHJldHVybiBuZXcgQXNzZXQuU3RhZ2UoYXNzZXRTY2hlbWEpXHJcbiAgICAgIGNhc2UgJ2ltYWdlJzogcmV0dXJuIG5ldyBBc3NldC5JbWFnZShhc3NldFNjaGVtYSlcclxuICAgICAgY2FzZSAnYXVkaW8nOiByZXR1cm4gbmV3IEFzc2V0LkF1ZGlvKGFzc2V0U2NoZW1hKVxyXG4gICAgICBjYXNlICd0ZXh0JzogIHJldHVybiBuZXcgQXNzZXQuVGV4dChhc3NldFNjaGVtYSlcclxuICAgICAgZGVmYXVsdDogICAgICByZXR1cm4gbmV3IEFzc2V0LlVua25vd24oYXNzZXRTY2hlbWEpXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3RhZ2Uoe3N0eWxlfSkge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gU1RBR0VfRUxFTUVOVFxyXG4gICAgdGhpcy51dWlkID0gJ3N0YWdlJ1xyXG4gICAgZXh0ZW5kKHRoaXMuZWxlbWVudC5zdHlsZSwgc3R5bGUpXHJcbiAgfSxcclxuXHJcbiAgSW1hZ2Uoe3V1aWQsIHNyYywgc3R5bGV9KSB7XHJcbiAgICB0aGlzLnV1aWQgPSB1dWlkXHJcbiAgICB0aGlzLmVsZW1lbnQgPSBuZXcgSW1hZ2VcclxuICAgIHRoaXMuZWxlbWVudC5zcmMgPSBzcmNcclxuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhc3NldCcpXHJcbiAgICBleHRlbmQodGhpcy5lbGVtZW50LnN0eWxlLCBzdHlsZSlcclxuICB9LFxyXG5cclxuICBUZXh0KHt1dWlkLCB0YWcsIHRleHQsIHN0eWxlfSkge1xyXG4gICAgdGhpcy51dWlkID0gdXVpZFxyXG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpIFxyXG4gICAgdGhpcy5lbGVtZW50LmlubmVyVGV4dCA9IHRleHRcclxuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhc3NldCcpXHJcbiAgICBleHRlbmQodGhpcy5lbGVtZW50LnN0eWxlLCBzdHlsZSlcclxuICB9LFxyXG5cclxuICBBdWRpbyh7dXVpZCwgc3JjfSkge1xyXG4gICAgdGhpcy51dWlkID0gdXVpZFxyXG4gICAgdGhpcy5zcmMgPSBzcmNcclxuICB9LFxyXG5cclxuICBVbmtub3duKHNjaGVtYSkge1xyXG4gICAgdGhpcy51dWlkID0gc2NoZW1hLnV1aWRcclxuICAgIHRoaXMuc2NoZW1hID0gc2NoZW1hIFxyXG4gIH1cclxufVxyXG5cclxuY29uc3QgcHJvZ3JhbSA9IG5ldyBQcm9ncmFtKHByb2dyYW1TY2hlbWEpXHJcblxyXG5wcm9ncmFtLnN0YXJ0U2VxdWVuY2UoJ2FiYycpXHJcbndpbmRvdy5wcm9ncmFtID0gcHJvZ3JhbVxyXG5zZXRJbnRlcnZhbChtYWtlVXBkYXRlKHByb2dyYW0pLCBUSUNLX1JBVEUpXHJcbiIsIi8vICAgICB1dWlkLmpzXG4vL1xuLy8gICAgIENvcHlyaWdodCAoYykgMjAxMC0yMDEyIFJvYmVydCBLaWVmZmVyXG4vLyAgICAgTUlUIExpY2Vuc2UgLSBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cbihmdW5jdGlvbigpIHtcbiAgdmFyIF9nbG9iYWwgPSB0aGlzO1xuXG4gIC8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuICBXZSBmZWF0dXJlXG4gIC8vIGRldGVjdCB0byBkZXRlcm1pbmUgdGhlIGJlc3QgUk5HIHNvdXJjZSwgbm9ybWFsaXppbmcgdG8gYSBmdW5jdGlvbiB0aGF0XG4gIC8vIHJldHVybnMgMTI4LWJpdHMgb2YgcmFuZG9tbmVzcywgc2luY2UgdGhhdCdzIHdoYXQncyB1c3VhbGx5IHJlcXVpcmVkXG4gIHZhciBfcm5nO1xuXG4gIC8vIE5vZGUuanMgY3J5cHRvLWJhc2VkIFJORyAtIGh0dHA6Ly9ub2RlanMub3JnL2RvY3MvdjAuNi4yL2FwaS9jcnlwdG8uaHRtbFxuICAvL1xuICAvLyBNb2RlcmF0ZWx5IGZhc3QsIGhpZ2ggcXVhbGl0eVxuICBpZiAodHlwZW9mKF9nbG9iYWwucmVxdWlyZSkgPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRyeSB7XG4gICAgICB2YXIgX3JiID0gX2dsb2JhbC5yZXF1aXJlKCdjcnlwdG8nKS5yYW5kb21CeXRlcztcbiAgICAgIF9ybmcgPSBfcmIgJiYgZnVuY3Rpb24oKSB7cmV0dXJuIF9yYigxNik7fTtcbiAgICB9IGNhdGNoKGUpIHt9XG4gIH1cblxuICBpZiAoIV9ybmcgJiYgX2dsb2JhbC5jcnlwdG8gJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcykge1xuICAgIC8vIFdIQVRXRyBjcnlwdG8tYmFzZWQgUk5HIC0gaHR0cDovL3dpa2kud2hhdHdnLm9yZy93aWtpL0NyeXB0b1xuICAgIC8vXG4gICAgLy8gTW9kZXJhdGVseSBmYXN0LCBoaWdoIHF1YWxpdHlcbiAgICB2YXIgX3JuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuICAgIF9ybmcgPSBmdW5jdGlvbiB3aGF0d2dSTkcoKSB7XG4gICAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKF9ybmRzOCk7XG4gICAgICByZXR1cm4gX3JuZHM4O1xuICAgIH07XG4gIH1cblxuICBpZiAoIV9ybmcpIHtcbiAgICAvLyBNYXRoLnJhbmRvbSgpLWJhc2VkIChSTkcpXG4gICAgLy9cbiAgICAvLyBJZiBhbGwgZWxzZSBmYWlscywgdXNlIE1hdGgucmFuZG9tKCkuICBJdCdzIGZhc3QsIGJ1dCBpcyBvZiB1bnNwZWNpZmllZFxuICAgIC8vIHF1YWxpdHkuXG4gICAgdmFyICBfcm5kcyA9IG5ldyBBcnJheSgxNik7XG4gICAgX3JuZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIHI7IGkgPCAxNjsgaSsrKSB7XG4gICAgICAgIGlmICgoaSAmIDB4MDMpID09PSAwKSByID0gTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwO1xuICAgICAgICBfcm5kc1tpXSA9IHIgPj4+ICgoaSAmIDB4MDMpIDw8IDMpICYgMHhmZjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF9ybmRzO1xuICAgIH07XG4gIH1cblxuICAvLyBCdWZmZXIgY2xhc3MgdG8gdXNlXG4gIHZhciBCdWZmZXJDbGFzcyA9IHR5cGVvZihfZ2xvYmFsLkJ1ZmZlcikgPT0gJ2Z1bmN0aW9uJyA/IF9nbG9iYWwuQnVmZmVyIDogQXJyYXk7XG5cbiAgLy8gTWFwcyBmb3IgbnVtYmVyIDwtPiBoZXggc3RyaW5nIGNvbnZlcnNpb25cbiAgdmFyIF9ieXRlVG9IZXggPSBbXTtcbiAgdmFyIF9oZXhUb0J5dGUgPSB7fTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7IGkrKykge1xuICAgIF9ieXRlVG9IZXhbaV0gPSAoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpO1xuICAgIF9oZXhUb0J5dGVbX2J5dGVUb0hleFtpXV0gPSBpO1xuICB9XG5cbiAgLy8gKipgcGFyc2UoKWAgLSBQYXJzZSBhIFVVSUQgaW50byBpdCdzIGNvbXBvbmVudCBieXRlcyoqXG4gIGZ1bmN0aW9uIHBhcnNlKHMsIGJ1Ziwgb2Zmc2V0KSB7XG4gICAgdmFyIGkgPSAoYnVmICYmIG9mZnNldCkgfHwgMCwgaWkgPSAwO1xuXG4gICAgYnVmID0gYnVmIHx8IFtdO1xuICAgIHMudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bMC05YS1mXXsyfS9nLCBmdW5jdGlvbihvY3QpIHtcbiAgICAgIGlmIChpaSA8IDE2KSB7IC8vIERvbid0IG92ZXJmbG93IVxuICAgICAgICBidWZbaSArIGlpKytdID0gX2hleFRvQnl0ZVtvY3RdO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gWmVybyBvdXQgcmVtYWluaW5nIGJ5dGVzIGlmIHN0cmluZyB3YXMgc2hvcnRcbiAgICB3aGlsZSAoaWkgPCAxNikge1xuICAgICAgYnVmW2kgKyBpaSsrXSA9IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZjtcbiAgfVxuXG4gIC8vICoqYHVucGFyc2UoKWAgLSBDb252ZXJ0IFVVSUQgYnl0ZSBhcnJheSAoYWxhIHBhcnNlKCkpIGludG8gYSBzdHJpbmcqKlxuICBmdW5jdGlvbiB1bnBhcnNlKGJ1Ziwgb2Zmc2V0KSB7XG4gICAgdmFyIGkgPSBvZmZzZXQgfHwgMCwgYnRoID0gX2J5dGVUb0hleDtcbiAgICByZXR1cm4gIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dO1xuICB9XG5cbiAgLy8gKipgdjEoKWAgLSBHZW5lcmF0ZSB0aW1lLWJhc2VkIFVVSUQqKlxuICAvL1xuICAvLyBJbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vTGlvc0svVVVJRC5qc1xuICAvLyBhbmQgaHR0cDovL2RvY3MucHl0aG9uLm9yZy9saWJyYXJ5L3V1aWQuaHRtbFxuXG4gIC8vIHJhbmRvbSAjJ3Mgd2UgbmVlZCB0byBpbml0IG5vZGUgYW5kIGNsb2Nrc2VxXG4gIHZhciBfc2VlZEJ5dGVzID0gX3JuZygpO1xuXG4gIC8vIFBlciA0LjUsIGNyZWF0ZSBhbmQgNDgtYml0IG5vZGUgaWQsICg0NyByYW5kb20gYml0cyArIG11bHRpY2FzdCBiaXQgPSAxKVxuICB2YXIgX25vZGVJZCA9IFtcbiAgICBfc2VlZEJ5dGVzWzBdIHwgMHgwMSxcbiAgICBfc2VlZEJ5dGVzWzFdLCBfc2VlZEJ5dGVzWzJdLCBfc2VlZEJ5dGVzWzNdLCBfc2VlZEJ5dGVzWzRdLCBfc2VlZEJ5dGVzWzVdXG4gIF07XG5cbiAgLy8gUGVyIDQuMi4yLCByYW5kb21pemUgKDE0IGJpdCkgY2xvY2tzZXFcbiAgdmFyIF9jbG9ja3NlcSA9IChfc2VlZEJ5dGVzWzZdIDw8IDggfCBfc2VlZEJ5dGVzWzddKSAmIDB4M2ZmZjtcblxuICAvLyBQcmV2aW91cyB1dWlkIGNyZWF0aW9uIHRpbWVcbiAgdmFyIF9sYXN0TVNlY3MgPSAwLCBfbGFzdE5TZWNzID0gMDtcblxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2Jyb29mYS9ub2RlLXV1aWQgZm9yIEFQSSBkZXRhaWxzXG4gIGZ1bmN0aW9uIHYxKG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gICAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG4gICAgdmFyIGIgPSBidWYgfHwgW107XG5cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIHZhciBjbG9ja3NlcSA9IG9wdGlvbnMuY2xvY2tzZXEgIT0gbnVsbCA/IG9wdGlvbnMuY2xvY2tzZXEgOiBfY2xvY2tzZXE7XG5cbiAgICAvLyBVVUlEIHRpbWVzdGFtcHMgYXJlIDEwMCBuYW5vLXNlY29uZCB1bml0cyBzaW5jZSB0aGUgR3JlZ29yaWFuIGVwb2NoLFxuICAgIC8vICgxNTgyLTEwLTE1IDAwOjAwKS4gIEpTTnVtYmVycyBhcmVuJ3QgcHJlY2lzZSBlbm91Z2ggZm9yIHRoaXMsIHNvXG4gICAgLy8gdGltZSBpcyBoYW5kbGVkIGludGVybmFsbHkgYXMgJ21zZWNzJyAoaW50ZWdlciBtaWxsaXNlY29uZHMpIGFuZCAnbnNlY3MnXG4gICAgLy8gKDEwMC1uYW5vc2Vjb25kcyBvZmZzZXQgZnJvbSBtc2Vjcykgc2luY2UgdW5peCBlcG9jaCwgMTk3MC0wMS0wMSAwMDowMC5cbiAgICB2YXIgbXNlY3MgPSBvcHRpb25zLm1zZWNzICE9IG51bGwgPyBvcHRpb25zLm1zZWNzIDogbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAvLyBQZXIgNC4yLjEuMiwgdXNlIGNvdW50IG9mIHV1aWQncyBnZW5lcmF0ZWQgZHVyaW5nIHRoZSBjdXJyZW50IGNsb2NrXG4gICAgLy8gY3ljbGUgdG8gc2ltdWxhdGUgaGlnaGVyIHJlc29sdXRpb24gY2xvY2tcbiAgICB2YXIgbnNlY3MgPSBvcHRpb25zLm5zZWNzICE9IG51bGwgPyBvcHRpb25zLm5zZWNzIDogX2xhc3ROU2VjcyArIDE7XG5cbiAgICAvLyBUaW1lIHNpbmNlIGxhc3QgdXVpZCBjcmVhdGlvbiAoaW4gbXNlY3MpXG4gICAgdmFyIGR0ID0gKG1zZWNzIC0gX2xhc3RNU2VjcykgKyAobnNlY3MgLSBfbGFzdE5TZWNzKS8xMDAwMDtcblxuICAgIC8vIFBlciA0LjIuMS4yLCBCdW1wIGNsb2Nrc2VxIG9uIGNsb2NrIHJlZ3Jlc3Npb25cbiAgICBpZiAoZHQgPCAwICYmIG9wdGlvbnMuY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgICAgY2xvY2tzZXEgPSBjbG9ja3NlcSArIDEgJiAweDNmZmY7XG4gICAgfVxuXG4gICAgLy8gUmVzZXQgbnNlY3MgaWYgY2xvY2sgcmVncmVzc2VzIChuZXcgY2xvY2tzZXEpIG9yIHdlJ3ZlIG1vdmVkIG9udG8gYSBuZXdcbiAgICAvLyB0aW1lIGludGVydmFsXG4gICAgaWYgKChkdCA8IDAgfHwgbXNlY3MgPiBfbGFzdE1TZWNzKSAmJiBvcHRpb25zLm5zZWNzID09IG51bGwpIHtcbiAgICAgIG5zZWNzID0gMDtcbiAgICB9XG5cbiAgICAvLyBQZXIgNC4yLjEuMiBUaHJvdyBlcnJvciBpZiB0b28gbWFueSB1dWlkcyBhcmUgcmVxdWVzdGVkXG4gICAgaWYgKG5zZWNzID49IDEwMDAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3V1aWQudjEoKTogQ2FuXFwndCBjcmVhdGUgbW9yZSB0aGFuIDEwTSB1dWlkcy9zZWMnKTtcbiAgICB9XG5cbiAgICBfbGFzdE1TZWNzID0gbXNlY3M7XG4gICAgX2xhc3ROU2VjcyA9IG5zZWNzO1xuICAgIF9jbG9ja3NlcSA9IGNsb2Nrc2VxO1xuXG4gICAgLy8gUGVyIDQuMS40IC0gQ29udmVydCBmcm9tIHVuaXggZXBvY2ggdG8gR3JlZ29yaWFuIGVwb2NoXG4gICAgbXNlY3MgKz0gMTIyMTkyOTI4MDAwMDA7XG5cbiAgICAvLyBgdGltZV9sb3dgXG4gICAgdmFyIHRsID0gKChtc2VjcyAmIDB4ZmZmZmZmZikgKiAxMDAwMCArIG5zZWNzKSAlIDB4MTAwMDAwMDAwO1xuICAgIGJbaSsrXSA9IHRsID4+PiAyNCAmIDB4ZmY7XG4gICAgYltpKytdID0gdGwgPj4+IDE2ICYgMHhmZjtcbiAgICBiW2krK10gPSB0bCA+Pj4gOCAmIDB4ZmY7XG4gICAgYltpKytdID0gdGwgJiAweGZmO1xuXG4gICAgLy8gYHRpbWVfbWlkYFxuICAgIHZhciB0bWggPSAobXNlY3MgLyAweDEwMDAwMDAwMCAqIDEwMDAwKSAmIDB4ZmZmZmZmZjtcbiAgICBiW2krK10gPSB0bWggPj4+IDggJiAweGZmO1xuICAgIGJbaSsrXSA9IHRtaCAmIDB4ZmY7XG5cbiAgICAvLyBgdGltZV9oaWdoX2FuZF92ZXJzaW9uYFxuICAgIGJbaSsrXSA9IHRtaCA+Pj4gMjQgJiAweGYgfCAweDEwOyAvLyBpbmNsdWRlIHZlcnNpb25cbiAgICBiW2krK10gPSB0bWggPj4+IDE2ICYgMHhmZjtcblxuICAgIC8vIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYCAoUGVyIDQuMi4yIC0gaW5jbHVkZSB2YXJpYW50KVxuICAgIGJbaSsrXSA9IGNsb2Nrc2VxID4+PiA4IHwgMHg4MDtcblxuICAgIC8vIGBjbG9ja19zZXFfbG93YFxuICAgIGJbaSsrXSA9IGNsb2Nrc2VxICYgMHhmZjtcblxuICAgIC8vIGBub2RlYFxuICAgIHZhciBub2RlID0gb3B0aW9ucy5ub2RlIHx8IF9ub2RlSWQ7XG4gICAgZm9yICh2YXIgbiA9IDA7IG4gPCA2OyBuKyspIHtcbiAgICAgIGJbaSArIG5dID0gbm9kZVtuXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmID8gYnVmIDogdW5wYXJzZShiKTtcbiAgfVxuXG4gIC8vICoqYHY0KClgIC0gR2VuZXJhdGUgcmFuZG9tIFVVSUQqKlxuXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYnJvb2ZhL25vZGUtdXVpZCBmb3IgQVBJIGRldGFpbHNcbiAgZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgICAvLyBEZXByZWNhdGVkIC0gJ2Zvcm1hdCcgYXJndW1lbnQsIGFzIHN1cHBvcnRlZCBpbiB2MS4yXG4gICAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG5cbiAgICBpZiAodHlwZW9mKG9wdGlvbnMpID09ICdzdHJpbmcnKSB7XG4gICAgICBidWYgPSBvcHRpb25zID09ICdiaW5hcnknID8gbmV3IEJ1ZmZlckNsYXNzKDE2KSA6IG51bGw7XG4gICAgICBvcHRpb25zID0gbnVsbDtcbiAgICB9XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICB2YXIgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBfcm5nKSgpO1xuXG4gICAgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuICAgIHJuZHNbNl0gPSAocm5kc1s2XSAmIDB4MGYpIHwgMHg0MDtcbiAgICBybmRzWzhdID0gKHJuZHNbOF0gJiAweDNmKSB8IDB4ODA7XG5cbiAgICAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcbiAgICBpZiAoYnVmKSB7XG4gICAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgMTY7IGlpKyspIHtcbiAgICAgICAgYnVmW2kgKyBpaV0gPSBybmRzW2lpXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYnVmIHx8IHVucGFyc2Uocm5kcyk7XG4gIH1cblxuICAvLyBFeHBvcnQgcHVibGljIEFQSVxuICB2YXIgdXVpZCA9IHY0O1xuICB1dWlkLnYxID0gdjE7XG4gIHV1aWQudjQgPSB2NDtcbiAgdXVpZC5wYXJzZSA9IHBhcnNlO1xuICB1dWlkLnVucGFyc2UgPSB1bnBhcnNlO1xuICB1dWlkLkJ1ZmZlckNsYXNzID0gQnVmZmVyQ2xhc3M7XG5cbiAgaWYgKHR5cGVvZihtb2R1bGUpICE9ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgLy8gUHVibGlzaCBhcyBub2RlLmpzIG1vZHVsZVxuICAgIG1vZHVsZS5leHBvcnRzID0gdXVpZDtcbiAgfSBlbHNlICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgLy8gUHVibGlzaCBhcyBBTUQgbW9kdWxlXG4gICAgZGVmaW5lKGZ1bmN0aW9uKCkge3JldHVybiB1dWlkO30pO1xuIFxuXG4gIH0gZWxzZSB7XG4gICAgLy8gUHVibGlzaCBhcyBnbG9iYWwgKGluIGJyb3dzZXJzKVxuICAgIHZhciBfcHJldmlvdXNSb290ID0gX2dsb2JhbC51dWlkO1xuXG4gICAgLy8gKipgbm9Db25mbGljdCgpYCAtIChicm93c2VyIG9ubHkpIHRvIHJlc2V0IGdsb2JhbCAndXVpZCcgdmFyKipcbiAgICB1dWlkLm5vQ29uZmxpY3QgPSBmdW5jdGlvbigpIHtcbiAgICAgIF9nbG9iYWwudXVpZCA9IF9wcmV2aW91c1Jvb3Q7XG4gICAgICByZXR1cm4gdXVpZDtcbiAgICB9O1xuXG4gICAgX2dsb2JhbC51dWlkID0gdXVpZDtcbiAgfVxufSkuY2FsbCh0aGlzKTtcbiIsImV4cG9ydCBkZWZhdWx0IHtcclxuICB1dWlkOiAncHJvZ3JhbScsXHJcbiAgbmFtZTogJ1Rlc3QgcHJvZ3JhbScsXHJcbiAgdmFyaWFibGVTY2hlbWFzOiBbe1xyXG4gICAgbmFtZTogJ2FnZScsXHJcbiAgICB0eXBlOiBcIk51bWJlclwiLFxyXG4gICAgbWluOiAwLFxyXG4gICAgbWF4OiAyNTAsXHJcbiAgICB2YWx1ZTogMjBcclxuICB9XSxcclxuICBzZXF1ZW5jZVNjaGVtYXM6IFt7XHJcbiAgICBuYW1lOiAnbWFpbicsXHJcbiAgICB1dWlkOiAnYWJjJyxcclxuICAgIGNvbm5lY3Rpb25TY2hlbWFzOiBbe1xyXG4gICAgICBleHByZXNzaW9uOiBcInRydWVcIixcclxuICAgICAgc2VxdWVuY2VVVUlEOiBudWxsXHJcbiAgICB9XSxcclxuICAgIGFzc2V0U2NoZW1hczogW3tcclxuICAgICAgdXVpZDogJ3N0YWdlJyxcclxuICAgICAgdHlwZTogJ3N0YWdlJyxcclxuICAgICAgc3R5bGU6IHt9XHJcbiAgICB9LCB7XHJcbiAgICAgIHV1aWQ6ICcxMjMnLFxyXG4gICAgICB0eXBlOiAnaW1hZ2UnLFxyXG4gICAgICBzcmM6ICdlbW1pLnBuZycsXHJcbiAgICAgIHN0eWxlOiB7fSBcclxuICAgIH0sIHtcclxuICAgICAgdXVpZDogJzQ1NicsXHJcbiAgICAgIHR5cGU6ICdhdWRpbycsXHJcbiAgICAgIHNyYzogWyd0ZXN0Lm1wMyddXHJcbiAgICB9LCB7XHJcbiAgICAgIHV1aWQ6ICc3ODknLFxyXG4gICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgIHRhZzogJ3AnLFxyXG4gICAgICB0ZXh0OiAnQ2xpY2sgdGhlIGxvZ28gdG8gY29udGludWUnLFxyXG4gICAgICBzdHlsZToge1xyXG4gICAgICAgIGZvbnQ6ICczMHB4IGFyaWVsLCBzYW5zLXNlcmlmJyxcclxuICAgICAgICBjb2xvcjogJ2JsdWUnIFxyXG4gICAgICB9IFxyXG4gICAgfV0sXHJcblxyXG4gICAgdGFza1NjaGVtYXM6IFt7XHJcbiAgICAgIHR5cGU6ICdwYXJhbGxlbCcsXHJcbiAgICAgIHRhc2tTY2hlbWFzOiBbe1xyXG4gICAgICAgIHR5cGU6ICdzZXJpYWwnLFxyXG4gICAgICAgIHRhc2tTY2hlbWFzOiBbe1xyXG4gICAgICAgICAgdHlwZTogJ2luc2VydCcsIFxyXG4gICAgICAgICAgcGFyZW50OiAnc3RhZ2UnLFxyXG4gICAgICAgICAgc3ViamVjdDogJzEyMydcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICB0eXBlOiAnZmFkZS1pbicsXHJcbiAgICAgICAgICBzdWJqZWN0OiAnMTIzJ1xyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIHR5cGU6ICdpbnNlcnQnLFxyXG4gICAgICAgICAgcGFyZW50OiAnc3RhZ2UnLFxyXG4gICAgICAgICAgc3ViamVjdDogJzc4OSdcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICB0eXBlOiAnZmFkZS1pbicsXHJcbiAgICAgICAgICBzdWJqZWN0OiAnNzg5J1xyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIHR5cGU6ICdpbycsXHJcbiAgICAgICAgICBzdWJqZWN0OiAnNzg5JyAgIFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIHR5cGU6ICdwYXJhbGxlbCcsXHJcbiAgICAgICAgICB0YXNrU2NoZW1hczogW3tcclxuICAgICAgICAgICAgdHlwZTogJ3NlcmlhbCcsXHJcbiAgICAgICAgICAgIHRhc2tTY2hlbWFzOiBbe1xyXG4gICAgICAgICAgICAgIHR5cGU6ICdmYWRlLW91dCcsXHJcbiAgICAgICAgICAgICAgc3ViamVjdDogJzEyMydcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgIHR5cGU6ICdyZW1vdmUnLFxyXG4gICAgICAgICAgICAgIHBhcmVudDogJ3N0YWdlJyxcclxuICAgICAgICAgICAgICBzdWJqZWN0OiAnMTIzJ1xyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICB0eXBlOiAnc2VyaWFsJyxcclxuICAgICAgICAgICAgdGFza1NjaGVtYXM6IFt7XHJcbiAgICAgICAgICAgICAgdHlwZTogJ2ZhZGUtb3V0JyxcclxuICAgICAgICAgICAgICBzdWJqZWN0OiAnNzg5J1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgdHlwZTogJ3JlbW92ZScsXHJcbiAgICAgICAgICAgICAgcGFyZW50OiAnc3RhZ2UnLFxyXG4gICAgICAgICAgICAgIHN1YmplY3Q6ICc3ODknXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICB9XSAgXHJcbiAgICAgICAgfV0gXHJcbiAgICAgIH1dICAgXHJcbiAgICB9LCB7XHJcbiAgICAgIHR5cGU6ICdhdWRpby1wbGF5JyxcclxuICAgICAgc3ViamVjdDogJzQ1NidcclxuICAgIH1dXHJcbiAgfV1cclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gcHAgKG9iaikge1xyXG4gIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG9iaiwgbnVsbCwgMikpXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBsb2cgPSBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpXHJcblxyXG4vL3NoYWxsb3cgY2xvbmUgLS0gbm90IGlkZWFsIGFzIG1pZ2h0IHRyaWdnZXIgZGljdGlvbmFyeSBtb2RlP1xyXG5leHBvcnQgZnVuY3Rpb24gY2xvbmUgKG9iaikge1xyXG4gIGxldCBvdXQgPSB7fVxyXG5cclxuICBmb3IgKGxldCBrZXkgaW4gb2JqKSB7XHJcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIG91dFtrZXldID0gb2JqW2tleV0gXHJcbiAgfSBcclxuICByZXR1cm4gb3V0XHJcbn1cclxuXHJcbi8vbXV0YXRpdmUhXHJcbmV4cG9ydCBmdW5jdGlvbiBleHRlbmQgKG9iaiwgbmV4dCkge1xyXG4gIGZvciAobGV0IGtleSBpbiBuZXh0KSB7XHJcbiAgICBpZiAobmV4dC5oYXNPd25Qcm9wZXJ0eShrZXkpKSBvYmpba2V5XSA9IG5leHRba2V5XVxyXG4gIH0gXHJcbiAgcmV0dXJuIG9ialxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZCAocHJlZEZuLCBhcnJheSkge1xyXG4gIGZvciAobGV0IGl0ZW0gb2YgYXJyYXkpIHtcclxuICAgIGlmIChwcmVkRm4oaXRlbSkpIHJldHVybiBpdGVtXHJcbiAgfVxyXG4gIHJldHVybiBudWxsXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kV2hlcmUoa2V5LCB2YWwsIGFycmF5KSB7XHJcbiAgZm9yIChsZXQgaXRlbSBvZiBhcnJheSkge1xyXG4gICAgaWYgKGl0ZW1ba2V5XSA9PT0gdmFsKSByZXR1cm4gaXRlbSBcclxuICB9XHJcbiAgcmV0dXJuIG51bGxcclxufVxyXG4iXX0=
