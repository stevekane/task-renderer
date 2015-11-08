(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var marked0$0 = [Parallel, Serial, Wait, FadeIn, FadeOut, Insert, Remove, Do, IO, PlayAudio].map(regeneratorRuntime.mark);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _nodeUuid = require('node-uuid');

var _utils = require('./utils');

var _programSchema = require('./programSchema');

var _programSchema2 = _interopRequireDefault(_programSchema);

var TICK_RATE = 24;
var STAGE_ELEMENT = document.body;

var PROGRAM_STATE = {
  LOADING: 0,
  PLAYING: 1,
  PAUSED: 2,
  DONE: 3
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
      if (program.activeSequence.next(program.state).done()) {
        var targetSequence = program.activeState;
      }
    }
  };
}

function Parallel(tasks) {
  var time, dT, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, task;

  return regeneratorRuntime.wrap(function Parallel$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        time = 0;
        dT = 0;

      case 2:
        if (!tasks.length) {
          context$1$0.next = 28;
          break;
        }

        context$1$0.next = 5;
        return;

      case 5:
        dT = context$1$0.sent;

        time += dT;
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 10;
        for (_iterator = tasks[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          task = _step.value;

          if (task.next(dT).done) {
            tasks.splice(tasks.indexOf(task), 1);
          }
        }
        context$1$0.next = 18;
        break;

      case 14:
        context$1$0.prev = 14;
        context$1$0.t0 = context$1$0['catch'](10);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 18:
        context$1$0.prev = 18;
        context$1$0.prev = 19;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 21:
        context$1$0.prev = 21;

        if (!_didIteratorError) {
          context$1$0.next = 24;
          break;
        }

        throw _iteratorError;

      case 24:
        return context$1$0.finish(21);

      case 25:
        return context$1$0.finish(18);

      case 26:
        context$1$0.next = 2;
        break;

      case 28:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this, [[10, 14, 18, 26], [19,, 21, 25]]);
}

function Serial(tasks) {
  var time, dT;
  return regeneratorRuntime.wrap(function Serial$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        time = 0;
        dT = 0;

      case 2:
        if (!tasks.length) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.next = 5;
        return;

      case 5:
        dT = context$1$0.sent;

        time += dT;
        if (tasks[0].next(dT).done) tasks.shift();
        context$1$0.next = 2;
        break;

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[1], this);
}

function Wait(duration) {
  var elapsed, dT;
  return regeneratorRuntime.wrap(function Wait$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        elapsed = 0;
        dT = 0;

      case 2:
        if (!(elapsed < duration)) {
          context$1$0.next = 9;
          break;
        }

        context$1$0.next = 5;
        return;

      case 5:
        dT = context$1$0.sent;

        elapsed += dT;
        context$1$0.next = 2;
        break;

      case 9:
        console.log('waited: ' + elapsed);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[2], this);
}

function FadeIn(domAsset) {
  var elapsed, duration, dT;
  return regeneratorRuntime.wrap(function FadeIn$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        elapsed = 0;
        duration = 12;
        dT = 0;
        context$1$0.next = 5;
        return;

      case 5:
        dT = context$1$0.sent;

        elapsed += dT;
        domAsset.element.classList.add("active");

      case 8:
        if (!(elapsed < duration)) {
          context$1$0.next = 15;
          break;
        }

        context$1$0.next = 11;
        return;

      case 11:
        dT = context$1$0.sent;

        elapsed += dT;
        context$1$0.next = 8;
        break;

      case 15:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[3], this);
}

function FadeOut(domAsset) {
  var remaining, dT;
  return regeneratorRuntime.wrap(function FadeOut$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        remaining = 12;
        dT = 0;
        context$1$0.next = 4;
        return;

      case 4:
        dT = context$1$0.sent;

        remaining -= dT;
        domAsset.element.classList.remove("active");

      case 7:
        if (!(remaining > 0)) {
          context$1$0.next = 14;
          break;
        }

        context$1$0.next = 10;
        return;

      case 10:
        dT = context$1$0.sent;

        remaining -= dT;
        context$1$0.next = 7;
        break;

      case 14:
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

function Do(fn) {
  for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  return regeneratorRuntime.wrap(function Do$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        fn.apply(null, params);

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[7], this);
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
  }, marked0$0[8], this);
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
  }, marked0$0[9], this);
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
    this.tasks = Wait(48);
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
      });

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

  _createClass(Program, [{
    key: 'startSequence',
    value: function startSequence(name) {
      var sequenceSchema = this.schema.sequenceSchemas[name];

      if (!schema) throw new Error('No schema named ' + name + ' was found');

      this.activeSequence = new Sequence(assets, tasks);
      this.state = PROGRAM_STATE.READY;
    }
  }, {
    key: 'update',
    value: function update(dT) {
      if (!this.activeSequence) return;
      this.activeSequence.tasks.next(dT);
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
        return new Asst.Text(assetSchema);
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIkM6L1VzZXJzL2thbmVzXzAwMC9wcm9qZWN0cy90YXNrLXJlbmRlcmVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL25vZGUtdXVpZC91dWlkLmpzIiwiQzovVXNlcnMva2FuZXNfMDAwL3Byb2plY3RzL3Rhc2stcmVuZGVyZXIvcHJvZ3JhbVNjaGVtYS5qcyIsIkM6L1VzZXJzL2thbmVzXzAwMC9wcm9qZWN0cy90YXNrLXJlbmRlcmVyL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O2lCQ21DVyxRQUFRLEVBZVIsTUFBTSxFQVdOLElBQUksRUFXSixNQUFNLEVBZU4sT0FBTyxFQWNQLE1BQU0sRUFJTixNQUFNLEVBSU4sRUFBRSxFQUlGLEVBQUUsRUFXRixTQUFTOzs7O3dCQTVISyxXQUFXOztxQkFDTyxTQUFTOzs2QkFDMUIsaUJBQWlCOzs7O0FBRTNDLElBQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQTtBQUNwQixJQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFBOztBQUVuQyxJQUFNLGFBQWEsR0FBRztBQUNwQixTQUFPLEVBQUUsQ0FBQztBQUNWLFNBQU8sRUFBRSxDQUFDO0FBQ1YsUUFBTSxFQUFFLENBQUM7QUFDVCxNQUFJLEVBQUUsQ0FBQztDQUNSLENBQUE7O0FBRUQsU0FBUyxVQUFVLENBQUUsT0FBTyxFQUFFO0FBQzVCLE1BQUksUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtBQUN6QixNQUFJLFFBQVEsR0FBRyxRQUFRLENBQUE7QUFDdkIsTUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFBOztBQUVWLFNBQU8sWUFBWTtBQUNqQixZQUFRLEdBQUcsUUFBUSxDQUFBO0FBQ25CLFlBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sSUFBSSxDQUFBO0tBQzlCOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0QsU0FBTyxJQUFJLENBQUE7Q0FDWiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQge3Y0IGFzIHV1aWR9IGZyb20gJ25vZGUtdXVpZCdcclxuaW1wb3J0IHtwcCwgbG9nLCBjbG9uZSwgZXh0ZW5kLCBmaW5kfSBmcm9tICcuL3V0aWxzJ1xyXG5pbXBvcnQgcHJvZ3JhbVNjaGVtYSBmcm9tICcuL3Byb2dyYW1TY2hlbWEnXHJcblxyXG5jb25zdCBUSUNLX1JBVEUgPSAyNFxyXG5jb25zdCBTVEFHRV9FTEVNRU5UID0gZG9jdW1lbnQuYm9keVxyXG5cclxuY29uc3QgUFJPR1JBTV9TVEFURSA9IHtcclxuICBMT0FESU5HOiAwLFxyXG4gIFBMQVlJTkc6IDEsXHJcbiAgUEFVU0VEOiAyLFxyXG4gIERPTkU6IDNcclxufVxyXG5cclxuZnVuY3Rpb24gbWFrZVVwZGF0ZSAocHJvZ3JhbSkge1xyXG4gIGxldCBsYXN0VGltZSA9IERhdGUubm93KClcclxuICBsZXQgdGhpc1RpbWUgPSBsYXN0VGltZVxyXG4gIGxldCBkVCA9IDBcclxuXHJcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgIGxhc3RUaW1lID0gdGhpc1RpbWVcclxuICAgIHRoaXNUaW1lID0gRGF0ZS5ub3coKVxyXG4gICAgZFQgPSB0aGlzVGltZSAtIGxhc3RUaW1lXHJcblxyXG4gICAgLy9UT0RPOiBjaGVjayB0aGF0IGRUIGlzIGluIHZhbGlkIHJhbmdlIGZvciBcIm5vcm1hbCB0aWNrXCJcclxuICAgIGlmIChwcm9ncmFtLmFjdGl2ZVNlcXVlbmNlKSB7XHJcbiAgICAgIGlmIChwcm9ncmFtLmFjdGl2ZVNlcXVlbmNlLm5leHQocHJvZ3JhbS5zdGF0ZSkuZG9uZSgpKSB7XHJcbiAgICAgICAgbGV0IHRhcmdldFNlcXVlbmNlID0gcHJvZ3JhbS5hY3RpdmVTdGF0ZVxyXG5cclxuXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uICogUGFyYWxsZWwgKHRhc2tzKSB7XHJcbiAgbGV0IHRpbWUgPSAwXHJcbiAgbGV0IGRUID0gMFxyXG5cclxuICB3aGlsZSAodGFza3MubGVuZ3RoKSB7XHJcbiAgICBkVCA9IHlpZWxkXHJcbiAgICB0aW1lICs9IGRUXHJcbiAgICBmb3IgKGxldCB0YXNrIG9mIHRhc2tzKSB7XHJcbiAgICAgIGlmICh0YXNrLm5leHQoZFQpLmRvbmUpIHtcclxuICAgICAgICB0YXNrcy5zcGxpY2UodGFza3MuaW5kZXhPZih0YXNrKSwgMSlcclxuICAgICAgfVxyXG4gICAgfSBcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uICogU2VyaWFsICh0YXNrcykge1xyXG4gIGxldCB0aW1lID0gMFxyXG4gIGxldCBkVCA9IDBcclxuXHJcbiAgd2hpbGUgKHRhc2tzLmxlbmd0aCkge1xyXG4gICAgZFQgPSB5aWVsZFxyXG4gICAgdGltZSArPSBkVFxyXG4gICAgaWYgKHRhc2tzWzBdLm5leHQoZFQpLmRvbmUpIHRhc2tzLnNoaWZ0KClcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uICogV2FpdCAoZHVyYXRpb24pIHtcclxuICBsZXQgZWxhcHNlZCA9IDAgXHJcbiAgbGV0IGRUID0gMFxyXG5cclxuICB3aGlsZSAoZWxhcHNlZCA8IGR1cmF0aW9uKSB7XHJcbiAgICBkVCA9IHlpZWxkXHJcbiAgICBlbGFwc2VkICs9IGRUIFxyXG4gIH1cclxuICBjb25zb2xlLmxvZyhgd2FpdGVkOiAke2VsYXBzZWR9YClcclxufVxyXG5cclxuZnVuY3Rpb24gKiBGYWRlSW4gKGRvbUFzc2V0KSB7XHJcbiAgbGV0IGVsYXBzZWQgPSAwXHJcbiAgbGV0IGR1cmF0aW9uID0gMTJcclxuICBsZXQgZFQgPSAwXHJcblxyXG4gIGRUID0geWllbGRcclxuICBlbGFwc2VkICs9IGRUIFxyXG4gIGRvbUFzc2V0LmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKVxyXG5cclxuICB3aGlsZSAoZWxhcHNlZCA8IGR1cmF0aW9uKSB7XHJcbiAgICBkVCA9IHlpZWxkXHJcbiAgICBlbGFwc2VkICs9IGRUIFxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gKiBGYWRlT3V0IChkb21Bc3NldCkge1xyXG4gIGxldCByZW1haW5pbmcgPSAxMlxyXG4gIGxldCBkVCA9IDBcclxuXHJcbiAgZFQgPSB5aWVsZFxyXG4gIHJlbWFpbmluZyAtPSBkVCBcclxuICBkb21Bc3NldC5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcclxuXHJcbiAgd2hpbGUgKHJlbWFpbmluZyA+IDApIHtcclxuICAgIGRUID0geWllbGRcclxuICAgIHJlbWFpbmluZyAtPSBkVCBcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uICogSW5zZXJ0IChwYXJlbnQsIGRvbUFzc2V0KSB7XHJcbiAgcGFyZW50LmVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9tQXNzZXQuZWxlbWVudClcclxufVxyXG5cclxuZnVuY3Rpb24gKiBSZW1vdmUgKHBhcmVudCwgZG9tQXNzZXQpIHtcclxuICBwYXJlbnQuZWxlbWVudC5yZW1vdmVDaGlsZChkb21Bc3NldC5lbGVtZW50KVxyXG59XHJcblxyXG5mdW5jdGlvbiAqIERvIChmbiwgLi4ucGFyYW1zKSB7XHJcbiAgZm4uYXBwbHkobnVsbCwgcGFyYW1zKVxyXG59XHJcblxyXG5mdW5jdGlvbiAqIElPIChkb21Bc3NldCkge1xyXG4gIGxldCBkb25lID0gZmFsc2UgIFxyXG4gIGxldCBsaXN0ZW5lciA9IGRvbUFzc2V0LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBkb25lID0gdHJ1ZSlcclxuXHJcbiAgY29uc29sZS5sb2coJ3BsZWFzZSBpbnRlcmFjdCB3aXRoIHRoZSBwYWdlJylcclxuICB3aGlsZSAoIWRvbmUpIHlpZWxkXHJcblxyXG4gIGNvbnNvbGUubG9nKCd0aGFua3MgZm9yIHlvdXIgcGFydGljaXBhdGlvbicpXHJcbiAgZG9tQXNzZXQuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyKVxyXG59XHJcblxyXG5mdW5jdGlvbiAqIFBsYXlBdWRpbyAoYXVkaW9Bc3NldCkge1xyXG4gIGxldCBkb25lID0gZmFsc2VcclxuICBsZXQgc291bmQgPSBuZXcgSG93bCh7XHJcbiAgICBzcmM6IGF1ZGlvQXNzZXQuc3JjLFxyXG4gICAgb25lbmQ6ICgpID0+IGRvbmUgPSB0cnVlXHJcbiAgfSlcclxuXHJcbiAgc291bmQucGxheSgpXHJcbiAgd2hpbGUgKCFkb25lKSB5aWVsZFxyXG4gIGNvbnNvbGUubG9nKCdhdWRpbyBjb21wbGV0ZWQnKVxyXG59XHJcblxyXG5jbGFzcyBDb25uZWN0aW9uIHtcclxuICBjb25zdHJ1Y3Rvcih7ZXhwcmVzc2lvbiwgc2VxdWVuY2VVVUlEfSkge1xyXG4gICAgdGhpcy5leHByZXNzaW9uID0gbmV3IEZ1bmN0aW9uKCckJywgZXhwcmVzc2lvbikgXHJcbiAgICB0aGlzLnNlcXVlbmNlVVVJRCA9IHNlcXVlbmNlVVVJRFxyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgU2VxdWVuY2Uge1xyXG4gIGNvbnN0cnVjdG9yKHt1dWlkLCBuYW1lLCBhc3NldFNjaGVtYXMsIHRhc2tTY2hlbWFzLCBjb25uZWN0aW9uU2NoZW1hc30pIHtcclxuICAgIHRoaXMubmFtZSA9IG5hbWVcclxuICAgIHRoaXMudXVpZCA9IHV1aWRcclxuICAgIHRoaXMuYXNzZXRzID0gYXNzZXRTY2hlbWFzLm1hcChBc3NldC5mcm9tU2NoZW1hKVxyXG4gICAgdGhpcy50YXNrcyA9IFdhaXQoNDgpXHJcbiAgICB0aGlzLmNvbm5lY3Rpb25zID0gY29ubmVjdGlvblNjaGVtYXMubWFwKHMgPT4gbmV3IENvbm5lY3Rpb24ocykpXHJcbiAgfVxyXG5cclxuICBmaW5kTmV4dCh2YXJpYWJsZXMpIHtcclxuICAgIGxldCBjb25uZWN0aW9uID0gZmluZCgoe2V4cHJlc3Npb259KSA9PiBleHByZXNzaW9uKHZhcmlhYmxlcykpXHJcblxyXG4gICAgcmV0dXJuIGNvbm5lY3Rpb24gPyBjb25uZWN0aW9uLnNlcXVlbmNlVVVJRCA6IG51bGxcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIFByb2dyYW0ge1xyXG4gIGNvbnN0cnVjdG9yKHByb2dyYW1TY2hlbWEpIHtcclxuICAgIHRoaXMubmFtZSA9IHByb2dyYW1TY2hlbWEubmFtZVxyXG4gICAgdGhpcy51dWlkID0gcHJvZ3JhbVNjaGVtYS51dWlkXHJcbiAgICB0aGlzLnN0YXRlID0gUFJPR1JBTV9TVEFURS5SRUFEWVxyXG4gICAgdGhpcy5hY3RpdmVTZXF1ZW5jZSA9IG51bGxcclxuICAgIHRoaXMuc2NoZW1hID0gcHJvZ3JhbVNjaGVtYVxyXG4gICAgdGhpcy52YXJpYWJsZXMgPSB0aGlzLnNjaGVtYS52YXJpYWJsZVNjaGVtYXMucmVkdWNlKChtYXAsIHZhcmlhYmxlU2NoZW1hKSA9PiB7XHJcbiAgICAgIG1hcFt2YXJpYWJsZVNjaGVtYS5uYW1lXSA9IHZhcmlhYmxlU2NoZW1hLnZhbHVlXHJcbiAgICAgIHJldHVybiBtYXBcclxuICAgIH0sIHt9KVxyXG4gIH1cclxuXHJcbiAgc3RhcnRTZXF1ZW5jZShuYW1lKSB7XHJcbiAgICBjb25zdCBzZXF1ZW5jZVNjaGVtYSA9IHRoaXMuc2NoZW1hLnNlcXVlbmNlU2NoZW1hc1tuYW1lXSBcclxuXHJcbiAgICBpZiAoIXNjaGVtYSkgdGhyb3cgbmV3IEVycm9yKGBObyBzY2hlbWEgbmFtZWQgJHtuYW1lfSB3YXMgZm91bmRgKVxyXG5cclxuICAgIHRoaXMuYWN0aXZlU2VxdWVuY2UgPSBuZXcgU2VxdWVuY2UoYXNzZXRzLCB0YXNrcylcclxuICAgIHRoaXMuc3RhdGUgPSBQUk9HUkFNX1NUQVRFLlJFQURZXHJcbiAgfVxyXG5cclxuICB1cGRhdGUoZFQpIHtcclxuICAgIGlmICghdGhpcy5hY3RpdmVTZXF1ZW5jZSkgcmV0dXJuXHJcbiAgICB0aGlzLmFjdGl2ZVNlcXVlbmNlLnRhc2tzLm5leHQoZFQpXHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBBc3NldCA9IHtcclxuICBmcm9tU2NoZW1hKGFzc2V0U2NoZW1hKSB7XHJcbiAgICBzd2l0Y2ggKGFzc2V0U2NoZW1hLnR5cGUpIHtcclxuICAgICAgY2FzZSAnc3RhZ2UnOiByZXR1cm4gbmV3IEFzc2V0LlN0YWdlKGFzc2V0U2NoZW1hKVxyXG4gICAgICBjYXNlICdpbWFnZSc6IHJldHVybiBuZXcgQXNzZXQuSW1hZ2UoYXNzZXRTY2hlbWEpXHJcbiAgICAgIGNhc2UgJ2F1ZGlvJzogcmV0dXJuIG5ldyBBc3NldC5BdWRpbyhhc3NldFNjaGVtYSlcclxuICAgICAgY2FzZSAndGV4dCc6ICByZXR1cm4gbmV3IEFzc3QuVGV4dChhc3NldFNjaGVtYSlcclxuICAgICAgZGVmYXVsdDogICAgICByZXR1cm4gbmV3IEFzc2V0LlVua25vd24oYXNzZXRTY2hlbWEpXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3RhZ2Uoe3N0eWxlfSkge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gU1RBR0VfRUxFTUVOVFxyXG4gICAgdGhpcy51dWlkID0gJ3N0YWdlJ1xyXG4gICAgZXh0ZW5kKHRoaXMuZWxlbWVudC5zdHlsZSwgc3R5bGUpXHJcbiAgfSxcclxuXHJcbiAgSW1hZ2Uoe3V1aWQsIHNyYywgc3R5bGV9KSB7XHJcbiAgICB0aGlzLnV1aWQgPSB1dWlkXHJcbiAgICB0aGlzLmVsZW1lbnQgPSBuZXcgSW1hZ2VcclxuICAgIHRoaXMuZWxlbWVudC5zcmMgPSBzcmNcclxuICAgIGV4dGVuZCh0aGlzLmVsZW1lbnQuc3R5bGUsIHN0eWxlKVxyXG4gIH0sXHJcblxyXG4gIFRleHQoe3V1aWQsIHRhZywgdGV4dCwgc3R5bGV9KSB7XHJcbiAgICB0aGlzLnV1aWQgPSB1dWlkXHJcbiAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZykgXHJcbiAgICB0aGlzLmVsZW1lbnQuaW5uZXJUZXh0ID0gdGV4dFxyXG4gICAgZXh0ZW5kKHRoaXMuZWxlbWVudC5zdHlsZSwgc3R5bGUpXHJcbiAgfSxcclxuXHJcbiAgQXVkaW8oe3V1aWQsIHNyY30pIHtcclxuICAgIHRoaXMudXVpZCA9IHV1aWRcclxuICAgIHRoaXMuc3JjID0gc3JjXHJcbiAgfSxcclxuXHJcbiAgVW5rbm93bihzY2hlbWEpIHtcclxuICAgIHRoaXMudXVpZCA9IHNjaGVtYS51dWlkXHJcbiAgICB0aGlzLnNjaGVtYSA9IHNjaGVtYSBcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IHByb2dyYW0gPSBuZXcgUHJvZ3JhbShwcm9ncmFtU2NoZW1hKVxyXG5cclxud2luZG93LnByb2dyYW0gPSBwcm9ncmFtXHJcbnNldEludGVydmFsKG1ha2VVcGRhdGUocHJvZ3JhbSksIFRJQ0tfUkFURSlcclxuIiwiLy8gICAgIHV1aWQuanNcbi8vXG4vLyAgICAgQ29weXJpZ2h0IChjKSAyMDEwLTIwMTIgUm9iZXJ0IEtpZWZmZXJcbi8vICAgICBNSVQgTGljZW5zZSAtIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblxuKGZ1bmN0aW9uKCkge1xuICB2YXIgX2dsb2JhbCA9IHRoaXM7XG5cbiAgLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gIFdlIGZlYXR1cmVcbiAgLy8gZGV0ZWN0IHRvIGRldGVybWluZSB0aGUgYmVzdCBSTkcgc291cmNlLCBub3JtYWxpemluZyB0byBhIGZ1bmN0aW9uIHRoYXRcbiAgLy8gcmV0dXJucyAxMjgtYml0cyBvZiByYW5kb21uZXNzLCBzaW5jZSB0aGF0J3Mgd2hhdCdzIHVzdWFsbHkgcmVxdWlyZWRcbiAgdmFyIF9ybmc7XG5cbiAgLy8gTm9kZS5qcyBjcnlwdG8tYmFzZWQgUk5HIC0gaHR0cDovL25vZGVqcy5vcmcvZG9jcy92MC42LjIvYXBpL2NyeXB0by5odG1sXG4gIC8vXG4gIC8vIE1vZGVyYXRlbHkgZmFzdCwgaGlnaCBxdWFsaXR5XG4gIGlmICh0eXBlb2YoX2dsb2JhbC5yZXF1aXJlKSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBfcmIgPSBfZ2xvYmFsLnJlcXVpcmUoJ2NyeXB0bycpLnJhbmRvbUJ5dGVzO1xuICAgICAgX3JuZyA9IF9yYiAmJiBmdW5jdGlvbigpIHtyZXR1cm4gX3JiKDE2KTt9O1xuICAgIH0gY2F0Y2goZSkge31cbiAgfVxuXG4gIGlmICghX3JuZyAmJiBfZ2xvYmFsLmNyeXB0byAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgLy8gV0hBVFdHIGNyeXB0by1iYXNlZCBSTkcgLSBodHRwOi8vd2lraS53aGF0d2cub3JnL3dpa2kvQ3J5cHRvXG4gICAgLy9cbiAgICAvLyBNb2RlcmF0ZWx5IGZhc3QsIGhpZ2ggcXVhbGl0eVxuICAgIHZhciBfcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7XG4gICAgX3JuZyA9IGZ1bmN0aW9uIHdoYXR3Z1JORygpIHtcbiAgICAgIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMoX3JuZHM4KTtcbiAgICAgIHJldHVybiBfcm5kczg7XG4gICAgfTtcbiAgfVxuXG4gIGlmICghX3JuZykge1xuICAgIC8vIE1hdGgucmFuZG9tKCktYmFzZWQgKFJORylcbiAgICAvL1xuICAgIC8vIElmIGFsbCBlbHNlIGZhaWxzLCB1c2UgTWF0aC5yYW5kb20oKS4gIEl0J3MgZmFzdCwgYnV0IGlzIG9mIHVuc3BlY2lmaWVkXG4gICAgLy8gcXVhbGl0eS5cbiAgICB2YXIgIF9ybmRzID0gbmV3IEFycmF5KDE2KTtcbiAgICBfcm5nID0gZnVuY3Rpb24oKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgcjsgaSA8IDE2OyBpKyspIHtcbiAgICAgICAgaWYgKChpICYgMHgwMykgPT09IDApIHIgPSBNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDA7XG4gICAgICAgIF9ybmRzW2ldID0gciA+Pj4gKChpICYgMHgwMykgPDwgMykgJiAweGZmO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3JuZHM7XG4gICAgfTtcbiAgfVxuXG4gIC8vIEJ1ZmZlciBjbGFzcyB0byB1c2VcbiAgdmFyIEJ1ZmZlckNsYXNzID0gdHlwZW9mKF9nbG9iYWwuQnVmZmVyKSA9PSAnZnVuY3Rpb24nID8gX2dsb2JhbC5CdWZmZXIgOiBBcnJheTtcblxuICAvLyBNYXBzIGZvciBudW1iZXIgPC0+IGhleCBzdHJpbmcgY29udmVyc2lvblxuICB2YXIgX2J5dGVUb0hleCA9IFtdO1xuICB2YXIgX2hleFRvQnl0ZSA9IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgaSsrKSB7XG4gICAgX2J5dGVUb0hleFtpXSA9IChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSk7XG4gICAgX2hleFRvQnl0ZVtfYnl0ZVRvSGV4W2ldXSA9IGk7XG4gIH1cblxuICAvLyAqKmBwYXJzZSgpYCAtIFBhcnNlIGEgVVVJRCBpbnRvIGl0J3MgY29tcG9uZW50IGJ5dGVzKipcbiAgZnVuY3Rpb24gcGFyc2UocywgYnVmLCBvZmZzZXQpIHtcbiAgICB2YXIgaSA9IChidWYgJiYgb2Zmc2V0KSB8fCAwLCBpaSA9IDA7XG5cbiAgICBidWYgPSBidWYgfHwgW107XG4gICAgcy50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1swLTlhLWZdezJ9L2csIGZ1bmN0aW9uKG9jdCkge1xuICAgICAgaWYgKGlpIDwgMTYpIHsgLy8gRG9uJ3Qgb3ZlcmZsb3chXG4gICAgICAgIGJ1ZltpICsgaWkrK10gPSBfaGV4VG9CeXRlW29jdF07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBaZXJvIG91dCByZW1haW5pbmcgYnl0ZXMgaWYgc3RyaW5nIHdhcyBzaG9ydFxuICAgIHdoaWxlIChpaSA8IDE2KSB7XG4gICAgICBidWZbaSArIGlpKytdID0gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgLy8gKipgdW5wYXJzZSgpYCAtIENvbnZlcnQgVVVJRCBieXRlIGFycmF5IChhbGEgcGFyc2UoKSkgaW50byBhIHN0cmluZyoqXG4gIGZ1bmN0aW9uIHVucGFyc2UoYnVmLCBvZmZzZXQpIHtcbiAgICB2YXIgaSA9IG9mZnNldCB8fCAwLCBidGggPSBfYnl0ZVRvSGV4O1xuICAgIHJldHVybiAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV07XG4gIH1cblxuICAvLyAqKmB2MSgpYCAtIEdlbmVyYXRlIHRpbWUtYmFzZWQgVVVJRCoqXG4gIC8vXG4gIC8vIEluc3BpcmVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9MaW9zSy9VVUlELmpzXG4gIC8vIGFuZCBodHRwOi8vZG9jcy5weXRob24ub3JnL2xpYnJhcnkvdXVpZC5odG1sXG5cbiAgLy8gcmFuZG9tICMncyB3ZSBuZWVkIHRvIGluaXQgbm9kZSBhbmQgY2xvY2tzZXFcbiAgdmFyIF9zZWVkQnl0ZXMgPSBfcm5nKCk7XG5cbiAgLy8gUGVyIDQuNSwgY3JlYXRlIGFuZCA0OC1iaXQgbm9kZSBpZCwgKDQ3IHJhbmRvbSBiaXRzICsgbXVsdGljYXN0IGJpdCA9IDEpXG4gIHZhciBfbm9kZUlkID0gW1xuICAgIF9zZWVkQnl0ZXNbMF0gfCAweDAxLFxuICAgIF9zZWVkQnl0ZXNbMV0sIF9zZWVkQnl0ZXNbMl0sIF9zZWVkQnl0ZXNbM10sIF9zZWVkQnl0ZXNbNF0sIF9zZWVkQnl0ZXNbNV1cbiAgXTtcblxuICAvLyBQZXIgNC4yLjIsIHJhbmRvbWl6ZSAoMTQgYml0KSBjbG9ja3NlcVxuICB2YXIgX2Nsb2Nrc2VxID0gKF9zZWVkQnl0ZXNbNl0gPDwgOCB8IF9zZWVkQnl0ZXNbN10pICYgMHgzZmZmO1xuXG4gIC8vIFByZXZpb3VzIHV1aWQgY3JlYXRpb24gdGltZVxuICB2YXIgX2xhc3RNU2VjcyA9IDAsIF9sYXN0TlNlY3MgPSAwO1xuXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYnJvb2ZhL25vZGUtdXVpZCBmb3IgQVBJIGRldGFpbHNcbiAgZnVuY3Rpb24gdjEob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcbiAgICB2YXIgYiA9IGJ1ZiB8fCBbXTtcblxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgdmFyIGNsb2Nrc2VxID0gb3B0aW9ucy5jbG9ja3NlcSAhPSBudWxsID8gb3B0aW9ucy5jbG9ja3NlcSA6IF9jbG9ja3NlcTtcblxuICAgIC8vIFVVSUQgdGltZXN0YW1wcyBhcmUgMTAwIG5hbm8tc2Vjb25kIHVuaXRzIHNpbmNlIHRoZSBHcmVnb3JpYW4gZXBvY2gsXG4gICAgLy8gKDE1ODItMTAtMTUgMDA6MDApLiAgSlNOdW1iZXJzIGFyZW4ndCBwcmVjaXNlIGVub3VnaCBmb3IgdGhpcywgc29cbiAgICAvLyB0aW1lIGlzIGhhbmRsZWQgaW50ZXJuYWxseSBhcyAnbXNlY3MnIChpbnRlZ2VyIG1pbGxpc2Vjb25kcykgYW5kICduc2VjcydcbiAgICAvLyAoMTAwLW5hbm9zZWNvbmRzIG9mZnNldCBmcm9tIG1zZWNzKSBzaW5jZSB1bml4IGVwb2NoLCAxOTcwLTAxLTAxIDAwOjAwLlxuICAgIHZhciBtc2VjcyA9IG9wdGlvbnMubXNlY3MgIT0gbnVsbCA/IG9wdGlvbnMubXNlY3MgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgIC8vIFBlciA0LjIuMS4yLCB1c2UgY291bnQgb2YgdXVpZCdzIGdlbmVyYXRlZCBkdXJpbmcgdGhlIGN1cnJlbnQgY2xvY2tcbiAgICAvLyBjeWNsZSB0byBzaW11bGF0ZSBoaWdoZXIgcmVzb2x1dGlvbiBjbG9ja1xuICAgIHZhciBuc2VjcyA9IG9wdGlvbnMubnNlY3MgIT0gbnVsbCA/IG9wdGlvbnMubnNlY3MgOiBfbGFzdE5TZWNzICsgMTtcblxuICAgIC8vIFRpbWUgc2luY2UgbGFzdCB1dWlkIGNyZWF0aW9uIChpbiBtc2VjcylcbiAgICB2YXIgZHQgPSAobXNlY3MgLSBfbGFzdE1TZWNzKSArIChuc2VjcyAtIF9sYXN0TlNlY3MpLzEwMDAwO1xuXG4gICAgLy8gUGVyIDQuMi4xLjIsIEJ1bXAgY2xvY2tzZXEgb24gY2xvY2sgcmVncmVzc2lvblxuICAgIGlmIChkdCA8IDAgJiYgb3B0aW9ucy5jbG9ja3NlcSA9PSBudWxsKSB7XG4gICAgICBjbG9ja3NlcSA9IGNsb2Nrc2VxICsgMSAmIDB4M2ZmZjtcbiAgICB9XG5cbiAgICAvLyBSZXNldCBuc2VjcyBpZiBjbG9jayByZWdyZXNzZXMgKG5ldyBjbG9ja3NlcSkgb3Igd2UndmUgbW92ZWQgb250byBhIG5ld1xuICAgIC8vIHRpbWUgaW50ZXJ2YWxcbiAgICBpZiAoKGR0IDwgMCB8fCBtc2VjcyA+IF9sYXN0TVNlY3MpICYmIG9wdGlvbnMubnNlY3MgPT0gbnVsbCkge1xuICAgICAgbnNlY3MgPSAwO1xuICAgIH1cblxuICAgIC8vIFBlciA0LjIuMS4yIFRocm93IGVycm9yIGlmIHRvbyBtYW55IHV1aWRzIGFyZSByZXF1ZXN0ZWRcbiAgICBpZiAobnNlY3MgPj0gMTAwMDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigndXVpZC52MSgpOiBDYW5cXCd0IGNyZWF0ZSBtb3JlIHRoYW4gMTBNIHV1aWRzL3NlYycpO1xuICAgIH1cblxuICAgIF9sYXN0TVNlY3MgPSBtc2VjcztcbiAgICBfbGFzdE5TZWNzID0gbnNlY3M7XG4gICAgX2Nsb2Nrc2VxID0gY2xvY2tzZXE7XG5cbiAgICAvLyBQZXIgNC4xLjQgLSBDb252ZXJ0IGZyb20gdW5peCBlcG9jaCB0byBHcmVnb3JpYW4gZXBvY2hcbiAgICBtc2VjcyArPSAxMjIxOTI5MjgwMDAwMDtcblxuICAgIC8vIGB0aW1lX2xvd2BcbiAgICB2YXIgdGwgPSAoKG1zZWNzICYgMHhmZmZmZmZmKSAqIDEwMDAwICsgbnNlY3MpICUgMHgxMDAwMDAwMDA7XG4gICAgYltpKytdID0gdGwgPj4+IDI0ICYgMHhmZjtcbiAgICBiW2krK10gPSB0bCA+Pj4gMTYgJiAweGZmO1xuICAgIGJbaSsrXSA9IHRsID4+PiA4ICYgMHhmZjtcbiAgICBiW2krK10gPSB0bCAmIDB4ZmY7XG5cbiAgICAvLyBgdGltZV9taWRgXG4gICAgdmFyIHRtaCA9IChtc2VjcyAvIDB4MTAwMDAwMDAwICogMTAwMDApICYgMHhmZmZmZmZmO1xuICAgIGJbaSsrXSA9IHRtaCA+Pj4gOCAmIDB4ZmY7XG4gICAgYltpKytdID0gdG1oICYgMHhmZjtcblxuICAgIC8vIGB0aW1lX2hpZ2hfYW5kX3ZlcnNpb25gXG4gICAgYltpKytdID0gdG1oID4+PiAyNCAmIDB4ZiB8IDB4MTA7IC8vIGluY2x1ZGUgdmVyc2lvblxuICAgIGJbaSsrXSA9IHRtaCA+Pj4gMTYgJiAweGZmO1xuXG4gICAgLy8gYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgIChQZXIgNC4yLjIgLSBpbmNsdWRlIHZhcmlhbnQpXG4gICAgYltpKytdID0gY2xvY2tzZXEgPj4+IDggfCAweDgwO1xuXG4gICAgLy8gYGNsb2NrX3NlcV9sb3dgXG4gICAgYltpKytdID0gY2xvY2tzZXEgJiAweGZmO1xuXG4gICAgLy8gYG5vZGVgXG4gICAgdmFyIG5vZGUgPSBvcHRpb25zLm5vZGUgfHwgX25vZGVJZDtcbiAgICBmb3IgKHZhciBuID0gMDsgbiA8IDY7IG4rKykge1xuICAgICAgYltpICsgbl0gPSBub2RlW25dO1xuICAgIH1cblxuICAgIHJldHVybiBidWYgPyBidWYgOiB1bnBhcnNlKGIpO1xuICB9XG5cbiAgLy8gKipgdjQoKWAgLSBHZW5lcmF0ZSByYW5kb20gVVVJRCoqXG5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9icm9vZmEvbm9kZS11dWlkIGZvciBBUEkgZGV0YWlsc1xuICBmdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICAgIC8vIERlcHJlY2F0ZWQgLSAnZm9ybWF0JyBhcmd1bWVudCwgYXMgc3VwcG9ydGVkIGluIHYxLjJcbiAgICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcblxuICAgIGlmICh0eXBlb2Yob3B0aW9ucykgPT0gJ3N0cmluZycpIHtcbiAgICAgIGJ1ZiA9IG9wdGlvbnMgPT0gJ2JpbmFyeScgPyBuZXcgQnVmZmVyQ2xhc3MoMTYpIDogbnVsbDtcbiAgICAgIG9wdGlvbnMgPSBudWxsO1xuICAgIH1cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIHZhciBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IF9ybmcpKCk7XG5cbiAgICAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG4gICAgcm5kc1s2XSA9IChybmRzWzZdICYgMHgwZikgfCAweDQwO1xuICAgIHJuZHNbOF0gPSAocm5kc1s4XSAmIDB4M2YpIHwgMHg4MDtcblxuICAgIC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuICAgIGlmIChidWYpIHtcbiAgICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCAxNjsgaWkrKykge1xuICAgICAgICBidWZbaSArIGlpXSA9IHJuZHNbaWldO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBidWYgfHwgdW5wYXJzZShybmRzKTtcbiAgfVxuXG4gIC8vIEV4cG9ydCBwdWJsaWMgQVBJXG4gIHZhciB1dWlkID0gdjQ7XG4gIHV1aWQudjEgPSB2MTtcbiAgdXVpZC52NCA9IHY0O1xuICB1dWlkLnBhcnNlID0gcGFyc2U7XG4gIHV1aWQudW5wYXJzZSA9IHVucGFyc2U7XG4gIHV1aWQuQnVmZmVyQ2xhc3MgPSBCdWZmZXJDbGFzcztcblxuICBpZiAodHlwZW9mKG1vZHVsZSkgIT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAvLyBQdWJsaXNoIGFzIG5vZGUuanMgbW9kdWxlXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB1dWlkO1xuICB9IGVsc2UgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAvLyBQdWJsaXNoIGFzIEFNRCBtb2R1bGVcbiAgICBkZWZpbmUoZnVuY3Rpb24oKSB7cmV0dXJuIHV1aWQ7fSk7XG4gXG5cbiAgfSBlbHNlIHtcbiAgICAvLyBQdWJsaXNoIGFzIGdsb2JhbCAoaW4gYnJvd3NlcnMpXG4gICAgdmFyIF9wcmV2aW91c1Jvb3QgPSBfZ2xvYmFsLnV1aWQ7XG5cbiAgICAvLyAqKmBub0NvbmZsaWN0KClgIC0gKGJyb3dzZXIgb25seSkgdG8gcmVzZXQgZ2xvYmFsICd1dWlkJyB2YXIqKlxuICAgIHV1aWQubm9Db25mbGljdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgX2dsb2JhbC51dWlkID0gX3ByZXZpb3VzUm9vdDtcbiAgICAgIHJldHVybiB1dWlkO1xuICAgIH07XG5cbiAgICBfZ2xvYmFsLnV1aWQgPSB1dWlkO1xuICB9XG59KS5jYWxsKHRoaXMpO1xuIiwiZXhwb3J0IGRlZmF1bHQge1xyXG4gIHV1aWQ6ICdwcm9ncmFtJyxcclxuICBuYW1lOiAnVGVzdCBwcm9ncmFtJyxcclxuICB2YXJpYWJsZVNjaGVtYXM6IFt7XHJcbiAgICBuYW1lOiAnYWdlJyxcclxuICAgIHR5cGU6IFwiTnVtYmVyXCIsXHJcbiAgICBtaW46IDAsXHJcbiAgICBtYXg6IDI1MCxcclxuICAgIHZhbHVlOiAyMFxyXG4gIH1dLFxyXG4gIHNlcXVlbmNlU2NoZW1hczogW3tcclxuICAgIG5hbWU6ICdtYWluJyxcclxuICAgIHV1aWQ6ICdhYmMnLFxyXG4gICAgY29ubmVjdGlvblNjaGVtYXM6IFt7XHJcbiAgICAgIGV4cHJlc3Npb246IFwidHJ1ZVwiLFxyXG4gICAgICBzZXF1ZW5jZVVVSUQ6IG51bGxcclxuICAgIH1dLFxyXG4gICAgYXNzZXRTY2hlbWFzOiBbe1xyXG4gICAgICB1dWlkOiAnc3RhZ2UnLFxyXG4gICAgICB0eXBlOiAnc3RhZ2UnLFxyXG4gICAgICBzdHlsZToge31cclxuICAgIH0sIHtcclxuICAgICAgdXVpZDogJzEyMycsXHJcbiAgICAgIHR5cGU6ICdpbWFnZScsXHJcbiAgICAgIHNyYzogJ2VtbWkucG5nJyxcclxuICAgICAgc3R5bGU6IHt9IFxyXG4gICAgfSwge1xyXG4gICAgICB1dWlkOiAnNDU2JyxcclxuICAgICAgdHlwZTogJ2F1ZGlvJyxcclxuICAgICAgc3JjOiBbJ3Rlc3QubXAzJ11cclxuICAgIH0sIHtcclxuICAgICAgdXVpZDogJzc4OScsXHJcbiAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgdGFnOiAncCcsXHJcbiAgICAgIHRleHQ6ICdDbGljayB0aGUgbG9nbyB0byBjb250aW51ZScsXHJcbiAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgZm9udDogJzMwcHggYXJpZWwsIHNhbnMtc2VyaWYnLFxyXG4gICAgICAgIGNvbG9yOiAnYmx1ZScgXHJcbiAgICAgIH0gXHJcbiAgICB9XSxcclxuXHJcbiAgICB0YXNrU2NoZW1hczogW3tcclxuICAgICAgdHlwZTogJ3BhcmFsbGVsJyxcclxuICAgICAgdGFza1NjaGVtYXM6IFt7XHJcbiAgICAgICAgdHlwZTogJ3NlcmlhbCcsXHJcbiAgICAgICAgdGFza1NjaGVtYXM6IFt7XHJcbiAgICAgICAgICB0eXBlOiAnaW5zZXJ0JywgXHJcbiAgICAgICAgICBwYXJlbnQ6ICdzdGFnZScsXHJcbiAgICAgICAgICBzdWJqZWN0OiAnMTIzJ1xyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWRlLWluJyxcclxuICAgICAgICAgIHN1YmplY3Q6ICcxMjMnXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgdHlwZTogJ2luc2VydCcsXHJcbiAgICAgICAgICBwYXJlbnQ6ICdzdGFnZScsXHJcbiAgICAgICAgICBzdWJqZWN0OiAnNzg5J1xyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWRlLWluJyxcclxuICAgICAgICAgIHN1YmplY3Q6ICc3ODknXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgdHlwZTogJ2lvJyxcclxuICAgICAgICAgIHN1YmplY3Q6ICc3ODknICAgXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgdHlwZTogJ3BhcmFsbGVsJyxcclxuICAgICAgICAgIHRhc2tTY2hlbWFzOiBbe1xyXG4gICAgICAgICAgICB0eXBlOiAnc2VyaWFsJyxcclxuICAgICAgICAgICAgdGFza1NjaGVtYXM6IFt7XHJcbiAgICAgICAgICAgICAgdHlwZTogJ2ZhZGUtb3V0JyxcclxuICAgICAgICAgICAgICBzdWJqZWN0OiAnMTIzJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgdHlwZTogJ3JlbW92ZScsXHJcbiAgICAgICAgICAgICAgcGFyZW50OiAnc3RhZ2UnLFxyXG4gICAgICAgICAgICAgIHN1YmplY3Q6ICcxMjMnXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdzZXJpYWwnLFxyXG4gICAgICAgICAgICB0YXNrU2NoZW1hczogW3tcclxuICAgICAgICAgICAgICB0eXBlOiAnZmFkZS1vdXQnLFxyXG4gICAgICAgICAgICAgIHN1YmplY3Q6ICc3ODknXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICB0eXBlOiAncmVtb3ZlJyxcclxuICAgICAgICAgICAgICBwYXJlbnQ6ICdzdGFnZScsXHJcbiAgICAgICAgICAgICAgc3ViamVjdDogJzc4OSdcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICAgIH1dICBcclxuICAgICAgICB9XSBcclxuICAgICAgfV0gICBcclxuICAgIH0sIHtcclxuICAgICAgdHlwZTogJ2F1ZGlvLXBsYXknLFxyXG4gICAgICBzdWJqZWN0OiAnNDU2J1xyXG4gICAgfV1cclxuICB9XVxyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBwcCAob2JqKSB7XHJcbiAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkob2JqLCBudWxsLCAyKSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGxvZyA9IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSlcclxuXHJcbi8vc2hhbGxvdyBjbG9uZSAtLSBub3QgaWRlYWwgYXMgbWlnaHQgdHJpZ2dlciBkaWN0aW9uYXJ5IG1vZGU/XHJcbmV4cG9ydCBmdW5jdGlvbiBjbG9uZSAob2JqKSB7XHJcbiAgbGV0IG91dCA9IHt9XHJcblxyXG4gIGZvciAobGV0IGtleSBpbiBvYmopIHtcclxuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkgb3V0W2tleV0gPSBvYmpba2V5XSBcclxuICB9IFxyXG4gIHJldHVybiBvdXRcclxufVxyXG5cclxuLy9tdXRhdGl2ZSFcclxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZCAob2JqLCBuZXh0KSB7XHJcbiAgZm9yIChsZXQga2V5IGluIG5leHQpIHtcclxuICAgIGlmIChuZXh0Lmhhc093blByb3BlcnR5KGtleSkpIG9ialtrZXldID0gbmV4dFtrZXldXHJcbiAgfSBcclxuICByZXR1cm4gb2JqXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kIChwcmVkRm4sIGFycmF5KSB7XHJcbiAgZm9yIChsZXQgaXRlbSBvZiBhcnJheSkge1xyXG4gICAgaWYgKHByZWRGbihpdGVtKSkgcmV0dXJuIGl0ZW1cclxuICB9XHJcbiAgcmV0dXJuIG51bGxcclxufVxyXG4iXX0=
