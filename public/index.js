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

//Asset should possibly have pointer to parent directly?
//parent would likely differ for each asset anyway...
function Insert(assets) {
  var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, asset;

  return regeneratorRuntime.wrap(function Insert$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 3;

        for (_iterator2 = assets[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          asset = _step2.value;

          asset.parent.element.appendChild(asset.element);
        }
        context$1$0.next = 11;
        break;

      case 7:
        context$1$0.prev = 7;
        context$1$0.t0 = context$1$0['catch'](3);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t0;

      case 11:
        context$1$0.prev = 11;
        context$1$0.prev = 12;

        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }

      case 14:
        context$1$0.prev = 14;

        if (!_didIteratorError2) {
          context$1$0.next = 17;
          break;
        }

        throw _iteratorError2;

      case 17:
        return context$1$0.finish(14);

      case 18:
        return context$1$0.finish(11);

      case 19:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[5], this, [[3, 7, 11, 19], [12,, 14, 18]]);
}

//Asset should possibly have pointer to parent directly?
//parent would likely differ for each asset anyway...
function Remove(assets) {
  var _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, asset;

  return regeneratorRuntime.wrap(function Remove$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _iteratorNormalCompletion3 = true;
        _didIteratorError3 = false;
        _iteratorError3 = undefined;
        context$1$0.prev = 3;

        for (_iterator3 = assets[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          asset = _step3.value;

          asset.parent.element.removeChild(asset.element);
        }
        context$1$0.next = 11;
        break;

      case 7:
        context$1$0.prev = 7;
        context$1$0.t0 = context$1$0['catch'](3);
        _didIteratorError3 = true;
        _iteratorError3 = context$1$0.t0;

      case 11:
        context$1$0.prev = 11;
        context$1$0.prev = 12;

        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
          _iterator3['return']();
        }

      case 14:
        context$1$0.prev = 14;

        if (!_didIteratorError3) {
          context$1$0.next = 17;
          break;
        }

        throw _iteratorError3;

      case 17:
        return context$1$0.finish(14);

      case 18:
        return context$1$0.finish(11);

      case 19:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[6], this, [[3, 7, 11, 19], [12,, 14, 18]]);
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
    this.tasks = Wait(24);
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
      console.log('Starting: ' + this.activeSequence.name);
    }
  }]);

  return Program;
})();

var Asset = {
  fromSchema: function fromSchema(assetSchema) {
    switch (assetSchema.type) {
      case 'stage':
        return new Asset.Stage(assetSchema);
      case 'container':
        return new Asset.Container(assetSchema);
      case 'image':
        return new Asset.Image(assetSchema);
      case 'text':
        return new Asset.Text(assetSchema);
      case 'audio':
        return new Asset.Audio(assetSchema);
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

  Container: function Container(_ref5) {
    var uuid = _ref5.uuid;
    var parentUUID = _ref5.parentUUID;
    var tag = _ref5.tag;
    var text = _ref5.text;
    var style = _ref5.style;

    this.uuid = uuid;
    this.parentUUID = parentUUID;
    this.element = document.createElement(tag);
    this.element.classList.add('asset');
    this.element.innerText = text;
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
  })(function (_ref6) {
    var uuid = _ref6.uuid;
    var parentUUID = _ref6.parentUUID;
    var src = _ref6.src;
    var style = _ref6.style;

    this.uuid = uuid;
    this.parentUUID = parentUUID;
    this.element = new Image();
    this.element.src = src;
    this.element.classList.add('asset');
    (0, _utils.extend)(this.element.style, style);
  }),

  Text: function Text(_ref7) {
    var uuid = _ref7.uuid;
    var parentUUID = _ref7.parentUUID;
    var tag = _ref7.tag;
    var text = _ref7.text;
    var style = _ref7.style;

    this.uuid = uuid;
    this.parentUUID = parentUUID;
    this.element = document.createElement(tag);
    this.element.innerText = text;
    this.element.classList.add('asset');
    (0, _utils.extend)(this.element.style, style);
  },

  Audio: function Audio(_ref8) {
    var uuid = _ref8.uuid;
    var src = _ref8.src;

    this.uuid = uuid;
    this.src = src;
  },

  Unknown: function Unknown(schema) {
    this.uuid = schema.uuid;
    this.schema = schema;
  }
};

var program = new Program(_programSchema2['default']);

program.startSequence('intro');
setInterval(makeUpdate(program), TICK_INTERVAL_MS);
toggle.addEventListener('click', function () {
  if (program.state === PROGRAM_STATE.PLAYING) program.state = PROGRAM_STATE.PAUSED;else if (program.state === PROGRAM_STATE.PAUSED) program.state = PROGRAM_STATE.PLAYING;else {}
});
window.onblur = function () {
  if (program.state === PROGRAM_STATE.PLAYING) program.state = PROGRAM_STATE.PAUSED;
};
window.program = program;

},{"./programSchema":3,"./utils":5,"node-uuid":2}],2:[function(require,module,exports){
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

var _schemas = require('./schemas');

var Stage = _schemas.AssetSchema.Stage;
var Image = _schemas.AssetSchema.Image;
var Container = _schemas.AssetSchema.Container;
var Text = _schemas.AssetSchema.Text;
var Audio = _schemas.AssetSchema.Audio;
var Integer = _schemas.VariableSchema.Integer;
var Always = _schemas.ConnectionSchema.Always;
var Expression = _schemas.ConnectionSchema.Expression;
var Parallel = _schemas.TaskSchema.Parallel;
var Serial = _schemas.TaskSchema.Serial;
var Wait = _schemas.TaskSchema.Wait;
var Insert = _schemas.TaskSchema.Insert;
var Remove = _schemas.TaskSchema.Remove;
var IO = _schemas.TaskSchema.IO;
var PlayAudio = _schemas.TaskSchema.PlayAudio;
exports['default'] = {
  //show initial screen,
  //play intro audio
  //play animation of three key points
  //display radio checkbox for dynamic, branching, interaction, done
  //wait for button click to set 'feature' variable
  //fade out scene
  uuid: 'program',
  name: 'Emmi Player 2.0',
  variableSchemas: [new Integer('feature', 0, 3, 0)],
  sequenceSchemas: [{
    name: 'intro',
    uuid: 'intro',
    connectionSchemas: [new Expression('$.feature === 0', 'dynamic'), new Expression('$.feature === 1', 'branching'), new Expression('$.feature === 2', 'interaction'), new Always('done')],
    assetSchemas: [new Stage({
      backgroundColor: 'black'
    }), new Image('1', 'stage', 'emmi.png', {}), new Text('2', 'stage', 'h1', 'Welcome to the demo!', {
      color: 'white'
    }), new Text('3', 'stage', 'h3', 'Press the button to begin', {
      color: 'gray'
    }), new Container('4', 'stage', 'button', 'BEGIN', {}),

    //TODO: add more audio files for actual audio
    new Audio('5', 'test.mp3'), new Container('6', 'stage', 'ul', '', {}), new Text('7', 'stage', 'h1', 'This demo showcases', {
      color: 'white'
    }), new Text('8', '6', 'li', 'Branching', {
      color: 'white',
      font: '16px sans-serif'
    }), new Text('9', '6', 'li', 'Dynamic Content', {
      color: 'white',
      font: '16px sans-serif'
    }), new Text('10', '6', 'li', 'User Interaction', {
      color: 'white',
      font: '16px sans-serif'
    })],
    taskSchemas: [new Serial('1', [
    //intro screen
    new Insert('2', ['1', '2', '3', '4']), new IO('3', '4'), new Remove('4', ['1', '2', '3', '4']),

    //three key points
    new Insert('5', ['6', '7']), new PlayAudio('6', 'test.mp3'), //three features..
    new Parallel('7', [new PlayAudio('8', 'test.mp3'), //dynamic content
    new Insert('9', ['8'])]), new Parallel('10', [new PlayAudio('11', 'test.mp3'), //dynamic content
    new Insert('12', ['8'])]), new Parallel('13', [new PlayAudio('14', 'test.mp3'), //dynamic content
    new Insert('15', ['8'])])])]
  }, {
    name: 'dynamic',
    uuid: 'dynamic',
    connectionSchemas: [new Always('done')],
    assetSchemas: [],
    taskSchemas: []
  }, {
    name: 'branching',
    uuid: 'branching',
    connectionSchemas: [new Always('done')],
    assetSchemas: [],
    taskSchemas: []
  }, {
    name: 'interaction',
    uuid: 'interaction',
    connectionSchemas: [new Always('done')],
    assetSchemas: [],
    taskSchemas: []
  }, {
    name: 'done',
    uuid: 'done',
    connectionSchemas: [new Always(null)],
    assetSchemas: [],
    taskSchemas: []
  }]
};
module.exports = exports['default'];

},{"./schemas":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _utils = require('./utils');

var AssetSchema = {
  Stage: function Stage(style) {
    this.uuid = 'stage';
    this.type = 'stage';
    this.style = style;
  },

  Image: function Image(uuid, parentUUID, src, style) {
    this.uuid = uuid;
    this.parentUUID = parentUUID;
    this.type = 'image';
    this.src = src;
    this.style = style;
  },

  Container: function Container(uuid, parentUUID, tag, text, style) {
    this.uuid = uuid;
    this.parentUUID = parentUUID;
    this.type = 'container';
    this.tag = tag;
    this.text = text;
    this.style = style;
  },

  Text: function Text(uuid, parentUUID, tag, text, style) {
    this.uuid = uuid;
    this.parentUUID = parentUUID;
    this.type = 'text';
    this.text = text;
    this.style = style;
  },

  Audio: function Audio(uuid, src) {
    this.uuid = uuid;
    this.type = 'audio';
    this.src = src;
  }
};

exports.AssetSchema = AssetSchema;
var VariableSchema = {
  Integer: function Integer(name, min, max, value) {
    this.name = name;
    this.type = 'Number';
    this.min = min;
    this.max = max;
    this.value = value;
  }
};

exports.VariableSchema = VariableSchema;
var ConnectionSchema = {
  Always: function Always(sequenceUUID) {
    this.expression = 'true';
    this.sequenceUUID = sequenceUUID;
  },

  Expression: function Expression(expression, sequenceUUID) {
    this.expression = expression;
    this.sequenceUUID = sequenceUUID;
  }
};

exports.ConnectionSchema = ConnectionSchema;
var TaskSchema = {
  Parallel: function Parallel(uuid, taskSchemas) {
    this.uuid = uuid;
    this.taskSchemas = taskSchemas;
  },

  Serial: function Serial(uuid, taskSchemas) {
    this.uuid = uuid;
    this.taskSchemas = taskSchemas;
  },

  Wait: function Wait(uuid, duration) {
    this.uuid = uuid;
    this.duration = duration;
  },

  Insert: function Insert(uuid, assetUUIDs) {
    this.uuid = uuid;
    this.assetUUIDs = assetUUIDs;
  },

  Remove: function Remove(uuid, assetUUIDs) {
    this.uuid = uuid;
    this.assetUUIDs = assetUUIDs;
  },

  IO: function IO(uuid, assetUUID) {
    this.uuid = uuid;
    this.assetUUID;
  },

  PlayAudio: function PlayAudio(uuid, src) {
    this.uuid = uuid;
    this.src = src;
  }
};
exports.TaskSchema = TaskSchema;

},{"./utils":5}],5:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9zdGV2ZW5rYW5lL3Rhc2stcmVuZGVyZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbm9kZS11dWlkL3V1aWQuanMiLCIvVXNlcnMvc3RldmVua2FuZS90YXNrLXJlbmRlcmVyL3Byb2dyYW1TY2hlbWEuanMiLCIvVXNlcnMvc3RldmVua2FuZS90YXNrLXJlbmRlcmVyL3NjaGVtYXMuanMiLCIvVXNlcnMvc3RldmVua2FuZS90YXNrLXJlbmRlcmVyL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O2lCQ3VDVyxRQUFRLEVBWVIsTUFBTSxFQVFOLElBQUksRUFVSixNQUFNLEVBa0JOLE9BQU8sRUFtQlAsTUFBTSxFQVFOLE1BQU0sRUFNTixFQUFFLEVBUUYsU0FBUzs7Ozt3QkFoSUssV0FBVzs7cUJBQ2tDLFNBQVM7OzZCQUNyRCxpQkFBaUI7Ozs7QUFFM0MsSUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFBO0FBQ2QsSUFBTSxnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFBOztBQUVuQyxJQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQ3RELElBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUE7O0FBRXZELElBQU0sYUFBYSxHQUFHO0FBQ3BCLFNBQU8sRUFBRSxDQUFDO0FBQ1YsT0FBSyxFQUFFLENBQUM7QUFDUixTQUFPLEVBQUUsQ0FBQztBQUNWLFFBQU0sRUFBRSxDQUFDO0FBQ1QsTUFBSSxFQUFFLENBQUM7Q0FDUixDQUFBOztBQUVELFNBQVMsVUFBVSxDQUFFLE9BQU8sRUFBRTtBQUM1QixNQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7QUFD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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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SUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0dBQ25EO0FBQ0QsU0FBTyxHQUFHLENBQUE7Q0FDWDs7QUFFTSxTQUFTLElBQUksQ0FBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOzs7Ozs7QUFDbkMseUJBQWlCLEtBQUssOEhBQUU7VUFBZixJQUFJOztBQUNYLFVBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sSUFBSSxDQUFBO0tBQzlCOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0QsU0FBTyxJQUFJLENBQUE7Q0FDWjs7QUFFTSxTQUFTLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRTs7Ozs7O0FBQ3pDLDBCQUFpQixLQUFLLG1JQUFFO1VBQWYsSUFBSTs7QUFDWCxVQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLEVBQUUsT0FBTyxJQUFJLENBQUE7S0FDbkM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDRCxTQUFPLElBQUksQ0FBQTtDQUNaOztBQUVNLFNBQVMsY0FBYyxDQUFFLE9BQU8sRUFBRTtBQUN2QyxTQUFPLE9BQU8sQ0FBQyxVQUFVLEVBQUU7QUFDekIsV0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7R0FDeEM7Q0FDRiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQge3Y0IGFzIHV1aWR9IGZyb20gJ25vZGUtdXVpZCdcbmltcG9ydCB7cHAsIGxvZywgY2xvbmUsIGV4dGVuZCwgZmluZCwgZmluZFdoZXJlLCByZW1vdmVDaGlsZHJlbn0gZnJvbSAnLi91dGlscydcbmltcG9ydCBwcm9ncmFtU2NoZW1hIGZyb20gJy4vcHJvZ3JhbVNjaGVtYSdcblxuY29uc3QgRlBTID0gMjRcbmNvbnN0IFRJQ0tfSU5URVJWQUxfTVMgPSAxMDAwIC8gRlBTXG5cbmNvbnN0IFNUQUdFX0VMRU1FTlQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhZ2UnKVxuY29uc3QgVE9HR0xFX0JVVFRPTiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2dnbGUnKVxuXG5jb25zdCBQUk9HUkFNX1NUQVRFID0ge1xuICBMT0FESU5HOiAwLFxuICBSRUFEWTogMSxcbiAgUExBWUlORzogMixcbiAgUEFVU0VEOiAzLFxuICBET05FOiA0XG59XG5cbmZ1bmN0aW9uIG1ha2VVcGRhdGUgKHByb2dyYW0pIHtcbiAgbGV0IGxhc3RUaW1lID0gRGF0ZS5ub3coKVxuICBsZXQgdGhpc1RpbWUgPSBsYXN0VGltZVxuICBsZXQgZFQgPSAwXG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBsYXN0VGltZSA9IHRoaXNUaW1lXG4gICAgdGhpc1RpbWUgPSBEYXRlLm5vdygpXG4gICAgZFQgPSB0aGlzVGltZSAtIGxhc3RUaW1lXG5cbiAgICAvL1RPRE86IGNoZWNrIHRoYXQgZFQgaXMgaW4gdmFsaWQgcmFuZ2UgZm9yIFwibm9ybWFsIHRpY2tcIlxuICAgIGlmIChwcm9ncmFtLmFjdGl2ZVNlcXVlbmNlKSB7XG4gICAgICBpZiAocHJvZ3JhbS5hY3RpdmVTZXF1ZW5jZS50YXNrcy5uZXh0KHByb2dyYW0uc3RhdGUpLmRvbmUpIHtcbiAgICAgICAgbGV0IHRhcmdldFNlcXVlbmNlID0gcHJvZ3JhbS5hY3RpdmVTZXF1ZW5jZS5maW5kTmV4dChwcm9ncmFtLnZhcmlhYmxlcylcbiAgICAgICAgaWYgKHRhcmdldFNlcXVlbmNlKSBwcm9ncmFtLnN0YXJ0U2VxdWVuY2UodGFyZ2V0U2VxdWVuY2UpIFxuICAgICAgICBlbHNlICAgICAgICAgICAgICAgIHByb2dyYW0uc3RhdGUgPSBQUk9HUkFNX1NUQVRFLkRPTkVcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gKiBQYXJhbGxlbCAodGFza3MpIHtcbiAgd2hpbGUgKHRhc2tzLmxlbmd0aCkge1xuICAgIGxldCBzdGF0ZSA9IHlpZWxkXG5cbiAgICBmb3IgKGxldCB0YXNrIG9mIHRhc2tzKSB7XG4gICAgICBpZiAodGFzay5uZXh0KHN0YXRlKS5kb25lKSB7XG4gICAgICAgIHRhc2tzLnNwbGljZSh0YXNrcy5pbmRleE9mKHRhc2spLCAxKVxuICAgICAgfVxuICAgIH0gXG4gIH1cbn1cblxuZnVuY3Rpb24gKiBTZXJpYWwgKHRhc2tzKSB7XG4gIHdoaWxlICh0YXNrcy5sZW5ndGgpIHtcbiAgICBsZXQgc3RhdGUgPSB5aWVsZFxuXG4gICAgaWYgKHRhc2tzWzBdLm5leHQoc3RhdGUpLmRvbmUpIHRhc2tzLnNoaWZ0KClcbiAgfVxufVxuXG5mdW5jdGlvbiAqIFdhaXQgKGR1cmF0aW9uKSB7XG4gIGxldCBlbGFwc2VkID0gMCBcblxuICB3aGlsZSAoZWxhcHNlZCA8IGR1cmF0aW9uKSB7XG4gICAgbGV0IHN0YXRlID0geWllbGRcblxuICAgIGlmIChzdGF0ZSA9PT0gUFJPR1JBTV9TVEFURS5QTEFZSU5HKSBlbGFwc2VkKytcbiAgfVxufVxuXG5mdW5jdGlvbiAqIEZhZGVJbiAoZG9tQXNzZXQpIHtcbiAgbGV0IGVsYXBzZWQgPSAwXG4gIGxldCBkdXJhdGlvbiA9IDEyXG4gIGxldCBjbGFzc0FkZGVkID0gZmFsc2VcblxuICB3aGlsZSAoZWxhcHNlZCA8IGR1cmF0aW9uKSB7XG4gICAgbGV0IHN0YXRlID0geWllbGRcblxuICAgIGlmIChzdGF0ZSA9PT0gUFJPR1JBTV9TVEFURS5QTEFZSU5HKSB7XG4gICAgICBpZiAoIWNsYXNzQWRkZWQpIHtcbiAgICAgICAgZG9tQXNzZXQuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgICAgICBjbGFzc0FkZGVkID0gdHJ1ZVxuICAgICAgfVxuICAgICAgZWxhcHNlZCsrXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uICogRmFkZU91dCAoZG9tQXNzZXQpIHtcbiAgbGV0IHJlbWFpbmluZyA9IDEyXG4gIGxldCBjbGFzc1JlbW92ZWQgPSBmYWxzZVxuXG4gIHdoaWxlIChyZW1haW5pbmcgPiAwKSB7XG4gICAgbGV0IHN0YXRlID0geWllbGRcblxuICAgIGlmIChzdGF0ZSA9PT0gUFJPR1JBTV9TVEFURS5QTEFZSU5HKSB7XG4gICAgICBpZiAoIWNsYXNzUmVtb3ZlZCkge1xuICAgICAgICBkb21Bc3NldC5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgICAgIGNsYXNzUmVtb3ZlZCA9IHRydWVcbiAgICAgIH1cbiAgICAgIHJlbWFpbmluZy0tXG4gICAgfVxuICB9XG59XG5cbi8vQXNzZXQgc2hvdWxkIHBvc3NpYmx5IGhhdmUgcG9pbnRlciB0byBwYXJlbnQgZGlyZWN0bHk/XG4vL3BhcmVudCB3b3VsZCBsaWtlbHkgZGlmZmVyIGZvciBlYWNoIGFzc2V0IGFueXdheS4uLlxuZnVuY3Rpb24gKiBJbnNlcnQgKGFzc2V0cykge1xuICBmb3IgKGxldCBhc3NldCBvZiBhc3NldHMpIHtcbiAgICBhc3NldC5wYXJlbnQuZWxlbWVudC5hcHBlbmRDaGlsZChhc3NldC5lbGVtZW50KVxuICB9XG59XG5cbi8vQXNzZXQgc2hvdWxkIHBvc3NpYmx5IGhhdmUgcG9pbnRlciB0byBwYXJlbnQgZGlyZWN0bHk/XG4vL3BhcmVudCB3b3VsZCBsaWtlbHkgZGlmZmVyIGZvciBlYWNoIGFzc2V0IGFueXdheS4uLlxuZnVuY3Rpb24gKiBSZW1vdmUgKGFzc2V0cykge1xuICBmb3IgKGxldCBhc3NldCBvZiBhc3NldHMpIHtcbiAgICBhc3NldC5wYXJlbnQuZWxlbWVudC5yZW1vdmVDaGlsZChhc3NldC5lbGVtZW50KVxuICB9XG59XG5cbmZ1bmN0aW9uICogSU8gKGRvbUFzc2V0KSB7XG4gIGxldCBkb25lID0gZmFsc2UgIFxuICBsZXQgbGlzdGVuZXIgPSBkb21Bc3NldC5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gZG9uZSA9IHRydWUpXG5cbiAgd2hpbGUgKCFkb25lKSB5aWVsZFxuICBkb21Bc3NldC5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIobGlzdGVuZXIpXG59XG5cbmZ1bmN0aW9uICogUGxheUF1ZGlvIChhdWRpb0Fzc2V0KSB7XG4gIGxldCBkb25lID0gZmFsc2VcbiAgbGV0IHNvdW5kID0gbmV3IEhvd2woe1xuICAgIHNyYzogYXVkaW9Bc3NldC5zcmMsXG4gICAgb25lbmQ6ICgpID0+IGRvbmUgPSB0cnVlXG4gIH0pXG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBpZiAoZG9uZSkgYnJlYWtcbiAgICBpZiAoc3RhdGUgPT09IFBST0dSQU1fU1RBVEUuUEFVU0VEICYmIHNvdW5kLnBsYXlpbmcoKSkgICBzb3VuZC5wYXVzZSgpXG4gICAgaWYgKHN0YXRlID09PSBQUk9HUkFNX1NUQVRFLlBMQVlJTkcgJiYgIXNvdW5kLnBsYXlpbmcoKSkgc291bmQucGxheSgpXG5cbiAgICBsZXQgc3RhdGUgPSB5aWVsZFxuICB9XG59XG5cbmNsYXNzIENvbm5lY3Rpb24ge1xuICBjb25zdHJ1Y3Rvcih7ZXhwcmVzc2lvbiwgc2VxdWVuY2VVVUlEfSkge1xuICAgIHRoaXMuZXhwcmVzc2lvbiA9IG5ldyBGdW5jdGlvbignJCcsIGByZXR1cm4gJHtleHByZXNzaW9ufWApIFxuICAgIHRoaXMuc2VxdWVuY2VVVUlEID0gc2VxdWVuY2VVVUlEXG4gIH1cbn1cblxuY2xhc3MgU2VxdWVuY2Uge1xuICBjb25zdHJ1Y3Rvcih7dXVpZCwgbmFtZSwgYXNzZXRTY2hlbWFzLCB0YXNrU2NoZW1hcywgY29ubmVjdGlvblNjaGVtYXN9KSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZVxuICAgIHRoaXMudXVpZCA9IHV1aWRcbiAgICB0aGlzLmFzc2V0cyA9IGFzc2V0U2NoZW1hcy5tYXAoQXNzZXQuZnJvbVNjaGVtYSlcbiAgICB0aGlzLnRhc2tzID0gV2FpdCgyNClcbiAgICB0aGlzLmNvbm5lY3Rpb25zID0gY29ubmVjdGlvblNjaGVtYXMubWFwKHMgPT4gbmV3IENvbm5lY3Rpb24ocykpXG4gIH1cblxuICBmaW5kTmV4dCh2YXJpYWJsZXMpIHtcbiAgICBsZXQgY29ubmVjdGlvbiA9IGZpbmQoKHtleHByZXNzaW9ufSkgPT4gZXhwcmVzc2lvbih2YXJpYWJsZXMpLCB0aGlzLmNvbm5lY3Rpb25zKVxuXG4gICAgcmV0dXJuIGNvbm5lY3Rpb24gPyBjb25uZWN0aW9uLnNlcXVlbmNlVVVJRCA6IG51bGxcbiAgfVxufVxuXG5jbGFzcyBQcm9ncmFtIHtcbiAgY29uc3RydWN0b3IocHJvZ3JhbVNjaGVtYSkge1xuICAgIHRoaXMubmFtZSA9IHByb2dyYW1TY2hlbWEubmFtZVxuICAgIHRoaXMudXVpZCA9IHByb2dyYW1TY2hlbWEudXVpZFxuICAgIHRoaXMuc3RhdGUgPSBQUk9HUkFNX1NUQVRFLlJFQURZXG4gICAgdGhpcy5hY3RpdmVTZXF1ZW5jZSA9IG51bGxcbiAgICB0aGlzLnNjaGVtYSA9IHByb2dyYW1TY2hlbWFcbiAgICB0aGlzLnZhcmlhYmxlcyA9IHRoaXMuc2NoZW1hLnZhcmlhYmxlU2NoZW1hcy5yZWR1Y2UoKG1hcCwgdmFyaWFibGVTY2hlbWEpID0+IHtcbiAgICAgIG1hcFt2YXJpYWJsZVNjaGVtYS5uYW1lXSA9IHZhcmlhYmxlU2NoZW1hLnZhbHVlXG4gICAgICByZXR1cm4gbWFwXG4gICAgfSwge30pXG4gIH1cblxuICBzdGFydFNlcXVlbmNlKHV1aWQpIHtcbiAgICBjb25zdCBzZXF1ZW5jZVNjaGVtYSA9IGZpbmRXaGVyZSgndXVpZCcsIHV1aWQsIHRoaXMuc2NoZW1hLnNlcXVlbmNlU2NoZW1hcylcblxuICAgIGlmICghc2VxdWVuY2VTY2hlbWEpIHRocm93IG5ldyBFcnJvcihgTm8gc2NoZW1hIG5hbWVkICR7bmFtZX0gd2FzIGZvdW5kYClcblxuICAgIHRoaXMuYWN0aXZlU2VxdWVuY2UgPSBuZXcgU2VxdWVuY2Uoc2VxdWVuY2VTY2hlbWEpXG4gICAgdGhpcy5zdGF0ZSA9IFBST0dSQU1fU1RBVEUuUExBWUlOR1xuICAgIHJlbW92ZUNoaWxkcmVuKFNUQUdFX0VMRU1FTlQpXG4gICAgY29uc29sZS5sb2coYFN0YXJ0aW5nOiAke3RoaXMuYWN0aXZlU2VxdWVuY2UubmFtZX1gKVxuICB9XG59XG5cbi8vVE9ETzogcmVhbGx5IG5vdCBhIGZhbiBvZiB0aGUgXCJhc3NldFwiIGNsYXNzIGZvciBvcGFjaXR5LiAgQ29uc2lkZXIgZGl0Y2hpbmcgQ1NTLi4uXG5jb25zdCBBc3NldCA9IHtcbiAgZnJvbVNjaGVtYShhc3NldFNjaGVtYSkge1xuICAgIHN3aXRjaCAoYXNzZXRTY2hlbWEudHlwZSkge1xuICAgICAgY2FzZSAnc3RhZ2UnOiAgICAgcmV0dXJuIG5ldyBBc3NldC5TdGFnZShhc3NldFNjaGVtYSlcbiAgICAgIGNhc2UgJ2NvbnRhaW5lcic6IHJldHVybiBuZXcgQXNzZXQuQ29udGFpbmVyKGFzc2V0U2NoZW1hKVxuICAgICAgY2FzZSAnaW1hZ2UnOiAgICAgcmV0dXJuIG5ldyBBc3NldC5JbWFnZShhc3NldFNjaGVtYSlcbiAgICAgIGNhc2UgJ3RleHQnOiAgICAgIHJldHVybiBuZXcgQXNzZXQuVGV4dChhc3NldFNjaGVtYSlcbiAgICAgIGNhc2UgJ2F1ZGlvJzogICAgIHJldHVybiBuZXcgQXNzZXQuQXVkaW8oYXNzZXRTY2hlbWEpXG4gICAgICBkZWZhdWx0OiAgICAgICAgICByZXR1cm4gbmV3IEFzc2V0LlVua25vd24oYXNzZXRTY2hlbWEpXG4gICAgfVxuICB9LFxuXG4gIFN0YWdlKHtzdHlsZX0pIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBTVEFHRV9FTEVNRU5UXG4gICAgdGhpcy51dWlkID0gJ3N0YWdlJ1xuICAgIGV4dGVuZCh0aGlzLmVsZW1lbnQuc3R5bGUsIHN0eWxlKVxuICB9LFxuXG4gIENvbnRhaW5lcih7dXVpZCwgcGFyZW50VVVJRCwgdGFnLCB0ZXh0LCBzdHlsZX0pIHtcbiAgICB0aGlzLnV1aWQgPSB1dWlkXG4gICAgdGhpcy5wYXJlbnRVVUlEID0gcGFyZW50VVVJRCBcbiAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZylcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYXNzZXQnKVxuICAgIHRoaXMuZWxlbWVudC5pbm5lclRleHQgPSB0ZXh0XG4gICAgZXh0ZW5kKHRoaXMuZWxlbWVudC5zdHlsZSwgc3R5bGUpXG4gIH0sXG5cbiAgSW1hZ2Uoe3V1aWQsIHBhcmVudFVVSUQsIHNyYywgc3R5bGV9KSB7XG4gICAgdGhpcy51dWlkID0gdXVpZFxuICAgIHRoaXMucGFyZW50VVVJRCA9IHBhcmVudFVVSURcbiAgICB0aGlzLmVsZW1lbnQgPSBuZXcgSW1hZ2VcbiAgICB0aGlzLmVsZW1lbnQuc3JjID0gc3JjXG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Fzc2V0JylcbiAgICBleHRlbmQodGhpcy5lbGVtZW50LnN0eWxlLCBzdHlsZSlcbiAgfSxcblxuICBUZXh0KHt1dWlkLCBwYXJlbnRVVUlELCB0YWcsIHRleHQsIHN0eWxlfSkge1xuICAgIHRoaXMudXVpZCA9IHV1aWRcbiAgICB0aGlzLnBhcmVudFVVSUQgPSBwYXJlbnRVVUlEXG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpIFxuICAgIHRoaXMuZWxlbWVudC5pbm5lclRleHQgPSB0ZXh0XG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Fzc2V0JylcbiAgICBleHRlbmQodGhpcy5lbGVtZW50LnN0eWxlLCBzdHlsZSlcbiAgfSxcblxuICBBdWRpbyh7dXVpZCwgc3JjfSkge1xuICAgIHRoaXMudXVpZCA9IHV1aWRcbiAgICB0aGlzLnNyYyA9IHNyY1xuICB9LFxuXG4gIFVua25vd24oc2NoZW1hKSB7XG4gICAgdGhpcy51dWlkID0gc2NoZW1hLnV1aWRcbiAgICB0aGlzLnNjaGVtYSA9IHNjaGVtYSBcbiAgfVxufVxuXG5jb25zdCBwcm9ncmFtID0gbmV3IFByb2dyYW0ocHJvZ3JhbVNjaGVtYSlcblxucHJvZ3JhbS5zdGFydFNlcXVlbmNlKCdpbnRybycpXG5zZXRJbnRlcnZhbChtYWtlVXBkYXRlKHByb2dyYW0pLCBUSUNLX0lOVEVSVkFMX01TKVxudG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICBpZiAgICAgIChwcm9ncmFtLnN0YXRlID09PSBQUk9HUkFNX1NUQVRFLlBMQVlJTkcpIHByb2dyYW0uc3RhdGUgPSBQUk9HUkFNX1NUQVRFLlBBVVNFRFxuICBlbHNlIGlmIChwcm9ncmFtLnN0YXRlID09PSBQUk9HUkFNX1NUQVRFLlBBVVNFRCkgIHByb2dyYW0uc3RhdGUgPSBQUk9HUkFNX1NUQVRFLlBMQVlJTkdcbiAgZWxzZSAgICB7fVxufSlcbndpbmRvdy5vbmJsdXIgPSBmdW5jdGlvbiAoKSB7XG4gIGlmIChwcm9ncmFtLnN0YXRlID09PSBQUk9HUkFNX1NUQVRFLlBMQVlJTkcpIHByb2dyYW0uc3RhdGUgPSBQUk9HUkFNX1NUQVRFLlBBVVNFRFxufVxud2luZG93LnByb2dyYW0gPSBwcm9ncmFtXG4iLCIvLyAgICAgdXVpZC5qc1xuLy9cbi8vICAgICBDb3B5cmlnaHQgKGMpIDIwMTAtMjAxMiBSb2JlcnQgS2llZmZlclxuLy8gICAgIE1JVCBMaWNlbnNlIC0gaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXG4oZnVuY3Rpb24oKSB7XG4gIHZhciBfZ2xvYmFsID0gdGhpcztcblxuICAvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiAgV2UgZmVhdHVyZVxuICAvLyBkZXRlY3QgdG8gZGV0ZXJtaW5lIHRoZSBiZXN0IFJORyBzb3VyY2UsIG5vcm1hbGl6aW5nIHRvIGEgZnVuY3Rpb24gdGhhdFxuICAvLyByZXR1cm5zIDEyOC1iaXRzIG9mIHJhbmRvbW5lc3MsIHNpbmNlIHRoYXQncyB3aGF0J3MgdXN1YWxseSByZXF1aXJlZFxuICB2YXIgX3JuZztcblxuICAvLyBOb2RlLmpzIGNyeXB0by1iYXNlZCBSTkcgLSBodHRwOi8vbm9kZWpzLm9yZy9kb2NzL3YwLjYuMi9hcGkvY3J5cHRvLmh0bWxcbiAgLy9cbiAgLy8gTW9kZXJhdGVseSBmYXN0LCBoaWdoIHF1YWxpdHlcbiAgaWYgKHR5cGVvZihfZ2xvYmFsLnJlcXVpcmUpID09ICdmdW5jdGlvbicpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIF9yYiA9IF9nbG9iYWwucmVxdWlyZSgnY3J5cHRvJykucmFuZG9tQnl0ZXM7XG4gICAgICBfcm5nID0gX3JiICYmIGZ1bmN0aW9uKCkge3JldHVybiBfcmIoMTYpO307XG4gICAgfSBjYXRjaChlKSB7fVxuICB9XG5cbiAgaWYgKCFfcm5nICYmIF9nbG9iYWwuY3J5cHRvICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAvLyBXSEFUV0cgY3J5cHRvLWJhc2VkIFJORyAtIGh0dHA6Ly93aWtpLndoYXR3Zy5vcmcvd2lraS9DcnlwdG9cbiAgICAvL1xuICAgIC8vIE1vZGVyYXRlbHkgZmFzdCwgaGlnaCBxdWFsaXR5XG4gICAgdmFyIF9ybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbiAgICBfcm5nID0gZnVuY3Rpb24gd2hhdHdnUk5HKCkge1xuICAgICAgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhfcm5kczgpO1xuICAgICAgcmV0dXJuIF9ybmRzODtcbiAgICB9O1xuICB9XG5cbiAgaWYgKCFfcm5nKSB7XG4gICAgLy8gTWF0aC5yYW5kb20oKS1iYXNlZCAoUk5HKVxuICAgIC8vXG4gICAgLy8gSWYgYWxsIGVsc2UgZmFpbHMsIHVzZSBNYXRoLnJhbmRvbSgpLiAgSXQncyBmYXN0LCBidXQgaXMgb2YgdW5zcGVjaWZpZWRcbiAgICAvLyBxdWFsaXR5LlxuICAgIHZhciAgX3JuZHMgPSBuZXcgQXJyYXkoMTYpO1xuICAgIF9ybmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCByOyBpIDwgMTY7IGkrKykge1xuICAgICAgICBpZiAoKGkgJiAweDAzKSA9PT0gMCkgciA9IE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDAwMDtcbiAgICAgICAgX3JuZHNbaV0gPSByID4+PiAoKGkgJiAweDAzKSA8PCAzKSAmIDB4ZmY7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfcm5kcztcbiAgICB9O1xuICB9XG5cbiAgLy8gQnVmZmVyIGNsYXNzIHRvIHVzZVxuICB2YXIgQnVmZmVyQ2xhc3MgPSB0eXBlb2YoX2dsb2JhbC5CdWZmZXIpID09ICdmdW5jdGlvbicgPyBfZ2xvYmFsLkJ1ZmZlciA6IEFycmF5O1xuXG4gIC8vIE1hcHMgZm9yIG51bWJlciA8LT4gaGV4IHN0cmluZyBjb252ZXJzaW9uXG4gIHZhciBfYnl0ZVRvSGV4ID0gW107XG4gIHZhciBfaGV4VG9CeXRlID0ge307XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgICBfYnl0ZVRvSGV4W2ldID0gKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnN1YnN0cigxKTtcbiAgICBfaGV4VG9CeXRlW19ieXRlVG9IZXhbaV1dID0gaTtcbiAgfVxuXG4gIC8vICoqYHBhcnNlKClgIC0gUGFyc2UgYSBVVUlEIGludG8gaXQncyBjb21wb25lbnQgYnl0ZXMqKlxuICBmdW5jdGlvbiBwYXJzZShzLCBidWYsIG9mZnNldCkge1xuICAgIHZhciBpID0gKGJ1ZiAmJiBvZmZzZXQpIHx8IDAsIGlpID0gMDtcblxuICAgIGJ1ZiA9IGJ1ZiB8fCBbXTtcbiAgICBzLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvWzAtOWEtZl17Mn0vZywgZnVuY3Rpb24ob2N0KSB7XG4gICAgICBpZiAoaWkgPCAxNikgeyAvLyBEb24ndCBvdmVyZmxvdyFcbiAgICAgICAgYnVmW2kgKyBpaSsrXSA9IF9oZXhUb0J5dGVbb2N0XTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFplcm8gb3V0IHJlbWFpbmluZyBieXRlcyBpZiBzdHJpbmcgd2FzIHNob3J0XG4gICAgd2hpbGUgKGlpIDwgMTYpIHtcbiAgICAgIGJ1ZltpICsgaWkrK10gPSAwO1xuICAgIH1cblxuICAgIHJldHVybiBidWY7XG4gIH1cblxuICAvLyAqKmB1bnBhcnNlKClgIC0gQ29udmVydCBVVUlEIGJ5dGUgYXJyYXkgKGFsYSBwYXJzZSgpKSBpbnRvIGEgc3RyaW5nKipcbiAgZnVuY3Rpb24gdW5wYXJzZShidWYsIG9mZnNldCkge1xuICAgIHZhciBpID0gb2Zmc2V0IHx8IDAsIGJ0aCA9IF9ieXRlVG9IZXg7XG4gICAgcmV0dXJuICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXTtcbiAgfVxuXG4gIC8vICoqYHYxKClgIC0gR2VuZXJhdGUgdGltZS1iYXNlZCBVVUlEKipcbiAgLy9cbiAgLy8gSW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL0xpb3NLL1VVSUQuanNcbiAgLy8gYW5kIGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS91dWlkLmh0bWxcblxuICAvLyByYW5kb20gIydzIHdlIG5lZWQgdG8gaW5pdCBub2RlIGFuZCBjbG9ja3NlcVxuICB2YXIgX3NlZWRCeXRlcyA9IF9ybmcoKTtcblxuICAvLyBQZXIgNC41LCBjcmVhdGUgYW5kIDQ4LWJpdCBub2RlIGlkLCAoNDcgcmFuZG9tIGJpdHMgKyBtdWx0aWNhc3QgYml0ID0gMSlcbiAgdmFyIF9ub2RlSWQgPSBbXG4gICAgX3NlZWRCeXRlc1swXSB8IDB4MDEsXG4gICAgX3NlZWRCeXRlc1sxXSwgX3NlZWRCeXRlc1syXSwgX3NlZWRCeXRlc1szXSwgX3NlZWRCeXRlc1s0XSwgX3NlZWRCeXRlc1s1XVxuICBdO1xuXG4gIC8vIFBlciA0LjIuMiwgcmFuZG9taXplICgxNCBiaXQpIGNsb2Nrc2VxXG4gIHZhciBfY2xvY2tzZXEgPSAoX3NlZWRCeXRlc1s2XSA8PCA4IHwgX3NlZWRCeXRlc1s3XSkgJiAweDNmZmY7XG5cbiAgLy8gUHJldmlvdXMgdXVpZCBjcmVhdGlvbiB0aW1lXG4gIHZhciBfbGFzdE1TZWNzID0gMCwgX2xhc3ROU2VjcyA9IDA7XG5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9icm9vZmEvbm9kZS11dWlkIGZvciBBUEkgZGV0YWlsc1xuICBmdW5jdGlvbiB2MShvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICAgIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuICAgIHZhciBiID0gYnVmIHx8IFtdO1xuXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICB2YXIgY2xvY2tzZXEgPSBvcHRpb25zLmNsb2Nrc2VxICE9IG51bGwgPyBvcHRpb25zLmNsb2Nrc2VxIDogX2Nsb2Nrc2VxO1xuXG4gICAgLy8gVVVJRCB0aW1lc3RhbXBzIGFyZSAxMDAgbmFuby1zZWNvbmQgdW5pdHMgc2luY2UgdGhlIEdyZWdvcmlhbiBlcG9jaCxcbiAgICAvLyAoMTU4Mi0xMC0xNSAwMDowMCkuICBKU051bWJlcnMgYXJlbid0IHByZWNpc2UgZW5vdWdoIGZvciB0aGlzLCBzb1xuICAgIC8vIHRpbWUgaXMgaGFuZGxlZCBpbnRlcm5hbGx5IGFzICdtc2VjcycgKGludGVnZXIgbWlsbGlzZWNvbmRzKSBhbmQgJ25zZWNzJ1xuICAgIC8vICgxMDAtbmFub3NlY29uZHMgb2Zmc2V0IGZyb20gbXNlY3MpIHNpbmNlIHVuaXggZXBvY2gsIDE5NzAtMDEtMDEgMDA6MDAuXG4gICAgdmFyIG1zZWNzID0gb3B0aW9ucy5tc2VjcyAhPSBudWxsID8gb3B0aW9ucy5tc2VjcyA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgLy8gUGVyIDQuMi4xLjIsIHVzZSBjb3VudCBvZiB1dWlkJ3MgZ2VuZXJhdGVkIGR1cmluZyB0aGUgY3VycmVudCBjbG9ja1xuICAgIC8vIGN5Y2xlIHRvIHNpbXVsYXRlIGhpZ2hlciByZXNvbHV0aW9uIGNsb2NrXG4gICAgdmFyIG5zZWNzID0gb3B0aW9ucy5uc2VjcyAhPSBudWxsID8gb3B0aW9ucy5uc2VjcyA6IF9sYXN0TlNlY3MgKyAxO1xuXG4gICAgLy8gVGltZSBzaW5jZSBsYXN0IHV1aWQgY3JlYXRpb24gKGluIG1zZWNzKVxuICAgIHZhciBkdCA9IChtc2VjcyAtIF9sYXN0TVNlY3MpICsgKG5zZWNzIC0gX2xhc3ROU2VjcykvMTAwMDA7XG5cbiAgICAvLyBQZXIgNC4yLjEuMiwgQnVtcCBjbG9ja3NlcSBvbiBjbG9jayByZWdyZXNzaW9uXG4gICAgaWYgKGR0IDwgMCAmJiBvcHRpb25zLmNsb2Nrc2VxID09IG51bGwpIHtcbiAgICAgIGNsb2Nrc2VxID0gY2xvY2tzZXEgKyAxICYgMHgzZmZmO1xuICAgIH1cblxuICAgIC8vIFJlc2V0IG5zZWNzIGlmIGNsb2NrIHJlZ3Jlc3NlcyAobmV3IGNsb2Nrc2VxKSBvciB3ZSd2ZSBtb3ZlZCBvbnRvIGEgbmV3XG4gICAgLy8gdGltZSBpbnRlcnZhbFxuICAgIGlmICgoZHQgPCAwIHx8IG1zZWNzID4gX2xhc3RNU2VjcykgJiYgb3B0aW9ucy5uc2VjcyA9PSBudWxsKSB7XG4gICAgICBuc2VjcyA9IDA7XG4gICAgfVxuXG4gICAgLy8gUGVyIDQuMi4xLjIgVGhyb3cgZXJyb3IgaWYgdG9vIG1hbnkgdXVpZHMgYXJlIHJlcXVlc3RlZFxuICAgIGlmIChuc2VjcyA+PSAxMDAwMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCd1dWlkLnYxKCk6IENhblxcJ3QgY3JlYXRlIG1vcmUgdGhhbiAxME0gdXVpZHMvc2VjJyk7XG4gICAgfVxuXG4gICAgX2xhc3RNU2VjcyA9IG1zZWNzO1xuICAgIF9sYXN0TlNlY3MgPSBuc2VjcztcbiAgICBfY2xvY2tzZXEgPSBjbG9ja3NlcTtcblxuICAgIC8vIFBlciA0LjEuNCAtIENvbnZlcnQgZnJvbSB1bml4IGVwb2NoIHRvIEdyZWdvcmlhbiBlcG9jaFxuICAgIG1zZWNzICs9IDEyMjE5MjkyODAwMDAwO1xuXG4gICAgLy8gYHRpbWVfbG93YFxuICAgIHZhciB0bCA9ICgobXNlY3MgJiAweGZmZmZmZmYpICogMTAwMDAgKyBuc2VjcykgJSAweDEwMDAwMDAwMDtcbiAgICBiW2krK10gPSB0bCA+Pj4gMjQgJiAweGZmO1xuICAgIGJbaSsrXSA9IHRsID4+PiAxNiAmIDB4ZmY7XG4gICAgYltpKytdID0gdGwgPj4+IDggJiAweGZmO1xuICAgIGJbaSsrXSA9IHRsICYgMHhmZjtcblxuICAgIC8vIGB0aW1lX21pZGBcbiAgICB2YXIgdG1oID0gKG1zZWNzIC8gMHgxMDAwMDAwMDAgKiAxMDAwMCkgJiAweGZmZmZmZmY7XG4gICAgYltpKytdID0gdG1oID4+PiA4ICYgMHhmZjtcbiAgICBiW2krK10gPSB0bWggJiAweGZmO1xuXG4gICAgLy8gYHRpbWVfaGlnaF9hbmRfdmVyc2lvbmBcbiAgICBiW2krK10gPSB0bWggPj4+IDI0ICYgMHhmIHwgMHgxMDsgLy8gaW5jbHVkZSB2ZXJzaW9uXG4gICAgYltpKytdID0gdG1oID4+PiAxNiAmIDB4ZmY7XG5cbiAgICAvLyBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGAgKFBlciA0LjIuMiAtIGluY2x1ZGUgdmFyaWFudClcbiAgICBiW2krK10gPSBjbG9ja3NlcSA+Pj4gOCB8IDB4ODA7XG5cbiAgICAvLyBgY2xvY2tfc2VxX2xvd2BcbiAgICBiW2krK10gPSBjbG9ja3NlcSAmIDB4ZmY7XG5cbiAgICAvLyBgbm9kZWBcbiAgICB2YXIgbm9kZSA9IG9wdGlvbnMubm9kZSB8fCBfbm9kZUlkO1xuICAgIGZvciAodmFyIG4gPSAwOyBuIDwgNjsgbisrKSB7XG4gICAgICBiW2kgKyBuXSA9IG5vZGVbbl07XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZiA/IGJ1ZiA6IHVucGFyc2UoYik7XG4gIH1cblxuICAvLyAqKmB2NCgpYCAtIEdlbmVyYXRlIHJhbmRvbSBVVUlEKipcblxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2Jyb29mYS9ub2RlLXV1aWQgZm9yIEFQSSBkZXRhaWxzXG4gIGZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gICAgLy8gRGVwcmVjYXRlZCAtICdmb3JtYXQnIGFyZ3VtZW50LCBhcyBzdXBwb3J0ZWQgaW4gdjEuMlxuICAgIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuXG4gICAgaWYgKHR5cGVvZihvcHRpb25zKSA9PSAnc3RyaW5nJykge1xuICAgICAgYnVmID0gb3B0aW9ucyA9PSAnYmluYXJ5JyA/IG5ldyBCdWZmZXJDbGFzcygxNikgOiBudWxsO1xuICAgICAgb3B0aW9ucyA9IG51bGw7XG4gICAgfVxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgX3JuZykoKTtcblxuICAgIC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcbiAgICBybmRzWzZdID0gKHJuZHNbNl0gJiAweDBmKSB8IDB4NDA7XG4gICAgcm5kc1s4XSA9IChybmRzWzhdICYgMHgzZikgfCAweDgwO1xuXG4gICAgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG4gICAgaWYgKGJ1Zikge1xuICAgICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IDE2OyBpaSsrKSB7XG4gICAgICAgIGJ1ZltpICsgaWldID0gcm5kc1tpaV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZiB8fCB1bnBhcnNlKHJuZHMpO1xuICB9XG5cbiAgLy8gRXhwb3J0IHB1YmxpYyBBUElcbiAgdmFyIHV1aWQgPSB2NDtcbiAgdXVpZC52MSA9IHYxO1xuICB1dWlkLnY0ID0gdjQ7XG4gIHV1aWQucGFyc2UgPSBwYXJzZTtcbiAgdXVpZC51bnBhcnNlID0gdW5wYXJzZTtcbiAgdXVpZC5CdWZmZXJDbGFzcyA9IEJ1ZmZlckNsYXNzO1xuXG4gIGlmICh0eXBlb2YobW9kdWxlKSAhPSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIC8vIFB1Ymxpc2ggYXMgbm9kZS5qcyBtb2R1bGVcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHV1aWQ7XG4gIH0gZWxzZSAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIC8vIFB1Ymxpc2ggYXMgQU1EIG1vZHVsZVxuICAgIGRlZmluZShmdW5jdGlvbigpIHtyZXR1cm4gdXVpZDt9KTtcbiBcblxuICB9IGVsc2Uge1xuICAgIC8vIFB1Ymxpc2ggYXMgZ2xvYmFsIChpbiBicm93c2VycylcbiAgICB2YXIgX3ByZXZpb3VzUm9vdCA9IF9nbG9iYWwudXVpZDtcblxuICAgIC8vICoqYG5vQ29uZmxpY3QoKWAgLSAoYnJvd3NlciBvbmx5KSB0byByZXNldCBnbG9iYWwgJ3V1aWQnIHZhcioqXG4gICAgdXVpZC5ub0NvbmZsaWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICBfZ2xvYmFsLnV1aWQgPSBfcHJldmlvdXNSb290O1xuICAgICAgcmV0dXJuIHV1aWQ7XG4gICAgfTtcblxuICAgIF9nbG9iYWwudXVpZCA9IHV1aWQ7XG4gIH1cbn0pLmNhbGwodGhpcyk7XG4iLCJpbXBvcnQge0Fzc2V0U2NoZW1hLCBWYXJpYWJsZVNjaGVtYSwgQ29ubmVjdGlvblNjaGVtYSwgVGFza1NjaGVtYX0gZnJvbSAnLi9zY2hlbWFzJ1xuXG5jb25zdCB7U3RhZ2UsIEltYWdlLCBDb250YWluZXIsIFRleHQsIEF1ZGlvfSA9IEFzc2V0U2NoZW1hXG5jb25zdCB7SW50ZWdlcn0gPSBWYXJpYWJsZVNjaGVtYVxuY29uc3Qge0Fsd2F5cywgRXhwcmVzc2lvbn0gPSBDb25uZWN0aW9uU2NoZW1hXG5jb25zdCB7UGFyYWxsZWwsIFNlcmlhbCwgV2FpdCwgSW5zZXJ0LCBSZW1vdmUsIElPLCBQbGF5QXVkaW99ID0gVGFza1NjaGVtYVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIC8vc2hvdyBpbml0aWFsIHNjcmVlbiwgXG4gIC8vcGxheSBpbnRybyBhdWRpb1xuICAvL3BsYXkgYW5pbWF0aW9uIG9mIHRocmVlIGtleSBwb2ludHNcbiAgLy9kaXNwbGF5IHJhZGlvIGNoZWNrYm94IGZvciBkeW5hbWljLCBicmFuY2hpbmcsIGludGVyYWN0aW9uLCBkb25lXG4gIC8vd2FpdCBmb3IgYnV0dG9uIGNsaWNrIHRvIHNldCAnZmVhdHVyZScgdmFyaWFibGVcbiAgLy9mYWRlIG91dCBzY2VuZVxuICB1dWlkOiAncHJvZ3JhbScsXG4gIG5hbWU6ICdFbW1pIFBsYXllciAyLjAnLFxuICB2YXJpYWJsZVNjaGVtYXM6IFtcbiAgICBuZXcgSW50ZWdlcignZmVhdHVyZScsIDAsIDMsIDApXG4gIF0sXG4gIHNlcXVlbmNlU2NoZW1hczogW3tcbiAgICBuYW1lOiAnaW50cm8nLFxuICAgIHV1aWQ6ICdpbnRybycsXG4gICAgY29ubmVjdGlvblNjaGVtYXM6IFtcbiAgICAgIG5ldyBFeHByZXNzaW9uKCckLmZlYXR1cmUgPT09IDAnLCAnZHluYW1pYycpLFxuICAgICAgbmV3IEV4cHJlc3Npb24oJyQuZmVhdHVyZSA9PT0gMScsICdicmFuY2hpbmcnKSxcbiAgICAgIG5ldyBFeHByZXNzaW9uKCckLmZlYXR1cmUgPT09IDInLCAnaW50ZXJhY3Rpb24nKSxcbiAgICAgIG5ldyBBbHdheXMoJ2RvbmUnKVxuICAgIF0sXG4gICAgYXNzZXRTY2hlbWFzOiBbXG4gICAgICBuZXcgU3RhZ2Uoe1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdibGFjaycsXG4gICAgICB9KSxcbiAgICAgIG5ldyBJbWFnZSgnMScsICdzdGFnZScsICdlbW1pLnBuZycsIHt9KSxcbiAgICAgIG5ldyBUZXh0KCcyJywgJ3N0YWdlJywgJ2gxJywgJ1dlbGNvbWUgdG8gdGhlIGRlbW8hJywge1xuICAgICAgICBjb2xvcjogJ3doaXRlJyBcbiAgICAgIH0pLFxuICAgICAgbmV3IFRleHQoJzMnLCAnc3RhZ2UnLCAnaDMnLCAnUHJlc3MgdGhlIGJ1dHRvbiB0byBiZWdpbicsIHtcbiAgICAgICAgY29sb3I6ICdncmF5JyBcbiAgICAgIH0pLFxuICAgICAgbmV3IENvbnRhaW5lcignNCcsICdzdGFnZScsICdidXR0b24nLCAnQkVHSU4nLCB7fSksXG5cbiAgICAgIC8vVE9ETzogYWRkIG1vcmUgYXVkaW8gZmlsZXMgZm9yIGFjdHVhbCBhdWRpb1xuICAgICAgbmV3IEF1ZGlvKCc1JywgJ3Rlc3QubXAzJyksXG4gICAgICBuZXcgQ29udGFpbmVyKCc2JywgJ3N0YWdlJywgJ3VsJywgJycsIHt9KSxcbiAgICAgIG5ldyBUZXh0KCc3JywgJ3N0YWdlJywgJ2gxJywgJ1RoaXMgZGVtbyBzaG93Y2FzZXMnLCB7XG4gICAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgfSksXG4gICAgICBuZXcgVGV4dCgnOCcsICc2JywgJ2xpJywgJ0JyYW5jaGluZycsIHtcbiAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgIGZvbnQ6ICcxNnB4IHNhbnMtc2VyaWYnLCBcbiAgICAgIH0pLFxuICAgICAgbmV3IFRleHQoJzknLCAnNicsICdsaScsICdEeW5hbWljIENvbnRlbnQnLCB7XG4gICAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgICBmb250OiAnMTZweCBzYW5zLXNlcmlmJywgXG4gICAgICB9KSxcbiAgICAgIG5ldyBUZXh0KCcxMCcsICc2JywgJ2xpJywgJ1VzZXIgSW50ZXJhY3Rpb24nLCB7XG4gICAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgICBmb250OiAnMTZweCBzYW5zLXNlcmlmJywgXG4gICAgICB9KSxcbiAgICBdLFxuICAgIHRhc2tTY2hlbWFzOiBbXG4gICAgICBuZXcgU2VyaWFsKCcxJywgW1xuICAgICAgICAvL2ludHJvIHNjcmVlblxuICAgICAgICBuZXcgSW5zZXJ0KCcyJywgWycxJywgJzInLCAnMycsICc0J10pLFxuICAgICAgICBuZXcgSU8oJzMnLCAnNCcpLFxuICAgICAgICBuZXcgUmVtb3ZlKCc0JywgWycxJywgJzInLCAnMycsICc0J10pLFxuXG4gICAgICAgIC8vdGhyZWUga2V5IHBvaW50c1xuICAgICAgICBuZXcgSW5zZXJ0KCc1JywgWyc2JywgJzcnXSksXG4gICAgICAgIG5ldyBQbGF5QXVkaW8oJzYnLCAndGVzdC5tcDMnKSwgLy90aHJlZSBmZWF0dXJlcy4uXG4gICAgICAgIG5ldyBQYXJhbGxlbCgnNycsIFtcbiAgICAgICAgICBuZXcgUGxheUF1ZGlvKCc4JywgJ3Rlc3QubXAzJyksIC8vZHluYW1pYyBjb250ZW50IFxuICAgICAgICAgIG5ldyBJbnNlcnQoJzknLCBbJzgnXSksXG4gICAgICAgIF0pLFxuICAgICAgICBuZXcgUGFyYWxsZWwoJzEwJywgW1xuICAgICAgICAgIG5ldyBQbGF5QXVkaW8oJzExJywgJ3Rlc3QubXAzJyksIC8vZHluYW1pYyBjb250ZW50IFxuICAgICAgICAgIG5ldyBJbnNlcnQoJzEyJywgWyc4J10pLFxuICAgICAgICBdKSxcbiAgICAgICAgbmV3IFBhcmFsbGVsKCcxMycsIFtcbiAgICAgICAgICBuZXcgUGxheUF1ZGlvKCcxNCcsICd0ZXN0Lm1wMycpLCAvL2R5bmFtaWMgY29udGVudCBcbiAgICAgICAgICBuZXcgSW5zZXJ0KCcxNScsIFsnOCddKSxcbiAgICAgICAgXSksXG4gICAgICBdKVxuICAgIF1cbiAgfSwge1xuICAgIG5hbWU6ICdkeW5hbWljJyxcbiAgICB1dWlkOiAnZHluYW1pYycsXG4gICAgY29ubmVjdGlvblNjaGVtYXM6IFtcbiAgICAgIG5ldyBBbHdheXMoJ2RvbmUnKVxuICAgIF0sXG4gICAgYXNzZXRTY2hlbWFzOiBbXSxcbiAgICB0YXNrU2NoZW1hczogW10sXG4gIH0sIHtcbiAgICBuYW1lOiAnYnJhbmNoaW5nJyxcbiAgICB1dWlkOiAnYnJhbmNoaW5nJyxcbiAgICBjb25uZWN0aW9uU2NoZW1hczogW1xuICAgICAgbmV3IEFsd2F5cygnZG9uZScpXG4gICAgXSxcbiAgICBhc3NldFNjaGVtYXM6IFtdLFxuICAgIHRhc2tTY2hlbWFzOiBbXSxcbiAgfSwge1xuICAgIG5hbWU6ICdpbnRlcmFjdGlvbicsXG4gICAgdXVpZDogJ2ludGVyYWN0aW9uJyxcbiAgICBjb25uZWN0aW9uU2NoZW1hczogW1xuICAgICAgbmV3IEFsd2F5cygnZG9uZScpXG4gICAgXSxcbiAgICBhc3NldFNjaGVtYXM6IFtdLFxuICAgIHRhc2tTY2hlbWFzOiBbXSxcbiAgfSwge1xuICAgIG5hbWU6ICdkb25lJyxcbiAgICB1dWlkOiAnZG9uZScsXG4gICAgY29ubmVjdGlvblNjaGVtYXM6IFtcbiAgICAgIG5ldyBBbHdheXMobnVsbClcbiAgICBdLFxuICAgIGFzc2V0U2NoZW1hczogW10sXG4gICAgdGFza1NjaGVtYXM6IFtdLFxuICB9XVxufVxuIiwiaW1wb3J0IHtleHRlbmR9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCBjb25zdCBBc3NldFNjaGVtYSA9IHtcbiAgU3RhZ2Uoc3R5bGUpIHtcbiAgICB0aGlzLnV1aWQgPSAnc3RhZ2UnXG4gICAgdGhpcy50eXBlID0gJ3N0YWdlJ1xuICAgIHRoaXMuc3R5bGUgPSBzdHlsZVxuICB9LFxuXG4gIEltYWdlKHV1aWQsIHBhcmVudFVVSUQsIHNyYywgc3R5bGUpIHtcbiAgICB0aGlzLnV1aWQgPSB1dWlkXG4gICAgdGhpcy5wYXJlbnRVVUlEID0gcGFyZW50VVVJRCBcbiAgICB0aGlzLnR5cGUgPSAnaW1hZ2UnXG4gICAgdGhpcy5zcmMgPSBzcmNcbiAgICB0aGlzLnN0eWxlID0gc3R5bGVcbiAgfSxcblxuICBDb250YWluZXIodXVpZCwgcGFyZW50VVVJRCwgdGFnLCB0ZXh0LCBzdHlsZSkge1xuICAgIHRoaXMudXVpZCA9IHV1aWRcbiAgICB0aGlzLnBhcmVudFVVSUQgPSBwYXJlbnRVVUlEIFxuICAgIHRoaXMudHlwZSA9ICdjb250YWluZXInXG4gICAgdGhpcy50YWcgPSB0YWdcbiAgICB0aGlzLnRleHQgPSB0ZXh0XG4gICAgdGhpcy5zdHlsZSA9IHN0eWxlXG4gIH0sXG5cbiAgVGV4dCh1dWlkLCBwYXJlbnRVVUlELCB0YWcsIHRleHQsIHN0eWxlKSB7XG4gICAgdGhpcy51dWlkID0gdXVpZFxuICAgIHRoaXMucGFyZW50VVVJRCA9IHBhcmVudFVVSUQgIFxuICAgIHRoaXMudHlwZSA9ICd0ZXh0J1xuICAgIHRoaXMudGV4dCA9IHRleHRcbiAgICB0aGlzLnN0eWxlID0gc3R5bGVcbiAgfSxcblxuICBBdWRpbyh1dWlkLCBzcmMpIHtcbiAgICB0aGlzLnV1aWQgPSB1dWlkXG4gICAgdGhpcy50eXBlID0gJ2F1ZGlvJ1xuICAgIHRoaXMuc3JjID0gc3JjIFxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBWYXJpYWJsZVNjaGVtYSA9IHtcbiAgSW50ZWdlcihuYW1lLCBtaW4sIG1heCwgdmFsdWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lXG4gICAgdGhpcy50eXBlID0gJ051bWJlcicgXG4gICAgdGhpcy5taW4gPSBtaW5cbiAgICB0aGlzLm1heCA9IG1heFxuICAgIHRoaXMudmFsdWUgPSB2YWx1ZVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBDb25uZWN0aW9uU2NoZW1hID0ge1xuICBBbHdheXMoc2VxdWVuY2VVVUlEKSB7XG4gICAgdGhpcy5leHByZXNzaW9uID0gJ3RydWUnXG4gICAgdGhpcy5zZXF1ZW5jZVVVSUQgPSBzZXF1ZW5jZVVVSURcbiAgfSxcblxuICBFeHByZXNzaW9uKGV4cHJlc3Npb24sIHNlcXVlbmNlVVVJRCkge1xuICAgIHRoaXMuZXhwcmVzc2lvbiA9IGV4cHJlc3Npb24gXG4gICAgdGhpcy5zZXF1ZW5jZVVVSUQgPSBzZXF1ZW5jZVVVSURcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgVGFza1NjaGVtYSA9IHtcbiAgUGFyYWxsZWwodXVpZCwgdGFza1NjaGVtYXMpIHtcbiAgICB0aGlzLnV1aWQgPSB1dWlkIFxuICAgIHRoaXMudGFza1NjaGVtYXMgPSB0YXNrU2NoZW1hc1xuICB9LFxuXG4gIFNlcmlhbCh1dWlkLCB0YXNrU2NoZW1hcykge1xuICAgIHRoaXMudXVpZCA9IHV1aWRcbiAgICB0aGlzLnRhc2tTY2hlbWFzID0gdGFza1NjaGVtYXNcbiAgfSxcblxuICBXYWl0KHV1aWQsIGR1cmF0aW9uKSB7XG4gICAgdGhpcy51dWlkID0gdXVpZFxuICAgIHRoaXMuZHVyYXRpb24gPSBkdXJhdGlvbiBcbiAgfSxcblxuICBJbnNlcnQodXVpZCwgYXNzZXRVVUlEcykge1xuICAgIHRoaXMudXVpZCA9IHV1aWRcbiAgICB0aGlzLmFzc2V0VVVJRHMgPSBhc3NldFVVSURzXG4gIH0sXG5cbiAgUmVtb3ZlKHV1aWQsIGFzc2V0VVVJRHMpIHtcbiAgICB0aGlzLnV1aWQgPSB1dWlkXG4gICAgdGhpcy5hc3NldFVVSURzID0gYXNzZXRVVUlEcyBcbiAgfSxcblxuICBJTyh1dWlkLCBhc3NldFVVSUQpIHtcbiAgICB0aGlzLnV1aWQgPSB1dWlkXG4gICAgdGhpcy5hc3NldFVVSUQgXG4gIH0sXG5cbiAgUGxheUF1ZGlvKHV1aWQsIHNyYykge1xuICAgIHRoaXMudXVpZCA9IHV1aWRcbiAgICB0aGlzLnNyYyA9IHNyYyBcbiAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIHBwIChvYmopIHtcbiAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkob2JqLCBudWxsLCAyKSlcbn1cblxuZXhwb3J0IGNvbnN0IGxvZyA9IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSlcblxuLy9zaGFsbG93IGNsb25lIC0tIG5vdCBpZGVhbCBhcyBtaWdodCB0cmlnZ2VyIGRpY3Rpb25hcnkgbW9kZT9cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZSAob2JqKSB7XG4gIGxldCBvdXQgPSB7fVxuXG4gIGZvciAobGV0IGtleSBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIG91dFtrZXldID0gb2JqW2tleV0gXG4gIH0gXG4gIHJldHVybiBvdXRcbn1cblxuLy9tdXRhdGl2ZSFcbmV4cG9ydCBmdW5jdGlvbiBleHRlbmQgKG9iaiwgbmV4dCkge1xuICBmb3IgKGxldCBrZXkgaW4gbmV4dCkge1xuICAgIGlmIChuZXh0Lmhhc093blByb3BlcnR5KGtleSkpIG9ialtrZXldID0gbmV4dFtrZXldXG4gIH0gXG4gIHJldHVybiBvYmpcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmQgKHByZWRGbiwgYXJyYXkpIHtcbiAgZm9yIChsZXQgaXRlbSBvZiBhcnJheSkge1xuICAgIGlmIChwcmVkRm4oaXRlbSkpIHJldHVybiBpdGVtXG4gIH1cbiAgcmV0dXJuIG51bGxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRXaGVyZShrZXksIHZhbCwgYXJyYXkpIHtcbiAgZm9yIChsZXQgaXRlbSBvZiBhcnJheSkge1xuICAgIGlmIChpdGVtW2tleV0gPT09IHZhbCkgcmV0dXJuIGl0ZW0gXG4gIH1cbiAgcmV0dXJuIG51bGxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUNoaWxkcmVuIChlbGVtZW50KSB7XG4gIHdoaWxlIChlbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICBlbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQuZmlyc3RDaGlsZCkgXG4gIH1cbn1cbiJdfQ==
