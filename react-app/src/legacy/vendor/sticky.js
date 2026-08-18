/* eslint-disable */
// Generated from the original app bundle (module 575): scroll-sticky helper used by the About page, lifted verbatim.
export default function createSticky(o) {
  var f = o(78), m = o(2), v = o(3), _ = o(59), y = o(141), w = o(25), x = o(129), k = o(55);
  var P = (function () {
          function t() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            (Object(m.a)(this, t),
              (this._options = e),
              (this._el = e.el),
              (this._trigger = e.trigger),
              (this._start = e.start || 0),
              (this._end = e.end || "auto"),
              (this._markers = e.markers),
              (this._progressHandler = e.onProgress),
              (this._isTouch = _.a.isTouch()),
              (this._scrollPosition = x.a.position),
              (this._globalProgress = 0),
              (this._progress = 0),
              (this._isStickedTouch = !1),
              (this._bounds = null),
              this._isTouch ? this._setupTouch() : this._setup(),
              this._markers && (this._markerElements = this._createMarkers()),
              this._bindAll(),
              this._setupEventListeners());
          }
          return (
            Object(v.a)(t, [
              {
                key: "bounds",
                get: function () {
                  return this._bounds;
                },
              },
              {
                key: "destroy",
                value: function () {
                  ((this._scrollPosition = null), this._removeEventListeners(), this._destroyMarkers());
                },
              },
              {
                key: "_setup",
                value: function () {
                  (this._getBounds(),
                    (this._startOffset = this._getStartOffset()),
                    (this._startPosition = this._getStartPosition()),
                    (this._endPosition = this._getEndPosition()),
                    (this._distance = this._endPosition - this._startPosition),
                    (this._anticipationDistance = this._getAnticipationDistance(
                      this._options.anticipationDistance || 0,
                    )),
                    (this._anticipationOffsetSize = this._getAnticipationOffsetSize(
                      this._options.anticipationOffsetSize || 0,
                    )),
                    this._updatePosition(),
                    this._updateMarkers(),
                    this._progressHandler && this._progressHandler(this._progress));
                },
              },
              {
                key: "_setupTouch",
                value: function () {
                  (this._getBounds(),
                    (this._startOffset = this._getStartOffset()),
                    (this._startPosition = this._getStartPosition()),
                    (this._endPosition = this._getEndPosition()),
                    (this._distance = this._endPosition - this._startPosition),
                    (this._anticipationDistance = { top: 0, bottom: 0 }),
                    (this._anticipationOffsetSize = { top: 0, bottom: 0 }),
                    this._createStickyContainerTouch(),
                    this._watchPositionTouch(),
                    this._progressHandler && this._progressHandler(this._progress));
                },
              },
              {
                key: "_createStickyContainerTouch",
                value: function () {
                  var t = document.createElement("div");
                  (t.classList.add("sticky-element-container"),
                    (t.style.width = "".concat(this._bounds.width, "px")),
                    (t.style.height = "".concat(this._bounds.height, "px")),
                    (t.style.maxWidth = "".concat(this._bounds.width, "px")),
                    (t.style.maxHeight = "".concat(this._bounds.height, "px")),
                    (this._el.style.width = "".concat(this._bounds.width, "px")),
                    (this._el.style.height = "".concat(this._bounds.height, "px")),
                    (this._el.style.maxWidth = "".concat(this._bounds.width, "px")),
                    (this._el.style.maxHeight = "".concat(this._bounds.height, "px")));
                  var e = this._el.parentNode;
                  (this._el.remove(), t.appendChild(this._el), e.appendChild(t));
                },
              },
              {
                key: "_createMarkers",
                value: function () {
                  var t = [],
                    e = document.createElement("div");
                  ((e.style.position = this._isTouch ? "absolute" : "fixed"),
                    (e.style.top = "".concat(this._startPosition, "px")),
                    (e.style.height = "1px"),
                    (e.style.width = "100%"),
                    (e.style.backgroundColor = "green"),
                    document.body.appendChild(e));
                  var o = document.createElement("div");
                  if (
                    ((o.style.position = this._isTouch ? "absolute" : "fixed"),
                    (o.style.top = "".concat(this._endPosition, "px")),
                    (o.style.height = "1px"),
                    (o.style.width = "100%"),
                    (o.style.backgroundColor = "red"),
                    document.body.appendChild(o),
                    t.push(e),
                    t.push(o),
                    !this._isTouch)
                  ) {
                    var n = document.createElement("div");
                    ((n.style.position = "fixed"),
                      (n.style.left = 0),
                      (n.style.top = "".concat(this._startPosition - this._anticipationDistance.top, "px")),
                      (n.style.height = "".concat(this._anticipationDistance.top, "px")),
                      (n.style.width = "10px"),
                      (n.style.backgroundColor = "blue"),
                      document.body.appendChild(n));
                    var r = document.createElement("div");
                    return (
                      (r.style.position = "fixed"),
                      (r.style.left = 0),
                      (r.style.top = "".concat(this._endPosition, "px")),
                      (r.style.height = "".concat(this._anticipationDistance.bottom, "px")),
                      (r.style.width = "10px"),
                      (r.style.backgroundColor = "purple"),
                      document.body.appendChild(r),
                      t.push(n),
                      t.push(r),
                      t
                    );
                  }
                },
              },
              {
                key: "_destroyMarkers",
                value: function () {
                  if (this._markerElements)
                    for (var i = 0; i < this._markerElements.length; i++) {
                      this._markerElements[i].remove();
                    }
                },
              },
              {
                key: "_getBounds",
                value: function () {
                  ((this._width = k.a.width),
                    (this._height = k.a.height),
                    (this._bounds = this._el.getBoundingClientRect()),
                    (this._triggerBounds = this._trigger.getBoundingClientRect()));
                },
              },
              {
                key: "_getStartOffset",
                value: function () {
                  return "number" == typeof this._start
                    ? this._start
                    : "string" == typeof this._start && this._start.includes("%")
                      ? (parseFloat(this._start) / 100) * this._height
                      : void 0;
                },
              },
              {
                key: "_getStartPosition",
                value: function () {
                  return this._triggerBounds.y + this._scrollPosition - this._startOffset;
                },
              },
              {
                key: "_getEndPosition",
                value: function () {
                  return "number" == typeof this._end
                    ? this._startPosition + this._end
                    : "string" == typeof this._end && this._end.includes("%")
                      ? this._startPosition + (parseFloat(this._end) / 100) * this._triggerBounds.height
                      : this._startPosition +
                        this._triggerBounds.height -
                        this._bounds.height -
                        (this._bounds.y - this._triggerBounds.y);
                },
              },
              {
                key: "_getAnticipationDistance",
                value: function (t) {
                  if ("number" == typeof t) return { top: t, bottom: t };
                  if ("string" == typeof t && t.includes("%"))
                    return {
                      top: (parseFloat(t) / 100) * this._triggerBounds.height,
                      bottom: (parseFloat(t) / 100) * this._triggerBounds.height,
                    };
                  if ("object" === Object(f.a)(t)) {
                    var e = { top: 0, bottom: 0 };
                    return (
                      "number" == typeof t.top && (e.top = t.top),
                      "number" == typeof t.bottom && (e.bottom = t.bottom),
                      "string" == typeof t.top && (e.top = (parseFloat(t.top) / 100) * this._triggerBounds.height),
                      "string" == typeof t.bottom &&
                        (e.bottom = (parseFloat(t.bottom) / 100) * this._triggerBounds.height),
                      e
                    );
                  }
                },
              },
              {
                key: "_getAnticipationOffsetSize",
                value: function (t) {
                  if ("number" == typeof t) return { top: t, bottom: t };
                  if ("string" == typeof t && t.includes("%"))
                    return {
                      top: (parseFloat(t) / 100) * this._triggerBounds.height,
                      bottom: (parseFloat(t) / 100) * this._triggerBounds.height,
                    };
                  if ("object" === Object(f.a)(t)) {
                    var e = { top: 0, bottom: 0 };
                    return (
                      "number" == typeof t.top && (e.top = t.top),
                      "number" == typeof t.bottom && (e.bottom = t.bottom),
                      "string" == typeof t.top && (e.top = (parseFloat(t.top) / 100) * this._triggerBounds.height),
                      "string" == typeof t.bottom &&
                        (e.bottom = (parseFloat(t.bottom) / 100) * this._triggerBounds.height),
                      e
                    );
                  }
                },
              },
              {
                key: "_updatePosition",
                value: function () {
                  var t = this._startPosition - this._scrollPosition,
                    e = this._endPosition - this._scrollPosition;
                  ((this._progress = w.a.clamp(-t / this._distance, 0, 1)),
                    (this._globalProgress = w.a.clamp(
                      -(t - this._anticipationDistance.top) / (this._distance + this._anticipationDistance.bottom),
                      0,
                      1,
                    )));
                  var o = this._progress * this._distance,
                    n = w.a.clamp(1 - t / this._anticipationDistance.top, 0, 1),
                    r = y.a.easeInCubic(n) * this._anticipationOffsetSize.top,
                    l = w.a.clamp(1 - e / this._anticipationDistance.bottom, 0, 1),
                    h = y.a.easeInCubic(l) * this._anticipationOffsetSize.bottom;
                  this._transformY(this._el, o + r - this._anticipationOffsetSize.top - h);
                },
              },
              {
                key: "_watchPositionTouch",
                value: function () {
                  var t = this._startPosition - this._scrollPosition,
                    progress = (this._endPosition, this._scrollPosition, -t / this._distance);
                  this._progress = w.a.clamp(progress, 0, 1);
                  (this._progress, this._distance);
                  (progress >= 0 && progress < 1 && this._stickTouch(),
                    progress >= 1 && this._unstickTouch(),
                    progress < 0 && this._resetStickTouch());
                },
              },
              {
                key: "_stickTouch",
                value: function () {
                  this._isStickedTouch ||
                    ((this._isStickedTouch = !0),
                    (this._el.style.position = "fixed"),
                    (this._el.style.left = "".concat(this._bounds.x, "px")),
                    (this._el.style.top = "".concat(this._startOffset, "px")),
                    this._transformY(this._el, 0));
                },
              },
              {
                key: "_unstickTouch",
                value: function () {
                  this._isStickedTouch &&
                    ((this._isStickedTouch = !1),
                    (this._el.style.position = "relative"),
                    (this._el.style.left = "auto"),
                    (this._el.style.top = "auto"),
                    this._transformY(this._el, this._distance));
                },
              },
              {
                key: "_resetStickTouch",
                value: function () {
                  this._isStickedTouch &&
                    ((this._isStickedTouch = !1),
                    (this._el.style.position = "relative"),
                    (this._el.style.left = "auto"),
                    (this._el.style.top = "auto"),
                    this._transformY(this._el, 0));
                },
              },
              {
                key: "_updateMarkers",
                value: function () {
                  if (this._markerElements)
                    for (var i = 0; i < this._markerElements.length; i++) {
                      var marker = this._markerElements[i];
                      this._transformY(marker, -this._scrollPosition);
                    }
                },
              },
              {
                key: "_bindAll",
                value: function () {
                  ((this._scrollHandler = this._scrollHandler.bind(this)),
                    (this._resizeHandler = this._resizeHandler.bind(this)));
                },
              },
              {
                key: "_setupEventListeners",
                value: function () {
                  (x.a.addEventListener("scroll", this._scrollHandler),
                    k.a.addEventListener("resize", this._resizeHandler));
                },
              },
              {
                key: "_removeEventListeners",
                value: function () {
                  (x.a.removeEventListener("scroll", this._scrollHandler),
                    k.a.removeEventListener("resize", this._resizeHandler));
                },
              },
              {
                key: "_scrollHandler",
                value: function () {
                  ((this._scrollPosition = x.a.position),
                    this._isTouch ? this._watchPositionTouch() : (this._updatePosition(), this._updateMarkers()),
                    this._progressHandler &&
                      this._progressHandler({ progress: this._progress, globalProgress: this._globalProgress }));
                },
              },
              {
                key: "_resizeHandler",
                value: function () {
                  (this._resetTransform(this._el),
                    this._isTouch && this._resetStickTouch(),
                    this._isTouch ? this._setupTouch() : this._setup());
                },
              },
              {
                key: "_transformY",
                value: function (t, e) {
                  var o = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
                    n = o ? "translate3d(0px, ".concat(e, "px, 0px)") : "translate(0px, ".concat(e, "px)");
                  t.style.transform = n;
                },
              },
              {
                key: "_resetTransform",
                value: function (t) {
                  t.style.transform = null;
                },
              },
            ]),
            t
          );
  })();
  return P;
}
