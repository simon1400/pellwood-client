module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ({

/***/ "+BZ4":
/***/ (function(module, exports) {

module.exports = require("@sanity/image-url");

/***/ }),

/***/ "/jkW":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.isDynamicRoute = isDynamicRoute; // Identify /[param]/ in route string

const TEST_ROUTE = /\/\[[^/]+?\](?=\/|$)/;

function isDynamicRoute(route) {
  return TEST_ROUTE.test(route);
}

/***/ }),

/***/ "0Bsm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

exports.__esModule = true;
exports.default = withRouter;

var _react = _interopRequireDefault(__webpack_require__("cDcd"));

var _router = __webpack_require__("nOHt");

function withRouter(ComposedComponent) {
  function WithRouterWrapper(props) {
    return /*#__PURE__*/_react.default.createElement(ComposedComponent, Object.assign({
      router: (0, _router.useRouter)()
    }, props));
  }

  WithRouterWrapper.getInitialProps = ComposedComponent.getInitialProps // This is needed to allow checking for custom getInitialProps in _app
  ;
  WithRouterWrapper.origGetInitialProps = ComposedComponent.origGetInitialProps;

  if (false) {}

  return WithRouterWrapper;
}

/***/ }),

/***/ "0G5g":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

const requestIdleCallback = typeof self !== 'undefined' && self.requestIdleCallback || function (cb) {
  let start = Date.now();
  return setTimeout(function () {
    cb({
      didTimeout: false,
      timeRemaining: function () {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
};

var _default = requestIdleCallback;
exports.default = _default;

/***/ }),

/***/ "17YL":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (location => {
  var lang = 'cz',
      currency = 'Kč';

  if (location === 'en') {
    lang = 'en';
    currency = '€';
  } else {
    lang = 'cz';
    currency = 'Kč';
  }

  return {
    lang,
    currency
  };
});

/***/ }),

/***/ "238U":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DataStateContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataProvider; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("vmXh");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_1__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




let reducer = (state, action) => {
  switch (action.type) {
    case "basket":
      js_cookie__WEBPACK_IMPORTED_MODULE_1___default.a.set('basket', JSON.stringify([...action.state]));
      return _objectSpread(_objectSpread({}, state), {}, {
        basket: action.state
      });

    case "basketCount":
      js_cookie__WEBPACK_IMPORTED_MODULE_1___default.a.set('basketCount', JSON.stringify(action.state));
      return _objectSpread(_objectSpread({}, state), {}, {
        basketCount: action.state
      });

    case "user":
      js_cookie__WEBPACK_IMPORTED_MODULE_1___default.a.set('user', JSON.stringify(_objectSpread({}, action.state)));
      return _objectSpread(_objectSpread({}, state), {}, {
        user: action.state
      });

    case "state":
      return _objectSpread(_objectSpread({}, state), {}, {
        state: action.state
      });

    default:
      console.error('action.type: "' + action.type + '" is not implemented');
      return state;
  }
};

const initialState = {
  basket: js_cookie__WEBPACK_IMPORTED_MODULE_1___default.a.get('basket') ? JSON.parse(js_cookie__WEBPACK_IMPORTED_MODULE_1___default.a.get('basket')) : [],
  basketCount: js_cookie__WEBPACK_IMPORTED_MODULE_1___default.a.get('basketCount') ? JSON.parse(js_cookie__WEBPACK_IMPORTED_MODULE_1___default.a.get('basketCount')) : 0,
  user: js_cookie__WEBPACK_IMPORTED_MODULE_1___default.a.get('user') ? JSON.parse(js_cookie__WEBPACK_IMPORTED_MODULE_1___default.a.get('user')) : {},
  state: {
    searchFocus: false
  }
};
const DataStateContext = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["createContext"])(initialState);

function DataProvider(props) {
  const {
    0: dataContextState,
    1: dataContextDispatch
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useReducer"])(reducer, initialState);
  return __jsx(DataStateContext.Provider, {
    value: {
      dataContextState,
      dataContextDispatch
    }
  }, props.children);
}



/***/ }),

/***/ "284h":
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__("cDf5");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

module.exports = _interopRequireWildcard;

/***/ }),

/***/ "3WeD":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.searchParamsToUrlQuery = searchParamsToUrlQuery;
exports.urlQueryToSearchParams = urlQueryToSearchParams;
exports.assign = assign;

function searchParamsToUrlQuery(searchParams) {
  const query = {};
  searchParams.forEach((value, key) => {
    if (typeof query[key] === 'undefined') {
      query[key] = value;
    } else if (Array.isArray(query[key])) {
      ;
      query[key].push(value);
    } else {
      query[key] = [query[key], value];
    }
  });
  return query;
}

function stringifyUrlQueryParam(param) {
  if (typeof param === 'string' || typeof param === 'number' && !isNaN(param) || typeof param === 'boolean') {
    return String(param);
  } else {
    return '';
  }
}

function urlQueryToSearchParams(urlQuery) {
  const result = new URLSearchParams();
  Object.entries(urlQuery).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(item => result.append(key, stringifyUrlQueryParam(item)));
    } else {
      result.set(key, stringifyUrlQueryParam(value));
    }
  });
  return result;
}

function assign(target, ...searchParamsList) {
  searchParamsList.forEach(searchParams => {
    Array.from(searchParams.keys()).forEach(key => target.delete(key));
    searchParams.forEach((value, key) => target.append(key, value));
  });
  return target;
}

/***/ }),

/***/ "3bEZ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _sanity_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("Aog/");
/* harmony import */ var _sanity_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sanity_client__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["a"] = (_sanity_client__WEBPACK_IMPORTED_MODULE_0___default()({
  // Find your project ID and dataset in `sanity.json` in your studio project
  projectId: "ejvonubx",
  dataset: "production",
  useCdn: true // useCdn == true gives fast, cheap responses using a globally distributed cache.
  // Set this to false if your application require the freshest possible
  // data always (potentially slightly slower and a bit more expensive).

}));

/***/ }),

/***/ "3wub":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.normalizeLocalePath = normalizeLocalePath;

function normalizeLocalePath(pathname, locales) {
  let detectedLocale; // first item will be empty string from splitting at first char

  const pathnameParts = pathname.split('/');
  (locales || []).some(locale => {
    if (pathnameParts[1].toLowerCase() === locale.toLowerCase()) {
      detectedLocale = locale;
      pathnameParts.splice(1, 1);
      pathname = pathnameParts.join('/') || '/';
      return true;
    }

    return false;
  });
  return {
    pathname,
    detectedLocale
  };
}

/***/ }),

/***/ "4Q3z":
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("CXCL");


/***/ }),

/***/ "6D7l":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.formatUrl = formatUrl;

var querystring = _interopRequireWildcard(__webpack_require__("3WeD"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function () {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
} // Format function modified from nodejs
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


const slashedProtocols = /https?|ftp|gopher|file/;

function formatUrl(urlObj) {
  let {
    auth,
    hostname
  } = urlObj;
  let protocol = urlObj.protocol || '';
  let pathname = urlObj.pathname || '';
  let hash = urlObj.hash || '';
  let query = urlObj.query || '';
  let host = false;
  auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ':') + '@' : '';

  if (urlObj.host) {
    host = auth + urlObj.host;
  } else if (hostname) {
    host = auth + (~hostname.indexOf(':') ? `[${hostname}]` : hostname);

    if (urlObj.port) {
      host += ':' + urlObj.port;
    }
  }

  if (query && typeof query === 'object') {
    query = String(querystring.urlQueryToSearchParams(query));
  }

  let search = urlObj.search || query && `?${query}` || '';
  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname[0] !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash[0] !== '#') hash = '#' + hash;
  if (search && search[0] !== '?') search = '?' + search;
  pathname = pathname.replace(/[?#]/g, encodeURIComponent);
  search = search.replace('#', '%23');
  return `${protocol}${host}${pathname}${search}${hash}`;
}

/***/ }),

/***/ "8MC4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__("xnum");
var head_default = /*#__PURE__*/__webpack_require__.n(head_);

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__("4Q3z");

// EXTERNAL MODULE: ./context/dataStateContext.js
var dataStateContext = __webpack_require__("238U");

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__("YFqc");
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);

// EXTERNAL MODULE: ./lib/sanity.js
var sanity = __webpack_require__("3bEZ");

// EXTERNAL MODULE: ./data/staticTranslate.js
var staticTranslate = __webpack_require__("jTVC");

// EXTERNAL MODULE: ./data/localize.js
var localize = __webpack_require__("17YL");

// EXTERNAL MODULE: external "uikit"
var external_uikit_ = __webpack_require__("MhC/");

// CONCATENATED MODULE: ./layout/Canvas.js

var __jsx = external_react_default.a.createElement;








const Canvas = () => {
  const router = Object(router_["useRouter"])();
  const {
    lang,
    currency
  } = Object(localize["a" /* default */])(router.locale);
  const {
    dataContextState,
    dataContextDispatch
  } = Object(external_react_["useContext"])(dataStateContext["b" /* DataStateContext */]);
  const {
    0: basket,
    1: setBasket
  } = Object(external_react_["useState"])(dataContextState.basket);
  const {
    0: basketCount,
    1: setBasketCount
  } = Object(external_react_["useState"])(dataContextState.basketCount);
  const {
    0: sum,
    1: setSum
  } = Object(external_react_["useState"])(0);
  const {
    0: sale,
    1: setSale
  } = Object(external_react_["useState"])(0);
  Object(external_react_["useEffect"])(() => {
    setBasket(dataContextState.basket);
    setBasketCount(dataContextState.basketCount);
  }, [dataContextState.basketCount]);

  const closeCanvas = () => {
    Object(external_uikit_["offcanvas"])('#offcanvas-flip').hide();
  };

  const onSumItems = () => {
    let sumAll = 0,
        sumItem = 0;

    if (basket) {
      basket.map((item, index) => {
        if (item.variantPrice instanceof String) {
          sumItem = item.variantPrice.split(' ')[0] * item.countVariant;
        } else {
          sumItem = item.variantPrice * item.countVariant;
        }

        sumAll = +sumItem + sumAll;
      });
    }

    if (lang === 'en' && sumAll > 150) {
      setSale((Math.round(sumAll * 0.05 * 100) / 100).toFixed(2));
      sumAll = sumAll - sumAll * 0.05;
    } else if (lang === 'cz' && sumAll > 2000) {
      setSale(Math.round(sumAll * 0.05));
      sumAll = sumAll - sumAll * 0.05;
    }

    if (lang === 'en' && sumAll <= 150 || lang === 'cz' && sumAll <= 2000) {
      setSale(0);
    }

    if (lang === 'en') {
      setSum((Math.round(sumAll * 100) / 100).toFixed(2));
    } else {
      setSum(Math.round(sumAll));
    }
  };

  Object(external_react_["useEffect"])(() => {
    onSumItems();
  }, []);
  Object(external_react_["useEffect"])(() => {
    setBasket(dataContextState.basket);
    setBasketCount(dataContextState.basketCount);
    onSumItems();
  }, [router.query.length]);
  Object(external_react_["useEffect"])(() => {
    dataContextDispatch({
      state: basket,
      type: 'basket'
    });
    dataContextDispatch({
      state: basketCount,
      type: 'basketCount'
    });
  }, [basketCount]);

  const deleteItem = e => {
    e.preventDefault();
    basket.map((item, index) => {
      if (item.id === e.currentTarget.dataset.id && item.variantName === e.currentTarget.dataset.name) {
        basket.splice(index, 1);
      }
    });
    let newBasketCount = +basketCount - 1;
    setBasketCount(newBasketCount);
    setBasket(basket);
  };

  return __jsx("div", {
    id: "offcanvas-flip",
    "uk-offcanvas": "flip: true; overlay: true;"
  }, __jsx("div", {
    className: "uk-offcanvas-bar"
  }, __jsx("div", {
    className: "tm-canvas-head"
  }, __jsx("span", {
    className: "tm-circle-count"
  }, basketCount ? basketCount : 0), __jsx("h2", null, staticTranslate["a" /* default */].basket[lang]), __jsx(link_default.a, {
    href: router.asPath
  }, __jsx("a", {
    className: "tm-canvas-close uk-close-large uk-close",
    "uk-close": "",
    onClick: e => closeCanvas()
  }))), basketCount && sum ? __jsx("div", null, !!basket.length && basket.map((item, index) => __jsx("div", {
    key: index,
    className: "tm-canvas-basket-item-wrap"
  }, __jsx("div", {
    className: "tm-basket-item"
  }, __jsx("div", {
    "data-src": item.imgUrl,
    className: "tm-basket-img-wrap uk-background-contain",
    "uk-img": ""
  }), __jsx("div", {
    className: "tm-basket-item-info"
  }, __jsx("h3", {
    className: "tm-basket-item-head"
  }, item.nameProduct), __jsx("span", null, item.variantName), __jsx("span", null, item.variantPrice instanceof String ? item.variantPrice : item.variantPrice + ' ' + currency), __jsx("div", {
    className: "tm-canvas-basket-item-count"
  }, __jsx("span", null, item.countVariant, " ", staticTranslate["a" /* default */].pc[lang]), __jsx(link_default.a, {
    href: router.asPath + '?delete' + item.id + item.variantName
  }, __jsx("a", null, __jsx("button", {
    className: "tm-canvas-item-remove",
    "data-id": item.id,
    "data-name": item.variantName,
    type: "button",
    onClick: e => deleteItem(e),
    "uk-close": ""
  })))))))), __jsx("div", {
    className: "tm-basket-total"
  }, __jsx("table", {
    className: "uk-table uk-table-divider"
  }, __jsx("tbody", null, __jsx("tr", null, __jsx("td", null, staticTranslate["a" /* default */].delivery[lang]), __jsx("td", null, __jsx("span", {
    className: `${lang === 'en' && sum > 100 || lang === 'cz' && sum > 1500 && "tm-positive"}`
  }, lang === 'cz' && sum <= 1500 && 'od 150 Kč', lang === 'en' && sum <= 100 && '10 €', lang === 'en' && sum > 100 && staticTranslate["a" /* default */].free[lang], lang === 'cz' && sum > 1500 && staticTranslate["a" /* default */].free[lang]))), (lang === 'cz' && sum <= 1500 || lang === 'en' && sum <= 100) && __jsx("tr", null, __jsx("td", null, staticTranslate["a" /* default */].deliveryFreeCanvas[lang]), __jsx("td", null, staticTranslate["a" /* default */].deliveryFreeCanvasValue[lang])), (lang === 'cz' && sum <= 2000 || lang === 'en' && sum <= 150) && __jsx("tr", null, __jsx("td", null, staticTranslate["a" /* default */].saleCanvas[lang]), __jsx("td", null, staticTranslate["a" /* default */].saleCanvasValue[lang])), sale > 0 && __jsx("tr", null, __jsx("td", null, staticTranslate["a" /* default */].sale[lang]), __jsx("td", null, "-", sale, " ", currency)), __jsx("tr", null, __jsx("td", null, staticTranslate["a" /* default */].totalprice[lang]), __jsx("td", null, sum, " ", currency))))), __jsx("div", {
    className: "tm-basket-footer"
  }, __jsx(link_default.a, {
    href: "/basket",
    onClick: () => closeCanvas()
  }, __jsx("a", {
    className: "tm-button tm-bare-button"
  }, staticTranslate["a" /* default */].basket[lang])), __jsx(link_default.a, {
    href: "/basket/checkout",
    onClick: () => closeCanvas()
  }, __jsx("a", {
    className: "tm-button tm-black-button"
  }, staticTranslate["a" /* default */].checkout[lang])))) : __jsx("p", {
    className: "uk-text-center"
  }, staticTranslate["a" /* default */].emptybasket[lang])));
};

/* harmony default export */ var layout_Canvas = (Canvas);
// CONCATENATED MODULE: ./layout/Header.js

var Header_jsx = external_react_default.a.createElement;









const Header = () => {
  var _dataContextState$use, _dataContextState$use2;

  const router = Object(router_["useRouter"])();
  const {
    lang,
    currency
  } = Object(localize["a" /* default */])(router.locale);
  const query = `*[_type == "archive" && !(_id == '3cc07543-ce81-4ad2-ace0-8bf754217065')] {
    "title": ${lang}.title,
    "slug": ${lang}.slug,
    "sort": ${lang}.sort
  } | order(sort asc)`;
  const {
    dataContextState,
    dataContextDispatch
  } = Object(external_react_["useContext"])(dataStateContext["b" /* DataStateContext */]);
  const {
    0: menu,
    1: setMenu
  } = Object(external_react_["useState"])([]);
  const {
    0: basketCount,
    1: setBasketCount
  } = Object(external_react_["useState"])(0);
  const {
    0: hamburger,
    1: setHamburger
  } = Object(external_react_["useState"])(false);
  Object(external_react_["useEffect"])(() => {
    sanity["a" /* default */].fetch(query).then(data => setMenu(data));
  }, []);
  Object(external_react_["useEffect"])(() => {
    sanity["a" /* default */].fetch(query).then(data => setMenu(data));
  }, [router.locale]);
  Object(external_react_["useEffect"])(() => {
    setBasketCount(dataContextState.basketCount);
  }, [dataContextState.basketCount]);

  const handleHamburger = () => {
    if (hamburger) {
      document.body.style.overflow = 'scroll';
    } else {
      document.body.style.overflow = 'hidden';
    }

    setHamburger(!hamburger);
  };

  const changeLanguage = (e, url) => {
    dataContextDispatch({
      state: [],
      type: 'basket'
    });
    dataContextDispatch({
      state: 0,
      type: 'basketCount'
    });
  };

  return Header_jsx(external_react_default.a.Fragment, null, Header_jsx(layout_Canvas, {
    currency: currency
  }), Header_jsx("header", null, Header_jsx("div", {
    className: "uk-container uk-container-expand uk-height-1-1"
  }, Header_jsx("div", {
    className: "uk-flex uk-flex-between uk-flex-middle uk-height-1-1"
  }, Header_jsx(link_default.a, {
    href: "/"
  }, Header_jsx("a", {
    className: "logo-wrap uk-width-auto"
  }, Header_jsx("img", {
    src: "/assets/logo.svg",
    width: "200",
    height: "100%",
    alt: "Pellwood"
  }))), Header_jsx("div", {
    className: "uk-text-right uk-width-expand uk-hidden@m"
  }, Header_jsx("button", {
    className: `hamburger hamburger--spin ${hamburger ? 'is-active' : ''}`,
    onClick: () => handleHamburger(),
    type: "button"
  }, Header_jsx("span", {
    className: "hamburger-box"
  }, Header_jsx("span", {
    className: "hamburger-inner"
  })))), Header_jsx("div", {
    className: `top-nav uk-width-expand ${hamburger ? 'menu-active' : ''}`
  }, Header_jsx("nav", null, Header_jsx("ul", null, Header_jsx("li", {
    className: router.asPath.indexOf('/produkty') >= 0 ? 'active-menu-top' : ''
  }, Header_jsx(link_default.a, {
    href: "/produkty"
  }, Header_jsx("a", null, staticTranslate["a" /* default */].products[lang]))), (menu || []).map((item, index) => Header_jsx("li", {
    key: index,
    className: router.asPath.indexOf(item === null || item === void 0 ? void 0 : item.slug.current) >= 0 ? 'active-menu-top' : ''
  }, Header_jsx(link_default.a, {
    href: `/kategorie/${item.slug.current}`
  }, Header_jsx("a", null, item.title)))))), Header_jsx("div", {
    className: "lang-nav uk-hidden@m"
  }, Header_jsx("nav", null, Header_jsx("ul", null, Header_jsx("li", {
    className: lang === 'cz' ? "menu_active" : undefined
  }, Header_jsx(link_default.a, {
    href: "/",
    locale: "cs"
  }, Header_jsx("a", null, "cs"))), Header_jsx("li", {
    className: lang === 'en' ? "menu_active" : undefined
  }, Header_jsx(link_default.a, {
    href: "/",
    locale: "en"
  }, Header_jsx("a", null, "en")))))), Header_jsx("div", {
    className: "user-area uk-hidden@m"
  }, Header_jsx("div", {
    className: "login"
  }, ((_dataContextState$use = dataContextState.user) === null || _dataContextState$use === void 0 ? void 0 : _dataContextState$use.email) ? Header_jsx(link_default.a, {
    href: "/user"
  }, Header_jsx("a", null, staticTranslate["a" /* default */].account[lang])) : Header_jsx("a", {
    href: "#modal-login",
    "uk-toggle": ""
  }, "P\u0159ihla\u0161en\xED")))), Header_jsx("div", {
    className: "uk-flex function-button-wrap uk-width-auto"
  }, Header_jsx("div", {
    className: "lang-nav uk-visible@m"
  }, Header_jsx("nav", null, Header_jsx("ul", null, Header_jsx("li", {
    className: lang === 'cz' ? "menu_active" : undefined,
    onClick: e => changeLanguage(e, '/')
  }, Header_jsx(link_default.a, {
    href: "/",
    locale: "cs"
  }, Header_jsx("a", null, "cs"))), Header_jsx("li", {
    className: lang === 'en' ? "menu_active" : undefined,
    onClick: e => changeLanguage(e, '/en')
  }, Header_jsx(link_default.a, {
    href: "/en",
    locale: "en"
  }, Header_jsx("a", null, "en")))))), Header_jsx("div", {
    className: "user-area"
  }, Header_jsx("div", {
    className: "login"
  }, ((_dataContextState$use2 = dataContextState.user) === null || _dataContextState$use2 === void 0 ? void 0 : _dataContextState$use2.email) ? Header_jsx(link_default.a, {
    href: "/user"
  }, Header_jsx("a", {
    className: "uk-visible@m"
  }, staticTranslate["a" /* default */].account[lang])) : Header_jsx("a", {
    href: "#modal-login",
    className: "uk-visible@m",
    "uk-toggle": ""
  }, staticTranslate["a" /* default */].login[lang]), Header_jsx("a", {
    nohref: "",
    href: "/",
    className: "basket_count",
    "uk-toggle": "target: #offcanvas-flip"
  }, basketCount))))))));
};

/* harmony default export */ var layout_Header = (Header);
// EXTERNAL MODULE: external "@sanity/block-content-to-react"
var block_content_to_react_ = __webpack_require__("gEUu");
var block_content_to_react_default = /*#__PURE__*/__webpack_require__.n(block_content_to_react_);

// CONCATENATED MODULE: ./layout/Footer.js

var Footer_jsx = external_react_default.a.createElement;





/* harmony default export */ var Footer = (() => {
  const router = Object(router_["useRouter"])();
  const {
    lang
  } = Object(localize["a" /* default */])(router.locale);
  const query = `*[_type == "settings"].${lang}.footer`;
  const {
    0: footer,
    1: setFooter
  } = Object(external_react_["useState"])([]);
  Object(external_react_["useEffect"])(() => {
    sanity["a" /* default */].fetch(query).then(data => {
      setFooter(data[0]);
    });
  }, []);
  return Footer_jsx("footer", null, Footer_jsx("div", {
    className: "uk-container uk-container-expand uk-height-1-1"
  }, Footer_jsx("div", {
    className: "uk-flex uk-flex-between uk-flex-middle uk-height-1-1 uk-flex-wrap",
    "uk-height-match": "target: > .footer-item"
  }, Footer_jsx("div", {
    className: "cart_method_foot uk-flex uk-flex-left"
  }, Footer_jsx("div", null, Footer_jsx("img", {
    src: "/assets/mastercard.svg",
    width: "100%",
    height: "28",
    alt: "Mastercard"
  })), Footer_jsx("div", null, Footer_jsx("img", {
    src: "/assets/visa.svg",
    width: "100%",
    height: "28",
    alt: "Visa"
  }))), (footer === null || footer === void 0 ? void 0 : footer.length) && footer.map(item => Footer_jsx("div", {
    key: item._key,
    className: "footer-item"
  }, Footer_jsx("h4", {
    className: "footer-item-head"
  }, item.title), Footer_jsx(block_content_to_react_default.a, {
    blocks: item.content
  }))))), Footer_jsx("div", {
    className: "copyright"
  }, Footer_jsx("span", null, "Made in Brno by"), Footer_jsx("a", {
    href: "mailto:danielkokes@gmail.com"
  }, Footer_jsx("img", {
    src: "/assets/hardart.svg",
    height: "18",
    width: "100%",
    alt: "Hardart studio"
  }))));
});
// EXTERNAL MODULE: ./functions/validationForm.js
var validationForm = __webpack_require__("R/Ed");

// EXTERNAL MODULE: ./restClient.js
var restClient = __webpack_require__("f0af");

// CONCATENATED MODULE: ./components/Login/index.js

var Login_jsx = external_react_default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










const Login = ({
  setLoginUser
}) => {
  const router = Object(router_["useRouter"])();
  const {
    lang
  } = Object(localize["a" /* default */])(router.locale);
  const {
    dataContextDispatch
  } = Object(external_react_["useContext"])(dataStateContext["b" /* DataStateContext */]);
  const {
    0: email,
    1: setEmail
  } = Object(external_react_["useState"])('');
  const {
    0: password,
    1: setPassword
  } = Object(external_react_["useState"])('');
  const {
    0: error,
    1: setError
  } = Object(external_react_["useState"])({
    email: false,
    password: false
  });

  const closeModal = () => {
    Object(external_uikit_["modal"])('#modal-login').hide();
  };

  const handleInput = (e, type) => {
    if (type === 'email') {
      setError(_objectSpread(_objectSpread({}, error), {}, {
        email: false
      }));
      setEmail(e.target.value);
    } else if (type === 'password') {
      setError(_objectSpread(_objectSpread({}, error), {}, {
        password: false
      }));
      setPassword(e.target.value);
    }
  };

  const onBlur = type => {
    if (Object(validationForm["a" /* default */])('email', {
      email
    }, error, setError)) {
      return true;
    }

    if (type === 'password' && password.length < 8 && password.length > 0) {
      setError(_objectSpread(_objectSpread({}, error), {}, {
        password: true
      }));
      return true;
    }

    return false;
  };

  const forgotPassword = e => {
    e.preventDefault();
    Object(external_uikit_["modal"])('#modal-login').hide();
    Object(external_uikit_["modal"])('#forgot-password').show();
  };

  const onLogin = e => {
    e.preventDefault();

    if (onBlur('email') || onBlur('password')) {
      return;
    }

    restClient["a" /* AxiosAPI */].post(`/user/login`, {
      email,
      password
    }).then(res => {
      dataContextDispatch({
        state: res.data.data,
        type: 'user'
      });
      setLoginUser(true);
      Object(external_uikit_["modal"])('#modal-login').hide();
    }).catch(err => {
      console.log(err.response);
      setError(_objectSpread(_objectSpread({}, error), {}, {
        email: 'notExist'
      }));
    });
  };

  const onRegister = e => {
    e.preventDefault();

    if (onBlur('email') || onBlur('password')) {
      return;
    }

    restClient["a" /* AxiosAPI */].post(`/user`, {
      email,
      password
    }).then(res => {
      var _res$data, _res$data$error, _res$data2, _res$data2$error;

      if (res.data.error === 'email') setError(_objectSpread(_objectSpread({}, error), {}, {
        email: 'exist'
      }));else if (((_res$data = res.data) === null || _res$data === void 0 ? void 0 : (_res$data$error = _res$data.error) === null || _res$data$error === void 0 ? void 0 : _res$data$error.indexOf('password')) >= 0) setError(_objectSpread(_objectSpread({}, error), {}, {
        password: 'empty'
      }));else if (((_res$data2 = res.data) === null || _res$data2 === void 0 ? void 0 : (_res$data2$error = _res$data2.error) === null || _res$data2$error === void 0 ? void 0 : _res$data2$error.indexOf('email')) >= 0) setError(_objectSpread(_objectSpread({}, error), {}, {
        email: 'empty'
      }));else {
        // AxiosAPI.post(`${process.env.REACT_APP_API}/sendRegistration`, {email: res.data.data.email}).then(res => console.log('send mail'))
        dataContextDispatch({
          state: res.data.data,
          type: 'user'
        });
        setLoginUser(true);
        router.push("/user");
      }
    }).catch(err => {
      console.log(err);
    });
  };

  return Login_jsx("div", {
    id: "modal-login",
    className: "uk-flex-top",
    "uk-modal": ""
  }, Login_jsx("div", {
    className: "uk-modal-dialog uk-modal-body uk-margin-auto-vertical"
  }, Login_jsx("div", {
    className: "tm-canvas-head"
  }, Login_jsx("h2", null, staticTranslate["a" /* default */].login[lang]), Login_jsx("button", {
    className: "tm-canvas-close uk-close-large",
    type: "button",
    "uk-close": "",
    onClick: e => closeModal()
  })), Login_jsx("div", {
    className: "login_form"
  }, Login_jsx("form", {
    onSubmit: e => onLogin(e)
  }, error.email === 'notExist' && Login_jsx("div", {
    className: "uk-alert-danger",
    "uk-alert": ""
  }, Login_jsx("p", null, staticTranslate["a" /* default */].loginErrorWrong[lang])), error.email === 'exist' && Login_jsx("div", {
    className: "uk-alert-danger",
    "uk-alert": ""
  }, Login_jsx("p", null, staticTranslate["a" /* default */].loginErrorExist[lang])), (error.email === 'empty' || error.password === 'empty') && Login_jsx("div", {
    className: "uk-alert-danger",
    "uk-alert": ""
  }, Login_jsx("p", null, staticTranslate["a" /* default */].emptyFields[lang])), Login_jsx("div", {
    className: "uk-margin input_item"
  }, Login_jsx("input", {
    className: `${email.length && 'hasValue'} ${!!error.email && 'invalid'}`,
    type: "email",
    value: email,
    onBlur: () => onBlur('email'),
    onChange: e => handleInput(e, 'email'),
    tabIndex: "1"
  }), Login_jsx("label", null, staticTranslate["a" /* default */].formemail[lang])), Login_jsx("div", {
    className: "uk-margin input_item"
  }, Login_jsx("input", {
    className: `${password.length && 'hasValue'} ${(error.password || error.email === 'notExist') && 'invalid'}`,
    type: "password",
    onBlur: () => onBlur('password'),
    value: password,
    onChange: e => handleInput(e, 'password'),
    tabIndex: "2"
  }), Login_jsx("label", null, staticTranslate["a" /* default */].formpassword[lang])), Login_jsx("button", {
    type: "submit",
    className: "tm-button tm-black-button uk-width-1-1"
  }, staticTranslate["a" /* default */].login[lang]), Login_jsx("a", {
    href: "/",
    onClick: e => forgotPassword(e),
    className: "tm-button tm-bare-button tm-button-text uk-width-1-1"
  }, Login_jsx("span", null, staticTranslate["a" /* default */].forgottenpassword[lang])), Login_jsx("hr", null), Login_jsx("p", null, staticTranslate["a" /* default */].notyetaccount[lang]), Login_jsx("button", {
    className: "tm-button tm-bare-button uk-width-1-1",
    onClick: e => onRegister(e)
  }, Login_jsx("span", null, staticTranslate["a" /* default */].registration[lang]))))));
};

/* harmony default export */ var components_Login = (Login);
// CONCATENATED MODULE: ./components/ForgotPassword/index.js

var ForgotPassword_jsx = external_react_default.a.createElement;

function ForgotPassword_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function ForgotPassword_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ForgotPassword_ownKeys(Object(source), true).forEach(function (key) { ForgotPassword_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ForgotPassword_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function ForgotPassword_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








const ForgotPassword = () => {
  const router = Object(router_["useRouter"])();
  const {
    lang
  } = Object(localize["a" /* default */])(router.locale);
  const {
    0: email,
    1: setEmail
  } = Object(external_react_["useState"])('');
  const {
    0: done,
    1: setDone
  } = Object(external_react_["useState"])(false);
  const {
    0: error,
    1: setError
  } = Object(external_react_["useState"])({});

  const closeModal = () => {
    Object(external_uikit_["modal"])('#forgot-password').hide();
  };

  const handleInput = (e, type) => {
    if (type === 'email') {
      setError(ForgotPassword_objectSpread(ForgotPassword_objectSpread({}, error), {}, {
        loginEmail: false
      }));
      setEmail(e.target.value);
    }
  };

  const send = e => {
    e.preventDefault();
    restClient["a" /* AxiosAPI */].post(`${process.env.REACT_APP_API}/send/reset-password`, {
      email
    }).then(res => {
      console.log(res);
      setDone(true);
    }).catch(err => console.log(err));
  };

  return ForgotPassword_jsx("div", {
    id: "forgot-password",
    className: "uk-flex-top",
    "uk-modal": ""
  }, ForgotPassword_jsx("div", {
    className: "uk-modal-dialog uk-modal-body uk-margin-auto-vertical"
  }, ForgotPassword_jsx("div", {
    className: "tm-canvas-head",
    style: {
      marginTop: 0
    }
  }, ForgotPassword_jsx("h2", null, staticTranslate["a" /* default */].forgottenpassword[lang]), ForgotPassword_jsx("button", {
    className: "tm-canvas-close uk-close-large",
    type: "button",
    "uk-close": "",
    onClick: e => closeModal()
  })), !done && ForgotPassword_jsx("div", {
    className: "login_form"
  }, ForgotPassword_jsx("form", {
    onSubmit: e => send(e)
  }, error.loginEmail === 'notExist' && ForgotPassword_jsx("div", {
    className: "uk-alert-danger",
    "uk-alert": ""
  }, ForgotPassword_jsx("p", null, "Zadaliste spatne email nebo heslo")), error.loginEmail === 'exist' && ForgotPassword_jsx("div", {
    className: "uk-alert-danger",
    "uk-alert": ""
  }, ForgotPassword_jsx("p", null, "Uzivatel s timto emailem uz existuje")), (error.loginEmail === 'empty' || error.loginPassword === 'empty') && ForgotPassword_jsx("div", {
    className: "uk-alert-danger",
    "uk-alert": ""
  }, ForgotPassword_jsx("p", null, "Vypl\u0148te v\u0161echna pole")), ForgotPassword_jsx("div", {
    className: "uk-margin input_item"
  }, ForgotPassword_jsx("input", {
    className: `${email.length && 'hasValue'} ${error.loginEmail && 'invalid'}`,
    type: "email",
    value: email,
    onChange: e => handleInput(e, 'email'),
    tabIndex: "1"
  }), ForgotPassword_jsx("label", null, staticTranslate["a" /* default */].formemail[lang])), ForgotPassword_jsx("button", {
    type: "submit",
    className: "tm-button tm-black-button uk-width-1-1"
  }, staticTranslate["a" /* default */].sendResetPasswordButton[lang]))), done && ForgotPassword_jsx("div", {
    className: "uk-alert-success",
    "uk-alert": ""
  }, ForgotPassword_jsx("p", null, "Link pro obnoveni hesla byl zaslany na vas email"))));
};

/* harmony default export */ var components_ForgotPassword = (ForgotPassword);
// CONCATENATED MODULE: ./components/ResetPassword/index.js

var ResetPassword_jsx = external_react_default.a.createElement;

function ResetPassword_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function ResetPassword_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ResetPassword_ownKeys(Object(source), true).forEach(function (key) { ResetPassword_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ResetPassword_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function ResetPassword_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








const ResetPassword = ({
  history
}) => {
  const router = Object(router_["useRouter"])();
  const {
    lang
  } = Object(localize["a" /* default */])(router.locale);
  const {
    0: email,
    1: setEmail
  } = Object(external_react_["useState"])('');
  const {
    0: password,
    1: setPassword
  } = Object(external_react_["useState"])('');
  const {
    0: confirmPassword,
    1: setConfirmPassword
  } = Object(external_react_["useState"])('');
  const {
    0: done,
    1: setDone
  } = Object(external_react_["useState"])(false);
  const {
    0: error,
    1: setError
  } = Object(external_react_["useState"])({
    password: false,
    confirmPassword: false
  });
  Object(external_react_["useEffect"])(() => {
    if (router.query.email) {
      setEmail(Buffer.from(router.query.email, 'base64').toString());
    }
  }, []);

  const closeModal = () => {
    Object(external_uikit_["modal"])('#reset-password').hide();
  };

  const handleInput = (e, type) => {
    if (type === 'password') {
      setError(ResetPassword_objectSpread(ResetPassword_objectSpread({}, error), {}, {
        password: false
      }));
      setPassword(e.target.value);
    }

    if (type === 'confirmPassword') {
      setError(ResetPassword_objectSpread(ResetPassword_objectSpread({}, error), {}, {
        password: false
      }));
      setConfirmPassword(e.target.value);
    }
  };

  const onBlur = () => {
    if (password !== confirmPassword) {
      setError(ResetPassword_objectSpread(ResetPassword_objectSpread({}, error), {}, {
        confirmPassword: true
      }));
      return true;
    }

    return false;
  };

  const send = e => {
    e.preventDefault();
    if (onBlur()) return;
    restClient["a" /* AxiosAPI */].put(`${process.env.REACT_APP_API}/user/password`, {
      email,
      password
    }).then(res => {
      setDone(true);
      history.push({
        search: ''
      });
    }).catch(err => console.log(err));
  };

  return ResetPassword_jsx("div", {
    id: "reset-password",
    className: "uk-flex-top",
    "uk-modal": ""
  }, ResetPassword_jsx("div", {
    className: "uk-modal-dialog uk-modal-body uk-margin-auto-vertical"
  }, ResetPassword_jsx("div", {
    className: "tm-canvas-head",
    style: {
      marginTop: 0
    }
  }, ResetPassword_jsx("h2", null, staticTranslate["a" /* default */].forgottenpassword[lang]), ResetPassword_jsx("button", {
    className: "tm-canvas-close uk-close-large",
    type: "button",
    "uk-close": "",
    onClick: e => closeModal()
  })), !done && ResetPassword_jsx("div", {
    className: "login_form"
  }, ResetPassword_jsx("form", {
    onSubmit: e => send(e)
  }, error.loginEmail === 'notExist' && ResetPassword_jsx("div", {
    className: "uk-alert-danger",
    "uk-alert": ""
  }, ResetPassword_jsx("p", null, "Zadaliste spatne email nebo heslo")), error.loginEmail === 'exist' && ResetPassword_jsx("div", {
    className: "uk-alert-danger",
    "uk-alert": ""
  }, ResetPassword_jsx("p", null, "Uzivatel s timto emailem uz existuje")), (error.loginEmail === 'empty' || error.loginPassword === 'empty') && ResetPassword_jsx("div", {
    className: "uk-alert-danger",
    "uk-alert": ""
  }, ResetPassword_jsx("p", null, "Vypl\u0148te v\u0161echna pole")), ResetPassword_jsx("div", {
    className: "uk-margin input_item"
  }, ResetPassword_jsx("input", {
    className: `${password.length && 'hasValue'} ${error.password && 'invalid'}`,
    type: "password",
    value: password,
    onChange: e => handleInput(e, 'password'),
    tabIndex: "1"
  }), ResetPassword_jsx("label", null, "Nove ", staticTranslate["a" /* default */].formpassword[lang])), ResetPassword_jsx("div", {
    className: "uk-margin input_item"
  }, ResetPassword_jsx("input", {
    className: `${confirmPassword.length && 'hasValue'} ${error.confirmPassword && 'invalid'}`,
    type: "password",
    onBlur: () => onBlur(),
    value: confirmPassword,
    onChange: e => handleInput(e, 'confirmPassword'),
    tabIndex: "2"
  }), ResetPassword_jsx("label", null, "Opakovat nove ", staticTranslate["a" /* default */].formpassword[lang])), ResetPassword_jsx("button", {
    type: "submit",
    className: "tm-button tm-black-button uk-width-1-1"
  }, "Obnovit heslo"))), done && ResetPassword_jsx("div", {
    className: "uk-alert-success",
    "uk-alert": ""
  }, ResetPassword_jsx("p", null, "Heslo je uspesne obnoveno"))));
};

/* harmony default export */ var components_ResetPassword = (ResetPassword);
// CONCATENATED MODULE: ./layout/Page.js

var Page_jsx = external_react_default.a.createElement;









const SITE_URL = false ? undefined : 'https://pellwood.com';
const defaultTitle = 'PELLWOOD';
const defaultDescription = 'Paličky';
const defaultImage = `${SITE_URL}/assets/logo.svg`; // const defaultTwitter = '@pellwood';

const defaultSep = ' | ';

const Page = ({
  children,
  id,
  className,
  title,
  description,
  image,
  twitter,
  contentType,
  published,
  category,
  updated,
  noCrawl,
  tags
}) => {
  const router = Object(router_["useRouter"])();
  const theTitle = title ? (title + defaultSep + defaultTitle).substring(0, 60) : defaultTitle;
  const theDescription = description ? description.substring(0, 155) : defaultDescription;
  const theImage = image ? image : defaultImage;
  const {
    dataContextState
  } = Object(external_react_["useContext"])(dataStateContext["b" /* DataStateContext */]);
  const {
    0: loginUser,
    1: setLoginUser
  } = Object(external_react_["useState"])(false);
  Object(external_react_["useEffect"])(() => {
    var _router$query;

    if (dataContextState.user) {
      setLoginUser(true);
    }

    if ((_router$query = router.query) === null || _router$query === void 0 ? void 0 : _router$query.email) {
      modal('#reset-password').show();
    }
  }, []);
  return Page_jsx(external_react_default.a.Fragment, null, Page_jsx(head_default.a, null, Page_jsx("script", {
    async: true,
    src: "https://www.googletagmanager.com/gtag/js?id=G-JZZP01DVF0"
  }), Page_jsx("script", {
    dangerouslySetInnerHTML: {
      __html: `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-JZZP01DVF0');`
    }
  }), Page_jsx("script", {
    async: true,
    src: "https://www.googletagmanager.com/gtag/js?id=UA-182610890-1"
  }), Page_jsx("script", {
    dangerouslySetInnerHTML: {
      __html: `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-182610890-1');`
    }
  }), Page_jsx("meta", {
    charSet: "utf-8"
  }), Page_jsx("link", {
    rel: "icon",
    href: "/favicon/favicon.ico"
  }), Page_jsx("link", {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/favicon/apple-touch-icon.png"
  }), Page_jsx("link", {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicon/favicon-32x32.png"
  }), Page_jsx("link", {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicon/favicon-16x16.png"
  }), Page_jsx("link", {
    rel: "manifest",
    href: "/favicon/manifest.json"
  }), Page_jsx("link", {
    rel: "mask-icon",
    href: "/favicon/safari-pinned-tab.svg",
    color: "#5bbad5"
  }), Page_jsx("meta", {
    name: "msapplication-TileColor",
    content: "#ffffff"
  }), Page_jsx("meta", {
    name: "theme-color",
    content: "#232323"
  }), Page_jsx("meta", {
    name: "google-site-verification",
    content: "P5i8IZ7hI1tHTStpXE_BlzfEggYY31nJUUiNZX3CN-8"
  }), Page_jsx("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1"
  }), Page_jsx("title", null, theTitle), Page_jsx("link", {
    rel: "canonical",
    href: global.site_url + router.asPath
  }), Page_jsx("meta", {
    itemProp: "name",
    content: theTitle
  }), Page_jsx("meta", {
    itemProp: "description",
    content: theDescription
  }), Page_jsx("meta", {
    itemProp: "image",
    content: theImage
  }), Page_jsx("meta", {
    name: "description",
    content: theDescription
  }), Page_jsx("meta", {
    property: "og:title",
    content: theTitle
  }), Page_jsx("meta", {
    property: "og:type",
    content: contentType || 'website'
  }), Page_jsx("meta", {
    property: "og:url",
    content: global.site_url + router.asPath
  }), Page_jsx("meta", {
    property: "og:image",
    content: theImage
  }), Page_jsx("meta", {
    property: "og:description",
    content: theDescription
  }), Page_jsx("meta", {
    property: "og:site_name",
    content: "HUROM"
  }), Page_jsx("meta", {
    property: "fb:app_id",
    content: global.facebook_app_id
  }), published && Page_jsx("meta", {
    name: "article:published_time",
    content: published
  }), category && Page_jsx("meta", {
    name: "article:section",
    content: category
  }), updated && Page_jsx("meta", {
    name: "article:modified_time",
    content: updated
  }), noCrawl && Page_jsx("meta", {
    name: "robots",
    content: "noindex, nofollow"
  }), tags && Page_jsx("meta", {
    name: "article:tag",
    content: tags
  })), Page_jsx(layout_Header, {
    loginUser: loginUser
  }), Page_jsx("main", {
    id: id,
    className: className
  }, children), Page_jsx(Footer, null), Page_jsx(components_ForgotPassword, null), Page_jsx(components_ResetPassword, null), Page_jsx(components_Login, {
    setLoginUser: setLoginUser
  }));
};

/* harmony default export */ var layout_Page = __webpack_exports__["a"] = (Page);

/***/ }),

/***/ "Aog/":
/***/ (function(module, exports) {

module.exports = require("@sanity/client");

/***/ }),

/***/ "CXCL":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getServerSideProps", function() { return getServerSideProps; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _layout_Page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("8MC4");
/* harmony import */ var _components_SubMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("xVpj");
/* harmony import */ var _components_ArticleShort__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("T+ts");
/* harmony import */ var _data_localize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("17YL");
/* harmony import */ var _lib_sanity_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("3bEZ");

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





async function getServerSideProps({
  params,
  locale
}) {
  const {
    lang
  } = Object(_data_localize__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(locale);
  const archive = `*[_type == "archive" && '${params.category}' == ${lang}.slug.current] {
    _id,
    "titleHead": ${lang}.titleHead,
    "descriptionHead": ${lang}.descriptionHead
  } | order(sort asc)`;
  const query = `*[_type == "article" && $id == ${lang}.category._ref] {
    "title": ${lang}.title,
    "image": ${lang}.image,
    "slug": ${lang}.slug,
    "sort": ${lang}.sort
  } | order(sort asc)`;
  const data = await _lib_sanity_js__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].fetch(archive);

  if (!data.length) {
    window.location.href = '/not-found';
  }

  const articles = await _lib_sanity_js__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].fetch(query, {
    id: data[0]._id
  });
  return {
    props: {
      articles,
      archives: data[0],
      lang
    }
  };
}

const BlogShort = ({
  articles,
  archives,
  lang
}) => {
  return __jsx(_layout_Page__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
    id: "blog",
    description: archives.descriptionHead,
    title: archives.titleHead
  }, __jsx("section", {
    className: "head_category head_category_articles"
  }, __jsx("div", {
    className: "uk-container uk-container-expand"
  }, __jsx(_components_SubMenu__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    data: articles,
    articles: true
  }))), __jsx("section", {
    className: "category grey"
  }, __jsx("div", {
    className: "uk-container uk-container-expand"
  }, __jsx("div", {
    className: "uk-grid uk-child-width-1-1 uk-child-width-1-2@s",
    "uk-grid": "",
    "uk-scrollspy": "target: > div > a; cls: uk-animation-slide-top-small; delay: 500"
  }, (articles || []).map((item, index) => __jsx(_components_ArticleShort__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    key: index,
    lang: lang,
    data: item
  }))))));
};

/* harmony default export */ __webpack_exports__["default"] = (BlogShort);

/***/ }),

/***/ "MhC/":
/***/ (function(module, exports) {

module.exports = require("uikit");

/***/ }),

/***/ "Nh2W":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

exports.__esModule = true;
exports.markAssetError = markAssetError;
exports.isAssetError = isAssetError;
exports.getClientBuildManifest = getClientBuildManifest;
exports.default = void 0;

var _getAssetPathFromRoute = _interopRequireDefault(__webpack_require__("UhrY"));

var _requestIdleCallback = _interopRequireDefault(__webpack_require__("0G5g")); // 3.8s was arbitrarily chosen as it's what https://web.dev/interactive
// considers as "Good" time-to-interactive. We must assume something went
// wrong beyond this point, and then fall-back to a full page transition to
// show the user something of value.


const MS_MAX_IDLE_DELAY = 3800;

function withFuture(key, map, generator) {
  let entry = map.get(key);

  if (entry) {
    if ('future' in entry) {
      return entry.future;
    }

    return Promise.resolve(entry);
  }

  let resolver;
  const prom = new Promise(resolve => {
    resolver = resolve;
  });
  map.set(key, entry = {
    resolve: resolver,
    future: prom
  });
  return generator ? // eslint-disable-next-line no-sequences
  generator().then(value => (resolver(value), value)) : prom;
}

function hasPrefetch(link) {
  try {
    link = document.createElement('link');
    return (// detect IE11 since it supports prefetch but isn't detected
      // with relList.support
      !!window.MSInputMethodContext && !!document.documentMode || link.relList.supports('prefetch')
    );
  } catch (_unused) {
    return false;
  }
}

const canPrefetch = hasPrefetch();

function prefetchViaDom(href, as, link) {
  return new Promise((res, rej) => {
    if (document.querySelector(`link[rel="prefetch"][href^="${href}"]`)) {
      return res();
    }

    link = document.createElement('link'); // The order of property assignment here is intentional:

    if (as) link.as = as;
    link.rel = `prefetch`;
    link.crossOrigin = undefined;
    link.onload = res;
    link.onerror = rej; // `href` should always be last:

    link.href = href;
    document.head.appendChild(link);
  });
}

const ASSET_LOAD_ERROR = Symbol('ASSET_LOAD_ERROR'); // TODO: unexport

function markAssetError(err) {
  return Object.defineProperty(err, ASSET_LOAD_ERROR, {});
}

function isAssetError(err) {
  return err && ASSET_LOAD_ERROR in err;
}

function appendScript(src, script) {
  return new Promise((resolve, reject) => {
    script = document.createElement('script'); // The order of property assignment here is intentional.
    // 1. Setup success/failure hooks in case the browser synchronously
    //    executes when `src` is set.

    script.onload = resolve;

    script.onerror = () => reject(markAssetError(new Error(`Failed to load script: ${src}`))); // 2. Configure the cross-origin attribute before setting `src` in case the
    //    browser begins to fetch.


    script.crossOrigin = undefined; // 3. Finally, set the source and inject into the DOM in case the child
    //    must be appended for fetching to start.

    script.src = src;
    document.body.appendChild(script);
  });
}

function idleTimeout(ms, err) {
  return new Promise((_resolve, reject) => (0, _requestIdleCallback.default)(() => setTimeout(() => reject(err), ms)));
} // TODO: stop exporting or cache the failure
// It'd be best to stop exporting this. It's an implementation detail. We're
// only exporting it for backwards compatibilty with the `page-loader`.
// Only cache this response as a last resort if we cannot eliminate all other
// code branches that use the Build Manifest Callback and push them through
// the Route Loader interface.


function getClientBuildManifest() {
  if (self.__BUILD_MANIFEST) {
    return Promise.resolve(self.__BUILD_MANIFEST);
  }

  const onBuildManifest = new Promise(resolve => {
    // Mandatory because this is not concurrent safe:
    const cb = self.__BUILD_MANIFEST_CB;

    self.__BUILD_MANIFEST_CB = () => {
      resolve(self.__BUILD_MANIFEST);
      cb && cb();
    };
  });
  return Promise.race([onBuildManifest, idleTimeout(MS_MAX_IDLE_DELAY, markAssetError(new Error('Failed to load client build manifest')))]);
}

function getFilesForRoute(assetPrefix, route) {
  if (false) {}

  return getClientBuildManifest().then(manifest => {
    if (!(route in manifest)) {
      throw markAssetError(new Error(`Failed to lookup route: ${route}`));
    }

    const allFiles = manifest[route].map(entry => assetPrefix + '/_next/' + encodeURI(entry));
    return {
      scripts: allFiles.filter(v => v.endsWith('.js')),
      css: allFiles.filter(v => v.endsWith('.css'))
    };
  });
}

function createRouteLoader(assetPrefix) {
  const entrypoints = new Map();
  const loadedScripts = new Map();
  const styleSheets = new Map();
  const routes = new Map();

  function maybeExecuteScript(src) {
    let prom = loadedScripts.get(src);

    if (prom) {
      return prom;
    } // Skip executing script if it's already in the DOM:


    if (document.querySelector(`script[src^="${src}"]`)) {
      return Promise.resolve();
    }

    loadedScripts.set(src, prom = appendScript(src));
    return prom;
  }

  function fetchStyleSheet(href) {
    let prom = styleSheets.get(href);

    if (prom) {
      return prom;
    }

    styleSheets.set(href, prom = fetch(href).then(res => {
      if (!res.ok) {
        throw new Error(`Failed to load stylesheet: ${href}`);
      }

      return res.text().then(text => ({
        href: href,
        content: text
      }));
    }).catch(err => {
      throw markAssetError(err);
    }));
    return prom;
  }

  return {
    whenEntrypoint(route) {
      return withFuture(route, entrypoints);
    },

    onEntrypoint(route, execute) {
      Promise.resolve(execute).then(fn => fn()).then(exports => ({
        component: exports && exports.default || exports,
        exports: exports
      }), err => ({
        error: err
      })).then(input => {
        const old = entrypoints.get(route);
        entrypoints.set(route, input);
        if (old && 'resolve' in old) old.resolve(input);
      });
    },

    loadRoute(route) {
      return withFuture(route, routes, async () => {
        try {
          const {
            scripts,
            css
          } = await getFilesForRoute(assetPrefix, route);
          const [, styles] = await Promise.all([entrypoints.has(route) ? [] : Promise.all(scripts.map(maybeExecuteScript)), Promise.all(css.map(fetchStyleSheet))]);
          const entrypoint = await Promise.race([this.whenEntrypoint(route), idleTimeout(MS_MAX_IDLE_DELAY, markAssetError(new Error(`Route did not complete loading: ${route}`)))]);
          const res = Object.assign({
            styles
          }, entrypoint);
          return 'error' in entrypoint ? entrypoint : res;
        } catch (err) {
          return {
            error: err
          };
        }
      });
    },

    prefetch(route) {
      // https://github.com/GoogleChromeLabs/quicklink/blob/453a661fa1fa940e2d2e044452398e38c67a98fb/src/index.mjs#L115-L118
      // License: Apache 2.0
      let cn;

      if (cn = navigator.connection) {
        // Don't prefetch if using 2G or if Save-Data is enabled.
        if (cn.saveData || /2g/.test(cn.effectiveType)) return Promise.resolve();
      }

      return getFilesForRoute(assetPrefix, route).then(output => Promise.all(canPrefetch ? output.scripts.map(script => prefetchViaDom(script, 'script')) : [])).then(() => {
        (0, _requestIdleCallback.default)(() => this.loadRoute(route));
      }).catch( // swallow prefetch errors
      () => {});
    }

  };
}

var _default = createRouteLoader;
exports.default = _default;

/***/ }),

/***/ "Osoz":
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/router-context.js");

/***/ }),

/***/ "R/Ed":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const validateName = name => {
  var regex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
  return regex.test(name);
};

const validationEmail = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validationPhone = phone => {
  const re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
  return re.test(phone);
};

const validationAddress = address => {
  const re = /^[a-zA-Z0-9\s,'-]*$/g;
  return re.test(address);
};

const validationForm = (type, state, error, setError) => {
  if (type === 'email' && !validationEmail(state.email)) {
    setError(_objectSpread(_objectSpread({}, error), {}, {
      email: true
    }));
    return true;
  }

  if ((type === 'name' || type === 'surname') && !validateName(state[type])) {
    setError(_objectSpread(_objectSpread({}, error), {}, {
      [type]: true
    }));
    return true;
  }

  if (type === 'phone' && !validationPhone(state.phone)) {
    setError(_objectSpread(_objectSpread({}, error), {}, {
      phone: true
    }));
    return true;
  }

  if (type === 'city' && !validateName(state.city)) {
    setError(_objectSpread(_objectSpread({}, error), {}, {
      city: true
    }));
    return true;
  }

  if (type === 'address' && !validationAddress(state.address)) {
    setError(_objectSpread(_objectSpread({}, error), {}, {
      address: true
    }));
    return true;
  }

  return false;
};

/* harmony default export */ __webpack_exports__["a"] = (validationForm);

/***/ }),

/***/ "S3md":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ "T+ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _sanity_image_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("+BZ4");
/* harmony import */ var _sanity_image_url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_sanity_image_url__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_sanity_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("3bEZ");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("4Q3z");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("YFqc");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





const imageBuilder = _sanity_image_url__WEBPACK_IMPORTED_MODULE_1___default()(_lib_sanity_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]);

const urlFor = source => imageBuilder.image(source);

const Article = ({
  lang,
  data
}) => {
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_3__["useRouter"])();
  return __jsx("div", {
    className: "uk-width-1-1 uk-width-1-2@s"
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_4___default.a, {
    href: `/clanek/${router.query.category}/${data.slug.current}`
  }, __jsx("a", {
    className: "big_category"
  }, __jsx("div", {
    className: "category_wrap"
  }, __jsx("div", {
    className: "uk-inline uk-height-1-1 uk-width-1-1"
  }, __jsx("div", {
    className: "blanded-mix uk-width-1-1 uk-height-1-1 uk-background-cover",
    "data-src": urlFor(data.image).url(),
    "uk-img": ""
  }), __jsx("div", {
    className: "overlay uk-position-center uk-flex uk-flex-center uk-flex-middle"
  }, __jsx("h2", {
    className: "category_short_name"
  }, data.title)))))));
};

/* harmony default export */ __webpack_exports__["a"] = (Article);

/***/ }),

/***/ "TqRt":
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "UhrY":
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ "X24+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.removePathTrailingSlash = removePathTrailingSlash;
exports.normalizePathTrailingSlash = void 0;
/**
* Removes the trailing slash of a path if there is one. Preserves the root path `/`.
*/

function removePathTrailingSlash(path) {
  return path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
}
/**
* Normalizes the trailing slash of a path according to the `trailingSlash` option
* in `next.config.js`.
*/


const normalizePathTrailingSlash =  false ? undefined : removePathTrailingSlash;
exports.normalizePathTrailingSlash = normalizePathTrailingSlash;

/***/ }),

/***/ "YFqc":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("cTJO")


/***/ }),

/***/ "YTqd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getRouteRegex = getRouteRegex; // this isn't importing the escape-string-regex module
// to reduce bytes

function escapeRegex(str) {
  return str.replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&');
}

function parseParameter(param) {
  const optional = param.startsWith('[') && param.endsWith(']');

  if (optional) {
    param = param.slice(1, -1);
  }

  const repeat = param.startsWith('...');

  if (repeat) {
    param = param.slice(3);
  }

  return {
    key: param,
    repeat,
    optional
  };
}

function getRouteRegex(normalizedRoute) {
  const segments = (normalizedRoute.replace(/\/$/, '') || '/').slice(1).split('/');
  const groups = {};
  let groupIndex = 1;
  const parameterizedRoute = segments.map(segment => {
    if (segment.startsWith('[') && segment.endsWith(']')) {
      const {
        key,
        optional,
        repeat
      } = parseParameter(segment.slice(1, -1));
      groups[key] = {
        pos: groupIndex++,
        repeat,
        optional
      };
      return repeat ? optional ? '(?:/(.+?))?' : '/(.+?)' : '/([^/]+?)';
    } else {
      return `/${escapeRegex(segment)}`;
    }
  }).join(''); // dead code eliminate for browser since it's only needed
  // while generating routes-manifest

  if (true) {
    let routeKeyCharCode = 97;
    let routeKeyCharLength = 1; // builds a minimal routeKey using only a-z and minimal number of characters

    const getSafeRouteKey = () => {
      let routeKey = '';

      for (let i = 0; i < routeKeyCharLength; i++) {
        routeKey += String.fromCharCode(routeKeyCharCode);
        routeKeyCharCode++;

        if (routeKeyCharCode > 122) {
          routeKeyCharLength++;
          routeKeyCharCode = 97;
        }
      }

      return routeKey;
    };

    const routeKeys = {};
    let namedParameterizedRoute = segments.map(segment => {
      if (segment.startsWith('[') && segment.endsWith(']')) {
        const {
          key,
          optional,
          repeat
        } = parseParameter(segment.slice(1, -1)); // replace any non-word characters since they can break
        // the named regex

        let cleanedKey = key.replace(/\W/g, '');
        let invalidKey = false; // check if the key is still invalid and fallback to using a known
        // safe key

        if (cleanedKey.length === 0 || cleanedKey.length > 30) {
          invalidKey = true;
        }

        if (!isNaN(parseInt(cleanedKey.substr(0, 1)))) {
          invalidKey = true;
        }

        if (invalidKey) {
          cleanedKey = getSafeRouteKey();
        }

        routeKeys[cleanedKey] = key;
        return repeat ? optional ? `(?:/(?<${cleanedKey}>.+?))?` : `/(?<${cleanedKey}>.+?)` : `/(?<${cleanedKey}>[^/]+?)`;
      } else {
        return `/${escapeRegex(segment)}`;
      }
    }).join('');
    return {
      re: new RegExp(`^${parameterizedRoute}(?:/)?$`),
      groups,
      routeKeys,
      namedRegex: `^${namedParameterizedRoute}(?:/)?$`
    };
  }

  return {
    re: new RegExp(`^${parameterizedRoute}(?:/)?$`),
    groups
  };
}

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "cDf5":
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "cTJO":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("284h");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__("cDcd"));

var _router = __webpack_require__("elyg");

var _router2 = __webpack_require__("nOHt");

var _useIntersection = __webpack_require__("vNVm");

const prefetched = {};

function prefetch(router, href, as, options) {
  if (true) return;
  if (!(0, _router.isLocalURL)(href)) return; // Prefetch the JSON page if asked (only in the client)
  // We need to handle a prefetch error here since we may be
  // loading with priority which can reject but we don't
  // want to force navigation since this is only a prefetch

  router.prefetch(href, as, options).catch(err => {
    if (false) {}
  });
  const curLocale = options && typeof options.locale !== 'undefined' ? options.locale : router && router.locale; // Join on an invalid URI character

  prefetched[href + '%' + as + (curLocale ? '%' + curLocale : '')] = true;
}

function isModifiedEvent(event) {
  const {
    target
  } = event.currentTarget;
  return target && target !== '_self' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
  event.nativeEvent && event.nativeEvent.which === 2;
}

function linkClicked(e, router, href, as, replace, shallow, scroll, locale) {
  const {
    nodeName
  } = e.currentTarget;

  if (nodeName === 'A' && (isModifiedEvent(e) || !(0, _router.isLocalURL)(href))) {
    // ignore click for browser’s default behavior
    return;
  }

  e.preventDefault(); //  avoid scroll for urls with anchor refs

  if (scroll == null) {
    scroll = as.indexOf('#') < 0;
  } // replace state instead of push if prop is present


  router[replace ? 'replace' : 'push'](href, as, {
    shallow,
    locale
  }).then(success => {
    if (!success) return;

    if (scroll) {
      window.scrollTo(0, 0);
      document.body.focus();
    }
  });
}

function Link(props) {
  if (false) {}

  const p = props.prefetch !== false;
  const router = (0, _router2.useRouter)();
  const pathname = router && router.pathname || '/';

  const {
    href,
    as
  } = _react.default.useMemo(() => {
    const [resolvedHref, resolvedAs] = (0, _router.resolveHref)(pathname, props.href, true);
    return {
      href: resolvedHref,
      as: props.as ? (0, _router.resolveHref)(pathname, props.as) : resolvedAs || resolvedHref
    };
  }, [pathname, props.href, props.as]);

  let {
    children,
    replace,
    shallow,
    scroll,
    locale
  } = props; // Deprecated. Warning shown by propType check. If the children provided is a string (<Link>example</Link>) we wrap it in an <a> tag

  if (typeof children === 'string') {
    children = /*#__PURE__*/_react.default.createElement("a", null, children);
  } // This will return the first child, if multiple are provided it will throw an error


  const child = _react.Children.only(children);

  const childRef = child && typeof child === 'object' && child.ref;
  const [setIntersectionRef, isVisible] = (0, _useIntersection.useIntersection)({
    rootMargin: '200px'
  });

  const setRef = _react.default.useCallback(el => {
    setIntersectionRef(el);

    if (childRef) {
      if (typeof childRef === 'function') childRef(el);else if (typeof childRef === 'object') {
        childRef.current = el;
      }
    }
  }, [childRef, setIntersectionRef]);

  (0, _react.useEffect)(() => {
    const shouldPrefetch = isVisible && p && (0, _router.isLocalURL)(href);
    const curLocale = typeof locale !== 'undefined' ? locale : router && router.locale;
    const isPrefetched = prefetched[href + '%' + as + (curLocale ? '%' + curLocale : '')];

    if (shouldPrefetch && !isPrefetched) {
      prefetch(router, href, as, {
        locale: curLocale
      });
    }
  }, [as, href, isVisible, locale, p, router]);
  const childProps = {
    ref: setRef,
    onClick: e => {
      if (child.props && typeof child.props.onClick === 'function') {
        child.props.onClick(e);
      }

      if (!e.defaultPrevented) {
        linkClicked(e, router, href, as, replace, shallow, scroll, locale);
      }
    }
  };

  childProps.onMouseEnter = e => {
    if (!(0, _router.isLocalURL)(href)) return;

    if (child.props && typeof child.props.onMouseEnter === 'function') {
      child.props.onMouseEnter(e);
    }

    prefetch(router, href, as, {
      priority: true
    });
  }; // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
  // defined, we specify the current 'href', so that repetition is not needed by the user


  if (props.passHref || child.type === 'a' && !('href' in child.props)) {
    childProps.href = (0, _router.addBasePath)((0, _router.addLocale)(as, typeof locale !== 'undefined' ? locale : router && router.locale, router && router.defaultLocale));
  }

  return /*#__PURE__*/_react.default.cloneElement(child, childProps);
}

var _default = Link;
exports.default = _default;

/***/ }),

/***/ "dZ6Y":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = mitt;
/*
MIT License
Copyright (c) Jason Miller (https://jasonformat.com/)
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
// This file is based on https://github.com/developit/mitt/blob/v1.1.3/src/index.js
// It's been edited for the needs of this script
// See the LICENSE at the top of the file

function mitt() {
  const all = Object.create(null);
  return {
    on(type, handler) {
      ;
      (all[type] || (all[type] = [])).push(handler);
    },

    off(type, handler) {
      if (all[type]) {
        all[type].splice(all[type].indexOf(handler) >>> 0, 1);
      }
    },

    emit(type, ...evts) {
      // eslint-disable-next-line array-callback-return
      ;
      (all[type] || []).slice().map(handler => {
        handler(...evts);
      });
    }

  };
}

/***/ }),

/***/ "elyg":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.addLocale = addLocale;
exports.delLocale = delLocale;
exports.hasBasePath = hasBasePath;
exports.addBasePath = addBasePath;
exports.delBasePath = delBasePath;
exports.isLocalURL = isLocalURL;
exports.interpolateAs = interpolateAs;
exports.resolveHref = resolveHref;
exports.default = void 0;

var _normalizeTrailingSlash = __webpack_require__("X24+");

var _routeLoader = __webpack_require__("Nh2W");

var _denormalizePagePath = __webpack_require__("wkBG");

var _mitt = _interopRequireDefault(__webpack_require__("dZ6Y"));

var _utils = __webpack_require__("g/15");

var _escapePathDelimiters = _interopRequireDefault(__webpack_require__("fcRV"));

var _isDynamic = __webpack_require__("/jkW");

var _parseRelativeUrl = __webpack_require__("hS4m");

var _querystring = __webpack_require__("3WeD");

var _resolveRewrites = _interopRequireDefault(__webpack_require__("S3md"));

var _routeMatcher = __webpack_require__("gguc");

var _routeRegex = __webpack_require__("YTqd");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/* global __NEXT_DATA__ */
// tslint:disable:no-console


const basePath =  false || '';

function buildCancellationError() {
  return Object.assign(new Error('Route Cancelled'), {
    cancelled: true
  });
}

function addPathPrefix(path, prefix) {
  return prefix && path.startsWith('/') ? path === '/' ? (0, _normalizeTrailingSlash.normalizePathTrailingSlash)(prefix) : `${prefix}${path}` : path;
}

function addLocale(path, locale, defaultLocale) {
  if (true) {
    return locale && locale !== defaultLocale && !path.startsWith('/' + locale + '/') && path !== '/' + locale ? addPathPrefix(path, '/' + locale) : path;
  }

  return path;
}

function delLocale(path, locale) {
  if (true) {
    return locale && (path.startsWith('/' + locale + '/') || path === '/' + locale) ? path.substr(locale.length + 1) || '/' : path;
  }

  return path;
}

function hasBasePath(path) {
  return path === basePath || path.startsWith(basePath + '/');
}

function addBasePath(path) {
  // we only add the basepath on relative urls
  return addPathPrefix(path, basePath);
}

function delBasePath(path) {
  return path.slice(basePath.length) || '/';
}
/**
* Detects whether a given url is routable by the Next.js router (browser only).
*/


function isLocalURL(url) {
  if (url.startsWith('/')) return true;

  try {
    // absolute urls can be local if they are on the same origin
    const locationOrigin = (0, _utils.getLocationOrigin)();
    const resolved = new URL(url, locationOrigin);
    return resolved.origin === locationOrigin && hasBasePath(resolved.pathname);
  } catch (_) {
    return false;
  }
}

function interpolateAs(route, asPathname, query) {
  let interpolatedRoute = '';
  const dynamicRegex = (0, _routeRegex.getRouteRegex)(route);
  const dynamicGroups = dynamicRegex.groups;
  const dynamicMatches = // Try to match the dynamic route against the asPath
  (asPathname !== route ? (0, _routeMatcher.getRouteMatcher)(dynamicRegex)(asPathname) : '') || // Fall back to reading the values from the href
  // TODO: should this take priority; also need to change in the router.
  query;
  interpolatedRoute = route;
  const params = Object.keys(dynamicGroups);

  if (!params.every(param => {
    let value = dynamicMatches[param] || '';
    const {
      repeat,
      optional
    } = dynamicGroups[param]; // support single-level catch-all
    // TODO: more robust handling for user-error (passing `/`)

    let replaced = `[${repeat ? '...' : ''}${param}]`;

    if (optional) {
      replaced = `${!value ? '/' : ''}[${replaced}]`;
    }

    if (repeat && !Array.isArray(value)) value = [value];
    return (optional || param in dynamicMatches) && ( // Interpolate group into data URL if present
    interpolatedRoute = interpolatedRoute.replace(replaced, repeat ? value.map(_escapePathDelimiters.default).join('/') : (0, _escapePathDelimiters.default)(value)) || '/');
  })) {
    interpolatedRoute = ''; // did not satisfy all requirements
    // n.b. We ignore this error because we handle warning for this case in
    // development in the `<Link>` component directly.
  }

  return {
    params,
    result: interpolatedRoute
  };
}

function omitParmsFromQuery(query, params) {
  const filteredQuery = {};
  Object.keys(query).forEach(key => {
    if (!params.includes(key)) {
      filteredQuery[key] = query[key];
    }
  });
  return filteredQuery;
}
/**
* Resolves a given hyperlink with a certain router state (basePath not included).
* Preserves absolute urls.
*/


function resolveHref(currentPath, href, resolveAs) {
  // we use a dummy base url for relative urls
  const base = new URL(currentPath, 'http://n');
  const urlAsString = typeof href === 'string' ? href : (0, _utils.formatWithValidation)(href); // Return because it cannot be routed by the Next.js router

  if (!isLocalURL(urlAsString)) {
    return resolveAs ? [urlAsString] : urlAsString;
  }

  try {
    const finalUrl = new URL(urlAsString, base);
    finalUrl.pathname = (0, _normalizeTrailingSlash.normalizePathTrailingSlash)(finalUrl.pathname);
    let interpolatedAs = '';

    if ((0, _isDynamic.isDynamicRoute)(finalUrl.pathname) && finalUrl.searchParams && resolveAs) {
      const query = (0, _querystring.searchParamsToUrlQuery)(finalUrl.searchParams);
      const {
        result,
        params
      } = interpolateAs(finalUrl.pathname, finalUrl.pathname, query);

      if (result) {
        interpolatedAs = (0, _utils.formatWithValidation)({
          pathname: result,
          hash: finalUrl.hash,
          query: omitParmsFromQuery(query, params)
        });
      }
    } // if the origin didn't change, it means we received a relative href


    const resolvedHref = finalUrl.origin === base.origin ? finalUrl.href.slice(finalUrl.origin.length) : finalUrl.href;
    return resolveAs ? [resolvedHref, interpolatedAs || resolvedHref] : resolvedHref;
  } catch (_) {
    return resolveAs ? [urlAsString] : urlAsString;
  }
}

function prepareUrlAs(router, url, as) {
  // If url and as provided as an object representation,
  // we'll format them into the string version here.
  return {
    url: addBasePath(resolveHref(router.pathname, url)),
    as: as ? addBasePath(resolveHref(router.pathname, as)) : as
  };
}

const manualScrollRestoration =  false && false;
const SSG_DATA_NOT_FOUND_ERROR = 'SSG Data NOT_FOUND';

function fetchRetry(url, attempts) {
  return fetch(url, {
    // Cookies are required to be present for Next.js' SSG "Preview Mode".
    // Cookies may also be required for `getServerSideProps`.
    //
    // > `fetch` won’t send cookies, unless you set the credentials init
    // > option.
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    //
    // > For maximum browser compatibility when it comes to sending &
    // > receiving cookies, always supply the `credentials: 'same-origin'`
    // > option instead of relying on the default.
    // https://github.com/github/fetch#caveats
    credentials: 'same-origin'
  }).then(res => {
    if (!res.ok) {
      if (attempts > 1 && res.status >= 500) {
        return fetchRetry(url, attempts - 1);
      }

      if (res.status === 404) {
        // TODO: handle reloading in development from fallback returning 200
        // to on-demand-entry-handler causing it to reload periodically
        throw new Error(SSG_DATA_NOT_FOUND_ERROR);
      }

      throw new Error(`Failed to load static props`);
    }

    return res.json();
  });
}

function fetchNextData(dataHref, isServerRender) {
  return fetchRetry(dataHref, isServerRender ? 3 : 1).catch(err => {
    // We should only trigger a server-side transition if this was caused
    // on a client-side transition. Otherwise, we'd get into an infinite
    // loop.
    if (!isServerRender) {
      (0, _routeLoader.markAssetError)(err);
    }

    throw err;
  });
}

class Router {
  /**
  * Map of all components loaded in `Router`
  */
  // Static Data Cache
  constructor(_pathname, _query, _as, {
    initialProps,
    pageLoader,
    App,
    wrapApp,
    Component,
    err,
    subscription,
    isFallback,
    locale,
    locales,
    defaultLocale
  }) {
    this.route = void 0;
    this.pathname = void 0;
    this.query = void 0;
    this.asPath = void 0;
    this.basePath = void 0;
    this.components = void 0;
    this.sdc = {};
    this.sub = void 0;
    this.clc = void 0;
    this.pageLoader = void 0;
    this._bps = void 0;
    this.events = void 0;
    this._wrapApp = void 0;
    this.isSsr = void 0;
    this.isFallback = void 0;
    this._inFlightRoute = void 0;
    this._shallow = void 0;
    this.locale = void 0;
    this.locales = void 0;
    this.defaultLocale = void 0;

    this.onPopState = e => {
      const state = e.state;

      if (!state) {
        // We get state as undefined for two reasons.
        //  1. With older safari (< 8) and older chrome (< 34)
        //  2. When the URL changed with #
        //
        // In the both cases, we don't need to proceed and change the route.
        // (as it's already changed)
        // But we can simply replace the state with the new changes.
        // Actually, for (1) we don't need to nothing. But it's hard to detect that event.
        // So, doing the following for (1) does no harm.
        const {
          pathname,
          query
        } = this;
        this.changeState('replaceState', (0, _utils.formatWithValidation)({
          pathname: addBasePath(pathname),
          query
        }), (0, _utils.getURL)());
        return;
      }

      if (!state.__N) {
        return;
      }

      const {
        url,
        as,
        options
      } = state;
      const {
        pathname
      } = (0, _parseRelativeUrl.parseRelativeUrl)(url); // Make sure we don't re-render on initial load,
      // can be caused by navigating back from an external site

      if (this.isSsr && as === this.asPath && pathname === this.pathname) {
        return;
      } // If the downstream application returns falsy, return.
      // They will then be responsible for handling the event.


      if (this._bps && !this._bps(state)) {
        return;
      }

      this.change('replaceState', url, as, Object.assign({}, options, {
        shallow: options.shallow && this._shallow,
        locale: options.locale || this.defaultLocale
      }));
    }; // represents the current component key


    this.route = (0, _normalizeTrailingSlash.removePathTrailingSlash)(_pathname); // set up the component cache (by route keys)

    this.components = {}; // We should not keep the cache, if there's an error
    // Otherwise, this cause issues when when going back and
    // come again to the errored page.

    if (_pathname !== '/_error') {
      this.components[this.route] = {
        Component,
        initial: true,
        props: initialProps,
        err,
        __N_SSG: initialProps && initialProps.__N_SSG,
        __N_SSP: initialProps && initialProps.__N_SSP
      };
    }

    this.components['/_app'] = {
      Component: App,
      styleSheets: [
        /* /_app does not need its stylesheets managed */
      ]
    }; // Backwards compat for Router.router.events
    // TODO: Should be remove the following major version as it was never documented

    this.events = Router.events;
    this.pageLoader = pageLoader;
    this.pathname = _pathname;
    this.query = _query; // if auto prerendered and dynamic route wait to update asPath
    // until after mount to prevent hydration mismatch

    this.asPath = // @ts-ignore this is temporarily global (attached to window)
    (0, _isDynamic.isDynamicRoute)(_pathname) && __NEXT_DATA__.autoExport ? _pathname : _as;
    this.basePath = basePath;
    this.sub = subscription;
    this.clc = null;
    this._wrapApp = wrapApp; // make sure to ignore extra popState in safari on navigating
    // back from external site

    this.isSsr = true;
    this.isFallback = isFallback;

    if (true) {
      this.locale = locale;
      this.locales = locales;
      this.defaultLocale = defaultLocale;
    }

    if (false) {}
  }

  reload() {
    window.location.reload();
  }
  /**
  * Go back in history
  */


  back() {
    window.history.back();
  }
  /**
  * Performs a `pushState` with arguments
  * @param url of the route
  * @param as masks `url` for the browser
  * @param options object you can define `shallow` and other options
  */


  push(url, as = url, options = {}) {
    ;
    ({
      url,
      as
    } = prepareUrlAs(this, url, as));
    return this.change('pushState', url, as, options);
  }
  /**
  * Performs a `replaceState` with arguments
  * @param url of the route
  * @param as masks `url` for the browser
  * @param options object you can define `shallow` and other options
  */


  replace(url, as = url, options = {}) {
    ;
    ({
      url,
      as
    } = prepareUrlAs(this, url, as));
    return this.change('replaceState', url, as, options);
  }

  async change(method, url, as, options) {
    if (!isLocalURL(url)) {
      window.location.href = url;
      return false;
    }

    let localeChange = options.locale !== this.locale;

    if (true) {
      var _this$locales;

      this.locale = options.locale === false ? this.defaultLocale : options.locale || this.locale;

      if (typeof options.locale === 'undefined') {
        options.locale = this.locale;
      }

      const {
        normalizeLocalePath
      } = __webpack_require__("3wub");

      const parsedAs = (0, _parseRelativeUrl.parseRelativeUrl)(hasBasePath(as) ? delBasePath(as) : as);
      const localePathResult = normalizeLocalePath(parsedAs.pathname, this.locales);

      if (localePathResult.detectedLocale) {
        this.locale = localePathResult.detectedLocale;
        url = addBasePath(localePathResult.pathname);
      } // if the locale isn't configured hard navigate to show 404 page


      if (!((_this$locales = this.locales) == null ? void 0 : _this$locales.includes(this.locale))) {
        parsedAs.pathname = addLocale(parsedAs.pathname, this.locale);
        window.location.href = (0, _utils.formatWithValidation)(parsedAs);
        return new Promise(() => {});
      }
    }

    if (!options._h) {
      this.isSsr = false;
    } // marking route changes as a navigation start entry


    if (_utils.ST) {
      performance.mark('routeChange');
    }

    if (this._inFlightRoute) {
      this.abortComponentLoad(this._inFlightRoute);
    }

    as = addBasePath(addLocale(hasBasePath(as) ? delBasePath(as) : as, options.locale, this.defaultLocale));
    const cleanedAs = delLocale(hasBasePath(as) ? delBasePath(as) : as, this.locale);
    this._inFlightRoute = as; // If the url change is only related to a hash change
    // We should not proceed. We should only change the state.
    // WARNING: `_h` is an internal option for handing Next.js client-side
    // hydration. Your app should _never_ use this property. It may change at
    // any time without notice.

    if (!options._h && this.onlyAHashChange(cleanedAs)) {
      this.asPath = cleanedAs;
      Router.events.emit('hashChangeStart', as); // TODO: do we need the resolved href when only a hash change?

      this.changeState(method, url, as, options);
      this.scrollToHash(cleanedAs);
      this.notify(this.components[this.route]);
      Router.events.emit('hashChangeComplete', as);
      return true;
    }

    let parsed = (0, _parseRelativeUrl.parseRelativeUrl)(url);
    let {
      pathname,
      query
    } = parsed; // The build manifest needs to be loaded before auto-static dynamic pages
    // get their query parameters to allow ensuring they can be parsed properly
    // when rewritten to

    let pages, rewrites;

    try {
      pages = await this.pageLoader.getPageList();
      ({
        __rewrites: rewrites
      } = await (0, _routeLoader.getClientBuildManifest)());
    } catch (err) {
      // If we fail to resolve the page list or client-build manifest, we must
      // do a server-side transition:
      window.location.href = as;
      return false;
    }

    parsed = this._resolveHref(parsed, pages);

    if (parsed.pathname !== pathname) {
      pathname = parsed.pathname;
      url = (0, _utils.formatWithValidation)(parsed);
    } // url and as should always be prefixed with basePath by this
    // point by either next/link or router.push/replace so strip the
    // basePath from the pathname to match the pages dir 1-to-1


    pathname = pathname ? (0, _normalizeTrailingSlash.removePathTrailingSlash)(delBasePath(pathname)) : pathname; // If asked to change the current URL we should reload the current page
    // (not location.reload() but reload getInitialProps and other Next.js stuffs)
    // We also need to set the method = replaceState always
    // as this should not go into the history (That's how browsers work)
    // We should compare the new asPath to the current asPath, not the url

    if (!this.urlIsNew(cleanedAs) && !localeChange) {
      method = 'replaceState';
    }

    let route = (0, _normalizeTrailingSlash.removePathTrailingSlash)(pathname);
    const {
      shallow = false
    } = options; // we need to resolve the as value using rewrites for dynamic SSG
    // pages to allow building the data URL correctly

    let resolvedAs = as;

    if (false) {}

    resolvedAs = delLocale(delBasePath(resolvedAs), this.locale);

    if ((0, _isDynamic.isDynamicRoute)(route)) {
      const parsedAs = (0, _parseRelativeUrl.parseRelativeUrl)(resolvedAs);
      const asPathname = parsedAs.pathname;
      const routeRegex = (0, _routeRegex.getRouteRegex)(route);
      const routeMatch = (0, _routeMatcher.getRouteMatcher)(routeRegex)(asPathname);
      const shouldInterpolate = route === asPathname;
      const interpolatedAs = shouldInterpolate ? interpolateAs(route, asPathname, query) : {};

      if (!routeMatch || shouldInterpolate && !interpolatedAs.result) {
        const missingParams = Object.keys(routeRegex.groups).filter(param => !query[param]);

        if (missingParams.length > 0) {
          if (false) {}

          throw new Error((shouldInterpolate ? `The provided \`href\` (${url}) value is missing query values (${missingParams.join(', ')}) to be interpolated properly. ` : `The provided \`as\` value (${asPathname}) is incompatible with the \`href\` value (${route}). `) + `Read more: https://err.sh/vercel/next.js/${shouldInterpolate ? 'href-interpolation-failed' : 'incompatible-href-as'}`);
        }
      } else if (shouldInterpolate) {
        as = (0, _utils.formatWithValidation)(Object.assign({}, parsedAs, {
          pathname: interpolatedAs.result,
          query: omitParmsFromQuery(query, interpolatedAs.params)
        }));
      } else {
        // Merge params into `query`, overwriting any specified in search
        Object.assign(query, routeMatch);
      }
    }

    Router.events.emit('routeChangeStart', as);

    try {
      const routeInfo = await this.getRouteInfo(route, pathname, query, as, shallow);
      let {
        error,
        props,
        __N_SSG,
        __N_SSP
      } = routeInfo; // handle redirect on client-transition

      if ((__N_SSG || __N_SSP) && props && props.pageProps && props.pageProps.__N_REDIRECT) {
        const destination = props.pageProps.__N_REDIRECT; // check if destination is internal (resolves to a page) and attempt
        // client-navigation if it is falling back to hard navigation if
        // it's not

        if (destination.startsWith('/')) {
          const parsedHref = (0, _parseRelativeUrl.parseRelativeUrl)(destination);

          this._resolveHref(parsedHref, pages, false);

          if (pages.includes(parsedHref.pathname)) {
            const {
              url: newUrl,
              as: newAs
            } = prepareUrlAs(this, destination, destination);
            return this.change(method, newUrl, newAs, options);
          }
        }

        window.location.href = destination;
        return new Promise(() => {});
      }

      Router.events.emit('beforeHistoryChange', as);
      this.changeState(method, url, as, options);

      if (false) {}

      await this.set(route, pathname, query, cleanedAs, routeInfo).catch(e => {
        if (e.cancelled) error = error || e;else throw e;
      });

      if (error) {
        Router.events.emit('routeChangeError', error, cleanedAs);
        throw error;
      }

      if (false) {}

      if (true) {
        if (this.locale) {
          document.documentElement.lang = this.locale;
        }
      }

      Router.events.emit('routeChangeComplete', as);
      return true;
    } catch (err) {
      if (err.cancelled) {
        return false;
      }

      throw err;
    }
  }

  changeState(method, url, as, options = {}) {
    if (false) {}

    if (method !== 'pushState' || (0, _utils.getURL)() !== as) {
      this._shallow = options.shallow;
      window.history[method]({
        url,
        as,
        options,
        __N: true
      }, // Most browsers currently ignores this parameter, although they may use it in the future.
      // Passing the empty string here should be safe against future changes to the method.
      // https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
      '', as);
    }
  }

  async handleRouteInfoError(err, pathname, query, as, loadErrorFail) {
    if (err.cancelled) {
      // bubble up cancellation errors
      throw err;
    }

    if ((0, _routeLoader.isAssetError)(err) || loadErrorFail) {
      Router.events.emit('routeChangeError', err, as); // If we can't load the page it could be one of following reasons
      //  1. Page doesn't exists
      //  2. Page does exist in a different zone
      //  3. Internal error while loading the page
      // So, doing a hard reload is the proper way to deal with this.

      window.location.href = as; // Changing the URL doesn't block executing the current code path.
      // So let's throw a cancellation error stop the routing logic.

      throw buildCancellationError();
    }

    try {
      let Component;
      let styleSheets;
      let props;
      const ssg404 = err.message === SSG_DATA_NOT_FOUND_ERROR;

      if (ssg404) {
        try {
          let mod;
          ({
            page: Component,
            styleSheets,
            mod
          } = await this.fetchComponent('/404')); // TODO: should we tolerate these props missing and still render the
          // page instead of falling back to _error?

          if (mod && mod.__N_SSG) {
            props = await this._getStaticData(this.pageLoader.getDataHref('/404', '/404', true, this.locale));
          }
        } catch (_err) {// non-fatal fallback to _error
        }
      }

      if (typeof Component === 'undefined' || typeof styleSheets === 'undefined') {
        ;
        ({
          page: Component,
          styleSheets
        } = await this.fetchComponent('/_error'));
      }

      const routeInfo = {
        props,
        Component,
        styleSheets,
        err: ssg404 ? undefined : err,
        error: ssg404 ? undefined : err
      };

      if (!routeInfo.props) {
        try {
          routeInfo.props = await this.getInitialProps(Component, {
            err,
            pathname,
            query
          });
        } catch (gipErr) {
          console.error('Error in error page `getInitialProps`: ', gipErr);
          routeInfo.props = {};
        }
      }

      return routeInfo;
    } catch (routeInfoErr) {
      return this.handleRouteInfoError(routeInfoErr, pathname, query, as, true);
    }
  }

  async getRouteInfo(route, pathname, query, as, shallow = false) {
    try {
      const existingRouteInfo = this.components[route];

      if (shallow && existingRouteInfo && this.route === route) {
        return existingRouteInfo;
      }

      const cachedRouteInfo = existingRouteInfo && 'initial' in existingRouteInfo ? undefined : existingRouteInfo;
      const routeInfo = cachedRouteInfo ? cachedRouteInfo : await this.fetchComponent(route).then(res => ({
        Component: res.page,
        styleSheets: res.styleSheets,
        __N_SSG: res.mod.__N_SSG,
        __N_SSP: res.mod.__N_SSP
      }));
      const {
        Component,
        __N_SSG,
        __N_SSP
      } = routeInfo;

      if (false) {}

      let dataHref;

      if (__N_SSG || __N_SSP) {
        dataHref = this.pageLoader.getDataHref((0, _utils.formatWithValidation)({
          pathname,
          query
        }), delBasePath(as), __N_SSG, this.locale);
      }

      const props = await this._getData(() => __N_SSG ? this._getStaticData(dataHref) : __N_SSP ? this._getServerData(dataHref) : this.getInitialProps(Component, // we provide AppTree later so this needs to be `any`
      {
        pathname,
        query,
        asPath: as
      }));
      routeInfo.props = props;
      this.components[route] = routeInfo;
      return routeInfo;
    } catch (err) {
      return this.handleRouteInfoError(err, pathname, query, as);
    }
  }

  set(route, pathname, query, as, data) {
    this.isFallback = false;
    this.route = route;
    this.pathname = pathname;
    this.query = query;
    this.asPath = as;
    return this.notify(data);
  }
  /**
  * Callback to execute before replacing router state
  * @param cb callback to be executed
  */


  beforePopState(cb) {
    this._bps = cb;
  }

  onlyAHashChange(as) {
    if (!this.asPath) return false;
    const [oldUrlNoHash, oldHash] = this.asPath.split('#');
    const [newUrlNoHash, newHash] = as.split('#'); // Makes sure we scroll to the provided hash if the url/hash are the same

    if (newHash && oldUrlNoHash === newUrlNoHash && oldHash === newHash) {
      return true;
    } // If the urls are change, there's more than a hash change


    if (oldUrlNoHash !== newUrlNoHash) {
      return false;
    } // If the hash has changed, then it's a hash only change.
    // This check is necessary to handle both the enter and
    // leave hash === '' cases. The identity case falls through
    // and is treated as a next reload.


    return oldHash !== newHash;
  }

  scrollToHash(as) {
    const [, hash] = as.split('#'); // Scroll to top if the hash is just `#` with no value

    if (hash === '') {
      window.scrollTo(0, 0);
      return;
    } // First we check if the element by id is found


    const idEl = document.getElementById(hash);

    if (idEl) {
      idEl.scrollIntoView();
      return;
    } // If there's no element with the id, we check the `name` property
    // To mirror browsers


    const nameEl = document.getElementsByName(hash)[0];

    if (nameEl) {
      nameEl.scrollIntoView();
    }
  }

  urlIsNew(asPath) {
    return this.asPath !== asPath;
  }

  _resolveHref(parsedHref, pages, applyBasePath = true) {
    const {
      pathname
    } = parsedHref;
    const cleanPathname = (0, _normalizeTrailingSlash.removePathTrailingSlash)((0, _denormalizePagePath.denormalizePagePath)(applyBasePath ? delBasePath(pathname) : pathname));

    if (cleanPathname === '/404' || cleanPathname === '/_error') {
      return parsedHref;
    } // handle resolving href for dynamic routes


    if (!pages.includes(cleanPathname)) {
      // eslint-disable-next-line array-callback-return
      pages.some(page => {
        if ((0, _isDynamic.isDynamicRoute)(page) && (0, _routeRegex.getRouteRegex)(page).re.test(cleanPathname)) {
          parsedHref.pathname = applyBasePath ? addBasePath(page) : page;
          return true;
        }
      });
    }

    return parsedHref;
  }
  /**
  * Prefetch page code, you may wait for the data during page rendering.
  * This feature only works in production!
  * @param url the href of prefetched page
  * @param asPath the as path of the prefetched page
  */


  async prefetch(url, asPath = url, options = {}) {
    let parsed = (0, _parseRelativeUrl.parseRelativeUrl)(url);
    let {
      pathname
    } = parsed;

    if (true) {
      const normalizeLocalePath = __webpack_require__("3wub").normalizeLocalePath;

      if (options.locale === false) {
        pathname = normalizeLocalePath(pathname, this.locales).pathname;
        parsed.pathname = pathname;
        url = (0, _utils.formatWithValidation)(parsed);
        let parsedAs = (0, _parseRelativeUrl.parseRelativeUrl)(asPath);
        const localePathResult = normalizeLocalePath(parsedAs.pathname, this.locales);
        parsedAs.pathname = localePathResult.pathname;
        options.locale = localePathResult.detectedLocale || this.defaultLocale;
        asPath = (0, _utils.formatWithValidation)(parsedAs);
      }
    }

    const pages = await this.pageLoader.getPageList();
    parsed = this._resolveHref(parsed, pages, false);

    if (parsed.pathname !== pathname) {
      pathname = parsed.pathname;
      url = (0, _utils.formatWithValidation)(parsed);
    } // Prefetch is not supported in development mode because it would trigger on-demand-entries


    if (false) {}

    const route = (0, _normalizeTrailingSlash.removePathTrailingSlash)(pathname);
    await Promise.all([this.pageLoader._isSsg(url).then(isSsg => {
      return isSsg ? this._getStaticData(this.pageLoader.getDataHref(url, asPath, true, typeof options.locale !== 'undefined' ? options.locale : this.locale)) : false;
    }), this.pageLoader[options.priority ? 'loadPage' : 'prefetch'](route)]);
  }

  async fetchComponent(route) {
    let cancelled = false;

    const cancel = this.clc = () => {
      cancelled = true;
    };

    const componentResult = await this.pageLoader.loadPage(route);

    if (cancelled) {
      const error = new Error(`Abort fetching component for route: "${route}"`);
      error.cancelled = true;
      throw error;
    }

    if (cancel === this.clc) {
      this.clc = null;
    }

    return componentResult;
  }

  _getData(fn) {
    let cancelled = false;

    const cancel = () => {
      cancelled = true;
    };

    this.clc = cancel;
    return fn().then(data => {
      if (cancel === this.clc) {
        this.clc = null;
      }

      if (cancelled) {
        const err = new Error('Loading initial props cancelled');
        err.cancelled = true;
        throw err;
      }

      return data;
    });
  }

  _getStaticData(dataHref) {
    const {
      href: cacheKey
    } = new URL(dataHref, window.location.href);

    if ( true && this.sdc[cacheKey]) {
      return Promise.resolve(this.sdc[cacheKey]);
    }

    return fetchNextData(dataHref, this.isSsr).then(data => {
      this.sdc[cacheKey] = data;
      return data;
    });
  }

  _getServerData(dataHref) {
    return fetchNextData(dataHref, this.isSsr);
  }

  getInitialProps(Component, ctx) {
    const {
      Component: App
    } = this.components['/_app'];

    const AppTree = this._wrapApp(App);

    ctx.AppTree = AppTree;
    return (0, _utils.loadGetInitialProps)(App, {
      AppTree,
      Component,
      router: this,
      ctx
    });
  }

  abortComponentLoad(as) {
    if (this.clc) {
      Router.events.emit('routeChangeError', buildCancellationError(), as);
      this.clc();
      this.clc = null;
    }
  }

  notify(data) {
    return this.sub(data, this.components['/_app'].Component);
  }

}

exports.default = Router;
Router.events = (0, _mitt.default)();

/***/ }),

/***/ "f0af":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AxiosAPI; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("zr5I");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

const AxiosAPI = axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({
  baseURL: "https://api.pellwood.com",
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

/***/ }),

/***/ "fcRV":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = escapePathDelimiters; // escape delimiters used by path-to-regexp

function escapePathDelimiters(segment) {
  return segment.replace(/[/#?]/g, char => encodeURIComponent(char));
}

/***/ }),

/***/ "g/15":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.execOnce = execOnce;
exports.getLocationOrigin = getLocationOrigin;
exports.getURL = getURL;
exports.getDisplayName = getDisplayName;
exports.isResSent = isResSent;
exports.loadGetInitialProps = loadGetInitialProps;
exports.formatWithValidation = formatWithValidation;
exports.ST = exports.SP = exports.urlObjectKeys = void 0;

var _formatUrl = __webpack_require__("6D7l");
/**
* Utils
*/


function execOnce(fn) {
  let used = false;
  let result;
  return (...args) => {
    if (!used) {
      used = true;
      result = fn(...args);
    }

    return result;
  };
}

function getLocationOrigin() {
  const {
    protocol,
    hostname,
    port
  } = window.location;
  return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}

function getURL() {
  const {
    href
  } = window.location;
  const origin = getLocationOrigin();
  return href.substring(origin.length);
}

function getDisplayName(Component) {
  return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}

function isResSent(res) {
  return res.finished || res.headersSent;
}

async function loadGetInitialProps(App, ctx) {
  if (false) { var _App$prototype; } // when called from _app `ctx` is nested in `ctx`


  const res = ctx.res || ctx.ctx && ctx.ctx.res;

  if (!App.getInitialProps) {
    if (ctx.ctx && ctx.Component) {
      // @ts-ignore pageProps default
      return {
        pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
      };
    }

    return {};
  }

  const props = await App.getInitialProps(ctx);

  if (res && isResSent(res)) {
    return props;
  }

  if (!props) {
    const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
    throw new Error(message);
  }

  if (false) {}

  return props;
}

const urlObjectKeys = ['auth', 'hash', 'host', 'hostname', 'href', 'path', 'pathname', 'port', 'protocol', 'query', 'search', 'slashes'];
exports.urlObjectKeys = urlObjectKeys;

function formatWithValidation(url) {
  if (false) {}

  return (0, _formatUrl.formatUrl)(url);
}

const SP = typeof performance !== 'undefined';
exports.SP = SP;
const ST = SP && typeof performance.mark === 'function' && typeof performance.measure === 'function';
exports.ST = ST;

/***/ }),

/***/ "gEUu":
/***/ (function(module, exports) {

module.exports = require("@sanity/block-content-to-react");

/***/ }),

/***/ "gguc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getRouteMatcher = getRouteMatcher;

function getRouteMatcher(routeRegex) {
  const {
    re,
    groups
  } = routeRegex;
  return pathname => {
    const routeMatch = re.exec(pathname);

    if (!routeMatch) {
      return false;
    }

    const decode = param => {
      try {
        return decodeURIComponent(param);
      } catch (_) {
        const err = new Error('failed to decode param');
        err.code = 'DECODE_FAILED';
        throw err;
      }
    };

    const params = {};
    Object.keys(groups).forEach(slugName => {
      const g = groups[slugName];
      const m = routeMatch[g.pos];

      if (m !== undefined) {
        params[slugName] = ~m.indexOf('/') ? m.split('/').map(entry => decode(entry)) : g.repeat ? [decode(m)] : decode(m);
      }
    });
    return params;
  };
}

/***/ }),

/***/ "hS4m":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.parseRelativeUrl = parseRelativeUrl;

var _utils = __webpack_require__("g/15");

var _querystring = __webpack_require__("3WeD");
/**
* Parses path-relative urls (e.g. `/hello/world?foo=bar`). If url isn't path-relative
* (e.g. `./hello`) then at least base must be.
* Absolute urls are rejected with one exception, in the browser, absolute urls that are on
* the current origin will be parsed as relative
*/


function parseRelativeUrl(url, base) {
  const globalBase = new URL(true ? 'http://n' : undefined);
  const resolvedBase = base ? new URL(base, globalBase) : globalBase;
  const {
    pathname,
    searchParams,
    search,
    hash,
    href,
    origin
  } = new URL(url, resolvedBase);

  if (origin !== globalBase.origin) {
    throw new Error('invariant: invalid relative URL');
  }

  return {
    pathname,
    query: (0, _querystring.searchParamsToUrlQuery)(searchParams),
    search,
    hash,
    href: href.slice(globalBase.origin.length)
  };
}

/***/ }),

/***/ "jTVC":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  products: {
    cz: "Produkty",
    en: "Products",
    de: "xxx"
  },
  search: {
    cz: "Hledat",
    en: "Search",
    de: "xxx"
  },
  noresult: {
    cz: "Nic jsme nenašli, zkuste jiné slovo.",
    en: "We didn't find anything, try another word.",
    de: "xxx"
  },
  user: {
    cz: "Uživatel",
    en: "User",
    de: "xxx"
  },
  login: {
    cz: "Přihlásit se",
    en: "Login",
    de: "xxx"
  },
  login2: {
    cz: "Přihlásit",
    en: "Login",
    de: "xxx"
  },
  formemail: {
    cz: "e-mail",
    en: "email",
    de: "xxx"
  },
  formpassword: {
    cz: "heslo",
    en: "password",
    de: "xxx"
  },
  forgottenpassword: {
    cz: "Zapomenuté heslo",
    en: "Reset your password",
    de: "xxx"
  },
  notyetaccount: {
    cz: "Nemáte ještě účet?",
    en: "Create account",
    de: "xxx"
  },
  registration: {
    cz: "Registrace",
    en: "Registration",
    de: "xxx"
  },
  intobasket: {
    cz: "Do košíku",
    en: "Into the basket",
    de: "xxx"
  },
  checkout: {
    cz: "K objednávce",
    en: "Checkout",
    de: "xxx"
  },
  basket: {
    cz: "Košík",
    en: "Basket",
    de: "xxx"
  },
  emptybasket: {
    cz: "Váš košík je prázdný.",
    en: "Basket is empty",
    de: "xxx"
  },
  delivery: {
    cz: "Doprava",
    en: "Delivery",
    de: "xxx"
  },
  totalprice: {
    cz: "Celková cena",
    en: "Total price",
    de: "xxx"
  },
  ordersummary: {
    cz: "Souhrn objednávky",
    en: "Order summary",
    de: "xxx"
  },
  payment: {
    cz: "Platba",
    en: "Payment",
    de: "xxx"
  },
  contact: {
    cz: "Kontaktní údaje",
    en: "Contact information",
    de: "xxx"
  },
  formphone: {
    cz: "telefon",
    en: "phone",
    de: "xxx"
  },
  formname: {
    cz: "jméno",
    en: "name",
    de: "xxx"
  },
  formsurname: {
    cz: "příjmení",
    en: "surname",
    de: "xxx"
  },
  formstreet: {
    cz: "ulice a č.p.",
    en: "street and no.",
    de: "xxx"
  },
  formcity: {
    cz: "město",
    en: "city",
    de: "xxx"
  },
  formzip: {
    cz: "PSČ",
    en: "ZIP",
    de: "xxx"
  },
  formstate: {
    cz: "stát",
    en: "state",
    de: "xxx"
  },
  checkdifferentadress: {
    cz: "Doručit na jinou adresu",
    en: "Deliver to another address",
    de: "xxx"
  },
  checkcompanydata: {
    cz: "Doplnit firemní údaje",
    en: "Fill in the company data",
    de: "xxx"
  },
  chcekcreatecaccout: {
    cz: "Založit účet pro příští objednávky",
    en: "Create account",
    de: "xxx"
  },
  chceknote: {
    cz: "Poznámka k objednávce",
    en: "Add note to order",
    de: "xxx"
  },
  infovat: {
    cz: "Všechny ceny jsou včetně DPH 21 %",
    en: "All prices include 21% VAT",
    de: "xxx"
  },
  infoterm: {
    cz: "Odesláním objednávky souhlasíte s obchodními podmínkami.",
    en: "By sending the order, you agree with the terms and conditions.",
    de: "xxx"
  },
  sendorder: {
    cz: "Odeslat objednávku",
    en: "Send order",
    de: "xxx"
  },
  backtohp: {
    cz: "Zpět na hlavní stránku",
    en: "Back to home page",
    de: "xxx"
  },
  buy: {
    cz: "Koupit",
    en: "Buy",
    de: "xxx"
  },
  homepage: {
    cz: "Hlavní stránka",
    en: "Homepage",
    de: "xxx"
  },
  price: {
    cz: "Cena",
    en: "Price",
    de: "xxx"
  },
  unitczk: {
    cz: "Kč",
    en: "CZK",
    de: "xxx"
  },
  pc: {
    cz: "ks",
    en: "pc",
    de: "xxx"
  },
  selectvariant: {
    cz: "Vybrat variantu",
    en: "Select variant",
    de: "xxx"
  },
  interestedproducts: {
    cz: "Mohlo by vás zajímat",
    en: "You could be interested in",
    de: "xxx"
  },
  footeradress: {
    cz: "Adresa",
    en: "Adress",
    de: "xxx"
  },
  footercontact: {
    cz: "Kontakt",
    en: "Contact",
    de: "xxx"
  },
  footerabout: {
    cz: "Informace o nákupu",
    en: "About shopping",
    de: "xxx"
  },
  footerfollowus: {
    cz: "Sledujte nás",
    en: "Follow us",
    de: "xxx"
  },
  moreinformation: {
    cz: "Více informací",
    en: "More information",
    de: "xxx"
  },
  back: {
    cz: "Zpět",
    en: "Back",
    de: "xxx"
  },
  stock: {
    cz: "Skladem",
    en: "In stock",
    de: "xxx"
  },
  nosctock: {
    cz: "Není skladem",
    en: "xxx",
    de: "xxx"
  },
  onorder: {
    cz: "Na objednávku",
    en: "xxx",
    de: "xxx"
  },
  color: {
    cz: "Barva",
    en: "Color",
    de: "xxx"
  },
  from: {
    cz: "od",
    en: "from",
    de: "xxx"
  },
  allProducts: {
    cz: "Všechny produkty",
    en: "All products",
    de: "xxx"
  },
  searchAndFilter: {
    cz: "Hledat a filtrovat",
    en: "Search and filter",
    de: "xxx"
  },
  filter: {
    cz: "Filtrovat",
    en: "Filter",
    de: "xxx"
  },
  addToBasket: {
    cz: "PŘIDAT DO KOŠÍKU",
    en: "Add to basket",
    de: "xxx"
  },
  free: {
    cz: "ZDARMA",
    en: "FREE",
    de: "xxx"
  },
  yourBasket: {
    cz: "Váš nákupní košík",
    en: "Basket",
    de: "xxx"
  },
  item: {
    cz: "Položka",
    en: "Item",
    de: "xxx"
  },
  quantity: {
    cz: "Počet",
    en: "Quantity",
    de: "xxx"
  },
  remove: {
    cz: "Odstranit",
    en: "Remove",
    de: "xxx"
  },
  deliveryDetails: {
    cz: "Dodací údaje",
    en: "Delivery details",
    de: "xxx"
  },
  order: {
    cz: "Objednávka",
    en: "Order",
    de: "xxx"
  },
  editItems: {
    cz: "UPRAVIT POLOŽKY",
    en: "Edit items",
    de: "xxx"
  },
  notSelected: {
    cz: "Nevybráno",
    en: "Not selected",
    de: "xxx"
  },
  accessCondition1: {
    cz: "Odesláním objednávky souhlasíte s",
    en: "By sending the order, you agree with the",
    de: "xxx"
  },
  accessCondition2: {
    cz: "obchodními podmínkami.",
    en: "terms and conditions.",
    de: "xxx"
  },
  yourAccount: {
    cz: "Váš účet",
    en: "Account",
    de: "xxx"
  },
  account: {
    cz: "Účet",
    en: "Account",
    de: "xxx"
  },
  lengthPalicek: {
    cz: "délka paliček",
    en: "length of drumsticks",
    de: "xxx"
  },
  weightPalicek: {
    cz: "průměr paliček",
    en: "diameter of drumsticks",
    de: "xxx"
  },
  logOut: {
    cz: "Odhlásit se",
    en: "Log out",
    de: "xxx"
  },
  save: {
    cz: "ULOŽIT",
    en: "Save",
    de: "xxx"
  },
  orderHistory: {
    cz: "Historie objednávek",
    en: "Order history",
    de: "xxx"
  },
  noOrder: {
    cz: "Zatím nemáte žádnou objednávku",
    en: "You don't have any orders yet",
    de: "xxx"
  },
  orderNumber: {
    cz: "Objednávka č.",
    en: "Order no.",
    de: "xxx"
  },
  deliveryFreeCanvas: {
    cz: "Doprava ZDARMA po ČR a SK",
    en: "Free delivery to DE and AU",
    de: "xxx"
  },
  saleCanvas: {
    cz: "Sleva 5 % na všechny produkty",
    en: "5% discount on all products",
    de: "xxx"
  },
  deliveryFreeCanvasValue: {
    cz: "nad 1500 Kč",
    en: "over 100 €",
    de: "xxx"
  },
  saleCanvasValue: {
    cz: "nad 2000 Kč",
    en: "over 150 €",
    de: "xxx"
  },
  companyName: {
    cz: "Obchodní jméno",
    en: "Company name",
    de: "xxx"
  },
  ico: {
    cz: "IČO",
    en: "Company Registration No.",
    de: "xxx"
  },
  dic: {
    cz: "DIČ",
    en: "VAT no.",
    de: "xxx"
  },
  loginErrorExist: {
    cz: "Uživatel s tímto e-mailem již existuje.",
    en: "User with this email already exists.",
    de: "xxx"
  },
  loginErrorWrong: {
    cz: "Neplatý e-mail nebo heslo.",
    en: "Invalid email or password.",
    de: "xxx"
  },
  emptyFields: {
    cz: "Vyplňte prosím všechna pole.",
    en: "Please fill in all fields.",
    de: "xxx"
  },
  sale: {
    cz: "Sleva 5%",
    en: "Discount 5%",
    de: "xxx"
  },
  // odsud
  PayStatusCash: {
    cz: "Platba na dobírku",
    en: "Payment on delivery",
    de: "xxx"
  },
  PayStatusError: {
    cz: "Platba se nezdařila",
    en: "Payment failed",
    de: "xxx"
  },
  PayStatusOk: {
    cz: "Platba zaplacena",
    en: "Transaction completed",
    de: "xxx"
  },
  PayStatusWait: {
    cz: "Čeká na zaplacení",
    en: "Awaiting payment",
    de: "xxx"
  },
  selectDeliveryError: {
    cz: "Vyberte způsob dopravy",
    en: "Select a delivery method",
    de: "xxx"
  },
  selectPayMehodError: {
    cz: "Vyberte způsob platby",
    en: "Select the payment method",
    de: "xxx"
  },
  sendResetPasswordButton: {
    cz: "Odeslat požadavek",
    en: "Submit a request",
    de: "xxx"
  },
  thankOrder: {
    cz: "Děkujeme za Vaši objednávku",
    en: "Thank you for your order",
    de: "xxx"
  },
  thankInfo: {
    cz: "Na Vámi uvedený e-mail bylo zasláno potvrzení o provedené objednávce.",
    en: "A confirmation of the order has been sent to your e-mail.",
    de: "xxx"
  },
  errorSendOrder: {
    cz: "Chyba, zkontrolujte si prosím vaše údaje.",
    en: "Error, please check your details.",
    de: "xxx"
  },
  linkBuisness: {
    cz: "/vseobecne-obchodni-podminky/technicke-clanky/clanek",
    en: "/en/agb/technical/clanek",
    de: "xxx"
  }
});

/***/ }),

/***/ "nOHt":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("284h");

var _interopRequireDefault = __webpack_require__("TqRt");

exports.__esModule = true;
exports.useRouter = useRouter;
exports.makePublicRouterInstance = makePublicRouterInstance;
exports.createRouter = exports.withRouter = exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__("cDcd"));

var _router2 = _interopRequireWildcard(__webpack_require__("elyg"));

exports.Router = _router2.default;
exports.NextRouter = _router2.NextRouter;

var _routerContext = __webpack_require__("Osoz");

var _withRouter = _interopRequireDefault(__webpack_require__("0Bsm"));

exports.withRouter = _withRouter.default;
/* global window */

const singletonRouter = {
  router: null,
  // holds the actual router instance
  readyCallbacks: [],

  ready(cb) {
    if (this.router) return cb();

    if (false) {}
  }

}; // Create public properties and methods of the router in the singletonRouter

const urlPropertyFields = ['pathname', 'route', 'query', 'asPath', 'components', 'isFallback', 'basePath', 'locale', 'locales', 'defaultLocale'];
const routerEvents = ['routeChangeStart', 'beforeHistoryChange', 'routeChangeComplete', 'routeChangeError', 'hashChangeStart', 'hashChangeComplete'];
const coreMethodFields = ['push', 'replace', 'reload', 'back', 'prefetch', 'beforePopState']; // Events is a static property on the router, the router doesn't have to be initialized to use it

Object.defineProperty(singletonRouter, 'events', {
  get() {
    return _router2.default.events;
  }

});
urlPropertyFields.forEach(field => {
  // Here we need to use Object.defineProperty because, we need to return
  // the property assigned to the actual router
  // The value might get changed as we change routes and this is the
  // proper way to access it
  Object.defineProperty(singletonRouter, field, {
    get() {
      const router = getRouter();
      return router[field];
    }

  });
});
coreMethodFields.forEach(field => {
  // We don't really know the types here, so we add them later instead
  ;

  singletonRouter[field] = (...args) => {
    const router = getRouter();
    return router[field](...args);
  };
});
routerEvents.forEach(event => {
  singletonRouter.ready(() => {
    _router2.default.events.on(event, (...args) => {
      const eventField = `on${event.charAt(0).toUpperCase()}${event.substring(1)}`;
      const _singletonRouter = singletonRouter;

      if (_singletonRouter[eventField]) {
        try {
          _singletonRouter[eventField](...args);
        } catch (err) {
          console.error(`Error when running the Router event: ${eventField}`);
          console.error(`${err.message}\n${err.stack}`);
        }
      }
    });
  });
});

function getRouter() {
  if (!singletonRouter.router) {
    const message = 'No router instance found.\n' + 'You should only use "next/router" inside the client side of your app.\n';
    throw new Error(message);
  }

  return singletonRouter.router;
} // Export the singletonRouter and this is the public API.


var _default = singletonRouter; // Reexport the withRoute HOC

exports.default = _default;

function useRouter() {
  return _react.default.useContext(_routerContext.RouterContext);
} // INTERNAL APIS
// -------------
// (do not use following exports inside the app)
// Create a router and assign it as the singleton instance.
// This is used in client side when we are initilizing the app.
// This should **not** use inside the server.


const createRouter = (...args) => {
  singletonRouter.router = new _router2.default(...args);
  singletonRouter.readyCallbacks.forEach(cb => cb());
  singletonRouter.readyCallbacks = [];
  return singletonRouter.router;
}; // This function is used to create the `withRouter` router instance


exports.createRouter = createRouter;

function makePublicRouterInstance(router) {
  const _router = router;
  const instance = {};

  for (const property of urlPropertyFields) {
    if (typeof _router[property] === 'object') {
      instance[property] = Object.assign(Array.isArray(_router[property]) ? [] : {}, _router[property]); // makes sure query is not stateful

      continue;
    }

    instance[property] = _router[property];
  } // Events is a static property on the router, the router doesn't have to be initialized to use it


  instance.events = _router2.default.events;
  coreMethodFields.forEach(field => {
    instance[field] = (...args) => {
      return _router[field](...args);
    };
  });
  return instance;
}

/***/ }),

/***/ "vNVm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

exports.__esModule = true;
exports.useIntersection = useIntersection;

var _react = __webpack_require__("cDcd");

var _requestIdleCallback = _interopRequireDefault(__webpack_require__("0G5g"));

const hasIntersectionObserver = typeof IntersectionObserver !== 'undefined';

function useIntersection({
  rootMargin,
  disabled
}) {
  const isDisabled = disabled || !hasIntersectionObserver;
  const unobserve = (0, _react.useRef)();
  const [visible, setVisible] = (0, _react.useState)(false);
  const setRef = (0, _react.useCallback)(el => {
    if (unobserve.current) {
      unobserve.current();
      unobserve.current = undefined;
    }

    if (isDisabled || visible) return;

    if (el && el.tagName) {
      unobserve.current = observe(el, isVisible => isVisible && setVisible(isVisible), {
        rootMargin
      });
    }
  }, [isDisabled, rootMargin, visible]);
  (0, _react.useEffect)(() => {
    if (!hasIntersectionObserver) {
      if (!visible) (0, _requestIdleCallback.default)(() => setVisible(true));
    }
  }, [visible]);
  return [setRef, visible];
}

function observe(element, callback, options) {
  const {
    id,
    observer,
    elements
  } = createObserver(options);
  elements.set(element, callback);
  observer.observe(element);
  return function unobserve() {
    observer.unobserve(element); // Destroy observer when there's nothing left to watch:

    if (elements.size === 0) {
      observer.disconnect();
      observers.delete(id);
    }
  };
}

const observers = new Map();

function createObserver(options) {
  const id = options.rootMargin || '';
  let instance = observers.get(id);

  if (instance) {
    return instance;
  }

  const elements = new Map();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const callback = elements.get(entry.target);
      const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;

      if (callback && isVisible) {
        callback(isVisible);
      }
    });
  }, options);
  observers.set(id, instance = {
    id,
    observer,
    elements
  });
  return instance;
}

/***/ }),

/***/ "vmXh":
/***/ (function(module, exports) {

module.exports = require("js-cookie");

/***/ }),

/***/ "wkBG":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
exports.__esModule=true;exports.normalizePathSep=normalizePathSep;exports.denormalizePagePath=denormalizePagePath;function normalizePathSep(path){return path.replace(/\\/g,'/');}function denormalizePagePath(page){page=normalizePathSep(page);if(page.startsWith('/index/')){page=page.slice(6);}else if(page==='/index'){page='/';}return page;}
//# sourceMappingURL=denormalize-page-path.js.map

/***/ }),

/***/ "xVpj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("YFqc");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _data_staticTranslate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("jTVC");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("4Q3z");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _data_localize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("17YL");

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;






const SubMenu = ({
  data,
  articles = false
}) => {
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_3__["useRouter"])();
  const {
    lang
  } = Object(_data_localize__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(router.locale);
  const {
    0: baseUrl,
    1: setBaseUrl
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setBaseUrl(router.asPath.split('/')[1]);
  }, []);
  return __jsx("nav", {
    className: "sub_menu"
  }, __jsx("ul", null, baseUrl === 'produkty' && __jsx("li", {
    "uk-filter-control": "",
    className: "sub_menu_item"
  }, __jsx("a", {
    href: "#catalog-short"
  }, _data_staticTranslate__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].allProducts[lang])), data.length && data.map((item, index) => {
    if (!articles) {
      return __jsx("li", {
        key: index,
        className: "sub_menu_item",
        "uk-filter-control": `[data-category='${item._id}']`
      }, __jsx("a", {
        href: "#"
      }, item[lang].title));
    } else {
      return __jsx("li", {
        key: index,
        className: "sub_menu_item"
      }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
        href: `/clanek/${baseUrl}/${item.slug.current}`
      }, __jsx("a", null, item.title)));
    }
  })));
};

/* harmony default export */ __webpack_exports__["a"] = (SubMenu);

/***/ }),

/***/ "xnum":
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),

/***/ "zr5I":
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ })

/******/ });