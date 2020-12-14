module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./context/dataStateContext.js":
/*!*************************************!*\
  !*** ./context/dataStateContext.js ***!
  \*************************************/
/*! exports provided: DataStateContext, DataProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DataStateContext\", function() { return DataStateContext; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DataProvider\", function() { return DataProvider; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! js-cookie */ \"js-cookie\");\n/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_1__);\nvar _jsxFileName = \"/Users/dmytropechunka/Desktop/work/pellwood/client/context/dataStateContext.js\";\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\nlet reducer = (state, action) => {\n  switch (action.type) {\n    case \"basket\":\n      js_cookie__WEBPACK_IMPORTED_MODULE_1___default.a.set('basket', JSON.stringify([...action.state]));\n      return _objectSpread(_objectSpread({}, state), {}, {\n        basket: action.state\n      });\n\n    case \"basketCount\":\n      js_cookie__WEBPACK_IMPORTED_MODULE_1___default.a.set('basketCount', JSON.stringify(action.state));\n      return _objectSpread(_objectSpread({}, state), {}, {\n        basketCount: action.state\n      });\n\n    case \"user\":\n      js_cookie__WEBPACK_IMPORTED_MODULE_1___default.a.set('user', JSON.stringify(_objectSpread({}, action.state)));\n      return _objectSpread(_objectSpread({}, state), {}, {\n        user: action.state\n      });\n\n    case \"state\":\n      return _objectSpread(_objectSpread({}, state), {}, {\n        state: action.state\n      });\n\n    default:\n      console.error('action.type: \"' + action.type + '\" is not implemented');\n      return state;\n  }\n};\n\nconst initialState = {\n  basket: js_cookie__WEBPACK_IMPORTED_MODULE_1___default.a.get('basket') ? JSON.parse(js_cookie__WEBPACK_IMPORTED_MODULE_1___default.a.get('basket')) : [],\n  basketCount: js_cookie__WEBPACK_IMPORTED_MODULE_1___default.a.get('basketCount') ? JSON.parse(js_cookie__WEBPACK_IMPORTED_MODULE_1___default.a.get('basketCount')) : 0,\n  user: js_cookie__WEBPACK_IMPORTED_MODULE_1___default.a.get('user') ? JSON.parse(js_cookie__WEBPACK_IMPORTED_MODULE_1___default.a.get('user')) : {},\n  state: {\n    searchFocus: false\n  }\n};\nconst DataStateContext = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__[\"createContext\"])(initialState);\n\nfunction DataProvider(props) {\n  const {\n    0: dataContextState,\n    1: dataContextDispatch\n  } = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useReducer\"])(reducer, initialState);\n  return __jsx(DataStateContext.Provider, {\n    value: {\n      dataContextState,\n      dataContextDispatch\n    },\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 37,\n      columnNumber: 5\n    }\n  }, props.children);\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb250ZXh0L2RhdGFTdGF0ZUNvbnRleHQuanM/ZGI3ZiJdLCJuYW1lcyI6WyJyZWR1Y2VyIiwic3RhdGUiLCJhY3Rpb24iLCJ0eXBlIiwiQ29va2llcyIsInNldCIsIkpTT04iLCJzdHJpbmdpZnkiLCJiYXNrZXQiLCJiYXNrZXRDb3VudCIsInVzZXIiLCJjb25zb2xlIiwiZXJyb3IiLCJpbml0aWFsU3RhdGUiLCJnZXQiLCJwYXJzZSIsInNlYXJjaEZvY3VzIiwiRGF0YVN0YXRlQ29udGV4dCIsImNyZWF0ZUNvbnRleHQiLCJEYXRhUHJvdmlkZXIiLCJwcm9wcyIsImRhdGFDb250ZXh0U3RhdGUiLCJkYXRhQ29udGV4dERpc3BhdGNoIiwidXNlUmVkdWNlciIsImNoaWxkcmVuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0FBRUEsSUFBSUEsT0FBTyxHQUFHLENBQUNDLEtBQUQsRUFBUUMsTUFBUixLQUFtQjtBQUMvQixVQUFRQSxNQUFNLENBQUNDLElBQWY7QUFDRSxTQUFLLFFBQUw7QUFDRUMsc0RBQU8sQ0FBQ0MsR0FBUixDQUFZLFFBQVosRUFBc0JDLElBQUksQ0FBQ0MsU0FBTCxDQUFlLENBQUUsR0FBR0wsTUFBTSxDQUFDRCxLQUFaLENBQWYsQ0FBdEI7QUFDQSw2Q0FBWUEsS0FBWjtBQUFtQk8sY0FBTSxFQUFFTixNQUFNLENBQUNEO0FBQWxDOztBQUNGLFNBQUssYUFBTDtBQUNFRyxzREFBTyxDQUFDQyxHQUFSLENBQVksYUFBWixFQUEyQkMsSUFBSSxDQUFDQyxTQUFMLENBQWVMLE1BQU0sQ0FBQ0QsS0FBdEIsQ0FBM0I7QUFDQSw2Q0FBWUEsS0FBWjtBQUFtQlEsbUJBQVcsRUFBRVAsTUFBTSxDQUFDRDtBQUF2Qzs7QUFDRixTQUFLLE1BQUw7QUFDRUcsc0RBQU8sQ0FBQ0MsR0FBUixDQUFZLE1BQVosRUFBb0JDLElBQUksQ0FBQ0MsU0FBTCxtQkFBb0JMLE1BQU0sQ0FBQ0QsS0FBM0IsRUFBcEI7QUFDQSw2Q0FBWUEsS0FBWjtBQUFtQlMsWUFBSSxFQUFFUixNQUFNLENBQUNEO0FBQWhDOztBQUNGLFNBQUssT0FBTDtBQUNFLDZDQUFZQSxLQUFaO0FBQW1CQSxhQUFLLEVBQUVDLE1BQU0sQ0FBQ0Q7QUFBakM7O0FBQ0Y7QUFDRVUsYUFBTyxDQUFDQyxLQUFSLENBQWMsbUJBQW1CVixNQUFNLENBQUNDLElBQTFCLEdBQWlDLHNCQUEvQztBQUNBLGFBQU9GLEtBQVA7QUFkSjtBQWdCRCxDQWpCRDs7QUFtQkEsTUFBTVksWUFBWSxHQUFHO0FBQ25CTCxRQUFNLEVBQUVKLGdEQUFPLENBQUNVLEdBQVIsQ0FBWSxRQUFaLElBQXdCUixJQUFJLENBQUNTLEtBQUwsQ0FBV1gsZ0RBQU8sQ0FBQ1UsR0FBUixDQUFZLFFBQVosQ0FBWCxDQUF4QixHQUE0RCxFQURqRDtBQUVuQkwsYUFBVyxFQUFFTCxnREFBTyxDQUFDVSxHQUFSLENBQVksYUFBWixJQUE2QlIsSUFBSSxDQUFDUyxLQUFMLENBQVdYLGdEQUFPLENBQUNVLEdBQVIsQ0FBWSxhQUFaLENBQVgsQ0FBN0IsR0FBc0UsQ0FGaEU7QUFHbkJKLE1BQUksRUFBRU4sZ0RBQU8sQ0FBQ1UsR0FBUixDQUFZLE1BQVosSUFBc0JSLElBQUksQ0FBQ1MsS0FBTCxDQUFXWCxnREFBTyxDQUFDVSxHQUFSLENBQVksTUFBWixDQUFYLENBQXRCLEdBQXdELEVBSDNDO0FBSW5CYixPQUFLLEVBQUU7QUFDTGUsZUFBVyxFQUFFO0FBRFI7QUFKWSxDQUFyQjtBQVNBLE1BQU1DLGdCQUFnQixnQkFBR0MsMkRBQWEsQ0FBQ0wsWUFBRCxDQUF0Qzs7QUFFQSxTQUFTTSxZQUFULENBQXNCQyxLQUF0QixFQUE2QjtBQUMzQixRQUFNO0FBQUEsT0FBQ0MsZ0JBQUQ7QUFBQSxPQUFtQkM7QUFBbkIsTUFBMENDLHdEQUFVLENBQUN2QixPQUFELEVBQVVhLFlBQVYsQ0FBMUQ7QUFDQSxTQUNFLE1BQUMsZ0JBQUQsQ0FBa0IsUUFBbEI7QUFBMkIsU0FBSyxFQUFFO0FBQUVRLHNCQUFGO0FBQW9CQztBQUFwQixLQUFsQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0dGLEtBQUssQ0FBQ0ksUUFEVCxDQURGO0FBS0QiLCJmaWxlIjoiLi9jb250ZXh0L2RhdGFTdGF0ZUNvbnRleHQuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VSZWR1Y2VyLCBjcmVhdGVDb250ZXh0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgQ29va2llcyBmcm9tICdqcy1jb29raWUnXG5cbmxldCByZWR1Y2VyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgXCJiYXNrZXRcIjpcbiAgICAgIENvb2tpZXMuc2V0KCdiYXNrZXQnLCBKU09OLnN0cmluZ2lmeShbIC4uLmFjdGlvbi5zdGF0ZSBdKSlcbiAgICAgIHJldHVybiB7IC4uLnN0YXRlLCBiYXNrZXQ6IGFjdGlvbi5zdGF0ZSB9XG4gICAgY2FzZSBcImJhc2tldENvdW50XCI6XG4gICAgICBDb29raWVzLnNldCgnYmFza2V0Q291bnQnLCBKU09OLnN0cmluZ2lmeShhY3Rpb24uc3RhdGUpKVxuICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIGJhc2tldENvdW50OiBhY3Rpb24uc3RhdGUgfVxuICAgIGNhc2UgXCJ1c2VyXCI6XG4gICAgICBDb29raWVzLnNldCgndXNlcicsIEpTT04uc3RyaW5naWZ5KHsgLi4uYWN0aW9uLnN0YXRlIH0pKVxuICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIHVzZXI6IGFjdGlvbi5zdGF0ZSB9XG4gICAgY2FzZSBcInN0YXRlXCI6XG4gICAgICByZXR1cm4geyAuLi5zdGF0ZSwgc3RhdGU6IGFjdGlvbi5zdGF0ZSB9XG4gICAgZGVmYXVsdDpcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ2FjdGlvbi50eXBlOiBcIicgKyBhY3Rpb24udHlwZSArICdcIiBpcyBub3QgaW1wbGVtZW50ZWQnKVxuICAgICAgcmV0dXJuIHN0YXRlXG4gIH1cbn07XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgYmFza2V0OiBDb29raWVzLmdldCgnYmFza2V0JykgPyBKU09OLnBhcnNlKENvb2tpZXMuZ2V0KCdiYXNrZXQnKSkgOiBbXSxcbiAgYmFza2V0Q291bnQ6IENvb2tpZXMuZ2V0KCdiYXNrZXRDb3VudCcpID8gSlNPTi5wYXJzZShDb29raWVzLmdldCgnYmFza2V0Q291bnQnKSkgOiAwLFxuICB1c2VyOiBDb29raWVzLmdldCgndXNlcicpID8gSlNPTi5wYXJzZShDb29raWVzLmdldCgndXNlcicpKSA6IHt9LFxuICBzdGF0ZToge1xuICAgIHNlYXJjaEZvY3VzOiBmYWxzZVxuICB9XG59XG5cbmNvbnN0IERhdGFTdGF0ZUNvbnRleHQgPSBjcmVhdGVDb250ZXh0KGluaXRpYWxTdGF0ZSk7XG5cbmZ1bmN0aW9uIERhdGFQcm92aWRlcihwcm9wcykge1xuICBjb25zdCBbZGF0YUNvbnRleHRTdGF0ZSwgZGF0YUNvbnRleHREaXNwYXRjaF0gPSB1c2VSZWR1Y2VyKHJlZHVjZXIsIGluaXRpYWxTdGF0ZSk7XG4gIHJldHVybiAoXG4gICAgPERhdGFTdGF0ZUNvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3sgZGF0YUNvbnRleHRTdGF0ZSwgZGF0YUNvbnRleHREaXNwYXRjaCB9fT5cbiAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICA8L0RhdGFTdGF0ZUNvbnRleHQuUHJvdmlkZXI+XG4gICk7XG59XG5cbmV4cG9ydCB7IERhdGFTdGF0ZUNvbnRleHQsIERhdGFQcm92aWRlciB9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./context/dataStateContext.js\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scss/main.scss */ \"./scss/main.scss\");\n/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scss_main_scss__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var uikit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uikit */ \"uikit\");\n/* harmony import */ var uikit__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(uikit__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var uikit_dist_js_uikit_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uikit/dist/js/uikit-icons */ \"uikit/dist/js/uikit-icons\");\n/* harmony import */ var uikit_dist_js_uikit_icons__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(uikit_dist_js_uikit_icons__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _context_dataStateContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../context/dataStateContext */ \"./context/dataStateContext.js\");\nvar _jsxFileName = \"/Users/dmytropechunka/Desktop/work/pellwood/client/pages/_app.js\";\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\n\n // loads the Icon plugin\n\nuikit__WEBPACK_IMPORTED_MODULE_2___default.a.use(uikit_dist_js_uikit_icons__WEBPACK_IMPORTED_MODULE_3___default.a);\n\nconst App = ({\n  Component,\n  pageProps\n}) => {\n  return __jsx(_context_dataStateContext__WEBPACK_IMPORTED_MODULE_4__[\"DataProvider\"], {\n    __self: undefined,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 10,\n      columnNumber: 10\n    }\n  }, __jsx(Component, _extends({}, pageProps, {\n    __self: undefined,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 10,\n      columnNumber: 24\n    }\n  })));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9fYXBwLmpzP2Q1MzAiXSwibmFtZXMiOlsiVUlraXQiLCJ1c2UiLCJJY29ucyIsIkFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtDQUdBOztBQUNBQSw0Q0FBSyxDQUFDQyxHQUFOLENBQVVDLGdFQUFWOztBQUVBLE1BQU1DLEdBQUcsR0FBRyxDQUFDO0FBQUVDLFdBQUY7QUFBYUM7QUFBYixDQUFELEtBQThCO0FBQ3hDLFNBQU8sTUFBQyxzRUFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQWMsTUFBQyxTQUFELGVBQWVBLFNBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFkLENBQVA7QUFDRCxDQUZEOztBQUllRixrRUFBZiIsImZpbGUiOiIuL3BhZ2VzL19hcHAuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4uL3Njc3MvbWFpbi5zY3NzJ1xuaW1wb3J0IFVJa2l0IGZyb20gJ3Vpa2l0JztcbmltcG9ydCBJY29ucyBmcm9tICd1aWtpdC9kaXN0L2pzL3Vpa2l0LWljb25zJztcbmltcG9ydCB7IERhdGFQcm92aWRlciB9IGZyb20gJy4uL2NvbnRleHQvZGF0YVN0YXRlQ29udGV4dCdcblxuLy8gbG9hZHMgdGhlIEljb24gcGx1Z2luXG5VSWtpdC51c2UoSWNvbnMpO1xuXG5jb25zdCBBcHAgPSAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSA9PiB7XG4gIHJldHVybiA8RGF0YVByb3ZpZGVyPjxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz48L0RhdGFQcm92aWRlcj5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./scss/main.scss":
/*!************************!*\
  !*** ./scss/main.scss ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiIuL3Njc3MvbWFpbi5zY3NzLmpzIiwic291cmNlc0NvbnRlbnQiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./scss/main.scss\n");

/***/ }),

/***/ 0:
/*!****************************************!*\
  !*** multi private-next-pages/_app.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! private-next-pages/_app.js */"./pages/_app.js");


/***/ }),

/***/ "js-cookie":
/*!****************************!*\
  !*** external "js-cookie" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"js-cookie\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqcy1jb29raWVcIj8wM2MxIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6ImpzLWNvb2tpZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpzLWNvb2tpZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///js-cookie\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiPzU4OGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react\n");

/***/ }),

/***/ "uikit":
/*!************************!*\
  !*** external "uikit" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"uikit\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ1aWtpdFwiP2JmMGYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoidWlraXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1aWtpdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///uikit\n");

/***/ }),

/***/ "uikit/dist/js/uikit-icons":
/*!********************************************!*\
  !*** external "uikit/dist/js/uikit-icons" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"uikit/dist/js/uikit-icons\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ1aWtpdC9kaXN0L2pzL3Vpa2l0LWljb25zXCI/YjNiZiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJ1aWtpdC9kaXN0L2pzL3Vpa2l0LWljb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidWlraXQvZGlzdC9qcy91aWtpdC1pY29uc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///uikit/dist/js/uikit-icons\n");

/***/ })

/******/ });