/*! msui v2.7.2 | by MSUI | (c) 2017  |  | 2017-12-08T13:13:26+0800 */ 
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["MSUI"] = factory(require("jquery"));
	else
		root["MSUI"] = factory(root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1);
	var UI = __webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(12);
	__webpack_require__(13);
	__webpack_require__(14);
	__webpack_require__(16);
	__webpack_require__(17);
	__webpack_require__(18);
	__webpack_require__(19);
	__webpack_require__(21);
	__webpack_require__(20);
	__webpack_require__(22);
	__webpack_require__(23);
	__webpack_require__(24);
	__webpack_require__(15);

	module.exports = $.MSUI = UI;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1);

	if (typeof $ === 'undefined') {
	  throw new Error('MSUI requires jQuery :-(');
	}

	var UI = $.MSUI || {};
	var $win = $(window);
	var doc = window.document;
	var $html = $('html');
	UI.namespace={
	  ui:"msui",
	  class:"ms-"
	}

	UI.VERSION = '2.7.2';

	UI.support = {};

	UI.support.transition = (function() {
	  var transitionEnd = (function() {
	    // https://developer.mozilla.org/en-US/docs/Web/Events/transitionend#Browser_compatibility
	    var element = doc.body || doc.documentElement;
	    var transEndEventNames = {
	      WebkitTransition: 'webkitTransitionEnd',
	      MozTransition: 'transitionend',
	      OTransition: 'oTransitionEnd otransitionend',
	      transition: 'transitionend'
	    };

	    for (var name in transEndEventNames) {
	      if (element.style[name] !== undefined) {
	        return transEndEventNames[name];
	      }
	    }
	  })();

	  return transitionEnd && {end: transitionEnd};
	})();

	UI.support.animation = (function() {
	  var animationEnd = (function() {
	    var element = doc.body || doc.documentElement;
	    var animEndEventNames = {
	      WebkitAnimation: 'webkitAnimationEnd',
	      MozAnimation: 'animationend',
	      OAnimation: 'oAnimationEnd oanimationend',
	      animation: 'animationend'
	    };

	    for (var name in animEndEventNames) {
	      if (element.style[name] !== undefined) {
	        return animEndEventNames[name];
	      }
	    }
	  })();

	  return animationEnd && {end: animationEnd};
	})();

	/* eslint-disable dot-notation */
	UI.support.touch = (
	('ontouchstart' in window &&
	navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
	(window.DocumentTouch && document instanceof window.DocumentTouch) ||
	(window.navigator['msPointerEnabled'] &&
	window.navigator['msMaxTouchPoints'] > 0) || // IE 10
	(window.navigator['pointerEnabled'] &&
	window.navigator['maxTouchPoints'] > 0) || // IE >=11
	false);
	/* eslint-enable dot-notation */

	// https://developer.mozilla.org/zh-CN/docs/DOM/MutationObserver
	UI.support.mutationobserver = (window.MutationObserver ||
	window.WebKitMutationObserver || null);

	// https://github.com/Modernizr/Modernizr/blob/924c7611c170ef2dc502582e5079507aff61e388/feature-detects/forms/validation.js#L20
	UI.support.formValidation = (typeof document.createElement('form').
	  checkValidity === 'function');

	UI.utils = {};

	/**
	 * Debounce function
	 *
	 * @param {function} func  Function to be debounced
	 * @param {number} wait Function execution threshold in milliseconds
	 * @param {bool} immediate  Whether the function should be called at
	 *                          the beginning of the delay instead of the
	 *                          end. Default is false.
	 * @description Executes a function when it stops being invoked for n seconds
	 * @see  _.debounce() http://underscorejs.org
	 */
	UI.utils.debounce = function(func, wait, immediate) {
	  var timeout;
	  return function() {
	    var context = this;
	    var args = arguments;
	    var later = function() {
	      timeout = null;
	      if (!immediate) {
	        func.apply(context, args);
	      }
	    };
	    var callNow = immediate && !timeout;

	    clearTimeout(timeout);
	    timeout = setTimeout(later, wait);

	    if (callNow) {
	      func.apply(context, args);
	    }
	  };
	};

	UI.utils.isInView = function(element, options) {
	  var $element = $(element);
	  var visible = !!($element.width() || $element.height()) &&
	    $element.css('display') !== 'none';

	  if (!visible) {
	    return false;
	  }

	  var windowLeft = $win.scrollLeft();
	  var windowTop = $win.scrollTop();
	  var offset = $element.offset();
	  var left = offset.left;
	  var top = offset.top;

	  options = $.extend({topOffset: 0, leftOffset: 0}, options);

	  return (top + $element.height() >= windowTop &&
	  top - options.topOffset <= windowTop + $win.height() &&
	  left + $element.width() >= windowLeft &&
	  left - options.leftOffset <= windowLeft + $win.width());
	};

	UI.utils.parseOptions = UI.utils.options = function(string) {
	  if ($.isPlainObject(string)) {
	    return string;
	  }

	  var start = (string ? string.indexOf('{') : -1);
	  var options = {};

	  if (start != -1) {
	    try {
	      options = (new Function('',
	        'var json = ' + string.substr(start) +
	        '; return JSON.parse(JSON.stringify(json));'))();
	    } catch (e) {
	    }
	  }

	  return options;
	};

	UI.utils.generateGUID = function(namespace) {
	  var uid = namespace + '-' || 'ms-';

	  do {
	    uid += Math.random().toString(36).substring(2, 7);
	  } while (document.getElementById(uid));

	  return uid;
	};

	// @see https://davidwalsh.name/get-absolute-url
	UI.utils.getAbsoluteUrl = (function() {
	  var a;

	  return function(url) {
	    if (!a) {
	      a = document.createElement('a');
	    }

	    a.href = url;

	    return a.href;
	  };
	})();

	/**
	 * Plugin MSUI Component to jQuery
	 *
	 * @param {String} name - plugin name
	 * @param {Function} Component - plugin constructor
	 * @param {Object} [pluginOption]
	 * @param {String} pluginOption.dataOptions
	 * @param {Function} pluginOption.methodCall - custom method call
	 * @param {Function} pluginOption.before
	 * @param {Function} pluginOption.after
	 * @since v2.4.1
	 */
	UI.plugin = function UIPlugin(name, Component, pluginOption) {
	  var old = $.fn[name];
	  pluginOption = pluginOption || {};

	  $.fn[name] = function(option) {
	    var allArgs = Array.prototype.slice.call(arguments, 0);
	    var args = allArgs.slice(1);
	    var propReturn;
	    var $set = this.each(function() {
	      var $this = $(this);
	      var dataName = 'msui.' + name;
	      var dataOptionsName = pluginOption.dataOptions || ('data-ms-' + name);
	      var instance = $this.data(dataName);
	      var options = $.extend({},
	        UI.utils.parseOptions($this.attr(dataOptionsName)),
	        typeof option === 'object' && option);

	      if (!instance && option === 'destroy') {
	        return;
	      }

	      if (!instance) {
	        $this.data(dataName, (instance = new Component(this, options)));
	      }

	      // custom method call
	      if (pluginOption.methodCall) {
	        pluginOption.methodCall.call($this, allArgs, instance);
	      } else {
	        // before method call
	        pluginOption.before &&
	        pluginOption.before.call($this, allArgs, instance);

	        if (typeof option === 'string') {
	          propReturn = typeof instance[option] === 'function' ?
	            instance[option].apply(instance, args) : instance[option];
	        }

	        // after method call
	        pluginOption.after && pluginOption.after.call($this, allArgs, instance);
	      }
	    });

	    return (propReturn === undefined) ? $set : propReturn;
	  };

	  $.fn[name].Constructor = Component;

	  // no conflict
	  $.fn[name].noConflict = function() {
	    $.fn[name] = old;
	    return this;
	  };

	  UI[name] = Component;
	};

	// http://blog.alexmaccaw.com/css-transitions
	$.fn.emulateTransitionEnd = function(duration) {
	  var called = false;
	  var $el = this;

	  $(this).one(UI.support.transition.end, function() {
	    called = true;
	  });

	  var callback = function() {
	    if (!called) {
	      $($el).trigger(UI.support.transition.end);
	    }
	    $el.transitionEndTimmer = undefined;
	  };
	  this.transitionEndTimmer = setTimeout(callback, duration);
	  return this;
	};

	$.fn.redraw = function() {
	  return this.each(function() {
	    /* eslint-disable */
	    var redraw = this.offsetHeight;
	    /* eslint-enable */
	  });
	};

	$.fn.transitionEnd = function(callback) {
	  var endEvent = UI.support.transition.end;
	  var dom = this;

	  function fireCallBack(e) {
	    callback.call(this, e);
	    endEvent && dom.off(endEvent, fireCallBack);
	  }

	  if (callback && endEvent) {
	    dom.on(endEvent, fireCallBack);
	  }

	  return this;
	};

	$.fn.removeClassRegEx = function() {
	  return this.each(function(regex) {
	    var classes = $(this).attr('class');

	    if (!classes || !regex) {
	      return false;
	    }

	    var classArray = [];
	    classes = classes.split(' ');

	    for (var i = 0, len = classes.length; i < len; i++) {
	      if (!classes[i].match(regex)) {
	        classArray.push(classes[i]);
	      }
	    }

	    $(this).attr('class', classArray.join(' '));
	  });
	};

	//
	$.fn.alterClass = function(removals, additions) {
	  var self = this;

	  if (removals.indexOf('*') === -1) {
	    // Use native jQuery methods if there is no wildcard matching
	    self.removeClass(removals);
	    return !additions ? self : self.addClass(additions);
	  }

	  var classPattern = new RegExp('\\s' +
	  removals.
	    replace(/\*/g, '[A-Za-z0-9-_]+').
	    split(' ').
	    join('\\s|\\s') +
	  '\\s', 'g');

	  self.each(function(i, it) {
	    var cn = ' ' + it.className + ' ';
	    while (classPattern.test(cn)) {
	      cn = cn.replace(classPattern, ' ');
	    }
	    it.className = $.trim(cn);
	  });

	  return !additions ? self : self.addClass(additions);
	};

	// handle multiple browsers for requestAnimationFrame()
	// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
	// https://github.com/gnarf/jquery-requestAnimationFrame
	UI.utils.rAF = (function() {
	  return window.requestAnimationFrame ||
	    window.webkitRequestAnimationFrame ||
	    window.mozRequestAnimationFrame ||
	    window.oRequestAnimationFrame ||
	      // if all else fails, use setTimeout
	    function(callback) {
	      return window.setTimeout(callback, 1000 / 60); // shoot for 60 fps
	    };
	})();

	// handle multiple browsers for cancelAnimationFrame()
	UI.utils.cancelAF = (function() {
	  return window.cancelAnimationFrame ||
	    window.webkitCancelAnimationFrame ||
	    window.mozCancelAnimationFrame ||
	    window.oCancelAnimationFrame ||
	    function(id) {
	      window.clearTimeout(id);
	    };
	})();

	// via http://davidwalsh.name/detect-scrollbar-width
	UI.utils.measureScrollbar = function() {
	  if (document.body.clientWidth >= window.innerWidth) {
	    return 0;
	  }

	  // if ($html.width() >= window.innerWidth) return;
	  // var scrollbarWidth = window.innerWidth - $html.width();
	  var $measure = $('<div ' +
	  'style="width: 100px;height: 100px;overflow: scroll;' +
	  'position: absolute;top: -9999px;"></div>');

	  $(document.body).append($measure);

	  var scrollbarWidth = $measure[0].offsetWidth - $measure[0].clientWidth;

	  $measure.remove();

	  return scrollbarWidth;
	};

	UI.utils.imageLoader = function($image, callback) {
	  function loaded() {
	    callback($image[0]);
	  }

	  function bindLoad() {
	    this.one('load', loaded);
	    if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
	      var src = this.attr('src');
	      var param = src.match(/\?/) ? '&' : '?';

	      param += 'random=' + (new Date()).getTime();
	      this.attr('src', src + param);
	    }
	  }

	  if (!$image.attr('src')) {
	    loaded();
	    return;
	  }

	  if ($image[0].complete || $image[0].readyState === 4) {
	    loaded();
	  } else {
	    bindLoad.call($image);
	  }
	};

	/**
	 * @see https://github.com/cho45/micro-template.js
	 * (c) cho45 http://cho45.github.com/mit-license
	 */
	UI.template = function(id, data) {
	  var me = UI.template;

	  if (!me.cache[id]) {
	    me.cache[id] = (function() {
	      var name = id;
	      var string = /^[\w\-]+$/.test(id) ?
	        me.get(id) : (name = 'template(string)', id); // no warnings

	      var line = 1;
	      /* eslint-disable max-len, quotes */
	      var body = ('try { ' + (me.variable ?
	      'var ' + me.variable + ' = this.stash;' : 'with (this.stash) { ') +
	      "this.ret += '" +
	      string.
	        replace(/<%/g, '\x11').replace(/%>/g, '\x13'). // if you want other tag, just edit this line
	        replace(/'(?![^\x11\x13]+?\x13)/g, '\\x27').
	        replace(/^\s*|\s*$/g, '').
	        replace(/\n/g, function() {
	          return "';\nthis.line = " + (++line) + "; this.ret += '\\n";
	        }).
	        replace(/\x11-(.+?)\x13/g, "' + ($1) + '").
	        replace(/\x11=(.+?)\x13/g, "' + this.escapeHTML($1) + '").
	        replace(/\x11(.+?)\x13/g, "'; $1; this.ret += '") +
	      "'; " + (me.variable ? "" : "}") + "return this.ret;" +
	      "} catch (e) { throw 'TemplateError: ' + e + ' (on " + name +
	      "' + ' line ' + this.line + ')'; } " +
	      "//@ sourceURL=" + name + "\n" // source map
	      ).replace(/this\.ret \+= '';/g, '');
	      /* eslint-enable max-len, quotes */
	      var func = new Function(body);
	      var map = {
	        '&': '&amp;',
	        '<': '&lt;',
	        '>': '&gt;',
	        '\x22': '&#x22;',
	        '\x27': '&#x27;'
	      };
	      var escapeHTML = function(string) {
	        return ('' + string).replace(/[&<>\'\"]/g, function(_) {
	          return map[_];
	        });
	      };

	      return function(stash) {
	        return func.call(me.context = {
	          escapeHTML: escapeHTML,
	          line: 1,
	          ret: '',
	          stash: stash
	        });
	      };
	    })();
	  }

	  return data ? me.cache[id](data) : me.cache[id];
	};

	UI.template.cache = {};

	UI.template.get = function(id) {
	  if (id) {
	    var element = document.getElementById(id);
	    return element && element.innerHTML || '';
	  }
	};

	// Dom mutation watchers
	UI.DOMWatchers = [];
	UI.DOMReady = false;
	UI.ready = function(callback) {
	  UI.DOMWatchers.push(callback);
	  if (UI.DOMReady) {
	    // console.log('Ready call');
	    callback(document);
	  }
	};

	UI.DOMObserve = function(elements, options, callback) {
	  var Observer = UI.support.mutationobserver;
	  if (!Observer) {
	    return;
	  }

	  options = $.isPlainObject(options) ?
	    options : {childList: true, subtree: true};

	  callback = typeof callback === 'function' && callback || function() {
	  };

	  $(elements).each(function() {
	    var element = this;
	    var $element = $(element);

	    if ($element.data('ms.observer')) {
	      return;
	    }

	    try {
	      var observer = new Observer(UI.utils.debounce(
	        function(mutations, instance) {
	          callback.call(element, mutations, instance);
	          // trigger this event manually if MutationObserver not supported
	          $element.trigger('changed.dom.msui');
	        }, 50));

	      observer.observe(element, options);

	      $element.data('ms.observer', observer);
	    } catch (e) {
	    }
	  });
	};

	$.fn.DOMObserve = function(options, callback) {
	  return this.each(function() {
	    /* eslint-disable new-cap */
	    UI.DOMObserve(this, options, callback);
	    /* eslint-enable new-cap */
	  });
	};

	if (UI.support.touch) {
	  $html.addClass('ms-touch');
	}

	$(document).on('changed.dom.msui', function(e) {
	  var element = e.target;

	  // TODO: just call changed element's watcher
	  //       every watcher callback should have a key
	  //       use like this: <div data-ms-observe='key1, key2'>
	  //       get keys via $(element).data('amObserve')
	  //       call functions store with these keys
	  $.each(UI.DOMWatchers, function(i, watcher) {
	    watcher(element);
	  });
	});

	$(function() {
	  var $body = $(document.body);

	  UI.DOMReady = true;

	  // Run default init
	  $.each(UI.DOMWatchers, function(i, watcher) {
	    watcher(document);
	  });

	  // watches DOM
	  /* eslint-disable new-cap */
	  UI.DOMObserve('[data-ms-observe]');
	  /* eslint-enable */

	  $html.removeClass('no-js').addClass('js');

	  UI.support.animation && $html.addClass('cssanimations');

	  // iOS standalone mode
	  if (window.navigator.standalone) {
	    $html.addClass('ms-standalone');
	  }

	  $('.ms-topbar-fixed-top').length &&
	  $body.addClass('ms-with-topbar-fixed-top');

	  $('.ms-topbar-fixed-bottom').length &&
	  $body.addClass('ms-with-topbar-fixed-bottom');

	  // Remove responsive classes in .ms-layout
	  var $layout = $('.ms-layout');
	  $layout.find('[class*="md-block-grid"]').alterClass('md-block-grid-*');
	  $layout.find('[class*="lg-block-grid"]').alterClass('lg-block-grid');

	  // widgets not in .ms-layout
	  $('[data-ms-widget]').each(function() {
	    var $widget = $(this);
	    // console.log($widget.parents('.ms-layout').length)
	    if ($widget.parents('.ms-layout').length === 0) {
	      $widget.addClass('ms-no-layout');
	    }
	  });
	});

	module.exports = UI;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1);
	var UI = __webpack_require__(2);
	var class_fade = UI.namespace.class + "fade";
	var class_in = UI.namespace.class + "in";
	var class_close = UI.namespace.class + "close";
	var event_alert = "click.alert." + UI.namespace.ui;
	var event_closed = "closed.alert." + UI.namespace.ui;
	var data_api = "click.alert." + UI.namespace.ui + ".data-api";
	var data_selector = '[data-' + UI.namespace.class + 'alert]';

	// Alert Class
	// NOTE: removeElement option is unavailable now
	var Alert = function (element, options) {
	    var _this = this;


	    this.options = $.extend({}, Alert.DEFAULTS, options);
	    this.$element = $(element);
	    var tc = class_fade + ' ' + class_in;
	    this.$element
	        .addClass(tc)
	        .on(event_alert, '.' + class_close, function () {
	            _this.close();
	        });
	};

	Alert.DEFAULTS = {
	    removeElement: true
	};


	Alert.prototype.close = function () {
	    var $element = this.$element;

	    $element.trigger(event_alert).removeClass(class_in);

	    function processAlert() {
	        $element.trigger(event_closed).remove();
	    }

	    UI.support.transition && $element.hasClass(class_fade) ?
	        $element
	            .one(UI.support.transition.end, processAlert)
	            .emulateTransitionEnd(200) :
	        processAlert();
	};

	// plugin
	UI.plugin('alert', Alert);

	// Init code
	$(document).on(data_api, data_selector, function (e) {
	    var $target = $(e.target);
	    $target.is('.' + class_close) && $(this).alert('close');
	});

	module.exports = Alert;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1);
	var UI = __webpack_require__(2);
	var ui = UI.namespace.ui;
	var ns = UI.namespace.class;
	/**
	 * @via https://github.com/twbs/bootstrap/blob/master/js/button.js
	 * @copyright (c) 2011-2014 Twitter, Inc
	 * @license The MIT License
	 */

	var Button = function (element, options) {
	  this.$element = $(element);
	  this.options = $.extend({}, Button.DEFAULTS, options);
	  this.isLoading = false;
	  this.hasSpinner = false;
	};

	Button.DEFAULTS = {
	  loadingText: 'loading...',
	  disabledClassName: ns + 'disabled',
	  activeClassName: ns + 'active',
	  spinner: undefined
	};

	Button.prototype.setState = function (state, stateText) {
	  var $element = this.$element;
	  var disabled = 'disabled';
	  var data = $element.data();
	  var options = this.options;
	  var val = $element.is('input') ? 'val' : 'html';
	  var stateClassName = ns + 'btn-' + state + ' ' + options.disabledClassName;

	  state += 'Text';

	  if (!options.resetText) {
	    options.resetText = $element[val]();
	  }

	  // add spinner for element with html()
	  if (UI.support.animation && options.spinner &&
	    val === 'html' && !this.hasSpinner) {
	    options.loadingText = '<span class="' + ns + 'icon-' + options.spinner +
	      ' ' + ns + 'icon-spin"></span>' + options.loadingText;

	    this.hasSpinner = true;
	  }

	  stateText = stateText ||
	    (data[state] === undefined ? options[state] : data[state]);

	  $element[val](stateText);

	  // push to event loop to allow forms to submit
	  setTimeout($.proxy(function () {
	    // TODO: add stateClass for other states
	    if (state === 'loadingText') {
	      $element.addClass(stateClassName).attr(disabled, disabled);
	      this.isLoading = true;
	    } else if (this.isLoading) {
	      $element.removeClass(stateClassName).removeAttr(disabled);
	      this.isLoading = false;
	    }
	  }, this), 0);
	};

	Button.prototype.toggle = function () {
	  var changed = true;
	  var $element = this.$element;
	  var $parent = this.$element.parent('[class*="' + ns + 'btn-group"]');
	  var activeClassName = Button.DEFAULTS.activeClassName;

	  if ($parent.length) {
	    var $input = this.$element.find('input');

	    if ($input.prop('type') == 'radio') {
	      if ($input.prop('checked') && $element.hasClass(activeClassName)) {
	        changed = false;
	      } else {
	        $parent.find('.' + activeClassName).removeClass(activeClassName);
	      }
	    }

	    if (changed) {
	      $input.prop('checked',
	        !$element.hasClass(activeClassName)).trigger('change');
	    }
	  }

	  if (changed) {
	    $element.toggleClass(activeClassName);
	    if (!$element.hasClass(activeClassName)) {
	      $element.blur();
	    }
	  }
	};

	UI.plugin('button', Button, {
	  dataOptions: 'data-' + ns + 'loading',
	  methodCall: function (args, instance) {
	    if (args[0] === 'toggle') {
	      instance.toggle();
	    } else if (typeof args[0] === 'string') {
	      instance.setState.apply(instance, args);
	    }
	  }
	});

	// Init code
	$(document).on('click.button.' + ui + '.data-api', '[data-' + ns + 'button]', function (e) {
	  e.preventDefault();
	  var $btn = $(e.target);

	  if (!$btn.hasClass(ns + 'btn')) {
	    $btn = $btn.closest('.' + ns + 'btn');
	  }

	  $btn.button('toggle');
	});

	UI.ready(function (context) {
	  $('[data-' + ns + 'loading]', context).button();

	  // resolves #866
	  $('[data-' + ns + 'button]', context).find('input:checked').each(function () {
	    $(this).parent('label').addClass(Button.DEFAULTS.activeClassName);
	  });
	});

	module.exports = UI.button = Button;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1);
	var UI = __webpack_require__(2);
	var $doc = $(document);

	/**
	 * bootstrap-datepicker.js
	 * @via http://www.eyecon.ro/bootstrap-datepicker
	 * @license http://www.apache.org/licenses/LICENSE-2.0
	 */
	var Datepicker = function(element, options) {
	  this.$element = $(element);
	  this.options = $.extend({}, Datepicker.DEFAULTS, options);
	  this.format = DPGlobal.parseFormat(this.options.format);

	  this.$element.data('date', this.options.date);
	  this.language = this.getLocale(this.options.locale);
	  this.theme = this.options.theme;
	  this.$picker = $(DPGlobal.template).appendTo('body').on({
	    click: $.proxy(this.click, this)
	    // mousedown: $.proxy(this.mousedown, this)
	  });

	  this.isInput = this.$element.is('input');
	  this.component = this.$element.is('.ms-datepicker-date') ?
	    this.$element.find('.ms-datepicker-add-on') : false;

	  if (this.isInput) {
	    this.$element.on({
	      'click.datepicker.msui': $.proxy(this.open, this),
	      // blur: $.proxy(this.close, this),
	      'keyup.datepicker.msui': $.proxy(this.update, this)
	    });
	  } else {
	    if (this.component) {
	      this.component.on('click.datepicker.msui', $.proxy(this.open, this));
	    } else {
	      this.$element.on('click.datepicker.msui', $.proxy(this.open, this));
	    }
	  }

	  this.minViewMode = this.options.minViewMode;

	  if (typeof this.minViewMode === 'string') {
	    switch (this.minViewMode) {
	      case 'months':
	        this.minViewMode = 1;
	        break;
	      case 'years':
	        this.minViewMode = 2;
	        break;
	      default:
	        this.minViewMode = 0;
	        break;
	    }
	  }

	  this.viewMode = this.options.viewMode;

	  if (typeof this.viewMode === 'string') {
	    switch (this.viewMode) {
	      case 'months':
	        this.viewMode = 1;
	        break;
	      case 'years':
	        this.viewMode = 2;
	        break;
	      default:
	        this.viewMode = 0;
	        break;
	    }
	  }

	  this.startViewMode = this.viewMode;
	  this.weekStart = ((this.options.weekStart ||
	  Datepicker.locales[this.language].weekStart || 0) % 7);
	  this.weekEnd = ((this.weekStart + 6) % 7);
	  this.onRender = this.options.onRender;

	  this.setTheme();
	  this.fillDow();
	  this.fillMonths();
	  this.update();
	  this.showMode();
	};

	Datepicker.DEFAULTS = {
	  locale: 'zh_CN',
	  format: 'yyyy-mm-dd',
	  weekStart: undefined,
	  viewMode: 0,
	  minViewMode: 0,
	  date: '',
	  theme: '',
	  autoClose: 1,
	  onRender: function(date) {
	    return '';
	  }
	};

	Datepicker.prototype.open = function(e) {
	  this.$picker.show();
	  this.height = this.component ?
	    this.component.outerHeight() : this.$element.outerHeight();

	  this.place();
	  $(window).on('resize.datepicker.msui', $.proxy(this.place, this));
	  if (e) {
	    e.stopPropagation();
	    e.preventDefault();
	  }
	  var that = this;
	  $doc.on('mousedown.datapicker.msui touchstart.datepicker.msui', function(ev) {
	    if ($(ev.target).closest('.ms-datepicker').length === 0) {
	      that.close();
	    }
	  });
	  this.$element.trigger({
	    type: 'open.datepicker.msui',
	    date: this.date
	  });
	};

	Datepicker.prototype.close = function() {
	  this.$picker.hide();
	  $(window).off('resize.datepicker.msui', this.place);
	  this.viewMode = this.startViewMode;
	  this.showMode();
	  if (!this.isInput) {
	    $(document).off('mousedown.datapicker.msui touchstart.datepicker.msui',
	      this.close);
	  }
	  // this.set();
	  this.$element.trigger({
	    type: 'close.datepicker.msui',
	    date: this.date
	  });
	};

	Datepicker.prototype.set = function() {
	  var formatted = DPGlobal.formatDate(this.date, this.format);
	  var $input;

	  if (!this.isInput) {
	    if (this.component) {
	      $input = this.$element.find('input').attr('value', formatted);
	    }

	    this.$element.data('date', formatted);
	  } else {
	    $input = this.$element.attr('value', formatted);
	  }

	  // fixes https://github.com/msazeui/msazeui/issues/711
	  $input && $input.trigger('change');
	};

	Datepicker.prototype.setValue = function(newDate) {
	  if (typeof newDate === 'string') {
	    this.date = DPGlobal.parseDate(newDate, this.format);
	  } else {
	    this.date = new Date(newDate);
	  }
	  this.set();

	  this.viewDate = new Date(this.date.getFullYear(),
	    this.date.getMonth(), 1, 0, 0, 0, 0);

	  this.fill();
	};

	Datepicker.prototype.place = function() {
	  var offset = this.component ?
	    this.component.offset() : this.$element.offset();
	  var $width = this.component ?
	    this.component.width() : this.$element.width();
	  var top = offset.top + this.height;
	  var left = offset.left;
	  var right = $doc.width() - offset.left - $width;
	  var isOutView = this.isOutView();

	  this.$picker.removeClass('ms-datepicker-right');
	  this.$picker.removeClass('ms-datepicker-up');

	  if ($doc.width() > 640) {
	    if (isOutView.outRight) {
	      this.$picker.addClass('ms-datepicker-right');
	      this.$picker.css({
	        top: top,
	        left: 'auto',
	        right: right
	      });
	      return;
	    }
	    if (isOutView.outBottom) {
	      this.$picker.addClass('ms-datepicker-up');
	      top = offset.top - this.$picker.outerHeight(true);
	    }
	  } else {
	    left = 0;
	  }

	  this.$picker.css({
	    top: top,
	    left: left
	  });
	};

	Datepicker.prototype.update = function(newDate) {
	  this.date = DPGlobal.parseDate(
	    typeof newDate === 'string' ? newDate : (this.isInput ?
	      this.$element.prop('value') : this.$element.data('date')),
	    this.format
	  );
	  this.viewDate = new Date(this.date.getFullYear(),
	    this.date.getMonth(), 1, 0, 0, 0, 0);
	  this.fill();
	};

	// Days of week
	Datepicker.prototype.fillDow = function() {
	  var dowCount = this.weekStart;
	  var html = '<tr>';
	  while (dowCount < this.weekStart + 7) {
	    // NOTE: do % then add 1
	    html += '<th class="ms-datepicker-dow">' +
	    Datepicker.locales[this.language].daysMin[(dowCount++) % 7] +
	    '</th>';
	  }
	  html += '</tr>';

	  this.$picker.find('.ms-datepicker-days thead').append(html);
	};

	Datepicker.prototype.fillMonths = function() {
	  var html = '';
	  var i = 0;
	  while (i < 12) {
	    html += '<span class="ms-datepicker-month">' +
	    Datepicker.locales[this.language].monthsShort[i++] + '</span>';
	  }
	  this.$picker.find('.ms-datepicker-months td').append(html);
	};

	Datepicker.prototype.fill = function() {
	  var d = new Date(this.viewDate);
	  var year = d.getFullYear();
	  var month = d.getMonth();
	  var currentDate = this.date.valueOf();

	  var prevMonth = new Date(year, month - 1, 28, 0, 0, 0, 0);
	  var day = DPGlobal
	    .getDaysInMonth(prevMonth.getFullYear(), prevMonth.getMonth());

	  var daysSelect = this.$picker
	    .find('.ms-datepicker-days .ms-datepicker-select');

	  if (this.language === 'zh_CN') {
	    daysSelect.text(year + Datepicker.locales[this.language].year[0] +
	    ' ' + Datepicker.locales[this.language].months[month]);
	  } else {
	    daysSelect.text(Datepicker.locales[this.language].months[month] +
	    ' ' + year);
	  }

	  prevMonth.setDate(day);
	  prevMonth.setDate(day - (prevMonth.getDay() - this.weekStart + 7) % 7);

	  var nextMonth = new Date(prevMonth);
	  nextMonth.setDate(nextMonth.getDate() + 42);
	  nextMonth = nextMonth.valueOf();
	  var html = [];

	  var className;
	  var prevY;
	  var prevM;

	  while (prevMonth.valueOf() < nextMonth) {
	    if (prevMonth.getDay() === this.weekStart) {
	      html.push('<tr>');
	    }

	    className = this.onRender(prevMonth, 0);
	    prevY = prevMonth.getFullYear();
	    prevM = prevMonth.getMonth();

	    if ((prevM < month && prevY === year) || prevY < year) {
	      className += ' ms-datepicker-old';
	    } else if ((prevM > month && prevY === year) || prevY > year) {
	      className += ' ms-datepicker-new';
	    }

	    if (prevMonth.valueOf() === currentDate) {
	      className += ' ms-active';
	    }
	    html.push('<td class="ms-datepicker-day ' +
	    className + '">' + prevMonth.getDate() + '</td>');

	    if (prevMonth.getDay() === this.weekEnd) {
	      html.push('</tr>');
	    }

	    prevMonth.setDate(prevMonth.getDate() + 1);
	  }

	  this.$picker.find('.ms-datepicker-days tbody')
	    .empty().append(html.join(''));

	  var currentYear = this.date.getFullYear();
	  var months = this.$picker.find('.ms-datepicker-months')
	    .find('.ms-datepicker-select')
	    .text(year);
	  months = months.end()
	    .find('span').removeClass('ms-active').removeClass('ms-disabled');

	  var monthLen = 0;

	  while (monthLen < 12) {
	    if (this.onRender(d.setFullYear(year, monthLen), 1)) {
	      months.eq(monthLen).addClass('ms-disabled');
	    }
	    monthLen++;
	  }

	  if (currentYear === year) {
	    months.eq(this.date.getMonth())
	        .removeClass('ms-disabled')
	        .addClass('ms-active');
	  }

	  html = '';
	  year = parseInt(year / 10, 10) * 10;
	  var yearCont = this.$picker
	    .find('.ms-datepicker-years')
	    .find('.ms-datepicker-select')
	    .text(year + '-' + (year + 9))
	    .end()
	    .find('td');
	  var yearClassName;
	  // fixes https://github.com/amazeui/amazeui/issues/770
	  // maybe not need now
	  var viewDate = new Date(this.viewDate);

	  year -= 1;

	  for (var i = -1; i < 11; i++) {
	    yearClassName = this.onRender(viewDate.setFullYear(year), 2);
	    html += '<span class="' + yearClassName + '' +
	    (i === -1 || i === 10 ? ' ms-datepicker-old' : '') +
	    (currentYear === year ? ' ms-active' : '') + '">' + year + '</span>';
	    year += 1;
	  }
	  yearCont.html(html);
	};

	Datepicker.prototype.click = function(event) {
	  event.stopPropagation();
	  event.preventDefault();
	  var month;
	  var year;
	  var $dayActive = this.$picker.find('.ms-datepicker-days').find('.ms-active');
	  var $months = this.$picker.find('.ms-datepicker-months');
	  var $monthIndex = $months.find('.ms-active').index();

	  var $target = $(event.target).closest('span, td, th');
	  if ($target.length === 1) {
	    switch ($target[0].nodeName.toLowerCase()) {
	      case 'th':
	        switch ($target[0].className) {
	          case 'ms-datepicker-switch':
	            this.showMode(1);
	            break;
	          case 'ms-datepicker-prev':
	          case 'ms-datepicker-next':
	            this.viewDate['set' + DPGlobal.modes[this.viewMode].navFnc].call(
	              this.viewDate,
	              this.viewDate
	                ['get' + DPGlobal.modes[this.viewMode].navFnc]
	                .call(this.viewDate) +
	              DPGlobal.modes[this.viewMode].navStep *
	              ($target[0].className === 'ms-datepicker-prev' ? -1 : 1)
	            );
	            this.fill();
	            this.set();
	            break;
	        }
	        break;
	      case 'span':
	        if ($target.is('.ms-disabled')) {
	          return;
	        }

	        if ($target.is('.ms-datepicker-month')) {
	          month = $target.parent().find('span').index($target);

	          if ($target.is('.ms-active')) {
	            this.viewDate.setMonth(month, $dayActive.text());
	          } else {
	            this.viewDate.setMonth(month);
	          }

	        } else {
	          year = parseInt($target.text(), 10) || 0;
	          if ($target.is('.ms-active')) {
	            this.viewDate.setFullYear(year, $monthIndex, $dayActive.text());
	          } else {
	            this.viewDate.setFullYear(year);
	          }

	        }

	        if (this.viewMode !== 0) {
	          this.date = new Date(this.viewDate);
	          this.$element.trigger({
	            type: 'changeDate.datepicker.msui',
	            date: this.date,
	            viewMode: DPGlobal.modes[this.viewMode].clsName
	          });
	        }

	        this.showMode(-1);
	        this.fill();
	        this.set();
	        break;
	      case 'td':
	        if ($target.is('.ms-datepicker-day') && !$target.is('.ms-disabled')) {
	          var day = parseInt($target.text(), 10) || 1;
	          month = this.viewDate.getMonth();
	          if ($target.is('.ms-datepicker-old')) {
	            month -= 1;
	          } else if ($target.is('.ms-datepicker-new')) {
	            month += 1;
	          }
	          year = this.viewDate.getFullYear();
	          this.date = new Date(year, month, day, 0, 0, 0, 0);
	          this.viewDate = new Date(year, month, Math.min(28, day), 0, 0, 0, 0);
	          this.fill();
	          this.set();
	          this.$element.trigger({
	            type: 'changeDate.datepicker.msui',
	            date: this.date,
	            viewMode: DPGlobal.modes[this.viewMode].clsName
	          });

	          this.options.autoClose && this.close();
	        }
	        break;
	    }
	  }
	};

	Datepicker.prototype.mousedown = function(event) {
	  event.stopPropagation();
	  event.preventDefault();
	};

	Datepicker.prototype.showMode = function(dir) {
	  if (dir) {
	    this.viewMode = Math.max(this.minViewMode,
	      Math.min(2, this.viewMode + dir));
	  }

	  this.$picker.find('>div').hide().
	    filter('.ms-datepicker-' + DPGlobal.modes[this.viewMode].clsName).show();
	};

	Datepicker.prototype.isOutView = function() {
	  var offset = this.component ?
	    this.component.offset() : this.$element.offset();
	  var isOutView = {
	    outRight: false,
	    outBottom: false
	  };
	  var $picker = this.$picker;
	  var width = offset.left + $picker.outerWidth(true);
	  var height = offset.top + $picker.outerHeight(true) +
	    this.$element.innerHeight();

	  if (width > $doc.width()) {
	    isOutView.outRight = true;
	  }
	  if (height > $doc.height()) {
	    isOutView.outBottom = true;
	  }
	  return isOutView;
	};

	Datepicker.prototype.getLocale = function(locale) {
	  if (!locale) {
	    locale = navigator.language && navigator.language.split('-');
	    locale[1] = locale[1].toUpperCase();
	    locale = locale.join('_');
	  }

	  if (!Datepicker.locales[locale]) {
	    locale = 'en_US';
	  }
	  return locale;
	};

	Datepicker.prototype.setTheme = function() {
	  if (this.theme) {
	    this.$picker.addClass('ms-datepicker-' + this.theme);
	  }
	};

	// Datepicker locales
	Datepicker.locales = {
	  en_US: {
	    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
	      'Friday', 'Saturday'],
	    daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	    daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
	    months: ['January', 'February', 'March', 'April', 'May', 'June',
	      'July', 'August', 'September', 'October', 'November', 'December'],
	    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
	      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	    weekStart: 0
	  },
	  zh_CN: {
	    days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
	    daysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
	    daysMin: ['日', '一', '二', '三', '四', '五', '六'],
	    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月',
	      '八月', '九月', '十月', '十一月', '十二月'],
	    monthsShort: ['一月', '二月', '三月', '四月', '五月', '六月',
	      '七月', '八月', '九月', '十月', '十一月', '十二月'],
	    weekStart: 1,
	    year: ['年']
	  }
	};

	var DPGlobal = {
	  modes: [
	    {
	      clsName: 'days',
	      navFnc: 'Month',
	      navStep: 1
	    },
	    {
	      clsName: 'months',
	      navFnc: 'FullYear',
	      navStep: 1
	    },
	    {
	      clsName: 'years',
	      navFnc: 'FullYear',
	      navStep: 10
	    }
	  ],

	  isLeapYear: function(year) {
	    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
	  },

	  getDaysInMonth: function(year, month) {
	    return [31, (DPGlobal.isLeapYear(year) ? 29 : 28),
	      31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
	  },

	  parseFormat: function(format) {
	    var separator = format.match(/[.\/\-\s].*?/);
	    var parts = format.split(/\W+/);

	    if (!separator || !parts || parts.length === 0) {
	      throw new Error('Invalid date format.');
	    }

	    return {
	      separator: separator,
	      parts: parts
	    };
	  },

	  parseDate: function(date, format) {
	    var parts = date.split(format.separator);
	    var val;
	    date = new Date();

	    date.setHours(0);
	    date.setMinutes(0);
	    date.setSeconds(0);
	    date.setMilliseconds(0);

	    if (parts.length === format.parts.length) {
	      var year = date.getFullYear();
	      var day = date.getDate();
	      var month = date.getMonth();

	      for (var i = 0, cnt = format.parts.length; i < cnt; i++) {
	        val = parseInt(parts[i], 10) || 1;
	        switch (format.parts[i]) {
	          case 'dd':
	          case 'd':
	            day = val;
	            date.setDate(val);
	            break;
	          case 'mm':
	          case 'm':
	            month = val - 1;
	            date.setMonth(val - 1);
	            break;
	          case 'yy':
	            year = 2000 + val;
	            date.setFullYear(2000 + val);
	            break;
	          case 'yyyy':
	            year = val;
	            date.setFullYear(val);
	            break;
	        }
	      }
	      date = new Date(year, month, day, 0, 0, 0);
	    }
	    return date;
	  },

	  formatDate: function(date, format) {
	    var val = {
	      d: date.getDate(),
	      m: date.getMonth() + 1,
	      yy: date.getFullYear().toString().substring(2),
	      yyyy: date.getFullYear()
	    };
	    var dateArray = [];

	    val.dd = (val.d < 10 ? '0' : '') + val.d;
	    val.mm = (val.m < 10 ? '0' : '') + val.m;

	    for (var i = 0, cnt = format.parts.length; i < cnt; i++) {
	      dateArray.push(val[format.parts[i]]);
	    }
	    return dateArray.join(format.separator);
	  },

	  headTemplate: '<thead>' +
	  '<tr class="ms-datepicker-header">' +
	  '<th class="ms-datepicker-prev">' +
	  '<i class="ms-datepicker-prev-icon"></i></th>' +
	  '<th colspan="5" class="ms-datepicker-switch">' +
	  '<div class="ms-datepicker-select"></div></th>' +
	  '<th class="ms-datepicker-next"><i class="ms-datepicker-next-icon"></i>' +
	  '</th></tr></thead>',

	  contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>'
	};

	DPGlobal.template = '<div class="ms-datepicker ms-datepicker-dropdown">' +
	'<div class="ms-datepicker-caret"></div>' +
	'<div class="ms-datepicker-days">' +
	'<table class="ms-datepicker-table">' +
	DPGlobal.headTemplate +
	'<tbody></tbody>' +
	'</table>' +
	'</div>' +
	'<div class="ms-datepicker-months">' +
	'<table class="ms-datepicker-table">' +
	DPGlobal.headTemplate +
	DPGlobal.contTemplate +
	'</table>' +
	'</div>' +
	'<div class="ms-datepicker-years">' +
	'<table class="ms-datepicker-table">' +
	DPGlobal.headTemplate +
	DPGlobal.contTemplate +
	'</table>' +
	'</div>' +
	'</div>';

	// jQuery plugin
	UI.plugin('datepicker', Datepicker);

	// Init code
	UI.ready(function(context) {
	  $('[data-ms-datepicker]').datepicker();
	});

	module.exports = UI.datepicker = Datepicker;

	 

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1);
	var UI = __webpack_require__(2);
	var $doc = $(document);
	var transition = UI.support.transition;
	var ui = UI.namespace.ui;
	var ns = UI.namespace.class;

	var Dimmer = function() {
	  this.id = UI.utils.generateGUID(ns+'dimmer');
	  this.$element = $(Dimmer.DEFAULTS.tpl, {
	    id: this.id
	  });

	  this.inited = false;
	  this.scrollbarWidth = 0;
	  this.$used = $([]);
	};

	Dimmer.DEFAULTS = {
	  tpl: '<div class="'+ns+'dimmer" data-'+ns+'dimmer></div>'
	};

	Dimmer.prototype.init = function() {
	  if (!this.inited) {
	    $(document.body).append(this.$element);
	    this.inited = true;
	    $doc.trigger('init.dimmer.'+ui);
	    this.$element.on('touchmove.dimmer.'+ui, function(e) {
	      e.preventDefault();
	    });
	  }

	  return this;
	};

	Dimmer.prototype.open = function(relatedElement) {
	  if (!this.inited) {
	    this.init();
	  }

	  var $element = this.$element;

	  // 用于多重调用
	  if (relatedElement) {
	    this.$used = this.$used.add($(relatedElement));
	  }

	  this.checkScrollbar().setScrollbar();

	  $element.show().trigger('open.dimmer.'+ui);

	  transition && $element.off(transition.end);

	  setTimeout(function() {
	    $element.addClass(ns+'active');
	  }, 0);

	  return this;
	};

	Dimmer.prototype.close = function(relatedElement, force) {
	  this.$used = this.$used.not($(relatedElement));

	  if (!force && this.$used.length) {
	    return this;
	  }

	  var $element = this.$element;

	  $element.removeClass(ns+'active').trigger('close.dimmer.'+ui);

	  function complete() {
	    $element.hide();
	    this.resetScrollbar();
	  }

	  // transition ? $element.one(transition.end, $.proxy(complete, this)) :
	  complete.call(this);

	  return this;
	};

	Dimmer.prototype.checkScrollbar = function() {
	  this.scrollbarWidth = UI.utils.measureScrollbar();

	  return this;
	};

	Dimmer.prototype.setScrollbar = function() {
	  var $body = $(document.body);
	  var bodyPaddingRight = parseInt(($body.css('padding-right') || 0), 10);

	  if (this.scrollbarWidth) {
	    $body.css('padding-right', bodyPaddingRight + this.scrollbarWidth);
	  }

	  $body.addClass(ns+'dimmer-active');

	  return this;
	};

	Dimmer.prototype.resetScrollbar = function() {
	  $(document.body).css('padding-right', '').removeClass(ns+'dimmer-active');

	  return this;
	};

	module.exports = UI.dimmer = new Dimmer();


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1);
	var UI = __webpack_require__(2);
	var animation = UI.support.animation;
	var class_activate = UI.namespace.class + "active";
	var data_dropdown = '[data-' + UI.namespace.class + 'dropdown]'

	/**
	 * @via https://github.com/Minwe/bootstrap/blob/master/js/dropdown.js
	 * @copyright (c) 2011-2014 Twitter, Inc
	 * @license The MIT License
	 */

	// var toggle = '[data-am-dropdown] > .am-dropdown-toggle';

	var Dropdown = function (element, options) {
	    this.options = $.extend({}, Dropdown.DEFAULTS, options);

	    options = this.options;

	    this.$element = $(element);
	    this.$toggle = this.$element.find(options.selector.toggle);
	    this.$dropdown = this.$element.find(options.selector.dropdown);
	    this.$boundary = (options.boundary === window) ? $(window) :
	        this.$element.closest(options.boundary);
	    this.$justify = (options.justify && $(options.justify).length &&
	        $(options.justify)) || undefined;

	    !this.$boundary.length && (this.$boundary = $(window));

	    this.active = this.$element.hasClass(class_activate) ? true : false;
	    this.animating = null;

	    this.events();
	};

	Dropdown.DEFAULTS = {
	    animation: UI.namespace.class + 'animation-slide-top-fixed',
	    boundary: window,
	    justify: undefined,
	    selector: {
	        dropdown: '.' + UI.namespace.class + 'dropdown-content',
	        toggle: '.' + UI.namespace.class + 'dropdown-toggle'
	    },
	    trigger: 'click'
	};

	Dropdown.prototype.toggle = function () {
	    this.clear();

	    if (this.animating) {
	        return;
	    }

	    this[this.active ? 'close' : 'open']();
	};

	Dropdown.prototype.open = function (e) {
	    var $toggle = this.$toggle;
	    var $element = this.$element;
	    var $dropdown = this.$dropdown;

	    if ($toggle.is('.' + UI.namespace.class + 'disabled, :disabled')) {
	        return;
	    }

	    if (this.active) {
	        return;
	    }

	    $element.trigger('open.dropdown.' + UI.namespace.UI).addClass(class_activate);

	    $toggle.trigger('focus');

	    this.checkDimensions(e);

	    var complete = $.proxy(function () {
	        $element.trigger('opened.dropdown.' + UI.namespace.UI);
	        this.active = true;
	        this.animating = 0;
	    }, this);

	    if (animation) {
	        this.animating = 1;
	        $dropdown.addClass(this.options.animation).
	            one(animation.end + '.open.dropdown.' + UI.namespace.UI, $.proxy(function () {
	                complete();
	                $dropdown.removeClass(this.options.animation);
	            }, this));
	    } else {
	        complete();
	    }
	};

	Dropdown.prototype.close = function () {
	    if (!this.active) {
	        return;
	    }

	    // fix #165
	    // var animationName = this.options.animation + ' am-animation-reverse';
	    var animationName = UI.namespace.class + 'dropdown-animation';
	    var $element = this.$element;
	    var $dropdown = this.$dropdown;

	    $element.trigger('close.dropdown.' + UI.namespace.UI);

	    var complete = $.proxy(function complete() {
	        $element.
	            removeClass(class_activate).
	            trigger('closed.dropdown.' + UI.namespace.UI);
	        this.active = false;
	        this.animating = 0;
	        this.$toggle.blur();
	    }, this);

	    if (animation) {
	        $dropdown.removeClass(this.options.animation);
	        $dropdown.addClass(animationName);
	        this.animating = 1;
	        // animation
	        $dropdown.one(animation.end + '.close.dropdown.' + UI.namespace.UI, function () {
	            $dropdown.removeClass(animationName);
	            complete();
	        });
	    } else {
	        complete();
	    }
	};

	Dropdown.prototype.enable = function () {
	    this.$toggle.prop('disabled', false);
	},

	Dropdown.prototype.disable = function () {
	    this.$toggle.prop('disabled', true);
	},

	Dropdown.prototype.checkDimensions = function (e) {
	    if (!this.$dropdown.length) {
	        return;
	    }

	    var $dropdown = this.$dropdown;

	    // @see #873
	    if (e && e.offset) {
	        $dropdown.offset(e.offset);
	    }

	    var offset = $dropdown.offset();
	    var width = $dropdown.outerWidth();
	    var boundaryWidth = this.$boundary.width();
	    var boundaryOffset = $.isWindow(this.boundary) && this.$boundary.offset() ?
	        this.$boundary.offset().left : 0;

	    if (this.$justify) {
	        // jQuery.fn.width() is really...
	        $dropdown.css({ 'min-width': this.$justify.css('width') });
	    }

	    if ((width + (offset.left - boundaryOffset)) > boundaryWidth) {
	        this.$element.addClass(UI.namespace.class + 'dropdown-flip');
	    }
	};

	Dropdown.prototype.clear = function () {
	    $(data_dropdown).not(this.$element).each(function () {
	        var data = $(this).data(UI.namespace.UI + '.dropdown');
	        data && data.close();
	    });
	};

	Dropdown.prototype.events = function () {
	    var eventNS = 'dropdown.' + UI.namespace.UI;
	    // triggers = this.options.trigger.split(' '),
	    var $toggle = this.$toggle;

	    $toggle.on('click.' + eventNS, $.proxy(function (e) {
	        e.preventDefault();
	        this.toggle();
	    }, this));


	    $(document).on('keydown.dropdown.' + UI.namespace.UI, $.proxy(function (e) {
	        e.keyCode === 27 && this.active && this.close();
	    }, this)).on('click.outer.dropdown.' + UI.namespace.UI, $.proxy(function (e) {
	        // var $target = $(e.target);

	        if (this.active &&
	            (this.$element[0] === e.target || !this.$element.find(e.target).length)) {
	            this.close();
	        }
	    }, this));
	};

	// Dropdown Plugin
	UI.plugin('dropdown', Dropdown);

	// Init code
	UI.ready(function (context) {
	    $(data_dropdown, context).dropdown();
	});

	$(document).on('click.dropdown.' + UI.namespace.UI + '.data-api', '.' + UI.namespace.class + 'dropdown form',
	    function (e) {
	        e.stopPropagation();
	    });

	module.exports = UI.dropdown = Dropdown;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate) {var $ = __webpack_require__(1);
	var UI = __webpack_require__(2);

	// MODIFIED:
	// - LINE 252: add `<i></i>`
	// - namespace
	// - Init code
	// TODO: start after x ms when pause on actions

	/*
	 * jQuery FlexSlider v2.6.1
	 * Copyright 2012 WooThemes
	 * Contributing Author: Tyler Smith
	 */

	var focused = true;

	// FlexSlider: Object Instance
	$.flexslider = function (el, options) {
	    var slider = $(el);

	    // making variables public
	    slider.vars = $.extend({}, $.flexslider.defaults, options);

	    var namespace = slider.vars.namespace,
	        msGesture = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
	        touch = (("ontouchstart" in window) || msGesture || window.DocumentTouch && document instanceof DocumentTouch) && slider.vars.touch,
	        // depricating this idea, as devices are being released with both of these events
	        eventType = "click touchend MSPointerUp keyup",
	        watchedEvent = "",
	        watchedEventClearTimer,
	        vertical = slider.vars.direction === "vertical",
	        reverse = slider.vars.reverse,
	        carousel = (slider.vars.itemWidth > 0),
	        fade = slider.vars.animation === "fade",
	        asNav = slider.vars.asNavFor !== "",
	        methods = {};

	    // Store a reference to the slider object
	    $.data(el, 'flexslider', slider);

	    // Private slider methods
	    methods = {
	        init: function () {
	            slider.animating = false;
	            // Get current slide and make sure it is a number
	            slider.currentSlide = parseInt((slider.vars.startAt ? slider.vars.startAt : 0), 10);
	            if (isNaN(slider.currentSlide)) {
	                slider.currentSlide = 0;
	            }
	            slider.animatingTo = slider.currentSlide;
	            slider.atEnd = (slider.currentSlide === 0 || slider.currentSlide === slider.last);
	            slider.containerSelector = slider.vars.selector.substr(0, slider.vars.selector.search(' '));
	            slider.slides = $(slider.vars.selector, slider);
	            slider.container = $(slider.containerSelector, slider);
	            slider.count = slider.slides.length;
	            // SYNC:
	            slider.syncExists = $(slider.vars.sync).length > 0;
	            // SLIDE:
	            if (slider.vars.animation === "slide") {
	                slider.vars.animation = "swing";
	            }
	            slider.prop = (vertical) ? "top" : "marginLeft";
	            slider.args = {};
	            // SLIDESHOW:
	            slider.manualPause = false;
	            slider.stopped = false;
	            //PAUSE WHEN INVISIBLE
	            slider.started = false;
	            slider.startTimeout = null;
	            // TOUCH/USECSS:
	            slider.transitions = !slider.vars.video && !fade && slider.vars.useCSS && (function () {
	                var obj = document.createElement('div'),
	                    props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
	                for (var i in props) {
	                    if (obj.style[props[i]] !== undefined) {
	                        slider.pfx = props[i].replace('Perspective', '').toLowerCase();
	                        slider.prop = "-" + slider.pfx + "-transform";
	                        return true;
	                    }
	                }
	                return false;
	            }());
	            slider.ensureAnimationEnd = '';
	            // CONTROLSCONTAINER:
	            if (slider.vars.controlsContainer !== "") slider.controlsContainer = $(slider.vars.controlsContainer).length > 0 && $(slider.vars.controlsContainer);
	            // MANUAL:
	            if (slider.vars.manualControls !== "") slider.manualControls = $(slider.vars.manualControls).length > 0 && $(slider.vars.manualControls);

	            // CUSTOM DIRECTION NAV:
	            if (slider.vars.customDirectionNav !== "") slider.customDirectionNav = $(slider.vars.customDirectionNav).length === 2 && $(slider.vars.customDirectionNav);

	            // RANDOMIZE:
	            if (slider.vars.randomize) {
	                slider.slides.sort(function () {
	                    return (Math.round(Math.random()) - 0.5);
	                });
	                slider.container.empty().append(slider.slides);
	            }

	            slider.doMath();

	            // INIT
	            slider.setup("init");

	            // CONTROLNAV:
	            if (slider.vars.controlNav) {
	                methods.controlNav.setup();
	            }

	            // DIRECTIONNAV:
	            if (slider.vars.directionNav) {
	                methods.directionNav.setup();
	            }

	            // KEYBOARD:
	            if (slider.vars.keyboard && ($(slider.containerSelector).length === 1 || slider.vars.multipleKeyboard)) {
	                $(document).bind('keyup', function (event) {
	                    var keycode = event.keyCode;
	                    if (!slider.animating && (keycode === 39 || keycode === 37)) {
	                        var target = (keycode === 39) ? slider.getTarget('next') :
	                            (keycode === 37) ? slider.getTarget('prev') : false;
	                        slider.flexAnimate(target, slider.vars.pauseOnAction);
	                    }
	                });
	            }
	            // MOUSEWHEEL:
	            if (slider.vars.mousewheel) {
	                slider.bind('mousewheel', function (event, delta, deltaX, deltaY) {
	                    event.preventDefault();
	                    var target = (delta < 0) ? slider.getTarget('next') : slider.getTarget('prev');
	                    slider.flexAnimate(target, slider.vars.pauseOnAction);
	                });
	            }

	            // PAUSEPLAY
	            if (slider.vars.pausePlay) {
	                methods.pausePlay.setup();
	            }

	            //PAUSE WHEN INVISIBLE
	            if (slider.vars.slideshow && slider.vars.pauseInvisible) {
	                methods.pauseInvisible.init();
	            }

	            // SLIDSESHOW
	            if (slider.vars.slideshow) {
	                if (slider.vars.pauseOnHover) {
	                    slider.hover(function () {
	                        if (!slider.manualPlay && !slider.manualPause) { slider.pause(); }
	                    }, function () {
	                        if (!slider.manualPause && !slider.manualPlay && !slider.stopped) { slider.play(); }
	                    });
	                }
	                // initialize animation
	                // If we're visible, or we don't use PageVisibility API
	                if (!slider.vars.pauseInvisible || !methods.pauseInvisible.isHidden()) {
	                    (slider.vars.initDelay > 0) ? slider.startTimeout = setTimeout(slider.play, slider.vars.initDelay) : slider.play();
	                }
	            }

	            // ASNAV:
	            if (asNav) { methods.asNav.setup(); }

	            // TOUCH
	            if (touch && slider.vars.touch) { methods.touch(); }

	            // FADE&&SMOOTHHEIGHT || SLIDE:
	            if (!fade || (fade && slider.vars.smoothHeight)) { $(window).bind("resize orientationchange focus", methods.resize); }

	            slider.find("img").attr("draggable", "false");

	            // API: start() Callback
	            setTimeout(function () {
	                slider.vars.start(slider);
	            }, 200);
	        },
	        asNav: {
	            setup: function () {
	                slider.asNav = true;
	                slider.animatingTo = Math.floor(slider.currentSlide / slider.move);
	                slider.currentItem = slider.currentSlide;
	                slider.slides.removeClass(namespace + "active-slide").eq(slider.currentItem).addClass(namespace + "active-slide");
	                if (!msGesture) {
	                    slider.slides.on(eventType, function (e) {
	                        e.preventDefault();
	                        var $slide = $(this),
	                            target = $slide.index();
	                        var posFromLeft = $slide.offset().left - $(slider).scrollLeft(); // Find position of slide relative to left of slider container
	                        if (posFromLeft <= 0 && $slide.hasClass(namespace + 'active-slide')) {
	                            slider.flexAnimate(slider.getTarget("prev"), true);
	                        } else if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass(namespace + "active-slide")) {
	                            slider.direction = (slider.currentItem < target) ? "next" : "prev";
	                            slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
	                        }
	                    });
	                } else {
	                    el._slider = slider;
	                    slider.slides.each(function () {
	                        var that = this;
	                        that._gesture = new MSGesture();
	                        that._gesture.target = that;
	                        that.addEventListener("MSPointerDown", function (e) {
	                            e.preventDefault();
	                            if (e.currentTarget._gesture) {
	                                e.currentTarget._gesture.addPointer(e.pointerId);
	                            }
	                        }, false);
	                        that.addEventListener("MSGestureTap", function (e) {
	                            e.preventDefault();
	                            var $slide = $(this),
	                                target = $slide.index();
	                            if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass('active')) {
	                                slider.direction = (slider.currentItem < target) ? "next" : "prev";
	                                slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
	                            }
	                        });
	                    });
	                }
	            }
	        },
	        controlNav: {
	            setup: function () {
	                if (!slider.manualControls) {
	                    methods.controlNav.setupPaging();
	                } else { // MANUALCONTROLS:
	                    methods.controlNav.setupManual();
	                }
	            },
	            setupPaging: function () {
	                var type = (slider.vars.controlNav === "thumbnails") ? 'control-thumbs' : 'control-paging',
	                    j = 1,
	                    item,
	                    slide;

	                slider.controlNavScaffold = $('<ol class="' + namespace + 'control-nav ' + namespace + type + '"></ol>');

	                if (slider.pagingCount > 1) {
	                    for (var i = 0; i < slider.pagingCount; i++) {
	                        slide = slider.slides.eq(i);
	                        if (undefined === slide.attr('data-thumb-alt')) {
	                            slide.attr('data-thumb-alt', '');
	                        }
	                        var altText = ('' !== slide.attr('data-thumb-alt')) ? altText = ' alt="' + slide.attr('data-thumb-alt') + '"' : '';
	                        item = (slider.vars.controlNav === "thumbnails") ? '<img src="' + slide.attr('data-thumb') + '"' + altText + '/>' : '<a href="#">' + j + '</a>';
	                        if ('thumbnails' === slider.vars.controlNav && true === slider.vars.thumbCaptions) {
	                            var captn = slide.attr('data-thumbcaption');
	                            if ('' !== captn && undefined !== captn) { item += '<span class="' + namespace + 'caption">' + captn + '</span>'; }
	                        }
	                        // slider.controlNavScaffold.append('<li>' + item + '</li>');
	                        slider.controlNavScaffold.append('<li>' + item + '<i></i></li>');
	                        j++;
	                    }
	                }

	                // CONTROLSCONTAINER:
	                (slider.controlsContainer) ? $(slider.controlsContainer).append(slider.controlNavScaffold) : slider.append(slider.controlNavScaffold);
	                methods.controlNav.set();

	                methods.controlNav.active();

	                slider.controlNavScaffold.delegate('a, img', eventType, function (event) {
	                    event.preventDefault();

	                    if (watchedEvent === "" || watchedEvent === event.type) {
	                        var $this = $(this),
	                            target = slider.controlNav.index($this);

	                        if (!$this.hasClass(namespace + 'active')) {
	                            slider.direction = (target > slider.currentSlide) ? "next" : "prev";
	                            slider.flexAnimate(target, slider.vars.pauseOnAction);
	                        }
	                    }

	                    // setup flags to prevent event duplication
	                    if (watchedEvent === "") {
	                        watchedEvent = event.type;
	                    }
	                    methods.setToClearWatchedEvent();

	                });
	            },
	            setupManual: function () {
	                slider.controlNav = slider.manualControls;
	                methods.controlNav.active();

	                slider.controlNav.bind(eventType, function (event) {
	                    event.preventDefault();

	                    if (watchedEvent === "" || watchedEvent === event.type) {
	                        var $this = $(this),
	                            target = slider.controlNav.index($this);

	                        if (!$this.hasClass(namespace + 'active')) {
	                            (target > slider.currentSlide) ? slider.direction = "next" : slider.direction = "prev";
	                            slider.flexAnimate(target, slider.vars.pauseOnAction);
	                        }
	                    }

	                    // setup flags to prevent event duplication
	                    if (watchedEvent === "") {
	                        watchedEvent = event.type;
	                    }
	                    methods.setToClearWatchedEvent();
	                });
	            },
	            set: function () {
	                var selector = (slider.vars.controlNav === "thumbnails") ? 'img' : 'a';
	                slider.controlNav = $('.' + namespace + 'control-nav li ' + selector, (slider.controlsContainer) ? slider.controlsContainer : slider);
	            },
	            active: function () {
	                slider.controlNav.removeClass(namespace + "active").eq(slider.animatingTo).addClass(namespace + "active");
	            },
	            update: function (action, pos) {
	                if (slider.pagingCount > 1 && action === "add") {
	                    slider.controlNavScaffold.append($('<li><a href="#">' + slider.count + '</a></li>'));
	                } else if (slider.pagingCount === 1) {
	                    slider.controlNavScaffold.find('li').remove();
	                } else {
	                    slider.controlNav.eq(pos).closest('li').remove();
	                }
	                methods.controlNav.set();
	                (slider.pagingCount > 1 && slider.pagingCount !== slider.controlNav.length) ? slider.update(pos, action) : methods.controlNav.active();
	            }
	        },
	        directionNav: {
	            setup: function () {
	                var directionNavScaffold = $('<ul class="' + namespace + 'direction-nav"><li class="' + namespace + 'nav-prev"><a class="' + namespace + 'prev" href="#">' + slider.vars.prevText + '</a></li><li class="' + namespace + 'nav-next"><a class="' + namespace + 'next" href="#">' + slider.vars.nextText + '</a></li></ul>');

	                // CUSTOM DIRECTION NAV:
	                if (slider.customDirectionNav) {
	                    slider.directionNav = slider.customDirectionNav;
	                } else if (slider.controlsContainer) { // CONTROLSCONTAINER:
	                    $(slider.controlsContainer).append(directionNavScaffold);
	                    slider.directionNav = $('.' + namespace + 'direction-nav li a', slider.controlsContainer);
	                } else {
	                    slider.append(directionNavScaffold);
	                    slider.directionNav = $('.' + namespace + 'direction-nav li a', slider);
	                }

	                methods.directionNav.update();

	                slider.directionNav.bind(eventType, function (event) {
	                    event.preventDefault();
	                    var target;

	                    if (watchedEvent === "" || watchedEvent === event.type) {
	                        target = ($(this).hasClass(namespace + 'next')) ? slider.getTarget('next') : slider.getTarget('prev');
	                        slider.flexAnimate(target, slider.vars.pauseOnAction);
	                    }

	                    // setup flags to prevent event duplication
	                    if (watchedEvent === "") {
	                        watchedEvent = event.type;
	                    }
	                    methods.setToClearWatchedEvent();
	                });
	            },
	            update: function () {
	                var disabledClass = namespace + 'disabled';
	                if (slider.pagingCount === 1) {
	                    slider.directionNav.addClass(disabledClass).attr('tabindex', '-1');
	                } else if (!slider.vars.animationLoop) {
	                    if (slider.animatingTo === 0) {
	                        slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "prev").addClass(disabledClass).attr('tabindex', '-1');
	                    } else if (slider.animatingTo === slider.last) {
	                        slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "next").addClass(disabledClass).attr('tabindex', '-1');
	                    } else {
	                        slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
	                    }
	                } else {
	                    slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
	                }
	            }
	        },
	        pausePlay: {
	            setup: function () {
	                var pausePlayScaffold = $('<div class="' + namespace + 'pauseplay"><a href="#"></a></div>');

	                // CONTROLSCONTAINER:
	                if (slider.controlsContainer) {
	                    slider.controlsContainer.append(pausePlayScaffold);
	                    slider.pausePlay = $('.' + namespace + 'pauseplay a', slider.controlsContainer);
	                } else {
	                    slider.append(pausePlayScaffold);
	                    slider.pausePlay = $('.' + namespace + 'pauseplay a', slider);
	                }

	                methods.pausePlay.update((slider.vars.slideshow) ? namespace + 'pause' : namespace + 'play');

	                slider.pausePlay.bind(eventType, function (event) {
	                    event.preventDefault();

	                    if (watchedEvent === "" || watchedEvent === event.type) {
	                        if ($(this).hasClass(namespace + 'pause')) {
	                            slider.manualPause = true;
	                            slider.manualPlay = false;
	                            slider.pause();
	                        } else {
	                            slider.manualPause = false;
	                            slider.manualPlay = true;
	                            slider.play();
	                        }
	                    }

	                    // setup flags to prevent event duplication
	                    if (watchedEvent === "") {
	                        watchedEvent = event.type;
	                    }
	                    methods.setToClearWatchedEvent();
	                });
	            },
	            update: function (state) {
	                (state === "play") ? slider.pausePlay.removeClass(namespace + 'pause').addClass(namespace + 'play').html(slider.vars.playText) : slider.pausePlay.removeClass(namespace + 'play').addClass(namespace + 'pause').html(slider.vars.pauseText);
	            }
	        },
	        touch: function () {
	            var startX,
	                startY,
	                offset,
	                cwidth,
	                dx,
	                startT,
	                onTouchStart,
	                onTouchMove,
	                onTouchEnd,
	                scrolling = false,
	                localX = 0,
	                localY = 0,
	                accDx = 0;

	            if (!msGesture) {
	                onTouchStart = function (e) {
	                    if (slider.animating) {
	                        e.preventDefault();
	                    } else if ((window.navigator.msPointerEnabled) || e.touches.length === 1) {
	                        slider.pause();
	                        // CAROUSEL:
	                        cwidth = (vertical) ? slider.h : slider.w;
	                        startT = Number(new Date());
	                        // CAROUSEL:

	                        // Local vars for X and Y points.
	                        localX = e.touches[0].pageX;
	                        localY = e.touches[0].pageY;

	                        offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
	                            (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
	                                (carousel && slider.currentSlide === slider.last) ? slider.limit :
	                                    (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
	                                        (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
	                        startX = (vertical) ? localY : localX;
	                        startY = (vertical) ? localX : localY;

	                        el.addEventListener('touchmove', onTouchMove, false);
	                        el.addEventListener('touchend', onTouchEnd, false);
	                    }
	                };

	                onTouchMove = function (e) {
	                    // Local vars for X and Y points.

	                    localX = e.touches[0].pageX;
	                    localY = e.touches[0].pageY;

	                    dx = (vertical) ? startX - localY : startX - localX;
	                    scrolling = (vertical) ? (Math.abs(dx) < Math.abs(localX - startY)) : (Math.abs(dx) < Math.abs(localY - startY));

	                    var fxms = 500;

	                    if (!scrolling || Number(new Date()) - startT > fxms) {
	                        e.preventDefault();
	                        if (!fade && slider.transitions) {
	                            if (!slider.vars.animationLoop) {
	                                dx = dx / ((slider.currentSlide === 0 && dx < 0 || slider.currentSlide === slider.last && dx > 0) ? (Math.abs(dx) / cwidth + 2) : 1);
	                            }
	                            slider.setProps(offset + dx, "setTouch");
	                        }
	                    }
	                };

	                onTouchEnd = function (e) {
	                    // finish the touch by undoing the touch session
	                    el.removeEventListener('touchmove', onTouchMove, false);

	                    if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
	                        var updateDx = (reverse) ? -dx : dx,
	                            target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

	                        if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth / 2)) {
	                            slider.flexAnimate(target, slider.vars.pauseOnAction);
	                        } else {
	                            if (!fade) { slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true); }
	                        }
	                    }
	                    el.removeEventListener('touchend', onTouchEnd, false);

	                    startX = null;
	                    startY = null;
	                    dx = null;
	                    offset = null;
	                };

	                el.addEventListener('touchstart', onTouchStart, false);
	            } else {
	                el.style.msTouchAction = "none";
	                el._gesture = new MSGesture();
	                el._gesture.target = el;
	                el.addEventListener("MSPointerDown", onMSPointerDown, false);
	                el._slider = slider;
	                el.addEventListener("MSGestureChange", onMSGestureChange, false);
	                el.addEventListener("MSGestureEnd", onMSGestureEnd, false);

	                function onMSPointerDown(e) {
	                    e.stopPropagation();
	                    if (slider.animating) {
	                        e.preventDefault();
	                    } else {
	                        slider.pause();
	                        el._gesture.addPointer(e.pointerId);
	                        accDx = 0;
	                        cwidth = (vertical) ? slider.h : slider.w;
	                        startT = Number(new Date());
	                        // CAROUSEL:

	                        offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
	                            (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
	                                (carousel && slider.currentSlide === slider.last) ? slider.limit :
	                                    (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
	                                        (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
	                    }
	                }

	                function onMSGestureChange(e) {
	                    e.stopPropagation();
	                    var slider = e.target._slider;
	                    if (!slider) {
	                        return;
	                    }
	                    var transX = -e.translationX,
	                        transY = -e.translationY;

	                    //Accumulate translations.
	                    accDx = accDx + ((vertical) ? transY : transX);
	                    dx = accDx;
	                    scrolling = (vertical) ? (Math.abs(accDx) < Math.abs(-transX)) : (Math.abs(accDx) < Math.abs(-transY));

	                    if (e.detail === e.MSGESTURE_FLAG_INERTIA) {
	                        setImmediate(function () {
	                            el._gesture.stop();
	                        });

	                        return;
	                    }

	                    if (!scrolling || Number(new Date()) - startT > 500) {
	                        e.preventDefault();
	                        if (!fade && slider.transitions) {
	                            if (!slider.vars.animationLoop) {
	                                dx = accDx / ((slider.currentSlide === 0 && accDx < 0 || slider.currentSlide === slider.last && accDx > 0) ? (Math.abs(accDx) / cwidth + 2) : 1);
	                            }
	                            slider.setProps(offset + dx, "setTouch");
	                        }
	                    }
	                }

	                function onMSGestureEnd(e) {
	                    e.stopPropagation();
	                    var slider = e.target._slider;
	                    if (!slider) {
	                        return;
	                    }
	                    if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
	                        var updateDx = (reverse) ? -dx : dx,
	                            target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

	                        if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth / 2)) {
	                            slider.flexAnimate(target, slider.vars.pauseOnAction);
	                        } else {
	                            if (!fade) { slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true); }
	                        }
	                    }

	                    startX = null;
	                    startY = null;
	                    dx = null;
	                    offset = null;
	                    accDx = 0;
	                }
	            }
	        },
	        resize: function () {
	            if (!slider.animating && slider.is(':visible')) {
	                if (!carousel) { slider.doMath() };

	                if (fade) {
	                    // SMOOTH HEIGHT:
	                    methods.smoothHeight();
	                } else if (carousel) { //CAROUSEL:
	                    slider.slides.width(slider.computedW);
	                    slider.update(slider.pagingCount);
	                    slider.setProps();
	                }
	                else if (vertical) { //VERTICAL:
	                    slider.viewport.height(slider.h);
	                    slider.setProps(slider.h, "setTotal");
	                } else {
	                    // SMOOTH HEIGHT:
	                    if (slider.vars.smoothHeight) { methods.smoothHeight(); }
	                    slider.newSlides.width(slider.computedW);
	                    slider.setProps(slider.computedW, "setTotal");
	                }
	            }
	        },
	        smoothHeight: function (dur) {
	            if (!vertical || fade) {
	                var $obj = (fade) ? slider : slider.viewport;
	                (dur) ? $obj.animate({ "height": slider.slides.eq(slider.animatingTo).innerHeight() }, dur) : $obj.innerHeight(slider.slides.eq(slider.animatingTo).innerHeight());
	            }
	        },
	        sync: function (action) {
	            var $obj = $(slider.vars.sync).data("flexslider"),
	                target = slider.animatingTo;

	            switch (action) {
	                case "animate":
	                    $obj.flexAnimate(target, slider.vars.pauseOnAction, false, true);
	                    break;
	                case "play":
	                    if (!$obj.playing && !$obj.asNav) {
	                        $obj.play();
	                    }
	                    break;
	                case "pause":
	                    $obj.pause();
	                    break;
	            }
	        },
	        uniqueID: function ($clone) {
	            // Append _clone to current level and children elements with id attributes
	            $clone.filter('[id]').add($clone.find('[id]')).each(function () {
	                var $this = $(this);
	                $this.attr('id', $this.attr('id') + '_clone');
	            });
	            return $clone;
	        },
	        pauseInvisible: {
	            visProp: null,
	            init: function () {
	                var visProp = methods.pauseInvisible.getHiddenProp();
	                if (visProp) {
	                    var evtname = visProp.replace(/[H|h]idden/, '') + 'visibilitychange';
	                    document.addEventListener(evtname, function () {
	                        if (methods.pauseInvisible.isHidden()) {
	                            if (slider.startTimeout) {
	                                clearTimeout(slider.startTimeout); //If clock is ticking, stop timer and prevent from starting while invisible
	                            } else {
	                                slider.pause(); //Or just pause
	                            }
	                        }
	                        else {
	                            if (slider.started) {
	                                slider.play(); //Initiated before, just play
	                            } else {
	                                if (slider.vars.initDelay > 0) {
	                                    setTimeout(slider.play, slider.vars.initDelay);
	                                } else {
	                                    slider.play(); //Didn't init before: simply init or wait for it
	                                }
	                            }
	                        }
	                    });
	                }
	            },
	            isHidden: function () {
	                var prop = methods.pauseInvisible.getHiddenProp();
	                if (!prop) {
	                    return false;
	                }
	                return document[prop];
	            },
	            getHiddenProp: function () {
	                var prefixes = ['webkit', 'moz', 'ms', 'o'];
	                // if 'hidden' is natively supported just return it
	                if ('hidden' in document) {
	                    return 'hidden';
	                }
	                // otherwise loop over all the known prefixes until we find one
	                for (var i = 0; i < prefixes.length; i++) {
	                    if ((prefixes[i] + 'Hidden') in document) {
	                        return prefixes[i] + 'Hidden';
	                    }
	                }
	                // otherwise it's not supported
	                return null;
	            }
	        },
	        setToClearWatchedEvent: function () {
	            clearTimeout(watchedEventClearTimer);
	            watchedEventClearTimer = setTimeout(function () {
	                watchedEvent = "";
	            }, 3000);
	        }
	    };

	    // public methods
	    slider.flexAnimate = function (target, pause, override, withSync, fromNav) {
	        if (!slider.vars.animationLoop && target !== slider.currentSlide) {
	            slider.direction = (target > slider.currentSlide) ? "next" : "prev";
	        }

	        if (asNav && slider.pagingCount === 1) slider.direction = (slider.currentItem < target) ? "next" : "prev";

	        if (!slider.animating && (slider.canAdvance(target, fromNav) || override) && slider.is(":visible")) {
	            if (asNav && withSync) {
	                var master = $(slider.vars.asNavFor).data('flexslider');
	                slider.atEnd = target === 0 || target === slider.count - 1;
	                master.flexAnimate(target, true, false, true, fromNav);
	                slider.direction = (slider.currentItem < target) ? "next" : "prev";
	                master.direction = slider.direction;

	                if (Math.ceil((target + 1) / slider.visible) - 1 !== slider.currentSlide && target !== 0) {
	                    slider.currentItem = target;
	                    slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
	                    target = Math.floor(target / slider.visible);
	                } else {
	                    slider.currentItem = target;
	                    slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
	                    return false;
	                }
	            }

	            slider.animating = true;
	            slider.animatingTo = target;

	            // SLIDESHOW:
	            if (pause) { slider.pause(); }

	            // API: before() animation Callback
	            slider.vars.before(slider);

	            // SYNC:
	            if (slider.syncExists && !fromNav) { methods.sync("animate"); }

	            // CONTROLNAV
	            if (slider.vars.controlNav) { methods.controlNav.active(); }

	            // !CAROUSEL:
	            // CANDIDATE: slide active class (for add/remove slide)
	            if (!carousel) { slider.slides.removeClass(namespace + 'active-slide').eq(target).addClass(namespace + 'active-slide'); }

	            // INFINITE LOOP:
	            // CANDIDATE: atEnd
	            slider.atEnd = target === 0 || target === slider.last;

	            // DIRECTIONNAV:
	            if (slider.vars.directionNav) { methods.directionNav.update(); }

	            if (target === slider.last) {
	                // API: end() of cycle Callback
	                slider.vars.end(slider);
	                // SLIDESHOW && !INFINITE LOOP:
	                if (!slider.vars.animationLoop) { slider.pause(); }
	            }

	            // SLIDE:
	            if (!fade) {
	                var dimension = (vertical) ? slider.slides.filter(':first').height() : slider.computedW,
	                    margin, slideString, calcNext;

	                // INFINITE LOOP / REVERSE:
	                if (carousel) {
	                    //margin = (slider.vars.itemWidth > slider.w) ? slider.vars.itemMargin * 2 : slider.vars.itemMargin;
	                    margin = slider.vars.itemMargin;
	                    calcNext = ((slider.itemW + margin) * slider.move) * slider.animatingTo;
	                    slideString = (calcNext > slider.limit && slider.visible !== 1) ? slider.limit : calcNext;
	                } else if (slider.currentSlide === 0 && target === slider.count - 1 && slider.vars.animationLoop && slider.direction !== "next") {
	                    slideString = (reverse) ? (slider.count + slider.cloneOffset) * dimension : 0;
	                } else if (slider.currentSlide === slider.last && target === 0 && slider.vars.animationLoop && slider.direction !== "prev") {
	                    slideString = (reverse) ? 0 : (slider.count + 1) * dimension;
	                } else {
	                    slideString = (reverse) ? ((slider.count - 1) - target + slider.cloneOffset) * dimension : (target + slider.cloneOffset) * dimension;
	                }
	                slider.setProps(slideString, "", slider.vars.animationSpeed);
	                if (slider.transitions) {
	                    if (!slider.vars.animationLoop || !slider.atEnd) {
	                        slider.animating = false;
	                        slider.currentSlide = slider.animatingTo;
	                    }

	                    // Unbind previous transitionEnd events and re-bind new transitionEnd event
	                    slider.container.unbind("webkitTransitionEnd transitionend");
	                    slider.container.bind("webkitTransitionEnd transitionend", function () {
	                        clearTimeout(slider.ensureAnimationEnd);
	                        slider.wrapup(dimension);
	                    });

	                    // Insurance for the ever-so-fickle transitionEnd event
	                    clearTimeout(slider.ensureAnimationEnd);
	                    slider.ensureAnimationEnd = setTimeout(function () {
	                        slider.wrapup(dimension);
	                    }, slider.vars.animationSpeed + 100);

	                } else {
	                    slider.container.animate(slider.args, slider.vars.animationSpeed, slider.vars.easing, function () {
	                        slider.wrapup(dimension);
	                    });
	                }
	            } else { // FADE:
	                if (!touch) {
	                    //slider.slides.eq(slider.currentSlide).fadeOut(slider.vars.animationSpeed, slider.vars.easing);
	                    //slider.slides.eq(target).fadeIn(slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);

	                    slider.slides.eq(slider.currentSlide).css({ "zIndex": 1 }).animate({ "opacity": 0 }, slider.vars.animationSpeed, slider.vars.easing);
	                    slider.slides.eq(target).css({ "zIndex": 2 }).animate({ "opacity": 1 }, slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);

	                } else {
	                    slider.slides.eq(slider.currentSlide).css({
	                        "opacity": 0,
	                        "zIndex": 1
	                    });
	                    slider.slides.eq(target).css({ "opacity": 1, "zIndex": 2 });
	                    slider.wrapup(dimension);
	                }
	            }
	            // SMOOTH HEIGHT:
	            if (slider.vars.smoothHeight) { methods.smoothHeight(slider.vars.animationSpeed) };
	        }
	    };
	    slider.wrapup = function (dimension) {
	        // SLIDE:
	        if (!fade && !carousel) {
	            if (slider.currentSlide === 0 && slider.animatingTo === slider.last && slider.vars.animationLoop) {
	                slider.setProps(dimension, "jumpEnd");
	            } else if (slider.currentSlide === slider.last && slider.animatingTo === 0 && slider.vars.animationLoop) {
	                slider.setProps(dimension, "jumpStart");
	            }
	        }
	        slider.animating = false;
	        slider.currentSlide = slider.animatingTo;
	        // API: after() animation Callback
	        slider.vars.after(slider);
	    };

	    // SLIDESHOW:
	    slider.animateSlides = function () {
	        if (!slider.animating && focused) { slider.flexAnimate(slider.getTarget("next")); }
	    };
	    // SLIDESHOW:
	    slider.pause = function () {
	        clearInterval(slider.animatedSlides);
	        slider.animatedSlides = null;
	        slider.playing = false;
	        // PAUSEPLAY:
	        if (slider.vars.pausePlay) { methods.pausePlay.update("play"); }
	        // SYNC:
	        if (slider.syncExists) { methods.sync("pause"); }
	    };
	    // SLIDESHOW:
	    slider.play = function () {
	        if (slider.playing) { clearInterval(slider.animatedSlides); }
	        slider.animatedSlides = slider.animatedSlides || setInterval(slider.animateSlides, slider.vars.slideshowSpeed);
	        slider.started = slider.playing = true;
	        // PAUSEPLAY:
	        if (slider.vars.pausePlay) { methods.pausePlay.update("pause"); }
	        // SYNC:
	        if (slider.syncExists) { methods.sync("play"); }
	    };
	    // STOP:
	    slider.stop = function () {
	        slider.pause();
	        slider.stopped = true;
	    };
	    slider.canAdvance = function (target, fromNav) {
	        // ASNAV:
	        var last = (asNav) ? slider.pagingCount - 1 : slider.last;
	        return (fromNav) ? true :
	            (asNav && slider.currentItem === slider.count - 1 && target === 0 && slider.direction === "prev") ? true :
	                (asNav && slider.currentItem === 0 && target === slider.pagingCount - 1 && slider.direction !== "next") ? false :
	                    (target === slider.currentSlide && !asNav) ? false :
	                        (slider.vars.animationLoop) ? true :
	                            (slider.atEnd && slider.currentSlide === 0 && target === last && slider.direction !== "next") ? false :
	                                (slider.atEnd && slider.currentSlide === last && target === 0 && slider.direction === "next") ? false :
	                                    true;
	    };
	    slider.getTarget = function (dir) {
	        slider.direction = dir;
	        if (dir === "next") {
	            return (slider.currentSlide === slider.last) ? 0 : slider.currentSlide + 1;
	        } else {
	            return (slider.currentSlide === 0) ? slider.last : slider.currentSlide - 1;
	        }
	    };

	    // SLIDE:
	    slider.setProps = function (pos, special, dur) {
	        var target = (function () {
	            var posCheck = (pos) ? pos : ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo,
	                posCalc = (function () {
	                    if (carousel) {
	                        return (special === "setTouch") ? pos :
	                            (reverse && slider.animatingTo === slider.last) ? 0 :
	                                (reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
	                                    (slider.animatingTo === slider.last) ? slider.limit : posCheck;
	                    } else {
	                        switch (special) {
	                            case "setTotal":
	                                return (reverse) ? ((slider.count - 1) - slider.currentSlide + slider.cloneOffset) * pos : (slider.currentSlide + slider.cloneOffset) * pos;
	                            case "setTouch":
	                                return (reverse) ? pos : pos;
	                            case "jumpEnd":
	                                return (reverse) ? pos : slider.count * pos;
	                            case "jumpStart":
	                                return (reverse) ? slider.count * pos : pos;
	                            default:
	                                return pos;
	                        }
	                    }
	                }());

	            return (posCalc * -1) + "px";
	        }());

	        if (slider.transitions) {
	            target = (vertical) ? "translate3d(0," + target + ",0)" : "translate3d(" + target + ",0,0)";
	            dur = (dur !== undefined) ? (dur / 1000) + "s" : "0s";
	            slider.container.css("-" + slider.pfx + "-transition-duration", dur);
	            slider.container.css("transition-duration", dur);
	        }

	        slider.args[slider.prop] = target;
	        if (slider.transitions || dur === undefined) { slider.container.css(slider.args); }

	        slider.container.css('transform', target);
	    };

	    slider.setup = function (type) {
	        // SLIDE:
	        if (!fade) {
	            var sliderOffset, arr;

	            if (type === "init") {
	                slider.viewport = $('<div class="' + namespace + 'viewport"></div>').css({
	                    "overflow": "hidden",
	                    "position": "relative"
	                }).appendTo(slider).append(slider.container);
	                // INFINITE LOOP:
	                slider.cloneCount = 0;
	                slider.cloneOffset = 0;
	                // REVERSE:
	                if (reverse) {
	                    arr = $.makeArray(slider.slides).reverse();
	                    slider.slides = $(arr);
	                    slider.container.empty().append(slider.slides);
	                }
	            }
	            // INFINITE LOOP && !CAROUSEL:
	            if (slider.vars.animationLoop && !carousel) {
	                slider.cloneCount = 2;
	                slider.cloneOffset = 1;
	                // clear out old clones
	                if (type !== "init") { slider.container.find('.clone').remove(); }
	                slider.container.append(methods.uniqueID(slider.slides.first().clone().addClass('clone')).attr('aria-hidden', 'true'))
	                    .prepend(methods.uniqueID(slider.slides.last().clone().addClass('clone')).attr('aria-hidden', 'true'));
	            }
	            slider.newSlides = $(slider.vars.selector, slider);

	            sliderOffset = (reverse) ? slider.count - 1 - slider.currentSlide + slider.cloneOffset : slider.currentSlide + slider.cloneOffset;
	            // VERTICAL:
	            if (vertical && !carousel) {
	                slider.container.height((slider.count + slider.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
	                setTimeout(function () {
	                    slider.newSlides.css({ "display": "block" });
	                    slider.doMath();
	                    slider.viewport.height(slider.h);
	                    slider.setProps(sliderOffset * slider.h, "init");
	                }, (type === "init") ? 100 : 0);
	            } else {
	                slider.container.width((slider.count + slider.cloneCount) * 200 + "%");
	                slider.setProps(sliderOffset * slider.computedW, "init");
	                setTimeout(function () {
	                    slider.doMath();
	                    slider.newSlides.css({ "width": slider.computedW, "marginRight": slider.computedM, "float": "left", "display": "block" });

	                    // SMOOTH HEIGHT:
	                    if (slider.vars.smoothHeight) { methods.smoothHeight(); }
	                }, (type === "init") ? 100 : 0);
	            }
	        } else { // FADE:
	            slider.slides.css({
	                "width": "100%",
	                "float": "left",
	                "marginRight": "-100%",
	                "position": "relative"
	            });
	            if (type === "init") {
	                if (!touch) {
	                    //slider.slides.eq(slider.currentSlide).fadeIn(slider.vars.animationSpeed, slider.vars.easing);
	                    if (slider.vars.fadeFirstSlide == false) {
	                        slider.slides.css({ "opacity": 0, "display": "block", "zIndex": 1 }).eq(slider.currentSlide).css({ "zIndex": 2 }).css({ "opacity": 1 });
	                    } else {
	                        slider.slides.css({ "opacity": 0, "display": "block", "zIndex": 1 }).eq(slider.currentSlide).css({ "zIndex": 2 }).animate({ "opacity": 1 }, slider.vars.animationSpeed, slider.vars.easing);
	                    }
	                } else {
	                    slider.slides.css({ "opacity": 0, "display": "block", "webkitTransition": "opacity " + slider.vars.animationSpeed / 1000 + "s ease", "zIndex": 1 }).eq(slider.currentSlide).css({ "opacity": 1, "zIndex": 2 });
	                }
	            }
	            // SMOOTH HEIGHT:
	            if (slider.vars.smoothHeight) { methods.smoothHeight(); }
	        }
	        // !CAROUSEL:
	        // CANDIDATE: active slide
	        if (!carousel) { slider.slides.removeClass(namespace + "active-slide").eq(slider.currentSlide).addClass(namespace + "active-slide"); }

	        //FlexSlider: init() Callback
	        slider.vars.init(slider);
	    };

	    slider.doMath = function () {
	        var slide = slider.slides.first(),
	            slideMargin = slider.vars.itemMargin,
	            minItems = slider.vars.minItems,
	            maxItems = slider.vars.maxItems;

	        slider.w = (slider.viewport === undefined) ? slider.width() : slider.viewport.width();
	        slider.h = slide.height();
	        slider.boxPadding = slide.outerWidth() - slide.width();

	        // CAROUSEL:
	        if (carousel) {
	            slider.itemT = slider.vars.itemWidth + slideMargin;
	            slider.itemM = slideMargin;
	            slider.minW = (minItems) ? minItems * slider.itemT : slider.w;
	            slider.maxW = (maxItems) ? (maxItems * slider.itemT) - slideMargin : slider.w;
	            slider.itemW = (slider.minW > slider.w) ? (slider.w - (slideMargin * (minItems - 1))) / minItems :
	                (slider.maxW < slider.w) ? (slider.w - (slideMargin * (maxItems - 1))) / maxItems :
	                    (slider.vars.itemWidth > slider.w) ? slider.w : slider.vars.itemWidth;

	            slider.visible = Math.floor(slider.w / (slider.itemW));
	            slider.move = (slider.vars.move > 0 && slider.vars.move < slider.visible) ? slider.vars.move : slider.visible;
	            slider.pagingCount = Math.ceil(((slider.count - slider.visible) / slider.move) + 1);
	            slider.last = slider.pagingCount - 1;
	            slider.limit = (slider.pagingCount === 1) ? 0 :
	                (slider.vars.itemWidth > slider.w) ? (slider.itemW * (slider.count - 1)) + (slideMargin * (slider.count - 1)) : ((slider.itemW + slideMargin) * slider.count) - slider.w - slideMargin;
	        } else {
	            slider.itemW = slider.w;
	            slider.itemM = slideMargin;
	            slider.pagingCount = slider.count;
	            slider.last = slider.count - 1;
	        }
	        slider.computedW = slider.itemW - slider.boxPadding;
	        slider.computedM = slider.itemM;
	    };

	    slider.update = function (pos, action) {
	        slider.doMath();

	        // update currentSlide and slider.animatingTo if necessary
	        if (!carousel) {
	            if (pos < slider.currentSlide) {
	                slider.currentSlide += 1;
	            } else if (pos <= slider.currentSlide && pos !== 0) {
	                slider.currentSlide -= 1;
	            }
	            slider.animatingTo = slider.currentSlide;
	        }

	        // update controlNav
	        if (slider.vars.controlNav && !slider.manualControls) {
	            if ((action === "add" && !carousel) || slider.pagingCount > slider.controlNav.length) {
	                methods.controlNav.update("add");
	            } else if ((action === "remove" && !carousel) || slider.pagingCount < slider.controlNav.length) {
	                if (carousel && slider.currentSlide > slider.last) {
	                    slider.currentSlide -= 1;
	                    slider.animatingTo -= 1;
	                }
	                methods.controlNav.update("remove", slider.last);
	            }
	        }
	        // update directionNav
	        if (slider.vars.directionNav) { methods.directionNav.update(); }

	    };

	    slider.addSlide = function (obj, pos) {
	        var $obj = $(obj);

	        slider.count += 1;
	        slider.last = slider.count - 1;

	        // append new slide
	        if (vertical && reverse) {
	            (pos !== undefined) ? slider.slides.eq(slider.count - pos).after($obj) : slider.container.prepend($obj);
	        } else {
	            (pos !== undefined) ? slider.slides.eq(pos).before($obj) : slider.container.append($obj);
	        }

	        // update currentSlide, animatingTo, controlNav, and directionNav
	        slider.update(pos, "add");

	        // update slider.slides
	        slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
	        // re-setup the slider to accomdate new slide
	        slider.setup();

	        //FlexSlider: added() Callback
	        slider.vars.added(slider);
	    };
	    slider.removeSlide = function (obj) {
	        var pos = (isNaN(obj)) ? slider.slides.index($(obj)) : obj;

	        // update count
	        slider.count -= 1;
	        slider.last = slider.count - 1;

	        // remove slide
	        if (isNaN(obj)) {
	            $(obj, slider.slides).remove();
	        } else {
	            (vertical && reverse) ? slider.slides.eq(slider.last).remove() : slider.slides.eq(obj).remove();
	        }

	        // update currentSlide, animatingTo, controlNav, and directionNav
	        slider.doMath();
	        slider.update(pos, "remove");

	        // update slider.slides
	        slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
	        // re-setup the slider to accomdate new slide
	        slider.setup();

	        // FlexSlider: removed() Callback
	        slider.vars.removed(slider);
	    };

	    //FlexSlider: Initialize
	    methods.init();
	};

	// Ensure the slider isn't focussed if the window loses focus.
	$(window).blur(function (e) {
	    focused = false;
	}).focus(function (e) {
	    focused = true;
	});

	// FlexSlider: Default Settings
	$.flexslider.defaults = {
	    namespace: UI.namespace.class,             // {NEW} String: Prefix string attached to the class of every element generated by the plugin
	    selector: '.' + UI.namespace.class + 'slides > li',       // {NEW} Selector: Must match a simple pattern. '{container} > {slide}' -- Ignore pattern at your own peril
	    animation: 'slide',              // String: Select your animation type, 'fade' or 'slide'
	    easing: 'swing',                // {NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
	    direction: 'horizontal',        // String: Select the sliding direction, "horizontal" or "vertical"
	    reverse: false,                 // {NEW} Boolean: Reverse the animation direction
	    animationLoop: true,            // Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
	    smoothHeight: false,            // {NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
	    startAt: 0,                     // Integer: The slide that the slider should start on. Array notation (0 = first slide)
	    slideshow: true,                // Boolean: Animate slider automatically
	    slideshowSpeed: 5000,           // Integer: Set the speed of the slideshow cycling, in milliseconds
	    animationSpeed: 600,            // Integer: Set the speed of animations, in milliseconds
	    initDelay: 0,                   // {NEW} Integer: Set an initialization delay, in milliseconds
	    randomize: false,               // Boolean: Randomize slide order
	    fadeFirstSlide: true,           // Boolean: Fade in the first slide when animation type is "fade"
	    thumbCaptions: false,           // Boolean: Whether or not to put captions on thumbnails when using the "thumbnails" controlNav.

	    // Usability features
	    pauseOnAction: true,            // Boolean: Pause the slideshow when interacting with control elements, highly recommended.
	    pauseOnHover: false,            // Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
	    pauseInvisible: true,   		// {NEW} Boolean: Pause the slideshow when tab is invisible, resume when visible. Provides better UX, lower CPU usage.
	    useCSS: true,                   // {NEW} Boolean: Slider will use CSS3 transitions if available
	    touch: true,                    // {NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
	    video: false,                   // {NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches

	    // Primary Controls
	    controlNav: true,               // Boolean: Create navigation for paging control of each slide? Note: Leave true for manualControls usage
	    directionNav: true,             // Boolean: Create navigation for previous/next navigation? (true/false)
	    prevText: ' ',           // String: Set the text for the "previous" directionNav item
	    nextText: ' ',               // String: Set the text for the "next" directionNav item

	    // Secondary Navigation
	    keyboard: true,                 // Boolean: Allow slider navigating via keyboard left/right keys
	    multipleKeyboard: false,        // {NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
	    mousewheel: false,              // {UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
	    pausePlay: false,               // Boolean: Create pause/play dynamic element
	    pauseText: 'Pause',             // String: Set the text for the 'pause' pausePlay item
	    playText: 'Play',               // String: Set the text for the 'play' pausePlay item

	    //  Special properties
	    controlsContainer: '',          // {UPDATED} jQuery Object/Selector: Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be $('.flexslider-container'). Property is ignored if given element is not found.
	    manualControls: '',             // {UPDATED} jQuery Object/Selector: Declare custom control navigation. Examples would be $(".flex-control-nav li") or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
	    customDirectionNav: '',         // {NEW} jQuery Object/Selector: Custom prev / next button. Must be two jQuery elements. In order to make the events work they have to have the classes "prev" and "next" (plus namespace)
	    sync: '',                       // {NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
	    asNavFor: '',                   // {NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider

	    // Carousel Options
	    itemWidth: 0,                   // {NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
	    itemMargin: 0,                  // {NEW} Integer: Margin between carousel items.
	    minItems: 1,                    // {NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
	    maxItems: 0,                    // {NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
	    move: 0,                        // {NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
	    allowOneSlide: true,           // {NEW} Boolean: Whether or not to allow a slider comprised of a single slide

	    // Callback API
	    start: function () {
	    },            // Callback: function(slider) - Fires when the slider loads the first slide
	    before: function () {
	    },           // Callback: function(slider) - Fires asynchronously with each slider animation
	    after: function () {
	    },            // Callback: function(slider) - Fires after each slider animation completes
	    end: function () {
	    },              // Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
	    added: function () {
	    },            // {NEW} Callback: function(slider) - Fires after a slide is added
	    removed: function () {
	    },           // {NEW} Callback: function(slider) - Fires after a slide is removed
	    init: function () {
	    }             // {NEW} Callback: function(slider) - Fires after the slider is initially setup
	};

	// FlexSlider: Plugin Function
	$.fn.flexslider = function (options) {
	    var args = Array.prototype.slice.call(arguments, 1);
	    if (options === undefined) { options = {}; }

	    if (typeof options === 'object') {
	        return this.each(function () {
	            var $this = $(this);
	            var selector = (options.selector) ? options.selector : '.' + UI.namespace.class + 'slides > li';
	            var $slides = $this.find(selector);

	            if (($slides.length === 1 && options.allowOneSlide === false) || $slides.length === 0) {
	                $slides.fadeIn(400);
	                if (options.start) { options.start($this); }
	            } else if ($this.data('flexslider') === undefined) {
	                new $.flexslider(this, options);
	            }
	        });
	    } else {
	        // Helper strings to quickly pecdrform functions on the slider
	        var $slider = $(this).data('flexslider');
	        var methodReturn;
	        switch (options) {
	            case 'next':
	                $slider.flexAnimate($slider.getTarget('next'), true);
	                break;
	            case 'prev':
	            case 'previous':
	                $slider.flexAnimate($slider.getTarget('prev'), true);
	                break;
	            default:
	                if (typeof options === 'number') {
	                    $slider.flexAnimate(options, true);
	                } else if (typeof options === 'string') {
	                    methodReturn = (typeof $slider[options] === 'function') ?
	                        $slider[options].apply($slider, args) : $slider[options];
	                }
	        }

	        return methodReturn === undefined ? this : methodReturn;
	    }
	};
	var data_flexslider = '[data-' + UI.namespace.class + 'flexslider]'
	var data_api = UI.namespace.UI+ "Flexslider"; //amFlexslider
	// Init code
	UI.ready(function (context) {
	    $(data_flexslider, context).each(function (i, item) {
	        var $slider = $(item);
	        var options = UI.utils.parseOptions($slider.data(data_api));

	        options.before = function (slider) {
	            if (slider._pausedTimer) {
	                window.clearTimeout(slider._pausedTimer);
	                slider._pausedTimer = null;
	            }
	        };

	        options.after = function (slider) {
	            var pauseTime = slider.vars.playAfterPaused;
	            if (pauseTime && !isNaN(pauseTime) && !slider.playing) {
	                if (!slider.manualPause && !slider.manualPlay && !slider.stopped) {
	                    slider._pausedTimer = window.setTimeout(function () {
	                        slider.play();
	                    }, pauseTime);
	                }
	            }
	        };

	        $slider.flexslider(options);
	    });
	});

	module.exports = $.flexslider;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9).setImmediate))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var apply = Function.prototype.apply;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) {
	  if (timeout) {
	    timeout.close();
	  }
	};

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// setimmediate attaches itself to the global object
	__webpack_require__(10);
	exports.setImmediate = setImmediate;
	exports.clearImmediate = clearImmediate;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
	    "use strict";

	    if (global.setImmediate) {
	        return;
	    }

	    var nextHandle = 1; // Spec says greater than zero
	    var tasksByHandle = {};
	    var currentlyRunningATask = false;
	    var doc = global.document;
	    var registerImmediate;

	    function setImmediate(callback) {
	      // Callback can either be a function or a string
	      if (typeof callback !== "function") {
	        callback = new Function("" + callback);
	      }
	      // Copy function arguments
	      var args = new Array(arguments.length - 1);
	      for (var i = 0; i < args.length; i++) {
	          args[i] = arguments[i + 1];
	      }
	      // Store and register the task
	      var task = { callback: callback, args: args };
	      tasksByHandle[nextHandle] = task;
	      registerImmediate(nextHandle);
	      return nextHandle++;
	    }

	    function clearImmediate(handle) {
	        delete tasksByHandle[handle];
	    }

	    function run(task) {
	        var callback = task.callback;
	        var args = task.args;
	        switch (args.length) {
	        case 0:
	            callback();
	            break;
	        case 1:
	            callback(args[0]);
	            break;
	        case 2:
	            callback(args[0], args[1]);
	            break;
	        case 3:
	            callback(args[0], args[1], args[2]);
	            break;
	        default:
	            callback.apply(undefined, args);
	            break;
	        }
	    }

	    function runIfPresent(handle) {
	        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
	        // So if we're currently running a task, we'll need to delay this invocation.
	        if (currentlyRunningATask) {
	            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
	            // "too much recursion" error.
	            setTimeout(runIfPresent, 0, handle);
	        } else {
	            var task = tasksByHandle[handle];
	            if (task) {
	                currentlyRunningATask = true;
	                try {
	                    run(task);
	                } finally {
	                    clearImmediate(handle);
	                    currentlyRunningATask = false;
	                }
	            }
	        }
	    }

	    function installNextTickImplementation() {
	        registerImmediate = function(handle) {
	            process.nextTick(function () { runIfPresent(handle); });
	        };
	    }

	    function canUsePostMessage() {
	        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
	        // where `global.postMessage` means something completely different and can't be used for this purpose.
	        if (global.postMessage && !global.importScripts) {
	            var postMessageIsAsynchronous = true;
	            var oldOnMessage = global.onmessage;
	            global.onmessage = function() {
	                postMessageIsAsynchronous = false;
	            };
	            global.postMessage("", "*");
	            global.onmessage = oldOnMessage;
	            return postMessageIsAsynchronous;
	        }
	    }

	    function installPostMessageImplementation() {
	        // Installs an event handler on `global` for the `message` event: see
	        // * https://developer.mozilla.org/en/DOM/window.postMessage
	        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

	        var messagePrefix = "setImmediate$" + Math.random() + "$";
	        var onGlobalMessage = function(event) {
	            if (event.source === global &&
	                typeof event.data === "string" &&
	                event.data.indexOf(messagePrefix) === 0) {
	                runIfPresent(+event.data.slice(messagePrefix.length));
	            }
	        };

	        if (global.addEventListener) {
	            global.addEventListener("message", onGlobalMessage, false);
	        } else {
	            global.attachEvent("onmessage", onGlobalMessage);
	        }

	        registerImmediate = function(handle) {
	            global.postMessage(messagePrefix + handle, "*");
	        };
	    }

	    function installMessageChannelImplementation() {
	        var channel = new MessageChannel();
	        channel.port1.onmessage = function(event) {
	            var handle = event.data;
	            runIfPresent(handle);
	        };

	        registerImmediate = function(handle) {
	            channel.port2.postMessage(handle);
	        };
	    }

	    function installReadyStateChangeImplementation() {
	        var html = doc.documentElement;
	        registerImmediate = function(handle) {
	            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	            var script = doc.createElement("script");
	            script.onreadystatechange = function () {
	                runIfPresent(handle);
	                script.onreadystatechange = null;
	                html.removeChild(script);
	                script = null;
	            };
	            html.appendChild(script);
	        };
	    }

	    function installSetTimeoutImplementation() {
	        registerImmediate = function(handle) {
	            setTimeout(runIfPresent, 0, handle);
	        };
	    }

	    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
	    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
	    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

	    // Don't get fooled by e.g. browserify environments.
	    if ({}.toString.call(global.process) === "[object process]") {
	        // For Node.js before 0.9
	        installNextTickImplementation();

	    } else if (canUsePostMessage()) {
	        // For non-IE10 modern browsers
	        installPostMessageImplementation();

	    } else if (global.MessageChannel) {
	        // For web workers, where supported
	        installMessageChannelImplementation();

	    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
	        // For IE 6–8
	        installReadyStateChangeImplementation();

	    } else {
	        // For older browsers
	        installSetTimeoutImplementation();
	    }

	    attachTo.setImmediate = setImmediate;
	    attachTo.clearImmediate = clearImmediate;
	}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(11)))

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	/*! Hammer.JS - v2.0.8 - 2016-04-22
	 * http://hammerjs.github.io/
	 *
	 * Copyright (c) 2016 Jorik Tangelder;
	 * Licensed under the MIT license */

	'use strict';

	var $ = __webpack_require__(1);
	var UI = __webpack_require__(2);

	var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
	var TEST_ELEMENT = document.createElement('div');

	var TYPE_FUNCTION = 'function';

	var round = Math.round;
	var abs = Math.abs;
	var now = Date.now;

	/**
	 * set a timeout with a given scope
	 * @param {Function} fn
	 * @param {Number} timeout
	 * @param {Object} context
	 * @returns {number}
	 */
	function setTimeoutContext(fn, timeout, context) {
	  return setTimeout(bindFn(fn, context), timeout);
	}

	/**
	 * if the argument is an array, we want to execute the fn on each entry
	 * if it aint an array we don't want to do a thing.
	 * this is used by all the methods that accept a single and array argument.
	 * @param {*|Array} arg
	 * @param {String} fn
	 * @param {Object} [context]
	 * @returns {Boolean}
	 */
	function invokeArrayArg(arg, fn, context) {
	  if (Array.isArray(arg)) {
	    each(arg, context[fn], context);
	    return true;
	  }
	  return false;
	}

	/**
	 * walk objects and arrays
	 * @param {Object} obj
	 * @param {Function} iterator
	 * @param {Object} context
	 */
	function each(obj, iterator, context) {
	  var i;

	  if (!obj) {
	    return;
	  }

	  if (obj.forEach) {
	    obj.forEach(iterator, context);
	  } else if (obj.length !== undefined) {
	    i = 0;
	    while (i < obj.length) {
	      iterator.call(context, obj[i], i, obj);
	      i++;
	    }
	  } else {
	    for (i in obj) {
	      obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
	    }
	  }
	}

	/**
	 * wrap a method with a deprecation warning and stack trace
	 * @param {Function} method
	 * @param {String} name
	 * @param {String} message
	 * @returns {Function} A new function wrapping the supplied method.
	 */
	function deprecate(method, name, message) {
	  var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
	  return function() {
	    var e = new Error('get-stack-trace');
	    var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
	      .replace(/^\s+at\s+/gm, '')
	      .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

	    var log = window.console && (window.console.warn || window.console.log);
	    if (log) {
	      log.call(window.console, deprecationMessage, stack);
	    }
	    return method.apply(this, arguments);
	  };
	}

	/**
	 * extend object.
	 * means that properties in dest will be overwritten by the ones in src.
	 * @param {Object} target
	 * @param {...Object} objects_to_assign
	 * @returns {Object} target
	 */
	var assign;
	if (typeof Object.assign !== 'function') {
	  assign = function assign(target) {
	    if (target === undefined || target === null) {
	      throw new TypeError('Cannot convert undefined or null to object');
	    }

	    var output = Object(target);
	    for (var index = 1; index < arguments.length; index++) {
	      var source = arguments[index];
	      if (source !== undefined && source !== null) {
	        for (var nextKey in source) {
	          if (source.hasOwnProperty(nextKey)) {
	            output[nextKey] = source[nextKey];
	          }
	        }
	      }
	    }
	    return output;
	  };
	} else {
	  assign = Object.assign;
	}

	/**
	 * extend object.
	 * means that properties in dest will be overwritten by the ones in src.
	 * @param {Object} dest
	 * @param {Object} src
	 * @param {Boolean} [merge=false]
	 * @returns {Object} dest
	 */
	var extend = deprecate(function extend(dest, src, merge) {
	  var keys = Object.keys(src);
	  var i = 0;
	  while (i < keys.length) {
	    if (!merge || (merge && dest[keys[i]] === undefined)) {
	      dest[keys[i]] = src[keys[i]];
	    }
	    i++;
	  }
	  return dest;
	}, 'extend', 'Use `assign`.');

	/**
	 * merge the values from src in the dest.
	 * means that properties that exist in dest will not be overwritten by src
	 * @param {Object} dest
	 * @param {Object} src
	 * @returns {Object} dest
	 */
	var merge = deprecate(function merge(dest, src) {
	  return extend(dest, src, true);
	}, 'merge', 'Use `assign`.');

	/**
	 * simple class inheritance
	 * @param {Function} child
	 * @param {Function} base
	 * @param {Object} [properties]
	 */
	function inherit(child, base, properties) {
	  var baseP = base.prototype,
	    childP;

	  childP = child.prototype = Object.create(baseP);
	  childP.constructor = child;
	  childP._super = baseP;

	  if (properties) {
	    assign(childP, properties);
	  }
	}

	/**
	 * simple function bind
	 * @param {Function} fn
	 * @param {Object} context
	 * @returns {Function}
	 */
	function bindFn(fn, context) {
	  return function boundFn() {
	    return fn.apply(context, arguments);
	  };
	}

	/**
	 * let a boolean value also be a function that must return a boolean
	 * this first item in args will be used as the context
	 * @param {Boolean|Function} val
	 * @param {Array} [args]
	 * @returns {Boolean}
	 */
	function boolOrFn(val, args) {
	  if (typeof val == TYPE_FUNCTION) {
	    return val.apply(args ? args[0] || undefined : undefined, args);
	  }
	  return val;
	}

	/**
	 * use the val2 when val1 is undefined
	 * @param {*} val1
	 * @param {*} val2
	 * @returns {*}
	 */
	function ifUndefined(val1, val2) {
	  return (val1 === undefined) ? val2 : val1;
	}

	/**
	 * addEventListener with multiple events at once
	 * @param {EventTarget} target
	 * @param {String} types
	 * @param {Function} handler
	 */
	function addEventListeners(target, types, handler) {
	  each(splitStr(types), function(type) {
	    target.addEventListener(type, handler, false);
	  });
	}

	/**
	 * removeEventListener with multiple events at once
	 * @param {EventTarget} target
	 * @param {String} types
	 * @param {Function} handler
	 */
	function removeEventListeners(target, types, handler) {
	  each(splitStr(types), function(type) {
	    target.removeEventListener(type, handler, false);
	  });
	}

	/**
	 * find if a node is in the given parent
	 * @method hasParent
	 * @param {HTMLElement} node
	 * @param {HTMLElement} parent
	 * @return {Boolean} found
	 */
	function hasParent(node, parent) {
	  while (node) {
	    if (node == parent) {
	      return true;
	    }
	    node = node.parentNode;
	  }
	  return false;
	}

	/**
	 * small indexOf wrapper
	 * @param {String} str
	 * @param {String} find
	 * @returns {Boolean} found
	 */
	function inStr(str, find) {
	  return str.indexOf(find) > -1;
	}

	/**
	 * split string on whitespace
	 * @param {String} str
	 * @returns {Array} words
	 */
	function splitStr(str) {
	  return str.trim().split(/\s+/g);
	}

	/**
	 * find if a array contains the object using indexOf or a simple polyFill
	 * @param {Array} src
	 * @param {String} find
	 * @param {String} [findByKey]
	 * @return {Boolean|Number} false when not found, or the index
	 */
	function inArray(src, find, findByKey) {
	  if (src.indexOf && !findByKey) {
	    return src.indexOf(find);
	  } else {
	    var i = 0;
	    while (i < src.length) {
	      if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
	        return i;
	      }
	      i++;
	    }
	    return -1;
	  }
	}

	/**
	 * convert array-like objects to real arrays
	 * @param {Object} obj
	 * @returns {Array}
	 */
	function toArray(obj) {
	  return Array.prototype.slice.call(obj, 0);
	}

	/**
	 * unique array with objects based on a key (like 'id') or just by the array's value
	 * @param {Array} src [{id:1},{id:2},{id:1}]
	 * @param {String} [key]
	 * @param {Boolean} [sort=False]
	 * @returns {Array} [{id:1},{id:2}]
	 */
	function uniqueArray(src, key, sort) {
	  var results = [];
	  var values = [];
	  var i = 0;

	  while (i < src.length) {
	    var val = key ? src[i][key] : src[i];
	    if (inArray(values, val) < 0) {
	      results.push(src[i]);
	    }
	    values[i] = val;
	    i++;
	  }

	  if (sort) {
	    if (!key) {
	      results = results.sort();
	    } else {
	      results = results.sort(function sortUniqueArray(a, b) {
	        return a[key] > b[key];
	      });
	    }
	  }

	  return results;
	}

	/**
	 * get the prefixed property
	 * @param {Object} obj
	 * @param {String} property
	 * @returns {String|Undefined} prefixed
	 */
	function prefixed(obj, property) {
	  var prefix, prop;
	  var camelProp = property[0].toUpperCase() + property.slice(1);

	  var i = 0;
	  while (i < VENDOR_PREFIXES.length) {
	    prefix = VENDOR_PREFIXES[i];
	    prop = (prefix) ? prefix + camelProp : property;

	    if (prop in obj) {
	      return prop;
	    }
	    i++;
	  }
	  return undefined;
	}

	/**
	 * get a unique id
	 * @returns {number} uniqueId
	 */
	var _uniqueId = 1;
	function uniqueId() {
	  return _uniqueId++;
	}

	/**
	 * get the window object of an element
	 * @param {HTMLElement} element
	 * @returns {DocumentView|Window}
	 */
	function getWindowForElement(element) {
	  var doc = element.ownerDocument || element;
	  return (doc.defaultView || doc.parentWindow || window);
	}

	var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

	var SUPPORT_TOUCH = ('ontouchstart' in window);
	var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
	var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

	var INPUT_TYPE_TOUCH = 'touch';
	var INPUT_TYPE_PEN = 'pen';
	var INPUT_TYPE_MOUSE = 'mouse';
	var INPUT_TYPE_KINECT = 'kinect';

	var COMPUTE_INTERVAL = 25;

	var INPUT_START = 1;
	var INPUT_MOVE = 2;
	var INPUT_END = 4;
	var INPUT_CANCEL = 8;

	var DIRECTION_NONE = 1;
	var DIRECTION_LEFT = 2;
	var DIRECTION_RIGHT = 4;
	var DIRECTION_UP = 8;
	var DIRECTION_DOWN = 16;

	var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
	var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
	var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

	var PROPS_XY = ['x', 'y'];
	var PROPS_CLIENT_XY = ['clientX', 'clientY'];

	/**
	 * create new input type manager
	 * @param {Manager} manager
	 * @param {Function} callback
	 * @returns {Input}
	 * @constructor
	 */
	function Input(manager, callback) {
	  var self = this;
	  this.manager = manager;
	  this.callback = callback;
	  this.element = manager.element;
	  this.target = manager.options.inputTarget;

	  // smaller wrapper around the handler, for the scope and the enabled state of the manager,
	  // so when disabled the input events are completely bypassed.
	  this.domHandler = function(ev) {
	    if (boolOrFn(manager.options.enable, [manager])) {
	      self.handler(ev);
	    }
	  };

	  this.init();

	}

	Input.prototype = {
	  /**
	   * should handle the inputEvent data and trigger the callback
	   * @virtual
	   */
	  handler: function() { },

	  /**
	   * bind the events
	   */
	  init: function() {
	    this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
	    this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
	    this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	  },

	  /**
	   * unbind the events
	   */
	  destroy: function() {
	    this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
	    this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
	    this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	  }
	};

	/**
	 * create new input type manager
	 * called by the Manager constructor
	 * @param {Hammer} manager
	 * @returns {Input}
	 */
	function createInputInstance(manager) {
	  var Type;
	  var inputClass = manager.options.inputClass;

	  if (inputClass) {
	    Type = inputClass;
	  } else if (SUPPORT_POINTER_EVENTS) {
	    Type = PointerEventInput;
	  } else if (SUPPORT_ONLY_TOUCH) {
	    Type = TouchInput;
	  } else if (!SUPPORT_TOUCH) {
	    Type = MouseInput;
	  } else {
	    Type = TouchMouseInput;
	  }
	  return new (Type)(manager, inputHandler);
	}

	/**
	 * handle input events
	 * @param {Manager} manager
	 * @param {String} eventType
	 * @param {Object} input
	 */
	function inputHandler(manager, eventType, input) {
	  var pointersLen = input.pointers.length;
	  var changedPointersLen = input.changedPointers.length;
	  var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
	  var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

	  input.isFirst = !!isFirst;
	  input.isFinal = !!isFinal;

	  if (isFirst) {
	    manager.session = {};
	  }

	  // source event is the normalized value of the domEvents
	  // like 'touchstart, mouseup, pointerdown'
	  input.eventType = eventType;

	  // compute scale, rotation etc
	  computeInputData(manager, input);

	  // emit secret event
	  manager.emit('hammer.input', input);

	  manager.recognize(input);
	  manager.session.prevInput = input;
	}

	/**
	 * extend the data with some usable properties like scale, rotate, velocity etc
	 * @param {Object} manager
	 * @param {Object} input
	 */
	function computeInputData(manager, input) {
	  var session = manager.session;
	  var pointers = input.pointers;
	  var pointersLength = pointers.length;

	  // store the first input to calculate the distance and direction
	  if (!session.firstInput) {
	    session.firstInput = simpleCloneInputData(input);
	  }

	  // to compute scale and rotation we need to store the multiple touches
	  if (pointersLength > 1 && !session.firstMultiple) {
	    session.firstMultiple = simpleCloneInputData(input);
	  } else if (pointersLength === 1) {
	    session.firstMultiple = false;
	  }

	  var firstInput = session.firstInput;
	  var firstMultiple = session.firstMultiple;
	  var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

	  var center = input.center = getCenter(pointers);
	  input.timeStamp = now();
	  input.deltaTime = input.timeStamp - firstInput.timeStamp;

	  input.angle = getAngle(offsetCenter, center);
	  input.distance = getDistance(offsetCenter, center);

	  computeDeltaXY(session, input);
	  input.offsetDirection = getDirection(input.deltaX, input.deltaY);

	  var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
	  input.overallVelocityX = overallVelocity.x;
	  input.overallVelocityY = overallVelocity.y;
	  input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;

	  input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
	  input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

	  input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
	  session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);

	  computeIntervalInputData(session, input);

	  // find the correct target
	  var target = manager.element;
	  if (hasParent(input.srcEvent.target, target)) {
	    target = input.srcEvent.target;
	  }
	  input.target = target;
	}

	function computeDeltaXY(session, input) {
	  var center = input.center;
	  var offset = session.offsetDelta || {};
	  var prevDelta = session.prevDelta || {};
	  var prevInput = session.prevInput || {};

	  if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
	    prevDelta = session.prevDelta = {
	      x: prevInput.deltaX || 0,
	      y: prevInput.deltaY || 0
	    };

	    offset = session.offsetDelta = {
	      x: center.x,
	      y: center.y
	    };
	  }

	  input.deltaX = prevDelta.x + (center.x - offset.x);
	  input.deltaY = prevDelta.y + (center.y - offset.y);
	}

	/**
	 * velocity is calculated every x ms
	 * @param {Object} session
	 * @param {Object} input
	 */
	function computeIntervalInputData(session, input) {
	  var last = session.lastInterval || input,
	    deltaTime = input.timeStamp - last.timeStamp,
	    velocity, velocityX, velocityY, direction;

	  if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
	    var deltaX = input.deltaX - last.deltaX;
	    var deltaY = input.deltaY - last.deltaY;

	    var v = getVelocity(deltaTime, deltaX, deltaY);
	    velocityX = v.x;
	    velocityY = v.y;
	    velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
	    direction = getDirection(deltaX, deltaY);

	    session.lastInterval = input;
	  } else {
	    // use latest velocity info if it doesn't overtake a minimum period
	    velocity = last.velocity;
	    velocityX = last.velocityX;
	    velocityY = last.velocityY;
	    direction = last.direction;
	  }

	  input.velocity = velocity;
	  input.velocityX = velocityX;
	  input.velocityY = velocityY;
	  input.direction = direction;
	}

	/**
	 * create a simple clone from the input used for storage of firstInput and firstMultiple
	 * @param {Object} input
	 * @returns {Object} clonedInputData
	 */
	function simpleCloneInputData(input) {
	  // make a simple copy of the pointers because we will get a reference if we don't
	  // we only need clientXY for the calculations
	  var pointers = [];
	  var i = 0;
	  while (i < input.pointers.length) {
	    pointers[i] = {
	      clientX: round(input.pointers[i].clientX),
	      clientY: round(input.pointers[i].clientY)
	    };
	    i++;
	  }

	  return {
	    timeStamp: now(),
	    pointers: pointers,
	    center: getCenter(pointers),
	    deltaX: input.deltaX,
	    deltaY: input.deltaY
	  };
	}

	/**
	 * get the center of all the pointers
	 * @param {Array} pointers
	 * @return {Object} center contains `x` and `y` properties
	 */
	function getCenter(pointers) {
	  var pointersLength = pointers.length;

	  // no need to loop when only one touch
	  if (pointersLength === 1) {
	    return {
	      x: round(pointers[0].clientX),
	      y: round(pointers[0].clientY)
	    };
	  }

	  var x = 0, y = 0, i = 0;
	  while (i < pointersLength) {
	    x += pointers[i].clientX;
	    y += pointers[i].clientY;
	    i++;
	  }

	  return {
	    x: round(x / pointersLength),
	    y: round(y / pointersLength)
	  };
	}

	/**
	 * calculate the velocity between two points. unit is in px per ms.
	 * @param {Number} deltaTime
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Object} velocity `x` and `y`
	 */
	function getVelocity(deltaTime, x, y) {
	  return {
	    x: x / deltaTime || 0,
	    y: y / deltaTime || 0
	  };
	}

	/**
	 * get the direction between two points
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Number} direction
	 */
	function getDirection(x, y) {
	  if (x === y) {
	    return DIRECTION_NONE;
	  }

	  if (abs(x) >= abs(y)) {
	    return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
	  }
	  return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
	}

	/**
	 * calculate the absolute distance between two points
	 * @param {Object} p1 {x, y}
	 * @param {Object} p2 {x, y}
	 * @param {Array} [props] containing x and y keys
	 * @return {Number} distance
	 */
	function getDistance(p1, p2, props) {
	  if (!props) {
	    props = PROPS_XY;
	  }
	  var x = p2[props[0]] - p1[props[0]],
	    y = p2[props[1]] - p1[props[1]];

	  return Math.sqrt((x * x) + (y * y));
	}

	/**
	 * calculate the angle between two coordinates
	 * @param {Object} p1
	 * @param {Object} p2
	 * @param {Array} [props] containing x and y keys
	 * @return {Number} angle
	 */
	function getAngle(p1, p2, props) {
	  if (!props) {
	    props = PROPS_XY;
	  }
	  var x = p2[props[0]] - p1[props[0]],
	    y = p2[props[1]] - p1[props[1]];
	  return Math.atan2(y, x) * 180 / Math.PI;
	}

	/**
	 * calculate the rotation degrees between two pointersets
	 * @param {Array} start array of pointers
	 * @param {Array} end array of pointers
	 * @return {Number} rotation
	 */
	function getRotation(start, end) {
	  return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
	}

	/**
	 * calculate the scale factor between two pointersets
	 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
	 * @param {Array} start array of pointers
	 * @param {Array} end array of pointers
	 * @return {Number} scale
	 */
	function getScale(start, end) {
	  return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
	}

	var MOUSE_INPUT_MAP = {
	  mousedown: INPUT_START,
	  mousemove: INPUT_MOVE,
	  mouseup: INPUT_END
	};

	var MOUSE_ELEMENT_EVENTS = 'mousedown';
	var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

	/**
	 * Mouse events input
	 * @constructor
	 * @extends Input
	 */
	function MouseInput() {
	  this.evEl = MOUSE_ELEMENT_EVENTS;
	  this.evWin = MOUSE_WINDOW_EVENTS;

	  this.pressed = false; // mousedown state

	  Input.apply(this, arguments);
	}

	inherit(MouseInput, Input, {
	  /**
	   * handle mouse events
	   * @param {Object} ev
	   */
	  handler: function MEhandler(ev) {
	    var eventType = MOUSE_INPUT_MAP[ev.type];

	    // on start we want to have the left mouse button down
	    if (eventType & INPUT_START && ev.button === 0) {
	      this.pressed = true;
	    }

	    if (eventType & INPUT_MOVE && ev.which !== 1) {
	      eventType = INPUT_END;
	    }

	    // mouse must be down
	    if (!this.pressed) {
	      return;
	    }

	    if (eventType & INPUT_END) {
	      this.pressed = false;
	    }

	    this.callback(this.manager, eventType, {
	      pointers: [ev],
	      changedPointers: [ev],
	      pointerType: INPUT_TYPE_MOUSE,
	      srcEvent: ev
	    });
	  }
	});

	var POINTER_INPUT_MAP = {
	  pointerdown: INPUT_START,
	  pointermove: INPUT_MOVE,
	  pointerup: INPUT_END,
	  pointercancel: INPUT_CANCEL,
	  pointerout: INPUT_CANCEL
	};

	// in IE10 the pointer types is defined as an enum
	var IE10_POINTER_TYPE_ENUM = {
	  2: INPUT_TYPE_TOUCH,
	  3: INPUT_TYPE_PEN,
	  4: INPUT_TYPE_MOUSE,
	  5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
	};

	var POINTER_ELEMENT_EVENTS = 'pointerdown';
	var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

	// IE10 has prefixed support, and case-sensitive
	if (window.MSPointerEvent && !window.PointerEvent) {
	  POINTER_ELEMENT_EVENTS = 'MSPointerDown';
	  POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
	}

	/**
	 * Pointer events input
	 * @constructor
	 * @extends Input
	 */
	function PointerEventInput() {
	  this.evEl = POINTER_ELEMENT_EVENTS;
	  this.evWin = POINTER_WINDOW_EVENTS;

	  Input.apply(this, arguments);

	  this.store = (this.manager.session.pointerEvents = []);
	}

	inherit(PointerEventInput, Input, {
	  /**
	   * handle mouse events
	   * @param {Object} ev
	   */
	  handler: function PEhandler(ev) {
	    var store = this.store;
	    var removePointer = false;

	    var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
	    var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
	    var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

	    var isTouch = (pointerType == INPUT_TYPE_TOUCH);

	    // get index of the event in the store
	    var storeIndex = inArray(store, ev.pointerId, 'pointerId');

	    // start and mouse must be down
	    if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
	      if (storeIndex < 0) {
	        store.push(ev);
	        storeIndex = store.length - 1;
	      }
	    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	      removePointer = true;
	    }

	    // it not found, so the pointer hasn't been down (so it's probably a hover)
	    if (storeIndex < 0) {
	      return;
	    }

	    // update the event in the store
	    store[storeIndex] = ev;

	    this.callback(this.manager, eventType, {
	      pointers: store,
	      changedPointers: [ev],
	      pointerType: pointerType,
	      srcEvent: ev
	    });

	    if (removePointer) {
	      // remove from the store
	      store.splice(storeIndex, 1);
	    }
	  }
	});

	var SINGLE_TOUCH_INPUT_MAP = {
	  touchstart: INPUT_START,
	  touchmove: INPUT_MOVE,
	  touchend: INPUT_END,
	  touchcancel: INPUT_CANCEL
	};

	var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
	var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

	/**
	 * Touch events input
	 * @constructor
	 * @extends Input
	 */
	function SingleTouchInput() {
	  this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
	  this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
	  this.started = false;

	  Input.apply(this, arguments);
	}

	inherit(SingleTouchInput, Input, {
	  handler: function TEhandler(ev) {
	    var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

	    // should we handle the touch events?
	    if (type === INPUT_START) {
	      this.started = true;
	    }

	    if (!this.started) {
	      return;
	    }

	    var touches = normalizeSingleTouches.call(this, ev, type);

	    // when done, reset the started state
	    if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
	      this.started = false;
	    }

	    this.callback(this.manager, type, {
	      pointers: touches[0],
	      changedPointers: touches[1],
	      pointerType: INPUT_TYPE_TOUCH,
	      srcEvent: ev
	    });
	  }
	});

	/**
	 * @this {TouchInput}
	 * @param {Object} ev
	 * @param {Number} type flag
	 * @returns {undefined|Array} [all, changed]
	 */
	function normalizeSingleTouches(ev, type) {
	  var all = toArray(ev.touches);
	  var changed = toArray(ev.changedTouches);

	  if (type & (INPUT_END | INPUT_CANCEL)) {
	    all = uniqueArray(all.concat(changed), 'identifier', true);
	  }

	  return [all, changed];
	}

	var TOUCH_INPUT_MAP = {
	  touchstart: INPUT_START,
	  touchmove: INPUT_MOVE,
	  touchend: INPUT_END,
	  touchcancel: INPUT_CANCEL
	};

	var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

	/**
	 * Multi-user touch events input
	 * @constructor
	 * @extends Input
	 */
	function TouchInput() {
	  this.evTarget = TOUCH_TARGET_EVENTS;
	  this.targetIds = {};

	  Input.apply(this, arguments);
	}

	inherit(TouchInput, Input, {
	  handler: function MTEhandler(ev) {
	    var type = TOUCH_INPUT_MAP[ev.type];
	    var touches = getTouches.call(this, ev, type);
	    if (!touches) {
	      return;
	    }

	    this.callback(this.manager, type, {
	      pointers: touches[0],
	      changedPointers: touches[1],
	      pointerType: INPUT_TYPE_TOUCH,
	      srcEvent: ev
	    });
	  }
	});

	/**
	 * @this {TouchInput}
	 * @param {Object} ev
	 * @param {Number} type flag
	 * @returns {undefined|Array} [all, changed]
	 */
	function getTouches(ev, type) {
	  var allTouches = toArray(ev.touches);
	  var targetIds = this.targetIds;

	  // when there is only one touch, the process can be simplified
	  if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
	    targetIds[allTouches[0].identifier] = true;
	    return [allTouches, allTouches];
	  }

	  var i,
	    targetTouches,
	    changedTouches = toArray(ev.changedTouches),
	    changedTargetTouches = [],
	    target = this.target;

	  // get target touches from touches
	  targetTouches = allTouches.filter(function(touch) {
	    return hasParent(touch.target, target);
	  });

	  // collect touches
	  if (type === INPUT_START) {
	    i = 0;
	    while (i < targetTouches.length) {
	      targetIds[targetTouches[i].identifier] = true;
	      i++;
	    }
	  }

	  // filter changed touches to only contain touches that exist in the collected target ids
	  i = 0;
	  while (i < changedTouches.length) {
	    if (targetIds[changedTouches[i].identifier]) {
	      changedTargetTouches.push(changedTouches[i]);
	    }

	    // cleanup removed touches
	    if (type & (INPUT_END | INPUT_CANCEL)) {
	      delete targetIds[changedTouches[i].identifier];
	    }
	    i++;
	  }

	  if (!changedTargetTouches.length) {
	    return;
	  }

	  return [
	    // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
	    uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
	    changedTargetTouches
	  ];
	}

	/**
	 * Combined touch and mouse input
	 *
	 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
	 * This because touch devices also emit mouse events while doing a touch.
	 *
	 * @constructor
	 * @extends Input
	 */

	var DEDUP_TIMEOUT = 2500;
	var DEDUP_DISTANCE = 25;

	function TouchMouseInput() {
	  Input.apply(this, arguments);

	  var handler = bindFn(this.handler, this);
	  this.touch = new TouchInput(this.manager, handler);
	  this.mouse = new MouseInput(this.manager, handler);

	  this.primaryTouch = null;
	  this.lastTouches = [];
	}

	inherit(TouchMouseInput, Input, {
	  /**
	   * handle mouse and touch events
	   * @param {Hammer} manager
	   * @param {String} inputEvent
	   * @param {Object} inputData
	   */
	  handler: function TMEhandler(manager, inputEvent, inputData) {
	    var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
	      isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

	    if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
	      return;
	    }

	    // when we're in a touch event, record touches to  de-dupe synthetic mouse event
	    if (isTouch) {
	      recordTouches.call(this, inputEvent, inputData);
	    } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
	      return;
	    }

	    this.callback(manager, inputEvent, inputData);
	  },

	  /**
	   * remove the event listeners
	   */
	  destroy: function destroy() {
	    this.touch.destroy();
	    this.mouse.destroy();
	  }
	});

	function recordTouches(eventType, eventData) {
	  if (eventType & INPUT_START) {
	    this.primaryTouch = eventData.changedPointers[0].identifier;
	    setLastTouch.call(this, eventData);
	  } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	    setLastTouch.call(this, eventData);
	  }
	}

	function setLastTouch(eventData) {
	  var touch = eventData.changedPointers[0];

	  if (touch.identifier === this.primaryTouch) {
	    var lastTouch = {x: touch.clientX, y: touch.clientY};
	    this.lastTouches.push(lastTouch);
	    var lts = this.lastTouches;
	    var removeLastTouch = function() {
	      var i = lts.indexOf(lastTouch);
	      if (i > -1) {
	        lts.splice(i, 1);
	      }
	    };
	    setTimeout(removeLastTouch, DEDUP_TIMEOUT);
	  }
	}

	function isSyntheticEvent(eventData) {
	  var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
	  for (var i = 0; i < this.lastTouches.length; i++) {
	    var t = this.lastTouches[i];
	    var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
	    if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
	      return true;
	    }
	  }
	  return false;
	}

	var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
	var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

	// magical touchAction value
	var TOUCH_ACTION_COMPUTE = 'compute';
	var TOUCH_ACTION_AUTO = 'auto';
	var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
	var TOUCH_ACTION_NONE = 'none';
	var TOUCH_ACTION_PAN_X = 'pan-x';
	var TOUCH_ACTION_PAN_Y = 'pan-y';
	var TOUCH_ACTION_MAP = getTouchActionProps();

	/**
	 * Touch Action
	 * sets the touchAction property or uses the js alternative
	 * @param {Manager} manager
	 * @param {String} value
	 * @constructor
	 */
	function TouchAction(manager, value) {
	  this.manager = manager;
	  this.set(value);
	}

	TouchAction.prototype = {
	  /**
	   * set the touchAction value on the element or enable the polyfill
	   * @param {String} value
	   */
	  set: function(value) {
	    // find out the touch-action by the event handlers
	    if (value == TOUCH_ACTION_COMPUTE) {
	      value = this.compute();
	    }

	    if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
	      this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
	    }
	    this.actions = value.toLowerCase().trim();
	  },

	  /**
	   * just re-set the touchAction value
	   */
	  update: function() {
	    this.set(this.manager.options.touchAction);
	  },

	  /**
	   * compute the value for the touchAction property based on the recognizer's settings
	   * @returns {String} value
	   */
	  compute: function() {
	    var actions = [];
	    each(this.manager.recognizers, function(recognizer) {
	      if (boolOrFn(recognizer.options.enable, [recognizer])) {
	        actions = actions.concat(recognizer.getTouchAction());
	      }
	    });
	    return cleanTouchActions(actions.join(' '));
	  },

	  /**
	   * this method is called on each input cycle and provides the preventing of the browser behavior
	   * @param {Object} input
	   */
	  preventDefaults: function(input) {
	    var srcEvent = input.srcEvent;
	    var direction = input.offsetDirection;

	    // if the touch action did prevented once this session
	    if (this.manager.session.prevented) {
	      srcEvent.preventDefault();
	      return;
	    }

	    var actions = this.actions;
	    var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
	    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
	    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

	    if (hasNone) {
	      //do not prevent defaults if this is a tap gesture

	      var isTapPointer = input.pointers.length === 1;
	      var isTapMovement = input.distance < 2;
	      var isTapTouchTime = input.deltaTime < 250;

	      if (isTapPointer && isTapMovement && isTapTouchTime) {
	        return;
	      }
	    }

	    if (hasPanX && hasPanY) {
	      // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
	      return;
	    }

	    if (hasNone ||
	      (hasPanY && direction & DIRECTION_HORIZONTAL) ||
	      (hasPanX && direction & DIRECTION_VERTICAL)) {
	      return this.preventSrc(srcEvent);
	    }
	  },

	  /**
	   * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
	   * @param {Object} srcEvent
	   */
	  preventSrc: function(srcEvent) {
	    this.manager.session.prevented = true;
	    srcEvent.preventDefault();
	  }
	};

	/**
	 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
	 * @param {String} actions
	 * @returns {*}
	 */
	function cleanTouchActions(actions) {
	  // none
	  if (inStr(actions, TOUCH_ACTION_NONE)) {
	    return TOUCH_ACTION_NONE;
	  }

	  var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
	  var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

	  // if both pan-x and pan-y are set (different recognizers
	  // for different directions, e.g. horizontal pan but vertical swipe?)
	  // we need none (as otherwise with pan-x pan-y combined none of these
	  // recognizers will work, since the browser would handle all panning
	  if (hasPanX && hasPanY) {
	    return TOUCH_ACTION_NONE;
	  }

	  // pan-x OR pan-y
	  if (hasPanX || hasPanY) {
	    return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
	  }

	  // manipulation
	  if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
	    return TOUCH_ACTION_MANIPULATION;
	  }

	  return TOUCH_ACTION_AUTO;
	}

	function getTouchActionProps() {
	  if (!NATIVE_TOUCH_ACTION) {
	    return false;
	  }
	  var touchMap = {};
	  var cssSupports = window.CSS && window.CSS.supports;
	  ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {

	    // If css.supports is not supported but there is native touch-action assume it supports
	    // all values. This is the case for IE 10 and 11.
	    touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
	  });
	  return touchMap;
	}

	/**
	 * Recognizer flow explained; *
	 * All recognizers have the initial state of POSSIBLE when a input session starts.
	 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
	 * Example session for mouse-input: mousedown -> mousemove -> mouseup
	 *
	 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
	 * which determines with state it should be.
	 *
	 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
	 * POSSIBLE to give it another change on the next cycle.
	 *
	 *               Possible
	 *                  |
	 *            +-----+---------------+
	 *            |                     |
	 *      +-----+-----+               |
	 *      |           |               |
	 *   Failed      Cancelled          |
	 *                          +-------+------+
	 *                          |              |
	 *                      Recognized       Began
	 *                                         |
	 *                                      Changed
	 *                                         |
	 *                                  Ended/Recognized
	 */
	var STATE_POSSIBLE = 1;
	var STATE_BEGAN = 2;
	var STATE_CHANGED = 4;
	var STATE_ENDED = 8;
	var STATE_RECOGNIZED = STATE_ENDED;
	var STATE_CANCELLED = 16;
	var STATE_FAILED = 32;

	/**
	 * Recognizer
	 * Every recognizer needs to extend from this class.
	 * @constructor
	 * @param {Object} options
	 */
	function Recognizer(options) {
	  this.options = assign({}, this.defaults, options || {});

	  this.id = uniqueId();

	  this.manager = null;

	  // default is enable true
	  this.options.enable = ifUndefined(this.options.enable, true);

	  this.state = STATE_POSSIBLE;

	  this.simultaneous = {};
	  this.requireFail = [];
	}

	Recognizer.prototype = {
	  /**
	   * @virtual
	   * @type {Object}
	   */
	  defaults: {},

	  /**
	   * set options
	   * @param {Object} options
	   * @return {Recognizer}
	   */
	  set: function(options) {
	    assign(this.options, options);

	    // also update the touchAction, in case something changed about the directions/enabled state
	    this.manager && this.manager.touchAction.update();
	    return this;
	  },

	  /**
	   * recognize simultaneous with an other recognizer.
	   * @param {Recognizer} otherRecognizer
	   * @returns {Recognizer} this
	   */
	  recognizeWith: function(otherRecognizer) {
	    if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
	      return this;
	    }

	    var simultaneous = this.simultaneous;
	    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	    if (!simultaneous[otherRecognizer.id]) {
	      simultaneous[otherRecognizer.id] = otherRecognizer;
	      otherRecognizer.recognizeWith(this);
	    }
	    return this;
	  },

	  /**
	   * drop the simultaneous link. it doesnt remove the link on the other recognizer.
	   * @param {Recognizer} otherRecognizer
	   * @returns {Recognizer} this
	   */
	  dropRecognizeWith: function(otherRecognizer) {
	    if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
	      return this;
	    }

	    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	    delete this.simultaneous[otherRecognizer.id];
	    return this;
	  },

	  /**
	   * recognizer can only run when an other is failing
	   * @param {Recognizer} otherRecognizer
	   * @returns {Recognizer} this
	   */
	  requireFailure: function(otherRecognizer) {
	    if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
	      return this;
	    }

	    var requireFail = this.requireFail;
	    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	    if (inArray(requireFail, otherRecognizer) === -1) {
	      requireFail.push(otherRecognizer);
	      otherRecognizer.requireFailure(this);
	    }
	    return this;
	  },

	  /**
	   * drop the requireFailure link. it does not remove the link on the other recognizer.
	   * @param {Recognizer} otherRecognizer
	   * @returns {Recognizer} this
	   */
	  dropRequireFailure: function(otherRecognizer) {
	    if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
	      return this;
	    }

	    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	    var index = inArray(this.requireFail, otherRecognizer);
	    if (index > -1) {
	      this.requireFail.splice(index, 1);
	    }
	    return this;
	  },

	  /**
	   * has require failures boolean
	   * @returns {boolean}
	   */
	  hasRequireFailures: function() {
	    return this.requireFail.length > 0;
	  },

	  /**
	   * if the recognizer can recognize simultaneous with an other recognizer
	   * @param {Recognizer} otherRecognizer
	   * @returns {Boolean}
	   */
	  canRecognizeWith: function(otherRecognizer) {
	    return !!this.simultaneous[otherRecognizer.id];
	  },

	  /**
	   * You should use `tryEmit` instead of `emit` directly to check
	   * that all the needed recognizers has failed before emitting.
	   * @param {Object} input
	   */
	  emit: function(input) {
	    var self = this;
	    var state = this.state;

	    function emit(event) {
	      self.manager.emit(event, input);
	    }

	    // 'panstart' and 'panmove'
	    if (state < STATE_ENDED) {
	      emit(self.options.event + stateStr(state));
	    }

	    emit(self.options.event); // simple 'eventName' events

	    if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
	      emit(input.additionalEvent);
	    }

	    // panend and pancancel
	    if (state >= STATE_ENDED) {
	      emit(self.options.event + stateStr(state));
	    }
	  },

	  /**
	   * Check that all the require failure recognizers has failed,
	   * if true, it emits a gesture event,
	   * otherwise, setup the state to FAILED.
	   * @param {Object} input
	   */
	  tryEmit: function(input) {
	    if (this.canEmit()) {
	      return this.emit(input);
	    }
	    // it's failing anyway
	    this.state = STATE_FAILED;
	  },

	  /**
	   * can we emit?
	   * @returns {boolean}
	   */
	  canEmit: function() {
	    var i = 0;
	    while (i < this.requireFail.length) {
	      if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
	        return false;
	      }
	      i++;
	    }
	    return true;
	  },

	  /**
	   * update the recognizer
	   * @param {Object} inputData
	   */
	  recognize: function(inputData) {
	    // make a new copy of the inputData
	    // so we can change the inputData without messing up the other recognizers
	    var inputDataClone = assign({}, inputData);

	    // is is enabled and allow recognizing?
	    if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
	      this.reset();
	      this.state = STATE_FAILED;
	      return;
	    }

	    // reset when we've reached the end
	    if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
	      this.state = STATE_POSSIBLE;
	    }

	    this.state = this.process(inputDataClone);

	    // the recognizer has recognized a gesture
	    // so trigger an event
	    if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
	      this.tryEmit(inputDataClone);
	    }
	  },

	  /**
	   * return the state of the recognizer
	   * the actual recognizing happens in this method
	   * @virtual
	   * @param {Object} inputData
	   * @returns {Const} STATE
	   */
	  process: function(inputData) { }, // jshint ignore:line

	  /**
	   * return the preferred touch-action
	   * @virtual
	   * @returns {Array}
	   */
	  getTouchAction: function() { },

	  /**
	   * called when the gesture isn't allowed to recognize
	   * like when another is being recognized or it is disabled
	   * @virtual
	   */
	  reset: function() { }
	};

	/**
	 * get a usable string, used as event postfix
	 * @param {Const} state
	 * @returns {String} state
	 */
	function stateStr(state) {
	  if (state & STATE_CANCELLED) {
	    return 'cancel';
	  } else if (state & STATE_ENDED) {
	    return 'end';
	  } else if (state & STATE_CHANGED) {
	    return 'move';
	  } else if (state & STATE_BEGAN) {
	    return 'start';
	  }
	  return '';
	}

	/**
	 * direction cons to string
	 * @param {Const} direction
	 * @returns {String}
	 */
	function directionStr(direction) {
	  if (direction == DIRECTION_DOWN) {
	    return 'down';
	  } else if (direction == DIRECTION_UP) {
	    return 'up';
	  } else if (direction == DIRECTION_LEFT) {
	    return 'left';
	  } else if (direction == DIRECTION_RIGHT) {
	    return 'right';
	  }
	  return '';
	}

	/**
	 * get a recognizer by name if it is bound to a manager
	 * @param {Recognizer|String} otherRecognizer
	 * @param {Recognizer} recognizer
	 * @returns {Recognizer}
	 */
	function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
	  var manager = recognizer.manager;
	  if (manager) {
	    return manager.get(otherRecognizer);
	  }
	  return otherRecognizer;
	}

	/**
	 * This recognizer is just used as a base for the simple attribute recognizers.
	 * @constructor
	 * @extends Recognizer
	 */
	function AttrRecognizer() {
	  Recognizer.apply(this, arguments);
	}

	inherit(AttrRecognizer, Recognizer, {
	  /**
	   * @namespace
	   * @memberof AttrRecognizer
	   */
	  defaults: {
	    /**
	     * @type {Number}
	     * @default 1
	     */
	    pointers: 1
	  },

	  /**
	   * Used to check if it the recognizer receives valid input, like input.distance > 10.
	   * @memberof AttrRecognizer
	   * @param {Object} input
	   * @returns {Boolean} recognized
	   */
	  attrTest: function(input) {
	    var optionPointers = this.options.pointers;
	    return optionPointers === 0 || input.pointers.length === optionPointers;
	  },

	  /**
	   * Process the input and return the state for the recognizer
	   * @memberof AttrRecognizer
	   * @param {Object} input
	   * @returns {*} State
	   */
	  process: function(input) {
	    var state = this.state;
	    var eventType = input.eventType;

	    var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
	    var isValid = this.attrTest(input);

	    // on cancel input and we've recognized before, return STATE_CANCELLED
	    if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
	      return state | STATE_CANCELLED;
	    } else if (isRecognized || isValid) {
	      if (eventType & INPUT_END) {
	        return state | STATE_ENDED;
	      } else if (!(state & STATE_BEGAN)) {
	        return STATE_BEGAN;
	      }
	      return state | STATE_CHANGED;
	    }
	    return STATE_FAILED;
	  }
	});

	/**
	 * Pan
	 * Recognized when the pointer is down and moved in the allowed direction.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function PanRecognizer() {
	  AttrRecognizer.apply(this, arguments);

	  this.pX = null;
	  this.pY = null;
	}

	inherit(PanRecognizer, AttrRecognizer, {
	  /**
	   * @namespace
	   * @memberof PanRecognizer
	   */
	  defaults: {
	    event: 'pan',
	    threshold: 10,
	    pointers: 1,
	    direction: DIRECTION_ALL
	  },

	  getTouchAction: function() {
	    var direction = this.options.direction;
	    var actions = [];
	    if (direction & DIRECTION_HORIZONTAL) {
	      actions.push(TOUCH_ACTION_PAN_Y);
	    }
	    if (direction & DIRECTION_VERTICAL) {
	      actions.push(TOUCH_ACTION_PAN_X);
	    }
	    return actions;
	  },

	  directionTest: function(input) {
	    var options = this.options;
	    var hasMoved = true;
	    var distance = input.distance;
	    var direction = input.direction;
	    var x = input.deltaX;
	    var y = input.deltaY;

	    // lock to axis?
	    if (!(direction & options.direction)) {
	      if (options.direction & DIRECTION_HORIZONTAL) {
	        direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
	        hasMoved = x != this.pX;
	        distance = Math.abs(input.deltaX);
	      } else {
	        direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
	        hasMoved = y != this.pY;
	        distance = Math.abs(input.deltaY);
	      }
	    }
	    input.direction = direction;
	    return hasMoved && distance > options.threshold && direction & options.direction;
	  },

	  attrTest: function(input) {
	    return AttrRecognizer.prototype.attrTest.call(this, input) &&
	      (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
	  },

	  emit: function(input) {

	    this.pX = input.deltaX;
	    this.pY = input.deltaY;

	    var direction = directionStr(input.direction);

	    if (direction) {
	      input.additionalEvent = this.options.event + direction;
	    }
	    this._super.emit.call(this, input);
	  }
	});

	/**
	 * Pinch
	 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function PinchRecognizer() {
	  AttrRecognizer.apply(this, arguments);
	}

	inherit(PinchRecognizer, AttrRecognizer, {
	  /**
	   * @namespace
	   * @memberof PinchRecognizer
	   */
	  defaults: {
	    event: 'pinch',
	    threshold: 0,
	    pointers: 2
	  },

	  getTouchAction: function() {
	    return [TOUCH_ACTION_NONE];
	  },

	  attrTest: function(input) {
	    return this._super.attrTest.call(this, input) &&
	      (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
	  },

	  emit: function(input) {
	    if (input.scale !== 1) {
	      var inOut = input.scale < 1 ? 'in' : 'out';
	      input.additionalEvent = this.options.event + inOut;
	    }
	    this._super.emit.call(this, input);
	  }
	});

	/**
	 * Press
	 * Recognized when the pointer is down for x ms without any movement.
	 * @constructor
	 * @extends Recognizer
	 */
	function PressRecognizer() {
	  Recognizer.apply(this, arguments);

	  this._timer = null;
	  this._input = null;
	}

	inherit(PressRecognizer, Recognizer, {
	  /**
	   * @namespace
	   * @memberof PressRecognizer
	   */
	  defaults: {
	    event: 'press',
	    pointers: 1,
	    time: 251, // minimal time of the pointer to be pressed
	    threshold: 9 // a minimal movement is ok, but keep it low
	  },

	  getTouchAction: function() {
	    return [TOUCH_ACTION_AUTO];
	  },

	  process: function(input) {
	    var options = this.options;
	    var validPointers = input.pointers.length === options.pointers;
	    var validMovement = input.distance < options.threshold;
	    var validTime = input.deltaTime > options.time;

	    this._input = input;

	    // we only allow little movement
	    // and we've reached an end event, so a tap is possible
	    if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
	      this.reset();
	    } else if (input.eventType & INPUT_START) {
	      this.reset();
	      this._timer = setTimeoutContext(function() {
	        this.state = STATE_RECOGNIZED;
	        this.tryEmit();
	      }, options.time, this);
	    } else if (input.eventType & INPUT_END) {
	      return STATE_RECOGNIZED;
	    }
	    return STATE_FAILED;
	  },

	  reset: function() {
	    clearTimeout(this._timer);
	  },

	  emit: function(input) {
	    if (this.state !== STATE_RECOGNIZED) {
	      return;
	    }

	    if (input && (input.eventType & INPUT_END)) {
	      this.manager.emit(this.options.event + 'up', input);
	    } else {
	      this._input.timeStamp = now();
	      this.manager.emit(this.options.event, this._input);
	    }
	  }
	});

	/**
	 * Rotate
	 * Recognized when two or more pointer are moving in a circular motion.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function RotateRecognizer() {
	  AttrRecognizer.apply(this, arguments);
	}

	inherit(RotateRecognizer, AttrRecognizer, {
	  /**
	   * @namespace
	   * @memberof RotateRecognizer
	   */
	  defaults: {
	    event: 'rotate',
	    threshold: 0,
	    pointers: 2
	  },

	  getTouchAction: function() {
	    return [TOUCH_ACTION_NONE];
	  },

	  attrTest: function(input) {
	    return this._super.attrTest.call(this, input) &&
	      (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
	  }
	});

	/**
	 * Swipe
	 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function SwipeRecognizer() {
	  AttrRecognizer.apply(this, arguments);
	}

	inherit(SwipeRecognizer, AttrRecognizer, {
	  /**
	   * @namespace
	   * @memberof SwipeRecognizer
	   */
	  defaults: {
	    event: 'swipe',
	    threshold: 10,
	    velocity: 0.3,
	    direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
	    pointers: 1
	  },

	  getTouchAction: function() {
	    return PanRecognizer.prototype.getTouchAction.call(this);
	  },

	  attrTest: function(input) {
	    var direction = this.options.direction;
	    var velocity;

	    if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
	      velocity = input.overallVelocity;
	    } else if (direction & DIRECTION_HORIZONTAL) {
	      velocity = input.overallVelocityX;
	    } else if (direction & DIRECTION_VERTICAL) {
	      velocity = input.overallVelocityY;
	    }

	    return this._super.attrTest.call(this, input) &&
	      direction & input.offsetDirection &&
	      input.distance > this.options.threshold &&
	      input.maxPointers == this.options.pointers &&
	      abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
	  },

	  emit: function(input) {
	    var direction = directionStr(input.offsetDirection);
	    if (direction) {
	      this.manager.emit(this.options.event + direction, input);
	    }

	    this.manager.emit(this.options.event, input);
	  }
	});

	/**
	 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
	 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
	 * a single tap.
	 *
	 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
	 * multi-taps being recognized.
	 * @constructor
	 * @extends Recognizer
	 */
	function TapRecognizer() {
	  Recognizer.apply(this, arguments);

	  // previous time and center,
	  // used for tap counting
	  this.pTime = false;
	  this.pCenter = false;

	  this._timer = null;
	  this._input = null;
	  this.count = 0;
	}

	inherit(TapRecognizer, Recognizer, {
	  /**
	   * @namespace
	   * @memberof PinchRecognizer
	   */
	  defaults: {
	    event: 'tap',
	    pointers: 1,
	    taps: 1,
	    interval: 300, // max time between the multi-tap taps
	    time: 250, // max time of the pointer to be down (like finger on the screen)
	    threshold: 9, // a minimal movement is ok, but keep it low
	    posThreshold: 10 // a multi-tap can be a bit off the initial position
	  },

	  getTouchAction: function() {
	    return [TOUCH_ACTION_MANIPULATION];
	  },

	  process: function(input) {
	    var options = this.options;

	    var validPointers = input.pointers.length === options.pointers;
	    var validMovement = input.distance < options.threshold;
	    var validTouchTime = input.deltaTime < options.time;

	    this.reset();

	    if ((input.eventType & INPUT_START) && (this.count === 0)) {
	      return this.failTimeout();
	    }

	    // we only allow little movement
	    // and we've reached an end event, so a tap is possible
	    if (validMovement && validTouchTime && validPointers) {
	      if (input.eventType != INPUT_END) {
	        return this.failTimeout();
	      }

	      var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
	      var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

	      this.pTime = input.timeStamp;
	      this.pCenter = input.center;

	      if (!validMultiTap || !validInterval) {
	        this.count = 1;
	      } else {
	        this.count += 1;
	      }

	      this._input = input;

	      // if tap count matches we have recognized it,
	      // else it has began recognizing...
	      var tapCount = this.count % options.taps;
	      if (tapCount === 0) {
	        // no failing requirements, immediately trigger the tap event
	        // or wait as long as the multitap interval to trigger
	        if (!this.hasRequireFailures()) {
	          return STATE_RECOGNIZED;
	        } else {
	          this._timer = setTimeoutContext(function() {
	            this.state = STATE_RECOGNIZED;
	            this.tryEmit();
	          }, options.interval, this);
	          return STATE_BEGAN;
	        }
	      }
	    }
	    return STATE_FAILED;
	  },

	  failTimeout: function() {
	    this._timer = setTimeoutContext(function() {
	      this.state = STATE_FAILED;
	    }, this.options.interval, this);
	    return STATE_FAILED;
	  },

	  reset: function() {
	    clearTimeout(this._timer);
	  },

	  emit: function() {
	    if (this.state == STATE_RECOGNIZED) {
	      this._input.tapCount = this.count;
	      this.manager.emit(this.options.event, this._input);
	    }
	  }
	});

	/**
	 * Simple way to create a manager with a default set of recognizers.
	 * @param {HTMLElement} element
	 * @param {Object} [options]
	 * @constructor
	 */
	function Hammer(element, options) {
	  options = options || {};
	  options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
	  return new Manager(element, options);
	}

	/**
	 * @const {string}
	 */
	Hammer.VERSION = '2.0.7';

	/**
	 * default settings
	 * @namespace
	 */
	Hammer.defaults = {
	  /**
	   * set if DOM events are being triggered.
	   * But this is slower and unused by simple implementations, so disabled by default.
	   * @type {Boolean}
	   * @default false
	   */
	  domEvents: false,

	  /**
	   * The value for the touchAction property/fallback.
	   * When set to `compute` it will magically set the correct value based on the added recognizers.
	   * @type {String}
	   * @default compute
	   */
	  touchAction: TOUCH_ACTION_COMPUTE,

	  /**
	   * @type {Boolean}
	   * @default true
	   */
	  enable: true,

	  /**
	   * EXPERIMENTAL FEATURE -- can be removed/changed
	   * Change the parent input target element.
	   * If Null, then it is being set the to main element.
	   * @type {Null|EventTarget}
	   * @default null
	   */
	  inputTarget: null,

	  /**
	   * force an input class
	   * @type {Null|Function}
	   * @default null
	   */
	  inputClass: null,

	  /**
	   * Default recognizer setup when calling `Hammer()`
	   * When creating a new Manager these will be skipped.
	   * @type {Array}
	   */
	  preset: [
	    // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
	    [RotateRecognizer, {enable: false}],
	    [PinchRecognizer, {enable: false}, ['rotate']],
	    [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
	    [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
	    [TapRecognizer],
	    [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
	    [PressRecognizer]
	  ],

	  /**
	   * Some CSS properties can be used to improve the working of Hammer.
	   * Add them to this method and they will be set when creating a new Manager.
	   * @namespace
	   */
	  cssProps: {
	    /**
	     * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
	     * @type {String}
	     * @default 'none'
	     */
	    userSelect: 'none',

	    /**
	     * Disable the Windows Phone grippers when pressing an element.
	     * @type {String}
	     * @default 'none'
	     */
	    touchSelect: 'none',

	    /**
	     * Disables the default callout shown when you touch and hold a touch target.
	     * On iOS, when you touch and hold a touch target such as a link, Safari displays
	     * a callout containing information about the link. This property allows you to disable that callout.
	     * @type {String}
	     * @default 'none'
	     */
	    touchCallout: 'none',

	    /**
	     * Specifies whether zooming is enabled. Used by IE10>
	     * @type {String}
	     * @default 'none'
	     */
	    contentZooming: 'none',

	    /**
	     * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
	     * @type {String}
	     * @default 'none'
	     */
	    userDrag: 'none',

	    /**
	     * Overrides the highlight color shown when the user taps a link or a JavaScript
	     * clickable element in iOS. This property obeys the alpha value, if specified.
	     * @type {String}
	     * @default 'rgba(0,0,0,0)'
	     */
	    tapHighlightColor: 'rgba(0,0,0,0)'
	  }
	};

	var STOP = 1;
	var FORCED_STOP = 2;

	/**
	 * Manager
	 * @param {HTMLElement} element
	 * @param {Object} [options]
	 * @constructor
	 */
	function Manager(element, options) {
	  this.options = assign({}, Hammer.defaults, options || {});

	  this.options.inputTarget = this.options.inputTarget || element;

	  this.handlers = {};
	  this.session = {};
	  this.recognizers = [];
	  this.oldCssProps = {};

	  this.element = element;
	  this.input = createInputInstance(this);
	  this.touchAction = new TouchAction(this, this.options.touchAction);

	  toggleCssProps(this, true);

	  each(this.options.recognizers, function(item) {
	    var recognizer = this.add(new (item[0])(item[1]));
	    item[2] && recognizer.recognizeWith(item[2]);
	    item[3] && recognizer.requireFailure(item[3]);
	  }, this);
	}

	Manager.prototype = {
	  /**
	   * set options
	   * @param {Object} options
	   * @returns {Manager}
	   */
	  set: function(options) {
	    assign(this.options, options);

	    // Options that need a little more setup
	    if (options.touchAction) {
	      this.touchAction.update();
	    }
	    if (options.inputTarget) {
	      // Clean up existing event listeners and reinitialize
	      this.input.destroy();
	      this.input.target = options.inputTarget;
	      this.input.init();
	    }
	    return this;
	  },

	  /**
	   * stop recognizing for this session.
	   * This session will be discarded, when a new [input]start event is fired.
	   * When forced, the recognizer cycle is stopped immediately.
	   * @param {Boolean} [force]
	   */
	  stop: function(force) {
	    this.session.stopped = force ? FORCED_STOP : STOP;
	  },

	  /**
	   * run the recognizers!
	   * called by the inputHandler function on every movement of the pointers (touches)
	   * it walks through all the recognizers and tries to detect the gesture that is being made
	   * @param {Object} inputData
	   */
	  recognize: function(inputData) {
	    var session = this.session;
	    if (session.stopped) {
	      return;
	    }

	    // run the touch-action polyfill
	    this.touchAction.preventDefaults(inputData);

	    var recognizer;
	    var recognizers = this.recognizers;

	    // this holds the recognizer that is being recognized.
	    // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
	    // if no recognizer is detecting a thing, it is set to `null`
	    var curRecognizer = session.curRecognizer;

	    // reset when the last recognizer is recognized
	    // or when we're in a new session
	    if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
	      curRecognizer = session.curRecognizer = null;
	    }

	    var i = 0;
	    while (i < recognizers.length) {
	      recognizer = recognizers[i];

	      // find out if we are allowed try to recognize the input for this one.
	      // 1.   allow if the session is NOT forced stopped (see the .stop() method)
	      // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
	      //      that is being recognized.
	      // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
	      //      this can be setup with the `recognizeWith()` method on the recognizer.
	      if (session.stopped !== FORCED_STOP && ( // 1
	        !curRecognizer || recognizer == curRecognizer || // 2
	        recognizer.canRecognizeWith(curRecognizer))) { // 3
	        recognizer.recognize(inputData);
	      } else {
	        recognizer.reset();
	      }

	      // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
	      // current active recognizer. but only if we don't already have an active recognizer
	      if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
	        curRecognizer = session.curRecognizer = recognizer;
	      }
	      i++;
	    }
	  },

	  /**
	   * get a recognizer by its event name.
	   * @param {Recognizer|String} recognizer
	   * @returns {Recognizer|Null}
	   */
	  get: function(recognizer) {
	    if (recognizer instanceof Recognizer) {
	      return recognizer;
	    }

	    var recognizers = this.recognizers;
	    for (var i = 0; i < recognizers.length; i++) {
	      if (recognizers[i].options.event == recognizer) {
	        return recognizers[i];
	      }
	    }
	    return null;
	  },

	  /**
	   * add a recognizer to the manager
	   * existing recognizers with the same event name will be removed
	   * @param {Recognizer} recognizer
	   * @returns {Recognizer|Manager}
	   */
	  add: function(recognizer) {
	    if (invokeArrayArg(recognizer, 'add', this)) {
	      return this;
	    }

	    // remove existing
	    var existing = this.get(recognizer.options.event);
	    if (existing) {
	      this.remove(existing);
	    }

	    this.recognizers.push(recognizer);
	    recognizer.manager = this;

	    this.touchAction.update();
	    return recognizer;
	  },

	  /**
	   * remove a recognizer by name or instance
	   * @param {Recognizer|String} recognizer
	   * @returns {Manager}
	   */
	  remove: function(recognizer) {
	    if (invokeArrayArg(recognizer, 'remove', this)) {
	      return this;
	    }

	    recognizer = this.get(recognizer);

	    // let's make sure this recognizer exists
	    if (recognizer) {
	      var recognizers = this.recognizers;
	      var index = inArray(recognizers, recognizer);

	      if (index !== -1) {
	        recognizers.splice(index, 1);
	        this.touchAction.update();
	      }
	    }

	    return this;
	  },

	  /**
	   * bind event
	   * @param {String} events
	   * @param {Function} handler
	   * @returns {EventEmitter} this
	   */
	  on: function(events, handler) {
	    if (events === undefined) {
	      return;
	    }
	    if (handler === undefined) {
	      return;
	    }

	    var handlers = this.handlers;
	    each(splitStr(events), function(event) {
	      handlers[event] = handlers[event] || [];
	      handlers[event].push(handler);
	    });
	    return this;
	  },

	  /**
	   * unbind event, leave emit blank to remove all handlers
	   * @param {String} events
	   * @param {Function} [handler]
	   * @returns {EventEmitter} this
	   */
	  off: function(events, handler) {
	    if (events === undefined) {
	      return;
	    }

	    var handlers = this.handlers;
	    each(splitStr(events), function(event) {
	      if (!handler) {
	        delete handlers[event];
	      } else {
	        handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
	      }
	    });
	    return this;
	  },

	  /**
	   * emit event to the listeners
	   * @param {String} event
	   * @param {Object} data
	   */
	  emit: function(event, data) {
	    // we also want to trigger dom events
	    if (this.options.domEvents) {
	      triggerDomEvent(event, data);
	    }

	    // no handlers, so skip it all
	    var handlers = this.handlers[event] && this.handlers[event].slice();
	    if (!handlers || !handlers.length) {
	      return;
	    }

	    data.type = event;
	    data.preventDefault = function() {
	      data.srcEvent.preventDefault();
	    };

	    var i = 0;
	    while (i < handlers.length) {
	      handlers[i](data);
	      i++;
	    }
	  },

	  /**
	   * destroy the manager and unbinds all events
	   * it doesn't unbind dom events, that is the user own responsibility
	   */
	  destroy: function() {
	    this.element && toggleCssProps(this, false);

	    this.handlers = {};
	    this.session = {};
	    this.input.destroy();
	    this.element = null;
	  }
	};

	/**
	 * add/remove the css properties as defined in manager.options.cssProps
	 * @param {Manager} manager
	 * @param {Boolean} add
	 */
	function toggleCssProps(manager, add) {
	  var element = manager.element;
	  if (!element.style) {
	    return;
	  }
	  var prop;
	  each(manager.options.cssProps, function(value, name) {
	    prop = prefixed(element.style, name);
	    if (add) {
	      manager.oldCssProps[prop] = element.style[prop];
	      element.style[prop] = value;
	    } else {
	      element.style[prop] = manager.oldCssProps[prop] || '';
	    }
	  });
	  if (!add) {
	    manager.oldCssProps = {};
	  }
	}

	/**
	 * trigger dom event
	 * @param {String} event
	 * @param {Object} data
	 */
	function triggerDomEvent(event, data) {
	  var gestureEvent = document.createEvent('Event');
	  gestureEvent.initEvent(event, true, true);
	  gestureEvent.gesture = data;
	  data.target.dispatchEvent(gestureEvent);
	}

	assign(Hammer, {
	  INPUT_START: INPUT_START,
	  INPUT_MOVE: INPUT_MOVE,
	  INPUT_END: INPUT_END,
	  INPUT_CANCEL: INPUT_CANCEL,

	  STATE_POSSIBLE: STATE_POSSIBLE,
	  STATE_BEGAN: STATE_BEGAN,
	  STATE_CHANGED: STATE_CHANGED,
	  STATE_ENDED: STATE_ENDED,
	  STATE_RECOGNIZED: STATE_RECOGNIZED,
	  STATE_CANCELLED: STATE_CANCELLED,
	  STATE_FAILED: STATE_FAILED,

	  DIRECTION_NONE: DIRECTION_NONE,
	  DIRECTION_LEFT: DIRECTION_LEFT,
	  DIRECTION_RIGHT: DIRECTION_RIGHT,
	  DIRECTION_UP: DIRECTION_UP,
	  DIRECTION_DOWN: DIRECTION_DOWN,
	  DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
	  DIRECTION_VERTICAL: DIRECTION_VERTICAL,
	  DIRECTION_ALL: DIRECTION_ALL,

	  Manager: Manager,
	  Input: Input,
	  TouchAction: TouchAction,

	  TouchInput: TouchInput,
	  MouseInput: MouseInput,
	  PointerEventInput: PointerEventInput,
	  TouchMouseInput: TouchMouseInput,
	  SingleTouchInput: SingleTouchInput,

	  Recognizer: Recognizer,
	  AttrRecognizer: AttrRecognizer,
	  Tap: TapRecognizer,
	  Pan: PanRecognizer,
	  Swipe: SwipeRecognizer,
	  Pinch: PinchRecognizer,
	  Rotate: RotateRecognizer,
	  Press: PressRecognizer,

	  on: addEventListeners,
	  off: removeEventListeners,
	  each: each,
	  merge: merge,
	  extend: extend,
	  assign: assign,
	  inherit: inherit,
	  bindFn: bindFn,
	  prefixed: prefixed
	});

	// jquery.hammer.js
	// This jQuery plugin is just a small wrapper around the Hammer() class.
	// It also extends the Manager.emit method by triggering jQuery events.
	// $(element).hammer(options).bind("pan", myPanHandler);
	// The Hammer instance is stored at $element.data("hammer").
	// https://github.com/hammerjs/jquery.hammer.js

	(function($, Hammer) {
	  function hammerify(el, options) {
	    var $el = $(el);
	    if (!$el.data('hammer')) {
	      $el.data('hammer', new Hammer($el[0], options));
	    }
	  }

	  $.fn.hammer = function(options) {
	    return this.each(function() {
	      hammerify(this, options);
	    });
	  };

	  // extend the emit method to also trigger jQuery events
	  Hammer.Manager.prototype.emit = (function(originalEmit) {
	    return function(type, data) {
	      originalEmit.call(this, type, data);
	      $(this.element).trigger({
	        type: type,
	        gesture: data
	      });
	    };
	  })(Hammer.Manager.prototype.emit);
	})($, Hammer);

	module.exports = UI.Hammer = Hammer;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1);
	var UI = __webpack_require__(2);
	var dimmer = __webpack_require__(6);
	var $doc = $(document);
	var supportTransition = UI.support.transition;
	var ui = UI.namespace.ui;
	var ns = UI.namespace.class;


	var UI_modal = ui + ".modal"
	var ns_modal_dialog = ns + 'modal-dialog'
	var ns_modal = ns + 'modal'
	var ns_popup = ns + 'popup'
	var ns_modal_actions = ns + 'modal-actions'
	var ns_modal_propmpt = ns + 'modal-prompt'
	var ns_modal_loading = ns + 'modal-loading'
	var ns_modal_active = ns + 'modal-active'
	var ns_modal_out = ns + 'modal-out'
	var ns_modal_prompt_input = ns + 'modal-prompt-input'
	var data_ns_modal = 'data-' + ns + 'modal'
	var data_ns_modal_confirm = 'data-' + ns + 'modal-confirm'
	var data_ns_modal_cancel = 'data-' + ns + 'modal-cancel'

	var opened_modal_ui = 'opened.modal.' + ui;
	var open_modal_ui = 'open.modal.' + ui;
	var close_modal_ui = 'close.modal.' + ui;
	var closed_modal_ui = 'closed.modal.' + ui;
	var cancel_modal_ui = 'cancel.modal.' + ui;
	var keyup_modal_ui = 'keyup.modal.' + ui;
	var click_modal_ui_dataapi = 'click.modal.' + ui + '.data-api';

	/**
	 * @reference https://github.com/nolimits4web/Framework7/blob/master/src/js/modals.js
	 * @license https://github.com/nolimits4web/Framework7/blob/master/LICENSE
	 */

	var Modal = function (element, options) {
	    this.options = $.extend({}, Modal.DEFAULTS, options || {});
	    this.$element = $(element);
	    this.$dialog = this.$element.find('.' + ns_modal_dialog);

	    if (!this.$element.attr('id')) {
	        this.$element.attr('id', UI.utils.generateGUID(ns_modal));
	    }

	    this.isPopup = this.$element.hasClass(ns_popup);
	    this.isActions = this.$element.hasClass(ns_modal_actions);
	    this.isPrompt = this.$element.hasClass(ns_modal_propmpt);
	    this.isLoading = this.$element.hasClass(ns_modal_loading);
	    this.active = this.transitioning = this.relatedTarget = null;
	    this.dimmer = this.options.dimmer ? dimmer : {
	        open: function () {
	        },
	        close: function () {
	        }
	    };

	    this.events();
	};

	Modal.DEFAULTS = {
	    className: {
	        active: ns_modal_active,
	        out: ns_modal_out
	    },
	    selector: {
	        modal: '.' + ns_modal,
	        active: '.' + ns_modal_active,
	    },
	    closeViaDimmer: true,
	    cancelable: true,
	    onConfirm: function () {
	    },
	    onCancel: function () {
	    },
	    closeOnCancel: true,
	    closeOnConfirm: true,
	    dimmer: true,
	    height: undefined,
	    width: undefined,
	    duration: 300, // must equal the CSS transition duration
	    transitionEnd: supportTransition && supportTransition.end + '.modal.' + ui
	};

	Modal.prototype.toggle = function (relatedTarget) {
	    return this.active ? this.close() : this.open(relatedTarget);
	};

	Modal.prototype.open = function (relatedTarget) {
	    var $element = this.$element;
	    var options = this.options;
	    var isPopup = this.isPopup;
	    var width = options.width;
	    var height = options.height;
	    var style = {};

	    if (this.active) {
	        return;
	    }

	    if (!this.$element.length) {
	        return;
	    }

	    // callback hook
	    relatedTarget && (this.relatedTarget = relatedTarget);

	    // 判断如果还在动画，就先触发之前的closed事件
	    if (this.transitioning) {
	        clearTimeout($element.transitionEndTimmer);
	        $element.transitionEndTimmer = null;
	        $element.trigger(options.transitionEnd)
	            .off(options.transitionEnd);
	    }

	    isPopup && this.$element.show();

	    this.active = true;

	    $element.trigger($.Event(open_modal_ui, { relatedTarget: relatedTarget }));

	    this.dimmer.open($element);

	    $element.show().redraw();

	    // apply Modal width/height if set
	    if (!isPopup && !this.isActions) {
	        if (width) {
	            style.width = parseInt(width, 10) + 'px';
	        }

	        if (height) {
	            style.height = parseInt(height, 10) + 'px';
	        }

	        this.$dialog.css(style);
	    }

	    $element
	        .removeClass(options.className.out)
	        .addClass(options.className.active);

	    this.transitioning = 1;

	    var complete = function () {
	        $element.trigger($.Event(opened_modal_ui, {
	            relatedTarget: relatedTarget
	        }));
	        this.transitioning = 0;

	        // Prompt auto focus
	        if (this.isPrompt) {
	            this.$dialog.find('input').eq(0).focus();
	        }
	    };

	    if (!supportTransition) {
	        return complete.call(this);
	    }

	    $element
	        .one(options.transitionEnd, $.proxy(complete, this))
	        .emulateTransitionEnd(options.duration);
	};

	Modal.prototype.close = function (relatedTarget) {
	    if (!this.active) {
	        return;
	    }

	    var $element = this.$element;
	    var options = this.options;
	    var isPopup = this.isPopup;

	    // 判断如果还在动画，就先触发之前的opened事件
	    if (this.transitioning) {
	        clearTimeout($element.transitionEndTimmer);
	        $element.transitionEndTimmer = null;
	        $element.trigger(options.transitionEnd).off(options.transitionEnd);
	        this.dimmer.close($element, true);
	    }

	    this.$element.trigger($.Event(close_modal_ui, {
	        relatedTarget: relatedTarget
	    }));

	    this.transitioning = 1;

	    var complete = function () {
	        $element.trigger(closed_modal_ui);
	        isPopup && $element.removeClass(options.className.out);
	        $element.hide();
	        this.transitioning = 0;
	        // 不强制关闭 Dimmer，以便多个 Modal 可以共享 Dimmer
	        this.dimmer.close($element, false);
	        this.active = false;
	    };

	    $element.removeClass(options.className.active)
	        .addClass(options.className.out);

	    if (!supportTransition) {
	        return complete.call(this);
	    }

	    $element.one(options.transitionEnd, $.proxy(complete, this))
	        .emulateTransitionEnd(options.duration);
	};

	Modal.prototype.events = function () {
	    var _this = this;
	    var options = this.options;
	    var $element = this.$element;
	    var $dimmer = this.dimmer.$element;
	    var $ipt = $element.find('.' + ns_modal_prompt_input);
	    var $confirm = $element.find('[' + data_ns_modal_confirm + ']');
	    var $cancel = $element.find('[' + data_ns_modal_cancel + ']');
	    var getData = function () {
	        var data = [];
	        $ipt.each(function () {
	            data.push($(this).val());
	        });

	        return (data.length === 0) ? undefined :
	            ((data.length === 1) ? data[0] : data);
	    };

	    // close via Esc key
	    if (this.options.cancelable) {
	        $element.on('keyup.modal.' + ui, function (e) {
	            if (_this.active && e.which === 27) {
	                $element.trigger('cancel.modal.' + ui);
	                _this.close();
	            }
	        });
	    }

	    // Close Modal when dimmer clicked
	    if (this.options.dimmer && this.options.closeViaDimmer && !this.isLoading) {
	        $dimmer.on('click.dimmer.modal.' + ui, function () {
	            _this.close();
	        });
	    }

	    // Close Modal when button clicked
	    $element.on(
	        'click.close.modal.' + ui,
	        '[data-' + ns + 'modal-close],.' + ns + 'modal-btn',
	        function (e) {
	            e.preventDefault();
	            var $this = $(this);

	            if ($this.is($confirm)) {
	                options.closeOnConfirm && _this.close();
	            } else if ($this.is($cancel)) {
	                options.closeOnCancel && _this.close();
	            } else {
	                _this.close();
	            }
	        }
	    )
	        // trigger dimmer click event if non-dialog area clicked
	        // fixes #882 caused by https://github.com/amazeui/amazeui/commit/b6be7719681193f1c4cb04af89cb9fd9f4422163
	        .on('click', function (e) {
	            // fixes #900
	            // e.stopPropagation();
	            $(e.target).is($element) && $dimmer.trigger('click.dimmer.modal.' + ui);
	        });

	    $confirm.on('click.confirm.modal.' + ui,
	        function () {
	            $element.trigger($.Event('confirm.modal.' + ui, {
	                trigger: this
	            }));
	        });

	    $cancel.on('click.cancel.modal.' + ui, function () {
	        $element.trigger($.Event('cancel.modal.' + ui, {
	            trigger: this
	        }));
	    });

	    $element.on('confirm.modal.' + ui, function (e) {
	        e.data = getData();
	        _this.options.onConfirm.call(_this, e);
	    }).on('cancel.modal.' + ui, function (e) {
	        e.data = getData();
	        _this.options.onCancel.call(_this, e);
	    });
	};

	function Plugin(option, relatedTarget) {
	    return this.each(function () {
	        var $this = $(this);
	        var data = $this.data(ui + '.modal');
	        var options = typeof option == 'object' && option;

	        if (!data) {
	            $this.data(ui + '.modal', (data = new Modal(this, options)));
	        }

	        if (typeof option == 'string') {
	            data[option] && data[option](relatedTarget);
	        } else {
	            data.toggle(option && option.relatedTarget || undefined);
	        }
	    });
	}

	$.fn.modal = Plugin;

	var event = 'click.modal.' + ui + '.data-api';
	var selector = '[data-' + ns + 'modal]';
	// Init
	$doc.on(event, selector, function () {
	    var $this = $(this);
	    var options = UI.utils.parseOptions($this.attr('data-' + ns + 'modal'));
	    var $target = $(options.target ||
	        (this.href && this.href.replace(/.*(?=#[^\s]+$)/, '')));
	    var option = $target.data(ui + '.modal') ? 'toggle' : options;

	    Plugin.call($target, option, this);
	});

	module.exports = UI.modal = Modal;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1);
	var UI = __webpack_require__(2);
	__webpack_require__(15);
	var ui = UI.namespace.ui;
	var ns = UI.namespace.class;

	var $win = $(window);
	var $doc = $(document);
	var scrollPos;

	/**
	 * @via https://github.com/uikit/uikit/blob/master/src/js/offcanvas.js
	 * @license https://github.com/uikit/uikit/blob/master/LICENSE.md
	 */

	var OffCanvas = function (element, options) {
	    this.$element = $(element);
	    this.options = $.extend({}, OffCanvas.DEFAULTS, options);
	    this.active = null;
	    this.bindEvents();
	};

	OffCanvas.DEFAULTS = {
	    duration: 300,
	    effect: 'overlay' // {push|overlay}, push is too expensive
	};

	OffCanvas.prototype.open = function (relatedElement) {
	    var _this = this;
	    var $element = this.$element;

	    if (!$element.length || $element.hasClass(ns + 'active')) {
	        return;
	    }

	    var effect = this.options.effect;
	    var $html = $('html');
	    var $body = $('body');
	    var $bar = $element.find('.' + ns + 'offcanvas-bar').first();
	    var dir = $bar.hasClass(ns + 'offcanvas-bar-flip') ? -1 : 1;

	    $bar.addClass(ns + 'offcanvas-bar-' + effect);

	    scrollPos = { x: window.scrollX, y: window.scrollY };

	    $element.addClass(ns + 'active');

	    $body.css({
	        width: window.innerWidth,
	        height: $win.height()
	    }).addClass(ns + 'offcanvas-page');

	    if (effect !== 'overlay') {
	        $body.css({
	            'margin-left': $bar.outerWidth() * dir
	        }).width(); // force redraw
	    }

	    $html.css('margin-top', scrollPos.y * -1);

	    setTimeout(function () {
	        $bar.addClass(ns + 'offcanvas-bar-active').width();
	    }, 0);

	    $element.trigger('open.offcanvas.' + ui);

	    this.active = 1;

	    // Close OffCanvas when none content area clicked
	    $element.on('click.offcanvas.' + ui, function (e) {
	        var $target = $(e.target);

	        if ($target.hasClass(ns + 'offcanvas-bar')) {
	            return;
	        }

	        if ($target.parents('.' + ns + 'offcanvas-bar').first().length) {
	            return;
	        }

	        // https://developer.mozilla.org/zh-CN/docs/DOM/event.stopImmediatePropagation
	        e.stopImmediatePropagation();

	        _this.close();
	    });

	    $html.on('keydown.offcanvas.' + ui, function (e) {
	        (e.keyCode === 27) && _this.close();
	    });
	};

	OffCanvas.prototype.close = function (relatedElement) {
	    var _this = this;
	    var $html = $('html');
	    var $body = $('body');
	    var $element = this.$element;
	    var $bar = $element.find('.' + ns + 'offcanvas-bar').first();

	    if (!$element.length || !this.active || !$element.hasClass(ns + 'active')) {
	        return;
	    }

	    $element.trigger('close.offcanvas.' + ui);

	    function complete() {
	        $body
	            .removeClass(ns + 'offcanvas-page')
	            .css({
	                width: '',
	                height: '',
	                'margin-left': '',
	                'margin-right': ''
	            });
	        $element.removeClass(ns + 'active');
	        $bar.removeClass(ns + 'offcanvas-bar-active');
	        $html.css('margin-top', '');
	        window.scrollTo(scrollPos.x, scrollPos.y);
	        $element.trigger('closed.offcanvas.' + ui);
	        _this.active = 0;
	    }

	    if (UI.support.transition) {
	        setTimeout(function () {
	            $bar.removeClass(ns + 'offcanvas-bar-active');
	        }, 0);

	        $body.css('margin-left', '').one(UI.support.transition.end, function () {
	            complete();
	        }).emulateTransitionEnd(this.options.duration);
	    } else {
	        complete();
	    }

	    $element.off('click.offcanvas.' + ui);
	    $html.off('.offcanvas.' + ui);
	};

	OffCanvas.prototype.bindEvents = function () {
	    var _this = this;
	    $doc.on('click.offcanvas.' + ui, '[data-' + ns + 'dismiss="offcanvas"]', function (e) {
	        e.preventDefault();
	        _this.close();
	    });

	    $win.on('resize.offcanvas.' + ui + ' orientationchange.offcanvas.' + ui,
	        function () {
	            _this.active && _this.close();
	        });

	    this.$element.hammer().on('swipeleft swipeleft', function (e) {
	        e.preventDefault();
	        _this.close();
	    });

	    return this;
	};

	function Plugin(option, relatedElement) {
	    var args = Array.prototype.slice.call(arguments, 1);

	    return this.each(function () {
	        var $this = $(this);
	        var data = $this.data(ui + '.offcanvas');
	        var options = $.extend({}, typeof option == 'object' && option);

	        if (!data) {
	            $this.data(ui + '.offcanvas', (data = new OffCanvas(this, options)));
	            (!option || typeof option == 'object') && data.open(relatedElement);
	        }

	        if (typeof option == 'string') {
	            data[option] && data[option].apply(data, args);
	        }
	    });
	}

	$.fn.offCanvas = Plugin;

	// Init code
	$doc.on('click.offcanvas.' + ui, '[data-' + ns + 'offcanvas]', function (e) {
	    e.preventDefault();
	    var $this = $(this);
	    var options = UI.utils.parseOptions($this.attr('data-' + ns + 'offcanvas'));
	    var $target = $(options.target ||
	        (this.href && this.href.replace(/.*(?=#[^\s]+$)/, '')));
	    var option = $target.data(ui + '.offcanvas') ? 'open' : options;

	    Plugin.call($target, option, this);
	});

	module.exports = UI.offcanvas = OffCanvas;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	/*! Hammer.JS - v2.0.8 - 2016-04-22
	 * http://hammerjs.github.io/
	 *
	 * Copyright (c) 2016 Jorik Tangelder;
	 * Licensed under the MIT license */

	'use strict';

	var $ = __webpack_require__(1);
	var UI = __webpack_require__(2);

	var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
	var TEST_ELEMENT = document.createElement('div');

	var TYPE_FUNCTION = 'function';

	var round = Math.round;
	var abs = Math.abs;
	var now = Date.now;

	/**
	 * set a timeout with a given scope
	 * @param {Function} fn
	 * @param {Number} timeout
	 * @param {Object} context
	 * @returns {number}
	 */
	function setTimeoutContext(fn, timeout, context) {
	  return setTimeout(bindFn(fn, context), timeout);
	}

	/**
	 * if the argument is an array, we want to execute the fn on each entry
	 * if it aint an array we don't want to do a thing.
	 * this is used by all the methods that accept a single and array argument.
	 * @param {*|Array} arg
	 * @param {String} fn
	 * @param {Object} [context]
	 * @returns {Boolean}
	 */
	function invokeArrayArg(arg, fn, context) {
	  if (Array.isArray(arg)) {
	    each(arg, context[fn], context);
	    return true;
	  }
	  return false;
	}

	/**
	 * walk objects and arrays
	 * @param {Object} obj
	 * @param {Function} iterator
	 * @param {Object} context
	 */
	function each(obj, iterator, context) {
	  var i;

	  if (!obj) {
	    return;
	  }

	  if (obj.forEach) {
	    obj.forEach(iterator, context);
	  } else if (obj.length !== undefined) {
	    i = 0;
	    while (i < obj.length) {
	      iterator.call(context, obj[i], i, obj);
	      i++;
	    }
	  } else {
	    for (i in obj) {
	      obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
	    }
	  }
	}

	/**
	 * wrap a method with a deprecation warning and stack trace
	 * @param {Function} method
	 * @param {String} name
	 * @param {String} message
	 * @returns {Function} A new function wrapping the supplied method.
	 */
	function deprecate(method, name, message) {
	  var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
	  return function() {
	    var e = new Error('get-stack-trace');
	    var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
	      .replace(/^\s+at\s+/gm, '')
	      .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

	    var log = window.console && (window.console.warn || window.console.log);
	    if (log) {
	      log.call(window.console, deprecationMessage, stack);
	    }
	    return method.apply(this, arguments);
	  };
	}

	/**
	 * extend object.
	 * means that properties in dest will be overwritten by the ones in src.
	 * @param {Object} target
	 * @param {...Object} objects_to_assign
	 * @returns {Object} target
	 */
	var assign;
	if (typeof Object.assign !== 'function') {
	  assign = function assign(target) {
	    if (target === undefined || target === null) {
	      throw new TypeError('Cannot convert undefined or null to object');
	    }

	    var output = Object(target);
	    for (var index = 1; index < arguments.length; index++) {
	      var source = arguments[index];
	      if (source !== undefined && source !== null) {
	        for (var nextKey in source) {
	          if (source.hasOwnProperty(nextKey)) {
	            output[nextKey] = source[nextKey];
	          }
	        }
	      }
	    }
	    return output;
	  };
	} else {
	  assign = Object.assign;
	}

	/**
	 * extend object.
	 * means that properties in dest will be overwritten by the ones in src.
	 * @param {Object} dest
	 * @param {Object} src
	 * @param {Boolean} [merge=false]
	 * @returns {Object} dest
	 */
	var extend = deprecate(function extend(dest, src, merge) {
	  var keys = Object.keys(src);
	  var i = 0;
	  while (i < keys.length) {
	    if (!merge || (merge && dest[keys[i]] === undefined)) {
	      dest[keys[i]] = src[keys[i]];
	    }
	    i++;
	  }
	  return dest;
	}, 'extend', 'Use `assign`.');

	/**
	 * merge the values from src in the dest.
	 * means that properties that exist in dest will not be overwritten by src
	 * @param {Object} dest
	 * @param {Object} src
	 * @returns {Object} dest
	 */
	var merge = deprecate(function merge(dest, src) {
	  return extend(dest, src, true);
	}, 'merge', 'Use `assign`.');

	/**
	 * simple class inheritance
	 * @param {Function} child
	 * @param {Function} base
	 * @param {Object} [properties]
	 */
	function inherit(child, base, properties) {
	  var baseP = base.prototype,
	    childP;

	  childP = child.prototype = Object.create(baseP);
	  childP.constructor = child;
	  childP._super = baseP;

	  if (properties) {
	    assign(childP, properties);
	  }
	}

	/**
	 * simple function bind
	 * @param {Function} fn
	 * @param {Object} context
	 * @returns {Function}
	 */
	function bindFn(fn, context) {
	  return function boundFn() {
	    return fn.apply(context, arguments);
	  };
	}

	/**
	 * let a boolean value also be a function that must return a boolean
	 * this first item in args will be used as the context
	 * @param {Boolean|Function} val
	 * @param {Array} [args]
	 * @returns {Boolean}
	 */
	function boolOrFn(val, args) {
	  if (typeof val == TYPE_FUNCTION) {
	    return val.apply(args ? args[0] || undefined : undefined, args);
	  }
	  return val;
	}

	/**
	 * use the val2 when val1 is undefined
	 * @param {*} val1
	 * @param {*} val2
	 * @returns {*}
	 */
	function ifUndefined(val1, val2) {
	  return (val1 === undefined) ? val2 : val1;
	}

	/**
	 * addEventListener with multiple events at once
	 * @param {EventTarget} target
	 * @param {String} types
	 * @param {Function} handler
	 */
	function addEventListeners(target, types, handler) {
	  each(splitStr(types), function(type) {
	    target.addEventListener(type, handler, false);
	  });
	}

	/**
	 * removeEventListener with multiple events at once
	 * @param {EventTarget} target
	 * @param {String} types
	 * @param {Function} handler
	 */
	function removeEventListeners(target, types, handler) {
	  each(splitStr(types), function(type) {
	    target.removeEventListener(type, handler, false);
	  });
	}

	/**
	 * find if a node is in the given parent
	 * @method hasParent
	 * @param {HTMLElement} node
	 * @param {HTMLElement} parent
	 * @return {Boolean} found
	 */
	function hasParent(node, parent) {
	  while (node) {
	    if (node == parent) {
	      return true;
	    }
	    node = node.parentNode;
	  }
	  return false;
	}

	/**
	 * small indexOf wrapper
	 * @param {String} str
	 * @param {String} find
	 * @returns {Boolean} found
	 */
	function inStr(str, find) {
	  return str.indexOf(find) > -1;
	}

	/**
	 * split string on whitespace
	 * @param {String} str
	 * @returns {Array} words
	 */
	function splitStr(str) {
	  return str.trim().split(/\s+/g);
	}

	/**
	 * find if a array contains the object using indexOf or a simple polyFill
	 * @param {Array} src
	 * @param {String} find
	 * @param {String} [findByKey]
	 * @return {Boolean|Number} false when not found, or the index
	 */
	function inArray(src, find, findByKey) {
	  if (src.indexOf && !findByKey) {
	    return src.indexOf(find);
	  } else {
	    var i = 0;
	    while (i < src.length) {
	      if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
	        return i;
	      }
	      i++;
	    }
	    return -1;
	  }
	}

	/**
	 * convert array-like objects to real arrays
	 * @param {Object} obj
	 * @returns {Array}
	 */
	function toArray(obj) {
	  return Array.prototype.slice.call(obj, 0);
	}

	/**
	 * unique array with objects based on a key (like 'id') or just by the array's value
	 * @param {Array} src [{id:1},{id:2},{id:1}]
	 * @param {String} [key]
	 * @param {Boolean} [sort=False]
	 * @returns {Array} [{id:1},{id:2}]
	 */
	function uniqueArray(src, key, sort) {
	  var results = [];
	  var values = [];
	  var i = 0;

	  while (i < src.length) {
	    var val = key ? src[i][key] : src[i];
	    if (inArray(values, val) < 0) {
	      results.push(src[i]);
	    }
	    values[i] = val;
	    i++;
	  }

	  if (sort) {
	    if (!key) {
	      results = results.sort();
	    } else {
	      results = results.sort(function sortUniqueArray(a, b) {
	        return a[key] > b[key];
	      });
	    }
	  }

	  return results;
	}

	/**
	 * get the prefixed property
	 * @param {Object} obj
	 * @param {String} property
	 * @returns {String|Undefined} prefixed
	 */
	function prefixed(obj, property) {
	  var prefix, prop;
	  var camelProp = property[0].toUpperCase() + property.slice(1);

	  var i = 0;
	  while (i < VENDOR_PREFIXES.length) {
	    prefix = VENDOR_PREFIXES[i];
	    prop = (prefix) ? prefix + camelProp : property;

	    if (prop in obj) {
	      return prop;
	    }
	    i++;
	  }
	  return undefined;
	}

	/**
	 * get a unique id
	 * @returns {number} uniqueId
	 */
	var _uniqueId = 1;
	function uniqueId() {
	  return _uniqueId++;
	}

	/**
	 * get the window object of an element
	 * @param {HTMLElement} element
	 * @returns {DocumentView|Window}
	 */
	function getWindowForElement(element) {
	  var doc = element.ownerDocument || element;
	  return (doc.defaultView || doc.parentWindow || window);
	}

	var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

	var SUPPORT_TOUCH = ('ontouchstart' in window);
	var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
	var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

	var INPUT_TYPE_TOUCH = 'touch';
	var INPUT_TYPE_PEN = 'pen';
	var INPUT_TYPE_MOUSE = 'mouse';
	var INPUT_TYPE_KINECT = 'kinect';

	var COMPUTE_INTERVAL = 25;

	var INPUT_START = 1;
	var INPUT_MOVE = 2;
	var INPUT_END = 4;
	var INPUT_CANCEL = 8;

	var DIRECTION_NONE = 1;
	var DIRECTION_LEFT = 2;
	var DIRECTION_RIGHT = 4;
	var DIRECTION_UP = 8;
	var DIRECTION_DOWN = 16;

	var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
	var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
	var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

	var PROPS_XY = ['x', 'y'];
	var PROPS_CLIENT_XY = ['clientX', 'clientY'];

	/**
	 * create new input type manager
	 * @param {Manager} manager
	 * @param {Function} callback
	 * @returns {Input}
	 * @constructor
	 */
	function Input(manager, callback) {
	  var self = this;
	  this.manager = manager;
	  this.callback = callback;
	  this.element = manager.element;
	  this.target = manager.options.inputTarget;

	  // smaller wrapper around the handler, for the scope and the enabled state of the manager,
	  // so when disabled the input events are completely bypassed.
	  this.domHandler = function(ev) {
	    if (boolOrFn(manager.options.enable, [manager])) {
	      self.handler(ev);
	    }
	  };

	  this.init();

	}

	Input.prototype = {
	  /**
	   * should handle the inputEvent data and trigger the callback
	   * @virtual
	   */
	  handler: function() { },

	  /**
	   * bind the events
	   */
	  init: function() {
	    this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
	    this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
	    this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	  },

	  /**
	   * unbind the events
	   */
	  destroy: function() {
	    this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
	    this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
	    this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	  }
	};

	/**
	 * create new input type manager
	 * called by the Manager constructor
	 * @param {Hammer} manager
	 * @returns {Input}
	 */
	function createInputInstance(manager) {
	  var Type;
	  var inputClass = manager.options.inputClass;

	  if (inputClass) {
	    Type = inputClass;
	  } else if (SUPPORT_POINTER_EVENTS) {
	    Type = PointerEventInput;
	  } else if (SUPPORT_ONLY_TOUCH) {
	    Type = TouchInput;
	  } else if (!SUPPORT_TOUCH) {
	    Type = MouseInput;
	  } else {
	    Type = TouchMouseInput;
	  }
	  return new (Type)(manager, inputHandler);
	}

	/**
	 * handle input events
	 * @param {Manager} manager
	 * @param {String} eventType
	 * @param {Object} input
	 */
	function inputHandler(manager, eventType, input) {
	  var pointersLen = input.pointers.length;
	  var changedPointersLen = input.changedPointers.length;
	  var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
	  var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

	  input.isFirst = !!isFirst;
	  input.isFinal = !!isFinal;

	  if (isFirst) {
	    manager.session = {};
	  }

	  // source event is the normalized value of the domEvents
	  // like 'touchstart, mouseup, pointerdown'
	  input.eventType = eventType;

	  // compute scale, rotation etc
	  computeInputData(manager, input);

	  // emit secret event
	  manager.emit('hammer.input', input);

	  manager.recognize(input);
	  manager.session.prevInput = input;
	}

	/**
	 * extend the data with some usable properties like scale, rotate, velocity etc
	 * @param {Object} manager
	 * @param {Object} input
	 */
	function computeInputData(manager, input) {
	  var session = manager.session;
	  var pointers = input.pointers;
	  var pointersLength = pointers.length;

	  // store the first input to calculate the distance and direction
	  if (!session.firstInput) {
	    session.firstInput = simpleCloneInputData(input);
	  }

	  // to compute scale and rotation we need to store the multiple touches
	  if (pointersLength > 1 && !session.firstMultiple) {
	    session.firstMultiple = simpleCloneInputData(input);
	  } else if (pointersLength === 1) {
	    session.firstMultiple = false;
	  }

	  var firstInput = session.firstInput;
	  var firstMultiple = session.firstMultiple;
	  var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

	  var center = input.center = getCenter(pointers);
	  input.timeStamp = now();
	  input.deltaTime = input.timeStamp - firstInput.timeStamp;

	  input.angle = getAngle(offsetCenter, center);
	  input.distance = getDistance(offsetCenter, center);

	  computeDeltaXY(session, input);
	  input.offsetDirection = getDirection(input.deltaX, input.deltaY);

	  var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
	  input.overallVelocityX = overallVelocity.x;
	  input.overallVelocityY = overallVelocity.y;
	  input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;

	  input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
	  input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

	  input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
	  session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);

	  computeIntervalInputData(session, input);

	  // find the correct target
	  var target = manager.element;
	  if (hasParent(input.srcEvent.target, target)) {
	    target = input.srcEvent.target;
	  }
	  input.target = target;
	}

	function computeDeltaXY(session, input) {
	  var center = input.center;
	  var offset = session.offsetDelta || {};
	  var prevDelta = session.prevDelta || {};
	  var prevInput = session.prevInput || {};

	  if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
	    prevDelta = session.prevDelta = {
	      x: prevInput.deltaX || 0,
	      y: prevInput.deltaY || 0
	    };

	    offset = session.offsetDelta = {
	      x: center.x,
	      y: center.y
	    };
	  }

	  input.deltaX = prevDelta.x + (center.x - offset.x);
	  input.deltaY = prevDelta.y + (center.y - offset.y);
	}

	/**
	 * velocity is calculated every x ms
	 * @param {Object} session
	 * @param {Object} input
	 */
	function computeIntervalInputData(session, input) {
	  var last = session.lastInterval || input,
	    deltaTime = input.timeStamp - last.timeStamp,
	    velocity, velocityX, velocityY, direction;

	  if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
	    var deltaX = input.deltaX - last.deltaX;
	    var deltaY = input.deltaY - last.deltaY;

	    var v = getVelocity(deltaTime, deltaX, deltaY);
	    velocityX = v.x;
	    velocityY = v.y;
	    velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
	    direction = getDirection(deltaX, deltaY);

	    session.lastInterval = input;
	  } else {
	    // use latest velocity info if it doesn't overtake a minimum period
	    velocity = last.velocity;
	    velocityX = last.velocityX;
	    velocityY = last.velocityY;
	    direction = last.direction;
	  }

	  input.velocity = velocity;
	  input.velocityX = velocityX;
	  input.velocityY = velocityY;
	  input.direction = direction;
	}

	/**
	 * create a simple clone from the input used for storage of firstInput and firstMultiple
	 * @param {Object} input
	 * @returns {Object} clonedInputData
	 */
	function simpleCloneInputData(input) {
	  // make a simple copy of the pointers because we will get a reference if we don't
	  // we only need clientXY for the calculations
	  var pointers = [];
	  var i = 0;
	  while (i < input.pointers.length) {
	    pointers[i] = {
	      clientX: round(input.pointers[i].clientX),
	      clientY: round(input.pointers[i].clientY)
	    };
	    i++;
	  }

	  return {
	    timeStamp: now(),
	    pointers: pointers,
	    center: getCenter(pointers),
	    deltaX: input.deltaX,
	    deltaY: input.deltaY
	  };
	}

	/**
	 * get the center of all the pointers
	 * @param {Array} pointers
	 * @return {Object} center contains `x` and `y` properties
	 */
	function getCenter(pointers) {
	  var pointersLength = pointers.length;

	  // no need to loop when only one touch
	  if (pointersLength === 1) {
	    return {
	      x: round(pointers[0].clientX),
	      y: round(pointers[0].clientY)
	    };
	  }

	  var x = 0, y = 0, i = 0;
	  while (i < pointersLength) {
	    x += pointers[i].clientX;
	    y += pointers[i].clientY;
	    i++;
	  }

	  return {
	    x: round(x / pointersLength),
	    y: round(y / pointersLength)
	  };
	}

	/**
	 * calculate the velocity between two points. unit is in px per ms.
	 * @param {Number} deltaTime
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Object} velocity `x` and `y`
	 */
	function getVelocity(deltaTime, x, y) {
	  return {
	    x: x / deltaTime || 0,
	    y: y / deltaTime || 0
	  };
	}

	/**
	 * get the direction between two points
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Number} direction
	 */
	function getDirection(x, y) {
	  if (x === y) {
	    return DIRECTION_NONE;
	  }

	  if (abs(x) >= abs(y)) {
	    return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
	  }
	  return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
	}

	/**
	 * calculate the absolute distance between two points
	 * @param {Object} p1 {x, y}
	 * @param {Object} p2 {x, y}
	 * @param {Array} [props] containing x and y keys
	 * @return {Number} distance
	 */
	function getDistance(p1, p2, props) {
	  if (!props) {
	    props = PROPS_XY;
	  }
	  var x = p2[props[0]] - p1[props[0]],
	    y = p2[props[1]] - p1[props[1]];

	  return Math.sqrt((x * x) + (y * y));
	}

	/**
	 * calculate the angle between two coordinates
	 * @param {Object} p1
	 * @param {Object} p2
	 * @param {Array} [props] containing x and y keys
	 * @return {Number} angle
	 */
	function getAngle(p1, p2, props) {
	  if (!props) {
	    props = PROPS_XY;
	  }
	  var x = p2[props[0]] - p1[props[0]],
	    y = p2[props[1]] - p1[props[1]];
	  return Math.atan2(y, x) * 180 / Math.PI;
	}

	/**
	 * calculate the rotation degrees between two pointersets
	 * @param {Array} start array of pointers
	 * @param {Array} end array of pointers
	 * @return {Number} rotation
	 */
	function getRotation(start, end) {
	  return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
	}

	/**
	 * calculate the scale factor between two pointersets
	 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
	 * @param {Array} start array of pointers
	 * @param {Array} end array of pointers
	 * @return {Number} scale
	 */
	function getScale(start, end) {
	  return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
	}

	var MOUSE_INPUT_MAP = {
	  mousedown: INPUT_START,
	  mousemove: INPUT_MOVE,
	  mouseup: INPUT_END
	};

	var MOUSE_ELEMENT_EVENTS = 'mousedown';
	var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

	/**
	 * Mouse events input
	 * @constructor
	 * @extends Input
	 */
	function MouseInput() {
	  this.evEl = MOUSE_ELEMENT_EVENTS;
	  this.evWin = MOUSE_WINDOW_EVENTS;

	  this.pressed = false; // mousedown state

	  Input.apply(this, arguments);
	}

	inherit(MouseInput, Input, {
	  /**
	   * handle mouse events
	   * @param {Object} ev
	   */
	  handler: function MEhandler(ev) {
	    var eventType = MOUSE_INPUT_MAP[ev.type];

	    // on start we want to have the left mouse button down
	    if (eventType & INPUT_START && ev.button === 0) {
	      this.pressed = true;
	    }

	    if (eventType & INPUT_MOVE && ev.which !== 1) {
	      eventType = INPUT_END;
	    }

	    // mouse must be down
	    if (!this.pressed) {
	      return;
	    }

	    if (eventType & INPUT_END) {
	      this.pressed = false;
	    }

	    this.callback(this.manager, eventType, {
	      pointers: [ev],
	      changedPointers: [ev],
	      pointerType: INPUT_TYPE_MOUSE,
	      srcEvent: ev
	    });
	  }
	});

	var POINTER_INPUT_MAP = {
	  pointerdown: INPUT_START,
	  pointermove: INPUT_MOVE,
	  pointerup: INPUT_END,
	  pointercancel: INPUT_CANCEL,
	  pointerout: INPUT_CANCEL
	};

	// in IE10 the pointer types is defined as an enum
	var IE10_POINTER_TYPE_ENUM = {
	  2: INPUT_TYPE_TOUCH,
	  3: INPUT_TYPE_PEN,
	  4: INPUT_TYPE_MOUSE,
	  5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
	};

	var POINTER_ELEMENT_EVENTS = 'pointerdown';
	var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

	// IE10 has prefixed support, and case-sensitive
	if (window.MSPointerEvent && !window.PointerEvent) {
	  POINTER_ELEMENT_EVENTS = 'MSPointerDown';
	  POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
	}

	/**
	 * Pointer events input
	 * @constructor
	 * @extends Input
	 */
	function PointerEventInput() {
	  this.evEl = POINTER_ELEMENT_EVENTS;
	  this.evWin = POINTER_WINDOW_EVENTS;

	  Input.apply(this, arguments);

	  this.store = (this.manager.session.pointerEvents = []);
	}

	inherit(PointerEventInput, Input, {
	  /**
	   * handle mouse events
	   * @param {Object} ev
	   */
	  handler: function PEhandler(ev) {
	    var store = this.store;
	    var removePointer = false;

	    var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
	    var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
	    var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

	    var isTouch = (pointerType == INPUT_TYPE_TOUCH);

	    // get index of the event in the store
	    var storeIndex = inArray(store, ev.pointerId, 'pointerId');

	    // start and mouse must be down
	    if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
	      if (storeIndex < 0) {
	        store.push(ev);
	        storeIndex = store.length - 1;
	      }
	    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	      removePointer = true;
	    }

	    // it not found, so the pointer hasn't been down (so it's probably a hover)
	    if (storeIndex < 0) {
	      return;
	    }

	    // update the event in the store
	    store[storeIndex] = ev;

	    this.callback(this.manager, eventType, {
	      pointers: store,
	      changedPointers: [ev],
	      pointerType: pointerType,
	      srcEvent: ev
	    });

	    if (removePointer) {
	      // remove from the store
	      store.splice(storeIndex, 1);
	    }
	  }
	});

	var SINGLE_TOUCH_INPUT_MAP = {
	  touchstart: INPUT_START,
	  touchmove: INPUT_MOVE,
	  touchend: INPUT_END,
	  touchcancel: INPUT_CANCEL
	};

	var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
	var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

	/**
	 * Touch events input
	 * @constructor
	 * @extends Input
	 */
	function SingleTouchInput() {
	  this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
	  this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
	  this.started = false;

	  Input.apply(this, arguments);
	}

	inherit(SingleTouchInput, Input, {
	  handler: function TEhandler(ev) {
	    var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

	    // should we handle the touch events?
	    if (type === INPUT_START) {
	      this.started = true;
	    }

	    if (!this.started) {
	      return;
	    }

	    var touches = normalizeSingleTouches.call(this, ev, type);

	    // when done, reset the started state
	    if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
	      this.started = false;
	    }

	    this.callback(this.manager, type, {
	      pointers: touches[0],
	      changedPointers: touches[1],
	      pointerType: INPUT_TYPE_TOUCH,
	      srcEvent: ev
	    });
	  }
	});

	/**
	 * @this {TouchInput}
	 * @param {Object} ev
	 * @param {Number} type flag
	 * @returns {undefined|Array} [all, changed]
	 */
	function normalizeSingleTouches(ev, type) {
	  var all = toArray(ev.touches);
	  var changed = toArray(ev.changedTouches);

	  if (type & (INPUT_END | INPUT_CANCEL)) {
	    all = uniqueArray(all.concat(changed), 'identifier', true);
	  }

	  return [all, changed];
	}

	var TOUCH_INPUT_MAP = {
	  touchstart: INPUT_START,
	  touchmove: INPUT_MOVE,
	  touchend: INPUT_END,
	  touchcancel: INPUT_CANCEL
	};

	var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

	/**
	 * Multi-user touch events input
	 * @constructor
	 * @extends Input
	 */
	function TouchInput() {
	  this.evTarget = TOUCH_TARGET_EVENTS;
	  this.targetIds = {};

	  Input.apply(this, arguments);
	}

	inherit(TouchInput, Input, {
	  handler: function MTEhandler(ev) {
	    var type = TOUCH_INPUT_MAP[ev.type];
	    var touches = getTouches.call(this, ev, type);
	    if (!touches) {
	      return;
	    }

	    this.callback(this.manager, type, {
	      pointers: touches[0],
	      changedPointers: touches[1],
	      pointerType: INPUT_TYPE_TOUCH,
	      srcEvent: ev
	    });
	  }
	});

	/**
	 * @this {TouchInput}
	 * @param {Object} ev
	 * @param {Number} type flag
	 * @returns {undefined|Array} [all, changed]
	 */
	function getTouches(ev, type) {
	  var allTouches = toArray(ev.touches);
	  var targetIds = this.targetIds;

	  // when there is only one touch, the process can be simplified
	  if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
	    targetIds[allTouches[0].identifier] = true;
	    return [allTouches, allTouches];
	  }

	  var i,
	    targetTouches,
	    changedTouches = toArray(ev.changedTouches),
	    changedTargetTouches = [],
	    target = this.target;

	  // get target touches from touches
	  targetTouches = allTouches.filter(function(touch) {
	    return hasParent(touch.target, target);
	  });

	  // collect touches
	  if (type === INPUT_START) {
	    i = 0;
	    while (i < targetTouches.length) {
	      targetIds[targetTouches[i].identifier] = true;
	      i++;
	    }
	  }

	  // filter changed touches to only contain touches that exist in the collected target ids
	  i = 0;
	  while (i < changedTouches.length) {
	    if (targetIds[changedTouches[i].identifier]) {
	      changedTargetTouches.push(changedTouches[i]);
	    }

	    // cleanup removed touches
	    if (type & (INPUT_END | INPUT_CANCEL)) {
	      delete targetIds[changedTouches[i].identifier];
	    }
	    i++;
	  }

	  if (!changedTargetTouches.length) {
	    return;
	  }

	  return [
	    // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
	    uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
	    changedTargetTouches
	  ];
	}

	/**
	 * Combined touch and mouse input
	 *
	 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
	 * This because touch devices also emit mouse events while doing a touch.
	 *
	 * @constructor
	 * @extends Input
	 */

	var DEDUP_TIMEOUT = 2500;
	var DEDUP_DISTANCE = 25;

	function TouchMouseInput() {
	  Input.apply(this, arguments);

	  var handler = bindFn(this.handler, this);
	  this.touch = new TouchInput(this.manager, handler);
	  this.mouse = new MouseInput(this.manager, handler);

	  this.primaryTouch = null;
	  this.lastTouches = [];
	}

	inherit(TouchMouseInput, Input, {
	  /**
	   * handle mouse and touch events
	   * @param {Hammer} manager
	   * @param {String} inputEvent
	   * @param {Object} inputData
	   */
	  handler: function TMEhandler(manager, inputEvent, inputData) {
	    var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
	      isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

	    if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
	      return;
	    }

	    // when we're in a touch event, record touches to  de-dupe synthetic mouse event
	    if (isTouch) {
	      recordTouches.call(this, inputEvent, inputData);
	    } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
	      return;
	    }

	    this.callback(manager, inputEvent, inputData);
	  },

	  /**
	   * remove the event listeners
	   */
	  destroy: function destroy() {
	    this.touch.destroy();
	    this.mouse.destroy();
	  }
	});

	function recordTouches(eventType, eventData) {
	  if (eventType & INPUT_START) {
	    this.primaryTouch = eventData.changedPointers[0].identifier;
	    setLastTouch.call(this, eventData);
	  } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	    setLastTouch.call(this, eventData);
	  }
	}

	function setLastTouch(eventData) {
	  var touch = eventData.changedPointers[0];

	  if (touch.identifier === this.primaryTouch) {
	    var lastTouch = {x: touch.clientX, y: touch.clientY};
	    this.lastTouches.push(lastTouch);
	    var lts = this.lastTouches;
	    var removeLastTouch = function() {
	      var i = lts.indexOf(lastTouch);
	      if (i > -1) {
	        lts.splice(i, 1);
	      }
	    };
	    setTimeout(removeLastTouch, DEDUP_TIMEOUT);
	  }
	}

	function isSyntheticEvent(eventData) {
	  var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
	  for (var i = 0; i < this.lastTouches.length; i++) {
	    var t = this.lastTouches[i];
	    var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
	    if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
	      return true;
	    }
	  }
	  return false;
	}

	var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
	var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

	// magical touchAction value
	var TOUCH_ACTION_COMPUTE = 'compute';
	var TOUCH_ACTION_AUTO = 'auto';
	var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
	var TOUCH_ACTION_NONE = 'none';
	var TOUCH_ACTION_PAN_X = 'pan-x';
	var TOUCH_ACTION_PAN_Y = 'pan-y';
	var TOUCH_ACTION_MAP = getTouchActionProps();

	/**
	 * Touch Action
	 * sets the touchAction property or uses the js alternative
	 * @param {Manager} manager
	 * @param {String} value
	 * @constructor
	 */
	function TouchAction(manager, value) {
	  this.manager = manager;
	  this.set(value);
	}

	TouchAction.prototype = {
	  /**
	   * set the touchAction value on the element or enable the polyfill
	   * @param {String} value
	   */
	  set: function(value) {
	    // find out the touch-action by the event handlers
	    if (value == TOUCH_ACTION_COMPUTE) {
	      value = this.compute();
	    }

	    if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
	      this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
	    }
	    this.actions = value.toLowerCase().trim();
	  },

	  /**
	   * just re-set the touchAction value
	   */
	  update: function() {
	    this.set(this.manager.options.touchAction);
	  },

	  /**
	   * compute the value for the touchAction property based on the recognizer's settings
	   * @returns {String} value
	   */
	  compute: function() {
	    var actions = [];
	    each(this.manager.recognizers, function(recognizer) {
	      if (boolOrFn(recognizer.options.enable, [recognizer])) {
	        actions = actions.concat(recognizer.getTouchAction());
	      }
	    });
	    return cleanTouchActions(actions.join(' '));
	  },

	  /**
	   * this method is called on each input cycle and provides the preventing of the browser behavior
	   * @param {Object} input
	   */
	  preventDefaults: function(input) {
	    var srcEvent = input.srcEvent;
	    var direction = input.offsetDirection;

	    // if the touch action did prevented once this session
	    if (this.manager.session.prevented) {
	      srcEvent.preventDefault();
	      return;
	    }

	    var actions = this.actions;
	    var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
	    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
	    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

	    if (hasNone) {
	      //do not prevent defaults if this is a tap gesture

	      var isTapPointer = input.pointers.length === 1;
	      var isTapMovement = input.distance < 2;
	      var isTapTouchTime = input.deltaTime < 250;

	      if (isTapPointer && isTapMovement && isTapTouchTime) {
	        return;
	      }
	    }

	    if (hasPanX && hasPanY) {
	      // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
	      return;
	    }

	    if (hasNone ||
	      (hasPanY && direction & DIRECTION_HORIZONTAL) ||
	      (hasPanX && direction & DIRECTION_VERTICAL)) {
	      return this.preventSrc(srcEvent);
	    }
	  },

	  /**
	   * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
	   * @param {Object} srcEvent
	   */
	  preventSrc: function(srcEvent) {
	    this.manager.session.prevented = true;
	    srcEvent.preventDefault();
	  }
	};

	/**
	 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
	 * @param {String} actions
	 * @returns {*}
	 */
	function cleanTouchActions(actions) {
	  // none
	  if (inStr(actions, TOUCH_ACTION_NONE)) {
	    return TOUCH_ACTION_NONE;
	  }

	  var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
	  var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

	  // if both pan-x and pan-y are set (different recognizers
	  // for different directions, e.g. horizontal pan but vertical swipe?)
	  // we need none (as otherwise with pan-x pan-y combined none of these
	  // recognizers will work, since the browser would handle all panning
	  if (hasPanX && hasPanY) {
	    return TOUCH_ACTION_NONE;
	  }

	  // pan-x OR pan-y
	  if (hasPanX || hasPanY) {
	    return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
	  }

	  // manipulation
	  if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
	    return TOUCH_ACTION_MANIPULATION;
	  }

	  return TOUCH_ACTION_AUTO;
	}

	function getTouchActionProps() {
	  if (!NATIVE_TOUCH_ACTION) {
	    return false;
	  }
	  var touchMap = {};
	  var cssSupports = window.CSS && window.CSS.supports;
	  ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {

	    // If css.supports is not supported but there is native touch-action assume it supports
	    // all values. This is the case for IE 10 and 11.
	    touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
	  });
	  return touchMap;
	}

	/**
	 * Recognizer flow explained; *
	 * All recognizers have the initial state of POSSIBLE when a input session starts.
	 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
	 * Example session for mouse-input: mousedown -> mousemove -> mouseup
	 *
	 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
	 * which determines with state it should be.
	 *
	 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
	 * POSSIBLE to give it another change on the next cycle.
	 *
	 *               Possible
	 *                  |
	 *            +-----+---------------+
	 *            |                     |
	 *      +-----+-----+               |
	 *      |           |               |
	 *   Failed      Cancelled          |
	 *                          +-------+------+
	 *                          |              |
	 *                      Recognized       Began
	 *                                         |
	 *                                      Changed
	 *                                         |
	 *                                  Ended/Recognized
	 */
	var STATE_POSSIBLE = 1;
	var STATE_BEGAN = 2;
	var STATE_CHANGED = 4;
	var STATE_ENDED = 8;
	var STATE_RECOGNIZED = STATE_ENDED;
	var STATE_CANCELLED = 16;
	var STATE_FAILED = 32;

	/**
	 * Recognizer
	 * Every recognizer needs to extend from this class.
	 * @constructor
	 * @param {Object} options
	 */
	function Recognizer(options) {
	  this.options = assign({}, this.defaults, options || {});

	  this.id = uniqueId();

	  this.manager = null;

	  // default is enable true
	  this.options.enable = ifUndefined(this.options.enable, true);

	  this.state = STATE_POSSIBLE;

	  this.simultaneous = {};
	  this.requireFail = [];
	}

	Recognizer.prototype = {
	  /**
	   * @virtual
	   * @type {Object}
	   */
	  defaults: {},

	  /**
	   * set options
	   * @param {Object} options
	   * @return {Recognizer}
	   */
	  set: function(options) {
	    assign(this.options, options);

	    // also update the touchAction, in case something changed about the directions/enabled state
	    this.manager && this.manager.touchAction.update();
	    return this;
	  },

	  /**
	   * recognize simultaneous with an other recognizer.
	   * @param {Recognizer} otherRecognizer
	   * @returns {Recognizer} this
	   */
	  recognizeWith: function(otherRecognizer) {
	    if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
	      return this;
	    }

	    var simultaneous = this.simultaneous;
	    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	    if (!simultaneous[otherRecognizer.id]) {
	      simultaneous[otherRecognizer.id] = otherRecognizer;
	      otherRecognizer.recognizeWith(this);
	    }
	    return this;
	  },

	  /**
	   * drop the simultaneous link. it doesnt remove the link on the other recognizer.
	   * @param {Recognizer} otherRecognizer
	   * @returns {Recognizer} this
	   */
	  dropRecognizeWith: function(otherRecognizer) {
	    if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
	      return this;
	    }

	    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	    delete this.simultaneous[otherRecognizer.id];
	    return this;
	  },

	  /**
	   * recognizer can only run when an other is failing
	   * @param {Recognizer} otherRecognizer
	   * @returns {Recognizer} this
	   */
	  requireFailure: function(otherRecognizer) {
	    if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
	      return this;
	    }

	    var requireFail = this.requireFail;
	    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	    if (inArray(requireFail, otherRecognizer) === -1) {
	      requireFail.push(otherRecognizer);
	      otherRecognizer.requireFailure(this);
	    }
	    return this;
	  },

	  /**
	   * drop the requireFailure link. it does not remove the link on the other recognizer.
	   * @param {Recognizer} otherRecognizer
	   * @returns {Recognizer} this
	   */
	  dropRequireFailure: function(otherRecognizer) {
	    if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
	      return this;
	    }

	    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	    var index = inArray(this.requireFail, otherRecognizer);
	    if (index > -1) {
	      this.requireFail.splice(index, 1);
	    }
	    return this;
	  },

	  /**
	   * has require failures boolean
	   * @returns {boolean}
	   */
	  hasRequireFailures: function() {
	    return this.requireFail.length > 0;
	  },

	  /**
	   * if the recognizer can recognize simultaneous with an other recognizer
	   * @param {Recognizer} otherRecognizer
	   * @returns {Boolean}
	   */
	  canRecognizeWith: function(otherRecognizer) {
	    return !!this.simultaneous[otherRecognizer.id];
	  },

	  /**
	   * You should use `tryEmit` instead of `emit` directly to check
	   * that all the needed recognizers has failed before emitting.
	   * @param {Object} input
	   */
	  emit: function(input) {
	    var self = this;
	    var state = this.state;

	    function emit(event) {
	      self.manager.emit(event, input);
	    }

	    // 'panstart' and 'panmove'
	    if (state < STATE_ENDED) {
	      emit(self.options.event + stateStr(state));
	    }

	    emit(self.options.event); // simple 'eventName' events

	    if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
	      emit(input.additionalEvent);
	    }

	    // panend and pancancel
	    if (state >= STATE_ENDED) {
	      emit(self.options.event + stateStr(state));
	    }
	  },

	  /**
	   * Check that all the require failure recognizers has failed,
	   * if true, it emits a gesture event,
	   * otherwise, setup the state to FAILED.
	   * @param {Object} input
	   */
	  tryEmit: function(input) {
	    if (this.canEmit()) {
	      return this.emit(input);
	    }
	    // it's failing anyway
	    this.state = STATE_FAILED;
	  },

	  /**
	   * can we emit?
	   * @returns {boolean}
	   */
	  canEmit: function() {
	    var i = 0;
	    while (i < this.requireFail.length) {
	      if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
	        return false;
	      }
	      i++;
	    }
	    return true;
	  },

	  /**
	   * update the recognizer
	   * @param {Object} inputData
	   */
	  recognize: function(inputData) {
	    // make a new copy of the inputData
	    // so we can change the inputData without messing up the other recognizers
	    var inputDataClone = assign({}, inputData);

	    // is is enabled and allow recognizing?
	    if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
	      this.reset();
	      this.state = STATE_FAILED;
	      return;
	    }

	    // reset when we've reached the end
	    if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
	      this.state = STATE_POSSIBLE;
	    }

	    this.state = this.process(inputDataClone);

	    // the recognizer has recognized a gesture
	    // so trigger an event
	    if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
	      this.tryEmit(inputDataClone);
	    }
	  },

	  /**
	   * return the state of the recognizer
	   * the actual recognizing happens in this method
	   * @virtual
	   * @param {Object} inputData
	   * @returns {Const} STATE
	   */
	  process: function(inputData) { }, // jshint ignore:line

	  /**
	   * return the preferred touch-action
	   * @virtual
	   * @returns {Array}
	   */
	  getTouchAction: function() { },

	  /**
	   * called when the gesture isn't allowed to recognize
	   * like when another is being recognized or it is disabled
	   * @virtual
	   */
	  reset: function() { }
	};

	/**
	 * get a usable string, used as event postfix
	 * @param {Const} state
	 * @returns {String} state
	 */
	function stateStr(state) {
	  if (state & STATE_CANCELLED) {
	    return 'cancel';
	  } else if (state & STATE_ENDED) {
	    return 'end';
	  } else if (state & STATE_CHANGED) {
	    return 'move';
	  } else if (state & STATE_BEGAN) {
	    return 'start';
	  }
	  return '';
	}

	/**
	 * direction cons to string
	 * @param {Const} direction
	 * @returns {String}
	 */
	function directionStr(direction) {
	  if (direction == DIRECTION_DOWN) {
	    return 'down';
	  } else if (direction == DIRECTION_UP) {
	    return 'up';
	  } else if (direction == DIRECTION_LEFT) {
	    return 'left';
	  } else if (direction == DIRECTION_RIGHT) {
	    return 'right';
	  }
	  return '';
	}

	/**
	 * get a recognizer by name if it is bound to a manager
	 * @param {Recognizer|String} otherRecognizer
	 * @param {Recognizer} recognizer
	 * @returns {Recognizer}
	 */
	function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
	  var manager = recognizer.manager;
	  if (manager) {
	    return manager.get(otherRecognizer);
	  }
	  return otherRecognizer;
	}

	/**
	 * This recognizer is just used as a base for the simple attribute recognizers.
	 * @constructor
	 * @extends Recognizer
	 */
	function AttrRecognizer() {
	  Recognizer.apply(this, arguments);
	}

	inherit(AttrRecognizer, Recognizer, {
	  /**
	   * @namespace
	   * @memberof AttrRecognizer
	   */
	  defaults: {
	    /**
	     * @type {Number}
	     * @default 1
	     */
	    pointers: 1
	  },

	  /**
	   * Used to check if it the recognizer receives valid input, like input.distance > 10.
	   * @memberof AttrRecognizer
	   * @param {Object} input
	   * @returns {Boolean} recognized
	   */
	  attrTest: function(input) {
	    var optionPointers = this.options.pointers;
	    return optionPointers === 0 || input.pointers.length === optionPointers;
	  },

	  /**
	   * Process the input and return the state for the recognizer
	   * @memberof AttrRecognizer
	   * @param {Object} input
	   * @returns {*} State
	   */
	  process: function(input) {
	    var state = this.state;
	    var eventType = input.eventType;

	    var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
	    var isValid = this.attrTest(input);

	    // on cancel input and we've recognized before, return STATE_CANCELLED
	    if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
	      return state | STATE_CANCELLED;
	    } else if (isRecognized || isValid) {
	      if (eventType & INPUT_END) {
	        return state | STATE_ENDED;
	      } else if (!(state & STATE_BEGAN)) {
	        return STATE_BEGAN;
	      }
	      return state | STATE_CHANGED;
	    }
	    return STATE_FAILED;
	  }
	});

	/**
	 * Pan
	 * Recognized when the pointer is down and moved in the allowed direction.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function PanRecognizer() {
	  AttrRecognizer.apply(this, arguments);

	  this.pX = null;
	  this.pY = null;
	}

	inherit(PanRecognizer, AttrRecognizer, {
	  /**
	   * @namespace
	   * @memberof PanRecognizer
	   */
	  defaults: {
	    event: 'pan',
	    threshold: 10,
	    pointers: 1,
	    direction: DIRECTION_ALL
	  },

	  getTouchAction: function() {
	    var direction = this.options.direction;
	    var actions = [];
	    if (direction & DIRECTION_HORIZONTAL) {
	      actions.push(TOUCH_ACTION_PAN_Y);
	    }
	    if (direction & DIRECTION_VERTICAL) {
	      actions.push(TOUCH_ACTION_PAN_X);
	    }
	    return actions;
	  },

	  directionTest: function(input) {
	    var options = this.options;
	    var hasMoved = true;
	    var distance = input.distance;
	    var direction = input.direction;
	    var x = input.deltaX;
	    var y = input.deltaY;

	    // lock to axis?
	    if (!(direction & options.direction)) {
	      if (options.direction & DIRECTION_HORIZONTAL) {
	        direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
	        hasMoved = x != this.pX;
	        distance = Math.abs(input.deltaX);
	      } else {
	        direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
	        hasMoved = y != this.pY;
	        distance = Math.abs(input.deltaY);
	      }
	    }
	    input.direction = direction;
	    return hasMoved && distance > options.threshold && direction & options.direction;
	  },

	  attrTest: function(input) {
	    return AttrRecognizer.prototype.attrTest.call(this, input) &&
	      (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
	  },

	  emit: function(input) {

	    this.pX = input.deltaX;
	    this.pY = input.deltaY;

	    var direction = directionStr(input.direction);

	    if (direction) {
	      input.additionalEvent = this.options.event + direction;
	    }
	    this._super.emit.call(this, input);
	  }
	});

	/**
	 * Pinch
	 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function PinchRecognizer() {
	  AttrRecognizer.apply(this, arguments);
	}

	inherit(PinchRecognizer, AttrRecognizer, {
	  /**
	   * @namespace
	   * @memberof PinchRecognizer
	   */
	  defaults: {
	    event: 'pinch',
	    threshold: 0,
	    pointers: 2
	  },

	  getTouchAction: function() {
	    return [TOUCH_ACTION_NONE];
	  },

	  attrTest: function(input) {
	    return this._super.attrTest.call(this, input) &&
	      (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
	  },

	  emit: function(input) {
	    if (input.scale !== 1) {
	      var inOut = input.scale < 1 ? 'in' : 'out';
	      input.additionalEvent = this.options.event + inOut;
	    }
	    this._super.emit.call(this, input);
	  }
	});

	/**
	 * Press
	 * Recognized when the pointer is down for x ms without any movement.
	 * @constructor
	 * @extends Recognizer
	 */
	function PressRecognizer() {
	  Recognizer.apply(this, arguments);

	  this._timer = null;
	  this._input = null;
	}

	inherit(PressRecognizer, Recognizer, {
	  /**
	   * @namespace
	   * @memberof PressRecognizer
	   */
	  defaults: {
	    event: 'press',
	    pointers: 1,
	    time: 251, // minimal time of the pointer to be pressed
	    threshold: 9 // a minimal movement is ok, but keep it low
	  },

	  getTouchAction: function() {
	    return [TOUCH_ACTION_AUTO];
	  },

	  process: function(input) {
	    var options = this.options;
	    var validPointers = input.pointers.length === options.pointers;
	    var validMovement = input.distance < options.threshold;
	    var validTime = input.deltaTime > options.time;

	    this._input = input;

	    // we only allow little movement
	    // and we've reached an end event, so a tap is possible
	    if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
	      this.reset();
	    } else if (input.eventType & INPUT_START) {
	      this.reset();
	      this._timer = setTimeoutContext(function() {
	        this.state = STATE_RECOGNIZED;
	        this.tryEmit();
	      }, options.time, this);
	    } else if (input.eventType & INPUT_END) {
	      return STATE_RECOGNIZED;
	    }
	    return STATE_FAILED;
	  },

	  reset: function() {
	    clearTimeout(this._timer);
	  },

	  emit: function(input) {
	    if (this.state !== STATE_RECOGNIZED) {
	      return;
	    }

	    if (input && (input.eventType & INPUT_END)) {
	      this.manager.emit(this.options.event + 'up', input);
	    } else {
	      this._input.timeStamp = now();
	      this.manager.emit(this.options.event, this._input);
	    }
	  }
	});

	/**
	 * Rotate
	 * Recognized when two or more pointer are moving in a circular motion.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function RotateRecognizer() {
	  AttrRecognizer.apply(this, arguments);
	}

	inherit(RotateRecognizer, AttrRecognizer, {
	  /**
	   * @namespace
	   * @memberof RotateRecognizer
	   */
	  defaults: {
	    event: 'rotate',
	    threshold: 0,
	    pointers: 2
	  },

	  getTouchAction: function() {
	    return [TOUCH_ACTION_NONE];
	  },

	  attrTest: function(input) {
	    return this._super.attrTest.call(this, input) &&
	      (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
	  }
	});

	/**
	 * Swipe
	 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function SwipeRecognizer() {
	  AttrRecognizer.apply(this, arguments);
	}

	inherit(SwipeRecognizer, AttrRecognizer, {
	  /**
	   * @namespace
	   * @memberof SwipeRecognizer
	   */
	  defaults: {
	    event: 'swipe',
	    threshold: 10,
	    velocity: 0.3,
	    direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
	    pointers: 1
	  },

	  getTouchAction: function() {
	    return PanRecognizer.prototype.getTouchAction.call(this);
	  },

	  attrTest: function(input) {
	    var direction = this.options.direction;
	    var velocity;

	    if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
	      velocity = input.overallVelocity;
	    } else if (direction & DIRECTION_HORIZONTAL) {
	      velocity = input.overallVelocityX;
	    } else if (direction & DIRECTION_VERTICAL) {
	      velocity = input.overallVelocityY;
	    }

	    return this._super.attrTest.call(this, input) &&
	      direction & input.offsetDirection &&
	      input.distance > this.options.threshold &&
	      input.maxPointers == this.options.pointers &&
	      abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
	  },

	  emit: function(input) {
	    var direction = directionStr(input.offsetDirection);
	    if (direction) {
	      this.manager.emit(this.options.event + direction, input);
	    }

	    this.manager.emit(this.options.event, input);
	  }
	});

	/**
	 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
	 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
	 * a single tap.
	 *
	 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
	 * multi-taps being recognized.
	 * @constructor
	 * @extends Recognizer
	 */
	function TapRecognizer() {
	  Recognizer.apply(this, arguments);

	  // previous time and center,
	  // used for tap counting
	  this.pTime = false;
	  this.pCenter = false;

	  this._timer = null;
	  this._input = null;
	  this.count = 0;
	}

	inherit(TapRecognizer, Recognizer, {
	  /**
	   * @namespace
	   * @memberof PinchRecognizer
	   */
	  defaults: {
	    event: 'tap',
	    pointers: 1,
	    taps: 1,
	    interval: 300, // max time between the multi-tap taps
	    time: 250, // max time of the pointer to be down (like finger on the screen)
	    threshold: 9, // a minimal movement is ok, but keep it low
	    posThreshold: 10 // a multi-tap can be a bit off the initial position
	  },

	  getTouchAction: function() {
	    return [TOUCH_ACTION_MANIPULATION];
	  },

	  process: function(input) {
	    var options = this.options;

	    var validPointers = input.pointers.length === options.pointers;
	    var validMovement = input.distance < options.threshold;
	    var validTouchTime = input.deltaTime < options.time;

	    this.reset();

	    if ((input.eventType & INPUT_START) && (this.count === 0)) {
	      return this.failTimeout();
	    }

	    // we only allow little movement
	    // and we've reached an end event, so a tap is possible
	    if (validMovement && validTouchTime && validPointers) {
	      if (input.eventType != INPUT_END) {
	        return this.failTimeout();
	      }

	      var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
	      var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

	      this.pTime = input.timeStamp;
	      this.pCenter = input.center;

	      if (!validMultiTap || !validInterval) {
	        this.count = 1;
	      } else {
	        this.count += 1;
	      }

	      this._input = input;

	      // if tap count matches we have recognized it,
	      // else it has began recognizing...
	      var tapCount = this.count % options.taps;
	      if (tapCount === 0) {
	        // no failing requirements, immediately trigger the tap event
	        // or wait as long as the multitap interval to trigger
	        if (!this.hasRequireFailures()) {
	          return STATE_RECOGNIZED;
	        } else {
	          this._timer = setTimeoutContext(function() {
	            this.state = STATE_RECOGNIZED;
	            this.tryEmit();
	          }, options.interval, this);
	          return STATE_BEGAN;
	        }
	      }
	    }
	    return STATE_FAILED;
	  },

	  failTimeout: function() {
	    this._timer = setTimeoutContext(function() {
	      this.state = STATE_FAILED;
	    }, this.options.interval, this);
	    return STATE_FAILED;
	  },

	  reset: function() {
	    clearTimeout(this._timer);
	  },

	  emit: function() {
	    if (this.state == STATE_RECOGNIZED) {
	      this._input.tapCount = this.count;
	      this.manager.emit(this.options.event, this._input);
	    }
	  }
	});

	/**
	 * Simple way to create a manager with a default set of recognizers.
	 * @param {HTMLElement} element
	 * @param {Object} [options]
	 * @constructor
	 */
	function Hammer(element, options) {
	  options = options || {};
	  options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
	  return new Manager(element, options);
	}

	/**
	 * @const {string}
	 */
	Hammer.VERSION = '2.0.7';

	/**
	 * default settings
	 * @namespace
	 */
	Hammer.defaults = {
	  /**
	   * set if DOM events are being triggered.
	   * But this is slower and unused by simple implementations, so disabled by default.
	   * @type {Boolean}
	   * @default false
	   */
	  domEvents: false,

	  /**
	   * The value for the touchAction property/fallback.
	   * When set to `compute` it will magically set the correct value based on the added recognizers.
	   * @type {String}
	   * @default compute
	   */
	  touchAction: TOUCH_ACTION_COMPUTE,

	  /**
	   * @type {Boolean}
	   * @default true
	   */
	  enable: true,

	  /**
	   * EXPERIMENTAL FEATURE -- can be removed/changed
	   * Change the parent input target element.
	   * If Null, then it is being set the to main element.
	   * @type {Null|EventTarget}
	   * @default null
	   */
	  inputTarget: null,

	  /**
	   * force an input class
	   * @type {Null|Function}
	   * @default null
	   */
	  inputClass: null,

	  /**
	   * Default recognizer setup when calling `Hammer()`
	   * When creating a new Manager these will be skipped.
	   * @type {Array}
	   */
	  preset: [
	    // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
	    [RotateRecognizer, {enable: false}],
	    [PinchRecognizer, {enable: false}, ['rotate']],
	    [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
	    [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
	    [TapRecognizer],
	    [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
	    [PressRecognizer]
	  ],

	  /**
	   * Some CSS properties can be used to improve the working of Hammer.
	   * Add them to this method and they will be set when creating a new Manager.
	   * @namespace
	   */
	  cssProps: {
	    /**
	     * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
	     * @type {String}
	     * @default 'none'
	     */
	    userSelect: 'none',

	    /**
	     * Disable the Windows Phone grippers when pressing an element.
	     * @type {String}
	     * @default 'none'
	     */
	    touchSelect: 'none',

	    /**
	     * Disables the default callout shown when you touch and hold a touch target.
	     * On iOS, when you touch and hold a touch target such as a link, Safari displays
	     * a callout containing information about the link. This property allows you to disable that callout.
	     * @type {String}
	     * @default 'none'
	     */
	    touchCallout: 'none',

	    /**
	     * Specifies whether zooming is enabled. Used by IE10>
	     * @type {String}
	     * @default 'none'
	     */
	    contentZooming: 'none',

	    /**
	     * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
	     * @type {String}
	     * @default 'none'
	     */
	    userDrag: 'none',

	    /**
	     * Overrides the highlight color shown when the user taps a link or a JavaScript
	     * clickable element in iOS. This property obeys the alpha value, if specified.
	     * @type {String}
	     * @default 'rgba(0,0,0,0)'
	     */
	    tapHighlightColor: 'rgba(0,0,0,0)'
	  }
	};

	var STOP = 1;
	var FORCED_STOP = 2;

	/**
	 * Manager
	 * @param {HTMLElement} element
	 * @param {Object} [options]
	 * @constructor
	 */
	function Manager(element, options) {
	  this.options = assign({}, Hammer.defaults, options || {});

	  this.options.inputTarget = this.options.inputTarget || element;

	  this.handlers = {};
	  this.session = {};
	  this.recognizers = [];
	  this.oldCssProps = {};

	  this.element = element;
	  this.input = createInputInstance(this);
	  this.touchAction = new TouchAction(this, this.options.touchAction);

	  toggleCssProps(this, true);

	  each(this.options.recognizers, function(item) {
	    var recognizer = this.add(new (item[0])(item[1]));
	    item[2] && recognizer.recognizeWith(item[2]);
	    item[3] && recognizer.requireFailure(item[3]);
	  }, this);
	}

	Manager.prototype = {
	  /**
	   * set options
	   * @param {Object} options
	   * @returns {Manager}
	   */
	  set: function(options) {
	    assign(this.options, options);

	    // Options that need a little more setup
	    if (options.touchAction) {
	      this.touchAction.update();
	    }
	    if (options.inputTarget) {
	      // Clean up existing event listeners and reinitialize
	      this.input.destroy();
	      this.input.target = options.inputTarget;
	      this.input.init();
	    }
	    return this;
	  },

	  /**
	   * stop recognizing for this session.
	   * This session will be discarded, when a new [input]start event is fired.
	   * When forced, the recognizer cycle is stopped immediately.
	   * @param {Boolean} [force]
	   */
	  stop: function(force) {
	    this.session.stopped = force ? FORCED_STOP : STOP;
	  },

	  /**
	   * run the recognizers!
	   * called by the inputHandler function on every movement of the pointers (touches)
	   * it walks through all the recognizers and tries to detect the gesture that is being made
	   * @param {Object} inputData
	   */
	  recognize: function(inputData) {
	    var session = this.session;
	    if (session.stopped) {
	      return;
	    }

	    // run the touch-action polyfill
	    this.touchAction.preventDefaults(inputData);

	    var recognizer;
	    var recognizers = this.recognizers;

	    // this holds the recognizer that is being recognized.
	    // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
	    // if no recognizer is detecting a thing, it is set to `null`
	    var curRecognizer = session.curRecognizer;

	    // reset when the last recognizer is recognized
	    // or when we're in a new session
	    if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
	      curRecognizer = session.curRecognizer = null;
	    }

	    var i = 0;
	    while (i < recognizers.length) {
	      recognizer = recognizers[i];

	      // find out if we are allowed try to recognize the input for this one.
	      // 1.   allow if the session is NOT forced stopped (see the .stop() method)
	      // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
	      //      that is being recognized.
	      // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
	      //      this can be setup with the `recognizeWith()` method on the recognizer.
	      if (session.stopped !== FORCED_STOP && ( // 1
	        !curRecognizer || recognizer == curRecognizer || // 2
	        recognizer.canRecognizeWith(curRecognizer))) { // 3
	        recognizer.recognize(inputData);
	      } else {
	        recognizer.reset();
	      }

	      // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
	      // current active recognizer. but only if we don't already have an active recognizer
	      if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
	        curRecognizer = session.curRecognizer = recognizer;
	      }
	      i++;
	    }
	  },

	  /**
	   * get a recognizer by its event name.
	   * @param {Recognizer|String} recognizer
	   * @returns {Recognizer|Null}
	   */
	  get: function(recognizer) {
	    if (recognizer instanceof Recognizer) {
	      return recognizer;
	    }

	    var recognizers = this.recognizers;
	    for (var i = 0; i < recognizers.length; i++) {
	      if (recognizers[i].options.event == recognizer) {
	        return recognizers[i];
	      }
	    }
	    return null;
	  },

	  /**
	   * add a recognizer to the manager
	   * existing recognizers with the same event name will be removed
	   * @param {Recognizer} recognizer
	   * @returns {Recognizer|Manager}
	   */
	  add: function(recognizer) {
	    if (invokeArrayArg(recognizer, 'add', this)) {
	      return this;
	    }

	    // remove existing
	    var existing = this.get(recognizer.options.event);
	    if (existing) {
	      this.remove(existing);
	    }

	    this.recognizers.push(recognizer);
	    recognizer.manager = this;

	    this.touchAction.update();
	    return recognizer;
	  },

	  /**
	   * remove a recognizer by name or instance
	   * @param {Recognizer|String} recognizer
	   * @returns {Manager}
	   */
	  remove: function(recognizer) {
	    if (invokeArrayArg(recognizer, 'remove', this)) {
	      return this;
	    }

	    recognizer = this.get(recognizer);

	    // let's make sure this recognizer exists
	    if (recognizer) {
	      var recognizers = this.recognizers;
	      var index = inArray(recognizers, recognizer);

	      if (index !== -1) {
	        recognizers.splice(index, 1);
	        this.touchAction.update();
	      }
	    }

	    return this;
	  },

	  /**
	   * bind event
	   * @param {String} events
	   * @param {Function} handler
	   * @returns {EventEmitter} this
	   */
	  on: function(events, handler) {
	    if (events === undefined) {
	      return;
	    }
	    if (handler === undefined) {
	      return;
	    }

	    var handlers = this.handlers;
	    each(splitStr(events), function(event) {
	      handlers[event] = handlers[event] || [];
	      handlers[event].push(handler);
	    });
	    return this;
	  },

	  /**
	   * unbind event, leave emit blank to remove all handlers
	   * @param {String} events
	   * @param {Function} [handler]
	   * @returns {EventEmitter} this
	   */
	  off: function(events, handler) {
	    if (events === undefined) {
	      return;
	    }

	    var handlers = this.handlers;
	    each(splitStr(events), function(event) {
	      if (!handler) {
	        delete handlers[event];
	      } else {
	        handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
	      }
	    });
	    return this;
	  },

	  /**
	   * emit event to the listeners
	   * @param {String} event
	   * @param {Object} data
	   */
	  emit: function(event, data) {
	    // we also want to trigger dom events
	    if (this.options.domEvents) {
	      triggerDomEvent(event, data);
	    }

	    // no handlers, so skip it all
	    var handlers = this.handlers[event] && this.handlers[event].slice();
	    if (!handlers || !handlers.length) {
	      return;
	    }

	    data.type = event;
	    data.preventDefault = function() {
	      data.srcEvent.preventDefault();
	    };

	    var i = 0;
	    while (i < handlers.length) {
	      handlers[i](data);
	      i++;
	    }
	  },

	  /**
	   * destroy the manager and unbinds all events
	   * it doesn't unbind dom events, that is the user own responsibility
	   */
	  destroy: function() {
	    this.element && toggleCssProps(this, false);

	    this.handlers = {};
	    this.session = {};
	    this.input.destroy();
	    this.element = null;
	  }
	};

	/**
	 * add/remove the css properties as defined in manager.options.cssProps
	 * @param {Manager} manager
	 * @param {Boolean} add
	 */
	function toggleCssProps(manager, add) {
	  var element = manager.element;
	  if (!element.style) {
	    return;
	  }
	  var prop;
	  each(manager.options.cssProps, function(value, name) {
	    prop = prefixed(element.style, name);
	    if (add) {
	      manager.oldCssProps[prop] = element.style[prop];
	      element.style[prop] = value;
	    } else {
	      element.style[prop] = manager.oldCssProps[prop] || '';
	    }
	  });
	  if (!add) {
	    manager.oldCssProps = {};
	  }
	}

	/**
	 * trigger dom event
	 * @param {String} event
	 * @param {Object} data
	 */
	function triggerDomEvent(event, data) {
	  var gestureEvent = document.createEvent('Event');
	  gestureEvent.initEvent(event, true, true);
	  gestureEvent.gesture = data;
	  data.target.dispatchEvent(gestureEvent);
	}

	assign(Hammer, {
	  INPUT_START: INPUT_START,
	  INPUT_MOVE: INPUT_MOVE,
	  INPUT_END: INPUT_END,
	  INPUT_CANCEL: INPUT_CANCEL,

	  STATE_POSSIBLE: STATE_POSSIBLE,
	  STATE_BEGAN: STATE_BEGAN,
	  STATE_CHANGED: STATE_CHANGED,
	  STATE_ENDED: STATE_ENDED,
	  STATE_RECOGNIZED: STATE_RECOGNIZED,
	  STATE_CANCELLED: STATE_CANCELLED,
	  STATE_FAILED: STATE_FAILED,

	  DIRECTION_NONE: DIRECTION_NONE,
	  DIRECTION_LEFT: DIRECTION_LEFT,
	  DIRECTION_RIGHT: DIRECTION_RIGHT,
	  DIRECTION_UP: DIRECTION_UP,
	  DIRECTION_DOWN: DIRECTION_DOWN,
	  DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
	  DIRECTION_VERTICAL: DIRECTION_VERTICAL,
	  DIRECTION_ALL: DIRECTION_ALL,

	  Manager: Manager,
	  Input: Input,
	  TouchAction: TouchAction,

	  TouchInput: TouchInput,
	  MouseInput: MouseInput,
	  PointerEventInput: PointerEventInput,
	  TouchMouseInput: TouchMouseInput,
	  SingleTouchInput: SingleTouchInput,

	  Recognizer: Recognizer,
	  AttrRecognizer: AttrRecognizer,
	  Tap: TapRecognizer,
	  Pan: PanRecognizer,
	  Swipe: SwipeRecognizer,
	  Pinch: PinchRecognizer,
	  Rotate: RotateRecognizer,
	  Press: PressRecognizer,

	  on: addEventListeners,
	  off: removeEventListeners,
	  each: each,
	  merge: merge,
	  extend: extend,
	  assign: assign,
	  inherit: inherit,
	  bindFn: bindFn,
	  prefixed: prefixed
	});

	// jquery.hammer.js
	// This jQuery plugin is just a small wrapper around the Hammer() class.
	// It also extends the Manager.emit method by triggering jQuery events.
	// $(element).hammer(options).bind("pan", myPanHandler);
	// The Hammer instance is stored at $element.data("hammer").
	// https://github.com/hammerjs/jquery.hammer.js

	(function($, Hammer) {
	  function hammerify(el, options) {
	    var $el = $(el);
	    if (!$el.data('hammer')) {
	      $el.data('hammer', new Hammer($el[0], options));
	    }
	  }

	  $.fn.hammer = function(options) {
	    return this.each(function() {
	      hammerify(this, options);
	    });
	  };

	  // extend the emit method to also trigger jQuery events
	  Hammer.Manager.prototype.emit = (function(originalEmit) {
	    return function(type, data) {
	      originalEmit.call(this, type, data);
	      $(this.element).trigger({
	        type: type,
	        gesture: data
	      });
	    };
	  })(Hammer.Manager.prototype.emit);
	})($, Hammer);

	module.exports = UI.Hammer = Hammer;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1);
	var UI = __webpack_require__(2);
	var $w = $(window);
	var ui = UI.namespace.ui;
	var ns = UI.namespace.class;
	/**
	 * @reference https://github.com/nolimits4web/Framework7/blob/master/src/js/modals.js
	 * @license https://github.com/nolimits4web/Framework7/blob/master/LICENSE
	 */

	var Popover = function (element, options) {
	  this.options = $.extend({}, Popover.DEFAULTS, options);
	  this.$element = $(element);
	  this.active = null;
	  this.$popover = (this.options.target && $(this.options.target)) || null;

	  this.init();
	  this._bindEvents();
	};

	Popover.DEFAULTS = {
	  theme: null,
	  trigger: 'click',
	  content: '',
	  open: false,
	  target: null,
	  tpl: '<div class="' + ns + 'popover">' +
	    '<div class="' + ns + 'popover-inner"></div>' +
	    '<div class="' + ns + 'popover-caret"></div></div>'
	};

	Popover.prototype.init = function () {
	  var _this = this;
	  var $element = this.$element;
	  var $popover;

	  if (!this.options.target) {
	    this.$popover = this.getPopover();
	    this.setContent();
	  }

	  $popover = this.$popover;

	  $popover.appendTo($('body'));

	  this.sizePopover();

	  function sizePopover() {
	    _this.sizePopover();
	  }

	  // TODO: 监听页面内容变化，重新调整位置

	  $element.on('open.popover.' + ui, function () {
	    $(window).on('resize.popover.' + ui, UI.utils.debounce(sizePopover, 50));
	  });

	  $element.on('close.popover.' + ui, function () {
	    $(window).off('resize.popover.' + ui, sizePopover);
	  });

	  this.options.open && this.open();
	};

	Popover.prototype.sizePopover = function sizePopover() {
	  var $element = this.$element;
	  var $popover = this.$popover;

	  if (!$popover || !$popover.length) {
	    return;
	  }

	  var popWidth = $popover.outerWidth();
	  var popHeight = $popover.outerHeight();
	  var $popCaret = $popover.find('.'+ns+'popover-caret');
	  var popCaretSize = ($popCaret.outerWidth() / 2) || 8;
	  // 取不到 $popCaret.outerHeight() 的值，所以直接加 8
	  var popTotalHeight = popHeight + 8; // $popCaret.outerHeight();

	  var triggerWidth = $element.outerWidth();
	  var triggerHeight = $element.outerHeight();
	  var triggerOffset = $element.offset();
	  var triggerRect = $element[0].getBoundingClientRect();

	  var winHeight = $w.height();
	  var winWidth = $w.width();
	  var popTop = 0;
	  var popLeft = 0;
	  var diff = 0;
	  var spacing = 2;
	  var popPosition = 'top';

	  $popover.css({ left: '', top: '' }).removeClass(ns + 'popover-left ' +
	    ns + 'popover-right ' + ns + 'popover-top ' + ns + 'popover-bottom');

	  // $popCaret.css({left: '', top: ''});

	  if (popTotalHeight - spacing < triggerRect.top + spacing) {
	    // Popover on the top of trigger
	    popTop = triggerOffset.top - popTotalHeight - spacing;
	  } else if (popTotalHeight <
	    winHeight - triggerRect.top - triggerRect.height) {
	    // On bottom
	    popPosition = 'bottom';
	    popTop = triggerOffset.top + triggerHeight + popCaretSize + spacing;
	  } else { // On middle
	    popPosition = 'middle';
	    popTop = triggerHeight / 2 + triggerOffset.top - popHeight / 2;
	  }

	  // Horizontal Position
	  if (popPosition === 'top' || popPosition === 'bottom') {
	    popLeft = triggerWidth / 2 + triggerOffset.left - popWidth / 2;

	    diff = popLeft;

	    if (popLeft < 5) {
	      popLeft = 5;
	    }

	    if (popLeft + popWidth > winWidth) {
	      popLeft = (winWidth - popWidth - 20);
	      // console.log('left %d, win %d, popw %d', popLeft, winWidth, popWidth);
	    }

	    if (popPosition === 'top') {
	      // This is the Popover position, NOT caret position
	      // Popover on the Top of trigger, caret on the bottom of Popover
	      $popover.addClass(ns + 'popover-top');
	    }

	    if (popPosition === 'bottom') {
	      $popover.addClass(ns + 'popover-bottom');
	    }

	    diff = diff - popLeft;
	    // $popCaret.css({left: (popWidth / 2 - popCaretSize + diff) + 'px'});

	  } else if (popPosition === 'middle') {
	    popLeft = triggerOffset.left - popWidth - popCaretSize;
	    $popover.addClass(ns + 'popover-left');
	    if (popLeft < 5) {
	      popLeft = triggerOffset.left + triggerWidth + popCaretSize;
	      $popover.removeClass(ns + 'popover-left').addClass(ns + 'popover-right');
	    }

	    if (popLeft + popWidth > winWidth) {
	      popLeft = winWidth - popWidth - 5;
	      $popover.removeClass(ns + 'popover-left').addClass(ns + 'popover-right');
	    }
	    // $popCaret.css({top: (popHeight / 2 - popCaretSize / 2) + 'px'});
	  }

	  // Apply position style
	  $popover.css({ top: popTop + 'px', left: popLeft + 'px' });
	};

	Popover.prototype.toggle = function () {
	  return this[this.active ? 'close' : 'open']();
	};

	Popover.prototype.open = function () {
	  var $popover = this.$popover;

	  this.$element.trigger('open.popover.' + ui);
	  this.sizePopover();
	  $popover.show().addClass(ns + 'active');
	  this.active = true;
	};

	Popover.prototype.close = function () {
	  var $popover = this.$popover;

	  this.$element.trigger('close.popover.' + ui);

	  $popover
	    .removeClass(ns + 'active')
	    .trigger('closed.popover.' + ui)
	    .hide();

	  this.active = false;
	};

	Popover.prototype.getPopover = function () {
	  var uid = UI.utils.generateGUID(ns + 'popover');
	  var theme = [];

	  if (this.options.theme) {
	    $.each(this.options.theme.split(' '), function (i, item) {
	      theme.push(ns + 'popover-' + $.trim(item));
	    });
	  }

	  return $(this.options.tpl).attr('id', uid).addClass(theme.join(' '));
	};

	Popover.prototype.setContent = function (content) {
	  content = content || this.options.content;
	  this.$popover && this.$popover.find('.'+ns+'popover-inner')
	    .empty().html(content);
	};

	Popover.prototype._bindEvents = function () {
	  var eventNS = 'popover.' + ui;
	  var triggers = this.options.trigger.split(' ');

	  for (var i = triggers.length; i--;) {
	    var trigger = triggers[i];

	    if (trigger === 'click') {
	      this.$element.on('click.' + eventNS, $.proxy(this.toggle, this));
	    } else { // hover or focus
	      var eventIn = trigger == 'hover' ? 'mouseenter' : 'focusin';
	      var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout';

	      this.$element.on(eventIn + '.' + eventNS, $.proxy(this.open, this));
	      this.$element.on(eventOut + '.' + eventNS, $.proxy(this.close, this));
	    }
	  }
	};

	Popover.prototype.destroy = function () {
	  this.$element.off('.popover.' + ui).removeData(ui + '.popover');
	  this.$popover.remove();
	};

	UI.plugin('popover', Popover);

	// Init code
	UI.ready(function (context) {
	  $('[data-'+ns+'popover]', context).popover();
	});

	module.exports = Popover;

	// TODO: 允许用户定义位置


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var UI = __webpack_require__(2);

	var Progress = (function() {
	  /**
	   * NProgress (c) 2013, Rico Sta. Cruz
	   * @via http://ricostacruz.com/nprogress
	   */

	  var NProgress = {};

	  NProgress.version = '0.2.0';

	  var Settings = NProgress.settings = {
	    minimum: 0.08,
	    easing: 'ease',
	    positionUsing: '',
	    speed: 200,
	    trickle: true,
	    trickleRate: 0.02,
	    trickleSpeed: 800,
	    showSpinner: true,
	    parent: 'body',
	    barSelector: '[role="nprogress-bar"]',
	    spinnerSelector: '[role="nprogress-spinner"]',
	    template: '<div class="nprogress-bar" role="nprogress-bar">' +
	    '<div class="nprogress-peg"></div></div>' +
	    '<div class="nprogress-spinner" role="nprogress-spinner">' +
	    '<div class="nprogress-spinner-icon"></div></div>'
	  };

	  /**
	   * Updates configuration.
	   *
	   *     NProgress.configure({
	   *       minimum: 0.1
	   *     });
	   */
	  NProgress.configure = function(options) {
	    var key, value;
	    for (key in options) {
	      value = options[key];
	      if (value !== undefined && options.hasOwnProperty(key)) Settings[key] = value;
	    }

	    return this;
	  };

	  /**
	   * Last number.
	   */

	  NProgress.status = null;

	  /**
	   * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
	   *
	   *     NProgress.set(0.4);
	   *     NProgress.set(1.0);
	   */

	  NProgress.set = function(n) {
	    var started = NProgress.isStarted();

	    n = clamp(n, Settings.minimum, 1);
	    NProgress.status = (n === 1 ? null : n);

	    var progress = NProgress.render(!started),
	      bar      = progress.querySelector(Settings.barSelector),
	      speed    = Settings.speed,
	      ease     = Settings.easing;

	    progress.offsetWidth; /* Repaint */

	    queue(function(next) {
	      // Set positionUsing if it hasn't already been set
	      if (Settings.positionUsing === '') Settings.positionUsing = NProgress.getPositioningCSS();

	      // Add transition
	      css(bar, barPositionCSS(n, speed, ease));

	      if (n === 1) {
	        // Fade out
	        css(progress, {
	          transition: 'none',
	          opacity: 1
	        });
	        progress.offsetWidth; /* Repaint */

	        setTimeout(function() {
	          css(progress, {
	            transition: 'all ' + speed + 'ms linear',
	            opacity: 0
	          });
	          setTimeout(function() {
	            NProgress.remove();
	            next();
	          }, speed);
	        }, speed);
	      } else {
	        setTimeout(next, speed);
	      }
	    });

	    return this;
	  };

	  NProgress.isStarted = function() {
	    return typeof NProgress.status === 'number';
	  };

	  /**
	   * Shows the progress bar.
	   * This is the same as setting the status to 0%, except that it doesn't go backwards.
	   *
	   *     NProgress.start();
	   *
	   */
	  NProgress.start = function() {
	    if (!NProgress.status) NProgress.set(0);

	    var work = function() {
	      setTimeout(function() {
	        if (!NProgress.status) return;
	        NProgress.trickle();
	        work();
	      }, Settings.trickleSpeed);
	    };

	    if (Settings.trickle) work();

	    return this;
	  };

	  /**
	   * Hides the progress bar.
	   * This is the *sort of* the same as setting the status to 100%, with the
	   * difference being `done()` makes some placebo effect of some realistic motion.
	   *
	   *     NProgress.done();
	   *
	   * If `true` is passed, it will show the progress bar even if its hidden.
	   *
	   *     NProgress.done(true);
	   */

	  NProgress.done = function(force) {
	    if (!force && !NProgress.status) return this;

	    return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);
	  };

	  /**
	   * Increments by a random amount.
	   */

	  NProgress.inc = function(amount) {
	    var n = NProgress.status;

	    if (!n) {
	      return NProgress.start();
	    } else {
	      if (typeof amount !== 'number') {
	        amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
	      }

	      n = clamp(n + amount, 0, 0.994);
	      return NProgress.set(n);
	    }
	  };

	  NProgress.trickle = function() {
	    return NProgress.inc(Math.random() * Settings.trickleRate);
	  };

	  /**
	   * Waits for all supplied jQuery promises and
	   * increases the progress as the promises resolve.
	   *
	   * @param $promise jQUery Promise
	   */
	  (function() {
	    var initial = 0, current = 0;

	    NProgress.promise = function($promise) {
	      if (!$promise || $promise.state() === "resolved") {
	        return this;
	      }

	      if (current === 0) {
	        NProgress.start();
	      }

	      initial++;
	      current++;

	      $promise.always(function() {
	        current--;
	        if (current === 0) {
	          initial = 0;
	          NProgress.done();
	        } else {
	          NProgress.set((initial - current) / initial);
	        }
	      });

	      return this;
	    };

	  })();

	  /**
	   * (Internal) renders the progress bar markup based on the `template`
	   * setting.
	   */

	  NProgress.render = function(fromStart) {
	    if (NProgress.isRendered()) return document.getElementById('nprogress');

	    addClass(document.documentElement, 'nprogress-busy');

	    var progress = document.createElement('div');
	    progress.id = 'nprogress';
	    progress.innerHTML = Settings.template;

	    var bar      = progress.querySelector(Settings.barSelector),
	      perc     = fromStart ? '-100' : toBarPerc(NProgress.status || 0),
	      parent   = document.querySelector(Settings.parent),
	      spinner;

	    css(bar, {
	      transition: 'all 0 linear',
	      transform: 'translate3d(' + perc + '%,0,0)'
	    });

	    if (!Settings.showSpinner) {
	      spinner = progress.querySelector(Settings.spinnerSelector);
	      spinner && removeElement(spinner);
	    }

	    if (parent != document.body) {
	      addClass(parent, 'nprogress-custom-parent');
	    }

	    parent.appendChild(progress);
	    return progress;
	  };

	  /**
	   * Removes the element. Opposite of render().
	   */

	  NProgress.remove = function() {
	    removeClass(document.documentElement, 'nprogress-busy');
	    removeClass(document.querySelector(Settings.parent), 'nprogress-custom-parent');
	    var progress = document.getElementById('nprogress');
	    progress && removeElement(progress);
	  };

	  /**
	   * Checks if the progress bar is rendered.
	   */

	  NProgress.isRendered = function() {
	    return !!document.getElementById('nprogress');
	  };

	  /**
	   * Determine which positioning CSS rule to use.
	   */

	  NProgress.getPositioningCSS = function() {
	    // Sniff on document.body.style
	    var bodyStyle = document.body.style;

	    // Sniff prefixes
	    var vendorPrefix = ('WebkitTransform' in bodyStyle) ? 'Webkit' :
	      ('MozTransform' in bodyStyle) ? 'Moz' :
	        ('msTransform' in bodyStyle) ? 'ms' :
	          ('OTransform' in bodyStyle) ? 'O' : '';

	    if (vendorPrefix + 'Perspective' in bodyStyle) {
	      // Modern browsers with 3D support, e.g. Webkit, IE10
	      return 'translate3d';
	    } else if (vendorPrefix + 'Transform' in bodyStyle) {
	      // Browsers without 3D support, e.g. IE9
	      return 'translate';
	    } else {
	      // Browsers without translate() support, e.g. IE7-8
	      return 'margin';
	    }
	  };

	  /**
	   * Helpers
	   */

	  function clamp(n, min, max) {
	    if (n < min) return min;
	    if (n > max) return max;
	    return n;
	  }

	  /**
	   * (Internal) converts a percentage (`0..1`) to a bar translateX
	   * percentage (`-100%..0%`).
	   */

	  function toBarPerc(n) {
	    return (-1 + n) * 100;
	  }


	  /**
	   * (Internal) returns the correct CSS for changing the bar's
	   * position given an n percentage, and speed and ease from Settings
	   */

	  function barPositionCSS(n, speed, ease) {
	    var barCSS;

	    if (Settings.positionUsing === 'translate3d') {
	      barCSS = { transform: 'translate3d('+toBarPerc(n)+'%,0,0)' };
	    } else if (Settings.positionUsing === 'translate') {
	      barCSS = { transform: 'translate('+toBarPerc(n)+'%,0)' };
	    } else {
	      barCSS = { 'margin-left': toBarPerc(n)+'%' };
	    }

	    barCSS.transition = 'all '+speed+'ms '+ease;

	    return barCSS;
	  }

	  /**
	   * (Internal) Queues a function to be executed.
	   */

	  var queue = (function() {
	    var pending = [];

	    function next() {
	      var fn = pending.shift();
	      if (fn) {
	        fn(next);
	      }
	    }

	    return function(fn) {
	      pending.push(fn);
	      if (pending.length == 1) next();
	    };
	  })();

	  /**
	   * (Internal) Applies css properties to an element, similar to the jQuery
	   * css method.
	   *
	   * While this helper does assist with vendor prefixed property names, it
	   * does not perform any manipulation of values prior to setting styles.
	   */

	  var css = (function() {
	    var cssPrefixes = [ 'Webkit', 'O', 'Moz', 'ms' ],
	      cssProps    = {};

	    function camelCase(string) {
	      return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function(match, letter) {
	        return letter.toUpperCase();
	      });
	    }

	    function getVendorProp(name) {
	      var style = document.body.style;
	      if (name in style) return name;

	      var i = cssPrefixes.length,
	        capName = name.charAt(0).toUpperCase() + name.slice(1),
	        vendorName;
	      while (i--) {
	        vendorName = cssPrefixes[i] + capName;
	        if (vendorName in style) return vendorName;
	      }

	      return name;
	    }

	    function getStyleProp(name) {
	      name = camelCase(name);
	      return cssProps[name] || (cssProps[name] = getVendorProp(name));
	    }

	    function applyCss(element, prop, value) {
	      prop = getStyleProp(prop);
	      element.style[prop] = value;
	    }

	    return function(element, properties) {
	      var args = arguments,
	        prop,
	        value;

	      if (args.length == 2) {
	        for (prop in properties) {
	          value = properties[prop];
	          if (value !== undefined && properties.hasOwnProperty(prop)) applyCss(element, prop, value);
	        }
	      } else {
	        applyCss(element, args[1], args[2]);
	      }
	    }
	  })();

	  /**
	   * (Internal) Determines if an element or space separated list of class names contains a class name.
	   */

	  function hasClass(element, name) {
	    var list = typeof element == 'string' ? element : classList(element);
	    return list.indexOf(' ' + name + ' ') >= 0;
	  }

	  /**
	   * (Internal) Adds a class to an element.
	   */

	  function addClass(element, name) {
	    var oldList = classList(element),
	      newList = oldList + name;

	    if (hasClass(oldList, name)) return;

	    // Trim the opening space.
	    element.className = newList.substring(1);
	  }

	  /**
	   * (Internal) Removes a class from an element.
	   */

	  function removeClass(element, name) {
	    var oldList = classList(element),
	      newList;

	    if (!hasClass(element, name)) return;

	    // Replace the class name.
	    newList = oldList.replace(' ' + name + ' ', ' ');

	    // Trim the opening and closing spaces.
	    element.className = newList.substring(1, newList.length - 1);
	  }

	  /**
	   * (Internal) Gets a space separated list of the class names on the element.
	   * The list is wrapped with a single space on each end to facilitate finding
	   * matches within the list.
	   */

	  function classList(element) {
	    return (' ' + (element.className || '') + ' ').replace(/\s+/gi, ' ');
	  }

	  /**
	   * (Internal) Removes an element from the DOM.
	   */

	  function removeElement(element) {
	    element && element.parentNode && element.parentNode.removeChild(element);
	  }

	  return NProgress;
	})();

	module.exports = UI.progress = Progress;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1);
	var UI = __webpack_require__(2);
	var ui = UI.namespace.ui;
	var ns = UI.namespace.class;
	/**
	 * @via https://github.com/uikit/uikit/blob/master/src/js/scrollspy.js
	 * @license https://github.com/uikit/uikit/blob/master/LICENSE.md
	 */

	var ScrollSpy = function(element, options) {
	  if (!UI.support.animation) {
	    return;
	  }

	  this.options = $.extend({}, ScrollSpy.DEFAULTS, options);
	  this.$element = $(element);

	  var checkViewRAF = function() {
	    UI.utils.rAF.call(window, $.proxy(this.checkView, this));
	  }.bind(this);

	  this.$window = $(window).on('scroll.scrollspy.'+ui, checkViewRAF)
	    .on('resize.scrollspy.'+ui+' orientationchange.scrollspy.'+ui,
	    UI.utils.debounce(checkViewRAF, 50));

	  this.timer = this.inViewState = this.initInView = null;

	  checkViewRAF();
	};

	ScrollSpy.DEFAULTS = {
	  animation: 'fade',
	  className: {
	    inView: ns+'scrollspy-inview',
	    init: ns+'scrollspy-init'
	  },
	  repeat: true,
	  delay: 0,
	  topOffset: 0,
	  leftOffset: 0
	};

	ScrollSpy.prototype.checkView = function() {
	  var $element = this.$element;
	  var options = this.options;
	  var inView = UI.utils.isInView($element, options);
	  var animation = options.animation ?
	  ' '+ns+'animation-' + options.animation : '';

	  if (inView && !this.inViewState) {
	    if (this.timer) {
	      clearTimeout(this.timer);
	    }

	    if (!this.initInView) {
	      $element.addClass(options.className.init);
	      this.offset = $element.offset();
	      this.initInView = true;

	      $element.trigger('init.scrollspy.'+ui);
	    }

	    this.timer = setTimeout(function() {
	      if (inView) {
	        $element.addClass(options.className.inView + animation).width();
	      }
	    }, options.delay);

	    this.inViewState = true;
	    $element.trigger('inview.scrollspy.'+ui);
	  }

	  if (!inView && this.inViewState && options.repeat) {
	    $element.removeClass(options.className.inView + animation);

	    this.inViewState = false;

	    $element.trigger('outview.scrollspy.'+ui);
	  }
	};

	ScrollSpy.prototype.check = function() {
	  UI.utils.rAF.call(window, $.proxy(this.checkView, this));
	};

	// Sticky Plugin
	UI.plugin('scrollspy', ScrollSpy);

	// Init code
	UI.ready(function(context) {
	  $('[data-'+ns+'scrollspy]', context).scrollspy();
	});

	module.exports = ScrollSpy;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1);
	var UI = __webpack_require__(2);
	__webpack_require__(20);
	var ui = UI.namespace.ui;
	var ns = UI.namespace.class;
	/**
	 * @via https://github.com/uikit/uikit/
	 * @license https://github.com/uikit/uikit/blob/master/LICENSE.md
	 */

	// ScrollSpyNav Class
	var ScrollSpyNav = function (element, options) {
	    this.options = $.extend({}, ScrollSpyNav.DEFAULTS, options);
	    this.$element = $(element);
	    this.anchors = [];

	    this.$links = this.$element.find('a[href^="#"]').each(function (i, link) {
	        this.anchors.push($(link).attr('href'));
	    }.bind(this));

	    this.$targets = $(this.anchors.join(', '));

	    var processRAF = function () {
	        UI.utils.rAF.call(window, $.proxy(this.process, this));
	    }.bind(this);

	    this.$window = $(window).on('scroll.scrollspynav.' + ui, processRAF)
	        .on('resize.scrollspynav.' + ui + ' orientationchange.scrollspynav.' + ui,
	        UI.utils.debounce(processRAF, 50));

	    processRAF();
	    this.scrollProcess();
	};

	ScrollSpyNav.DEFAULTS = {
	    className: {
	        active: ns + 'active'
	    },
	    closest: false,
	    smooth: true,
	    offsetTop: 0
	};

	ScrollSpyNav.prototype.process = function () {
	    var scrollTop = this.$window.scrollTop();
	    var options = this.options;
	    var inViews = [];
	    var $links = this.$links;

	    var $targets = this.$targets;

	    $targets.each(function (i, target) {
	        if (UI.utils.isInView(target, options)) {
	            inViews.push(target);
	        }
	    });

	    // console.log(inViews.length);

	    if (inViews.length) {
	        var $target;

	        $.each(inViews, function (i, item) {
	            if ($(item).offset().top >= scrollTop) {
	                $target = $(item);
	                return false; // break
	            }
	        });

	        if (!$target) {
	            return;
	        }

	        if (options.closest) {
	            $links.closest(options.closest).removeClass(options.className.active);
	            $links.filter('a[href="#' + $target.attr('id') + '"]').
	                closest(options.closest).addClass(options.className.active);
	        } else {
	            $links.removeClass(options.className.active).
	                filter('a[href="#' + $target.attr('id') + '"]').
	                addClass(options.className.active);
	        }
	    }
	};

	ScrollSpyNav.prototype.scrollProcess = function () {
	    var $links = this.$links;
	    var options = this.options;

	    // smoothScroll
	    if (options.smooth && $.fn.smoothScroll) {
	        $links.on('click', function (e) {
	            e.preventDefault();

	            var $this = $(this);
	            var $target = $($this.attr('href'));

	            if (!$target) {
	                return;
	            }

	            var offsetTop = options.offsetTop &&
	                !isNaN(parseInt(options.offsetTop)) && parseInt(options.offsetTop) || 0;

	            $(window).smoothScroll({ position: $target.offset().top - offsetTop });
	        });
	    }
	};

	// ScrollSpyNav Plugin
	UI.plugin('scrollspynav', ScrollSpyNav);

	// Init code
	UI.ready(function (context) {
	    $('[data-' + ns + 'scrollspynav]', context).scrollspynav();
	});

	module.exports = ScrollSpyNav;




/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1);
	var UI = __webpack_require__(2);
	var rAF = UI.utils.rAF;
	var cAF = UI.utils.cancelAF;
	var ui = UI.namespace.ui;
	var ns = UI.namespace.class;
	/**
	 * Smooth Scroll
	 * @param position
	 * @via http://mir.aculo.us/2014/01/19/scrolling-dom-elements-to-the-top-a-zepto-plugin/
	 */

	// Usage: $(window).smoothScroll([options])

	// only allow one scroll to top operation to be in progress at a time,
	// which is probably what you want
	var smoothScrollInProgress = false;

	var SmoothScroll = function (element, options) {
	  options = options || {};

	  var $this = $(element);
	  var targetY = parseInt(options.position) || SmoothScroll.DEFAULTS.position;
	  var initialY = $this.scrollTop();
	  var lastY = initialY;
	  var delta = targetY - initialY;
	  // duration in ms, make it a bit shorter for short distances
	  // this is not scientific and you might want to adjust this for
	  // your preferences
	  var speed = options.speed ||
	    Math.min(750, Math.min(1500, Math.abs(initialY - targetY)));
	  // temp variables (t will be a position between 0 and 1, y is the calculated scrollTop)
	  var start;
	  var t;
	  var y;
	  var cancelScroll = function () {
	    abort();
	  };

	  // abort if already in progress or nothing to scroll
	  if (smoothScrollInProgress) {
	    return;
	  }

	  if (delta === 0) {
	    return;
	  }

	  // quint ease-in-out smoothing, from
	  // https://github.com/madrobby/scripty2/blob/master/src/effects/transitions/penner.js#L127-L136
	  function smooth(pos) {
	    if ((pos /= 0.5) < 1) {
	      return 0.5 * Math.pow(pos, 5);
	    }

	    return 0.5 * (Math.pow((pos - 2), 5) + 2);
	  }

	  function abort() {
	    $this.off('touchstart.smoothscroll.' + ui, cancelScroll);
	    smoothScrollInProgress = false;
	  }

	  // when there's a touch detected while scrolling is in progress, abort
	  // the scrolling (emulates native scrolling behavior)
	  $this.on('touchstart.smoothscroll.' + ui, cancelScroll);
	  smoothScrollInProgress = true;

	  // start rendering away! note the function given to frame
	  // is named "render" so we can reference it again further down
	  function render(now) {
	    if (!smoothScrollInProgress) {
	      return;
	    }
	    if (!start) {
	      start = now;
	    }

	    // calculate t, position of animation in [0..1]
	    t = Math.min(1, Math.max((now - start) / speed, 0));
	    // calculate the new scrollTop position (don't forget to smooth)
	    y = Math.round(initialY + delta * smooth(t));
	    // bracket scrollTop so we're never over-scrolling
	    if (delta > 0 && y > targetY) {
	      y = targetY;
	    }
	    if (delta < 0 && y < targetY) {
	      y = targetY;
	    }

	    // only actually set scrollTop if there was a change fromt he last frame
	    if (lastY != y) {
	      $this.scrollTop(y);
	    }

	    lastY = y;
	    // if we're not done yet, queue up an other frame to render,
	    // or clean up
	    if (y !== targetY) {
	      cAF(scrollRAF);
	      scrollRAF = rAF(render);
	    } else {
	      cAF(scrollRAF);
	      abort();
	    }
	  }

	  var scrollRAF = rAF(render);
	};

	SmoothScroll.DEFAULTS = {
	  position: 0
	};

	$.fn.smoothScroll = function (option) {
	  return this.each(function () {
	    new SmoothScroll(this, option);
	  });
	};

	// Init code
	$(document).on('click.smoothScroll.' + ui + '.data-api', '[data-' + ns + 'smooth-scroll]',
	  function (e) {
	    e.preventDefault();
	    var options = UI.utils.parseOptions($(this).data('amSmoothScroll'));

	    $(window).smoothScroll(options);
	  });

	module.exports = SmoothScroll;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1);
	var UI = __webpack_require__(2);
	// require('./ui.dropdown');
	var ui = UI.namespace.ui;
	var ns = UI.namespace.class;
	// Make jQuery :contains Case-Insensitive
	$.expr[':'].containsNC = function(elem, i, match, array) {
	  return (elem.textContent || elem.innerText || '').toLowerCase().
	      indexOf((match[3] || '').toLowerCase()) >= 0;
	};

	/**
	 * Selected
	 * @desc HTML select replacer
	 * @via https://github.com/silviomoreto/bootstrap-select
	 * @license https://github.com/silviomoreto/bootstrap-select/blob/master/LICENSE
	 * @param element
	 * @param options
	 * @constructor
	 */

	var Selected = function(element, options) {
	  this.$element = $(element);
	  this.options = $.extend({}, Selected.DEFAULTS, {
	    placeholder: element.getAttribute('placeholder') ||
	    Selected.DEFAULTS.placeholder
	  }, options);
	  this.$originalOptions = this.$element.find('option');
	  this.multiple = element.multiple;
	  this.$selector = null;
	  this.initialized = false;
	  this.init();
	};

	Selected.DEFAULTS = {
	  btnWidth: null,
	  btnSize: null,
	  btnStyle: 'default',
	  dropUp: 0,
	  maxHeight: null,
	  maxChecked: null,
	  placeholder: '点击选择...',
	  selectedClass: 'ms-checked',
	  disabledClass: 'ms-disabled',
	  searchBox: false,
	  tpl: '<div class="ms-selected ms-dropdown ' +
	  '<%= dropUp ? \'ms-dropdown-up\': \'\' %>" id="<%= id %>" data-ms-dropdown>' +
	  '  <button type="button" class="ms-selected-btn ms-btn ms-dropdown-toggle">' +
	  '    <span class="ms-selected-status ms-fl"></span>' +
	  '    <i class="ms-selected-icon ms-icon-caret-' +
	  '<%= dropUp ? \'up\' : \'down\' %>"></i>' +
	  '  </button>' +
	  '  <div class="ms-selected-content ms-dropdown-content">' +
	  '    <h2 class="ms-selected-header">' +
	  '<span class="ms-icon-chevron-left">返回</span></h2>' +
	  '   <% if (searchBox) { %>' +
	  '   <div class="ms-selected-search">' +
	  '     <input autocomplete="off" class="ms-form-field ms-input-sm" />' +
	  '   </div>' +
	  '   <% } %>' +
	  '    <ul class="ms-selected-list">' +
	  '      <% for (var i = 0; i < options.length; i++) { %>' +
	  '       <% var option = options[i] %>' +
	  '       <% if (option.header) { %>' +
	  '  <li data-group="<%= option.group %>" class="ms-selected-list-header">' +
	  '       <%= option.text %></li>' +
	  '       <% } else { %>' +
	  '       <li class="<%= option.classNames%>" ' +
	  '         data-index="<%= option.index %>" ' +
	  '         data-group="<%= option.group || 0 %>" ' +
	  '         data-value="<%= option.value %>" >' +
	  '         <span class="ms-selected-text"><%= option.text %></span>' +
	  '         <i class="ms-icon-check"></i></li>' +
	  '      <% } %>' +
	  '      <% } %>' +
	  '    </ul>' +
	  '    <div class="ms-selected-hint"></div>' +
	  '  </div>' +
	  '</div>',
	  listTpl:   '<% for (var i = 0; i < options.length; i++) { %>' +
	  '       <% var option = options[i] %>' +
	  '       <% if (option.header) { %>' +
	  '  <li data-group="<%= option.group %>" class="ms-selected-list-header">' +
	  '       <%= option.text %></li>' +
	  '       <% } else { %>' +
	  '       <li class="<%= option.classNames %>" ' +
	  '         data-index="<%= option.index %>" ' +
	  '         data-group="<%= option.group || 0 %>" ' +
	  '         data-value="<%= option.value %>" >' +
	  '         <span class="ms-selected-text"><%= option.text %></span>' +
	  '         <i class="ms-icon-check"></i></li>' +
	  '      <% } %>' +
	  '      <% } %>'
	};

	Selected.prototype.init = function() {
	  var _this = this;
	  var $element = this.$element;
	  var options = this.options;

	  $element.hide();

	  var data = {
	    id: UI.utils.generateGUID('ms-selected'),
	    multiple: this.multiple,
	    options: [],
	    searchBox: options.searchBox,
	    dropUp: options.dropUp,
	    placeholder: options.placeholder
	  };

	  this.$selector = $(UI.template(this.options.tpl, data));
	  // set select button styles
	  this.$selector.css({width: this.options.btnWidth});

	  this.$list = this.$selector.find('.ms-selected-list');
	  this.$searchField = this.$selector.find('.ms-selected-search input');
	  this.$hint = this.$selector.find('.ms-selected-hint');

	  var $selectorBtn = this.$selector.find('.ms-selected-btn');
	  var btnClassNames = [];

	  options.btnSize && btnClassNames.push('ms-btn-' + options.btnSize);
	  options.btnStyle && btnClassNames.push('ms-btn-' + options.btnStyle);
	  $selectorBtn.addClass(btnClassNames.join(' '));

	  this.$selector.dropdown({
	    justify: $selectorBtn
	  });

	  // disable Selected instance if <selected> is disabled
	  // should call .disable() after Dropdown initialed
	  if ($element[0].disabled) {
	    this.disable();
	  }

	  // set list height
	  if (options.maxHeight) {
	    this.$selector.find('.ms-selected-list').css({
	      'max-height': options.maxHeight,
	      'overflow-y': 'scroll'
	    });
	  }

	  // set hint text
	  var hint = [];
	  var min = $element.attr('minchecked');
	  var max = $element.attr('maxchecked') || options.maxChecked;

	  this.maxChecked = max || Infinity;

	  if ($element[0].required) {
	    hint.push('必选');
	  }

	  if (min || max) {
	    min && hint.push('至少选择 ' + min + ' 项');
	    max && hint.push('至多选择 ' + max + ' 项');
	  }

	  this.$hint.text(hint.join('，'));

	  // render dropdown list
	  this.renderOptions();

	  // append $selector after <select>
	  this.$element.after(this.$selector);
	  this.dropdown = this.$selector.data('msui.dropdown');
	  this.$status = this.$selector.find('.ms-selected-status');

	  // #try to fixes #476
	  setTimeout(function() {
	    _this.syncData();
	    _this.initialized = true;
	  }, 0);

	  this.bindEvents();
	};

	Selected.prototype.renderOptions = function() {
	  var $element = this.$element;
	  var options = this.options;
	  var optionItems = [];
	  var $optgroup = $element.find('optgroup');
	  this.$originalOptions = this.$element.find('option');

	  // 单选框使用 JS 禁用已经选择的 option 以后，
	  // 浏览器会重新选定第一个 option，但有一定延迟，致使 JS 获取 value 时返回 null
	  if (!this.multiple && ($element.val() === null)) {
	    this.$originalOptions.length &&
	    (this.$originalOptions.get(0).selected = true);
	  }

	  function pushOption(index, item, group) {
	    if (item.value === '') {
	      // skip to next iteration
	      // @see http://stackoverflow.com/questions/481601/how-to-skip-to-next-iteration-in-jquery-each-util
	      return true;
	    }

	    var classNames = '';
	    item.disabled && (classNames += options.disabledClass);
	    !item.disabled && item.selected && (classNames += options.selectedClass);

	    optionItems.push({
	      group: group,
	      index: index,
	      classNames: classNames,
	      text: item.text,
	      value: item.value
	    });
	  }

	  // select with option groups
	  if ($optgroup.length) {
	    $optgroup.each(function(i) {
	      // push group name
	      optionItems.push({
	        header: true,
	        group: i + 1,
	        text: this.label
	      });

	      $optgroup.eq(i).find('option').each(function(index, item) {
	        pushOption(index, item, i);
	      });
	    });
	  } else {
	    // without option groups
	    this.$originalOptions.each(function(index, item) {
	      pushOption(index, item, null);
	    });
	  }

	  this.$list.html(UI.template(options.listTpl, {options: optionItems}));
	  this.$shadowOptions = this.$list.find('> li').
	    not('.ms-selected-list-header');
	};

	Selected.prototype.setChecked = function(item) {
	  var options = this.options;
	  var $item = $(item);
	  var isChecked = $item.hasClass(options.selectedClass);

	  if (this.multiple) {
	    // multiple
	    var checkedLength = this.$list.find('.' + options.selectedClass).length;

	    if (!isChecked && this.maxChecked <= checkedLength) {
	      this.$element.trigger('checkedOverflow.selected.msui', {
	        selected: this
	      });

	      return false;
	    }
	  } else {
	    // close dropdown whether item is checked or not
	    // @see #860
	    this.dropdown.close();

	    if (isChecked) {
	      return false;
	    }

	    this.$shadowOptions.not($item).removeClass(options.selectedClass);
	  }

	  $item.toggleClass(options.selectedClass);
	  this.syncData(item);
	};

	/**
	 * syncData
	 *
	 * @description if `item` set, only sync `item` related option
	 * @param {Object} [item]
	 */
	Selected.prototype.syncData = function(item) {
	  var _this = this;
	  var options = this.options;
	  var status = [];
	  var $checked = $([]);

	  this.$shadowOptions.filter('.' + options.selectedClass).each(function() {
	    var $this = $(this);
	    status.push($this.find('.ms-selected-text').text());

	    if (!item) {
	      $checked = $checked.add(_this.$originalOptions
	        .filter('[value="' + $this.data('value') + '"]')
	        .prop('selected', true));
	    }
	  });

	  if (item) {
	    var $item = $(item);
	    this.$originalOptions
	      .filter('[value="' + $item.data('value') + '"]')
	      .prop('selected', $item.hasClass(options.selectedClass));
	  } else {
	    this.$originalOptions.not($checked).prop('selected', false);
	  }

	  // nothing selected
	  if (!this.$element.val()) {
	    status = [options.placeholder];
	  }

	  this.$status.text(status.join(', '));

	  // Do not trigger change event on initializing
	  this.initialized && this.$element.trigger('change');
	};

	Selected.prototype.bindEvents = function() {
	  var _this = this;
	  var header = 'ms-selected-list-header';
	  var handleKeyup = UI.utils.debounce(function(e) {
	    _this.$shadowOptions.not('.' + header).hide().
	     filter(':containsNC("' + e.target.value + '")').show();
	  }, 100);

	  this.$list.on('click', '> li', function(e) {
	    var $this = $(this);
	    !$this.hasClass(_this.options.disabledClass) &&
	      !$this.hasClass(header) && _this.setChecked(this);
	  });

	  // simple search with jQuery :contains
	  this.$searchField.on('keyup.selected.msui', handleKeyup);

	  // empty search keywords
	  this.$selector.on('closed.dropdown.msui', function() {
	    _this.$searchField.val('');
	    _this.$shadowOptions.css({display: ''});
	  });

	  // work with Validator
	  // @since 2.5
	  this.$element.on('validated.field.validator.msui', function(e) {
	    if (e.validity) {
	      var valid = e.validity.valid;
	      var errorClassName = 'ms-invalid';

	      _this.$selector[(!valid ? 'add' : 'remove') + 'Class'](errorClassName);
	    }
	  });

	  // observe DOM
	  if (UI.support.mutationobserver) {
	    this.observer = new UI.support.mutationobserver(function() {
	      _this.$element.trigger('changed.selected.msui');
	    });

	    this.observer.observe(this.$element[0], {
	      childList: true,
	      subtree: true,
	      characterData: true
	    });
	  }

	  // custom event
	  this.$element.on('changed.selected.msui', function() {
	    _this.renderOptions();
	    _this.syncData();
	  });
	};

	// @since: 2.5
	Selected.prototype.select = function(item) {
	  var $item;

	  if (typeof item === 'number') {
	    $item = this.$list.find('> li').not('.ms-selected-list-header').eq(item);
	  } else if (typeof item === 'string') {
	    $item = this.$list.find(item);
	  } else {
	    $item = $(item);
	  }

	  $item.trigger('click');
	};

	// @since: 2.5
	Selected.prototype.enable = function() {
	  this.$element.prop('disable', false);
	  this.$selector.dropdown('enable');
	};

	// @since: 2.5
	Selected.prototype.disable = function() {
	  this.$element.prop('disable', true);
	  this.$selector.dropdown('disable');
	};

	Selected.prototype.destroy = function() {
	  this.$element.removeData('msui.selected').show();
	  this.$selector.remove();
	};

	UI.plugin('selected', Selected);

	// Conflict with jQuery form
	// https://github.com/malsup/form/blob/6bf24a5f6d8be65f4e5491863180c09356d9dadd/jquery.form.js#L1240-L1258
	// https://github.com/allmobilize/amazeui/issues/379
	// @deprecated: $.fn.selected = $.fn.selectIt = Plugin;

	// New way to resolve conflict:
	// @see https://github.com/amazeui/amazeui/issues/781#issuecomment-158873541

	UI.ready(function(context) {
	  $('[data-ms-selected]', context).selected();
	});

	module.exports = Selected;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1);
	var UI = __webpack_require__(2);
	var ui = UI.namespace.ui;
	var ns = UI.namespace.class;
	/**
	 * @via https://github.com/uikit/uikit/blob/master/src/js/addons/sticky.js
	 * @license https://github.com/uikit/uikit/blob/master/LICENSE.md
	 */

	// Sticky Class
	var Sticky = function(element, options) {
	  var _this = this;

	  this.options = $.extend({}, Sticky.DEFAULTS, options);
	  this.$element = $(element);
	  this.sticked = null;
	  this.inited = null;
	  this.$holder = undefined;

	  this.$window = $(window).
	    on('scroll.sticky.'+ui,
	    UI.utils.debounce($.proxy(this.checkPosition, this), 10)).
	    on('resize.sticky.'+ui+' orientationchange.sticky.'+ui,
	    UI.utils.debounce(function() {
	      _this.reset(true, function() {
	        _this.checkPosition();
	      });
	    }, 50)).
	    on('load.sticky.'+ui, $.proxy(this.checkPosition, this));

	  // the `.offset()` is diff between jQuery & Zepto.js
	  // jQuery: return `top` and `left`
	  // Zepto.js: return `top`, `left`, `width`, `height`
	  this.offset = this.$element.offset();

	  this.init();
	};

	Sticky.DEFAULTS = {
	  top: 0,
	  bottom: 0,
	  animation: '',
	  className: {
	    sticky: ns+'sticky',
	    resetting: ns+'sticky-resetting',
	    stickyBtm: ns+'sticky-bottom',
	    animationRev: ns+'animation-reverse'
	  }
	};

	Sticky.prototype.init = function() {
	  var result = this.check();

	  if (!result) {
	    return false;
	  }

	  var $element = this.$element;
	  var $elementMargin = '';

	  $.each($element.css(
	      ['marginTop', 'marginRight', 'marginBottom', 'marginLeft']),
	    function(name, value) {
	      return $elementMargin += ' ' + value;
	    });

	  var $holder = $('<div class="'+ns+'sticky-placeholder"></div>').css({
	    height: $element.css('position') !== 'absolute' ?
	      $element.outerHeight() : '',
	    float: $element.css('float') != 'none' ? $element.css('float') : '',
	    margin: $elementMargin
	  });

	  this.$holder = $element.css('margin', 0).wrap($holder).parent();
	  this.inited = 1;

	  return true;
	};

	Sticky.prototype.reset = function(force, cb) {
	  var options = this.options;
	  var $element = this.$element;
	  var animation = (options.animation) ?
	  ' '+ns+'animation-' + options.animation : '';
	  var complete = function() {
	    $element.css({position: '', top: '', width: '', left: '', margin: 0});
	    $element.removeClass([
	      animation,
	      options.className.animationRev,
	      options.className.sticky,
	      options.className.resetting
	    ].join(' '));

	    this.animating = false;
	    this.sticked = false;
	    this.offset = $element.offset();
	    cb && cb();
	  }.bind(this);

	  $element.addClass(options.className.resetting);

	  if (!force && options.animation && UI.support.animation) {

	    this.animating = true;

	    $element.removeClass(animation).one(UI.support.animation.end, function() {
	      complete();
	    }).width(); // force redraw

	    $element.addClass(animation + ' ' + options.className.animationRev);
	  } else {
	    complete();
	  }
	};

	Sticky.prototype.check = function() {
	  if (!this.$element.is(':visible')) {
	    return false;
	  }

	  var media = this.options.media;

	  if (media) {
	    switch (typeof(media)) {
	      case 'number':
	        if (window.innerWidth < media) {
	          return false;
	        }
	        break;

	      case 'string':
	        if (window.matchMedia && !window.matchMedia(media).matches) {
	          return false;
	        }
	        break;
	    }
	  }

	  return true;
	};

	Sticky.prototype.checkPosition = function() {
	  if (!this.inited) {
	    var initialized = this.init();
	    if (!initialized) {
	      return;
	    }
	  }

	  var options = this.options;
	  var scrollTop = this.$window.scrollTop();
	  var offsetTop = options.top;
	  var offsetBottom = options.bottom;
	  var $element = this.$element;
	  var animation = (options.animation) ?
	    ' '+ns+'animation-' + options.animation : '';
	  var className = [options.className.sticky, animation].join(' ');

	  if (typeof offsetBottom == 'function') {
	    offsetBottom = offsetBottom(this.$element);
	  }

	  var checkResult = (scrollTop > this.$holder.offset().top);

	  if (!this.sticked && checkResult) {
	    $element.addClass(className);
	  } else if (this.sticked && !checkResult) {
	    this.reset();
	  }

	  this.$holder.css({
	    height: $element.is(':visible') && $element.css('position') !== 'absolute' ?
	      $element.outerHeight() : ''
	  });

	  if (checkResult) {
	    $element.css({
	      top: offsetTop,
	      left: this.$holder.offset().left,
	      width: this.$holder.width()
	    });

	    /*
	     if (offsetBottom) {
	     // （底部边距 + 元素高度 > 窗口高度） 时定位到底部
	     if ((offsetBottom + this.offset.height > $(window).height()) &&
	     (scrollTop + $(window).height() >= scrollHeight - offsetBottom)) {
	     $element.addClass(options.className.stickyBtm).
	     css({top: $(window).height() - offsetBottom - this.offset.height});
	     } else {
	     $element.removeClass(options.className.stickyBtm).css({top: offsetTop});
	     }
	     }
	     */
	  }

	  this.sticked = checkResult;
	};

	// Sticky Plugin
	UI.plugin('sticky', Sticky);

	// Init code
	$(window).on('load', function() {
	  $('[data-'+ns+'sticky]').sticky();
	});

	module.exports = Sticky;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1);
	var UI = __webpack_require__(2);
	var Hammer = __webpack_require__(15);
	var supportTransition = UI.support.transition;
	var animation = UI.support.animation;
	var ui = UI.namespace.ui;
	var ns = UI.namespace.class;
	/**
	 * @via https://github.com/twbs/bootstrap/blob/master/js/tab.js
	 * @copyright 2011-2014 Twitter, Inc.
	 * @license MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 */

	/**
	 * Tabs
	 * @param {HTMLElement} element
	 * @param {Object} options
	 * @constructor
	 */
	var Tabs = function (element, options) {
	  this.$element = $(element);
	  this.options = $.extend({}, Tabs.DEFAULTS, options || {});
	  this.transitioning = this.activeIndex = null;

	  this.refresh();
	  this.init();
	};

	Tabs.DEFAULTS = {
	  selector: {
	    nav: '> .' + ns + 'tabs-nav',
	    content: '> .' + ns + 'tabs-bd',
	    panel: '> .' + ns + 'tab-panel'
	  },
	  activeClass: ns + 'active'
	};

	Tabs.prototype.refresh = function () {
	  var selector = this.options.selector;

	  this.$tabNav = this.$element.find(selector.nav);
	  this.$navs = this.$tabNav.find('a');

	  this.$content = this.$element.find(selector.content);
	  this.$tabPanels = this.$content.find(selector.panel);

	  var $active = this.$tabNav.find('> .' + this.options.activeClass);

	  // Activate the first Tab when no active Tab or multiple active Tabs
	  if ($active.length !== 1) {
	    this.open(0);
	  } else {
	    this.activeIndex = this.$navs.index($active.children('a'));
	  }
	};

	Tabs.prototype.init = function () {
	  var _this = this;
	  var options = this.options;

	  this.$element.on('click.tabs.' + ui, options.selector.nav + ' a', function (e) {
	    e.preventDefault();
	    _this.open($(this));
	  });

	  // TODO: nested Tabs touch events
	  if (!options.noSwipe) {
	    if (!this.$content.length) {
	      return this;
	    }

	    var hammer = new Hammer.Manager(this.$content[0]);
	    var swipe = new Hammer.Swipe({
	      direction: Hammer.DIRECTION_HORIZONTAL
	      // threshold: 40
	    });

	    hammer.add(swipe);

	    hammer.on('swipeleft', UI.utils.debounce(function (e) {
	      e.preventDefault();
	      _this.goTo('next');
	    }, 100));

	    hammer.on('swiperight', UI.utils.debounce(function (e) {
	      e.preventDefault();
	      _this.goTo('prev');
	    }, 100));

	    this._hammer = hammer;
	  }
	};

	/**
	 * Open $nav tab
	 * @param {jQuery|HTMLElement|Number} $nav
	 * @returns {Tabs}
	 */
	Tabs.prototype.open = function ($nav) {
	  var activeClass = this.options.activeClass;
	  var activeIndex = typeof $nav === 'number' ? $nav : this.$navs.index($($nav));

	  $nav = typeof $nav === 'number' ? this.$navs.eq(activeIndex) : $($nav);

	  if (!$nav ||
	    !$nav.length ||
	    this.transitioning ||
	    $nav.parent('li').hasClass(activeClass)) {
	    return;
	  }

	  var $tabNav = this.$tabNav;
	  var href = $nav.attr('href');
	  var regexHash = /^#.+$/;
	  var $target = regexHash.test(href) && this.$content.find(href) ||
	    this.$tabPanels.eq(activeIndex);
	  var previous = $tabNav.find('.' + activeClass + ' a')[0];
	  var e = $.Event('open.tabs.' + ui, {
	    relatedTarget: previous
	  });

	  $nav.trigger(e);

	  if (e.isDefaultPrevented()) {
	    return;
	  }

	  // activate Tab nav
	  this.activate($nav.closest('li'), $tabNav);

	  // activate Tab content
	  this.activate($target, this.$content, function () {
	    $nav.trigger({
	      type: 'opened.tabs.' + ui,
	      relatedTarget: previous
	    });
	  });

	  this.activeIndex = activeIndex;
	};

	Tabs.prototype.activate = function ($element, $container, callback) {
	  this.transitioning = true;

	  var activeClass = this.options.activeClass;
	  var $active = $container.find('> .' + activeClass);
	  var transition = callback && supportTransition && !!$active.length;

	  $active.removeClass(activeClass + ' ' + ns + 'in');

	  $element.addClass(activeClass);

	  if (transition) {
	    $element.redraw(); // reflow for transition
	    $element.addClass(ns + 'in');
	  } else {
	    $element.removeClass(ns + 'fade');
	  }

	  var complete = $.proxy(function complete() {
	    callback && callback();
	    this.transitioning = false;
	  }, this);



	  transition && !this.$content.is('.' + ns + 'tabs-bd-ofv') ?
	    $active.one(supportTransition.end, complete) : complete();
	};

	/**
	 * Go to `next` or `prev` tab
	 * @param {String} direction - `next` or `prev`
	 */
	Tabs.prototype.goTo = function (direction) {
	  var navIndex = this.activeIndex;
	  var isNext = direction === 'next';
	  var spring = isNext ? ns + 'animation-right-spring' :
	    ns + 'animation-left-spring';

	  if ((isNext && navIndex + 1 >= this.$navs.length) || // last one
	    (!isNext && navIndex === 0)) { // first one
	    var $panel = this.$tabPanels.eq(navIndex);

	    animation && $panel.addClass(spring).on(animation.end, function () {
	      $panel.removeClass(spring);
	    });
	  } else {
	    this.open(isNext ? navIndex + 1 : navIndex - 1);
	  }
	};

	Tabs.prototype.destroy = function () {
	  this.$element.off('.tabs.' + ui);
	  Hammer.off(this.$content[0], 'swipeleft swiperight');
	  this._hammer && this._hammer.destroy();
	  $.removeData(this.$element, ui + '.tabs');
	};

	// Plugin
	function Plugin(option) {
	  var args = Array.prototype.slice.call(arguments, 1);
	  var methodReturn;

	  this.each(function () {
	    var $this = $(this);
	    var $tabs = $this.is('.' + ns + 'tabs') && $this || $this.closest('.' + ns + 'tabs');
	    var data = $tabs.data(ui + '.tabs');
	    var options = $.extend({}, UI.utils.parseOptions($this.data('amTabs')),
	      $.isPlainObject(option) && option);

	    if (!data) {
	      $tabs.data(ui + '.tabs', (data = new Tabs($tabs[0], options)));
	    }

	    if (typeof option === 'string') {
	      if (option === 'open' && $this.is('.' + ns + 'tabs-nav a')) {
	        data.open($this);
	      } else {
	        methodReturn = typeof data[option] === 'function' ?
	          data[option].apply(data, args) : data[option];
	      }
	    }
	  });

	  return methodReturn === undefined ? this : methodReturn;
	}

	$.fn.tabs = Plugin;

	// Init code
	UI.ready(function (context) {
	  $('[data-' + ns + 'tabs]', context).tabs();
	});

	$(document).on('click.tabs.' + ui + '.data-api', '[data-' + ns + 'tabs] .' + ns + 'tabs-nav a',
	  function (e) {
	    e.preventDefault();
	    Plugin.call($(this), 'open');
	  });

	module.exports = UI.tabs = Tabs;



/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1);
	var UI = __webpack_require__(2);

	/**
	 * UCheck
	 * @via https://github.com/designmodo/Flat-UI/blob/8ef98df23ba7f5033e596a9bd05b53b535a9fe99/js/radiocheck.js
	 * @license CC BY 3.0 & MIT
	 * @param {HTMLElement} element
	 * @param {object} options
	 * @constructor
	 */

	var UCheck = function(element, options) {
	  this.options = $.extend({}, UCheck.DEFAULTS, options);
	  // this.options = $.extend({}, UCheck.DEFAULTS, this.$element.data(), options);
	  this.$element = $(element);
	  this.init();
	};

	UCheck.DEFAULTS = {
	  checkboxClass: 'ms-ucheck-checkbox',
	  radioClass: 'ms-ucheck-radio',
	  checkboxTpl: '<span class="ms-ucheck-icons">' +
	  '<i class="ms-icon-unchecked"></i><i class="ms-icon-checked"></i></span>',
	  radioTpl: '<span class="ms-ucheck-icons">' +
	  '<i class="ms-icon-unchecked"></i><i class="ms-icon-checked"></i></span>'
	};

	UCheck.prototype.init = function() {
	  var $element = this.$element;
	  var element = $element[0];
	  var options = this.options;

	  if (element.type === 'checkbox') {
	    $element.addClass(options.checkboxClass)
	      .after(options.checkboxTpl);
	  } else if (element.type === 'radio') {
	    $element.addClass(options.radioClass)
	      .after(options.radioTpl);
	  }
	};

	UCheck.prototype.check = function() {
	  this.$element
	    .prop('checked', true)
	    .trigger('change.ucheck.msui')
	    .trigger('checked.ucheck.msui');
	},

	UCheck.prototype.uncheck = function() {
	  this.$element
	    .prop('checked', false)
	    // trigger `change` event for form validation, etc.
	    // @see https://forum.jquery.com/topic/should-chk-prop-checked-true-trigger-change-event
	    .trigger('change')
	    .trigger('unchecked.ucheck.msui');
	},

	UCheck.prototype.toggle = function() {
	  this.$element.
	    prop('checked', function(i, value) {
	      return !value;
	    })
	    .trigger('change.ucheck.msui')
	    .trigger('toggled.ucheck.msui');
	},

	UCheck.prototype.disable = function() {
	  this.$element
	    .prop('disabled', true)
	    .trigger('change.ucheck.msui')
	    .trigger('disabled.ucheck.msui');
	},

	UCheck.prototype.enable = function() {
	  this.$element.prop('disabled', false);
	  this.$element.trigger('change.ucheck.msui').trigger('enabled.ucheck.msui');
	},

	UCheck.prototype.destroy = function() {
	  this.$element
	    .removeData('msui.ucheck')
	    .removeClass(this.options.checkboxClass + ' ' + this.options.radioClass)
	    .next('.ms-ucheck-icons')
	    .remove()
	  .end()
	    .trigger('destroyed.ucheck.msui');
	};

	UI.plugin('uCheck', UCheck, {
	  after: function() {
	    // Adding 'ms-nohover' class for touch devices
	    if (UI.support.touch) {
	      this.parent().hover(function() {
	        $(this).addClass('ms-nohover');
	      }, function() {
	        $(this).removeClass('ms-nohover');
	      });
	    }
	  }
	});

	UI.ready(function(context) {
	  $('[data-ms-ucheck]', context).uCheck();
	});

	module.exports = UCheck;




/***/ })
/******/ ])
});
;