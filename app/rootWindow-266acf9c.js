'use strict';

var tslib = require('tslib');
var React = require('react');
var reactDom = require('react-dom');
var electron = require('electron');
var redux = require('redux');
var i18next = require('i18next');
var reactI18next = require('react-i18next');
var reactRedux = require('react-redux');
var fuselage = require('@rocket.chat/fuselage');
var fuselageHooks = require('@rocket.chat/fuselage-hooks');
var styled = require('@emotion/styled');
var path = require('path');
var fastFolderSize = require('fast-folder-size');
var reselect = require('reselect');
var flattenChildren = require('react-keyed-flatten-children');
var react = require('@emotion/react');
var url = require('url');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var i18next__default = /*#__PURE__*/_interopDefaultLegacy(i18next);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var fastFolderSize__default = /*#__PURE__*/_interopDefaultLegacy(fastFolderSize);
var flattenChildren__default = /*#__PURE__*/_interopDefaultLegacy(flattenChildren);

var bugsnag = {exports: {}};

(function (module, exports) {
(function (f) {
  {
    module.exports = f();
  }
})(function () {
  var _$breadcrumbTypes_8 = ['navigation', 'request', 'process', 'log', 'user', 'state', 'error', 'manual']; // Array#reduce

  var _$reduce_17 = function (arr, fn, accum) {
    var val = accum;

    for (var i = 0, len = arr.length; i < len; i++) {
      val = fn(val, arr[i], i, arr);
    }

    return val;
  };

  var _$filter_12 = function (arr, fn) {
    return _$reduce_17(arr, function (accum, item, i, arr) {
      return !fn(item, i, arr) ? accum : accum.concat(item);
    }, []);
  };

  var _$includes_13 = function (arr, x) {
    return _$reduce_17(arr, function (accum, item, i, arr) {
      return accum === true || item === x;
    }, false);
  }; // Array#isArray


  var _$isArray_14 = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };
  /* eslint-disable-next-line no-prototype-builtins */


  var _hasDontEnumBug = !{
    toString: null
  }.propertyIsEnumerable('toString');

  var _dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor']; // Object#keys

  var _$keys_15 = function (obj) {
    // stripped down version of
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/Keys
    var result = [];
    var prop;

    for (prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) result.push(prop);
    }

    if (!_hasDontEnumBug) return result;

    for (var i = 0, len = _dontEnums.length; i < len; i++) {
      if (Object.prototype.hasOwnProperty.call(obj, _dontEnums[i])) result.push(_dontEnums[i]);
    }

    return result;
  };

  var _$intRange_23 = function (min, max) {
    if (min === void 0) {
      min = 1;
    }

    if (max === void 0) {
      max = Infinity;
    }

    return function (value) {
      return typeof value === 'number' && parseInt('' + value, 10) === value && value >= min && value <= max;
    };
  };

  var _$listOfFunctions_24 = function (value) {
    return typeof value === 'function' || _$isArray_14(value) && _$filter_12(value, function (f) {
      return typeof f === 'function';
    }).length === value.length;
  };

  var _$stringWithLength_25 = function (value) {
    return typeof value === 'string' && !!value.length;
  };

  var _$config_5 = {};

  var defaultErrorTypes = function () {
    return {
      unhandledExceptions: true,
      unhandledRejections: true
    };
  };

  _$config_5.schema = {
    apiKey: {
      defaultValue: function () {
        return null;
      },
      message: 'is required',
      validate: _$stringWithLength_25
    },
    appVersion: {
      defaultValue: function () {
        return undefined;
      },
      message: 'should be a string',
      validate: function (value) {
        return value === undefined || _$stringWithLength_25(value);
      }
    },
    appType: {
      defaultValue: function () {
        return undefined;
      },
      message: 'should be a string',
      validate: function (value) {
        return value === undefined || _$stringWithLength_25(value);
      }
    },
    autoDetectErrors: {
      defaultValue: function () {
        return true;
      },
      message: 'should be true|false',
      validate: function (value) {
        return value === true || value === false;
      }
    },
    enabledErrorTypes: {
      defaultValue: function () {
        return defaultErrorTypes();
      },
      message: 'should be an object containing the flags { unhandledExceptions:true|false, unhandledRejections:true|false }',
      allowPartialObject: true,
      validate: function (value) {
        // ensure we have an object
        if (typeof value !== 'object' || !value) return false;

        var providedKeys = _$keys_15(value);

        var defaultKeys = _$keys_15(defaultErrorTypes()); // ensure it only has a subset of the allowed keys


        if (_$filter_12(providedKeys, function (k) {
          return _$includes_13(defaultKeys, k);
        }).length < providedKeys.length) return false; // ensure all of the values are boolean

        if (_$filter_12(_$keys_15(value), function (k) {
          return typeof value[k] !== 'boolean';
        }).length > 0) return false;
        return true;
      }
    },
    onError: {
      defaultValue: function () {
        return [];
      },
      message: 'should be a function or array of functions',
      validate: _$listOfFunctions_24
    },
    onSession: {
      defaultValue: function () {
        return [];
      },
      message: 'should be a function or array of functions',
      validate: _$listOfFunctions_24
    },
    onBreadcrumb: {
      defaultValue: function () {
        return [];
      },
      message: 'should be a function or array of functions',
      validate: _$listOfFunctions_24
    },
    endpoints: {
      defaultValue: function () {
        return {
          notify: 'https://notify.bugsnag.com',
          sessions: 'https://sessions.bugsnag.com'
        };
      },
      message: 'should be an object containing endpoint URLs { notify, sessions }',
      validate: function (val) {
        return (// first, ensure it's an object
          val && typeof val === 'object' && // notify and sessions must always be set
          _$stringWithLength_25(val.notify) && _$stringWithLength_25(val.sessions) && // ensure no keys other than notify/session are set on endpoints object
          _$filter_12(_$keys_15(val), function (k) {
            return !_$includes_13(['notify', 'sessions'], k);
          }).length === 0
        );
      }
    },
    autoTrackSessions: {
      defaultValue: function (val) {
        return true;
      },
      message: 'should be true|false',
      validate: function (val) {
        return val === true || val === false;
      }
    },
    enabledReleaseStages: {
      defaultValue: function () {
        return null;
      },
      message: 'should be an array of strings',
      validate: function (value) {
        return value === null || _$isArray_14(value) && _$filter_12(value, function (f) {
          return typeof f === 'string';
        }).length === value.length;
      }
    },
    releaseStage: {
      defaultValue: function () {
        return 'production';
      },
      message: 'should be a string',
      validate: function (value) {
        return typeof value === 'string' && value.length;
      }
    },
    maxBreadcrumbs: {
      defaultValue: function () {
        return 25;
      },
      message: 'should be a number ≤100',
      validate: function (value) {
        return _$intRange_23(0, 100)(value);
      }
    },
    enabledBreadcrumbTypes: {
      defaultValue: function () {
        return _$breadcrumbTypes_8;
      },
      message: "should be null or a list of available breadcrumb types (" + _$breadcrumbTypes_8.join(',') + ")",
      validate: function (value) {
        return value === null || _$isArray_14(value) && _$reduce_17(value, function (accum, maybeType) {
          if (accum === false) return accum;
          return _$includes_13(_$breadcrumbTypes_8, maybeType);
        }, true);
      }
    },
    context: {
      defaultValue: function () {
        return undefined;
      },
      message: 'should be a string',
      validate: function (value) {
        return value === undefined || typeof value === 'string';
      }
    },
    user: {
      defaultValue: function () {
        return {};
      },
      message: 'should be an object with { id, email, name } properties',
      validate: function (value) {
        return value === null || value && _$reduce_17(_$keys_15(value), function (accum, key) {
          return accum && _$includes_13(['id', 'email', 'name'], key);
        }, true);
      }
    },
    metadata: {
      defaultValue: function () {
        return {};
      },
      message: 'should be an object',
      validate: function (value) {
        return typeof value === 'object' && value !== null;
      }
    },
    logger: {
      defaultValue: function () {
        return undefined;
      },
      message: 'should be null or an object with methods { debug, info, warn, error }',
      validate: function (value) {
        return !value || value && _$reduce_17(['debug', 'info', 'warn', 'error'], function (accum, method) {
          return accum && typeof value[method] === 'function';
        }, true);
      }
    },
    redactedKeys: {
      defaultValue: function () {
        return ['password'];
      },
      message: 'should be an array of strings|regexes',
      validate: function (value) {
        return _$isArray_14(value) && value.length === _$filter_12(value, function (s) {
          return typeof s === 'string' || s && typeof s.test === 'function';
        }).length;
      }
    },
    plugins: {
      defaultValue: function () {
        return [];
      },
      message: 'should be an array of plugin objects',
      validate: function (value) {
        return _$isArray_14(value) && value.length === _$filter_12(value, function (p) {
          return p && typeof p === 'object' && typeof p.load === 'function';
        }).length;
      }
    }
  }; // extends helper from babel
  // https://github.com/babel/babel/blob/916429b516e6466fd06588ee820e40e025d7f3a3/packages/babel-helpers/src/helpers.js#L377-L393

  var _$assign_11 = function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var _$map_16 = function (arr, fn) {
    return _$reduce_17(arr, function (accum, item, i, arr) {
      return accum.concat(fn(item, i, arr));
    }, []);
  };

  var schema = _$config_5.schema;
  var _$config_1 = {
    releaseStage: _$assign_11({}, schema.releaseStage, {
      defaultValue: function () {
        if (/^localhost(:\d+)?$/.test(window.location.host)) return 'development';
        return 'production';
      }
    }),
    logger: _$assign_11({}, schema.logger, {
      defaultValue: function () {
        return (// set logger based on browser capability
          typeof console !== 'undefined' && typeof console.debug === 'function' ? getPrefixedConsole() : undefined
        );
      }
    })
  };

  var getPrefixedConsole = function () {
    var logger = {};
    var consoleLog = console.log;

    _$map_16(['debug', 'info', 'warn', 'error'], function (method) {
      var consoleMethod = console[method];
      logger[method] = typeof consoleMethod === 'function' ? consoleMethod.bind(console, '[bugsnag]') : consoleLog.bind(console, '[bugsnag]');
    });

    return logger;
  };

  var Breadcrumb = /*#__PURE__*/function () {
    function Breadcrumb(message, metadata, type, timestamp) {
      if (timestamp === void 0) {
        timestamp = new Date();
      }

      this.type = type;
      this.message = message;
      this.metadata = metadata;
      this.timestamp = timestamp;
    }

    var _proto = Breadcrumb.prototype;

    _proto.toJSON = function toJSON() {
      return {
        type: this.type,
        name: this.message,
        timestamp: this.timestamp,
        metaData: this.metadata
      };
    };

    return Breadcrumb;
  }();

  var _$Breadcrumb_3 = Breadcrumb;
  var _$stackframe_33 = {};

  (function (root, factory) {

    /* istanbul ignore next */

    if (typeof _$stackframe_33 === 'object') {
      _$stackframe_33 = factory();
    } else {
      root.StackFrame = factory();
    }
  })(this, function () {

    function _isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function _capitalize(str) {
      return str.charAt(0).toUpperCase() + str.substring(1);
    }

    function _getter(p) {
      return function () {
        return this[p];
      };
    }

    var booleanProps = ['isConstructor', 'isEval', 'isNative', 'isToplevel'];
    var numericProps = ['columnNumber', 'lineNumber'];
    var stringProps = ['fileName', 'functionName', 'source'];
    var arrayProps = ['args'];
    var props = booleanProps.concat(numericProps, stringProps, arrayProps);

    function StackFrame(obj) {
      if (obj instanceof Object) {
        for (var i = 0; i < props.length; i++) {
          if (obj.hasOwnProperty(props[i]) && obj[props[i]] !== undefined) {
            this['set' + _capitalize(props[i])](obj[props[i]]);
          }
        }
      }
    }

    StackFrame.prototype = {
      getArgs: function () {
        return this.args;
      },
      setArgs: function (v) {
        if (Object.prototype.toString.call(v) !== '[object Array]') {
          throw new TypeError('Args must be an Array');
        }

        this.args = v;
      },
      getEvalOrigin: function () {
        return this.evalOrigin;
      },
      setEvalOrigin: function (v) {
        if (v instanceof StackFrame) {
          this.evalOrigin = v;
        } else if (v instanceof Object) {
          this.evalOrigin = new StackFrame(v);
        } else {
          throw new TypeError('Eval Origin must be an Object or StackFrame');
        }
      },
      toString: function () {
        var functionName = this.getFunctionName() || '{anonymous}';
        var args = '(' + (this.getArgs() || []).join(',') + ')';
        var fileName = this.getFileName() ? '@' + this.getFileName() : '';
        var lineNumber = _isNumber(this.getLineNumber()) ? ':' + this.getLineNumber() : '';
        var columnNumber = _isNumber(this.getColumnNumber()) ? ':' + this.getColumnNumber() : '';
        return functionName + args + fileName + lineNumber + columnNumber;
      }
    };

    for (var i = 0; i < booleanProps.length; i++) {
      StackFrame.prototype['get' + _capitalize(booleanProps[i])] = _getter(booleanProps[i]);

      StackFrame.prototype['set' + _capitalize(booleanProps[i])] = function (p) {
        return function (v) {
          this[p] = Boolean(v);
        };
      }(booleanProps[i]);
    }

    for (var j = 0; j < numericProps.length; j++) {
      StackFrame.prototype['get' + _capitalize(numericProps[j])] = _getter(numericProps[j]);

      StackFrame.prototype['set' + _capitalize(numericProps[j])] = function (p) {
        return function (v) {
          if (!_isNumber(v)) {
            throw new TypeError(p + ' must be a Number');
          }

          this[p] = Number(v);
        };
      }(numericProps[j]);
    }

    for (var k = 0; k < stringProps.length; k++) {
      StackFrame.prototype['get' + _capitalize(stringProps[k])] = _getter(stringProps[k]);

      StackFrame.prototype['set' + _capitalize(stringProps[k])] = function (p) {
        return function (v) {
          this[p] = String(v);
        };
      }(stringProps[k]);
    }

    return StackFrame;
  });

  var _$errorStackParser_30 = {};

  (function (root, factory) {

    /* istanbul ignore next */

    if (typeof _$errorStackParser_30 === 'object') {
      _$errorStackParser_30 = factory(_$stackframe_33);
    } else {
      root.ErrorStackParser = factory(root.StackFrame);
    }
  })(this, function ErrorStackParser(StackFrame) {

    var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+\:\d+/;
    var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+\:\d+|\(native\))/m;
    var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code\])?$/;
    return {
      /**
       * Given an Error object, extract the most information from it.
       *
       * @param {Error} error object
       * @return {Array} of StackFrames
       */
      parse: function ErrorStackParser$$parse(error) {
        if (typeof error.stacktrace !== 'undefined' || typeof error['opera#sourceloc'] !== 'undefined') {
          return this.parseOpera(error);
        } else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
          return this.parseV8OrIE(error);
        } else if (error.stack) {
          return this.parseFFOrSafari(error);
        } else {
          throw new Error('Cannot parse given Error object');
        }
      },
      // Separate line and column numbers from a string of the form: (URI:Line:Column)
      extractLocation: function ErrorStackParser$$extractLocation(urlLike) {
        // Fail-fast but return locations like "(native)"
        if (urlLike.indexOf(':') === -1) {
          return [urlLike];
        }

        var regExp = /(.+?)(?:\:(\d+))?(?:\:(\d+))?$/;
        var parts = regExp.exec(urlLike.replace(/[\(\)]/g, ''));
        return [parts[1], parts[2] || undefined, parts[3] || undefined];
      },
      parseV8OrIE: function ErrorStackParser$$parseV8OrIE(error) {
        var filtered = error.stack.split('\n').filter(function (line) {
          return !!line.match(CHROME_IE_STACK_REGEXP);
        }, this);
        return filtered.map(function (line) {
          if (line.indexOf('(eval ') > -1) {
            // Throw away eval information until we implement stacktrace.js/stackframe#8
            line = line.replace(/eval code/g, 'eval').replace(/(\(eval at [^\()]*)|(\)\,.*$)/g, '');
          }

          var sanitizedLine = line.replace(/^\s+/, '').replace(/\(eval code/g, '('); // capture and preseve the parenthesized location "(/foo/my bar.js:12:87)" in
          // case it has spaces in it, as the string is split on \s+ later on

          var location = sanitizedLine.match(/ (\((.+):(\d+):(\d+)\)$)/); // remove the parenthesized location from the line, if it was matched

          sanitizedLine = location ? sanitizedLine.replace(location[0], '') : sanitizedLine;
          var tokens = sanitizedLine.split(/\s+/).slice(1); // if a location was matched, pass it to extractLocation() otherwise pop the last token

          var locationParts = this.extractLocation(location ? location[1] : tokens.pop());
          var functionName = tokens.join(' ') || undefined;
          var fileName = ['eval', '<anonymous>'].indexOf(locationParts[0]) > -1 ? undefined : locationParts[0];
          return new StackFrame({
            functionName: functionName,
            fileName: fileName,
            lineNumber: locationParts[1],
            columnNumber: locationParts[2],
            source: line
          });
        }, this);
      },
      parseFFOrSafari: function ErrorStackParser$$parseFFOrSafari(error) {
        var filtered = error.stack.split('\n').filter(function (line) {
          return !line.match(SAFARI_NATIVE_CODE_REGEXP);
        }, this);
        return filtered.map(function (line) {
          // Throw away eval information until we implement stacktrace.js/stackframe#8
          if (line.indexOf(' > eval') > -1) {
            line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g, ':$1');
          }

          if (line.indexOf('@') === -1 && line.indexOf(':') === -1) {
            // Safari eval frames only have function names and nothing else
            return new StackFrame({
              functionName: line
            });
          } else {
            var functionNameRegex = /((.*".+"[^@]*)?[^@]*)(?:@)/;
            var matches = line.match(functionNameRegex);
            var functionName = matches && matches[1] ? matches[1] : undefined;
            var locationParts = this.extractLocation(line.replace(functionNameRegex, ''));
            return new StackFrame({
              functionName: functionName,
              fileName: locationParts[0],
              lineNumber: locationParts[1],
              columnNumber: locationParts[2],
              source: line
            });
          }
        }, this);
      },
      parseOpera: function ErrorStackParser$$parseOpera(e) {
        if (!e.stacktrace || e.message.indexOf('\n') > -1 && e.message.split('\n').length > e.stacktrace.split('\n').length) {
          return this.parseOpera9(e);
        } else if (!e.stack) {
          return this.parseOpera10(e);
        } else {
          return this.parseOpera11(e);
        }
      },
      parseOpera9: function ErrorStackParser$$parseOpera9(e) {
        var lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
        var lines = e.message.split('\n');
        var result = [];

        for (var i = 2, len = lines.length; i < len; i += 2) {
          var match = lineRE.exec(lines[i]);

          if (match) {
            result.push(new StackFrame({
              fileName: match[2],
              lineNumber: match[1],
              source: lines[i]
            }));
          }
        }

        return result;
      },
      parseOpera10: function ErrorStackParser$$parseOpera10(e) {
        var lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
        var lines = e.stacktrace.split('\n');
        var result = [];

        for (var i = 0, len = lines.length; i < len; i += 2) {
          var match = lineRE.exec(lines[i]);

          if (match) {
            result.push(new StackFrame({
              functionName: match[3] || undefined,
              fileName: match[2],
              lineNumber: match[1],
              source: lines[i]
            }));
          }
        }

        return result;
      },
      // Opera 10.65+ Error.stack very similar to FF/Safari
      parseOpera11: function ErrorStackParser$$parseOpera11(error) {
        var filtered = error.stack.split('\n').filter(function (line) {
          return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/);
        }, this);
        return filtered.map(function (line) {
          var tokens = line.split('@');
          var locationParts = this.extractLocation(tokens.pop());
          var functionCall = tokens.shift() || '';
          var functionName = functionCall.replace(/<anonymous function(: (\w+))?>/, '$2').replace(/\([^\)]*\)/g, '') || undefined;
          var argsRaw;

          if (functionCall.match(/\(([^\)]*)\)/)) {
            argsRaw = functionCall.replace(/^[^\(]+\(([^\)]*)\)$/, '$1');
          }

          var args = argsRaw === undefined || argsRaw === '[arguments not available]' ? undefined : argsRaw.split(',');
          return new StackFrame({
            functionName: functionName,
            args: args,
            fileName: locationParts[0],
            lineNumber: locationParts[1],
            columnNumber: locationParts[2],
            source: line
          });
        }, this);
      }
    };
  });

  var _$errorStackParser_10 = _$errorStackParser_30; // Given `err` which may be an error, does it have a stack property which is a string?

  var _$hasStack_18 = function (err) {
    return !!err && (!!err.stack || !!err.stacktrace || !!err['opera#sourceloc']) && typeof (err.stack || err.stacktrace || err['opera#sourceloc']) === 'string' && err.stack !== err.name + ": " + err.message;
  };
  /**
   * Expose `isError`.
   */


  var _$isError_31 = isError;
  /**
   * Test whether `value` is error object.
   *
   * @param {*} value
   * @returns {boolean}
   */

  function isError(value) {
    switch (Object.prototype.toString.call(value)) {
      case '[object Error]':
        return true;

      case '[object Exception]':
        return true;

      case '[object DOMException]':
        return true;

      default:
        return value instanceof Error;
    }
  }

  var _$iserror_19 = _$isError_31;

  var add = function (state, section, keyOrObj, maybeVal) {
    var _updates;

    if (!section) return;
    var updates; // addMetadata("section", null) -> clears section

    if (keyOrObj === null) return clear(state, section); // normalise the two supported input types into object form

    if (typeof keyOrObj === 'object') updates = keyOrObj;
    if (typeof keyOrObj === 'string') updates = (_updates = {}, _updates[keyOrObj] = maybeVal, _updates); // exit if we don't have an updates object at this point

    if (!updates) return; // ensure a section with this name exists

    if (!state[section]) state[section] = {}; // merge the updates with the existing section

    state[section] = _$assign_11({}, state[section], updates);
  };

  var get = function (state, section, key) {
    if (typeof section !== 'string') return undefined;

    if (!key) {
      return state[section];
    }

    if (state[section]) {
      return state[section][key];
    }

    return undefined;
  };

  var clear = function (state, section, key) {
    if (typeof section !== 'string') return; // clear an entire section

    if (!key) {
      delete state[section];
      return;
    } // clear a single value from a section


    if (state[section]) {
      delete state[section][key];
    }
  };

  var _$metadataDelegate_21 = {
    add: add,
    get: get,
    clear: clear
  };
  var _$stackGenerator_32 = {};

  (function (root, factory) {

    /* istanbul ignore next */

    if (typeof _$stackGenerator_32 === 'object') {
      _$stackGenerator_32 = factory(_$stackframe_33);
    } else {
      root.StackGenerator = factory(root.StackFrame);
    }
  })(this, function (StackFrame) {
    return {
      backtrace: function StackGenerator$$backtrace(opts) {
        var stack = [];
        var maxStackSize = 10;

        if (typeof opts === 'object' && typeof opts.maxStackSize === 'number') {
          maxStackSize = opts.maxStackSize;
        }

        var curr = arguments.callee;

        while (curr && stack.length < maxStackSize && curr['arguments']) {
          // Allow V8 optimizations
          var args = new Array(curr['arguments'].length);

          for (var i = 0; i < args.length; ++i) {
            args[i] = curr['arguments'][i];
          }

          if (/function(?:\s+([\w$]+))+\s*\(/.test(curr.toString())) {
            stack.push(new StackFrame({
              functionName: RegExp.$1 || undefined,
              args: args
            }));
          } else {
            stack.push(new StackFrame({
              args: args
            }));
          }

          try {
            curr = curr.caller;
          } catch (e) {
            break;
          }
        }

        return stack;
      }
    };
  });

  var Event = /*#__PURE__*/function () {
    function Event(errorClass, errorMessage, stacktrace, handledState, originalError) {
      if (stacktrace === void 0) {
        stacktrace = [];
      }

      if (handledState === void 0) {
        handledState = defaultHandledState();
      }

      this.apiKey = undefined;
      this.context = undefined;
      this.groupingHash = undefined;
      this.originalError = originalError;
      this._handledState = handledState;
      this.severity = this._handledState.severity;
      this.unhandled = this._handledState.unhandled;
      this.app = {};
      this.device = {};
      this.request = {};
      this.breadcrumbs = [];
      this.threads = [];
      this._metadata = {};
      this._user = {};
      this._session = undefined;
      this.errors = [{
        errorClass: ensureString(errorClass),
        errorMessage: ensureString(errorMessage),
        type: Event.__type,
        stacktrace: _$reduce_17(stacktrace, function (accum, frame) {
          var f = formatStackframe(frame); // don't include a stackframe if none of its properties are defined

          try {
            if (JSON.stringify(f) === '{}') return accum;
            return accum.concat(f);
          } catch (e) {
            return accum;
          }
        }, [])
      }]; // Flags.
      // Note these are not initialised unless they are used
      // to save unnecessary bytes in the browser bundle

      /* this.attemptImmediateDelivery, default: true */
    }

    var _proto = Event.prototype;

    _proto.addMetadata = function addMetadata(section, keyOrObj, maybeVal) {
      return _$metadataDelegate_21.add(this._metadata, section, keyOrObj, maybeVal);
    };

    _proto.getMetadata = function getMetadata(section, key) {
      return _$metadataDelegate_21.get(this._metadata, section, key);
    };

    _proto.clearMetadata = function clearMetadata(section, key) {
      return _$metadataDelegate_21.clear(this._metadata, section, key);
    };

    _proto.getUser = function getUser() {
      return this._user;
    };

    _proto.setUser = function setUser(id, email, name) {
      this._user = {
        id: id,
        email: email,
        name: name
      };
    };

    _proto.toJSON = function toJSON() {
      return {
        payloadVersion: '4',
        exceptions: _$map_16(this.errors, function (er) {
          return _$assign_11({}, er, {
            message: er.errorMessage
          });
        }),
        severity: this.severity,
        unhandled: this._handledState.unhandled,
        severityReason: this._handledState.severityReason,
        app: this.app,
        device: this.device,
        request: this.request,
        breadcrumbs: this.breadcrumbs,
        context: this.context,
        groupingHash: this.groupingHash,
        metaData: this._metadata,
        user: this._user,
        session: this._session
      };
    };

    return Event;
  }(); // takes a stacktrace.js style stackframe (https://github.com/stacktracejs/stackframe)
  // and returns a Bugsnag compatible stackframe (https://docs.bugsnag.com/api/error-reporting/#json-payload)


  var formatStackframe = function (frame) {
    var f = {
      file: frame.fileName,
      method: normaliseFunctionName(frame.functionName),
      lineNumber: frame.lineNumber,
      columnNumber: frame.columnNumber,
      code: undefined,
      inProject: undefined
    }; // Some instances result in no file:
    // - calling notify() from chrome's terminal results in no file/method.
    // - non-error exception thrown from global code in FF
    // This adds one.

    if (f.lineNumber > -1 && !f.file && !f.method) {
      f.file = 'global code';
    }

    return f;
  };

  var normaliseFunctionName = function (name) {
    return /^global code$/i.test(name) ? 'global code' : name;
  };

  var defaultHandledState = function () {
    return {
      unhandled: false,
      severity: 'warning',
      severityReason: {
        type: 'handledException'
      }
    };
  };

  var ensureString = function (str) {
    return typeof str === 'string' ? str : '';
  }; // Helpers


  Event.getStacktrace = function (error, errorFramesToSkip, backtraceFramesToSkip) {
    if (_$hasStack_18(error)) return _$errorStackParser_10.parse(error).slice(errorFramesToSkip); // error wasn't provided or didn't have a stacktrace so try to walk the callstack

    try {
      return _$filter_12(_$stackGenerator_32.backtrace(), function (frame) {
        return (frame.functionName || '').indexOf('StackGenerator$$') === -1;
      }).slice(1 + backtraceFramesToSkip);
    } catch (e) {
      return [];
    }
  };

  Event.create = function (maybeError, tolerateNonErrors, handledState, component, errorFramesToSkip, logger) {
    if (errorFramesToSkip === void 0) {
      errorFramesToSkip = 0;
    }

    var _normaliseError = normaliseError(maybeError, tolerateNonErrors, component, logger),
        error = _normaliseError[0],
        internalFrames = _normaliseError[1];

    var event;

    try {
      var stacktrace = Event.getStacktrace(error, // if an error was created/throw in the normaliseError() function, we need to
      // tell the getStacktrace() function to skip the number of frames we know will
      // be from our own functions. This is added to the number of frames deep we
      // were told about
      internalFrames > 0 ? 1 + internalFrames + errorFramesToSkip : 0, // if there's no stacktrace, the callstack may be walked to generated one.
      // this is how many frames should be removed because they come from our library
      1 + errorFramesToSkip);
      event = new Event(error.name, error.message, stacktrace, handledState, maybeError);
    } catch (e) {
      event = new Event(error.name, error.message, [], handledState, maybeError);
    }

    if (error.name === 'InvalidError') {
      event.addMetadata("" + component, 'non-error parameter', makeSerialisable(maybeError));
    }

    return event;
  };

  var makeSerialisable = function (err) {
    if (err === null) return 'null';
    if (err === undefined) return 'undefined';
    return err;
  };

  var normaliseError = function (maybeError, tolerateNonErrors, component, logger) {
    var error;
    var internalFrames = 0;

    var createAndLogInputError = function (reason) {
      if (logger) logger.warn(component + " received a non-error: \"" + reason + "\"");
      var err = new Error(component + " received a non-error. See \"" + component + "\" tab for more detail.");
      err.name = 'InvalidError';
      return err;
    }; // In some cases:
    //
    //  - the promise rejection handler (both in the browser and node)
    //  - the node uncaughtException handler
    //
    // We are really limited in what we can do to get a stacktrace. So we use the
    // tolerateNonErrors option to ensure that the resulting error communicates as
    // such.


    if (!tolerateNonErrors) {
      if (_$iserror_19(maybeError)) {
        error = maybeError;
      } else {
        error = createAndLogInputError(typeof maybeError);
        internalFrames += 2;
      }
    } else {
      switch (typeof maybeError) {
        case 'string':
        case 'number':
        case 'boolean':
          error = new Error(String(maybeError));
          internalFrames += 1;
          break;

        case 'function':
          error = createAndLogInputError('function');
          internalFrames += 2;
          break;

        case 'object':
          if (maybeError !== null && _$iserror_19(maybeError)) {
            error = maybeError;
          } else if (maybeError !== null && hasNecessaryFields(maybeError)) {
            error = new Error(maybeError.message || maybeError.errorMessage);
            error.name = maybeError.name || maybeError.errorClass;
            internalFrames += 1;
          } else {
            error = createAndLogInputError(maybeError === null ? 'null' : 'unsupported object');
            internalFrames += 2;
          }

          break;

        default:
          error = createAndLogInputError('nothing');
          internalFrames += 2;
      }
    }

    if (!_$hasStack_18(error)) {
      // in IE10/11 a new Error() doesn't have a stacktrace until you throw it, so try that here
      try {
        throw error;
      } catch (e) {
        if (_$hasStack_18(e)) {
          error = e; // if the error only got a stacktrace after we threw it here, we know it
          // will only have one extra internal frame from this function, regardless
          // of whether it went through createAndLogInputError() or not

          internalFrames = 1;
        }
      }
    }

    return [error, internalFrames];
  }; // default value for stacktrace.type


  Event.__type = 'browserjs';

  var hasNecessaryFields = function (error) {
    return (typeof error.name === 'string' || typeof error.errorClass === 'string') && (typeof error.message === 'string' || typeof error.errorMessage === 'string');
  };

  var _$Event_6 = Event; // This is a heavily modified/simplified version of
  //   https://github.com/othiym23/async-some
  // with the logic flipped so that it is akin to the
  // synchronous "every" method instead of "some".
  // run the asynchronous test function (fn) over each item in the array (arr)
  // in series until:
  //   - fn(item, cb) => calls cb(null, false)
  //   - or the end of the array is reached
  // the callback (cb) will be passed (null, false) if any of the items in arr
  // caused fn to call back with false, otherwise it will be passed (null, true)

  var _$asyncEvery_7 = function (arr, fn, cb) {
    var index = 0;

    var next = function () {
      if (index >= arr.length) return cb(null, true);
      fn(arr[index], function (err, result) {
        if (err) return cb(err);
        if (result === false) return cb(null, false);
        index++;
        next();
      });
    };

    next();
  };

  var _$callbackRunner_9 = function (callbacks, event, onCallbackError, cb) {
    // This function is how we support different kinds of callback:
    //  - synchronous - return value
    //  - node-style async with callback - cb(err, value)
    //  - promise/thenable - resolve(value)
    // It normalises each of these into the lowest common denominator – a node-style callback
    var runMaybeAsyncCallback = function (fn, cb) {
      if (typeof fn !== 'function') return cb(null);

      try {
        // if function appears sync…
        if (fn.length !== 2) {
          var ret = fn(event); // check if it returned a "thenable" (promise)

          if (ret && typeof ret.then === 'function') {
            return ret.then( // resolve
            function (val) {
              return setTimeout(function () {
                return cb(null, val);
              });
            }, // reject
            function (err) {
              setTimeout(function () {
                onCallbackError(err);
                return cb(null, true);
              });
            });
          }

          return cb(null, ret);
        } // if function is async…


        fn(event, function (err, result) {
          if (err) {
            onCallbackError(err);
            return cb(null);
          }

          cb(null, result);
        });
      } catch (e) {
        onCallbackError(e);
        cb(null);
      }
    };

    _$asyncEvery_7(callbacks, runMaybeAsyncCallback, cb);
  };

  var _$syncCallbackRunner_22 = function (callbacks, callbackArg, callbackType, logger) {
    var ignore = false;
    var cbs = callbacks.slice();

    while (!ignore) {
      if (!cbs.length) break;

      try {
        ignore = cbs.pop()(callbackArg) === false;
      } catch (e) {
        logger.error("Error occurred in " + callbackType + " callback, continuing anyway\u2026");
        logger.error(e);
      }
    }

    return ignore;
  };

  var _$pad_28 = function pad(num, size) {
    var s = '000000000' + num;
    return s.substr(s.length - size);
  };
  var env = typeof window === 'object' ? window : self;
  var globalCount = 0;

  for (var prop in env) {
    if (Object.hasOwnProperty.call(env, prop)) globalCount++;
  }

  var mimeTypesLength = navigator.mimeTypes ? navigator.mimeTypes.length : 0;

  var clientId = _$pad_28((mimeTypesLength + navigator.userAgent.length).toString(36) + globalCount.toString(36), 4);

  var _$fingerprint_27 = function fingerprint() {
    return clientId;
  };
  var c = 0,
      blockSize = 4,
      base = 36,
      discreteValues = Math.pow(base, blockSize);

  function randomBlock() {
    return _$pad_28((Math.random() * discreteValues << 0).toString(base), blockSize);
  }

  function safeCounter() {
    c = c < discreteValues ? c : 0;
    c++; // this is not subliminal

    return c - 1;
  }

  function cuid() {
    // Starting with a lowercase letter makes
    // it HTML element ID friendly.
    var letter = 'c',
        // hard-coded allows for sequential access
    // timestamp
    // warning: this exposes the exact date and time
    // that the uid was created.
    timestamp = new Date().getTime().toString(base),
        // Prevent same-machine collisions.
    counter = _$pad_28(safeCounter().toString(base), blockSize),
        // A few chars to generate distinct ids for different
    // clients (so different computers are far less
    // likely to generate the same id)
    print = _$fingerprint_27(),
        // Grab some more chars from Math.random()
    random = randomBlock() + randomBlock();

    return letter + timestamp + counter + print + random;
  }

  cuid.fingerprint = _$fingerprint_27;
  var _$cuid_26 = cuid;

  var Session = /*#__PURE__*/function () {
    function Session() {
      this.id = _$cuid_26();
      this.startedAt = new Date();
      this._handled = 0;
      this._unhandled = 0;
      this._user = {};
      this.app = {};
      this.device = {};
    }

    var _proto = Session.prototype;

    _proto.getUser = function getUser() {
      return this._user;
    };

    _proto.setUser = function setUser(id, email, name) {
      this._user = {
        id: id,
        email: email,
        name: name
      };
    };

    _proto.toJSON = function toJSON() {
      return {
        id: this.id,
        startedAt: this.startedAt,
        events: {
          handled: this._handled,
          unhandled: this._unhandled
        }
      };
    };

    _proto._track = function _track(event) {
      this[event._handledState.unhandled ? '_unhandled' : '_handled'] += 1;
    };

    return Session;
  }();

  var _$Session_34 = Session;

  var noop = function () {};

  var Client = /*#__PURE__*/function () {
    function Client(configuration, schema, internalPlugins, notifier) {
      var _this = this;

      if (schema === void 0) {
        schema = _$config_5.schema;
      }

      if (internalPlugins === void 0) {
        internalPlugins = [];
      } // notifier id


      this._notifier = notifier; // intialise opts and config

      this._config = {};
      this._schema = schema; // i/o

      this._delivery = {
        sendSession: noop,
        sendEvent: noop
      };
      this._logger = {
        debug: noop,
        info: noop,
        warn: noop,
        error: noop
      }; // plugins

      this._plugins = {}; // state

      this._breadcrumbs = [];
      this._session = null;
      this._metadata = {};
      this._context = undefined;
      this._user = {}; // callbacks:
      //  e: onError
      //  s: onSession
      //  sp: onSessionPayload
      //  b: onBreadcrumb
      // (note these names are minified by hand because object
      // properties are not safe to minify automatically)

      this._cbs = {
        e: [],
        s: [],
        sp: [],
        b: []
      }; // expose internal constructors

      this.Client = Client;
      this.Event = _$Event_6;
      this.Breadcrumb = _$Breadcrumb_3;
      this.Session = _$Session_34;
      this._config = this._configure(configuration, internalPlugins);

      _$map_16(internalPlugins.concat(this._config.plugins), function (pl) {
        if (pl) _this._loadPlugin(pl);
      }); // when notify() is called we need to know how many frames are from our own source
      // this inital value is 1 not 0 because we wrap notify() to ensure it is always
      // bound to have the client as its `this` value – see below.


      this._depth = 1;
      var self = this;
      var notify = this.notify;

      this.notify = function () {
        return notify.apply(self, arguments);
      };
    }

    var _proto = Client.prototype;

    _proto.addMetadata = function addMetadata(section, keyOrObj, maybeVal) {
      return _$metadataDelegate_21.add(this._metadata, section, keyOrObj, maybeVal);
    };

    _proto.getMetadata = function getMetadata(section, key) {
      return _$metadataDelegate_21.get(this._metadata, section, key);
    };

    _proto.clearMetadata = function clearMetadata(section, key) {
      return _$metadataDelegate_21.clear(this._metadata, section, key);
    };

    _proto.getContext = function getContext() {
      return this._context;
    };

    _proto.setContext = function setContext(c) {
      this._context = c;
    };

    _proto._configure = function _configure(opts, internalPlugins) {
      var schema = _$reduce_17(internalPlugins, function (schema, plugin) {
        if (plugin && plugin.configSchema) return _$assign_11({}, schema, plugin.configSchema);
        return schema;
      }, this._schema); // accumulate configuration and error messages


      var _reduce = _$reduce_17(_$keys_15(schema), function (accum, key) {
        var defaultValue = schema[key].defaultValue(opts[key]);

        if (opts[key] !== undefined) {
          var valid = schema[key].validate(opts[key]);

          if (!valid) {
            accum.errors[key] = schema[key].message;
            accum.config[key] = defaultValue;
          } else {
            if (schema[key].allowPartialObject) {
              accum.config[key] = _$assign_11(defaultValue, opts[key]);
            } else {
              accum.config[key] = opts[key];
            }
          }
        } else {
          accum.config[key] = defaultValue;
        }

        return accum;
      }, {
        errors: {},
        config: {}
      }),
          errors = _reduce.errors,
          config = _reduce.config;

      if (schema.apiKey) {
        // missing api key is the only fatal error
        if (!config.apiKey) throw new Error('No Bugsnag API Key set'); // warn about an apikey that is not of the expected format

        if (!/^[0-9a-f]{32}$/i.test(config.apiKey)) errors.apiKey = 'should be a string of 32 hexadecimal characters';
      } // update and elevate some options


      this._metadata = _$assign_11({}, config.metadata);
      this._user = _$assign_11({}, config.user);
      this._context = config.context;
      if (config.logger) this._logger = config.logger; // add callbacks

      if (config.onError) this._cbs.e = this._cbs.e.concat(config.onError);
      if (config.onBreadcrumb) this._cbs.b = this._cbs.b.concat(config.onBreadcrumb);
      if (config.onSession) this._cbs.s = this._cbs.s.concat(config.onSession); // finally warn about any invalid config where we fell back to the default

      if (_$keys_15(errors).length) {
        this._logger.warn(generateConfigErrorMessage(errors, opts));
      }

      return config;
    };

    _proto.getUser = function getUser() {
      return this._user;
    };

    _proto.setUser = function setUser(id, email, name) {
      this._user = {
        id: id,
        email: email,
        name: name
      };
    };

    _proto._loadPlugin = function _loadPlugin(plugin) {
      var result = plugin.load(this); // JS objects are not the safest way to store arbitrarily keyed values,
      // so bookend the key with some characters that prevent tampering with
      // stuff like __proto__ etc. (only store the result if the plugin had a
      // name)

      if (plugin.name) this._plugins["~" + plugin.name + "~"] = result;
      return this;
    };

    _proto.getPlugin = function getPlugin(name) {
      return this._plugins["~" + name + "~"];
    };

    _proto._setDelivery = function _setDelivery(d) {
      this._delivery = d(this);
    };

    _proto.startSession = function startSession() {
      var session = new _$Session_34();
      session.app.releaseStage = this._config.releaseStage;
      session.app.version = this._config.appVersion;
      session.app.type = this._config.appType;
      session._user = _$assign_11({}, this._user); // run onSession callbacks

      var ignore = _$syncCallbackRunner_22(this._cbs.s, session, 'onSession', this._logger);

      if (ignore) {
        this._logger.debug('Session not started due to onSession callback');

        return this;
      }

      return this._sessionDelegate.startSession(this, session);
    };

    _proto.addOnError = function addOnError(fn, front) {
      if (front === void 0) {
        front = false;
      }

      this._cbs.e[front ? 'unshift' : 'push'](fn);
    };

    _proto.removeOnError = function removeOnError(fn) {
      this._cbs.e = _$filter_12(this._cbs.e, function (f) {
        return f !== fn;
      });
    };

    _proto._addOnSessionPayload = function _addOnSessionPayload(fn) {
      this._cbs.sp.push(fn);
    };

    _proto.addOnSession = function addOnSession(fn) {
      this._cbs.s.push(fn);
    };

    _proto.removeOnSession = function removeOnSession(fn) {
      this._cbs.s = _$filter_12(this._cbs.s, function (f) {
        return f !== fn;
      });
    };

    _proto.addOnBreadcrumb = function addOnBreadcrumb(fn, front) {
      if (front === void 0) {
        front = false;
      }

      this._cbs.b[front ? 'unshift' : 'push'](fn);
    };

    _proto.removeOnBreadcrumb = function removeOnBreadcrumb(fn) {
      this._cbs.b = _$filter_12(this._cbs.b, function (f) {
        return f !== fn;
      });
    };

    _proto.pauseSession = function pauseSession() {
      return this._sessionDelegate.pauseSession(this);
    };

    _proto.resumeSession = function resumeSession() {
      return this._sessionDelegate.resumeSession(this);
    };

    _proto.leaveBreadcrumb = function leaveBreadcrumb(message, metadata, type) {
      // coerce bad values so that the defaults get set
      message = typeof message === 'string' ? message : '';
      type = typeof type === 'string' && _$includes_13(_$breadcrumbTypes_8, type) ? type : 'manual';
      metadata = typeof metadata === 'object' && metadata !== null ? metadata : {}; // if no message, discard

      if (!message) return;
      var crumb = new _$Breadcrumb_3(message, metadata, type); // run onBreadcrumb callbacks

      var ignore = _$syncCallbackRunner_22(this._cbs.b, crumb, 'onBreadcrumb', this._logger);

      if (ignore) {
        this._logger.debug('Breadcrumb not attached due to onBreadcrumb callback');

        return;
      } // push the valid crumb onto the queue and maintain the length


      this._breadcrumbs.push(crumb);

      if (this._breadcrumbs.length > this._config.maxBreadcrumbs) {
        this._breadcrumbs = this._breadcrumbs.slice(this._breadcrumbs.length - this._config.maxBreadcrumbs);
      }
    };

    _proto.notify = function notify(maybeError, onError, cb) {
      if (cb === void 0) {
        cb = noop;
      }

      var event = _$Event_6.create(maybeError, true, undefined, 'notify()', this._depth + 1, this._logger);

      this._notify(event, onError, cb);
    };

    _proto._notify = function _notify(event, onError, cb) {
      var _this2 = this;

      if (cb === void 0) {
        cb = noop;
      }

      event.app = _$assign_11({}, event.app, {
        releaseStage: this._config.releaseStage,
        version: this._config.appVersion,
        type: this._config.appType
      });
      event.context = event.context || this._context;
      event._metadata = _$assign_11({}, event._metadata, this._metadata);
      event._user = _$assign_11({}, event._user, this._user);
      event.breadcrumbs = this._breadcrumbs.slice(); // exit early if events should not be sent on the current releaseStage

      if (this._config.enabledReleaseStages !== null && !_$includes_13(this._config.enabledReleaseStages, this._config.releaseStage)) {
        this._logger.warn('Event not sent due to releaseStage/enabledReleaseStages configuration');

        return cb(null, event);
      }

      var originalSeverity = event.severity;

      var onCallbackError = function (err) {
        // errors in callbacks are tolerated but we want to log them out
        _this2._logger.error('Error occurred in onError callback, continuing anyway…');

        _this2._logger.error(err);
      };

      var callbacks = [].concat(this._cbs.e).concat(onError);

      _$callbackRunner_9(callbacks, event, onCallbackError, function (err, shouldSend) {
        if (err) onCallbackError(err);

        if (!shouldSend) {
          _this2._logger.debug('Event not sent due to onError callback');

          return cb(null, event);
        }

        if (_$includes_13(_this2._config.enabledBreadcrumbTypes, 'error')) {
          // only leave a crumb for the error if actually got sent
          Client.prototype.leaveBreadcrumb.call(_this2, event.errors[0].errorClass, {
            errorClass: event.errors[0].errorClass,
            errorMessage: event.errors[0].errorMessage,
            severity: event.severity
          }, 'error');
        }

        if (originalSeverity !== event.severity) {
          event._handledState.severityReason = {
            type: 'userCallbackSetSeverity'
          };
        }

        if (event.unhandled !== event._handledState.unhandled) {
          event._handledState.severityReason.unhandledOverridden = true;
          event._handledState.unhandled = event.unhandled;
        }

        if (_this2._session) {
          _this2._session._track(event);

          event._session = _this2._session;
        }

        _this2._delivery.sendEvent({
          apiKey: event.apiKey || _this2._config.apiKey,
          notifier: _this2._notifier,
          events: [event]
        }, function (err) {
          return cb(err, event);
        });
      });
    };

    return Client;
  }();

  var generateConfigErrorMessage = function (errors, rawInput) {
    var er = new Error("Invalid configuration\n" + _$map_16(_$keys_15(errors), function (key) {
      return "  - " + key + " " + errors[key] + ", got " + stringify(rawInput[key]);
    }).join('\n\n'));
    return er;
  };

  var stringify = function (val) {
    switch (typeof val) {
      case 'string':
      case 'number':
      case 'object':
        return JSON.stringify(val);

      default:
        return String(val);
    }
  };

  var _$Client_4 = Client;

  var _$safeJsonStringify_29 = function (data, replacer, space, opts) {
    var redactedKeys = opts && opts.redactedKeys ? opts.redactedKeys : [];
    var redactedPaths = opts && opts.redactedPaths ? opts.redactedPaths : [];
    return JSON.stringify(prepareObjForSerialization(data, redactedKeys, redactedPaths), replacer, space);
  };

  var MAX_DEPTH = 20;
  var MAX_EDGES = 25000;
  var MIN_PRESERVED_DEPTH = 8;
  var REPLACEMENT_NODE = '...';

  function __isError_29(o) {
    return o instanceof Error || /^\[object (Error|(Dom)?Exception)\]$/.test(Object.prototype.toString.call(o));
  }

  function throwsMessage(err) {
    return '[Throws: ' + (err ? err.message : '?') + ']';
  }

  function find(haystack, needle) {
    for (var i = 0, len = haystack.length; i < len; i++) {
      if (haystack[i] === needle) return true;
    }

    return false;
  } // returns true if the string `path` starts with any of the provided `paths`


  function isDescendent(paths, path) {
    for (var i = 0, len = paths.length; i < len; i++) {
      if (path.indexOf(paths[i]) === 0) return true;
    }

    return false;
  }

  function shouldRedact(patterns, key) {
    for (var i = 0, len = patterns.length; i < len; i++) {
      if (typeof patterns[i] === 'string' && patterns[i].toLowerCase() === key.toLowerCase()) return true;
      if (patterns[i] && typeof patterns[i].test === 'function' && patterns[i].test(key)) return true;
    }

    return false;
  }

  function __isArray_29(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  }

  function safelyGetProp(obj, prop) {
    try {
      return obj[prop];
    } catch (err) {
      return throwsMessage(err);
    }
  }

  function prepareObjForSerialization(obj, redactedKeys, redactedPaths) {
    var seen = []; // store references to objects we have seen before

    var edges = 0;

    function visit(obj, path) {
      function edgesExceeded() {
        return path.length > MIN_PRESERVED_DEPTH && edges > MAX_EDGES;
      }

      edges++;
      if (path.length > MAX_DEPTH) return REPLACEMENT_NODE;
      if (edgesExceeded()) return REPLACEMENT_NODE;
      if (obj === null || typeof obj !== 'object') return obj;
      if (find(seen, obj)) return '[Circular]';
      seen.push(obj);

      if (typeof obj.toJSON === 'function') {
        try {
          // we're not going to count this as an edge because it
          // replaces the value of the currently visited object
          edges--;
          var fResult = visit(obj.toJSON(), path);
          seen.pop();
          return fResult;
        } catch (err) {
          return throwsMessage(err);
        }
      }

      var er = __isError_29(obj);

      if (er) {
        edges--;
        var eResult = visit({
          name: obj.name,
          message: obj.message
        }, path);
        seen.pop();
        return eResult;
      }

      if (__isArray_29(obj)) {
        var aResult = [];

        for (var i = 0, len = obj.length; i < len; i++) {
          if (edgesExceeded()) {
            aResult.push(REPLACEMENT_NODE);
            break;
          }

          aResult.push(visit(obj[i], path.concat('[]')));
        }

        seen.pop();
        return aResult;
      }

      var result = {};

      try {
        for (var prop in obj) {
          if (!Object.prototype.hasOwnProperty.call(obj, prop)) continue;

          if (isDescendent(redactedPaths, path.join('.')) && shouldRedact(redactedKeys, prop)) {
            result[prop] = '[REDACTED]';
            continue;
          }

          if (edgesExceeded()) {
            result[prop] = REPLACEMENT_NODE;
            break;
          }

          result[prop] = visit(safelyGetProp(obj, prop), path.concat(prop));
        }
      } catch (e) {}

      seen.pop();
      return result;
    }

    return visit(obj, []);
  }

  var _$jsonPayload_20 = {};
  var EVENT_REDACTION_PATHS = ['events.[].metaData', 'events.[].breadcrumbs.[].metaData', 'events.[].request'];

  _$jsonPayload_20.event = function (event, redactedKeys) {
    var payload = _$safeJsonStringify_29(event, null, null, {
      redactedPaths: EVENT_REDACTION_PATHS,
      redactedKeys: redactedKeys
    });

    if (payload.length > 10e5) {
      event.events[0]._metadata = {
        notifier: "WARNING!\nSerialized payload was " + payload.length / 10e5 + "MB (limit = 1MB)\nmetadata was removed"
      };
      payload = _$safeJsonStringify_29(event, null, null, {
        redactedPaths: EVENT_REDACTION_PATHS,
        redactedKeys: redactedKeys
      });
      if (payload.length > 10e5) throw new Error('payload exceeded 1MB limit');
    }

    return payload;
  };

  _$jsonPayload_20.session = function (event, redactedKeys) {
    var payload = _$safeJsonStringify_29(event, null, null);

    if (payload.length > 10e5) throw new Error('payload exceeded 1MB limit');
    return payload;
  };

  var _$delivery_35 = {};

  _$delivery_35 = function (client, win) {
    if (win === void 0) {
      win = window;
    }

    return {
      sendEvent: function (event, cb) {
        if (cb === void 0) {
          cb = function () {};
        }

        var url = getApiUrl(client._config, 'notify', '4', win);
        var req = new win.XDomainRequest();

        req.onload = function () {
          cb(null);
        };

        req.open('POST', url);
        setTimeout(function () {
          try {
            req.send(_$jsonPayload_20.event(event, client._config.redactedKeys));
          } catch (e) {
            client._logger.error(e);

            cb(e);
          }
        }, 0);
      },
      sendSession: function (session, cb) {
        if (cb === void 0) {
          cb = function () {};
        }

        var url = getApiUrl(client._config, 'sessions', '1', win);
        var req = new win.XDomainRequest();

        req.onload = function () {
          cb(null);
        };

        req.open('POST', url);
        setTimeout(function () {
          try {
            req.send(_$jsonPayload_20.session(session, client._config.redactedKeys));
          } catch (e) {
            client._logger.error(e);

            cb(e);
          }
        }, 0);
      }
    };
  };

  var getApiUrl = function (config, endpoint, version, win) {
    // IE8 doesn't support Date.prototype.toISOstring(), but it does convert a date
    // to an ISO string when you use JSON stringify. Simply parsing the result of
    // JSON.stringify is smaller than using a toISOstring() polyfill.
    var isoDate = JSON.parse(JSON.stringify(new Date()));
    var url = matchPageProtocol(config.endpoints[endpoint], win.location.protocol);
    return url + "?apiKey=" + encodeURIComponent(config.apiKey) + "&payloadVersion=" + version + "&sentAt=" + encodeURIComponent(isoDate);
  };

  var matchPageProtocol = _$delivery_35._matchPageProtocol = function (endpoint, pageProtocol) {
    return pageProtocol === 'http:' ? endpoint.replace(/^https:/, 'http:') : endpoint;
  };

  var _$delivery_36 = function (client, win) {
    if (win === void 0) {
      win = window;
    }

    return {
      sendEvent: function (event, cb) {
        if (cb === void 0) {
          cb = function () {};
        }

        try {
          var url = client._config.endpoints.notify;
          var req = new win.XMLHttpRequest();

          req.onreadystatechange = function () {
            if (req.readyState === win.XMLHttpRequest.DONE) cb(null);
          };

          req.open('POST', url);
          req.setRequestHeader('Content-Type', 'application/json');
          req.setRequestHeader('Bugsnag-Api-Key', event.apiKey || client._config.apiKey);
          req.setRequestHeader('Bugsnag-Payload-Version', '4');
          req.setRequestHeader('Bugsnag-Sent-At', new Date().toISOString());
          req.send(_$jsonPayload_20.event(event, client._config.redactedKeys));
        } catch (e) {
          client._logger.error(e);
        }
      },
      sendSession: function (session, cb) {
        if (cb === void 0) {
          cb = function () {};
        }

        try {
          var url = client._config.endpoints.sessions;
          var req = new win.XMLHttpRequest();

          req.onreadystatechange = function () {
            if (req.readyState === win.XMLHttpRequest.DONE) cb(null);
          };

          req.open('POST', url);
          req.setRequestHeader('Content-Type', 'application/json');
          req.setRequestHeader('Bugsnag-Api-Key', client._config.apiKey);
          req.setRequestHeader('Bugsnag-Payload-Version', '1');
          req.setRequestHeader('Bugsnag-Sent-At', new Date().toISOString());
          req.send(_$jsonPayload_20.session(session, client._config.redactedKeys));
        } catch (e) {
          client._logger.error(e);
        }
      }
    };
  };

  var appStart = new Date();

  var reset = function () {
    appStart = new Date();
  };

  var _$app_37 = {
    name: 'appDuration',
    load: function (client) {
      client.addOnError(function (event) {
        var now = new Date();
        event.app.duration = now - appStart;
      }, true);
      return {
        reset: reset
      };
    }
  };
  /*
   * Sets the default context to be the current URL
   */

  var _$context_38 = function (win) {
    if (win === void 0) {
      win = window;
    }

    return {
      load: function (client) {
        client.addOnError(function (event) {
          if (event.context !== undefined) return;
          event.context = win.location.pathname;
        }, true);
      }
    };
  };

  var _$pad_42 = function pad(num, size) {
    var s = '000000000' + num;
    return s.substr(s.length - size);
  };

  var __env_41 = typeof window === 'object' ? window : self;

  var __globalCount_41 = 0;

  for (var __prop_41 in __env_41) {
    if (Object.hasOwnProperty.call(__env_41, __prop_41)) __globalCount_41++;
  }

  var __mimeTypesLength_41 = navigator.mimeTypes ? navigator.mimeTypes.length : 0;

  var __clientId_41 = _$pad_42((__mimeTypesLength_41 + navigator.userAgent.length).toString(36) + __globalCount_41.toString(36), 4);

  var _$fingerprint_41 = function fingerprint() {
    return __clientId_41;
  };

  var __c_40 = 0,
      __blockSize_40 = 4,
      __base_40 = 36,
      __discreteValues_40 = Math.pow(__base_40, __blockSize_40);

  function __randomBlock_40() {
    return _$pad_42((Math.random() * __discreteValues_40 << 0).toString(__base_40), __blockSize_40);
  }

  function __safeCounter_40() {
    __c_40 = __c_40 < __discreteValues_40 ? __c_40 : 0;
    __c_40++; // this is not subliminal

    return __c_40 - 1;
  }

  function __cuid_40() {
    // Starting with a lowercase letter makes
    // it HTML element ID friendly.
    var letter = 'c',
        // hard-coded allows for sequential access
    // timestamp
    // warning: this exposes the exact date and time
    // that the uid was created.
    timestamp = new Date().getTime().toString(__base_40),
        // Prevent same-machine collisions.
    counter = _$pad_42(__safeCounter_40().toString(__base_40), __blockSize_40),
        // A few chars to generate distinct ids for different
    // clients (so different computers are far less
    // likely to generate the same id)
    print = _$fingerprint_41(),
        // Grab some more chars from Math.random()
    random = __randomBlock_40() + __randomBlock_40();

    return letter + timestamp + counter + print + random;
  }

  __cuid_40.fingerprint = _$fingerprint_41;
  var _$cuid_40 = __cuid_40;
  var BUGSNAG_ANONYMOUS_ID_KEY = 'bugsnag-anonymous-id';

  var getDeviceId = function () {
    try {
      var storage = window.localStorage;
      var id = storage.getItem(BUGSNAG_ANONYMOUS_ID_KEY); // If we get an ID, make sure it looks like a valid cuid. The length can
      // fluctuate slightly, so some leeway is built in

      if (id && /^c[a-z0-9]{20,32}$/.test(id)) {
        return id;
      }

      id = _$cuid_40();
      storage.setItem(BUGSNAG_ANONYMOUS_ID_KEY, id);
      return id;
    } catch (err) {// If localStorage is not available (e.g. because it's disabled) then give up
    }
  };
  /*
   * Automatically detects browser device details
   */


  var _$device_39 = function (nav, screen) {
    if (nav === void 0) {
      nav = navigator;
    }

    if (screen === void 0) {
      screen = window.screen;
    }

    return {
      load: function (client) {
        var device = {
          locale: nav.browserLanguage || nav.systemLanguage || nav.userLanguage || nav.language,
          userAgent: nav.userAgent
        };

        if (screen && screen.orientation && screen.orientation.type) {
          device.orientation = screen.orientation.type;
        } else {
          device.orientation = document.documentElement.clientWidth > document.documentElement.clientHeight ? 'landscape' : 'portrait';
        }

        if (client._config.generateAnonymousId) {
          device.id = getDeviceId();
        }

        client.addOnSession(function (session) {
          session.device = _$assign_11({}, session.device, device);
        }); // add time just as the event is sent

        client.addOnError(function (event) {
          event.device = _$assign_11({}, event.device, device, {
            time: new Date()
          });
        }, true);
      },
      configSchema: {
        generateAnonymousId: {
          validate: function (value) {
            return value === true || value === false;
          },
          defaultValue: function () {
            return true;
          },
          message: 'should be true|false'
        }
      }
    };
  };
  /*
   * Sets the event request: { url } to be the current href
   */

  var _$request_43 = function (win) {
    if (win === void 0) {
      win = window;
    }

    return {
      load: function (client) {
        client.addOnError(function (event) {
          if (event.request && event.request.url) return;
          event.request = _$assign_11({}, event.request, {
            url: win.location.href
          });
        }, true);
      }
    };
  };
  var _$session_44 = {
    load: function (client) {
      client._sessionDelegate = sessionDelegate;
    }
  };
  var sessionDelegate = {
    startSession: function (client, session) {
      var sessionClient = client;
      sessionClient._session = session;
      sessionClient._pausedSession = null; // exit early if the current releaseStage is not enabled

      if (sessionClient._config.enabledReleaseStages !== null && !_$includes_13(sessionClient._config.enabledReleaseStages, sessionClient._config.releaseStage)) {
        sessionClient._logger.warn('Session not sent due to releaseStage/enabledReleaseStages configuration');

        return sessionClient;
      }

      sessionClient._delivery.sendSession({
        notifier: sessionClient._notifier,
        device: session.device,
        app: session.app,
        sessions: [{
          id: session.id,
          startedAt: session.startedAt,
          user: session._user
        }]
      });

      return sessionClient;
    },
    resumeSession: function (client) {
      // Do nothing if there's already an active session
      if (client._session) {
        return client;
      } // If we have a paused session then make it the active session


      if (client._pausedSession) {
        client._session = client._pausedSession;
        client._pausedSession = null;
        return client;
      } // Otherwise start a new session


      return client.startSession();
    },
    pauseSession: function (client) {
      client._pausedSession = client._session;
      client._session = null;
    }
  };
  /*
   * Prevent collection of user IPs
   */

  var _$clientIp_45 = {
    load: function (client) {
      if (client._config.collectUserIp) return;
      client.addOnError(function (event) {
        // If user.id is explicitly undefined, it will be missing from the payload. It needs
        // removing so that the following line replaces it
        if (event._user && typeof event._user.id === 'undefined') delete event._user.id;
        event._user = _$assign_11({
          id: '[REDACTED]'
        }, event._user);
        event.request = _$assign_11({
          clientIp: '[REDACTED]'
        }, event.request);
      });
    },
    configSchema: {
      collectUserIp: {
        defaultValue: function () {
          return true;
        },
        message: 'should be true|false',
        validate: function (value) {
          return value === true || value === false;
        }
      }
    }
  };
  var _$consoleBreadcrumbs_46 = {};
  /*
   * Leaves breadcrumbs when console log methods are called
   */

  _$consoleBreadcrumbs_46.load = function (client) {
    var isDev = /^dev(elopment)?$/.test(client._config.releaseStage);
    if (!client._config.enabledBreadcrumbTypes || !_$includes_13(client._config.enabledBreadcrumbTypes, 'log') || isDev) return;

    _$map_16(CONSOLE_LOG_METHODS, function (method) {
      var original = console[method];

      console[method] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        client.leaveBreadcrumb('Console output', _$reduce_17(args, function (accum, arg, i) {
          // do the best/simplest stringification of each argument
          var stringified = '[Unknown value]'; // this may fail if the input is:
          // - an object whose [[Prototype]] is null (no toString)
          // - an object with a broken toString or @@toPrimitive implementation

          try {
            stringified = String(arg);
          } catch (e) {} // if it stringifies to [object Object] attempt to JSON stringify


          if (stringified === '[object Object]') {
            // catch stringify errors and fallback to [object Object]
            try {
              stringified = JSON.stringify(arg);
            } catch (e) {}
          }

          accum["[" + i + "]"] = stringified;
          return accum;
        }, {
          severity: method.indexOf('group') === 0 ? 'log' : method
        }), 'log');
        original.apply(console, args);
      };

      console[method]._restore = function () {
        console[method] = original;
      };
    });
  };

  var CONSOLE_LOG_METHODS = _$filter_12(['log', 'debug', 'info', 'warn', 'error'], function (method) {
    return typeof console !== 'undefined' && typeof console[method] === 'function';
  });
  var MAX_LINE_LENGTH = 200;
  var MAX_SCRIPT_LENGTH = 500000;

  var _$inlineScriptContent_47 = function (doc, win) {
    if (doc === void 0) {
      doc = document;
    }

    if (win === void 0) {
      win = window;
    }

    return {
      load: function (client) {
        if (!client._config.trackInlineScripts) return;
        var originalLocation = win.location.href;
        var html = ''; // in IE8-10 the 'interactive' state can fire too soon (before scripts have finished executing), so in those
        // we wait for the 'complete' state before assuming that synchronous scripts are no longer executing

        var isOldIe = !!doc.attachEvent;
        var DOMContentLoaded = isOldIe ? doc.readyState === 'complete' : doc.readyState !== 'loading';

        var getHtml = function () {
          return doc.documentElement.outerHTML;
        }; // get whatever HTML exists at this point in time


        html = getHtml();
        var prev = doc.onreadystatechange; // then update it when the DOM content has loaded

        doc.onreadystatechange = function () {
          // IE8 compatible alternative to document#DOMContentLoaded
          if (doc.readyState === 'interactive') {
            html = getHtml();
            DOMContentLoaded = true;
          }

          try {
            prev.apply(this, arguments);
          } catch (e) {}
        };

        var _lastScript = null;

        var updateLastScript = function (script) {
          _lastScript = script;
        };

        var getCurrentScript = function () {
          var script = doc.currentScript || _lastScript;

          if (!script && !DOMContentLoaded) {
            var scripts = doc.scripts || doc.getElementsByTagName('script');
            script = scripts[scripts.length - 1];
          }

          return script;
        };

        var addSurroundingCode = function (lineNumber) {
          // get whatever html has rendered at this point
          if (!DOMContentLoaded || !html) html = getHtml(); // simulate the raw html

          var htmlLines = ['<!-- DOC START -->'].concat(html.split('\n'));
          var zeroBasedLine = lineNumber - 1;
          var start = Math.max(zeroBasedLine - 3, 0);
          var end = Math.min(zeroBasedLine + 3, htmlLines.length);
          return _$reduce_17(htmlLines.slice(start, end), function (accum, line, i) {
            accum[start + 1 + i] = line.length <= MAX_LINE_LENGTH ? line : line.substr(0, MAX_LINE_LENGTH);
            return accum;
          }, {});
        };

        client.addOnError(function (event) {
          // remove any of our own frames that may be part the stack this
          // happens before the inline script check as it happens for all errors
          event.errors[0].stacktrace = _$filter_12(event.errors[0].stacktrace, function (f) {
            return !/__trace__$/.test(f.method);
          });
          var frame = event.errors[0].stacktrace[0]; // if frame.file exists and is not the original location of the page, this can't be an inline script

          if (frame && frame.file && frame.file.replace(/#.*$/, '') !== originalLocation.replace(/#.*$/, '')) return; // grab the last script known to have run

          var currentScript = getCurrentScript();

          if (currentScript) {
            var content = currentScript.innerHTML;
            event.addMetadata('script', 'content', content.length <= MAX_SCRIPT_LENGTH ? content : content.substr(0, MAX_SCRIPT_LENGTH)); // only attempt to grab some surrounding code if we have a line number

            if (frame && frame.lineNumber) {
              frame.code = addSurroundingCode(frame.lineNumber);
            }
          }
        }, true); // Proxy all the timer functions whose callback is their 0th argument.
        // Keep a reference to the original setTimeout because we need it later

        var _map = _$map_16(['setTimeout', 'setInterval', 'setImmediate', 'requestAnimationFrame'], function (fn) {
          return __proxy(win, fn, function (original) {
            return __traceOriginalScript(original, function (args) {
              return {
                get: function () {
                  return args[0];
                },
                replace: function (fn) {
                  args[0] = fn;
                }
              };
            });
          });
        }),
            _setTimeout = _map[0]; // Proxy all the host objects whose prototypes have an addEventListener function


        _$map_16(['EventTarget', 'Window', 'Node', 'ApplicationCache', 'AudioTrackList', 'ChannelMergerNode', 'CryptoOperation', 'EventSource', 'FileReader', 'HTMLUnknownElement', 'IDBDatabase', 'IDBRequest', 'IDBTransaction', 'KeyOperation', 'MediaController', 'MessagePort', 'ModalWindow', 'Notification', 'SVGElementInstance', 'Screen', 'TextTrack', 'TextTrackCue', 'TextTrackList', 'WebSocket', 'WebSocketWorker', 'Worker', 'XMLHttpRequest', 'XMLHttpRequestEventTarget', 'XMLHttpRequestUpload'], function (o) {
          if (!win[o] || !win[o].prototype || !Object.prototype.hasOwnProperty.call(win[o].prototype, 'addEventListener')) return;

          __proxy(win[o].prototype, 'addEventListener', function (original) {
            return __traceOriginalScript(original, eventTargetCallbackAccessor);
          });

          __proxy(win[o].prototype, 'removeEventListener', function (original) {
            return __traceOriginalScript(original, eventTargetCallbackAccessor, true);
          });
        });

        function __traceOriginalScript(fn, callbackAccessor, alsoCallOriginal) {
          if (alsoCallOriginal === void 0) {
            alsoCallOriginal = false;
          }

          return function () {
            // this is required for removeEventListener to remove anything added with
            // addEventListener before the functions started being wrapped by Bugsnag
            var args = [].slice.call(arguments);

            try {
              var cba = callbackAccessor(args);
              var cb = cba.get();
              if (alsoCallOriginal) fn.apply(this, args);
              if (typeof cb !== 'function') return fn.apply(this, args);

              if (cb.__trace__) {
                cba.replace(cb.__trace__);
              } else {
                var script = getCurrentScript(); // this function mustn't be annonymous due to a bug in the stack
                // generation logic, meaning it gets tripped up
                // see: https://github.com/stacktracejs/stack-generator/issues/6

                cb.__trace__ = function __trace__() {
                  // set the script that called this function
                  updateLastScript(script); // immediately unset the currentScript synchronously below, however
                  // if this cb throws an error the line after will not get run so schedule
                  // an almost-immediate aysnc update too

                  _setTimeout(function () {
                    updateLastScript(null);
                  }, 0);

                  var ret = cb.apply(this, arguments);
                  updateLastScript(null);
                  return ret;
                };

                cb.__trace__.__trace__ = cb.__trace__;
                cba.replace(cb.__trace__);
              }
            } catch (e) {} // swallow these errors on Selenium:
            // Permission denied to access property '__trace__'
            // WebDriverException: Message: Permission denied to access property "handleEvent"
            // IE8 doesn't let you call .apply() on setTimeout/setInterval


            if (fn.apply) return fn.apply(this, args);

            switch (args.length) {
              case 1:
                return fn(args[0]);

              case 2:
                return fn(args[0], args[1]);

              default:
                return fn();
            }
          };
        }
      },
      configSchema: {
        trackInlineScripts: {
          validate: function (value) {
            return value === true || value === false;
          },
          defaultValue: function () {
            return true;
          },
          message: 'should be true|false'
        }
      }
    };
  };

  function __proxy(host, name, replacer) {
    var original = host[name];
    if (!original) return original;
    var replacement = replacer(original);
    host[name] = replacement;
    return original;
  }

  function eventTargetCallbackAccessor(args) {
    var isEventHandlerObj = !!args[1] && typeof args[1].handleEvent === 'function';
    return {
      get: function () {
        return isEventHandlerObj ? args[1].handleEvent : args[1];
      },
      replace: function (fn) {
        if (isEventHandlerObj) {
          args[1].handleEvent = fn;
        } else {
          args[1] = fn;
        }
      }
    };
  }
  /*
   * Leaves breadcrumbs when the user interacts with the DOM
   */

  var _$interactionBreadcrumbs_48 = function (win) {
    if (win === void 0) {
      win = window;
    }

    return {
      load: function (client) {
        if (!('addEventListener' in win)) return;
        if (!client._config.enabledBreadcrumbTypes || !_$includes_13(client._config.enabledBreadcrumbTypes, 'user')) return;
        win.addEventListener('click', function (event) {
          var targetText, targetSelector;

          try {
            targetText = getNodeText(event.target);
            targetSelector = getNodeSelector(event.target, win);
          } catch (e) {
            targetText = '[hidden]';
            targetSelector = '[hidden]';

            client._logger.error('Cross domain error when tracking click event. See docs: https://tinyurl.com/yy3rn63z');
          }

          client.leaveBreadcrumb('UI click', {
            targetText: targetText,
            targetSelector: targetSelector
          }, 'user');
        }, true);
      }
    };
  }; // extract text content from a element


  var getNodeText = function (el) {
    var text = el.textContent || el.innerText || '';
    if (!text && (el.type === 'submit' || el.type === 'button')) text = el.value;
    text = text.replace(/^\s+|\s+$/g, ''); // trim whitespace

    return truncate(text, 140);
  }; // Create a label from tagname, id and css class of the element


  function getNodeSelector(el, win) {
    var parts = [el.tagName];
    if (el.id) parts.push('#' + el.id);
    if (el.className && el.className.length) parts.push("." + el.className.split(' ').join('.')); // Can't get much more advanced with the current browser

    if (!win.document.querySelectorAll || !Array.prototype.indexOf) return parts.join('');

    try {
      if (win.document.querySelectorAll(parts.join('')).length === 1) return parts.join('');
    } catch (e) {
      // Sometimes the query selector can be invalid just return it as-is
      return parts.join('');
    } // try to get a more specific selector if this one matches more than one element


    if (el.parentNode.childNodes.length > 1) {
      var index = Array.prototype.indexOf.call(el.parentNode.childNodes, el) + 1;
      parts.push(":nth-child(" + index + ")");
    }

    if (win.document.querySelectorAll(parts.join('')).length === 1) return parts.join(''); // try prepending the parent node selector

    if (el.parentNode) return getNodeSelector(el.parentNode, win) + " > " + parts.join('');
    return parts.join('');
  }

  function truncate(value, length) {
    var ommision = '(...)';
    if (value && value.length <= length) return value;
    return value.slice(0, length - ommision.length) + ommision;
  }

  var _$navigationBreadcrumbs_49 = {};
  /*
  * Leaves breadcrumbs when navigation methods are called or events are emitted
  */

  _$navigationBreadcrumbs_49 = function (win) {
    if (win === void 0) {
      win = window;
    }

    var plugin = {
      load: function (client) {
        if (!('addEventListener' in win)) return;
        if (!client._config.enabledBreadcrumbTypes || !_$includes_13(client._config.enabledBreadcrumbTypes, 'navigation')) return; // returns a function that will drop a breadcrumb with a given name

        var drop = function (name) {
          return function () {
            return client.leaveBreadcrumb(name, {}, 'navigation');
          };
        }; // simple drops – just names, no meta


        win.addEventListener('pagehide', drop('Page hidden'), true);
        win.addEventListener('pageshow', drop('Page shown'), true);
        win.addEventListener('load', drop('Page loaded'), true);
        win.document.addEventListener('DOMContentLoaded', drop('DOMContentLoaded'), true); // some browsers like to emit popstate when the page loads, so only add the popstate listener after that

        win.addEventListener('load', function () {
          return win.addEventListener('popstate', drop('Navigated back'), true);
        }); // hashchange has some metadata that we care about

        win.addEventListener('hashchange', function (event) {
          var metadata = event.oldURL ? {
            from: relativeLocation(event.oldURL, win),
            to: relativeLocation(event.newURL, win),
            state: getCurrentState(win)
          } : {
            to: relativeLocation(win.location.href, win)
          };
          client.leaveBreadcrumb('Hash changed', metadata, 'navigation');
        }, true); // the only way to know about replaceState/pushState is to wrap them… >_<

        if (win.history.replaceState) wrapHistoryFn(client, win.history, 'replaceState', win);
        if (win.history.pushState) wrapHistoryFn(client, win.history, 'pushState', win);
        client.leaveBreadcrumb('Bugsnag loaded', {}, 'navigation');
      }
    };

    return plugin;
  };
  // just the path and hash parts, e.g. /pages/01.html?yes=no#section-2


  var relativeLocation = function (url, win) {
    var a = win.document.createElement('A');
    a.href = url;
    return "" + a.pathname + a.search + a.hash;
  };

  var stateChangeToMetadata = function (win, state, title, url) {
    var currentPath = relativeLocation(win.location.href, win);
    return {
      title: title,
      state: state,
      prevState: getCurrentState(win),
      to: url || currentPath,
      from: currentPath
    };
  };

  var wrapHistoryFn = function (client, target, fn, win) {
    var orig = target[fn];

    target[fn] = function (state, title, url) {
      client.leaveBreadcrumb("History " + fn, stateChangeToMetadata(win, state, title, url), 'navigation'); // if throttle plugin is in use, reset the event sent count

      if (typeof client.resetEventCount === 'function') client.resetEventCount(); // if the client is operating in auto session-mode, a new route should trigger a new session

      if (client._config.autoTrackSessions) client.startSession(); // Internet Explorer will convert `undefined` to a string when passed, causing an unintended redirect
      // to '/undefined'. therefore we only pass the url if it's not undefined.

      orig.apply(target, [state, title].concat(url !== undefined ? url : []));
    };
  };

  var getCurrentState = function (win) {
    try {
      return win.history.state;
    } catch (e) {}
  };

  var BREADCRUMB_TYPE = 'request'; // keys to safely store metadata on the request object

  var REQUEST_SETUP_KEY = 'BS~~S';
  var REQUEST_URL_KEY = 'BS~~U';
  var REQUEST_METHOD_KEY = 'BS~~M';
  /*
   * Leaves breadcrumbs when network requests occur
   */

  var _$networkBreadcrumbs_50 = function (_ignoredUrls, win) {
    if (_ignoredUrls === void 0) {
      _ignoredUrls = [];
    }

    if (win === void 0) {
      win = window;
    }
    var plugin = {
      load: function (client) {
        if (!client._config.enabledBreadcrumbTypes || !_$includes_13(client._config.enabledBreadcrumbTypes, 'request')) return;
        var ignoredUrls = [client._config.endpoints.notify, client._config.endpoints.sessions].concat(_ignoredUrls);
        monkeyPatchXMLHttpRequest();
        monkeyPatchFetch(); // XMLHttpRequest monkey patch

        function monkeyPatchXMLHttpRequest() {
          if (!('addEventListener' in win.XMLHttpRequest.prototype)) return;
          var nativeOpen = win.XMLHttpRequest.prototype.open; // override native open()

          win.XMLHttpRequest.prototype.open = function open(method, url) {
            // store url and HTTP method for later
            this[REQUEST_URL_KEY] = url;
            this[REQUEST_METHOD_KEY] = method; // if we have already setup listeners, it means open() was called twice, we need to remove
            // the listeners and recreate them

            if (this[REQUEST_SETUP_KEY]) {
              this.removeEventListener('load', handleXHRLoad);
              this.removeEventListener('error', handleXHRError);
            } // attach load event listener


            this.addEventListener('load', handleXHRLoad); // attach error event listener

            this.addEventListener('error', handleXHRError);
            this[REQUEST_SETUP_KEY] = true;
            nativeOpen.apply(this, arguments);
          };
        }

        function handleXHRLoad() {
          if (_$includes_13(ignoredUrls, this[REQUEST_URL_KEY])) {
            // don't leave a network breadcrumb from bugsnag notify calls
            return;
          }

          var metadata = {
            status: this.status,
            request: this[REQUEST_METHOD_KEY] + " " + this[REQUEST_URL_KEY]
          };

          if (this.status >= 400) {
            // contacted server but got an error response
            client.leaveBreadcrumb('XMLHttpRequest failed', metadata, BREADCRUMB_TYPE);
          } else {
            client.leaveBreadcrumb('XMLHttpRequest succeeded', metadata, BREADCRUMB_TYPE);
          }
        }

        function handleXHRError() {
          if (_$includes_13(ignoredUrls, this[REQUEST_URL_KEY])) {
            // don't leave a network breadcrumb from bugsnag notify calls
            return;
          } // failed to contact server


          client.leaveBreadcrumb('XMLHttpRequest error', {
            request: this[REQUEST_METHOD_KEY] + " " + this[REQUEST_URL_KEY]
          }, BREADCRUMB_TYPE);
        } // window.fetch monkey patch


        function monkeyPatchFetch() {
          // only patch it if it exists and if it is not a polyfill (patching a polyfilled
          // fetch() results in duplicate breadcrumbs for the same request because the
          // implementation uses XMLHttpRequest which is also patched)
          if (!('fetch' in win) || win.fetch.polyfill) return;
          var oldFetch = win.fetch;

          win.fetch = function fetch() {
            var _arguments = arguments;
            var urlOrRequest = arguments[0];
            var options = arguments[1];
            var method;
            var url = null;

            if (urlOrRequest && typeof urlOrRequest === 'object') {
              url = urlOrRequest.url;

              if (options && 'method' in options) {
                method = options.method;
              } else if (urlOrRequest && 'method' in urlOrRequest) {
                method = urlOrRequest.method;
              }
            } else {
              url = urlOrRequest;

              if (options && 'method' in options) {
                method = options.method;
              }
            }

            if (method === undefined) {
              method = 'GET';
            }

            return new Promise(function (resolve, reject) {
              // pass through to native fetch
              oldFetch.apply(void 0, _arguments).then(function (response) {
                handleFetchSuccess(response, method, url);
                resolve(response);
              })["catch"](function (error) {
                handleFetchError(method, url);
                reject(error);
              });
            });
          };
        }

        var handleFetchSuccess = function (response, method, url) {
          var metadata = {
            status: response.status,
            request: method + " " + url
          };

          if (response.status >= 400) {
            // when the request comes back with a 4xx or 5xx status it does not reject the fetch promise,
            client.leaveBreadcrumb('fetch() failed', metadata, BREADCRUMB_TYPE);
          } else {
            client.leaveBreadcrumb('fetch() succeeded', metadata, BREADCRUMB_TYPE);
          }
        };

        var handleFetchError = function (method, url) {
          client.leaveBreadcrumb('fetch() error', {
            request: method + " " + url
          }, BREADCRUMB_TYPE);
        };
      }
    };

    return plugin;
  };
  /*
   * Throttles and dedupes events
   */

  var _$throttle_51 = {
    load: function (client) {
      // track sent events for each init of the plugin
      var n = 0; // add onError hook

      client.addOnError(function (event) {
        // have max events been sent already?
        if (n >= client._config.maxEvents) return false;
        n++;
      });

      client.resetEventCount = function () {
        n = 0;
      };
    },
    configSchema: {
      maxEvents: {
        defaultValue: function () {
          return 10;
        },
        message: 'should be a positive integer ≤100',
        validate: function (val) {
          return _$intRange_23(1, 100)(val);
        }
      }
    }
  };
  var _$stripQueryString_52 = {};
  _$stripQueryString_52 = {
    load: function (client) {
      client.addOnError(function (event) {
        var allFrames = _$reduce_17(event.errors, function (accum, er) {
          return accum.concat(er.stacktrace);
        }, []);

        _$map_16(allFrames, function (frame) {
          frame.file = strip(frame.file);
        });
      });
    }
  };

  var strip = _$stripQueryString_52._strip = function (str) {
    return typeof str === 'string' ? str.replace(/\?.*$/, '').replace(/#.*$/, '') : str;
  };
  /*
   * Automatically notifies Bugsnag when window.onerror is called
   */


  var _$onerror_53 = function (win) {
    if (win === void 0) {
      win = window;
    }

    return {
      load: function (client) {
        if (!client._config.autoDetectErrors) return;
        if (!client._config.enabledErrorTypes.unhandledExceptions) return;

        function onerror(messageOrEvent, url, lineNo, charNo, error) {
          // Ignore errors with no info due to CORS settings
          if (lineNo === 0 && /Script error\.?/.test(messageOrEvent)) {
            client._logger.warn('Ignoring cross-domain or eval script error. See docs: https://tinyurl.com/yy3rn63z');
          } else {
            // any error sent to window.onerror is unhandled and has severity=error
            var handledState = {
              severity: 'error',
              unhandled: true,
              severityReason: {
                type: 'unhandledException'
              }
            };
            var event; // window.onerror can be called in a number of ways. This big if-else is how we
            // figure out which arguments were supplied, and what kind of values it received.

            if (error) {
              // if the last parameter (error) was supplied, this is a modern browser's
              // way of saying "this value was thrown and not caught"
              event = client.Event.create(error, true, handledState, 'window onerror', 1);
              decorateStack(event.errors[0].stacktrace, url, lineNo, charNo);
            } else if ( // This complex case detects "error" events that are typically synthesised
            // by jquery's trigger method (although can be created in other ways). In
            // order to detect this:
            // - the first argument (message) must exist and be an object (most likely it's a jQuery event)
            // - the second argument (url) must either not exist or be something other than a string (if it
            //    exists and is not a string, it'll be the extraParameters argument from jQuery's trigger()
            //    function)
            // - the third, fourth and fifth arguments must not exist (lineNo, charNo and error)
            typeof messageOrEvent === 'object' && messageOrEvent !== null && (!url || typeof url !== 'string') && !lineNo && !charNo && !error) {
              // The jQuery event may have a "type" property, if so use it as part of the error message
              var name = messageOrEvent.type ? "Event: " + messageOrEvent.type : 'Error'; // attempt to find a message from one of the conventional properties, but
              // default to empty string (the event will fill it with a placeholder)

              var message = messageOrEvent.message || messageOrEvent.detail || '';
              event = client.Event.create({
                name: name,
                message: message
              }, true, handledState, 'window onerror', 1); // provide the original thing onerror received – not our error-like object we passed to _notify

              event.originalError = messageOrEvent; // include the raw input as metadata – it might contain more info than we extracted

              event.addMetadata('window onerror', {
                event: messageOrEvent,
                extraParameters: url
              });
            } else {
              // Lastly, if there was no "error" parameter this event was probably from an old
              // browser that doesn't support that. Instead we need to generate a stacktrace.
              event = client.Event.create(messageOrEvent, true, handledState, 'window onerror', 1);
              decorateStack(event.errors[0].stacktrace, url, lineNo, charNo);
            }

            client._notify(event);
          }

          if (typeof prevOnError === 'function') prevOnError.apply(this, arguments);
        }

        var prevOnError = win.onerror;
        win.onerror = onerror;
      }
    };
  }; // Sometimes the stacktrace has less information than was passed to window.onerror.
  // This function will augment the first stackframe with any useful info that was
  // received as arguments to the onerror callback.


  var decorateStack = function (stack, url, lineNo, charNo) {
    if (!stack[0]) stack.push({});
    var culprit = stack[0];
    if (!culprit.file && typeof url === 'string') culprit.file = url;
    if (!culprit.lineNumber && isActualNumber(lineNo)) culprit.lineNumber = lineNo;

    if (!culprit.columnNumber) {
      if (isActualNumber(charNo)) {
        culprit.columnNumber = charNo;
      } else if (window.event && isActualNumber(window.event.errorCharacter)) {
        culprit.columnNumber = window.event.errorCharacter;
      }
    }
  };

  var isActualNumber = function (n) {
    return typeof n === 'number' && String.call(n) !== 'NaN';
  };
  /*
   * Automatically notifies Bugsnag when window.onunhandledrejection is called
   */


  var _$unhandledRejection_54 = function (win) {
    if (win === void 0) {
      win = window;
    }

    var plugin = {
      load: function (client) {
        if (!client._config.autoDetectErrors || !client._config.enabledErrorTypes.unhandledRejections) return;

        var listener = function (evt) {
          var error = evt.reason;
          var isBluebird = false; // accessing properties on evt.detail can throw errors (see #394)

          try {
            if (evt.detail && evt.detail.reason) {
              error = evt.detail.reason;
              isBluebird = true;
            }
          } catch (e) {}

          var event = client.Event.create(error, false, {
            severity: 'error',
            unhandled: true,
            severityReason: {
              type: 'unhandledPromiseRejection'
            }
          }, 'unhandledrejection handler', 1, client._logger);

          if (isBluebird) {
            _$map_16(event.errors[0].stacktrace, fixBluebirdStacktrace(error));
          }

          client._notify(event, function (event) {
            if (_$iserror_19(event.originalError) && !event.originalError.stack) {
              var _event$addMetadata;

              event.addMetadata('unhandledRejection handler', (_event$addMetadata = {}, _event$addMetadata[Object.prototype.toString.call(event.originalError)] = {
                name: event.originalError.name,
                message: event.originalError.message,
                code: event.originalError.code
              }, _event$addMetadata));
            }
          });
        };

        if ('addEventListener' in win) {
          win.addEventListener('unhandledrejection', listener);
        } else {
          win.onunhandledrejection = function (reason, promise) {
            listener({
              detail: {
                reason: reason,
                promise: promise
              }
            });
          };
        }
      }
    };

    return plugin;
  }; // The stack parser on bluebird stacks in FF get a suprious first frame:
  //
  // Error: derp
  //   b@http://localhost:5000/bluebird.html:22:24
  //   a@http://localhost:5000/bluebird.html:18:9
  //   @http://localhost:5000/bluebird.html:14:9
  //
  // results in
  //   […]
  //     0: Object { file: "Error: derp", method: undefined, lineNumber: undefined, … }
  //     1: Object { file: "http://localhost:5000/bluebird.html", method: "b", lineNumber: 22, … }
  //     2: Object { file: "http://localhost:5000/bluebird.html", method: "a", lineNumber: 18, … }
  //     3: Object { file: "http://localhost:5000/bluebird.html", lineNumber: 14, columnNumber: 9, … }
  //
  // so the following reduce/accumulator function removes such frames
  //
  // Bluebird pads method names with spaces so trim that too…
  // https://github.com/petkaantonov/bluebird/blob/b7f21399816d02f979fe434585334ce901dcaf44/src/debuggability.js#L568-L571


  var fixBluebirdStacktrace = function (error) {
    return function (frame) {
      if (frame.file === error.toString()) return;

      if (frame.method) {
        frame.method = frame.method.replace(/^\s+/, '');
      }
    };
  };

  var _$notifier_2 = {};
  var name = 'Bugsnag JavaScript';
  var version = '7.9.2';
  var url = 'https://github.com/bugsnag/bugsnag-js';

  var __schema_2 = _$assign_11({}, _$config_5.schema, _$config_1);
  var Bugsnag = {
    _client: null,
    createClient: function (opts) {
      // handle very simple use case where user supplies just the api key as a string
      if (typeof opts === 'string') opts = {
        apiKey: opts
      };
      if (!opts) opts = {};
      var internalPlugins = [// add browser-specific plugins
      _$app_37, _$device_39(), _$context_38(), _$request_43(), _$throttle_51, _$session_44, _$clientIp_45, _$stripQueryString_52, _$onerror_53(), _$unhandledRejection_54(), _$navigationBreadcrumbs_49(), _$interactionBreadcrumbs_48(), _$networkBreadcrumbs_50(), _$consoleBreadcrumbs_46, // this one added last to avoid wrapping functionality before bugsnag uses it
      _$inlineScriptContent_47()]; // configure a client with user supplied options

      var bugsnag = new _$Client_4(opts, __schema_2, internalPlugins, {
        name: name,
        version: version,
        url: url
      }); // set delivery based on browser capability (IE 8+9 have an XDomainRequest object)

      bugsnag._setDelivery(window.XDomainRequest ? _$delivery_35 : _$delivery_36);

      bugsnag._logger.debug('Loaded!');

      return bugsnag._config.autoTrackSessions ? bugsnag.startSession() : bugsnag;
    },
    start: function (opts) {
      if (Bugsnag._client) {
        Bugsnag._client._logger.warn('Bugsnag.start() was called more than once. Ignoring.');

        return Bugsnag._client;
      }

      Bugsnag._client = Bugsnag.createClient(opts);
      return Bugsnag._client;
    }
  };

  _$map_16(['resetEventCount'].concat(_$keys_15(_$Client_4.prototype)), function (m) {
    if (/^_/.test(m)) return;

    Bugsnag[m] = function () {
      if (!Bugsnag._client) return console.log("Bugsnag." + m + "() was called before Bugsnag.start()");
      Bugsnag._client._depth += 1;

      var ret = Bugsnag._client[m].apply(Bugsnag._client, arguments);

      Bugsnag._client._depth -= 1;
      return ret;
    };
  });

  _$notifier_2 = Bugsnag;
  _$notifier_2.Client = _$Client_4;
  _$notifier_2.Event = _$Event_6;
  _$notifier_2.Session = _$Session_34;
  _$notifier_2.Breadcrumb = _$Breadcrumb_3; // Export a "default" property for compatibility with ESM imports

  _$notifier_2["default"] = Bugsnag;
  return _$notifier_2;
});
}(bugsnag));

const APP_ERROR_THROWN = 'app/error-thrown';
const APP_PATH_SET = 'app/path-set';
const APP_VERSION_SET = 'app/version-set';
const APP_SETTINGS_LOADED = 'app/settings-loaded';

const isFSA = (action) => typeof action === 'object' &&
    action !== null &&
    !Array.isArray(action) &&
    'type' in action &&
    typeof action.type === 'string';
const hasMeta = (action) => 'meta' in action &&
    typeof action.meta === 'object' &&
    action.meta !== null;
const isResponse = (action) => hasMeta(action) &&
    action.meta
        .response === true;
const isLocallyScoped = (action) => hasMeta(action) &&
    action.meta.scope === 'local';
const isErrored = (action) => 'meta' in action &&
    action.error === true &&
    action.payload instanceof Error;
const hasPayload = (action) => 'payload' in action;
const isResponseTo = (id, ...types) => (action) => isResponse(action) && types.includes(action.type) && action.meta.id === id;

const handle = (channel, handler) => {
    const listener = (_, id, ...args) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        try {
            const resolved = yield handler(...args);
            electron.ipcRenderer.send(`${channel}@${id}`, { resolved });
        }
        catch (error) {
            electron.ipcRenderer.send(`${channel}@${id}`, {
                rejected: {
                    name: error.name,
                    message: error.message,
                    stack: error.stack,
                },
            });
        }
    });
    electron.ipcRenderer.on(channel, listener);
    return () => {
        electron.ipcRenderer.removeListener(channel, listener);
    };
};
const invoke = (channel, ...args) => electron.ipcRenderer.invoke(channel, ...args);

const getInitialState = () => invoke('redux/get-initial-state');
const forwardToMain = (api) => {
    handle('redux/action-dispatched', (action) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        api.dispatch(action);
    }));
    return (next) => (action) => {
        if (!isFSA(action) || isLocallyScoped(action)) {
            return next(action);
        }
        invoke('redux/action-dispatched', action);
        return action;
    };
};

const appPath = (state = null, action) => {
    switch (action.type) {
        case APP_PATH_SET:
            return action.payload;
        default:
            return state;
    }
};

const appVersion = (state = null, action) => {
    switch (action.type) {
        case APP_VERSION_SET:
            return action.payload;
        default:
            return state;
    }
};

const DOWNLOAD_CREATED = 'downloads/created';
const DOWNLOAD_REMOVED = 'dowloads/removed';
const DOWNLOADS_CLEARED = 'downloads/cleared';
const DOWNLOAD_UPDATED = 'downloads/updated';

const downloads = (state = {}, action) => {
    var _a;
    switch (action.type) {
        case APP_SETTINGS_LOADED:
            return (_a = action.payload.downloads) !== null && _a !== void 0 ? _a : {};
        case DOWNLOAD_CREATED: {
            if (globalThis['have_new_downloads']) {
                globalThis['have_new_downloads'](true);
            }
            const download = action.payload;
            return Object.assign(Object.assign({}, state), { [download.itemId]: download });
        }
        case DOWNLOAD_UPDATED: {
            const newState = Object.assign({}, state);
            newState[action.payload.itemId] = Object.assign(Object.assign({}, newState[action.payload.itemId]), action.payload);
            return newState;
        }
        case DOWNLOAD_REMOVED: {
            const newState = Object.assign({}, state);
            delete newState[action.payload];
            return newState;
        }
        case DOWNLOADS_CLEARED:
            return {};
        default:
            return state;
    }
};

const CERTIFICATES_CLEARED = 'certificates/cleared';
const CERTIFICATES_LOADED = 'certificates/loaded';
const CERTIFICATES_CLIENT_CERTIFICATE_REQUESTED = 'certificates/client-certificate-requested';
const CERTIFICATES_UPDATED = 'certificates/updated';
const SELECT_CLIENT_CERTIFICATE_DIALOG_CERTIFICATE_SELECTED = 'select-client-certificate-dialog/certificate-selected';
const SELECT_CLIENT_CERTIFICATE_DIALOG_DISMISSED = 'select-client-certificate-dialog/dismissed';
const EXTERNAL_PROTOCOL_PERMISSION_UPDATED = 'navigation/external-protocol-permission-updated';

const clientCertificates = (state = [], action) => {
    switch (action.type) {
        case CERTIFICATES_CLIENT_CERTIFICATE_REQUESTED:
            return action.payload;
        case SELECT_CLIENT_CERTIFICATE_DIALOG_CERTIFICATE_SELECTED:
        case SELECT_CLIENT_CERTIFICATE_DIALOG_DISMISSED:
            return [];
        default:
            return state;
    }
};
const trustedCertificates = (state = {}, action) => {
    switch (action.type) {
        case CERTIFICATES_LOADED:
        case CERTIFICATES_UPDATED:
            return action.payload;
        case CERTIFICATES_CLEARED:
            return {};
        case APP_SETTINGS_LOADED: {
            const { trustedCertificates = state } = action.payload;
            return trustedCertificates;
        }
        default:
            return state;
    }
};
const externalProtocols = (state = {}, action) => {
    switch (action.type) {
        case APP_SETTINGS_LOADED: {
            const { externalProtocols = {} } = action.payload;
            state = externalProtocols;
            return state;
        }
        case EXTERNAL_PROTOCOL_PERMISSION_UPDATED: {
            state = Object.assign(Object.assign({}, state), { [action.payload.protocol]: action.payload.allowed });
            return state;
        }
        default:
            return state;
    }
};

const DEEP_LINKS_SERVER_ADDED = 'deep-links/server-added';
const DEEP_LINKS_SERVER_FOCUSED = 'deep-links/server-focused';

const ABOUT_DIALOG_DISMISSED = 'about-dialog/dismissed';
const ABOUT_DIALOG_TOGGLE_UPDATE_ON_START = 'about-dialog/toggle-update-on-start';
const ADD_SERVER_VIEW_SERVER_ADDED = 'add-server/view-server-added';
const LOADING_ERROR_VIEW_RELOAD_SERVER_CLICKED = 'loading-error-view/reload-server-clicked';
const MENU_BAR_ABOUT_CLICKED = 'menu-bar/about-clicked';
const MENU_BAR_ADD_NEW_SERVER_CLICKED = 'menu-bar/add-new-server-clicked';
const MENU_BAR_SELECT_SERVER_CLICKED = 'menu-bar/select-server-clicked';
const MENU_BAR_TOGGLE_IS_MENU_BAR_ENABLED_CLICKED = 'menu-bar/toggle-is-menu-bar-enabled-clicked';
const MENU_BAR_TOGGLE_IS_SHOW_WINDOW_ON_UNREAD_CHANGED_ENABLED_CLICKED = 'menu-bar/toggle-is-show-window-on-unread-changed-enabled-clicked';
const MENU_BAR_TOGGLE_IS_SIDE_BAR_ENABLED_CLICKED = 'menu-bar/toggle-is-side-bar-enabled-clicked';
const MENU_BAR_TOGGLE_IS_TRAY_ICON_ENABLED_CLICKED = 'menu-bar/toggle-is-tray-icon-enabled-clicked';
const ROOT_WINDOW_ICON_CHANGED = 'root-window/icon-changed';
const ROOT_WINDOW_STATE_CHANGED = 'root-window/state-changed';
const SIDE_BAR_ADD_NEW_SERVER_CLICKED = 'side-bar/add-new-server-clicked';
const SIDE_BAR_CONTEXT_MENU_TRIGGERED = 'side-bar/context-menu-triggered';
const SIDE_BAR_DOWNLOADS_BUTTON_CLICKED = 'side-bar/downloads-button-clicked';
const DOWNLOADS_PATH_CHANGED = 'downloads-path/change';
const SIDE_BAR_REMOVE_SERVER_CLICKED = 'side-bar/remove-server-clicked';
const SIDE_BAR_SERVER_SELECTED = 'side-bar/server-selected';
const SIDE_BAR_SERVERS_SORTED = 'side-bar/servers-sorted';
const TOUCH_BAR_SELECT_SERVER_TOUCHED = 'touch-bar/select-server-touched';
const UPDATE_DIALOG_DISMISSED = 'update-dialog/dismissed';
const UPDATE_DIALOG_INSTALL_BUTTON_CLICKED = 'update-dialog/install-button-clicked';
const UPDATE_DIALOG_REMIND_UPDATE_LATER_CLICKED = 'update-dialog/remind-update-later-clicked';
const UPDATE_DIALOG_SKIP_UPDATE_CLICKED = 'update-dialog/skip-update-clicked';
const WEBVIEW_ATTACHED = 'webview/attached';
const WEBVIEW_DID_FAIL_LOAD = 'webview/did-fail-load';
const WEBVIEW_DID_NAVIGATE = 'webview/did-navigate';
const WEBVIEW_DID_START_LOADING = 'webview/did-start-loading';
const WEBVIEW_FAVICON_CHANGED = 'webview/favicon-changed';
const WEBVIEW_FOCUS_REQUESTED = 'webview/focus-requested';
const WEBVIEW_MESSAGE_BOX_BLURRED = 'webview/message-box-blurred';
const WEBVIEW_MESSAGE_BOX_FOCUSED = 'webview/message-box-focused';
const WEBVIEW_SCREEN_SHARING_SOURCE_REQUESTED = 'webview/screen-sharing-source-requested';
const WEBVIEW_SCREEN_SHARING_SOURCE_RESPONDED = 'webview/screen-sharing-source-responded';
const WEBVIEW_SIDEBAR_STYLE_CHANGED = 'webview/sidebar-style-changed';
const WEBVIEW_TITLE_CHANGED = 'webview/title-changed';
const WEBVIEW_UNREAD_CHANGED = 'webview/unread-changed';

const SERVERS_LOADED = 'servers/loaded';
const SERVER_URL_RESOLUTION_REQUESTED = 'server/url-resolution-requested';
const SERVER_URL_RESOLVED = 'server/url-resolved';

const ensureUrlFormat = (serverUrl) => {
    if (serverUrl) {
        return new URL(serverUrl).href;
    }
    throw new Error('cannot handle null server URLs');
};
const upsert = (state, server) => {
    const index = state.findIndex(({ url }) => url === server.url);
    if (index === -1) {
        return [...state, server];
    }
    return state.map((_server, i) => i === index ? Object.assign(Object.assign({}, _server), server) : _server);
};
const update = (state, server) => {
    const index = state.findIndex(({ url }) => url === server.url);
    if (index === -1) {
        return state;
    }
    return state.map((_server, i) => i === index ? Object.assign(Object.assign({}, _server), server) : _server);
};
const servers = (state = [], action) => {
    switch (action.type) {
        case ADD_SERVER_VIEW_SERVER_ADDED:
        case DEEP_LINKS_SERVER_ADDED: {
            const url = action.payload;
            return upsert(state, { url, title: url });
        }
        case SIDE_BAR_REMOVE_SERVER_CLICKED: {
            const _url = action.payload;
            return state.filter(({ url }) => url !== _url);
        }
        case SIDE_BAR_SERVERS_SORTED: {
            const urls = action.payload;
            return state.sort(({ url: a }, { url: b }) => urls.indexOf(a) - urls.indexOf(b));
        }
        case WEBVIEW_TITLE_CHANGED: {
            const { url, title = url } = action.payload;
            return upsert(state, { url, title });
        }
        case WEBVIEW_UNREAD_CHANGED: {
            const { url, badge } = action.payload;
            return upsert(state, { url, badge });
        }
        case WEBVIEW_SIDEBAR_STYLE_CHANGED: {
            const { url, style } = action.payload;
            return upsert(state, { url, style });
        }
        case WEBVIEW_FAVICON_CHANGED: {
            const { url, favicon } = action.payload;
            return upsert(state, { url, favicon });
        }
        case WEBVIEW_DID_NAVIGATE: {
            const { url, pageUrl } = action.payload;
            if (pageUrl === null || pageUrl === void 0 ? void 0 : pageUrl.includes(url)) {
                return upsert(state, { url, lastPath: pageUrl });
            }
            return state;
        }
        case WEBVIEW_DID_START_LOADING: {
            const { url } = action.payload;
            return upsert(state, { url, failed: false });
        }
        case WEBVIEW_DID_FAIL_LOAD: {
            const { url, isMainFrame } = action.payload;
            if (isMainFrame) {
                return upsert(state, { url, failed: true });
            }
            return state;
        }
        case SERVERS_LOADED: {
            const { servers = state } = action.payload;
            return servers.map((server) => (Object.assign(Object.assign({}, server), { url: ensureUrlFormat(server.url) })));
        }
        case APP_SETTINGS_LOADED: {
            const { servers = state } = action.payload;
            return servers.map((server) => (Object.assign(Object.assign({}, server), { url: ensureUrlFormat(server.url) })));
        }
        case WEBVIEW_ATTACHED: {
            const { url, webContentsId } = action.payload;
            return update(state, { url, webContentsId });
        }
        default:
            return state;
    }
};

const currentView = (state = 'add-new-server', action) => {
    switch (action.type) {
        case ADD_SERVER_VIEW_SERVER_ADDED:
        case DEEP_LINKS_SERVER_ADDED:
        case DEEP_LINKS_SERVER_FOCUSED:
        case MENU_BAR_SELECT_SERVER_CLICKED:
        case TOUCH_BAR_SELECT_SERVER_TOUCHED:
        case SIDE_BAR_SERVER_SELECTED: {
            const url = action.payload;
            return { url };
        }
        case WEBVIEW_FOCUS_REQUESTED: {
            const { url } = action.payload;
            return { url };
        }
        case SERVERS_LOADED: {
            const { selected } = action.payload;
            return selected ? { url: selected } : 'add-new-server';
        }
        case APP_SETTINGS_LOADED: {
            const { currentView = state } = action.payload;
            return currentView;
        }
        case MENU_BAR_ADD_NEW_SERVER_CLICKED:
        case SIDE_BAR_ADD_NEW_SERVER_CLICKED:
            return 'add-new-server';
        case SIDE_BAR_REMOVE_SERVER_CLICKED: {
            if (typeof state === 'object' && state.url === action.payload) {
                return 'add-new-server';
            }
            return state;
        }
        case SIDE_BAR_DOWNLOADS_BUTTON_CLICKED:
            return 'downloads';
    }
    return state;
};

var downloadsPath = (state, action) => {
    var _a;
    switch (action.type) {
        case APP_SETTINGS_LOADED:
            return (_a = action.payload.downloadsPath) !== null && _a !== void 0 ? _a : '';
        case DOWNLOADS_PATH_CHANGED: {
            return action.payload;
        }
    }
    return state || '';
};

const isMenuBarEnabled = (state = true, action) => {
    switch (action.type) {
        case MENU_BAR_TOGGLE_IS_MENU_BAR_ENABLED_CLICKED: {
            return action.payload;
        }
        case APP_SETTINGS_LOADED: {
            const { isMenuBarEnabled = state } = action.payload;
            return isMenuBarEnabled;
        }
        default:
            return state;
    }
};

const isMessageBoxFocused = (state = false, action) => {
    switch (action.type) {
        case WEBVIEW_MESSAGE_BOX_FOCUSED:
            return true;
        case WEBVIEW_DID_START_LOADING:
        case WEBVIEW_MESSAGE_BOX_BLURRED:
        case WEBVIEW_DID_FAIL_LOAD:
            return false;
        default:
            return state;
    }
};

const isShowWindowOnUnreadChangedEnabled = (state = false, action) => {
    switch (action.type) {
        case MENU_BAR_TOGGLE_IS_SHOW_WINDOW_ON_UNREAD_CHANGED_ENABLED_CLICKED:
            return action.payload;
        case APP_SETTINGS_LOADED: {
            const { isShowWindowOnUnreadChangedEnabled = state } = action.payload;
            return isShowWindowOnUnreadChangedEnabled;
        }
        default:
            return state;
    }
};

const isSideBarEnabled = (state = true, action) => {
    switch (action.type) {
        case MENU_BAR_TOGGLE_IS_SIDE_BAR_ENABLED_CLICKED:
            return action.payload;
        case APP_SETTINGS_LOADED: {
            const { isSideBarEnabled = state } = action.payload;
            return isSideBarEnabled;
        }
        default:
            return state;
    }
};

const isTrayIconEnabled = (state = process.platform !== 'linux', action) => {
    switch (action.type) {
        case MENU_BAR_TOGGLE_IS_TRAY_ICON_ENABLED_CLICKED: {
            return action.payload;
        }
        case APP_SETTINGS_LOADED: {
            const { isTrayIconEnabled = state } = action.payload;
            return isTrayIconEnabled;
        }
        default:
            return state;
    }
};

const SCREEN_SHARING_DIALOG_DISMISSED = 'screen-sharing-dialog/dismissed';

const UPDATE_SKIPPED = 'update/skipped';
const UPDATES_CHECK_FOR_UPDATES_REQUESTED = 'updates/check-for-updates-requested';
const UPDATES_CHECKING_FOR_UPDATE = 'updates/checking-for-update';
const UPDATES_ERROR_THROWN = 'updates/error-thrown';
const UPDATES_NEW_VERSION_AVAILABLE = 'updates/new-version-available';
const UPDATES_NEW_VERSION_NOT_AVAILABLE = 'updates/new-version-not-available';
const UPDATES_READY = 'updates/ready';

const openDialog = (state = null, action) => {
    switch (action.type) {
        case MENU_BAR_ABOUT_CLICKED:
            return 'about';
        case WEBVIEW_SCREEN_SHARING_SOURCE_REQUESTED:
            return 'screen-sharing';
        case UPDATES_NEW_VERSION_AVAILABLE:
            return 'update';
        case CERTIFICATES_CLIENT_CERTIFICATE_REQUESTED:
            return 'select-client-certificate';
        case ABOUT_DIALOG_DISMISSED:
        case SCREEN_SHARING_DIALOG_DISMISSED:
        case WEBVIEW_SCREEN_SHARING_SOURCE_RESPONDED:
        case SELECT_CLIENT_CERTIFICATE_DIALOG_CERTIFICATE_SELECTED:
        case SELECT_CLIENT_CERTIFICATE_DIALOG_DISMISSED:
        case UPDATE_DIALOG_DISMISSED:
        case UPDATE_DIALOG_SKIP_UPDATE_CLICKED:
        case UPDATE_DIALOG_REMIND_UPDATE_LATER_CLICKED:
        case UPDATE_DIALOG_INSTALL_BUTTON_CLICKED:
            return null;
        default:
            return state;
    }
};

const rootWindowIcon = (state = null, action) => {
    switch (action.type) {
        case ROOT_WINDOW_ICON_CHANGED: {
            return action.payload;
        }
        default:
            return state;
    }
};

const rootWindowState = (state = {
    focused: true,
    visible: true,
    maximized: false,
    minimized: false,
    fullscreen: false,
    normal: true,
    bounds: {
        x: undefined,
        y: undefined,
        width: 1000,
        height: 600,
    },
}, action) => {
    switch (action.type) {
        case ROOT_WINDOW_STATE_CHANGED:
            return action.payload;
        case APP_SETTINGS_LOADED: {
            const { rootWindowState = state } = action.payload;
            return rootWindowState;
        }
        default:
            return state;
    }
};

const doCheckForUpdatesOnStartup = (state = true, action) => {
    switch (action.type) {
        case UPDATES_READY: {
            const { doCheckForUpdatesOnStartup } = action.payload;
            return doCheckForUpdatesOnStartup;
        }
        case ABOUT_DIALOG_TOGGLE_UPDATE_ON_START: {
            const doCheckForUpdatesOnStartup = action.payload;
            return doCheckForUpdatesOnStartup;
        }
        case APP_SETTINGS_LOADED: {
            const { doCheckForUpdatesOnStartup = state } = action.payload;
            return doCheckForUpdatesOnStartup;
        }
        default:
            return state;
    }
};
const isCheckingForUpdates = (state = false, action) => {
    switch (action.type) {
        case UPDATES_CHECKING_FOR_UPDATE:
            return true;
        case UPDATES_ERROR_THROWN:
            return false;
        case UPDATES_NEW_VERSION_NOT_AVAILABLE:
            return false;
        case UPDATES_NEW_VERSION_AVAILABLE:
            return false;
        default:
            return state;
    }
};
const isEachUpdatesSettingConfigurable = (state = true, action) => {
    switch (action.type) {
        case UPDATES_READY: {
            const { isEachUpdatesSettingConfigurable } = action.payload;
            return isEachUpdatesSettingConfigurable;
        }
        case APP_SETTINGS_LOADED: {
            const { isEachUpdatesSettingConfigurable = state } = action.payload;
            return isEachUpdatesSettingConfigurable;
        }
        default:
            return state;
    }
};
const isUpdatingAllowed = (state = true, action) => {
    switch (action.type) {
        case UPDATES_READY: {
            const { isUpdatingAllowed } = action.payload;
            return isUpdatingAllowed;
        }
        default:
            return state;
    }
};
const isUpdatingEnabled = (state = true, action) => {
    switch (action.type) {
        case UPDATES_READY: {
            const { isUpdatingEnabled } = action.payload;
            return isUpdatingEnabled;
        }
        case APP_SETTINGS_LOADED: {
            const { isUpdatingEnabled = state } = action.payload;
            return isUpdatingEnabled;
        }
        default:
            return state;
    }
};
const newUpdateVersion = (state = null, action) => {
    switch (action.type) {
        case UPDATES_NEW_VERSION_AVAILABLE:
            return action.payload;
        case UPDATES_NEW_VERSION_NOT_AVAILABLE:
            return null;
        default:
            return state;
    }
};
const skippedUpdateVersion = (state = null, action) => {
    switch (action.type) {
        case UPDATES_READY: {
            const { skippedUpdateVersion } = action.payload;
            return skippedUpdateVersion;
        }
        case UPDATE_SKIPPED: {
            const skippedUpdateVersion = action.payload;
            return skippedUpdateVersion;
        }
        case APP_SETTINGS_LOADED: {
            const { skippedUpdateVersion = state } = action.payload;
            return skippedUpdateVersion;
        }
        default:
            return state;
    }
};
const updateError = (state = null, action) => {
    switch (action.type) {
        case UPDATES_CHECKING_FOR_UPDATE:
            return null;
        case UPDATES_ERROR_THROWN:
            return action.payload;
        case UPDATES_NEW_VERSION_NOT_AVAILABLE:
            return null;
        case UPDATES_NEW_VERSION_AVAILABLE:
            return null;
        default:
            return state;
    }
};

const rootReducer = redux.combineReducers({
    appPath,
    appVersion,
    clientCertificates,
    currentView,
    doCheckForUpdatesOnStartup,
    downloads,
    downloadsPath,
    externalProtocols,
    isCheckingForUpdates,
    isEachUpdatesSettingConfigurable,
    isMenuBarEnabled,
    isMessageBoxFocused,
    isShowWindowOnUnreadChangedEnabled,
    isSideBarEnabled,
    isTrayIconEnabled,
    isUpdatingAllowed,
    isUpdatingEnabled,
    newUpdateVersion,
    openDialog,
    rootWindowIcon,
    rootWindowState,
    servers,
    skippedUpdateVersion,
    trustedCertificates,
    updateError,
});

let reduxStore;
let lastAction;
const catchLastAction = () => (next) => (action) => {
    lastAction = action;
    return next(action);
};
const createRendererReduxStore = () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const initialState = yield getInitialState();
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux.compose;
    const enhancers = composeEnhancers(redux.applyMiddleware(forwardToMain, catchLastAction));
    reduxStore = redux.createStore(rootReducer, initialState, enhancers);
    return reduxStore;
});
const dispatch = (action) => {
    reduxStore.dispatch(action);
};
const select = (selector) => selector(reduxStore.getState());
const watch = (selector, watcher) => {
    const initial = select(selector);
    watcher(initial, undefined);
    let prev = initial;
    return reduxStore.subscribe(() => {
        const curr = select(selector);
        if (Object.is(prev, curr)) {
            return;
        }
        watcher(curr, prev);
        prev = curr;
    });
};
const listen = (typeOrPredicate, listener) => {
    const effectivePredicate = typeof typeOrPredicate === 'function'
        ? typeOrPredicate
        : (action) => action.type === typeOrPredicate;
    return reduxStore.subscribe(() => {
        if (!effectivePredicate(lastAction)) {
            return;
        }
        listener(lastAction);
    });
};
// const isResponseTo = <Response extends RootAction>(id: unknown, type: Response['type']) =>
//   (action: RootAction): action is Response =>
//     isResponse(action) && action.type === type && action.meta.id === id;
const request = (requestAction, ...types) => new Promise((resolve, reject) => {
    const id = Math.random().toString(36).slice(2);
    const unsubscribe = listen(isResponseTo(id, ...types), (action) => {
        unsubscribe();
        if (isErrored(action)) {
            reject(action.payload);
            return;
        }
        if (hasPayload(action)) {
            resolve(action.payload);
        }
    });
    dispatch(Object.assign(Object.assign({}, requestAction), { meta: {
            request: true,
            id,
        } }));
});

const whenReady = () => new Promise((resolve) => {
    if (document.readyState === 'complete') {
        resolve();
        return;
    }
    const handleReadyStateChange = () => {
        if (document.readyState !== 'complete') {
            return;
        }
        document.removeEventListener('readystatechange', handleReadyStateChange);
        resolve();
    };
    document.addEventListener('readystatechange', handleReadyStateChange);
});

const setupRendererErrorHandling = (appType) => tslib.__awaiter(void 0, void 0, void 0, function* () {
    yield whenReady();
});

const I18N_LNG_REQUESTED = 'i18n/lng-requested';
const I18N_LNG_RESPONDED = 'i18n/lng-responded';

const fallbackLng = 'en';
const byteUnits = [
    'byte',
    'kilobyte',
    'megabyte',
    'gigabyte',
    'terabyte',
    'petabyte',
];
const formatBytes = (bytes) => {
    const order = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), byteUnits.length - 1);
    const unit = byteUnits[order];
    const formatter = new Intl.NumberFormat(undefined, {
        notation: 'compact',
        style: 'unit',
        unit,
        maximumFractionDigits: 1,
    });
    return formatter.format(bytes / Math.pow(1024, order));
};
const formatByteSpeed = (bytesPerSecond) => {
    const order = Math.min(Math.floor(Math.log(bytesPerSecond) / Math.log(1024)), byteUnits.length - 1);
    const unit = `${byteUnits[order]}-per-second`;
    const formatter = new Intl.NumberFormat(undefined, {
        notation: 'compact',
        style: 'unit',
        unit,
        maximumFractionDigits: 1,
    });
    return formatter.format(bytesPerSecond / Math.pow(1024, order));
};
const formatPercentage = (ratio) => {
    const formatter = new Intl.NumberFormat(undefined, {
        style: 'percent',
        maximumFractionDigits: 0,
    });
    return formatter.format(ratio);
};
const formatDuration = (duration) => {
    const formatter = new Intl.RelativeTimeFormat(undefined, {
        style: 'narrow',
        numeric: 'always',
    });
    duration = duration / 1000;
    if (duration / 60 < 1) {
        return formatter.format(Math.ceil(duration), 'second');
    }
    duration /= 60;
    if (duration / 60 < 1) {
        return formatter.format(Math.ceil(duration), 'minute');
    }
    duration /= 60;
    if (duration / 24 < 1) {
        return formatter.format(Math.ceil(duration), 'hour');
    }
    duration /= 24;
    if (duration / 7 < 1) {
        return formatter.format(duration, 'day');
    }
    duration /= 7;
    if (duration / 30 < 1) {
        return formatter.format(duration, 'week');
    }
    duration /= 30;
    if (duration / 12 < 1) {
        return formatter.format(duration, 'month');
    }
    duration /= 12;
    return formatter.format(duration, 'year');
};
const interpolation = {
    format: (value, format, lng) => {
        if (value instanceof Date && !Number.isNaN(value.getTime())) {
            return new Intl.DateTimeFormat(lng).format(value);
        }
        switch (format) {
            case 'byteSize':
                return formatBytes(value);
            case 'byteSpeed':
                return formatByteSpeed(value);
            case 'percentage':
                return formatPercentage(value);
            case 'duration':
                return formatDuration(value);
        }
        return String(value);
    },
};

var resources = {
    'de-DE': () => Promise.resolve().then(function () { return require('./de-DE.i18n-d8b7773d.js'); }),
    'en': () => Promise.resolve().then(function () { return require('./en.i18n-a5065a35.js'); }),
    'fr': () => Promise.resolve().then(function () { return require('./fr.i18n-642d2a20.js'); }),
    'hu': () => Promise.resolve().then(function () { return require('./hu.i18n-10fae1e8.js'); }),
    'ja': () => Promise.resolve().then(function () { return require('./ja.i18n-68167670.js'); }),
    'pl': () => Promise.resolve().then(function () { return require('./pl.i18n-c8888758.js'); }),
    'pt-BR': () => Promise.resolve().then(function () { return require('./pt-BR.i18n-66957ee7.js'); }),
    'ru': () => Promise.resolve().then(function () { return require('./ru.i18n-86dcf54d.js'); }),
    'tr-TR': () => Promise.resolve().then(function () { return require('./tr-TR.i18n-59394cf8.js'); }),
    'uk-UA': () => Promise.resolve().then(function () { return require('./uk-UA.i18n-50db5176.js'); }),
    'zh-CN': () => Promise.resolve().then(function () { return require('./zh-CN.i18n-4c73c30e.js'); }),
    'zh-TW': () => Promise.resolve().then(function () { return require('./zh-TW.i18n-51d7333d.js'); }),
};

const setupI18n = () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const lng = (_a = (yield request({
        type: I18N_LNG_REQUESTED,
    }, I18N_LNG_RESPONDED))) !== null && _a !== void 0 ? _a : undefined;
    yield i18next__default['default'].use(reactI18next.initReactI18next).init({
        lng,
        fallbackLng,
        resources: Object.assign(Object.assign({}, (lng && {
            [lng]: {
                translation: yield resources[lng](),
            },
        })), { [fallbackLng]: {
                translation: yield resources[fallbackLng](),
            } }),
        interpolation,
        initImmediate: true,
    });
});

const useDialog = (visible, onClose = () => undefined) => {
    const dialogRef = React.useRef(null);
    const onCloseRef = React.useRef();
    React.useEffect(() => {
        onCloseRef.current = onClose;
    });
    React.useEffect(() => {
        const dialog = dialogRef.current;
        const onClose = onCloseRef.current;
        if (!dialog) {
            return;
        }
        if (!visible) {
            dialog.close();
            return;
        }
        dialog.showModal();
        dialog.onclose = () => {
            dialog.close();
            onClose === null || onClose === void 0 ? void 0 : onClose();
        };
        dialog.onclick = ({ clientX, clientY }) => {
            try {
                const { left, top, width, height } = dialog.getBoundingClientRect();
                const isInDialog = top <= clientY &&
                    clientY <= top + height &&
                    left <= clientX &&
                    clientX <= left + width;
                if (!isInDialog) {
                    dialog.close();
                }
            }
            catch (_a) { }
        };
    }, [visible]);
    return dialogRef;
};

const Wrapper$4 = styled__default['default'].dialog `
  z-index: 1000;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  cursor: default;
  user-select: none;
  border: 0;
  background-color: transparent;
  max-height: 90vh;

  &:not([open]) {
    display: none;
  }
`;

const Dialog = ({ children, isVisible = false, onClose, }) => {
    const dialogRef = useDialog(isVisible, onClose);
    return (React__default['default'].createElement(Wrapper$4, { ref: dialogRef },
        React__default['default'].createElement(fuselage.Scrollable, null,
            React__default['default'].createElement(fuselage.Tile, { elevation: '2', padding: 'x32', display: 'flex', flexDirection: 'column' }, children))));
};

const RocketChatLogo = () => {
    const color = '#F5455C';
    return (React__default['default'].createElement("svg", { width: '100%', viewBox: '0 0 479 128', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
        React__default['default'].createElement("g", { transform: 'translate(28 28)', fill: color },
            React__default['default'].createElement("path", { d: 'M407.177 8.4967H415.101V19.529H422.433V26.7873H415.101V46.5002H422.036V53.627C420.913 53.8929 419.526 54.0274 417.94 54.0274C410.742 54.0274 407.174 50.2324 407.174 42.6395V8.4967H407.177Z' }),
            React__default['default'].createElement("path", { d: 'M392.209 24.3877V19.526H400.133V53.0891H392.209V48.2273C391.086 51.4904 387.059 53.8212 381.577 53.8212C376.889 53.8212 372.924 52.1568 369.688 48.8279C366.517 45.4304 364.931 41.3037 364.931 36.3075C364.931 31.3113 366.517 27.1847 369.688 23.8528C372.924 20.4553 376.886 18.7909 381.577 18.7909C387.059 18.7939 391.086 21.1247 392.209 24.3877ZM389.833 43.6345C391.815 41.7041 392.805 39.2389 392.805 36.3105C392.805 33.3791 391.815 30.9169 389.833 28.9835C387.918 27.0532 385.473 26.0521 382.635 26.0521C379.796 26.0521 377.484 27.0502 375.567 28.9835C373.718 30.9139 372.793 33.3791 372.793 36.3105C372.793 39.2419 373.718 41.7041 375.567 43.6345C377.481 45.5649 379.793 46.5659 382.635 46.5659C385.476 46.5659 387.915 45.5649 389.833 43.6345Z' }),
            React__default['default'].createElement("path", { d: 'M98.9214 53.092V19.5259H106.78V24.5221C108.366 20.9931 111.999 18.8625 116.687 18.8625C117.611 18.8625 118.406 18.9283 119.063 19.0628V26.7872C118.074 26.587 116.951 26.4555 115.762 26.4555C110.28 26.4555 106.78 29.9188 106.78 35.4469V53.095H98.9214V53.092Z' }),
            React__default['default'].createElement("path", { d: 'M121.049 36.3075C121.049 31.3113 122.833 27.0501 126.332 23.6526C129.832 20.2551 134.126 18.5249 139.211 18.5249C144.296 18.5249 148.59 20.2551 152.09 23.6526C155.59 27.0501 157.374 31.3113 157.374 36.3075C157.374 41.3007 155.59 45.5648 152.09 48.9594C148.59 52.3569 144.296 54.0871 139.211 54.0871C134.126 54.0871 129.832 52.3569 126.332 48.9594C122.83 45.5648 121.049 41.3037 121.049 36.3075ZM146.54 43.8347C148.522 41.7699 149.512 39.3046 149.512 36.3105C149.512 33.3133 148.522 30.8481 146.54 28.852C144.557 26.7872 142.115 25.7891 139.208 25.7891C136.236 25.7891 133.794 26.7872 131.812 28.852C129.897 30.8511 128.904 33.3133 128.904 36.3105C128.904 39.3076 129.894 41.7699 131.812 43.8347C133.794 45.8338 136.236 46.8318 139.208 46.8318C142.115 46.8318 144.56 45.8308 146.54 43.8347Z' }),
            React__default['default'].createElement("path", { d: 'M190.33 21.8568V29.8471C187.491 27.1159 184.056 25.7175 180.094 25.7175C176.991 25.7175 174.413 26.7155 172.369 28.7146C170.321 30.7137 169.331 33.2447 169.331 36.2388C169.331 39.2359 170.321 41.7669 172.369 43.763C174.416 45.7621 176.991 46.7601 180.094 46.7601C184.121 46.7601 187.556 45.3617 190.33 42.6305V50.6208C187.556 52.8859 183.991 54.0184 179.632 54.0184C174.481 54.0184 170.187 52.354 166.688 48.9564C163.188 45.5589 161.469 41.3635 161.469 36.2358C161.469 31.1081 163.185 26.9127 166.688 23.5152C170.187 20.1177 174.481 18.4532 179.632 18.4532C183.923 18.4622 187.488 19.5947 190.33 21.8568Z' }),
            React__default['default'].createElement("path", { d: 'M196.206 53.0921V8.4967H204.064V33.8453L215.293 19.526H224.275L211.66 35.5755L225.33 53.0891H216.084L204.064 37.5716V53.0891H196.206V53.0921Z' }),
            React__default['default'].createElement("path", { d: 'M225.531 36.3075C225.531 31.0453 227.117 26.7842 230.353 23.5868C233.589 20.3238 237.749 18.7251 242.769 18.7251C247.591 18.7251 251.487 20.3238 254.46 23.5868C257.497 26.7842 259.017 30.7794 259.017 35.5066C259.017 36.5047 258.952 37.5057 258.884 38.3693H233.39C233.654 43.6972 237.551 47.0947 243.43 47.0947C248.649 47.0947 252.611 45.8308 255.384 43.231V50.6895C252.148 52.9545 248.053 54.0871 243.101 54.0871C237.883 54.0871 233.592 52.4884 230.356 49.3598C227.12 46.1624 225.534 41.9013 225.534 36.6392V36.3075H225.531ZM250.957 32.7127C250.957 30.7823 250.166 29.0492 248.58 27.6507C246.995 26.2523 245.081 25.5202 242.769 25.5202C240.324 25.5202 238.212 26.2523 236.431 27.6507C234.647 29.0492 233.722 30.7136 233.592 32.7127H250.957Z' }),
            React__default['default'].createElement("path", { d: 'M264.989 8.4967H272.913V19.529H280.244V26.7873H272.913V46.5002H279.847V53.627C278.724 53.8929 277.337 54.0274 275.752 54.0274C268.554 54.0274 264.986 50.2324 264.986 42.6395V8.4967H264.989Z' }),
            React__default['default'].createElement("path", { d: 'M288.082 44.2859C285.454 44.2859 283.323 46.4254 283.323 49.064C283.323 51.7025 285.454 53.842 288.082 53.842C290.711 53.842 292.841 51.7025 292.841 49.064C292.841 46.4254 290.711 44.2859 288.082 44.2859Z' }),
            React__default['default'].createElement("path", { d: 'M323.921 21.8568V29.8471C321.083 27.1159 317.648 25.7175 313.686 25.7175C310.583 25.7175 308.005 26.7155 305.96 28.7146C303.913 30.7137 302.923 33.2447 302.923 36.2388C302.923 39.2359 303.913 41.7669 305.96 43.763C308.008 45.7621 310.583 46.7601 313.686 46.7601C317.716 46.7601 321.148 45.3617 323.921 42.6305V50.6208C321.148 52.8859 317.583 54.0184 313.224 54.0184C308.073 54.0184 303.779 52.354 300.28 48.9564C296.78 45.5589 295.061 41.3635 295.061 36.2358C295.061 31.1081 296.777 26.9127 300.28 23.5152C303.779 20.1177 308.073 18.4532 313.224 18.4532C317.515 18.4622 321.08 19.5947 323.921 21.8568Z' }),
            React__default['default'].createElement("path", { d: 'M329.798 53.0921V8.4967H337.656V24.1906C339.177 20.9932 342.807 18.8627 347.364 18.8627C355.025 18.8627 359.517 23.9903 359.517 32.3154V53.0921H351.658V33.4449C351.658 28.8491 349.214 25.9864 344.988 25.9864C340.694 25.9864 337.656 29.1838 337.656 33.7766V53.0891H329.798V53.0921Z' }),
            React__default['default'].createElement("path", { d: 'M76.2721 24.1875C74.1177 20.8019 71.0981 17.8048 67.302 15.2768C59.9676 10.4001 50.3307 7.71377 40.1664 7.71377C36.7703 7.71377 33.4247 8.01258 30.1768 8.60424C28.1617 6.64102 25.8058 4.87501 23.3107 3.47954C14.0531 -1.19096 5.89493 0.548149 1.77287 2.04821C0.418609 2.54126 0.00077337 4.27439 1.00239 5.32025C3.90946 8.35622 8.71902 14.3565 7.53663 19.8129C2.94044 24.561 0.448242 30.2864 0.448242 36.2478C0.448242 42.3227 2.94044 48.048 7.53663 52.7962C8.71902 58.2526 3.90946 64.2558 1.00239 67.2918C0.00373679 68.3347 0.418609 70.0678 1.77287 70.5609C5.89493 72.0609 14.0531 73.803 23.3136 69.1325C25.8088 67.7371 28.1647 65.971 30.1798 64.0078C33.4276 64.5995 36.7733 64.8983 40.1693 64.8983C50.3367 64.8983 59.9736 62.2149 67.3049 57.3382C71.101 54.8102 74.1207 51.8161 76.2751 48.4275C78.6754 44.6565 79.8904 40.5955 79.8904 36.3643C79.8874 32.0195 78.6724 27.9616 76.2721 24.1875ZM39.7515 57.8612C35.3568 57.8612 31.1666 57.2874 27.3468 56.2505L24.5553 58.9668C23.038 60.4429 21.26 61.7787 19.4049 62.8305C16.9483 64.0467 14.5213 64.713 12.121 64.9132C12.2573 64.6652 12.3818 64.4142 12.5151 64.1632C15.3125 58.9638 16.0682 54.2903 14.7791 50.1457C10.2037 46.5091 7.45959 41.8536 7.45959 36.7826C7.45959 25.1437 21.9179 15.7071 39.7515 15.7071C57.5851 15.7071 72.0463 25.1437 72.0463 36.7826C72.0463 48.4245 57.588 57.8612 39.7515 57.8612Z' }),
            React__default['default'].createElement("path", { d: 'M24.3036 31.9358C21.6751 31.9358 19.5444 34.0753 19.5444 36.7139C19.5444 39.3524 21.6751 41.4919 24.3036 41.4919C26.9321 41.4919 29.0628 39.3524 29.0628 36.7139C29.0628 34.0753 26.9321 31.9358 24.3036 31.9358Z' }),
            React__default['default'].createElement("path", { d: 'M39.6212 31.9358C36.9927 31.9358 34.8621 34.0753 34.8621 36.7139C34.8621 39.3524 36.9927 41.4919 39.6212 41.4919C42.2498 41.4919 44.3804 39.3524 44.3804 36.7139C44.3804 34.0753 42.2498 31.9358 39.6212 31.9358Z' }),
            React__default['default'].createElement("path", { d: 'M54.9416 31.9358C52.313 31.9358 50.1824 34.0753 50.1824 36.7139C50.1824 39.3524 52.313 41.4919 54.9416 41.4919C57.5701 41.4919 59.7007 39.3524 59.7007 36.7139C59.7007 34.0753 57.5701 31.9358 54.9416 31.9358Z' }))));
};

const copyright = `2022 f3rret`;
const AboutDialog = () => {
    const appVersion = reactRedux.useSelector(({ appVersion }) => appVersion);
    const doCheckForUpdatesOnStartup = reactRedux.useSelector(({ doCheckForUpdatesOnStartup }) => doCheckForUpdatesOnStartup);
    const isCheckingForUpdates = reactRedux.useSelector(({ isCheckingForUpdates }) => isCheckingForUpdates);
    const isEachUpdatesSettingConfigurable = reactRedux.useSelector(({ isEachUpdatesSettingConfigurable }) => isEachUpdatesSettingConfigurable);
    const isUpdatingAllowed = reactRedux.useSelector(({ isUpdatingAllowed }) => isUpdatingAllowed);
    const isUpdatingEnabled = reactRedux.useSelector(({ isUpdatingEnabled }) => isUpdatingEnabled);
    const newUpdateVersion = reactRedux.useSelector(({ newUpdateVersion }) => newUpdateVersion);
    const openDialog = reactRedux.useSelector(({ openDialog }) => openDialog);
    const updateError = reactRedux.useSelector(({ updateError }) => updateError);
    const isVisible = openDialog === 'about';
    const canUpdate = isUpdatingAllowed && isUpdatingEnabled;
    const isCheckForUpdatesOnStartupChecked = isUpdatingAllowed && isUpdatingEnabled && doCheckForUpdatesOnStartup;
    const canSetCheckForUpdatesOnStartup = isUpdatingAllowed && isEachUpdatesSettingConfigurable;
    const dispatch = reactRedux.useDispatch();
    const { t } = reactI18next.useTranslation();
    const [[checkingForUpdates, checkingForUpdatesMessage], setCheckingForUpdates,] = React.useState([false, null]);
    React.useEffect(() => {
        if (updateError) {
            setCheckingForUpdates([
                true,
                t('dialog.about.errorWhenLookingForUpdates'),
            ]);
            const messageTimer = setTimeout(() => {
                setCheckingForUpdates([false, null]);
            }, 5000);
            return () => {
                clearTimeout(messageTimer);
            };
        }
        if (isCheckingForUpdates) {
            setCheckingForUpdates([true, null]);
            return undefined;
        }
        if (newUpdateVersion) {
            setCheckingForUpdates([false, null]);
            return undefined;
        }
        setCheckingForUpdates([true, t('dialog.about.noUpdatesAvailable')]);
        const messageTimer = setTimeout(() => {
            setCheckingForUpdates([false, null]);
        }, 5000);
        return () => {
            clearTimeout(messageTimer);
        };
    }, [updateError, isCheckingForUpdates, newUpdateVersion, t]);
    const handleCheckForUpdatesButtonClick = () => {
        dispatch({ type: UPDATES_CHECK_FOR_UPDATES_REQUESTED });
    };
    const handleCheckForUpdatesOnStartCheckBoxChange = (event) => {
        dispatch({
            type: ABOUT_DIALOG_TOGGLE_UPDATE_ON_START,
            payload: event.target.checked,
        });
    };
    const checkForUpdatesButtonRef = fuselageHooks.useAutoFocus(isVisible);
    const checkForUpdatesOnStartupToggleSwitchId = fuselageHooks.useUniqueId();
    return (React__default['default'].createElement(Dialog, { isVisible: isVisible, onClose: () => dispatch({ type: ABOUT_DIALOG_DISMISSED }) },
        React__default['default'].createElement(fuselage.Margins, { block: 'x16' },
            React__default['default'].createElement(RocketChatLogo, null),
            React__default['default'].createElement(fuselage.Box, { alignSelf: 'center' },
                React__default['default'].createElement(reactI18next.Trans, { t: t, i18nKey: 'dialog.about.version' },
                    "Version:",
                    React__default['default'].createElement(fuselage.Box, { is: 'span', fontScale: 'p2', style: { userSelect: 'text' } }, { version: appVersion }))),
            canUpdate && (React__default['default'].createElement(fuselage.Box, { display: 'flex', flexDirection: 'column' },
                React__default['default'].createElement(fuselage.Margins, { block: 'x8' }, !checkingForUpdates && (React__default['default'].createElement(fuselage.Button, { ref: checkForUpdatesButtonRef, primary: true, type: 'button', disabled: checkingForUpdates, onClick: handleCheckForUpdatesButtonClick }, t('dialog.about.checkUpdates')))),
                React__default['default'].createElement(fuselage.Margins, { inline: 'auto', block: 'x8' },
                    checkingForUpdates && (React__default['default'].createElement(fuselage.Box, null,
                        React__default['default'].createElement(fuselage.Margins, { block: 'x12' }, checkingForUpdatesMessage ? (React__default['default'].createElement(fuselage.Box, { fontScale: 'c1', color: 'info' }, checkingForUpdatesMessage)) : (React__default['default'].createElement(fuselage.Throbber, { size: 'x16' }))))),
                    React__default['default'].createElement(fuselage.Field.Row, null,
                        React__default['default'].createElement(fuselage.ToggleSwitch, { id: checkForUpdatesOnStartupToggleSwitchId, checked: isCheckForUpdatesOnStartupChecked, disabled: !canSetCheckForUpdatesOnStartup, onChange: handleCheckForUpdatesOnStartCheckBoxChange }),
                        React__default['default'].createElement(fuselage.Field.Label, { htmlFor: checkForUpdatesOnStartupToggleSwitchId }, t('dialog.about.checkUpdatesOnStart')))))),
            React__default['default'].createElement(fuselage.Box, { alignSelf: 'center', fontScale: 'micro' }, copyright))));
};
/*t('dialog.about.copyright',*/

const Wrapper$3 = styled__default['default'].section `
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #2f343d;

  overflow-y: auto;
  align-items: center;
  -webkit-app-region: drag;
  justify-content: center;

  display: flex;
`;

const defaultServerUrl = new URL('https://rocketchat/');
const AddServerView = () => {
    const isVisible = reactRedux.useSelector(({ currentView }) => currentView === 'add-new-server');
    const dispatch = reactRedux.useDispatch();
    const { t } = reactI18next.useTranslation();
    const [input, setInput] = React.useState('');
    const idleState = React.useMemo(() => ['idle', null], []);
    const [[validationState, errorMessage], setValidation] = React.useState(idleState);
    const editInput = React.useCallback((input) => {
        setInput(input);
        setValidation(idleState);
    }, [idleState]);
    const addServer = React.useCallback((serverUrl) => {
        editInput('');
        dispatch({
            type: ADD_SERVER_VIEW_SERVER_ADDED,
            payload: serverUrl,
        });
    }, [dispatch, editInput]);
    const beginValidation = React.useCallback(() => {
        setValidation(['validating', null]);
    }, []);
    const failValidation = React.useCallback((serverUrl, message) => {
        setInput(serverUrl);
        setValidation(['invalid', message]);
    }, []);
    const resolveServerUrl = React.useCallback((serverUrl) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        beginValidation();
        const [resolvedServerUrl, result] = yield request({
            type: SERVER_URL_RESOLUTION_REQUESTED,
            payload: serverUrl,
        }, SERVER_URL_RESOLVED);
        switch (result) {
            case "ok" /* OK */:
                addServer(resolvedServerUrl);
                return;
            case "invalid-url" /* INVALID_URL */:
            case "invalid" /* INVALID */:
                failValidation(resolvedServerUrl, t('error.noValidServerFound'));
                return;
            case "timeout" /* TIMEOUT */:
                failValidation(resolvedServerUrl, t('error.connectTimeout'));
                return;
            default:
                failValidation(resolvedServerUrl, null);
        }
    }), [addServer, beginValidation, failValidation, t]);
    const handleFormSubmit = (event) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const trimmedInput = input.trim();
        if (!trimmedInput) {
            addServer(defaultServerUrl.href);
            return;
        }
        yield resolveServerUrl(trimmedInput);
    });
    const handleInputChange = (event) => {
        editInput(event.currentTarget.value);
    };
    const [isOnLine, setOnLine] = React.useState(() => navigator.onLine);
    React.useEffect(() => {
        const handleConnectionStatus = () => {
            setOnLine(navigator.onLine);
        };
        window.addEventListener('online', handleConnectionStatus);
        window.addEventListener('offline', handleConnectionStatus);
        return () => {
            window.removeEventListener('online', handleConnectionStatus);
            window.removeEventListener('offline', handleConnectionStatus);
        };
    }, []);
    const inputId = fuselageHooks.useUniqueId();
    const inputRef = fuselageHooks.useAutoFocus(isVisible);
    if (!isVisible) {
        return null;
    }
    return (React__default['default'].createElement(Wrapper$3, null, isOnLine ? (React__default['default'].createElement(fuselage.Tile, { is: 'form', width: 'x368', maxWidth: '100%', padding: 'x24', method: '/', onSubmit: handleFormSubmit },
        React__default['default'].createElement(fuselage.Margins, { block: 'x16' },
            React__default['default'].createElement(RocketChatLogo, null)),
        React__default['default'].createElement(fuselage.FieldGroup, null,
            React__default['default'].createElement(fuselage.Field, null,
                React__default['default'].createElement(fuselage.Field.Label, { htmlFor: inputId }, t('landing.inputUrl')),
                React__default['default'].createElement(fuselage.Field.Row, null,
                    React__default['default'].createElement(fuselage.TextInput, { ref: inputRef, id: inputId, error: errorMessage !== null && errorMessage !== void 0 ? errorMessage : undefined, type: 'text', placeholder: defaultServerUrl.href, dir: 'auto', value: input, onChange: handleInputChange })),
                React__default['default'].createElement(fuselage.Field.Error, null, errorMessage)),
            React__default['default'].createElement(fuselage.ButtonGroup, { align: 'center' },
                React__default['default'].createElement(fuselage.Button, { type: 'submit', primary: true, disabled: validationState !== 'idle' }, (validationState === 'idle' && t('landing.connect')) ||
                    (validationState === 'validating' &&
                        t('landing.validating')) ||
                    (validationState === 'invalid' && t('landing.invalidUrl'))))))) : (React__default['default'].createElement(fuselage.Callout, { type: 'warning', width: 'x368', maxWidth: '100%' }, t('error.offline')))));
};

const FileIcon = ({ fileName, mimeType, onClickHandle, style }) => {
    let label = React.useMemo(() => {
        var _a;
        const extension = path__default['default'].extname(fileName);
        if (extension) {
            return extension.slice(1);
        }
        return (_a = /^\w+\/([-.\w]+)(?:\+[-.\w]+)?$/.exec(mimeType)) === null || _a === void 0 ? void 0 : _a[1];
    }, [fileName, mimeType]);
    if (!label)
        label = '';
    let known;
    switch (label) {
        case 'pdf':
            known = (React__default['default'].createElement(fuselage.Box, { is: 'img', src: 'images/pdf-48.png', alt: label }));
            break;
        case 'html':
            known = (React__default['default'].createElement(fuselage.Box, { is: 'img', src: 'images/html-48.png', alt: label }));
            break;
        case 'txt':
            known = (React__default['default'].createElement(fuselage.Box, { is: 'img', src: 'images/txt-48.png', alt: label }));
            break;
        case 'doc':
        case 'docx':
            known = (React__default['default'].createElement(fuselage.Box, { is: 'img', src: 'images/word-48.png', alt: label }));
            break;
        case 'xls':
        case 'xlsx':
            known = (React__default['default'].createElement(fuselage.Box, { is: 'img', src: 'images/xls-48.png', alt: label }));
            break;
        case 'ppt':
        case 'pptx':
            known = (React__default['default'].createElement(fuselage.Box, { is: 'img', src: 'images/powerpoint-48.png', alt: label }));
            break;
        case 'zip':
        case 'rar':
        case 'tar':
        case '7z':
        case 'gz':
        case 'gzip':
            known = (React__default['default'].createElement(fuselage.Box, { is: 'img', src: 'images/archive-48.png', alt: label }));
            break;
        case 'mp3':
        case 'wav':
        case 'ogg':
        case 'flac':
            known = (React__default['default'].createElement(fuselage.Box, { is: 'img', src: 'images/audio-48.png', alt: label }));
            break;
        case 'avi':
        case 'mp4':
        case 'mkv':
        case 'flv':
        case 'mov':
        case 'mpg':
        case 'mpeg':
        case 'webm':
        case 'wma':
        case 'wmv':
            known = (React__default['default'].createElement(fuselage.Box, { is: 'img', src: 'images/video-48.png', alt: label }));
            break;
        case 'png':
        case 'ico':
        case 'bmp':
        case 'gif':
        case 'jpg':
        case 'jpeg':
        case 'svg':
        case 'gif':
            known = (React__default['default'].createElement(fuselage.Box, { is: 'img', src: 'images/image-48.png', alt: label }));
            break;
    }
    if (mimeType === 'folder')
        known = (React__default['default'].createElement(fuselage.Box, { is: 'img', src: 'images/folder-48.png', alt: label }));
    if (known) {
        return (React__default['default'].createElement(fuselage.Box, { onClick: onClickHandle, title: '\u041E\u0442\u043A\u0440\u044B\u0442\u044C', style: style, display: 'flex', flexDirection: 'column', height: '48px' }, known));
    }
    //{mimeType==='folder' && <Box is='img' src='icons/svg/folder.svg' style={{opacity: 0.5}} alt={label} width='x32' />}
    return (React__default['default'].createElement(fuselage.Box, { onClick: onClickHandle, title: '\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u044D\u0442\u043E\u0442 \u0444\u0430\u0439\u043B', style: style, display: 'flex', flexDirection: 'column', height: '48px' },
        React__default['default'].createElement(fuselage.Box, { is: 'img', src: 'images/file-48.png', alt: label }),
        React__default['default'].createElement(fuselage.Box, { width: 42, mi: 2, mbs: -30, style: { backgroundColor: 'white', border: 'solid 1px', padding: '2px' }, textAlign: 'center', color: 'neutral-700', withTruncatedText: true }, label)));
};

const DownloadItem = (_a) => {
    var { itemId, state, status: _status, fileName, receivedBytes, totalBytes, startTime, endTime, url: _url, mimeType, serverTitle, serverUrl: _serverUrl, savePath: _savePath } = _a, props = tslib.__rest(_a, ["itemId", "state", "status", "fileName", "receivedBytes", "totalBytes", "startTime", "endTime", "url", "mimeType", "serverTitle", "serverUrl", "savePath"]);
    const { t, i18n } = reactI18next.useTranslation();
    const progressSize = React.useMemo(() => {
        try {
            if (!receivedBytes || !totalBytes) {
                return undefined;
            }
            if (state === 'completed') {
                return i18n.format(totalBytes, 'byteSize');
            }
            return t('downloads.item.progressSize', {
                receivedBytes,
                totalBytes,
                ratio: receivedBytes / totalBytes,
            });
        }
        catch (e) {
            console.log(e);
            return undefined;
        }
    }, [i18n, receivedBytes, state, t, totalBytes]);
    const progressSpeed = React.useMemo(() => {
        if (!receivedBytes ||
            !totalBytes ||
            !startTime ||
            !endTime ||
            state !== 'progressing') {
            return undefined;
        }
        try {
            return i18n.format((receivedBytes / (endTime - startTime)) * 1000, 'byteSpeed');
        }
        catch (_a) {
            return undefined;
        }
    }, [endTime, i18n, receivedBytes, startTime, state, totalBytes]);
    const estimatedTimeLeft = React.useMemo(() => {
        if (!receivedBytes ||
            !totalBytes ||
            !startTime ||
            !endTime ||
            state !== 'progressing') {
            return undefined;
        }
        try {
            const remainingBytes = totalBytes - receivedBytes;
            const speed = receivedBytes / (endTime - startTime);
            return i18n.format(remainingBytes / speed, 'duration');
        }
        catch (e) {
            console.log(e);
            return undefined;
        }
    }, [endTime, i18n, receivedBytes, startTime, state, totalBytes]);
    const handlePause = React.useCallback((e) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        e.stopPropagation();
        invoke('downloads/pause', itemId);
    }), [itemId]);
    const handleResume = React.useCallback((e) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        e.stopPropagation();
        invoke('downloads/resume', itemId);
    }), [itemId]);
    const handleCancel = React.useCallback(() => tslib.__awaiter(void 0, void 0, void 0, function* () {
        //invoke('downloads/remove', itemId);
        invoke('downloads/cancel', itemId);
    }), [itemId]);
    const handleShowInFolder = React.useCallback(() => {
        invoke('downloads/show-in-folder', itemId);
    }, [itemId]);
    const handleRunDownloaded = React.useCallback(() => {
        invoke('downloads/run-downloaded', itemId);
    }, [itemId]);
    /*const handleRetry = useCallback(() => {
      invoke('downloads/retry', itemId);
    }, [itemId]);*/
    const handleRemove = React.useCallback(() => {
        invoke('downloads/remove', itemId);
    }, [itemId]);
    const handleCopyLink = React.useCallback(() => {
        invoke('downloads/copy-link', itemId);
    }, [itemId]);
    const errored = state === 'interrupted' || state === 'cancelled';
    const percentage = React.useMemo(() => Math.floor((receivedBytes / totalBytes) * 100), [receivedBytes, totalBytes]);
    const fDate = endTime ? (new Date(endTime)) : (new Date());
    /*try{
      if(globalThis['p2p']){
        const ditem=globalThis['p2p'][itemId];
        if(ditem){
          console.log('ditem.getState()', ditem.getState(), 'state', state);
          if(ditem.getState()!==state){
            state=ditem.getState();
          }
        }
      }
    }
    catch(e){console.log(e)}*/
    return (React__default['default'].createElement(fuselage.Box, Object.assign({ display: 'flex', height: 45, alignItems: 'center', style: { userSelect: 'text', borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'rgb(0,0,0,.15)', marginBottom: '10px' } }, props),
        React__default['default'].createElement(fuselage.Box, { flexGrow: 7, flexShrink: 7, flexBasis: '40%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'start', style: { maxWidth: '40%', overflow: 'hidden' } },
            React__default['default'].createElement(FileIcon, { style: { cursor: 'pointer', marginBottom: '5px' }, onClickHandle: handleRunDownloaded, fileName: fileName, mimeType: mimeType }),
            React__default['default'].createElement(fuselage.Box, { mis: 8, style: { width: '85%' } },
                React__default['default'].createElement(fuselage.Box, { color: errored ? 'danger-500' : 'default', fontScale: 's1', withTruncatedText: true }, fileName),
                React__default['default'].createElement(fuselage.Box, { withTruncatedText: true, color: 'neutral-600', fontScale: 'c1' }, serverTitle))),
        React__default['default'].createElement(fuselage.Box, { display: 'flex', flexGrow: 2, flexShrink: 2, flexBasis: '15%', color: 'neutral-600', fontScale: 'c2', withTruncatedText: true }, fDate.toLocaleDateString() + " " + fDate.toLocaleTimeString()),
        React__default['default'].createElement(fuselage.Box, { display: 'flex', flexGrow: 7, flexShrink: 7, flexBasis: '45%', style: { maxWidth: '45%', overflow: 'hidden' }, flexDirection: 'column', mi: 16 },
            React__default['default'].createElement(fuselage.Box, { display: 'flex', flexDirection: 'row', mbe: 6, alignItems: 'center', justifyContent: 'space-between' },
                React__default['default'].createElement(fuselage.Box, { style: { maxWidth: '80%' }, display: 'flex', flexDirection: 'row', alignItems: 'center' },
                    progressSize ? (React__default['default'].createElement(fuselage.Box, { mie: 12, color: 'neutral-600', fontScale: 'c1', withTruncatedText: true }, progressSize)) : null,
                    progressSpeed ? (React__default['default'].createElement(fuselage.Box, { mie: 12, color: 'neutral-600', fontScale: 'c1', withTruncatedText: true }, progressSpeed)) : null,
                    estimatedTimeLeft ? (React__default['default'].createElement(fuselage.Box, { color: 'neutral-600', fontScale: 'c1', withTruncatedText: true }, estimatedTimeLeft)) : null),
                React__default['default'].createElement(fuselage.Box, { display: 'flex', fontScale: 'c1' },
                    state === 'progressing' && (React__default['default'].createElement(React__default['default'].Fragment, null,
                        React__default['default'].createElement(fuselage.Icon, { onClick: handlePause, color: 'neutral-800', title: '\u041F\u0430\u0443\u0437\u0430', style: { cursor: 'pointer', marginRight: '4px' }, name: 'pause', size: 20 }),
                        React__default['default'].createElement(fuselage.Icon, { onClick: handleCopyLink, color: 'neutral-800', title: '\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443', style: { cursor: 'pointer', marginRight: '4px' }, name: 'link', size: 20 }),
                        React__default['default'].createElement(fuselage.Icon, { onClick: handleCancel, color: 'neutral-800', title: '\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C', style: { cursor: 'pointer', marginRight: '4px' }, name: 'cancel', size: 20 }))),
                    state === 'paused' && (React__default['default'].createElement(React__default['default'].Fragment, null,
                        React__default['default'].createElement(fuselage.Icon, { onClick: handleResume, color: 'neutral-800', title: '\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C', style: { cursor: 'pointer', marginRight: '4px' }, name: 'play', size: 20 }),
                        React__default['default'].createElement(fuselage.Icon, { onClick: handleCopyLink, color: 'neutral-800', title: '\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443', style: { cursor: 'pointer', marginRight: '4px' }, name: 'link', size: 20 }),
                        React__default['default'].createElement(fuselage.Icon, { onClick: handleCancel, color: 'neutral-800', title: '\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C', style: { cursor: 'pointer', marginRight: '4px' }, name: 'cancel', size: 20 }))),
                    state === 'completed' && (React__default['default'].createElement(React__default['default'].Fragment, null,
                        React__default['default'].createElement(fuselage.Icon, { onClick: handleShowInFolder, color: 'neutral-800', title: '\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0432 \u043F\u0430\u043F\u043A\u0435', style: { cursor: 'pointer', marginRight: '4px' }, name: 'folder', size: 20 }),
                        React__default['default'].createElement(fuselage.Icon, { onClick: handleCopyLink, color: 'neutral-800', title: '\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443', style: { cursor: 'pointer', marginRight: '4px' }, name: 'link', size: 20 }),
                        React__default['default'].createElement(fuselage.Icon, { onClick: handleRemove, color: 'neutral-800', title: '\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443', style: { cursor: 'pointer', marginRight: '4px' }, name: 'trash', size: 20 }))),
                    errored && (React__default['default'].createElement(React__default['default'].Fragment, null,
                        React__default['default'].createElement(fuselage.Icon, { onClick: handleCopyLink, color: 'neutral-800', title: '\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443', style: { cursor: 'pointer', marginRight: '4px' }, name: 'link', size: 20 }),
                        React__default['default'].createElement(fuselage.Icon, { onClick: handleRemove, color: 'neutral-800', title: '\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443', style: { cursor: 'pointer', marginRight: '4px' }, name: 'trash', size: 20 }))))),
            React__default['default'].createElement(fuselage.Box, { mbe: 8, position: 'relative' },
                React__default['default'].createElement(fuselage.ProgressBar, { percentage: percentage, error: errored ? t('downloads.item.errored') : undefined })))));
};

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

class HeaderInfo extends React__default['default'].Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleOpenDownloads", () => {
      invoke('downloads/show-downloads-path');
    });

    _defineProperty(this, "handleSetDownloads", () => {
      invoke('downloads/set-downloads-path').then(() => {
        this.setState({
          path: electron.remote.app.getPath('downloads')
        });
        this.handleRecalcSpace();
      });
    });

    _defineProperty(this, "handleRecalcSpace", () => {
      fastFolderSize__default['default'](this.state.path, (err, bytes) => {
        const checkDiskSpace = require('check-disk-space').default;

        checkDiskSpace(this.state.path).then(diskSpace => {
          this.setState({
            folderSize: bytes,
            diskFree: diskSpace.free
          });
        });
      });
    });

    _defineProperty(this, "handleRemoveAll", () => {
      invoke('downloads/remove-all-downloads').then(() => {
        fastFolderSize__default['default'](this.state.path, (err, bytes) => {
          this.setState({
            folderSize: bytes
          });
        });
      });
    });

    _defineProperty(this, "getProperBytes", bytes => {
      return parseFloat(bytes / (1024 * 1024 * 1024)).toFixed(2);
    });

    this.state = {
      folderSize: 0,
      diskFree: 0,
      path: electron.remote.app.getPath('downloads')
    };
  }

  componentDidMount() {
    this.handleRecalcSpace();
  }

  componentWillUnmount() {}

  render() {
    return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement(fuselage.Icon, {
      title: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043F\u0430\u043F\u043A\u0443 \u0434\u043B\u044F \u0437\u0430\u0433\u0440\u0443\u0437\u043E\u043A",
      onClick: this.handleSetDownloads,
      style: {
        paddingBottom: '4px',
        marginLeft: '30px',
        cursor: 'pointer'
      },
      name: "pencil-box",
      size: 20
    }), /*#__PURE__*/React__default['default'].createElement(fuselage.Box, {
      onClick: this.handleOpenDownloads,
      style: {
        marginBottom: '-1px',
        cursor: 'pointer'
      },
      withTruncatedText: true
    }, /*#__PURE__*/React__default['default'].createElement(fuselage.Icon, {
      title: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043F\u0430\u043F\u043A\u0443 \u0437\u0430\u0433\u0440\u0443\u0437\u043E\u043A",
      style: {
        paddingBottom: '4px'
      },
      name: "folder",
      size: 20
    }), " ", this.state.path), /*#__PURE__*/React__default['default'].createElement(fuselage.Box, {
      onClick: this.handleRecalcSpace,
      style: {
        marginBottom: '-1px',
        marginLeft: '30px',
        cursor: 'pointer'
      },
      withTruncatedText: true
    }, /*#__PURE__*/React__default['default'].createElement(fuselage.Icon, {
      title: "\u041F\u0435\u0440\u0435\u0441\u0447\u0438\u0442\u0430\u0442\u044C",
      style: {
        paddingBottom: '4px'
      },
      name: "reload",
      size: 20
    }), " ", this.getProperBytes(this.state.folderSize), " \u0413\u0431 (\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E: ", this.getProperBytes(this.state.diskFree), " \u0413\u0431)"), /*#__PURE__*/React__default['default'].createElement(fuselage.Box, {
      onClick: this.handleRemoveAll,
      style: {
        marginBottom: '-1px',
        marginLeft: '30px',
        cursor: 'pointer',
        color: 'white',
        backgroundColor: 'coral',
        padding: '2px 6px 0px 2px',
        borderRadius: '2px'
      },
      withTruncatedText: true
    }, /*#__PURE__*/React__default['default'].createElement(fuselage.Icon, {
      title: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u043F\u0430\u043F\u043A\u0443 \u0438 \u0441\u0442\u0435\u0440\u0435\u0442\u044C \u0438\u0441\u0442\u043E\u0440\u0438\u044E \u0437\u0430\u0433\u0440\u0443\u0437\u043E\u043A",
      style: {
        paddingBottom: '4px'
      },
      name: "trash",
      size: 20
    }), "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u0441\u0451"));
  }

}

const DownloadsManagerView = () => {
    const isVisible = reactRedux.useSelector(({ currentView }) => currentView === 'downloads');
    const [searchFilter, setSearchFilter] = fuselageHooks.useLocalStorage('download-search', '');
    const handleSearchFilterChange = React.useCallback((event) => {
        setSearchFilter(event.target.value);
    }, [setSearchFilter]);
    const { t } = reactI18next.useTranslation();
    const serverFilterOptions = reactRedux.useSelector(({ downloads }) => [
        ['*', t('downloads.filters.all')],
        ...Object.values(downloads)
            .filter(({ serverUrl, serverTitle }, index, self) => {
            return self.findIndex(s => s.serverUrl == serverUrl && s.serverTitle == serverTitle) === index;
        }) //serverUrl && serverTitle
            .map(({ serverUrl, serverTitle }) => [
            serverUrl + serverTitle,
            serverTitle !== null && serverTitle !== void 0 ? serverTitle : serverUrl,
        ]),
    ]);
    const [serverFilter, setServerFilter] = fuselageHooks.useLocalStorage('download-server', '*');
    const handleServerFilterChange = React.useCallback((value) => {
        setServerFilter(value);
    }, [setServerFilter]);
    const mimeTypeOptions = React.useMemo(() => [
        ['*', t('downloads.filters.all')],
        ['image', t('downloads.filters.mimes.images')],
        ['video', t('downloads.filters.mimes.videos')],
        ['audio', t('downloads.filters.mimes.audios')],
        ['text', t('downloads.filters.mimes.texts')],
        ['application', t('downloads.filters.mimes.files')],
    ], [t]);
    const [mimeTypeFilter, setMimeTypeFilter] = fuselageHooks.useLocalStorage('download-type', '');
    const handleMimeFilter = React.useCallback((value) => {
        setMimeTypeFilter(value);
    }, [setMimeTypeFilter]);
    /*const statusFilterOptions = useMemo<[string, string][]>(
      () => [
        [DownloadStatus.ALL, t('downloads.filters.all')],
        [DownloadStatus.PAUSED, t('downloads.filters.statuses.paused')],
        [DownloadStatus.CANCELLED, t('downloads.filters.statuses.cancelled')],
      ],
      [t]
    );
  
    /*const [statusFilter, setStatusFilter] = useLocalStorage<
      typeof statusFilterOptions[number][0]
    >('download-tab', DownloadStatus.ALL);*/
    /*const handleTabChange = useCallback(
      (value: typeof statusFilterOptions[number][0]) => {
        setStatusFilter(value);
      },
      [setStatusFilter]
    );*/
    /*const handleClearAll = useCallback((): void => {
      setSearchFilter('');
      setMimeTypeFilter('');
      setServerFilter('');
      setStatusFilter('');
    }, [setSearchFilter, setMimeTypeFilter, setServerFilter, setStatusFilter]);*/
    const [itemsPerPage, setItemsPerPage] = React.useState(25);
    const [currentPagination, setCurrentPagination] = React.useState(0);
    const showingResultsLabel = React.useCallback(({ count, current, itemsPerPage }) => t('downloads.showingResults', {
        first: current + 1,
        last: Math.min(current + itemsPerPage, count),
        count,
    }), [t]);
    const downloads = reactRedux.useSelector(({ downloads }) => {
        const searchPredicate = searchFilter
            ? ({ fileName }) => fileName.search(new RegExp(searchFilter.replaceAll(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'igm')) > -1
            : () => true;
        const serverPredicate = serverFilter !== '' && serverFilter !== '*'
            ? ({ serverUrl, serverTitle }) => serverUrl + serverTitle === serverFilter
            : () => true;
        const mimeTypePredicate = mimeTypeFilter !== '' && mimeTypeFilter !== '*'
            ? ({ mimeType }) => { var _a; return ((_a = mimeType === null || mimeType === void 0 ? void 0 : mimeType.split('/')) === null || _a === void 0 ? void 0 : _a[0]) === mimeTypeFilter; }
            : () => true;
        /*const statusPredicate: Predicate =
          statusFilter !== '' && statusFilter !== DownloadStatus.ALL
            ? ({ status }) => status === statusFilter
            : () => true;*/
        return Object.values(downloads)
            .filter(searchPredicate)
            .filter(serverPredicate)
            .filter(mimeTypePredicate)
            //.filter(statusPredicate)
            .sort((a, b) => b.itemId - a.itemId);
    });
    return (React__default['default'].createElement(fuselage.Box, { display: isVisible ? 'flex' : 'none', flexDirection: 'column', height: '100vh', backgroundColor: 'surface' },
        React__default['default'].createElement(fuselage.Box, { minHeight: 54, paddingInline: 74, display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'flex-end', borderBlockEndWidth: 2, borderBlockEndStyle: 'solid', borderBlockEndColor: 'neutral-300', style: { paddingBottom: '10px' } },
            React__default['default'].createElement(fuselage.Box, { is: 'div', color: 'default', fontScale: 'h1' }, t('downloads.title')),
            React__default['default'].createElement(HeaderInfo, null)),
        React__default['default'].createElement(fuselage.Box, { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBlock: 8, paddingInline: 64 },
            React__default['default'].createElement(fuselage.Box, { display: 'flex', flexGrow: 7, flexShrink: 7, flexBasis: '30%', paddingInline: 2 },
                React__default['default'].createElement(fuselage.SearchInput, { value: searchFilter, placeholder: 'Поиск по имени файла', addon: React__default['default'].createElement(fuselage.Icon, { color: 'neutral-700', name: 'magnifier', size: 20 }), onChange: handleSearchFilterChange })),
            React__default['default'].createElement(fuselage.Box, { display: 'flex', flexGrow: 7, flexShrink: 7, flexBasis: '40%', paddingInline: 2 },
                React__default['default'].createElement(fuselage.Select, { value: serverFilter, placeholder: 'От кого', options: serverFilterOptions, onChange: handleServerFilterChange })),
            React__default['default'].createElement(fuselage.Box, { display: 'flex', flexGrow: 3, flexShrink: 3, paddingInline: 2 },
                React__default['default'].createElement(fuselage.Select, { width: 120, value: mimeTypeFilter, placeholder: t('downloads.filters.mimeType'), options: mimeTypeOptions, onChange: handleMimeFilter }))),
        React__default['default'].createElement(fuselage.Scrollable, null,
            React__default['default'].createElement(fuselage.Box, { flexGrow: 1, flexShrink: 1, paddingBlock: 8, paddingInline: 64 },
                React__default['default'].createElement(fuselage.Box, null, downloads
                    .slice(currentPagination, currentPagination + itemsPerPage)
                    .map((downloadItem) => (React__default['default'].createElement(DownloadItem, Object.assign({ key: downloadItem.itemId }, downloadItem))))))),
        downloads.length > 0 && (React__default['default'].createElement(fuselage.Pagination, { divider: true, current: currentPagination, itemsPerPage: itemsPerPage, count: (downloads && downloads.length) || 0, showingResultsLabel: showingResultsLabel, onSetItemsPerPage: setItemsPerPage, onSetCurrent: setCurrentPagination }))));
};
/**
 * <Box display='flex' flexGrow={3} flexShrink={3} paddingInline={2}>
          <Select
            value={statusFilter}
            placeholder={t('downloads.filters.status')}
            options={statusFilterOptions}
            onChange={handleTabChange}
          />
        </Box>
        
        <Box display='flex' flexGrow={1} flexShrink={1} paddingInline={2}>
          <Button
            small
            ghost
            title={t('downloads.filters.clear')}
            onClick={handleClearAll}
          >
            <Icon color='neutral-700' name='trash' size={24} />
          </Button>
        </Box>
 */

const Source = styled__default['default'](fuselage.Tile) `
  cursor: pointer;
  width: 150px;
  height: 150px;
  overflow: hidden;
  text-align: center;

  &:hover {
    background-color: #eaeaea;
  }
`;

const ScreenSharingDialog = () => {
    const openDialog = reactRedux.useSelector(({ openDialog }) => openDialog);
    const isVisible = openDialog === 'screen-sharing';
    const dispatch = reactRedux.useDispatch();
    const { t } = reactI18next.useTranslation();
    const [sources, setSources] = React.useState([]);
    React.useEffect(() => {
        if (!isVisible) {
            return undefined;
        }
        const fetchSources = () => tslib.__awaiter(void 0, void 0, void 0, function* () {
            const sources = yield electron.desktopCapturer.getSources({
                types: ['window', 'screen'],
            });
            setSources(sources);
        });
        const timer = setInterval(() => {
            fetchSources();
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, [isVisible]);
    const handleScreenSharingSourceClick = (id) => () => {
        dispatch({ type: WEBVIEW_SCREEN_SHARING_SOURCE_RESPONDED, payload: id });
    };
    const handleClose = () => {
        dispatch({ type: SCREEN_SHARING_DIALOG_DISMISSED });
    };
    return (React__default['default'].createElement(Dialog, { isVisible: isVisible, onClose: handleClose },
        React__default['default'].createElement(fuselage.Box, { fontScale: 'h1', alignSelf: 'center' }, t('dialog.screenshare.announcement')),
        React__default['default'].createElement(fuselage.Box, { display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', justifyContent: 'center' },
            React__default['default'].createElement(fuselage.Margins, { all: 'x8' }, sources.map(({ id, name, thumbnail }) => (React__default['default'].createElement(fuselage.Scrollable, { key: id },
                React__default['default'].createElement(Source, { display: 'flex', flexDirection: 'column', onClick: handleScreenSharingSourceClick(id) },
                    React__default['default'].createElement(fuselage.Box, { flexGrow: 1, display: 'flex', alignItems: 'center' },
                        React__default['default'].createElement(fuselage.Box, { is: 'img', src: thumbnail.toDataURL(), alt: name, style: { width: '100%' } })),
                    React__default['default'].createElement(fuselage.Box, null, name)))))))));
};

const SelectClientCertificateDialog = () => {
    const openDialog = reactRedux.useSelector(({ openDialog }) => openDialog);
    const clientCertificates = reactRedux.useSelector(({ clientCertificates }) => clientCertificates);
    const isVisible = openDialog === 'select-client-certificate';
    const dispatch = reactRedux.useDispatch();
    const requestIdRef = React.useRef();
    React.useEffect(() => listen(CERTIFICATES_CLIENT_CERTIFICATE_REQUESTED, (action) => {
        if (!isResponse(action)) {
            return;
        }
        requestIdRef.current = action.meta.id;
    }), [dispatch]);
    const handleSelect = (certificate) => () => {
        dispatch({
            type: SELECT_CLIENT_CERTIFICATE_DIALOG_CERTIFICATE_SELECTED,
            payload: certificate.fingerprint,
            meta: {
                response: true,
                id: requestIdRef.current,
            },
        });
    };
    const handleClose = () => {
        dispatch({
            type: SELECT_CLIENT_CERTIFICATE_DIALOG_DISMISSED,
            meta: {
                response: true,
                id: requestIdRef.current,
            },
        });
    };
    const { t } = reactI18next.useTranslation();
    return (React__default['default'].createElement(Dialog, { isVisible: isVisible, onClose: handleClose },
        React__default['default'].createElement(fuselage.Box, { fontScale: 'h1' }, t('dialog.selectClientCertificate.announcement')),
        React__default['default'].createElement(fuselage.Margins, { inline: 'neg-x12' },
            React__default['default'].createElement(fuselage.Scrollable, null,
                React__default['default'].createElement(fuselage.Box, null,
                    React__default['default'].createElement(fuselage.Margins, { all: 'x12' }, clientCertificates.map((certificate, i) => (React__default['default'].createElement(fuselage.Tile, { key: i },
                        React__default['default'].createElement(fuselage.Margins, { inline: 'neg-x8' },
                            React__default['default'].createElement(fuselage.Box, { display: 'flex', alignItems: 'end', justifyContent: 'space-between' },
                                React__default['default'].createElement(fuselage.Margins, { inline: 'x8' },
                                    React__default['default'].createElement(fuselage.Box, null,
                                        React__default['default'].createElement(fuselage.Box, { fontScale: 's1' }, certificate.subjectName),
                                        React__default['default'].createElement(fuselage.Box, { fontScale: 'p2' }, certificate.issuerName),
                                        React__default['default'].createElement(fuselage.Box, { fontScale: 'c1' }, t('dialog.selectClientCertificate.validDates', {
                                            validStart: new Date(certificate.validStart * 1000),
                                            validExpiry: new Date(certificate.validExpiry * 1000),
                                        }))),
                                    React__default['default'].createElement(fuselage.Button, { primary: true, flexShrink: 1, onClick: handleSelect(certificate) }, t('dialog.selectClientCertificate.select'))))))))))))));
};

const ReparentingContainer = React.forwardRef(function ReparentingContainer(_a, ref) {
    var { children } = _a, props = tslib.__rest(_a, ["children"]);
    const innerRef = React.useRef(null);
    const childrenArray = flattenChildren__default['default'](children);
    const prevChildrenArrayRef = React.useRef([]);
    React.useLayoutEffect(() => {
        prevChildrenArrayRef.current = childrenArray;
    }, [childrenArray]);
    const prevKeys = prevChildrenArrayRef.current.map((child) => child.key);
    const keys = childrenArray.map((child) => child.key);
    const childrenAdded = childrenArray.filter((child) => !prevKeys.includes(child.key));
    const childrenKept = childrenArray.filter((child) => prevKeys.includes(child.key));
    const childrenRemoved = prevChildrenArrayRef.current.filter((child) => !keys.includes(child.key));
    const nodesRef = React.useRef(new Map());
    const portals = [
        ...childrenKept.map((child) => {
            const element = child.key ? nodesRef.current.get(child.key) : undefined;
            return element ? reactDom.createPortal(child, element, String(child.key)) : null;
        }),
        ...childrenAdded.map((child) => {
            if (!child.key) {
                return null;
            }
            const node = document.createElement('div');
            nodesRef.current.set(child.key, node);
            return reactDom.createPortal(child, node, String(child.key));
        }),
    ];
    React.useLayoutEffect(() => {
        var _a;
        if (!innerRef.current) {
            return;
        }
        for (const child of childrenAdded) {
            if (!child.key) {
                continue;
            }
            const node = nodesRef.current.get(child.key);
            if (!node) {
                continue;
            }
            for (const { name, value } of Array.from(innerRef.current.attributes)) {
                node.setAttribute(name, value);
            }
            node.toggleAttribute('data-container', true);
            (_a = innerRef.current.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore(node, innerRef.current);
        }
    }, [childrenAdded]);
    React.useLayoutEffect(() => {
        setTimeout(() => {
            var _a;
            for (const child of childrenRemoved) {
                if (!child.key) {
                    continue;
                }
                (_a = nodesRef.current.get(child.key)) === null || _a === void 0 ? void 0 : _a.remove();
                nodesRef.current.delete(child.key);
            }
        }, 1000);
    }, [childrenRemoved]);
    React.useLayoutEffect(() => () => {
        setTimeout(() => {
            nodesRef.current.forEach((node) => {
                node.remove();
            });
            nodesRef.current.clear();
        }, 1000);
    }, []);
    const mergedRef = fuselageHooks.useMergedRefs(ref, innerRef);
    return (React__default['default'].createElement(React__default['default'].Fragment, null,
        React__default['default'].createElement("div", Object.assign({ ref: mergedRef }, props)),
        portals));
});

const FailureImage = (_a) => {
    var { st3 = '#030C1A', st15 = '#030D19', st11 = '#0B182B', st1 = '#15273F', st14 = '#1A324C', st12 = '#384A66', st2 = '#E3CEC8', st23 = '#E4C8BA', st22 = '#E6B793', st21 = '#EA9B57', st20 = '#ED8A30', st8 = '#EF4848', st19 = '#FF5050', st4 = '#FFCD52', st13 = '#FFFFFF' } = _a, props = tslib.__rest(_a, ["st3", "st15", "st11", "st1", "st14", "st12", "st2", "st23", "st22", "st21", "st20", "st8", "st19", "st4", "st13"]);
    const a = fuselageHooks.useUniqueId();
    const b = fuselageHooks.useUniqueId();
    const c = fuselageHooks.useUniqueId();
    const e = fuselageHooks.useUniqueId();
    return (React__default['default'].createElement("svg", Object.assign({ viewBox: '0 0 1366 768', preserveAspectRatio: 'xMidYMid slice' }, props),
        React__default['default'].createElement("linearGradient", { id: a, x1: 1047, x2: 1047, y1: 213.43, y2: 287.03, gradientUnits: 'userSpaceOnUse' },
            React__default['default'].createElement("stop", { stopColor: st3, offset: 0 }),
            React__default['default'].createElement("stop", { stopColor: st12, offset: 1 })),
        React__default['default'].createElement("linearGradient", { id: b, x1: 102.96, x2: 111.7, y1: 47.165, y2: 217.07, gradientUnits: 'userSpaceOnUse' },
            React__default['default'].createElement("stop", { stopColor: st3, offset: 0 }),
            React__default['default'].createElement("stop", { stopColor: st11, offset: 1 })),
        React__default['default'].createElement("clipPath", { id: c },
            React__default['default'].createElement("circle", { opacity: 0.3, cx: 553.49, cy: 544.5, r: 146.44 })),
        React__default['default'].createElement("linearGradient", { id: e, x1: 510.48, x2: 295.77, y1: -59.124, y2: -273.83, gradientTransform: 'matrix(.9862 -.1655 .1655 .9862 138.97 743.69)', gradientUnits: 'userSpaceOnUse' },
            React__default['default'].createElement("stop", { stopColor: st20, offset: 0 }),
            React__default['default'].createElement("stop", { stopColor: st21, stopOpacity: 0.7848, offset: 0.2152 }),
            React__default['default'].createElement("stop", { stopColor: st22, stopOpacity: 0.4148, offset: 0.5852 }),
            React__default['default'].createElement("stop", { stopColor: st23, stopOpacity: 0.1427, offset: 0.8573 }),
            React__default['default'].createElement("stop", { stopColor: st2, stopOpacity: 0, offset: 1 })),
        React__default['default'].createElement("g", null,
            React__default['default'].createElement("path", { fill: st1, d: 'm1010.2 530.88l1.15 2.74-59.34 8.99s-3.95-2.99-5.67-4.67-2.3-3.16-2.3-3.16c0.62 0.89 7.43 2.92 8.35 2.72 0.93-0.2 0.44-0.43-1.18-1.09s-1.3-1.04-1.3-1.04c2.51-0.77 9.91 1.39 9.91 1.39 0.06-0.65-4.52-2.51-4.12-2.59 0.4-0.07 1.67 0.31 1.79 0.16s-0.33-0.77-0.33-0.77c1.73-0.44 7.41 2.54 7.41 2.54 0.15-0.55-3.81-2.76-3.07-3.07s3.93 1.46 3.92 0.99c-0.01-0.48-1.94-1.87-1-1.79 0.95 0.08 3.72 2.56 4.01 2.1s-1.5-2.54-1.5-2.54 2.91 1.32 3.04 1.5 3.04 0.59 3.1 0.18c0.07-0.41-1.31-0.94-1.54-1.03s-2.76-0.51-0.92-0.81 8.87 2.12 8.94 1.94-1.75-1.52-2-2.13c-0.26-0.61-0.45-1.06-0.45-1.06 0.86 0.55 5.67 3.18 5.67 3.18s-2.43-3.43-1.88-2.56 5.23 2.19 5.23 2.19c-1.46-0.85-3.86-3.5-3.86-3.5 2.06 1.42 9.28 2.68 9.28 2.68-0.28-0.89-2.59-1.57-2.59-1.57 1.63-1.79 6.49 0.84 6.49 0.84 0.3-0.59-0.62-1.48-0.62-1.48 0.89-0.28 2.08 0.59 2.08 0.59-0.49-1.17-2.74-2.14-2.74-2.14 4.13-1.93 9.24 3.43 9.24 3.43-1.29-1.1-2.57-4.14-2.57-4.14 0.77 0.96 5 2.29 5 2.29 1.25-0.07 3.6 0.5 3.6 0.5' }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 144.81, cy: 487.93, rx: 1.1, ry: 1.08 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 322.32, cy: 468.93, rx: 1.1, ry: 1.08 }),
            React__default['default'].createElement("rect", { fill: st3, x: -0.45, y: 0.09, width: 1366.1, height: 768.2 }),
            React__default['default'].createElement("circle", { fill: st4, cx: 553.49, cy: 544.5, r: 146.44 }),
            React__default['default'].createElement("circle", { fill: `url(#${e})`, cx: 553.49, cy: 544.5, r: 146.44 }),
            React__default['default'].createElement("g", { opacity: 0.3 },
                React__default['default'].createElement("g", { clipPath: `url(#${c})` },
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 409c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 415.34c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 421.69c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 428.03c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 434.37c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 440.71c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 447.05c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 453.39c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 459.73c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 466.07c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 472.42c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 478.76c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 485.1c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 491.44c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 497.78c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 504.12c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 510.46c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 516.81c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 523.15c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 529.49c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 535.83c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 542.17c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 548.51c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 554.85c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 561.2c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 567.54c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 573.88c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 580.22c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 586.56c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 592.9c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 599.24c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 605.59c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 611.93c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 618.27c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 624.61c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 630.95c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 637.29c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 643.63c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 649.98c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 656.32c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 662.66c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 669c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 675.34c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 681.68c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 688.02c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }),
                    React__default['default'].createElement("path", { fill: 'none', stroke: st8, strokeWidth: 5, strokeMiterlimit: '10', d: 'm370.72 694.37c11.94-0.42 11.81-4.14 23.74-4.56 11.94-0.42 12.07 3.29 24.01 2.86 11.94-0.42 12.05 2.82 23.99 2.4s11.84-3.33 23.77-3.75c11.94-0.42 12 1.42 23.94 1s11.78-4.89 23.72-5.31 12.06 2.94 23.99 2.52c11.94-0.42 11.86-2.76 23.79-3.18 11.94-0.42 11.92-1.06 23.85-1.49 11.94-0.42 12.11 4.29 24.05 3.87s11.95-0.12 23.89-0.54 11.83-3.44 23.77-3.87c11.94-0.42 11.86-2.59 23.8-3.01s11.96 0.05 23.9-0.37 12.06 2.97 24 2.55' }))),
            React__default['default'].createElement("ellipse", { opacity: 0.4, fill: st2, cx: 283.6, cy: 237.73, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 389.76, cy: 200.29, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 349.31, cy: 275.3, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 256.38, cy: 147.67, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 262.02, cy: 281.11, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 432.63, cy: 177.54, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 455.4, cy: 267.47, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 125.11, cy: 193.86, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 73.45, cy: 246.47, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: -0.25, cy: 155.85, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 69.35, cy: 188.63, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 307.88, cy: 153.4, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 36.75, cy: 225.7, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 995.65, cy: 400.05, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { opacity: 0.4, fill: st2, cx: 1101.8, cy: 362.6, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 1061.4, cy: 437.62, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 968.43, cy: 309.99, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 974.07, cy: 443.42, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 1144.7, cy: 339.85, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 1167.4, cy: 429.79, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 837.16, cy: 356.18, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 785.5, cy: 408.78, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 711.8, cy: 318.17, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 781.4, cy: 350.94, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 1019.9, cy: 315.71, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { opacity: 0.2, fill: st2, cx: 748.8, cy: 388.01, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 1034.2, cy: 81.83, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 928.01, cy: 119.28, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 968.46, cy: 44.26, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 1061.4, cy: 171.89, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { opacity: 0.2, fill: st2, cx: 1055.8, cy: 38.45, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 885.14, cy: 142.02, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { opacity: 0.2, fill: st2, cx: 862.37, cy: 52.09, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 1192.7, cy: 125.7, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 1244.3, cy: 73.09, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 1318, cy: 163.71, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 1248.4, cy: 130.94, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 1009.9, cy: 166.17, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 1281, cy: 93.87, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 190.59, cy: 348.72, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { opacity: 0.2, fill: st2, cx: 84.44, cy: 386.17, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 124.88, cy: 311.15, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 217.81, cy: 438.78, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 212.17, cy: 305.35, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 41.57, cy: 408.92, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 18.79, cy: 318.98, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 349.08, cy: 392.59, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 400.74, cy: 339.99, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 474.44, cy: 430.6, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 404.84, cy: 397.83, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 166.31, cy: 433.06, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 437.44, cy: 360.76, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 226.03, cy: 108.04, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { opacity: 0.4, fill: st2, cx: 119.88, cy: 145.49, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { opacity: 0.4, fill: st2, cx: 160.32, cy: 70.47, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 253.25, cy: 198.1, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 247.61, cy: 64.67, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 77.01, cy: 168.24, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 54.24, cy: 78.3, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 384.52, cy: 151.91, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 436.19, cy: 99.31, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 509.88, cy: 189.92, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 440.29, cy: 157.15, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 201.76, cy: 192.38, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 472.89, cy: 120.08, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 964.3, cy: 331.86, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 858.15, cy: 369.3, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 898.59, cy: 294.29, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 991.52, cy: 421.92, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 985.88, cy: 288.48, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 815.28, cy: 392.05, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { opacity: 0.2, fill: st2, cx: 792.51, cy: 302.12, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { opacity: 0.4, fill: st2, cx: 1122.8, cy: 375.73, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 1248.2, cy: 413.74, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 1178.6, cy: 380.96, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 940.03, cy: 416.2, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 891.34, cy: 343.89, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 1280.3, cy: 261.81, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 1274.1, cy: 359.15, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 1346, cy: 299.38, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 1253.1, cy: 171.75, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 1287.8, cy: 309.99, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 1317, cy: 336.4, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 1339.7, cy: 426.33, rx: 0.4, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 1121.8, cy: 217.94, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 1070.2, cy: 270.55, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 996.46, cy: 179.93, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 1087.3, cy: 232.81, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 1304.6, cy: 177.47, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("ellipse", { fill: st2, cx: 1033.4, cy: 249.77, rx: 0.41, ry: 0.4 }),
            React__default['default'].createElement("path", { fill: st11, d: 'm165.42 477.46l40.53-20.74c1.87-0.96 4.15-0.49 5.49 1.13l0.6 0.72c2.65 3.2 7.23 4.01 10.83 1.92l9.13-5.3c1.93-1.12 4.11-1.71 6.34-1.71h4.2c3.4 0 6.74-0.8 9.78-2.32l63.19-31.82c3.57-1.8 7.81-1.71 11.3 0.24 5.1 2.85 11.27 3.05 16.54 0.54l18.22-8.66c2.41-1.15 5.21-1.13 7.61 0.05l37.6 18.42c2.51 1.23 4.95 2.59 7.31 4.08l85.67 54.1c4.22 2.67 9.12 4.08 14.11 4.08h3.45c3.75 0 7.47-0.8 10.89-2.35l40.57-18.34c2-0.9 4.3-0.81 6.21 0.26l31.49 17.54c2.75 1.53 5.85 2.34 9 2.34h42.15c2.91 0 5.76 0.8 8.26 2.3l17.53 10.59c3.19 1.93 6.96 2.66 10.64 2.07l6.92-1.12c3.86-0.62 7.81-0.35 11.55 0.79 2.63 0.8 5.47 0.54 7.92-0.71l79.31-40.81c2.86-1.47 6.23-1.54 9.15-0.18l107.75 50.18c3.52 1.64 7.55 1.8 11.19 0.43l20.87-7.83c2.62-0.98 5.52-0.95 8.12 0.1l15.4 6.23c5.92 2.4 12.26 3.63 18.65 3.63h4.78c6.26 0 12.46-1.18 18.28-3.48l22.75-8.99c3.53-1.39 7.48-1.26 10.91 0.36l6.25 2.96 13.57 0.79s8.43 0.95 20.42 0.81c8.33-0.1 16.64-1.03 24.78-2.77l100.25-21.4c12.3-2.63 25.14-0.79 36.21 5.18l74.97 40.4 41.65-3.85-0.76 105.66-1041.5-52.72-323.76-7.08-0.1-32.28 165.86-63.44z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm318.54 418.13l8.85 7.19c0.86 0.7 2.05 0.86 3.07 0.41l6.62-3.75s-3.56-0.6-8.6-1.57c-1.58-0.31-2.84-1.96-4.3-2.28-2.26-0.49-4.54 0.38-5.64 0z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm515.64 507.4c-29.11-5.86-44.37-12.17-51.19-15.63-1.16-0.59-0.7-2.35 0.6-2.29 2.92 0.12 5.14 0.08 6.74-0.01 0.88-0.05 1.12-1.24 0.32-1.63-31.96-15.4-106.45-77.23-106.45-77.23 15.38 3.2 26.38 11.37 26.38 11.37 22.05 12.03 36 20.18 64.02 36.26 0 0 58.44 39.83 62.67 42.22 2.5 1.41 12.31 5.77 19.92 9.1 1.25 0.55 0.66 2.42-0.68 2.16l-22.33-4.32z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm657.62 491.64l18.37 21.2c2.64 3.05 6.94 4.05 10.66 2.49l24.11-10.14s-3.76-0.42-8.66 0.14c-5.15 0.59-11.52 2.15-14.31 1.24-5.45-1.76-20.32-11.85-22.6-13.02-3.72-1.91-7.57-1.91-7.57-1.91z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm207.49 456.26s-8.45 8.58-2.01 8.92 14.81-3.71 14.81-3.71-4.61 0.14-8.26-2.9c0.01 0-1.95-2.68-4.54-2.31z' }),
            React__default['default'].createElement("path", { fill: st12, d: 'm1096.4 455.05c0-0.49-1.3-4.37-1.3-4.37s-1.46-3.4-1.46-5.67-1.3-6.32-1.3-6.96c0-0.21-4.1-10.14-6.15-12.31-1.76-1.85-4.88-3.12-7.24-3.86-0.06-0.05-0.1-0.09-0.1-0.09 3-2.28 4.77-4.55 4.53-9.38-0.11-2.2-1.1-5.58-3.26-7.95-1.79-1.95-4.48-3.5-8.12-4.14-8.04-1.41-11.95 3.78-13.31 9.17s1.01 9.21 1.01 9.21c-0.48 0-0.8 0.57-0.99 1.06-0.58-1.21-1.21-2.66-1.31-3.43-0.19-1.48-1.98-3.37-2.01-4.78-0.04-1.41-1.25-2.09-1.48-2.66s-0.8-2.93-0.79-3.61-0.88-1.86-0.88-3.76-0.42-2.51-0.42-3.88-0.23-1.9-0.23-2.55-0.68-1.89-0.68-2.34l-0.08-2.28-0.31-1.65-0.58-0.93c0.32-0.48 0.73-1.03 0.85-1.22 0.22-0.33 0.99-2.01 0.99-2.12 0-0.08 0.23-1.03 0.35-1.5 0.04-0.17 0.05-0.35 0.04-0.53-0.07-0.65-0.25-2.28-0.25-2.43 0-0.09-0.1-0.57-0.3-1.1-0.07-0.18-0.15-0.37-0.24-0.55-0.22-0.45-0.52-0.85-0.87-0.97-0.91-0.3-1.13 0.39-1.13 0.39l-0.8-0.17h-0.99s-0.83 0.47-1.27 0.47-1.87 0.72-1.9 0.85c-0.03 0.14-1.82 0.96-1.82 0.96s-0.58 0.41-0.58 0.5c0 0.08-0.41 0.94-0.41 1.16s0.55 1.93 0.63 2.23 0.83 2.89 0.83 2.89 0.03 0.06 0.07 0.15c-0.03 0.27-0.07 0.55-0.13 0.84-0.04 0.21 0.27 0.49 0.48 0.75-0.06 0.25-0.12 0.52-0.12 0.61 0 0.17-0.11 1.53-0.11 1.53h0.16c-0.2 0.73-0.46 1.24-0.52 1.49-0.25 1-0.45 9.77-0.61 10.75-0.16 0.97 1.13 4.7 1.13 5.18s1.3 4.37 1.3 4.37 1.46 3.4 1.46 5.67 1.3 6.32 1.3 6.96c0 0.65 3.33 9.06 6.41 12.29 0.26 1.66 0.48 2.94 0.48 3.08 0 0.33 2.05 4.68 2.05 5.18 0 0.49 1.15 6.16 1.15 7.07 0 0.9-1.23 2.79-1.23 6.33 0 3.53 0.08 3.37 0.08 6.82s-1.31 6.33-1.31 8.05c0 1.73-0.16 11.09-0.16 11.09l0.58 1.81v3.86s-0.49 3.53-0.49 4.44c0 0.9-0.9 3.61-1.06 6.16s1.06 2.05 1.06 4.68 0.82 3.2 0.82 5.67c0 2.46-0.33 1.89-0.33 2.79s-0.74 3.53-0.74 5.83 0.49 3.86 0.49 4.6 0.33 1.48 0.33 2.22 1.15 1.73 1.4 1.81 0.58 1.73 0.58 1.73-2.22-1.07-3.37 2.38 2.3 5.92 2.3 5.92c6.16-0.33 10.19-2.38 10.19-2.38l-0.33-3.29s-0.82-3.04-1.12-3.61c-0.3-0.58 0.39-2.71 0.1-3.29-0.28-0.58 0.12-2.14 0.04-2.71-0.08-0.58 0-3.86 0-3.86s0.9-2.46 0.9-3.94 0.82-4.68 0.9-5.34 0.82-4.52 0.91-5.26 1.06-5.34 1.06-6.41-0.25-4.85-0.33-5.67-0.08-1.97 0-3.94 1.07-8.38 1.07-8.38v5.42s0.99 3.62 0.99 6.16c0 2.55 2.46 3.86 2.63 5.18 0.16 1.31 0.9 2.88 0.99 4.44 0.08 1.56 0.9 2.3 0.9 3.04s1.48 2.38 1.48 3.45 0.66 3.29 0.66 5.42c0 2.14 0.33 2.46 0.33 4.93s0.82 2.46 0.9 3.53-0.41 2.38-0.41 2.63 0.49 7.39 1.23 8.38 3.94 0.58 5.92 0c1.97-0.58 1.89-4.03 1.89-4.6 0-0.58-0.41-4.68-0.7-6.66-0.29-1.97 0.86-10.93 0.86-10.93s0.16-3.12 0.16-3.61-0.41-3.37-0.41-6.33-0.49-6.41-0.62-7.31c-0.12-0.9-0.21-2.71 0-5.75s-0.29-2.3-0.53-6.65c-0.25-4.35-1.24-13.66-1.24-13.66s-0.34-1.1-0.38-2.47-0.87-1.82-0.87-2.09c0-0.12-0.12-0.72-0.26-1.47l1.56-0.02c0.46-0.01 0.83-0.38 0.83-0.84v-6.97c0.05 0.07 0.1 0.14 0.12 0.21 0.23 0.57 0.8 2.93 0.79 3.61s0.88 1.86 0.88 3.76 0.42 2.51 0.42 3.88 0.23 1.9 0.23 2.55-0.23 2.01-0.23 2.47v3.27c0 0.84 0.46 3.5 0.38 4.37s1.37 1.18 1.52 0.27 1.29-2.01 1.29-2.01 0.49 0.68 0.53 1.41c0.04 0.72-1.25 2.58-1.41 3.57-0.15 0.99 0.27 1.25 0.27 1.25 1.29 0.42 2.58-0.34 2.58-0.34-0.15 0.95 0.87 0.72 0.87 0.72 0.68-0.34 1.25-1.82 1.25-1.82 0.49 0.15 0.88-0.2 0.88-0.2 1.16-2.08 0.5-8.99 0.75-9.98 0.12-0.5 0.24-2.94 0.34-5.38s0.19-4.88 0.27-5.36c0.14-0.99-1.15-4.71-1.15-5.2z' }),
            React__default['default'].createElement("polygon", { fill: st13, points: '1082.8 430.84 1063.1 430.38 1066.6 432.89 1086.5 433.13' }),
            React__default['default'].createElement("path", { fill: st14, d: 'm1049.6 378.77s0.15-0.9 0.6-0.9 0.9 0.14 1.56 1.56c0 0-0.47-2.01-1.48-2s-1.05 0.78-1.05 0.78 0.43 0.26 0.37 0.56z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm479.68 600.45s-22.25-1.3-31.46-2.68c-0.3-0.04-0.47 0.32-0.25 0.53 0.73 0.67 1.98 1.67 3.45 2.26 0 0-10.45-1-18.85-3.27-0.6-0.16-0.94 0.66-0.4 0.97 3.71 2.12 9.54 5.14 14.95 6.72l32.56-4.53z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm446.55 604.8s6.98 1.81 11.25 1.41c0 0-8.13 1.07-16.13-0.8l4.88-0.61z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm155 617.06s-21.51-5.83-30.25-9.06c-0.28-0.1-0.53 0.22-0.35 0.46 0.57 0.8 1.59 2.04 2.91 2.91 0 0-7.88-2.45-15.07-5.75-0.98-0.45-1.81 0.85-0.98 1.55 3.07 2.57 7.04 5.57 10.94 7.65l32.8 2.24z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm121.68 614.52s6.46 3.2 10.72 3.68c0 0-8.18-0.62-15.63-4.09l4.91 0.41z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm194.08 618.35l-12.07-0.31s-4.39-2.44-8.64-2.87c-0.14-0.01-0.18 0.18-0.05 0.23 0.88 0.32 2.07 0.86 1.96 1.43l-8.99-0.6c-0.8-0.05-1.59-0.17-2.36-0.34-2.67-0.6-9.03-2.03-9.69-2.32-0.84-0.36 1.83 1.3 3.67 1.86 0 0-4.85-0.42-9.67-3.7 0 0 0.59 1.33 2.1 2.46 0.79 0.59 1.49 1.3 2.11 2.07l0.86 1.05 39.19 2.14 1.58-1.1z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm354.34 614.48s-2.26-0.1-6.89 0.69-20.6 1.2-25.47-0.56c0 0 0.25 1.29 1.32 1.9 0 0-17.64 0.74-23.2 0.68s-9.5 0.18-12.26-1.24c0 0 1.12 1.38 2.1 1.73 0.61 0.22-1.52-0.33-3.72-1.14-1.32-0.48-2.66-1.06-3.45-1.61 0 0 2.39 2.89 4.37 3.41l-6.93 0.14-8.48-3.81s-1.61-6.34-4.15-5.61c-2.53 0.73 2.11 4.45 2.11 4.45s-5.5-2.53-8.32-2.91c0 0-0.4-4.32-2.45-4.48s1.08 3.95 1.08 3.95l-3.02-0.31-0.06 0.61 4.3 1.25s-0.86 1.19-2.19 1.7c-1.33 0.5 0.03 2.66 1.81 2 1.79-0.66 1.76-3.32 1.76-3.32s5.59 1.21 7.23 2.5c0 0-0.47 1.23-1.71 1.3-0.8 0.05-0.43 0.94 0.49 1.18 0.98 0.26 1.95-0.46 2.08-1.46l0.09-0.73 6.24 4.03 10.95 2.98 61.05-1.58 5.32-5.74z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm725.93 567.47s-2.28-0.55-3.55-0.5c-0.04 0-0.07 0-0.1-0.01-0.36-0.12-2.6-0.85-3.98-1.58-0.28-0.15-0.58 0.15-0.44 0.43 0.49 0.98 1.27 2.35 2.05 3.02 0 0-4.52-4.75-8.5-3.7-0.28 0.07-0.32 0.46-0.07 0.6 0.3 0.16 0.66 0.38 1.01 0.63 0.28 0.21 0.07 0.64-0.27 0.57h-0.02c-0.28-0.05-0.49 0.27-0.32 0.5 0.07 0.1 0.13 0.21 0.18 0.33 0.12 0.28-0.18 0.55-0.45 0.42-1.12-0.53-3.9-1.7-5.44-0.99-0.26 0.12-0.25 0.5 0.02 0.6 0.36 0.14 0.84 0.34 1.24 0.58 0.31 0.19 0.13 0.67-0.23 0.6-1.56-0.31-4.62-0.96-6.7-1.73-0.33-0.12-0.59 0.29-0.34 0.53 0.36 0.36 0.77 0.75 1.18 1.11 0.27 0.23 0.02 0.66-0.32 0.55-1.39-0.46-3.15-1.13-3.48-1.65s0.41 0.5 1.06 1.41c0.2 0.28-0.12 0.64-0.42 0.47-1.07-0.59-2.59-1.43-3.58-2-0.27-0.16-0.58 0.12-0.46 0.41l0.06 0.15c0.26 0.61 2.08 1.96 2 2.13s-7.09-2.24-8.94-1.94c-1.84 0.3 0.69 0.72 0.92 0.81s1.61 0.62 1.54 1.03-2.98 0.01-3.1-0.18c-0.07-0.1-1-0.55-1.81-0.94-0.3-0.14-0.6 0.21-0.4 0.49 0.42 0.59 0.82 1.25 0.67 1.48-0.29 0.46-3.06-2.02-4.01-2.1s0.99 1.31 1 1.79-3.19-1.3-3.92-0.99c-0.39 0.17 0.57 0.88 1.52 1.6 0.31 0.23 0.02 0.72-0.33 0.56-1.55-0.71-3.68-1.59-4.95-1.66-0.25-0.01-0.42 0.24-0.31 0.47 0.07 0.15 0.12 0.29 0.06 0.35-0.13 0.15-1.39-0.23-1.79-0.16-0.26 0.05 1.6 0.86 2.9 1.59 0.33 0.19 0.13 0.69-0.24 0.6-2.13-0.54-6.07-1.43-8.06-1.09-0.28 0.05-0.36 0.4-0.14 0.58 0.19 0.15 0.52 0.34 1.05 0.55 1.62 0.66 2.1 0.89 1.18 1.09-0.74 0.16-5.25-1.11-7.34-2.07-0.29-0.14-0.59 0.2-0.41 0.47 0.36 0.56 0.91 1.28 1.69 2.05 1.55 1.51 4.92 4.1 5.56 4.59 0.07 0.05 0.16 0.07 0.24 0.06l58.8-8.91c0.21-0.03 0.33-0.25 0.25-0.45l-0.99-2.35' }),
            React__default['default'].createElement("path", { fill: st13, d: 'm1081.1 504.92c-0.45-1.23-1.38-2.2-2.16-3.25s-1.43-2.33-1.19-3.61c0.17-0.9 0.78-1.7 0.83-2.62 0.09-2-2.45-3.32-2.53-5.32-0.05-1.31 1-2.61 0.53-3.83-0.06-0.15-0.14-0.29-0.14-0.45-0.03-0.54 0.66-0.75 1.18-0.9 0.85-0.25 1.64-0.83 1.97-1.65 0.33-0.83 0.2-1.85-0.9-2.12-2.08-0.08-4.16-0.16-6.25-0.24-0.64-0.02-1.18-0.14-1.76-0.2-0.35-0.03-0.72-0.24-0.89 0.06l0.08 4.31c0.08 0.28-0.15 0.82-0.08 1.11 0.29 1.12 0.38 1.94 0.73 3.15 0.18 1.04 0.33 2.19 0.33 3.18 0 2.55 2.46 3.86 2.63 5.18 0.16 1.31 0.9 2.88 0.99 4.44 0.08 1.56 0.9 2.3 0.9 3.04s1.48 2.38 1.48 3.45 0.66 3.29 0.66 5.42c0 2.14 0.33 2.46 0.33 4.93 0 1.36 0.25 1.96 0.49 2.42 1.33-0.65 2.21-2.24 2.44-3.78 0.29-1.92-0.11-3.87 0.03-5.8 0.17-2.33 1.1-4.73 0.3-6.92z' }),
            React__default['default'].createElement("path", { fill: st14, d: 'm1069.8 483.07c0.02-0.14 0.04-0.27 0.06-0.4-0.02 0.13-0.05 0.26-0.06 0.4z' }),
            React__default['default'].createElement("path", { fill: st13, d: 'm1059.5 456.91c-0.46-3.49 0.2-7.03 0.05-10.55-0.06-1.32-0.27-2.67-0.67-3.95 0.08-0.19 0.14-0.39 0.16-0.61 0.09-0.8-0.26-1.57-0.6-2.29l-4.17-8.82c-2.59-5.49-5.24-11.24-5.03-17.3 0.06-1.65 0.26-3.52-0.86-4.74-0.97-1.07-2.92-1.73-2.63-3.15 0.1-0.5 0.48-0.88 0.71-1.34 1.1-2.16-1.52-4.41-1.71-6.82-0.2-2.59 2.44-5.15 1.29-7.48l-0.51-0.34c0.41 0 0.82-0.01 1.24-0.03 0.2-0.01 0.24-0.29 0.05-0.36-0.58-0.21-1.17-0.42-1.75-0.62-0.35-0.12-0.72-0.27-0.9-0.6-0.26-0.48 0.06-1.05 0.22-1.57 0.16-0.51 0.17-1.06 0.04-1.57-0.2-0.76-0.73-1.46-0.66-2.24 0.03-0.33 0.16-0.64 0.3-0.94 0.43-0.98 0.98-2.07 2-2.4 0.26-0.09 0.55-0.12 0.76-0.29 0.22-0.17 0.3-0.55 0.07-0.7-0.09-0.06-0.22-0.07-0.33-0.06-0.64 0.02-1.25 0.31-1.83 0.59l-0.06 0.03c-0.2 0.11-0.34 0.21-0.35 0.25-0.03 0.14-1.82 0.96-1.82 0.96s-0.58 0.41-0.58 0.5c0 0.08-0.41 0.94-0.41 1.16s0.55 1.93 0.63 2.23 0.83 2.89 0.83 2.89 0.03 0.06 0.07 0.15c-0.03 0.27-0.07 0.55-0.13 0.84-0.04 0.21 0.27 0.49 0.48 0.75-0.06 0.25-0.12 0.52-0.12 0.61v0.08c0.09 0.07 0.18 0.13 0.27 0.2-0.13 1.34-0.65 2.3-0.74 2.66-0.25 1-0.45 9.77-0.61 10.75-0.16 0.97 1.13 4.7 1.13 5.18s1.3 4.37 1.3 4.37 1.46 3.4 1.46 5.67 1.3 6.32 1.3 6.96c0 0.65 3.33 9.06 6.41 12.29 0.26 1.66 0.48 2.94 0.48 3.08 0 0.22 0.89 2.19 1.5 3.64h0.01c0.34 0.82 0.62 1.51 0.62 1.69 0 0.49 1.15 6.16 1.15 7.07 0 0.9-1.23 2.79-1.23 6.33 0 3.53 0.08 3.37 0.08 6.82s-1.31 6.33-1.31 8.05c0 1.73-0.16 11.09-0.16 11.09l0.58 1.81v3.86s-0.49 3.53-0.49 4.44c0 0.9-0.9 3.61-1.06 6.16-0.15 2.55 1.06 2.05 1.06 4.68s0.82 3.2 0.82 5.67c0 2.46-0.33 1.89-0.33 2.79s-0.74 3.53-0.74 5.83c0 0.37 0.01 0.73 0.04 1.06 0.92 0.36 1.86 3.85 2.74 3.43 1.79-0.85 2.41-6.62 2.23-8.59-0.26-2.94-1.53-5.76-1.45-8.7 0.08-3.04 1.58-5.9 1.67-8.94 0.1-3.04-1.21-5.98-1.27-9.02-0.05-2.7 0.9-5.36 0.68-8.05-0.17-2.13-1.07-4.17-1.05-6.3 0.02-3.23 2.1-6.12 2.44-9.34 0.31-3.01-0.91-5.93-1.31-8.91z' }),
            React__default['default'].createElement("path", { fill: st3, d: 'm526.44 649.42s-3.01-1.59-4.81-1.97c-0.05-0.01-0.09-0.03-0.14-0.05-0.47-0.29-3.35-2.11-5.02-3.64-0.34-0.31-0.87 0-0.78 0.45 0.34 1.55 0.93 3.74 1.79 4.95 0 0-4.64-8.26-10.62-8.21-0.42 0-0.62 0.53-0.31 0.81 0.36 0.34 0.8 0.77 1.19 1.25 0.32 0.39-0.13 0.92-0.59 0.7-0.01 0-0.02-0.01-0.03-0.01-0.38-0.18-0.78 0.2-0.64 0.59 0.06 0.17 0.11 0.35 0.14 0.52 0.07 0.43-0.45 0.71-0.79 0.43-1.38-1.15-4.87-3.77-7.3-3.33-0.41 0.07-0.53 0.61-0.19 0.85 0.46 0.32 1.05 0.77 1.53 1.26 0.37 0.38-0.06 0.98-0.54 0.76-2.09-0.99-6.15-2.99-8.79-4.81-0.42-0.29-0.94 0.19-0.68 0.63 0.38 0.63 0.81 1.32 1.25 1.97 0.29 0.42-0.21 0.94-0.64 0.66-1.79-1.15-4.02-2.71-4.29-3.54-0.27-0.84 0.4 0.85 0.98 2.35 0.18 0.47-0.4 0.85-0.76 0.51-1.29-1.21-3.13-2.93-4.31-4.07-0.32-0.31-0.86-0.04-0.8 0.41l0.03 0.23c0.14 0.95 2.21 3.48 2.05 3.7s-9.16-5.67-11.86-5.91 0.71 1.25 1 1.47c0.29 0.21 2.03 1.44 1.79 1.99s-4.19-1.05-4.3-1.36c-0.06-0.17-1.2-1.13-2.2-1.96-0.38-0.31-0.92 0.08-0.74 0.54 0.38 0.97 0.7 2.04 0.41 2.31-0.57 0.54-3.58-3.92-4.88-4.37s0.91 2.19 0.75 2.86-4.02-2.95-5.16-2.78c-0.61 0.09 0.48 1.44 1.56 2.78 0.35 0.44-0.23 1.01-0.67 0.66-1.92-1.55-4.6-3.53-6.36-4.09-0.34-0.11-0.68 0.19-0.61 0.54 0.05 0.23 0.06 0.44-0.04 0.51-0.24 0.16-1.88-0.82-2.47-0.86-0.39-0.03 1.93 1.77 3.5 3.27 0.4 0.38-0.07 1.02-0.55 0.75-2.8-1.52-8.02-4.16-10.93-4.4-0.4-0.03-0.65 0.44-0.4 0.76 0.22 0.28 0.61 0.66 1.27 1.15 2.04 1.5 2.64 2 1.27 1.94-1.1-0.04-6.98-3.42-9.56-5.52-0.36-0.3-0.89 0.07-0.75 0.51 0.31 0.92 0.81 2.12 1.63 3.47 1.63 2.67 5.43 7.48 6.16 8.4 0.08 0.1 0.19 0.16 0.32 0.17l85.9 8.55c0.31 0.03 0.56-0.23 0.52-0.54l-0.54-3.64' }),
            React__default['default'].createElement("path", { fill: st15, d: 'm1328.3 878.69' }),
            React__default['default'].createElement("path", { fill: st15, d: 'm1058.3 413.82s-2.7-10.71 8.57-13.78h2.07l-0.56 6.33-5.11 7.45h-4.97z' }),
            React__default['default'].createElement("path", { fill: st13, d: 'm1080.1 404.14c-1.79-1.95-4.48-3.5-8.12-4.14-3.4-0.6-6.06-0.01-8.11 1.27 0.77-0.34 1.63-0.62 2.6-0.81l-0.13 4.42c-0.01 0.24-0.07 0.47-0.19 0.68l-3.34 6.04c-0.16 0.3-0.42 0.53-0.74 0.66l-3.77 1.56c0.12 1.19 0.38 2.2 0.65 2.95 0.52 0.91 1.17 1.74 1.98 2.41 3.11 2.59 7.61 2.41 11.64 2.1-2.3-0.26-4.56-0.84-6.7-1.71-0.53-0.21-1.14-0.61-1.05-1.17 0.12-0.77 1.36-0.76 1.77-1.42 0.27-0.43 0.1-0.99 0.1-1.49 0.01-1.43 1.43-2.46 2.81-2.79 1.39-0.33 2.86-0.19 4.24-0.54s2.77-1.45 2.7-2.87c-0.03-0.64-0.35-1.23-0.49-1.86s-0.02-1.41 0.55-1.7c0.31-0.16 0.69-0.13 1.04-0.1 1.3 0.13 2.6 0.25 3.91 0.38-0.37-0.67-0.83-1.3-1.35-1.87z' }),
            React__default['default'].createElement("path", { fill: st13, d: 'm1090.6 467.98c-0.14-0.54-0.35-1.06-0.45-1.61-0.1-0.61-0.04-1.24 0.01-1.86 0.15-1.59 0.29-3.18 0.44-4.78 0.1-1.13 0.19-2.35-0.35-3.34-0.41-0.74-1.14-1.33-1.55-2.04-0.46-0.79-1.13-1.43-1.94-1.87l-0.12-0.07c-0.37 0.54-0.56 1.16-0.63 1.8 0.23 0.57 0.8 2.93 0.79 3.61s0.88 1.86 0.88 3.76 0.42 2.51 0.42 3.88 0.23 1.9 0.23 2.55-0.23 2.01-0.23 2.47v3.27c0 0.84 0.46 3.5 0.38 4.37-0.06 0.68 0.79 1.01 1.25 0.7 0.11-0.45 0.07-1.01 0.03-1.48-0.25-3.14 1.61-6.29 0.84-9.36z' }),
            React__default['default'].createElement("path", { fill: st15, d: 'm1064.6 461.83s13.08 8.42 20.51 8.49c0 0 0.1-4.61-1.77-8.49h-18.74z' }),
            React__default['default'].createElement("path", { fill: st15, d: 'm1088.5 453.36c0.38-0.88 0.28-1.89 0.18-2.84-0.22-2.07-0.32-9.4-0.55-11.47 0 0-0.21-2.83-1.03-4.68-0.34-1-0.64-1.23-0.64-1.23l-0.74 20.88 0.67 3.19-0.34 5.67v1.78c0.63-1.34 1.27-2.67 1.9-4.01 0.27-0.56 0.54-1.15 0.5-1.77-0.06-0.84-0.68-1.56-0.96-2.34 0.05-0.58 0.1-1.15 0.15-1.71 0.25-0.5 0.63-0.96 0.86-1.47z' }),
            React__default['default'].createElement("path", { fill: st13, d: 'm1066.9 400.04s-4.15 0-7.61 5.6c0 0 3.81-4.92 7.61-4.96' }),
            React__default['default'].createElement("path", { fill: st15, d: 'm1070.2 423.79s7.57 2.54 15.97 1.95c0 0-1.71-2.8-7.34-3.95 0.01 0-1.6 1.91-8.63 2z' }),
            React__default['default'].createElement("path", { fill: st13, d: 'm1091.2 476.38s1.47 0.86 1.43 1.76-1.03 1.89-1.03 2.31c0 0.43-1.39 1.46-0.63 2.25 0 0-1.14-0.02-0.53-1.75s1.25-2.17 1.3-3.16c-0.01-0.01-0.22-1.26-0.54-1.41z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm1048.1 381.34h-0.38c-0.67 0-1.21-0.54-1.21-1.21v-8.07h2.8v8.07c0 0.67-0.54 1.21-1.21 1.21z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm1049.6 374.06h-3.34c-0.09 0-0.16-0.07-0.16-0.16v-8.72c1.2-0.29 2.46-0.29 3.66 0v8.72c0 0.09-0.07 0.16-0.16 0.16z' }),
            React__default['default'].createElement("path", { fill: st13, d: 'm1049.7 367.77s-2.68 1.21-3.66 3.42v-6.01s2.05-0.47 3.66 0v2.59z' }),
            React__default['default'].createElement("polygon", { fill: st15, points: '1046.2 374.06 1049.3 376.53 1049.3 374.06' }),
            React__default['default'].createElement("path", { fill: st15, d: 'm1046.4 420.75s2.37-4.79 10.64-5.34l-0.01-0.06c-0.1-0.59-0.39-1.13-0.84-1.54 0 0-6.94 0.52-10.1 5.27l0.31 1.67z' }),
            React__default['default'].createElement("path", { fill: st12, d: 'm1046.5 420.71c0.14-0.25 1-1.73 3.11-3.06-0.09-0.53-0.16-1.06-0.21-1.59-1.19 0.73-2.32 1.69-3.18 2.95 0.06 0.54 0.16 1.12 0.28 1.7z' }),
            React__default['default'].createElement("path", { fill: st15, d: 'm1046.1 417.73s1.32-4.7 9.6-5.24v-0.02c0.07-0.56-0.05-1.13-0.34-1.61 0 0-6.4 0.46-9.57 5.2l0.31 1.67z' }),
            React__default['default'].createElement("path", { fill: st12, d: 'm1046.1 417.73c0.14-0.25 1.11-2.19 3.23-3.53-0.09-0.53-0.12-0.84 0.01-1.41-1.19 0.73-2.59 1.86-3.45 3.12 0.06 0.54 0.1 1.24 0.21 1.82z' }),
            React__default['default'].createElement("path", { fill: st15, d: 'm1086.5 439.06s1.19 0.27 5.84-1.02l0.29 1.41s-2.14 0.95-6.39 1.03' }),
            React__default['default'].createElement("path", { fill: st15, d: 'm1086.5 442.12s1.07 0.35 6.5-0.94l0.31 1.46s-2.14 0.83-7.11 0.92' }),
            React__default['default'].createElement("path", { fill: st11, d: 'm1055.5 509.2s4.4 2.4 11.65 1.24l-0.36 1.78s-5.43 1.16-11.03-1.15l-0.26-1.87z' }),
            React__default['default'].createElement("path", { fill: st12, d: 'm1058.6 510.27c-1.73-0.39-2.8-0.89-3.07-1.03 0.14 0.55 0.26 1.12 0.3 1.89 1.08 0.44 2.15 0.74 3.17 0.96-0.15-0.61-0.29-1.21-0.4-1.82z' }),
            React__default['default'].createElement("path", { fill: st11, d: 'm1055.3 513.25s4.4 2.4 11.65 1.24l-0.36 1.78s-5.43 1.16-11.03-1.15l-0.26-1.87z' }),
            React__default['default'].createElement("path", { fill: st12, d: 'm1059.6 514.54c-1.77-0.48-3.7-0.98-3.97-1.11 0.14 0.55-0.17 0.82-0.22 1.71 1.08 0.44 2.22 0.81 4.44 1.18-0.15-0.6-0.14-1.17-0.25-1.78z' }),
            React__default['default'].createElement("path", { fill: st11, d: 'm1077.1 510.67s5.54 1.23 10.47-0.2l0.04 0.12c0.16 0.53 0.09 1.1-0.19 1.58 0 0-3.34 1.19-10.08 0l-0.24-1.5z' }),
            React__default['default'].createElement("path", { fill: st14, d: 'm1109.2 471.74c0.02-0.14 0.04-0.27 0.06-0.4-0.03 0.13-0.05 0.26-0.06 0.4z' }),
            React__default['default'].createElement("path", { fill: st12, d: 'm1077.3 512.17c1.25 0.22 2.38 0.36 3.39 0.43 0-0.26 0.01-0.51 0.03-0.77 0.02-0.24 0.04-0.47 0.07-0.71-1.98-0.1-3.45-0.39-3.73-0.45 0.09 0.47 0.17 0.98 0.24 1.5z' }),
            React__default['default'].createElement("path", { fill: st11, d: 'm1077.1 513.97s5.54 1.23 10.47-0.2l0.04 0.12c0.16 0.53 0.09 1.1-0.19 1.58 0 0-3.34 1.19-10.08 0l-0.24-1.5z' }),
            React__default['default'].createElement("path", { fill: st12, d: 'm1077.6 515.5c1.25 0.22 2.28 0.33 3.3 0.4 0-0.26-0.12-0.52-0.1-0.77 0.02-0.24 0.02-0.47 0.05-0.71-2.13-0.17-3.04-0.32-3.32-0.38-0.02 0.54 0 0.94 0.07 1.46z' }),
            React__default['default'].createElement("polygon", { fill: st3, points: '-0.34 573.18 -0.34 883.11 1365.6 883.11 1365.7 527.29' }),
            React__default['default'].createElement("g", { opacity: 0.2 },
                React__default['default'].createElement("path", { fill: st1, d: 'm156.09 436.44c12.66 59.38 12.01 93.03 12.01 93.03s-86.39-107.38-82.63-193.64c0 0 57.96 41.23 70.62 100.61z' })),
            React__default['default'].createElement("path", { fill: st1, d: 'm746.19 558.61c0.04 0.07 0.11 0.14 0.2 0.22-0.26-0.36-0.39-0.51-0.2-0.22z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm804.73 550.47c0.04 0.07 0.11 0.14 0.2 0.22-0.26-0.36-0.38-0.51-0.2-0.22z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm868.12 545.71c0.04 0.06 0.1 0.13 0.18 0.19-0.24-0.31-0.35-0.45-0.18-0.19z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm505.88 592.32c0.04 0.07 0.11 0.14 0.2 0.21-0.26-0.35-0.39-0.5-0.2-0.21z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm540.41 585c0.05 0.08 0.12 0.15 0.22 0.24-0.29-0.39-0.42-0.56-0.22-0.24z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm604.31 576.12c0.05 0.08 0.12 0.15 0.22 0.24-0.29-0.39-0.42-0.56-0.22-0.24z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm466.1 604.37c0.06 0.05 0.15 0.1 0.25 0.14-0.35-0.25-0.52-0.35-0.25-0.14z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm674.29 567.24c0.05 0.08 0.12 0.15 0.22 0.24-0.29-0.4-0.43-0.57-0.22-0.24z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm1030.4 523.59c0.04 0.06 0.1 0.13 0.18 0.2-0.23-0.33-0.34-0.47-0.18-0.2z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm967.32 530.28c0.05 0.09 0.13 0.18 0.24 0.27-0.31-0.44-0.46-0.64-0.24-0.27z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm1097 517.07c0.04 0.06 0.1 0.13 0.18 0.2-0.24-0.33-0.35-0.47-0.18-0.2z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm1150.1 510.39c0.04 0.06 0.1 0.13 0.18 0.2-0.23-0.32-0.34-0.47-0.18-0.2z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm1208.1 503.78c0.04 0.06 0.1 0.13 0.18 0.2-0.23-0.32-0.34-0.47-0.18-0.2z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm1246.4 496.86c0.04 0.06 0.1 0.13 0.18 0.2-0.23-0.33-0.34-0.47-0.18-0.2z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm1299.4 490.19c0.04 0.06 0.1 0.13 0.18 0.2-0.24-0.33-0.35-0.47-0.18-0.2z' }),
            React__default['default'].createElement("path", { fill: st1, d: `
				m1365.7
				486.72v-0.9h-0.01l0.01-3.86s-0.92-0.26-2.25-0.2c-0.04
				0-0.07
				0-0.11-0.01-0.38-0.11-2.71-0.83-4.13-1.57-0.29-0.15-0.62
				0.15-0.48
				0.44
				0.42
				0.85
				1.04
				1.98
				1.72
				2.71-1.12-1.05-4.93-4.26-8.47-3.34-0.3
				0.08-0.36
				0.47-0.09
				0.6
				0.31
				0.16
				0.68
				0.38
				1.04
				0.63
				0.29
				0.21
				0.05
				0.64-0.3
				0.58h-0.02c-0.3-0.05-0.52
				0.27-0.36
				0.51
				0.07
				0.1
				0.13
				0.21
				0.18
				0.33
				0.12
				0.28-0.21
				0.56-0.49
				0.43-1.16-0.53-4.04-1.69-5.69-0.96-0.28
				0.12-0.28
				0.5
				0
				0.6
				0.38
				0.14
				0.87
				0.33
				1.28
				0.58
				0.32
				0.19
				0.11
				0.67-0.26
				0.61-1.63-0.3-4.82-0.93-6.98-1.69-0.34-0.12-0.63
				0.29-0.38
				0.54
				0.37
				0.36
				0.78
				0.75
				1.2
				1.11
				0.27
				0.23
				0
				0.67-0.35
				0.56-1.27-0.4-2.83-0.96-3.41-1.44
				0.23
				0.31
				0.56
				0.77
				0.88
				1.22
				0.2
				0.28-0.15
				0.65-0.46
				0.48-1.1-0.59-2.68-1.42-3.69-1.99-0.28-0.15-0.62
				0.13-0.5
				0.42l0.06
				0.15c0.25
				0.61
				2.11
				1.96
				2.03
				2.13-0.08
				0.18-7.38-2.21-9.33-1.89-1.95
				0.31
				0.7
				0.72
				0.94
				0.81s1.67
				0.61
				1.58
				1.03c-0.08
				0.42-3.13
				0.03-3.25-0.16-0.07-0.1-1.03-0.55-1.87-0.93-0.31-0.14-0.64
				0.22-0.44
				0.49
				0.42
				0.59
				0.82
				1.25
				0.66
				1.49-0.32
				0.46-3.15-2.02-4.14-2.09s0.99
				1.32
				0.98
				1.8-3.31-1.28-4.09-0.96c-0.42
				0.17
				0.57
				0.89
				1.54
				1.6
				0.32
				0.23
				0
				0.72-0.37
				0.56-1.6-0.71-3.81-1.57-5.14-1.63-0.26-0.01-0.45
				0.25-0.35
				0.47
				0.07
				0.15
				0.11
				0.29
				0.06
				0.35-0.14
				0.15-1.46-0.22-1.88-0.14-0.27
				0.05
				1.53
				0.8
				2.87
				1.52-0.27
				0.08-0.32
				0.45-0.07
				0.59
				0.04
				0.02
				0.08
				0.05
				0.12
				0.07-0.06
				0.02-0.12
				0.03-0.2
				0.01-2.22-0.53-6.33-1.39-8.43-1.04-0.29
				0.05-0.39
				0.41-0.17
				0.58
				0.2
				0.15
				0.53
				0.34
				1.08
				0.55
				1.68
				0.65
				2.18
				0.88
				1.2
				1.09-0.78
				0.17-5.48-1.07-7.64-2.03-0.3-0.13-0.62
				0.21-0.45
				0.48
				0.36
				0.56
				0.91
				1.29
				1.7
				2.05
				0.52
				0.5
				1.24
				1.11
				2
				1.73-1.16-0.41-2.5-0.95-3.02-1.4
				0.22
				0.31
				0.55
				0.78
				0.86
				1.22
				0.2
				0.28-0.13
				0.64-0.43
				0.47-1.06-0.6-2.57-1.47-3.55-2.04-0.27-0.16-0.58
				0.11-0.47
				0.4l0.06
				0.15c0.25
				0.61
				2.05
				1.98
				1.98
				2.16-0.07
				0.17-7.07-2.33-8.91-2.06-1.85
				0.27
				0.68
				0.73
				0.91
				0.82
				0.23
				0.1
				1.6
				0.64
				1.53
				1.05s-2.98-0.03-3.1-0.22c-0.07-0.1-0.99-0.57-1.8-0.96-0.3-0.15-0.6
				0.2-0.41
				0.48
				0.42
				0.59
				0.81
				1.26
				0.66
				1.49-0.29
				0.45-3.04-2.06-3.98-2.15-0.95-0.09
				0.97
				1.33
				0.97
				1.8
				0
				0.48-3.17-1.34-3.91-1.04-0.4
				0.16
				0.56
				0.89
				1.5
				1.62
				0.31
				0.24
				0.01
				0.72-0.34
				0.55-1.54-0.73-3.66-1.63-4.93-1.72-0.25-0.02-0.43
				0.24-0.32
				0.46
				0.07
				0.15
				0.11
				0.29
				0.06
				0.35-0.13
				0.15-1.39-0.25-1.79-0.18-0.26
				0.04
				1.58
				0.88
				2.88
				1.63
				0.33
				0.19
				0.12
				0.69-0.25
				0.6-2.13-0.57-6.05-1.5-8.04-1.19-0.28
				0.04-0.36
				0.4-0.15
				0.57
				0.19
				0.15
				0.51
				0.34
				1.04
				0.56
				1.47
				0.62
				1.99
				0.87
				1.38
				1.05-0.71-0.24-2.53-0.9-3.71-1.55-0.28-0.15-0.59
				0.14-0.45
				0.43
				0.05
				0.11
				0.11
				0.22
				0.17
				0.33-1.3-0.41-2.64-0.89-3.53-1.32-0.23-0.11-0.46
				0.07-0.46
				0.29-0.86-0.22-1.75-0.28-2.62-0.06-0.28
				0.07-0.33
				0.46-0.08
				0.6
				0.3
				0.17
				0.66
				0.39
				1
				0.65
				0.28
				0.21
				0.06
				0.64-0.28
				0.57h-0.02c-0.28-0.06-0.49
				0.26-0.33
				0.5
				0.07
				0.1
				0.13
				0.21
				0.18
				0.33
				0.12
				0.28-0.19
				0.55-0.46
				0.42-1.12-0.55-3.88-1.75-5.43-1.06-0.26
				0.12-0.26
				0.5
				0.01
				0.6
				0.36
				0.14
				0.83
				0.35
				1.23
				0.6
				0.31
				0.2
				0.12
				0.67-0.24
				0.6-1.56-0.33-4.61-1.02-6.67-1.82-0.33-0.13-0.6
				0.28-0.35
				0.53
				0.36
				0.36
				0.76
				0.76
				1.16
				1.12
				0.26
				0.24
				0.01
				0.66-0.32
				0.55-1.21-0.42-2.71-1.01-3.28-1.49
				0.22
				0.31
				0.55
				0.78
				0.86
				1.22
				0.2
				0.28-0.13
				0.64-0.43
				0.47-1.06-0.6-2.57-1.47-3.55-2.04-0.27-0.16-0.58
				0.11-0.47
				0.4l0.06
				0.15c0.25
				0.61
				2.05
				1.98
				1.98
				2.16-0.07
				0.17-7.07-2.33-8.91-2.06-1.85
				0.27
				0.68
				0.73
				0.91
				0.82
				0.23
				0.1
				1.6
				0.64
				1.53
				1.05s-2.98-0.03-3.1-0.22c-0.07-0.1-0.99-0.57-1.8-0.96-0.3-0.15-0.6
				0.2-0.41
				0.48
				0.42
				0.59
				0.81
				1.26
				0.66
				1.49-0.29
				0.45-3.04-2.06-3.98-2.15-0.95-0.09
				0.97
				1.33
				0.97
				1.8
				0
				0.48-3.17-1.34-3.91-1.04-0.4
				0.16
				0.56
				0.89
				1.5
				1.62
				0.31
				0.24
				0.01
				0.72-0.34
				0.55-1.54-0.73-3.66-1.63-4.93-1.72-0.25-0.02-0.43
				0.24-0.32
				0.46
				0.07
				0.15
				0.11
				0.29
				0.06
				0.35-0.13
				0.15-1.39-0.25-1.79-0.18-0.24
				0.04
				1.32
				0.76
				2.59
				1.46-0.53-0.04-1.06-0.01-1.58
				0.12-0.11
				0.03-0.18
				0.1-0.21
				0.18-2.1-0.49-4.7-0.96-6.2-0.73-0.28
				0.04-0.36
				0.4-0.15
				0.57
				0.19
				0.15
				0.51
				0.34
				1.04
				0.57
				1.61
				0.68
				2.09
				0.92
				1.17
				1.1-0.74
				0.15-5.23-1.17-7.31-2.17-0.29-0.14-0.59
				0.19-0.42
				0.47
				0.36
				0.57
				0.89
				1.3
				1.66
				2.07l0.24
				0.24c-0.32-0.11-0.62-0.21-0.9-0.32-0.33-0.13-0.6
				0.28-0.35
				0.53
				0.36
				0.36
				0.76
				0.76
				1.16
				1.12
				0.01
				0.01
				0.01
				0.02
				0.02
				0.02-0.44
				0.06-0.88
				0.11-1.33
				0.17-0.95-0.36-1.87-0.77-2.29-1.13
				0.22
				0.31
				0.55
				0.78
				0.86
				1.22
				0.02
				0.03
				0.03
				0.06
				0.04
				0.08-0.31
				0.04-0.62
				0.08-0.94
				0.12-1.01-0.57-2.24-1.28-3.08-1.78-0.27-0.16-0.58
				0.11-0.47
				0.4l0.06
				0.15c0.15
				0.37
				0.84
				1
				1.37
				1.49-0.43
				0.05-0.86
				0.11-1.3
				0.16-2.23-0.67-5.77-1.73-7.01-1.55-1.85
				0.27
				0.68
				0.73
				0.91
				0.82s1.6
				0.64
				1.53
				1.05-2.98-0.03-3.1-0.22c-0.07-0.1-0.99-0.57-1.8-0.96-0.3-0.15-0.6
				0.2-0.41
				0.48
				0.42
				0.59
				0.81
				1.26
				0.66
				1.49-0.02
				0.03-0.04
				0.04-0.08
				0.05h-0.02c-0.57
				0.07-3.01-2.12-3.89-2.2-0.95-0.09
				0.97
				1.33
				0.97
				1.8
				0
				0.48-3.17-1.34-3.91-1.04-0.4
				0.16
				0.56
				0.89
				1.5
				1.62
				0.18
				0.14
				0.15
				0.36
				0.03
				0.49-0.13
				0.02-0.27
				0.03-0.4
				0.05-1.54-0.73-3.64-1.62-4.9-1.71-0.25-0.02-0.43
				0.24-0.32
				0.46
				0.07
				0.15
				0.11
				0.29
				0.06
				0.35-0.11
				0.12-0.97-0.12-1.5-0.18
				0.85-1.63
				1.82-3.2
				2.85-4.71
				3-4.38
				6.53-8.41
				9.23-12.98
				0.34-0.57
				0.5-1.54-0.14-1.68-8.03
				5.73-16.66
				12.36-18.73
				21.99-0.02-0.01-0.04-0.01-0.07-0.02-1.35-7.76
				0.91-15.75
				4.34-22.85
				3.45-7.15
				8.06-13.68
				11.75-20.72-13.04
				8.02-20.97
				23.43-20.59
				38.66-0.92-3.6-2.83-7.08-4.74-10.31-3.15-5.33-6.46-10.65-10.82-15.05-4.37-4.39-9.92-7.85-16.07-8.66
				4.88
				2.56
				9.34
				5.93
				13.13
				9.93
				6.78
				7.17
				11.24
				16.1
				15.16
				25.22-5.03-3.91-10.2-7.66-15.48-11.23
				3.39
				5.48
				7.25
				10.67
				11.52
				15.5-0.16
				0.08-0.24
				0.3-0.13
				0.47
				0.07
				0.1
				0.13
				0.21
				0.18
				0.33
				0.06
				0.13
				0.02
				0.26-0.07
				0.35-0.14
				0.02-0.28
				0.03-0.41
				0.05-1.13-0.55-3.86-1.73-5.4-1.05-0.26
				0.12-0.26
				0.49
				0.01
				0.6
				0.36
				0.14
				0.83
				0.35
				1.23
				0.6
				0.14
				0.09
				0.17
				0.23
				0.14
				0.36-0.32
				0.04-0.63
				0.08-0.95
				0.12-1.65-0.36-4.27-0.98-6.1-1.69-0.33-0.13-0.6
				0.28-0.35
				0.53
				0.36
				0.36
				0.76
				0.76
				1.16
				1.12
				0.26
				0.24
				0.01
				0.66-0.32
				0.55-1.21-0.42-2.71-1.01-3.28-1.49
				0.22
				0.31
				0.55
				0.78
				0.86
				1.22
				0.2
				0.28-0.13
				0.64-0.43
				0.47-1.06-0.6-2.57-1.47-3.55-2.04-0.27-0.16-0.58
				0.11-0.47
				0.4l0.06
				0.15c0.23
				0.57
				1.78
				1.78
				1.96
				2.09l-0.24
				0.03c-1.28-0.31-7.01-2.27-8.66-2.03-1.85
				0.27
				0.68
				0.73
				0.91
				0.82
				0.23
				0.1
				1.6
				0.64
				1.53
				1.05s-2.98-0.03-3.1-0.22c-0.07-0.1-0.99-0.57-1.8-0.96-0.3-0.15-0.6
				0.2-0.41
				0.48
				0.42
				0.59
				0.81
				1.26
				0.66
				1.49-0.29
				0.45-3.04-2.06-3.98-2.15-0.95-0.09
				0.97
				1.33
				0.97
				1.8
				0
				0.48-3.17-1.34-3.91-1.04-0.4
				0.16
				0.56
				0.89
				1.5
				1.62
				0.31
				0.24
				0.01
				0.72-0.34
				0.55-1.54-0.73-3.66-1.63-4.93-1.72-0.25-0.02-0.43
				0.24-0.32
				0.46
				0.07
				0.15
				0.11
				0.29
				0.06
				0.35-0.13
				0.15-1.39-0.25-1.79-0.18-0.26
				0.04
				1.58
				0.88
				2.88
				1.63
				0.33
				0.19
				0.12
				0.69-0.25
				0.6-2.13-0.57-6.05-1.5-8.04-1.19-0.28
				0.04-0.36
				0.4-0.15
				0.57
				0.19
				0.15
				0.51
				0.34
				1.04
				0.57
				0.98
				0.41
				1.54
				0.66
				1.62
				0.84-0.21
				0.03-0.41
				0.05-0.62
				0.08-0.85-0.3-2.32-0.86-3.33-1.42-0.28-0.15-0.59
				0.14-0.45
				0.43
				0.05
				0.11
				0.11
				0.22
				0.17
				0.33-1.3-0.41-2.64-0.89-3.53-1.32-0.23-0.11-0.46
				0.07-0.46
				0.29-0.86-0.22-1.75-0.28-2.62-0.06-0.28
				0.07-0.33
				0.46-0.08
				0.6
				0.3
				0.17
				0.66
				0.39
				1
				0.65
				0.28
				0.21
				0.06
				0.64-0.28
				0.57h-0.02c-0.28-0.06-0.49
				0.26-0.33
				0.5
				0.07
				0.1
				0.13
				0.21
				0.18
				0.33
				0.06
				0.14
				0.01
				0.27-0.08
				0.36-0.13
				0.02-0.27
				0.03-0.4
				0.05-1.13-0.55-3.87-1.74-5.41-1.05-0.26
				0.12-0.26
				0.49
				0.01
				0.6
				0.36
				0.14
				0.83
				0.35
				1.23
				0.6
				0.14
				0.09
				0.17
				0.24
				0.14
				0.36-0.31
				0.04-0.62
				0.08-0.92
				0.12-1.65-0.36-4.28-0.98-6.12-1.7-0.33-0.13-0.6
				0.28-0.35
				0.53
				0.36
				0.36
				0.76
				0.76
				1.16
				1.12
				0.26
				0.24
				0.01
				0.66-0.32
				0.55-1.21-0.42-2.71-1.01-3.28-1.49
				0.22
				0.31
				0.55
				0.78
				0.86
				1.22
				0.2
				0.28-0.13
				0.64-0.43
				0.47-1.06-0.6-2.57-1.47-3.55-2.04-0.27-0.16-0.58
				0.11-0.47
				0.4l0.06
				0.15c0.23
				0.57
				1.82
				1.81
				1.97
				2.11-0.07
				0.01-0.14
				0.02-0.21
				0.03-1.2-0.28-7.03-2.28-8.69-2.03-1.85
				0.27
				0.68
				0.73
				0.91
				0.82
				0.23
				0.1
				1.6
				0.64
				1.53
				1.05s-2.98-0.03-3.1-0.22c-0.07-0.1-0.99-0.57-1.8-0.96-0.3-0.15-0.6
				0.2-0.41
				0.48
				0.42
				0.59
				0.81
				1.26
				0.66
				1.49-0.29
				0.45-3.04-2.06-3.98-2.15-0.95-0.09
				0.97
				1.33
				0.97
				1.8
				0
				0.48-3.17-1.34-3.91-1.04-0.4
				0.16
				0.56
				0.89
				1.5
				1.62
				0.31
				0.24
				0.01
				0.72-0.34
				0.55-1.54-0.73-3.66-1.63-4.93-1.72-0.25-0.02-0.43
				0.24-0.32
				0.46
				0.07
				0.15
				0.11
				0.29
				0.06
				0.35-0.13
				0.15-1.39-0.25-1.79-0.18-0.26
				0.04
				1.58
				0.88
				2.88
				1.63
				0.33
				0.19
				0.12
				0.69-0.25
				0.6-2.13-0.57-6.05-1.5-8.04-1.19-0.28
				0.04-0.36
				0.4-0.15
				0.57
				0.19
				0.15
				0.51
				0.34
				1.04
				0.56
				1.03
				0.44
				1.6
				0.69
				1.63
				0.86-0.44
				0.06-0.87
				0.11-1.31
				0.17-1.6-0.29-4.8-1.3-6.46-2.1-0.29-0.14-0.59
				0.19-0.42
				0.47
				0.36
				0.57
				0.89
				1.3
				1.66
				2.07l0.2
				0.2c-0.95
				0.12-1.89
				0.24-2.84
				0.36l-0.11-0.27-0.76-0.21s-2.28-0.58-3.54-0.54c-0.04
				0-0.07
				0-0.1-0.01-0.36-0.12-2.59-0.88-3.96-1.64-0.28-0.15-0.59
				0.14-0.45
				0.43
				0.41
				0.85
				1.03
				1.99
				1.69
				2.72-1.09-1.06-4.78-4.32-8.13-3.48-0.28
				0.07-0.33
				0.46-0.08
				0.6
				0.3
				0.17
				0.66
				0.39
				1
				0.65
				0.28
				0.21
				0.06
				0.64-0.28
				0.57h-0.02c-0.28-0.06-0.49
				0.26-0.33
				0.5
				0.07
				0.1
				0.13
				0.21
				0.18
				0.33
				0.12
				0.28-0.19
				0.55-0.46
				0.42-1.12-0.55-3.88-1.75-5.43-1.06-0.26
				0.12-0.26
				0.49
				0.01
				0.6
				0.36
				0.14
				0.83
				0.35
				1.23
				0.6
				0.31
				0.2
				0.12
				0.67-0.24
				0.6-1.56-0.33-4.61-1.02-6.67-1.82-0.33-0.13-0.6
				0.28-0.35
				0.53
				0.36
				0.36
				0.76
				0.76
				1.16
				1.12
				0.26
				0.24
				0.01
				0.66-0.32
				0.55-1.21-0.42-2.71-1.01-3.28-1.49
				0.22
				0.31
				0.55
				0.78
				0.86
				1.22
				0.2
				0.28-0.13
				0.64-0.43
				0.47-1.06-0.6-2.57-1.47-3.55-2.04-0.27-0.16-0.58
				0.11-0.47
				0.4l0.06
				0.15c0.25
				0.61
				2.05
				1.98
				1.98
				2.16-0.07
				0.17-7.07-2.33-8.91-2.06-1.85
				0.27
				0.68
				0.73
				0.91
				0.82
				0.23
				0.1
				1.6
				0.64
				1.53
				1.05s-2.98-0.03-3.1-0.22c-0.07-0.1-0.99-0.57-1.8-0.96-0.3-0.15-0.6
				0.2-0.41
				0.48
				0.42
				0.59
				0.81
				1.26
				0.66
				1.49-0.29
				0.45-3.04-2.06-3.98-2.15-0.95-0.09
				0.97
				1.33
				0.97
				1.8
				0
				0.48-3.17-1.34-3.91-1.04-0.4
				0.16
				0.56
				0.89
				1.5
				1.62
				0.31
				0.24
				0.01
				0.72-0.34
				0.55-1.54-0.73-3.66-1.63-4.93-1.72-0.25-0.02-0.43
				0.24-0.32
				0.46
				0.07
				0.15
				0.11
				0.29
				0.06
				0.35-0.13
				0.15-1.39-0.25-1.79-0.18-0.26
				0.04
				1.58
				0.88
				2.88
				1.63
				0.33
				0.19
				0.12
				0.69-0.25
				0.6-2.13-0.57-6.05-1.5-8.04-1.19-0.28
				0.04-0.36
				0.4-0.15
				0.57
				0.19
				0.15
				0.51
				0.34
				1.04
				0.57
				1.61
				0.68
				2.09
				0.92
				1.17
				1.1-0.74
				0.15-5.23-1.17-7.31-2.17-0.29-0.14-0.59
				0.19-0.42
				0.47
				0.01
				0.01
				0.01
				0.02
				0.02
				0.03-0.34-0.13-0.66
				0.23-0.49
				0.59
				0.54
				1.12
				1.33
				2.61
				2.17
				3.63h-0.02c-1.55-1.57-6.27-5.88-10.45-4.87-0.36
				0.09-0.41
				0.6-0.08
				0.8
				0.39
				0.24
				0.86
				0.55
				1.3
				0.91
				0.36
				0.29
				0.1
				0.87-0.34
				0.76-0.01
				0-0.02
				0-0.03-0.01-0.36-0.09-0.62
				0.34-0.41
				0.67
				0.09
				0.14
				0.18
				0.29
				0.24
				0.45
				0.16
				0.38-0.22
				0.74-0.57
				0.55-1.45-0.78-5.04-2.5-7.01-1.62-0.33
				0.15-0.31
				0.66
				0.04
				0.81
				0.47
				0.2
				1.08
				0.5
				1.6
				0.85
				0.4
				0.27
				0.18
				0.91-0.28
				0.8-2.01-0.49-5.95-1.53-8.63-2.68-0.42-0.18-0.75
				0.36-0.43
				0.71
				0.47
				0.5
				1
				1.05
				1.53
				1.56
				0.35
				0.33
				0.04
				0.9-0.4
				0.73-1.57-0.61-3.52-1.45-4.26-2.13
				0.29
				0.42
				0.73
				1.07
				1.15
				1.68
				0.26
				0.39-0.14
				0.86-0.53
				0.62-1.38-0.85-3.35-2.07-4.63-2.88-0.35-0.22-0.75
				0.14-0.59
				0.53l0.08
				0.21c0.34
				0.84
				2.7
				2.75
				2.61
				2.98s-9.15-3.39-11.51-3.08
				0.9
				1.01
				1.19
				1.15c0.3
				0.14
				2.07
				0.92
				2
				1.47-0.08
				0.55-3.82-0.14-3.99-0.4-0.09-0.14-1.29-0.8-2.34-1.36-0.39-0.21-0.76
				0.26-0.51
				0.64
				0.55
				0.82
				1.08
				1.73
				0.89
				2.04-0.36
				0.6-3.97-2.89-5.19-3.04-1.22-0.16
				1.29
				1.82
				1.31
				2.47
				0.02
				0.64-4.12-1.91-5.06-1.53-0.5
				0.21
				0.74
				1.22
				1.98
				2.24
				0.41
				0.33
				0.04
				0.97-0.42
				0.73-2-1.04-4.75-2.33-6.38-2.49-0.32-0.03-0.54
				0.31-0.39
				0.62
				0.09
				0.2
				0.16
				0.39
				0.09
				0.47-0.16
				0.2-1.79-0.38-2.31-0.3-0.34
				0.05
				2.06
				1.24
				3.75
				2.3
				0.43
				0.27
				0.18
				0.94-0.3
				0.8-2.75-0.84-7.82-2.24-10.37-1.88-0.35
				0.05-0.45
				0.53-0.17
				0.77
				0.25
				0.21
				0.67
				0.48
				1.35
				0.8
				2.1
				0.97
				2.72
				1.31
				1.53
				1.53-0.08
				0.02-0.2
				0.01-0.35
				0-0.46-0.19-0.85-0.39-1.14-0.59
				0
				0
				0.17
				0.18
				0.43
				0.47-2.05-0.44-6.23-1.92-8.4-3.05-0.38-0.2-0.75
				0.24-0.52
				0.62
				0.48
				0.78
				1.19
				1.78
				2.2
				2.85
				0.79
				0.83
				1.93
				1.89
				3.09
				2.92-1.64-0.42-6.89-2.11-8.45-1.86-1.84
				0.3
				0.69
				0.72
				0.92
				0.81s1.61
				0.62
				1.54
				1.03-2.98
				0.01-3.1-0.18c-0.13-0.19-3.04-1.5-3.04-1.5s1.79
				2.08
				1.5
				2.54-3.06-2.02-4.01-2.1
				0.99
				1.31
				1
				1.79-3.19-1.3-3.92-0.99c-0.61
				0.26
				2.02
				1.83
				2.84
				2.67-0.15
				0.02-0.3
				0.04-0.45
				0.06-1.56-0.77-5.37-2.54-6.73-2.19
				0
				0
				0.46
				0.62
				0.33
				0.77s-1.39-0.23-1.79-0.16c-0.33
				0.06
				2.71
				1.33
				3.77
				2.14-0.29
				0.04-0.58
				0.07-0.86
				0.11-2.21-0.57-6.82-1.64-8.69-1.06
				0
				0-0.32
				0.38
				1.3
				1.04
				0.9
				0.37
				1.45
				0.6
				1.6
				0.77-0.52
				0.07-1.04
				0.13-1.56
				0.2-2.23-0.44-6.71-1.89-7.21-2.6
				0
				0
				0.49
				1.24
				1.88
				2.74-0.4-0.13-2.6-0.85-3.96-1.58-0.28-0.15-0.58
				0.15-0.44
				0.43
				0.32
				0.64
				0.76
				1.44
				1.24
				2.1-0.05
				0.01-0.11
				0.01-0.16
				0.02-1.54-1.32-4.68-3.56-7.54-2.8-0.28
				0.07-0.32
				0.46-0.07
				0.6
				0.3
				0.16
				0.66
				0.38
				1.01
				0.63
				0.28
				0.21
				0.07
				0.64-0.27
				0.57h-0.02c-0.28-0.05-0.49
				0.27-0.32
				0.5
				0.07
				0.1
				0.13
				0.21
				0.18
				0.33
				0.12
				0.28-0.18
				0.55-0.45
				0.42-1.12-0.53-3.9-1.7-5.44-0.99-0.26
				0.12-0.25
				0.5
				0.02
				0.6
				0.36
				0.14
				0.84
				0.34
				1.24
				0.58
				0.31
				0.19
				0.13
				0.67-0.23
				0.6-1.56-0.31-4.62-0.96-6.7-1.73-0.33-0.12-0.59
				0.29-0.34
				0.53
				0.36
				0.36
				0.77
				0.75
				1.18
				1.11
				0.27
				0.24
				0.02
				0.66-0.32
				0.55-1.22-0.41-2.72-0.97-3.29-1.45
				0.23
				0.3
				0.56
				0.77
				0.88
				1.21
				0.2
				0.28-0.12
				0.64-0.42
				0.47-1.07-0.59-2.59-1.43-3.58-2-0.27-0.15-0.58
				0.12-0.46
				0.41l0.06
				0.15c0.26
				0.61
				2.08
				1.96
				2
				2.13-0.07
				0.17-7.09-2.24-8.94-1.94-1.84
				0.3
				0.69
				0.72
				0.92
				0.81s1.61
				0.62
				1.54
				1.03-2.98
				0.01-3.1-0.18c-0.07-0.1-1-0.55-1.81-0.94-0.3-0.14-0.6
				0.21-0.4
				0.49
				0.42
				0.59
				0.82
				1.25
				0.67
				1.48-0.29
				0.46-3.06-2.02-4.01-2.1s0.99
				1.31
				1
				1.79-3.19-1.3-3.92-0.99c-0.39
				0.17
				0.57
				0.88
				1.52
				1.6
				0.31
				0.23
				0.02
				0.72-0.33
				0.56-1.55-0.71-3.68-1.59-4.95-1.66-0.25-0.01-0.42
				0.24-0.31
				0.47
				0.07
				0.15
				0.12
				0.29
				0.06
				0.35-0.13
				0.15-1.39-0.23-1.79-0.16-0.26
				0.05
				1.6
				0.86
				2.9
				1.59
				0.33
				0.19
				0.13
				0.69-0.24
				0.6-2.13-0.54-6.07-1.43-8.06-1.09-0.28
				0.05-0.36
				0.4-0.14
				0.58
				0.19
				0.15
				0.52
				0.34
				1.05
				0.55
				1.62
				0.66
				2.1
				0.89
				1.18
				1.09-0.25
				0.05-0.92-0.05-1.79-0.26l-0.68-1.61-0.85-0.23s-2.53-0.61-3.92-0.55c-0.04
				0-0.07
				0-0.11-0.01-0.4-0.13-2.88-0.94-4.4-1.75-0.31-0.16-0.65
				0.16-0.49
				0.48
				0.47
				0.93
				1.16
				2.17
				1.89
				2.97-1.23-1.17-5.34-4.7-9.03-3.73-0.31
				0.08-0.36
				0.51-0.08
				0.66
				0.33
				0.18
				0.73
				0.42
				1.11
				0.7
				0.31
				0.23
				0.08
				0.71-0.3
				0.63h-0.02c-0.31-0.06-0.54
				0.29-0.36
				0.56
				0.08
				0.11
				0.15
				0.24
				0.2
				0.36
				0.14
				0.31-0.2
				0.61-0.5
				0.47-1.24-0.59-4.31-1.88-6.02-1.1-0.29
				0.13-0.28
				0.55
				0.02
				0.66
				0.4
				0.15
				0.93
				0.37
				1.37
				0.65
				0.34
				0.21
				0.14
				0.74-0.25
				0.66-1.73-0.34-5.11-1.06-7.41-1.91-0.36-0.14-0.65
				0.32-0.38
				0.59
				0.4
				0.4
				0.85
				0.83
				1.3
				1.23
				0.29
				0.26
				0.02
				0.73-0.35
				0.61-1.35-0.45-3.01-1.08-3.64-1.6
				0.25
				0.34
				0.62
				0.85
				0.97
				1.34
				0.22
				0.31-0.13
				0.71-0.47
				0.52-1.18-0.65-2.87-1.58-3.96-2.21-0.3-0.17-0.64
				0.13-0.51
				0.45l0.07
				0.17c0.29
				0.68
				2.3
				2.17
				2.22
				2.36s-7.85-2.48-9.89-2.15
				0.76
				0.79
				1.02
				0.9c0.26
				0.1
				1.78
				0.68
				1.7
				1.14-0.07
				0.46-3.29
				0.01-3.43-0.2-0.08-0.11-1.1-0.61-2-1.04-0.34-0.16-0.66
				0.24-0.44
				0.54
				0.47
				0.65
				0.91
				1.38
				0.75
				1.64-0.32
				0.51-3.39-2.24-4.44-2.33s1.09
				1.45
				1.1
				1.98-3.53-1.43-4.34-1.09c-0.44
				0.18
				0.63
				0.98
				1.68
				1.77
				0.35
				0.26
				0.03
				0.79-0.37
				0.61-1.71-0.79-4.07-1.76-5.47-1.84-0.28-0.02-0.47
				0.27-0.35
				0.52
				0.08
				0.16
				0.13
				0.32
				0.07
				0.38-0.14
				0.17-1.54-0.25-1.99-0.17-0.29
				0.05
				1.77
				0.95
				3.21
				1.76
				0.37
				0.21
				0.14
				0.77-0.27
				0.66-2.36-0.6-6.71-1.58-8.91-1.21-0.3
				0.05-0.4
				0.45-0.15
				0.64
				0.22
				0.17
				0.57
				0.37
				1.16
				0.61
				1.63
				0.66
				2.22
				0.93
				1.54
				1.14-0.79-0.26-2.81-0.96-4.13-1.66-0.31-0.16-0.65
				0.16-0.49
				0.48
				0.06
				0.12
				0.12
				0.24
				0.19
				0.37-1.44-0.43-2.93-0.95-3.92-1.41-0.26-0.12-0.51
				0.09-0.51
				0.33-0.96-0.23-1.94-0.28-2.9-0.03-0.31
				0.08-0.36
				0.51-0.08
				0.66
				0.33
				0.18
				0.73
				0.42
				1.11
				0.7
				0.31
				0.23
				0.08
				0.71-0.3
				0.63h-0.02c-0.31-0.06-0.54
				0.29-0.36
				0.56
				0.08
				0.11
				0.15
				0.23
				0.2
				0.36
				0.14
				0.31-0.2
				0.61-0.5
				0.47-1.24-0.59-4.31-1.88-6.02-1.1-0.29
				0.13-0.28
				0.55
				0.02
				0.66
				0.4
				0.15
				0.93
				0.37
				1.37
				0.65
				0.34
				0.21
				0.14
				0.74-0.25
				0.66-1.73-0.34-5.11-1.06-7.41-1.91-0.36-0.14-0.65
				0.32-0.38
				0.59
				0.4
				0.4
				0.85
				0.83
				1.3
				1.23
				0.29
				0.26
				0.02
				0.73-0.35
				0.61-1.35-0.45-3.01-1.08-3.64-1.6
				0.25
				0.34
				0.62
				0.85
				0.97
				1.34
				0.22
				0.31-0.13
				0.71-0.47
				0.52-1.18-0.65-2.87-1.58-3.96-2.21-0.3-0.17-0.64
				0.13-0.51
				0.45l0.07
				0.17c0.29
				0.68
				2.3
				2.17
				2.22
				2.36s-7.85-2.48-9.89-2.15
				0.76
				0.79
				1.02
				0.9c0.26
				0.1
				1.78
				0.68
				1.7
				1.14s-3.29
				0.01-3.43-0.2c-0.08-0.11-1.1-0.61-2-1.04-0.34-0.16-0.66
				0.24-0.44
				0.54
				0.47
				0.65
				0.91
				1.38
				0.75
				1.64-0.32
				0.51-3.39-2.24-4.44-2.33s1.09
				1.45
				1.1
				1.98-3.53-1.43-4.34-1.09c-0.44
				0.18
				0.63
				0.98
				1.68
				1.77
				0.35
				0.26
				0.03
				0.79-0.37
				0.61-1.71-0.79-4.07-1.76-5.47-1.84-0.28-0.02-0.47
				0.27-0.35
				0.52
				0.08
				0.16
				0.13
				0.32
				0.07
				0.38-0.14
				0.17-1.54-0.25-1.99-0.17-0.29
				0.05
				1.77
				0.95
				3.21
				1.76
				0.37
				0.21
				0.14
				0.77-0.27
				0.66-2.36-0.6-6.71-1.58-8.91-1.21-0.3
				0.05-0.4
				0.45-0.15
				0.64
				0.21
				0.17
				0.57
				0.37
				1.16
				0.61
				1.8
				0.73
				2.33
				0.98
				1.3
				1.2-0.82
				0.18-5.8-1.22-8.11-2.29-0.32-0.15-0.65
				0.22-0.45
				0.52
				0.4
				0.62
				1
				1.42
				1.87
				2.26
				0.16
				0.16
				0.34
				0.32
				0.53
				0.5-0.71-0.16-2.78-0.6-4.04-0.55-0.04
				0-0.08
				0-0.12-0.02-0.44-0.14-3.14-1.02-4.81-1.91-0.34-0.18-0.7
				0.18-0.53
				0.52
				0.51
				1.01
				1.27
				2.37
				2.07
				3.25-1.35-1.28-5.83-5.13-9.86-4.07-0.34
				0.09-0.39
				0.55-0.08
				0.72
				0.36
				0.2
				0.8
				0.46
				1.22
				0.77
				0.34
				0.25
				0.08
				0.77-0.33
				0.69-0.01
				0-0.02
				0-0.03-0.01-0.34-0.06-0.59
				0.32-0.39
				0.61
				0.08
				0.12
				0.16
				0.26
				0.22
				0.39
				0.15
				0.33-0.22
				0.67-0.55
				0.51-1.36-0.65-4.71-2.06-6.57-1.2-0.32
				0.15-0.3
				0.6
				0.02
				0.72
				0.44
				0.17
				1.01
				0.41
				1.49
				0.7
				0.38
				0.23
				0.16
				0.81-0.28
				0.72-1.89-0.37-5.58-1.15-8.08-2.09-0.4-0.15-0.71
				0.35-0.41
				0.65
				0.44
				0.43
				0.93
				0.9
				1.42
				1.34
				0.32
				0.28
				0.02
				0.8-0.38
				0.67-1.47-0.49-3.29-1.17-3.98-1.75
				0.27
				0.37
				0.68
				0.93
				1.06
				1.46
				0.24
				0.34-0.14
				0.77-0.51
				0.57-1.29-0.71-3.13-1.73-4.32-2.41-0.33-0.19-0.7
				0.15-0.56
				0.49l0.08
				0.18c0.31
				0.74
				2.51
				2.36
				2.42
				2.57s-8.57-2.71-10.79-2.35c-2.23
				0.36
				0.83
				0.87
				1.11
				0.98s1.94
				0.75
				1.86
				1.25-3.59
				0.01-3.75-0.22c-0.08-0.12-1.2-0.67-2.18-1.13-0.37-0.17-0.72
				0.26-0.48
				0.59
				0.51
				0.71
				0.99
				1.51
				0.81
				1.79-0.35
				0.55-3.7-2.44-4.84-2.54s1.19
				1.59
				1.2
				2.16c0.01
				0.58-3.85-1.56-4.74-1.19-0.48
				0.2
				0.69
				1.07
				1.83
				1.93
				0.38
				0.28
				0.03
				0.87-0.4
				0.67-1.87-0.86-4.44-1.92-5.98-2-0.3-0.02-0.51
				0.29-0.38
				0.56
				0.09
				0.18
				0.14
				0.35
				0.08
				0.42-0.16
				0.18-1.68-0.28-2.17-0.19-0.32
				0.06
				1.93
				1.03
				3.5
				1.92
				0.4
				0.23
				0.15
				0.84-0.29
				0.72-2.57-0.66-7.33-1.72-9.73-1.32-0.33
				0.06-0.43
				0.49-0.17
				0.7
				0.23
				0.18
				0.62
				0.41
				1.26
				0.67
				1.96
				0.8
				2.54
				1.07
				1.42
				1.31-0.89
				0.19-6.34-1.33-8.86-2.5-0.35-0.16-0.71
				0.24-0.49
				0.57
				0.15
				0.23
				0.33
				0.49
				0.53
				0.76-0.53-0.22-1.06-0.46-1.5-0.7-0.34-0.18-0.7
				0.18-0.53
				0.52
				0.51
				1.01
				1.27
				2.37
				2.07
				3.25-1.35-1.28-5.83-5.13-9.86-4.07-0.34
				0.09-0.39
				0.55-0.08
				0.72
				0.36
				0.2
				0.8
				0.46
				1.22
				0.77
				0.34
				0.25
				0.08
				0.77-0.33
				0.69h-0.03c-0.34-0.06-0.59
				0.32-0.39
				0.61
				0.08
				0.12
				0.16
				0.26
				0.22
				0.39
				0.15
				0.33-0.22
				0.67-0.55
				0.51-1.36-0.65-4.71-2.06-6.57-1.2-0.32
				0.15-0.3
				0.6
				0.02
				0.72
				0.44
				0.17
				1.01
				0.41
				1.49
				0.7
				0.38
				0.23
				0.16
				0.81-0.28
				0.72-1.89-0.37-5.58-1.15-8.08-2.09-0.4-0.15-0.71
				0.35-0.41
				0.65
				0.44
				0.43
				0.93
				0.9
				1.42
				1.34
				0.32
				0.28
				0.02
				0.8-0.38
				0.67-1.47-0.49-3.29-1.17-3.98-1.75
				0.27
				0.37
				0.68
				0.93
				1.06
				1.46
				0.24
				0.34-0.14
				0.77-0.51
				0.57-1.29-0.71-3.13-1.73-4.32-2.41-0.33-0.19-0.7
				0.15-0.56
				0.49l0.08
				0.18c0.31
				0.74
				2.51
				2.36
				2.42
				2.57s-8.57-2.71-10.79-2.35c-2.23
				0.36
				0.83
				0.87
				1.11
				0.98s1.94
				0.75
				1.86
				1.25-3.59
				0.01-3.75-0.22c-0.08-0.12-1.2-0.67-2.18-1.13-0.37-0.17-0.72
				0.26-0.48
				0.59
				0.51
				0.71
				0.99
				1.51
				0.81
				1.79-0.35
				0.55-3.7-2.44-4.84-2.54s1.19
				1.59
				1.2
				2.16c0.01
				0.58-3.85-1.56-4.74-1.19-0.48
				0.2
				0.69
				1.07
				1.83
				1.93
				0.38
				0.28
				0.03
				0.87-0.4
				0.67-1.87-0.86-4.44-1.92-5.98-2-0.3-0.02-0.51
				0.29-0.38
				0.56
				0.09
				0.18
				0.14
				0.35
				0.08
				0.42-0.16
				0.18-1.68-0.28-2.17-0.19-0.32
				0.06
				1.93
				1.03
				3.5
				1.92
				0.4
				0.23
				0.15
				0.84-0.29
				0.72-2.58-0.66-7.33-1.72-9.73-1.32-0.33
				0.06-0.43
				0.49-0.17
				0.69
				0.23
				0.18
				0.62
				0.41
				1.26
				0.67
				1.78
				0.72
				2.42
				1.02
				1.68
				1.25-0.86-0.28-3.07-1.05-4.51-1.81-0.34-0.18-0.7
				0.18-0.53
				0.52
				0.06
				0.13
				0.13
				0.26
				0.2
				0.4-1.57-0.47-3.2-1.04-4.28-1.54-0.28-0.13-0.55
				0.1-0.55
				0.36-1.04-0.25-2.12-0.31-3.16-0.03-0.34
				0.09-0.39
				0.55-0.08
				0.72
				0.36
				0.2
				0.8
				0.46
				1.22
				0.77
				0.34
				0.25
				0.09
				0.77-0.33
				0.69h-0.03c-0.34-0.06-0.59
				0.32-0.39
				0.61
				0.08
				0.12
				0.16
				0.26
				0.22
				0.39
				0.15
				0.33-0.22
				0.67-0.55
				0.51-1.36-0.65-4.71-2.06-6.57-1.2-0.32
				0.15-0.3
				0.6
				0.02
				0.72
				0.44
				0.17
				1.01
				0.41
				1.49
				0.7
				0.38
				0.23
				0.16
				0.81-0.28
				0.72-1.89-0.37-5.58-1.15-8.08-2.09-0.4-0.15-0.71
				0.35-0.41
				0.65
				0.44
				0.43
				0.93
				0.9
				1.42
				1.34
				0.32
				0.28
				0.02
				0.8-0.38
				0.67-1.47-0.49-3.29-1.17-3.98-1.75
				0.27
				0.37
				0.68
				0.93
				1.06
				1.46
				0.24
				0.34-0.14
				0.77-0.51
				0.57-1.29-0.71-3.13-1.73-4.32-2.41-0.33-0.19-0.7
				0.15-0.56
				0.49l0.08
				0.18c0.31
				0.74
				2.51
				2.36
				2.42
				2.57s-8.57-2.71-10.79-2.35c-2.23
				0.36
				0.83
				0.87
				1.11
				0.98s1.94
				0.75
				1.86
				1.25-3.59
				0.01-3.75-0.22c-0.08-0.12-1.2-0.67-2.18-1.13-0.37-0.17-0.72
				0.26-0.48
				0.59
				0.51
				0.71
				0.99
				1.51
				0.81
				1.79-0.35
				0.55-3.7-2.44-4.84-2.54s1.19
				1.59
				1.2
				2.16c0.01
				0.58-3.85-1.56-4.74-1.19-0.48
				0.2
				0.69
				1.07
				1.83
				1.93
				0.38
				0.28
				0.03
				0.87-0.4
				0.67-1.87-0.86-4.44-1.92-5.98-2-0.3-0.02-0.51
				0.29-0.38
				0.56
				0.09
				0.18
				0.14
				0.35
				0.08
				0.42-0.16
				0.18-1.68-0.28-2.17-0.19-0.32
				0.06
				1.93
				1.03
				3.5
				1.92
				0.4
				0.23
				0.15
				0.84-0.29
				0.72-2.57-0.66-7.33-1.72-9.73-1.32-0.33
				0.06-0.43
				0.49-0.17
				0.7
				0.23
				0.18
				0.62
				0.41
				1.26
				0.67
				1.68
				0.68
				2.34
				0.98
				1.8
				1.21-0.12-0.07-0.22-0.14-0.3-0.21
				0.06
				0.08
				0.12
				0.16
				0.19
				0.25-0.07
				0.02-0.16
				0.04-0.26
				0.07-0.39
				0.08-1.66-0.16-3.17-0.56-0.06-0.03-0.12-0.07-0.17-0.1-0.1-0.06-0.2-0.06-0.28-0.03-1.84-0.51-3.93-1.21-5.24-1.82-0.35-0.16-0.71
				0.24-0.49
				0.57
				0.44
				0.68
				1.1
				1.55
				2.04
				2.47
				0.1
				0.1
				0.2
				0.19
				0.31
				0.3-1.79-0.45-3.52-0.81-4.33-0.67-2.01
				0.33
				0.75
				0.78
				1
				0.89
				0.09
				0.03
				0.32
				0.12
				0.58
				0.24l-0.74
				0.05s-1.05
				0.09-2.14
				0.29c-0.38-0.2-0.9-0.44-1.38-0.67-0.33-0.16-0.65
				0.23-0.44
				0.53
				0.12
				0.16
				0.23
				0.33
				0.33
				0.49-0.07
				0.02-0.15
				0.05-0.22
				0.07-0.04
				0.01-0.07
				0.02-0.11
				0.02-0.17
				0-0.69
				0.01-1.36-0.01-0.88-0.59-1.8-1.21-2.29-1.25-0.68-0.06
				0
				0.58
				0.55
				1.18-0.55-0.04-1.09-0.09-1.56-0.17-0.19-0.03-0.34
				0.09-0.39
				0.24-0.76-0.28-1.49-0.49-1.8-0.36-0.43
				0.18
				0.62
				0.97
				1.66
				1.74
				0.05
				0.04
				0.08
				0.08
				0.1
				0.12-0.86-0.24-1.82-0.44-2.79-0.5-1.14-0.43-2.27-0.78-3.07-0.82-0.27-0.02-0.46
				0.27-0.34
				0.51
				0.08
				0.16
				0.13
				0.31
				0.07
				0.38-0.14
				0.16-1.52-0.25-1.96-0.17-0.18
				0.03
				0.57
				0.4
				1.51
				0.87-0.07
				0.04-0.13
				0.08-0.2
				0.12-0.26
				0.17-0.18
				0.59
				0.13
				0.64
				0.37
				0.06
				0.82
				0.16
				1.26
				0.31
				0.22
				0.07
				0.27
				0.28
				0.21
				0.45-2.33-0.59-6.62-1.56-8.79-1.19-0.3
				0.05-0.39
				0.44-0.15
				0.63
				0.21
				0.17
				0.56
				0.37
				1.14
				0.6
				1.77
				0.72
				2.3
				0.97
				1.29
				1.19-0.81
				0.17-5.73-1.21-8.01-2.26-0.32-0.15-0.64
				0.22-0.45
				0.51
				0.4
				0.61
				0.99
				1.4
				1.84
				2.23
				0.82
				0.8
				2.11
				1.88
				3.31
				2.84-0.87
				0.05-1.73
				0.07-2.5
				0.04-0.38-0.01-0.51
				0.5-0.17
				0.67
				0.49
				0.24
				1.05
				0.51
				1.59
				0.74
				0.35
				0.15
				0.25
				0.68-0.14
				0.68-1.4
				0-3.15-0.06-3.9-0.36
				0.34
				0.24
				0.84
				0.6
				1.32
				0.95
				0.3
				0.22
				0.1
				0.7-0.27
				0.63-1.31-0.24-3.17-0.58-4.38-0.83-0.33-0.07-0.56
				0.33-0.34
				0.58l0.12
				0.13c0.47
				0.54
				2.81
				1.3
				2.8
				1.51-0.01
				0.2-8.1
				0.14-9.91
				1.08s0.96
				0.5
				1.23
				0.52
				1.87
				0.08
				1.94
				0.53-3.08
				1.03-3.27
				0.89c-0.11-0.08-1.22-0.23-2.19-0.34-0.36-0.04-0.55
				0.43-0.25
				0.64
				0.64
				0.46
				1.27
				1
				1.2
				1.3-0.14
				0.57-3.85-1.03-4.86-0.78-1.01
				0.24
				1.47
				1.01
				1.64
				1.5s-3.74-0.24-4.39
				0.34c-0.35
				0.31
				0.89
				0.72
				2.11
				1.12
				0.4
				0.13
				0.27
				0.73-0.16
				0.69-1.84-0.2-4.35-0.37-5.68
				0-0.26
				0.07-0.36
				0.4-0.17
				0.59
				0.12
				0.12
				0.22
				0.25
				0.18
				0.34-0.08
				0.2-1.52
				0.25-1.91
				0.46-0.25
				0.14
				1.94
				0.33
				3.54
				0.64
				0.41
				0.08
				0.37
				0.67-0.05
				0.7-2.39
				0.17-6.76
				0.62-8.7
				1.66-0.27
				0.14-0.23
				0.54
				0.05
				0.64
				0.25
				0.09
				0.65
				0.17
				1.27
				0.21
				1.9
				0.12
				2.48
				0.19
				1.59
				0.71-0.71
				0.42-5.8
				0.67-8.29
				0.39-0.35-0.04-0.54
				0.41-0.26
				0.63
				0.57
				0.45
				1.38
				1.01
				2.44
				1.53
				0.82
				0.4
				1.97
				0.86
				3.12
				1.3-0.44
				0.58-0.8
				1.15-1.05
				1.72
				1.19
				1.34
				2.33
				2.64
				2.67
				2.32
				0.32-0.3-0.03-1.48-0.45-2.55-0.2-0.5
				0.4-0.93
				0.81-0.59
				1.1
				0.91
				2.36
				1.97
				2.43
				2.15
				0.12
				0.34
				4.47
				2.11
				4.73
				1.5
				0.27-0.61-1.65-1.96-1.97-2.2-0.19-0.14-1.56-0.76-2.06-1.2l0.83-0.42c0.04
				0
				0.08
				0.01
				0.12
				0.01
				2.98
				0.27
				12.89
				6.75
				13.07
				6.51s-2.1-3.03-2.26-4.08l-0.04-0.26c-0.07-0.49
				0.52-0.79
				0.88-0.45
				1.3
				1.26
				3.32
				3.16
				4.74
				4.49
				0.4
				0.38
				1.04-0.05
				0.84-0.57-0.31-0.8-0.65-1.65-0.87-2.21
				0.69
				0.96
				2.8
				2.43
				4.53
				3.53
				0.48
				0.31
				1.03-0.26
				0.71-0.73-0.49-0.72-0.97-1.48-1.38-2.17-0.29-0.48
				0.28-1.01
				0.74-0.69
				2.9
				2.01
				7.38
				4.21
				9.68
				5.3
				0.53
				0.25
				1-0.42
				0.59-0.83-0.52-0.54-1.17-1.03-1.68-1.39-0.38-0.26-0.25-0.85
				0.21-0.93
				2.68-0.48
				6.51
				2.41
				8.04
				3.67
				0.37
				0.31
				0.95
				0
				0.87-0.47-0.03-0.2-0.09-0.39-0.16-0.58-0.16-0.43
				0.29-0.84
				0.7-0.65
				0.01
				0
				0.02
				0.01
				0.03
				0.01
				0.5
				0.24
				1-0.35
				0.65-0.77-0.43-0.53-0.91-1-1.31-1.37-0.34-0.31-0.12-0.89
				0.34-0.89
				5.52-0.05
				10
				6.34
				11.31
				8.41-0.74-1.38-1.26-3.36-1.58-4.82-0.11-0.49
				0.48-0.83
				0.86-0.49
				1.84
				1.68
				5.02
				3.69
				5.54
				4.01
				0.05
				0.03
				0.1
				0.05
				0.15
				0.06
				0.87
				0.18
				1.99
				0.62
				2.97
				1.05-0.03-0.07-0.05-0.15-0.07-0.21-0.16-0.49
				0.42-0.89
				0.82-0.56
				0.98
				0.8
				2.39
				1.76
				3.87
				2.69l3.64-9.06c1.52-3.78
				5.18-6.26
				9.26-6.26h8.44l12.89
				5.7
				1.96
				6.9h8.49l9.19
				5.7
				1.51
				3.62c0.85
				0.65
				1.86
				1.33
				2.76
				1.9
				0.3
				0.19
				0.62
				0.04
				0.75-0.21-0.76-1.05-1.45-2.07-1.96-2.9-0.91-1.48-1.46-2.81-1.8-3.82-0.16-0.49
				0.42-0.89
				0.82-0.56
				2.85
				2.32
				9.33
				6.04
				10.54
				6.09
				0.17
				0.01
				0.3
				0
				0.42
				0
				0.03-0.01
				0.06-0.03
				0.1-0.03
				0.05-0.01
				0.11-0.01
				0.16-0.02
				0.47-0.18-0.31-0.79-2.07-2.09-0.73-0.54-1.16-0.95-1.4-1.26-0.27-0.35
				0-0.87
				0.44-0.83
				3.21
				0.26
				8.96
				3.17
				12.05
				4.85
				0.17
				0.09
				0.34
				0.08
				0.48
				0.02-0.29-0.31-0.57-0.59-0.83-0.83-0.27-0.25-0.18-0.65
				0.09-0.82-1.59-1.43-3.34-2.82-2.99-2.79
				0.65
				0.04
				2.46
				1.13
				2.72
				0.95
				0.11-0.07
				0.09-0.31
				0.04-0.56-0.08-0.39
				0.29-0.72
				0.67-0.6
				1.94
				0.61
				4.89
				2.8
				7.01
				4.51
				0.48
				0.39
				1.13-0.24
				0.74-0.73-1.19-1.47-2.39-2.96-1.72-3.06
				1.26-0.19
				5.51
				3.8
				5.68
				3.06
				0.18-0.74-2.26-3.65-0.83-3.15s4.75
				5.41
				5.37
				4.82c0.32-0.3-0.03-1.48-0.45-2.55-0.2-0.5
				0.4-0.93
				0.81-0.59
				1.1
				0.91
				2.36
				1.97
				2.43
				2.15
				0.12
				0.34
				4.47
				2.11
				4.73
				1.5
				0.27-0.61-1.65-1.96-1.97-2.2s-4.08-1.88-1.1-1.61
				12.89
				6.75
				13.07
				6.51-2.1-3.03-2.26-4.08l-0.04-0.26c-0.07-0.49
				0.52-0.79
				0.88-0.45
				1.3
				1.26
				3.32
				3.16
				4.74
				4.49
				0.4
				0.38
				1.04-0.05
				0.84-0.56-0.23-0.58-0.46-1.19-0.66-1.69l-6.02-5.29-7.06-11.72-0.75
				1.13c-1.03
				1.56-3.23
				1.96-4.63
				0.74-1.32-1.15-1.2-2.92
				0.16-2.35
				2.11
				0.89
				3.88-0.77
				3.88-0.77-1.66-3.48-9.93-10.01-9.93-10.01s-2.12
				4.42-5.61
				4.06c-3.49-0.37-3.99-5.03-1.38-4.79s5-1.03
				5-1.03l-6.11-5.55
				0.6-0.96
				4.75
				2.96s-1.85-9.33
				1.42-7.41c3.27
				1.93
				0.42
				9.4
				0.42
				9.4
				4.35
				2.92
				11.41
				11.56
				11.41
				11.56s-4.67-9.92
				0.12-9.07
				2.31
				12.66
				2.31
				12.66l10.94
				13.19
				11.58
				5.39c-2.86-2.47-4.47-9.19-4.47-9.19
				0.87
				1.56
				2.62
				3.6
				4.41
				5.47
				1.12
				1.17
				2.24
				2.26
				3.18
				3.14
				0.34
				0.03
				0.69
				0.1
				1.04
				0.2-0.68-1.42-1.05-3-1.05-3
				1.78
				2.38
				4.45
				4.28
				7.87
				6.21
				0.01-0.06
				0.01-0.11
				0-0.18-0.03-0.2-0.09-0.39-0.16-0.58-0.16-0.43
				0.29-0.84
				0.7-0.65
				0.01
				0
				0.02
				0.01
				0.03
				0.01
				0.5
				0.24
				1-0.35
				0.65-0.77-0.43-0.53-0.91-1-1.31-1.37-0.34-0.31-0.12-0.89
				0.35-0.89
				5.52-0.05
				10
				6.34
				11.31
				8.41-0.74-1.38-1.26-3.36-1.58-4.82-0.11-0.49
				0.48-0.83
				0.86-0.49
				1.84
				1.68
				5.02
				3.69
				5.54
				4.01
				0.05
				0.03
				0.1
				0.05
				0.15
				0.06
				0.46
				0.1
				0.99
				0.27
				1.54
				0.47-0.58-0.8-1.11-1.58-1.49-2.2-0.68-1.11-1.1-2.11-1.35-2.87-0.12-0.37
				0.32-0.67
				0.62-0.42
				2.14
				1.74
				7.01
				4.54
				7.92
				4.57
				1.14
				0.04
				0.65-0.36-1.05-1.61-0.55-0.41-0.87-0.72-1.05-0.95-0.2-0.26
				0-0.65
				0.33-0.63
				2.42
				0.2
				6.74
				2.38
				9.06
				3.65
				0.4
				0.22
				0.79-0.31
				0.46-0.62-1.3-1.24-3.22-2.73-2.9-2.71
				0.49
				0.03
				1.85
				0.85
				2.04
				0.71
				0.08-0.06
				0.07-0.23
				0.03-0.42-0.06-0.29
				0.22-0.54
				0.5-0.45
				1.46
				0.46
				3.68
				2.11
				5.27
				3.39
				0.36
				0.29
				0.85-0.18
				0.55-0.55-0.89-1.11-1.8-2.22-1.29-2.3
				0.95-0.14
				4.14
				2.86
				4.27
				2.3s-1.7-2.74-0.62-2.37
				3.57
				4.07
				4.04
				3.62c0.24-0.23-0.02-1.11-0.34-1.92-0.15-0.37
				0.3-0.7
				0.61-0.44
				0.83
				0.68
				1.77
				1.48
				1.82
				1.62
				0.09
				0.25
				3.36
				1.58
				3.56
				1.13
				0.2-0.46-1.24-1.47-1.48-1.65s-3.06-1.41-0.83-1.21c2.24
				0.2
				9.69
				5.08
				9.83
				4.9
				0.13-0.18-1.58-2.28-1.7-3.06l-0.03-0.19c-0.06-0.37
				0.39-0.6
				0.66-0.34
				0.98
				0.94
				2.5
				2.37
				3.57
				3.37
				0.3
				0.28
				0.78-0.04
				0.63-0.42-0.23-0.6-0.49-1.24-0.66-1.66
				0.52
				0.72
				2.1
				1.82
				3.4
				2.65
				0.36
				0.23
				0.77-0.2
				0.53-0.55-0.37-0.54-0.73-1.11-1.04-1.63-0.22-0.36
				0.21-0.76
				0.56-0.52
				2.18
				1.51
				5.55
				3.17
				7.28
				3.98
				0.4
				0.19
				0.75-0.31
				0.45-0.63-0.39-0.4-0.88-0.78-1.26-1.04-0.28-0.2-0.18-0.64
				0.16-0.7
				2.01-0.36
				4.9
				1.81
				6.04
				2.76
				0.28
				0.23
				0.71
				0
				0.65-0.36-0.02-0.15-0.07-0.3-0.12-0.43-0.12-0.32
				0.22-0.63
				0.53-0.49
				0.01
				0
				0.02
				0.01
				0.02
				0.01
				0.38
				0.18
				0.75-0.26
				0.49-0.58-0.32-0.4-0.68-0.75-0.98-1.03-0.25-0.24-0.09-0.67
				0.26-0.67
				3.06-0.03
				5.7
				2.58
				7.27
				4.58
				0.22
				0.14
				0.45
				0.27
				0.67
				0.4-0.27-0.78-0.48-1.6-0.62-2.28-0.08-0.37
				0.36-0.62
				0.64-0.37
				0.5
				0.46
				1.14
				0.95
				1.77
				1.4
				0.07-0.06
				0.17-0.1
				0.28-0.1
				2.42
				0.2
				6.74
				2.38
				9.06
				3.65
				0.4
				0.22
				0.79-0.31
				0.46-0.62-1.3-1.24-3.22-2.73-2.9-2.71
				0.49
				0.03
				1.85
				0.85
				2.04
				0.71
				0.08-0.06
				0.07-0.23
				0.03-0.42-0.06-0.29
				0.22-0.54
				0.5-0.45
				1.46
				0.46
				3.68
				2.1
				5.27
				3.39
				0.36
				0.29
				0.85-0.18
				0.55-0.54-0.89-1.11-1.8-2.22-1.29-2.3
				0.95-0.14
				4.14
				2.86
				4.27
				2.3s-1.7-2.74-0.62-2.37
				3.57
				4.07
				4.04
				3.62c0.24-0.23-0.02-1.11-0.34-1.92-0.15-0.37
				0.3-0.7
				0.61-0.44
				0.83
				0.68
				1.77
				1.48
				1.82
				1.62
				0.09
				0.25
				3.36
				1.58
				3.56
				1.13
				0.2-0.46-1.24-1.47-1.48-1.65s-3.06-1.41-0.83-1.21c2.24
				0.2
				9.69
				5.08
				9.83
				4.9
				0.13-0.18-1.58-2.28-1.7-3.06l-0.03-0.19c-0.06-0.37
				0.39-0.6
				0.66-0.34
				0.98
				0.94
				2.5
				2.37
				3.57
				3.37
				0.3
				0.28
				0.78-0.04
				0.63-0.42-0.23-0.6-0.49-1.24-0.66-1.66
				0.52
				0.72
				2.1
				1.82
				3.4
				2.66
				0.36
				0.23
				0.77-0.2
				0.53-0.55-0.37-0.54-0.73-1.11-1.04-1.63-0.22-0.36
				0.21-0.76
				0.56-0.52
				2.18
				1.51
				5.55
				3.17
				7.28
				3.98
				0.4
				0.19
				0.75-0.31
				0.45-0.63-0.39-0.4-0.88-0.78-1.26-1.04-0.28-0.2-0.19-0.64
				0.16-0.7
				2.01-0.36
				4.9
				1.81
				6.04
				2.76
				0.28
				0.23
				0.71
				0
				0.65-0.36-0.02-0.15-0.07-0.3-0.12-0.43-0.12-0.32
				0.22-0.63
				0.53-0.49
				0.01
				0
				0.02
				0.01
				0.02
				0.01
				0.38
				0.18
				0.75-0.26
				0.48-0.58-0.32-0.39-0.68-0.75-0.98-1.03-0.25-0.24-0.09-0.67
				0.26-0.67
				4.16-0.04
				7.54
				4.79
				8.51
				6.33-0.56-1.04-0.96-2.53-1.2-3.63-0.08-0.37
				0.36-0.62
				0.64-0.37
				0
				0
				4.77
				6.56
				7.7
				9.45
				0.74
				0.39
				1.22
				0.78
				1.42
				1.17
				0.74
				1.44-2.34
				2.86-10.02
				4.27-23.27
				4.26-18.35
				10.43
				0.74
				16.8-0.08-0.1-0.09-0.16
				0-0.15
				0.53
				0.04
				1.65
				0.61
				2.49
				0.96
				0.29
				0.09
				0.58
				0.18
				0.88
				0.27
				0.05
				0
				0.09-0.01
				0.11-0.02
				0.14-0.09
				0.12-0.4
				0.05-0.72-0.11-0.5
				0.37-0.92
				0.86-0.76
				1.69
				0.53
				3.98
				2
				6.13
				3.58
				1.14
				0.31
				2.31
				0.62
				3.51
				0.94-1.43-1.77-2.75-3.47-1.94-3.59
				1.61-0.24
				7.04
				4.86
				7.27
				3.92s-2.89-4.66-1.06-4.03c1.83
				0.64
				6.07
				6.92
				6.87
				6.16
				0.41-0.39-0.04-1.89-0.58-3.26-0.25-0.64
				0.51-1.19
				1.04-0.75
				1.41
				1.16
				3.02
				2.52
				3.1
				2.76
				0.16
				0.43
				5.71
				2.69
				6.05
				1.92
				0.34-0.78-2.11-2.5-2.53-2.81-0.41-0.3-5.21-2.41-1.41-2.06
				3.8
				0.34
				16.49
				8.64
				16.72
				8.33s-2.68-3.88-2.88-5.21l-0.05-0.33c-0.09-0.63
				0.67-1.02
				1.12-0.57
				1.66
				1.61
				4.25
				4.03
				6.07
				5.74
				0.52
				0.48
				1.33-0.07
				1.07-0.72-0.4-1.03-0.83-2.12-1.12-2.83
				0.89
				1.23
				3.58
				3.1
				5.79
				4.52
				0.61
				0.39
				1.31-0.33
				0.91-0.93-0.63-0.92-1.23-1.89-1.77-2.78-0.37-0.61
				0.36-1.29
				0.95-0.88
				3.71
				2.57
				9.44
				5.39
				12.38
				6.78
				0.67
				0.32
				1.28-0.53
				0.76-1.07-0.67-0.69-1.5-1.32-2.15-1.77-0.48-0.34-0.31-1.09
				0.27-1.19
				3.42-0.62
				8.33
				3.08
				10.28
				4.7
				0.48
				0.39
				1.21
				0
				1.11-0.61-0.04-0.25-0.12-0.5-0.2-0.74-0.2-0.55
				0.37-1.08
				0.9-0.83
				0.01
				0.01
				0.03
				0.01
				0.04
				0.02
				0.64
				0.3
				1.27-0.44
				0.83-0.99-0.55-0.67-1.16-1.28-1.67-1.76-0.43-0.4-0.15-1.14
				0.44-1.14
				7.06-0.06
				12.79
				8.1
				14.46
				10.75-0.94-1.76-1.61-4.29-2.02-6.16-0.14-0.63
				0.62-1.06
				1.1-0.63
				2.35
				2.15
				6.42
				4.72
				7.08
				5.13
				0.06
				0.04
				0.12
				0.06
				0.19
				0.08
				0.64
				0.14
				1.4
				0.38
				2.16
				0.67-1.15-1.58-2.23-3.14-2.99-4.37-1.16-1.9-1.87-3.59-2.3-4.88-0.21-0.62
				0.54-1.14
				1.05-0.72
				3.64
				2.96
				11.93
				7.72
				13.47
				7.78
				1.93
				0.07
				1.1-0.62-1.78-2.74-0.94-0.69-1.48-1.22-1.79-1.61-0.35-0.45
				0-1.11
				0.57-1.06
				4.11
				0.34
				11.46
				4.06
				15.4
				6.2
				0.68
				0.37
				1.34-0.52
				0.78-1.06-2.21-2.11-5.48-4.64-4.94-4.6
				0.83
				0.06
				3.14
				1.44
				3.48
				1.21
				0.14-0.09
				0.12-0.4
				0.05-0.72-0.11-0.5
				0.37-0.92
				0.86-0.76
				2.48
				0.78
				6.26
				3.58
				8.96
				5.76
				0.62
				0.5
				1.44-0.31
				0.94-0.93-1.52-1.88-3.06-3.78-2.19-3.91
				1.61-0.24
				7.04
				4.86
				7.27
				3.92
				0.22-0.94-2.89-4.66-1.06-4.03
				1.83
				0.64
				6.07
				6.92
				6.87
				6.16
				0.41-0.39-0.04-1.89-0.58-3.26-0.25-0.64
				0.51-1.19
				1.04-0.75
				1.41
				1.16
				3.02
				2.52
				3.1
				2.76
				0.16
				0.43
				5.71
				2.69
				6.05
				1.92
				0.34-0.78-2.11-2.5-2.53-2.81-0.41-0.3-5.21-2.41-1.41-2.06
				3.8
				0.34
				16.49
				8.64
				16.72
				8.33s-2.68-3.88-2.88-5.21l-0.05-0.33c-0.09-0.63
				0.67-1.02
				1.12-0.57
				1.66
				1.61
				4.25
				4.03
				6.07
				5.74
				0.52
				0.48
				1.33-0.07
				1.07-0.72-0.4-1.03-0.83-2.12-1.12-2.83
				0.89
				1.23
				3.58
				3.1
				5.79
				4.52
				0.61
				0.39
				1.31-0.33
				0.91-0.93-0.63-0.92-1.23-1.89-1.77-2.78-0.37-0.61
				0.36-1.29
				0.95-0.88
				3.71
				2.57
				9.44
				5.39
				12.38
				6.78
				0.67
				0.32
				1.28-0.53
				0.76-1.07-0.67-0.68-1.5-1.32-2.15-1.77-0.48-0.34-0.31-1.09
				0.27-1.19
				3.42-0.62
				8.33
				3.08
				10.28
				4.7
				0.48
				0.39
				1.21
				0
				1.11-0.61-0.04-0.25-0.12-0.5-0.2-0.74-0.2-0.55
				0.37-1.08
				0.9-0.83
				0.01
				0.01
				0.03
				0.01
				0.04
				0.02
				0.64
				0.3
				1.27-0.44
				0.83-0.99-0.55-0.67-1.16-1.28-1.67-1.76-0.43-0.4-0.15-1.14
				0.44-1.14
				6.45-0.05
				11.79
				6.75
				13.93
				9.94
				0.05
				0
				0.1
				0.01
				0.14
				0.01-0.74-1.67-1.29-3.77-1.64-5.37-0.14-0.63
				0.62-1.06
				1.1-0.63
				2.35
				2.15
				6.42
				4.72
				7.08
				5.13
				0.05
				0.03
				0.1
				0.05
				0.16
				0.07-8.16-9.15-13.81-20.57-15.86-32.66
				11.75
				8.92
				21.9
				19.94
				29.82
				32.38-2.57-10.81-3.54-22.01-2.87-33.11
				0.29-4.73
				1.07-9.86
				4.5-13.12
				10.59
				13.64
				10.81
				32.39
				10.57
				49.66
				8.09-2.9
				16.44-5.07
				24.92-6.47-2.6
				3.99-5.72
				7.63-9.26
				10.82
				59.7
				11.21
				95.77
				29.89
				74.72
				36.46-7.61
				2.37-8.63
				6.89-2.85
				12.31-0.48-1.3-1.48-3.53-1.43-4.44l0.02-0.32c0.04-0.6
				0.82-0.81
				1.15-0.31
				1.23
				1.82
				3.16
				4.58
				4.52
				6.52
				0.38
				0.55
				1.25
				0.2
				1.14-0.46-0.17-1.03-0.35-2.13-0.48-2.85-0.08-0.18-0.13-0.35-0.15-0.49-0.06-0.61
				0.01-0.27
				0.15
				0.49
				0.58
				1.32
				2.72
				3.58
				4.49
				5.33
				0.49
				0.48
				1.29-0.05
				1.03-0.69-0.4-0.98-0.78-2-1.1-2.93-0.22-0.64
				0.59-1.13
				1.06-0.63
				2.95
				3.12
				7.72
				6.86
				10.18
				8.73
				0.56
				0.43
				1.29-0.25
				0.91-0.84-0.48-0.77-1.14-1.52-1.65-2.07-0.38-0.41-0.08-1.07
				0.48-1.06
				3.3
				0.09
				7.14
				4.5
				8.63
				6.38
				0.36
				0.46
				1.13
				0.24
				1.15-0.35
				0.01-0.24-0.01-0.49-0.04-0.72-0.08-0.55
				0.55-0.93
				1-0.6
				0.01
				0.01
				0.02
				0.02
				0.03
				0.02
				0.53
				0.41
				1.27-0.16
				0.96-0.76-0.38-0.73-0.83-1.42-1.21-1.96-0.32-0.46
				0.08-1.09
				0.63-0.98
				6.57
				1.33
				10.3
				10.04
				11.33
				12.82-0.53-1.82-0.66-4.31-0.67-6.12
				0-0.61
				0.78-0.87
				1.14-0.37
				1.77
				2.46
				5.05
				5.64
				5.58
				6.15
				0.05
				0.05
				0.1
				0.08
				0.16
				0.11
				1.57
				0.69
				3.74
				2.31
				4.92
				3.23-0.91-1.27-1.74-2.49-2.35-3.48-1.1-1.8-1.78-3.41-2.19-4.64-0.2-0.59
				0.51-1.08
				1-0.68
				3.46
				2.81
				11.33
				7.33
				12.8
				7.39
				1.84
				0.07
				1.04-0.59-1.69-2.6-0.89-0.66-1.41-1.16-1.7-1.53-0.33-0.43
				0-1.06
				0.54-1.01
				3.9
				0.32
				10.88
				3.85
				14.63
				5.89
				0.65
				0.35
				1.27-0.5
				0.74-1.01-2.1-2-5.21-4.41-4.69-4.37
				0.79
				0.05
				2.99
				1.37
				3.3
				1.15
				0.13-0.09
				0.11-0.38
				0.05-0.68-0.1-0.47
				0.35-0.87
				0.82-0.73
				2.35
				0.74
				5.94
				3.4
				8.51
				5.47
				0.59
				0.48
				1.37-0.29
				0.89-0.88-1.44-1.79-2.91-3.59-2.08-3.72
				1.53-0.23
				6.69
				4.62
				6.9
				3.72s-2.75-4.43-1.01-3.83
				5.77
				6.57
				6.53
				5.85c0.39-0.37-0.04-1.8-0.55-3.1-0.24-0.6
				0.49-1.13
				0.99-0.72
				1.34
				1.1
				2.87
				2.39
				2.95
				2.62
				0.15
				0.41
				5.43
				2.56
				5.75
				1.82s-2.01-2.38-2.4-2.67-4.95-2.29-1.34-1.96c3.61
				0.32
				15.66
				8.2
				15.88
				7.91s-2.55-3.68-2.74-4.95l-0.05-0.31c-0.09-0.6
				0.63-0.96
				1.07-0.55
				1.58
				1.53
				4.03
				3.83
				5.76
				5.45
				0.49
				0.46
				1.26-0.06
				1.02-0.69-0.38-0.97-0.79-2.01-1.06-2.69-0.12-0.16-0.2-0.32-0.25-0.45-0.19-0.58-0.04-0.26
				0.25
				0.45
				0.84
				1.17
				3.4
				2.95
				5.5
				4.29
				0.58
				0.37
				1.25-0.32
				0.86-0.88-0.6-0.87-1.17-1.8-1.68-2.64-0.35-0.58
				0.34-1.22
				0.9-0.84
				3.53
				2.44
				8.97
				5.12
				11.76
				6.44
				0.64
				0.3
				1.21-0.51
				0.72-1.01-0.63-0.65-1.43-1.25-2.04-1.68-0.46-0.32-0.3-1.03
				0.25-1.13
				3.25-0.59
				7.91
				2.93
				9.76
				4.46
				0.45
				0.37
				1.15
				0
				1.06-0.58-0.04-0.24-0.11-0.48-0.19-0.7-0.19-0.52
				0.35-1.03
				0.86-0.79
				0.01
				0.01
				0.03
				0.01
				0.04
				0.02
				0.61
				0.29
				1.21-0.42
				0.78-0.94-0.52-0.64-1.1-1.22-1.59-1.67-0.41-0.38-0.14-1.08
				0.42-1.09
				6.7-0.06
				12.15
				7.7
				13.74
				10.21-0.75-1.4-1.32-3.32-1.71-4.95-0.31-0.42-0.6-0.83-0.85-1.2-1.19-1.74-1.94-3.32-2.41-4.53-0.23-0.58
				0.46-1.1
				0.96-0.73
				3.6
				2.64
				11.68
				6.77
				13.15
				6.76
				1.84-0.02
				1.01-0.64-1.82-2.51-0.92-0.61-1.46-1.09-1.77-1.45-0.35-0.41-0.05-1.05
				0.49-1.04
				3.91
				0.13
				11.06
				3.32
				14.9
				5.17
				0.66
				0.32
				1.25-0.56
				0.69-1.04-2.2-1.9-5.42-4.15-4.9-4.14
				0.79
				0.02
				3.05
				1.22
				3.35
				0.99
				0.12-0.1
				0.09-0.38
				0.01-0.68-0.12-0.47
				0.31-0.89
				0.78-0.76
				2.39
				0.63
				6.1
				3.11
				8.77
				5.05
				0.61
				0.45
				1.35-0.36
				0.85-0.92-1.53-1.72-3.08-3.45-2.26-3.61
				1.52-0.3
				6.91
				4.29
				7.08
				3.38s-2.96-4.29-1.19-3.77
				6.08
				6.28
				6.81
				5.53c0.37-0.39-0.13-1.79-0.7-3.07-0.27-0.59
				0.43-1.15
				0.95-0.76
				1.39
				1.04
				2.98
				2.25
				3.07
				2.47
				0.17
				0.4
				5.54
				2.29
				5.83
				1.54s-2.12-2.28-2.53-2.55c-0.4-0.27-5.06-2.04-1.43-1.89s16.04
				7.43
				16.25
				7.13c0.2-0.3-2.73-3.55-2.98-4.81l-0.06-0.31c-0.12-0.59
				0.58-0.99
				1.04-0.6
				1.65
				1.45
				4.22
				3.63
				6.02
				5.16
				0.51
				0.43
				1.26-0.12
				0.99-0.74-0.43-0.96-0.88-1.97-1.19-2.63-0.13-0.16-0.22-0.31-0.27-0.44-0.22-0.57-0.06-0.26
				0.27
				0.44
				0.9
				1.13
				3.54
				2.78
				5.7
				4.02
				0.6
				0.34
				1.23-0.38
				0.82-0.92-0.64-0.84-1.26-1.74-1.8-2.55-0.38-0.56
				0.28-1.24
				0.86-0.88
				2.28
				1.42
				5.32
				2.9
				7.97
				4.09l0.45-330.18h0.02c0-0.01-0.01-0.01-0.02
				0zm-654.51
				82.34c-0.21
				0.03-0.43
				0.06-0.64
				0.08l-0.39-0.93c0.34
				0.29
				0.69
				0.57
				1.03
				0.85zm-213.83
				25.96c-0.01
				0.04-0.04
				0.08-0.1
				0.11l-0.77-0.88c0.45
				0.22
				0.91
				0.52
				0.87
				0.77zm480.01
				129.23c-0.14-0.44-0.03-0.2
				0.19
				0.34-0.09-0.12-0.16-0.24-0.19-0.34zm208.34-216.02c-0.6
				0.07-1.19
				0.15-1.79
				0.22-0.47-0.11-0.96-0.22-1.47-0.33
				0.2-0.44
				0.41-0.87
				0.63-1.3
				0.49
				0.3
				1.69
				0.87
				2.63
				1.41z
			` }),
            React__default['default'].createElement("path", { fill: st1, d: 'm1337.2 482.78c0.04 0.06 0.1 0.13 0.18 0.2-0.23-0.33-0.35-0.47-0.18-0.2z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm1300.2 823.88l0.02 0.13c5.64 0.29 11.41 0.54 17.32 0.74l-17.34-0.87z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'M-0.34,600.6c-0.03-0.01-0.07-0.01-0.1-0.02v25.4l0.1,257.12V600.6z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm663.8 662.51v0.02c0.59 0.05 1.19 0.11 1.78 0.16l-1.78-0.18z' }),
            React__default['default'].createElement("polygon", { fill: st1, points: '1365.6 881.97 1365.6 827.18 1365.5 827.18' }),
            React__default['default'].createElement("path", { fill: `url(#${b})`, d: 'm86.14 335.89s57.96 41.23 70.62 100.61c3.36 15.77 5.79 29.72 7.53 41.71l1.79-0.69 40.53-20.74c0.49-0.25 1.01-0.4 1.54-0.46l0.36-0.03h0.24c0.1 0 0.21 0.01 0.31 0.02h0.03c1.14 0.11 2.23 0.66 3.01 1.6l0.32 0.39c0.17 0.2 0.27 0.33 0.27 0.33 3.48 2.91 7.84 2.91 8.23 2.9 0.89-0.18 1.77-0.5 2.6-0.98l2.53-1.47c-0.87-1.2-1.75-2.4-2.65-3.6-19.21-25.54-25.95-58.65-43.59-85.3-21.32-32.21-53.98-57.97-65.24-94.92-11.55-37.9 2.16-79.17-4.34-118.26-8.51-51.24-46.7-104.56-56.01-155.66h-54.67c-0.82 107.69 32.6 157.47 38.57 232.7 3.47 43.76-4.86 89.02 8.1 130.97 7.91 25.63 23.32 48.26 33.47 73.09 8.6 21.02 13.32 43.3 17.92 65.61l41.92-16.03c-24.68-39.18-55.67-99.39-53.39-151.79z' }),
            React__default['default'].createElement("g", { opacity: 0.2 },
                React__default['default'].createElement("path", { fill: st11, d: 'm212.71 458.63l-0.27-0.33c-0.52-0.59-1.76-1.79-3.33-1.99h-0.03c-0.1-0.01-0.21-0.02-0.31-0.02h-0.24c-0.12 0-0.24 0.01-0.36 0.03 0 0-8.45 8.58-2.01 8.92s14.81-3.71 14.81-3.71-0.01 0-0.03 0c-3 0.6-6.18-0.44-8.23-2.9z' })),
            React__default['default'].createElement("path", { fill: st3, d: 'm1056.5 520.12c0.11 0.31 0.25 0.65 0.42 1.02 1.02 0.96 2.04 1.89 2.93 2.69 0.1-0.14 0.29-0.2 0.45-0.09 1.64 1.17 3.79 4.59 4.9 6.49 0.19 0.33 0.69 0.12 0.59-0.25-0.4-1.45-1.13-3.34-0.91-3.18 0.33 0.23 0.96 1.4 1.15 1.38 0.08-0.01 0.15-0.14 0.2-0.29 0.08-0.24 0.39-0.29 0.55-0.11 0.84 0.95 1.72 3.08 2.31 4.68 0.13 0.37 0.68 0.23 0.63-0.16-0.16-1.18-0.33-2.37 0.06-2.2 0.74 0.3 1.73 3.82 2.06 3.48s-0.04-2.7 0.57-1.97 0.8 4.45 1.33 4.33c0.27-0.06 0.46-0.81 0.58-1.52 0.06-0.33 0.51-0.37 0.63-0.06 0.3 0.84 0.63 1.82 0.61 1.94-0.04 0.22 1.72 2.57 2.06 2.33s-0.26-1.59-0.35-1.82c-0.1-0.23-1.58-2.32-0.07-1.23 1.51 1.1 4.74 7.79 4.92 7.71 0.17-0.07-0.15-2.31 0.1-2.92l0.06-0.15c0.12-0.29 0.53-0.26 0.61 0.04 0.29 1.1 0.77 2.77 1.1 3.95 0.09 0.33 0.57 0.31 0.63-0.04 0.09-0.53 0.19-1.1 0.24-1.48-0.01-0.1-0.01-0.19 0.01-0.27 0.07-0.31 0.05-0.13-0.01 0.27 0.06 0.74 0.72 2.21 1.29 3.36 0.16 0.32 0.64 0.19 0.61-0.16-0.03-0.55-0.04-1.11-0.04-1.62 0-0.35 0.48-0.45 0.62-0.13 0.91 2.02 2.6 4.65 3.49 5.97 0.2 0.3 0.67 0.1 0.59-0.26-0.11-0.46-0.3-0.93-0.46-1.29-0.12-0.26 0.14-0.54 0.41-0.44 1.59 0.6 2.72 3.39 3.13 4.56 0.1 0.29 0.51 0.3 0.62 0.02 0.05-0.12 0.08-0.24 0.1-0.36 0.06-0.28 0.43-0.36 0.59-0.12 0 0.01 0.01 0.01 0.01 0.02 0.19 0.29 0.65 0.13 0.6-0.21-0.06-0.42-0.16-0.83-0.26-1.16-0.08-0.28 0.22-0.52 0.47-0.37 2.17 1.27 2.94 4.22 3.22 6.32 0.13 0.09 0.27 0.18 0.4 0.26 0.13-0.54 0.3-1.08 0.45-1.52 0.1-0.3 0.53-0.29 0.62 0.01 0.04 0.13 0.08 0.26 0.13 0.4 0.08 0.02 0.15 0.06 0.21 0.15 0.61 1.01 1.7 2.45 2.72 3.65 0.81 0.52 1.62 1.04 2.42 1.55-0.15-0.25-0.35-0.55-0.6-0.92-0.32-0.48-0.48-0.81-0.56-1.04-0.09-0.27 0.18-0.51 0.44-0.4 1.83 0.84 4.6 3.78 6.06 5.42 0.25 0.28 0.7-0.02 0.54-0.36-0.67-1.34-1.75-3.06-1.51-2.95 0.37 0.16 1.21 1.19 1.4 1.14 0.08-0.02 0.12-0.16 0.14-0.32 0.03-0.25 0.32-0.36 0.52-0.21 1.01 0.77 2.28 2.69 3.16 4.15 0.2 0.33 0.71 0.1 0.59-0.27-0.39-1.12-0.78-2.26-0.36-2.17 0.78 0.16 2.43 3.42 2.69 3.02s-0.56-2.64 0.18-2.04 1.64 4.21 2.14 3.99c0.25-0.11 0.29-0.88 0.27-1.61-0.01-0.34 0.43-0.47 0.6-0.18 0.46 0.77 0.97 1.66 0.97 1.79 0 0.23 2.18 2.19 2.47 1.89s-0.56-1.51-0.7-1.72-2-1.98-0.3-1.19c1.69 0.79 6.15 6.73 6.31 6.63s-0.59-2.24-0.46-2.89l0.03-0.16c0.06-0.31 0.47-0.36 0.61-0.08 0.5 1.02 1.28 2.57 1.84 3.66 0.16 0.31 0.62 0.19 0.61-0.16-0.01-0.54-0.03-1.12-0.04-1.5-0.03-0.1-0.04-0.19-0.04-0.26 0.01-0.32 0.02-0.14 0.04 0.26 0.2 0.72 1.13 2.03 1.91 3.05 0.22 0.28 0.66 0.06 0.57-0.28-0.14-0.53-0.25-1.08-0.35-1.58-0.07-0.34 0.38-0.54 0.58-0.25 1.28 1.8 3.45 4.06 4.57 5.19 0.26 0.26 0.68-0.04 0.53-0.37-0.19-0.43-0.47-0.86-0.7-1.18-0.17-0.24 0.04-0.56 0.32-0.51 1.68 0.28 3.32 2.81 3.95 3.88 0.15 0.26 0.56 0.2 0.61-0.1 0.02-0.12 0.03-0.25 0.03-0.37 0-0.29 0.35-0.44 0.55-0.24l0.02 0.02c0.24 0.25 0.66 0.01 0.54-0.32-0.14-0.4-0.32-0.79-0.48-1.09-0.13-0.26 0.12-0.55 0.39-0.46 0.52 0.18 0.98 0.45 1.4 0.79 0.12-0.01 0.24 0.03 0.31 0.15 0.05 0.09 0.11 0.19 0.18 0.28 0.62 0.61 1.12 1.36 1.53 2.13 0.47 0.61 0.97 1.21 1.44 1.73 0.03-0.32 0.06-0.62 0.1-0.9 0.04-0.31 0.46-0.39 0.61-0.11 0.32 0.6 0.77 1.3 1.2 1.92-0.14-0.22-0.31-0.48-0.51-0.78-0.32-0.48-0.48-0.81-0.56-1.04-0.09-0.27 0.18-0.51 0.44-0.4 1.83 0.84 4.6 3.78 6.06 5.42 0.25 0.28 0.7-0.02 0.54-0.36-0.67-1.34-1.75-3.06-1.51-2.95 0.37 0.16 1.21 1.19 1.4 1.14 0.08-0.02 0.12-0.16 0.14-0.32 0.03-0.25 0.32-0.36 0.52-0.21 1.01 0.77 2.28 2.69 3.16 4.15 0.2 0.33 0.71 0.1 0.59-0.27-0.39-1.12-0.78-2.26-0.36-2.17 0.78 0.16 2.43 3.42 2.69 3.02s-0.56-2.64 0.18-2.04 1.64 4.21 2.14 3.99c0.25-0.11 0.29-0.88 0.27-1.61-0.01-0.34 0.43-0.47 0.6-0.18 0.46 0.77 0.97 1.66 0.97 1.79 0 0.23 2.18 2.19 2.47 1.89s-0.56-1.51-0.7-1.72-2-1.98-0.3-1.19c0.65 0.3 3.03 2.48 5.63 4.95-0.12-0.14-0.25-0.27-0.37-0.41l0.75 0.56c0.17 0.13 0.41 0.06 0.5-0.13l0.06-0.15c-0.45-0.57-0.73-0.97-0.71-1.07l0.03-0.16c0.06-0.31 0.47-0.36 0.61-0.08 0.04 0.07 0.08 0.15 0.11 0.23l0.26 0.37 0.62-1.49-0.39-0.69s-1.21-2.02-2.13-2.88c-0.03-0.02-0.05-0.05-0.06-0.08-0.17-0.34-1.22-2.45-1.66-3.95-0.09-0.3-0.52-0.31-0.62-0.01-0.31 0.89-0.67 2.14-0.72 3.12-0.03-1.52-0.35-6.43-3.32-8.2-0.25-0.15-0.55 0.09-0.47 0.37 0.09 0.33 0.19 0.74 0.25 1.16 0.05 0.34-0.41 0.5-0.6 0.21 0-0.01-0.01-0.01-0.01-0.02-0.04-0.06-0.09-0.09-0.14-0.12-0.22-0.27-0.44-0.52-0.64-0.71-0.03-0.02-0.05-0.05-0.06-0.08-0.17-0.34-1.22-2.45-1.66-3.95-0.09-0.3-0.52-0.31-0.62-0.01-0.14 0.4-0.28 0.86-0.41 1.34-0.15-0.15-0.32-0.27-0.48-0.38-0.3-2.07-1.08-4.82-3.15-6.04-0.25-0.15-0.55 0.09-0.47 0.37 0.09 0.33 0.19 0.74 0.25 1.16 0.05 0.34-0.41 0.5-0.6 0.21 0-0.01-0.01-0.01-0.01-0.02-0.13-0.2-0.4-0.18-0.53-0.01-0.19-0.16-0.53-0.05-0.53 0.25v0.44c-0.11-0.02-0.21-0.09-0.25-0.22-0.41-1.18-1.52-3.97-3.11-4.58-0.27-0.1-0.53 0.17-0.41 0.43 0.16 0.35 0.35 0.83 0.45 1.29 0.02 0.1 0 0.19-0.05 0.26-0.17-0.6-0.32-1.19-0.45-1.66-0.08-0.3-0.49-0.33-0.61-0.04l-0.06 0.15c-0.05 0.12-0.08 0.29-0.09 0.5-0.9-1.41-2.08-3.36-2.78-4.94-0.14-0.32-0.62-0.22-0.62 0.13 0 0.45 0 0.94 0.02 1.42-0.57-0.89-1.11-1.62-1.53-1.93-0.04-0.03-0.07-0.05-0.1-0.07-0.14-0.4-0.23-0.75-0.25-1.01-0.03 0.21-0.08 0.49-0.13 0.79-0.26-0.1-0.22 0.12-0.07 0.43-0.02 0.09-0.03 0.17-0.05 0.26-0.06 0.34-0.54 0.37-0.63 0.03-0.33-1.18-0.79-2.85-1.08-3.95-0.08-0.3-0.49-0.33-0.61-0.04l-0.06 0.15c-0.26 0.61 0.06 2.85-0.12 2.92-0.06 0.03-0.52-0.83-1.15-1.98-0.14-0.67-0.29-1.27-0.5-1.52-0.18-0.21-0.27-0.16-0.32 0.02-1-1.79-2.16-3.71-2.91-4.26-1.5-1.11-0.03 0.99 0.06 1.23 0.07 0.17 0.42 0.99 0.45 1.48-0.09 0.02-0.13 0.15-0.15 0.35-0.42 0.07-2.05-2.13-2-2.35 0.02-0.12-0.3-1.1-0.6-1.95-0.11-0.32-0.57-0.28-0.63 0.05-0.12 0.71-0.31 1.46-0.59 1.52-0.05 0.01-0.09-0.01-0.13-0.05-0.02-0.03-0.05-0.07-0.07-0.1-0.38-0.7-0.59-3.55-1.11-4.18-0.61-0.73-0.25 1.62-0.58 1.96s-1.31-3.18-2.05-3.49c-0.39-0.16-0.24 0.98-0.09 2.13-0.32-0.72-0.65-1.55-0.86-2.24-0.09-0.3-0.52-0.31-0.62-0.01l-0.06 0.18c-0.43-0.97-0.9-1.86-1.37-2.39-0.09-0.1-0.23-0.13-0.34-0.1-0.49-1.13-1.21-2.15-2.27-2.77-0.25-0.15-0.55 0.09-0.47 0.37 0.09 0.33 0.19 0.74 0.25 1.16 0.05 0.34-0.41 0.5-0.6 0.21 0-0.01-0.01-0.01-0.01-0.02-0.12-0.18-0.35-0.18-0.48-0.06-0.82-1.15-1.69-2.21-2.46-2.8-0.43-0.58-0.92-1.06-1.47-1.27-0.27-0.1-0.53 0.17-0.41 0.43 0.12 0.28 0.26 0.63 0.37 0.99-0.32-0.26-0.64-0.53-0.95-0.79-0.57-1.1-1.09-2.24-1.39-3.08-0.11-0.3-0.55-0.28-0.62 0.04-0.02 0.08-0.04 0.17-0.06 0.26-0.35-0.64-0.68-1.28-0.94-1.86-0.14-0.32-0.62-0.22-0.62 0.13 0 0.49 0 1.03 0.03 1.56-0.38-0.31-0.76-0.62-1.14-0.92-0.38-0.86-0.7-1.72-0.74-2.23-0.06 0.37-0.15 0.92-0.24 1.44-0.28-0.22-0.56-0.45-0.84-0.67-0.3-1.07-0.64-2.33-0.88-3.21-0.08-0.3-0.49-0.33-0.61-0.04l-0.06 0.15c-0.14 0.33-0.11 1.14-0.08 1.82-0.41-0.32-0.81-0.63-1.22-0.95-1.11-2.05-2.74-4.99-3.69-5.69-1.5-1.11-0.03 0.99 0.06 1.23 0.1 0.23 0.68 1.58 0.34 1.82-0.06 0.04-0.17 0-0.31-0.1-0.01-0.01-0.02-0.01-0.03-0.02-0.62-0.47-1.75-2.04-1.71-2.22 0.02-0.12-0.3-1.1-0.6-1.95-0.11-0.32-0.57-0.28-0.63 0.05-0.12 0.71-0.31 1.45-0.58 1.52-0.07-0.05-0.13-0.1-0.2-0.14-0.39-0.69-0.59-3.55-1.11-4.19-0.61-0.73-0.25 1.62-0.58 1.96s-1.31-3.18-2.05-3.49c-0.4-0.16-0.23 1.03-0.08 2.2 0.05 0.39-0.5 0.52-0.63 0.15-0.58-1.6-1.45-3.74-2.28-4.69-0.16-0.19-0.47-0.13-0.55 0.1-0.05 0.15-0.12 0.28-0.2 0.29-0.2 0.01-0.81-1.15-1.15-1.39-0.22-0.15 0.51 1.74 0.9 3.19 0.05 0.2-0.07 0.35-0.23 0.4-0.15-0.1-0.3-0.19-0.45-0.29-1.13-1.93-3.19-5.22-4.78-6.37-0.23-0.16-0.54 0.03-0.51 0.3 0.03 0.24 0.12 0.6 0.34 1.13 0.56 1.36 0.77 1.93 0.36 1.77l-1.87-3.06c-0.16-0.09-0.32-0.18-0.47-0.27-0.65-1.23-1.28-2.56-1.62-3.52-0.11-0.3-0.55-0.28-0.62 0.04-0.15 0.65-0.28 1.55-0.28 2.64 0 0.18 0 0.36 0.01 0.56-0.57-0.41-1.12-0.82-1.56-1.14-0.25-0.19-0.59 0.05-0.51 0.35l0.05 0.16c0.18 0.64 1.83 2.19 1.74 2.36-0.09 0.16-6.78-3.07-8.64-3-1.87 0.08 0.6 0.8 0.82 0.92s1.52 0.81 1.41 1.21-2.95-0.35-3.06-0.55c-0.06-0.11-0.92-0.67-1.68-1.15-0.28-0.18-0.62 0.14-0.46 0.43 0.35 0.63 0.67 1.34 0.49 1.55-0.34 0.42-2.8-2.37-3.73-2.57-0.93-0.19 0.82 1.42 0.77 1.9-0.05 0.47-3.01-1.67-3.78-1.45-0.41 0.12 0.46 0.95 1.32 1.77 0.28 0.27-0.06 0.72-0.4 0.51-1.45-0.89-3.46-2.02-4.72-2.24-0.25-0.04-0.45 0.19-0.37 0.43 0.05 0.15 0.08 0.3 0.02 0.35-0.15 0.13-1.36-0.39-1.76-0.37-0.27 0.02 1.48 1.04 2.69 1.93 0.31 0.23 0.04 0.7-0.31 0.57-2.05-0.8-5.86-2.14-7.87-2.04-0.28 0.01-0.4 0.36-0.21 0.55 0.17 0.17 0.47 0.4 0.97 0.67 1.53 0.85 1.98 1.13 1.04 1.22-0.6 0.05-3.43-1.06-5.55-2.12-0.35 0.32-0.41 0.64-0.1 0.93 0.07-0.29 0.51-0.32 0.62-0.01z' }),
            React__default['default'].createElement("path", { fill: st15, d: 'm1060.2 526.79c0.76 0.49 0.63 0.05 0.03-1.39l-0.98 0.14c0.4 0.65 0.75 1.12 0.95 1.25z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm47.03 711.45c0.12-0.12 0.2-0.23 0.26-0.34 0.22-0.45 0.06-0.21-0.26 0.34z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm143.25 716.85c-3.15 1.88-10.07 4.63-11.27 4.5-1.5-0.16-0.77-0.6 1.69-1.92 0.8-0.43 1.28-0.77 1.56-1.05 0.32-0.31 0.13-0.86-0.32-0.89-3.2-0.2-9.29 1.85-12.58 3.06-0.57 0.21-0.97-0.56-0.48-0.91 1.95-1.38 4.75-2.97 4.33-3.01-0.65-0.05-2.59 0.76-2.82 0.54-0.09-0.09-0.05-0.32 0.04-0.56 0.14-0.37-0.18-0.75-0.57-0.69-2 0.33-5.23 2.07-7.56 3.45-0.53 0.32-1.07-0.4-0.62-0.82 1.39-1.29 2.79-2.58 2.14-2.78-1.21-0.37-5.98 2.97-6.05 2.21-0.06-0.76 2.76-3.28 1.28-3-1.49 0.29-5.47 4.67-6 4-0.27-0.35 0.25-1.46 0.82-2.46 0.27-0.46-0.26-0.98-0.72-0.7-1.22 0.74-2.61 1.61-2.71 1.78-0.07 0.14-0.99 0.43-2.01 0.67 0.65-0.69 1.25-1.36 1.72-1.92 1.11-1.34 1.85-2.57 2.33-3.52 0.23-0.46-0.29-0.94-0.73-0.68-3.15 1.88-10.07 4.63-11.27 4.5-1.5-0.16-0.77-0.6 1.69-1.92 0.8-0.43 1.28-0.77 1.56-1.05 0.32-0.31 0.13-0.86-0.32-0.89-3.2-0.2-9.29 1.85-12.58 3.06-0.57 0.21-0.97-0.56-0.48-0.91 1.95-1.38 4.75-2.97 4.33-3.01-0.65-0.05-2.59 0.76-2.82 0.54-0.09-0.09-0.05-0.32 0.04-0.56 0.14-0.37-0.18-0.75-0.57-0.69-2 0.33-5.23 2.07-7.56 3.45-0.53 0.32-1.07-0.4-0.62-0.82 1.39-1.29 2.79-2.58 2.14-2.78-1.21-0.37-5.98 2.97-6.05 2.21-0.06-0.76 2.76-3.28 1.28-3-1.49 0.29-5.47 4.67-6 4-0.27-0.35 0.25-1.46 0.82-2.46 0.27-0.46-0.26-0.98-0.72-0.7-1.22 0.74-2.61 1.61-2.71 1.78-0.1 0.19-1.84 0.69-3.22 0.9-0.33 0.01-0.65 0.04-0.98 0.09-0.39 0.01-0.65-0.05-0.69-0.19-0.17-0.64 1.92-1.7 2.27-1.89s4.29-1.27 1.32-1.44-13.69 4.83-13.83 4.56c-0.14-0.26 2.51-2.7 2.82-3.71l0.08-0.25c0.14-0.47-0.4-0.86-0.8-0.57-1.46 1.06-3.73 2.64-5.33 3.76-0.45 0.31-1.02-0.2-0.74-0.68 0.43-0.75 0.88-1.55 1.19-2.07-0.82 0.85-3.11 2-4.98 2.84-0.51 0.23-0.97-0.41-0.59-0.82 0.59-0.64 1.17-1.33 1.68-1.95 0.35-0.43-0.13-1.04-0.63-0.79-3.15 1.57-7.89 3.11-10.31 3.85-0.56 0.17-0.92-0.56-0.46-0.91 0.59-0.46 1.31-0.85 1.86-1.13 0.41-0.21 0.37-0.81-0.07-0.95-2.56-0.87-6.77 1.44-8.45 2.48-0.41 0.25-0.93-0.14-0.79-0.6 0.06-0.19 0.15-0.38 0.24-0.55 0.22-0.4-0.16-0.88-0.6-0.75-0.01 0-0.02 0.01-0.03 0.01-0.53 0.16-0.93-0.49-0.52-0.86 0.5-0.46 1.04-0.86 1.49-1.17 0.38-0.26 0.25-0.86-0.21-0.94-5.43-0.84-10.78 4.83-12.37 6.69 0.93-1.26 1.74-3.14 2.26-4.54 0.18-0.47-0.36-0.89-0.77-0.61-2.06 1.4-5.49 2.93-6.04 3.17-0.05 0.02-0.1 0.03-0.16 0.04-2.01 0.13-5.53 1.38-5.53 1.38l-2.38 0.89 0.01 1.12h-0.01l-0.1 57.87c0.51-0.32-0.08-1.78 1.77-3.45 0.37-0.34 0.96 0.01 0.85 0.5-0.2 0.88-0.48 1.96-0.83 2.97h0.5c2.04-2.68 5.74-6.56 10.04-6.49 0.46 0.01 0.68 0.59 0.34 0.9-0.4 0.37-0.88 0.84-1.31 1.36-0.35 0.43 0.14 1.01 0.64 0.78 0.01 0 0.02-0.01 0.03-0.01 0.42-0.19 0.85 0.23 0.7 0.66-0.07 0.18-0.13 0.38-0.16 0.58-0.08 0.47 0.49 0.79 0.86 0.48 1.53-1.26 5.37-4.12 8.03-3.62 0.45 0.09 0.58 0.67 0.2 0.93-0.51 0.35-1.16 0.84-1.69 1.38-0.41 0.41 0.06 1.08 0.58 0.84 2.3-1.07 6.78-3.25 9.68-5.24 0.46-0.32 1.02 0.22 0.73 0.7-0.42 0.69-0.9 1.45-1.39 2.16-0.32 0.46 0.22 1.03 0.7 0.73 1.73-1.1 3.84-2.55 4.54-3.5 0.24-0.59 0.36-0.85 0.21-0.37-0.04 0.11-0.11 0.24-0.21 0.37-0.23 0.56-0.57 1.41-0.89 2.21-0.2 0.51 0.43 0.95 0.83 0.57 1.43-1.32 3.46-3.21 4.76-4.46 0.36-0.34 0.95-0.03 0.87 0.46l-0.04 0.26c-0.16 1.04-2.46 3.82-2.28 4.06s10.11-6.18 13.07-6.43-0.79 1.37-1.11 1.61c-0.32 0.23-2.25 1.57-1.99 2.18s4.6-1.13 4.73-1.47c0.07-0.19 1.33-1.24 2.43-2.14 0.42-0.34 1 0.1 0.81 0.6-0.43 1.07-0.79 2.24-0.47 2.55 0.62 0.6 3.96-4.3 5.39-4.78s-1.02 2.41-0.85 3.15 4.43-3.22 5.68-3.03c0.67 0.11-0.54 1.58-1.74 3.05-0.39 0.48 0.24 1.12 0.73 0.73 2.12-1.69 5.08-3.86 7.01-4.46 0.38-0.12 0.75 0.21 0.66 0.6-0.06 0.25-0.07 0.49 0.03 0.56 0.26 0.18 2.07-0.89 2.71-0.93 0.42-0.03-2.14 1.93-3.88 3.57-0.18 0.17-0.2 0.38-0.13 0.56 4.46-1.64 7.57-4.2 6.41-6.7s-6.07-4.26-9.81-6.21c-3.41-1.78-5.91-4.43-3.58-6.4 0.23-0.19 0.5-0.38 0.82-0.55 0.04-0.02 0.09-0.05 0.13-0.07 1.67-1.08 5.11-3.2 6.58-3.5 0.06-0.01 0.1-0.03 0.15-0.06 0.51-0.32 3.7-2.31 5.55-3.97 0.37-0.34 0.96 0.01 0.85 0.5-0.29 1.3-0.75 3-1.37 4.32 0.03-0.01 0.06-0.01 0.09-0.02 1.64-2.43 5.9-7.91 11-7.83 0.46 0.01 0.68 0.59 0.34 0.9-0.4 0.37-0.88 0.84-1.31 1.36-0.35 0.43 0.14 1.01 0.64 0.78 0.01 0 0.02-0.01 0.03-0.01 0.42-0.19 0.85 0.23 0.7 0.66-0.07 0.18-0.13 0.38-0.16 0.58-0.08 0.47 0.49 0.79 0.86 0.48 1.53-1.26 5.37-4.12 8.03-3.62 0.45 0.09 0.58 0.67 0.2 0.93-0.51 0.35-1.16 0.84-1.69 1.38-0.35 0.35-0.06 0.88 0.35 0.89 0.06-0.01 0.13-0.02 0.19-0.04 0.01-0.01 0.03-0.01 0.04-0.02 2.3-1.07 6.78-3.25 9.68-5.24 0.46-0.32 1.02 0.22 0.73 0.7-0.42 0.69-0.9 1.45-1.39 2.16-0.18 0.25-0.09 0.54 0.1 0.7 0.31-0.06 0.62-0.11 0.93-0.17 1.66-1.07 3.56-2.4 4.21-3.3 0.24-0.59 0.36-0.85 0.21-0.37-0.04 0.11-0.11 0.24-0.21 0.37-0.23 0.56-0.57 1.41-0.89 2.21-0.07 0.17-0.04 0.34 0.04 0.47 0.38-0.07 0.75-0.14 1.13-0.21 1.4-1.29 3.22-2.99 4.42-4.14 0.36-0.34 0.95-0.03 0.87 0.46l-0.04 0.26c-0.1 0.61-0.91 1.8-1.54 2.74 0.29-0.05 0.59-0.11 0.88-0.16 0.57-0.1 1.14-0.21 1.7-0.32 3.22-1.85 7.87-4.47 9.74-4.62 2.96-0.25-0.79 1.37-1.11 1.61-0.23 0.17-1.28 0.9-1.77 1.53 1.91-0.5 3.7-1.08 5.25-1.79 0.23-0.1 0.44-0.21 0.66-0.32 0.33-0.28 0.69-0.57 1.03-0.85 0.16-0.13 0.35-0.14 0.51-0.08 0.79-0.57 1.4-1.19 1.78-1.82 0.3-0.36 0.61-0.78 0.95-1.29 0.71-1.07 5.84-5.53 8.04-8.19 1.11-1.34 1.85-2.57 2.33-3.52 0.28-0.39-0.23-0.87-0.68-0.61z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm101.59 624.76l10.17-0.74c0.49-0.04 0.52-0.73 0.04-0.82-2.19-0.38-5.76-0.6-10.36 0.51-0.64 0.17-0.5 1.1 0.15 1.05z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm121.22 625.97h-11.21c-0.67 0-0.76 0.97-0.11 1.09 2.46 0.46 6.24 0.65 11.38-0.49 0.36-0.07 0.31-0.6-0.06-0.6z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm298.66 807.41h-22.9s0.66-4.2 11.61-4.2 11.29 4.2 11.29 4.2z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm258.07 831.42h-22.9s0.66-4.2 11.61-4.2 11.29 4.2 11.29 4.2z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm389.67 616.01h-11.45s0.33-2.1 5.8-2.1 5.65 2.1 5.65 2.1z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm403.05 620.86h-11.45s0.33-2.1 5.8-2.1 5.65 2.1 5.65 2.1z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm148.87 682.48h-11.7s0.34-2.15 5.93-2.15 5.77 2.15 5.77 2.15z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm167.44 684.63h-11.7s0.34-2.15 5.93-2.15c5.6 0 5.77 2.15 5.77 2.15z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm190.44 678.7h-11.7s0.34-2.15 5.93-2.15c5.6 0.01 5.77 2.15 5.77 2.15z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm180.11 674.74h-11.7s0.34-2.15 5.93-2.15 5.77 2.15 5.77 2.15z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm399.93 606.8h-9.43s0.27-1.77 4.78-1.77 4.65 1.77 4.65 1.77z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm414.9 608.57h-9.43s0.27-1.77 4.78-1.77 4.65 1.77 4.65 1.77z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm433.44 603.68h-9.43s0.27-1.77 4.78-1.77 4.65 1.77 4.65 1.77z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm425.11 600.41h-9.43s0.27-1.77 4.78-1.77 4.65 1.77 4.65 1.77z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm799.75 464.74s-58.68 52.53-113.1 50.59l24.11-10.14s6.32 2.1 13.1-1.39l75.89-39.06z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm920.77 515.38l14.11 4.48c2.14 0.68 4.49 0.12 6.09-1.45l12.03-11.77c0.01 0-24.11 9.85-32.23 8.74z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm225.4 459.02s-8.03 5.16-13.35-0.46c0 0-1.74-5.74-12.81 1.59l-34.94 18.05c4.27 19.87 3.8 51.26 3.8 51.26l-28.08-42.29-43.08 16.48s10.95 62.7 20.31 72.63l162.7 3.04c-0.01-0.01-17.31-78.78-54.55-120.3z' }),
            React__default['default'].createElement("path", { fill: st12, d: 'm174.53 630.89c0.96-0.29 1.96-0.3 2.91-0.42-1.83-3.06-4.07-6.5-6.76-10.16 10.57 4.01 25.8 8.1 45.61 9.27 1.71 1.47 3.42 2.92 5.13 4.35 0.49 0.1 0.92 0.2 1.27 0.32 1.84 0.6 3.76 0.9 5.69 0.86 3.45-0.08 5.03-0.41 10.76-0.27 8.55 0.21 17.08 1.14 25.63 1.02 8.06-0.11 16.25-1.21 23.57-4.53 0.56-0.25 0.58-1.04 0.03-1.32l-0.47-0.25c-0.77-0.4-0.68-1.53 0.13-1.82 1.21-0.44 2.47-0.75 3.75-0.93 2.01-0.29 2.81-2.75 1.33-4.14-12.51-11.74-26.41-23.65-41.7-35.19-5.12-18.94-12.83-32.93-19.52-42.41 15.15 6.97 26.85 8.95 26.85 8.95s-18.17-46.79-67.58-64.28c-4.1 3.16-7.45 7.14-9.83 11.68 7.61 12.43 17.08 22.02 26.75 29.4 6.26 13.45 4.43 23.43 2.29 28.88-11.98-7.21-24.61-14.05-37.87-20.35-8.91 5.59-15.78 13.76-19.69 23.39 8.69 11.31 17.78 21.92 27.11 31.88-5.86 2.56-17.06 5.39-33.24 0.75-8.45-6.54-18.51-12.46-30.37-16.7l-0.19 0.15c-3.94 3.02-7.15 6.84-9.43 11.2l-0.11 0.21c12.85 20.82 30.87 33.73 46.29 41.55 8.18 1.29 13.78 1.29 21.66-1.09z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm301.74 625.5c0.93 1.27 0.66 3.28-7.79 4.81-0.11 0.02-0.09 0.18 0.02 0.18 4.61-0.33 16.73-1.58 8.16-5.44-0.29-0.13-0.58 0.2-0.39 0.45z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm202.06 634.27c10.52 3.57 42.94 11.95 97.09 3.18 0.37-0.06 0.49 0.48 0.12 0.57-16.55 4.09-63.3 13.27-97.39-3.31-0.27-0.13-0.11-0.54 0.18-0.44z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm208.39 642.34c7.94 2.98 29.79 9.05 66.28 3.74 0.3-0.04 0.38 0.39 0.09 0.46-13.18 2.97-47.56 9.01-66.76-3.43-0.43-0.28-0.09-0.95 0.39-0.77z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm139.86 636.31s48.59 3.11 45.35-3.03c0 0 9.53 9.23-45.35 3.03z' }),
            React__default['default'].createElement("path", { fill: st13, d: 'm188.61 492.09s6.76 1.37 11.62 5.11 7.52 5.82 11.46 6.52c3.94 0.69 9.34 4.16 11.7 8.04s5.55 8.83 8.87 10.03 6.79 4.46 7.76 7.68 0.42 5.03 4.58 8.49c4.16 3.47 7.63 5.82 7.76 8.04s6.38 8.21 6.38 8.21-9.1-24.7-34.5-45.5c0 0-16.93-13.85-33.09-18.78l-2.54 2.16z' }),
            React__default['default'].createElement("path", { fill: st13, d: 'm172.49 539.54s69.1 31.23 120.62 83.32c0 0 2.42 3.21-1.33 4.14s-10.56-8.27-12.99-10.88-7.84-3.08-12.31-4.85c-2.27-0.9-9.79-8.09-13.84-13.03-4.04-4.94-17.73-7.98-21.74-13.5s-3.01-8.52-9.53-9.03c-6.52-0.5-11.53-9.15-15.29-11.28s-8.27-7.77-14.42-9.15-12.29-10.03-14.54-10.53-4.63-5.21-4.63-5.21z' }),
            React__default['default'].createElement("path", { fill: st13, d: 'm116.31 578.86s36.27 10.48 61.13 51.62l-2.91 0.42s-5.44-2.19-5.44-5.57-0.35-4.8-2.76-7.11-8.9-4.27-9.65-6.91-4.26-5.88-7.02-5.76-6.39-2.77-8.02-5.78-2.38-5.89-5.77-6.77c-3.38-0.88-5.26-4.76-7.15-5.77-1.88-1-3.62-2.38-7.2-3.26-3.57-0.9-5.21-5.11-5.21-5.11z' }),
            React__default['default'].createElement("path", { fill: st11, d: 'm208.07 531.01s12.44 7.61 23.82 14.25c2.97 1.73 7.27 11.67 7.27 11.67s-8.51-5.45-11.07-9.14c-2.57-3.7-5.96-2.46-9.55-5.24-3.59-2.77-5.53-3.69-7.54-3.59l-2.93-7.95z' }),
            React__default['default'].createElement("path", { fill: st3, d: 'm179.91 594.81s20.39 22.55 36.37 34.78c0 0-6.2-0.19-13.01-1.25-2.08-0.32-3.9-1.28-5.41-2.45-2.99-2.31-5.02-5.66-5.8-9.35-0.72-3.4-2.61-8.91-7.47-11.67-7.34-4.16-4.68-10.06-4.68-10.06z' }),
            React__default['default'].createElement("path", { fill: st11, d: 'm200.22 493.5s-6.96 1.46-14.21 15.12l1.45 1.94s4.87-11.25 14.8-16.06l-2.04-1z' }),
            React__default['default'].createElement("path", { fill: st12, d: 'm196.95 495.12c0.71 0.37 1.42 0.79 2.11 1.25 1-0.69 2.07-1.33 3.2-1.88l-2.03-0.99c-0.01 0-1.27 0.26-3.28 1.62z' }),
            React__default['default'].createElement("path", { fill: st11, d: 'm113.85 600.75s2.71-12.01 15.15-16.46l2.45 1.32s-9.93 2.68-15.96 17.15l-1.64-2.01z' }),
            React__default['default'].createElement("path", { fill: st12, d: 'm131.62 585.61c-0.03-0.02-0.06-0.03-0.08-0.05l-2.37-1.27c-1.09 0.39-2.11 0.84-3.05 1.34 0.89 0.47 1.65 0.95 2.41 1.38 1.84-1.06 3.07-1.4 3.09-1.4z' }),
            React__default['default'].createElement("path", { fill: st11, d: 'm160.94 573.18s7.25-18.85 24.96-27.01l-5.53-2.89-7.88-3.74s-14.72 8.27-19.69 23.39l8.14 10.25z' }),
            React__default['default'].createElement("path", { fill: st12, d: 'm177.4 544.73c0.93 0.21 2.52 1.8 4.5 3.7 1.35-0.83 2.77-1.6 4.27-2.29-3.67-1.91-6.7-3.42-8.94-4.51l-4.47-2.12s2.38 4.72 4.64 5.22z' }),
            React__default['default'].createElement("path", { fill: `url(#${a})`, d: 'm1047.7 360.89h0.68l2.86-40.53c0.12-1.74 0.01-3.49-0.31-5.21-0.35-1.87-0.62-4.89 0.04-8.57 1.14-6.31 1.69-18.01 1.25-21.99-0.32-2.89-0.87-7.93-1.14-10.44-0.11-1.01 0-2.03 0.32-2.99l0.67-2.03c0.32-0.98 0.31-2.06-0.12-3.01-0.03-0.07-0.06-0.14-0.1-0.21-0.27-0.52-0.37-1.11-0.34-1.7l0.19-4.28c0.02-0.47-0.02-0.93-0.14-1.38l-0.47-1.91c-0.15-0.62-0.17-1.27-0.06-1.9l0.53-2.87c0.14-0.76 0-1.55-0.4-2.21l-0.24-0.4c-0.58-0.98-0.82-2.12-0.67-3.25l0.17-1.33c0.07-0.52-0.03-1.04-0.27-1.5l-0.65-1.22c-0.57-1.08-0.76-2.32-0.52-3.52l0.47-2.4c0.13-0.67 0.07-1.37-0.16-2.01l-0.33-0.88c-0.33-0.89-0.48-1.84-0.43-2.79l0.23-4.61c0.05-1.02-0.25-2.02-0.85-2.84-0.64-0.87-0.76-2-0.34-2.99 0.35-0.81 0.28-1.74-0.18-2.49l-0.54-0.87c-0.36-0.58-0.4-1.3-0.12-1.92l0.66-1.43c0.29-0.64 0.29-1.37-0.02-2l-1.64-3.41-4.14-0.98 2.19 4.76c0.36 0.79 0.26 1.72-0.27 2.41-0.45 0.58-0.54 1.36-0.25 2.04l1.06 2.45c0.24 0.56 0.29 1.18 0.13 1.77l-0.37 1.37c-0.23 0.87-0.07 1.8 0.45 2.53l0.03 0.04c0.58 0.81 0.86 1.79 0.81 2.79l-0.15 2.91c-0.07 1.32 0.25 2.64 0.9 3.79l0.46 0.82c0.37 0.66 0.36 1.46-0.04 2.1-0.49 0.8-0.66 1.76-0.45 2.68l1.18 5.28c0.16 0.7 0.12 1.43-0.1 2.11-0.14 0.42-0.14 0.88 0 1.3 0.49 1.5 1.64 5.06 1.64 5.06l-0.14 3.72c-0.02 0.45 0.09 0.9 0.3 1.3 0.56 1.04 0.65 2.26 0.27 3.37l-0.12 0.33c-0.17 0.5-0.22 1.03-0.15 1.55l0.25 1.77c0.05 0.32 0.05 0.65 0.01 0.97l-0.57 4.44c-0.12 0.95-0.05 1.91 0.2 2.83 0.88 3.22 2.87 11.77 2.01 20.32l-1.79 16.29c-0.15 1.36-0.06 2.73 0.27 4.06l0.23 0.92c0.49 2 0.69 4.05 0.58 6.11l-0.38 7.24-1.03 19.65-1.05 12.99z' }),
            React__default['default'].createElement("polygon", { fill: st3, points: '1045.3 230.55 1047 226.42 1048.6 229.5 1049.6 219.43 1044.5 220.24' }),
            React__default['default'].createElement("path", { fill: st19, d: 'm1043.6 180.97l-0.43 6.06c-0.02 0.33-0.49 0.37-0.57 0.05l-0.2-0.84c-0.06-0.26-0.45-0.22-0.45 0.05v4.94c0 0.29-0.4 0.38-0.52 0.11l-3.29-7.7c-0.13-0.3-0.58-0.16-0.52 0.16l1.6 7.92c0.06 0.3-0.34 0.45-0.5 0.2l-3.41-5.57c-0.17-0.28-0.59-0.08-0.49 0.23l2.02 5.82c0.1 0.29-0.28 0.5-0.47 0.26l-5.13-6.44c-0.2-0.25-0.59-0.01-0.46 0.28l2.66 6.12c0.12 0.27-0.23 0.51-0.44 0.3l-5.64-5.55c-0.24-0.23-0.61 0.08-0.41 0.35l4.94 6.76c0.17 0.24-0.1 0.54-0.35 0.39l-0.74-0.43c-0.28-0.16-0.56 0.2-0.34 0.43l2.24 2.37c0.21 0.22-0.04 0.58-0.32 0.44l-5.5-2.62c-0.29-0.14-0.55 0.25-0.3 0.46l4.9 4.2c0.23 0.2 0.02 0.57-0.27 0.48l-7.94-2.5c-0.32-0.1-0.51 0.35-0.22 0.51l5.66 3.08c0.25 0.14 0.16 0.52-0.13 0.52h-8.03c-0.32 0-0.39 0.45-0.09 0.54l4.97 1.6c0.3 0.1 0.23 0.54-0.09 0.54h-0.38c-0.31 0-0.39 0.44-0.09 0.54l4.97 1.77c0.38 0.13 0.33 0.69-0.07 0.75l-5.12 0.77c-0.45 0.07-0.43 0.73 0.02 0.77l4.39 0.39c0.39 0.04 0.49 0.57 0.13 0.73l-6.77 3.18c-0.41 0.19-0.21 0.82 0.24 0.73l7.02-1.37c0.4-0.08 0.63 0.44 0.31 0.69l-2.36 1.81c-0.35 0.27-0.04 0.83 0.37 0.67l4.95-1.9c0.34-0.13 0.62 0.28 0.39 0.55l-6.85 7.85c-0.26 0.3 0.1 0.73 0.44 0.52l8.54-5.26c0.3-0.19 0.65 0.14 0.49 0.46l-3.09 5.87c-0.19 0.37 0.31 0.71 0.58 0.38l4.02-4.85c0.24-0.28 0.69-0.05 0.6 0.31l-1.19 4.77c-0.1 0.39 0.43 0.61 0.64 0.26l2.28-3.91c0.18-0.31 0.65-0.18 0.65 0.18l-0.1 9.28c0 0.4 0.56 0.49 0.68 0.11l2.3-7.24c0.11-0.36 0.64-0.31 0.68 0.07l0.24 2.18c0.04 0.39 0.59 0.42 0.68 0.04l1.07-4.53c0.08-0.33 0.54-0.36 0.66-0.05l3.54 9.1c0.16 0.42 0.79 0.27 0.75-0.18l-0.65-6.48c-0.04-0.4 0.47-0.59 0.7-0.26l1.41 1.98c0.22 0.31 0.7 0.15 0.7-0.22v-1.22c0-0.39 0.51-0.54 0.72-0.21l3.78 5.95c0.25 0.4 0.86 0.09 0.69-0.35l-3.38-8.75c-0.12-0.3 0.25-0.56 0.49-0.34l2.77 2.49c0.26 0.24 0.65-0.08 0.47-0.39l-1.82-3.04c-0.17-0.29 0.17-0.6 0.44-0.41l6.98 4.96c0.3 0.21 0.65-0.18 0.41-0.45l-4.77-5.56c-0.21-0.25 0.06-0.61 0.36-0.48l7.37 3.19c0.33 0.14 0.6-0.31 0.31-0.53l-7.15-5.45c-0.26-0.2-0.07-0.61 0.25-0.55l3.67 0.78c0.35 0.07 0.52-0.4 0.21-0.57l-4.25-2.37c-0.25-0.14-0.14-0.52 0.14-0.51l11.57 0.32c0.32 0.01 0.39-0.44 0.08-0.53l-12.75-3.67c-0.27-0.08-0.26-0.47 0.02-0.53l5.44-1.06c0.32-0.06 0.28-0.54-0.05-0.54h-0.39c-0.3 0-0.38-0.41-0.1-0.52l4.21-1.74c0.52-0.21 0.33-0.99-0.22-0.95l-6.2 0.46c-0.49 0.04-0.72-0.58-0.34-0.88l5.95-4.61c0.44-0.34 0.07-1.03-0.46-0.85l-4.22 1.43c-0.5 0.17-0.88-0.46-0.49-0.82l0.94-0.88c0.25-0.24-0.03-0.64-0.34-0.48l-4.3 2.23c-0.29 0.15-0.57-0.21-0.36-0.45l6.75-7.96c0.22-0.26-0.1-0.63-0.39-0.44l-8.76 5.67c-0.26 0.17-0.57-0.12-0.42-0.39l4.65-8.4c0.15-0.27-0.21-0.54-0.43-0.32l-4.35 4.44c-0.21 0.21-0.56-0.02-0.44-0.29l3-7.11c0.13-0.3-0.29-0.53-0.47-0.25l-5.35 8.19c-0.48 0.74-1.63 0.33-1.54-0.55l0.57-5.62c0.05-0.47-0.61-0.64-0.79-0.2l-2.77 6.73c-0.08 0.18-0.35 0.14-0.36-0.06l-0.18-4.97c-0.01-0.25-0.36-0.28-0.42-0.04l-0.64 2.72c-0.11 0.45-0.76 0.43-0.84-0.03l-1.22-7.24c-0.04-0.51-0.75-0.48-0.79 0.02z' }),
            React__default['default'].createElement("circle", { fill: st3, cx: 1045.9, cy: 212.6, r: 2.02 }),
            React__default['default'].createElement("polygon", { fill: st3, points: '1047.2 209.2 1044.6 209.2 1043.9 195.71 1047.9 195.71' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm1282.7 654.07c0.04 0.07 0.11 0.14 0.2 0.21-0.26-0.35-0.38-0.5-0.2-0.21z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm1317.2 646.76c0.05 0.08 0.12 0.15 0.22 0.24-0.29-0.4-0.43-0.57-0.22-0.24z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm1242.9 666.12c0.06 0.05 0.15 0.1 0.25 0.14-0.35-0.25-0.52-0.35-0.25-0.14z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm1373.8 661.19c0.04 0.07 0.11 0.14 0.2 0.21-0.26-0.35-0.38-0.51-0.2-0.21z' }),
            React__default['default'].createElement("path", { fill: st1, d: 'm1334 673.24c0.06 0.05 0.15 0.1 0.25 0.14-0.35-0.25-0.51-0.36-0.25-0.14z' }))));
};

const Wrapper$2 = styled__default['default'].section `
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #2f343d;

  ${({ isVisible }) => react.css `
      display: ${isVisible ? 'flex' : 'none'};
    `};
`;
const StyledWebView = styled__default['default']('webview', {
    shouldForwardProp: (propName) => propName === 'partition',
}) `
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  ${({ isFailed }) => react.css `
      display: ${isFailed ? 'none' : 'flex'};
    `}
`;
const ErrorPane = styled__default['default'].div `
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  user-select: none;

  ${({ isVisible }) => react.css `
      display: ${isVisible ? 'flex' : 'none'};
    `}
`;

const ErrorView = ({ isFailed, onReload }) => {
    const { t } = reactI18next.useTranslation();
    const [isReloading, setReloading] = React.useState(false);
    const [counter, setCounter] = React.useState(60);
    React.useEffect(() => {
        if (!isFailed) {
            setReloading(false);
            setCounter(60);
            return undefined;
        }
        const reloadCounterStepSize = 1;
        const timer = setInterval(() => {
            setCounter((counter) => {
                counter -= reloadCounterStepSize;
                if (counter <= 0) {
                    setReloading(true);
                    onReload();
                    return 60;
                }
                return counter;
            });
        }, reloadCounterStepSize * 1000);
        return () => {
            clearInterval(timer);
        };
    }, [isFailed, onReload]);
    const handleReloadButtonClick = () => {
        setReloading(true);
        onReload();
        setCounter(60);
    };
    return (React__default['default'].createElement(ErrorPane, { isVisible: isFailed || isReloading },
        React__default['default'].createElement(FailureImage, { style: {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
            } }),
        React__default['default'].createElement(fuselage.Box, { is: 'section', color: 'alternative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 1 },
            React__default['default'].createElement(fuselage.Margins, { block: 'x12' },
                React__default['default'].createElement(fuselage.Box, { display: 'flex', flexDirection: 'column' },
                    React__default['default'].createElement(fuselage.Margins, { block: 'x8', inline: 'auto' },
                        React__default['default'].createElement(fuselage.Box, { fontScale: 'h1' }, t('loadingError.announcement')),
                        React__default['default'].createElement(fuselage.Box, { fontScale: 's1' }, t('loadingError.title'))))),
            React__default['default'].createElement(fuselage.Box, null,
                isReloading && (React__default['default'].createElement(fuselage.Margins, { block: 'x12' },
                    React__default['default'].createElement(fuselage.Throbber, { inheritColor: true, size: 'x16' }))),
                !isReloading && (React__default['default'].createElement(fuselage.ButtonGroup, { align: 'center' },
                    React__default['default'].createElement(fuselage.Button, { primary: true, onClick: handleReloadButtonClick },
                        t('loadingError.reload'),
                        " (",
                        counter,
                        ")")))))));
};

const ServerPane = ({ lastPath, serverUrl, isSelected, isFailed, }) => {
    const dispatch = reactRedux.useDispatch();
    const webviewRef = React.useRef(null);
    React.useEffect(() => {
        const webview = webviewRef.current;
        if (!webview) {
            return;
        }
        const handleWindowFocus = () => {
            if (!isSelected || isFailed) {
                return;
            }
            webview.focus();
        };
        window.addEventListener('focus', handleWindowFocus);
        return () => {
            window.removeEventListener('focus', handleWindowFocus);
        };
    }, [isFailed, isSelected, serverUrl]);
    React.useEffect(() => {
        const webview = webviewRef.current;
        if (!webview) {
            return;
        }
        const handleDidAttach = () => {
            dispatch({
                type: WEBVIEW_ATTACHED,
                payload: {
                    url: serverUrl,
                    webContentsId: webview.getWebContentsId(),
                },
            });
        };
        webview.addEventListener('did-attach', handleDidAttach);
        return () => {
            webview.removeEventListener('did-attach', handleDidAttach);
        };
    }, [dispatch, serverUrl]);
    React.useEffect(() => {
        const webview = webviewRef.current;
        if (!webview) {
            return;
        }
        if (!webview.src) {
            webview.src = lastPath || serverUrl;
        }
    }, [lastPath, serverUrl]);
    const handleReload = () => {
        dispatch({
            type: LOADING_ERROR_VIEW_RELOAD_SERVER_CLICKED,
            payload: { url: serverUrl },
        });
    };
    return (React__default['default'].createElement(Wrapper$2, { isVisible: isSelected },
        React__default['default'].createElement(StyledWebView, { ref: webviewRef, isFailed: isFailed, partition: `persist:${serverUrl}` }),
        React__default['default'].createElement(ErrorView, { isFailed: isFailed, onReload: handleReload })));
};

const ServersView = () => {
    const servers = reactRedux.useSelector(reselect.createSelector(({ currentView }) => currentView, ({ servers }) => servers, (currentView, servers) => servers.map((server) => Object.assign(server, {
        selected: typeof currentView === 'object'
            ? server.url === currentView.url
            : false,
    }))));
    return (React__default['default'].createElement(ReparentingContainer, null, servers.map((server) => {
        var _a;
        return (React__default['default'].createElement(ServerPane, { key: server.url, lastPath: server.lastPath, serverUrl: server.url, isSelected: server.selected, isFailed: (_a = server.failed) !== null && _a !== void 0 ? _a : false }));
    })));
};

const Wrapper$1 = styled__default['default'].div `
  flex: 0 0 68px;
  align-self: stretch;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  user-select: none;
  -webkit-app-region: drag;

  transition: margin-inline-start 230ms ease-in-out,
    visibility 230ms ease-in-out;

  ${({ sideBarStyle: { background } }) => react.css `
      background: ${background !== null && background !== void 0 ? background : '#2f343d'};
    `}
  ${({ sideBarStyle: { color } }) => react.css `
      color: ${color !== null && color !== void 0 ? color : '#ffffff'};
    `}
	${({ isVisible }) => !isVisible &&
    react.css `
      margin-inline-start: -68px;
      visibility: hidden;
    `}
`;
const Content = styled__default['default'].div `
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  padding-top: 10px;
  background-color: rgba(0, 0, 0, 0.1);
  align-items: stretch;

  ${({ withWindowButtons }) => withWindowButtons &&
    react.css `
      padding-top: 28px;
    `}
`;
const ServerList = styled__default['default'].ol `
  -webkit-app-region: no-drag;
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  margin: 0;
  padding: 0;
  align-items: stretch;
`;
const withTooltip = ({ tooltip }) => react.css `
  &::after {
    position: absolute;
    top: 50%;
    left: 100%;
    display: block;
    visibility: hidden;
    padding: 0.5rem 1rem;
    content: ${JSON.stringify(tooltip)};
    transition: all var(--transitions-duration) ease-out
      var(--transitions-duration);
    transform: translate(10px, -50%);
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    color: #ffffff;
    border-radius: 2px;
    background-color: #1f2329;
    font-size: 0.875rem;
    line-height: normal;
    z-index: 100000;
  }

  &:hover::after {
    visibility: visible;
    transform: translate(0, -50%);
    opacity: 1;
  }
`;
const ServerButtonWrapper = styled__default['default'].li `
  position: relative;
  flex: 0 0 auto;
  box-sizing: border-box;
  margin: 4px 0;
  font-size: 24px;
  line-height: 1.25;
  display: flex;
  cursor: pointer;
  color: inherit;
  align-items: center;
  flex-flow: row wrap;
  justify-content: space-between;

  ${({ isDragged }) => isDragged &&
    react.css `
      opacity: 0.5;
    `}

  &::before {
    flex: 0 0 auto;
    width: 5px;
    height: 0;
    margin-right: -5px;
    content: '';
    transition: height var(--transitions-duration),
      opacity var(--transitions-duration);
    border-radius: 0 3px 3px 0;
    background-color: #ffffff;

    ${({ hasUnreadMessages }) => hasUnreadMessages &&
    react.css `
        height: 6px;
        opacity: 0.6;
      `}

    ${({ isSelected }) => isSelected &&
    react.css `
        height: 30px;
        opacity: 1;
      `}
  }

  ${withTooltip}
`;
const Avatar = styled__default['default'].span `
  flex: 1 1 auto;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  height: 42px;
  transition: opacity var(--transitions-duration);

  ${({ isSelected }) => react.css `
      opacity: ${isSelected ? '1' : '0.6'};
    `}

  &:hover {
    ${({ isSelected }) => react.css `
        opacity: ${isSelected ? '1' : '0.8'};
      `}
  }
`;
const Initials = styled__default['default'].span `
  line-height: 42px;

  ${({ visible }) => react.css `
      display: ${visible ? 'initial' : 'none'};
    `}
`;
const Favicon = styled__default['default'].img `
  max-width: 100%;
  height: 100%;
  object-fit: contain;
  ${({ visible }) => react.css `
      display: ${visible ? 'initial' : 'none'};
    `}
`;
const Badge = styled__default['default'].div `
  position: absolute;
  z-index: 1;
  top: 2px;
  right: 8px;
  display: block;
  min-width: 15px;
  text-align: center;
  color: #ffffff;
  border-radius: 20px;
  background-color: #e43325;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
  font-size: 10px;
  font-weight: bold;
  line-height: 15px;
`;
const KeyboardShortcut = styled__default['default'].div `
  flex: 1 0 100%;
  padding-top: 8px;
  text-align: center;
  font-size: 12px;
  line-height: 1;
  ${({ visible }) => react.css `
      visibility: ${visible ? 'visible' : 'hidden'};
    `}
`;
styled__default['default'].button `
  font-family: inherit;
  position: relative;
  flex: 0 0 auto;
  box-sizing: border-box;
  margin: 4px 0;
  font-size: 2.5rem;
  line-height: 1.25;
  display: flex;
  flex-direction: row;
  height: 40px;
  padding: 0;
  color: inherit;
  border: none;
  background: none;
  align-items: center;
  justify-content: center;
`;
styled__default['default'].span `
  display: block;
  line-height: 30px;
  width: 40px;
  height: 40px;
  transition: opacity var(--transitions-duration);
  opacity: 0.6;
  color: inherit;
  background-color: rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    opacity: 1;
  }

  ${withTooltip}
`;
const DownloadsManagerButton = styled__default['default'].button `
  font-family: inherit;
  position: relative;
  flex: 0 0 auto;
  box-sizing: border-box;
  margin: 4px 0;
  font-size: 2rem;
  line-height: 1.25;
  display: flex;
  flex-direction: row;
  height: 40px;
  padding: 0;
  color: inherit;
  border: none;
  background: none;
  align-items: center;
  justify-content: center;

`;
const MainMenuSwitchButton = styled__default['default'].button `
  font-family: inherit;
  position: relative;
  flex: 0 0 auto;
  box-sizing: border-box;
  margin: 4px 0;
  font-size: 2rem;
  line-height: 1.25;
  display: flex;
  flex-direction: row;
  height: 40px;
  padding: 0;
  color: inherit;
  border: none;
  background: none;
  align-items: center;
  justify-content: center;
`;
styled__default['default'].span `
  display: block;
  line-height: 30px;
  width: 40px;
  height: 40px;
  transition: opacity var(--transitions-duration);
  opacity: 0.6;
  color: inherit;
  background-color: rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    opacity: 1;
  }

  ${withTooltip}
`;
const SidebarActionButton = styled__default['default'].span `
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  line-height: 30px;
  transition: opacity var(--transitions-duration);
  opacity: 0.6;
  color: inherit;
  
  cursor: pointer;

  &:hover {
    opacity: 1;
  }

  &.haveNew {
    animation: 1s linear blink;
    animation-iteration-count: 20;
  }

  @keyframes blink{
    0%{
      opacity: 0.4;
    }
    50%{
      opacity: 1;
    }
    100%{
      opacity: 0.4;
    }
  }

  ${withTooltip}
`;

const ServerButton = ({ url: url$1, title, shortcutNumber, isSelected, favicon, isShortcutVisible, hasUnreadMessages, mentionCount, isDragged, onDragStart, onDragEnd, onDragEnter, onDrop, }) => {
    const dispatch = reactRedux.useDispatch();
    const handleServerClick = () => {
        dispatch({ type: SIDE_BAR_SERVER_SELECTED, payload: url$1 });
    };
    const initials = React.useMemo(() => {
        var _a, _b, _c, _d, _e;
        return (_e = (_d = (_c = (_b = title === null || title === void 0 ? void 0 : title.replace(url$1, (_a = url.parse(url$1).hostname) !== null && _a !== void 0 ? _a : '')) === null || _b === void 0 ? void 0 : _b.split(/[^A-Za-z0-9]+/g)) === null || _c === void 0 ? void 0 : _c.slice(0, 2)) === null || _d === void 0 ? void 0 : _d.map((text) => text.slice(0, 1).toUpperCase())) === null || _e === void 0 ? void 0 : _e.join('');
    }, [title, url$1]);
    const handleServerContextMenu = (event) => {
        event.preventDefault();
        dispatch({ type: SIDE_BAR_CONTEXT_MENU_TRIGGERED, payload: url$1 });
    };
    return (React__default['default'].createElement(ServerButtonWrapper, { draggable: 'true', tooltip: title, isSelected: isSelected, isDragged: isDragged, hasUnreadMessages: hasUnreadMessages, onClick: handleServerClick, onContextMenu: handleServerContextMenu, onDragOver: (event) => event.preventDefault(), onDragStart: onDragStart, onDragEnd: onDragEnd, onDragEnter: onDragEnter, onDrop: onDrop },
        React__default['default'].createElement(Avatar, { isSelected: isSelected },
            React__default['default'].createElement(Initials, { visible: !favicon }, initials),
            React__default['default'].createElement(Favicon, { draggable: 'false', src: favicon !== null && favicon !== void 0 ? favicon : '', visible: !!favicon })),
        mentionCount && React__default['default'].createElement(Badge, null, mentionCount),
        shortcutNumber && (React__default['default'].createElement(KeyboardShortcut, { visible: isShortcutVisible },
            process.platform === 'darwin' ? '⌘' : '^',
            shortcutNumber))));
};

const useKeyboardShortcuts = () => {
    const [isEachShortcutVisible, setShortcutsVisible] = React.useState(false);
    React.useEffect(() => {
        const shortcutKey = process.platform === 'darwin' ? 'Meta' : 'Control';
        const handleKeyChange = (down) => ({ key }) => {
            if (shortcutKey !== key) {
                return;
            }
            setShortcutsVisible(down);
        };
        const handleKeyDown = handleKeyChange(true);
        const handleKeyUp = handleKeyChange(false);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);
    return isEachShortcutVisible;
};

const useSorting = (servers) => {
    const [draggedServerUrl, setDraggedServerUrl] = React.useState(null);
    const [serversSorting, setServersSorting] = React.useState(null);
    const handleDragStart = (url) => (event) => {
        event.dataTransfer.dropEffect = 'move';
        event.dataTransfer.effectAllowed = 'move';
        setDraggedServerUrl(url);
    };
    const handleDragEnd = () => {
        setDraggedServerUrl(null);
        setServersSorting(null);
    };
    const handleDragEnter = (targetServerUrl) => (event) => {
        if (event.dataTransfer.types.length > 0) {
            event.preventDefault();
            return;
        }
        setServersSorting((serversSorting) => {
            if (serversSorting === null || draggedServerUrl == null) {
                return servers.map(({ url }) => url);
            }
            return serversSorting.map((url) => {
                if (url === targetServerUrl) {
                    return draggedServerUrl;
                }
                if (url === draggedServerUrl) {
                    return targetServerUrl;
                }
                return url;
            });
        });
    };
    const dispatch = reactRedux.useDispatch();
    const handleDrop = (url) => (event) => {
        event.preventDefault();
        if (event.dataTransfer.types.length === 0) {
            if (serversSorting) {
                dispatch({ type: SIDE_BAR_SERVERS_SORTED, payload: serversSorting });
            }
            dispatch({ type: SIDE_BAR_SERVER_SELECTED, payload: url });
        }
    };
    const sortedServers = serversSorting
        ? servers.sort(({ url: a }, { url: b }) => serversSorting.indexOf(a) - serversSorting.indexOf(b))
        : servers;
    return {
        sortedServers,
        draggedServerUrl,
        handleDragStart,
        handleDragEnd,
        handleDragEnter,
        handleDrop,
    };
};

const SideBar = () => {
    const servers = reactRedux.useSelector(reselect.createSelector(({ currentView }) => currentView, ({ servers }) => servers, (currentView, servers) => servers.map((server) => Object.assign(server, {
        selected: typeof currentView === 'object'
            ? server.url === currentView.url
            : false,
    }))));
    const isSideBarEnabled = reactRedux.useSelector(({ isSideBarEnabled }) => isSideBarEnabled);
    const isVisible = servers.length > 0 && isSideBarEnabled;
    const style = React.useMemo(() => { var _a; return ((_a = servers.find(({ selected }) => selected)) === null || _a === void 0 ? void 0 : _a.style) || {}; }, [servers]);
    const isEachShortcutVisible = useKeyboardShortcuts();
    const { sortedServers, draggedServerUrl, handleDragStart, handleDragEnd, handleDragEnter, handleDrop, } = useSorting(servers);
    const dispatch = reactRedux.useDispatch();
    /*const handleAddServerButtonClicked = (): void => {
      dispatch({ type: SIDE_BAR_ADD_NEW_SERVER_CLICKED });
    };*/
    globalThis['have_new_downloads'] = (flag) => {
        const button = globalThis.window.document.getElementsByClassName('downloads_manager_button')[0];
        if (!button) {
            return;
        }
        if (flag === true) {
            button.classList.remove('haveNew');
            button.classList.add('haveNew');
            setTimeout(function () {
                button.classList.remove('haveNew');
            }, 20000);
        }
        else {
            button.classList.remove('haveNew');
        }
    };
    let isMBEnabled = false;
    watch(({ isMenuBarEnabled }) => isMenuBarEnabled, (isMenuBarEnabled) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        isMBEnabled = isMenuBarEnabled;
    }));
    const handelDownloadsButtonClicked = () => {
        globalThis['have_new_downloads'](false);
        dispatch({ type: SIDE_BAR_DOWNLOADS_BUTTON_CLICKED });
    };
    const handelSwitchMainMenu = () => {
        dispatch({
            type: MENU_BAR_TOGGLE_IS_MENU_BAR_ENABLED_CLICKED,
            payload: !isMBEnabled
        });
    };
    const handelReload = () => tslib.__awaiter(void 0, void 0, void 0, function* () {
        const electron = require("electron");
        const BrowserWindow = electron.remote.BrowserWindow;
        const win = BrowserWindow.getFocusedWindow();
        win === null || win === void 0 ? void 0 : win.reload();
    });
    const { t } = reactI18next.useTranslation();
    return (React__default['default'].createElement(Wrapper$1, { sideBarStyle: style, isVisible: isVisible },
        React__default['default'].createElement(Content, { withWindowButtons: process.platform === 'darwin' },
            React__default['default'].createElement(ServerList, null, sortedServers.map((server, order) => {
                var _a, _b;
                return (React__default['default'].createElement(ServerButton, { key: server.url, url: server.url, title: server.title === 'Rocket.Chat' &&
                        url.parse(server.url).hostname !== 'rocketchat'
                        ? `${server.title} - ${server.url}`
                        : (_a = server.title) !== null && _a !== void 0 ? _a : server.url, shortcutNumber: typeof order === 'number' && order <= 9
                        ? String(order + 1)
                        : null, isSelected: server.selected, favicon: (_b = server.favicon) !== null && _b !== void 0 ? _b : null, hasUnreadMessages: !!server.badge, mentionCount: typeof server.badge === 'number' ? server.badge : undefined, isShortcutVisible: isEachShortcutVisible, isDragged: draggedServerUrl === server.url, onDragStart: handleDragStart(server.url), onDragEnd: handleDragEnd, onDragEnter: handleDragEnter(server.url), onDrop: handleDrop(server.url) }));
            })),
            React__default['default'].createElement(DownloadsManagerButton, null,
                React__default['default'].createElement(SidebarActionButton, { tooltip: t('sidebar.downloads'), onClick: handelDownloadsButtonClicked, className: 'downloads_manager_button' },
                    React__default['default'].createElement(fuselage.Icon, { name: 'download' }))),
            React__default['default'].createElement(MainMenuSwitchButton, null,
                React__default['default'].createElement(SidebarActionButton, { tooltip: 'Перезагрузить', onClick: handelReload, className: 'reload_button' },
                    React__default['default'].createElement(fuselage.Icon, { name: 'reload' }))),
            React__default['default'].createElement(MainMenuSwitchButton, null,
                React__default['default'].createElement(SidebarActionButton, { tooltip: 'Показать/скрыть главное меню', onClick: handelSwitchMainMenu, className: 'main_menu_switch_button' },
                    React__default['default'].createElement(fuselage.Icon, { name: 'cog' }))))));
};
/*
<AddServerButton>
          <SidebarActionButton
            tooltip={t('sidebar.addNewServer')}
            onClick={handleAddServerButtonClicked}
          >
            +
          </SidebarActionButton>
        </AddServerButton>

*/

const UpdateDialog = () => {
    const currentVersion = reactRedux.useSelector(({ appVersion }) => appVersion);
    const newVersion = reactRedux.useSelector(({ newUpdateVersion }) => newUpdateVersion);
    const openDialog = reactRedux.useSelector(({ openDialog }) => openDialog);
    const isVisible = openDialog === 'update';
    const dispatch = reactRedux.useDispatch();
    const { t } = reactI18next.useTranslation();
    const installButtonRef = React.useRef();
    React.useEffect(() => {
        var _a;
        if (!isVisible) {
            return;
        }
        (_a = installButtonRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, [isVisible]);
    /*const handleSkipButtonClick = (): void => {
      dispatch({ type: UPDATE_DIALOG_SKIP_UPDATE_CLICKED, payload: newVersion });
    };*/
    const handleRemindLaterButtonClick = () => {
        dispatch({ type: UPDATE_DIALOG_REMIND_UPDATE_LATER_CLICKED });
    };
    const handleInstallButtonClick = () => {
        dispatch({ type: UPDATE_DIALOG_INSTALL_BUTTON_CLICKED });
    };
    const handleClose = () => {
        dispatch({ type: UPDATE_DIALOG_DISMISSED });
    };
    return (React__default['default'].createElement(Dialog, { isVisible: isVisible, onClose: handleClose },
        React__default['default'].createElement(fuselage.Box, { display: 'flex', flexDirection: 'column', alignItems: 'center' },
            React__default['default'].createElement(fuselage.Margins, { block: 'x8' },
                React__default['default'].createElement(fuselage.Box, { fontScale: 'h1' }, t('dialog.update.announcement')),
                React__default['default'].createElement(fuselage.Box, null, t('dialog.update.message'))),
            React__default['default'].createElement(fuselage.Margins, { block: 'x32' },
                React__default['default'].createElement(fuselage.Box, { display: 'flex', alignItems: 'center', justifyContent: 'center' },
                    React__default['default'].createElement(fuselage.Margins, { inline: 'x16' },
                        React__default['default'].createElement(fuselage.Box, { display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'info' },
                            React__default['default'].createElement(fuselage.Box, null, t('dialog.update.currentVersion')),
                            React__default['default'].createElement(fuselage.Box, { fontScale: 'p2' }, currentVersion)),
                        React__default['default'].createElement(fuselage.Chevron, { right: true, size: '32' }),
                        React__default['default'].createElement(fuselage.Box, { display: 'flex', flexDirection: 'column', alignItems: 'center' },
                            React__default['default'].createElement(fuselage.Box, null, t('dialog.update.newVersion')),
                            React__default['default'].createElement(fuselage.Box, { fontScale: 'p2' }, newVersion)))))),
        React__default['default'].createElement(fuselage.ButtonGroup, null,
            React__default['default'].createElement(fuselage.Button, { type: 'button', onClick: handleRemindLaterButtonClick }, t('dialog.update.remindLater')),
            React__default['default'].createElement(fuselage.Button, { ref: installButtonRef, type: 'button', primary: true, onClick: handleInstallButtonClick }, t('dialog.update.install')))));
    /* откл 05.12.2021
    <Button type='button' onClick={handleSkipButtonClick}>
            {t('dialog.update.skip')}
          </Button>
    */
};

const GlobalStyles = () => (React__default['default'].createElement(react.Global, { styles: react.css `
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      :focus {
        outline: 0 !important;
        outline-style: none;
        outline-color: transparent;
      }

      body {
        -webkit-font-smoothing: antialiased;
        margin: 0;
        padding: 0;
        font-family: system-ui;
        font-size: 0.875rem;
        line-height: 1rem;
        background-color: #2f343d;
      }
    ` }));
const WindowDragBar = styled__default['default'].div `
  position: fixed;
  width: 100vw;
  height: 22px;
  -webkit-app-region: drag;
`;
const Wrapper = styled__default['default'].div `
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  cursor: default;
  user-select: none;
  background-color: #2f343d;
  display: flex;
  flex-flow: row nowrap;
`;
const ViewsWrapper = styled__default['default'].div `
  position: relative;
  flex: 1 0 auto;
  align-self: stretch;
  max-width: 100%;
`;

const Shell = () => {
    const appPath = reactRedux.useSelector(({ appPath }) => appPath);
    React.useLayoutEffect(() => {
        if (!appPath) {
            return undefined;
        }
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = `${appPath}/app/icons/rocketchat.css`;
        document.head.append(linkElement);
        return () => {
            linkElement.remove();
        };
    }, [appPath]);
    return (React__default['default'].createElement(React__default['default'].Fragment, null,
        React__default['default'].createElement(GlobalStyles, null),
        process.platform === 'darwin' && React__default['default'].createElement(WindowDragBar, null),
        React__default['default'].createElement(Wrapper, null,
            React__default['default'].createElement(SideBar, null),
            React__default['default'].createElement(ViewsWrapper, null,
                React__default['default'].createElement(ServersView, null),
                React__default['default'].createElement(AddServerView, null),
                React__default['default'].createElement(DownloadsManagerView, null))),
        React__default['default'].createElement(AboutDialog, null),
        React__default['default'].createElement(ScreenSharingDialog, null),
        React__default['default'].createElement(SelectClientCertificateDialog, null),
        React__default['default'].createElement(UpdateDialog, null)));
};

class ErrorCatcher extends React.Component {
    componentDidCatch(error, errorInfo) {
        console.error(error);
        console.error(errorInfo.componentStack);
        dispatch({
            type: APP_ERROR_THROWN,
            payload: {
                message: error.message,
                stack: error.stack,
                name: error.name,
            },
        });
    }
    render() {
        var _a;
        return (_a = this.props.children) !== null && _a !== void 0 ? _a : null;
    }
}

const App = ({ reduxStore }) => (React__default['default'].createElement(ErrorCatcher, null,
    React__default['default'].createElement(reactRedux.Provider, { store: reduxStore },
        React__default['default'].createElement(reactI18next.I18nextProvider, { i18n: i18next__default['default'] },
            React__default['default'].createElement(Shell, null)))));

const start = () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const reduxStore = yield createRendererReduxStore();
    yield whenReady();
    setupRendererErrorHandling();
    yield setupI18n();
    (yield Promise.all([
        Promise.resolve().then(function () { return require('./renderer-876d9e56.js'); }),
        Promise.resolve().then(function () { return require('./renderer-bb5666fe.js'); }),
    ])).forEach((module) => module.default());
    const container = document.getElementById('root');
    if (!container) {
        throw new Error('cannot find the container node for React');
    }
    reactDom.render(React.createElement(App, { reduxStore }), container);
    window.addEventListener('beforeunload', () => {
        reactDom.unmountComponentAtNode(container);
    });
});
start();

exports.ROOT_WINDOW_ICON_CHANGED = ROOT_WINDOW_ICON_CHANGED;
exports.dispatch = dispatch;
exports.handle = handle;
exports.watch = watch;
//# sourceMappingURL=rootWindow-266acf9c.js.map
