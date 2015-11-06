(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = AudioSystem;
function Channel(context, name) {
  var channel = context.createGain();

  function connectPanner(src, panner, chan) {
    src.connect(panner);
    panner.connect(chan);
  }

  function basePlay() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var shouldLoop = options.loop || false;

    return function (buffer, panner) {
      var src = channel.context.createBufferSource();

      if (panner) connectPanner(src, panner, channel);else src.connect(channel);

      src.loop = shouldLoop;
      src.buffer = buffer;
      src.start(0);
      return src;
    };
  }

  channel.connect(context.destination);

  Object.defineProperty(this, "volume", {
    enumerable: true,
    get: function get() {
      return channel.gain.value;
    },
    set: function set(value) {
      channel.gain.value = value;
    }
  });

  Object.defineProperty(this, "gain", {
    enumerable: true,
    get: function get() {
      return channel;
    }
  });

  this.name = name;
  this.loop = basePlay({ loop: true });
  this.play = basePlay();
}

function AudioSystem(channelNames) {
  var context = new AudioContext();
  var channels = {};
  var i = -1;

  while (channelNames[++i]) {
    channels[channelNames[i]] = new Channel(context, channelNames[i]);
  }
  this.context = context;
  this.channels = channels;
}

module.exports = exports["default"];

},{}],2:[function(require,module,exports){
'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var marked0$0 = [Parallel, Serial, Wait, FadeIn, FadeOut, Insert, Remove, Do, IO, PlayAudio].map(regeneratorRuntime.mark);

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _nodeUuid = require('node-uuid');

var _AudioSystem = require('./AudioSystem');

var _AudioSystem2 = _interopRequireDefault(_AudioSystem);

var _sequenceSchema = require('./sequence-schema');

var _sequenceSchema2 = _interopRequireDefault(_sequenceSchema);

var pp = function pp(obj) {
  return console.log(JSON.stringify(obj, null, 2));
};
var log = console.log.bind(console);

var TICK_RATE = 24;

function makeUpdate(app) {
  var lastTime = Date.now();
  var thisTime = lastTime;
  var dT = 0;

  return function () {
    lastTime = thisTime;
    thisTime = Date.now();
    dT = thisTime - lastTime;

    app.update(dT);
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
        duration = 500;
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
        remaining = 500;
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
        parent.appendChild(domAsset.element);

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
        parent.removeChild(domAsset.element);

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

        console.log('please interact with the canvas');

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

var Sequence = function Sequence(assets, tasks) {
  _classCallCheck(this, Sequence);

  this.assets = assets;
  this.tasks = tasks;
}

//TODO: probably want to take a complete list of sequence schemas and hydrate them
//similar to simulation zones when they are actually to be played.
//Probably want concept of sequence manager that is reponsible for traversal
;

var Program = (function () {
  function Program(variables, sequence) {
    _classCallCheck(this, Program);

    this.variables = variables;
    this.sequence = sequence;
  }

  _createClass(Program, [{
    key: 'update',
    value: function update(dT) {
      this.sequence.tasks.next(dT);
    }
  }]);

  return Program;
})();

var Asset = function Asset(element) {
  _classCallCheck(this, Asset);

  this.uuid = (0, _nodeUuid.v4)();
};

var DomAsset = (function (_Asset) {
  _inherits(DomAsset, _Asset);

  function DomAsset(element) {
    _classCallCheck(this, DomAsset);

    _get(Object.getPrototypeOf(DomAsset.prototype), 'constructor', this).call(this);
    this.element = element;
    this.element.classList.add('asset');
  }

  return DomAsset;
})(Asset);

var ImageAsset = (function (_DomAsset) {
  _inherits(ImageAsset, _DomAsset);

  function ImageAsset(element, src) {
    _classCallCheck(this, ImageAsset);

    _get(Object.getPrototypeOf(ImageAsset.prototype), 'constructor', this).call(this, element);
    this.element.src = src;
  }

  return ImageAsset;
})(DomAsset);

var TextAsset = (function (_DomAsset2) {
  _inherits(TextAsset, _DomAsset2);

  function TextAsset(element, text, style) {
    _classCallCheck(this, TextAsset);

    _get(Object.getPrototypeOf(TextAsset.prototype), 'constructor', this).call(this, element);
    element.innerText = text;
    for (var key in style) {
      element.style[key] = style[key];
    }
  }

  return TextAsset;
})(DomAsset);

var AudioAsset = (function (_Asset2) {
  _inherits(AudioAsset, _Asset2);

  function AudioAsset(src) {
    _classCallCheck(this, AudioAsset);

    _get(Object.getPrototypeOf(AudioAsset.prototype), 'constructor', this).call(this);
    this.src = src;
  }

  return AudioAsset;
})(Asset);

var assets = [new ImageAsset(new Image(), 'emmi.png'), new AudioAsset(['test.mp3']), new TextAsset(document.createElement('p'), 'Click the logo to continue', {
  font: '30px ariel, sans-serif',
  color: 'blue'
})];
var audioSystem = new _AudioSystem2['default']('main');
var tasks = Parallel([Serial([Insert(document.body, assets[0]), FadeIn(assets[0]), Insert(document.body, assets[2]), FadeIn(assets[2]), IO(assets[0]), Parallel([Serial([FadeOut(assets[0]), Remove(document.body, assets[0])]), Serial([FadeOut(assets[2]), Remove(document.body, assets[2])])])]), PlayAudio(assets[1])]);
var sequence = new Sequence(assets, tasks);
var variables = {
  age: null,
  gender: null
};
var program = new Program(variables, sequence);

window.program = program;
setInterval(makeUpdate(program), TICK_RATE);

},{"./AudioSystem":1,"./sequence-schema":4,"node-uuid":3}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var Sequence1 = {
    'className': 'Sequence',
    'assets': [{
        'className': 'TextLayoutAsset',
        'name': 'background',
        'staticStyle': {
            'border': {
                'color': '#000000',
                'radius': 82.8,
                'style': 'solid',
                'width': 0
            },
            'box': {
                'backgroundColor': '#dff4fe',
                'padding': 0,
                'shadowColor': '#dfe7ee',
                'shadowSize': 24
            },
            'text': {
                'align': 'center',
                'color': '#47698c',
                'decoration': 'none',
                'fontFamily': 'Roboto Condensed',
                'lineHeight': 1.2,
                'size': 240,
                'weight': 'normal',
                'whiteSpace': 'normal'
            }
        },
        'text': '',
        'textEditable': false,
        'time': 0,
        'type': 'background',
        'visualStates': [{
            'height': 1,
            'opacity': 0,
            'removable': false,
            'time': 0,
            'width': 1,
            'x': 0,
            'y': 0
        }, {
            'height': 1,
            'opacity': 1,
            'removable': false,
            'time': 410,
            'width': 1,
            'x': 0,
            'y': 0
        }, {
            'height': 1,
            'opacity': 1,
            'removable': false,
            'time': 5945,
            'width': 1,
            'x': 0,
            'y': 0
        }, {
            'height': 1,
            'opacity': 0,
            'removable': false,
            'time': 6355,
            'width': 1,
            'x': 0,
            'y': 0
        }],
        'zIndex': 0
    }, {
        'className': 'TextLayoutAsset',
        'name': 'header box',
        'staticStyle': {
            'border': {
                'color': '#000000',
                'radius': 0,
                'style': 'solid',
                'width': 0
            },
            'box': {
                'backgroundColor': 'transparent',
                'padding': 0,
                'shadowColor': '#000000',
                'shadowSize': 0
            },
            'text': {
                'align': 'left',
                'color': '#47698c',
                'decoration': 'none',
                'fontFamily': 'Roboto Condensed',
                'lineHeight': 1.2,
                'size': 73,
                'weight': 'normal',
                'whiteSpace': 'normal'
            }
        },
        'text': '',
        'textEditable': false,
        'time': 0,
        'type': 'head',
        'visualStates': [{
            'height': 0.08,
            'opacity': 0,
            'removable': false,
            'time': 0,
            'width': 0.67,
            'x': 0.1,
            'y': 0.33
        }, {
            'height': 0.08,
            'opacity': 1,
            'removable': false,
            'time': 410,
            'width': 0.67,
            'x': 0.1,
            'y': 0.33
        }, {
            'height': 0.08,
            'opacity': 1,
            'removable': false,
            'time': 5945,
            'width': 0.67,
            'x': 0.1,
            'y': 0.33
        }, {
            'height': 0.08,
            'opacity': 0,
            'removable': false,
            'time': 6355,
            'width': 0.67,
            'x': 0.1,
            'y': 0.33
        }],
        'zIndex': 1
    }, {
        'className': 'TextLayoutAsset',
        'name': 'header',
        'staticStyle': {
            'border': {
                'color': 'transparent',
                'radius': 0,
                'style': 'solid',
                'width': 0
            },
            'box': {
                'backgroundColor': '#ff00ff',
                'padding': 0,
                'shadowColor': 'transparent',
                'shadowSize': 0
            },
            'text': {
                'align': 'left',
                'color': '#47698c',
                'decoration': 'none',
                'fontFamily': 'Roboto Condensed',
                'lineHeight': 1.2,
                'size': 240,
                'weight': 'normal',
                'whiteSpace': 'normal'
            }
        },
        'text': 'Colonoscopy',
        'textEditable': true,
        'time': 0,
        'type': 'head',
        'visualStates': [{
            'height': 0.08,
            'opacity': 0,
            'removable': false,
            'time': 0,
            'width': 0.67,
            'x': 0.10155884645362433,
            'y': 0.3216897506925208
        }, {
            'height': 0.08,
            'opacity': 1,
            'removable': false,
            'time': 410,
            'width': 0.67,
            'x': 0.10155884645362433,
            'y': 0.3216897506925208
        }, {
            'time': 3000,
            'height': 0.16,
            'opacity': 1,
            'removable': false,
            'width': 0.67,
            'x': 1,
            'y': 0.3216897506925208

        }, {
            'height': 0.08,
            'opacity': 1,
            'removable': false,
            'time': 5945,
            'width': 0.67,
            'x': 0.10155884645362433,
            'y': 0.3216897506925208
        }, {
            'height': 0.08,
            'opacity': 0,
            'removable': false,
            'time': 6355,
            'width': 0.67,
            'x': 0.10155884645362433,
            'y': 0.3216897506925208
        }],
        'zIndex': 3
    }, {
        'className': 'TextLayoutAsset',
        'name': 'content box',
        'staticStyle': {
            'border': {
                'color': '#000000',
                'radius': 32,
                'style': 'solid',
                'width': 0
            },
            'box': {
                'backgroundColor': '#ffffff',
                'padding': 160,
                'shadowColor': '#dbedfa',
                'shadowSize': 24
            },
            'text': {
                'align': 'left',
                'color': '#47698c',
                'decoration': 'none',
                'fontFamily': 'Roboto Condensed',
                'lineHeight': 1.2,
                'size': 160,
                'weight': 'normal',
                'whiteSpace': 'normal'
            }
        },
        'text': '',
        'textEditable': false,
        'time': 0,
        'type': 'box',
        'visualStates': [{
            'height': 0.4,
            'opacity': 0,
            'removable': false,
            'time': 0,
            'width': 0.67,
            'x': 0.1,
            'y': 0.42
        }, {
            'height': 0.4,
            'opacity': 1,
            'removable': false,
            'time': 410,
            'width': 0.67,
            'x': 0.1,
            'y': 0.42
        }, {
            'height': 0.4,
            'opacity': 1,
            'removable': false,
            'time': 5945,
            'width': 0.67,
            'x': 0.1,
            'y': 0.42
        }, {
            'height': 0.4,
            'opacity': 0,
            'removable': false,
            'time': 6355,
            'width': 0.67,
            'x': 0.1,
            'y': 0.42
        }],
        'zIndex': 2
    }, {
        'className': 'TextLayoutAsset',
        'name': 'content',
        'staticStyle': {
            'border': {
                'color': '#000000',
                'radius': 32,
                'style': 'solid',
                'width': 0
            },
            'box': {
                'backgroundColor': 'transparent',
                'padding': 160,
                'shadowColor': '#dbedfa',
                'shadowSize': 19
            },
            'text': {
                'align': 'left',
                'color': '#47698c',
                'decoration': 'none',
                'fontFamily': 'Roboto Condensed',
                'lineHeight': 1.2,
                'size': 160,
                'weight': 'normal',
                'whiteSpace': 'normal'
            }
        },
        'text': 'The goal of a colonoscopy is to look for early signs of colon cancer or other problems.',
        'textEditable': true,
        'time': 0,
        'type': 'box',
        'visualStates': [{
            'height': 0.4,
            'opacity': 0,
            'removable': false,
            'time': 0,
            'width': 0.67,
            'x': 0.1,
            'y': 0.42
        }, {
            'height': 0.4,
            'opacity': 1,
            'removable': false,
            'time': 410,
            'width': 0.67,
            'x': 0.1,
            'y': 0.42
        }, {
            'height': 0.4,
            'opacity': 1,
            'removable': false,
            'time': 5945,
            'width': 0.67,
            'x': 0.1,
            'y': 0.42
        }, {
            'height': 0.4,
            'opacity': 0,
            'removable': false,
            'time': 6355,
            'width': 0.67,
            'x': 0.1,
            'y': 0.42
        }],
        'zIndex': 4
    }, {
        'className': 'ImageAsset',
        'media': {
            'filename': 'emmi.png',
            'metadata': {
                'ratio': 0.717689863687609
            },
            'name': '2_04',
            'path': '',
            'type': 'image'
        },
        'name': 'New image',
        'staticStyle': {
            'border': {
                'color': '#000000',
                'radius': 0,
                'style': 'none',
                'width': 0
            },
            'box': {
                'padding': 0,
                'shadowColor': '#000000',
                'shadowSize': 0
            },
            'text': {
                'align': 'left',
                'color': '#000000',
                'decoration': 'none',
                'fontFamily': 'Roboto Condensed',
                'lineHeight': 1.2,
                'size': 73,
                'weight': 'normal',
                'whiteSpace': 'normal'
            }
        },
        'time': 123,
        'type': null,
        'visualStates': [{
            'height': 0.36158313993520635,
            'opacity': 0,
            'removable': false,
            'time': 13,
            'width': 0.26000031949759184,
            'x': 0.72,
            'y': 0.1
        }, {
            'height': 0.36158313993520635,
            'opacity': 1,
            'removable': false,
            'time': 492,
            'width': 0.26000031949759184,
            'x': 0.72,
            'y': 0.1
        }, {
            'height': 0.36158313993520635,
            'opacity': 1,
            'removable': false,
            'time': 5781,
            'width': 0.26000031949759184,
            'x': 0.72,
            'y': 0.1
        }, {
            'height': 0.36158313993520635,
            'opacity': 0,
            'removable': false,
            'time': 6232,
            'width': 0.26000031949759184,
            'x': 0.72,
            'y': 0.1
        }],
        'zIndex': 5
    }],
    'name': null,
    'objectId': 1039,
    'parentObjectId': 1018,
    'screens': [{
        'rows': [{
            'audioText': ' Now, as you may know, the goal of a colonoscopy is to look for early signs of colon cancer or other problems. &nbsp;',
            'endTime': 6370,
            'media': {
                'filename': 'media/audio/2_05.mp3',
                'metadata': {
                    'duration': 6370,
                    'text': ''
                },
                'name': '2_04',
                'path': '',
                'type': 'audio'
            },
            'startTime': 6790,
            'wait': 420
        }, {
            'audioText': ' Now, as you may know, the goal of a colonoscopy is to look for early signs of colon cancer or other problems. &nbsp;',
            'endTime': 6370,
            'media': {
                'filename': 'media/audio/2_04.mp3',
                'metadata': {
                    'duration': 6370,
                    'text': ''
                },
                'name': '2_04',
                'path': '',
                'type': 'audio'
            },
            'startTime': 0,
            'wait': 4200
        }]
    }],
    'waitAfter': 0
};

exports['default'] = Sequence1;
module.exports = exports['default'];

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9zdGV2ZW5rYW5lL3BpeGktcmVuZGVyZXIvQXVkaW9TeXN0ZW0uanMiLCIvVXNlcnMvc3RldmVua2FuZS9waXhpLXJlbmRlcmVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL25vZGUtdXVpZC91dWlkLmpzIiwiL1VzZXJzL3N0ZXZlbmthbmUvcGl4aS1yZW5kZXJlci9zZXF1ZW5jZS1zY2hlbWEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUE7Ozs7O3FCQTRDWSxXQUFXO0FBMUNuQyxTQUFTLE9BQU8sQ0FBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO0FBQy9CLE1BQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQTs7QUFFbEMsV0FBUyxhQUFhLENBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7QUFDekMsT0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUNuQixVQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0dBQ3JCOztBQUVELFdBQVMsUUFBUSxHQUFjO1FBQVosT0FBTyx5REFBQyxFQUFFOztBQUMzQixRQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQTs7QUFFdEMsV0FBTyxVQUFVLE1BQU0sRUFBRSxNQUFNLEVBQUU7QUFDL0IsVUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxDQUFBOztBQUU5QyxVQUFJLE1BQU0sRUFBRSxhQUFhLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQSxLQUNuQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBOztBQUVoQyxTQUFHLENBQUMsSUFBSSxHQUFL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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdlBBLFlBQVksQ0FBQzs7Ozs7QUFFYixJQUFJLFNBQVMsR0FBRztBQUNaLGVBQVcsRUFBRSxVQUFVO0FBQ3ZCLFlBQVEsRUFBRSxDQUFDO0FBQ1AsbUJBQVcsRUFBRSxpQkFBaUI7QUFDOUIsY0FBTSxFQUFFLFlBQVk7QUFDcEIscUJBQWEsRUFBRTtBQUNY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VSxFQUFFLHNCQUFzQjtBQUNsQywwQkFBVSxFQUFFO0FBQ1IsOEJBQVUsRUFBRSxJQUFJO0FBQ2hCLDBCQUFNLEVBQUUsRUFBRTtpQkFDYjtBQUNELHNCQUFNLEVBQUUsTUFBTTtBQUNkLHNCQUFNLEVBQUUsRUFBRTtBQUNWLHNCQUFNLEVBQUUsT0FBTzthQUNsQjtBQUNELHVCQUFXLEVBQUUsQ0FBQztBQUNkLGtCQUFNLEVBQUUsSUFBSTtTQUNuQixDQUNBO0tBQ0osQ0FBQztBQUNGLGVBQVcsRUFBRSxDQUFDO0NBQ2pCLENBQUM7O3FCQUVhLFNBQVMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnXG5cbmZ1bmN0aW9uIENoYW5uZWwgKGNvbnRleHQsIG5hbWUpIHtcbiAgbGV0IGNoYW5uZWwgPSBjb250ZXh0LmNyZWF0ZUdhaW4oKVxuXG4gIGZ1bmN0aW9uIGNvbm5lY3RQYW5uZXIgKHNyYywgcGFubmVyLCBjaGFuKSB7XG4gICAgc3JjLmNvbm5lY3QocGFubmVyKVxuICAgIHBhbm5lci5jb25uZWN0KGNoYW4pIFxuICB9XG5cbiAgZnVuY3Rpb24gYmFzZVBsYXkgKG9wdGlvbnM9e30pIHtcbiAgICBsZXQgc2hvdWxkTG9vcCA9IG9wdGlvbnMubG9vcCB8fCBmYWxzZVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChidWZmZXIsIHBhbm5lcikge1xuICAgICAgbGV0IHNyYyA9IGNoYW5uZWwuY29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKSBcblxuICAgICAgaWYgKHBhbm5lcikgY29ubmVjdFBhbm5lcihzcmMsIHBhbm5lciwgY2hhbm5lbClcbiAgICAgIGVsc2UgICAgICAgIHNyYy5jb25uZWN0KGNoYW5uZWwpXG5cbiAgICAgIHNyYy5sb29wICAgPSBzaG91bGRMb29wXG4gICAgICBzcmMuYnVmZmVyID0gYnVmZmVyXG4gICAgICBzcmMuc3RhcnQoMClcbiAgICAgIHJldHVybiBzcmNcbiAgICB9XG4gIH1cblxuICBjaGFubmVsLmNvbm5lY3QoY29udGV4dC5kZXN0aW5hdGlvbilcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJ2b2x1bWVcIiwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0KCkgeyByZXR1cm4gY2hhbm5lbC5nYWluLnZhbHVlIH0sXG4gICAgc2V0KHZhbHVlKSB7IGNoYW5uZWwuZ2Fpbi52YWx1ZSA9IHZhbHVlIH1cbiAgfSlcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJnYWluXCIsIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldCgpIHsgcmV0dXJuIGNoYW5uZWwgfVxuICB9KVxuXG4gIHRoaXMubmFtZSA9IG5hbWVcbiAgdGhpcy5sb29wID0gYmFzZVBsYXkoe2xvb3A6IHRydWV9KVxuICB0aGlzLnBsYXkgPSBiYXNlUGxheSgpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEF1ZGlvU3lzdGVtIChjaGFubmVsTmFtZXMpIHtcbiAgbGV0IGNvbnRleHQgID0gbmV3IEF1ZGlvQ29udGV4dFxuICBsZXQgY2hhbm5lbHMgPSB7fVxuICBsZXQgaSAgICAgICAgPSAtMVxuXG4gIHdoaWxlIChjaGFubmVsTmFtZXNbKytpXSkge1xuICAgIGNoYW5uZWxzW2NoYW5uZWxOYW1lc1tpXV0gPSBuZXcgQ2hhbm5lbChjb250ZXh0LCBjaGFubmVsTmFtZXNbaV0pXG4gIH1cbiAgdGhpcy5jb250ZXh0ICA9IGNvbnRleHQgXG4gIHRoaXMuY2hhbm5lbHMgPSBjaGFubmVsc1xufVxuIiwiaW1wb3J0IHt2NCBhcyB1dWlkfSBmcm9tICdub2RlLXV1aWQnXG5pbXBvcnQgQXVkaW9TeXN0ZW0gZnJvbSAnLi9BdWRpb1N5c3RlbSdcbmltcG9ydCBzY2hlbWEgZnJvbSAnLi9zZXF1ZW5jZS1zY2hlbWEnXG5cbmNvbnN0IHBwID0gb2JqID0+IGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG9iaiwgbnVsbCwgMikpXG5jb25zdCBsb2cgPSBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpXG5cbmNvbnN0IFRJQ0tfUkFURSA9IDI0XG5cbmZ1bmN0aW9uIG1ha2VVcGRhdGUgKGFwcCkge1xuICBsZXQgbGFzdFRpbWUgPSBEYXRlLm5vdygpXG4gIGxldCB0aGlzVGltZSA9IGxhc3RUaW1lXG4gIGxldCBkVCA9IDBcblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGxhc3RUaW1lID0gdGhpc1RpbWVcbiAgICB0aGlzVGltZSA9IERhdGUubm93KClcbiAgICBkVCA9IHRoaXNUaW1lIC0gbGFzdFRpbWVcblxuICAgIGFwcC51cGRhdGUoZFQpXG4gIH1cbn1cblxuZnVuY3Rpb24gKiBQYXJhbGxlbCAodGFza3MpIHtcbiAgbGV0IHRpbWUgPSAwXG4gIGxldCBkVCA9IDBcblxuICB3aGlsZSAodGFza3MubGVuZ3RoKSB7XG4gICAgZFQgPSB5aWVsZFxuICAgIHRpbWUgKz0gZFRcbiAgICBmb3IgKGxldCB0YXNrIG9mIHRhc2tzKSB7XG4gICAgICBpZiAodGFzay5uZXh0KGRUKS5kb25lKSB7XG4gICAgICAgIHRhc2tzLnNwbGljZSh0YXNrcy5pbmRleE9mKHRhc2spLCAxKVxuICAgICAgfVxuICAgIH0gXG4gIH1cbn1cblxuZnVuY3Rpb24gKiBTZXJpYWwgKHRhc2tzKSB7XG4gIGxldCB0aW1lID0gMFxuICBsZXQgZFQgPSAwXG5cbiAgd2hpbGUgKHRhc2tzLmxlbmd0aCkge1xuICAgIGRUID0geWllbGRcbiAgICB0aW1lICs9IGRUXG4gICAgaWYgKHRhc2tzWzBdLm5leHQoZFQpLmRvbmUpIHRhc2tzLnNoaWZ0KClcbiAgfVxufVxuXG5mdW5jdGlvbiAqIFdhaXQgKGR1cmF0aW9uKSB7XG4gIGxldCBlbGFwc2VkID0gMCBcbiAgbGV0IGRUID0gMFxuXG4gIHdoaWxlIChlbGFwc2VkIDwgZHVyYXRpb24pIHtcbiAgICBkVCA9IHlpZWxkXG4gICAgZWxhcHNlZCArPSBkVCBcbiAgfVxuICBjb25zb2xlLmxvZyhgd2FpdGVkOiAke2VsYXBzZWR9YClcbn1cblxuZnVuY3Rpb24gKiBGYWRlSW4gKGRvbUFzc2V0KSB7XG4gIGxldCBlbGFwc2VkID0gMFxuICBsZXQgZHVyYXRpb24gPSA1MDBcbiAgbGV0IGRUID0gMFxuXG4gIGRUID0geWllbGRcbiAgZWxhcHNlZCArPSBkVCBcbiAgZG9tQXNzZXQuZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpXG5cbiAgd2hpbGUgKGVsYXBzZWQgPCBkdXJhdGlvbikge1xuICAgIGRUID0geWllbGRcbiAgICBlbGFwc2VkICs9IGRUIFxuICB9XG59XG5cbmZ1bmN0aW9uICogRmFkZU91dCAoZG9tQXNzZXQpIHtcbiAgbGV0IHJlbWFpbmluZyA9IDUwMCBcbiAgbGV0IGRUID0gMFxuXG4gIGRUID0geWllbGRcbiAgcmVtYWluaW5nIC09IGRUIFxuICBkb21Bc3NldC5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcblxuICB3aGlsZSAocmVtYWluaW5nID4gMCkge1xuICAgIGRUID0geWllbGRcbiAgICByZW1haW5pbmcgLT0gZFQgXG4gIH1cbn1cblxuZnVuY3Rpb24gKiBJbnNlcnQgKHBhcmVudCwgZG9tQXNzZXQpIHtcbiAgcGFyZW50LmFwcGVuZENoaWxkKGRvbUFzc2V0LmVsZW1lbnQpXG59XG5cbmZ1bmN0aW9uICogUmVtb3ZlIChwYXJlbnQsIGRvbUFzc2V0KSB7XG4gIHBhcmVudC5yZW1vdmVDaGlsZChkb21Bc3NldC5lbGVtZW50KVxufVxuXG5mdW5jdGlvbiAqIERvIChmbiwgLi4ucGFyYW1zKSB7XG4gIGZuLmFwcGx5KG51bGwsIHBhcmFtcylcbn1cblxuZnVuY3Rpb24gKiBJTyAoZG9tQXNzZXQpIHtcbiAgbGV0IGRvbmUgPSBmYWxzZSAgXG4gIGxldCBsaXN0ZW5lciA9IGRvbUFzc2V0LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBkb25lID0gdHJ1ZSlcblxuICBjb25zb2xlLmxvZygncGxlYXNlIGludGVyYWN0IHdpdGggdGhlIGNhbnZhcycpXG4gIHdoaWxlICghZG9uZSkgeWllbGRcblxuICBjb25zb2xlLmxvZygndGhhbmtzIGZvciB5b3VyIHBhcnRpY2lwYXRpb24nKVxuICBkb21Bc3NldC5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIobGlzdGVuZXIpXG59XG5cbmZ1bmN0aW9uICogUGxheUF1ZGlvIChhdWRpb0Fzc2V0KSB7XG4gIGxldCBkb25lID0gZmFsc2VcbiAgbGV0IHNvdW5kID0gbmV3IEhvd2woe1xuICAgIHNyYzogYXVkaW9Bc3NldC5zcmMsXG4gICAgb25lbmQ6ICgpID0+IGRvbmUgPSB0cnVlXG4gIH0pXG5cbiAgc291bmQucGxheSgpXG4gIHdoaWxlICghZG9uZSkgeWllbGRcbiAgY29uc29sZS5sb2coJ2F1ZGlvIGNvbXBsZXRlZCcpXG59XG5cbmNsYXNzIFNlcXVlbmNlIHtcbiAgY29uc3RydWN0b3IoYXNzZXRzLCB0YXNrcykge1xuICAgIHRoaXMuYXNzZXRzID0gYXNzZXRzXG4gICAgdGhpcy50YXNrcyA9IHRhc2tzXG4gIH1cbn1cblxuLy9UT0RPOiBwcm9iYWJseSB3YW50IHRvIHRha2UgYSBjb21wbGV0ZSBsaXN0IG9mIHNlcXVlbmNlIHNjaGVtYXMgYW5kIGh5ZHJhdGUgdGhlbVxuLy9zaW1pbGFyIHRvIHNpbXVsYXRpb24gem9uZXMgd2hlbiB0aGV5IGFyZSBhY3R1YWxseSB0byBiZSBwbGF5ZWQuXG4vL1Byb2JhYmx5IHdhbnQgY29uY2VwdCBvZiBzZXF1ZW5jZSBtYW5hZ2VyIHRoYXQgaXMgcmVwb25zaWJsZSBmb3IgdHJhdmVyc2FsXG5jbGFzcyBQcm9ncmFtIHtcbiAgY29uc3RydWN0b3IodmFyaWFibGVzLCBzZXF1ZW5jZSkge1xuICAgIHRoaXMudmFyaWFibGVzID0gdmFyaWFibGVzXG4gICAgdGhpcy5zZXF1ZW5jZSA9IHNlcXVlbmNlXG4gIH1cblxuICB1cGRhdGUoZFQpIHtcbiAgICB0aGlzLnNlcXVlbmNlLnRhc2tzLm5leHQoZFQpXG4gIH1cbn1cblxuY2xhc3MgQXNzZXQge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgdGhpcy51dWlkID0gdXVpZCgpIFxuICB9XG59XG5cbmNsYXNzIERvbUFzc2V0IGV4dGVuZHMgQXNzZXQge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnRcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYXNzZXQnKVxuICB9XG59XG5cbmNsYXNzIEltYWdlQXNzZXQgZXh0ZW5kcyBEb21Bc3NldCB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIHNyYykge1xuICAgIHN1cGVyKGVsZW1lbnQpIFxuICAgIHRoaXMuZWxlbWVudC5zcmMgPSBzcmNcbiAgfVxufVxuXG5jbGFzcyBUZXh0QXNzZXQgZXh0ZW5kcyBEb21Bc3NldCB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIHRleHQsIHN0eWxlKSB7XG4gICAgc3VwZXIoZWxlbWVudClcbiAgICBlbGVtZW50LmlubmVyVGV4dCA9IHRleHRcbiAgICBmb3IgKGxldCBrZXkgaW4gc3R5bGUpIHtcbiAgICAgIGVsZW1lbnQuc3R5bGVba2V5XSA9IHN0eWxlW2tleV0gXG4gICAgfVxuICB9XG59XG5cbmNsYXNzIEF1ZGlvQXNzZXQgZXh0ZW5kcyBBc3NldCB7XG4gIGNvbnN0cnVjdG9yKHNyYykge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLnNyYyA9IHNyY1xuICB9XG59XG5cbmNvbnN0IGFzc2V0cyA9IFtcbiAgbmV3IEltYWdlQXNzZXQobmV3IEltYWdlLCAnZW1taS5wbmcnKSxcbiAgbmV3IEF1ZGlvQXNzZXQoWyd0ZXN0Lm1wMyddKSxcbiAgbmV3IFRleHRBc3NldChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyksICdDbGljayB0aGUgbG9nbyB0byBjb250aW51ZScsIHtcbiAgICBmb250OiAnMzBweCBhcmllbCwgc2Fucy1zZXJpZicsXG4gICAgY29sb3I6ICdibHVlJyxcbiAgfSlcbl1cbmNvbnN0IGF1ZGlvU3lzdGVtID0gbmV3IEF1ZGlvU3lzdGVtKCdtYWluJylcbmNvbnN0IHRhc2tzID0gUGFyYWxsZWwoW1xuICBTZXJpYWwoW1xuICAgIEluc2VydChkb2N1bWVudC5ib2R5LCBhc3NldHNbMF0pLFxuICAgIEZhZGVJbihhc3NldHNbMF0pLCBcbiAgICBJbnNlcnQoZG9jdW1lbnQuYm9keSwgYXNzZXRzWzJdKSxcbiAgICBGYWRlSW4oYXNzZXRzWzJdKSwgXG4gICAgSU8oYXNzZXRzWzBdKSwgXG4gICAgUGFyYWxsZWwoW1xuICAgICAgU2VyaWFsKFtcbiAgICAgICAgRmFkZU91dChhc3NldHNbMF0pLFxuICAgICAgICBSZW1vdmUoZG9jdW1lbnQuYm9keSwgYXNzZXRzWzBdKVxuICAgICAgXSksXG4gICAgICBTZXJpYWwoW1xuICAgICAgICBGYWRlT3V0KGFzc2V0c1syXSksXG4gICAgICAgIFJlbW92ZShkb2N1bWVudC5ib2R5LCBhc3NldHNbMl0pXG4gICAgICBdKVxuICAgIF0pXG4gIF0pLFxuICBQbGF5QXVkaW8oYXNzZXRzWzFdKSxcbl0pXG5jb25zdCBzZXF1ZW5jZSA9IG5ldyBTZXF1ZW5jZShhc3NldHMsIHRhc2tzKVxuY29uc3QgdmFyaWFibGVzID0ge1xuICBhZ2U6IG51bGwsXG4gIGdlbmRlcjogbnVsbFxufVxuY29uc3QgcHJvZ3JhbSA9IG5ldyBQcm9ncmFtKHZhcmlhYmxlcywgc2VxdWVuY2UpXG5cbndpbmRvdy5wcm9ncmFtID0gcHJvZ3JhbVxuc2V0SW50ZXJ2YWwobWFrZVVwZGF0ZShwcm9ncmFtKSwgVElDS19SQVRFKVxuIiwiLy8gICAgIHV1aWQuanNcbi8vXG4vLyAgICAgQ29weXJpZ2h0IChjKSAyMDEwLTIwMTIgUm9iZXJ0IEtpZWZmZXJcbi8vICAgICBNSVQgTGljZW5zZSAtIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblxuKGZ1bmN0aW9uKCkge1xuICB2YXIgX2dsb2JhbCA9IHRoaXM7XG5cbiAgLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gIFdlIGZlYXR1cmVcbiAgLy8gZGV0ZWN0IHRvIGRldGVybWluZSB0aGUgYmVzdCBSTkcgc291cmNlLCBub3JtYWxpemluZyB0byBhIGZ1bmN0aW9uIHRoYXRcbiAgLy8gcmV0dXJucyAxMjgtYml0cyBvZiByYW5kb21uZXNzLCBzaW5jZSB0aGF0J3Mgd2hhdCdzIHVzdWFsbHkgcmVxdWlyZWRcbiAgdmFyIF9ybmc7XG5cbiAgLy8gTm9kZS5qcyBjcnlwdG8tYmFzZWQgUk5HIC0gaHR0cDovL25vZGVqcy5vcmcvZG9jcy92MC42LjIvYXBpL2NyeXB0by5odG1sXG4gIC8vXG4gIC8vIE1vZGVyYXRlbHkgZmFzdCwgaGlnaCBxdWFsaXR5XG4gIGlmICh0eXBlb2YoX2dsb2JhbC5yZXF1aXJlKSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBfcmIgPSBfZ2xvYmFsLnJlcXVpcmUoJ2NyeXB0bycpLnJhbmRvbUJ5dGVzO1xuICAgICAgX3JuZyA9IF9yYiAmJiBmdW5jdGlvbigpIHtyZXR1cm4gX3JiKDE2KTt9O1xuICAgIH0gY2F0Y2goZSkge31cbiAgfVxuXG4gIGlmICghX3JuZyAmJiBfZ2xvYmFsLmNyeXB0byAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgLy8gV0hBVFdHIGNyeXB0by1iYXNlZCBSTkcgLSBodHRwOi8vd2lraS53aGF0d2cub3JnL3dpa2kvQ3J5cHRvXG4gICAgLy9cbiAgICAvLyBNb2RlcmF0ZWx5IGZhc3QsIGhpZ2ggcXVhbGl0eVxuICAgIHZhciBfcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7XG4gICAgX3JuZyA9IGZ1bmN0aW9uIHdoYXR3Z1JORygpIHtcbiAgICAgIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMoX3JuZHM4KTtcbiAgICAgIHJldHVybiBfcm5kczg7XG4gICAgfTtcbiAgfVxuXG4gIGlmICghX3JuZykge1xuICAgIC8vIE1hdGgucmFuZG9tKCktYmFzZWQgKFJORylcbiAgICAvL1xuICAgIC8vIElmIGFsbCBlbHNlIGZhaWxzLCB1c2UgTWF0aC5yYW5kb20oKS4gIEl0J3MgZmFzdCwgYnV0IGlzIG9mIHVuc3BlY2lmaWVkXG4gICAgLy8gcXVhbGl0eS5cbiAgICB2YXIgIF9ybmRzID0gbmV3IEFycmF5KDE2KTtcbiAgICBfcm5nID0gZnVuY3Rpb24oKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgcjsgaSA8IDE2OyBpKyspIHtcbiAgICAgICAgaWYgKChpICYgMHgwMykgPT09IDApIHIgPSBNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDA7XG4gICAgICAgIF9ybmRzW2ldID0gciA+Pj4gKChpICYgMHgwMykgPDwgMykgJiAweGZmO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3JuZHM7XG4gICAgfTtcbiAgfVxuXG4gIC8vIEJ1ZmZlciBjbGFzcyB0byB1c2VcbiAgdmFyIEJ1ZmZlckNsYXNzID0gdHlwZW9mKF9nbG9iYWwuQnVmZmVyKSA9PSAnZnVuY3Rpb24nID8gX2dsb2JhbC5CdWZmZXIgOiBBcnJheTtcblxuICAvLyBNYXBzIGZvciBudW1iZXIgPC0+IGhleCBzdHJpbmcgY29udmVyc2lvblxuICB2YXIgX2J5dGVUb0hleCA9IFtdO1xuICB2YXIgX2hleFRvQnl0ZSA9IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgaSsrKSB7XG4gICAgX2J5dGVUb0hleFtpXSA9IChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSk7XG4gICAgX2hleFRvQnl0ZVtfYnl0ZVRvSGV4W2ldXSA9IGk7XG4gIH1cblxuICAvLyAqKmBwYXJzZSgpYCAtIFBhcnNlIGEgVVVJRCBpbnRvIGl0J3MgY29tcG9uZW50IGJ5dGVzKipcbiAgZnVuY3Rpb24gcGFyc2UocywgYnVmLCBvZmZzZXQpIHtcbiAgICB2YXIgaSA9IChidWYgJiYgb2Zmc2V0KSB8fCAwLCBpaSA9IDA7XG5cbiAgICBidWYgPSBidWYgfHwgW107XG4gICAgcy50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1swLTlhLWZdezJ9L2csIGZ1bmN0aW9uKG9jdCkge1xuICAgICAgaWYgKGlpIDwgMTYpIHsgLy8gRG9uJ3Qgb3ZlcmZsb3chXG4gICAgICAgIGJ1ZltpICsgaWkrK10gPSBfaGV4VG9CeXRlW29jdF07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBaZXJvIG91dCByZW1haW5pbmcgYnl0ZXMgaWYgc3RyaW5nIHdhcyBzaG9ydFxuICAgIHdoaWxlIChpaSA8IDE2KSB7XG4gICAgICBidWZbaSArIGlpKytdID0gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgLy8gKipgdW5wYXJzZSgpYCAtIENvbnZlcnQgVVVJRCBieXRlIGFycmF5IChhbGEgcGFyc2UoKSkgaW50byBhIHN0cmluZyoqXG4gIGZ1bmN0aW9uIHVucGFyc2UoYnVmLCBvZmZzZXQpIHtcbiAgICB2YXIgaSA9IG9mZnNldCB8fCAwLCBidGggPSBfYnl0ZVRvSGV4O1xuICAgIHJldHVybiAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV07XG4gIH1cblxuICAvLyAqKmB2MSgpYCAtIEdlbmVyYXRlIHRpbWUtYmFzZWQgVVVJRCoqXG4gIC8vXG4gIC8vIEluc3BpcmVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9MaW9zSy9VVUlELmpzXG4gIC8vIGFuZCBodHRwOi8vZG9jcy5weXRob24ub3JnL2xpYnJhcnkvdXVpZC5odG1sXG5cbiAgLy8gcmFuZG9tICMncyB3ZSBuZWVkIHRvIGluaXQgbm9kZSBhbmQgY2xvY2tzZXFcbiAgdmFyIF9zZWVkQnl0ZXMgPSBfcm5nKCk7XG5cbiAgLy8gUGVyIDQuNSwgY3JlYXRlIGFuZCA0OC1iaXQgbm9kZSBpZCwgKDQ3IHJhbmRvbSBiaXRzICsgbXVsdGljYXN0IGJpdCA9IDEpXG4gIHZhciBfbm9kZUlkID0gW1xuICAgIF9zZWVkQnl0ZXNbMF0gfCAweDAxLFxuICAgIF9zZWVkQnl0ZXNbMV0sIF9zZWVkQnl0ZXNbMl0sIF9zZWVkQnl0ZXNbM10sIF9zZWVkQnl0ZXNbNF0sIF9zZWVkQnl0ZXNbNV1cbiAgXTtcblxuICAvLyBQZXIgNC4yLjIsIHJhbmRvbWl6ZSAoMTQgYml0KSBjbG9ja3NlcVxuICB2YXIgX2Nsb2Nrc2VxID0gKF9zZWVkQnl0ZXNbNl0gPDwgOCB8IF9zZWVkQnl0ZXNbN10pICYgMHgzZmZmO1xuXG4gIC8vIFByZXZpb3VzIHV1aWQgY3JlYXRpb24gdGltZVxuICB2YXIgX2xhc3RNU2VjcyA9IDAsIF9sYXN0TlNlY3MgPSAwO1xuXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYnJvb2ZhL25vZGUtdXVpZCBmb3IgQVBJIGRldGFpbHNcbiAgZnVuY3Rpb24gdjEob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcbiAgICB2YXIgYiA9IGJ1ZiB8fCBbXTtcblxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgdmFyIGNsb2Nrc2VxID0gb3B0aW9ucy5jbG9ja3NlcSAhPSBudWxsID8gb3B0aW9ucy5jbG9ja3NlcSA6IF9jbG9ja3NlcTtcblxuICAgIC8vIFVVSUQgdGltZXN0YW1wcyBhcmUgMTAwIG5hbm8tc2Vjb25kIHVuaXRzIHNpbmNlIHRoZSBHcmVnb3JpYW4gZXBvY2gsXG4gICAgLy8gKDE1ODItMTAtMTUgMDA6MDApLiAgSlNOdW1iZXJzIGFyZW4ndCBwcmVjaXNlIGVub3VnaCBmb3IgdGhpcywgc29cbiAgICAvLyB0aW1lIGlzIGhhbmRsZWQgaW50ZXJuYWxseSBhcyAnbXNlY3MnIChpbnRlZ2VyIG1pbGxpc2Vjb25kcykgYW5kICduc2VjcydcbiAgICAvLyAoMTAwLW5hbm9zZWNvbmRzIG9mZnNldCBmcm9tIG1zZWNzKSBzaW5jZSB1bml4IGVwb2NoLCAxOTcwLTAxLTAxIDAwOjAwLlxuICAgIHZhciBtc2VjcyA9IG9wdGlvbnMubXNlY3MgIT0gbnVsbCA/IG9wdGlvbnMubXNlY3MgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgIC8vIFBlciA0LjIuMS4yLCB1c2UgY291bnQgb2YgdXVpZCdzIGdlbmVyYXRlZCBkdXJpbmcgdGhlIGN1cnJlbnQgY2xvY2tcbiAgICAvLyBjeWNsZSB0byBzaW11bGF0ZSBoaWdoZXIgcmVzb2x1dGlvbiBjbG9ja1xuICAgIHZhciBuc2VjcyA9IG9wdGlvbnMubnNlY3MgIT0gbnVsbCA/IG9wdGlvbnMubnNlY3MgOiBfbGFzdE5TZWNzICsgMTtcblxuICAgIC8vIFRpbWUgc2luY2UgbGFzdCB1dWlkIGNyZWF0aW9uIChpbiBtc2VjcylcbiAgICB2YXIgZHQgPSAobXNlY3MgLSBfbGFzdE1TZWNzKSArIChuc2VjcyAtIF9sYXN0TlNlY3MpLzEwMDAwO1xuXG4gICAgLy8gUGVyIDQuMi4xLjIsIEJ1bXAgY2xvY2tzZXEgb24gY2xvY2sgcmVncmVzc2lvblxuICAgIGlmIChkdCA8IDAgJiYgb3B0aW9ucy5jbG9ja3NlcSA9PSBudWxsKSB7XG4gICAgICBjbG9ja3NlcSA9IGNsb2Nrc2VxICsgMSAmIDB4M2ZmZjtcbiAgICB9XG5cbiAgICAvLyBSZXNldCBuc2VjcyBpZiBjbG9jayByZWdyZXNzZXMgKG5ldyBjbG9ja3NlcSkgb3Igd2UndmUgbW92ZWQgb250byBhIG5ld1xuICAgIC8vIHRpbWUgaW50ZXJ2YWxcbiAgICBpZiAoKGR0IDwgMCB8fCBtc2VjcyA+IF9sYXN0TVNlY3MpICYmIG9wdGlvbnMubnNlY3MgPT0gbnVsbCkge1xuICAgICAgbnNlY3MgPSAwO1xuICAgIH1cblxuICAgIC8vIFBlciA0LjIuMS4yIFRocm93IGVycm9yIGlmIHRvbyBtYW55IHV1aWRzIGFyZSByZXF1ZXN0ZWRcbiAgICBpZiAobnNlY3MgPj0gMTAwMDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigndXVpZC52MSgpOiBDYW5cXCd0IGNyZWF0ZSBtb3JlIHRoYW4gMTBNIHV1aWRzL3NlYycpO1xuICAgIH1cblxuICAgIF9sYXN0TVNlY3MgPSBtc2VjcztcbiAgICBfbGFzdE5TZWNzID0gbnNlY3M7XG4gICAgX2Nsb2Nrc2VxID0gY2xvY2tzZXE7XG5cbiAgICAvLyBQZXIgNC4xLjQgLSBDb252ZXJ0IGZyb20gdW5peCBlcG9jaCB0byBHcmVnb3JpYW4gZXBvY2hcbiAgICBtc2VjcyArPSAxMjIxOTI5MjgwMDAwMDtcblxuICAgIC8vIGB0aW1lX2xvd2BcbiAgICB2YXIgdGwgPSAoKG1zZWNzICYgMHhmZmZmZmZmKSAqIDEwMDAwICsgbnNlY3MpICUgMHgxMDAwMDAwMDA7XG4gICAgYltpKytdID0gdGwgPj4+IDI0ICYgMHhmZjtcbiAgICBiW2krK10gPSB0bCA+Pj4gMTYgJiAweGZmO1xuICAgIGJbaSsrXSA9IHRsID4+PiA4ICYgMHhmZjtcbiAgICBiW2krK10gPSB0bCAmIDB4ZmY7XG5cbiAgICAvLyBgdGltZV9taWRgXG4gICAgdmFyIHRtaCA9IChtc2VjcyAvIDB4MTAwMDAwMDAwICogMTAwMDApICYgMHhmZmZmZmZmO1xuICAgIGJbaSsrXSA9IHRtaCA+Pj4gOCAmIDB4ZmY7XG4gICAgYltpKytdID0gdG1oICYgMHhmZjtcblxuICAgIC8vIGB0aW1lX2hpZ2hfYW5kX3ZlcnNpb25gXG4gICAgYltpKytdID0gdG1oID4+PiAyNCAmIDB4ZiB8IDB4MTA7IC8vIGluY2x1ZGUgdmVyc2lvblxuICAgIGJbaSsrXSA9IHRtaCA+Pj4gMTYgJiAweGZmO1xuXG4gICAgLy8gYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgIChQZXIgNC4yLjIgLSBpbmNsdWRlIHZhcmlhbnQpXG4gICAgYltpKytdID0gY2xvY2tzZXEgPj4+IDggfCAweDgwO1xuXG4gICAgLy8gYGNsb2NrX3NlcV9sb3dgXG4gICAgYltpKytdID0gY2xvY2tzZXEgJiAweGZmO1xuXG4gICAgLy8gYG5vZGVgXG4gICAgdmFyIG5vZGUgPSBvcHRpb25zLm5vZGUgfHwgX25vZGVJZDtcbiAgICBmb3IgKHZhciBuID0gMDsgbiA8IDY7IG4rKykge1xuICAgICAgYltpICsgbl0gPSBub2RlW25dO1xuICAgIH1cblxuICAgIHJldHVybiBidWYgPyBidWYgOiB1bnBhcnNlKGIpO1xuICB9XG5cbiAgLy8gKipgdjQoKWAgLSBHZW5lcmF0ZSByYW5kb20gVVVJRCoqXG5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9icm9vZmEvbm9kZS11dWlkIGZvciBBUEkgZGV0YWlsc1xuICBmdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICAgIC8vIERlcHJlY2F0ZWQgLSAnZm9ybWF0JyBhcmd1bWVudCwgYXMgc3VwcG9ydGVkIGluIHYxLjJcbiAgICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcblxuICAgIGlmICh0eXBlb2Yob3B0aW9ucykgPT0gJ3N0cmluZycpIHtcbiAgICAgIGJ1ZiA9IG9wdGlvbnMgPT0gJ2JpbmFyeScgPyBuZXcgQnVmZmVyQ2xhc3MoMTYpIDogbnVsbDtcbiAgICAgIG9wdGlvbnMgPSBudWxsO1xuICAgIH1cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIHZhciBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IF9ybmcpKCk7XG5cbiAgICAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG4gICAgcm5kc1s2XSA9IChybmRzWzZdICYgMHgwZikgfCAweDQwO1xuICAgIHJuZHNbOF0gPSAocm5kc1s4XSAmIDB4M2YpIHwgMHg4MDtcblxuICAgIC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuICAgIGlmIChidWYpIHtcbiAgICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCAxNjsgaWkrKykge1xuICAgICAgICBidWZbaSArIGlpXSA9IHJuZHNbaWldO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBidWYgfHwgdW5wYXJzZShybmRzKTtcbiAgfVxuXG4gIC8vIEV4cG9ydCBwdWJsaWMgQVBJXG4gIHZhciB1dWlkID0gdjQ7XG4gIHV1aWQudjEgPSB2MTtcbiAgdXVpZC52NCA9IHY0O1xuICB1dWlkLnBhcnNlID0gcGFyc2U7XG4gIHV1aWQudW5wYXJzZSA9IHVucGFyc2U7XG4gIHV1aWQuQnVmZmVyQ2xhc3MgPSBCdWZmZXJDbGFzcztcblxuICBpZiAodHlwZW9mKG1vZHVsZSkgIT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAvLyBQdWJsaXNoIGFzIG5vZGUuanMgbW9kdWxlXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB1dWlkO1xuICB9IGVsc2UgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAvLyBQdWJsaXNoIGFzIEFNRCBtb2R1bGVcbiAgICBkZWZpbmUoZnVuY3Rpb24oKSB7cmV0dXJuIHV1aWQ7fSk7XG4gXG5cbiAgfSBlbHNlIHtcbiAgICAvLyBQdWJsaXNoIGFzIGdsb2JhbCAoaW4gYnJvd3NlcnMpXG4gICAgdmFyIF9wcmV2aW91c1Jvb3QgPSBfZ2xvYmFsLnV1aWQ7XG5cbiAgICAvLyAqKmBub0NvbmZsaWN0KClgIC0gKGJyb3dzZXIgb25seSkgdG8gcmVzZXQgZ2xvYmFsICd1dWlkJyB2YXIqKlxuICAgIHV1aWQubm9Db25mbGljdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgX2dsb2JhbC51dWlkID0gX3ByZXZpb3VzUm9vdDtcbiAgICAgIHJldHVybiB1dWlkO1xuICAgIH07XG5cbiAgICBfZ2xvYmFsLnV1aWQgPSB1dWlkO1xuICB9XG59KS5jYWxsKHRoaXMpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgU2VxdWVuY2UxID0ge1xuICAgICdjbGFzc05hbWUnOiAnU2VxdWVuY2UnLFxuICAgICdhc3NldHMnOiBbe1xuICAgICAgICAnY2xhc3NOYW1lJzogJ1RleHRMYXlvdXRBc3NldCcsXG4gICAgICAgICduYW1lJzogJ2JhY2tncm91bmQnLFxuICAgICAgICAnc3RhdGljU3R5bGUnOiB7XG4gICAgICAgICAgICAnYm9yZGVyJzoge1xuICAgICAgICAgICAgICAgICdjb2xvcic6ICcjMDAwMDAwJyxcbiAgICAgICAgICAgICAgICAncmFkaXVzJzogODIuOCxcbiAgICAgICAgICAgICAgICAnc3R5bGUnOiAnc29saWQnLFxuICAgICAgICAgICAgICAgICd3aWR0aCc6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnYm94Jzoge1xuICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kQ29sb3InOiAnI2RmZjRmZScsXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmcnOiAwLFxuICAgICAgICAgICAgICAgICdzaGFkb3dDb2xvcic6ICcjZGZlN2VlJyxcbiAgICAgICAgICAgICAgICAnc2hhZG93U2l6ZSc6IDI0XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ3RleHQnOiB7XG4gICAgICAgICAgICAgICAgJ2FsaWduJzogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgJ2NvbG9yJzogJyM0NzY5OGMnLFxuICAgICAgICAgICAgICAgICdkZWNvcmF0aW9uJzogJ25vbmUnLFxuICAgICAgICAgICAgICAgICdmb250RmFtaWx5JzogJ1JvYm90byBDb25kZW5zZWQnLFxuICAgICAgICAgICAgICAgICdsaW5lSGVpZ2h0JzogMS4yLFxuICAgICAgICAgICAgICAgICdzaXplJzogMjQwLFxuICAgICAgICAgICAgICAgICd3ZWlnaHQnOiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgICAnd2hpdGVTcGFjZSc6ICdub3JtYWwnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICd0ZXh0JzogJycsXG4gICAgICAgICd0ZXh0RWRpdGFibGUnOiBmYWxzZSxcbiAgICAgICAgJ3RpbWUnOiAwLFxuICAgICAgICAndHlwZSc6ICdiYWNrZ3JvdW5kJyxcbiAgICAgICAgJ3Zpc3VhbFN0YXRlcyc6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAnaGVpZ2h0JzogMSxcbiAgICAgICAgICAgICAgICAnb3BhY2l0eSc6IDAsXG4gICAgICAgICAgICAgICAgJ3JlbW92YWJsZSc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICd0aW1lJzogMCxcbiAgICAgICAgICAgICAgICAnd2lkdGgnOiAxLFxuICAgICAgICAgICAgICAgICd4JzogMCxcbiAgICAgICAgICAgICAgICAneSc6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJ2hlaWdodCc6IDEsXG4gICAgICAgICAgICAgICAgJ29wYWNpdHknOiAxLFxuICAgICAgICAgICAgICAgICdyZW1vdmFibGUnOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAndGltZSc6IDQxMCxcbiAgICAgICAgICAgICAgICAnd2lkdGgnOiAxLFxuICAgICAgICAgICAgICAgICd4JzogMCxcbiAgICAgICAgICAgICAgICAneSc6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJ2hlaWdodCc6IDEsXG4gICAgICAgICAgICAgICAgJ29wYWNpdHknOiAxLFxuICAgICAgICAgICAgICAgICdyZW1vdmFibGUnOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAndGltZSc6IDU5NDUsXG4gICAgICAgICAgICAgICAgJ3dpZHRoJzogMSxcbiAgICAgICAgICAgICAgICAneCc6IDAsXG4gICAgICAgICAgICAgICAgJ3knOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICdoZWlnaHQnOiAxLFxuICAgICAgICAgICAgICAgICdvcGFjaXR5JzogMCxcbiAgICAgICAgICAgICAgICAncmVtb3ZhYmxlJzogZmFsc2UsXG4gICAgICAgICAgICAgICAgJ3RpbWUnOiA2MzU1LFxuICAgICAgICAgICAgICAgICd3aWR0aCc6IDEsXG4gICAgICAgICAgICAgICAgJ3gnOiAwLFxuICAgICAgICAgICAgICAgICd5JzogMFxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICAnekluZGV4JzogMFxuICAgIH0sXG4gICAge1xuICAgICAgICAnY2xhc3NOYW1lJzogJ1RleHRMYXlvdXRBc3NldCcsXG4gICAgICAgICduYW1lJzogJ2hlYWRlciBib3gnLFxuICAgICAgICAnc3RhdGljU3R5bGUnOiB7XG4gICAgICAgICAgICAnYm9yZGVyJzoge1xuICAgICAgICAgICAgICAgICdjb2xvcic6ICcjMDAwMDAwJyxcbiAgICAgICAgICAgICAgICAncmFkaXVzJzogMCxcbiAgICAgICAgICAgICAgICAnc3R5bGUnOiAnc29saWQnLFxuICAgICAgICAgICAgICAgICd3aWR0aCc6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnYm94Jzoge1xuICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kQ29sb3InOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICAgICAgICAgICdwYWRkaW5nJzogMCxcbiAgICAgICAgICAgICAgICAnc2hhZG93Q29sb3InOiAnIzAwMDAwMCcsXG4gICAgICAgICAgICAgICAgJ3NoYWRvd1NpemUnOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ3RleHQnOiB7XG4gICAgICAgICAgICAgICAgJ2FsaWduJzogJ2xlZnQnLFxuICAgICAgICAgICAgICAgICdjb2xvcic6ICcjNDc2OThjJyxcbiAgICAgICAgICAgICAgICAnZGVjb3JhdGlvbic6ICdub25lJyxcbiAgICAgICAgICAgICAgICAnZm9udEZhbWlseSc6ICdSb2JvdG8gQ29uZGVuc2VkJyxcbiAgICAgICAgICAgICAgICAnbGluZUhlaWdodCc6IDEuMixcbiAgICAgICAgICAgICAgICAnc2l6ZSc6IDczLFxuICAgICAgICAgICAgICAgICd3ZWlnaHQnOiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgICAnd2hpdGVTcGFjZSc6ICdub3JtYWwnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICd0ZXh0JzogJycsXG4gICAgICAgICd0ZXh0RWRpdGFibGUnOiBmYWxzZSxcbiAgICAgICAgJ3RpbWUnOiAwLFxuICAgICAgICAndHlwZSc6ICdoZWFkJyxcbiAgICAgICAgJ3Zpc3VhbFN0YXRlcyc6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAnaGVpZ2h0JzogMC4wOCxcbiAgICAgICAgICAgICAgICAnb3BhY2l0eSc6IDAsXG4gICAgICAgICAgICAgICAgJ3JlbW92YWJsZSc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICd0aW1lJzogMCxcbiAgICAgICAgICAgICAgICAnd2lkdGgnOiAwLjY3LFxuICAgICAgICAgICAgICAgICd4JzogMC4xLFxuICAgICAgICAgICAgICAgICd5JzogMC4zM1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAnaGVpZ2h0JzogMC4wOCxcbiAgICAgICAgICAgICAgICAnb3BhY2l0eSc6IDEsXG4gICAgICAgICAgICAgICAgJ3JlbW92YWJsZSc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICd0aW1lJzogNDEwLFxuICAgICAgICAgICAgICAgICd3aWR0aCc6IDAuNjcsXG4gICAgICAgICAgICAgICAgJ3gnOiAwLjEsXG4gICAgICAgICAgICAgICAgJ3knOiAwLjMzXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICdoZWlnaHQnOiAwLjA4LFxuICAgICAgICAgICAgICAgICdvcGFjaXR5JzogMSxcbiAgICAgICAgICAgICAgICAncmVtb3ZhYmxlJzogZmFsc2UsXG4gICAgICAgICAgICAgICAgJ3RpbWUnOiA1OTQ1LFxuICAgICAgICAgICAgICAgICd3aWR0aCc6IDAuNjcsXG4gICAgICAgICAgICAgICAgJ3gnOiAwLjEsXG4gICAgICAgICAgICAgICAgJ3knOiAwLjMzXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICdoZWlnaHQnOiAwLjA4LFxuICAgICAgICAgICAgICAgICdvcGFjaXR5JzogMCxcbiAgICAgICAgICAgICAgICAncmVtb3ZhYmxlJzogZmFsc2UsXG4gICAgICAgICAgICAgICAgJ3RpbWUnOiA2MzU1LFxuICAgICAgICAgICAgICAgICd3aWR0aCc6IDAuNjcsXG4gICAgICAgICAgICAgICAgJ3gnOiAwLjEsXG4gICAgICAgICAgICAgICAgJ3knOiAwLjMzXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgICd6SW5kZXgnOiAxXG4gICAgfSxcbiAgICB7XG4gICAgICAgICdjbGFzc05hbWUnOiAnVGV4dExheW91dEFzc2V0JyxcbiAgICAgICAgJ25hbWUnOiAnaGVhZGVyJyxcbiAgICAgICAgJ3N0YXRpY1N0eWxlJzoge1xuICAgICAgICAgICAgJ2JvcmRlcic6IHtcbiAgICAgICAgICAgICAgICAnY29sb3InOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICAgICAgICAgICdyYWRpdXMnOiAwLFxuICAgICAgICAgICAgICAgICdzdHlsZSc6ICdzb2xpZCcsXG4gICAgICAgICAgICAgICAgJ3dpZHRoJzogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdib3gnOiB7XG4gICAgICAgICAgICAgICAgJ2JhY2tncm91bmRDb2xvcic6ICcjZmYwMGZmJyxcbiAgICAgICAgICAgICAgICAncGFkZGluZyc6IDAsXG4gICAgICAgICAgICAgICAgJ3NoYWRvd0NvbG9yJzogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgICAgICAgICAnc2hhZG93U2l6ZSc6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAndGV4dCc6IHtcbiAgICAgICAgICAgICAgICAnYWxpZ24nOiAnbGVmdCcsXG4gICAgICAgICAgICAgICAgJ2NvbG9yJzogJyM0NzY5OGMnLFxuICAgICAgICAgICAgICAgICdkZWNvcmF0aW9uJzogJ25vbmUnLFxuICAgICAgICAgICAgICAgICdmb250RmFtaWx5JzogJ1JvYm90byBDb25kZW5zZWQnLFxuICAgICAgICAgICAgICAgICdsaW5lSGVpZ2h0JzogMS4yLFxuICAgICAgICAgICAgICAgICdzaXplJzogMjQwLFxuICAgICAgICAgICAgICAgICd3ZWlnaHQnOiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgICAnd2hpdGVTcGFjZSc6ICdub3JtYWwnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICd0ZXh0JzogJ0NvbG9ub3Njb3B5JyxcbiAgICAgICAgJ3RleHRFZGl0YWJsZSc6IHRydWUsXG4gICAgICAgICd0aW1lJzogMCxcbiAgICAgICAgJ3R5cGUnOiAnaGVhZCcsXG4gICAgICAgICd2aXN1YWxTdGF0ZXMnOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJ2hlaWdodCc6IDAuMDgsXG4gICAgICAgICAgICAgICAgJ29wYWNpdHknOiAwLFxuICAgICAgICAgICAgICAgICdyZW1vdmFibGUnOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAndGltZSc6IDAsXG4gICAgICAgICAgICAgICAgJ3dpZHRoJzogMC42NyxcbiAgICAgICAgICAgICAgICAneCc6IDAuMTAxNTU4ODQ2NDUzNjI0MzMsXG4gICAgICAgICAgICAgICAgJ3knOiAwLjMyMTY4OTc1MDY5MjUyMDhcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJ2hlaWdodCc6IDAuMDgsXG4gICAgICAgICAgICAgICAgJ29wYWNpdHknOiAxLFxuICAgICAgICAgICAgICAgICdyZW1vdmFibGUnOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAndGltZSc6IDQxMCxcbiAgICAgICAgICAgICAgICAnd2lkdGgnOiAwLjY3LFxuICAgICAgICAgICAgICAgICd4JzogMC4xMDE1NTg4NDY0NTM2MjQzMyxcbiAgICAgICAgICAgICAgICAneSc6IDAuMzIxNjg5NzUwNjkyNTIwOFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAndGltZSc6IDMwMDAsXG4gICAgICAgICAgICAgICAgJ2hlaWdodCc6IDAuMTYsXG4gICAgICAgICAgICAgICAgJ29wYWNpdHknOiAxLFxuICAgICAgICAgICAgICAgICdyZW1vdmFibGUnOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAnd2lkdGgnOiAwLjY3LFxuICAgICAgICAgICAgICAgICd4JzogMSxcbiAgICAgICAgICAgICAgICAneSc6IDAuMzIxNjg5NzUwNjkyNTIwOFxuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICdoZWlnaHQnOiAwLjA4LFxuICAgICAgICAgICAgICAgICdvcGFjaXR5JzogMSxcbiAgICAgICAgICAgICAgICAncmVtb3ZhYmxlJzogZmFsc2UsXG4gICAgICAgICAgICAgICAgJ3RpbWUnOiA1OTQ1LFxuICAgICAgICAgICAgICAgICd3aWR0aCc6IDAuNjcsXG4gICAgICAgICAgICAgICAgJ3gnOiAwLjEwMTU1ODg0NjQ1MzYyNDMzLFxuICAgICAgICAgICAgICAgICd5JzogMC4zMjE2ODk3NTA2OTI1MjA4XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICdoZWlnaHQnOiAwLjA4LFxuICAgICAgICAgICAgICAgICdvcGFjaXR5JzogMCxcbiAgICAgICAgICAgICAgICAncmVtb3ZhYmxlJzogZmFsc2UsXG4gICAgICAgICAgICAgICAgJ3RpbWUnOiA2MzU1LFxuICAgICAgICAgICAgICAgICd3aWR0aCc6IDAuNjcsXG4gICAgICAgICAgICAgICAgJ3gnOiAwLjEwMTU1ODg0NjQ1MzYyNDMzLFxuICAgICAgICAgICAgICAgICd5JzogMC4zMjE2ODk3NTA2OTI1MjA4XG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgICd6SW5kZXgnOiAzXG4gICAgfSxcbiAgICB7XG4gICAgICAgICdjbGFzc05hbWUnOiAnVGV4dExheW91dEFzc2V0JyxcbiAgICAgICAgJ25hbWUnOiAnY29udGVudCBib3gnLFxuICAgICAgICAnc3RhdGljU3R5bGUnOiB7XG4gICAgICAgICAgICAnYm9yZGVyJzoge1xuICAgICAgICAgICAgICAgICdjb2xvcic6ICcjMDAwMDAwJyxcbiAgICAgICAgICAgICAgICAncmFkaXVzJzogMzIsXG4gICAgICAgICAgICAgICAgJ3N0eWxlJzogJ3NvbGlkJyxcbiAgICAgICAgICAgICAgICAnd2lkdGgnOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2JveCc6IHtcbiAgICAgICAgICAgICAgICAnYmFja2dyb3VuZENvbG9yJzogJyNmZmZmZmYnLFxuICAgICAgICAgICAgICAgICdwYWRkaW5nJzogMTYwLFxuICAgICAgICAgICAgICAgICdzaGFkb3dDb2xvcic6ICcjZGJlZGZhJyxcbiAgICAgICAgICAgICAgICAnc2hhZG93U2l6ZSc6IDI0XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ3RleHQnOiB7XG4gICAgICAgICAgICAgICAgJ2FsaWduJzogJ2xlZnQnLFxuICAgICAgICAgICAgICAgICdjb2xvcic6ICcjNDc2OThjJyxcbiAgICAgICAgICAgICAgICAnZGVjb3JhdGlvbic6ICdub25lJyxcbiAgICAgICAgICAgICAgICAnZm9udEZhbWlseSc6ICdSb2JvdG8gQ29uZGVuc2VkJyxcbiAgICAgICAgICAgICAgICAnbGluZUhlaWdodCc6IDEuMixcbiAgICAgICAgICAgICAgICAnc2l6ZSc6IDE2MCxcbiAgICAgICAgICAgICAgICAnd2VpZ2h0JzogJ25vcm1hbCcsXG4gICAgICAgICAgICAgICAgJ3doaXRlU3BhY2UnOiAnbm9ybWFsJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAndGV4dCc6ICcnLFxuICAgICAgICAndGV4dEVkaXRhYmxlJzogZmFsc2UsXG4gICAgICAgICd0aW1lJzogMCxcbiAgICAgICAgJ3R5cGUnOiAnYm94JyxcbiAgICAgICAgJ3Zpc3VhbFN0YXRlcyc6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAnaGVpZ2h0JzogMC40LFxuICAgICAgICAgICAgICAgICdvcGFjaXR5JzogMCxcbiAgICAgICAgICAgICAgICAncmVtb3ZhYmxlJzogZmFsc2UsXG4gICAgICAgICAgICAgICAgJ3RpbWUnOiAwLFxuICAgICAgICAgICAgICAgICd3aWR0aCc6IDAuNjcsXG4gICAgICAgICAgICAgICAgJ3gnOiAwLjEsXG4gICAgICAgICAgICAgICAgJ3knOiAwLjQyXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICdoZWlnaHQnOiAwLjQsXG4gICAgICAgICAgICAgICAgJ29wYWNpdHknOiAxLFxuICAgICAgICAgICAgICAgICdyZW1vdmFibGUnOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAndGltZSc6IDQxMCxcbiAgICAgICAgICAgICAgICAnd2lkdGgnOiAwLjY3LFxuICAgICAgICAgICAgICAgICd4JzogMC4xLFxuICAgICAgICAgICAgICAgICd5JzogMC40MlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAnaGVpZ2h0JzogMC40LFxuICAgICAgICAgICAgICAgICdvcGFjaXR5JzogMSxcbiAgICAgICAgICAgICAgICAncmVtb3ZhYmxlJzogZmFsc2UsXG4gICAgICAgICAgICAgICAgJ3RpbWUnOiA1OTQ1LFxuICAgICAgICAgICAgICAgICd3aWR0aCc6IDAuNjcsXG4gICAgICAgICAgICAgICAgJ3gnOiAwLjEsXG4gICAgICAgICAgICAgICAgJ3knOiAwLjQyXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICdoZWlnaHQnOiAwLjQsXG4gICAgICAgICAgICAgICAgJ29wYWNpdHknOiAwLFxuICAgICAgICAgICAgICAgICdyZW1vdmFibGUnOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAndGltZSc6IDYzNTUsXG4gICAgICAgICAgICAgICAgJ3dpZHRoJzogMC42NyxcbiAgICAgICAgICAgICAgICAneCc6IDAuMSxcbiAgICAgICAgICAgICAgICAneSc6IDAuNDJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgJ3pJbmRleCc6IDJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgJ2NsYXNzTmFtZSc6ICdUZXh0TGF5b3V0QXNzZXQnLFxuICAgICAgICAnbmFtZSc6ICdjb250ZW50JyxcbiAgICAgICAgJ3N0YXRpY1N0eWxlJzoge1xuICAgICAgICAgICAgJ2JvcmRlcic6IHtcbiAgICAgICAgICAgICAgICAnY29sb3InOiAnIzAwMDAwMCcsXG4gICAgICAgICAgICAgICAgJ3JhZGl1cyc6IDMyLFxuICAgICAgICAgICAgICAgICdzdHlsZSc6ICdzb2xpZCcsXG4gICAgICAgICAgICAgICAgJ3dpZHRoJzogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdib3gnOiB7XG4gICAgICAgICAgICAgICAgJ2JhY2tncm91bmRDb2xvcic6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmcnOiAxNjAsXG4gICAgICAgICAgICAgICAgJ3NoYWRvd0NvbG9yJzogJyNkYmVkZmEnLFxuICAgICAgICAgICAgICAgICdzaGFkb3dTaXplJzogMTlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAndGV4dCc6IHtcbiAgICAgICAgICAgICAgICAnYWxpZ24nOiAnbGVmdCcsXG4gICAgICAgICAgICAgICAgJ2NvbG9yJzogJyM0NzY5OGMnLFxuICAgICAgICAgICAgICAgICdkZWNvcmF0aW9uJzogJ25vbmUnLFxuICAgICAgICAgICAgICAgICdmb250RmFtaWx5JzogJ1JvYm90byBDb25kZW5zZWQnLFxuICAgICAgICAgICAgICAgICdsaW5lSGVpZ2h0JzogMS4yLFxuICAgICAgICAgICAgICAgICdzaXplJzogMTYwLFxuICAgICAgICAgICAgICAgICd3ZWlnaHQnOiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgICAnd2hpdGVTcGFjZSc6ICdub3JtYWwnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICd0ZXh0JzogJ1RoZSBnb2FsIG9mIGEgY29sb25vc2NvcHkgaXMgdG8gbG9vayBmb3IgZWFybHkgc2lnbnMgb2YgY29sb24gY2FuY2VyIG9yIG90aGVyIHByb2JsZW1zLicsXG4gICAgICAgICd0ZXh0RWRpdGFibGUnOiB0cnVlLFxuICAgICAgICAndGltZSc6IDAsXG4gICAgICAgICd0eXBlJzogJ2JveCcsXG4gICAgICAgICd2aXN1YWxTdGF0ZXMnOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJ2hlaWdodCc6IDAuNCxcbiAgICAgICAgICAgICAgICAnb3BhY2l0eSc6IDAsXG4gICAgICAgICAgICAgICAgJ3JlbW92YWJsZSc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICd0aW1lJzogMCxcbiAgICAgICAgICAgICAgICAnd2lkdGgnOiAwLjY3LFxuICAgICAgICAgICAgICAgICd4JzogMC4xLFxuICAgICAgICAgICAgICAgICd5JzogMC40MlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAnaGVpZ2h0JzogMC40LFxuICAgICAgICAgICAgICAgICdvcGFjaXR5JzogMSxcbiAgICAgICAgICAgICAgICAncmVtb3ZhYmxlJzogZmFsc2UsXG4gICAgICAgICAgICAgICAgJ3RpbWUnOiA0MTAsXG4gICAgICAgICAgICAgICAgJ3dpZHRoJzogMC42NyxcbiAgICAgICAgICAgICAgICAneCc6IDAuMSxcbiAgICAgICAgICAgICAgICAneSc6IDAuNDJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJ2hlaWdodCc6IDAuNCxcbiAgICAgICAgICAgICAgICAnb3BhY2l0eSc6IDEsXG4gICAgICAgICAgICAgICAgJ3JlbW92YWJsZSc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICd0aW1lJzogNTk0NSxcbiAgICAgICAgICAgICAgICAnd2lkdGgnOiAwLjY3LFxuICAgICAgICAgICAgICAgICd4JzogMC4xLFxuICAgICAgICAgICAgICAgICd5JzogMC40MlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAnaGVpZ2h0JzogMC40LFxuICAgICAgICAgICAgICAgICdvcGFjaXR5JzogMCxcbiAgICAgICAgICAgICAgICAncmVtb3ZhYmxlJzogZmFsc2UsXG4gICAgICAgICAgICAgICAgJ3RpbWUnOiA2MzU1LFxuICAgICAgICAgICAgICAgICd3aWR0aCc6IDAuNjcsXG4gICAgICAgICAgICAgICAgJ3gnOiAwLjEsXG4gICAgICAgICAgICAgICAgJ3knOiAwLjQyXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgICd6SW5kZXgnOiA0XG4gICAgfSxcbiAgICB7XG4gICAgICAgICdjbGFzc05hbWUnOiAnSW1hZ2VBc3NldCcsXG4gICAgICAgICdtZWRpYSc6IHtcbiAgICAgICAgICAgICdmaWxlbmFtZSc6ICdlbW1pLnBuZycsXG4gICAgICAgICAgICAnbWV0YWRhdGEnOiB7XG4gICAgICAgICAgICAgICAgJ3JhdGlvJzogMC43MTc2ODk4NjM2ODc2MDlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnbmFtZSc6ICcyXzA0JyxcbiAgICAgICAgICAgICdwYXRoJzogJycsXG4gICAgICAgICAgICAndHlwZSc6ICdpbWFnZSdcbiAgICAgICAgfSxcbiAgICAgICAgJ25hbWUnOiAnTmV3IGltYWdlJyxcbiAgICAgICAgJ3N0YXRpY1N0eWxlJzoge1xuICAgICAgICAgICAgJ2JvcmRlcic6IHtcbiAgICAgICAgICAgICAgICAnY29sb3InOiAnIzAwMDAwMCcsXG4gICAgICAgICAgICAgICAgJ3JhZGl1cyc6IDAsXG4gICAgICAgICAgICAgICAgJ3N0eWxlJzogJ25vbmUnLFxuICAgICAgICAgICAgICAgICd3aWR0aCc6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnYm94Jzoge1xuICAgICAgICAgICAgICAgICdwYWRkaW5nJzogMCxcbiAgICAgICAgICAgICAgICAnc2hhZG93Q29sb3InOiAnIzAwMDAwMCcsXG4gICAgICAgICAgICAgICAgJ3NoYWRvd1NpemUnOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ3RleHQnOiB7XG4gICAgICAgICAgICAgICAgJ2FsaWduJzogJ2xlZnQnLFxuICAgICAgICAgICAgICAgICdjb2xvcic6ICcjMDAwMDAwJyxcbiAgICAgICAgICAgICAgICAnZGVjb3JhdGlvbic6ICdub25lJyxcbiAgICAgICAgICAgICAgICAnZm9udEZhbWlseSc6ICdSb2JvdG8gQ29uZGVuc2VkJyxcbiAgICAgICAgICAgICAgICAnbGluZUhlaWdodCc6IDEuMixcbiAgICAgICAgICAgICAgICAnc2l6ZSc6IDczLFxuICAgICAgICAgICAgICAgICd3ZWlnaHQnOiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgICAnd2hpdGVTcGFjZSc6ICdub3JtYWwnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICd0aW1lJzogMTIzLFxuICAgICAgICAndHlwZSc6IG51bGwsXG4gICAgICAgICd2aXN1YWxTdGF0ZXMnOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJ2hlaWdodCc6IDAuMzYxNTgzMTM5OTM1MjA2MzUsXG4gICAgICAgICAgICAgICAgJ29wYWNpdHknOiAwLFxuICAgICAgICAgICAgICAgICdyZW1vdmFibGUnOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAndGltZSc6IDEzLFxuICAgICAgICAgICAgICAgICd3aWR0aCc6IDAuMjYwMDAwMzE5NDk3NTkxODQsXG4gICAgICAgICAgICAgICAgJ3gnOiAwLjcyLFxuICAgICAgICAgICAgICAgICd5JzogMC4xXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICdoZWlnaHQnOiAwLjM2MTU4MzEzOTkzNTIwNjM1LFxuICAgICAgICAgICAgICAgICdvcGFjaXR5JzogMSxcbiAgICAgICAgICAgICAgICAncmVtb3ZhYmxlJzogZmFsc2UsXG4gICAgICAgICAgICAgICAgJ3RpbWUnOiA0OTIsXG4gICAgICAgICAgICAgICAgJ3dpZHRoJzogMC4yNjAwMDAzMTk0OTc1OTE4NCxcbiAgICAgICAgICAgICAgICAneCc6IDAuNzIsXG4gICAgICAgICAgICAgICAgJ3knOiAwLjFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJ2hlaWdodCc6IDAuMzYxNTgzMTM5OTM1MjA2MzUsXG4gICAgICAgICAgICAgICAgJ29wYWNpdHknOiAxLFxuICAgICAgICAgICAgICAgICdyZW1vdmFibGUnOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAndGltZSc6IDU3ODEsXG4gICAgICAgICAgICAgICAgJ3dpZHRoJzogMC4yNjAwMDAzMTk0OTc1OTE4NCxcbiAgICAgICAgICAgICAgICAneCc6IDAuNzIsXG4gICAgICAgICAgICAgICAgJ3knOiAwLjFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJ2hlaWdodCc6IDAuMzYxNTgzMTM5OTM1MjA2MzUsXG4gICAgICAgICAgICAgICAgJ29wYWNpdHknOiAwLFxuICAgICAgICAgICAgICAgICdyZW1vdmFibGUnOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAndGltZSc6IDYyMzIsXG4gICAgICAgICAgICAgICAgJ3dpZHRoJzogMC4yNjAwMDAzMTk0OTc1OTE4NCxcbiAgICAgICAgICAgICAgICAneCc6IDAuNzIsXG4gICAgICAgICAgICAgICAgJ3knOiAwLjFcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgJ3pJbmRleCc6IDVcbiAgICB9XSxcbiAgICAnbmFtZSc6IG51bGwsXG4gICAgJ29iamVjdElkJzogMTAzOSxcbiAgICAncGFyZW50T2JqZWN0SWQnOiAxMDE4LFxuICAgICdzY3JlZW5zJzogW3tcbiAgICAgICAgJ3Jvd3MnOiBbIHtcbiAgICAgICAgICAgICdhdWRpb1RleHQnOiAnIE5vdywgYXMgeW91IG1heSBrbm93LCB0aGUgZ29hbCBvZiBhIGNvbG9ub3Njb3B5IGlzIHRvIGxvb2sgZm9yIGVhcmx5IHNpZ25zIG9mIGNvbG9uIGNhbmNlciBvciBvdGhlciBwcm9ibGVtcy4gJm5ic3A7JyxcbiAgICAgICAgICAgICdlbmRUaW1lJzogNjM3MCxcbiAgICAgICAgICAgICdtZWRpYSc6IHtcbiAgICAgICAgICAgICAgICAnZmlsZW5hbWUnOiAnbWVkaWEvYXVkaW8vMl8wNS5tcDMnLFxuICAgICAgICAgICAgICAgICdtZXRhZGF0YSc6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2R1cmF0aW9uJzogNjM3MCxcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAnJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAnMl8wNCcsXG4gICAgICAgICAgICAgICAgJ3BhdGgnOiAnJyxcbiAgICAgICAgICAgICAgICAndHlwZSc6ICdhdWRpbydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnc3RhcnRUaW1lJzogNjc5MCxcbiAgICAgICAgICAgICd3YWl0JzogNDIwXG4gICAgICAgIH0se1xuICAgICAgICAgICAgICAgICdhdWRpb1RleHQnOiAnIE5vdywgYXMgeW91IG1heSBrbm93LCB0aGUgZ29hbCBvZiBhIGNvbG9ub3Njb3B5IGlzIHRvIGxvb2sgZm9yIGVhcmx5IHNpZ25zIG9mIGNvbG9uIGNhbmNlciBvciBvdGhlciBwcm9ibGVtcy4gJm5ic3A7JyxcbiAgICAgICAgICAgICAgICAnZW5kVGltZSc6IDYzNzAsXG4gICAgICAgICAgICAgICAgJ21lZGlhJzoge1xuICAgICAgICAgICAgICAgICAgICAnZmlsZW5hbWUnOiAnbWVkaWEvYXVkaW8vMl8wNC5tcDMnLFxuICAgICAgICAgICAgICAgICAgICAnbWV0YWRhdGEnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnZHVyYXRpb24nOiA2MzcwLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAnJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnbmFtZSc6ICcyXzA0JyxcbiAgICAgICAgICAgICAgICAgICAgJ3BhdGgnOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgJ3R5cGUnOiAnYXVkaW8nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnc3RhcnRUaW1lJzogMCxcbiAgICAgICAgICAgICAgICAnd2FpdCc6IDQyMDBcbiAgICAgICAgfVxuICAgICAgICBdXG4gICAgfV0sXG4gICAgJ3dhaXRBZnRlcic6IDBcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNlcXVlbmNlMTtcbiJdfQ==
