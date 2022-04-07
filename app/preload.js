'use strict';

var tslib = require('tslib');
var electron = require('electron');
var redux = require('redux');

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
const SIDE_BAR_DOWNLOADS_BUTTON_CLICKED = 'side-bar/downloads-button-clicked';
const DOWNLOADS_PATH_CHANGED = 'downloads-path/change';
const SIDE_BAR_REMOVE_SERVER_CLICKED = 'side-bar/remove-server-clicked';
const SIDE_BAR_SERVER_SELECTED = 'side-bar/server-selected';
const SIDE_BAR_SERVERS_SORTED = 'side-bar/servers-sorted';
const TOUCH_BAR_FORMAT_BUTTON_TOUCHED = 'touch-bar/format-button-touched';
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

const JitsiMeetElectron = {
    obtainDesktopStreams(callback, errorCallback, options) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            try {
                const sources = (yield electron.desktopCapturer.getSources(options)).map((source) => ({
                    id: source.id,
                    name: source.name,
                    display_id: source.display_id,
                    thumbnail: {
                        toDataURL: () => source.thumbnail.toDataURL(),
                    },
                    appIcon: {
                        toDataURL: () => source.appIcon.toDataURL(),
                    },
                }));
                callback(sources);
            }
            catch (error) {
                errorCallback(error);
            }
        });
    },
};

let getAbsoluteUrl;
let serverUrl;
const setServerUrl = (_serverUrl) => {
    serverUrl = _serverUrl;
};
const getServerUrl = () => serverUrl;
const setUrlResolver = (_getAbsoluteUrl) => {
    getAbsoluteUrl = _getAbsoluteUrl;
};

const NOTIFICATIONS_CREATE_REQUESTED = 'notifications/create-requested';
const NOTIFICATIONS_CREATE_RESPONDED = 'notifications/create-responded';
const NOTIFICATIONS_NOTIFICATION_ACTIONED = 'notifications/notification-actioned';
const NOTIFICATIONS_NOTIFICATION_CLICKED = 'notifications/notification-clicked';
const NOTIFICATIONS_NOTIFICATION_CLOSED = 'notifications/notification-closed';
const NOTIFICATIONS_NOTIFICATION_DISMISSED = 'notifications/notification-dismissed';
const NOTIFICATIONS_NOTIFICATION_REPLIED = 'notifications/notification-replied';
const NOTIFICATIONS_NOTIFICATION_SHOWN = 'notifications/notification-shown';

const normalizeIconUrl = (iconUrl) => {
    if (/^data:/.test(iconUrl)) {
        return iconUrl;
    }
    if (!/^https?:\/\//.test(iconUrl)) {
        return getAbsoluteUrl(iconUrl);
    }
    return iconUrl;
};
const eventHandlers = new Map();
const createNotification = (_a) => tslib.__awaiter(void 0, void 0, void 0, function* () {
    var { title, icon, onEvent } = _a, options = tslib.__rest(_a, ["title", "icon", "onEvent"]);
    const id = yield request({
        type: NOTIFICATIONS_CREATE_REQUESTED,
        payload: Object.assign(Object.assign({ title }, (icon
            ? {
                icon: normalizeIconUrl(icon),
            }
            : {})), options),
    }, NOTIFICATIONS_CREATE_RESPONDED);
    eventHandlers.set(id, (event) => onEvent === null || onEvent === void 0 ? void 0 : onEvent({ type: event.type, detail: event.detail }));
    return id;
});
const destroyNotification = (id) => {
    dispatch({ type: NOTIFICATIONS_NOTIFICATION_DISMISSED, payload: { id } });
    eventHandlers.delete(id);
};
const listenToNotificationsRequests = () => {
    //console.log('---listenToNotificationsRequests---');
    listen(NOTIFICATIONS_NOTIFICATION_SHOWN, (action) => {
        const { payload: { id }, } = action;
        const eventHandler = eventHandlers.get(id);
        eventHandler === null || eventHandler === void 0 ? void 0 : eventHandler({ type: 'show' });
    });
    listen(NOTIFICATIONS_NOTIFICATION_CLOSED, (action) => {
        const { payload: { id }, } = action;
        const eventHandler = eventHandlers.get(id);
        eventHandler === null || eventHandler === void 0 ? void 0 : eventHandler({ type: 'close' });
        eventHandlers.delete(id);
    });
    listen(NOTIFICATIONS_NOTIFICATION_CLICKED, (action) => {
        const { payload: { id }, } = action;
        dispatch({
            type: WEBVIEW_FOCUS_REQUESTED,
            payload: {
                url: getServerUrl(),
            },
        });
        const eventHandler = eventHandlers.get(id);
        eventHandler === null || eventHandler === void 0 ? void 0 : eventHandler({ type: 'click' });
    });
    listen(NOTIFICATIONS_NOTIFICATION_REPLIED, (action) => {
        const { payload: { id, reply }, } = action;
        const eventHandler = eventHandlers.get(id);
        eventHandler === null || eventHandler === void 0 ? void 0 : eventHandler({ type: 'reply', detail: { reply } });
    });
    listen(NOTIFICATIONS_NOTIFICATION_ACTIONED, (action) => {
        const { payload: { id, index }, } = action;
        const eventHandler = eventHandlers.get(id);
        eventHandler === null || eventHandler === void 0 ? void 0 : eventHandler({ type: 'action', detail: { index } });
    });
};

const handleGetSourceIdEvent = () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const sourceId = yield request({
            type: WEBVIEW_SCREEN_SHARING_SOURCE_REQUESTED,
        }, WEBVIEW_SCREEN_SHARING_SOURCE_RESPONDED);
        window.top.postMessage({ sourceId }, '*');
    }
    catch (error) {
        window.top.postMessage({ sourceId: 'PermissionDeniedError' }, '*');
    }
});
const listenToScreenSharingRequests = () => {
    window.addEventListener('get-sourceId', handleGetSourceIdEvent);
};

const SYSTEM_LOCKING_SCREEN = 'system/locking-screen';
const SYSTEM_SUSPENDING = 'system/suspending';

let detachCallbacks;
const attachCallbacks = ({ isAutoAwayEnabled, idleThreshold, setUserOnline, }) => {
    const unsubscribeFromPowerMonitorEvents = listen((action) => [SYSTEM_SUSPENDING, SYSTEM_LOCKING_SCREEN].includes(action.type), () => {
        if (!isAutoAwayEnabled) {
            return;
        }
        setUserOnline(false);
    });
    let pollingTimer;
    let prevState;
    const pollSystemIdleState = () => tslib.__awaiter(void 0, void 0, void 0, function* () {
        if (!isAutoAwayEnabled || !idleThreshold) {
            return;
        }
        pollingTimer = setTimeout(pollSystemIdleState, 2000);
        const state = yield invoke('power-monitor/get-system-idle-state', idleThreshold);
        if (prevState === state) {
            return;
        }
        const isOnline = state === 'active' || state === 'unknown';
        setUserOnline(isOnline);
        prevState = state;
    });
    pollSystemIdleState();
    return () => {
        unsubscribeFromPowerMonitorEvents();
        clearTimeout(pollingTimer);
    };
};
const setUserPresenceDetection = (options) => {
    detachCallbacks === null || detachCallbacks === void 0 ? void 0 : detachCallbacks();
    detachCallbacks = attachCallbacks(options);
};

const setBadge = (badge) => {
    dispatch({
        type: WEBVIEW_UNREAD_CHANGED,
        payload: {
            url: getServerUrl(),
            badge,
        },
    });
};

const FAVICON_SIZE = 100;
let imageElement;
const getImageElement = () => {
    if (!imageElement) {
        const canvas = document.createElement('canvas');
        canvas.width = FAVICON_SIZE;
        canvas.height = FAVICON_SIZE;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('failed to create canvas 2d context');
        }
        imageElement = new Image();
        const handleImageLoadEvent = () => {
            ctx.clearRect(0, 0, FAVICON_SIZE, FAVICON_SIZE);
            ctx.drawImage(imageElement, 0, 0, FAVICON_SIZE, FAVICON_SIZE);
            dispatch({
                type: WEBVIEW_FAVICON_CHANGED,
                payload: {
                    url: getServerUrl(),
                    favicon: canvas.toDataURL(),
                },
            });
        };
        imageElement.addEventListener('load', handleImageLoadEvent, {
            passive: true,
        });
    }
    return imageElement;
};
const setFavicon = (faviconUrl) => {
    if (typeof faviconUrl !== 'string') {
        return;
    }
    const imageElement = getImageElement();
    imageElement.src = getAbsoluteUrl(faviconUrl);
};

let timer;
let prevBackground;
let prevColor;
const pollSidebarStyle = (referenceElement, emit) => {
    clearTimeout(timer);
    document.body.append(referenceElement);
    const { background, color } = window.getComputedStyle(referenceElement);
    referenceElement.remove();
    if (prevBackground !== background || prevColor !== color) {
        emit({
            background,
            color,
        });
        prevBackground = background;
        prevColor = color;
    }
    timer = setTimeout(() => pollSidebarStyle(referenceElement, emit), 1000);
};
let element;
const getElement = () => {
    if (!element) {
        element = document.createElement('div');
        element.classList.add('sidebar');
        element.style.backgroundColor = 'var(--sidebar-background)';
        element.style.color = 'var(--sidebar-item-text-color)';
        element.style.display = 'none';
    }
    return element;
};
const setBackground = (imageUrl) => {
    const element = getElement();
    element.style.backgroundImage = imageUrl
        ? `url(${JSON.stringify(getAbsoluteUrl(imageUrl))})`
        : 'none';
    pollSidebarStyle(element, (sideBarStyle) => {
        dispatch({
            type: WEBVIEW_SIDEBAR_STYLE_CHANGED,
            payload: {
                url: getServerUrl(),
                style: sideBarStyle,
            },
        });
    });
};

const setTitle = (title) => {
    if (typeof title !== 'string') {
        return;
    }
    const url = getServerUrl();
    if (title === 'Rocket.Chat' && new URL(url).host !== 'rocketchat') {
        dispatch({
            type: WEBVIEW_TITLE_CHANGED,
            payload: {
                url,
                title: `${title} - ${url}`,
            },
        });
        return;
    }
    dispatch({
        type: WEBVIEW_TITLE_CHANGED,
        payload: {
            url,
            title,
        },
    });
};

let serverInfo;
const RocketChatDesktop = {
    setServerInfo: (_serverInfo) => {
        serverInfo = _serverInfo;
    },
    setUrlResolver,
    setBadge,
    setFavicon,
    setBackground,
    setTitle,
    setUserPresenceDetection,
    createNotification,
    destroyNotification,
};

let focusedMessageBoxInput = null;
const handleFocusEvent = (event) => {
    if (!(event.target instanceof Element)) {
        return;
    }
    if (!event.target.classList.contains('js-input-message')) {
        return;
    }
    focusedMessageBoxInput = event.target;
    dispatch({ type: WEBVIEW_MESSAGE_BOX_FOCUSED });
};
const handleBlurEvent = (event) => {
    if (!(event.target instanceof Element)) {
        return;
    }
    if (!event.target.classList.contains('js-input-message')) {
        return;
    }
    focusedMessageBoxInput = null;
    dispatch({ type: WEBVIEW_MESSAGE_BOX_BLURRED });
};
const listenToMessageBoxEvents = () => {
    listen(TOUCH_BAR_FORMAT_BUTTON_TOUCHED, (action) => {
        if (!focusedMessageBoxInput) {
            return;
        }
        const { payload: buttonId } = action;
        const ancestor = focusedMessageBoxInput.closest('.rc-message-box');
        const button = ancestor === null || ancestor === void 0 ? void 0 : ancestor.querySelector(`[data-id='${buttonId}']`);
        button === null || button === void 0 ? void 0 : button.click();
    });
    document.addEventListener('focus', handleFocusEvent, true);
    document.addEventListener('blur', handleBlurEvent, true);
};

const selectIsSideBarVisible = ({}) => { return true; }; //servers.length > 0 && isSideBarEnabled;
const handleTrafficLightsSpacing = () => {
    if (process.platform !== 'darwin') {
        return;
    }
    const style = document.getElementById('sidebar-padding') ||
        document.createElement('style');
    style.id = 'sidebar-padding';
    document.head.append(style);
    watch(selectIsSideBarVisible, (isSideBarVisible) => {
        style.innerHTML = `
      .sidebar {
        padding-top: ${isSideBarVisible ? 0 : '10px'} !important;
        transition: padding-top 230ms ease-in-out !important;
      }
    `;
    });
};

const start = () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    window.addEventListener('p2p-download', function (ev) {
        electron.ipcRenderer.invoke("p2p-download", ev.detail);
    } /*, true*/);
    window.addEventListener('p2p-upload', function (ev) {
        electron.ipcRenderer.invoke("p2p-upload", ev.detail);
    } /*, true*/);
    const serverUrl = yield invoke('server-view/get-url');
    electron.contextBridge.exposeInMainWorld('JitsiMeetElectron', JitsiMeetElectron);
    if (!serverUrl) {
        return;
    }
    electron.contextBridge.exposeInMainWorld('RocketChatDesktop', RocketChatDesktop);
    setServerUrl(serverUrl);
    yield createRendererReduxStore();
    yield whenReady();
    setupRendererErrorHandling();
    yield invoke('server-view/ready');
    listenToNotificationsRequests();
    if (!serverInfo) {
        return;
    }
    //listenToNotificationsRequests();
    listenToScreenSharingRequests();
    listenToMessageBoxEvents();
    handleTrafficLightsSpacing();
});
start();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlbG9hZC5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL0BidWdzbmFnL2Jyb3dzZXIvZGlzdC9idWdzbmFnLmpzIiwiLi4vc3JjL2FwcC9hY3Rpb25zLnRzIiwiLi4vc3JjL3N0b3JlL2ZzYS50cyIsIi4uL3NyYy9pcGMvcmVuZGVyZXIudHMiLCIuLi9zcmMvc3RvcmUvaXBjLnRzIiwiLi4vc3JjL2FwcC9yZWR1Y2Vycy9hcHBQYXRoLnRzIiwiLi4vc3JjL2FwcC9yZWR1Y2Vycy9hcHBWZXJzaW9uLnRzIiwiLi4vc3JjL2Rvd25sb2Fkcy9hY3Rpb25zLnRzIiwiLi4vc3JjL2Rvd25sb2Fkcy9yZWR1Y2Vycy9kb3dubG9hZHMudHMiLCIuLi9zcmMvbmF2aWdhdGlvbi9hY3Rpb25zLnRzIiwiLi4vc3JjL25hdmlnYXRpb24vcmVkdWNlcnMudHMiLCIuLi9zcmMvZGVlcExpbmtzL2FjdGlvbnMudHMiLCIuLi9zcmMvdWkvYWN0aW9ucy50cyIsIi4uL3NyYy9zZXJ2ZXJzL2FjdGlvbnMudHMiLCIuLi9zcmMvc2VydmVycy9yZWR1Y2Vycy50cyIsIi4uL3NyYy91aS9yZWR1Y2Vycy9jdXJyZW50Vmlldy50cyIsIi4uL3NyYy91aS9yZWR1Y2Vycy9kb3dubG9hZHNQYXRoLnRzIiwiLi4vc3JjL3VpL3JlZHVjZXJzL2lzTWVudUJhckVuYWJsZWQudHMiLCIuLi9zcmMvdWkvcmVkdWNlcnMvaXNNZXNzYWdlQm94Rm9jdXNlZC50cyIsIi4uL3NyYy91aS9yZWR1Y2Vycy9pc1Nob3dXaW5kb3dPblVucmVhZENoYW5nZWRFbmFibGVkLnRzIiwiLi4vc3JjL3VpL3JlZHVjZXJzL2lzU2lkZUJhckVuYWJsZWQudHMiLCIuLi9zcmMvdWkvcmVkdWNlcnMvaXNUcmF5SWNvbkVuYWJsZWQudHMiLCIuLi9zcmMvc2NyZWVuU2hhcmluZy9hY3Rpb25zLnRzIiwiLi4vc3JjL3VwZGF0ZXMvYWN0aW9ucy50cyIsIi4uL3NyYy91aS9yZWR1Y2Vycy9vcGVuRGlhbG9nLnRzIiwiLi4vc3JjL3VpL3JlZHVjZXJzL3Jvb3RXaW5kb3dJY29uLnRzIiwiLi4vc3JjL3VpL3JlZHVjZXJzL3Jvb3RXaW5kb3dTdGF0ZS50cyIsIi4uL3NyYy91cGRhdGVzL3JlZHVjZXJzLnRzIiwiLi4vc3JjL3N0b3JlL3Jvb3RSZWR1Y2VyLnRzIiwiLi4vc3JjL3N0b3JlL2luZGV4LnRzIiwiLi4vc3JjL3doZW5SZWFkeS50cyIsIi4uL3NyYy9lcnJvcnMudHMiLCIuLi9zcmMvaml0c2kvcHJlbG9hZC50cyIsIi4uL3NyYy9zZXJ2ZXJzL3ByZWxvYWQvdXJscy50cyIsIi4uL3NyYy9ub3RpZmljYXRpb25zL2FjdGlvbnMudHMiLCIuLi9zcmMvbm90aWZpY2F0aW9ucy9wcmVsb2FkLnRzIiwiLi4vc3JjL3NjcmVlblNoYXJpbmcvcHJlbG9hZC50cyIsIi4uL3NyYy91c2VyUHJlc2VuY2UvYWN0aW9ucy50cyIsIi4uL3NyYy91c2VyUHJlc2VuY2UvcHJlbG9hZC50cyIsIi4uL3NyYy9zZXJ2ZXJzL3ByZWxvYWQvYmFkZ2UudHMiLCIuLi9zcmMvc2VydmVycy9wcmVsb2FkL2Zhdmljb24udHMiLCIuLi9zcmMvc2VydmVycy9wcmVsb2FkL3NpZGViYXIudHMiLCIuLi9zcmMvc2VydmVycy9wcmVsb2FkL3RpdGxlLnRzIiwiLi4vc3JjL3NlcnZlcnMvcHJlbG9hZC9hcGkudHMiLCIuLi9zcmMvdWkvcHJlbG9hZC9tZXNzYWdlQm94LnRzIiwiLi4vc3JjL3VpL3ByZWxvYWQvc2lkZWJhci50cyIsIi4uL3NyYy9wcmVsb2FkLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc31nLkJ1Z3NuYWcgPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO1xudmFyIF8kYnJlYWRjcnVtYlR5cGVzXzggPSBbJ25hdmlnYXRpb24nLCAncmVxdWVzdCcsICdwcm9jZXNzJywgJ2xvZycsICd1c2VyJywgJ3N0YXRlJywgJ2Vycm9yJywgJ21hbnVhbCddO1xuXG4vLyBBcnJheSNyZWR1Y2VcbnZhciBfJHJlZHVjZV8xNyA9IGZ1bmN0aW9uIChhcnIsIGZuLCBhY2N1bSkge1xuICB2YXIgdmFsID0gYWNjdW07XG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFyci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIHZhbCA9IGZuKHZhbCwgYXJyW2ldLCBpLCBhcnIpO1xuICB9XG5cbiAgcmV0dXJuIHZhbDtcbn07XG5cbi8qIHJlbW92ZWQ6IHZhciBfJHJlZHVjZV8xNyA9IHJlcXVpcmUoJy4vcmVkdWNlJyk7ICovOyAvLyBBcnJheSNmaWx0ZXJcblxuXG52YXIgXyRmaWx0ZXJfMTIgPSBmdW5jdGlvbiAoYXJyLCBmbikge1xuICByZXR1cm4gXyRyZWR1Y2VfMTcoYXJyLCBmdW5jdGlvbiAoYWNjdW0sIGl0ZW0sIGksIGFycikge1xuICAgIHJldHVybiAhZm4oaXRlbSwgaSwgYXJyKSA/IGFjY3VtIDogYWNjdW0uY29uY2F0KGl0ZW0pO1xuICB9LCBbXSk7XG59O1xuXG4vKiByZW1vdmVkOiB2YXIgXyRyZWR1Y2VfMTcgPSByZXF1aXJlKCcuL3JlZHVjZScpOyAqLzsgLy8gQXJyYXkjaW5jbHVkZXNcblxuXG52YXIgXyRpbmNsdWRlc18xMyA9IGZ1bmN0aW9uIChhcnIsIHgpIHtcbiAgcmV0dXJuIF8kcmVkdWNlXzE3KGFyciwgZnVuY3Rpb24gKGFjY3VtLCBpdGVtLCBpLCBhcnIpIHtcbiAgICByZXR1cm4gYWNjdW0gPT09IHRydWUgfHwgaXRlbSA9PT0geDtcbiAgfSwgZmFsc2UpO1xufTtcblxuLy8gQXJyYXkjaXNBcnJheVxudmFyIF8kaXNBcnJheV8xNCA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxuLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGlucyAqL1xudmFyIF9oYXNEb250RW51bUJ1ZyA9ICF7XG4gIHRvU3RyaW5nOiBudWxsXG59LnByb3BlcnR5SXNFbnVtZXJhYmxlKCd0b1N0cmluZycpO1xuXG52YXIgX2RvbnRFbnVtcyA9IFsndG9TdHJpbmcnLCAndG9Mb2NhbGVTdHJpbmcnLCAndmFsdWVPZicsICdoYXNPd25Qcm9wZXJ0eScsICdpc1Byb3RvdHlwZU9mJywgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJywgJ2NvbnN0cnVjdG9yJ107IC8vIE9iamVjdCNrZXlzXG5cbnZhciBfJGtleXNfMTUgPSBmdW5jdGlvbiAob2JqKSB7XG4gIC8vIHN0cmlwcGVkIGRvd24gdmVyc2lvbiBvZlxuICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvS2V5c1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBwcm9wO1xuXG4gIGZvciAocHJvcCBpbiBvYmopIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIHJlc3VsdC5wdXNoKHByb3ApO1xuICB9XG5cbiAgaWYgKCFfaGFzRG9udEVudW1CdWcpIHJldHVybiByZXN1bHQ7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IF9kb250RW51bXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgX2RvbnRFbnVtc1tpXSkpIHJlc3VsdC5wdXNoKF9kb250RW51bXNbaV0pO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbnZhciBfJGludFJhbmdlXzIzID0gZnVuY3Rpb24gKG1pbiwgbWF4KSB7XG4gIGlmIChtaW4gPT09IHZvaWQgMCkge1xuICAgIG1pbiA9IDE7XG4gIH1cblxuICBpZiAobWF4ID09PSB2b2lkIDApIHtcbiAgICBtYXggPSBJbmZpbml0eTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiBwYXJzZUludCgnJyArIHZhbHVlLCAxMCkgPT09IHZhbHVlICYmIHZhbHVlID49IG1pbiAmJiB2YWx1ZSA8PSBtYXg7XG4gIH07XG59O1xuXG4vKiByZW1vdmVkOiB2YXIgXyRmaWx0ZXJfMTIgPSByZXF1aXJlKCcuLi9lcy11dGlscy9maWx0ZXInKTsgKi87XG5cbi8qIHJlbW92ZWQ6IHZhciBfJGlzQXJyYXlfMTQgPSByZXF1aXJlKCcuLi9lcy11dGlscy9pcy1hcnJheScpOyAqLztcblxudmFyIF8kbGlzdE9mRnVuY3Rpb25zXzI0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicgfHwgXyRpc0FycmF5XzE0KHZhbHVlKSAmJiBfJGZpbHRlcl8xMih2YWx1ZSwgZnVuY3Rpb24gKGYpIHtcbiAgICByZXR1cm4gdHlwZW9mIGYgPT09ICdmdW5jdGlvbic7XG4gIH0pLmxlbmd0aCA9PT0gdmFsdWUubGVuZ3RoO1xufTtcblxudmFyIF8kc3RyaW5nV2l0aExlbmd0aF8yNSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiAhIXZhbHVlLmxlbmd0aDtcbn07XG5cbnZhciBfJGNvbmZpZ181ID0ge307XG4vKiByZW1vdmVkOiB2YXIgXyRmaWx0ZXJfMTIgPSByZXF1aXJlKCcuL2xpYi9lcy11dGlscy9maWx0ZXInKTsgKi87XG5cbi8qIHJlbW92ZWQ6IHZhciBfJHJlZHVjZV8xNyA9IHJlcXVpcmUoJy4vbGliL2VzLXV0aWxzL3JlZHVjZScpOyAqLztcblxuLyogcmVtb3ZlZDogdmFyIF8ka2V5c18xNSA9IHJlcXVpcmUoJy4vbGliL2VzLXV0aWxzL2tleXMnKTsgKi87XG5cbi8qIHJlbW92ZWQ6IHZhciBfJGlzQXJyYXlfMTQgPSByZXF1aXJlKCcuL2xpYi9lcy11dGlscy9pcy1hcnJheScpOyAqLztcblxuLyogcmVtb3ZlZDogdmFyIF8kaW5jbHVkZXNfMTMgPSByZXF1aXJlKCcuL2xpYi9lcy11dGlscy9pbmNsdWRlcycpOyAqLztcblxuLyogcmVtb3ZlZDogdmFyIF8kaW50UmFuZ2VfMjMgPSByZXF1aXJlKCcuL2xpYi92YWxpZGF0b3JzL2ludC1yYW5nZScpOyAqLztcblxuLyogcmVtb3ZlZDogdmFyIF8kc3RyaW5nV2l0aExlbmd0aF8yNSA9IHJlcXVpcmUoJy4vbGliL3ZhbGlkYXRvcnMvc3RyaW5nLXdpdGgtbGVuZ3RoJyk7ICovO1xuXG4vKiByZW1vdmVkOiB2YXIgXyRsaXN0T2ZGdW5jdGlvbnNfMjQgPSByZXF1aXJlKCcuL2xpYi92YWxpZGF0b3JzL2xpc3Qtb2YtZnVuY3Rpb25zJyk7ICovO1xuXG4vKiByZW1vdmVkOiB2YXIgXyRicmVhZGNydW1iVHlwZXNfOCA9IHJlcXVpcmUoJy4vbGliL2JyZWFkY3J1bWItdHlwZXMnKTsgKi87XG5cbnZhciBkZWZhdWx0RXJyb3JUeXBlcyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHtcbiAgICB1bmhhbmRsZWRFeGNlcHRpb25zOiB0cnVlLFxuICAgIHVuaGFuZGxlZFJlamVjdGlvbnM6IHRydWVcbiAgfTtcbn07XG5cbl8kY29uZmlnXzUuc2NoZW1hID0ge1xuICBhcGlLZXk6IHtcbiAgICBkZWZhdWx0VmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG4gICAgbWVzc2FnZTogJ2lzIHJlcXVpcmVkJyxcbiAgICB2YWxpZGF0ZTogXyRzdHJpbmdXaXRoTGVuZ3RoXzI1XG4gIH0sXG4gIGFwcFZlcnNpb246IHtcbiAgICBkZWZhdWx0VmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICBtZXNzYWdlOiAnc2hvdWxkIGJlIGEgc3RyaW5nJyxcbiAgICB2YWxpZGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCBfJHN0cmluZ1dpdGhMZW5ndGhfMjUodmFsdWUpO1xuICAgIH1cbiAgfSxcbiAgYXBwVHlwZToge1xuICAgIGRlZmF1bHRWYWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9LFxuICAgIG1lc3NhZ2U6ICdzaG91bGQgYmUgYSBzdHJpbmcnLFxuICAgIHZhbGlkYXRlOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IF8kc3RyaW5nV2l0aExlbmd0aF8yNSh2YWx1ZSk7XG4gICAgfVxuICB9LFxuICBhdXRvRGV0ZWN0RXJyb3JzOiB7XG4gICAgZGVmYXVsdFZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIG1lc3NhZ2U6ICdzaG91bGQgYmUgdHJ1ZXxmYWxzZScsXG4gICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlID09PSB0cnVlIHx8IHZhbHVlID09PSBmYWxzZTtcbiAgICB9XG4gIH0sXG4gIGVuYWJsZWRFcnJvclR5cGVzOiB7XG4gICAgZGVmYXVsdFZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gZGVmYXVsdEVycm9yVHlwZXMoKTtcbiAgICB9LFxuICAgIG1lc3NhZ2U6ICdzaG91bGQgYmUgYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGZsYWdzIHsgdW5oYW5kbGVkRXhjZXB0aW9uczp0cnVlfGZhbHNlLCB1bmhhbmRsZWRSZWplY3Rpb25zOnRydWV8ZmFsc2UgfScsXG4gICAgYWxsb3dQYXJ0aWFsT2JqZWN0OiB0cnVlLFxuICAgIHZhbGlkYXRlOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIC8vIGVuc3VyZSB3ZSBoYXZlIGFuIG9iamVjdFxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcgfHwgIXZhbHVlKSByZXR1cm4gZmFsc2U7XG4gICAgICB2YXIgcHJvdmlkZWRLZXlzID0gXyRrZXlzXzE1KHZhbHVlKTtcbiAgICAgIHZhciBkZWZhdWx0S2V5cyA9IF8ka2V5c18xNShkZWZhdWx0RXJyb3JUeXBlcygpKTsgLy8gZW5zdXJlIGl0IG9ubHkgaGFzIGEgc3Vic2V0IG9mIHRoZSBhbGxvd2VkIGtleXNcblxuICAgICAgaWYgKF8kZmlsdGVyXzEyKHByb3ZpZGVkS2V5cywgZnVuY3Rpb24gKGspIHtcbiAgICAgICAgcmV0dXJuIF8kaW5jbHVkZXNfMTMoZGVmYXVsdEtleXMsIGspO1xuICAgICAgfSkubGVuZ3RoIDwgcHJvdmlkZWRLZXlzLmxlbmd0aCkgcmV0dXJuIGZhbHNlOyAvLyBlbnN1cmUgYWxsIG9mIHRoZSB2YWx1ZXMgYXJlIGJvb2xlYW5cblxuICAgICAgaWYgKF8kZmlsdGVyXzEyKF8ka2V5c18xNSh2YWx1ZSksIGZ1bmN0aW9uIChrKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWVba10gIT09ICdib29sZWFuJztcbiAgICAgIH0pLmxlbmd0aCA+IDApIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSxcbiAgb25FcnJvcjoge1xuICAgIGRlZmF1bHRWYWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH0sXG4gICAgbWVzc2FnZTogJ3Nob3VsZCBiZSBhIGZ1bmN0aW9uIG9yIGFycmF5IG9mIGZ1bmN0aW9ucycsXG4gICAgdmFsaWRhdGU6IF8kbGlzdE9mRnVuY3Rpb25zXzI0XG4gIH0sXG4gIG9uU2Vzc2lvbjoge1xuICAgIGRlZmF1bHRWYWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH0sXG4gICAgbWVzc2FnZTogJ3Nob3VsZCBiZSBhIGZ1bmN0aW9uIG9yIGFycmF5IG9mIGZ1bmN0aW9ucycsXG4gICAgdmFsaWRhdGU6IF8kbGlzdE9mRnVuY3Rpb25zXzI0XG4gIH0sXG4gIG9uQnJlYWRjcnVtYjoge1xuICAgIGRlZmF1bHRWYWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH0sXG4gICAgbWVzc2FnZTogJ3Nob3VsZCBiZSBhIGZ1bmN0aW9uIG9yIGFycmF5IG9mIGZ1bmN0aW9ucycsXG4gICAgdmFsaWRhdGU6IF8kbGlzdE9mRnVuY3Rpb25zXzI0XG4gIH0sXG4gIGVuZHBvaW50czoge1xuICAgIGRlZmF1bHRWYWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbm90aWZ5OiAnaHR0cHM6Ly9ub3RpZnkuYnVnc25hZy5jb20nLFxuICAgICAgICBzZXNzaW9uczogJ2h0dHBzOi8vc2Vzc2lvbnMuYnVnc25hZy5jb20nXG4gICAgICB9O1xuICAgIH0sXG4gICAgbWVzc2FnZTogJ3Nob3VsZCBiZSBhbiBvYmplY3QgY29udGFpbmluZyBlbmRwb2ludCBVUkxzIHsgbm90aWZ5LCBzZXNzaW9ucyB9JyxcbiAgICB2YWxpZGF0ZTogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgcmV0dXJuICgvLyBmaXJzdCwgZW5zdXJlIGl0J3MgYW4gb2JqZWN0XG4gICAgICAgIHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiAvLyBub3RpZnkgYW5kIHNlc3Npb25zIG11c3QgYWx3YXlzIGJlIHNldFxuICAgICAgICBfJHN0cmluZ1dpdGhMZW5ndGhfMjUodmFsLm5vdGlmeSkgJiYgXyRzdHJpbmdXaXRoTGVuZ3RoXzI1KHZhbC5zZXNzaW9ucykgJiYgLy8gZW5zdXJlIG5vIGtleXMgb3RoZXIgdGhhbiBub3RpZnkvc2Vzc2lvbiBhcmUgc2V0IG9uIGVuZHBvaW50cyBvYmplY3RcbiAgICAgICAgXyRmaWx0ZXJfMTIoXyRrZXlzXzE1KHZhbCksIGZ1bmN0aW9uIChrKSB7XG4gICAgICAgICAgcmV0dXJuICFfJGluY2x1ZGVzXzEzKFsnbm90aWZ5JywgJ3Nlc3Npb25zJ10sIGspO1xuICAgICAgICB9KS5sZW5ndGggPT09IDBcbiAgICAgICk7XG4gICAgfVxuICB9LFxuICBhdXRvVHJhY2tTZXNzaW9uczoge1xuICAgIGRlZmF1bHRWYWx1ZTogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICBtZXNzYWdlOiAnc2hvdWxkIGJlIHRydWV8ZmFsc2UnLFxuICAgIHZhbGlkYXRlOiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICByZXR1cm4gdmFsID09PSB0cnVlIHx8IHZhbCA9PT0gZmFsc2U7XG4gICAgfVxuICB9LFxuICBlbmFibGVkUmVsZWFzZVN0YWdlczoge1xuICAgIGRlZmF1bHRWYWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgICBtZXNzYWdlOiAnc2hvdWxkIGJlIGFuIGFycmF5IG9mIHN0cmluZ3MnLFxuICAgIHZhbGlkYXRlOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCBfJGlzQXJyYXlfMTQodmFsdWUpICYmIF8kZmlsdGVyXzEyKHZhbHVlLCBmdW5jdGlvbiAoZikge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGYgPT09ICdzdHJpbmcnO1xuICAgICAgfSkubGVuZ3RoID09PSB2YWx1ZS5sZW5ndGg7XG4gICAgfVxuICB9LFxuICByZWxlYXNlU3RhZ2U6IHtcbiAgICBkZWZhdWx0VmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiAncHJvZHVjdGlvbic7XG4gICAgfSxcbiAgICBtZXNzYWdlOiAnc2hvdWxkIGJlIGEgc3RyaW5nJyxcbiAgICB2YWxpZGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZS5sZW5ndGg7XG4gICAgfVxuICB9LFxuICBtYXhCcmVhZGNydW1iczoge1xuICAgIGRlZmF1bHRWYWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIDI1O1xuICAgIH0sXG4gICAgbWVzc2FnZTogJ3Nob3VsZCBiZSBhIG51bWJlciDiiaQxMDAnLFxuICAgIHZhbGlkYXRlOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBfJGludFJhbmdlXzIzKDAsIDEwMCkodmFsdWUpO1xuICAgIH1cbiAgfSxcbiAgZW5hYmxlZEJyZWFkY3J1bWJUeXBlczoge1xuICAgIGRlZmF1bHRWYWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF8kYnJlYWRjcnVtYlR5cGVzXzg7XG4gICAgfSxcbiAgICBtZXNzYWdlOiBcInNob3VsZCBiZSBudWxsIG9yIGEgbGlzdCBvZiBhdmFpbGFibGUgYnJlYWRjcnVtYiB0eXBlcyAoXCIgKyBfJGJyZWFkY3J1bWJUeXBlc184LmpvaW4oJywnKSArIFwiKVwiLFxuICAgIHZhbGlkYXRlOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCBfJGlzQXJyYXlfMTQodmFsdWUpICYmIF8kcmVkdWNlXzE3KHZhbHVlLCBmdW5jdGlvbiAoYWNjdW0sIG1heWJlVHlwZSkge1xuICAgICAgICBpZiAoYWNjdW0gPT09IGZhbHNlKSByZXR1cm4gYWNjdW07XG4gICAgICAgIHJldHVybiBfJGluY2x1ZGVzXzEzKF8kYnJlYWRjcnVtYlR5cGVzXzgsIG1heWJlVHlwZSk7XG4gICAgICB9LCB0cnVlKTtcbiAgICB9XG4gIH0sXG4gIGNvbnRleHQ6IHtcbiAgICBkZWZhdWx0VmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICBtZXNzYWdlOiAnc2hvdWxkIGJlIGEgc3RyaW5nJyxcbiAgICB2YWxpZGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xuICAgIH1cbiAgfSxcbiAgdXNlcjoge1xuICAgIGRlZmF1bHRWYWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH0sXG4gICAgbWVzc2FnZTogJ3Nob3VsZCBiZSBhbiBvYmplY3Qgd2l0aCB7IGlkLCBlbWFpbCwgbmFtZSB9IHByb3BlcnRpZXMnLFxuICAgIHZhbGlkYXRlOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSAmJiBfJHJlZHVjZV8xNyhfJGtleXNfMTUodmFsdWUpLCBmdW5jdGlvbiAoYWNjdW0sIGtleSkge1xuICAgICAgICByZXR1cm4gYWNjdW0gJiYgXyRpbmNsdWRlc18xMyhbJ2lkJywgJ2VtYWlsJywgJ25hbWUnXSwga2V5KTtcbiAgICAgIH0sIHRydWUpO1xuICAgIH1cbiAgfSxcbiAgbWV0YWRhdGE6IHtcbiAgICBkZWZhdWx0VmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9LFxuICAgIG1lc3NhZ2U6ICdzaG91bGQgYmUgYW4gb2JqZWN0JyxcbiAgICB2YWxpZGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAhPT0gbnVsbDtcbiAgICB9XG4gIH0sXG4gIGxvZ2dlcjoge1xuICAgIGRlZmF1bHRWYWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9LFxuICAgIG1lc3NhZ2U6ICdzaG91bGQgYmUgbnVsbCBvciBhbiBvYmplY3Qgd2l0aCBtZXRob2RzIHsgZGVidWcsIGluZm8sIHdhcm4sIGVycm9yIH0nLFxuICAgIHZhbGlkYXRlOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiAhdmFsdWUgfHwgdmFsdWUgJiYgXyRyZWR1Y2VfMTcoWydkZWJ1ZycsICdpbmZvJywgJ3dhcm4nLCAnZXJyb3InXSwgZnVuY3Rpb24gKGFjY3VtLCBtZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGFjY3VtICYmIHR5cGVvZiB2YWx1ZVttZXRob2RdID09PSAnZnVuY3Rpb24nO1xuICAgICAgfSwgdHJ1ZSk7XG4gICAgfVxuICB9LFxuICByZWRhY3RlZEtleXM6IHtcbiAgICBkZWZhdWx0VmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBbJ3Bhc3N3b3JkJ107XG4gICAgfSxcbiAgICBtZXNzYWdlOiAnc2hvdWxkIGJlIGFuIGFycmF5IG9mIHN0cmluZ3N8cmVnZXhlcycsXG4gICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIF8kaXNBcnJheV8xNCh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09PSBfJGZpbHRlcl8xMih2YWx1ZSwgZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBzID09PSAnc3RyaW5nJyB8fCBzICYmIHR5cGVvZiBzLnRlc3QgPT09ICdmdW5jdGlvbic7XG4gICAgICB9KS5sZW5ndGg7XG4gICAgfVxuICB9LFxuICBwbHVnaW5zOiB7XG4gICAgZGVmYXVsdFZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfSxcbiAgICBtZXNzYWdlOiAnc2hvdWxkIGJlIGFuIGFycmF5IG9mIHBsdWdpbiBvYmplY3RzJyxcbiAgICB2YWxpZGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gXyRpc0FycmF5XzE0KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IF8kZmlsdGVyXzEyKHZhbHVlLCBmdW5jdGlvbiAocCkge1xuICAgICAgICByZXR1cm4gcCAmJiB0eXBlb2YgcCA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHAubG9hZCA9PT0gJ2Z1bmN0aW9uJztcbiAgICAgIH0pLmxlbmd0aDtcbiAgICB9XG4gIH1cbn07XG5cbi8vIGV4dGVuZHMgaGVscGVyIGZyb20gYmFiZWxcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9iYWJlbC9iYWJlbC9ibG9iLzkxNjQyOWI1MTZlNjQ2NmZkMDY1ODhlZTgyMGU0MGUwMjVkN2YzYTMvcGFja2FnZXMvYmFiZWwtaGVscGVycy9zcmMvaGVscGVycy5qcyNMMzc3LUwzOTNcbnZhciBfJGFzc2lnbl8xMSA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxuLyogcmVtb3ZlZDogdmFyIF8kcmVkdWNlXzE3ID0gcmVxdWlyZSgnLi9yZWR1Y2UnKTsgKi87IC8vIEFycmF5I21hcFxuXG5cbnZhciBfJG1hcF8xNiA9IGZ1bmN0aW9uIChhcnIsIGZuKSB7XG4gIHJldHVybiBfJHJlZHVjZV8xNyhhcnIsIGZ1bmN0aW9uIChhY2N1bSwgaXRlbSwgaSwgYXJyKSB7XG4gICAgcmV0dXJuIGFjY3VtLmNvbmNhdChmbihpdGVtLCBpLCBhcnIpKTtcbiAgfSwgW10pO1xufTtcblxudmFyIHNjaGVtYSA9IF8kY29uZmlnXzUuc2NoZW1hO1xuXG4vKiByZW1vdmVkOiB2YXIgXyRtYXBfMTYgPSByZXF1aXJlKCdAYnVnc25hZy9jb3JlL2xpYi9lcy11dGlscy9tYXAnKTsgKi87XG5cbi8qIHJlbW92ZWQ6IHZhciBfJGFzc2lnbl8xMSA9IHJlcXVpcmUoJ0BidWdzbmFnL2NvcmUvbGliL2VzLXV0aWxzL2Fzc2lnbicpOyAqLztcblxudmFyIF8kY29uZmlnXzEgPSB7XG4gIHJlbGVhc2VTdGFnZTogXyRhc3NpZ25fMTEoe30sIHNjaGVtYS5yZWxlYXNlU3RhZ2UsIHtcbiAgICBkZWZhdWx0VmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICgvXmxvY2FsaG9zdCg6XFxkKyk/JC8udGVzdCh3aW5kb3cubG9jYXRpb24uaG9zdCkpIHJldHVybiAnZGV2ZWxvcG1lbnQnO1xuICAgICAgcmV0dXJuICdwcm9kdWN0aW9uJztcbiAgICB9XG4gIH0pLFxuICBsb2dnZXI6IF8kYXNzaWduXzExKHt9LCBzY2hlbWEubG9nZ2VyLCB7XG4gICAgZGVmYXVsdFZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gKC8vIHNldCBsb2dnZXIgYmFzZWQgb24gYnJvd3NlciBjYXBhYmlsaXR5XG4gICAgICAgIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgY29uc29sZS5kZWJ1ZyA9PT0gJ2Z1bmN0aW9uJyA/IGdldFByZWZpeGVkQ29uc29sZSgpIDogdW5kZWZpbmVkXG4gICAgICApO1xuICAgIH1cbiAgfSlcbn07XG5cbnZhciBnZXRQcmVmaXhlZENvbnNvbGUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBsb2dnZXIgPSB7fTtcbiAgdmFyIGNvbnNvbGVMb2cgPSBjb25zb2xlLmxvZztcbiAgXyRtYXBfMTYoWydkZWJ1ZycsICdpbmZvJywgJ3dhcm4nLCAnZXJyb3InXSwgZnVuY3Rpb24gKG1ldGhvZCkge1xuICAgIHZhciBjb25zb2xlTWV0aG9kID0gY29uc29sZVttZXRob2RdO1xuICAgIGxvZ2dlclttZXRob2RdID0gdHlwZW9mIGNvbnNvbGVNZXRob2QgPT09ICdmdW5jdGlvbicgPyBjb25zb2xlTWV0aG9kLmJpbmQoY29uc29sZSwgJ1tidWdzbmFnXScpIDogY29uc29sZUxvZy5iaW5kKGNvbnNvbGUsICdbYnVnc25hZ10nKTtcbiAgfSk7XG4gIHJldHVybiBsb2dnZXI7XG59O1xuXG52YXIgQnJlYWRjcnVtYiA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEJyZWFkY3J1bWIobWVzc2FnZSwgbWV0YWRhdGEsIHR5cGUsIHRpbWVzdGFtcCkge1xuICAgIGlmICh0aW1lc3RhbXAgPT09IHZvaWQgMCkge1xuICAgICAgdGltZXN0YW1wID0gbmV3IERhdGUoKTtcbiAgICB9XG5cbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5tZXRhZGF0YSA9IG1ldGFkYXRhO1xuICAgIHRoaXMudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IEJyZWFkY3J1bWIucHJvdG90eXBlO1xuXG4gIF9wcm90by50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgIG5hbWU6IHRoaXMubWVzc2FnZSxcbiAgICAgIHRpbWVzdGFtcDogdGhpcy50aW1lc3RhbXAsXG4gICAgICBtZXRhRGF0YTogdGhpcy5tZXRhZGF0YVxuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIEJyZWFkY3J1bWI7XG59KCk7XG5cbnZhciBfJEJyZWFkY3J1bWJfMyA9IEJyZWFkY3J1bWI7XG5cbnZhciBfJHN0YWNrZnJhbWVfMzMgPSB7fTtcbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICAndXNlIHN0cmljdCc7IC8vIFVuaXZlcnNhbCBNb2R1bGUgRGVmaW5pdGlvbiAoVU1EKSB0byBzdXBwb3J0IEFNRCwgQ29tbW9uSlMvTm9kZS5qcywgUmhpbm8sIGFuZCBicm93c2Vycy5cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuXG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoJ3N0YWNrZnJhbWUnLCBbXSwgZmFjdG9yeSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIF8kc3RhY2tmcmFtZV8zMyA9PT0gJ29iamVjdCcpIHtcbiAgICBfJHN0YWNrZnJhbWVfMzMgPSBmYWN0b3J5KCk7XG4gIH0gZWxzZSB7XG4gICAgcm9vdC5TdGFja0ZyYW1lID0gZmFjdG9yeSgpO1xuICB9XG59KSh0aGlzLCBmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBmdW5jdGlvbiBfaXNOdW1iZXIobikge1xuICAgIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdChuKSkgJiYgaXNGaW5pdGUobik7XG4gIH1cblxuICBmdW5jdGlvbiBfY2FwaXRhbGl6ZShzdHIpIHtcbiAgICByZXR1cm4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnN1YnN0cmluZygxKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9nZXR0ZXIocCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpc1twXTtcbiAgICB9O1xuICB9XG5cbiAgdmFyIGJvb2xlYW5Qcm9wcyA9IFsnaXNDb25zdHJ1Y3RvcicsICdpc0V2YWwnLCAnaXNOYXRpdmUnLCAnaXNUb3BsZXZlbCddO1xuICB2YXIgbnVtZXJpY1Byb3BzID0gWydjb2x1bW5OdW1iZXInLCAnbGluZU51bWJlciddO1xuICB2YXIgc3RyaW5nUHJvcHMgPSBbJ2ZpbGVOYW1lJywgJ2Z1bmN0aW9uTmFtZScsICdzb3VyY2UnXTtcbiAgdmFyIGFycmF5UHJvcHMgPSBbJ2FyZ3MnXTtcbiAgdmFyIHByb3BzID0gYm9vbGVhblByb3BzLmNvbmNhdChudW1lcmljUHJvcHMsIHN0cmluZ1Byb3BzLCBhcnJheVByb3BzKTtcblxuICBmdW5jdGlvbiBTdGFja0ZyYW1lKG9iaikge1xuICAgIGlmIChvYmogaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wc1tpXSkgJiYgb2JqW3Byb3BzW2ldXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhpc1snc2V0JyArIF9jYXBpdGFsaXplKHByb3BzW2ldKV0ob2JqW3Byb3BzW2ldXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBTdGFja0ZyYW1lLnByb3RvdHlwZSA9IHtcbiAgICBnZXRBcmdzOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5hcmdzO1xuICAgIH0sXG4gICAgc2V0QXJnczogZnVuY3Rpb24gKHYpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodikgIT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJncyBtdXN0IGJlIGFuIEFycmF5Jyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYXJncyA9IHY7XG4gICAgfSxcbiAgICBnZXRFdmFsT3JpZ2luOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5ldmFsT3JpZ2luO1xuICAgIH0sXG4gICAgc2V0RXZhbE9yaWdpbjogZnVuY3Rpb24gKHYpIHtcbiAgICAgIGlmICh2IGluc3RhbmNlb2YgU3RhY2tGcmFtZSkge1xuICAgICAgICB0aGlzLmV2YWxPcmlnaW4gPSB2O1xuICAgICAgfSBlbHNlIGlmICh2IGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgIHRoaXMuZXZhbE9yaWdpbiA9IG5ldyBTdGFja0ZyYW1lKHYpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXZhbCBPcmlnaW4gbXVzdCBiZSBhbiBPYmplY3Qgb3IgU3RhY2tGcmFtZScpO1xuICAgICAgfVxuICAgIH0sXG4gICAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBmdW5jdGlvbk5hbWUgPSB0aGlzLmdldEZ1bmN0aW9uTmFtZSgpIHx8ICd7YW5vbnltb3VzfSc7XG4gICAgICB2YXIgYXJncyA9ICcoJyArICh0aGlzLmdldEFyZ3MoKSB8fCBbXSkuam9pbignLCcpICsgJyknO1xuICAgICAgdmFyIGZpbGVOYW1lID0gdGhpcy5nZXRGaWxlTmFtZSgpID8gJ0AnICsgdGhpcy5nZXRGaWxlTmFtZSgpIDogJyc7XG4gICAgICB2YXIgbGluZU51bWJlciA9IF9pc051bWJlcih0aGlzLmdldExpbmVOdW1iZXIoKSkgPyAnOicgKyB0aGlzLmdldExpbmVOdW1iZXIoKSA6ICcnO1xuICAgICAgdmFyIGNvbHVtbk51bWJlciA9IF9pc051bWJlcih0aGlzLmdldENvbHVtbk51bWJlcigpKSA/ICc6JyArIHRoaXMuZ2V0Q29sdW1uTnVtYmVyKCkgOiAnJztcbiAgICAgIHJldHVybiBmdW5jdGlvbk5hbWUgKyBhcmdzICsgZmlsZU5hbWUgKyBsaW5lTnVtYmVyICsgY29sdW1uTnVtYmVyO1xuICAgIH1cbiAgfTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGJvb2xlYW5Qcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIFN0YWNrRnJhbWUucHJvdG90eXBlWydnZXQnICsgX2NhcGl0YWxpemUoYm9vbGVhblByb3BzW2ldKV0gPSBfZ2V0dGVyKGJvb2xlYW5Qcm9wc1tpXSk7XG5cbiAgICBTdGFja0ZyYW1lLnByb3RvdHlwZVsnc2V0JyArIF9jYXBpdGFsaXplKGJvb2xlYW5Qcm9wc1tpXSldID0gZnVuY3Rpb24gKHApIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAodikge1xuICAgICAgICB0aGlzW3BdID0gQm9vbGVhbih2KTtcbiAgICAgIH07XG4gICAgfShib29sZWFuUHJvcHNbaV0pO1xuICB9XG5cbiAgZm9yICh2YXIgaiA9IDA7IGogPCBudW1lcmljUHJvcHMubGVuZ3RoOyBqKyspIHtcbiAgICBTdGFja0ZyYW1lLnByb3RvdHlwZVsnZ2V0JyArIF9jYXBpdGFsaXplKG51bWVyaWNQcm9wc1tqXSldID0gX2dldHRlcihudW1lcmljUHJvcHNbal0pO1xuXG4gICAgU3RhY2tGcmFtZS5wcm90b3R5cGVbJ3NldCcgKyBfY2FwaXRhbGl6ZShudW1lcmljUHJvcHNbal0pXSA9IGZ1bmN0aW9uIChwKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgaWYgKCFfaXNOdW1iZXIodikpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHAgKyAnIG11c3QgYmUgYSBOdW1iZXInKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXNbcF0gPSBOdW1iZXIodik7XG4gICAgICB9O1xuICAgIH0obnVtZXJpY1Byb3BzW2pdKTtcbiAgfVxuXG4gIGZvciAodmFyIGsgPSAwOyBrIDwgc3RyaW5nUHJvcHMubGVuZ3RoOyBrKyspIHtcbiAgICBTdGFja0ZyYW1lLnByb3RvdHlwZVsnZ2V0JyArIF9jYXBpdGFsaXplKHN0cmluZ1Byb3BzW2tdKV0gPSBfZ2V0dGVyKHN0cmluZ1Byb3BzW2tdKTtcblxuICAgIFN0YWNrRnJhbWUucHJvdG90eXBlWydzZXQnICsgX2NhcGl0YWxpemUoc3RyaW5nUHJvcHNba10pXSA9IGZ1bmN0aW9uIChwKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgdGhpc1twXSA9IFN0cmluZyh2KTtcbiAgICAgIH07XG4gICAgfShzdHJpbmdQcm9wc1trXSk7XG4gIH1cblxuICByZXR1cm4gU3RhY2tGcmFtZTtcbn0pO1xuXG52YXIgXyRlcnJvclN0YWNrUGFyc2VyXzMwID0ge307XG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgJ3VzZSBzdHJpY3QnOyAvLyBVbml2ZXJzYWwgTW9kdWxlIERlZmluaXRpb24gKFVNRCkgdG8gc3VwcG9ydCBBTUQsIENvbW1vbkpTL05vZGUuanMsIFJoaW5vLCBhbmQgYnJvd3NlcnMuXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cblxuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKCdlcnJvci1zdGFjay1wYXJzZXInLCBbJ3N0YWNrZnJhbWUnXSwgZmFjdG9yeSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIF8kZXJyb3JTdGFja1BhcnNlcl8zMCA9PT0gJ29iamVjdCcpIHtcbiAgICBfJGVycm9yU3RhY2tQYXJzZXJfMzAgPSBmYWN0b3J5KF8kc3RhY2tmcmFtZV8zMyk7XG4gIH0gZWxzZSB7XG4gICAgcm9vdC5FcnJvclN0YWNrUGFyc2VyID0gZmFjdG9yeShyb290LlN0YWNrRnJhbWUpO1xuICB9XG59KSh0aGlzLCBmdW5jdGlvbiBFcnJvclN0YWNrUGFyc2VyKFN0YWNrRnJhbWUpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBGSVJFRk9YX1NBRkFSSV9TVEFDS19SRUdFWFAgPSAvKF58QClcXFMrXFw6XFxkKy87XG4gIHZhciBDSFJPTUVfSUVfU1RBQ0tfUkVHRVhQID0gL15cXHMqYXQgLiooXFxTK1xcOlxcZCt8XFwobmF0aXZlXFwpKS9tO1xuICB2YXIgU0FGQVJJX05BVElWRV9DT0RFX1JFR0VYUCA9IC9eKGV2YWxAKT8oXFxbbmF0aXZlIGNvZGVcXF0pPyQvO1xuICByZXR1cm4ge1xuICAgIC8qKlxuICAgICAqIEdpdmVuIGFuIEVycm9yIG9iamVjdCwgZXh0cmFjdCB0aGUgbW9zdCBpbmZvcm1hdGlvbiBmcm9tIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtFcnJvcn0gZXJyb3Igb2JqZWN0XG4gICAgICogQHJldHVybiB7QXJyYXl9IG9mIFN0YWNrRnJhbWVzXG4gICAgICovXG4gICAgcGFyc2U6IGZ1bmN0aW9uIEVycm9yU3RhY2tQYXJzZXIkJHBhcnNlKGVycm9yKSB7XG4gICAgICBpZiAodHlwZW9mIGVycm9yLnN0YWNrdHJhY2UgIT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiBlcnJvclsnb3BlcmEjc291cmNlbG9jJ10gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlT3BlcmEoZXJyb3IpO1xuICAgICAgfSBlbHNlIGlmIChlcnJvci5zdGFjayAmJiBlcnJvci5zdGFjay5tYXRjaChDSFJPTUVfSUVfU1RBQ0tfUkVHRVhQKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZVY4T3JJRShlcnJvcik7XG4gICAgICB9IGVsc2UgaWYgKGVycm9yLnN0YWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlRkZPclNhZmFyaShlcnJvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBwYXJzZSBnaXZlbiBFcnJvciBvYmplY3QnKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIFNlcGFyYXRlIGxpbmUgYW5kIGNvbHVtbiBudW1iZXJzIGZyb20gYSBzdHJpbmcgb2YgdGhlIGZvcm06IChVUkk6TGluZTpDb2x1bW4pXG4gICAgZXh0cmFjdExvY2F0aW9uOiBmdW5jdGlvbiBFcnJvclN0YWNrUGFyc2VyJCRleHRyYWN0TG9jYXRpb24odXJsTGlrZSkge1xuICAgICAgLy8gRmFpbC1mYXN0IGJ1dCByZXR1cm4gbG9jYXRpb25zIGxpa2UgXCIobmF0aXZlKVwiXG4gICAgICBpZiAodXJsTGlrZS5pbmRleE9mKCc6JykgPT09IC0xKSB7XG4gICAgICAgIHJldHVybiBbdXJsTGlrZV07XG4gICAgICB9XG5cbiAgICAgIHZhciByZWdFeHAgPSAvKC4rPykoPzpcXDooXFxkKykpPyg/OlxcOihcXGQrKSk/JC87XG4gICAgICB2YXIgcGFydHMgPSByZWdFeHAuZXhlYyh1cmxMaWtlLnJlcGxhY2UoL1tcXChcXCldL2csICcnKSk7XG4gICAgICByZXR1cm4gW3BhcnRzWzFdLCBwYXJ0c1syXSB8fCB1bmRlZmluZWQsIHBhcnRzWzNdIHx8IHVuZGVmaW5lZF07XG4gICAgfSxcbiAgICBwYXJzZVY4T3JJRTogZnVuY3Rpb24gRXJyb3JTdGFja1BhcnNlciQkcGFyc2VWOE9ySUUoZXJyb3IpIHtcbiAgICAgIHZhciBmaWx0ZXJlZCA9IGVycm9yLnN0YWNrLnNwbGl0KCdcXG4nKS5maWx0ZXIoZnVuY3Rpb24gKGxpbmUpIHtcbiAgICAgICAgcmV0dXJuICEhbGluZS5tYXRjaChDSFJPTUVfSUVfU1RBQ0tfUkVHRVhQKTtcbiAgICAgIH0sIHRoaXMpO1xuICAgICAgcmV0dXJuIGZpbHRlcmVkLm1hcChmdW5jdGlvbiAobGluZSkge1xuICAgICAgICBpZiAobGluZS5pbmRleE9mKCcoZXZhbCAnKSA+IC0xKSB7XG4gICAgICAgICAgLy8gVGhyb3cgYXdheSBldmFsIGluZm9ybWF0aW9uIHVudGlsIHdlIGltcGxlbWVudCBzdGFja3RyYWNlLmpzL3N0YWNrZnJhbWUjOFxuICAgICAgICAgIGxpbmUgPSBsaW5lLnJlcGxhY2UoL2V2YWwgY29kZS9nLCAnZXZhbCcpLnJlcGxhY2UoLyhcXChldmFsIGF0IFteXFwoKV0qKXwoXFwpXFwsLiokKS9nLCAnJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2FuaXRpemVkTGluZSA9IGxpbmUucmVwbGFjZSgvXlxccysvLCAnJykucmVwbGFjZSgvXFwoZXZhbCBjb2RlL2csICcoJyk7IC8vIGNhcHR1cmUgYW5kIHByZXNldmUgdGhlIHBhcmVudGhlc2l6ZWQgbG9jYXRpb24gXCIoL2Zvby9teSBiYXIuanM6MTI6ODcpXCIgaW5cbiAgICAgICAgLy8gY2FzZSBpdCBoYXMgc3BhY2VzIGluIGl0LCBhcyB0aGUgc3RyaW5nIGlzIHNwbGl0IG9uIFxccysgbGF0ZXIgb25cblxuICAgICAgICB2YXIgbG9jYXRpb24gPSBzYW5pdGl6ZWRMaW5lLm1hdGNoKC8gKFxcKCguKyk6KFxcZCspOihcXGQrKVxcKSQpLyk7IC8vIHJlbW92ZSB0aGUgcGFyZW50aGVzaXplZCBsb2NhdGlvbiBmcm9tIHRoZSBsaW5lLCBpZiBpdCB3YXMgbWF0Y2hlZFxuXG4gICAgICAgIHNhbml0aXplZExpbmUgPSBsb2NhdGlvbiA/IHNhbml0aXplZExpbmUucmVwbGFjZShsb2NhdGlvblswXSwgJycpIDogc2FuaXRpemVkTGluZTtcbiAgICAgICAgdmFyIHRva2VucyA9IHNhbml0aXplZExpbmUuc3BsaXQoL1xccysvKS5zbGljZSgxKTsgLy8gaWYgYSBsb2NhdGlvbiB3YXMgbWF0Y2hlZCwgcGFzcyBpdCB0byBleHRyYWN0TG9jYXRpb24oKSBvdGhlcndpc2UgcG9wIHRoZSBsYXN0IHRva2VuXG5cbiAgICAgICAgdmFyIGxvY2F0aW9uUGFydHMgPSB0aGlzLmV4dHJhY3RMb2NhdGlvbihsb2NhdGlvbiA/IGxvY2F0aW9uWzFdIDogdG9rZW5zLnBvcCgpKTtcbiAgICAgICAgdmFyIGZ1bmN0aW9uTmFtZSA9IHRva2Vucy5qb2luKCcgJykgfHwgdW5kZWZpbmVkO1xuICAgICAgICB2YXIgZmlsZU5hbWUgPSBbJ2V2YWwnLCAnPGFub255bW91cz4nXS5pbmRleE9mKGxvY2F0aW9uUGFydHNbMF0pID4gLTEgPyB1bmRlZmluZWQgOiBsb2NhdGlvblBhcnRzWzBdO1xuICAgICAgICByZXR1cm4gbmV3IFN0YWNrRnJhbWUoe1xuICAgICAgICAgIGZ1bmN0aW9uTmFtZTogZnVuY3Rpb25OYW1lLFxuICAgICAgICAgIGZpbGVOYW1lOiBmaWxlTmFtZSxcbiAgICAgICAgICBsaW5lTnVtYmVyOiBsb2NhdGlvblBhcnRzWzFdLFxuICAgICAgICAgIGNvbHVtbk51bWJlcjogbG9jYXRpb25QYXJ0c1syXSxcbiAgICAgICAgICBzb3VyY2U6IGxpbmVcbiAgICAgICAgfSk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9LFxuICAgIHBhcnNlRkZPclNhZmFyaTogZnVuY3Rpb24gRXJyb3JTdGFja1BhcnNlciQkcGFyc2VGRk9yU2FmYXJpKGVycm9yKSB7XG4gICAgICB2YXIgZmlsdGVyZWQgPSBlcnJvci5zdGFjay5zcGxpdCgnXFxuJykuZmlsdGVyKGZ1bmN0aW9uIChsaW5lKSB7XG4gICAgICAgIHJldHVybiAhbGluZS5tYXRjaChTQUZBUklfTkFUSVZFX0NPREVfUkVHRVhQKTtcbiAgICAgIH0sIHRoaXMpO1xuICAgICAgcmV0dXJuIGZpbHRlcmVkLm1hcChmdW5jdGlvbiAobGluZSkge1xuICAgICAgICAvLyBUaHJvdyBhd2F5IGV2YWwgaW5mb3JtYXRpb24gdW50aWwgd2UgaW1wbGVtZW50IHN0YWNrdHJhY2UuanMvc3RhY2tmcmFtZSM4XG4gICAgICAgIGlmIChsaW5lLmluZGV4T2YoJyA+IGV2YWwnKSA+IC0xKSB7XG4gICAgICAgICAgbGluZSA9IGxpbmUucmVwbGFjZSgvIGxpbmUgKFxcZCspKD86ID4gZXZhbCBsaW5lIFxcZCspKiA+IGV2YWxcXDpcXGQrXFw6XFxkKy9nLCAnOiQxJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGluZS5pbmRleE9mKCdAJykgPT09IC0xICYmIGxpbmUuaW5kZXhPZignOicpID09PSAtMSkge1xuICAgICAgICAgIC8vIFNhZmFyaSBldmFsIGZyYW1lcyBvbmx5IGhhdmUgZnVuY3Rpb24gbmFtZXMgYW5kIG5vdGhpbmcgZWxzZVxuICAgICAgICAgIHJldHVybiBuZXcgU3RhY2tGcmFtZSh7XG4gICAgICAgICAgICBmdW5jdGlvbk5hbWU6IGxpbmVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgZnVuY3Rpb25OYW1lUmVnZXggPSAvKCguKlwiLitcIlteQF0qKT9bXkBdKikoPzpAKS87XG4gICAgICAgICAgdmFyIG1hdGNoZXMgPSBsaW5lLm1hdGNoKGZ1bmN0aW9uTmFtZVJlZ2V4KTtcbiAgICAgICAgICB2YXIgZnVuY3Rpb25OYW1lID0gbWF0Y2hlcyAmJiBtYXRjaGVzWzFdID8gbWF0Y2hlc1sxXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICB2YXIgbG9jYXRpb25QYXJ0cyA9IHRoaXMuZXh0cmFjdExvY2F0aW9uKGxpbmUucmVwbGFjZShmdW5jdGlvbk5hbWVSZWdleCwgJycpKTtcbiAgICAgICAgICByZXR1cm4gbmV3IFN0YWNrRnJhbWUoe1xuICAgICAgICAgICAgZnVuY3Rpb25OYW1lOiBmdW5jdGlvbk5hbWUsXG4gICAgICAgICAgICBmaWxlTmFtZTogbG9jYXRpb25QYXJ0c1swXSxcbiAgICAgICAgICAgIGxpbmVOdW1iZXI6IGxvY2F0aW9uUGFydHNbMV0sXG4gICAgICAgICAgICBjb2x1bW5OdW1iZXI6IGxvY2F0aW9uUGFydHNbMl0sXG4gICAgICAgICAgICBzb3VyY2U6IGxpbmVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcyk7XG4gICAgfSxcbiAgICBwYXJzZU9wZXJhOiBmdW5jdGlvbiBFcnJvclN0YWNrUGFyc2VyJCRwYXJzZU9wZXJhKGUpIHtcbiAgICAgIGlmICghZS5zdGFja3RyYWNlIHx8IGUubWVzc2FnZS5pbmRleE9mKCdcXG4nKSA+IC0xICYmIGUubWVzc2FnZS5zcGxpdCgnXFxuJykubGVuZ3RoID4gZS5zdGFja3RyYWNlLnNwbGl0KCdcXG4nKS5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VPcGVyYTkoZSk7XG4gICAgICB9IGVsc2UgaWYgKCFlLnN0YWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlT3BlcmExMChlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlT3BlcmExMShlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHBhcnNlT3BlcmE5OiBmdW5jdGlvbiBFcnJvclN0YWNrUGFyc2VyJCRwYXJzZU9wZXJhOShlKSB7XG4gICAgICB2YXIgbGluZVJFID0gL0xpbmUgKFxcZCspLipzY3JpcHQgKD86aW4gKT8oXFxTKykvaTtcbiAgICAgIHZhciBsaW5lcyA9IGUubWVzc2FnZS5zcGxpdCgnXFxuJyk7XG4gICAgICB2YXIgcmVzdWx0ID0gW107XG5cbiAgICAgIGZvciAodmFyIGkgPSAyLCBsZW4gPSBsaW5lcy5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMikge1xuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lUkUuZXhlYyhsaW5lc1tpXSk7XG5cbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2gobmV3IFN0YWNrRnJhbWUoe1xuICAgICAgICAgICAgZmlsZU5hbWU6IG1hdGNoWzJdLFxuICAgICAgICAgICAgbGluZU51bWJlcjogbWF0Y2hbMV0sXG4gICAgICAgICAgICBzb3VyY2U6IGxpbmVzW2ldXG4gICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcbiAgICBwYXJzZU9wZXJhMTA6IGZ1bmN0aW9uIEVycm9yU3RhY2tQYXJzZXIkJHBhcnNlT3BlcmExMChlKSB7XG4gICAgICB2YXIgbGluZVJFID0gL0xpbmUgKFxcZCspLipzY3JpcHQgKD86aW4gKT8oXFxTKykoPzo6IEluIGZ1bmN0aW9uIChcXFMrKSk/JC9pO1xuICAgICAgdmFyIGxpbmVzID0gZS5zdGFja3RyYWNlLnNwbGl0KCdcXG4nKTtcbiAgICAgIHZhciByZXN1bHQgPSBbXTtcblxuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGxpbmVzLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAyKSB7XG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmVSRS5leGVjKGxpbmVzW2ldKTtcblxuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICByZXN1bHQucHVzaChuZXcgU3RhY2tGcmFtZSh7XG4gICAgICAgICAgICBmdW5jdGlvbk5hbWU6IG1hdGNoWzNdIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGZpbGVOYW1lOiBtYXRjaFsyXSxcbiAgICAgICAgICAgIGxpbmVOdW1iZXI6IG1hdGNoWzFdLFxuICAgICAgICAgICAgc291cmNlOiBsaW5lc1tpXVxuICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG4gICAgLy8gT3BlcmEgMTAuNjUrIEVycm9yLnN0YWNrIHZlcnkgc2ltaWxhciB0byBGRi9TYWZhcmlcbiAgICBwYXJzZU9wZXJhMTE6IGZ1bmN0aW9uIEVycm9yU3RhY2tQYXJzZXIkJHBhcnNlT3BlcmExMShlcnJvcikge1xuICAgICAgdmFyIGZpbHRlcmVkID0gZXJyb3Iuc3RhY2suc3BsaXQoJ1xcbicpLmZpbHRlcihmdW5jdGlvbiAobGluZSkge1xuICAgICAgICByZXR1cm4gISFsaW5lLm1hdGNoKEZJUkVGT1hfU0FGQVJJX1NUQUNLX1JFR0VYUCkgJiYgIWxpbmUubWF0Y2goL15FcnJvciBjcmVhdGVkIGF0Lyk7XG4gICAgICB9LCB0aGlzKTtcbiAgICAgIHJldHVybiBmaWx0ZXJlZC5tYXAoZnVuY3Rpb24gKGxpbmUpIHtcbiAgICAgICAgdmFyIHRva2VucyA9IGxpbmUuc3BsaXQoJ0AnKTtcbiAgICAgICAgdmFyIGxvY2F0aW9uUGFydHMgPSB0aGlzLmV4dHJhY3RMb2NhdGlvbih0b2tlbnMucG9wKCkpO1xuICAgICAgICB2YXIgZnVuY3Rpb25DYWxsID0gdG9rZW5zLnNoaWZ0KCkgfHwgJyc7XG4gICAgICAgIHZhciBmdW5jdGlvbk5hbWUgPSBmdW5jdGlvbkNhbGwucmVwbGFjZSgvPGFub255bW91cyBmdW5jdGlvbig6IChcXHcrKSk/Pi8sICckMicpLnJlcGxhY2UoL1xcKFteXFwpXSpcXCkvZywgJycpIHx8IHVuZGVmaW5lZDtcbiAgICAgICAgdmFyIGFyZ3NSYXc7XG5cbiAgICAgICAgaWYgKGZ1bmN0aW9uQ2FsbC5tYXRjaCgvXFwoKFteXFwpXSopXFwpLykpIHtcbiAgICAgICAgICBhcmdzUmF3ID0gZnVuY3Rpb25DYWxsLnJlcGxhY2UoL15bXlxcKF0rXFwoKFteXFwpXSopXFwpJC8sICckMScpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFyZ3MgPSBhcmdzUmF3ID09PSB1bmRlZmluZWQgfHwgYXJnc1JhdyA9PT0gJ1thcmd1bWVudHMgbm90IGF2YWlsYWJsZV0nID8gdW5kZWZpbmVkIDogYXJnc1Jhdy5zcGxpdCgnLCcpO1xuICAgICAgICByZXR1cm4gbmV3IFN0YWNrRnJhbWUoe1xuICAgICAgICAgIGZ1bmN0aW9uTmFtZTogZnVuY3Rpb25OYW1lLFxuICAgICAgICAgIGFyZ3M6IGFyZ3MsXG4gICAgICAgICAgZmlsZU5hbWU6IGxvY2F0aW9uUGFydHNbMF0sXG4gICAgICAgICAgbGluZU51bWJlcjogbG9jYXRpb25QYXJ0c1sxXSxcbiAgICAgICAgICBjb2x1bW5OdW1iZXI6IGxvY2F0aW9uUGFydHNbMl0sXG4gICAgICAgICAgc291cmNlOiBsaW5lXG4gICAgICAgIH0pO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfVxuICB9O1xufSk7XG5cbnZhciBfJGVycm9yU3RhY2tQYXJzZXJfMTAgPSBfJGVycm9yU3RhY2tQYXJzZXJfMzA7XG5cbi8vIEdpdmVuIGBlcnJgIHdoaWNoIG1heSBiZSBhbiBlcnJvciwgZG9lcyBpdCBoYXZlIGEgc3RhY2sgcHJvcGVydHkgd2hpY2ggaXMgYSBzdHJpbmc/XG52YXIgXyRoYXNTdGFja18xOCA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgcmV0dXJuICEhZXJyICYmICghIWVyci5zdGFjayB8fCAhIWVyci5zdGFja3RyYWNlIHx8ICEhZXJyWydvcGVyYSNzb3VyY2Vsb2MnXSkgJiYgdHlwZW9mIChlcnIuc3RhY2sgfHwgZXJyLnN0YWNrdHJhY2UgfHwgZXJyWydvcGVyYSNzb3VyY2Vsb2MnXSkgPT09ICdzdHJpbmcnICYmIGVyci5zdGFjayAhPT0gZXJyLm5hbWUgKyBcIjogXCIgKyBlcnIubWVzc2FnZTtcbn07XG5cbi8qKlxuICogRXhwb3NlIGBpc0Vycm9yYC5cbiAqL1xudmFyIF8kaXNFcnJvcl8zMSA9IGlzRXJyb3I7XG4vKipcbiAqIFRlc3Qgd2hldGhlciBgdmFsdWVgIGlzIGVycm9yIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuXG5mdW5jdGlvbiBpc0Vycm9yKHZhbHVlKSB7XG4gIHN3aXRjaCAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSkge1xuICAgIGNhc2UgJ1tvYmplY3QgRXJyb3JdJzpcbiAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgY2FzZSAnW29iamVjdCBFeGNlcHRpb25dJzpcbiAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgY2FzZSAnW29iamVjdCBET01FeGNlcHRpb25dJzpcbiAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIEVycm9yO1xuICB9XG59XG5cbnZhciBfJGlzZXJyb3JfMTkgPSBfJGlzRXJyb3JfMzE7XG5cbi8qIHJlbW92ZWQ6IHZhciBfJGFzc2lnbl8xMSA9IHJlcXVpcmUoJy4vZXMtdXRpbHMvYXNzaWduJyk7ICovO1xuXG52YXIgYWRkID0gZnVuY3Rpb24gKHN0YXRlLCBzZWN0aW9uLCBrZXlPck9iaiwgbWF5YmVWYWwpIHtcbiAgdmFyIF91cGRhdGVzO1xuXG4gIGlmICghc2VjdGlvbikgcmV0dXJuO1xuICB2YXIgdXBkYXRlczsgLy8gYWRkTWV0YWRhdGEoXCJzZWN0aW9uXCIsIG51bGwpIC0+IGNsZWFycyBzZWN0aW9uXG5cbiAgaWYgKGtleU9yT2JqID09PSBudWxsKSByZXR1cm4gY2xlYXIoc3RhdGUsIHNlY3Rpb24pOyAvLyBub3JtYWxpc2UgdGhlIHR3byBzdXBwb3J0ZWQgaW5wdXQgdHlwZXMgaW50byBvYmplY3QgZm9ybVxuXG4gIGlmICh0eXBlb2Yga2V5T3JPYmogPT09ICdvYmplY3QnKSB1cGRhdGVzID0ga2V5T3JPYmo7XG4gIGlmICh0eXBlb2Yga2V5T3JPYmogPT09ICdzdHJpbmcnKSB1cGRhdGVzID0gKF91cGRhdGVzID0ge30sIF91cGRhdGVzW2tleU9yT2JqXSA9IG1heWJlVmFsLCBfdXBkYXRlcyk7IC8vIGV4aXQgaWYgd2UgZG9uJ3QgaGF2ZSBhbiB1cGRhdGVzIG9iamVjdCBhdCB0aGlzIHBvaW50XG5cbiAgaWYgKCF1cGRhdGVzKSByZXR1cm47IC8vIGVuc3VyZSBhIHNlY3Rpb24gd2l0aCB0aGlzIG5hbWUgZXhpc3RzXG5cbiAgaWYgKCFzdGF0ZVtzZWN0aW9uXSkgc3RhdGVbc2VjdGlvbl0gPSB7fTsgLy8gbWVyZ2UgdGhlIHVwZGF0ZXMgd2l0aCB0aGUgZXhpc3Rpbmcgc2VjdGlvblxuXG4gIHN0YXRlW3NlY3Rpb25dID0gXyRhc3NpZ25fMTEoe30sIHN0YXRlW3NlY3Rpb25dLCB1cGRhdGVzKTtcbn07XG5cbnZhciBnZXQgPSBmdW5jdGlvbiAoc3RhdGUsIHNlY3Rpb24sIGtleSkge1xuICBpZiAodHlwZW9mIHNlY3Rpb24gIT09ICdzdHJpbmcnKSByZXR1cm4gdW5kZWZpbmVkO1xuXG4gIGlmICgha2V5KSB7XG4gICAgcmV0dXJuIHN0YXRlW3NlY3Rpb25dO1xuICB9XG5cbiAgaWYgKHN0YXRlW3NlY3Rpb25dKSB7XG4gICAgcmV0dXJuIHN0YXRlW3NlY3Rpb25dW2tleV07XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufTtcblxudmFyIGNsZWFyID0gZnVuY3Rpb24gKHN0YXRlLCBzZWN0aW9uLCBrZXkpIHtcbiAgaWYgKHR5cGVvZiBzZWN0aW9uICE9PSAnc3RyaW5nJykgcmV0dXJuOyAvLyBjbGVhciBhbiBlbnRpcmUgc2VjdGlvblxuXG4gIGlmICgha2V5KSB7XG4gICAgZGVsZXRlIHN0YXRlW3NlY3Rpb25dO1xuICAgIHJldHVybjtcbiAgfSAvLyBjbGVhciBhIHNpbmdsZSB2YWx1ZSBmcm9tIGEgc2VjdGlvblxuXG5cbiAgaWYgKHN0YXRlW3NlY3Rpb25dKSB7XG4gICAgZGVsZXRlIHN0YXRlW3NlY3Rpb25dW2tleV07XG4gIH1cbn07XG5cbnZhciBfJG1ldGFkYXRhRGVsZWdhdGVfMjEgPSB7XG4gIGFkZDogYWRkLFxuICBnZXQ6IGdldCxcbiAgY2xlYXI6IGNsZWFyXG59O1xuXG52YXIgXyRzdGFja0dlbmVyYXRvcl8zMiA9IHt9O1xuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG4gICd1c2Ugc3RyaWN0JzsgLy8gVW5pdmVyc2FsIE1vZHVsZSBEZWZpbml0aW9uIChVTUQpIHRvIHN1cHBvcnQgQU1ELCBDb21tb25KUy9Ob2RlLmpzLCBSaGlubywgYW5kIGJyb3dzZXJzLlxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5cbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZSgnc3RhY2stZ2VuZXJhdG9yJywgWydzdGFja2ZyYW1lJ10sIGZhY3RvcnkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBfJHN0YWNrR2VuZXJhdG9yXzMyID09PSAnb2JqZWN0Jykge1xuICAgIF8kc3RhY2tHZW5lcmF0b3JfMzIgPSBmYWN0b3J5KF8kc3RhY2tmcmFtZV8zMyk7XG4gIH0gZWxzZSB7XG4gICAgcm9vdC5TdGFja0dlbmVyYXRvciA9IGZhY3Rvcnkocm9vdC5TdGFja0ZyYW1lKTtcbiAgfVxufSkodGhpcywgZnVuY3Rpb24gKFN0YWNrRnJhbWUpIHtcbiAgcmV0dXJuIHtcbiAgICBiYWNrdHJhY2U6IGZ1bmN0aW9uIFN0YWNrR2VuZXJhdG9yJCRiYWNrdHJhY2Uob3B0cykge1xuICAgICAgdmFyIHN0YWNrID0gW107XG4gICAgICB2YXIgbWF4U3RhY2tTaXplID0gMTA7XG5cbiAgICAgIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG9wdHMubWF4U3RhY2tTaXplID09PSAnbnVtYmVyJykge1xuICAgICAgICBtYXhTdGFja1NpemUgPSBvcHRzLm1heFN0YWNrU2l6ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIGN1cnIgPSBhcmd1bWVudHMuY2FsbGVlO1xuXG4gICAgICB3aGlsZSAoY3VyciAmJiBzdGFjay5sZW5ndGggPCBtYXhTdGFja1NpemUgJiYgY3VyclsnYXJndW1lbnRzJ10pIHtcbiAgICAgICAgLy8gQWxsb3cgVjggb3B0aW1pemF0aW9uc1xuICAgICAgICB2YXIgYXJncyA9IG5ldyBBcnJheShjdXJyWydhcmd1bWVudHMnXS5sZW5ndGgpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGFyZ3NbaV0gPSBjdXJyWydhcmd1bWVudHMnXVtpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgvZnVuY3Rpb24oPzpcXHMrKFtcXHckXSspKStcXHMqXFwoLy50ZXN0KGN1cnIudG9TdHJpbmcoKSkpIHtcbiAgICAgICAgICBzdGFjay5wdXNoKG5ldyBTdGFja0ZyYW1lKHtcbiAgICAgICAgICAgIGZ1bmN0aW9uTmFtZTogUmVnRXhwLiQxIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGFyZ3M6IGFyZ3NcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RhY2sucHVzaChuZXcgU3RhY2tGcmFtZSh7XG4gICAgICAgICAgICBhcmdzOiBhcmdzXG4gICAgICAgICAgfSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjdXJyID0gY3Vyci5jYWxsZXI7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3RhY2s7XG4gICAgfVxuICB9O1xufSk7XG5cbi8qIHJlbW92ZWQ6IHZhciBfJGVycm9yU3RhY2tQYXJzZXJfMTAgPSByZXF1aXJlKCcuL2xpYi9lcnJvci1zdGFjay1wYXJzZXInKTsgKi87XG5cbi8qIHJlbW92ZWQ6IHZhciBfJHN0YWNrR2VuZXJhdG9yXzMyID0gcmVxdWlyZSgnc3RhY2stZ2VuZXJhdG9yJyk7ICovO1xuXG4vKiByZW1vdmVkOiB2YXIgXyRoYXNTdGFja18xOCA9IHJlcXVpcmUoJy4vbGliL2hhcy1zdGFjaycpOyAqLztcblxuLyogcmVtb3ZlZDogdmFyIF8kbWFwXzE2ID0gcmVxdWlyZSgnLi9saWIvZXMtdXRpbHMvbWFwJyk7ICovO1xuXG4vKiByZW1vdmVkOiB2YXIgXyRyZWR1Y2VfMTcgPSByZXF1aXJlKCcuL2xpYi9lcy11dGlscy9yZWR1Y2UnKTsgKi87XG5cbi8qIHJlbW92ZWQ6IHZhciBfJGZpbHRlcl8xMiA9IHJlcXVpcmUoJy4vbGliL2VzLXV0aWxzL2ZpbHRlcicpOyAqLztcblxuLyogcmVtb3ZlZDogdmFyIF8kYXNzaWduXzExID0gcmVxdWlyZSgnLi9saWIvZXMtdXRpbHMvYXNzaWduJyk7ICovO1xuXG4vKiByZW1vdmVkOiB2YXIgXyRtZXRhZGF0YURlbGVnYXRlXzIxID0gcmVxdWlyZSgnLi9saWIvbWV0YWRhdGEtZGVsZWdhdGUnKTsgKi87XG5cbi8qIHJlbW92ZWQ6IHZhciBfJGlzZXJyb3JfMTkgPSByZXF1aXJlKCcuL2xpYi9pc2Vycm9yJyk7ICovO1xuXG52YXIgRXZlbnQgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBFdmVudChlcnJvckNsYXNzLCBlcnJvck1lc3NhZ2UsIHN0YWNrdHJhY2UsIGhhbmRsZWRTdGF0ZSwgb3JpZ2luYWxFcnJvcikge1xuICAgIGlmIChzdGFja3RyYWNlID09PSB2b2lkIDApIHtcbiAgICAgIHN0YWNrdHJhY2UgPSBbXTtcbiAgICB9XG5cbiAgICBpZiAoaGFuZGxlZFN0YXRlID09PSB2b2lkIDApIHtcbiAgICAgIGhhbmRsZWRTdGF0ZSA9IGRlZmF1bHRIYW5kbGVkU3RhdGUoKTtcbiAgICB9XG5cbiAgICB0aGlzLmFwaUtleSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmNvbnRleHQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5ncm91cGluZ0hhc2ggPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5vcmlnaW5hbEVycm9yID0gb3JpZ2luYWxFcnJvcjtcbiAgICB0aGlzLl9oYW5kbGVkU3RhdGUgPSBoYW5kbGVkU3RhdGU7XG4gICAgdGhpcy5zZXZlcml0eSA9IHRoaXMuX2hhbmRsZWRTdGF0ZS5zZXZlcml0eTtcbiAgICB0aGlzLnVuaGFuZGxlZCA9IHRoaXMuX2hhbmRsZWRTdGF0ZS51bmhhbmRsZWQ7XG4gICAgdGhpcy5hcHAgPSB7fTtcbiAgICB0aGlzLmRldmljZSA9IHt9O1xuICAgIHRoaXMucmVxdWVzdCA9IHt9O1xuICAgIHRoaXMuYnJlYWRjcnVtYnMgPSBbXTtcbiAgICB0aGlzLnRocmVhZHMgPSBbXTtcbiAgICB0aGlzLl9tZXRhZGF0YSA9IHt9O1xuICAgIHRoaXMuX3VzZXIgPSB7fTtcbiAgICB0aGlzLl9zZXNzaW9uID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZXJyb3JzID0gW3tcbiAgICAgIGVycm9yQ2xhc3M6IGVuc3VyZVN0cmluZyhlcnJvckNsYXNzKSxcbiAgICAgIGVycm9yTWVzc2FnZTogZW5zdXJlU3RyaW5nKGVycm9yTWVzc2FnZSksXG4gICAgICB0eXBlOiBFdmVudC5fX3R5cGUsXG4gICAgICBzdGFja3RyYWNlOiBfJHJlZHVjZV8xNyhzdGFja3RyYWNlLCBmdW5jdGlvbiAoYWNjdW0sIGZyYW1lKSB7XG4gICAgICAgIHZhciBmID0gZm9ybWF0U3RhY2tmcmFtZShmcmFtZSk7IC8vIGRvbid0IGluY2x1ZGUgYSBzdGFja2ZyYW1lIGlmIG5vbmUgb2YgaXRzIHByb3BlcnRpZXMgYXJlIGRlZmluZWRcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmIChKU09OLnN0cmluZ2lmeShmKSA9PT0gJ3t9JykgcmV0dXJuIGFjY3VtO1xuICAgICAgICAgIHJldHVybiBhY2N1bS5jb25jYXQoZik7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICByZXR1cm4gYWNjdW07XG4gICAgICAgIH1cbiAgICAgIH0sIFtdKVxuICAgIH1dOyAvLyBGbGFncy5cbiAgICAvLyBOb3RlIHRoZXNlIGFyZSBub3QgaW5pdGlhbGlzZWQgdW5sZXNzIHRoZXkgYXJlIHVzZWRcbiAgICAvLyB0byBzYXZlIHVubmVjZXNzYXJ5IGJ5dGVzIGluIHRoZSBicm93c2VyIGJ1bmRsZVxuXG4gICAgLyogdGhpcy5hdHRlbXB0SW1tZWRpYXRlRGVsaXZlcnksIGRlZmF1bHQ6IHRydWUgKi9cbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBFdmVudC5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmFkZE1ldGFkYXRhID0gZnVuY3Rpb24gYWRkTWV0YWRhdGEoc2VjdGlvbiwga2V5T3JPYmosIG1heWJlVmFsKSB7XG4gICAgcmV0dXJuIF8kbWV0YWRhdGFEZWxlZ2F0ZV8yMS5hZGQodGhpcy5fbWV0YWRhdGEsIHNlY3Rpb24sIGtleU9yT2JqLCBtYXliZVZhbCk7XG4gIH07XG5cbiAgX3Byb3RvLmdldE1ldGFkYXRhID0gZnVuY3Rpb24gZ2V0TWV0YWRhdGEoc2VjdGlvbiwga2V5KSB7XG4gICAgcmV0dXJuIF8kbWV0YWRhdGFEZWxlZ2F0ZV8yMS5nZXQodGhpcy5fbWV0YWRhdGEsIHNlY3Rpb24sIGtleSk7XG4gIH07XG5cbiAgX3Byb3RvLmNsZWFyTWV0YWRhdGEgPSBmdW5jdGlvbiBjbGVhck1ldGFkYXRhKHNlY3Rpb24sIGtleSkge1xuICAgIHJldHVybiBfJG1ldGFkYXRhRGVsZWdhdGVfMjEuY2xlYXIodGhpcy5fbWV0YWRhdGEsIHNlY3Rpb24sIGtleSk7XG4gIH07XG5cbiAgX3Byb3RvLmdldFVzZXIgPSBmdW5jdGlvbiBnZXRVc2VyKCkge1xuICAgIHJldHVybiB0aGlzLl91c2VyO1xuICB9O1xuXG4gIF9wcm90by5zZXRVc2VyID0gZnVuY3Rpb24gc2V0VXNlcihpZCwgZW1haWwsIG5hbWUpIHtcbiAgICB0aGlzLl91c2VyID0ge1xuICAgICAgaWQ6IGlkLFxuICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgbmFtZTogbmFtZVxuICAgIH07XG4gIH07XG5cbiAgX3Byb3RvLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcGF5bG9hZFZlcnNpb246ICc0JyxcbiAgICAgIGV4Y2VwdGlvbnM6IF8kbWFwXzE2KHRoaXMuZXJyb3JzLCBmdW5jdGlvbiAoZXIpIHtcbiAgICAgICAgcmV0dXJuIF8kYXNzaWduXzExKHt9LCBlciwge1xuICAgICAgICAgIG1lc3NhZ2U6IGVyLmVycm9yTWVzc2FnZVxuICAgICAgICB9KTtcbiAgICAgIH0pLFxuICAgICAgc2V2ZXJpdHk6IHRoaXMuc2V2ZXJpdHksXG4gICAgICB1bmhhbmRsZWQ6IHRoaXMuX2hhbmRsZWRTdGF0ZS51bmhhbmRsZWQsXG4gICAgICBzZXZlcml0eVJlYXNvbjogdGhpcy5faGFuZGxlZFN0YXRlLnNldmVyaXR5UmVhc29uLFxuICAgICAgYXBwOiB0aGlzLmFwcCxcbiAgICAgIGRldmljZTogdGhpcy5kZXZpY2UsXG4gICAgICByZXF1ZXN0OiB0aGlzLnJlcXVlc3QsXG4gICAgICBicmVhZGNydW1iczogdGhpcy5icmVhZGNydW1icyxcbiAgICAgIGNvbnRleHQ6IHRoaXMuY29udGV4dCxcbiAgICAgIGdyb3VwaW5nSGFzaDogdGhpcy5ncm91cGluZ0hhc2gsXG4gICAgICBtZXRhRGF0YTogdGhpcy5fbWV0YWRhdGEsXG4gICAgICB1c2VyOiB0aGlzLl91c2VyLFxuICAgICAgc2Vzc2lvbjogdGhpcy5fc2Vzc2lvblxuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIEV2ZW50O1xufSgpOyAvLyB0YWtlcyBhIHN0YWNrdHJhY2UuanMgc3R5bGUgc3RhY2tmcmFtZSAoaHR0cHM6Ly9naXRodWIuY29tL3N0YWNrdHJhY2Vqcy9zdGFja2ZyYW1lKVxuLy8gYW5kIHJldHVybnMgYSBCdWdzbmFnIGNvbXBhdGlibGUgc3RhY2tmcmFtZSAoaHR0cHM6Ly9kb2NzLmJ1Z3NuYWcuY29tL2FwaS9lcnJvci1yZXBvcnRpbmcvI2pzb24tcGF5bG9hZClcblxuXG52YXIgZm9ybWF0U3RhY2tmcmFtZSA9IGZ1bmN0aW9uIChmcmFtZSkge1xuICB2YXIgZiA9IHtcbiAgICBmaWxlOiBmcmFtZS5maWxlTmFtZSxcbiAgICBtZXRob2Q6IG5vcm1hbGlzZUZ1bmN0aW9uTmFtZShmcmFtZS5mdW5jdGlvbk5hbWUpLFxuICAgIGxpbmVOdW1iZXI6IGZyYW1lLmxpbmVOdW1iZXIsXG4gICAgY29sdW1uTnVtYmVyOiBmcmFtZS5jb2x1bW5OdW1iZXIsXG4gICAgY29kZTogdW5kZWZpbmVkLFxuICAgIGluUHJvamVjdDogdW5kZWZpbmVkXG4gIH07IC8vIFNvbWUgaW5zdGFuY2VzIHJlc3VsdCBpbiBubyBmaWxlOlxuICAvLyAtIGNhbGxpbmcgbm90aWZ5KCkgZnJvbSBjaHJvbWUncyB0ZXJtaW5hbCByZXN1bHRzIGluIG5vIGZpbGUvbWV0aG9kLlxuICAvLyAtIG5vbi1lcnJvciBleGNlcHRpb24gdGhyb3duIGZyb20gZ2xvYmFsIGNvZGUgaW4gRkZcbiAgLy8gVGhpcyBhZGRzIG9uZS5cblxuICBpZiAoZi5saW5lTnVtYmVyID4gLTEgJiYgIWYuZmlsZSAmJiAhZi5tZXRob2QpIHtcbiAgICBmLmZpbGUgPSAnZ2xvYmFsIGNvZGUnO1xuICB9XG5cbiAgcmV0dXJuIGY7XG59O1xuXG52YXIgbm9ybWFsaXNlRnVuY3Rpb25OYW1lID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIC9eZ2xvYmFsIGNvZGUkL2kudGVzdChuYW1lKSA/ICdnbG9iYWwgY29kZScgOiBuYW1lO1xufTtcblxudmFyIGRlZmF1bHRIYW5kbGVkU3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB7XG4gICAgdW5oYW5kbGVkOiBmYWxzZSxcbiAgICBzZXZlcml0eTogJ3dhcm5pbmcnLFxuICAgIHNldmVyaXR5UmVhc29uOiB7XG4gICAgICB0eXBlOiAnaGFuZGxlZEV4Y2VwdGlvbidcbiAgICB9XG4gIH07XG59O1xuXG52YXIgZW5zdXJlU3RyaW5nID0gZnVuY3Rpb24gKHN0cikge1xuICByZXR1cm4gdHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgPyBzdHIgOiAnJztcbn07IC8vIEhlbHBlcnNcblxuXG5FdmVudC5nZXRTdGFja3RyYWNlID0gZnVuY3Rpb24gKGVycm9yLCBlcnJvckZyYW1lc1RvU2tpcCwgYmFja3RyYWNlRnJhbWVzVG9Ta2lwKSB7XG4gIGlmIChfJGhhc1N0YWNrXzE4KGVycm9yKSkgcmV0dXJuIF8kZXJyb3JTdGFja1BhcnNlcl8xMC5wYXJzZShlcnJvcikuc2xpY2UoZXJyb3JGcmFtZXNUb1NraXApOyAvLyBlcnJvciB3YXNuJ3QgcHJvdmlkZWQgb3IgZGlkbid0IGhhdmUgYSBzdGFja3RyYWNlIHNvIHRyeSB0byB3YWxrIHRoZSBjYWxsc3RhY2tcblxuICB0cnkge1xuICAgIHJldHVybiBfJGZpbHRlcl8xMihfJHN0YWNrR2VuZXJhdG9yXzMyLmJhY2t0cmFjZSgpLCBmdW5jdGlvbiAoZnJhbWUpIHtcbiAgICAgIHJldHVybiAoZnJhbWUuZnVuY3Rpb25OYW1lIHx8ICcnKS5pbmRleE9mKCdTdGFja0dlbmVyYXRvciQkJykgPT09IC0xO1xuICAgIH0pLnNsaWNlKDEgKyBiYWNrdHJhY2VGcmFtZXNUb1NraXApO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG59O1xuXG5FdmVudC5jcmVhdGUgPSBmdW5jdGlvbiAobWF5YmVFcnJvciwgdG9sZXJhdGVOb25FcnJvcnMsIGhhbmRsZWRTdGF0ZSwgY29tcG9uZW50LCBlcnJvckZyYW1lc1RvU2tpcCwgbG9nZ2VyKSB7XG4gIGlmIChlcnJvckZyYW1lc1RvU2tpcCA9PT0gdm9pZCAwKSB7XG4gICAgZXJyb3JGcmFtZXNUb1NraXAgPSAwO1xuICB9XG5cbiAgdmFyIF9ub3JtYWxpc2VFcnJvciA9IG5vcm1hbGlzZUVycm9yKG1heWJlRXJyb3IsIHRvbGVyYXRlTm9uRXJyb3JzLCBjb21wb25lbnQsIGxvZ2dlciksXG4gICAgICBlcnJvciA9IF9ub3JtYWxpc2VFcnJvclswXSxcbiAgICAgIGludGVybmFsRnJhbWVzID0gX25vcm1hbGlzZUVycm9yWzFdO1xuXG4gIHZhciBldmVudDtcblxuICB0cnkge1xuICAgIHZhciBzdGFja3RyYWNlID0gRXZlbnQuZ2V0U3RhY2t0cmFjZShlcnJvciwgLy8gaWYgYW4gZXJyb3Igd2FzIGNyZWF0ZWQvdGhyb3cgaW4gdGhlIG5vcm1hbGlzZUVycm9yKCkgZnVuY3Rpb24sIHdlIG5lZWQgdG9cbiAgICAvLyB0ZWxsIHRoZSBnZXRTdGFja3RyYWNlKCkgZnVuY3Rpb24gdG8gc2tpcCB0aGUgbnVtYmVyIG9mIGZyYW1lcyB3ZSBrbm93IHdpbGxcbiAgICAvLyBiZSBmcm9tIG91ciBvd24gZnVuY3Rpb25zLiBUaGlzIGlzIGFkZGVkIHRvIHRoZSBudW1iZXIgb2YgZnJhbWVzIGRlZXAgd2VcbiAgICAvLyB3ZXJlIHRvbGQgYWJvdXRcbiAgICBpbnRlcm5hbEZyYW1lcyA+IDAgPyAxICsgaW50ZXJuYWxGcmFtZXMgKyBlcnJvckZyYW1lc1RvU2tpcCA6IDAsIC8vIGlmIHRoZXJlJ3Mgbm8gc3RhY2t0cmFjZSwgdGhlIGNhbGxzdGFjayBtYXkgYmUgd2Fsa2VkIHRvIGdlbmVyYXRlZCBvbmUuXG4gICAgLy8gdGhpcyBpcyBob3cgbWFueSBmcmFtZXMgc2hvdWxkIGJlIHJlbW92ZWQgYmVjYXVzZSB0aGV5IGNvbWUgZnJvbSBvdXIgbGlicmFyeVxuICAgIDEgKyBlcnJvckZyYW1lc1RvU2tpcCk7XG4gICAgZXZlbnQgPSBuZXcgRXZlbnQoZXJyb3IubmFtZSwgZXJyb3IubWVzc2FnZSwgc3RhY2t0cmFjZSwgaGFuZGxlZFN0YXRlLCBtYXliZUVycm9yKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGV2ZW50ID0gbmV3IEV2ZW50KGVycm9yLm5hbWUsIGVycm9yLm1lc3NhZ2UsIFtdLCBoYW5kbGVkU3RhdGUsIG1heWJlRXJyb3IpO1xuICB9XG5cbiAgaWYgKGVycm9yLm5hbWUgPT09ICdJbnZhbGlkRXJyb3InKSB7XG4gICAgZXZlbnQuYWRkTWV0YWRhdGEoXCJcIiArIGNvbXBvbmVudCwgJ25vbi1lcnJvciBwYXJhbWV0ZXInLCBtYWtlU2VyaWFsaXNhYmxlKG1heWJlRXJyb3IpKTtcbiAgfVxuXG4gIHJldHVybiBldmVudDtcbn07XG5cbnZhciBtYWtlU2VyaWFsaXNhYmxlID0gZnVuY3Rpb24gKGVycikge1xuICBpZiAoZXJyID09PSBudWxsKSByZXR1cm4gJ251bGwnO1xuICBpZiAoZXJyID09PSB1bmRlZmluZWQpIHJldHVybiAndW5kZWZpbmVkJztcbiAgcmV0dXJuIGVycjtcbn07XG5cbnZhciBub3JtYWxpc2VFcnJvciA9IGZ1bmN0aW9uIChtYXliZUVycm9yLCB0b2xlcmF0ZU5vbkVycm9ycywgY29tcG9uZW50LCBsb2dnZXIpIHtcbiAgdmFyIGVycm9yO1xuICB2YXIgaW50ZXJuYWxGcmFtZXMgPSAwO1xuXG4gIHZhciBjcmVhdGVBbmRMb2dJbnB1dEVycm9yID0gZnVuY3Rpb24gKHJlYXNvbikge1xuICAgIGlmIChsb2dnZXIpIGxvZ2dlci53YXJuKGNvbXBvbmVudCArIFwiIHJlY2VpdmVkIGEgbm9uLWVycm9yOiBcXFwiXCIgKyByZWFzb24gKyBcIlxcXCJcIik7XG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcihjb21wb25lbnQgKyBcIiByZWNlaXZlZCBhIG5vbi1lcnJvci4gU2VlIFxcXCJcIiArIGNvbXBvbmVudCArIFwiXFxcIiB0YWIgZm9yIG1vcmUgZGV0YWlsLlwiKTtcbiAgICBlcnIubmFtZSA9ICdJbnZhbGlkRXJyb3InO1xuICAgIHJldHVybiBlcnI7XG4gIH07IC8vIEluIHNvbWUgY2FzZXM6XG4gIC8vXG4gIC8vICAtIHRoZSBwcm9taXNlIHJlamVjdGlvbiBoYW5kbGVyIChib3RoIGluIHRoZSBicm93c2VyIGFuZCBub2RlKVxuICAvLyAgLSB0aGUgbm9kZSB1bmNhdWdodEV4Y2VwdGlvbiBoYW5kbGVyXG4gIC8vXG4gIC8vIFdlIGFyZSByZWFsbHkgbGltaXRlZCBpbiB3aGF0IHdlIGNhbiBkbyB0byBnZXQgYSBzdGFja3RyYWNlLiBTbyB3ZSB1c2UgdGhlXG4gIC8vIHRvbGVyYXRlTm9uRXJyb3JzIG9wdGlvbiB0byBlbnN1cmUgdGhhdCB0aGUgcmVzdWx0aW5nIGVycm9yIGNvbW11bmljYXRlcyBhc1xuICAvLyBzdWNoLlxuXG5cbiAgaWYgKCF0b2xlcmF0ZU5vbkVycm9ycykge1xuICAgIGlmIChfJGlzZXJyb3JfMTkobWF5YmVFcnJvcikpIHtcbiAgICAgIGVycm9yID0gbWF5YmVFcnJvcjtcbiAgICB9IGVsc2Uge1xuICAgICAgZXJyb3IgPSBjcmVhdGVBbmRMb2dJbnB1dEVycm9yKHR5cGVvZiBtYXliZUVycm9yKTtcbiAgICAgIGludGVybmFsRnJhbWVzICs9IDI7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHN3aXRjaCAodHlwZW9mIG1heWJlRXJyb3IpIHtcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIGVycm9yID0gbmV3IEVycm9yKFN0cmluZyhtYXliZUVycm9yKSk7XG4gICAgICAgIGludGVybmFsRnJhbWVzICs9IDE7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgIGVycm9yID0gY3JlYXRlQW5kTG9nSW5wdXRFcnJvcignZnVuY3Rpb24nKTtcbiAgICAgICAgaW50ZXJuYWxGcmFtZXMgKz0gMjtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIGlmIChtYXliZUVycm9yICE9PSBudWxsICYmIF8kaXNlcnJvcl8xOShtYXliZUVycm9yKSkge1xuICAgICAgICAgIGVycm9yID0gbWF5YmVFcnJvcjtcbiAgICAgICAgfSBlbHNlIGlmIChtYXliZUVycm9yICE9PSBudWxsICYmIGhhc05lY2Vzc2FyeUZpZWxkcyhtYXliZUVycm9yKSkge1xuICAgICAgICAgIGVycm9yID0gbmV3IEVycm9yKG1heWJlRXJyb3IubWVzc2FnZSB8fCBtYXliZUVycm9yLmVycm9yTWVzc2FnZSk7XG4gICAgICAgICAgZXJyb3IubmFtZSA9IG1heWJlRXJyb3IubmFtZSB8fCBtYXliZUVycm9yLmVycm9yQ2xhc3M7XG4gICAgICAgICAgaW50ZXJuYWxGcmFtZXMgKz0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlcnJvciA9IGNyZWF0ZUFuZExvZ0lucHV0RXJyb3IobWF5YmVFcnJvciA9PT0gbnVsbCA/ICdudWxsJyA6ICd1bnN1cHBvcnRlZCBvYmplY3QnKTtcbiAgICAgICAgICBpbnRlcm5hbEZyYW1lcyArPSAyO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGVycm9yID0gY3JlYXRlQW5kTG9nSW5wdXRFcnJvcignbm90aGluZycpO1xuICAgICAgICBpbnRlcm5hbEZyYW1lcyArPSAyO1xuICAgIH1cbiAgfVxuXG4gIGlmICghXyRoYXNTdGFja18xOChlcnJvcikpIHtcbiAgICAvLyBpbiBJRTEwLzExIGEgbmV3IEVycm9yKCkgZG9lc24ndCBoYXZlIGEgc3RhY2t0cmFjZSB1bnRpbCB5b3UgdGhyb3cgaXQsIHNvIHRyeSB0aGF0IGhlcmVcbiAgICB0cnkge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKF8kaGFzU3RhY2tfMTgoZSkpIHtcbiAgICAgICAgZXJyb3IgPSBlOyAvLyBpZiB0aGUgZXJyb3Igb25seSBnb3QgYSBzdGFja3RyYWNlIGFmdGVyIHdlIHRocmV3IGl0IGhlcmUsIHdlIGtub3cgaXRcbiAgICAgICAgLy8gd2lsbCBvbmx5IGhhdmUgb25lIGV4dHJhIGludGVybmFsIGZyYW1lIGZyb20gdGhpcyBmdW5jdGlvbiwgcmVnYXJkbGVzc1xuICAgICAgICAvLyBvZiB3aGV0aGVyIGl0IHdlbnQgdGhyb3VnaCBjcmVhdGVBbmRMb2dJbnB1dEVycm9yKCkgb3Igbm90XG5cbiAgICAgICAgaW50ZXJuYWxGcmFtZXMgPSAxO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBbZXJyb3IsIGludGVybmFsRnJhbWVzXTtcbn07IC8vIGRlZmF1bHQgdmFsdWUgZm9yIHN0YWNrdHJhY2UudHlwZVxuXG5cbkV2ZW50Ll9fdHlwZSA9ICdicm93c2VyanMnO1xuXG52YXIgaGFzTmVjZXNzYXJ5RmllbGRzID0gZnVuY3Rpb24gKGVycm9yKSB7XG4gIHJldHVybiAodHlwZW9mIGVycm9yLm5hbWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBlcnJvci5lcnJvckNsYXNzID09PSAnc3RyaW5nJykgJiYgKHR5cGVvZiBlcnJvci5tZXNzYWdlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgZXJyb3IuZXJyb3JNZXNzYWdlID09PSAnc3RyaW5nJyk7XG59O1xuXG52YXIgXyRFdmVudF82ID0gRXZlbnQ7XG5cbi8vIFRoaXMgaXMgYSBoZWF2aWx5IG1vZGlmaWVkL3NpbXBsaWZpZWQgdmVyc2lvbiBvZlxuLy8gICBodHRwczovL2dpdGh1Yi5jb20vb3RoaXltMjMvYXN5bmMtc29tZVxuLy8gd2l0aCB0aGUgbG9naWMgZmxpcHBlZCBzbyB0aGF0IGl0IGlzIGFraW4gdG8gdGhlXG4vLyBzeW5jaHJvbm91cyBcImV2ZXJ5XCIgbWV0aG9kIGluc3RlYWQgb2YgXCJzb21lXCIuXG4vLyBydW4gdGhlIGFzeW5jaHJvbm91cyB0ZXN0IGZ1bmN0aW9uIChmbikgb3ZlciBlYWNoIGl0ZW0gaW4gdGhlIGFycmF5IChhcnIpXG4vLyBpbiBzZXJpZXMgdW50aWw6XG4vLyAgIC0gZm4oaXRlbSwgY2IpID0+IGNhbGxzIGNiKG51bGwsIGZhbHNlKVxuLy8gICAtIG9yIHRoZSBlbmQgb2YgdGhlIGFycmF5IGlzIHJlYWNoZWRcbi8vIHRoZSBjYWxsYmFjayAoY2IpIHdpbGwgYmUgcGFzc2VkIChudWxsLCBmYWxzZSkgaWYgYW55IG9mIHRoZSBpdGVtcyBpbiBhcnJcbi8vIGNhdXNlZCBmbiB0byBjYWxsIGJhY2sgd2l0aCBmYWxzZSwgb3RoZXJ3aXNlIGl0IHdpbGwgYmUgcGFzc2VkIChudWxsLCB0cnVlKVxudmFyIF8kYXN5bmNFdmVyeV83ID0gZnVuY3Rpb24gKGFyciwgZm4sIGNiKSB7XG4gIHZhciBpbmRleCA9IDA7XG5cbiAgdmFyIG5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGluZGV4ID49IGFyci5sZW5ndGgpIHJldHVybiBjYihudWxsLCB0cnVlKTtcbiAgICBmbihhcnJbaW5kZXhdLCBmdW5jdGlvbiAoZXJyLCByZXN1bHQpIHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpO1xuICAgICAgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHJldHVybiBjYihudWxsLCBmYWxzZSk7XG4gICAgICBpbmRleCsrO1xuICAgICAgbmV4dCgpO1xuICAgIH0pO1xuICB9O1xuXG4gIG5leHQoKTtcbn07XG5cbi8qIHJlbW92ZWQ6IHZhciBfJGFzeW5jRXZlcnlfNyA9IHJlcXVpcmUoJy4vYXN5bmMtZXZlcnknKTsgKi87XG5cbnZhciBfJGNhbGxiYWNrUnVubmVyXzkgPSBmdW5jdGlvbiAoY2FsbGJhY2tzLCBldmVudCwgb25DYWxsYmFja0Vycm9yLCBjYikge1xuICAvLyBUaGlzIGZ1bmN0aW9uIGlzIGhvdyB3ZSBzdXBwb3J0IGRpZmZlcmVudCBraW5kcyBvZiBjYWxsYmFjazpcbiAgLy8gIC0gc3luY2hyb25vdXMgLSByZXR1cm4gdmFsdWVcbiAgLy8gIC0gbm9kZS1zdHlsZSBhc3luYyB3aXRoIGNhbGxiYWNrIC0gY2IoZXJyLCB2YWx1ZSlcbiAgLy8gIC0gcHJvbWlzZS90aGVuYWJsZSAtIHJlc29sdmUodmFsdWUpXG4gIC8vIEl0IG5vcm1hbGlzZXMgZWFjaCBvZiB0aGVzZSBpbnRvIHRoZSBsb3dlc3QgY29tbW9uIGRlbm9taW5hdG9yIOKAkyBhIG5vZGUtc3R5bGUgY2FsbGJhY2tcbiAgdmFyIHJ1bk1heWJlQXN5bmNDYWxsYmFjayA9IGZ1bmN0aW9uIChmbiwgY2IpIHtcbiAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSByZXR1cm4gY2IobnVsbCk7XG5cbiAgICB0cnkge1xuICAgICAgLy8gaWYgZnVuY3Rpb24gYXBwZWFycyBzeW5j4oCmXG4gICAgICBpZiAoZm4ubGVuZ3RoICE9PSAyKSB7XG4gICAgICAgIHZhciByZXQgPSBmbihldmVudCk7IC8vIGNoZWNrIGlmIGl0IHJldHVybmVkIGEgXCJ0aGVuYWJsZVwiIChwcm9taXNlKVxuXG4gICAgICAgIGlmIChyZXQgJiYgdHlwZW9mIHJldC50aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIHJldC50aGVuKCAvLyByZXNvbHZlXG4gICAgICAgICAgZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICByZXR1cm4gY2IobnVsbCwgdmFsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sIC8vIHJlamVjdFxuICAgICAgICAgIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBvbkNhbGxiYWNrRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGNiKG51bGwsIHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2IobnVsbCwgcmV0KTtcbiAgICAgIH0gLy8gaWYgZnVuY3Rpb24gaXMgYXN5bmPigKZcblxuXG4gICAgICBmbihldmVudCwgZnVuY3Rpb24gKGVyciwgcmVzdWx0KSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICBvbkNhbGxiYWNrRXJyb3IoZXJyKTtcbiAgICAgICAgICByZXR1cm4gY2IobnVsbCk7XG4gICAgICAgIH1cblxuICAgICAgICBjYihudWxsLCByZXN1bHQpO1xuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgb25DYWxsYmFja0Vycm9yKGUpO1xuICAgICAgY2IobnVsbCk7XG4gICAgfVxuICB9O1xuXG4gIF8kYXN5bmNFdmVyeV83KGNhbGxiYWNrcywgcnVuTWF5YmVBc3luY0NhbGxiYWNrLCBjYik7XG59O1xuXG52YXIgXyRzeW5jQ2FsbGJhY2tSdW5uZXJfMjIgPSBmdW5jdGlvbiAoY2FsbGJhY2tzLCBjYWxsYmFja0FyZywgY2FsbGJhY2tUeXBlLCBsb2dnZXIpIHtcbiAgdmFyIGlnbm9yZSA9IGZhbHNlO1xuICB2YXIgY2JzID0gY2FsbGJhY2tzLnNsaWNlKCk7XG5cbiAgd2hpbGUgKCFpZ25vcmUpIHtcbiAgICBpZiAoIWNicy5sZW5ndGgpIGJyZWFrO1xuXG4gICAgdHJ5IHtcbiAgICAgIGlnbm9yZSA9IGNicy5wb3AoKShjYWxsYmFja0FyZykgPT09IGZhbHNlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGxvZ2dlci5lcnJvcihcIkVycm9yIG9jY3VycmVkIGluIFwiICsgY2FsbGJhY2tUeXBlICsgXCIgY2FsbGJhY2ssIGNvbnRpbnVpbmcgYW55d2F5XFx1MjAyNlwiKTtcbiAgICAgIGxvZ2dlci5lcnJvcihlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaWdub3JlO1xufTtcblxudmFyIF8kcGFkXzI4ID0gZnVuY3Rpb24gcGFkKG51bSwgc2l6ZSkge1xuICB2YXIgcyA9ICcwMDAwMDAwMDAnICsgbnVtO1xuICByZXR1cm4gcy5zdWJzdHIocy5sZW5ndGggLSBzaXplKTtcbn07XG5cbi8qIHJlbW92ZWQ6IHZhciBfJHBhZF8yOCA9IHJlcXVpcmUoJy4vcGFkLmpzJyk7ICovO1xuXG52YXIgZW52ID0gdHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgPyB3aW5kb3cgOiBzZWxmO1xudmFyIGdsb2JhbENvdW50ID0gMDtcblxuZm9yICh2YXIgcHJvcCBpbiBlbnYpIHtcbiAgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKGVudiwgcHJvcCkpIGdsb2JhbENvdW50Kys7XG59XG5cbnZhciBtaW1lVHlwZXNMZW5ndGggPSBuYXZpZ2F0b3IubWltZVR5cGVzID8gbmF2aWdhdG9yLm1pbWVUeXBlcy5sZW5ndGggOiAwO1xudmFyIGNsaWVudElkID0gXyRwYWRfMjgoKG1pbWVUeXBlc0xlbmd0aCArIG5hdmlnYXRvci51c2VyQWdlbnQubGVuZ3RoKS50b1N0cmluZygzNikgKyBnbG9iYWxDb3VudC50b1N0cmluZygzNiksIDQpO1xuXG52YXIgXyRmaW5nZXJwcmludF8yNyA9IGZ1bmN0aW9uIGZpbmdlcnByaW50KCkge1xuICByZXR1cm4gY2xpZW50SWQ7XG59O1xuXG4vKipcbiAqIGN1aWQuanNcbiAqIENvbGxpc2lvbi1yZXNpc3RhbnQgVUlEIGdlbmVyYXRvciBmb3IgYnJvd3NlcnMgYW5kIG5vZGUuXG4gKiBTZXF1ZW50aWFsIGZvciBmYXN0IGRiIGxvb2t1cHMgYW5kIHJlY2VuY3kgc29ydGluZy5cbiAqIFNhZmUgZm9yIGVsZW1lbnQgSURzIGFuZCBzZXJ2ZXItc2lkZSBsb29rdXBzLlxuICpcbiAqIEV4dHJhY3RlZCBmcm9tIENMQ1RSXG4gKlxuICogQ29weXJpZ2h0IChjKSBFcmljIEVsbGlvdHQgMjAxMlxuICogTUlUIExpY2Vuc2VcbiAqL1xuLyogcmVtb3ZlZDogdmFyIF8kZmluZ2VycHJpbnRfMjcgPSByZXF1aXJlKCcuL2xpYi9maW5nZXJwcmludC5qcycpOyAqLztcblxuLyogcmVtb3ZlZDogdmFyIF8kcGFkXzI4ID0gcmVxdWlyZSgnLi9saWIvcGFkLmpzJyk7ICovO1xuXG52YXIgYyA9IDAsXG4gICAgYmxvY2tTaXplID0gNCxcbiAgICBiYXNlID0gMzYsXG4gICAgZGlzY3JldGVWYWx1ZXMgPSBNYXRoLnBvdyhiYXNlLCBibG9ja1NpemUpO1xuXG5mdW5jdGlvbiByYW5kb21CbG9jaygpIHtcbiAgcmV0dXJuIF8kcGFkXzI4KChNYXRoLnJhbmRvbSgpICogZGlzY3JldGVWYWx1ZXMgPDwgMCkudG9TdHJpbmcoYmFzZSksIGJsb2NrU2l6ZSk7XG59XG5cbmZ1bmN0aW9uIHNhZmVDb3VudGVyKCkge1xuICBjID0gYyA8IGRpc2NyZXRlVmFsdWVzID8gYyA6IDA7XG4gIGMrKzsgLy8gdGhpcyBpcyBub3Qgc3VibGltaW5hbFxuXG4gIHJldHVybiBjIC0gMTtcbn1cblxuZnVuY3Rpb24gY3VpZCgpIHtcbiAgLy8gU3RhcnRpbmcgd2l0aCBhIGxvd2VyY2FzZSBsZXR0ZXIgbWFrZXNcbiAgLy8gaXQgSFRNTCBlbGVtZW50IElEIGZyaWVuZGx5LlxuICB2YXIgbGV0dGVyID0gJ2MnLFxuICAgICAgLy8gaGFyZC1jb2RlZCBhbGxvd3MgZm9yIHNlcXVlbnRpYWwgYWNjZXNzXG4gIC8vIHRpbWVzdGFtcFxuICAvLyB3YXJuaW5nOiB0aGlzIGV4cG9zZXMgdGhlIGV4YWN0IGRhdGUgYW5kIHRpbWVcbiAgLy8gdGhhdCB0aGUgdWlkIHdhcyBjcmVhdGVkLlxuICB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKS50b1N0cmluZyhiYXNlKSxcbiAgICAgIC8vIFByZXZlbnQgc2FtZS1tYWNoaW5lIGNvbGxpc2lvbnMuXG4gIGNvdW50ZXIgPSBfJHBhZF8yOChzYWZlQ291bnRlcigpLnRvU3RyaW5nKGJhc2UpLCBibG9ja1NpemUpLFxuICAgICAgLy8gQSBmZXcgY2hhcnMgdG8gZ2VuZXJhdGUgZGlzdGluY3QgaWRzIGZvciBkaWZmZXJlbnRcbiAgLy8gY2xpZW50cyAoc28gZGlmZmVyZW50IGNvbXB1dGVycyBhcmUgZmFyIGxlc3NcbiAgLy8gbGlrZWx5IHRvIGdlbmVyYXRlIHRoZSBzYW1lIGlkKVxuICBwcmludCA9IF8kZmluZ2VycHJpbnRfMjcoKSxcbiAgICAgIC8vIEdyYWIgc29tZSBtb3JlIGNoYXJzIGZyb20gTWF0aC5yYW5kb20oKVxuICByYW5kb20gPSByYW5kb21CbG9jaygpICsgcmFuZG9tQmxvY2soKTtcbiAgcmV0dXJuIGxldHRlciArIHRpbWVzdGFtcCArIGNvdW50ZXIgKyBwcmludCArIHJhbmRvbTtcbn1cblxuY3VpZC5maW5nZXJwcmludCA9IF8kZmluZ2VycHJpbnRfMjc7XG52YXIgXyRjdWlkXzI2ID0gY3VpZDtcblxuLyogcmVtb3ZlZDogdmFyIF8kY3VpZF8yNiA9IHJlcXVpcmUoJ0BidWdzbmFnL2N1aWQnKTsgKi87XG5cbnZhciBTZXNzaW9uID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU2Vzc2lvbigpIHtcbiAgICB0aGlzLmlkID0gXyRjdWlkXzI2KCk7XG4gICAgdGhpcy5zdGFydGVkQXQgPSBuZXcgRGF0ZSgpO1xuICAgIHRoaXMuX2hhbmRsZWQgPSAwO1xuICAgIHRoaXMuX3VuaGFuZGxlZCA9IDA7XG4gICAgdGhpcy5fdXNlciA9IHt9O1xuICAgIHRoaXMuYXBwID0ge307XG4gICAgdGhpcy5kZXZpY2UgPSB7fTtcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBTZXNzaW9uLnByb3RvdHlwZTtcblxuICBfcHJvdG8uZ2V0VXNlciA9IGZ1bmN0aW9uIGdldFVzZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3VzZXI7XG4gIH07XG5cbiAgX3Byb3RvLnNldFVzZXIgPSBmdW5jdGlvbiBzZXRVc2VyKGlkLCBlbWFpbCwgbmFtZSkge1xuICAgIHRoaXMuX3VzZXIgPSB7XG4gICAgICBpZDogaWQsXG4gICAgICBlbWFpbDogZW1haWwsXG4gICAgICBuYW1lOiBuYW1lXG4gICAgfTtcbiAgfTtcblxuICBfcHJvdG8udG9KU09OID0gZnVuY3Rpb24gdG9KU09OKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpZDogdGhpcy5pZCxcbiAgICAgIHN0YXJ0ZWRBdDogdGhpcy5zdGFydGVkQXQsXG4gICAgICBldmVudHM6IHtcbiAgICAgICAgaGFuZGxlZDogdGhpcy5faGFuZGxlZCxcbiAgICAgICAgdW5oYW5kbGVkOiB0aGlzLl91bmhhbmRsZWRcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIF9wcm90by5fdHJhY2sgPSBmdW5jdGlvbiBfdHJhY2soZXZlbnQpIHtcbiAgICB0aGlzW2V2ZW50Ll9oYW5kbGVkU3RhdGUudW5oYW5kbGVkID8gJ191bmhhbmRsZWQnIDogJ19oYW5kbGVkJ10gKz0gMTtcbiAgfTtcblxuICByZXR1cm4gU2Vzc2lvbjtcbn0oKTtcblxudmFyIF8kU2Vzc2lvbl8zNCA9IFNlc3Npb247XG5cbi8qIHJlbW92ZWQ6IHZhciBfJGNvbmZpZ181ID0gcmVxdWlyZSgnLi9jb25maWcnKTsgKi87XG5cbi8qIHJlbW92ZWQ6IHZhciBfJEV2ZW50XzYgPSByZXF1aXJlKCcuL2V2ZW50Jyk7ICovO1xuXG4vKiByZW1vdmVkOiB2YXIgXyRCcmVhZGNydW1iXzMgPSByZXF1aXJlKCcuL2JyZWFkY3J1bWInKTsgKi87XG5cbi8qIHJlbW92ZWQ6IHZhciBfJFNlc3Npb25fMzQgPSByZXF1aXJlKCcuL3Nlc3Npb24nKTsgKi87XG5cbi8qIHJlbW92ZWQ6IHZhciBfJG1hcF8xNiA9IHJlcXVpcmUoJy4vbGliL2VzLXV0aWxzL21hcCcpOyAqLztcblxuLyogcmVtb3ZlZDogdmFyIF8kaW5jbHVkZXNfMTMgPSByZXF1aXJlKCcuL2xpYi9lcy11dGlscy9pbmNsdWRlcycpOyAqLztcblxuLyogcmVtb3ZlZDogdmFyIF8kZmlsdGVyXzEyID0gcmVxdWlyZSgnLi9saWIvZXMtdXRpbHMvZmlsdGVyJyk7ICovO1xuXG4vKiByZW1vdmVkOiB2YXIgXyRyZWR1Y2VfMTcgPSByZXF1aXJlKCcuL2xpYi9lcy11dGlscy9yZWR1Y2UnKTsgKi87XG5cbi8qIHJlbW92ZWQ6IHZhciBfJGtleXNfMTUgPSByZXF1aXJlKCcuL2xpYi9lcy11dGlscy9rZXlzJyk7ICovO1xuXG4vKiByZW1vdmVkOiB2YXIgXyRhc3NpZ25fMTEgPSByZXF1aXJlKCcuL2xpYi9lcy11dGlscy9hc3NpZ24nKTsgKi87XG5cbi8qIHJlbW92ZWQ6IHZhciBfJGNhbGxiYWNrUnVubmVyXzkgPSByZXF1aXJlKCcuL2xpYi9jYWxsYmFjay1ydW5uZXInKTsgKi87XG5cbi8qIHJlbW92ZWQ6IHZhciBfJG1ldGFkYXRhRGVsZWdhdGVfMjEgPSByZXF1aXJlKCcuL2xpYi9tZXRhZGF0YS1kZWxlZ2F0ZScpOyAqLztcblxuLyogcmVtb3ZlZDogdmFyIF8kc3luY0NhbGxiYWNrUnVubmVyXzIyID0gcmVxdWlyZSgnLi9saWIvc3luYy1jYWxsYmFjay1ydW5uZXInKTsgKi87XG5cbi8qIHJlbW92ZWQ6IHZhciBfJGJyZWFkY3J1bWJUeXBlc184ID0gcmVxdWlyZSgnLi9saWIvYnJlYWRjcnVtYi10eXBlcycpOyAqLztcblxudmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7fTtcblxudmFyIENsaWVudCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIENsaWVudChjb25maWd1cmF0aW9uLCBzY2hlbWEsIGludGVybmFsUGx1Z2lucywgbm90aWZpZXIpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgaWYgKHNjaGVtYSA9PT0gdm9pZCAwKSB7XG4gICAgICBzY2hlbWEgPSBfJGNvbmZpZ181LnNjaGVtYTtcbiAgICB9XG5cbiAgICBpZiAoaW50ZXJuYWxQbHVnaW5zID09PSB2b2lkIDApIHtcbiAgICAgIGludGVybmFsUGx1Z2lucyA9IFtdO1xuICAgIH1cblxuICAgIC8vIG5vdGlmaWVyIGlkXG4gICAgdGhpcy5fbm90aWZpZXIgPSBub3RpZmllcjsgLy8gaW50aWFsaXNlIG9wdHMgYW5kIGNvbmZpZ1xuXG4gICAgdGhpcy5fY29uZmlnID0ge307XG4gICAgdGhpcy5fc2NoZW1hID0gc2NoZW1hOyAvLyBpL29cblxuICAgIHRoaXMuX2RlbGl2ZXJ5ID0ge1xuICAgICAgc2VuZFNlc3Npb246IG5vb3AsXG4gICAgICBzZW5kRXZlbnQ6IG5vb3BcbiAgICB9O1xuICAgIHRoaXMuX2xvZ2dlciA9IHtcbiAgICAgIGRlYnVnOiBub29wLFxuICAgICAgaW5mbzogbm9vcCxcbiAgICAgIHdhcm46IG5vb3AsXG4gICAgICBlcnJvcjogbm9vcFxuICAgIH07IC8vIHBsdWdpbnNcblxuICAgIHRoaXMuX3BsdWdpbnMgPSB7fTsgLy8gc3RhdGVcblxuICAgIHRoaXMuX2JyZWFkY3J1bWJzID0gW107XG4gICAgdGhpcy5fc2Vzc2lvbiA9IG51bGw7XG4gICAgdGhpcy5fbWV0YWRhdGEgPSB7fTtcbiAgICB0aGlzLl9jb250ZXh0ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3VzZXIgPSB7fTsgLy8gY2FsbGJhY2tzOlxuICAgIC8vICBlOiBvbkVycm9yXG4gICAgLy8gIHM6IG9uU2Vzc2lvblxuICAgIC8vICBzcDogb25TZXNzaW9uUGF5bG9hZFxuICAgIC8vICBiOiBvbkJyZWFkY3J1bWJcbiAgICAvLyAobm90ZSB0aGVzZSBuYW1lcyBhcmUgbWluaWZpZWQgYnkgaGFuZCBiZWNhdXNlIG9iamVjdFxuICAgIC8vIHByb3BlcnRpZXMgYXJlIG5vdCBzYWZlIHRvIG1pbmlmeSBhdXRvbWF0aWNhbGx5KVxuXG4gICAgdGhpcy5fY2JzID0ge1xuICAgICAgZTogW10sXG4gICAgICBzOiBbXSxcbiAgICAgIHNwOiBbXSxcbiAgICAgIGI6IFtdXG4gICAgfTsgLy8gZXhwb3NlIGludGVybmFsIGNvbnN0cnVjdG9yc1xuXG4gICAgdGhpcy5DbGllbnQgPSBDbGllbnQ7XG4gICAgdGhpcy5FdmVudCA9IF8kRXZlbnRfNjtcbiAgICB0aGlzLkJyZWFkY3J1bWIgPSBfJEJyZWFkY3J1bWJfMztcbiAgICB0aGlzLlNlc3Npb24gPSBfJFNlc3Npb25fMzQ7XG4gICAgdGhpcy5fY29uZmlnID0gdGhpcy5fY29uZmlndXJlKGNvbmZpZ3VyYXRpb24sIGludGVybmFsUGx1Z2lucyk7XG4gICAgXyRtYXBfMTYoaW50ZXJuYWxQbHVnaW5zLmNvbmNhdCh0aGlzLl9jb25maWcucGx1Z2lucyksIGZ1bmN0aW9uIChwbCkge1xuICAgICAgaWYgKHBsKSBfdGhpcy5fbG9hZFBsdWdpbihwbCk7XG4gICAgfSk7IC8vIHdoZW4gbm90aWZ5KCkgaXMgY2FsbGVkIHdlIG5lZWQgdG8ga25vdyBob3cgbWFueSBmcmFtZXMgYXJlIGZyb20gb3VyIG93biBzb3VyY2VcbiAgICAvLyB0aGlzIGluaXRhbCB2YWx1ZSBpcyAxIG5vdCAwIGJlY2F1c2Ugd2Ugd3JhcCBub3RpZnkoKSB0byBlbnN1cmUgaXQgaXMgYWx3YXlzXG4gICAgLy8gYm91bmQgdG8gaGF2ZSB0aGUgY2xpZW50IGFzIGl0cyBgdGhpc2AgdmFsdWUg4oCTIHNlZSBiZWxvdy5cblxuICAgIHRoaXMuX2RlcHRoID0gMTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIG5vdGlmeSA9IHRoaXMubm90aWZ5O1xuXG4gICAgdGhpcy5ub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbm90aWZ5LmFwcGx5KHNlbGYsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBDbGllbnQucHJvdG90eXBlO1xuXG4gIF9wcm90by5hZGRNZXRhZGF0YSA9IGZ1bmN0aW9uIGFkZE1ldGFkYXRhKHNlY3Rpb24sIGtleU9yT2JqLCBtYXliZVZhbCkge1xuICAgIHJldHVybiBfJG1ldGFkYXRhRGVsZWdhdGVfMjEuYWRkKHRoaXMuX21ldGFkYXRhLCBzZWN0aW9uLCBrZXlPck9iaiwgbWF5YmVWYWwpO1xuICB9O1xuXG4gIF9wcm90by5nZXRNZXRhZGF0YSA9IGZ1bmN0aW9uIGdldE1ldGFkYXRhKHNlY3Rpb24sIGtleSkge1xuICAgIHJldHVybiBfJG1ldGFkYXRhRGVsZWdhdGVfMjEuZ2V0KHRoaXMuX21ldGFkYXRhLCBzZWN0aW9uLCBrZXkpO1xuICB9O1xuXG4gIF9wcm90by5jbGVhck1ldGFkYXRhID0gZnVuY3Rpb24gY2xlYXJNZXRhZGF0YShzZWN0aW9uLCBrZXkpIHtcbiAgICByZXR1cm4gXyRtZXRhZGF0YURlbGVnYXRlXzIxLmNsZWFyKHRoaXMuX21ldGFkYXRhLCBzZWN0aW9uLCBrZXkpO1xuICB9O1xuXG4gIF9wcm90by5nZXRDb250ZXh0ID0gZnVuY3Rpb24gZ2V0Q29udGV4dCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcbiAgfTtcblxuICBfcHJvdG8uc2V0Q29udGV4dCA9IGZ1bmN0aW9uIHNldENvbnRleHQoYykge1xuICAgIHRoaXMuX2NvbnRleHQgPSBjO1xuICB9O1xuXG4gIF9wcm90by5fY29uZmlndXJlID0gZnVuY3Rpb24gX2NvbmZpZ3VyZShvcHRzLCBpbnRlcm5hbFBsdWdpbnMpIHtcbiAgICB2YXIgc2NoZW1hID0gXyRyZWR1Y2VfMTcoaW50ZXJuYWxQbHVnaW5zLCBmdW5jdGlvbiAoc2NoZW1hLCBwbHVnaW4pIHtcbiAgICAgIGlmIChwbHVnaW4gJiYgcGx1Z2luLmNvbmZpZ1NjaGVtYSkgcmV0dXJuIF8kYXNzaWduXzExKHt9LCBzY2hlbWEsIHBsdWdpbi5jb25maWdTY2hlbWEpO1xuICAgICAgcmV0dXJuIHNjaGVtYTtcbiAgICB9LCB0aGlzLl9zY2hlbWEpOyAvLyBhY2N1bXVsYXRlIGNvbmZpZ3VyYXRpb24gYW5kIGVycm9yIG1lc3NhZ2VzXG5cbiAgICB2YXIgX3JlZHVjZSA9IF8kcmVkdWNlXzE3KF8ka2V5c18xNShzY2hlbWEpLCBmdW5jdGlvbiAoYWNjdW0sIGtleSkge1xuICAgICAgdmFyIGRlZmF1bHRWYWx1ZSA9IHNjaGVtYVtrZXldLmRlZmF1bHRWYWx1ZShvcHRzW2tleV0pO1xuXG4gICAgICBpZiAob3B0c1trZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIHZhbGlkID0gc2NoZW1hW2tleV0udmFsaWRhdGUob3B0c1trZXldKTtcblxuICAgICAgICBpZiAoIXZhbGlkKSB7XG4gICAgICAgICAgYWNjdW0uZXJyb3JzW2tleV0gPSBzY2hlbWFba2V5XS5tZXNzYWdlO1xuICAgICAgICAgIGFjY3VtLmNvbmZpZ1trZXldID0gZGVmYXVsdFZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzY2hlbWFba2V5XS5hbGxvd1BhcnRpYWxPYmplY3QpIHtcbiAgICAgICAgICAgIGFjY3VtLmNvbmZpZ1trZXldID0gXyRhc3NpZ25fMTEoZGVmYXVsdFZhbHVlLCBvcHRzW2tleV0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhY2N1bS5jb25maWdba2V5XSA9IG9wdHNba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFjY3VtLmNvbmZpZ1trZXldID0gZGVmYXVsdFZhbHVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYWNjdW07XG4gICAgfSwge1xuICAgICAgZXJyb3JzOiB7fSxcbiAgICAgIGNvbmZpZzoge31cbiAgICB9KSxcbiAgICAgICAgZXJyb3JzID0gX3JlZHVjZS5lcnJvcnMsXG4gICAgICAgIGNvbmZpZyA9IF9yZWR1Y2UuY29uZmlnO1xuXG4gICAgaWYgKHNjaGVtYS5hcGlLZXkpIHtcbiAgICAgIC8vIG1pc3NpbmcgYXBpIGtleSBpcyB0aGUgb25seSBmYXRhbCBlcnJvclxuICAgICAgaWYgKCFjb25maWcuYXBpS2V5KSB0aHJvdyBuZXcgRXJyb3IoJ05vIEJ1Z3NuYWcgQVBJIEtleSBzZXQnKTsgLy8gd2FybiBhYm91dCBhbiBhcGlrZXkgdGhhdCBpcyBub3Qgb2YgdGhlIGV4cGVjdGVkIGZvcm1hdFxuXG4gICAgICBpZiAoIS9eWzAtOWEtZl17MzJ9JC9pLnRlc3QoY29uZmlnLmFwaUtleSkpIGVycm9ycy5hcGlLZXkgPSAnc2hvdWxkIGJlIGEgc3RyaW5nIG9mIDMyIGhleGFkZWNpbWFsIGNoYXJhY3RlcnMnO1xuICAgIH0gLy8gdXBkYXRlIGFuZCBlbGV2YXRlIHNvbWUgb3B0aW9uc1xuXG5cbiAgICB0aGlzLl9tZXRhZGF0YSA9IF8kYXNzaWduXzExKHt9LCBjb25maWcubWV0YWRhdGEpO1xuICAgIHRoaXMuX3VzZXIgPSBfJGFzc2lnbl8xMSh7fSwgY29uZmlnLnVzZXIpO1xuICAgIHRoaXMuX2NvbnRleHQgPSBjb25maWcuY29udGV4dDtcbiAgICBpZiAoY29uZmlnLmxvZ2dlcikgdGhpcy5fbG9nZ2VyID0gY29uZmlnLmxvZ2dlcjsgLy8gYWRkIGNhbGxiYWNrc1xuXG4gICAgaWYgKGNvbmZpZy5vbkVycm9yKSB0aGlzLl9jYnMuZSA9IHRoaXMuX2Nicy5lLmNvbmNhdChjb25maWcub25FcnJvcik7XG4gICAgaWYgKGNvbmZpZy5vbkJyZWFkY3J1bWIpIHRoaXMuX2Nicy5iID0gdGhpcy5fY2JzLmIuY29uY2F0KGNvbmZpZy5vbkJyZWFkY3J1bWIpO1xuICAgIGlmIChjb25maWcub25TZXNzaW9uKSB0aGlzLl9jYnMucyA9IHRoaXMuX2Nicy5zLmNvbmNhdChjb25maWcub25TZXNzaW9uKTsgLy8gZmluYWxseSB3YXJuIGFib3V0IGFueSBpbnZhbGlkIGNvbmZpZyB3aGVyZSB3ZSBmZWxsIGJhY2sgdG8gdGhlIGRlZmF1bHRcblxuICAgIGlmIChfJGtleXNfMTUoZXJyb3JzKS5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX2xvZ2dlci53YXJuKGdlbmVyYXRlQ29uZmlnRXJyb3JNZXNzYWdlKGVycm9ycywgb3B0cykpO1xuICAgIH1cblxuICAgIHJldHVybiBjb25maWc7XG4gIH07XG5cbiAgX3Byb3RvLmdldFVzZXIgPSBmdW5jdGlvbiBnZXRVc2VyKCkge1xuICAgIHJldHVybiB0aGlzLl91c2VyO1xuICB9O1xuXG4gIF9wcm90by5zZXRVc2VyID0gZnVuY3Rpb24gc2V0VXNlcihpZCwgZW1haWwsIG5hbWUpIHtcbiAgICB0aGlzLl91c2VyID0ge1xuICAgICAgaWQ6IGlkLFxuICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgbmFtZTogbmFtZVxuICAgIH07XG4gIH07XG5cbiAgX3Byb3RvLl9sb2FkUGx1Z2luID0gZnVuY3Rpb24gX2xvYWRQbHVnaW4ocGx1Z2luKSB7XG4gICAgdmFyIHJlc3VsdCA9IHBsdWdpbi5sb2FkKHRoaXMpOyAvLyBKUyBvYmplY3RzIGFyZSBub3QgdGhlIHNhZmVzdCB3YXkgdG8gc3RvcmUgYXJiaXRyYXJpbHkga2V5ZWQgdmFsdWVzLFxuICAgIC8vIHNvIGJvb2tlbmQgdGhlIGtleSB3aXRoIHNvbWUgY2hhcmFjdGVycyB0aGF0IHByZXZlbnQgdGFtcGVyaW5nIHdpdGhcbiAgICAvLyBzdHVmZiBsaWtlIF9fcHJvdG9fXyBldGMuIChvbmx5IHN0b3JlIHRoZSByZXN1bHQgaWYgdGhlIHBsdWdpbiBoYWQgYVxuICAgIC8vIG5hbWUpXG5cbiAgICBpZiAocGx1Z2luLm5hbWUpIHRoaXMuX3BsdWdpbnNbXCJ+XCIgKyBwbHVnaW4ubmFtZSArIFwiflwiXSA9IHJlc3VsdDtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8uZ2V0UGx1Z2luID0gZnVuY3Rpb24gZ2V0UGx1Z2luKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fcGx1Z2luc1tcIn5cIiArIG5hbWUgKyBcIn5cIl07XG4gIH07XG5cbiAgX3Byb3RvLl9zZXREZWxpdmVyeSA9IGZ1bmN0aW9uIF9zZXREZWxpdmVyeShkKSB7XG4gICAgdGhpcy5fZGVsaXZlcnkgPSBkKHRoaXMpO1xuICB9O1xuXG4gIF9wcm90by5zdGFydFNlc3Npb24gPSBmdW5jdGlvbiBzdGFydFNlc3Npb24oKSB7XG4gICAgdmFyIHNlc3Npb24gPSBuZXcgXyRTZXNzaW9uXzM0KCk7XG4gICAgc2Vzc2lvbi5hcHAucmVsZWFzZVN0YWdlID0gdGhpcy5fY29uZmlnLnJlbGVhc2VTdGFnZTtcbiAgICBzZXNzaW9uLmFwcC52ZXJzaW9uID0gdGhpcy5fY29uZmlnLmFwcFZlcnNpb247XG4gICAgc2Vzc2lvbi5hcHAudHlwZSA9IHRoaXMuX2NvbmZpZy5hcHBUeXBlO1xuICAgIHNlc3Npb24uX3VzZXIgPSBfJGFzc2lnbl8xMSh7fSwgdGhpcy5fdXNlcik7IC8vIHJ1biBvblNlc3Npb24gY2FsbGJhY2tzXG5cbiAgICB2YXIgaWdub3JlID0gXyRzeW5jQ2FsbGJhY2tSdW5uZXJfMjIodGhpcy5fY2JzLnMsIHNlc3Npb24sICdvblNlc3Npb24nLCB0aGlzLl9sb2dnZXIpO1xuXG4gICAgaWYgKGlnbm9yZSkge1xuICAgICAgdGhpcy5fbG9nZ2VyLmRlYnVnKCdTZXNzaW9uIG5vdCBzdGFydGVkIGR1ZSB0byBvblNlc3Npb24gY2FsbGJhY2snKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3Nlc3Npb25EZWxlZ2F0ZS5zdGFydFNlc3Npb24odGhpcywgc2Vzc2lvbik7XG4gIH07XG5cbiAgX3Byb3RvLmFkZE9uRXJyb3IgPSBmdW5jdGlvbiBhZGRPbkVycm9yKGZuLCBmcm9udCkge1xuICAgIGlmIChmcm9udCA9PT0gdm9pZCAwKSB7XG4gICAgICBmcm9udCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuX2Nicy5lW2Zyb250ID8gJ3Vuc2hpZnQnIDogJ3B1c2gnXShmbik7XG4gIH07XG5cbiAgX3Byb3RvLnJlbW92ZU9uRXJyb3IgPSBmdW5jdGlvbiByZW1vdmVPbkVycm9yKGZuKSB7XG4gICAgdGhpcy5fY2JzLmUgPSBfJGZpbHRlcl8xMih0aGlzLl9jYnMuZSwgZnVuY3Rpb24gKGYpIHtcbiAgICAgIHJldHVybiBmICE9PSBmbjtcbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8uX2FkZE9uU2Vzc2lvblBheWxvYWQgPSBmdW5jdGlvbiBfYWRkT25TZXNzaW9uUGF5bG9hZChmbikge1xuICAgIHRoaXMuX2Nicy5zcC5wdXNoKGZuKTtcbiAgfTtcblxuICBfcHJvdG8uYWRkT25TZXNzaW9uID0gZnVuY3Rpb24gYWRkT25TZXNzaW9uKGZuKSB7XG4gICAgdGhpcy5fY2JzLnMucHVzaChmbik7XG4gIH07XG5cbiAgX3Byb3RvLnJlbW92ZU9uU2Vzc2lvbiA9IGZ1bmN0aW9uIHJlbW92ZU9uU2Vzc2lvbihmbikge1xuICAgIHRoaXMuX2Nicy5zID0gXyRmaWx0ZXJfMTIodGhpcy5fY2JzLnMsIGZ1bmN0aW9uIChmKSB7XG4gICAgICByZXR1cm4gZiAhPT0gZm47XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvLmFkZE9uQnJlYWRjcnVtYiA9IGZ1bmN0aW9uIGFkZE9uQnJlYWRjcnVtYihmbiwgZnJvbnQpIHtcbiAgICBpZiAoZnJvbnQgPT09IHZvaWQgMCkge1xuICAgICAgZnJvbnQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLl9jYnMuYltmcm9udCA/ICd1bnNoaWZ0JyA6ICdwdXNoJ10oZm4pO1xuICB9O1xuXG4gIF9wcm90by5yZW1vdmVPbkJyZWFkY3J1bWIgPSBmdW5jdGlvbiByZW1vdmVPbkJyZWFkY3J1bWIoZm4pIHtcbiAgICB0aGlzLl9jYnMuYiA9IF8kZmlsdGVyXzEyKHRoaXMuX2Nicy5iLCBmdW5jdGlvbiAoZikge1xuICAgICAgcmV0dXJuIGYgIT09IGZuO1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5wYXVzZVNlc3Npb24gPSBmdW5jdGlvbiBwYXVzZVNlc3Npb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Nlc3Npb25EZWxlZ2F0ZS5wYXVzZVNlc3Npb24odGhpcyk7XG4gIH07XG5cbiAgX3Byb3RvLnJlc3VtZVNlc3Npb24gPSBmdW5jdGlvbiByZXN1bWVTZXNzaW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9zZXNzaW9uRGVsZWdhdGUucmVzdW1lU2Vzc2lvbih0aGlzKTtcbiAgfTtcblxuICBfcHJvdG8ubGVhdmVCcmVhZGNydW1iID0gZnVuY3Rpb24gbGVhdmVCcmVhZGNydW1iKG1lc3NhZ2UsIG1ldGFkYXRhLCB0eXBlKSB7XG4gICAgLy8gY29lcmNlIGJhZCB2YWx1ZXMgc28gdGhhdCB0aGUgZGVmYXVsdHMgZ2V0IHNldFxuICAgIG1lc3NhZ2UgPSB0eXBlb2YgbWVzc2FnZSA9PT0gJ3N0cmluZycgPyBtZXNzYWdlIDogJyc7XG4gICAgdHlwZSA9IHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyAmJiBfJGluY2x1ZGVzXzEzKF8kYnJlYWRjcnVtYlR5cGVzXzgsIHR5cGUpID8gdHlwZSA6ICdtYW51YWwnO1xuICAgIG1ldGFkYXRhID0gdHlwZW9mIG1ldGFkYXRhID09PSAnb2JqZWN0JyAmJiBtZXRhZGF0YSAhPT0gbnVsbCA/IG1ldGFkYXRhIDoge307IC8vIGlmIG5vIG1lc3NhZ2UsIGRpc2NhcmRcblxuICAgIGlmICghbWVzc2FnZSkgcmV0dXJuO1xuICAgIHZhciBjcnVtYiA9IG5ldyBfJEJyZWFkY3J1bWJfMyhtZXNzYWdlLCBtZXRhZGF0YSwgdHlwZSk7IC8vIHJ1biBvbkJyZWFkY3J1bWIgY2FsbGJhY2tzXG5cbiAgICB2YXIgaWdub3JlID0gXyRzeW5jQ2FsbGJhY2tSdW5uZXJfMjIodGhpcy5fY2JzLmIsIGNydW1iLCAnb25CcmVhZGNydW1iJywgdGhpcy5fbG9nZ2VyKTtcblxuICAgIGlmIChpZ25vcmUpIHtcbiAgICAgIHRoaXMuX2xvZ2dlci5kZWJ1ZygnQnJlYWRjcnVtYiBub3QgYXR0YWNoZWQgZHVlIHRvIG9uQnJlYWRjcnVtYiBjYWxsYmFjaycpO1xuXG4gICAgICByZXR1cm47XG4gICAgfSAvLyBwdXNoIHRoZSB2YWxpZCBjcnVtYiBvbnRvIHRoZSBxdWV1ZSBhbmQgbWFpbnRhaW4gdGhlIGxlbmd0aFxuXG5cbiAgICB0aGlzLl9icmVhZGNydW1icy5wdXNoKGNydW1iKTtcblxuICAgIGlmICh0aGlzLl9icmVhZGNydW1icy5sZW5ndGggPiB0aGlzLl9jb25maWcubWF4QnJlYWRjcnVtYnMpIHtcbiAgICAgIHRoaXMuX2JyZWFkY3J1bWJzID0gdGhpcy5fYnJlYWRjcnVtYnMuc2xpY2UodGhpcy5fYnJlYWRjcnVtYnMubGVuZ3RoIC0gdGhpcy5fY29uZmlnLm1heEJyZWFkY3J1bWJzKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLm5vdGlmeSA9IGZ1bmN0aW9uIG5vdGlmeShtYXliZUVycm9yLCBvbkVycm9yLCBjYikge1xuICAgIGlmIChjYiA9PT0gdm9pZCAwKSB7XG4gICAgICBjYiA9IG5vb3A7XG4gICAgfVxuXG4gICAgdmFyIGV2ZW50ID0gXyRFdmVudF82LmNyZWF0ZShtYXliZUVycm9yLCB0cnVlLCB1bmRlZmluZWQsICdub3RpZnkoKScsIHRoaXMuX2RlcHRoICsgMSwgdGhpcy5fbG9nZ2VyKTtcblxuICAgIHRoaXMuX25vdGlmeShldmVudCwgb25FcnJvciwgY2IpO1xuICB9O1xuXG4gIF9wcm90by5fbm90aWZ5ID0gZnVuY3Rpb24gX25vdGlmeShldmVudCwgb25FcnJvciwgY2IpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIGlmIChjYiA9PT0gdm9pZCAwKSB7XG4gICAgICBjYiA9IG5vb3A7XG4gICAgfVxuXG4gICAgZXZlbnQuYXBwID0gXyRhc3NpZ25fMTEoe30sIGV2ZW50LmFwcCwge1xuICAgICAgcmVsZWFzZVN0YWdlOiB0aGlzLl9jb25maWcucmVsZWFzZVN0YWdlLFxuICAgICAgdmVyc2lvbjogdGhpcy5fY29uZmlnLmFwcFZlcnNpb24sXG4gICAgICB0eXBlOiB0aGlzLl9jb25maWcuYXBwVHlwZVxuICAgIH0pO1xuICAgIGV2ZW50LmNvbnRleHQgPSBldmVudC5jb250ZXh0IHx8IHRoaXMuX2NvbnRleHQ7XG4gICAgZXZlbnQuX21ldGFkYXRhID0gXyRhc3NpZ25fMTEoe30sIGV2ZW50Ll9tZXRhZGF0YSwgdGhpcy5fbWV0YWRhdGEpO1xuICAgIGV2ZW50Ll91c2VyID0gXyRhc3NpZ25fMTEoe30sIGV2ZW50Ll91c2VyLCB0aGlzLl91c2VyKTtcbiAgICBldmVudC5icmVhZGNydW1icyA9IHRoaXMuX2JyZWFkY3J1bWJzLnNsaWNlKCk7IC8vIGV4aXQgZWFybHkgaWYgZXZlbnRzIHNob3VsZCBub3QgYmUgc2VudCBvbiB0aGUgY3VycmVudCByZWxlYXNlU3RhZ2VcblxuICAgIGlmICh0aGlzLl9jb25maWcuZW5hYmxlZFJlbGVhc2VTdGFnZXMgIT09IG51bGwgJiYgIV8kaW5jbHVkZXNfMTModGhpcy5fY29uZmlnLmVuYWJsZWRSZWxlYXNlU3RhZ2VzLCB0aGlzLl9jb25maWcucmVsZWFzZVN0YWdlKSkge1xuICAgICAgdGhpcy5fbG9nZ2VyLndhcm4oJ0V2ZW50IG5vdCBzZW50IGR1ZSB0byByZWxlYXNlU3RhZ2UvZW5hYmxlZFJlbGVhc2VTdGFnZXMgY29uZmlndXJhdGlvbicpO1xuXG4gICAgICByZXR1cm4gY2IobnVsbCwgZXZlbnQpO1xuICAgIH1cblxuICAgIHZhciBvcmlnaW5hbFNldmVyaXR5ID0gZXZlbnQuc2V2ZXJpdHk7XG5cbiAgICB2YXIgb25DYWxsYmFja0Vycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgLy8gZXJyb3JzIGluIGNhbGxiYWNrcyBhcmUgdG9sZXJhdGVkIGJ1dCB3ZSB3YW50IHRvIGxvZyB0aGVtIG91dFxuICAgICAgX3RoaXMyLl9sb2dnZXIuZXJyb3IoJ0Vycm9yIG9jY3VycmVkIGluIG9uRXJyb3IgY2FsbGJhY2ssIGNvbnRpbnVpbmcgYW55d2F54oCmJyk7XG5cbiAgICAgIF90aGlzMi5fbG9nZ2VyLmVycm9yKGVycik7XG4gICAgfTtcblxuICAgIHZhciBjYWxsYmFja3MgPSBbXS5jb25jYXQodGhpcy5fY2JzLmUpLmNvbmNhdChvbkVycm9yKTtcbiAgICBfJGNhbGxiYWNrUnVubmVyXzkoY2FsbGJhY2tzLCBldmVudCwgb25DYWxsYmFja0Vycm9yLCBmdW5jdGlvbiAoZXJyLCBzaG91bGRTZW5kKSB7XG4gICAgICBpZiAoZXJyKSBvbkNhbGxiYWNrRXJyb3IoZXJyKTtcblxuICAgICAgaWYgKCFzaG91bGRTZW5kKSB7XG4gICAgICAgIF90aGlzMi5fbG9nZ2VyLmRlYnVnKCdFdmVudCBub3Qgc2VudCBkdWUgdG8gb25FcnJvciBjYWxsYmFjaycpO1xuXG4gICAgICAgIHJldHVybiBjYihudWxsLCBldmVudCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChfJGluY2x1ZGVzXzEzKF90aGlzMi5fY29uZmlnLmVuYWJsZWRCcmVhZGNydW1iVHlwZXMsICdlcnJvcicpKSB7XG4gICAgICAgIC8vIG9ubHkgbGVhdmUgYSBjcnVtYiBmb3IgdGhlIGVycm9yIGlmIGFjdHVhbGx5IGdvdCBzZW50XG4gICAgICAgIENsaWVudC5wcm90b3R5cGUubGVhdmVCcmVhZGNydW1iLmNhbGwoX3RoaXMyLCBldmVudC5lcnJvcnNbMF0uZXJyb3JDbGFzcywge1xuICAgICAgICAgIGVycm9yQ2xhc3M6IGV2ZW50LmVycm9yc1swXS5lcnJvckNsYXNzLFxuICAgICAgICAgIGVycm9yTWVzc2FnZTogZXZlbnQuZXJyb3JzWzBdLmVycm9yTWVzc2FnZSxcbiAgICAgICAgICBzZXZlcml0eTogZXZlbnQuc2V2ZXJpdHlcbiAgICAgICAgfSwgJ2Vycm9yJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcmlnaW5hbFNldmVyaXR5ICE9PSBldmVudC5zZXZlcml0eSkge1xuICAgICAgICBldmVudC5faGFuZGxlZFN0YXRlLnNldmVyaXR5UmVhc29uID0ge1xuICAgICAgICAgIHR5cGU6ICd1c2VyQ2FsbGJhY2tTZXRTZXZlcml0eSdcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKGV2ZW50LnVuaGFuZGxlZCAhPT0gZXZlbnQuX2hhbmRsZWRTdGF0ZS51bmhhbmRsZWQpIHtcbiAgICAgICAgZXZlbnQuX2hhbmRsZWRTdGF0ZS5zZXZlcml0eVJlYXNvbi51bmhhbmRsZWRPdmVycmlkZGVuID0gdHJ1ZTtcbiAgICAgICAgZXZlbnQuX2hhbmRsZWRTdGF0ZS51bmhhbmRsZWQgPSBldmVudC51bmhhbmRsZWQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChfdGhpczIuX3Nlc3Npb24pIHtcbiAgICAgICAgX3RoaXMyLl9zZXNzaW9uLl90cmFjayhldmVudCk7XG5cbiAgICAgICAgZXZlbnQuX3Nlc3Npb24gPSBfdGhpczIuX3Nlc3Npb247XG4gICAgICB9XG5cbiAgICAgIF90aGlzMi5fZGVsaXZlcnkuc2VuZEV2ZW50KHtcbiAgICAgICAgYXBpS2V5OiBldmVudC5hcGlLZXkgfHwgX3RoaXMyLl9jb25maWcuYXBpS2V5LFxuICAgICAgICBub3RpZmllcjogX3RoaXMyLl9ub3RpZmllcixcbiAgICAgICAgZXZlbnRzOiBbZXZlbnRdXG4gICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHJldHVybiBjYihlcnIsIGV2ZW50KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBDbGllbnQ7XG59KCk7XG5cbnZhciBnZW5lcmF0ZUNvbmZpZ0Vycm9yTWVzc2FnZSA9IGZ1bmN0aW9uIChlcnJvcnMsIHJhd0lucHV0KSB7XG4gIHZhciBlciA9IG5ldyBFcnJvcihcIkludmFsaWQgY29uZmlndXJhdGlvblxcblwiICsgXyRtYXBfMTYoXyRrZXlzXzE1KGVycm9ycyksIGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gXCIgIC0gXCIgKyBrZXkgKyBcIiBcIiArIGVycm9yc1trZXldICsgXCIsIGdvdCBcIiArIHN0cmluZ2lmeShyYXdJbnB1dFtrZXldKTtcbiAgfSkuam9pbignXFxuXFxuJykpO1xuICByZXR1cm4gZXI7XG59O1xuXG52YXIgc3RyaW5naWZ5ID0gZnVuY3Rpb24gKHZhbCkge1xuICBzd2l0Y2ggKHR5cGVvZiB2YWwpIHtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgIGNhc2UgJ251bWJlcic6XG4gICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWwpO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBTdHJpbmcodmFsKTtcbiAgfVxufTtcblxudmFyIF8kQ2xpZW50XzQgPSBDbGllbnQ7XG5cbnZhciBfJHNhZmVKc29uU3RyaW5naWZ5XzI5ID0gZnVuY3Rpb24gKGRhdGEsIHJlcGxhY2VyLCBzcGFjZSwgb3B0cykge1xuICB2YXIgcmVkYWN0ZWRLZXlzID0gb3B0cyAmJiBvcHRzLnJlZGFjdGVkS2V5cyA/IG9wdHMucmVkYWN0ZWRLZXlzIDogW107XG4gIHZhciByZWRhY3RlZFBhdGhzID0gb3B0cyAmJiBvcHRzLnJlZGFjdGVkUGF0aHMgPyBvcHRzLnJlZGFjdGVkUGF0aHMgOiBbXTtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHByZXBhcmVPYmpGb3JTZXJpYWxpemF0aW9uKGRhdGEsIHJlZGFjdGVkS2V5cywgcmVkYWN0ZWRQYXRocyksIHJlcGxhY2VyLCBzcGFjZSk7XG59O1xuXG52YXIgTUFYX0RFUFRIID0gMjA7XG52YXIgTUFYX0VER0VTID0gMjUwMDA7XG52YXIgTUlOX1BSRVNFUlZFRF9ERVBUSCA9IDg7XG52YXIgUkVQTEFDRU1FTlRfTk9ERSA9ICcuLi4nO1xuXG5mdW5jdGlvbiBfX2lzRXJyb3JfMjkobykge1xuICByZXR1cm4gbyBpbnN0YW5jZW9mIEVycm9yIHx8IC9eXFxbb2JqZWN0IChFcnJvcnwoRG9tKT9FeGNlcHRpb24pXFxdJC8udGVzdChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykpO1xufVxuXG5mdW5jdGlvbiB0aHJvd3NNZXNzYWdlKGVycikge1xuICByZXR1cm4gJ1tUaHJvd3M6ICcgKyAoZXJyID8gZXJyLm1lc3NhZ2UgOiAnPycpICsgJ10nO1xufVxuXG5mdW5jdGlvbiBmaW5kKGhheXN0YWNrLCBuZWVkbGUpIHtcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGhheXN0YWNrLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGhheXN0YWNrW2ldID09PSBuZWVkbGUpIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufSAvLyByZXR1cm5zIHRydWUgaWYgdGhlIHN0cmluZyBgcGF0aGAgc3RhcnRzIHdpdGggYW55IG9mIHRoZSBwcm92aWRlZCBgcGF0aHNgXG5cblxuZnVuY3Rpb24gaXNEZXNjZW5kZW50KHBhdGhzLCBwYXRoKSB7XG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBwYXRocy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChwYXRoLmluZGV4T2YocGF0aHNbaV0pID09PSAwKSByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkUmVkYWN0KHBhdHRlcm5zLCBrZXkpIHtcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHBhdHRlcm5zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKHR5cGVvZiBwYXR0ZXJuc1tpXSA9PT0gJ3N0cmluZycgJiYgcGF0dGVybnNbaV0udG9Mb3dlckNhc2UoKSA9PT0ga2V5LnRvTG93ZXJDYXNlKCkpIHJldHVybiB0cnVlO1xuICAgIGlmIChwYXR0ZXJuc1tpXSAmJiB0eXBlb2YgcGF0dGVybnNbaV0udGVzdCA9PT0gJ2Z1bmN0aW9uJyAmJiBwYXR0ZXJuc1tpXS50ZXN0KGtleSkpIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBfX2lzQXJyYXlfMjkob2JqKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cblxuZnVuY3Rpb24gc2FmZWx5R2V0UHJvcChvYmosIHByb3ApIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gb2JqW3Byb3BdO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gdGhyb3dzTWVzc2FnZShlcnIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVPYmpGb3JTZXJpYWxpemF0aW9uKG9iaiwgcmVkYWN0ZWRLZXlzLCByZWRhY3RlZFBhdGhzKSB7XG4gIHZhciBzZWVuID0gW107IC8vIHN0b3JlIHJlZmVyZW5jZXMgdG8gb2JqZWN0cyB3ZSBoYXZlIHNlZW4gYmVmb3JlXG5cbiAgdmFyIGVkZ2VzID0gMDtcblxuICBmdW5jdGlvbiB2aXNpdChvYmosIHBhdGgpIHtcbiAgICBmdW5jdGlvbiBlZGdlc0V4Y2VlZGVkKCkge1xuICAgICAgcmV0dXJuIHBhdGgubGVuZ3RoID4gTUlOX1BSRVNFUlZFRF9ERVBUSCAmJiBlZGdlcyA+IE1BWF9FREdFUztcbiAgICB9XG5cbiAgICBlZGdlcysrO1xuICAgIGlmIChwYXRoLmxlbmd0aCA+IE1BWF9ERVBUSCkgcmV0dXJuIFJFUExBQ0VNRU5UX05PREU7XG4gICAgaWYgKGVkZ2VzRXhjZWVkZWQoKSkgcmV0dXJuIFJFUExBQ0VNRU5UX05PREU7XG4gICAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JykgcmV0dXJuIG9iajtcbiAgICBpZiAoZmluZChzZWVuLCBvYmopKSByZXR1cm4gJ1tDaXJjdWxhcl0nO1xuICAgIHNlZW4ucHVzaChvYmopO1xuXG4gICAgaWYgKHR5cGVvZiBvYmoudG9KU09OID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyB3ZSdyZSBub3QgZ29pbmcgdG8gY291bnQgdGhpcyBhcyBhbiBlZGdlIGJlY2F1c2UgaXRcbiAgICAgICAgLy8gcmVwbGFjZXMgdGhlIHZhbHVlIG9mIHRoZSBjdXJyZW50bHkgdmlzaXRlZCBvYmplY3RcbiAgICAgICAgZWRnZXMtLTtcbiAgICAgICAgdmFyIGZSZXN1bHQgPSB2aXNpdChvYmoudG9KU09OKCksIHBhdGgpO1xuICAgICAgICBzZWVuLnBvcCgpO1xuICAgICAgICByZXR1cm4gZlJlc3VsdDtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXR1cm4gdGhyb3dzTWVzc2FnZShlcnIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBlciA9IF9faXNFcnJvcl8yOShvYmopO1xuXG4gICAgaWYgKGVyKSB7XG4gICAgICBlZGdlcy0tO1xuICAgICAgdmFyIGVSZXN1bHQgPSB2aXNpdCh7XG4gICAgICAgIG5hbWU6IG9iai5uYW1lLFxuICAgICAgICBtZXNzYWdlOiBvYmoubWVzc2FnZVxuICAgICAgfSwgcGF0aCk7XG4gICAgICBzZWVuLnBvcCgpO1xuICAgICAgcmV0dXJuIGVSZXN1bHQ7XG4gICAgfVxuXG4gICAgaWYgKF9faXNBcnJheV8yOShvYmopKSB7XG4gICAgICB2YXIgYVJlc3VsdCA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gb2JqLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChlZGdlc0V4Y2VlZGVkKCkpIHtcbiAgICAgICAgICBhUmVzdWx0LnB1c2goUkVQTEFDRU1FTlRfTk9ERSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBhUmVzdWx0LnB1c2godmlzaXQob2JqW2ldLCBwYXRoLmNvbmNhdCgnW10nKSkpO1xuICAgICAgfVxuXG4gICAgICBzZWVuLnBvcCgpO1xuICAgICAgcmV0dXJuIGFSZXN1bHQ7XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAodmFyIHByb3AgaW4gb2JqKSB7XG4gICAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIGNvbnRpbnVlO1xuXG4gICAgICAgIGlmIChpc0Rlc2NlbmRlbnQocmVkYWN0ZWRQYXRocywgcGF0aC5qb2luKCcuJykpICYmIHNob3VsZFJlZGFjdChyZWRhY3RlZEtleXMsIHByb3ApKSB7XG4gICAgICAgICAgcmVzdWx0W3Byb3BdID0gJ1tSRURBQ1RFRF0nO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVkZ2VzRXhjZWVkZWQoKSkge1xuICAgICAgICAgIHJlc3VsdFtwcm9wXSA9IFJFUExBQ0VNRU5UX05PREU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHRbcHJvcF0gPSB2aXNpdChzYWZlbHlHZXRQcm9wKG9iaiwgcHJvcCksIHBhdGguY29uY2F0KHByb3ApKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgc2Vlbi5wb3AoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcmV0dXJuIHZpc2l0KG9iaiwgW10pO1xufVxuXG52YXIgXyRqc29uUGF5bG9hZF8yMCA9IHt9O1xuLyogcmVtb3ZlZDogdmFyIF8kc2FmZUpzb25TdHJpbmdpZnlfMjkgPSByZXF1aXJlKCdAYnVnc25hZy9zYWZlLWpzb24tc3RyaW5naWZ5Jyk7ICovO1xuXG52YXIgRVZFTlRfUkVEQUNUSU9OX1BBVEhTID0gWydldmVudHMuW10ubWV0YURhdGEnLCAnZXZlbnRzLltdLmJyZWFkY3J1bWJzLltdLm1ldGFEYXRhJywgJ2V2ZW50cy5bXS5yZXF1ZXN0J107XG5cbl8kanNvblBheWxvYWRfMjAuZXZlbnQgPSBmdW5jdGlvbiAoZXZlbnQsIHJlZGFjdGVkS2V5cykge1xuICB2YXIgcGF5bG9hZCA9IF8kc2FmZUpzb25TdHJpbmdpZnlfMjkoZXZlbnQsIG51bGwsIG51bGwsIHtcbiAgICByZWRhY3RlZFBhdGhzOiBFVkVOVF9SRURBQ1RJT05fUEFUSFMsXG4gICAgcmVkYWN0ZWRLZXlzOiByZWRhY3RlZEtleXNcbiAgfSk7XG5cbiAgaWYgKHBheWxvYWQubGVuZ3RoID4gMTBlNSkge1xuICAgIGV2ZW50LmV2ZW50c1swXS5fbWV0YWRhdGEgPSB7XG4gICAgICBub3RpZmllcjogXCJXQVJOSU5HIVxcblNlcmlhbGl6ZWQgcGF5bG9hZCB3YXMgXCIgKyBwYXlsb2FkLmxlbmd0aCAvIDEwZTUgKyBcIk1CIChsaW1pdCA9IDFNQilcXG5tZXRhZGF0YSB3YXMgcmVtb3ZlZFwiXG4gICAgfTtcbiAgICBwYXlsb2FkID0gXyRzYWZlSnNvblN0cmluZ2lmeV8yOShldmVudCwgbnVsbCwgbnVsbCwge1xuICAgICAgcmVkYWN0ZWRQYXRoczogRVZFTlRfUkVEQUNUSU9OX1BBVEhTLFxuICAgICAgcmVkYWN0ZWRLZXlzOiByZWRhY3RlZEtleXNcbiAgICB9KTtcbiAgICBpZiAocGF5bG9hZC5sZW5ndGggPiAxMGU1KSB0aHJvdyBuZXcgRXJyb3IoJ3BheWxvYWQgZXhjZWVkZWQgMU1CIGxpbWl0Jyk7XG4gIH1cblxuICByZXR1cm4gcGF5bG9hZDtcbn07XG5cbl8kanNvblBheWxvYWRfMjAuc2Vzc2lvbiA9IGZ1bmN0aW9uIChldmVudCwgcmVkYWN0ZWRLZXlzKSB7XG4gIHZhciBwYXlsb2FkID0gXyRzYWZlSnNvblN0cmluZ2lmeV8yOShldmVudCwgbnVsbCwgbnVsbCk7XG4gIGlmIChwYXlsb2FkLmxlbmd0aCA+IDEwZTUpIHRocm93IG5ldyBFcnJvcigncGF5bG9hZCBleGNlZWRlZCAxTUIgbGltaXQnKTtcbiAgcmV0dXJuIHBheWxvYWQ7XG59O1xuXG52YXIgXyRkZWxpdmVyeV8zNSA9IHt9O1xuLyogcmVtb3ZlZDogdmFyIF8kanNvblBheWxvYWRfMjAgPSByZXF1aXJlKCdAYnVnc25hZy9jb3JlL2xpYi9qc29uLXBheWxvYWQnKTsgKi87XG5cbl8kZGVsaXZlcnlfMzUgPSBmdW5jdGlvbiAoY2xpZW50LCB3aW4pIHtcbiAgaWYgKHdpbiA9PT0gdm9pZCAwKSB7XG4gICAgd2luID0gd2luZG93O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzZW5kRXZlbnQ6IGZ1bmN0aW9uIChldmVudCwgY2IpIHtcbiAgICAgIGlmIChjYiA9PT0gdm9pZCAwKSB7XG4gICAgICAgIGNiID0gZnVuY3Rpb24gKCkge307XG4gICAgICB9XG5cbiAgICAgIHZhciB1cmwgPSBnZXRBcGlVcmwoY2xpZW50Ll9jb25maWcsICdub3RpZnknLCAnNCcsIHdpbik7XG4gICAgICB2YXIgcmVxID0gbmV3IHdpbi5YRG9tYWluUmVxdWVzdCgpO1xuXG4gICAgICByZXEub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjYihudWxsKTtcbiAgICAgIH07XG5cbiAgICAgIHJlcS5vcGVuKCdQT1NUJywgdXJsKTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlcS5zZW5kKF8kanNvblBheWxvYWRfMjAuZXZlbnQoZXZlbnQsIGNsaWVudC5fY29uZmlnLnJlZGFjdGVkS2V5cykpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY2xpZW50Ll9sb2dnZXIuZXJyb3IoZSk7XG5cbiAgICAgICAgICBjYihlKTtcbiAgICAgICAgfVxuICAgICAgfSwgMCk7XG4gICAgfSxcbiAgICBzZW5kU2Vzc2lvbjogZnVuY3Rpb24gKHNlc3Npb24sIGNiKSB7XG4gICAgICBpZiAoY2IgPT09IHZvaWQgMCkge1xuICAgICAgICBjYiA9IGZ1bmN0aW9uICgpIHt9O1xuICAgICAgfVxuXG4gICAgICB2YXIgdXJsID0gZ2V0QXBpVXJsKGNsaWVudC5fY29uZmlnLCAnc2Vzc2lvbnMnLCAnMScsIHdpbik7XG4gICAgICB2YXIgcmVxID0gbmV3IHdpbi5YRG9tYWluUmVxdWVzdCgpO1xuXG4gICAgICByZXEub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjYihudWxsKTtcbiAgICAgIH07XG5cbiAgICAgIHJlcS5vcGVuKCdQT1NUJywgdXJsKTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlcS5zZW5kKF8kanNvblBheWxvYWRfMjAuc2Vzc2lvbihzZXNzaW9uLCBjbGllbnQuX2NvbmZpZy5yZWRhY3RlZEtleXMpKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGNsaWVudC5fbG9nZ2VyLmVycm9yKGUpO1xuXG4gICAgICAgICAgY2IoZSk7XG4gICAgICAgIH1cbiAgICAgIH0sIDApO1xuICAgIH1cbiAgfTtcbn07XG5cbnZhciBnZXRBcGlVcmwgPSBmdW5jdGlvbiAoY29uZmlnLCBlbmRwb2ludCwgdmVyc2lvbiwgd2luKSB7XG4gIC8vIElFOCBkb2Vzbid0IHN1cHBvcnQgRGF0ZS5wcm90b3R5cGUudG9JU09zdHJpbmcoKSwgYnV0IGl0IGRvZXMgY29udmVydCBhIGRhdGVcbiAgLy8gdG8gYW4gSVNPIHN0cmluZyB3aGVuIHlvdSB1c2UgSlNPTiBzdHJpbmdpZnkuIFNpbXBseSBwYXJzaW5nIHRoZSByZXN1bHQgb2ZcbiAgLy8gSlNPTi5zdHJpbmdpZnkgaXMgc21hbGxlciB0aGFuIHVzaW5nIGEgdG9JU09zdHJpbmcoKSBwb2x5ZmlsbC5cbiAgdmFyIGlzb0RhdGUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG5ldyBEYXRlKCkpKTtcbiAgdmFyIHVybCA9IG1hdGNoUGFnZVByb3RvY29sKGNvbmZpZy5lbmRwb2ludHNbZW5kcG9pbnRdLCB3aW4ubG9jYXRpb24ucHJvdG9jb2wpO1xuICByZXR1cm4gdXJsICsgXCI/YXBpS2V5PVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KGNvbmZpZy5hcGlLZXkpICsgXCImcGF5bG9hZFZlcnNpb249XCIgKyB2ZXJzaW9uICsgXCImc2VudEF0PVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KGlzb0RhdGUpO1xufTtcblxudmFyIG1hdGNoUGFnZVByb3RvY29sID0gXyRkZWxpdmVyeV8zNS5fbWF0Y2hQYWdlUHJvdG9jb2wgPSBmdW5jdGlvbiAoZW5kcG9pbnQsIHBhZ2VQcm90b2NvbCkge1xuICByZXR1cm4gcGFnZVByb3RvY29sID09PSAnaHR0cDonID8gZW5kcG9pbnQucmVwbGFjZSgvXmh0dHBzOi8sICdodHRwOicpIDogZW5kcG9pbnQ7XG59O1xuXG4vKiByZW1vdmVkOiB2YXIgXyRqc29uUGF5bG9hZF8yMCA9IHJlcXVpcmUoJ0BidWdzbmFnL2NvcmUvbGliL2pzb24tcGF5bG9hZCcpOyAqLztcblxudmFyIF8kZGVsaXZlcnlfMzYgPSBmdW5jdGlvbiAoY2xpZW50LCB3aW4pIHtcbiAgaWYgKHdpbiA9PT0gdm9pZCAwKSB7XG4gICAgd2luID0gd2luZG93O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzZW5kRXZlbnQ6IGZ1bmN0aW9uIChldmVudCwgY2IpIHtcbiAgICAgIGlmIChjYiA9PT0gdm9pZCAwKSB7XG4gICAgICAgIGNiID0gZnVuY3Rpb24gKCkge307XG4gICAgICB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciB1cmwgPSBjbGllbnQuX2NvbmZpZy5lbmRwb2ludHMubm90aWZ5O1xuICAgICAgICB2YXIgcmVxID0gbmV3IHdpbi5YTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICAgIHJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKHJlcS5yZWFkeVN0YXRlID09PSB3aW4uWE1MSHR0cFJlcXVlc3QuRE9ORSkgY2IobnVsbCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVxLm9wZW4oJ1BPU1QnLCB1cmwpO1xuICAgICAgICByZXEuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgcmVxLnNldFJlcXVlc3RIZWFkZXIoJ0J1Z3NuYWctQXBpLUtleScsIGV2ZW50LmFwaUtleSB8fCBjbGllbnQuX2NvbmZpZy5hcGlLZXkpO1xuICAgICAgICByZXEuc2V0UmVxdWVzdEhlYWRlcignQnVnc25hZy1QYXlsb2FkLVZlcnNpb24nLCAnNCcpO1xuICAgICAgICByZXEuc2V0UmVxdWVzdEhlYWRlcignQnVnc25hZy1TZW50LUF0JywgbmV3IERhdGUoKS50b0lTT1N0cmluZygpKTtcbiAgICAgICAgcmVxLnNlbmQoXyRqc29uUGF5bG9hZF8yMC5ldmVudChldmVudCwgY2xpZW50Ll9jb25maWcucmVkYWN0ZWRLZXlzKSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNsaWVudC5fbG9nZ2VyLmVycm9yKGUpO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2VuZFNlc3Npb246IGZ1bmN0aW9uIChzZXNzaW9uLCBjYikge1xuICAgICAgaWYgKGNiID09PSB2b2lkIDApIHtcbiAgICAgICAgY2IgPSBmdW5jdGlvbiAoKSB7fTtcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIHVybCA9IGNsaWVudC5fY29uZmlnLmVuZHBvaW50cy5zZXNzaW9ucztcbiAgICAgICAgdmFyIHJlcSA9IG5ldyB3aW4uWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgICByZXEub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChyZXEucmVhZHlTdGF0ZSA9PT0gd2luLlhNTEh0dHBSZXF1ZXN0LkRPTkUpIGNiKG51bGwpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlcS5vcGVuKCdQT1NUJywgdXJsKTtcbiAgICAgICAgcmVxLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICAgIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKCdCdWdzbmFnLUFwaS1LZXknLCBjbGllbnQuX2NvbmZpZy5hcGlLZXkpO1xuICAgICAgICByZXEuc2V0UmVxdWVzdEhlYWRlcignQnVnc25hZy1QYXlsb2FkLVZlcnNpb24nLCAnMScpO1xuICAgICAgICByZXEuc2V0UmVxdWVzdEhlYWRlcignQnVnc25hZy1TZW50LUF0JywgbmV3IERhdGUoKS50b0lTT1N0cmluZygpKTtcbiAgICAgICAgcmVxLnNlbmQoXyRqc29uUGF5bG9hZF8yMC5zZXNzaW9uKHNlc3Npb24sIGNsaWVudC5fY29uZmlnLnJlZGFjdGVkS2V5cykpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjbGllbnQuX2xvZ2dlci5lcnJvcihlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59O1xuXG52YXIgYXBwU3RhcnQgPSBuZXcgRGF0ZSgpO1xuXG52YXIgcmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gIGFwcFN0YXJ0ID0gbmV3IERhdGUoKTtcbn07XG5cbnZhciBfJGFwcF8zNyA9IHtcbiAgbmFtZTogJ2FwcER1cmF0aW9uJyxcbiAgbG9hZDogZnVuY3Rpb24gKGNsaWVudCkge1xuICAgIGNsaWVudC5hZGRPbkVycm9yKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICBldmVudC5hcHAuZHVyYXRpb24gPSBub3cgLSBhcHBTdGFydDtcbiAgICB9LCB0cnVlKTtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzZXQ6IHJlc2V0XG4gICAgfTtcbiAgfVxufTtcblxuLypcbiAqIFNldHMgdGhlIGRlZmF1bHQgY29udGV4dCB0byBiZSB0aGUgY3VycmVudCBVUkxcbiAqL1xudmFyIF8kY29udGV4dF8zOCA9IGZ1bmN0aW9uICh3aW4pIHtcbiAgaWYgKHdpbiA9PT0gdm9pZCAwKSB7XG4gICAgd2luID0gd2luZG93O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBsb2FkOiBmdW5jdGlvbiAoY2xpZW50KSB7XG4gICAgICBjbGllbnQuYWRkT25FcnJvcihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmNvbnRleHQgIT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAgICAgICBldmVudC5jb250ZXh0ID0gd2luLmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgICAgfSwgdHJ1ZSk7XG4gICAgfVxuICB9O1xufTtcblxudmFyIF8kcGFkXzQyID0gZnVuY3Rpb24gcGFkKG51bSwgc2l6ZSkge1xuICB2YXIgcyA9ICcwMDAwMDAwMDAnICsgbnVtO1xuICByZXR1cm4gcy5zdWJzdHIocy5sZW5ndGggLSBzaXplKTtcbn07XG5cbi8qIHJlbW92ZWQ6IHZhciBfJHBhZF80MiA9IHJlcXVpcmUoJy4vcGFkLmpzJyk7ICovO1xuXG52YXIgX19lbnZfNDEgPSB0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyA/IHdpbmRvdyA6IHNlbGY7XG52YXIgX19nbG9iYWxDb3VudF80MSA9IDA7XG5cbmZvciAodmFyIF9fcHJvcF80MSBpbiBfX2Vudl80MSkge1xuICBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwoX19lbnZfNDEsIF9fcHJvcF80MSkpIF9fZ2xvYmFsQ291bnRfNDErKztcbn1cblxudmFyIF9fbWltZVR5cGVzTGVuZ3RoXzQxID0gbmF2aWdhdG9yLm1pbWVUeXBlcyA/IG5hdmlnYXRvci5taW1lVHlwZXMubGVuZ3RoIDogMDtcbnZhciBfX2NsaWVudElkXzQxID0gXyRwYWRfNDIoKF9fbWltZVR5cGVzTGVuZ3RoXzQxICsgbmF2aWdhdG9yLnVzZXJBZ2VudC5sZW5ndGgpLnRvU3RyaW5nKDM2KSArIF9fZ2xvYmFsQ291bnRfNDEudG9TdHJpbmcoMzYpLCA0KTtcblxudmFyIF8kZmluZ2VycHJpbnRfNDEgPSBmdW5jdGlvbiBmaW5nZXJwcmludCgpIHtcbiAgcmV0dXJuIF9fY2xpZW50SWRfNDE7XG59O1xuXG4vKipcbiAqIGN1aWQuanNcbiAqIENvbGxpc2lvbi1yZXNpc3RhbnQgVUlEIGdlbmVyYXRvciBmb3IgYnJvd3NlcnMgYW5kIG5vZGUuXG4gKiBTZXF1ZW50aWFsIGZvciBmYXN0IGRiIGxvb2t1cHMgYW5kIHJlY2VuY3kgc29ydGluZy5cbiAqIFNhZmUgZm9yIGVsZW1lbnQgSURzIGFuZCBzZXJ2ZXItc2lkZSBsb29rdXBzLlxuICpcbiAqIEV4dHJhY3RlZCBmcm9tIENMQ1RSXG4gKlxuICogQ29weXJpZ2h0IChjKSBFcmljIEVsbGlvdHQgMjAxMlxuICogTUlUIExpY2Vuc2VcbiAqL1xuLyogcmVtb3ZlZDogdmFyIF8kZmluZ2VycHJpbnRfNDEgPSByZXF1aXJlKCcuL2xpYi9maW5nZXJwcmludC5qcycpOyAqLztcblxuLyogcmVtb3ZlZDogdmFyIF8kcGFkXzQyID0gcmVxdWlyZSgnLi9saWIvcGFkLmpzJyk7ICovO1xuXG52YXIgX19jXzQwID0gMCxcbiAgICBfX2Jsb2NrU2l6ZV80MCA9IDQsXG4gICAgX19iYXNlXzQwID0gMzYsXG4gICAgX19kaXNjcmV0ZVZhbHVlc180MCA9IE1hdGgucG93KF9fYmFzZV80MCwgX19ibG9ja1NpemVfNDApO1xuXG5mdW5jdGlvbiBfX3JhbmRvbUJsb2NrXzQwKCkge1xuICByZXR1cm4gXyRwYWRfNDIoKE1hdGgucmFuZG9tKCkgKiBfX2Rpc2NyZXRlVmFsdWVzXzQwIDw8IDApLnRvU3RyaW5nKF9fYmFzZV80MCksIF9fYmxvY2tTaXplXzQwKTtcbn1cblxuZnVuY3Rpb24gX19zYWZlQ291bnRlcl80MCgpIHtcbiAgX19jXzQwID0gX19jXzQwIDwgX19kaXNjcmV0ZVZhbHVlc180MCA/IF9fY180MCA6IDA7XG4gIF9fY180MCsrOyAvLyB0aGlzIGlzIG5vdCBzdWJsaW1pbmFsXG5cbiAgcmV0dXJuIF9fY180MCAtIDE7XG59XG5cbmZ1bmN0aW9uIF9fY3VpZF80MCgpIHtcbiAgLy8gU3RhcnRpbmcgd2l0aCBhIGxvd2VyY2FzZSBsZXR0ZXIgbWFrZXNcbiAgLy8gaXQgSFRNTCBlbGVtZW50IElEIGZyaWVuZGx5LlxuICB2YXIgbGV0dGVyID0gJ2MnLFxuICAgICAgLy8gaGFyZC1jb2RlZCBhbGxvd3MgZm9yIHNlcXVlbnRpYWwgYWNjZXNzXG4gIC8vIHRpbWVzdGFtcFxuICAvLyB3YXJuaW5nOiB0aGlzIGV4cG9zZXMgdGhlIGV4YWN0IGRhdGUgYW5kIHRpbWVcbiAgLy8gdGhhdCB0aGUgdWlkIHdhcyBjcmVhdGVkLlxuICB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKS50b1N0cmluZyhfX2Jhc2VfNDApLFxuICAgICAgLy8gUHJldmVudCBzYW1lLW1hY2hpbmUgY29sbGlzaW9ucy5cbiAgY291bnRlciA9IF8kcGFkXzQyKF9fc2FmZUNvdW50ZXJfNDAoKS50b1N0cmluZyhfX2Jhc2VfNDApLCBfX2Jsb2NrU2l6ZV80MCksXG4gICAgICAvLyBBIGZldyBjaGFycyB0byBnZW5lcmF0ZSBkaXN0aW5jdCBpZHMgZm9yIGRpZmZlcmVudFxuICAvLyBjbGllbnRzIChzbyBkaWZmZXJlbnQgY29tcHV0ZXJzIGFyZSBmYXIgbGVzc1xuICAvLyBsaWtlbHkgdG8gZ2VuZXJhdGUgdGhlIHNhbWUgaWQpXG4gIHByaW50ID0gXyRmaW5nZXJwcmludF80MSgpLFxuICAgICAgLy8gR3JhYiBzb21lIG1vcmUgY2hhcnMgZnJvbSBNYXRoLnJhbmRvbSgpXG4gIHJhbmRvbSA9IF9fcmFuZG9tQmxvY2tfNDAoKSArIF9fcmFuZG9tQmxvY2tfNDAoKTtcbiAgcmV0dXJuIGxldHRlciArIHRpbWVzdGFtcCArIGNvdW50ZXIgKyBwcmludCArIHJhbmRvbTtcbn1cblxuX19jdWlkXzQwLmZpbmdlcnByaW50ID0gXyRmaW5nZXJwcmludF80MTtcbnZhciBfJGN1aWRfNDAgPSBfX2N1aWRfNDA7XG5cbi8qIHJlbW92ZWQ6IHZhciBfJGN1aWRfNDAgPSByZXF1aXJlKCdAYnVnc25hZy9jdWlkJyk7ICovO1xuXG4vKiByZW1vdmVkOiB2YXIgXyRhc3NpZ25fMTEgPSByZXF1aXJlKCdAYnVnc25hZy9jb3JlL2xpYi9lcy11dGlscy9hc3NpZ24nKTsgKi87XG5cbnZhciBCVUdTTkFHX0FOT05ZTU9VU19JRF9LRVkgPSAnYnVnc25hZy1hbm9ueW1vdXMtaWQnO1xuXG52YXIgZ2V0RGV2aWNlSWQgPSBmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgdmFyIHN0b3JhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlO1xuICAgIHZhciBpZCA9IHN0b3JhZ2UuZ2V0SXRlbShCVUdTTkFHX0FOT05ZTU9VU19JRF9LRVkpOyAvLyBJZiB3ZSBnZXQgYW4gSUQsIG1ha2Ugc3VyZSBpdCBsb29rcyBsaWtlIGEgdmFsaWQgY3VpZC4gVGhlIGxlbmd0aCBjYW5cbiAgICAvLyBmbHVjdHVhdGUgc2xpZ2h0bHksIHNvIHNvbWUgbGVld2F5IGlzIGJ1aWx0IGluXG5cbiAgICBpZiAoaWQgJiYgL15jW2EtejAtOV17MjAsMzJ9JC8udGVzdChpZCkpIHtcbiAgICAgIHJldHVybiBpZDtcbiAgICB9XG5cbiAgICBpZCA9IF8kY3VpZF80MCgpO1xuICAgIHN0b3JhZ2Uuc2V0SXRlbShCVUdTTkFHX0FOT05ZTU9VU19JRF9LRVksIGlkKTtcbiAgICByZXR1cm4gaWQ7XG4gIH0gY2F0Y2ggKGVycikgey8vIElmIGxvY2FsU3RvcmFnZSBpcyBub3QgYXZhaWxhYmxlIChlLmcuIGJlY2F1c2UgaXQncyBkaXNhYmxlZCkgdGhlbiBnaXZlIHVwXG4gIH1cbn07XG4vKlxuICogQXV0b21hdGljYWxseSBkZXRlY3RzIGJyb3dzZXIgZGV2aWNlIGRldGFpbHNcbiAqL1xuXG5cbnZhciBfJGRldmljZV8zOSA9IGZ1bmN0aW9uIChuYXYsIHNjcmVlbikge1xuICBpZiAobmF2ID09PSB2b2lkIDApIHtcbiAgICBuYXYgPSBuYXZpZ2F0b3I7XG4gIH1cblxuICBpZiAoc2NyZWVuID09PSB2b2lkIDApIHtcbiAgICBzY3JlZW4gPSB3aW5kb3cuc2NyZWVuO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBsb2FkOiBmdW5jdGlvbiAoY2xpZW50KSB7XG4gICAgICB2YXIgZGV2aWNlID0ge1xuICAgICAgICBsb2NhbGU6IG5hdi5icm93c2VyTGFuZ3VhZ2UgfHwgbmF2LnN5c3RlbUxhbmd1YWdlIHx8IG5hdi51c2VyTGFuZ3VhZ2UgfHwgbmF2Lmxhbmd1YWdlLFxuICAgICAgICB1c2VyQWdlbnQ6IG5hdi51c2VyQWdlbnRcbiAgICAgIH07XG5cbiAgICAgIGlmIChzY3JlZW4gJiYgc2NyZWVuLm9yaWVudGF0aW9uICYmIHNjcmVlbi5vcmllbnRhdGlvbi50eXBlKSB7XG4gICAgICAgIGRldmljZS5vcmllbnRhdGlvbiA9IHNjcmVlbi5vcmllbnRhdGlvbi50eXBlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGV2aWNlLm9yaWVudGF0aW9uID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoID4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCA/ICdsYW5kc2NhcGUnIDogJ3BvcnRyYWl0JztcbiAgICAgIH1cblxuICAgICAgaWYgKGNsaWVudC5fY29uZmlnLmdlbmVyYXRlQW5vbnltb3VzSWQpIHtcbiAgICAgICAgZGV2aWNlLmlkID0gZ2V0RGV2aWNlSWQoKTtcbiAgICAgIH1cblxuICAgICAgY2xpZW50LmFkZE9uU2Vzc2lvbihmdW5jdGlvbiAoc2Vzc2lvbikge1xuICAgICAgICBzZXNzaW9uLmRldmljZSA9IF8kYXNzaWduXzExKHt9LCBzZXNzaW9uLmRldmljZSwgZGV2aWNlKTtcbiAgICAgIH0pOyAvLyBhZGQgdGltZSBqdXN0IGFzIHRoZSBldmVudCBpcyBzZW50XG5cbiAgICAgIGNsaWVudC5hZGRPbkVycm9yKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5kZXZpY2UgPSBfJGFzc2lnbl8xMSh7fSwgZXZlbnQuZGV2aWNlLCBkZXZpY2UsIHtcbiAgICAgICAgICB0aW1lOiBuZXcgRGF0ZSgpXG4gICAgICAgIH0pO1xuICAgICAgfSwgdHJ1ZSk7XG4gICAgfSxcbiAgICBjb25maWdTY2hlbWE6IHtcbiAgICAgIGdlbmVyYXRlQW5vbnltb3VzSWQ6IHtcbiAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICBtZXNzYWdlOiAnc2hvdWxkIGJlIHRydWV8ZmFsc2UnXG4gICAgICB9XG4gICAgfVxuICB9O1xufTtcblxuLyogcmVtb3ZlZDogdmFyIF8kYXNzaWduXzExID0gcmVxdWlyZSgnQGJ1Z3NuYWcvY29yZS9saWIvZXMtdXRpbHMvYXNzaWduJyk7ICovO1xuLypcbiAqIFNldHMgdGhlIGV2ZW50IHJlcXVlc3Q6IHsgdXJsIH0gdG8gYmUgdGhlIGN1cnJlbnQgaHJlZlxuICovXG5cblxudmFyIF8kcmVxdWVzdF80MyA9IGZ1bmN0aW9uICh3aW4pIHtcbiAgaWYgKHdpbiA9PT0gdm9pZCAwKSB7XG4gICAgd2luID0gd2luZG93O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBsb2FkOiBmdW5jdGlvbiAoY2xpZW50KSB7XG4gICAgICBjbGllbnQuYWRkT25FcnJvcihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LnJlcXVlc3QgJiYgZXZlbnQucmVxdWVzdC51cmwpIHJldHVybjtcbiAgICAgICAgZXZlbnQucmVxdWVzdCA9IF8kYXNzaWduXzExKHt9LCBldmVudC5yZXF1ZXN0LCB7XG4gICAgICAgICAgdXJsOiB3aW4ubG9jYXRpb24uaHJlZlxuICAgICAgICB9KTtcbiAgICAgIH0sIHRydWUpO1xuICAgIH1cbiAgfTtcbn07XG5cbi8qIHJlbW92ZWQ6IHZhciBfJGluY2x1ZGVzXzEzID0gcmVxdWlyZSgnQGJ1Z3NuYWcvY29yZS9saWIvZXMtdXRpbHMvaW5jbHVkZXMnKTsgKi87XG5cbnZhciBfJHNlc3Npb25fNDQgPSB7XG4gIGxvYWQ6IGZ1bmN0aW9uIChjbGllbnQpIHtcbiAgICBjbGllbnQuX3Nlc3Npb25EZWxlZ2F0ZSA9IHNlc3Npb25EZWxlZ2F0ZTtcbiAgfVxufTtcbnZhciBzZXNzaW9uRGVsZWdhdGUgPSB7XG4gIHN0YXJ0U2Vzc2lvbjogZnVuY3Rpb24gKGNsaWVudCwgc2Vzc2lvbikge1xuICAgIHZhciBzZXNzaW9uQ2xpZW50ID0gY2xpZW50O1xuICAgIHNlc3Npb25DbGllbnQuX3Nlc3Npb24gPSBzZXNzaW9uO1xuICAgIHNlc3Npb25DbGllbnQuX3BhdXNlZFNlc3Npb24gPSBudWxsOyAvLyBleGl0IGVhcmx5IGlmIHRoZSBjdXJyZW50IHJlbGVhc2VTdGFnZSBpcyBub3QgZW5hYmxlZFxuXG4gICAgaWYgKHNlc3Npb25DbGllbnQuX2NvbmZpZy5lbmFibGVkUmVsZWFzZVN0YWdlcyAhPT0gbnVsbCAmJiAhXyRpbmNsdWRlc18xMyhzZXNzaW9uQ2xpZW50Ll9jb25maWcuZW5hYmxlZFJlbGVhc2VTdGFnZXMsIHNlc3Npb25DbGllbnQuX2NvbmZpZy5yZWxlYXNlU3RhZ2UpKSB7XG4gICAgICBzZXNzaW9uQ2xpZW50Ll9sb2dnZXIud2FybignU2Vzc2lvbiBub3Qgc2VudCBkdWUgdG8gcmVsZWFzZVN0YWdlL2VuYWJsZWRSZWxlYXNlU3RhZ2VzIGNvbmZpZ3VyYXRpb24nKTtcblxuICAgICAgcmV0dXJuIHNlc3Npb25DbGllbnQ7XG4gICAgfVxuXG4gICAgc2Vzc2lvbkNsaWVudC5fZGVsaXZlcnkuc2VuZFNlc3Npb24oe1xuICAgICAgbm90aWZpZXI6IHNlc3Npb25DbGllbnQuX25vdGlmaWVyLFxuICAgICAgZGV2aWNlOiBzZXNzaW9uLmRldmljZSxcbiAgICAgIGFwcDogc2Vzc2lvbi5hcHAsXG4gICAgICBzZXNzaW9uczogW3tcbiAgICAgICAgaWQ6IHNlc3Npb24uaWQsXG4gICAgICAgIHN0YXJ0ZWRBdDogc2Vzc2lvbi5zdGFydGVkQXQsXG4gICAgICAgIHVzZXI6IHNlc3Npb24uX3VzZXJcbiAgICAgIH1dXG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2Vzc2lvbkNsaWVudDtcbiAgfSxcbiAgcmVzdW1lU2Vzc2lvbjogZnVuY3Rpb24gKGNsaWVudCkge1xuICAgIC8vIERvIG5vdGhpbmcgaWYgdGhlcmUncyBhbHJlYWR5IGFuIGFjdGl2ZSBzZXNzaW9uXG4gICAgaWYgKGNsaWVudC5fc2Vzc2lvbikge1xuICAgICAgcmV0dXJuIGNsaWVudDtcbiAgICB9IC8vIElmIHdlIGhhdmUgYSBwYXVzZWQgc2Vzc2lvbiB0aGVuIG1ha2UgaXQgdGhlIGFjdGl2ZSBzZXNzaW9uXG5cblxuICAgIGlmIChjbGllbnQuX3BhdXNlZFNlc3Npb24pIHtcbiAgICAgIGNsaWVudC5fc2Vzc2lvbiA9IGNsaWVudC5fcGF1c2VkU2Vzc2lvbjtcbiAgICAgIGNsaWVudC5fcGF1c2VkU2Vzc2lvbiA9IG51bGw7XG4gICAgICByZXR1cm4gY2xpZW50O1xuICAgIH0gLy8gT3RoZXJ3aXNlIHN0YXJ0IGEgbmV3IHNlc3Npb25cblxuXG4gICAgcmV0dXJuIGNsaWVudC5zdGFydFNlc3Npb24oKTtcbiAgfSxcbiAgcGF1c2VTZXNzaW9uOiBmdW5jdGlvbiAoY2xpZW50KSB7XG4gICAgY2xpZW50Ll9wYXVzZWRTZXNzaW9uID0gY2xpZW50Ll9zZXNzaW9uO1xuICAgIGNsaWVudC5fc2Vzc2lvbiA9IG51bGw7XG4gIH1cbn07XG5cbi8qIHJlbW92ZWQ6IHZhciBfJGFzc2lnbl8xMSA9IHJlcXVpcmUoJ0BidWdzbmFnL2NvcmUvbGliL2VzLXV0aWxzL2Fzc2lnbicpOyAqLztcbi8qXG4gKiBQcmV2ZW50IGNvbGxlY3Rpb24gb2YgdXNlciBJUHNcbiAqL1xuXG5cbnZhciBfJGNsaWVudElwXzQ1ID0ge1xuICBsb2FkOiBmdW5jdGlvbiAoY2xpZW50KSB7XG4gICAgaWYgKGNsaWVudC5fY29uZmlnLmNvbGxlY3RVc2VySXApIHJldHVybjtcbiAgICBjbGllbnQuYWRkT25FcnJvcihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIC8vIElmIHVzZXIuaWQgaXMgZXhwbGljaXRseSB1bmRlZmluZWQsIGl0IHdpbGwgYmUgbWlzc2luZyBmcm9tIHRoZSBwYXlsb2FkLiBJdCBuZWVkc1xuICAgICAgLy8gcmVtb3Zpbmcgc28gdGhhdCB0aGUgZm9sbG93aW5nIGxpbmUgcmVwbGFjZXMgaXRcbiAgICAgIGlmIChldmVudC5fdXNlciAmJiB0eXBlb2YgZXZlbnQuX3VzZXIuaWQgPT09ICd1bmRlZmluZWQnKSBkZWxldGUgZXZlbnQuX3VzZXIuaWQ7XG4gICAgICBldmVudC5fdXNlciA9IF8kYXNzaWduXzExKHtcbiAgICAgICAgaWQ6ICdbUkVEQUNURURdJ1xuICAgICAgfSwgZXZlbnQuX3VzZXIpO1xuICAgICAgZXZlbnQucmVxdWVzdCA9IF8kYXNzaWduXzExKHtcbiAgICAgICAgY2xpZW50SXA6ICdbUkVEQUNURURdJ1xuICAgICAgfSwgZXZlbnQucmVxdWVzdCk7XG4gICAgfSk7XG4gIH0sXG4gIGNvbmZpZ1NjaGVtYToge1xuICAgIGNvbGxlY3RVc2VySXA6IHtcbiAgICAgIGRlZmF1bHRWYWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgICBtZXNzYWdlOiAnc2hvdWxkIGJlIHRydWV8ZmFsc2UnLFxuICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUgPT09IHRydWUgfHwgdmFsdWUgPT09IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxudmFyIF8kY29uc29sZUJyZWFkY3J1bWJzXzQ2ID0ge307XG4vKiByZW1vdmVkOiB2YXIgXyRtYXBfMTYgPSByZXF1aXJlKCdAYnVnc25hZy9jb3JlL2xpYi9lcy11dGlscy9tYXAnKTsgKi87XG5cbi8qIHJlbW92ZWQ6IHZhciBfJHJlZHVjZV8xNyA9IHJlcXVpcmUoJ0BidWdzbmFnL2NvcmUvbGliL2VzLXV0aWxzL3JlZHVjZScpOyAqLztcblxuLyogcmVtb3ZlZDogdmFyIF8kZmlsdGVyXzEyID0gcmVxdWlyZSgnQGJ1Z3NuYWcvY29yZS9saWIvZXMtdXRpbHMvZmlsdGVyJyk7ICovO1xuXG4vKiByZW1vdmVkOiB2YXIgXyRpbmNsdWRlc18xMyA9IHJlcXVpcmUoJ0BidWdzbmFnL2NvcmUvbGliL2VzLXV0aWxzL2luY2x1ZGVzJyk7ICovO1xuLypcbiAqIExlYXZlcyBicmVhZGNydW1icyB3aGVuIGNvbnNvbGUgbG9nIG1ldGhvZHMgYXJlIGNhbGxlZFxuICovXG5cblxuXyRjb25zb2xlQnJlYWRjcnVtYnNfNDYubG9hZCA9IGZ1bmN0aW9uIChjbGllbnQpIHtcbiAgdmFyIGlzRGV2ID0gL15kZXYoZWxvcG1lbnQpPyQvLnRlc3QoY2xpZW50Ll9jb25maWcucmVsZWFzZVN0YWdlKTtcbiAgaWYgKCFjbGllbnQuX2NvbmZpZy5lbmFibGVkQnJlYWRjcnVtYlR5cGVzIHx8ICFfJGluY2x1ZGVzXzEzKGNsaWVudC5fY29uZmlnLmVuYWJsZWRCcmVhZGNydW1iVHlwZXMsICdsb2cnKSB8fCBpc0RldikgcmV0dXJuO1xuICBfJG1hcF8xNihDT05TT0xFX0xPR19NRVRIT0RTLCBmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgdmFyIG9yaWdpbmFsID0gY29uc29sZVttZXRob2RdO1xuXG4gICAgY29uc29sZVttZXRob2RdID0gZnVuY3Rpb24gKCkge1xuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIGNsaWVudC5sZWF2ZUJyZWFkY3J1bWIoJ0NvbnNvbGUgb3V0cHV0JywgXyRyZWR1Y2VfMTcoYXJncywgZnVuY3Rpb24gKGFjY3VtLCBhcmcsIGkpIHtcbiAgICAgICAgLy8gZG8gdGhlIGJlc3Qvc2ltcGxlc3Qgc3RyaW5naWZpY2F0aW9uIG9mIGVhY2ggYXJndW1lbnRcbiAgICAgICAgdmFyIHN0cmluZ2lmaWVkID0gJ1tVbmtub3duIHZhbHVlXSc7IC8vIHRoaXMgbWF5IGZhaWwgaWYgdGhlIGlucHV0IGlzOlxuICAgICAgICAvLyAtIGFuIG9iamVjdCB3aG9zZSBbW1Byb3RvdHlwZV1dIGlzIG51bGwgKG5vIHRvU3RyaW5nKVxuICAgICAgICAvLyAtIGFuIG9iamVjdCB3aXRoIGEgYnJva2VuIHRvU3RyaW5nIG9yIEBAdG9QcmltaXRpdmUgaW1wbGVtZW50YXRpb25cblxuICAgICAgICB0cnkge1xuICAgICAgICAgIHN0cmluZ2lmaWVkID0gU3RyaW5nKGFyZyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9IC8vIGlmIGl0IHN0cmluZ2lmaWVzIHRvIFtvYmplY3QgT2JqZWN0XSBhdHRlbXB0IHRvIEpTT04gc3RyaW5naWZ5XG5cblxuICAgICAgICBpZiAoc3RyaW5naWZpZWQgPT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICAgICAgLy8gY2F0Y2ggc3RyaW5naWZ5IGVycm9ycyBhbmQgZmFsbGJhY2sgdG8gW29iamVjdCBPYmplY3RdXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHN0cmluZ2lmaWVkID0gSlNPTi5zdHJpbmdpZnkoYXJnKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICB9XG5cbiAgICAgICAgYWNjdW1bXCJbXCIgKyBpICsgXCJdXCJdID0gc3RyaW5naWZpZWQ7XG4gICAgICAgIHJldHVybiBhY2N1bTtcbiAgICAgIH0sIHtcbiAgICAgICAgc2V2ZXJpdHk6IG1ldGhvZC5pbmRleE9mKCdncm91cCcpID09PSAwID8gJ2xvZycgOiBtZXRob2RcbiAgICAgIH0pLCAnbG9nJyk7XG4gICAgICBvcmlnaW5hbC5hcHBseShjb25zb2xlLCBhcmdzKTtcbiAgICB9O1xuXG4gICAgY29uc29sZVttZXRob2RdLl9yZXN0b3JlID0gZnVuY3Rpb24gKCkge1xuICAgICAgY29uc29sZVttZXRob2RdID0gb3JpZ2luYWw7XG4gICAgfTtcbiAgfSk7XG59O1xuXG5pZiAoXCJwcm9kdWN0aW9uXCIgIT09ICdwcm9kdWN0aW9uJykge1xuICBfJGNvbnNvbGVCcmVhZGNydW1ic180Ni5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBDT05TT0xFX0xPR19NRVRIT0RTLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZCkge1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlW21ldGhvZF0uX3Jlc3RvcmUgPT09ICdmdW5jdGlvbicpIGNvbnNvbGVbbWV0aG9kXS5fcmVzdG9yZSgpO1xuICAgIH0pO1xuICB9O1xufVxuXG52YXIgQ09OU09MRV9MT0dfTUVUSE9EUyA9IF8kZmlsdGVyXzEyKFsnbG9nJywgJ2RlYnVnJywgJ2luZm8nLCAnd2FybicsICdlcnJvciddLCBmdW5jdGlvbiAobWV0aG9kKSB7XG4gIHJldHVybiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGNvbnNvbGVbbWV0aG9kXSA9PT0gJ2Z1bmN0aW9uJztcbn0pO1xuXG4vKiByZW1vdmVkOiB2YXIgXyRtYXBfMTYgPSByZXF1aXJlKCdAYnVnc25hZy9jb3JlL2xpYi9lcy11dGlscy9tYXAnKTsgKi87XG5cbi8qIHJlbW92ZWQ6IHZhciBfJHJlZHVjZV8xNyA9IHJlcXVpcmUoJ0BidWdzbmFnL2NvcmUvbGliL2VzLXV0aWxzL3JlZHVjZScpOyAqLztcblxuLyogcmVtb3ZlZDogdmFyIF8kZmlsdGVyXzEyID0gcmVxdWlyZSgnQGJ1Z3NuYWcvY29yZS9saWIvZXMtdXRpbHMvZmlsdGVyJyk7ICovO1xuXG52YXIgTUFYX0xJTkVfTEVOR1RIID0gMjAwO1xudmFyIE1BWF9TQ1JJUFRfTEVOR1RIID0gNTAwMDAwO1xuXG52YXIgXyRpbmxpbmVTY3JpcHRDb250ZW50XzQ3ID0gZnVuY3Rpb24gKGRvYywgd2luKSB7XG4gIGlmIChkb2MgPT09IHZvaWQgMCkge1xuICAgIGRvYyA9IGRvY3VtZW50O1xuICB9XG5cbiAgaWYgKHdpbiA9PT0gdm9pZCAwKSB7XG4gICAgd2luID0gd2luZG93O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBsb2FkOiBmdW5jdGlvbiAoY2xpZW50KSB7XG4gICAgICBpZiAoIWNsaWVudC5fY29uZmlnLnRyYWNrSW5saW5lU2NyaXB0cykgcmV0dXJuO1xuICAgICAgdmFyIG9yaWdpbmFsTG9jYXRpb24gPSB3aW4ubG9jYXRpb24uaHJlZjtcbiAgICAgIHZhciBodG1sID0gJyc7IC8vIGluIElFOC0xMCB0aGUgJ2ludGVyYWN0aXZlJyBzdGF0ZSBjYW4gZmlyZSB0b28gc29vbiAoYmVmb3JlIHNjcmlwdHMgaGF2ZSBmaW5pc2hlZCBleGVjdXRpbmcpLCBzbyBpbiB0aG9zZVxuICAgICAgLy8gd2Ugd2FpdCBmb3IgdGhlICdjb21wbGV0ZScgc3RhdGUgYmVmb3JlIGFzc3VtaW5nIHRoYXQgc3luY2hyb25vdXMgc2NyaXB0cyBhcmUgbm8gbG9uZ2VyIGV4ZWN1dGluZ1xuXG4gICAgICB2YXIgaXNPbGRJZSA9ICEhZG9jLmF0dGFjaEV2ZW50O1xuICAgICAgdmFyIERPTUNvbnRlbnRMb2FkZWQgPSBpc09sZEllID8gZG9jLnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScgOiBkb2MucmVhZHlTdGF0ZSAhPT0gJ2xvYWRpbmcnO1xuXG4gICAgICB2YXIgZ2V0SHRtbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGRvYy5kb2N1bWVudEVsZW1lbnQub3V0ZXJIVE1MO1xuICAgICAgfTsgLy8gZ2V0IHdoYXRldmVyIEhUTUwgZXhpc3RzIGF0IHRoaXMgcG9pbnQgaW4gdGltZVxuXG5cbiAgICAgIGh0bWwgPSBnZXRIdG1sKCk7XG4gICAgICB2YXIgcHJldiA9IGRvYy5vbnJlYWR5c3RhdGVjaGFuZ2U7IC8vIHRoZW4gdXBkYXRlIGl0IHdoZW4gdGhlIERPTSBjb250ZW50IGhhcyBsb2FkZWRcblxuICAgICAgZG9jLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gSUU4IGNvbXBhdGlibGUgYWx0ZXJuYXRpdmUgdG8gZG9jdW1lbnQjRE9NQ29udGVudExvYWRlZFxuICAgICAgICBpZiAoZG9jLnJlYWR5U3RhdGUgPT09ICdpbnRlcmFjdGl2ZScpIHtcbiAgICAgICAgICBodG1sID0gZ2V0SHRtbCgpO1xuICAgICAgICAgIERPTUNvbnRlbnRMb2FkZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBwcmV2LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICB9O1xuXG4gICAgICB2YXIgX2xhc3RTY3JpcHQgPSBudWxsO1xuXG4gICAgICB2YXIgdXBkYXRlTGFzdFNjcmlwdCA9IGZ1bmN0aW9uIChzY3JpcHQpIHtcbiAgICAgICAgX2xhc3RTY3JpcHQgPSBzY3JpcHQ7XG4gICAgICB9O1xuXG4gICAgICB2YXIgZ2V0Q3VycmVudFNjcmlwdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNjcmlwdCA9IGRvYy5jdXJyZW50U2NyaXB0IHx8IF9sYXN0U2NyaXB0O1xuXG4gICAgICAgIGlmICghc2NyaXB0ICYmICFET01Db250ZW50TG9hZGVkKSB7XG4gICAgICAgICAgdmFyIHNjcmlwdHMgPSBkb2Muc2NyaXB0cyB8fCBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpO1xuICAgICAgICAgIHNjcmlwdCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzY3JpcHQ7XG4gICAgICB9O1xuXG4gICAgICB2YXIgYWRkU3Vycm91bmRpbmdDb2RlID0gZnVuY3Rpb24gKGxpbmVOdW1iZXIpIHtcbiAgICAgICAgLy8gZ2V0IHdoYXRldmVyIGh0bWwgaGFzIHJlbmRlcmVkIGF0IHRoaXMgcG9pbnRcbiAgICAgICAgaWYgKCFET01Db250ZW50TG9hZGVkIHx8ICFodG1sKSBodG1sID0gZ2V0SHRtbCgpOyAvLyBzaW11bGF0ZSB0aGUgcmF3IGh0bWxcblxuICAgICAgICB2YXIgaHRtbExpbmVzID0gWyc8IS0tIERPQyBTVEFSVCAtLT4nXS5jb25jYXQoaHRtbC5zcGxpdCgnXFxuJykpO1xuICAgICAgICB2YXIgemVyb0Jhc2VkTGluZSA9IGxpbmVOdW1iZXIgLSAxO1xuICAgICAgICB2YXIgc3RhcnQgPSBNYXRoLm1heCh6ZXJvQmFzZWRMaW5lIC0gMywgMCk7XG4gICAgICAgIHZhciBlbmQgPSBNYXRoLm1pbih6ZXJvQmFzZWRMaW5lICsgMywgaHRtbExpbmVzLmxlbmd0aCk7XG4gICAgICAgIHJldHVybiBfJHJlZHVjZV8xNyhodG1sTGluZXMuc2xpY2Uoc3RhcnQsIGVuZCksIGZ1bmN0aW9uIChhY2N1bSwgbGluZSwgaSkge1xuICAgICAgICAgIGFjY3VtW3N0YXJ0ICsgMSArIGldID0gbGluZS5sZW5ndGggPD0gTUFYX0xJTkVfTEVOR1RIID8gbGluZSA6IGxpbmUuc3Vic3RyKDAsIE1BWF9MSU5FX0xFTkdUSCk7XG4gICAgICAgICAgcmV0dXJuIGFjY3VtO1xuICAgICAgICB9LCB7fSk7XG4gICAgICB9O1xuXG4gICAgICBjbGllbnQuYWRkT25FcnJvcihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgLy8gcmVtb3ZlIGFueSBvZiBvdXIgb3duIGZyYW1lcyB0aGF0IG1heSBiZSBwYXJ0IHRoZSBzdGFjayB0aGlzXG4gICAgICAgIC8vIGhhcHBlbnMgYmVmb3JlIHRoZSBpbmxpbmUgc2NyaXB0IGNoZWNrIGFzIGl0IGhhcHBlbnMgZm9yIGFsbCBlcnJvcnNcbiAgICAgICAgZXZlbnQuZXJyb3JzWzBdLnN0YWNrdHJhY2UgPSBfJGZpbHRlcl8xMihldmVudC5lcnJvcnNbMF0uc3RhY2t0cmFjZSwgZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICByZXR1cm4gIS9fX3RyYWNlX18kLy50ZXN0KGYubWV0aG9kKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBmcmFtZSA9IGV2ZW50LmVycm9yc1swXS5zdGFja3RyYWNlWzBdOyAvLyBpZiBmcmFtZS5maWxlIGV4aXN0cyBhbmQgaXMgbm90IHRoZSBvcmlnaW5hbCBsb2NhdGlvbiBvZiB0aGUgcGFnZSwgdGhpcyBjYW4ndCBiZSBhbiBpbmxpbmUgc2NyaXB0XG5cbiAgICAgICAgaWYgKGZyYW1lICYmIGZyYW1lLmZpbGUgJiYgZnJhbWUuZmlsZS5yZXBsYWNlKC8jLiokLywgJycpICE9PSBvcmlnaW5hbExvY2F0aW9uLnJlcGxhY2UoLyMuKiQvLCAnJykpIHJldHVybjsgLy8gZ3JhYiB0aGUgbGFzdCBzY3JpcHQga25vd24gdG8gaGF2ZSBydW5cblxuICAgICAgICB2YXIgY3VycmVudFNjcmlwdCA9IGdldEN1cnJlbnRTY3JpcHQoKTtcblxuICAgICAgICBpZiAoY3VycmVudFNjcmlwdCkge1xuICAgICAgICAgIHZhciBjb250ZW50ID0gY3VycmVudFNjcmlwdC5pbm5lckhUTUw7XG4gICAgICAgICAgZXZlbnQuYWRkTWV0YWRhdGEoJ3NjcmlwdCcsICdjb250ZW50JywgY29udGVudC5sZW5ndGggPD0gTUFYX1NDUklQVF9MRU5HVEggPyBjb250ZW50IDogY29udGVudC5zdWJzdHIoMCwgTUFYX1NDUklQVF9MRU5HVEgpKTsgLy8gb25seSBhdHRlbXB0IHRvIGdyYWIgc29tZSBzdXJyb3VuZGluZyBjb2RlIGlmIHdlIGhhdmUgYSBsaW5lIG51bWJlclxuXG4gICAgICAgICAgaWYgKGZyYW1lICYmIGZyYW1lLmxpbmVOdW1iZXIpIHtcbiAgICAgICAgICAgIGZyYW1lLmNvZGUgPSBhZGRTdXJyb3VuZGluZ0NvZGUoZnJhbWUubGluZU51bWJlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCB0cnVlKTsgLy8gUHJveHkgYWxsIHRoZSB0aW1lciBmdW5jdGlvbnMgd2hvc2UgY2FsbGJhY2sgaXMgdGhlaXIgMHRoIGFyZ3VtZW50LlxuICAgICAgLy8gS2VlcCBhIHJlZmVyZW5jZSB0byB0aGUgb3JpZ2luYWwgc2V0VGltZW91dCBiZWNhdXNlIHdlIG5lZWQgaXQgbGF0ZXJcblxuICAgICAgdmFyIF9tYXAgPSBfJG1hcF8xNihbJ3NldFRpbWVvdXQnLCAnc2V0SW50ZXJ2YWwnLCAnc2V0SW1tZWRpYXRlJywgJ3JlcXVlc3RBbmltYXRpb25GcmFtZSddLCBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgcmV0dXJuIF9fcHJveHkod2luLCBmbiwgZnVuY3Rpb24gKG9yaWdpbmFsKSB7XG4gICAgICAgICAgcmV0dXJuIF9fdHJhY2VPcmlnaW5hbFNjcmlwdChvcmlnaW5hbCwgZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhcmdzWzBdO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICByZXBsYWNlOiBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgICAgICAgICBhcmdzWzBdID0gZm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSksXG4gICAgICAgICAgX3NldFRpbWVvdXQgPSBfbWFwWzBdOyAvLyBQcm94eSBhbGwgdGhlIGhvc3Qgb2JqZWN0cyB3aG9zZSBwcm90b3R5cGVzIGhhdmUgYW4gYWRkRXZlbnRMaXN0ZW5lciBmdW5jdGlvblxuXG5cbiAgICAgIF8kbWFwXzE2KFsnRXZlbnRUYXJnZXQnLCAnV2luZG93JywgJ05vZGUnLCAnQXBwbGljYXRpb25DYWNoZScsICdBdWRpb1RyYWNrTGlzdCcsICdDaGFubmVsTWVyZ2VyTm9kZScsICdDcnlwdG9PcGVyYXRpb24nLCAnRXZlbnRTb3VyY2UnLCAnRmlsZVJlYWRlcicsICdIVE1MVW5rbm93bkVsZW1lbnQnLCAnSURCRGF0YWJhc2UnLCAnSURCUmVxdWVzdCcsICdJREJUcmFuc2FjdGlvbicsICdLZXlPcGVyYXRpb24nLCAnTWVkaWFDb250cm9sbGVyJywgJ01lc3NhZ2VQb3J0JywgJ01vZGFsV2luZG93JywgJ05vdGlmaWNhdGlvbicsICdTVkdFbGVtZW50SW5zdGFuY2UnLCAnU2NyZWVuJywgJ1RleHRUcmFjaycsICdUZXh0VHJhY2tDdWUnLCAnVGV4dFRyYWNrTGlzdCcsICdXZWJTb2NrZXQnLCAnV2ViU29ja2V0V29ya2VyJywgJ1dvcmtlcicsICdYTUxIdHRwUmVxdWVzdCcsICdYTUxIdHRwUmVxdWVzdEV2ZW50VGFyZ2V0JywgJ1hNTEh0dHBSZXF1ZXN0VXBsb2FkJ10sIGZ1bmN0aW9uIChvKSB7XG4gICAgICAgIGlmICghd2luW29dIHx8ICF3aW5bb10ucHJvdG90eXBlIHx8ICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwod2luW29dLnByb3RvdHlwZSwgJ2FkZEV2ZW50TGlzdGVuZXInKSkgcmV0dXJuO1xuXG4gICAgICAgIF9fcHJveHkod2luW29dLnByb3RvdHlwZSwgJ2FkZEV2ZW50TGlzdGVuZXInLCBmdW5jdGlvbiAob3JpZ2luYWwpIHtcbiAgICAgICAgICByZXR1cm4gX190cmFjZU9yaWdpbmFsU2NyaXB0KG9yaWdpbmFsLCBldmVudFRhcmdldENhbGxiYWNrQWNjZXNzb3IpO1xuICAgICAgICB9KTtcblxuICAgICAgICBfX3Byb3h5KHdpbltvXS5wcm90b3R5cGUsICdyZW1vdmVFdmVudExpc3RlbmVyJywgZnVuY3Rpb24gKG9yaWdpbmFsKSB7XG4gICAgICAgICAgcmV0dXJuIF9fdHJhY2VPcmlnaW5hbFNjcmlwdChvcmlnaW5hbCwgZXZlbnRUYXJnZXRDYWxsYmFja0FjY2Vzc29yLCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZnVuY3Rpb24gX190cmFjZU9yaWdpbmFsU2NyaXB0KGZuLCBjYWxsYmFja0FjY2Vzc29yLCBhbHNvQ2FsbE9yaWdpbmFsKSB7XG4gICAgICAgIGlmIChhbHNvQ2FsbE9yaWdpbmFsID09PSB2b2lkIDApIHtcbiAgICAgICAgICBhbHNvQ2FsbE9yaWdpbmFsID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIHRoaXMgaXMgcmVxdWlyZWQgZm9yIHJlbW92ZUV2ZW50TGlzdGVuZXIgdG8gcmVtb3ZlIGFueXRoaW5nIGFkZGVkIHdpdGhcbiAgICAgICAgICAvLyBhZGRFdmVudExpc3RlbmVyIGJlZm9yZSB0aGUgZnVuY3Rpb25zIHN0YXJ0ZWQgYmVpbmcgd3JhcHBlZCBieSBCdWdzbmFnXG4gICAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIGNiYSA9IGNhbGxiYWNrQWNjZXNzb3IoYXJncyk7XG4gICAgICAgICAgICB2YXIgY2IgPSBjYmEuZ2V0KCk7XG4gICAgICAgICAgICBpZiAoYWxzb0NhbGxPcmlnaW5hbCkgZm4uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNiICE9PSAnZnVuY3Rpb24nKSByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJncyk7XG5cbiAgICAgICAgICAgIGlmIChjYi5fX3RyYWNlX18pIHtcbiAgICAgICAgICAgICAgY2JhLnJlcGxhY2UoY2IuX190cmFjZV9fKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhciBzY3JpcHQgPSBnZXRDdXJyZW50U2NyaXB0KCk7IC8vIHRoaXMgZnVuY3Rpb24gbXVzdG4ndCBiZSBhbm5vbnltb3VzIGR1ZSB0byBhIGJ1ZyBpbiB0aGUgc3RhY2tcbiAgICAgICAgICAgICAgLy8gZ2VuZXJhdGlvbiBsb2dpYywgbWVhbmluZyBpdCBnZXRzIHRyaXBwZWQgdXBcbiAgICAgICAgICAgICAgLy8gc2VlOiBodHRwczovL2dpdGh1Yi5jb20vc3RhY2t0cmFjZWpzL3N0YWNrLWdlbmVyYXRvci9pc3N1ZXMvNlxuXG4gICAgICAgICAgICAgIGNiLl9fdHJhY2VfXyA9IGZ1bmN0aW9uIF9fdHJhY2VfXygpIHtcbiAgICAgICAgICAgICAgICAvLyBzZXQgdGhlIHNjcmlwdCB0aGF0IGNhbGxlZCB0aGlzIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgdXBkYXRlTGFzdFNjcmlwdChzY3JpcHQpOyAvLyBpbW1lZGlhdGVseSB1bnNldCB0aGUgY3VycmVudFNjcmlwdCBzeW5jaHJvbm91c2x5IGJlbG93LCBob3dldmVyXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhpcyBjYiB0aHJvd3MgYW4gZXJyb3IgdGhlIGxpbmUgYWZ0ZXIgd2lsbCBub3QgZ2V0IHJ1biBzbyBzY2hlZHVsZVxuICAgICAgICAgICAgICAgIC8vIGFuIGFsbW9zdC1pbW1lZGlhdGUgYXlzbmMgdXBkYXRlIHRvb1xuXG4gICAgICAgICAgICAgICAgX3NldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgdXBkYXRlTGFzdFNjcmlwdChudWxsKTtcbiAgICAgICAgICAgICAgICB9LCAwKTtcblxuICAgICAgICAgICAgICAgIHZhciByZXQgPSBjYi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgIHVwZGF0ZUxhc3RTY3JpcHQobnVsbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICBjYi5fX3RyYWNlX18uX190cmFjZV9fID0gY2IuX190cmFjZV9fO1xuICAgICAgICAgICAgICBjYmEucmVwbGFjZShjYi5fX3RyYWNlX18pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9IC8vIHN3YWxsb3cgdGhlc2UgZXJyb3JzIG9uIFNlbGVuaXVtOlxuICAgICAgICAgIC8vIFBlcm1pc3Npb24gZGVuaWVkIHRvIGFjY2VzcyBwcm9wZXJ0eSAnX190cmFjZV9fJ1xuICAgICAgICAgIC8vIFdlYkRyaXZlckV4Y2VwdGlvbjogTWVzc2FnZTogUGVybWlzc2lvbiBkZW5pZWQgdG8gYWNjZXNzIHByb3BlcnR5IFwiaGFuZGxlRXZlbnRcIlxuICAgICAgICAgIC8vIElFOCBkb2Vzbid0IGxldCB5b3UgY2FsbCAuYXBwbHkoKSBvbiBzZXRUaW1lb3V0L3NldEludGVydmFsXG5cblxuICAgICAgICAgIGlmIChmbi5hcHBseSkgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXG4gICAgICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICByZXR1cm4gZm4oYXJnc1swXSk7XG5cbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgcmV0dXJuIGZuKGFyZ3NbMF0sIGFyZ3NbMV0pO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gZm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSxcbiAgICBjb25maWdTY2hlbWE6IHtcbiAgICAgIHRyYWNrSW5saW5lU2NyaXB0czoge1xuICAgICAgICB2YWxpZGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlID09PSB0cnVlIHx8IHZhbHVlID09PSBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIG1lc3NhZ2U6ICdzaG91bGQgYmUgdHJ1ZXxmYWxzZSdcbiAgICAgIH1cbiAgICB9XG4gIH07XG59O1xuXG5mdW5jdGlvbiBfX3Byb3h5KGhvc3QsIG5hbWUsIHJlcGxhY2VyKSB7XG4gIHZhciBvcmlnaW5hbCA9IGhvc3RbbmFtZV07XG4gIGlmICghb3JpZ2luYWwpIHJldHVybiBvcmlnaW5hbDtcbiAgdmFyIHJlcGxhY2VtZW50ID0gcmVwbGFjZXIob3JpZ2luYWwpO1xuICBob3N0W25hbWVdID0gcmVwbGFjZW1lbnQ7XG4gIHJldHVybiBvcmlnaW5hbDtcbn1cblxuZnVuY3Rpb24gZXZlbnRUYXJnZXRDYWxsYmFja0FjY2Vzc29yKGFyZ3MpIHtcbiAgdmFyIGlzRXZlbnRIYW5kbGVyT2JqID0gISFhcmdzWzFdICYmIHR5cGVvZiBhcmdzWzFdLmhhbmRsZUV2ZW50ID09PSAnZnVuY3Rpb24nO1xuICByZXR1cm4ge1xuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGlzRXZlbnRIYW5kbGVyT2JqID8gYXJnc1sxXS5oYW5kbGVFdmVudCA6IGFyZ3NbMV07XG4gICAgfSxcbiAgICByZXBsYWNlOiBmdW5jdGlvbiAoZm4pIHtcbiAgICAgIGlmIChpc0V2ZW50SGFuZGxlck9iaikge1xuICAgICAgICBhcmdzWzFdLmhhbmRsZUV2ZW50ID0gZm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcmdzWzFdID0gZm47XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG4vKiByZW1vdmVkOiB2YXIgXyRpbmNsdWRlc18xMyA9IHJlcXVpcmUoJ0BidWdzbmFnL2NvcmUvbGliL2VzLXV0aWxzL2luY2x1ZGVzJyk7ICovO1xuLypcbiAqIExlYXZlcyBicmVhZGNydW1icyB3aGVuIHRoZSB1c2VyIGludGVyYWN0cyB3aXRoIHRoZSBET01cbiAqL1xuXG5cbnZhciBfJGludGVyYWN0aW9uQnJlYWRjcnVtYnNfNDggPSBmdW5jdGlvbiAod2luKSB7XG4gIGlmICh3aW4gPT09IHZvaWQgMCkge1xuICAgIHdpbiA9IHdpbmRvdztcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbG9hZDogZnVuY3Rpb24gKGNsaWVudCkge1xuICAgICAgaWYgKCEoJ2FkZEV2ZW50TGlzdGVuZXInIGluIHdpbikpIHJldHVybjtcbiAgICAgIGlmICghY2xpZW50Ll9jb25maWcuZW5hYmxlZEJyZWFkY3J1bWJUeXBlcyB8fCAhXyRpbmNsdWRlc18xMyhjbGllbnQuX2NvbmZpZy5lbmFibGVkQnJlYWRjcnVtYlR5cGVzLCAndXNlcicpKSByZXR1cm47XG4gICAgICB3aW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdmFyIHRhcmdldFRleHQsIHRhcmdldFNlbGVjdG9yO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGFyZ2V0VGV4dCA9IGdldE5vZGVUZXh0KGV2ZW50LnRhcmdldCk7XG4gICAgICAgICAgdGFyZ2V0U2VsZWN0b3IgPSBnZXROb2RlU2VsZWN0b3IoZXZlbnQudGFyZ2V0LCB3aW4pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgdGFyZ2V0VGV4dCA9ICdbaGlkZGVuXSc7XG4gICAgICAgICAgdGFyZ2V0U2VsZWN0b3IgPSAnW2hpZGRlbl0nO1xuXG4gICAgICAgICAgY2xpZW50Ll9sb2dnZXIuZXJyb3IoJ0Nyb3NzIGRvbWFpbiBlcnJvciB3aGVuIHRyYWNraW5nIGNsaWNrIGV2ZW50LiBTZWUgZG9jczogaHR0cHM6Ly90aW55dXJsLmNvbS95eTNybjYzeicpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2xpZW50LmxlYXZlQnJlYWRjcnVtYignVUkgY2xpY2snLCB7XG4gICAgICAgICAgdGFyZ2V0VGV4dDogdGFyZ2V0VGV4dCxcbiAgICAgICAgICB0YXJnZXRTZWxlY3RvcjogdGFyZ2V0U2VsZWN0b3JcbiAgICAgICAgfSwgJ3VzZXInKTtcbiAgICAgIH0sIHRydWUpO1xuICAgIH1cbiAgfTtcbn07IC8vIGV4dHJhY3QgdGV4dCBjb250ZW50IGZyb20gYSBlbGVtZW50XG5cblxudmFyIGdldE5vZGVUZXh0ID0gZnVuY3Rpb24gKGVsKSB7XG4gIHZhciB0ZXh0ID0gZWwudGV4dENvbnRlbnQgfHwgZWwuaW5uZXJUZXh0IHx8ICcnO1xuICBpZiAoIXRleHQgJiYgKGVsLnR5cGUgPT09ICdzdWJtaXQnIHx8IGVsLnR5cGUgPT09ICdidXR0b24nKSkgdGV4dCA9IGVsLnZhbHVlO1xuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7IC8vIHRyaW0gd2hpdGVzcGFjZVxuXG4gIHJldHVybiB0cnVuY2F0ZSh0ZXh0LCAxNDApO1xufTsgLy8gQ3JlYXRlIGEgbGFiZWwgZnJvbSB0YWduYW1lLCBpZCBhbmQgY3NzIGNsYXNzIG9mIHRoZSBlbGVtZW50XG5cblxuZnVuY3Rpb24gZ2V0Tm9kZVNlbGVjdG9yKGVsLCB3aW4pIHtcbiAgdmFyIHBhcnRzID0gW2VsLnRhZ05hbWVdO1xuICBpZiAoZWwuaWQpIHBhcnRzLnB1c2goJyMnICsgZWwuaWQpO1xuICBpZiAoZWwuY2xhc3NOYW1lICYmIGVsLmNsYXNzTmFtZS5sZW5ndGgpIHBhcnRzLnB1c2goXCIuXCIgKyBlbC5jbGFzc05hbWUuc3BsaXQoJyAnKS5qb2luKCcuJykpOyAvLyBDYW4ndCBnZXQgbXVjaCBtb3JlIGFkdmFuY2VkIHdpdGggdGhlIGN1cnJlbnQgYnJvd3NlclxuXG4gIGlmICghd2luLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwgfHwgIUFycmF5LnByb3RvdHlwZS5pbmRleE9mKSByZXR1cm4gcGFydHMuam9pbignJyk7XG5cbiAgdHJ5IHtcbiAgICBpZiAod2luLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocGFydHMuam9pbignJykpLmxlbmd0aCA9PT0gMSkgcmV0dXJuIHBhcnRzLmpvaW4oJycpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gU29tZXRpbWVzIHRoZSBxdWVyeSBzZWxlY3RvciBjYW4gYmUgaW52YWxpZCBqdXN0IHJldHVybiBpdCBhcy1pc1xuICAgIHJldHVybiBwYXJ0cy5qb2luKCcnKTtcbiAgfSAvLyB0cnkgdG8gZ2V0IGEgbW9yZSBzcGVjaWZpYyBzZWxlY3RvciBpZiB0aGlzIG9uZSBtYXRjaGVzIG1vcmUgdGhhbiBvbmUgZWxlbWVudFxuXG5cbiAgaWYgKGVsLnBhcmVudE5vZGUuY2hpbGROb2Rlcy5sZW5ndGggPiAxKSB7XG4gICAgdmFyIGluZGV4ID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChlbC5wYXJlbnROb2RlLmNoaWxkTm9kZXMsIGVsKSArIDE7XG4gICAgcGFydHMucHVzaChcIjpudGgtY2hpbGQoXCIgKyBpbmRleCArIFwiKVwiKTtcbiAgfVxuXG4gIGlmICh3aW4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChwYXJ0cy5qb2luKCcnKSkubGVuZ3RoID09PSAxKSByZXR1cm4gcGFydHMuam9pbignJyk7IC8vIHRyeSBwcmVwZW5kaW5nIHRoZSBwYXJlbnQgbm9kZSBzZWxlY3RvclxuXG4gIGlmIChlbC5wYXJlbnROb2RlKSByZXR1cm4gZ2V0Tm9kZVNlbGVjdG9yKGVsLnBhcmVudE5vZGUsIHdpbikgKyBcIiA+IFwiICsgcGFydHMuam9pbignJyk7XG4gIHJldHVybiBwYXJ0cy5qb2luKCcnKTtcbn1cblxuZnVuY3Rpb24gdHJ1bmNhdGUodmFsdWUsIGxlbmd0aCkge1xuICB2YXIgb21taXNpb24gPSAnKC4uLiknO1xuICBpZiAodmFsdWUgJiYgdmFsdWUubGVuZ3RoIDw9IGxlbmd0aCkgcmV0dXJuIHZhbHVlO1xuICByZXR1cm4gdmFsdWUuc2xpY2UoMCwgbGVuZ3RoIC0gb21taXNpb24ubGVuZ3RoKSArIG9tbWlzaW9uO1xufVxuXG52YXIgXyRuYXZpZ2F0aW9uQnJlYWRjcnVtYnNfNDkgPSB7fTtcbi8qIHJlbW92ZWQ6IHZhciBfJGluY2x1ZGVzXzEzID0gcmVxdWlyZSgnQGJ1Z3NuYWcvY29yZS9saWIvZXMtdXRpbHMvaW5jbHVkZXMnKTsgKi87XG4vKlxuKiBMZWF2ZXMgYnJlYWRjcnVtYnMgd2hlbiBuYXZpZ2F0aW9uIG1ldGhvZHMgYXJlIGNhbGxlZCBvciBldmVudHMgYXJlIGVtaXR0ZWRcbiovXG5cblxuXyRuYXZpZ2F0aW9uQnJlYWRjcnVtYnNfNDkgPSBmdW5jdGlvbiAod2luKSB7XG4gIGlmICh3aW4gPT09IHZvaWQgMCkge1xuICAgIHdpbiA9IHdpbmRvdztcbiAgfVxuXG4gIHZhciBwbHVnaW4gPSB7XG4gICAgbG9hZDogZnVuY3Rpb24gKGNsaWVudCkge1xuICAgICAgaWYgKCEoJ2FkZEV2ZW50TGlzdGVuZXInIGluIHdpbikpIHJldHVybjtcbiAgICAgIGlmICghY2xpZW50Ll9jb25maWcuZW5hYmxlZEJyZWFkY3J1bWJUeXBlcyB8fCAhXyRpbmNsdWRlc18xMyhjbGllbnQuX2NvbmZpZy5lbmFibGVkQnJlYWRjcnVtYlR5cGVzLCAnbmF2aWdhdGlvbicpKSByZXR1cm47IC8vIHJldHVybnMgYSBmdW5jdGlvbiB0aGF0IHdpbGwgZHJvcCBhIGJyZWFkY3J1bWIgd2l0aCBhIGdpdmVuIG5hbWVcblxuICAgICAgdmFyIGRyb3AgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBjbGllbnQubGVhdmVCcmVhZGNydW1iKG5hbWUsIHt9LCAnbmF2aWdhdGlvbicpO1xuICAgICAgICB9O1xuICAgICAgfTsgLy8gc2ltcGxlIGRyb3BzIOKAkyBqdXN0IG5hbWVzLCBubyBtZXRhXG5cblxuICAgICAgd2luLmFkZEV2ZW50TGlzdGVuZXIoJ3BhZ2VoaWRlJywgZHJvcCgnUGFnZSBoaWRkZW4nKSwgdHJ1ZSk7XG4gICAgICB3aW4uYWRkRXZlbnRMaXN0ZW5lcigncGFnZXNob3cnLCBkcm9wKCdQYWdlIHNob3duJyksIHRydWUpO1xuICAgICAgd2luLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBkcm9wKCdQYWdlIGxvYWRlZCcpLCB0cnVlKTtcbiAgICAgIHdpbi5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZHJvcCgnRE9NQ29udGVudExvYWRlZCcpLCB0cnVlKTsgLy8gc29tZSBicm93c2VycyBsaWtlIHRvIGVtaXQgcG9wc3RhdGUgd2hlbiB0aGUgcGFnZSBsb2Fkcywgc28gb25seSBhZGQgdGhlIHBvcHN0YXRlIGxpc3RlbmVyIGFmdGVyIHRoYXRcblxuICAgICAgd2luLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB3aW4uYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCBkcm9wKCdOYXZpZ2F0ZWQgYmFjaycpLCB0cnVlKTtcbiAgICAgIH0pOyAvLyBoYXNoY2hhbmdlIGhhcyBzb21lIG1ldGFkYXRhIHRoYXQgd2UgY2FyZSBhYm91dFxuXG4gICAgICB3aW4uYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgbWV0YWRhdGEgPSBldmVudC5vbGRVUkwgPyB7XG4gICAgICAgICAgZnJvbTogcmVsYXRpdmVMb2NhdGlvbihldmVudC5vbGRVUkwsIHdpbiksXG4gICAgICAgICAgdG86IHJlbGF0aXZlTG9jYXRpb24oZXZlbnQubmV3VVJMLCB3aW4pLFxuICAgICAgICAgIHN0YXRlOiBnZXRDdXJyZW50U3RhdGUod2luKVxuICAgICAgICB9IDoge1xuICAgICAgICAgIHRvOiByZWxhdGl2ZUxvY2F0aW9uKHdpbi5sb2NhdGlvbi5ocmVmLCB3aW4pXG4gICAgICAgIH07XG4gICAgICAgIGNsaWVudC5sZWF2ZUJyZWFkY3J1bWIoJ0hhc2ggY2hhbmdlZCcsIG1ldGFkYXRhLCAnbmF2aWdhdGlvbicpO1xuICAgICAgfSwgdHJ1ZSk7IC8vIHRoZSBvbmx5IHdheSB0byBrbm93IGFib3V0IHJlcGxhY2VTdGF0ZS9wdXNoU3RhdGUgaXMgdG8gd3JhcCB0aGVt4oCmID5fPFxuXG4gICAgICBpZiAod2luLmhpc3RvcnkucmVwbGFjZVN0YXRlKSB3cmFwSGlzdG9yeUZuKGNsaWVudCwgd2luLmhpc3RvcnksICdyZXBsYWNlU3RhdGUnLCB3aW4pO1xuICAgICAgaWYgKHdpbi5oaXN0b3J5LnB1c2hTdGF0ZSkgd3JhcEhpc3RvcnlGbihjbGllbnQsIHdpbi5oaXN0b3J5LCAncHVzaFN0YXRlJywgd2luKTtcbiAgICAgIGNsaWVudC5sZWF2ZUJyZWFkY3J1bWIoJ0J1Z3NuYWcgbG9hZGVkJywge30sICduYXZpZ2F0aW9uJyk7XG4gICAgfVxuICB9O1xuXG4gIGlmIChcInByb2R1Y3Rpb25cIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgcGx1Z2luLmRlc3Ryb3kgPSBmdW5jdGlvbiAod2luKSB7XG4gICAgICBpZiAod2luID09PSB2b2lkIDApIHtcbiAgICAgICAgd2luID0gd2luZG93O1xuICAgICAgfVxuXG4gICAgICB3aW4uaGlzdG9yeS5yZXBsYWNlU3RhdGUuX3Jlc3RvcmUoKTtcblxuICAgICAgd2luLmhpc3RvcnkucHVzaFN0YXRlLl9yZXN0b3JlKCk7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBwbHVnaW47XG59O1xuXG5pZiAoXCJwcm9kdWN0aW9uXCIgIT09ICdwcm9kdWN0aW9uJykge1xuICBfJG5hdmlnYXRpb25CcmVhZGNydW1ic180OS5kZXN0cm95ID0gZnVuY3Rpb24gKHdpbikge1xuICAgIGlmICh3aW4gPT09IHZvaWQgMCkge1xuICAgICAgd2luID0gd2luZG93O1xuICAgIH1cblxuICAgIHdpbi5oaXN0b3J5LnJlcGxhY2VTdGF0ZS5fcmVzdG9yZSgpO1xuXG4gICAgd2luLmhpc3RvcnkucHVzaFN0YXRlLl9yZXN0b3JlKCk7XG4gIH07XG59IC8vIHRha2VzIGEgZnVsbCB1cmwgbGlrZSBodHRwOi8vZm9vLmNvbToxMjM0L3BhZ2VzLzAxLmh0bWw/eWVzPW5vI3NlY3Rpb24tMiBhbmQgcmV0dXJuc1xuLy8ganVzdCB0aGUgcGF0aCBhbmQgaGFzaCBwYXJ0cywgZS5nLiAvcGFnZXMvMDEuaHRtbD95ZXM9bm8jc2VjdGlvbi0yXG5cblxudmFyIHJlbGF0aXZlTG9jYXRpb24gPSBmdW5jdGlvbiAodXJsLCB3aW4pIHtcbiAgdmFyIGEgPSB3aW4uZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQScpO1xuICBhLmhyZWYgPSB1cmw7XG4gIHJldHVybiBcIlwiICsgYS5wYXRobmFtZSArIGEuc2VhcmNoICsgYS5oYXNoO1xufTtcblxudmFyIHN0YXRlQ2hhbmdlVG9NZXRhZGF0YSA9IGZ1bmN0aW9uICh3aW4sIHN0YXRlLCB0aXRsZSwgdXJsKSB7XG4gIHZhciBjdXJyZW50UGF0aCA9IHJlbGF0aXZlTG9jYXRpb24od2luLmxvY2F0aW9uLmhyZWYsIHdpbik7XG4gIHJldHVybiB7XG4gICAgdGl0bGU6IHRpdGxlLFxuICAgIHN0YXRlOiBzdGF0ZSxcbiAgICBwcmV2U3RhdGU6IGdldEN1cnJlbnRTdGF0ZSh3aW4pLFxuICAgIHRvOiB1cmwgfHwgY3VycmVudFBhdGgsXG4gICAgZnJvbTogY3VycmVudFBhdGhcbiAgfTtcbn07XG5cbnZhciB3cmFwSGlzdG9yeUZuID0gZnVuY3Rpb24gKGNsaWVudCwgdGFyZ2V0LCBmbiwgd2luKSB7XG4gIHZhciBvcmlnID0gdGFyZ2V0W2ZuXTtcblxuICB0YXJnZXRbZm5dID0gZnVuY3Rpb24gKHN0YXRlLCB0aXRsZSwgdXJsKSB7XG4gICAgY2xpZW50LmxlYXZlQnJlYWRjcnVtYihcIkhpc3RvcnkgXCIgKyBmbiwgc3RhdGVDaGFuZ2VUb01ldGFkYXRhKHdpbiwgc3RhdGUsIHRpdGxlLCB1cmwpLCAnbmF2aWdhdGlvbicpOyAvLyBpZiB0aHJvdHRsZSBwbHVnaW4gaXMgaW4gdXNlLCByZXNldCB0aGUgZXZlbnQgc2VudCBjb3VudFxuXG4gICAgaWYgKHR5cGVvZiBjbGllbnQucmVzZXRFdmVudENvdW50ID09PSAnZnVuY3Rpb24nKSBjbGllbnQucmVzZXRFdmVudENvdW50KCk7IC8vIGlmIHRoZSBjbGllbnQgaXMgb3BlcmF0aW5nIGluIGF1dG8gc2Vzc2lvbi1tb2RlLCBhIG5ldyByb3V0ZSBzaG91bGQgdHJpZ2dlciBhIG5ldyBzZXNzaW9uXG5cbiAgICBpZiAoY2xpZW50Ll9jb25maWcuYXV0b1RyYWNrU2Vzc2lvbnMpIGNsaWVudC5zdGFydFNlc3Npb24oKTsgLy8gSW50ZXJuZXQgRXhwbG9yZXIgd2lsbCBjb252ZXJ0IGB1bmRlZmluZWRgIHRvIGEgc3RyaW5nIHdoZW4gcGFzc2VkLCBjYXVzaW5nIGFuIHVuaW50ZW5kZWQgcmVkaXJlY3RcbiAgICAvLyB0byAnL3VuZGVmaW5lZCcuIHRoZXJlZm9yZSB3ZSBvbmx5IHBhc3MgdGhlIHVybCBpZiBpdCdzIG5vdCB1bmRlZmluZWQuXG5cbiAgICBvcmlnLmFwcGx5KHRhcmdldCwgW3N0YXRlLCB0aXRsZV0uY29uY2F0KHVybCAhPT0gdW5kZWZpbmVkID8gdXJsIDogW10pKTtcbiAgfTtcblxuICBpZiAoXCJwcm9kdWN0aW9uXCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHRhcmdldFtmbl0uX3Jlc3RvcmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0YXJnZXRbZm5dID0gb3JpZztcbiAgICB9O1xuICB9XG59O1xuXG52YXIgZ2V0Q3VycmVudFN0YXRlID0gZnVuY3Rpb24gKHdpbikge1xuICB0cnkge1xuICAgIHJldHVybiB3aW4uaGlzdG9yeS5zdGF0ZTtcbiAgfSBjYXRjaCAoZSkge31cbn07XG5cbnZhciBCUkVBRENSVU1CX1RZUEUgPSAncmVxdWVzdCc7IC8vIGtleXMgdG8gc2FmZWx5IHN0b3JlIG1ldGFkYXRhIG9uIHRoZSByZXF1ZXN0IG9iamVjdFxuXG52YXIgUkVRVUVTVF9TRVRVUF9LRVkgPSAnQlN+flMnO1xudmFyIFJFUVVFU1RfVVJMX0tFWSA9ICdCU35+VSc7XG52YXIgUkVRVUVTVF9NRVRIT0RfS0VZID0gJ0JTfn5NJztcblxuLyogcmVtb3ZlZDogdmFyIF8kaW5jbHVkZXNfMTMgPSByZXF1aXJlKCdAYnVnc25hZy9jb3JlL2xpYi9lcy11dGlscy9pbmNsdWRlcycpOyAqLztcbi8qXG4gKiBMZWF2ZXMgYnJlYWRjcnVtYnMgd2hlbiBuZXR3b3JrIHJlcXVlc3RzIG9jY3VyXG4gKi9cblxuXG52YXIgXyRuZXR3b3JrQnJlYWRjcnVtYnNfNTAgPSBmdW5jdGlvbiAoX2lnbm9yZWRVcmxzLCB3aW4pIHtcbiAgaWYgKF9pZ25vcmVkVXJscyA9PT0gdm9pZCAwKSB7XG4gICAgX2lnbm9yZWRVcmxzID0gW107XG4gIH1cblxuICBpZiAod2luID09PSB2b2lkIDApIHtcbiAgICB3aW4gPSB3aW5kb3c7XG4gIH1cblxuICB2YXIgcmVzdG9yZUZ1bmN0aW9ucyA9IFtdO1xuICB2YXIgcGx1Z2luID0ge1xuICAgIGxvYWQ6IGZ1bmN0aW9uIChjbGllbnQpIHtcbiAgICAgIGlmICghY2xpZW50Ll9jb25maWcuZW5hYmxlZEJyZWFkY3J1bWJUeXBlcyB8fCAhXyRpbmNsdWRlc18xMyhjbGllbnQuX2NvbmZpZy5lbmFibGVkQnJlYWRjcnVtYlR5cGVzLCAncmVxdWVzdCcpKSByZXR1cm47XG4gICAgICB2YXIgaWdub3JlZFVybHMgPSBbY2xpZW50Ll9jb25maWcuZW5kcG9pbnRzLm5vdGlmeSwgY2xpZW50Ll9jb25maWcuZW5kcG9pbnRzLnNlc3Npb25zXS5jb25jYXQoX2lnbm9yZWRVcmxzKTtcbiAgICAgIG1vbmtleVBhdGNoWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgIG1vbmtleVBhdGNoRmV0Y2goKTsgLy8gWE1MSHR0cFJlcXVlc3QgbW9ua2V5IHBhdGNoXG5cbiAgICAgIGZ1bmN0aW9uIG1vbmtleVBhdGNoWE1MSHR0cFJlcXVlc3QoKSB7XG4gICAgICAgIGlmICghKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW4uWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlKSkgcmV0dXJuO1xuICAgICAgICB2YXIgbmF0aXZlT3BlbiA9IHdpbi5YTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUub3BlbjsgLy8gb3ZlcnJpZGUgbmF0aXZlIG9wZW4oKVxuXG4gICAgICAgIHdpbi5YTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uIG9wZW4obWV0aG9kLCB1cmwpIHtcbiAgICAgICAgICAvLyBzdG9yZSB1cmwgYW5kIEhUVFAgbWV0aG9kIGZvciBsYXRlclxuICAgICAgICAgIHRoaXNbUkVRVUVTVF9VUkxfS0VZXSA9IHVybDtcbiAgICAgICAgICB0aGlzW1JFUVVFU1RfTUVUSE9EX0tFWV0gPSBtZXRob2Q7IC8vIGlmIHdlIGhhdmUgYWxyZWFkeSBzZXR1cCBsaXN0ZW5lcnMsIGl0IG1lYW5zIG9wZW4oKSB3YXMgY2FsbGVkIHR3aWNlLCB3ZSBuZWVkIHRvIHJlbW92ZVxuICAgICAgICAgIC8vIHRoZSBsaXN0ZW5lcnMgYW5kIHJlY3JlYXRlIHRoZW1cblxuICAgICAgICAgIGlmICh0aGlzW1JFUVVFU1RfU0VUVVBfS0VZXSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkJywgaGFuZGxlWEhSTG9hZCk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgaGFuZGxlWEhSRXJyb3IpO1xuICAgICAgICAgIH0gLy8gYXR0YWNoIGxvYWQgZXZlbnQgbGlzdGVuZXJcblxuXG4gICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgaGFuZGxlWEhSTG9hZCk7IC8vIGF0dGFjaCBlcnJvciBldmVudCBsaXN0ZW5lclxuXG4gICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGhhbmRsZVhIUkVycm9yKTtcbiAgICAgICAgICB0aGlzW1JFUVVFU1RfU0VUVVBfS0VZXSA9IHRydWU7XG4gICAgICAgICAgbmF0aXZlT3Blbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChcInByb2R1Y3Rpb25cIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgcmVzdG9yZUZ1bmN0aW9ucy5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHdpbi5YTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUub3BlbiA9IG5hdGl2ZU9wZW47XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gaGFuZGxlWEhSTG9hZCgpIHtcbiAgICAgICAgaWYgKF8kaW5jbHVkZXNfMTMoaWdub3JlZFVybHMsIHRoaXNbUkVRVUVTVF9VUkxfS0VZXSkpIHtcbiAgICAgICAgICAvLyBkb24ndCBsZWF2ZSBhIG5ldHdvcmsgYnJlYWRjcnVtYiBmcm9tIGJ1Z3NuYWcgbm90aWZ5IGNhbGxzXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG1ldGFkYXRhID0ge1xuICAgICAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICAgICAgcmVxdWVzdDogdGhpc1tSRVFVRVNUX01FVEhPRF9LRVldICsgXCIgXCIgKyB0aGlzW1JFUVVFU1RfVVJMX0tFWV1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodGhpcy5zdGF0dXMgPj0gNDAwKSB7XG4gICAgICAgICAgLy8gY29udGFjdGVkIHNlcnZlciBidXQgZ290IGFuIGVycm9yIHJlc3BvbnNlXG4gICAgICAgICAgY2xpZW50LmxlYXZlQnJlYWRjcnVtYignWE1MSHR0cFJlcXVlc3QgZmFpbGVkJywgbWV0YWRhdGEsIEJSRUFEQ1JVTUJfVFlQRSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2xpZW50LmxlYXZlQnJlYWRjcnVtYignWE1MSHR0cFJlcXVlc3Qgc3VjY2VlZGVkJywgbWV0YWRhdGEsIEJSRUFEQ1JVTUJfVFlQRSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gaGFuZGxlWEhSRXJyb3IoKSB7XG4gICAgICAgIGlmIChfJGluY2x1ZGVzXzEzKGlnbm9yZWRVcmxzLCB0aGlzW1JFUVVFU1RfVVJMX0tFWV0pKSB7XG4gICAgICAgICAgLy8gZG9uJ3QgbGVhdmUgYSBuZXR3b3JrIGJyZWFkY3J1bWIgZnJvbSBidWdzbmFnIG5vdGlmeSBjYWxsc1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSAvLyBmYWlsZWQgdG8gY29udGFjdCBzZXJ2ZXJcblxuXG4gICAgICAgIGNsaWVudC5sZWF2ZUJyZWFkY3J1bWIoJ1hNTEh0dHBSZXF1ZXN0IGVycm9yJywge1xuICAgICAgICAgIHJlcXVlc3Q6IHRoaXNbUkVRVUVTVF9NRVRIT0RfS0VZXSArIFwiIFwiICsgdGhpc1tSRVFVRVNUX1VSTF9LRVldXG4gICAgICAgIH0sIEJSRUFEQ1JVTUJfVFlQRSk7XG4gICAgICB9IC8vIHdpbmRvdy5mZXRjaCBtb25rZXkgcGF0Y2hcblxuXG4gICAgICBmdW5jdGlvbiBtb25rZXlQYXRjaEZldGNoKCkge1xuICAgICAgICAvLyBvbmx5IHBhdGNoIGl0IGlmIGl0IGV4aXN0cyBhbmQgaWYgaXQgaXMgbm90IGEgcG9seWZpbGwgKHBhdGNoaW5nIGEgcG9seWZpbGxlZFxuICAgICAgICAvLyBmZXRjaCgpIHJlc3VsdHMgaW4gZHVwbGljYXRlIGJyZWFkY3J1bWJzIGZvciB0aGUgc2FtZSByZXF1ZXN0IGJlY2F1c2UgdGhlXG4gICAgICAgIC8vIGltcGxlbWVudGF0aW9uIHVzZXMgWE1MSHR0cFJlcXVlc3Qgd2hpY2ggaXMgYWxzbyBwYXRjaGVkKVxuICAgICAgICBpZiAoISgnZmV0Y2gnIGluIHdpbikgfHwgd2luLmZldGNoLnBvbHlmaWxsKSByZXR1cm47XG4gICAgICAgIHZhciBvbGRGZXRjaCA9IHdpbi5mZXRjaDtcblxuICAgICAgICB3aW4uZmV0Y2ggPSBmdW5jdGlvbiBmZXRjaCgpIHtcbiAgICAgICAgICB2YXIgX2FyZ3VtZW50cyA9IGFyZ3VtZW50cztcbiAgICAgICAgICB2YXIgdXJsT3JSZXF1ZXN0ID0gYXJndW1lbnRzWzBdO1xuICAgICAgICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzWzFdO1xuICAgICAgICAgIHZhciBtZXRob2Q7XG4gICAgICAgICAgdmFyIHVybCA9IG51bGw7XG5cbiAgICAgICAgICBpZiAodXJsT3JSZXF1ZXN0ICYmIHR5cGVvZiB1cmxPclJlcXVlc3QgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB1cmwgPSB1cmxPclJlcXVlc3QudXJsO1xuXG4gICAgICAgICAgICBpZiAob3B0aW9ucyAmJiAnbWV0aG9kJyBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICAgIG1ldGhvZCA9IG9wdGlvbnMubWV0aG9kO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh1cmxPclJlcXVlc3QgJiYgJ21ldGhvZCcgaW4gdXJsT3JSZXF1ZXN0KSB7XG4gICAgICAgICAgICAgIG1ldGhvZCA9IHVybE9yUmVxdWVzdC5tZXRob2Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHVybCA9IHVybE9yUmVxdWVzdDtcblxuICAgICAgICAgICAgaWYgKG9wdGlvbnMgJiYgJ21ldGhvZCcgaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgICBtZXRob2QgPSBvcHRpb25zLm1ldGhvZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG1ldGhvZCA9ICdHRVQnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAvLyBwYXNzIHRocm91Z2ggdG8gbmF0aXZlIGZldGNoXG4gICAgICAgICAgICBvbGRGZXRjaC5hcHBseSh2b2lkIDAsIF9hcmd1bWVudHMpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIGhhbmRsZUZldGNoU3VjY2VzcyhyZXNwb25zZSwgbWV0aG9kLCB1cmwpO1xuICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgIGhhbmRsZUZldGNoRXJyb3IobWV0aG9kLCB1cmwpO1xuICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKFwicHJvZHVjdGlvblwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICByZXN0b3JlRnVuY3Rpb25zLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgd2luLmZldGNoID0gb2xkRmV0Y2g7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIGhhbmRsZUZldGNoU3VjY2VzcyA9IGZ1bmN0aW9uIChyZXNwb25zZSwgbWV0aG9kLCB1cmwpIHtcbiAgICAgICAgdmFyIG1ldGFkYXRhID0ge1xuICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAgIHJlcXVlc3Q6IG1ldGhvZCArIFwiIFwiICsgdXJsXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA+PSA0MDApIHtcbiAgICAgICAgICAvLyB3aGVuIHRoZSByZXF1ZXN0IGNvbWVzIGJhY2sgd2l0aCBhIDR4eCBvciA1eHggc3RhdHVzIGl0IGRvZXMgbm90IHJlamVjdCB0aGUgZmV0Y2ggcHJvbWlzZSxcbiAgICAgICAgICBjbGllbnQubGVhdmVCcmVhZGNydW1iKCdmZXRjaCgpIGZhaWxlZCcsIG1ldGFkYXRhLCBCUkVBRENSVU1CX1RZUEUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNsaWVudC5sZWF2ZUJyZWFkY3J1bWIoJ2ZldGNoKCkgc3VjY2VlZGVkJywgbWV0YWRhdGEsIEJSRUFEQ1JVTUJfVFlQRSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHZhciBoYW5kbGVGZXRjaEVycm9yID0gZnVuY3Rpb24gKG1ldGhvZCwgdXJsKSB7XG4gICAgICAgIGNsaWVudC5sZWF2ZUJyZWFkY3J1bWIoJ2ZldGNoKCkgZXJyb3InLCB7XG4gICAgICAgICAgcmVxdWVzdDogbWV0aG9kICsgXCIgXCIgKyB1cmxcbiAgICAgICAgfSwgQlJFQURDUlVNQl9UWVBFKTtcbiAgICAgIH07XG4gICAgfVxuICB9O1xuXG4gIGlmIChcInByb2R1Y3Rpb25cIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgcGx1Z2luLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXN0b3JlRnVuY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgIHJldHVybiBmbigpO1xuICAgICAgfSk7XG4gICAgICByZXN0b3JlRnVuY3Rpb25zID0gW107XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBwbHVnaW47XG59O1xuXG4vKiByZW1vdmVkOiB2YXIgXyRpbnRSYW5nZV8yMyA9IHJlcXVpcmUoJ0BidWdzbmFnL2NvcmUvbGliL3ZhbGlkYXRvcnMvaW50LXJhbmdlJyk7ICovO1xuLypcbiAqIFRocm90dGxlcyBhbmQgZGVkdXBlcyBldmVudHNcbiAqL1xuXG5cbnZhciBfJHRocm90dGxlXzUxID0ge1xuICBsb2FkOiBmdW5jdGlvbiAoY2xpZW50KSB7XG4gICAgLy8gdHJhY2sgc2VudCBldmVudHMgZm9yIGVhY2ggaW5pdCBvZiB0aGUgcGx1Z2luXG4gICAgdmFyIG4gPSAwOyAvLyBhZGQgb25FcnJvciBob29rXG5cbiAgICBjbGllbnQuYWRkT25FcnJvcihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIC8vIGhhdmUgbWF4IGV2ZW50cyBiZWVuIHNlbnQgYWxyZWFkeT9cbiAgICAgIGlmIChuID49IGNsaWVudC5fY29uZmlnLm1heEV2ZW50cykgcmV0dXJuIGZhbHNlO1xuICAgICAgbisrO1xuICAgIH0pO1xuXG4gICAgY2xpZW50LnJlc2V0RXZlbnRDb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIG4gPSAwO1xuICAgIH07XG4gIH0sXG4gIGNvbmZpZ1NjaGVtYToge1xuICAgIG1heEV2ZW50czoge1xuICAgICAgZGVmYXVsdFZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAxMDtcbiAgICAgIH0sXG4gICAgICBtZXNzYWdlOiAnc2hvdWxkIGJlIGEgcG9zaXRpdmUgaW50ZWdlciDiiaQxMDAnLFxuICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgcmV0dXJuIF8kaW50UmFuZ2VfMjMoMSwgMTAwKSh2YWwpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxudmFyIF8kc3RyaXBRdWVyeVN0cmluZ181MiA9IHt9O1xuLypcbiAqIFJlbW92ZSBxdWVyeSBzdHJpbmdzIChhbmQgZnJhZ21lbnRzKSBmcm9tIHN0YWNrdHJhY2VzXG4gKi9cbi8qIHJlbW92ZWQ6IHZhciBfJG1hcF8xNiA9IHJlcXVpcmUoJ0BidWdzbmFnL2NvcmUvbGliL2VzLXV0aWxzL21hcCcpOyAqLztcblxuLyogcmVtb3ZlZDogdmFyIF8kcmVkdWNlXzE3ID0gcmVxdWlyZSgnQGJ1Z3NuYWcvY29yZS9saWIvZXMtdXRpbHMvcmVkdWNlJyk7ICovO1xuXG5fJHN0cmlwUXVlcnlTdHJpbmdfNTIgPSB7XG4gIGxvYWQ6IGZ1bmN0aW9uIChjbGllbnQpIHtcbiAgICBjbGllbnQuYWRkT25FcnJvcihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHZhciBhbGxGcmFtZXMgPSBfJHJlZHVjZV8xNyhldmVudC5lcnJvcnMsIGZ1bmN0aW9uIChhY2N1bSwgZXIpIHtcbiAgICAgICAgcmV0dXJuIGFjY3VtLmNvbmNhdChlci5zdGFja3RyYWNlKTtcbiAgICAgIH0sIFtdKTtcbiAgICAgIF8kbWFwXzE2KGFsbEZyYW1lcywgZnVuY3Rpb24gKGZyYW1lKSB7XG4gICAgICAgIGZyYW1lLmZpbGUgPSBzdHJpcChmcmFtZS5maWxlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59O1xuXG52YXIgc3RyaXAgPSBfJHN0cmlwUXVlcnlTdHJpbmdfNTIuX3N0cmlwID0gZnVuY3Rpb24gKHN0cikge1xuICByZXR1cm4gdHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgPyBzdHIucmVwbGFjZSgvXFw/LiokLywgJycpLnJlcGxhY2UoLyMuKiQvLCAnJykgOiBzdHI7XG59O1xuXG4vKlxuICogQXV0b21hdGljYWxseSBub3RpZmllcyBCdWdzbmFnIHdoZW4gd2luZG93Lm9uZXJyb3IgaXMgY2FsbGVkXG4gKi9cbnZhciBfJG9uZXJyb3JfNTMgPSBmdW5jdGlvbiAod2luKSB7XG4gIGlmICh3aW4gPT09IHZvaWQgMCkge1xuICAgIHdpbiA9IHdpbmRvdztcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbG9hZDogZnVuY3Rpb24gKGNsaWVudCkge1xuICAgICAgaWYgKCFjbGllbnQuX2NvbmZpZy5hdXRvRGV0ZWN0RXJyb3JzKSByZXR1cm47XG4gICAgICBpZiAoIWNsaWVudC5fY29uZmlnLmVuYWJsZWRFcnJvclR5cGVzLnVuaGFuZGxlZEV4Y2VwdGlvbnMpIHJldHVybjtcblxuICAgICAgZnVuY3Rpb24gb25lcnJvcihtZXNzYWdlT3JFdmVudCwgdXJsLCBsaW5lTm8sIGNoYXJObywgZXJyb3IpIHtcbiAgICAgICAgLy8gSWdub3JlIGVycm9ycyB3aXRoIG5vIGluZm8gZHVlIHRvIENPUlMgc2V0dGluZ3NcbiAgICAgICAgaWYgKGxpbmVObyA9PT0gMCAmJiAvU2NyaXB0IGVycm9yXFwuPy8udGVzdChtZXNzYWdlT3JFdmVudCkpIHtcbiAgICAgICAgICBjbGllbnQuX2xvZ2dlci53YXJuKCdJZ25vcmluZyBjcm9zcy1kb21haW4gb3IgZXZhbCBzY3JpcHQgZXJyb3IuIFNlZSBkb2NzOiBodHRwczovL3Rpbnl1cmwuY29tL3l5M3JuNjN6Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gYW55IGVycm9yIHNlbnQgdG8gd2luZG93Lm9uZXJyb3IgaXMgdW5oYW5kbGVkIGFuZCBoYXMgc2V2ZXJpdHk9ZXJyb3JcbiAgICAgICAgICB2YXIgaGFuZGxlZFN0YXRlID0ge1xuICAgICAgICAgICAgc2V2ZXJpdHk6ICdlcnJvcicsXG4gICAgICAgICAgICB1bmhhbmRsZWQ6IHRydWUsXG4gICAgICAgICAgICBzZXZlcml0eVJlYXNvbjoge1xuICAgICAgICAgICAgICB0eXBlOiAndW5oYW5kbGVkRXhjZXB0aW9uJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgdmFyIGV2ZW50OyAvLyB3aW5kb3cub25lcnJvciBjYW4gYmUgY2FsbGVkIGluIGEgbnVtYmVyIG9mIHdheXMuIFRoaXMgYmlnIGlmLWVsc2UgaXMgaG93IHdlXG4gICAgICAgICAgLy8gZmlndXJlIG91dCB3aGljaCBhcmd1bWVudHMgd2VyZSBzdXBwbGllZCwgYW5kIHdoYXQga2luZCBvZiB2YWx1ZXMgaXQgcmVjZWl2ZWQuXG5cbiAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIC8vIGlmIHRoZSBsYXN0IHBhcmFtZXRlciAoZXJyb3IpIHdhcyBzdXBwbGllZCwgdGhpcyBpcyBhIG1vZGVybiBicm93c2VyJ3NcbiAgICAgICAgICAgIC8vIHdheSBvZiBzYXlpbmcgXCJ0aGlzIHZhbHVlIHdhcyB0aHJvd24gYW5kIG5vdCBjYXVnaHRcIlxuICAgICAgICAgICAgZXZlbnQgPSBjbGllbnQuRXZlbnQuY3JlYXRlKGVycm9yLCB0cnVlLCBoYW5kbGVkU3RhdGUsICd3aW5kb3cgb25lcnJvcicsIDEpO1xuICAgICAgICAgICAgZGVjb3JhdGVTdGFjayhldmVudC5lcnJvcnNbMF0uc3RhY2t0cmFjZSwgdXJsLCBsaW5lTm8sIGNoYXJObyk7XG4gICAgICAgICAgfSBlbHNlIGlmICggLy8gVGhpcyBjb21wbGV4IGNhc2UgZGV0ZWN0cyBcImVycm9yXCIgZXZlbnRzIHRoYXQgYXJlIHR5cGljYWxseSBzeW50aGVzaXNlZFxuICAgICAgICAgIC8vIGJ5IGpxdWVyeSdzIHRyaWdnZXIgbWV0aG9kIChhbHRob3VnaCBjYW4gYmUgY3JlYXRlZCBpbiBvdGhlciB3YXlzKS4gSW5cbiAgICAgICAgICAvLyBvcmRlciB0byBkZXRlY3QgdGhpczpcbiAgICAgICAgICAvLyAtIHRoZSBmaXJzdCBhcmd1bWVudCAobWVzc2FnZSkgbXVzdCBleGlzdCBhbmQgYmUgYW4gb2JqZWN0IChtb3N0IGxpa2VseSBpdCdzIGEgalF1ZXJ5IGV2ZW50KVxuICAgICAgICAgIC8vIC0gdGhlIHNlY29uZCBhcmd1bWVudCAodXJsKSBtdXN0IGVpdGhlciBub3QgZXhpc3Qgb3IgYmUgc29tZXRoaW5nIG90aGVyIHRoYW4gYSBzdHJpbmcgKGlmIGl0XG4gICAgICAgICAgLy8gICAgZXhpc3RzIGFuZCBpcyBub3QgYSBzdHJpbmcsIGl0J2xsIGJlIHRoZSBleHRyYVBhcmFtZXRlcnMgYXJndW1lbnQgZnJvbSBqUXVlcnkncyB0cmlnZ2VyKClcbiAgICAgICAgICAvLyAgICBmdW5jdGlvbilcbiAgICAgICAgICAvLyAtIHRoZSB0aGlyZCwgZm91cnRoIGFuZCBmaWZ0aCBhcmd1bWVudHMgbXVzdCBub3QgZXhpc3QgKGxpbmVObywgY2hhck5vIGFuZCBlcnJvcilcbiAgICAgICAgICB0eXBlb2YgbWVzc2FnZU9yRXZlbnQgPT09ICdvYmplY3QnICYmIG1lc3NhZ2VPckV2ZW50ICE9PSBudWxsICYmICghdXJsIHx8IHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSAmJiAhbGluZU5vICYmICFjaGFyTm8gJiYgIWVycm9yKSB7XG4gICAgICAgICAgICAvLyBUaGUgalF1ZXJ5IGV2ZW50IG1heSBoYXZlIGEgXCJ0eXBlXCIgcHJvcGVydHksIGlmIHNvIHVzZSBpdCBhcyBwYXJ0IG9mIHRoZSBlcnJvciBtZXNzYWdlXG4gICAgICAgICAgICB2YXIgbmFtZSA9IG1lc3NhZ2VPckV2ZW50LnR5cGUgPyBcIkV2ZW50OiBcIiArIG1lc3NhZ2VPckV2ZW50LnR5cGUgOiAnRXJyb3InOyAvLyBhdHRlbXB0IHRvIGZpbmQgYSBtZXNzYWdlIGZyb20gb25lIG9mIHRoZSBjb252ZW50aW9uYWwgcHJvcGVydGllcywgYnV0XG4gICAgICAgICAgICAvLyBkZWZhdWx0IHRvIGVtcHR5IHN0cmluZyAodGhlIGV2ZW50IHdpbGwgZmlsbCBpdCB3aXRoIGEgcGxhY2Vob2xkZXIpXG5cbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gbWVzc2FnZU9yRXZlbnQubWVzc2FnZSB8fCBtZXNzYWdlT3JFdmVudC5kZXRhaWwgfHwgJyc7XG4gICAgICAgICAgICBldmVudCA9IGNsaWVudC5FdmVudC5jcmVhdGUoe1xuICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlXG4gICAgICAgICAgICB9LCB0cnVlLCBoYW5kbGVkU3RhdGUsICd3aW5kb3cgb25lcnJvcicsIDEpOyAvLyBwcm92aWRlIHRoZSBvcmlnaW5hbCB0aGluZyBvbmVycm9yIHJlY2VpdmVkIOKAkyBub3Qgb3VyIGVycm9yLWxpa2Ugb2JqZWN0IHdlIHBhc3NlZCB0byBfbm90aWZ5XG5cbiAgICAgICAgICAgIGV2ZW50Lm9yaWdpbmFsRXJyb3IgPSBtZXNzYWdlT3JFdmVudDsgLy8gaW5jbHVkZSB0aGUgcmF3IGlucHV0IGFzIG1ldGFkYXRhIOKAkyBpdCBtaWdodCBjb250YWluIG1vcmUgaW5mbyB0aGFuIHdlIGV4dHJhY3RlZFxuXG4gICAgICAgICAgICBldmVudC5hZGRNZXRhZGF0YSgnd2luZG93IG9uZXJyb3InLCB7XG4gICAgICAgICAgICAgIGV2ZW50OiBtZXNzYWdlT3JFdmVudCxcbiAgICAgICAgICAgICAgZXh0cmFQYXJhbWV0ZXJzOiB1cmxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBMYXN0bHksIGlmIHRoZXJlIHdhcyBubyBcImVycm9yXCIgcGFyYW1ldGVyIHRoaXMgZXZlbnQgd2FzIHByb2JhYmx5IGZyb20gYW4gb2xkXG4gICAgICAgICAgICAvLyBicm93c2VyIHRoYXQgZG9lc24ndCBzdXBwb3J0IHRoYXQuIEluc3RlYWQgd2UgbmVlZCB0byBnZW5lcmF0ZSBhIHN0YWNrdHJhY2UuXG4gICAgICAgICAgICBldmVudCA9IGNsaWVudC5FdmVudC5jcmVhdGUobWVzc2FnZU9yRXZlbnQsIHRydWUsIGhhbmRsZWRTdGF0ZSwgJ3dpbmRvdyBvbmVycm9yJywgMSk7XG4gICAgICAgICAgICBkZWNvcmF0ZVN0YWNrKGV2ZW50LmVycm9yc1swXS5zdGFja3RyYWNlLCB1cmwsIGxpbmVObywgY2hhck5vKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjbGllbnQuX25vdGlmeShldmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHByZXZPbkVycm9yID09PSAnZnVuY3Rpb24nKSBwcmV2T25FcnJvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICB2YXIgcHJldk9uRXJyb3IgPSB3aW4ub25lcnJvcjtcbiAgICAgIHdpbi5vbmVycm9yID0gb25lcnJvcjtcbiAgICB9XG4gIH07XG59OyAvLyBTb21ldGltZXMgdGhlIHN0YWNrdHJhY2UgaGFzIGxlc3MgaW5mb3JtYXRpb24gdGhhbiB3YXMgcGFzc2VkIHRvIHdpbmRvdy5vbmVycm9yLlxuLy8gVGhpcyBmdW5jdGlvbiB3aWxsIGF1Z21lbnQgdGhlIGZpcnN0IHN0YWNrZnJhbWUgd2l0aCBhbnkgdXNlZnVsIGluZm8gdGhhdCB3YXNcbi8vIHJlY2VpdmVkIGFzIGFyZ3VtZW50cyB0byB0aGUgb25lcnJvciBjYWxsYmFjay5cblxuXG52YXIgZGVjb3JhdGVTdGFjayA9IGZ1bmN0aW9uIChzdGFjaywgdXJsLCBsaW5lTm8sIGNoYXJObykge1xuICBpZiAoIXN0YWNrWzBdKSBzdGFjay5wdXNoKHt9KTtcbiAgdmFyIGN1bHByaXQgPSBzdGFja1swXTtcbiAgaWYgKCFjdWxwcml0LmZpbGUgJiYgdHlwZW9mIHVybCA9PT0gJ3N0cmluZycpIGN1bHByaXQuZmlsZSA9IHVybDtcbiAgaWYgKCFjdWxwcml0LmxpbmVOdW1iZXIgJiYgaXNBY3R1YWxOdW1iZXIobGluZU5vKSkgY3VscHJpdC5saW5lTnVtYmVyID0gbGluZU5vO1xuXG4gIGlmICghY3VscHJpdC5jb2x1bW5OdW1iZXIpIHtcbiAgICBpZiAoaXNBY3R1YWxOdW1iZXIoY2hhck5vKSkge1xuICAgICAgY3VscHJpdC5jb2x1bW5OdW1iZXIgPSBjaGFyTm87XG4gICAgfSBlbHNlIGlmICh3aW5kb3cuZXZlbnQgJiYgaXNBY3R1YWxOdW1iZXIod2luZG93LmV2ZW50LmVycm9yQ2hhcmFjdGVyKSkge1xuICAgICAgY3VscHJpdC5jb2x1bW5OdW1iZXIgPSB3aW5kb3cuZXZlbnQuZXJyb3JDaGFyYWN0ZXI7XG4gICAgfVxuICB9XG59O1xuXG52YXIgaXNBY3R1YWxOdW1iZXIgPSBmdW5jdGlvbiAobikge1xuICByZXR1cm4gdHlwZW9mIG4gPT09ICdudW1iZXInICYmIFN0cmluZy5jYWxsKG4pICE9PSAnTmFOJztcbn07XG5cbi8qIHJlbW92ZWQ6IHZhciBfJG1hcF8xNiA9IHJlcXVpcmUoJ0BidWdzbmFnL2NvcmUvbGliL2VzLXV0aWxzL21hcCcpOyAqLztcblxuLyogcmVtb3ZlZDogdmFyIF8kaXNlcnJvcl8xOSA9IHJlcXVpcmUoJ0BidWdzbmFnL2NvcmUvbGliL2lzZXJyb3InKTsgKi87XG5cbnZhciBfbGlzdGVuZXI7XG4vKlxuICogQXV0b21hdGljYWxseSBub3RpZmllcyBCdWdzbmFnIHdoZW4gd2luZG93Lm9udW5oYW5kbGVkcmVqZWN0aW9uIGlzIGNhbGxlZFxuICovXG5cblxudmFyIF8kdW5oYW5kbGVkUmVqZWN0aW9uXzU0ID0gZnVuY3Rpb24gKHdpbikge1xuICBpZiAod2luID09PSB2b2lkIDApIHtcbiAgICB3aW4gPSB3aW5kb3c7XG4gIH1cblxuICB2YXIgcGx1Z2luID0ge1xuICAgIGxvYWQ6IGZ1bmN0aW9uIChjbGllbnQpIHtcbiAgICAgIGlmICghY2xpZW50Ll9jb25maWcuYXV0b0RldGVjdEVycm9ycyB8fCAhY2xpZW50Ll9jb25maWcuZW5hYmxlZEVycm9yVHlwZXMudW5oYW5kbGVkUmVqZWN0aW9ucykgcmV0dXJuO1xuXG4gICAgICB2YXIgbGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIHZhciBlcnJvciA9IGV2dC5yZWFzb247XG4gICAgICAgIHZhciBpc0JsdWViaXJkID0gZmFsc2U7IC8vIGFjY2Vzc2luZyBwcm9wZXJ0aWVzIG9uIGV2dC5kZXRhaWwgY2FuIHRocm93IGVycm9ycyAoc2VlICMzOTQpXG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoZXZ0LmRldGFpbCAmJiBldnQuZGV0YWlsLnJlYXNvbikge1xuICAgICAgICAgICAgZXJyb3IgPSBldnQuZGV0YWlsLnJlYXNvbjtcbiAgICAgICAgICAgIGlzQmx1ZWJpcmQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge31cblxuICAgICAgICB2YXIgZXZlbnQgPSBjbGllbnQuRXZlbnQuY3JlYXRlKGVycm9yLCBmYWxzZSwge1xuICAgICAgICAgIHNldmVyaXR5OiAnZXJyb3InLFxuICAgICAgICAgIHVuaGFuZGxlZDogdHJ1ZSxcbiAgICAgICAgICBzZXZlcml0eVJlYXNvbjoge1xuICAgICAgICAgICAgdHlwZTogJ3VuaGFuZGxlZFByb21pc2VSZWplY3Rpb24nXG4gICAgICAgICAgfVxuICAgICAgICB9LCAndW5oYW5kbGVkcmVqZWN0aW9uIGhhbmRsZXInLCAxLCBjbGllbnQuX2xvZ2dlcik7XG5cbiAgICAgICAgaWYgKGlzQmx1ZWJpcmQpIHtcbiAgICAgICAgICBfJG1hcF8xNihldmVudC5lcnJvcnNbMF0uc3RhY2t0cmFjZSwgZml4Qmx1ZWJpcmRTdGFja3RyYWNlKGVycm9yKSk7XG4gICAgICAgIH1cblxuICAgICAgICBjbGllbnQuX25vdGlmeShldmVudCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgaWYgKF8kaXNlcnJvcl8xOShldmVudC5vcmlnaW5hbEVycm9yKSAmJiAhZXZlbnQub3JpZ2luYWxFcnJvci5zdGFjaykge1xuICAgICAgICAgICAgdmFyIF9ldmVudCRhZGRNZXRhZGF0YTtcblxuICAgICAgICAgICAgZXZlbnQuYWRkTWV0YWRhdGEoJ3VuaGFuZGxlZFJlamVjdGlvbiBoYW5kbGVyJywgKF9ldmVudCRhZGRNZXRhZGF0YSA9IHt9LCBfZXZlbnQkYWRkTWV0YWRhdGFbT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGV2ZW50Lm9yaWdpbmFsRXJyb3IpXSA9IHtcbiAgICAgICAgICAgICAgbmFtZTogZXZlbnQub3JpZ2luYWxFcnJvci5uYW1lLFxuICAgICAgICAgICAgICBtZXNzYWdlOiBldmVudC5vcmlnaW5hbEVycm9yLm1lc3NhZ2UsXG4gICAgICAgICAgICAgIGNvZGU6IGV2ZW50Lm9yaWdpbmFsRXJyb3IuY29kZVxuICAgICAgICAgICAgfSwgX2V2ZW50JGFkZE1ldGFkYXRhKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGlmICgnYWRkRXZlbnRMaXN0ZW5lcicgaW4gd2luKSB7XG4gICAgICAgIHdpbi5hZGRFdmVudExpc3RlbmVyKCd1bmhhbmRsZWRyZWplY3Rpb24nLCBsaXN0ZW5lcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aW4ub251bmhhbmRsZWRyZWplY3Rpb24gPSBmdW5jdGlvbiAocmVhc29uLCBwcm9taXNlKSB7XG4gICAgICAgICAgbGlzdGVuZXIoe1xuICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgIHJlYXNvbjogcmVhc29uLFxuICAgICAgICAgICAgICBwcm9taXNlOiBwcm9taXNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIF9saXN0ZW5lciA9IGxpc3RlbmVyO1xuICAgIH1cbiAgfTtcblxuICBpZiAoXCJwcm9kdWN0aW9uXCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHBsdWdpbi5kZXN0cm95ID0gZnVuY3Rpb24gKHdpbikge1xuICAgICAgaWYgKHdpbiA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHdpbiA9IHdpbmRvdztcbiAgICAgIH1cblxuICAgICAgaWYgKF9saXN0ZW5lcikge1xuICAgICAgICBpZiAoJ2FkZEV2ZW50TGlzdGVuZXInIGluIHdpbikge1xuICAgICAgICAgIHdpbi5yZW1vdmVFdmVudExpc3RlbmVyKCd1bmhhbmRsZWRyZWplY3Rpb24nLCBfbGlzdGVuZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdpbi5vbnVuaGFuZGxlZHJlamVjdGlvbiA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgX2xpc3RlbmVyID0gbnVsbDtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHBsdWdpbjtcbn07IC8vIFRoZSBzdGFjayBwYXJzZXIgb24gYmx1ZWJpcmQgc3RhY2tzIGluIEZGIGdldCBhIHN1cHJpb3VzIGZpcnN0IGZyYW1lOlxuLy9cbi8vIEVycm9yOiBkZXJwXG4vLyAgIGJAaHR0cDovL2xvY2FsaG9zdDo1MDAwL2JsdWViaXJkLmh0bWw6MjI6MjRcbi8vICAgYUBodHRwOi8vbG9jYWxob3N0OjUwMDAvYmx1ZWJpcmQuaHRtbDoxODo5XG4vLyAgIEBodHRwOi8vbG9jYWxob3N0OjUwMDAvYmx1ZWJpcmQuaHRtbDoxNDo5XG4vL1xuLy8gcmVzdWx0cyBpblxuLy8gICBb4oCmXVxuLy8gICAgIDA6IE9iamVjdCB7IGZpbGU6IFwiRXJyb3I6IGRlcnBcIiwgbWV0aG9kOiB1bmRlZmluZWQsIGxpbmVOdW1iZXI6IHVuZGVmaW5lZCwg4oCmIH1cbi8vICAgICAxOiBPYmplY3QgeyBmaWxlOiBcImh0dHA6Ly9sb2NhbGhvc3Q6NTAwMC9ibHVlYmlyZC5odG1sXCIsIG1ldGhvZDogXCJiXCIsIGxpbmVOdW1iZXI6IDIyLCDigKYgfVxuLy8gICAgIDI6IE9iamVjdCB7IGZpbGU6IFwiaHR0cDovL2xvY2FsaG9zdDo1MDAwL2JsdWViaXJkLmh0bWxcIiwgbWV0aG9kOiBcImFcIiwgbGluZU51bWJlcjogMTgsIOKApiB9XG4vLyAgICAgMzogT2JqZWN0IHsgZmlsZTogXCJodHRwOi8vbG9jYWxob3N0OjUwMDAvYmx1ZWJpcmQuaHRtbFwiLCBsaW5lTnVtYmVyOiAxNCwgY29sdW1uTnVtYmVyOiA5LCDigKYgfVxuLy9cbi8vIHNvIHRoZSBmb2xsb3dpbmcgcmVkdWNlL2FjY3VtdWxhdG9yIGZ1bmN0aW9uIHJlbW92ZXMgc3VjaCBmcmFtZXNcbi8vXG4vLyBCbHVlYmlyZCBwYWRzIG1ldGhvZCBuYW1lcyB3aXRoIHNwYWNlcyBzbyB0cmltIHRoYXQgdG9v4oCmXG4vLyBodHRwczovL2dpdGh1Yi5jb20vcGV0a2FhbnRvbm92L2JsdWViaXJkL2Jsb2IvYjdmMjEzOTk4MTZkMDJmOTc5ZmU0MzQ1ODUzMzRjZTkwMWRjYWY0NC9zcmMvZGVidWdnYWJpbGl0eS5qcyNMNTY4LUw1NzFcblxuXG52YXIgZml4Qmx1ZWJpcmRTdGFja3RyYWNlID0gZnVuY3Rpb24gKGVycm9yKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoZnJhbWUpIHtcbiAgICBpZiAoZnJhbWUuZmlsZSA9PT0gZXJyb3IudG9TdHJpbmcoKSkgcmV0dXJuO1xuXG4gICAgaWYgKGZyYW1lLm1ldGhvZCkge1xuICAgICAgZnJhbWUubWV0aG9kID0gZnJhbWUubWV0aG9kLnJlcGxhY2UoL15cXHMrLywgJycpO1xuICAgIH1cbiAgfTtcbn07XG5cbnZhciBfJG5vdGlmaWVyXzIgPSB7fTtcbnZhciBuYW1lID0gJ0J1Z3NuYWcgSmF2YVNjcmlwdCc7XG52YXIgdmVyc2lvbiA9ICc3LjkuMic7XG52YXIgdXJsID0gJ2h0dHBzOi8vZ2l0aHViLmNvbS9idWdzbmFnL2J1Z3NuYWctanMnO1xuXG4vKiByZW1vdmVkOiB2YXIgXyRDbGllbnRfNCA9IHJlcXVpcmUoJ0BidWdzbmFnL2NvcmUvY2xpZW50Jyk7ICovO1xuXG4vKiByZW1vdmVkOiB2YXIgXyRFdmVudF82ID0gcmVxdWlyZSgnQGJ1Z3NuYWcvY29yZS9ldmVudCcpOyAqLztcblxuLyogcmVtb3ZlZDogdmFyIF8kU2Vzc2lvbl8zNCA9IHJlcXVpcmUoJ0BidWdzbmFnL2NvcmUvc2Vzc2lvbicpOyAqLztcblxuLyogcmVtb3ZlZDogdmFyIF8kQnJlYWRjcnVtYl8zID0gcmVxdWlyZSgnQGJ1Z3NuYWcvY29yZS9icmVhZGNydW1iJyk7ICovO1xuXG4vKiByZW1vdmVkOiB2YXIgXyRtYXBfMTYgPSByZXF1aXJlKCdAYnVnc25hZy9jb3JlL2xpYi9lcy11dGlscy9tYXAnKTsgKi87XG5cbi8qIHJlbW92ZWQ6IHZhciBfJGtleXNfMTUgPSByZXF1aXJlKCdAYnVnc25hZy9jb3JlL2xpYi9lcy11dGlscy9rZXlzJyk7ICovO1xuXG4vKiByZW1vdmVkOiB2YXIgXyRhc3NpZ25fMTEgPSByZXF1aXJlKCdAYnVnc25hZy9jb3JlL2xpYi9lcy11dGlscy9hc3NpZ24nKTsgKi87IC8vIGV4dGVuZCB0aGUgYmFzZSBjb25maWcgc2NoZW1hIHdpdGggc29tZSBicm93c2VyLXNwZWNpZmljIG9wdGlvbnNcblxuXG52YXIgX19zY2hlbWFfMiA9IF8kYXNzaWduXzExKHt9LCBfJGNvbmZpZ181LnNjaGVtYSwgXyRjb25maWdfMSk7XG5cbi8qIHJlbW92ZWQ6IHZhciBfJG9uZXJyb3JfNTMgPSByZXF1aXJlKCdAYnVnc25hZy9wbHVnaW4td2luZG93LW9uZXJyb3InKTsgKi87XG5cbi8qIHJlbW92ZWQ6IHZhciBfJHVuaGFuZGxlZFJlamVjdGlvbl81NCA9IHJlcXVpcmUoJ0BidWdzbmFnL3BsdWdpbi13aW5kb3ctdW5oYW5kbGVkLXJlamVjdGlvbicpOyAqLztcblxuLyogcmVtb3ZlZDogdmFyIF8kYXBwXzM3ID0gcmVxdWlyZSgnQGJ1Z3NuYWcvcGx1Z2luLWFwcC1kdXJhdGlvbicpOyAqLztcblxuLyogcmVtb3ZlZDogdmFyIF8kZGV2aWNlXzM5ID0gcmVxdWlyZSgnQGJ1Z3NuYWcvcGx1Z2luLWJyb3dzZXItZGV2aWNlJyk7ICovO1xuXG4vKiByZW1vdmVkOiB2YXIgXyRjb250ZXh0XzM4ID0gcmVxdWlyZSgnQGJ1Z3NuYWcvcGx1Z2luLWJyb3dzZXItY29udGV4dCcpOyAqLztcblxuLyogcmVtb3ZlZDogdmFyIF8kcmVxdWVzdF80MyA9IHJlcXVpcmUoJ0BidWdzbmFnL3BsdWdpbi1icm93c2VyLXJlcXVlc3QnKTsgKi87XG5cbi8qIHJlbW92ZWQ6IHZhciBfJHRocm90dGxlXzUxID0gcmVxdWlyZSgnQGJ1Z3NuYWcvcGx1Z2luLXNpbXBsZS10aHJvdHRsZScpOyAqLztcblxuLyogcmVtb3ZlZDogdmFyIF8kY29uc29sZUJyZWFkY3J1bWJzXzQ2ID0gcmVxdWlyZSgnQGJ1Z3NuYWcvcGx1Z2luLWNvbnNvbGUtYnJlYWRjcnVtYnMnKTsgKi87XG5cbi8qIHJlbW92ZWQ6IHZhciBfJG5ldHdvcmtCcmVhZGNydW1ic181MCA9IHJlcXVpcmUoJ0BidWdzbmFnL3BsdWdpbi1uZXR3b3JrLWJyZWFkY3J1bWJzJyk7ICovO1xuXG4vKiByZW1vdmVkOiB2YXIgXyRuYXZpZ2F0aW9uQnJlYWRjcnVtYnNfNDkgPSByZXF1aXJlKCdAYnVnc25hZy9wbHVnaW4tbmF2aWdhdGlvbi1icmVhZGNydW1icycpOyAqLztcblxuLyogcmVtb3ZlZDogdmFyIF8kaW50ZXJhY3Rpb25CcmVhZGNydW1ic180OCA9IHJlcXVpcmUoJ0BidWdzbmFnL3BsdWdpbi1pbnRlcmFjdGlvbi1icmVhZGNydW1icycpOyAqLztcblxuLyogcmVtb3ZlZDogdmFyIF8kaW5saW5lU2NyaXB0Q29udGVudF80NyA9IHJlcXVpcmUoJ0BidWdzbmFnL3BsdWdpbi1pbmxpbmUtc2NyaXB0LWNvbnRlbnQnKTsgKi87XG5cbi8qIHJlbW92ZWQ6IHZhciBfJHNlc3Npb25fNDQgPSByZXF1aXJlKCdAYnVnc25hZy9wbHVnaW4tYnJvd3Nlci1zZXNzaW9uJyk7ICovO1xuXG4vKiByZW1vdmVkOiB2YXIgXyRjbGllbnRJcF80NSA9IHJlcXVpcmUoJ0BidWdzbmFnL3BsdWdpbi1jbGllbnQtaXAnKTsgKi87XG5cbi8qIHJlbW92ZWQ6IHZhciBfJHN0cmlwUXVlcnlTdHJpbmdfNTIgPSByZXF1aXJlKCdAYnVnc25hZy9wbHVnaW4tc3RyaXAtcXVlcnktc3RyaW5nJyk7ICovOyAvLyBkZWxpdmVyeSBtZWNoYW5pc21zXG5cblxuLyogcmVtb3ZlZDogdmFyIF8kZGVsaXZlcnlfMzUgPSByZXF1aXJlKCdAYnVnc25hZy9kZWxpdmVyeS14LWRvbWFpbi1yZXF1ZXN0Jyk7ICovO1xuXG4vKiByZW1vdmVkOiB2YXIgXyRkZWxpdmVyeV8zNiA9IHJlcXVpcmUoJ0BidWdzbmFnL2RlbGl2ZXJ5LXhtbC1odHRwLXJlcXVlc3QnKTsgKi87XG5cbnZhciBCdWdzbmFnID0ge1xuICBfY2xpZW50OiBudWxsLFxuICBjcmVhdGVDbGllbnQ6IGZ1bmN0aW9uIChvcHRzKSB7XG4gICAgLy8gaGFuZGxlIHZlcnkgc2ltcGxlIHVzZSBjYXNlIHdoZXJlIHVzZXIgc3VwcGxpZXMganVzdCB0aGUgYXBpIGtleSBhcyBhIHN0cmluZ1xuICAgIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ3N0cmluZycpIG9wdHMgPSB7XG4gICAgICBhcGlLZXk6IG9wdHNcbiAgICB9O1xuICAgIGlmICghb3B0cykgb3B0cyA9IHt9O1xuICAgIHZhciBpbnRlcm5hbFBsdWdpbnMgPSBbLy8gYWRkIGJyb3dzZXItc3BlY2lmaWMgcGx1Z2luc1xuICAgIF8kYXBwXzM3LCBfJGRldmljZV8zOSgpLCBfJGNvbnRleHRfMzgoKSwgXyRyZXF1ZXN0XzQzKCksIF8kdGhyb3R0bGVfNTEsIF8kc2Vzc2lvbl80NCwgXyRjbGllbnRJcF80NSwgXyRzdHJpcFF1ZXJ5U3RyaW5nXzUyLCBfJG9uZXJyb3JfNTMoKSwgXyR1bmhhbmRsZWRSZWplY3Rpb25fNTQoKSwgXyRuYXZpZ2F0aW9uQnJlYWRjcnVtYnNfNDkoKSwgXyRpbnRlcmFjdGlvbkJyZWFkY3J1bWJzXzQ4KCksIF8kbmV0d29ya0JyZWFkY3J1bWJzXzUwKCksIF8kY29uc29sZUJyZWFkY3J1bWJzXzQ2LCAvLyB0aGlzIG9uZSBhZGRlZCBsYXN0IHRvIGF2b2lkIHdyYXBwaW5nIGZ1bmN0aW9uYWxpdHkgYmVmb3JlIGJ1Z3NuYWcgdXNlcyBpdFxuICAgIF8kaW5saW5lU2NyaXB0Q29udGVudF80NygpXTsgLy8gY29uZmlndXJlIGEgY2xpZW50IHdpdGggdXNlciBzdXBwbGllZCBvcHRpb25zXG5cbiAgICB2YXIgYnVnc25hZyA9IG5ldyBfJENsaWVudF80KG9wdHMsIF9fc2NoZW1hXzIsIGludGVybmFsUGx1Z2lucywge1xuICAgICAgbmFtZTogbmFtZSxcbiAgICAgIHZlcnNpb246IHZlcnNpb24sXG4gICAgICB1cmw6IHVybFxuICAgIH0pOyAvLyBzZXQgZGVsaXZlcnkgYmFzZWQgb24gYnJvd3NlciBjYXBhYmlsaXR5IChJRSA4KzkgaGF2ZSBhbiBYRG9tYWluUmVxdWVzdCBvYmplY3QpXG5cbiAgICBidWdzbmFnLl9zZXREZWxpdmVyeSh3aW5kb3cuWERvbWFpblJlcXVlc3QgPyBfJGRlbGl2ZXJ5XzM1IDogXyRkZWxpdmVyeV8zNik7XG5cbiAgICBidWdzbmFnLl9sb2dnZXIuZGVidWcoJ0xvYWRlZCEnKTtcblxuICAgIHJldHVybiBidWdzbmFnLl9jb25maWcuYXV0b1RyYWNrU2Vzc2lvbnMgPyBidWdzbmFnLnN0YXJ0U2Vzc2lvbigpIDogYnVnc25hZztcbiAgfSxcbiAgc3RhcnQ6IGZ1bmN0aW9uIChvcHRzKSB7XG4gICAgaWYgKEJ1Z3NuYWcuX2NsaWVudCkge1xuICAgICAgQnVnc25hZy5fY2xpZW50Ll9sb2dnZXIud2FybignQnVnc25hZy5zdGFydCgpIHdhcyBjYWxsZWQgbW9yZSB0aGFuIG9uY2UuIElnbm9yaW5nLicpO1xuXG4gICAgICByZXR1cm4gQnVnc25hZy5fY2xpZW50O1xuICAgIH1cblxuICAgIEJ1Z3NuYWcuX2NsaWVudCA9IEJ1Z3NuYWcuY3JlYXRlQ2xpZW50KG9wdHMpO1xuICAgIHJldHVybiBCdWdzbmFnLl9jbGllbnQ7XG4gIH1cbn07XG5fJG1hcF8xNihbJ3Jlc2V0RXZlbnRDb3VudCddLmNvbmNhdChfJGtleXNfMTUoXyRDbGllbnRfNC5wcm90b3R5cGUpKSwgZnVuY3Rpb24gKG0pIHtcbiAgaWYgKC9eXy8udGVzdChtKSkgcmV0dXJuO1xuXG4gIEJ1Z3NuYWdbbV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFCdWdzbmFnLl9jbGllbnQpIHJldHVybiBjb25zb2xlLmxvZyhcIkJ1Z3NuYWcuXCIgKyBtICsgXCIoKSB3YXMgY2FsbGVkIGJlZm9yZSBCdWdzbmFnLnN0YXJ0KClcIik7XG4gICAgQnVnc25hZy5fY2xpZW50Ll9kZXB0aCArPSAxO1xuXG4gICAgdmFyIHJldCA9IEJ1Z3NuYWcuX2NsaWVudFttXS5hcHBseShCdWdzbmFnLl9jbGllbnQsIGFyZ3VtZW50cyk7XG5cbiAgICBCdWdzbmFnLl9jbGllbnQuX2RlcHRoIC09IDE7XG4gICAgcmV0dXJuIHJldDtcbiAgfTtcbn0pO1xuXyRub3RpZmllcl8yID0gQnVnc25hZztcbl8kbm90aWZpZXJfMi5DbGllbnQgPSBfJENsaWVudF80O1xuXyRub3RpZmllcl8yLkV2ZW50ID0gXyRFdmVudF82O1xuXyRub3RpZmllcl8yLlNlc3Npb24gPSBfJFNlc3Npb25fMzQ7XG5fJG5vdGlmaWVyXzIuQnJlYWRjcnVtYiA9IF8kQnJlYWRjcnVtYl8zOyAvLyBFeHBvcnQgYSBcImRlZmF1bHRcIiBwcm9wZXJ0eSBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEVTTSBpbXBvcnRzXG5cbl8kbm90aWZpZXJfMltcImRlZmF1bHRcIl0gPSBCdWdzbmFnO1xuXG5yZXR1cm4gXyRub3RpZmllcl8yO1xuXG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJ1Z3NuYWcuanMubWFwXG4iLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGxdLCJuYW1lcyI6WyJpcGNSZW5kZXJlciIsImludm9rZUZyb21SZW5kZXJlciIsImhhbmRsZUZyb21SZW5kZXJlciIsImNvbWJpbmVSZWR1Y2VycyIsImNvbXBvc2UiLCJhcHBseU1pZGRsZXdhcmUiLCJjcmVhdGVTdG9yZSIsImRlc2t0b3BDYXB0dXJlciIsImNvbnRleHRCcmlkZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLENBQUEsVUFBQSxDQUFBLEVBQUE7QUFBQSxFQUFBO0FBQUEsSUFBQSxpQkFBQSxDQUFBLEVBQUE7QUFBQTtBQUFBLENBQUEsRUFBQSxZQUFBOzRHQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUE7Ozs7Ozs7Ozs7Ozs7dUlBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29EQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBOzs7Ozs7Ozs7d0JBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBOzs7Ozs7Ozs7SUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MkNBQUE7Ozs7Q0FBQTs7O0FDR08sTUFBTSxZQUFZLEdBQUcsY0FBYyxDQUFDO0FBQ3BDLE1BQU0sZUFBZSxHQUFHLGlCQUFpQixDQUFDO0FBQzFDLE1BQU0sbUJBQW1CLEdBQUcscUJBQXFCOztBQ0tqRCxNQUFNLEtBQUssR0FBRyxDQUNuQixNQUFlLEtBRWYsT0FBTyxNQUFNLEtBQUssUUFBUTtJQUMxQixNQUFNLEtBQUssSUFBSTtJQUNmLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDdEIsTUFBTSxJQUFJLE1BQU07SUFDaEIsT0FBUSxNQUEyQixDQUFDLElBQUksS0FBSyxRQUFRLENBQUM7QUFFakQsTUFBTSxPQUFPLEdBQUcsQ0FDckIsTUFBYyxLQUVkLE1BQU0sSUFBSSxNQUFNO0lBQ2hCLE9BQVEsTUFBcUMsQ0FBQyxJQUFJLEtBQUssUUFBUTtJQUM5RCxNQUFxQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUM7QUFFaEQsTUFBTSxVQUFVLEdBQUcsQ0FDeEIsTUFBYyxLQUVkLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDZCxNQUFnRSxDQUFDLElBQUk7U0FDbkUsUUFBUSxLQUFLLElBQUksQ0FBQztBQUVoQixNQUFNLGVBQWUsR0FBRyxDQUc3QixNQUFjLEtBRWQsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUNkLE1BQWdELENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxPQUFPLENBQUM7QUFFcEUsTUFBTSxTQUFTLEdBQUcsQ0FDdkIsTUFBYyxLQUVkLE1BQU0sSUFBSSxNQUFNO0lBQ2YsTUFBc0MsQ0FBQyxLQUFLLEtBQUssSUFBSTtJQUNyRCxNQUF3QyxDQUFDLE9BQU8sWUFBWSxLQUFLLENBQUM7QUFFOUQsTUFBTSxVQUFVLEdBQUcsQ0FDeEIsTUFBYyxLQUdYLFNBQVMsSUFBSSxNQUFNLENBQUM7QUFFbEIsTUFBTSxZQUFZLEdBQ3ZCLENBSUUsRUFBVyxFQUNYLEdBQUcsS0FBWSxLQUVqQixDQUNFLE1BQWMsS0FRZCxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRTs7QUNuRXZFLE1BQU0sTUFBTSxHQUFHLENBQ3BCLE9BQVUsRUFDVixPQUE2RTtJQUU3RSxNQUFNLFFBQVEsR0FBRyxDQUNmLENBQW1CLEVBQ25CLEVBQVUsRUFDVixHQUFHLElBQVc7UUFFZCxJQUFJO1lBQ0YsTUFBTSxRQUFRLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBSSxJQUErQixDQUFDLENBQUM7WUFFcEVBLG9CQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUNwRDtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2RBLG9CQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxJQUFJLEVBQUUsRUFBRSxFQUFFO2dCQUNuQyxRQUFRLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJO29CQUNoQixPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87b0JBQ3RCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSztpQkFDbkI7YUFDRixDQUFDLENBQUM7U0FDSjtLQUNGLENBQUEsQ0FBQztJQUVGQSxvQkFBVyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFFbEMsT0FBTztRQUNMQSxvQkFBVyxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDL0MsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVLLE1BQU0sTUFBTSxHQUFHLENBQ3BCLE9BQVUsRUFDVixHQUFHLElBQTRCLEtBQ0tBLG9CQUFXLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQzs7QUNjbkUsTUFBTSxlQUFlLEdBQUcsTUFDN0JDLE1BQWtCLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUV6QyxNQUFNLGFBQWEsR0FBZSxDQUFDLEdBQWtCO0lBQzFEQyxNQUFrQixDQUFDLHlCQUF5QixFQUFFLENBQU8sTUFBTTtRQUN6RCxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3RCLENBQUEsQ0FBQyxDQUFDO0lBRUgsT0FBTyxDQUFDLElBQWMsS0FBSyxDQUFDLE1BQTJDO1FBQ3JFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzdDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3JCO1FBRURELE1BQWtCLENBQUMseUJBQXlCLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdEQsT0FBTyxNQUFNLENBQUM7S0FDZixDQUFDO0FBQ0osQ0FBQzs7QUM3RE0sTUFBTSxPQUFPLEdBQTBDLENBQzVELEtBQUssR0FBRyxJQUFJLEVBQ1osTUFBTTtJQUVOLFFBQVEsTUFBTSxDQUFDLElBQUk7UUFDakIsS0FBSyxZQUFZO1lBQ2YsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBRXhCO1lBQ0UsT0FBTyxLQUFLLENBQUM7S0FDaEI7QUFDSCxDQUFDOztBQ1hNLE1BQU0sVUFBVSxHQUE2QyxDQUNsRSxLQUFLLEdBQUcsSUFBSSxFQUNaLE1BQU07SUFFTixRQUFRLE1BQU0sQ0FBQyxJQUFJO1FBQ2pCLEtBQUssZUFBZTtZQUNsQixPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFFeEI7WUFDRSxPQUFPLEtBQUssQ0FBQztLQUNoQjtBQUNILENBQUM7O0FDaEJNLE1BQU0sZ0JBQWdCLEdBQUcsbUJBQW1CLENBQUM7QUFDN0MsTUFBTSxnQkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQztBQUM1QyxNQUFNLGlCQUFpQixHQUFHLG1CQUFtQixDQUFDO0FBQzlDLE1BQU0sZ0JBQWdCLEdBQUcsbUJBQW1COztBQ1k1QyxNQUFNLFNBQVMsR0FBRyxDQUN2QixRQUE4QyxFQUFFLEVBQ2hELE1BQXVCOztJQUV2QixRQUFRLE1BQU0sQ0FBQyxJQUFJO1FBQ2pCLEtBQUssbUJBQW1CO1lBQ3RCLE9BQU8sTUFBQSxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsbUNBQUksRUFBRSxDQUFDO1FBRXhDLEtBQUssZ0JBQWdCLEVBQUU7WUFDckIsSUFBRyxVQUFVLENBQUMsb0JBQW9CLENBQUMsRUFBQztnQkFDbEMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDeEM7WUFFRCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ2hDLHVDQUNLLEtBQUssS0FDUixDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsUUFBUSxJQUMzQjtTQUNIO1FBRUQsS0FBSyxnQkFBZ0IsRUFBRTtZQUNyQixNQUFNLFFBQVEscUJBQVEsS0FBSyxDQUFFLENBQUM7WUFDOUIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLG1DQUMxQixRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FDL0IsTUFBTSxDQUFDLE9BQU8sQ0FDbEIsQ0FBQztZQUNGLE9BQU8sUUFBUSxDQUFDO1NBQ2pCO1FBRUQsS0FBSyxnQkFBZ0IsRUFBRTtZQUNyQixNQUFNLFFBQVEscUJBQVEsS0FBSyxDQUFFLENBQUM7WUFDOUIsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2hDLE9BQU8sUUFBUSxDQUFDO1NBQ2pCO1FBRUQsS0FBSyxpQkFBaUI7WUFDcEIsT0FBTyxFQUFFLENBQUM7UUFFWjtZQUNFLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0FBQ0gsQ0FBQzs7QUN0RE0sTUFBTSxvQkFBb0IsR0FBRyxzQkFBc0IsQ0FBQztBQUNwRCxNQUFNLG1CQUFtQixHQUFHLHFCQUFxQixDQUFDO0FBQ2xELE1BQU0seUNBQXlDLEdBQ3BELDJDQUEyQyxDQUFDO0FBQ3ZDLE1BQU0sb0JBQW9CLEdBQUcsc0JBQXNCLENBQUM7QUFDcEQsTUFBTSxxREFBcUQsR0FDaEUsdURBQXVELENBQUM7QUFDbkQsTUFBTSwwQ0FBMEMsR0FDckQsNENBQTRDLENBQUM7QUFDeEMsTUFBTSxvQ0FBb0MsR0FDL0MsaURBQWlEOztBQ081QyxNQUFNLGtCQUFrQixHQUczQixDQUFDLEtBQUssR0FBRyxFQUFFLEVBQUUsTUFBTTtJQUNyQixRQUFRLE1BQU0sQ0FBQyxJQUFJO1FBQ2pCLEtBQUsseUNBQXlDO1lBQzVDLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUV4QixLQUFLLHFEQUFxRCxDQUFDO1FBQzNELEtBQUssMENBQTBDO1lBQzdDLE9BQU8sRUFBRSxDQUFDO1FBRVo7WUFDRSxPQUFPLEtBQUssQ0FBQztLQUNoQjtBQUNILENBQUMsQ0FBQztBQVFLLE1BQU0sbUJBQW1CLEdBRzVCLENBQUMsS0FBSyxHQUFHLEVBQUUsRUFBRSxNQUFNO0lBQ3JCLFFBQVEsTUFBTSxDQUFDLElBQUk7UUFDakIsS0FBSyxtQkFBbUIsQ0FBQztRQUN6QixLQUFLLG9CQUFvQjtZQUN2QixPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFFeEIsS0FBSyxvQkFBb0I7WUFDdkIsT0FBTyxFQUFFLENBQUM7UUFFWixLQUFLLG1CQUFtQixFQUFFO1lBQ3hCLE1BQU0sRUFBRSxtQkFBbUIsR0FBRyxLQUFLLEVBQUUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ3ZELE9BQU8sbUJBQW1CLENBQUM7U0FDNUI7UUFFRDtZQUNFLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0FBQ0gsQ0FBQyxDQUFDO0FBTUssTUFBTSxpQkFBaUIsR0FHMUIsQ0FBQyxLQUFLLEdBQUcsRUFBRSxFQUFFLE1BQU07SUFDckIsUUFBUSxNQUFNLENBQUMsSUFBSTtRQUNqQixLQUFLLG1CQUFtQixFQUFFO1lBQ3hCLE1BQU0sRUFBRSxpQkFBaUIsR0FBRyxFQUFFLEVBQUUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ2xELEtBQUssR0FBRyxpQkFBaUIsQ0FBQztZQUMxQixPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsS0FBSyxvQ0FBb0MsRUFBRTtZQUN6QyxLQUFLLG1DQUNBLEtBQUssS0FDUixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUNsRCxDQUFDO1lBQ0YsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVEO1lBQ0UsT0FBTyxLQUFLLENBQUM7S0FDaEI7QUFDSCxDQUFDOztBQzFGTSxNQUFNLHVCQUF1QixHQUFHLHlCQUF5QixDQUFDO0FBQzFELE1BQU0seUJBQXlCLEdBQUcsMkJBQTJCOztBQ0E3RCxNQUFNLHNCQUFzQixHQUFHLHdCQUF3QixDQUFDO0FBQ3hELE1BQU0sbUNBQW1DLEdBQzlDLHFDQUFxQyxDQUFDO0FBQ2pDLE1BQU0sNEJBQTRCLEdBQUcsOEJBQThCLENBQUM7QUFHcEUsTUFBTSxzQkFBc0IsR0FBRyx3QkFBd0IsQ0FBQztBQUN4RCxNQUFNLCtCQUErQixHQUMxQyxpQ0FBaUMsQ0FBQztBQUM3QixNQUFNLDhCQUE4QixHQUFHLGdDQUFnQyxDQUFDO0FBQ3hFLE1BQU0sMkNBQTJDLEdBQ3RELDZDQUE2QyxDQUFDO0FBQ3pDLE1BQU0sZ0VBQWdFLEdBQzNFLGtFQUFrRSxDQUFDO0FBQzlELE1BQU0sMkNBQTJDLEdBQ3RELDZDQUE2QyxDQUFDO0FBQ3pDLE1BQU0sNENBQTRDLEdBQ3ZELDhDQUE4QyxDQUFDO0FBQzFDLE1BQU0sd0JBQXdCLEdBQUcsMEJBQTBCLENBQUM7QUFDNUQsTUFBTSx5QkFBeUIsR0FBRywyQkFBMkIsQ0FBQztBQUM5RCxNQUFNLCtCQUErQixHQUMxQyxpQ0FBaUMsQ0FBQztBQUc3QixNQUFNLGlDQUFpQyxHQUM1QyxtQ0FBbUMsQ0FBQztBQUMvQixNQUFNLHNCQUFzQixHQUFHLHVCQUF1QixDQUFDO0FBQ3ZELE1BQU0sOEJBQThCLEdBQUcsZ0NBQWdDLENBQUM7QUFDeEUsTUFBTSx3QkFBd0IsR0FBRywwQkFBMEIsQ0FBQztBQUM1RCxNQUFNLHVCQUF1QixHQUFHLHlCQUF5QixDQUFDO0FBQzFELE1BQU0sK0JBQStCLEdBQzFDLGlDQUFpQyxDQUFDO0FBQzdCLE1BQU0sK0JBQStCLEdBQzFDLGlDQUFpQyxDQUFDO0FBQzdCLE1BQU0sdUJBQXVCLEdBQUcseUJBQXlCLENBQUM7QUFDMUQsTUFBTSxvQ0FBb0MsR0FDL0Msc0NBQXNDLENBQUM7QUFDbEMsTUFBTSx5Q0FBeUMsR0FDcEQsMkNBQTJDLENBQUM7QUFDdkMsTUFBTSxpQ0FBaUMsR0FDNUMsbUNBQW1DLENBQUM7QUFDL0IsTUFBTSxnQkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQztBQUM1QyxNQUFNLHFCQUFxQixHQUFHLHVCQUF1QixDQUFDO0FBQ3RELE1BQU0sb0JBQW9CLEdBQUcsc0JBQXNCLENBQUM7QUFDcEQsTUFBTSx5QkFBeUIsR0FBRywyQkFBMkIsQ0FBQztBQUM5RCxNQUFNLHVCQUF1QixHQUFHLHlCQUF5QixDQUFDO0FBQzFELE1BQU0sdUJBQXVCLEdBQUcseUJBQXlCLENBQUM7QUFDMUQsTUFBTSwyQkFBMkIsR0FBRyw2QkFBNkIsQ0FBQztBQUNsRSxNQUFNLDJCQUEyQixHQUFHLDZCQUE2QixDQUFDO0FBQ2xFLE1BQU0sdUNBQXVDLEdBQ2xELHlDQUF5QyxDQUFDO0FBQ3JDLE1BQU0sdUNBQXVDLEdBQ2xELHlDQUF5QyxDQUFDO0FBQ3JDLE1BQU0sNkJBQTZCLEdBQUcsK0JBQStCLENBQUM7QUFDdEUsTUFBTSxxQkFBcUIsR0FBRyx1QkFBdUIsQ0FBQztBQUN0RCxNQUFNLHNCQUFzQixHQUFHLHdCQUF3Qjs7QUN4RHZELE1BQU0sY0FBYyxHQUFHLGdCQUFnQjs7QUNtQjlDLE1BQU0sZUFBZSxHQUFHLENBQUMsU0FBd0I7SUFDL0MsSUFBSSxTQUFTLEVBQUU7UUFDYixPQUFPLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQztLQUNoQztJQUVELE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztBQUNwRCxDQUFDLENBQUM7QUFrQkYsTUFBTSxNQUFNLEdBQUcsQ0FBQyxLQUFlLEVBQUUsTUFBYztJQUM3QyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxHQUFHLEtBQUssTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRS9ELElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ2hCLE9BQU8sQ0FBQyxHQUFHLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztLQUMzQjtJQUVELE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQzFCLENBQUMsS0FBSyxLQUFLLG1DQUFRLE9BQU8sR0FBSyxNQUFNLElBQUssT0FBTyxDQUNsRCxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsTUFBTSxNQUFNLEdBQUcsQ0FBQyxLQUFlLEVBQUUsTUFBYztJQUM3QyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxHQUFHLEtBQUssTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRS9ELElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ2hCLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFFRCxPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUMxQixDQUFDLEtBQUssS0FBSyxtQ0FBUSxPQUFPLEdBQUssTUFBTSxJQUFLLE9BQU8sQ0FDbEQsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVLLE1BQU0sT0FBTyxHQUEwQyxDQUM1RCxLQUFLLEdBQUcsRUFBRSxFQUNWLE1BQU07SUFFTixRQUFRLE1BQU0sQ0FBQyxJQUFJO1FBQ2pCLEtBQUssNEJBQTRCLENBQUM7UUFDbEMsS0FBSyx1QkFBdUIsRUFBRTtZQUM1QixNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQzNCLE9BQU8sTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUMzQztRQUVELEtBQUssOEJBQThCLEVBQUU7WUFDbkMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUM1QixPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQztTQUNoRDtRQUVELEtBQUssdUJBQXVCLEVBQUU7WUFDNUIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUM1QixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQ2YsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQzlELENBQUM7U0FDSDtRQUVELEtBQUsscUJBQXFCLEVBQUU7WUFDMUIsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEdBQUcsR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUM1QyxPQUFPLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUN0QztRQUVELEtBQUssc0JBQXNCLEVBQUU7WUFDM0IsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ3RDLE9BQU8sTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQ3RDO1FBRUQsS0FBSyw2QkFBNkIsRUFBRTtZQUNsQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDdEMsT0FBTyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDdEM7UUFFRCxLQUFLLHVCQUF1QixFQUFFO1lBQzVCLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUN4QyxPQUFPLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztTQUN4QztRQUVELEtBQUssb0JBQW9CLEVBQUU7WUFDekIsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ3hDLElBQUksT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDMUIsT0FBTyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO2FBQ2xEO1lBRUQsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELEtBQUsseUJBQXlCLEVBQUU7WUFDOUIsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDL0IsT0FBTyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQzlDO1FBRUQsS0FBSyxxQkFBcUIsRUFBRTtZQUMxQixNQUFNLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDNUMsSUFBSSxXQUFXLEVBQUU7Z0JBQ2YsT0FBTyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2FBQzdDO1lBRUQsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELEtBQUssY0FBYyxFQUFFO1lBQ25CLE1BQU0sRUFBRSxPQUFPLEdBQUcsS0FBSyxFQUFFLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUMzQyxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLHNDQUNyQixNQUFNLEtBQ1QsR0FBRyxFQUFFLGVBQWUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQ2hDLENBQUMsQ0FBQztTQUNMO1FBRUQsS0FBSyxtQkFBbUIsRUFBRTtZQUN4QixNQUFNLEVBQUUsT0FBTyxHQUFHLEtBQUssRUFBRSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDM0MsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxzQ0FDckIsTUFBTSxLQUNULEdBQUcsRUFBRSxlQUFlLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUNoQyxDQUFDLENBQUM7U0FDTDtRQUVELEtBQUssZ0JBQWdCLEVBQUU7WUFDckIsTUFBTSxFQUFFLEdBQUcsRUFBRSxhQUFhLEVBQUUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQzlDLE9BQU8sTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO1NBQzlDO1FBRUQ7WUFDRSxPQUFPLEtBQUssQ0FBQztLQUNoQjtBQUNILENBQUM7O0FDMUhNLE1BQU0sV0FBVyxHQUFHLENBQ3pCLFFBQTBCLGdCQUFnQixFQUMxQyxNQUF5QjtJQUd6QixRQUFRLE1BQU0sQ0FBQyxJQUFJO1FBQ2pCLEtBQUssNEJBQTRCLENBQUM7UUFDbEMsS0FBSyx1QkFBdUIsQ0FBQztRQUM3QixLQUFLLHlCQUF5QixDQUFDO1FBQy9CLEtBQUssOEJBQThCLENBQUM7UUFDcEMsS0FBSywrQkFBK0IsQ0FBQztRQUNyQyxLQUFLLHdCQUF3QixFQUFFO1lBQzdCLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDM0IsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDO1NBQ2hCO1FBRUQsS0FBSyx1QkFBdUIsRUFBRTtZQUM1QixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUMvQixPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUM7U0FDaEI7UUFFRCxLQUFLLGNBQWMsRUFBRTtZQUNuQixNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUNwQyxPQUFPLFFBQVEsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQztTQUN4RDtRQUVELEtBQUssbUJBQW1CLEVBQUU7WUFDeEIsTUFBTSxFQUFFLFdBQVcsR0FBRyxLQUFLLEVBQUUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQy9DLE9BQU8sV0FBVyxDQUFDO1NBQ3BCO1FBRUQsS0FBSywrQkFBK0IsQ0FBQztRQUNyQyxLQUFLLCtCQUErQjtZQUNsQyxPQUFPLGdCQUFnQixDQUFDO1FBRTFCLEtBQUssOEJBQThCLEVBQUU7WUFDbkMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLEdBQUcsS0FBSyxNQUFNLENBQUMsT0FBTyxFQUFFO2dCQUM3RCxPQUFPLGdCQUFnQixDQUFDO2FBQ3pCO1lBRUQsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELEtBQUssaUNBQWlDO1lBRWxDLE9BQU8sV0FBVyxDQUFDO0tBQ3hCO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDOztBQ25GRCxvQkFBZSxDQUFDLEtBQVMsRUFBRSxNQUFVOztJQUVqQyxRQUFPLE1BQU0sQ0FBQyxJQUFJO1FBQ2QsS0FBSyxtQkFBbUI7WUFDcEIsT0FBTyxNQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxtQ0FBSSxFQUFFLENBQUM7UUFDOUMsS0FBSyxzQkFBc0IsRUFBRTtZQUN6QixPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUM7U0FDekI7S0FDSjtJQUVELE9BQU8sS0FBSyxJQUFJLEVBQUUsQ0FBQztBQUN2QixDQUFDOztBQ0pNLE1BQU0sZ0JBQWdCLEdBQTZDLENBQ3hFLEtBQUssR0FBRyxJQUFJLEVBQ1osTUFBTTtJQUVOLFFBQVEsTUFBTSxDQUFDLElBQUk7UUFDakIsS0FBSywyQ0FBMkMsRUFBRTtZQUNoRCxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUM7U0FDdkI7UUFFRCxLQUFLLG1CQUFtQixFQUFFO1lBQ3hCLE1BQU0sRUFBRSxnQkFBZ0IsR0FBRyxLQUFLLEVBQUUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ3BELE9BQU8sZ0JBQWdCLENBQUM7U0FDekI7UUFFRDtZQUNFLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0FBQ0gsQ0FBQzs7QUNYTSxNQUFNLG1CQUFtQixHQUM5QixDQUFDLEtBQUssR0FBRyxLQUFLLEVBQUUsTUFBTTtJQUNwQixRQUFRLE1BQU0sQ0FBQyxJQUFJO1FBQ2pCLEtBQUssMkJBQTJCO1lBQzlCLE9BQU8sSUFBSSxDQUFDO1FBRWQsS0FBSyx5QkFBeUIsQ0FBQztRQUMvQixLQUFLLDJCQUEyQixDQUFDO1FBQ2pDLEtBQUsscUJBQXFCO1lBQ3hCLE9BQU8sS0FBSyxDQUFDO1FBRWY7WUFDRSxPQUFPLEtBQUssQ0FBQztLQUNoQjtBQUNILENBQUM7O0FDbEJJLE1BQU0sa0NBQWtDLEdBRzNDLENBQUMsS0FBSyxHQUFHLEtBQUssRUFBRSxNQUFNO0lBQ3hCLFFBQVEsTUFBTSxDQUFDLElBQUk7UUFDakIsS0FBSyxnRUFBZ0U7WUFDbkUsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBRXhCLEtBQUssbUJBQW1CLEVBQUU7WUFDeEIsTUFBTSxFQUFFLGtDQUFrQyxHQUFHLEtBQUssRUFBRSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDdEUsT0FBTyxrQ0FBa0MsQ0FBQztTQUMzQztRQUVEO1lBQ0UsT0FBTyxLQUFLLENBQUM7S0FDaEI7QUFDSCxDQUFDOztBQ2xCTSxNQUFNLGdCQUFnQixHQUE2QyxDQUN4RSxLQUFLLEdBQUcsSUFBSSxFQUNaLE1BQU07SUFFTixRQUFRLE1BQU0sQ0FBQyxJQUFJO1FBQ2pCLEtBQUssMkNBQTJDO1lBQzlDLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUV4QixLQUFLLG1CQUFtQixFQUFFO1lBQ3hCLE1BQU0sRUFBRSxnQkFBZ0IsR0FBRyxLQUFLLEVBQUUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ3BELE9BQU8sZ0JBQWdCLENBQUM7U0FDekI7UUFFRDtZQUNFLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0FBQ0gsQ0FBQzs7QUNoQk0sTUFBTSxpQkFBaUIsR0FBOEMsQ0FDMUUsS0FBSyxHQUFHLE9BQU8sQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUNwQyxNQUFNO0lBRU4sUUFBUSxNQUFNLENBQUMsSUFBSTtRQUNqQixLQUFLLDRDQUE0QyxFQUFFO1lBQ2pELE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQztTQUN2QjtRQUVELEtBQUssbUJBQW1CLEVBQUU7WUFDeEIsTUFBTSxFQUFFLGlCQUFpQixHQUFHLEtBQUssRUFBRSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDckQsT0FBTyxpQkFBaUIsQ0FBQztTQUMxQjtRQUVEO1lBQ0UsT0FBTyxLQUFLLENBQUM7S0FDaEI7QUFDSCxDQUFDOztBQzNCTSxNQUFNLCtCQUErQixHQUMxQyxpQ0FBaUM7O0FDQzVCLE1BQU0sY0FBYyxHQUFHLGdCQUFnQixDQUFDO0FBR3hDLE1BQU0sMkJBQTJCLEdBQUcsNkJBQTZCLENBQUM7QUFDbEUsTUFBTSxvQkFBb0IsR0FBRyxzQkFBc0IsQ0FBQztBQUNwRCxNQUFNLDZCQUE2QixHQUFHLCtCQUErQixDQUFDO0FBQ3RFLE1BQU0saUNBQWlDLEdBQzVDLG1DQUFtQyxDQUFDO0FBQy9CLE1BQU0sYUFBYSxHQUFHLGVBQWU7O0FDMEJyQyxNQUFNLFVBQVUsR0FBNkMsQ0FDbEUsS0FBSyxHQUFHLElBQUksRUFDWixNQUFNO0lBRU4sUUFBUSxNQUFNLENBQUMsSUFBSTtRQUNqQixLQUFLLHNCQUFzQjtZQUN6QixPQUFPLE9BQU8sQ0FBQztRQUVqQixLQUFLLHVDQUF1QztZQUMxQyxPQUFPLGdCQUFnQixDQUFDO1FBRTFCLEtBQUssNkJBQTZCO1lBQ2hDLE9BQU8sUUFBUSxDQUFDO1FBRWxCLEtBQUsseUNBQXlDO1lBQzVDLE9BQU8sMkJBQTJCLENBQUM7UUFFckMsS0FBSyxzQkFBc0IsQ0FBQztRQUM1QixLQUFLLCtCQUErQixDQUFDO1FBQ3JDLEtBQUssdUNBQXVDLENBQUM7UUFDN0MsS0FBSyxxREFBcUQsQ0FBQztRQUMzRCxLQUFLLDBDQUEwQyxDQUFDO1FBQ2hELEtBQUssdUJBQXVCLENBQUM7UUFDN0IsS0FBSyxpQ0FBaUMsQ0FBQztRQUN2QyxLQUFLLHlDQUF5QyxDQUFDO1FBQy9DLEtBQUssb0NBQW9DO1lBQ3ZDLE9BQU8sSUFBSSxDQUFDO1FBRWQ7WUFDRSxPQUFPLEtBQUssQ0FBQztLQUNoQjtBQUNILENBQUM7O0FDM0RNLE1BQU0sY0FBYyxHQUd2QixDQUFDLEtBQUssR0FBRyxJQUFJLEVBQUUsTUFBTTtJQUN2QixRQUFRLE1BQU0sQ0FBQyxJQUFJO1FBQ2pCLEtBQUssd0JBQXdCLEVBQUU7WUFDN0IsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDO1NBQ3ZCO1FBRUQ7WUFDRSxPQUFPLEtBQUssQ0FBQztLQUNoQjtBQUNILENBQUM7O0FDVE0sTUFBTSxlQUFlLEdBQWdELENBQzFFLEtBQUssR0FBRztJQUNOLE9BQU8sRUFBRSxJQUFJO0lBQ2IsT0FBTyxFQUFFLElBQUk7SUFDYixTQUFTLEVBQUUsS0FBSztJQUNoQixTQUFTLEVBQUUsS0FBSztJQUNoQixVQUFVLEVBQUUsS0FBSztJQUNqQixNQUFNLEVBQUUsSUFBSTtJQUNaLE1BQU0sRUFBRTtRQUNOLENBQUMsRUFBRSxTQUFTO1FBQ1osQ0FBQyxFQUFFLFNBQVM7UUFDWixLQUFLLEVBQUUsSUFBSTtRQUNYLE1BQU0sRUFBRSxHQUFHO0tBQ1o7Q0FDRixFQUNELE1BQU07SUFFTixRQUFRLE1BQU0sQ0FBQyxJQUFJO1FBQ2pCLEtBQUsseUJBQXlCO1lBQzVCLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUV4QixLQUFLLG1CQUFtQixFQUFFO1lBQ3hCLE1BQU0sRUFBRSxlQUFlLEdBQUcsS0FBSyxFQUFFLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUNuRCxPQUFPLGVBQWUsQ0FBQztTQUN4QjtRQUVEO1lBQ0UsT0FBTyxLQUFLLENBQUM7S0FDaEI7QUFDSCxDQUFDOztBQ3JCTSxNQUFNLDBCQUEwQixHQUduQyxDQUFDLEtBQUssR0FBRyxJQUFJLEVBQUUsTUFBTTtJQUN2QixRQUFRLE1BQU0sQ0FBQyxJQUFJO1FBQ2pCLEtBQUssYUFBYSxFQUFFO1lBQ2xCLE1BQU0sRUFBRSwwQkFBMEIsRUFBRSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDdEQsT0FBTywwQkFBMEIsQ0FBQztTQUNuQztRQUVELEtBQUssbUNBQW1DLEVBQUU7WUFDeEMsTUFBTSwwQkFBMEIsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ2xELE9BQU8sMEJBQTBCLENBQUM7U0FDbkM7UUFFRCxLQUFLLG1CQUFtQixFQUFFO1lBQ3hCLE1BQU0sRUFBRSwwQkFBMEIsR0FBRyxLQUFLLEVBQUUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQzlELE9BQU8sMEJBQTBCLENBQUM7U0FDbkM7UUFFRDtZQUNFLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0FBQ0gsQ0FBQyxDQUFDO0FBUUssTUFBTSxvQkFBb0IsR0FHN0IsQ0FBQyxLQUFLLEdBQUcsS0FBSyxFQUFFLE1BQU07SUFDeEIsUUFBUSxNQUFNLENBQUMsSUFBSTtRQUNqQixLQUFLLDJCQUEyQjtZQUM5QixPQUFPLElBQUksQ0FBQztRQUVkLEtBQUssb0JBQW9CO1lBQ3ZCLE9BQU8sS0FBSyxDQUFDO1FBRWYsS0FBSyxpQ0FBaUM7WUFDcEMsT0FBTyxLQUFLLENBQUM7UUFFZixLQUFLLDZCQUE2QjtZQUNoQyxPQUFPLEtBQUssQ0FBQztRQUVmO1lBQ0UsT0FBTyxLQUFLLENBQUM7S0FDaEI7QUFDSCxDQUFDLENBQUM7QUFNSyxNQUFNLGdDQUFnQyxHQUd6QyxDQUFDLEtBQUssR0FBRyxJQUFJLEVBQUUsTUFBTTtJQUN2QixRQUFRLE1BQU0sQ0FBQyxJQUFJO1FBQ2pCLEtBQUssYUFBYSxFQUFFO1lBQ2xCLE1BQU0sRUFBRSxnQ0FBZ0MsRUFBRSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDNUQsT0FBTyxnQ0FBZ0MsQ0FBQztTQUN6QztRQUVELEtBQUssbUJBQW1CLEVBQUU7WUFDeEIsTUFBTSxFQUFFLGdDQUFnQyxHQUFHLEtBQUssRUFBRSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDcEUsT0FBTyxnQ0FBZ0MsQ0FBQztTQUN6QztRQUVEO1lBQ0UsT0FBTyxLQUFLLENBQUM7S0FDaEI7QUFDSCxDQUFDLENBQUM7QUFJSyxNQUFNLGlCQUFpQixHQUE4QyxDQUMxRSxLQUFLLEdBQUcsSUFBSSxFQUNaLE1BQU07SUFFTixRQUFRLE1BQU0sQ0FBQyxJQUFJO1FBQ2pCLEtBQUssYUFBYSxFQUFFO1lBQ2xCLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDN0MsT0FBTyxpQkFBaUIsQ0FBQztTQUMxQjtRQUVEO1lBQ0UsT0FBTyxLQUFLLENBQUM7S0FDaEI7QUFDSCxDQUFDLENBQUM7QUFNSyxNQUFNLGlCQUFpQixHQUE4QyxDQUMxRSxLQUFLLEdBQUcsSUFBSSxFQUNaLE1BQU07SUFFTixRQUFRLE1BQU0sQ0FBQyxJQUFJO1FBQ2pCLEtBQUssYUFBYSxFQUFFO1lBQ2xCLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDN0MsT0FBTyxpQkFBaUIsQ0FBQztTQUMxQjtRQUVELEtBQUssbUJBQW1CLEVBQUU7WUFDeEIsTUFBTSxFQUFFLGlCQUFpQixHQUFHLEtBQUssRUFBRSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDckQsT0FBTyxpQkFBaUIsQ0FBQztTQUMxQjtRQUVEO1lBQ0UsT0FBTyxLQUFLLENBQUM7S0FDaEI7QUFDSCxDQUFDLENBQUM7QUFNSyxNQUFNLGdCQUFnQixHQUMzQixDQUFDLEtBQUssR0FBRyxJQUFJLEVBQUUsTUFBTTtJQUNuQixRQUFRLE1BQU0sQ0FBQyxJQUFJO1FBQ2pCLEtBQUssNkJBQTZCO1lBQ2hDLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUV4QixLQUFLLGlDQUFpQztZQUNwQyxPQUFPLElBQUksQ0FBQztRQUVkO1lBQ0UsT0FBTyxLQUFLLENBQUM7S0FDaEI7QUFDSCxDQUFDLENBQUM7QUFPRyxNQUFNLG9CQUFvQixHQUc3QixDQUFDLEtBQUssR0FBRyxJQUFJLEVBQUUsTUFBTTtJQUN2QixRQUFRLE1BQU0sQ0FBQyxJQUFJO1FBQ2pCLEtBQUssYUFBYSxFQUFFO1lBQ2xCLE1BQU0sRUFBRSxvQkFBb0IsRUFBRSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDaEQsT0FBTyxvQkFBb0IsQ0FBQztTQUM3QjtRQUVELEtBQUssY0FBYyxFQUFFO1lBQ25CLE1BQU0sb0JBQW9CLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUM1QyxPQUFPLG9CQUFvQixDQUFDO1NBQzdCO1FBRUQsS0FBSyxtQkFBbUIsRUFBRTtZQUN4QixNQUFNLEVBQUUsb0JBQW9CLEdBQUcsS0FBSyxFQUFFLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUN4RCxPQUFPLG9CQUFvQixDQUFDO1NBQzdCO1FBRUQ7WUFDRSxPQUFPLEtBQUssQ0FBQztLQUNoQjtBQUNILENBQUMsQ0FBQztBQVFLLE1BQU0sV0FBVyxHQUE2QyxDQUNuRSxLQUFLLEdBQUcsSUFBSSxFQUNaLE1BQU07SUFFTixRQUFRLE1BQU0sQ0FBQyxJQUFJO1FBQ2pCLEtBQUssMkJBQTJCO1lBQzlCLE9BQU8sSUFBSSxDQUFDO1FBRWQsS0FBSyxvQkFBb0I7WUFDdkIsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBRXhCLEtBQUssaUNBQWlDO1lBQ3BDLE9BQU8sSUFBSSxDQUFDO1FBRWQsS0FBSyw2QkFBNkI7WUFDaEMsT0FBTyxJQUFJLENBQUM7UUFFZDtZQUNFLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0FBQ0gsQ0FBQzs7QUNuTE0sTUFBTSxXQUFXLEdBQUdFLHFCQUFlLENBQUM7SUFDekMsT0FBTztJQUNQLFVBQVU7SUFDVixrQkFBa0I7SUFDbEIsV0FBVztJQUNYLDBCQUEwQjtJQUMxQixTQUFTO0lBQ1QsYUFBYTtJQUNiLGlCQUFpQjtJQUNqQixvQkFBb0I7SUFDcEIsZ0NBQWdDO0lBQ2hDLGdCQUFnQjtJQUNoQixtQkFBbUI7SUFDbkIsa0NBQWtDO0lBQ2xDLGdCQUFnQjtJQUNoQixpQkFBaUI7SUFDakIsaUJBQWlCO0lBQ2pCLGlCQUFpQjtJQUNqQixnQkFBZ0I7SUFDaEIsVUFBVTtJQUNWLGNBQWM7SUFDZCxlQUFlO0lBQ2YsT0FBTztJQUNQLG9CQUFvQjtJQUNwQixtQkFBbUI7SUFDbkIsV0FBVztDQUNaLENBQUM7O0FDNUNGLElBQUksVUFBNEIsQ0FBQztBQUVqQyxJQUFJLFVBQXNCLENBQUM7QUFFM0IsTUFBTSxlQUFlLEdBQ25CLE1BQU0sQ0FBQyxJQUEwQixLQUFLLENBQUMsTUFBTTtJQUMzQyxVQUFVLEdBQUcsTUFBTSxDQUFDO0lBQ3BCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3RCLENBQUMsQ0FBQztBQVFHLE1BQU0sd0JBQXdCLEdBQUc7SUFDdEMsTUFBTSxZQUFZLEdBQUcsTUFBTSxlQUFlLEVBQUUsQ0FBQztJQUM3QyxNQUFNLGdCQUFnQixHQUNuQixNQUFjLENBQUMsb0NBQW9DLElBQUlDLGFBQU8sQ0FBQztJQUNsRSxNQUFNLFNBQVMsR0FBRyxnQkFBZ0IsQ0FDaENDLHFCQUFlLENBQUMsYUFBYSxFQUFFLGVBQWUsQ0FBQyxDQUNoRCxDQUFDO0lBRUYsVUFBVSxHQUFHQyxpQkFBVyxDQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFFL0QsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQyxDQUFBLENBQUM7QUFFSyxNQUFNLFFBQVEsR0FBRyxDQUE0QixNQUFjO0lBQ2hFLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDOUIsQ0FBQyxDQUFDO0FBSUssTUFBTSxNQUFNLEdBQUcsQ0FBSSxRQUFxQixLQUM3QyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7QUFFM0IsTUFBTSxLQUFLLEdBQUcsQ0FDbkIsUUFBcUIsRUFDckIsT0FBK0M7SUFFL0MsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFFNUIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDO0lBRW5CLE9BQU8sVUFBVSxDQUFDLFNBQVMsQ0FBQztRQUMxQixNQUFNLElBQUksR0FBTSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFakMsSUFBSSxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUN6QixPQUFPO1NBQ1I7UUFFRCxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXBCLElBQUksR0FBRyxJQUFJLENBQUM7S0FDYixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFSyxNQUFNLE1BQU0sR0FTZixDQUNGLGVBQXdFLEVBQ3hFLFFBQXNDO0lBRXRDLE1BQU0sa0JBQWtCLEdBQ3RCLE9BQU8sZUFBZSxLQUFLLFVBQVU7VUFDakMsZUFBZTtVQUNmLENBQUMsTUFBa0IsS0FDakIsTUFBTSxDQUFDLElBQUksS0FBSyxlQUFlLENBQUM7SUFFeEMsT0FBTyxVQUFVLENBQUMsU0FBUyxDQUFDO1FBQzFCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNuQyxPQUFPO1NBQ1I7UUFFRCxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDdEIsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBdURGO0FBQ0E7QUFDQTtBQUVPLE1BQU0sT0FBTyxHQUFHLENBVXJCLGFBQXNCLEVBQ3RCLEdBQUcsS0FBb0IsS0FFdkIsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTTtJQUMxQixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUUvQyxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQ3hCLFlBQVksQ0FBNEIsRUFBRSxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQ3JELENBQUMsTUFBTTtRQUNMLFdBQVcsRUFBRSxDQUFDO1FBRWQsSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDckIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2QixPQUFPO1NBQ1I7UUFFRCxJQUFJLFVBQVUsQ0FBYSxNQUFNLENBQUMsRUFBRTtZQUNsQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3pCO0tBQ0YsQ0FDRixDQUFDO0lBRUYsUUFBUSxpQ0FDSCxhQUFhLEtBQ2hCLElBQUksRUFBRTtZQUNKLE9BQU8sRUFBRSxJQUFJO1lBQ2IsRUFBRTtTQUNILElBQ0QsQ0FBQztBQUNMLENBQUMsQ0FBQzs7QUN0TUcsTUFBTSxTQUFTLEdBQUcsTUFDdkIsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPO0lBQ2xCLElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxVQUFVLEVBQUU7UUFDdEMsT0FBTyxFQUFFLENBQUM7UUFDVixPQUFPO0tBQ1I7SUFFRCxNQUFNLHNCQUFzQixHQUFHO1FBQzdCLElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxVQUFVLEVBQUU7WUFDdEMsT0FBTztTQUNSO1FBRUQsUUFBUSxDQUFDLG1CQUFtQixDQUFDLGtCQUFrQixFQUFFLHNCQUFzQixDQUFDLENBQUM7UUFDekUsT0FBTyxFQUFFLENBQUM7S0FDWCxDQUFDO0lBRUYsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLHNCQUFzQixDQUFDLENBQUM7QUFDeEUsQ0FBQyxDQUFDOztBQ2tDRyxNQUFNLDBCQUEwQixHQUFHLENBQ3hDLE9BQWdCO0lBRWhCLE1BQU0sU0FBUyxFQUFFLENBQUM7QUFZcEIsQ0FBQyxDQUFBOztBQ25ETSxNQUFNLGlCQUFpQixHQUF5QjtJQUMvQyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsYUFBYSxFQUFFLE9BQU87O1lBQ3pELElBQUk7Z0JBQ0YsTUFBTSxPQUFPLEdBQUcsQ0FDZCxNQUFNQyx3QkFBZSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFDekMsR0FBRyxDQUF3QixDQUFDLE1BQU0sTUFBTTtvQkFDeEMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFO29CQUNiLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtvQkFDakIsVUFBVSxFQUFFLE1BQU0sQ0FBQyxVQUFVO29CQUM3QixTQUFTLEVBQUU7d0JBQ1QsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUU7cUJBQy9CO29CQUNoQixPQUFPLEVBQUU7d0JBQ1AsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7cUJBQzdCO2lCQUNqQixDQUFDLENBQUMsQ0FBQztnQkFFSixRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDbkI7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDZCxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEI7U0FDRjtLQUFBO0NBQ0Y7O0FDckNNLElBQUksY0FBaUQsQ0FBQztBQUU3RCxJQUFJLFNBQWlCLENBQUM7QUFFZixNQUFNLFlBQVksR0FBRyxDQUFDLFVBQWtCO0lBQzdDLFNBQVMsR0FBRyxVQUFVLENBQUM7QUFDekIsQ0FBQyxDQUFDO0FBRUssTUFBTSxZQUFZLEdBQUcsTUFBYyxTQUFTLENBQUM7QUFFN0MsTUFBTSxjQUFjLEdBQUcsQ0FDNUIsZUFBa0Q7SUFFbEQsY0FBYyxHQUFHLGVBQWUsQ0FBQztBQUNuQyxDQUFDOztBQ1pNLE1BQU0sOEJBQThCLEdBQUcsZ0NBQWdDLENBQUM7QUFDeEUsTUFBTSw4QkFBOEIsR0FBRyxnQ0FBZ0MsQ0FBQztBQUN4RSxNQUFNLG1DQUFtQyxHQUM5QyxxQ0FBcUMsQ0FBQztBQUNqQyxNQUFNLGtDQUFrQyxHQUM3QyxvQ0FBb0MsQ0FBQztBQUNoQyxNQUFNLGlDQUFpQyxHQUM1QyxtQ0FBbUMsQ0FBQztBQUMvQixNQUFNLG9DQUFvQyxHQUMvQyxzQ0FBc0MsQ0FBQztBQUNsQyxNQUFNLGtDQUFrQyxHQUM3QyxvQ0FBb0MsQ0FBQztBQUNoQyxNQUFNLGdDQUFnQyxHQUMzQyxrQ0FBa0M7O0FDRHBDLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxPQUFlO0lBQ3ZDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUMxQixPQUFPLE9BQU8sQ0FBQztLQUNoQjtJQUVELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ2pDLE9BQU8sY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2hDO0lBRUQsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQyxDQUFDO0FBRUYsTUFBTSxhQUFhLEdBQUcsSUFBSSxHQUFHLEVBRzFCLENBQUM7QUFFRyxNQUFNLGtCQUFrQixHQUFHLENBQU8sRUFTeEM7UUFUd0MsRUFDdkMsS0FBSyxFQUNMLElBQUksRUFDSixPQUFPLE9BTVIsRUFMSSxPQUFPLG9CQUo2Qiw0QkFLeEMsQ0FEVztJQU1WLE1BQU0sRUFBRSxHQUFHLE1BQU0sT0FBTyxDQUN0QjtRQUNFLElBQUksRUFBRSw4QkFBOEI7UUFDcEMsT0FBTyxnQ0FDTCxLQUFLLEtBQ0QsSUFBSTtjQUNKO2dCQUNFLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUM7YUFDN0I7Y0FDRCxFQUFFLElBQ0gsT0FBTyxDQUNYO0tBQ0YsRUFDRCw4QkFBOEIsQ0FDL0IsQ0FBQztJQUVGLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxLQUMxQixPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQ3RELENBQUM7SUFFRixPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUMsQ0FBQSxDQUFDO0FBRUssTUFBTSxtQkFBbUIsR0FBRyxDQUFDLEVBQVc7SUFDN0MsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLG9DQUFvQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMxRSxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzNCLENBQUMsQ0FBQztBQUVLLE1BQU0sNkJBQTZCLEdBQUc7O0lBRTNDLE1BQU0sQ0FBQyxnQ0FBZ0MsRUFBRSxDQUFDLE1BQU07UUFDOUMsTUFBTSxFQUNKLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUNoQixHQUFHLE1BQU0sQ0FBQztRQUNYLE1BQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0MsWUFBWSxhQUFaLFlBQVksdUJBQVosWUFBWSxDQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7S0FDbEMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLGlDQUFpQyxFQUFFLENBQUMsTUFBTTtRQUMvQyxNQUFNLEVBQ0osT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQ2hCLEdBQUcsTUFBTSxDQUFDO1FBQ1gsTUFBTSxZQUFZLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQyxZQUFZLGFBQVosWUFBWSx1QkFBWixZQUFZLENBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUNsQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQzFCLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDLE1BQU07UUFDaEQsTUFBTSxFQUNKLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUNoQixHQUFHLE1BQU0sQ0FBQztRQUVYLFFBQVEsQ0FBQztZQUNQLElBQUksRUFBRSx1QkFBdUI7WUFDN0IsT0FBTyxFQUFFO2dCQUNQLEdBQUcsRUFBRSxZQUFZLEVBQUU7YUFDcEI7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0tBQ25DLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDLE1BQU07UUFDaEQsTUFBTSxFQUNKLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FDdkIsR0FBRyxNQUFNLENBQUM7UUFDWCxNQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ3RELENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxtQ0FBbUMsRUFBRSxDQUFDLE1BQU07UUFDakQsTUFBTSxFQUNKLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FDdkIsR0FBRyxNQUFNLENBQUM7UUFDWCxNQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ3ZELENBQUMsQ0FBQztBQUNMLENBQUM7O0FDakhELE1BQU0sc0JBQXNCLEdBQUc7SUFDN0IsSUFBSTtRQUNGLE1BQU0sUUFBUSxHQUFHLE1BQU0sT0FBTyxDQUM1QjtZQUNFLElBQUksRUFBRSx1Q0FBdUM7U0FDOUMsRUFDRCx1Q0FBdUMsQ0FDeEMsQ0FBQztRQUNGLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDM0M7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsUUFBUSxFQUFFLHVCQUF1QixFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDcEU7QUFDSCxDQUFDLENBQUEsQ0FBQztBQUVLLE1BQU0sNkJBQTZCLEdBQUc7SUFDM0MsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO0FBQ2xFLENBQUM7O0FDdEJNLE1BQU0scUJBQXFCLEdBQUcsdUJBQXVCLENBQUM7QUFDdEQsTUFBTSxpQkFBaUIsR0FBRyxtQkFBbUI7O0FDS3BELElBQUksZUFBMkIsQ0FBQztBQUVoQyxNQUFNLGVBQWUsR0FBRyxDQUFDLEVBQ3ZCLGlCQUFpQixFQUNqQixhQUFhLEVBQ2IsYUFBYSxHQUtkO0lBQ0MsTUFBTSxpQ0FBaUMsR0FBRyxNQUFNLENBQzlDLENBQUMsTUFBTSxLQUNMLENBQUMsaUJBQWlCLEVBQUUscUJBQXFCLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUNsRTtRQUNFLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUN0QixPQUFPO1NBQ1I7UUFFRCxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDdEIsQ0FDRixDQUFDO0lBRUYsSUFBSSxZQUEyQyxDQUFDO0lBQ2hELElBQUksU0FBMEIsQ0FBQztJQUMvQixNQUFNLG1CQUFtQixHQUFHO1FBQzFCLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN4QyxPQUFPO1NBQ1I7UUFFRCxZQUFZLEdBQUcsVUFBVSxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXJELE1BQU0sS0FBSyxHQUFHLE1BQU0sTUFBTSxDQUN4QixxQ0FBcUMsRUFDckMsYUFBYSxDQUNkLENBQUM7UUFFRixJQUFJLFNBQVMsS0FBSyxLQUFLLEVBQUU7WUFDdkIsT0FBTztTQUNSO1FBRUQsTUFBTSxRQUFRLEdBQUcsS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLEtBQUssU0FBUyxDQUFDO1FBQzNELGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV4QixTQUFTLEdBQUcsS0FBSyxDQUFDO0tBQ25CLENBQUEsQ0FBQztJQUVGLG1CQUFtQixFQUFFLENBQUM7SUFFdEIsT0FBTztRQUNMLGlDQUFpQyxFQUFFLENBQUM7UUFDcEMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQzVCLENBQUM7QUFDSixDQUFDLENBQUM7QUFFSyxNQUFNLHdCQUF3QixHQUFHLENBQUMsT0FJeEM7SUFDQyxlQUFlLGFBQWYsZUFBZSx1QkFBZixlQUFlLEVBQUksQ0FBQztJQUNwQixlQUFlLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdDLENBQUM7O0FDL0RNLE1BQU0sUUFBUSxHQUFHLENBQUMsS0FBc0I7SUFDN0MsUUFBUSxDQUFDO1FBQ1AsSUFBSSxFQUFFLHNCQUFzQjtRQUM1QixPQUFPLEVBQUU7WUFDUCxHQUFHLEVBQUUsWUFBWSxFQUFFO1lBQ25CLEtBQUs7U0FDTjtLQUNGLENBQUMsQ0FBQztBQUNMLENBQUM7O0FDVEQsTUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFDO0FBRXpCLElBQUksWUFBOEIsQ0FBQztBQUVuQyxNQUFNLGVBQWUsR0FBRztJQUN0QixJQUFJLENBQUMsWUFBWSxFQUFFO1FBQ2pCLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsTUFBTSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7UUFDNUIsTUFBTSxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUM7UUFFN0IsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVwQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1IsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1NBQ3ZEO1FBRUQsWUFBWSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7UUFFM0IsTUFBTSxvQkFBb0IsR0FBRztZQUMzQixHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQ2hELEdBQUcsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBRTlELFFBQVEsQ0FBQztnQkFDUCxJQUFJLEVBQUUsdUJBQXVCO2dCQUM3QixPQUFPLEVBQUU7b0JBQ1AsR0FBRyxFQUFFLFlBQVksRUFBRTtvQkFDbkIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQUU7aUJBQzVCO2FBQ0YsQ0FBQyxDQUFDO1NBQ0osQ0FBQztRQUVGLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsb0JBQW9CLEVBQUU7WUFDMUQsT0FBTyxFQUFFLElBQUk7U0FDZCxDQUFDLENBQUM7S0FDSjtJQUVELE9BQU8sWUFBWSxDQUFDO0FBQ3RCLENBQUMsQ0FBQztBQUVLLE1BQU0sVUFBVSxHQUFHLENBQUMsVUFBa0I7SUFDM0MsSUFBSSxPQUFPLFVBQVUsS0FBSyxRQUFRLEVBQUU7UUFDbEMsT0FBTztLQUNSO0lBRUQsTUFBTSxZQUFZLEdBQUcsZUFBZSxFQUFFLENBQUM7SUFDdkMsWUFBWSxDQUFDLEdBQUcsR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDaEQsQ0FBQzs7QUM3Q0QsSUFBSSxLQUFvQyxDQUFDO0FBQ3pDLElBQUksY0FBc0IsQ0FBQztBQUMzQixJQUFJLFNBQWlCLENBQUM7QUFFdEIsTUFBTSxnQkFBZ0IsR0FBRyxDQUN2QixnQkFBeUIsRUFDekIsSUFBc0M7SUFFdEMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXBCLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDdkMsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUN4RSxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUUxQixJQUFJLGNBQWMsS0FBSyxVQUFVLElBQUksU0FBUyxLQUFLLEtBQUssRUFBRTtRQUN4RCxJQUFJLENBQUM7WUFDSCxVQUFVO1lBQ1YsS0FBSztTQUNOLENBQUMsQ0FBQztRQUNILGNBQWMsR0FBRyxVQUFVLENBQUM7UUFDNUIsU0FBUyxHQUFHLEtBQUssQ0FBQztLQUNuQjtJQUVELEtBQUssR0FBRyxVQUFVLENBQUMsTUFBTSxnQkFBZ0IsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMzRSxDQUFDLENBQUM7QUFFRixJQUFJLE9BQW9CLENBQUM7QUFFekIsTUFBTSxVQUFVLEdBQUc7SUFDakIsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNaLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLDJCQUEyQixDQUFDO1FBQzVELE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLGdDQUFnQyxDQUFDO1FBQ3ZELE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztLQUNoQztJQUVELE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUMsQ0FBQztBQUVLLE1BQU0sYUFBYSxHQUFHLENBQUMsUUFBZ0I7SUFDNUMsTUFBTSxPQUFPLEdBQUcsVUFBVSxFQUFFLENBQUM7SUFFN0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsUUFBUTtVQUNwQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUc7VUFDbEQsTUFBTSxDQUFDO0lBRVgsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsWUFBWTtRQUNyQyxRQUFRLENBQUM7WUFDUCxJQUFJLEVBQUUsNkJBQTZCO1lBQ25DLE9BQU8sRUFBRTtnQkFDUCxHQUFHLEVBQUUsWUFBWSxFQUFFO2dCQUNuQixLQUFLLEVBQUUsWUFBWTthQUNwQjtTQUNGLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQztBQUNMLENBQUM7O0FDekRNLE1BQU0sUUFBUSxHQUFHLENBQUMsS0FBYTtJQUNwQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUM3QixPQUFPO0tBQ1I7SUFFRCxNQUFNLEdBQUcsR0FBRyxZQUFZLEVBQUUsQ0FBQztJQUUzQixJQUFJLEtBQUssS0FBSyxhQUFhLElBQUksSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLFlBQVksRUFBRTtRQUNqRSxRQUFRLENBQUM7WUFDUCxJQUFJLEVBQUUscUJBQXFCO1lBQzNCLE9BQU8sRUFBRTtnQkFDUCxHQUFHO2dCQUNILEtBQUssRUFBRSxHQUFHLEtBQUssTUFBTSxHQUFHLEVBQUU7YUFDM0I7U0FDRixDQUFDLENBQUM7UUFDSCxPQUFPO0tBQ1I7SUFFRCxRQUFRLENBQUM7UUFDUCxJQUFJLEVBQUUscUJBQXFCO1FBQzNCLE9BQU8sRUFBRTtZQUNQLEdBQUc7WUFDSCxLQUFLO1NBQ047S0FDRixDQUFDLENBQUM7QUFDTCxDQUFDOztBQ2JNLElBQUksVUFBc0IsQ0FBQztBQXdCM0IsTUFBTSxpQkFBaUIsR0FBeUI7SUFDckQsYUFBYSxFQUFFLENBQUMsV0FBVztRQUN6QixVQUFVLEdBQUcsV0FBVyxDQUFDO0tBQzFCO0lBQ0QsY0FBYztJQUNkLFFBQVE7SUFDUixVQUFVO0lBQ1YsYUFBYTtJQUNiLFFBQVE7SUFDUix3QkFBd0I7SUFDeEIsa0JBQWtCO0lBQ2xCLG1CQUFtQjtDQUNwQjs7QUM3Q0QsSUFBSSxzQkFBc0IsR0FBbUIsSUFBSSxDQUFDO0FBRWxELE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxLQUFpQjtJQUN6QyxJQUFJLEVBQUUsS0FBSyxDQUFDLE1BQU0sWUFBWSxPQUFPLENBQUMsRUFBRTtRQUN0QyxPQUFPO0tBQ1I7SUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7UUFDeEQsT0FBTztLQUNSO0lBRUQsc0JBQXNCLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUN0QyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsMkJBQTJCLEVBQUUsQ0FBQyxDQUFDO0FBQ2xELENBQUMsQ0FBQztBQUVGLE1BQU0sZUFBZSxHQUFHLENBQUMsS0FBaUI7SUFDeEMsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLFlBQVksT0FBTyxDQUFDLEVBQUU7UUFDdEMsT0FBTztLQUNSO0lBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1FBQ3hELE9BQU87S0FDUjtJQUVELHNCQUFzQixHQUFHLElBQUksQ0FBQztJQUM5QixRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsMkJBQTJCLEVBQUUsQ0FBQyxDQUFDO0FBQ2xELENBQUMsQ0FBQztBQUVLLE1BQU0sd0JBQXdCLEdBQUc7SUFDdEMsTUFBTSxDQUFDLCtCQUErQixFQUFFLENBQUMsTUFBTTtRQUM3QyxJQUFJLENBQUMsc0JBQXNCLEVBQUU7WUFDM0IsT0FBTztTQUNSO1FBRUQsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLENBQUM7UUFFckMsTUFBTSxRQUFRLEdBQUcsc0JBQXNCLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDbkUsTUFBTSxNQUFNLEdBQUcsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLGFBQWEsQ0FDcEMsYUFBYSxRQUFRLElBQUksQ0FDMUIsQ0FBQztRQUNGLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxLQUFLLEVBQUUsQ0FBQztLQUNqQixDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzNELENBQUM7O0FDakRELE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxFQUdwQixPQUFnQixPQUFPLElBQUksQ0FBQyxFQUFDLENBQUE7QUFFbEMsTUFBTSwwQkFBMEIsR0FBRztJQUN4QyxJQUFJLE9BQU8sQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUFFO1FBQ2pDLE9BQU87S0FDUjtJQUVELE1BQU0sS0FBSyxHQUNULFFBQVEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUM7UUFDMUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsQyxLQUFLLENBQUMsRUFBRSxHQUFHLGlCQUFpQixDQUFDO0lBQzdCLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTVCLEtBQUssQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLGdCQUFnQjtRQUM3QyxLQUFLLENBQUMsU0FBUyxHQUFHOzt1QkFFQyxnQkFBZ0IsR0FBRyxDQUFDLEdBQUcsTUFBTTs7O0tBRy9DLENBQUM7S0FDSCxDQUFDLENBQUM7QUFDTCxDQUFDOztBQ0ZELE1BQU0sS0FBSyxHQUFHO0lBRVosTUFBTSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxVQUFTLEVBQU07UUFDckRQLG9CQUFXLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDL0MsWUFBVyxDQUFDO0lBRWIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxVQUFTLEVBQU07UUFDbkRBLG9CQUFXLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDN0MsWUFBVyxDQUFDO0lBRWIsTUFBTSxTQUFTLEdBQUcsTUFBTSxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUV0RFEsc0JBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBRXhFLElBQUksQ0FBQyxTQUFTLEVBQUU7UUFDZCxPQUFPO0tBQ1I7SUFFREEsc0JBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBRXhFLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUV4QixNQUFNLHdCQUF3QixFQUFFLENBQUM7SUFFakMsTUFBTSxTQUFTLEVBQUUsQ0FBQztJQUVsQiwwQkFBMEIsQ0FBaUIsQ0FBQyxDQUFDO0lBRTdDLE1BQU0sTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDbEMsNkJBQTZCLEVBQUUsQ0FBQztJQUNoQyxJQUFJLENBQUMsVUFBVSxFQUFFO1FBQ2YsT0FBTztLQUNSOztJQUdELDZCQUE2QixFQUFFLENBQUM7SUFDaEMsd0JBQXdCLEVBQUUsQ0FBQztJQUMzQiwwQkFBMEIsRUFBRSxDQUFDO0FBRS9CLENBQUMsQ0FBQSxDQUFDO0FBRUYsS0FBSyxFQUFFOzsifQ==
