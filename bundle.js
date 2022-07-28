/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/canvas/CanvasAnimation.ts":
/*!***************************************!*\
  !*** ./src/canvas/CanvasAnimation.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CanvasAnimation = void 0;
class CanvasAnimation {
    constructor(canvas, animation) {
        this.canvas = canvas;
        this.shouldStop = true;
        this.animation = animation;
    }
    loop() {
        this.animation.update();
        this.animation.draw();
        if (!this.shouldStop)
            requestAnimationFrame(() => this.loop());
    }
    play() {
        this.shouldStop = false;
        this.loop();
    }
    stop() {
        this.shouldStop = true;
    }
}
exports.CanvasAnimation = CanvasAnimation;


/***/ }),

/***/ "./src/canvas/SineWaves.ts":
/*!*********************************!*\
  !*** ./src/canvas/SineWaves.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SineWaves = void 0;
const Wave_1 = __webpack_require__(/*! ./Wave */ "./src/canvas/Wave.ts");
class SineWaves {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.w = width;
        this.h = height;
        this.hex = "#0d6efd";
        this.rgb = [13, 110, 253];
        let speed = .05;
        let freq = .005;
        let amp = height / 3;
        let waveA = new Wave_1.Wave({ x: 0, y: amp + 50 }, width, amp, freq, speed, 1);
        let waveB = new Wave_1.Wave({ x: width, y: height - amp - 50 }, width, amp, freq, speed, 1);
        this.bodies = [waveA, waveB];
        this.start();
    }
    start() {
        this.ctx.save();
        this.ctx.fillStyle = "rgba(13,110,253, 1)";
        this.ctx.fillRect(0, 0, this.w, this.h);
        this.ctx.restore();
    }
    clear() {
        this.ctx.save();
        this.ctx.fillStyle = "rgba(13,110,253,.05)";
        this.ctx.fillRect(0, 0, this.w, this.h);
        this.ctx.restore();
    }
    update() {
        this.bodies.forEach(k => k.update());
    }
    draw() {
        this.clear();
        this.bodies.forEach(k => k.render(this.ctx));
    }
}
exports.SineWaves = SineWaves;


/***/ }),

/***/ "./src/canvas/Wave.ts":
/*!****************************!*\
  !*** ./src/canvas/Wave.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Wave = void 0;
class Wave {
    constructor(origin, width, amplitude, frequency, speed, direction) {
        this.origin = origin;
        this.p = Object.assign({}, origin);
        this.w = width;
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.speed = speed;
        this.direction = direction;
        this.progress = 0;
        this.size = 10 * speed;
        this.rotation = 0;
        this.reverse = false;
    }
    wing(ctx, start, span) {
        ctx.save();
        ctx.beginPath();
        let r = 1000;
        let initialAngle = start + this.rotation;
        let x1 = Math.cos(initialAngle);
        let y1 = Math.sin(initialAngle);
        ctx.fillStyle = "rgba(255,255,255,0.025)";
        ctx.moveTo(this.p.x, this.p.y);
        ctx.lineTo(this.p.x + r * x1, this.p.y + r * y1);
        ctx.arc(this.p.x, this.p.y, r, initialAngle, initialAngle + span);
        ctx.lineTo(this.p.x, this.p.y);
        ctx.fill();
        ctx.restore();
    }
    render(ctx) {
        let d = Math.PI * 2;
        let span = Math.PI / 10;
        let angle = Math.PI / 2;
        for (let i = 0; i < d; i++) {
            this.wing(ctx, angle * i, span);
        }
    }
    update() {
        this.rotation += Math.PI / 180;
        this.progress += this.reverse ? -1 : 1;
        this.p.x = this.p.x + (this.w / 100) * this.speed * (this.reverse ? -1 : 1);
        this.p.y = this.origin.y + (this.amplitude * Math.sin(this.progress * this.frequency) * this.direction);
        if (this.p.x > this.w)
            this.reverse = true;
        if (this.p.x < 0)
            this.reverse = false;
    }
}
exports.Wave = Wave;


/***/ }),

/***/ "./src/canvas/index.ts":
/*!*****************************!*\
  !*** ./src/canvas/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const CanvasAnimation_1 = __webpack_require__(/*! ./CanvasAnimation */ "./src/canvas/CanvasAnimation.ts");
const SineWaves_1 = __webpack_require__(/*! ./SineWaves */ "./src/canvas/SineWaves.ts");
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext('2d');
let sine = new SineWaves_1.SineWaves(ctx, canvas.width, canvas.height);
let animation = new CanvasAnimation_1.CanvasAnimation(canvas, sine);
exports["default"] = animation;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const canvas_1 = __importDefault(__webpack_require__(/*! ./canvas */ "./src/canvas/index.ts"));
const links_1 = __importDefault(__webpack_require__(/*! ./links */ "./src/links/index.ts"));
const navbar_1 = __importDefault(__webpack_require__(/*! ./navbar */ "./src/navbar/index.ts"));
canvas_1.default.play();
links_1.default.add();
navbar_1.default.closeWhenClickingOutside();


/***/ }),

/***/ "./src/links/index.ts":
/*!****************************!*\
  !*** ./src/links/index.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const links_json_1 = __importDefault(__webpack_require__(/*! ./links.json */ "./src/links/links.json"));
const onClick_1 = __webpack_require__(/*! ./onClick */ "./src/links/onClick.ts");
function addOnClick(json) {
    for (let link in json) {
        let element = document.querySelector(`#${link}`);
        (0, onClick_1.onClick)(element, json[link]);
    }
}
const Linker = {
    add: () => addOnClick(links_json_1.default)
};
exports["default"] = Linker;


/***/ }),

/***/ "./src/links/onClick.ts":
/*!******************************!*\
  !*** ./src/links/onClick.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.onClick = exports.openTab = void 0;
function openTab(url) {
    return () => window.open(url, "_blank");
}
exports.openTab = openTab;
function onClick(component, url) {
    if (component)
        component.addEventListener('click', openTab(url));
}
exports.onClick = onClick;


/***/ }),

/***/ "./src/navbar/index.ts":
/*!*****************************!*\
  !*** ./src/navbar/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function clickOutside() {
    document.addEventListener('click', (e) => {
        const target = e.target;
        let isOutside = !target.closest("#nav");
        let toggler = document.querySelector(".navbar-toggler");
        let navbar = document.querySelector("#navbarNavAltMarkup");
        if (isOutside && (navbar === null || navbar === void 0 ? void 0 : navbar.classList.contains("show")))
            toggler === null || toggler === void 0 ? void 0 : toggler.dispatchEvent(new Event('click'));
    });
}
const navbar = {
    closeWhenClickingOutside: () => clickOutside()
};
exports["default"] = navbar;


/***/ }),

/***/ "./src/links/links.json":
/*!******************************!*\
  !*** ./src/links/links.json ***!
  \******************************/
/***/ ((module) => {

module.exports = JSON.parse('{"aerolab-repo":"https://github.com/ClassicalJo/frontend-developer-coding-challenge","aerolab-deploy":"https://cj-aerolab.vercel.app","blinker-repo":"https://github.com/ClassicalJo/blinker13","blinker-deploy":"https://js13kgames.com/entries/blinker","reflections-repo":"https://github.com/ClassicalJo/reflections","reflections-deploy":"https://classicaljo.github.io/reflections","download":"https://classicaljo.github.io/portfolio/CV%20-%20Jose%20Barrientos,%20Developer.pdf"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFO1FBQ2pELE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFpQjtRQUNsQyxJQUFJLFNBQVMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ3ZDLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUM7UUFDdkQsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQztRQUMxRCxJQUFJLFNBQVMsS0FBSSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFBRSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsYUFBYSxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25HLENBQUMsQ0FBQztBQUNOLENBQUM7QUFFRCxNQUFNLE1BQU0sR0FBRztJQUNYLHdCQUF3QixFQUFFLEdBQUcsRUFBRSxDQUFDLFlBQVksRUFBRTtDQUNqRDtBQUNELHFCQUFlLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7O1VDYnJCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2FudmFzL0NhbnZhc0FuaW1hdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2FudmFzL1NpbmVXYXZlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2FudmFzL1dhdmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NhbnZhcy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpbmtzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9saW5rcy9vbkNsaWNrLnRzIiwid2VicGFjazovLy8uL3NyYy9uYXZiYXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovLy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSYXdBbmltYXRpb24gfSBmcm9tIFwiLi90eXBlc1wiO1xyXG5leHBvcnQgY2xhc3MgQ2FudmFzQW5pbWF0aW9uIHtcclxuICAgIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICBzaG91bGRTdG9wOiBib29sZWFuO1xyXG4gICAgYW5pbWF0aW9uOiBSYXdBbmltYXRpb25cclxuICAgIGNvbnN0cnVjdG9yKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsIGFuaW1hdGlvbjogUmF3QW5pbWF0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXNcclxuICAgICAgICB0aGlzLnNob3VsZFN0b3AgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSBhbmltYXRpb247XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGxvb3AoKSB7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb24udXBkYXRlKClcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbi5kcmF3KClcclxuICAgICAgICBpZiAoIXRoaXMuc2hvdWxkU3RvcCkgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMubG9vcCgpKVxyXG4gICAgfVxyXG4gICAgcGxheSgpIHtcclxuICAgICAgICB0aGlzLnNob3VsZFN0b3AgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMubG9vcCgpXHJcbiAgICB9XHJcbiAgICBzdG9wKCkge1xyXG4gICAgICAgIHRoaXMuc2hvdWxkU3RvcCA9IHRydWVcclxuICAgIH1cclxufSIsImltcG9ydCB7IFJhd0FuaW1hdGlvbiwgQm9keSB9IGZyb20gXCIuL3R5cGVzXCI7XHJcbmltcG9ydCB7IFdhdmUgfSBmcm9tIFwiLi9XYXZlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2luZVdhdmVzIGltcGxlbWVudHMgUmF3QW5pbWF0aW9uIHtcclxuICAgIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEXHJcbiAgICB3OiBudW1iZXI7XHJcbiAgICBoOiBudW1iZXI7XHJcbiAgICBoZXg6IHN0cmluZztcclxuICAgIHJnYjogbnVtYmVyW107XHJcbiAgICBib2RpZXM6IEJvZHlbXTtcclxuICAgIGNvbnN0cnVjdG9yKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuY3R4ID0gY3R4XHJcbiAgICAgICAgdGhpcy53ID0gd2lkdGhcclxuICAgICAgICB0aGlzLmggPSBoZWlnaHRcclxuICAgICAgICB0aGlzLmhleCA9IFwiIzBkNmVmZFwiXHJcbiAgICAgICAgdGhpcy5yZ2IgPSBbMTMsIDExMCwgMjUzXVxyXG4gICAgICAgIGxldCBzcGVlZCA9IC4wNVxyXG4gICAgICAgIGxldCBmcmVxID0gLjAwNVxyXG4gICAgICAgIGxldCBhbXAgPSBoZWlnaHQgLyAzXHJcbiAgICAgICAgbGV0IHdhdmVBID0gbmV3IFdhdmUoeyB4OiAwLCB5OiBhbXAgKzUwIH0sIHdpZHRoLCBhbXAsIGZyZXEsIHNwZWVkLCAxKVxyXG4gICAgICAgIGxldCB3YXZlQiA9IG5ldyBXYXZlKHsgeDogd2lkdGgsIHk6IGhlaWdodCAtIGFtcCAtNTAgfSwgd2lkdGgsIGFtcCwgZnJlcSwgc3BlZWQsIDEpXHJcbiAgICAgICAgdGhpcy5ib2RpZXMgPSBbd2F2ZUEsIHdhdmVCXVxyXG4gICAgICAgIHRoaXMuc3RhcnQoKVxyXG4gICAgfVxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5jdHguc2F2ZSgpXHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJyZ2JhKDEzLDExMCwyNTMsIDEpXCJcclxuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCgwLCAwLCB0aGlzLncsIHRoaXMuaClcclxuICAgICAgICB0aGlzLmN0eC5yZXN0b3JlKClcclxuICAgIH1cclxuICAgIGNsZWFyKCkge1xyXG4gICAgICAgIHRoaXMuY3R4LnNhdmUoKVxyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwicmdiYSgxMywxMTAsMjUzLC4wNSlcIlxyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KDAsIDAsIHRoaXMudywgdGhpcy5oKVxyXG4gICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKVxyXG4gICAgfVxyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIHRoaXMuYm9kaWVzLmZvckVhY2goayA9PiBrLnVwZGF0ZSgpKVxyXG4gICAgfVxyXG4gICAgZHJhdygpIHtcclxuICAgICAgICB0aGlzLmNsZWFyKClcclxuICAgICAgICB0aGlzLmJvZGllcy5mb3JFYWNoKGsgPT4gay5yZW5kZXIodGhpcy5jdHgpKVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgQm9keSwgVmVjdG9yIH0gZnJvbSAnLi90eXBlcydcclxuZXhwb3J0IGNsYXNzIFdhdmUgaW1wbGVtZW50cyBCb2R5IHtcclxuICAgIG9yaWdpbjogVmVjdG9yO1xyXG4gICAgcDogVmVjdG9yO1xyXG4gICAgdzogbnVtYmVyO1xyXG4gICAgYW1wbGl0dWRlOiBudW1iZXI7XHJcbiAgICBmcmVxdWVuY3k6IG51bWJlcjtcclxuICAgIHByb2dyZXNzOiBudW1iZXI7XHJcbiAgICBkaXJlY3Rpb246IG51bWJlcjtcclxuICAgIHNwZWVkOiBudW1iZXI7XHJcbiAgICBzaXplOiBudW1iZXI7XHJcbiAgICByb3RhdGlvbjogbnVtYmVyO1xyXG4gICAgcmV2ZXJzZTogYm9vbGVhbjtcclxuICAgIGNvbnN0cnVjdG9yKG9yaWdpbjogVmVjdG9yLCB3aWR0aDogbnVtYmVyLCBhbXBsaXR1ZGU6IG51bWJlciwgZnJlcXVlbmN5OiBudW1iZXIsIHNwZWVkOiBudW1iZXIsIGRpcmVjdGlvbjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5vcmlnaW4gPSBvcmlnaW5cclxuICAgICAgICB0aGlzLnAgPSB7IC4uLm9yaWdpbiB9O1xyXG4gICAgICAgIHRoaXMudyA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuYW1wbGl0dWRlID0gYW1wbGl0dWRlO1xyXG4gICAgICAgIHRoaXMuZnJlcXVlbmN5ID0gZnJlcXVlbmN5O1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSBzcGVlZFxyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uXHJcbiAgICAgICAgdGhpcy5wcm9ncmVzcyA9IDBcclxuICAgICAgICB0aGlzLnNpemUgPSAxMCAqIHNwZWVkXHJcbiAgICAgICAgdGhpcy5yb3RhdGlvbiA9IDBcclxuICAgICAgICB0aGlzLnJldmVyc2UgPSBmYWxzZVxyXG4gICAgfVxyXG4gICAgd2luZyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgc3RhcnQ6IG51bWJlciwgc3BhbjogbnVtYmVyKSB7XHJcbiAgICAgICAgY3R4LnNhdmUoKVxyXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKVxyXG4gICAgICAgIGxldCByID0gMTAwMFxyXG4gICAgICAgIGxldCBpbml0aWFsQW5nbGUgPSBzdGFydCArIHRoaXMucm90YXRpb25cclxuICAgICAgICBsZXQgeDEgPSBNYXRoLmNvcyhpbml0aWFsQW5nbGUpXHJcbiAgICAgICAgbGV0IHkxID0gTWF0aC5zaW4oaW5pdGlhbEFuZ2xlKVxyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcInJnYmEoMjU1LDI1NSwyNTUsMC4wMjUpXCJcclxuICAgICAgICBjdHgubW92ZVRvKHRoaXMucC54LCB0aGlzLnAueSlcclxuICAgICAgICBjdHgubGluZVRvKHRoaXMucC54ICsgciAqIHgxLCB0aGlzLnAueSArIHIgKiB5MSlcclxuICAgICAgICBjdHguYXJjKHRoaXMucC54LCB0aGlzLnAueSwgciwgaW5pdGlhbEFuZ2xlLCBpbml0aWFsQW5nbGUgKyBzcGFuKVxyXG4gICAgICAgIGN0eC5saW5lVG8odGhpcy5wLngsIHRoaXMucC55KVxyXG4gICAgICAgIGN0eC5maWxsKClcclxuICAgICAgICBjdHgucmVzdG9yZSgpXHJcbiAgICB9XHJcbiAgICByZW5kZXIoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcclxuICAgICAgICBsZXQgZCA9IE1hdGguUEkgKiAyXHJcbiAgICAgICAgbGV0IHNwYW4gPSBNYXRoLlBJIC8gMTBcclxuICAgICAgICBsZXQgYW5nbGUgPSBNYXRoLlBJIC8gMlxyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2luZyhjdHgsIGFuZ2xlICogaSwgc3BhbilcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIHRoaXMucm90YXRpb24gKz0gTWF0aC5QSSAvIDE4MFxyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3MgKz0gdGhpcy5yZXZlcnNlID8gLTEgOiAxXHJcbiAgICAgICAgdGhpcy5wLnggPSB0aGlzLnAueCArICh0aGlzLncgLyAxMDApICogdGhpcy5zcGVlZCAqICh0aGlzLnJldmVyc2UgPyAtMSA6IDEpXHJcbiAgICAgICAgdGhpcy5wLnkgPSB0aGlzLm9yaWdpbi55ICsgKHRoaXMuYW1wbGl0dWRlICogTWF0aC5zaW4odGhpcy5wcm9ncmVzcyAqIHRoaXMuZnJlcXVlbmN5KSAqIHRoaXMuZGlyZWN0aW9uKVxyXG4gICAgICAgIGlmICh0aGlzLnAueCA+IHRoaXMudykgdGhpcy5yZXZlcnNlID0gdHJ1ZVxyXG4gICAgICAgIGlmICh0aGlzLnAueCA8IDApIHRoaXMucmV2ZXJzZSA9IGZhbHNlXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBDYW52YXNBbmltYXRpb24gfSBmcm9tICcuL0NhbnZhc0FuaW1hdGlvbidcclxuaW1wb3J0IHsgU2luZVdhdmVzIH0gZnJvbSAnLi9TaW5lV2F2ZXMnXHJcbmxldCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhbnZhc1wiKSBhcyBIVE1MQ2FudmFzRWxlbWVudFxyXG5sZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJykgYXMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEXHJcbmxldCBzaW5lID0gbmV3IFNpbmVXYXZlcyhjdHgsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodClcclxubGV0IGFuaW1hdGlvbiA9IG5ldyBDYW52YXNBbmltYXRpb24oY2FudmFzLCBzaW5lKVxyXG5leHBvcnQgZGVmYXVsdCBhbmltYXRpb24iLCJpbXBvcnQgYW5pbWF0aW9uIGZyb20gJy4vY2FudmFzJ1xyXG5pbXBvcnQgbGlua3MgZnJvbSAnLi9saW5rcydcclxuaW1wb3J0IG5hdmJhciBmcm9tICcuL25hdmJhcidcclxuYW5pbWF0aW9uLnBsYXkoKTtcclxubGlua3MuYWRkKClcclxubmF2YmFyLmNsb3NlV2hlbkNsaWNraW5nT3V0c2lkZSgpXHJcbiIsImltcG9ydCBsaW5rcyBmcm9tICcuL2xpbmtzLmpzb24nXHJcbmltcG9ydCB7IG9uQ2xpY2sgfSBmcm9tICcuL29uQ2xpY2snXHJcbmltcG9ydCB7IEpTT05MaW5rcyB9IGZyb20gJy4vdHlwZXMnXHJcblxyXG5mdW5jdGlvbiBhZGRPbkNsaWNrKGpzb246IEpTT05MaW5rcykge1xyXG4gICAgZm9yKGxldCBsaW5rIGluIGpzb24pe1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bGlua31gKVxyXG4gICAgICAgIG9uQ2xpY2soZWxlbWVudCwganNvbltsaW5rXSlcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbn1cclxuXHJcbmNvbnN0IExpbmtlciA9IHtcclxuICAgIGFkZDogKCkgPT4gYWRkT25DbGljayhsaW5rcyBhcyBKU09OTGlua3MpXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpbmtlciIsImV4cG9ydCBmdW5jdGlvbiBvcGVuVGFiKHVybDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gKCkgPT4gd2luZG93Lm9wZW4odXJsLCBcIl9ibGFua1wiKVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBvbkNsaWNrKGNvbXBvbmVudDogRWxlbWVudCB8IG51bGwsIHVybDogc3RyaW5nKSB7XHJcbiAgICBpZiAoY29tcG9uZW50KSBjb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuVGFiKHVybCkpXHJcbn0iLCJmdW5jdGlvbiBjbGlja091dHNpZGUoKSB7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlOiBNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQgYXMgRWxlbWVudFxyXG4gICAgICAgIGxldCBpc091dHNpZGUgPSAhdGFyZ2V0LmNsb3Nlc3QoXCIjbmF2XCIpXHJcbiAgICAgICAgbGV0IHRvZ2dsZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hdmJhci10b2dnbGVyXCIpXHJcbiAgICAgICAgbGV0IG5hdmJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmF2YmFyTmF2QWx0TWFya3VwXCIpXHJcbiAgICAgICAgaWYgKGlzT3V0c2lkZSAmJiBuYXZiYXI/LmNsYXNzTGlzdC5jb250YWlucyhcInNob3dcIikpIHRvZ2dsZXI/LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjbGljaycpKVxyXG4gICAgfSlcclxufVxyXG5cclxuY29uc3QgbmF2YmFyID0ge1xyXG4gICAgY2xvc2VXaGVuQ2xpY2tpbmdPdXRzaWRlOiAoKSA9PiBjbGlja091dHNpZGUoKVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IG5hdmJhciIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==