(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var marked0$0 = [Parallel, Serial, Wait, FadeIn, FadeOut, Insert, Remove, Do, IO, PlayAudio].map(regeneratorRuntime.mark);

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _nodeUuid = require('node-uuid');

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
        context$1$0.t0 = context$1$0["catch"](10);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 18:
        context$1$0.prev = 18;
        context$1$0.prev = 19;

        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
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
      case "end":
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
      case "end":
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
        console.log("waited: " + elapsed);

      case 10:
      case "end":
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
      case "end":
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
      case "end":
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
      case "end":
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
      case "end":
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
      case "end":
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
      case "end":
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
      case "end":
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
    key: "update",
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

  function DomAsset(element, innerHTML, style) {
    _classCallCheck(this, DomAsset);

    _get(Object.getPrototypeOf(DomAsset.prototype), "constructor", this).call(this);
    this.element = element;
    this.element.classList.add('asset');
    if (innerHTML !== null) this.element.innerHTML = innerHTML;
    for (var key in style) {
      element.style[key] = style[key];
    }
  }

  return DomAsset;
})(Asset);

var ImageAsset = (function (_DomAsset) {
  _inherits(ImageAsset, _DomAsset);

  function ImageAsset(element, src, style) {
    _classCallCheck(this, ImageAsset);

    _get(Object.getPrototypeOf(ImageAsset.prototype), "constructor", this).call(this, element, null, style);
    this.element.src = src;
  }

  return ImageAsset;
})(DomAsset);

var TextAsset = (function (_DomAsset2) {
  _inherits(TextAsset, _DomAsset2);

  function TextAsset(element, text, style) {
    _classCallCheck(this, TextAsset);

    _get(Object.getPrototypeOf(TextAsset.prototype), "constructor", this).call(this, element, text, style);
  }

  return TextAsset;
})(DomAsset);

var AudioAsset = (function (_Asset2) {
  _inherits(AudioAsset, _Asset2);

  function AudioAsset(src) {
    _classCallCheck(this, AudioAsset);

    _get(Object.getPrototypeOf(AudioAsset.prototype), "constructor", this).call(this);
    this.src = src;
  }

  return AudioAsset;
})(Asset);

var Stage = function Stage(element, style) {
  _classCallCheck(this, Stage);

  this.element = element;
  this.uuid = 'stage';
  for (var key in style) {
    element.style[key] = style[key];
  }
}

//NOTE: UUID is faked here for this example.  In practice schema assets must have UUIDs
;

var program_schema = {
  variables: {
    age: {
      type: "Number",
      min: 0,
      max: 250,
      "default": 20
    }
  },
  sequences: {
    main: {
      connections: [{
        expression: true,
        sequenceName: null
      }],
      assets: [{
        uuid: '123',
        type: 'image',
        src: ['emmi.png'],
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
};

var assets = [new Stage(document.body, {}), new ImageAsset(new Image(), 'emmi.png', {}), new AudioAsset(['test.mp3']), new TextAsset(document.createElement('p'), 'Click the logo to continue', {
  font: '30px ariel, sans-serif',
  color: 'blue'
})];
var tasks = Parallel([Serial([Insert(assets[0], assets[1]), FadeIn(assets[1]), Insert(assets[0], assets[3]), FadeIn(assets[3]), IO(assets[1]), Parallel([Serial([FadeOut(assets[1]), Remove(assets[0], assets[1])]), Serial([FadeOut(assets[3]), Remove(assets[0], assets[3])])])]), PlayAudio(assets[2])]);
var sequence = new Sequence(assets, tasks);
var variables = {
  age: null,
  gender: null
};
var program = new Program(variables, sequence);

window.program = program;
setInterval(makeUpdate(program), TICK_RATE);

},{"node-uuid":2}],2:[function(require,module,exports){
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

},{}]},{},[1]);
