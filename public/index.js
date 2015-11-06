(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var marked0$0 = [Parallel, Serial, Wait, FadeIn, FadeOut, Insert, Remove, Do, IO, PlayAudio].map(regeneratorRuntime.mark);

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _nodeUuid = require('node-uuid');

var _utils = require('./utils');

var _programSchema = require('./programSchema');

var _programSchema2 = _interopRequireDefault(_programSchema);

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

var Sequence = function Sequence(assets, tasks) {
  _classCallCheck(this, Sequence);

  this.assets = assets;
  this.tasks = tasks;
};

var Cache = function Cache() {
  _classCallCheck(this, Cache);

  this.images = {};
  this.audio = {};
};

var Program = (function () {
  function Program(schema) {
    var _this = this;

    _classCallCheck(this, Program);

    var variables = {};

    this.cache = new Cache();
    this.variables = {};

    var _loop = function (key) {
      Object.defineProperty(_this.variables, key, {
        set: function set(val) {
          variables[key] = val;
          (0, _utils.log)('A variable has changed');
          (0, _utils.pp)(variables);
        },
        get: function get() {
          return variables[key];
        }
      });
      _this.variables[key] = schema.variables[key]['default'];
    };

    for (var key in schema.variables) {
      _loop(key);
    }

    this.activeSequence = null;
    this.schema = schema;
  }

  _createClass(Program, [{
    key: 'startSequence',
    value: function startSequence(name) {
      var schema = this.schema.sequences[name];

      if (!schema) throw new Error('No schema named ' + name + ' was found');

      var assets = {};
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = schema.asset[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var asset = _step2.value;

          classifier: switch (asset.type) {
            case 'stage':
              {
                assets[asset.uuid] = new Stage(document.body, (0, _utils.clone)(asset.style));
                break;
              }
            case 'text':
              {
                assets[asset.uuid] = new TextAsset(document.createElement(asset.tag), asset.text, (0, _utils.clone)(asset.style));
                break;
              }
            case 'image':
              {
                assets[asset.uuid] = new ImageAsset(asset.src, (0, _utils.clone)(asset.style));
                break;
              }
            case 'audio':
              {
                assets[asset.uuid] = new AudioAsset(asset.src);
                break;
              }
            default:
              throw new Error('Unrecognized asset type in schema');
          }
        }

        //TODO: temporary
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

      var tasks = Wait(2000);

      this.activeSequence = new Sequence(assets, tasks);
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

var Asset = function Asset(element) {
  _classCallCheck(this, Asset);

  this.uuid = (0, _nodeUuid.v4)();
};

var DomAsset = (function (_Asset) {
  _inherits(DomAsset, _Asset);

  function DomAsset(element, innerHTML, style) {
    _classCallCheck(this, DomAsset);

    _get(Object.getPrototypeOf(DomAsset.prototype), 'constructor', this).call(this);
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

    _get(Object.getPrototypeOf(ImageAsset.prototype), 'constructor', this).call(this, element, null, style);
    this.element.src = src;
  }

  return ImageAsset;
})(DomAsset);

var TextAsset = (function (_DomAsset2) {
  _inherits(TextAsset, _DomAsset2);

  function TextAsset(element, text, style) {
    _classCallCheck(this, TextAsset);

    _get(Object.getPrototypeOf(TextAsset.prototype), 'constructor', this).call(this, element, text, style);
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

var Stage = function Stage(element, style) {
  _classCallCheck(this, Stage);

  this.element = element;
  this.uuid = 'stage';
  for (var key in style) {
    element.style[key] = style[key];
  }
}

/* ARCHIVED FOR REFERENCE -- building from schema now
const assets = {
  stage: new Stage(document.body, {}),
  logo: new ImageAsset(new Image, 'emmi.png', {}),
  introSound: new AudioAsset(['test.mp3']),
  text: new TextAsset(document.createElement('p'), 'Click the logo to continue', {
    font: '30px ariel, sans-serif',
    color: 'blue',
  }),
}
const tasks = Parallel([
  Serial([
    Insert(assets.stage, assets.logo),
    FadeIn(assets.logo), 
    Insert(assets.stage, assets.text),
    FadeIn(assets.text), 
    IO(assets.logo), 
    Parallel([
      Serial([
        FadeOut(assets.logo),
        Remove(assets.stage, assets.logo)
      ]),
      Serial([
        FadeOut(assets.text),
        Remove(assets.stage, assets.text)
      ])
    ])
  ]),
  PlayAudio(assets.introSound),
])
const sequence = new Sequence(assets, tasks)
const variables = {
  age: null,
  gender: null
}
*/
;

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
//NOTE: UUID is faked here for this example.  In practice schema assets must have UUIDs
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {
  resources: {
    images: ['emmi.png'],
    audio: ['test.mp3']
  },
  variables: {
    age: {
      type: "Number",
      min: 0,
      max: 250,
      'default': 20
    }
  },
  sequences: {
    main: {
      connections: [{
        expression: true,
        sequenceName: null
      }],
      assets: [{
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
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pp = pp;
exports.clone = clone;

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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9zdGV2ZW5rYW5lL3Rhc2stcmVuZGVyZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbm9kZS11dWlkL3V1aWQuanMiLCIvVXNlcnMvc3RldmVua2FuZS90YXNrLXJlbmRlcmVyL3Byb2dyYW1TY2hlbWEuanMiLCIvVXNlcnMvc3RldmVua2FuZS90YXNrLXJlbmRlcmVyL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7aUJDb0JXLFFBQVEsRUFlUixNQUFNLEVBV04sSUFBSSxFQVdKLE1BQU0sRUFlTixPQUFPLEVBY1AsTUFBTSxFQUlOLE1BQU0sRUFJTixFQUFFLEVBSUYsRUFBRSxFQVdGLFNBQVM7Ozs7Ozt3QkE3R0ssV0FBVzs7cUJBQ1AsU0FBUzs7NkJBQ1osaUJBQWlCOzs7O0FBRTNDLElBQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQTs7QUFFcEIsU0FBUyxVQUFVLENBQUUsR0FBRyxFQUFFO0FBQ3hCLE1BQUksUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtBQUN6QixNQUFJLFFBQVEsR0FBRyxRQUFRLENBQUE7QUFDdkIsTUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFBOztBQUVWLFNBQU8sWUFBWTtBQUNqQixZQUFRLEdBQUcsUUFBUSxDQUFBO0FBQ25CLFlBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7QUFDckIsTUFBRSxHQUFHLFFBQVEsR0FBRyxRQUFRLENBQUE7O0FBRXhCLE9BQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUE7R0FDZixDQUFBO0NBQ0Y7O0FBRUQsU0FBVyxRQUFRLENBQUUsS0FBSztNQUNwQixJQUFJLEVBQ0osRUFBRSxrRkFLSyxJQUFJOzs7OztBQU5YLFlBQUksR0FBRyxDQUFDO0FBQ1IsVUFBRSxHQUFHLENBQUM7OzthQUVILEtBQUssQ0FBQyxNQUFNOzs7Ozs7Ozs7QUFDakIsVUFBRTs7QUFDRixZQUFJLElBQUksRUFBRSxDQUFBOzs7OztBQUNWLHlCQUFpQixLQUFLLHVIQUFFO0FBQWYsY0FBSTs7QUFDWCxjQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFO0FBQ3RCLGlCQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7V0FDckM7U0FDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQUVKOztBQUVELFNBQVcsTUFBTSxDQUFFLEtBQUs7TUFDbEIsSUFBSSxFQUNKLEVBQUU7Ozs7QUFERixZQUFJLEdBQUcsQ0FBQztBQUNSLFVBQUUsR0FBRyxDQUFDOzs7YUFFSCxLQUFLLENBQUMsTUFBTTs7Ozs7Ozs7O0FBQ2pCLFVBQUU7O0FBQ0YsWUFBSSxJQUFJLEVBQUUsQ0FBQTtBQUNWLFlBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFBOzs7Ozs7Ozs7Q0FFNUM7O0FBRUQsU0FBVyxJQUFJLENBQUUsUUFBUTtNQUNuQixPQUFPLEVBQ1AsRUFBRTs7OztBQURGLGVBQU8sR0FBRyxDQUFDO0FBQ1gsVUFBRSxHQUFHLENBQUM7OztjQUVILE9BQU8sR0FBRyxRQUFRLENBQUE7Ozs7Ozs7OztBQUN2QixVQUFFOztBQUNGLGVBQU8sSUFBSSxFQUFFLENBQUE7Ozs7O0FBRWYsZUFBTyxDQUFDLEdBQUcsY0FBWSxPQUFPLENBQUcsQ0FBQTs7Ozs7OztDQUNsQzs7QUFFRCxTQUFXLE1BQU0sQ0FBRSxRQUFRO01BQ3JCLE9BQU8sRUFDUCxRQUFRLEVBQ1IsRUFBRTs7OztBQUZGLGVBQU8sR0FBRyxDQUFDO0FBQ1gsZ0JBQVEsR0FBRyxHQUFHO0FBQ2QsVUFBRSxHQUFHLENBQUM7Ozs7O0FBRVYsVUFBRTs7QUFDRixlQUFPLElBQUksRUFBRSxDQUFBO0FBQ2IsZ0JBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTs7O2NBRWpDLE9BQU8sR0FBRyxRQUFRLENBQUE7Ozs7Ozs7OztBQUN2QixVQUFFOztBQUNGLGVBQU8sSUFBSSxFQUFFLENBQUE7Ozs7Ozs7OztDQUVoQjs7QUFFRCxTQUFXLE9BQU8sQ0FBRSxRQUFRO01BQ3RCLFNBQVMsRUFDVCxFQUFFOzs7O0FBREYsaUJBQVMsR0FBRyxHQUFHO0FBQ2YsVUFBRSxHQUFHLENBQUM7Ozs7O0FBRVYsVUFBRTs7QUFDRixpQkFBUyxJQUFJLEVBQUUsQ0FBQTtBQUNmLGdCQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7OztjQUVwQyxTQUFTLEdBQUcsQ0FBQyxDQUFBOzs7Ozs7Ozs7QUFDbEIsVUFBRTs7QUFDRixpQkFBUyxJQUFJLEVBQUUsQ0FBQTs7Ozs7Ozs7O0NBRWxCOztBQUVELFNBQVcsTUFBTSxDQUFFLE1BQU0sRUFBRSxRQUFROzs7O0FBQ2pDLGNBQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQTs7Ozs7OztDQUM3Qzs7QUFFRCxTQUFXLE1BQU0sQ0FBRSxNQUFNLEVBQUUsUUFBUTs7OztBQUNqQyxjQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUE7Ozs7Ozs7Q0FDN0M7O0FBRUQsU0FBVyxFQUFFLENBQUUsRUFBRTtvQ0FBSyxNQUFNO0FBQU4sVUFBTTs7Ozs7O0FBQzFCLFVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFBOzs7Ozs7O0NBQ3ZCOztBQUVELFNBQVcsRUFBRSxDQUFFLFFBQVE7TUFDakIsSUFBSSxFQUNKLFFBQVE7Ozs7QUFEUixZQUFJLEdBQUcsS0FBSztBQUNaLGdCQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7aUJBQU0sSUFBSSxHQUFHLElBQUk7U0FBQSxDQUFDOztBQUU1RSxlQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUE7OztZQUNwQyxJQUFJOzs7Ozs7Ozs7Ozs7OztBQUVaLGVBQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQTtBQUM1QyxnQkFBUSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQTs7Ozs7OztDQUMvQzs7QUFFRCxTQUFXLFNBQVMsQ0FBRSxVQUFVO01BQzFCLElBQUksRUFDSixLQUFLOzs7O0FBREwsWUFBSSxHQUFHLEtBQUs7QUFDWixhQUFLLEdBQUcsSUFBSSxJQUFJLENBQUM7QUFDbkIsYUFBRyxFQUFFLFVBQVUsQ0FBQyxHQUFHO0FBQ25CLGVBQUssRUFBRTttQkFBTSxJQUFJLEdBQUcsSUFBSTtXQUFBO1NBQ3pCLENBQUM7O0FBRUYsYUFBSyxDQUFDLElBQUksRUFBRSxDQUFBOzs7WUFDSixJQUFJOzs7Ozs7Ozs7Ozs7O0FBQ1osZUFBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBOzs7Ozs7O0NBQy9COztJQUVLLFFBQVEsR0FDRCxTQURQLFFBQVEsQ0FDQSxNQUFNLEVBQUUsS0FBSyxFQUFFO3dCQUR2QixRQUFROztBQUVWLE1BQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO0FBQ3BCLE1BQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO0NBQ25COztJQUdHLEtBQUssR0FDRSxTQURQLEtBQUssR0FDSzt3QkFEVixLQUFLOztBQUVQLE1BQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFBO0FBQ2hCLE1BQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFBO0NBQ2hCOztJQUdHLE9BQU87QUFDQSxXQURQLE9BQU8sQ0FDQyxNQUFNLEVBQUU7OzswQkFEaEIsT0FBTzs7QUFFVCxRQUFJLFNBQVMsR0FBRyxFQUFFLENBQUE7O0FBRWxCLFFBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUEsQ0FBQTtBQUN0QixRQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQTs7MEJBRVYsR0FBRztBQUNWLFlBQU0sQ0FBQyxjQUFjLENBQUMsTUFBSyxTQUFTLEVBQUUsR0FBRyxFQUFFO0FBQ3pDLFdBQUcsRUFBRSxhQUFVLEdBQUcsRUFBRTtBQUNsQixtQkFBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQTtBQUNwQiwwQkFBSSx3QkFBd0IsQ0FBQyxDQUFBO0FBQzdCLHlCQUFHLFNBQVMsQ0FBQyxDQUFBO1NBQ2Q7QUFDRCxXQUFHLEVBQUUsZUFBWTtBQUNmLGlCQUFPLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtTQUN0QjtPQUNGLENBQUMsQ0FBQTtBQUNGLFlBQUssU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVEsQ0FBQTs7O0FBWHJELFNBQUssSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLFNBQVMsRUFBRTtZQUF6QixHQUFHO0tBWVg7O0FBRUQsUUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUE7QUFDMUIsUUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7R0FDckI7O2VBdkJHLE9BQU87O1dBeUJFLHVCQUFDLElBQUksRUFBRTtBQUNsQixVQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTs7QUFFMUMsVUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLElBQUksS0FBSyxzQkFBb0IsSUFBSSxnQkFBYSxDQUFBOztBQUVqRSxVQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7Ozs7OztBQUNmLDhCQUFrQixNQUFNLENBQUMsS0FBSyxtSUFBRTtjQUF2QixLQUFLOztBQUNaLG9CQUFVLEVBQ1YsUUFBUSxLQUFLLENBQUMsSUFBSTtBQUNoQixpQkFBSyxPQUFPO0FBQUU7QUFDWixzQkFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FDNUIsUUFBUSxDQUFDLElBQUksRUFDYixrQkFBTSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtBQUNyQixzQkFBTTtlQUNQO0FBQUEsQUFDRCxpQkFBSyxNQUFNO0FBQUU7QUFDWCxzQkFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLFNBQVMsQ0FDaEMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQ2pDLEtBQUssQ0FBQyxJQUFJLEVBQ1Ysa0JBQU0sS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7QUFDckIsc0JBQU07ZUFDUDtBQUFBLEFBQ0QsaUJBQUssT0FBTztBQUFFO0FBQ1osc0JBQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxVQUFVLENBQ2pDLEtBQUssQ0FBQyxHQUFHLEVBQUUsa0JBQU0sS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7QUFDaEMsc0JBQU07ZUFDUDtBQUFBLEFBQ0QsaUJBQUssT0FBTztBQUFFO0FBQ1osc0JBQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQzlDLHNCQUFNO2VBQ1A7QUFBQSxBQUNEO0FBQVMsb0JBQU0sSUFBSSxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQTtBQUFBLFdBQzlEO1NBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdELFVBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTs7QUFFdEIsVUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUE7S0FDbEQ7OztXQUVLLGdCQUFDLEVBQUUsRUFBRTtBQUNULFVBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLE9BQU07QUFDaEMsVUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0tBQ25DOzs7U0FyRUcsT0FBTzs7O0lBd0VQLEtBQUssR0FDRSxTQURQLEtBQUssQ0FDRyxPQUFPLEVBQUU7d0JBRGpCLEtBQUs7O0FBRVAsTUFBSSxDQUFDLElBQUksR0FBRyxtQkFBTSxDQUFBO0NBQ25COztJQUdHLFFBQVE7WUFBUixRQUFROztBQUNELFdBRFAsUUFBUSxDQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFOzBCQURuQyxRQUFROztBQUVWLCtCQUZFLFFBQVEsNkNBRUg7QUFDUCxRQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtBQUN0QixRQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDbkMsUUFBSSxTQUFTLEtBQUssSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQTtBQUMxRCxTQUFLLElBQUksR0FBRyxJQUFJLEtBQUssRUFBRTtBQUNyQixhQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtLQUNoQztHQUNGOztTQVRHLFFBQVE7R0FBUyxLQUFLOztJQVl0QixVQUFVO1lBQVYsVUFBVTs7QUFDSCxXQURQLFVBQVUsQ0FDRixPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRTswQkFEN0IsVUFBVTs7QUFFWiwrQkFGRSxVQUFVLDZDQUVOLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFDO0FBQzNCLFFBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtHQUN2Qjs7U0FKRyxVQUFVO0dBQVMsUUFBUTs7SUFPM0IsU0FBUztZQUFULFNBQVM7O0FBQ0YsV0FEUCxTQUFTLENBQ0QsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUU7MEJBRDlCLFNBQVM7O0FBRVgsK0JBRkUsU0FBUyw2Q0FFTCxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBQztHQUM1Qjs7U0FIRyxTQUFTO0dBQVMsUUFBUTs7SUFNMUIsVUFBVTtZQUFWLFVBQVU7O0FBQ0gsV0FEUCxVQUFVLENBQ0YsR0FBRyxFQUFFOzBCQURiLFVBQVU7O0FBRVosK0JBRkUsVUFBVSw2Q0FFTDtBQUNQLFFBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFBO0dBQ2Y7O1NBSkcsVUFBVTtHQUFTLEtBQUs7O0lBT3hCLEtBQUssR0FDRSxTQURQLEtBQUssQ0FDRyxPQUFPLEVBQUUsS0FBSyxFQUFFO3dCQUR4QixLQUFLOztBQUVQLE1BQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO0FBQ3RCLE1BQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFBO0FBQ25CLE9BQUssSUFBSSxHQUFHLElBQUksS0FBSyxFQUFFO0FBQ3JCLFdBQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0dBQ2hDO0NBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1Q0gsSUFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLDRCQUFlLENBQUE7O0FBRTFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO0FBQ3hCLFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUE7OztBQ3RTM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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O0FBRU0sSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7Ozs7O0FBR3JDLFNBQVMsS0FBSyxDQUFFLEdBQUcsRUFBRTtBQUMxQixNQUFJLEdBQUcsR0FBRyxFQUFFLENBQUE7O0FBRVosT0FBSyxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUU7QUFDbkIsUUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7R0FDakQ7QUFDRCxTQUFPLEdBQUcsQ0FBQTtDQUNYIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7djQgYXMgdXVpZH0gZnJvbSAnbm9kZS11dWlkJ1xuaW1wb3J0IHtwcCwgbG9nLCBjbG9uZX0gZnJvbSAnLi91dGlscydcbmltcG9ydCBwcm9ncmFtU2NoZW1hIGZyb20gJy4vcHJvZ3JhbVNjaGVtYSdcblxuY29uc3QgVElDS19SQVRFID0gMjRcblxuZnVuY3Rpb24gbWFrZVVwZGF0ZSAoYXBwKSB7XG4gIGxldCBsYXN0VGltZSA9IERhdGUubm93KClcbiAgbGV0IHRoaXNUaW1lID0gbGFzdFRpbWVcbiAgbGV0IGRUID0gMFxuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgbGFzdFRpbWUgPSB0aGlzVGltZVxuICAgIHRoaXNUaW1lID0gRGF0ZS5ub3coKVxuICAgIGRUID0gdGhpc1RpbWUgLSBsYXN0VGltZVxuXG4gICAgYXBwLnVwZGF0ZShkVClcbiAgfVxufVxuXG5mdW5jdGlvbiAqIFBhcmFsbGVsICh0YXNrcykge1xuICBsZXQgdGltZSA9IDBcbiAgbGV0IGRUID0gMFxuXG4gIHdoaWxlICh0YXNrcy5sZW5ndGgpIHtcbiAgICBkVCA9IHlpZWxkXG4gICAgdGltZSArPSBkVFxuICAgIGZvciAobGV0IHRhc2sgb2YgdGFza3MpIHtcbiAgICAgIGlmICh0YXNrLm5leHQoZFQpLmRvbmUpIHtcbiAgICAgICAgdGFza3Muc3BsaWNlKHRhc2tzLmluZGV4T2YodGFzayksIDEpXG4gICAgICB9XG4gICAgfSBcbiAgfVxufVxuXG5mdW5jdGlvbiAqIFNlcmlhbCAodGFza3MpIHtcbiAgbGV0IHRpbWUgPSAwXG4gIGxldCBkVCA9IDBcblxuICB3aGlsZSAodGFza3MubGVuZ3RoKSB7XG4gICAgZFQgPSB5aWVsZFxuICAgIHRpbWUgKz0gZFRcbiAgICBpZiAodGFza3NbMF0ubmV4dChkVCkuZG9uZSkgdGFza3Muc2hpZnQoKVxuICB9XG59XG5cbmZ1bmN0aW9uICogV2FpdCAoZHVyYXRpb24pIHtcbiAgbGV0IGVsYXBzZWQgPSAwIFxuICBsZXQgZFQgPSAwXG5cbiAgd2hpbGUgKGVsYXBzZWQgPCBkdXJhdGlvbikge1xuICAgIGRUID0geWllbGRcbiAgICBlbGFwc2VkICs9IGRUIFxuICB9XG4gIGNvbnNvbGUubG9nKGB3YWl0ZWQ6ICR7ZWxhcHNlZH1gKVxufVxuXG5mdW5jdGlvbiAqIEZhZGVJbiAoZG9tQXNzZXQpIHtcbiAgbGV0IGVsYXBzZWQgPSAwXG4gIGxldCBkdXJhdGlvbiA9IDUwMFxuICBsZXQgZFQgPSAwXG5cbiAgZFQgPSB5aWVsZFxuICBlbGFwc2VkICs9IGRUIFxuICBkb21Bc3NldC5lbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIilcblxuICB3aGlsZSAoZWxhcHNlZCA8IGR1cmF0aW9uKSB7XG4gICAgZFQgPSB5aWVsZFxuICAgIGVsYXBzZWQgKz0gZFQgXG4gIH1cbn1cblxuZnVuY3Rpb24gKiBGYWRlT3V0IChkb21Bc3NldCkge1xuICBsZXQgcmVtYWluaW5nID0gNTAwIFxuICBsZXQgZFQgPSAwXG5cbiAgZFQgPSB5aWVsZFxuICByZW1haW5pbmcgLT0gZFQgXG4gIGRvbUFzc2V0LmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKVxuXG4gIHdoaWxlIChyZW1haW5pbmcgPiAwKSB7XG4gICAgZFQgPSB5aWVsZFxuICAgIHJlbWFpbmluZyAtPSBkVCBcbiAgfVxufVxuXG5mdW5jdGlvbiAqIEluc2VydCAocGFyZW50LCBkb21Bc3NldCkge1xuICBwYXJlbnQuZWxlbWVudC5hcHBlbmRDaGlsZChkb21Bc3NldC5lbGVtZW50KVxufVxuXG5mdW5jdGlvbiAqIFJlbW92ZSAocGFyZW50LCBkb21Bc3NldCkge1xuICBwYXJlbnQuZWxlbWVudC5yZW1vdmVDaGlsZChkb21Bc3NldC5lbGVtZW50KVxufVxuXG5mdW5jdGlvbiAqIERvIChmbiwgLi4ucGFyYW1zKSB7XG4gIGZuLmFwcGx5KG51bGwsIHBhcmFtcylcbn1cblxuZnVuY3Rpb24gKiBJTyAoZG9tQXNzZXQpIHtcbiAgbGV0IGRvbmUgPSBmYWxzZSAgXG4gIGxldCBsaXN0ZW5lciA9IGRvbUFzc2V0LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBkb25lID0gdHJ1ZSlcblxuICBjb25zb2xlLmxvZygncGxlYXNlIGludGVyYWN0IHdpdGggdGhlIHBhZ2UnKVxuICB3aGlsZSAoIWRvbmUpIHlpZWxkXG5cbiAgY29uc29sZS5sb2coJ3RoYW5rcyBmb3IgeW91ciBwYXJ0aWNpcGF0aW9uJylcbiAgZG9tQXNzZXQuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyKVxufVxuXG5mdW5jdGlvbiAqIFBsYXlBdWRpbyAoYXVkaW9Bc3NldCkge1xuICBsZXQgZG9uZSA9IGZhbHNlXG4gIGxldCBzb3VuZCA9IG5ldyBIb3dsKHtcbiAgICBzcmM6IGF1ZGlvQXNzZXQuc3JjLFxuICAgIG9uZW5kOiAoKSA9PiBkb25lID0gdHJ1ZVxuICB9KVxuXG4gIHNvdW5kLnBsYXkoKVxuICB3aGlsZSAoIWRvbmUpIHlpZWxkXG4gIGNvbnNvbGUubG9nKCdhdWRpbyBjb21wbGV0ZWQnKVxufVxuXG5jbGFzcyBTZXF1ZW5jZSB7XG4gIGNvbnN0cnVjdG9yKGFzc2V0cywgdGFza3MpIHtcbiAgICB0aGlzLmFzc2V0cyA9IGFzc2V0c1xuICAgIHRoaXMudGFza3MgPSB0YXNrc1xuICB9XG59XG5cbmNsYXNzIENhY2hlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pbWFnZXMgPSB7fVxuICAgIHRoaXMuYXVkaW8gPSB7fVxuICB9XG59XG5cbmNsYXNzIFByb2dyYW0ge1xuICBjb25zdHJ1Y3RvcihzY2hlbWEpIHtcbiAgICBsZXQgdmFyaWFibGVzID0ge31cblxuICAgIHRoaXMuY2FjaGUgPSBuZXcgQ2FjaGVcbiAgICB0aGlzLnZhcmlhYmxlcyA9IHt9XG5cbiAgICBmb3IgKGxldCBrZXkgaW4gc2NoZW1hLnZhcmlhYmxlcykge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMudmFyaWFibGVzLCBrZXksIHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgdmFyaWFibGVzW2tleV0gPSB2YWxcbiAgICAgICAgICBsb2coJ0EgdmFyaWFibGUgaGFzIGNoYW5nZWQnKVxuICAgICAgICAgIHBwKHZhcmlhYmxlcykgXG4gICAgICAgIH0sXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiB2YXJpYWJsZXNba2V5XVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy52YXJpYWJsZXNba2V5XSA9IHNjaGVtYS52YXJpYWJsZXNba2V5XS5kZWZhdWx0XG4gICAgfVxuXG4gICAgdGhpcy5hY3RpdmVTZXF1ZW5jZSA9IG51bGxcbiAgICB0aGlzLnNjaGVtYSA9IHNjaGVtYSBcbiAgfVxuXG4gIHN0YXJ0U2VxdWVuY2UobmFtZSkge1xuICAgIGNvbnN0IHNjaGVtYSA9IHRoaXMuc2NoZW1hLnNlcXVlbmNlc1tuYW1lXSBcblxuICAgIGlmICghc2NoZW1hKSB0aHJvdyBuZXcgRXJyb3IoYE5vIHNjaGVtYSBuYW1lZCAke25hbWV9IHdhcyBmb3VuZGApXG5cbiAgICBsZXQgYXNzZXRzID0ge31cbiAgICBmb3IgKGxldCBhc3NldCBvZiBzY2hlbWEuYXNzZXQpIHtcbiAgICAgIGNsYXNzaWZpZXI6XG4gICAgICBzd2l0Y2ggKGFzc2V0LnR5cGUpIHtcbiAgICAgICAgY2FzZSAnc3RhZ2UnOiB7XG4gICAgICAgICAgYXNzZXRzW2Fzc2V0LnV1aWRdID0gbmV3IFN0YWdlKFxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keSwgXG4gICAgICAgICAgICBjbG9uZShhc3NldC5zdHlsZSkpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAndGV4dCc6IHtcbiAgICAgICAgICBhc3NldHNbYXNzZXQudXVpZF0gPSBuZXcgVGV4dEFzc2V0KFxuICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChhc3NldC50YWcpLFxuICAgICAgICAgICAgYXNzZXQudGV4dCxcbiAgICAgICAgICAgIGNsb25lKGFzc2V0LnN0eWxlKSlcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfSBcbiAgICAgICAgY2FzZSAnaW1hZ2UnOiB7XG4gICAgICAgICAgYXNzZXRzW2Fzc2V0LnV1aWRdID0gbmV3IEltYWdlQXNzZXQoXG4gICAgICAgICAgICBhc3NldC5zcmMsIGNsb25lKGFzc2V0LnN0eWxlKSlcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdhdWRpbyc6IHtcbiAgICAgICAgICBhc3NldHNbYXNzZXQudXVpZF0gPSBuZXcgQXVkaW9Bc3NldChhc3NldC5zcmMpIFxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcignVW5yZWNvZ25pemVkIGFzc2V0IHR5cGUgaW4gc2NoZW1hJylcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvL1RPRE86IHRlbXBvcmFyeVxuICAgIGxldCB0YXNrcyA9IFdhaXQoMjAwMClcblxuICAgIHRoaXMuYWN0aXZlU2VxdWVuY2UgPSBuZXcgU2VxdWVuY2UoYXNzZXRzLCB0YXNrcylcbiAgfVxuXG4gIHVwZGF0ZShkVCkge1xuICAgIGlmICghdGhpcy5hY3RpdmVTZXF1ZW5jZSkgcmV0dXJuXG4gICAgdGhpcy5hY3RpdmVTZXF1ZW5jZS50YXNrcy5uZXh0KGRUKVxuICB9XG59XG5cbmNsYXNzIEFzc2V0IHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHRoaXMudXVpZCA9IHV1aWQoKSBcbiAgfVxufVxuXG5jbGFzcyBEb21Bc3NldCBleHRlbmRzIEFzc2V0IHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgaW5uZXJIVE1MLCBzdHlsZSkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50XG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Fzc2V0JylcbiAgICBpZiAoaW5uZXJIVE1MICE9PSBudWxsKSB0aGlzLmVsZW1lbnQuaW5uZXJIVE1MID0gaW5uZXJIVE1MXG4gICAgZm9yIChsZXQga2V5IGluIHN0eWxlKSB7XG4gICAgICBlbGVtZW50LnN0eWxlW2tleV0gPSBzdHlsZVtrZXldIFxuICAgIH1cbiAgfVxufVxuXG5jbGFzcyBJbWFnZUFzc2V0IGV4dGVuZHMgRG9tQXNzZXQge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBzcmMsIHN0eWxlKSB7XG4gICAgc3VwZXIoZWxlbWVudCwgbnVsbCwgc3R5bGUpIFxuICAgIHRoaXMuZWxlbWVudC5zcmMgPSBzcmNcbiAgfVxufVxuXG5jbGFzcyBUZXh0QXNzZXQgZXh0ZW5kcyBEb21Bc3NldCB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIHRleHQsIHN0eWxlKSB7XG4gICAgc3VwZXIoZWxlbWVudCwgdGV4dCwgc3R5bGUpXG4gIH1cbn1cblxuY2xhc3MgQXVkaW9Bc3NldCBleHRlbmRzIEFzc2V0IHtcbiAgY29uc3RydWN0b3Ioc3JjKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuc3JjID0gc3JjXG4gIH1cbn1cblxuY2xhc3MgU3RhZ2Uge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBzdHlsZSkge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnRcbiAgICB0aGlzLnV1aWQgPSAnc3RhZ2UnXG4gICAgZm9yIChsZXQga2V5IGluIHN0eWxlKSB7XG4gICAgICBlbGVtZW50LnN0eWxlW2tleV0gPSBzdHlsZVtrZXldIFxuICAgIH1cbiAgfVxufVxuXG4vKiBBUkNISVZFRCBGT1IgUkVGRVJFTkNFIC0tIGJ1aWxkaW5nIGZyb20gc2NoZW1hIG5vd1xuY29uc3QgYXNzZXRzID0ge1xuICBzdGFnZTogbmV3IFN0YWdlKGRvY3VtZW50LmJvZHksIHt9KSxcbiAgbG9nbzogbmV3IEltYWdlQXNzZXQobmV3IEltYWdlLCAnZW1taS5wbmcnLCB7fSksXG4gIGludHJvU291bmQ6IG5ldyBBdWRpb0Fzc2V0KFsndGVzdC5tcDMnXSksXG4gIHRleHQ6IG5ldyBUZXh0QXNzZXQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpLCAnQ2xpY2sgdGhlIGxvZ28gdG8gY29udGludWUnLCB7XG4gICAgZm9udDogJzMwcHggYXJpZWwsIHNhbnMtc2VyaWYnLFxuICAgIGNvbG9yOiAnYmx1ZScsXG4gIH0pLFxufVxuY29uc3QgdGFza3MgPSBQYXJhbGxlbChbXG4gIFNlcmlhbChbXG4gICAgSW5zZXJ0KGFzc2V0cy5zdGFnZSwgYXNzZXRzLmxvZ28pLFxuICAgIEZhZGVJbihhc3NldHMubG9nbyksIFxuICAgIEluc2VydChhc3NldHMuc3RhZ2UsIGFzc2V0cy50ZXh0KSxcbiAgICBGYWRlSW4oYXNzZXRzLnRleHQpLCBcbiAgICBJTyhhc3NldHMubG9nbyksIFxuICAgIFBhcmFsbGVsKFtcbiAgICAgIFNlcmlhbChbXG4gICAgICAgIEZhZGVPdXQoYXNzZXRzLmxvZ28pLFxuICAgICAgICBSZW1vdmUoYXNzZXRzLnN0YWdlLCBhc3NldHMubG9nbylcbiAgICAgIF0pLFxuICAgICAgU2VyaWFsKFtcbiAgICAgICAgRmFkZU91dChhc3NldHMudGV4dCksXG4gICAgICAgIFJlbW92ZShhc3NldHMuc3RhZ2UsIGFzc2V0cy50ZXh0KVxuICAgICAgXSlcbiAgICBdKVxuICBdKSxcbiAgUGxheUF1ZGlvKGFzc2V0cy5pbnRyb1NvdW5kKSxcbl0pXG5jb25zdCBzZXF1ZW5jZSA9IG5ldyBTZXF1ZW5jZShhc3NldHMsIHRhc2tzKVxuY29uc3QgdmFyaWFibGVzID0ge1xuICBhZ2U6IG51bGwsXG4gIGdlbmRlcjogbnVsbFxufVxuKi9cbmNvbnN0IHByb2dyYW0gPSBuZXcgUHJvZ3JhbShwcm9ncmFtU2NoZW1hKVxuXG53aW5kb3cucHJvZ3JhbSA9IHByb2dyYW1cbnNldEludGVydmFsKG1ha2VVcGRhdGUocHJvZ3JhbSksIFRJQ0tfUkFURSlcbiIsIi8vICAgICB1dWlkLmpzXG4vL1xuLy8gICAgIENvcHlyaWdodCAoYykgMjAxMC0yMDEyIFJvYmVydCBLaWVmZmVyXG4vLyAgICAgTUlUIExpY2Vuc2UgLSBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cbihmdW5jdGlvbigpIHtcbiAgdmFyIF9nbG9iYWwgPSB0aGlzO1xuXG4gIC8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuICBXZSBmZWF0dXJlXG4gIC8vIGRldGVjdCB0byBkZXRlcm1pbmUgdGhlIGJlc3QgUk5HIHNvdXJjZSwgbm9ybWFsaXppbmcgdG8gYSBmdW5jdGlvbiB0aGF0XG4gIC8vIHJldHVybnMgMTI4LWJpdHMgb2YgcmFuZG9tbmVzcywgc2luY2UgdGhhdCdzIHdoYXQncyB1c3VhbGx5IHJlcXVpcmVkXG4gIHZhciBfcm5nO1xuXG4gIC8vIE5vZGUuanMgY3J5cHRvLWJhc2VkIFJORyAtIGh0dHA6Ly9ub2RlanMub3JnL2RvY3MvdjAuNi4yL2FwaS9jcnlwdG8uaHRtbFxuICAvL1xuICAvLyBNb2RlcmF0ZWx5IGZhc3QsIGhpZ2ggcXVhbGl0eVxuICBpZiAodHlwZW9mKF9nbG9iYWwucmVxdWlyZSkgPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRyeSB7XG4gICAgICB2YXIgX3JiID0gX2dsb2JhbC5yZXF1aXJlKCdjcnlwdG8nKS5yYW5kb21CeXRlcztcbiAgICAgIF9ybmcgPSBfcmIgJiYgZnVuY3Rpb24oKSB7cmV0dXJuIF9yYigxNik7fTtcbiAgICB9IGNhdGNoKGUpIHt9XG4gIH1cblxuICBpZiAoIV9ybmcgJiYgX2dsb2JhbC5jcnlwdG8gJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcykge1xuICAgIC8vIFdIQVRXRyBjcnlwdG8tYmFzZWQgUk5HIC0gaHR0cDovL3dpa2kud2hhdHdnLm9yZy93aWtpL0NyeXB0b1xuICAgIC8vXG4gICAgLy8gTW9kZXJhdGVseSBmYXN0LCBoaWdoIHF1YWxpdHlcbiAgICB2YXIgX3JuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuICAgIF9ybmcgPSBmdW5jdGlvbiB3aGF0d2dSTkcoKSB7XG4gICAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKF9ybmRzOCk7XG4gICAgICByZXR1cm4gX3JuZHM4O1xuICAgIH07XG4gIH1cblxuICBpZiAoIV9ybmcpIHtcbiAgICAvLyBNYXRoLnJhbmRvbSgpLWJhc2VkIChSTkcpXG4gICAgLy9cbiAgICAvLyBJZiBhbGwgZWxzZSBmYWlscywgdXNlIE1hdGgucmFuZG9tKCkuICBJdCdzIGZhc3QsIGJ1dCBpcyBvZiB1bnNwZWNpZmllZFxuICAgIC8vIHF1YWxpdHkuXG4gICAgdmFyICBfcm5kcyA9IG5ldyBBcnJheSgxNik7XG4gICAgX3JuZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIHI7IGkgPCAxNjsgaSsrKSB7XG4gICAgICAgIGlmICgoaSAmIDB4MDMpID09PSAwKSByID0gTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwO1xuICAgICAgICBfcm5kc1tpXSA9IHIgPj4+ICgoaSAmIDB4MDMpIDw8IDMpICYgMHhmZjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF9ybmRzO1xuICAgIH07XG4gIH1cblxuICAvLyBCdWZmZXIgY2xhc3MgdG8gdXNlXG4gIHZhciBCdWZmZXJDbGFzcyA9IHR5cGVvZihfZ2xvYmFsLkJ1ZmZlcikgPT0gJ2Z1bmN0aW9uJyA/IF9nbG9iYWwuQnVmZmVyIDogQXJyYXk7XG5cbiAgLy8gTWFwcyBmb3IgbnVtYmVyIDwtPiBoZXggc3RyaW5nIGNvbnZlcnNpb25cbiAgdmFyIF9ieXRlVG9IZXggPSBbXTtcbiAgdmFyIF9oZXhUb0J5dGUgPSB7fTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7IGkrKykge1xuICAgIF9ieXRlVG9IZXhbaV0gPSAoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpO1xuICAgIF9oZXhUb0J5dGVbX2J5dGVUb0hleFtpXV0gPSBpO1xuICB9XG5cbiAgLy8gKipgcGFyc2UoKWAgLSBQYXJzZSBhIFVVSUQgaW50byBpdCdzIGNvbXBvbmVudCBieXRlcyoqXG4gIGZ1bmN0aW9uIHBhcnNlKHMsIGJ1Ziwgb2Zmc2V0KSB7XG4gICAgdmFyIGkgPSAoYnVmICYmIG9mZnNldCkgfHwgMCwgaWkgPSAwO1xuXG4gICAgYnVmID0gYnVmIHx8IFtdO1xuICAgIHMudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bMC05YS1mXXsyfS9nLCBmdW5jdGlvbihvY3QpIHtcbiAgICAgIGlmIChpaSA8IDE2KSB7IC8vIERvbid0IG92ZXJmbG93IVxuICAgICAgICBidWZbaSArIGlpKytdID0gX2hleFRvQnl0ZVtvY3RdO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gWmVybyBvdXQgcmVtYWluaW5nIGJ5dGVzIGlmIHN0cmluZyB3YXMgc2hvcnRcbiAgICB3aGlsZSAoaWkgPCAxNikge1xuICAgICAgYnVmW2kgKyBpaSsrXSA9IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZjtcbiAgfVxuXG4gIC8vICoqYHVucGFyc2UoKWAgLSBDb252ZXJ0IFVVSUQgYnl0ZSBhcnJheSAoYWxhIHBhcnNlKCkpIGludG8gYSBzdHJpbmcqKlxuICBmdW5jdGlvbiB1bnBhcnNlKGJ1Ziwgb2Zmc2V0KSB7XG4gICAgdmFyIGkgPSBvZmZzZXQgfHwgMCwgYnRoID0gX2J5dGVUb0hleDtcbiAgICByZXR1cm4gIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dO1xuICB9XG5cbiAgLy8gKipgdjEoKWAgLSBHZW5lcmF0ZSB0aW1lLWJhc2VkIFVVSUQqKlxuICAvL1xuICAvLyBJbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vTGlvc0svVVVJRC5qc1xuICAvLyBhbmQgaHR0cDovL2RvY3MucHl0aG9uLm9yZy9saWJyYXJ5L3V1aWQuaHRtbFxuXG4gIC8vIHJhbmRvbSAjJ3Mgd2UgbmVlZCB0byBpbml0IG5vZGUgYW5kIGNsb2Nrc2VxXG4gIHZhciBfc2VlZEJ5dGVzID0gX3JuZygpO1xuXG4gIC8vIFBlciA0LjUsIGNyZWF0ZSBhbmQgNDgtYml0IG5vZGUgaWQsICg0NyByYW5kb20gYml0cyArIG11bHRpY2FzdCBiaXQgPSAxKVxuICB2YXIgX25vZGVJZCA9IFtcbiAgICBfc2VlZEJ5dGVzWzBdIHwgMHgwMSxcbiAgICBfc2VlZEJ5dGVzWzFdLCBfc2VlZEJ5dGVzWzJdLCBfc2VlZEJ5dGVzWzNdLCBfc2VlZEJ5dGVzWzRdLCBfc2VlZEJ5dGVzWzVdXG4gIF07XG5cbiAgLy8gUGVyIDQuMi4yLCByYW5kb21pemUgKDE0IGJpdCkgY2xvY2tzZXFcbiAgdmFyIF9jbG9ja3NlcSA9IChfc2VlZEJ5dGVzWzZdIDw8IDggfCBfc2VlZEJ5dGVzWzddKSAmIDB4M2ZmZjtcblxuICAvLyBQcmV2aW91cyB1dWlkIGNyZWF0aW9uIHRpbWVcbiAgdmFyIF9sYXN0TVNlY3MgPSAwLCBfbGFzdE5TZWNzID0gMDtcblxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2Jyb29mYS9ub2RlLXV1aWQgZm9yIEFQSSBkZXRhaWxzXG4gIGZ1bmN0aW9uIHYxKG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gICAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG4gICAgdmFyIGIgPSBidWYgfHwgW107XG5cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIHZhciBjbG9ja3NlcSA9IG9wdGlvbnMuY2xvY2tzZXEgIT0gbnVsbCA/IG9wdGlvbnMuY2xvY2tzZXEgOiBfY2xvY2tzZXE7XG5cbiAgICAvLyBVVUlEIHRpbWVzdGFtcHMgYXJlIDEwMCBuYW5vLXNlY29uZCB1bml0cyBzaW5jZSB0aGUgR3JlZ29yaWFuIGVwb2NoLFxuICAgIC8vICgxNTgyLTEwLTE1IDAwOjAwKS4gIEpTTnVtYmVycyBhcmVuJ3QgcHJlY2lzZSBlbm91Z2ggZm9yIHRoaXMsIHNvXG4gICAgLy8gdGltZSBpcyBoYW5kbGVkIGludGVybmFsbHkgYXMgJ21zZWNzJyAoaW50ZWdlciBtaWxsaXNlY29uZHMpIGFuZCAnbnNlY3MnXG4gICAgLy8gKDEwMC1uYW5vc2Vjb25kcyBvZmZzZXQgZnJvbSBtc2Vjcykgc2luY2UgdW5peCBlcG9jaCwgMTk3MC0wMS0wMSAwMDowMC5cbiAgICB2YXIgbXNlY3MgPSBvcHRpb25zLm1zZWNzICE9IG51bGwgPyBvcHRpb25zLm1zZWNzIDogbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAvLyBQZXIgNC4yLjEuMiwgdXNlIGNvdW50IG9mIHV1aWQncyBnZW5lcmF0ZWQgZHVyaW5nIHRoZSBjdXJyZW50IGNsb2NrXG4gICAgLy8gY3ljbGUgdG8gc2ltdWxhdGUgaGlnaGVyIHJlc29sdXRpb24gY2xvY2tcbiAgICB2YXIgbnNlY3MgPSBvcHRpb25zLm5zZWNzICE9IG51bGwgPyBvcHRpb25zLm5zZWNzIDogX2xhc3ROU2VjcyArIDE7XG5cbiAgICAvLyBUaW1lIHNpbmNlIGxhc3QgdXVpZCBjcmVhdGlvbiAoaW4gbXNlY3MpXG4gICAgdmFyIGR0ID0gKG1zZWNzIC0gX2xhc3RNU2VjcykgKyAobnNlY3MgLSBfbGFzdE5TZWNzKS8xMDAwMDtcblxuICAgIC8vIFBlciA0LjIuMS4yLCBCdW1wIGNsb2Nrc2VxIG9uIGNsb2NrIHJlZ3Jlc3Npb25cbiAgICBpZiAoZHQgPCAwICYmIG9wdGlvbnMuY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgICAgY2xvY2tzZXEgPSBjbG9ja3NlcSArIDEgJiAweDNmZmY7XG4gICAgfVxuXG4gICAgLy8gUmVzZXQgbnNlY3MgaWYgY2xvY2sgcmVncmVzc2VzIChuZXcgY2xvY2tzZXEpIG9yIHdlJ3ZlIG1vdmVkIG9udG8gYSBuZXdcbiAgICAvLyB0aW1lIGludGVydmFsXG4gICAgaWYgKChkdCA8IDAgfHwgbXNlY3MgPiBfbGFzdE1TZWNzKSAmJiBvcHRpb25zLm5zZWNzID09IG51bGwpIHtcbiAgICAgIG5zZWNzID0gMDtcbiAgICB9XG5cbiAgICAvLyBQZXIgNC4yLjEuMiBUaHJvdyBlcnJvciBpZiB0b28gbWFueSB1dWlkcyBhcmUgcmVxdWVzdGVkXG4gICAgaWYgKG5zZWNzID49IDEwMDAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3V1aWQudjEoKTogQ2FuXFwndCBjcmVhdGUgbW9yZSB0aGFuIDEwTSB1dWlkcy9zZWMnKTtcbiAgICB9XG5cbiAgICBfbGFzdE1TZWNzID0gbXNlY3M7XG4gICAgX2xhc3ROU2VjcyA9IG5zZWNzO1xuICAgIF9jbG9ja3NlcSA9IGNsb2Nrc2VxO1xuXG4gICAgLy8gUGVyIDQuMS40IC0gQ29udmVydCBmcm9tIHVuaXggZXBvY2ggdG8gR3JlZ29yaWFuIGVwb2NoXG4gICAgbXNlY3MgKz0gMTIyMTkyOTI4MDAwMDA7XG5cbiAgICAvLyBgdGltZV9sb3dgXG4gICAgdmFyIHRsID0gKChtc2VjcyAmIDB4ZmZmZmZmZikgKiAxMDAwMCArIG5zZWNzKSAlIDB4MTAwMDAwMDAwO1xuICAgIGJbaSsrXSA9IHRsID4+PiAyNCAmIDB4ZmY7XG4gICAgYltpKytdID0gdGwgPj4+IDE2ICYgMHhmZjtcbiAgICBiW2krK10gPSB0bCA+Pj4gOCAmIDB4ZmY7XG4gICAgYltpKytdID0gdGwgJiAweGZmO1xuXG4gICAgLy8gYHRpbWVfbWlkYFxuICAgIHZhciB0bWggPSAobXNlY3MgLyAweDEwMDAwMDAwMCAqIDEwMDAwKSAmIDB4ZmZmZmZmZjtcbiAgICBiW2krK10gPSB0bWggPj4+IDggJiAweGZmO1xuICAgIGJbaSsrXSA9IHRtaCAmIDB4ZmY7XG5cbiAgICAvLyBgdGltZV9oaWdoX2FuZF92ZXJzaW9uYFxuICAgIGJbaSsrXSA9IHRtaCA+Pj4gMjQgJiAweGYgfCAweDEwOyAvLyBpbmNsdWRlIHZlcnNpb25cbiAgICBiW2krK10gPSB0bWggPj4+IDE2ICYgMHhmZjtcblxuICAgIC8vIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYCAoUGVyIDQuMi4yIC0gaW5jbHVkZSB2YXJpYW50KVxuICAgIGJbaSsrXSA9IGNsb2Nrc2VxID4+PiA4IHwgMHg4MDtcblxuICAgIC8vIGBjbG9ja19zZXFfbG93YFxuICAgIGJbaSsrXSA9IGNsb2Nrc2VxICYgMHhmZjtcblxuICAgIC8vIGBub2RlYFxuICAgIHZhciBub2RlID0gb3B0aW9ucy5ub2RlIHx8IF9ub2RlSWQ7XG4gICAgZm9yICh2YXIgbiA9IDA7IG4gPCA2OyBuKyspIHtcbiAgICAgIGJbaSArIG5dID0gbm9kZVtuXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmID8gYnVmIDogdW5wYXJzZShiKTtcbiAgfVxuXG4gIC8vICoqYHY0KClgIC0gR2VuZXJhdGUgcmFuZG9tIFVVSUQqKlxuXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYnJvb2ZhL25vZGUtdXVpZCBmb3IgQVBJIGRldGFpbHNcbiAgZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgICAvLyBEZXByZWNhdGVkIC0gJ2Zvcm1hdCcgYXJndW1lbnQsIGFzIHN1cHBvcnRlZCBpbiB2MS4yXG4gICAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG5cbiAgICBpZiAodHlwZW9mKG9wdGlvbnMpID09ICdzdHJpbmcnKSB7XG4gICAgICBidWYgPSBvcHRpb25zID09ICdiaW5hcnknID8gbmV3IEJ1ZmZlckNsYXNzKDE2KSA6IG51bGw7XG4gICAgICBvcHRpb25zID0gbnVsbDtcbiAgICB9XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICB2YXIgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBfcm5nKSgpO1xuXG4gICAgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuICAgIHJuZHNbNl0gPSAocm5kc1s2XSAmIDB4MGYpIHwgMHg0MDtcbiAgICBybmRzWzhdID0gKHJuZHNbOF0gJiAweDNmKSB8IDB4ODA7XG5cbiAgICAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcbiAgICBpZiAoYnVmKSB7XG4gICAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgMTY7IGlpKyspIHtcbiAgICAgICAgYnVmW2kgKyBpaV0gPSBybmRzW2lpXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYnVmIHx8IHVucGFyc2Uocm5kcyk7XG4gIH1cblxuICAvLyBFeHBvcnQgcHVibGljIEFQSVxuICB2YXIgdXVpZCA9IHY0O1xuICB1dWlkLnYxID0gdjE7XG4gIHV1aWQudjQgPSB2NDtcbiAgdXVpZC5wYXJzZSA9IHBhcnNlO1xuICB1dWlkLnVucGFyc2UgPSB1bnBhcnNlO1xuICB1dWlkLkJ1ZmZlckNsYXNzID0gQnVmZmVyQ2xhc3M7XG5cbiAgaWYgKHR5cGVvZihtb2R1bGUpICE9ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgLy8gUHVibGlzaCBhcyBub2RlLmpzIG1vZHVsZVxuICAgIG1vZHVsZS5leHBvcnRzID0gdXVpZDtcbiAgfSBlbHNlICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgLy8gUHVibGlzaCBhcyBBTUQgbW9kdWxlXG4gICAgZGVmaW5lKGZ1bmN0aW9uKCkge3JldHVybiB1dWlkO30pO1xuIFxuXG4gIH0gZWxzZSB7XG4gICAgLy8gUHVibGlzaCBhcyBnbG9iYWwgKGluIGJyb3dzZXJzKVxuICAgIHZhciBfcHJldmlvdXNSb290ID0gX2dsb2JhbC51dWlkO1xuXG4gICAgLy8gKipgbm9Db25mbGljdCgpYCAtIChicm93c2VyIG9ubHkpIHRvIHJlc2V0IGdsb2JhbCAndXVpZCcgdmFyKipcbiAgICB1dWlkLm5vQ29uZmxpY3QgPSBmdW5jdGlvbigpIHtcbiAgICAgIF9nbG9iYWwudXVpZCA9IF9wcmV2aW91c1Jvb3Q7XG4gICAgICByZXR1cm4gdXVpZDtcbiAgICB9O1xuXG4gICAgX2dsb2JhbC51dWlkID0gdXVpZDtcbiAgfVxufSkuY2FsbCh0aGlzKTtcbiIsIi8vTk9URTogVVVJRCBpcyBmYWtlZCBoZXJlIGZvciB0aGlzIGV4YW1wbGUuICBJbiBwcmFjdGljZSBzY2hlbWEgYXNzZXRzIG11c3QgaGF2ZSBVVUlEc1xuZXhwb3J0IGRlZmF1bHQge1xuICByZXNvdXJjZXM6IHtcbiAgICBpbWFnZXM6IFtcbiAgICAgICdlbW1pLnBuZycgIFxuICAgIF0sIFxuICAgIGF1ZGlvOiBbXG4gICAgICAndGVzdC5tcDMnIFxuICAgIF1cbiAgfSxcbiAgdmFyaWFibGVzOiB7XG4gICAgYWdlOiB7XG4gICAgICB0eXBlOiBcIk51bWJlclwiLFxuICAgICAgbWluOiAwLFxuICAgICAgbWF4OiAyNTAsXG4gICAgICBkZWZhdWx0OiAyMFxuICAgIH1cbiAgfSxcbiAgc2VxdWVuY2VzOiB7XG4gICAgbWFpbjoge1xuICAgICAgY29ubmVjdGlvbnM6IFt7XG4gICAgICAgIGV4cHJlc3Npb246IHRydWUsXG4gICAgICAgIHNlcXVlbmNlTmFtZTogbnVsbFxuICAgICAgfV0sXG4gICAgICBhc3NldHM6IFt7XG4gICAgICAgIHV1aWQ6ICdzdGFnZScsXG4gICAgICAgIHR5cGU6ICdzdGFnZScsXG4gICAgICAgIHN0eWxlOiB7fVxuICAgICAgfSwge1xuICAgICAgICB1dWlkOiAnMTIzJyxcbiAgICAgICAgdHlwZTogJ2ltYWdlJyxcbiAgICAgICAgc3JjOiAnZW1taS5wbmcnLFxuICAgICAgICBzdHlsZToge30gXG4gICAgICB9LCB7XG4gICAgICAgIHV1aWQ6ICc0NTYnLFxuICAgICAgICB0eXBlOiAnYXVkaW8nLFxuICAgICAgICBzcmM6IFsndGVzdC5tcDMnXVxuICAgICAgfSwge1xuICAgICAgICB1dWlkOiAnNzg5JyxcbiAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICB0YWc6ICdwJyxcbiAgICAgICAgdGV4dDogJ0NsaWNrIHRoZSBsb2dvIHRvIGNvbnRpbnVlJyxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICBmb250OiAnMzBweCBhcmllbCwgc2Fucy1zZXJpZicsXG4gICAgICAgICAgY29sb3I6ICdibHVlJyBcbiAgICAgICAgfSBcbiAgICAgIH1dLFxuXG4gICAgICB0YXNrczogW3tcbiAgICAgICAgdHlwZTogJ3BhcmFsbGVsJyxcbiAgICAgICAgdGFza3M6IFt7XG4gICAgICAgICAgdHlwZTogJ3NlcmlhbCcsXG4gICAgICAgICAgdGFza3M6IFt7XG4gICAgICAgICAgICB0eXBlOiAnaW5zZXJ0JywgXG4gICAgICAgICAgICBwYXJlbnQ6ICdzdGFnZScsXG4gICAgICAgICAgICBzdWJqZWN0OiAnMTIzJ1xuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIHR5cGU6ICdmYWRlLWluJyxcbiAgICAgICAgICAgIHN1YmplY3Q6ICcxMjMnXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgdHlwZTogJ2luc2VydCcsXG4gICAgICAgICAgICBwYXJlbnQ6ICdzdGFnZScsXG4gICAgICAgICAgICBzdWJqZWN0OiAnNzg5J1xuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIHR5cGU6ICdmYWRlLWluJyxcbiAgICAgICAgICAgIHN1YmplY3Q6ICc3ODknXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgdHlwZTogJ2lvJyxcbiAgICAgICAgICAgIHN1YmplY3Q6ICc3ODknICAgXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgdHlwZTogJ3BhcmFsbGVsJyxcbiAgICAgICAgICAgIHRhc2tzOiBbe1xuICAgICAgICAgICAgICB0eXBlOiAnc2VyaWFsJyxcbiAgICAgICAgICAgICAgdGFza3M6IFt7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2ZhZGUtb3V0JyxcbiAgICAgICAgICAgICAgICBzdWJqZWN0OiAnMTIzJ1xuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3JlbW92ZScsXG4gICAgICAgICAgICAgICAgcGFyZW50OiAnc3RhZ2UnLFxuICAgICAgICAgICAgICAgIHN1YmplY3Q6ICcxMjMnXG4gICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgIHR5cGU6ICdzZXJpYWwnLFxuICAgICAgICAgICAgICB0YXNrczogW3tcbiAgICAgICAgICAgICAgICB0eXBlOiAnZmFkZS1vdXQnLFxuICAgICAgICAgICAgICAgIHN1YmplY3Q6ICc3ODknXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncmVtb3ZlJyxcbiAgICAgICAgICAgICAgICBwYXJlbnQ6ICdzdGFnZScsXG4gICAgICAgICAgICAgICAgc3ViamVjdDogJzc4OSdcbiAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH1dICBcbiAgICAgICAgICB9XSBcbiAgICAgICAgfV0gICBcbiAgICAgIH0sIHtcbiAgICAgICAgdHlwZTogJ2F1ZGlvLXBsYXknLFxuICAgICAgICBzdWJqZWN0OiAnNDU2J1xuICAgICAgfV1cbiAgICB9ICAgICAgIFxuICB9XG59XG5cbiIsImV4cG9ydCBmdW5jdGlvbiBwcCAob2JqKSB7XG4gIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG9iaiwgbnVsbCwgMikpXG59XG5cbmV4cG9ydCBjb25zdCBsb2cgPSBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpXG5cbi8vc2hhbGxvdyBjbG9uZSAtLSBub3QgaWRlYWwgYXMgbWlnaHQgdHJpZ2dlciBkaWN0aW9uYXJ5IG1vZGU/XG5leHBvcnQgZnVuY3Rpb24gY2xvbmUgKG9iaikge1xuICBsZXQgb3V0ID0ge31cblxuICBmb3IgKGxldCBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSBvdXRba2V5XSA9IG9ialtrZXldIFxuICB9IFxuICByZXR1cm4gb3V0XG59XG4iXX0=
