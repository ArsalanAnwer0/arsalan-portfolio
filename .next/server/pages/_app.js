/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./components/ui/LoadingPage.tsx":
/*!***************************************!*\
  !*** ./components/ui/LoadingPage.tsx ***!
  \***************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ LoadingPage)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! framer-motion */ \"framer-motion\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_2__]);\nframer_motion__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n/* __next_internal_client_entry_do_not_use__ default auto */ \n\n\nfunction LoadingPage() {\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"LoadingPage.useEffect\": ()=>{\n            console.log(\"Loading started\"); // Debug log\n            const timer = setTimeout({\n                \"LoadingPage.useEffect.timer\": ()=>{\n                    console.log(\"Loading ended\"); // Debug log\n                    setLoading(false);\n                }\n            }[\"LoadingPage.useEffect.timer\"], 3000);\n            return ({\n                \"LoadingPage.useEffect\": ()=>clearTimeout(timer)\n            })[\"LoadingPage.useEffect\"];\n        }\n    }[\"LoadingPage.useEffect\"], []);\n    if (!loading) return null;\n    console.log(\"Exiting LoadingPage\"); // Debug log\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_2__.motion.div, {\n        className: \"fixed inset-0 z-50 flex items-center justify-center bg-white\",\n        initial: {\n            opacity: 1\n        },\n        animate: {\n            opacity: 0\n        },\n        transition: {\n            duration: 0.5,\n            delay: 2.5\n        },\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_2__.motion.div, {\n                className: \"text-4xl font-thin text-gray-800\",\n                initial: {\n                    opacity: 0,\n                    y: 20\n                },\n                animate: {\n                    opacity: 1,\n                    y: 0\n                },\n                transition: {\n                    duration: 0.8,\n                    ease: \"easeOut\"\n                },\n                children: \"Welcome\"\n            }, void 0, false, {\n                fileName: \"/Users/arsalananwer/Desktop/Learn How to Code/MyPortfolio/components/ui/LoadingPage.tsx\",\n                lineNumber: 28,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_2__.motion.div, {\n                className: \"absolute bottom-10 left-1/2 transform -translate-x-1/2\",\n                initial: {\n                    opacity: 0\n                },\n                animate: {\n                    opacity: 1\n                },\n                transition: {\n                    delay: 0.5,\n                    duration: 0.8\n                },\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"w-16 h-1 bg-gray-300\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_2__.motion.div, {\n                        className: \"h-full bg-gray-800\",\n                        initial: {\n                            width: 0\n                        },\n                        animate: {\n                            width: \"100%\"\n                        },\n                        transition: {\n                            duration: 2.5,\n                            ease: \"easeInOut\"\n                        }\n                    }, void 0, false, {\n                        fileName: \"/Users/arsalananwer/Desktop/Learn How to Code/MyPortfolio/components/ui/LoadingPage.tsx\",\n                        lineNumber: 43,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/arsalananwer/Desktop/Learn How to Code/MyPortfolio/components/ui/LoadingPage.tsx\",\n                    lineNumber: 42,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/arsalananwer/Desktop/Learn How to Code/MyPortfolio/components/ui/LoadingPage.tsx\",\n                lineNumber: 36,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/arsalananwer/Desktop/Learn How to Code/MyPortfolio/components/ui/LoadingPage.tsx\",\n        lineNumber: 22,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL3VpL0xvYWRpbmdQYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBRTJDO0FBQ0w7QUFFdkIsU0FBU0c7SUFDdEIsTUFBTSxDQUFDQyxTQUFTQyxXQUFXLEdBQUdMLCtDQUFRQSxDQUFDO0lBRXZDQyxnREFBU0E7aUNBQUM7WUFDUkssUUFBUUMsR0FBRyxDQUFDLG9CQUFvQixZQUFZO1lBQzVDLE1BQU1DLFFBQVFDOytDQUFXO29CQUN2QkgsUUFBUUMsR0FBRyxDQUFDLGtCQUFrQixZQUFZO29CQUMxQ0YsV0FBVztnQkFDYjs4Q0FBRztZQUVIO3lDQUFPLElBQU1LLGFBQWFGOztRQUM1QjtnQ0FBRyxFQUFFO0lBRUwsSUFBSSxDQUFDSixTQUFTLE9BQU87SUFDckJFLFFBQVFDLEdBQUcsQ0FBQyx3QkFBd0IsWUFBWTtJQUNoRCxxQkFDRSw4REFBQ0wsaURBQU1BLENBQUNTLEdBQUc7UUFDVEMsV0FBVTtRQUNWQyxTQUFTO1lBQUVDLFNBQVM7UUFBRTtRQUN0QkMsU0FBUztZQUFFRCxTQUFTO1FBQUU7UUFDdEJFLFlBQVk7WUFBRUMsVUFBVTtZQUFLQyxPQUFPO1FBQUk7OzBCQUV4Qyw4REFBQ2hCLGlEQUFNQSxDQUFDUyxHQUFHO2dCQUNUQyxXQUFVO2dCQUNWQyxTQUFTO29CQUFFQyxTQUFTO29CQUFHSyxHQUFHO2dCQUFHO2dCQUM3QkosU0FBUztvQkFBRUQsU0FBUztvQkFBR0ssR0FBRztnQkFBRTtnQkFDNUJILFlBQVk7b0JBQUVDLFVBQVU7b0JBQUtHLE1BQU07Z0JBQVU7MEJBQzlDOzs7Ozs7MEJBR0QsOERBQUNsQixpREFBTUEsQ0FBQ1MsR0FBRztnQkFDVEMsV0FBVTtnQkFDVkMsU0FBUztvQkFBRUMsU0FBUztnQkFBRTtnQkFDdEJDLFNBQVM7b0JBQUVELFNBQVM7Z0JBQUU7Z0JBQ3RCRSxZQUFZO29CQUFFRSxPQUFPO29CQUFLRCxVQUFVO2dCQUFJOzBCQUV4Qyw0RUFBQ047b0JBQUlDLFdBQVU7OEJBQ2IsNEVBQUNWLGlEQUFNQSxDQUFDUyxHQUFHO3dCQUNUQyxXQUFVO3dCQUNWQyxTQUFTOzRCQUFFUSxPQUFPO3dCQUFFO3dCQUNwQk4sU0FBUzs0QkFBRU0sT0FBTzt3QkFBTzt3QkFDekJMLFlBQVk7NEJBQUVDLFVBQVU7NEJBQUtHLE1BQU07d0JBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNM0QiLCJzb3VyY2VzIjpbIi9Vc2Vycy9hcnNhbGFuYW53ZXIvRGVza3RvcC9MZWFybiBIb3cgdG8gQ29kZS9NeVBvcnRmb2xpby9jb21wb25lbnRzL3VpL0xvYWRpbmdQYWdlLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCdcblxuaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgbW90aW9uIH0gZnJvbSAnZnJhbWVyLW1vdGlvbidcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTG9hZGluZ1BhZ2UoKSB7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIkxvYWRpbmcgc3RhcnRlZFwiKTsgLy8gRGVidWcgbG9nXG4gICAgY29uc3QgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiTG9hZGluZyBlbmRlZFwiKTsgLy8gRGVidWcgbG9nXG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKVxuICAgIH0sIDMwMDApXG5cbiAgICByZXR1cm4gKCkgPT4gY2xlYXJUaW1lb3V0KHRpbWVyKVxuICB9LCBbXSlcblxuICBpZiAoIWxvYWRpbmcpIHJldHVybiBudWxsXG4gIGNvbnNvbGUubG9nKFwiRXhpdGluZyBMb2FkaW5nUGFnZVwiKTsgLy8gRGVidWcgbG9nXG4gIHJldHVybiAoXG4gICAgPG1vdGlvbi5kaXZcbiAgICAgIGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei01MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy13aGl0ZVwiXG4gICAgICBpbml0aWFsPXt7IG9wYWNpdHk6IDEgfX1cbiAgICAgIGFuaW1hdGU9e3sgb3BhY2l0eTogMCB9fVxuICAgICAgdHJhbnNpdGlvbj17eyBkdXJhdGlvbjogMC41LCBkZWxheTogMi41IH19XG4gICAgPlxuICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgY2xhc3NOYW1lPVwidGV4dC00eGwgZm9udC10aGluIHRleHQtZ3JheS04MDBcIlxuICAgICAgICBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHk6IDIwIH19XG4gICAgICAgIGFuaW1hdGU9e3sgb3BhY2l0eTogMSwgeTogMCB9fVxuICAgICAgICB0cmFuc2l0aW9uPXt7IGR1cmF0aW9uOiAwLjgsIGVhc2U6IFwiZWFzZU91dFwiIH19XG4gICAgICA+XG4gICAgICAgIFdlbGNvbWVcbiAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS0xMCBsZWZ0LTEvMiB0cmFuc2Zvcm0gLXRyYW5zbGF0ZS14LTEvMlwiXG4gICAgICAgIGluaXRpYWw9e3sgb3BhY2l0eTogMCB9fVxuICAgICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IDEgfX1cbiAgICAgICAgdHJhbnNpdGlvbj17eyBkZWxheTogMC41LCBkdXJhdGlvbjogMC44IH19XG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xNiBoLTEgYmctZ3JheS0zMDBcIj5cbiAgICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiaC1mdWxsIGJnLWdyYXktODAwXCJcbiAgICAgICAgICAgIGluaXRpYWw9e3sgd2lkdGg6IDAgfX1cbiAgICAgICAgICAgIGFuaW1hdGU9e3sgd2lkdGg6IFwiMTAwJVwiIH19XG4gICAgICAgICAgICB0cmFuc2l0aW9uPXt7IGR1cmF0aW9uOiAyLjUsIGVhc2U6IFwiZWFzZUluT3V0XCIgfX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbW90aW9uLmRpdj5cbiAgICA8L21vdGlvbi5kaXY+XG4gIClcbn1cbiJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsIm1vdGlvbiIsIkxvYWRpbmdQYWdlIiwibG9hZGluZyIsInNldExvYWRpbmciLCJjb25zb2xlIiwibG9nIiwidGltZXIiLCJzZXRUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwiZGl2IiwiY2xhc3NOYW1lIiwiaW5pdGlhbCIsIm9wYWNpdHkiLCJhbmltYXRlIiwidHJhbnNpdGlvbiIsImR1cmF0aW9uIiwiZGVsYXkiLCJ5IiwiZWFzZSIsIndpZHRoIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/ui/LoadingPage.tsx\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_ui_LoadingPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/ui/LoadingPage */ \"./components/ui/LoadingPage.tsx\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_ui_LoadingPage__WEBPACK_IMPORTED_MODULE_3__]);\n_components_ui_LoadingPage__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n // Correct path to globals.css\n\n\nfunction App({ Component, pageProps }) {\n    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(true);\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)({\n        \"App.useEffect\": ()=>{\n            // Display loading screen for 3 seconds\n            const timer = setTimeout({\n                \"App.useEffect.timer\": ()=>{\n                    setIsLoading(false);\n                }\n            }[\"App.useEffect.timer\"], 3000);\n            return ({\n                \"App.useEffect\": ()=>clearTimeout(timer)\n            })[\"App.useEffect\"]; // Cleanup timer on unmount\n        }\n    }[\"App.useEffect\"], []);\n    // Show loading page if `isLoading` is true\n    if (isLoading) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_LoadingPage__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {}, void 0, false, {\n            fileName: \"/Users/arsalananwer/Desktop/Learn How to Code/MyPortfolio/pages/_app.tsx\",\n            lineNumber: 20,\n            columnNumber: 12\n        }, this);\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n        ...pageProps\n    }, void 0, false, {\n        fileName: \"/Users/arsalananwer/Desktop/Learn How to Code/MyPortfolio/pages/_app.tsx\",\n        lineNumber: 23,\n        columnNumber: 10\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBK0IsQ0FBQyw4QkFBOEI7QUFFbEI7QUFDVTtBQUV2QyxTQUFTRyxJQUFJLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFZO0lBQzVELE1BQU0sQ0FBQ0MsV0FBV0MsYUFBYSxHQUFHUCwrQ0FBUUEsQ0FBQztJQUUzQ0MsZ0RBQVNBO3lCQUFDO1lBQ1IsdUNBQXVDO1lBQ3ZDLE1BQU1PLFFBQVFDO3VDQUFXO29CQUN2QkYsYUFBYTtnQkFDZjtzQ0FBRztZQUVIO2lDQUFPLElBQU1HLGFBQWFGO2lDQUFRLDJCQUEyQjtRQUMvRDt3QkFBRyxFQUFFO0lBRUwsMkNBQTJDO0lBQzNDLElBQUlGLFdBQVc7UUFDYixxQkFBTyw4REFBQ0osa0VBQVdBOzs7OztJQUNyQjtJQUVBLHFCQUFPLDhEQUFDRTtRQUFXLEdBQUdDLFNBQVM7Ozs7OztBQUNqQyIsInNvdXJjZXMiOlsiL1VzZXJzL2Fyc2FsYW5hbndlci9EZXNrdG9wL0xlYXJuIEhvdyB0byBDb2RlL015UG9ydGZvbGlvL3BhZ2VzL19hcHAudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4uL3N0eWxlcy9nbG9iYWxzLmNzc1wiOyAvLyBDb3JyZWN0IHBhdGggdG8gZ2xvYmFscy5jc3NcbmltcG9ydCB0eXBlIHsgQXBwUHJvcHMgfSBmcm9tIFwibmV4dC9hcHBcIjtcbmltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBMb2FkaW5nUGFnZSBmcm9tIFwiQC9jb21wb25lbnRzL3VpL0xvYWRpbmdQYWdlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH06IEFwcFByb3BzKSB7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIC8vIERpc3BsYXkgbG9hZGluZyBzY3JlZW4gZm9yIDMgc2Vjb25kc1xuICAgIGNvbnN0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgIH0sIDMwMDApO1xuXG4gICAgcmV0dXJuICgpID0+IGNsZWFyVGltZW91dCh0aW1lcik7IC8vIENsZWFudXAgdGltZXIgb24gdW5tb3VudFxuICB9LCBbXSk7XG5cbiAgLy8gU2hvdyBsb2FkaW5nIHBhZ2UgaWYgYGlzTG9hZGluZ2AgaXMgdHJ1ZVxuICBpZiAoaXNMb2FkaW5nKSB7XG4gICAgcmV0dXJuIDxMb2FkaW5nUGFnZSAvPjtcbiAgfVxuXG4gIHJldHVybiA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+O1xufVxuIl0sIm5hbWVzIjpbInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiTG9hZGluZ1BhZ2UiLCJBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJpc0xvYWRpbmciLCJzZXRJc0xvYWRpbmciLCJ0aW1lciIsInNldFRpbWVvdXQiLCJjbGVhclRpbWVvdXQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "framer-motion":
/*!********************************!*\
  !*** external "framer-motion" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = import("framer-motion");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();