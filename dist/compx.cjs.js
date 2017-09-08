'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));

var babelHelpers = {};




var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
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

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

babelHelpers;

function Connect(options) {
  return function (ComponentToWrap) {
    var _class, _temp, _class2, _temp2;

    var ExtentedComponent = (_temp = _class = function (_ComponentToWrap) {
      inherits(Extends, _ComponentToWrap);

      function Extends() {
        classCallCheck(this, Extends);
        return possibleConstructorReturn(this, (Extends.__proto__ || Object.getPrototypeOf(Extends)).apply(this, arguments));
      }

      createClass(Extends, [{
        key: 'getDisplayName',
        value: function getDisplayName() {
          var defaultName = ComponentToWrap.displayName || ComponentToWrap.name;
          var displayName = options && options.name ? options.name : defaultName || defaultName;
          return displayName;
        }
      }, {
        key: 'setState',
        value: function setState() {
          var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

          get(Extends.prototype.__proto__ || Object.getPrototypeOf(Extends.prototype), 'setState', this).call(this, state, cb);
          this.props.CompX.internal.setState(this.getDisplayName(), state);
        }
      }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
          if (get(Extends.prototype.__proto__ || Object.getPrototypeOf(Extends.prototype), 'componentWillMount', this)) {
            get(Extends.prototype.__proto__ || Object.getPrototypeOf(Extends.prototype), 'componentWillMount', this).call(this);
          }
          this.props.CompX.internal.registerComponent(this.getDisplayName(), this.state);
        }
      }]);
      return Extends;
    }(ComponentToWrap), _class.propTypes = {
      CompX: PropTypes.shape({
        internal: PropTypes.shape({
          setState: PropTypes.func.isRequired
        }).isRequired
      }).isRequired
    }, _temp);

    return _temp2 = _class2 = function (_Component) {
      inherits(ConnectedToGlobalState, _Component);

      function ConnectedToGlobalState() {
        classCallCheck(this, ConnectedToGlobalState);
        return possibleConstructorReturn(this, (ConnectedToGlobalState.__proto__ || Object.getPrototypeOf(ConnectedToGlobalState)).apply(this, arguments));
      }

      createClass(ConnectedToGlobalState, [{
        key: 'sendStateChange',
        value: function sendStateChange(name, state) {
          this.context.updateComponentState(name, state);
        }
      }, {
        key: 'reciveStateChanges',
        value: function reciveStateChanges(stateObject) {
          var newState = _extends({}, this.state, stateObject);
          this.setState(newState);
        }
      }, {
        key: 'registerComponent',
        value: function registerComponent(name, state) {
          var _this3 = this;

          var subscription = null;
          if (options && options.subscribeTo && options.subscribeTo.length) {
            subscription = {
              subscribeTo: options.subscribeTo,
              callback: function callback(stateObject) {
                return _this3.reciveStateChanges(stateObject);
              }
            };
          }
          this.context.registerComponent(name, state, subscription);
        }
      }, {
        key: 'render',
        value: function render() {
          var _this4 = this;

          var params = _extends({}, this.state, {
            internal: {
              setState: function setState(name, state) {
                return _this4.sendStateChange(name, state);
              },
              registerComponent: function registerComponent(name, state) {
                return _this4.registerComponent(name, state);
              }
            }
          });
          return React__default.createElement(ExtentedComponent, _extends({}, this.props, { CompX: params }));
        }
      }]);
      return ConnectedToGlobalState;
    }(React.Component), _class2.contextTypes = {
      globalState: PropTypes.object.isRequired,
      registerComponent: PropTypes.func.isRequired,
      updateComponentState: PropTypes.func.isRequired
    }, _temp2;
  };
}

var Provider = function (_Component) {
  inherits(Provider, _Component);

  function Provider(props) {
    classCallCheck(this, Provider);

    var _this = possibleConstructorReturn(this, (Provider.__proto__ || Object.getPrototypeOf(Provider)).call(this, props));

    _this.state = {};
    _this.subscriptions = [];
    return _this;
  }

  createClass(Provider, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _this2 = this;

      return {
        globalState: this.state,
        registerComponent: function registerComponent(name, state, subscription) {
          return _this2.registerComponent(name, state, subscription);
        },
        updateComponentState: function updateComponentState(name, state) {
          return _this2.updateComponentState(name, state);
        }
      };
    }
  }, {
    key: 'registerComponent',
    value: function registerComponent(name, state, subscription) {
      var newState = this.state;
      newState[name] = state;
      this.setState.apply(this, toConsumableArray(this.state).concat([newState]));
      if (subscription) {
        this.subscriptions.push(subscription);
      }
      if (subscription && subscription.subscribeTo) {
        this.emitFullStateForSubscription(subscription);
      }
      this.emitPartialState(name, state);
    }
  }, {
    key: 'updateComponentState',
    value: function updateComponentState(name, state) {
      var newState = this.state;
      newState[name] = state;
      this.setState(newState);
      this.emitPartialState(name, state);
    }
  }, {
    key: 'emitFullStateForSubscription',
    value: function emitFullStateForSubscription(subscription) {
      var _this3 = this;

      if (subscription.subscribeTo.length) {
        var fullState = {};
        subscription.subscribeTo.forEach(function (key) {
          if (_this3.state[key]) {
            fullState[key] = _this3.state[key];
          }
        });
        if (fullState !== {}) {
          subscription.callback(fullState);
        }
      }
    }
  }, {
    key: 'emitPartialState',
    value: function emitPartialState(name, state) {
      this.subscriptions.forEach(function (item) {
        if (item.subscribeTo.includes(name)) {
          var partial = {};
          partial[name] = state;
          item.callback(partial);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.Children.only(this.props.children);
    }
  }]);
  return Provider;
}(React.Component);

Provider.childContextTypes = {
  globalState: PropTypes.object.isRequired,
  registerComponent: PropTypes.func.isRequired,
  updateComponentState: PropTypes.func.isRequired
};

exports.Provider = Provider;
exports.Connect = Connect;
