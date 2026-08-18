/* eslint-disable */
// Generated from the original app bundle (module 128): resource loader classes, lifted verbatim.
// n = the legacy webpack require function.
export default function createLoaders(n) {
  var o = n(12), re = n(8), ae = n(0), te = n(7), de = n(29), l = n(16), Q = n(24);
  var Ye = (n(10), n(2)),
        Xe = n(3),
        Ke = n(4),
        Qe = n(5),
        Ze = n(1);
      function Je(e) {
        var t = (function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0);
          } catch (e) {
            return !1;
          }
        })();
        return function () {
          var n,
            r = Object(Ze.a)(e);
          if (t) {
            var o = Object(Ze.a)(this).constructor;
            n = Reflect.construct(r, arguments, o);
          } else n = r.apply(this, arguments);
          return Object(Qe.a)(this, n);
        };
      }
      var et = (function (e) {
          Object(Ke.a)(n, e);
          var t = Je(n);
          function n() {
            return (Object(Ye.a)(this, n), t.apply(this, arguments));
          }
          return (
            Object(Xe.a)(n, [
              {
                key: "load",
                value: function (e) {
                  var path = e.path,
                    t = e.name,
                    image = new Image(),
                    n = new Promise(function (e, n) {
                      (image.addEventListener("load", function () {
                        e(image);
                      }),
                        image.addEventListener("error", function (e) {
                          n(new Error('ImageLoader : Error while loading resource "'.concat(t, '"')));
                        }));
                    });
                  return ((image.src = path), n);
                },
              },
            ]),
            n
          );
        })(re.a),
        tt = n(355),
        nt = n.n(tt);
      function it(e) {
        var t = (function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0);
          } catch (e) {
            return !1;
          }
        })();
        return function () {
          var n,
            r = Object(Ze.a)(e);
          if (t) {
            var o = Object(Ze.a)(this).constructor;
            n = Reflect.construct(r, arguments, o);
          } else n = r.apply(this, arguments);
          return Object(Qe.a)(this, n);
        };
      }
      var at = (function (e) {
        Object(Ke.a)(n, e);
        var t = it(n);
        function n() {
          return (Object(Ye.a)(this, n), t.apply(this, arguments));
        }
        return (
          Object(Xe.a)(n, [
            {
              key: "load",
              value: function (e) {
                var path = e.path;
                return new Promise(function (e, t) {
                  nt()(path, function (n, r) {
                    (n && t(new Error(n)), e(r));
                  });
                });
              },
            },
          ]),
          n
        );
      })(re.a);
      function ot(e) {
        var t = (function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0);
          } catch (e) {
            return !1;
          }
        })();
        return function () {
          var n,
            r = Object(Ze.a)(e);
          if (t) {
            var o = Object(Ze.a)(this).constructor;
            n = Reflect.construct(r, arguments, o);
          } else n = r.apply(this, arguments);
          return Object(Qe.a)(this, n);
        };
      }
      var st = (function (e) {
        Object(Ke.a)(n, e);
        var t = ot(n);
        function n() {
          return (Object(Ye.a)(this, n), t.apply(this, arguments));
        }
        return (
          Object(Xe.a)(n, [
            {
              key: "load",
              value: function (e) {
                var t = e.name,
                  path = e.path;
                return new Promise(function (e, n) {
                  de.a.load(t, path).then(function (audio) {
                    e(audio);
                  });
                });
              },
            },
          ]),
          n
        );
      })(re.a);
      function lt(e) {
        var t = (function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0);
          } catch (e) {
            return !1;
          }
        })();
        return function () {
          var n,
            r = Object(Ze.a)(e);
          if (t) {
            var o = Object(Ze.a)(this).constructor;
            n = Reflect.construct(r, arguments, o);
          } else n = r.apply(this, arguments);
          return Object(Qe.a)(this, n);
        };
      }
      var ut = (function (e) {
        Object(Ke.a)(n, e);
        var t = lt(n);
        function n(e) {
          var r;
          return (Object(Ye.a)(this, n), ((r = t.call(this, e))._loader = new ae.TextureLoader()), r);
        }
        return (
          Object(Xe.a)(n, [
            {
              key: "load",
              value: function (e) {
                var t = this,
                  path = e.path;
                return new Promise(function (e, n) {
                  t._loader.load(path, e, null, n);
                });
              },
            },
          ]),
          n
        );
      })(re.a);
      (n(172),
        n(173),
        n(256),
        n(257),
        n(258),
        n(259),
        n(260),
        n(261),
        n(262),
        n(263),
        n(264),
        n(265),
        n(266),
        n(267),
        n(268),
        n(269),
        n(270),
        n(271),
        n(272),
        n(88),
        n(146),
        n(148),
        n(31),
        n(124),
        n(32),
        n(33),
        n(34),
        n(35),
        n(36),
        n(37),
        n(38),
        n(39),
        n(40),
        n(41),
        n(42),
        n(43),
        n(44),
        n(45),
        n(46),
        n(47),
        n(48),
        n(49),
        n(50),
        n(51),
        n(52),
        n(53),
        n(54),
        n(89),
        n(92));
      function ct(object, e) {
        var t = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(object);
          (e &&
            (n = n.filter(function (e) {
              return Object.getOwnPropertyDescriptor(object, e).enumerable;
            })),
            t.push.apply(t, n));
        }
        return t;
      }
      function ht(e) {
        for (var i = 1; i < arguments.length; i++) {
          var source = null != arguments[i] ? arguments[i] : {};
          i % 2
            ? ct(Object(source), !0).forEach(function (t) {
                Object(o.a)(e, t, source[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(source))
              : ct(Object(source)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(source, t));
                });
        }
        return e;
      }
      function ft(e) {
        var t = (function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0);
          } catch (e) {
            return !1;
          }
        })();
        return function () {
          var n,
            r = Object(Ze.a)(e);
          if (t) {
            var o = Object(Ze.a)(this).constructor;
            n = Reflect.construct(r, arguments, o);
          } else n = r.apply(this, arguments);
          return Object(Qe.a)(this, n);
        };
      }
      var mt = new WeakMap(),
        pt = (function (e) {
          Object(Ke.a)(n, e);
          var t = ft(n);
          function n(e) {
            var r;
            return (
              Object(Ye.a)(this, n),
              ((r = t.call(this, e)).transcoderPath = ""),
              (r.transcoderBinary = null),
              (r.transcoderPending = null),
              (r.workerLimit = 4),
              (r.workerPool = []),
              (r.workerNextTaskID = 1),
              (r.workerSourceURL = ""),
              (r.workerConfig = null),
              r
            );
          }
          return (
            Object(Xe.a)(n, [
              {
                key: "setTranscoderPath",
                value: function (path) {
                  return ((this.transcoderPath = path), this);
                },
              },
              {
                key: "setWorkerLimit",
                value: function (e) {
                  return ((this.workerLimit = e), this);
                },
              },
              {
                key: "detectSupport",
                value: function (e) {
                  return (
                    (this.workerConfig = {
                      astcSupported: e.extensions.has("WEBGL_compressed_texture_astc"),
                      etc1Supported: e.extensions.has("WEBGL_compressed_texture_etc1"),
                      etc2Supported: e.extensions.has("WEBGL_compressed_texture_etc"),
                      dxtSupported: e.extensions.has("WEBGL_compressed_texture_s3tc"),
                      bptcSupported: e.extensions.has("EXT_texture_compression_bptc"),
                      pvrtcSupported:
                        e.extensions.has("WEBGL_compressed_texture_pvrtc") ||
                        e.extensions.has("WEBKIT_WEBGL_compressed_texture_pvrtc"),
                    }),
                    this
                  );
                },
              },
              {
                key: "load",
                value: function (e, t, n, r) {
                  var o = this,
                    l = new ae.FileLoader(this.manager);
                  (l.setResponseType("arraybuffer"), l.setWithCredentials(this.withCredentials));
                  var c = new ae.CompressedTexture();
                  return (
                    l.load(
                      e,
                      function (e) {
                        if (mt.has(e)) return mt.get(e).promise.then(t).catch(r);
                        o._createTexture([e])
                          .then(function (e) {
                            (e.constructor !== c.constructor && (c = new e.constructor()),
                              c.copy(e),
                              (c.needsUpdate = !0),
                              t && t(c));
                          })
                          .catch(r);
                      },
                      n,
                      r,
                    ),
                    c
                  );
                },
              },
              {
                key: "parseInternalAsync",
                value: function (e) {
                  for (var t = e.levels, n = new Set(), i = 0; i < t.length; i++) n.add(t[i].data.buffer);
                  return this._createTexture(Array.from(n), ht(ht({}, e), {}, { lowLevel: !0 }));
                },
              },
              {
                key: "_createTexture",
                value: function (e) {
                  for (
                    var t,
                      n,
                      r = this,
                      o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                      l = o,
                      c = 0,
                      i = 0;
                    i < e.length;
                    i++
                  )
                    c += e[i].byteLength;
                  var h = this._allocateWorker(c)
                    .then(function (o) {
                      return (
                        (t = o),
                        (n = r.workerNextTaskID++),
                        new Promise(function (r, o) {
                          ((t._callbacks[n] = { resolve: r, reject: o }),
                            t.postMessage({ type: "transcode", id: n, buffers: e, taskConfig: l }, e));
                        })
                      );
                    })
                    .then(function (e) {
                      var t = e.mipmaps,
                        n = e.cubeImages,
                        r = e.width,
                        o = e.height,
                        l = e.format;
                      if (n) {
                        for (var c = [], h = 0; h < n.length; h++) {
                          var d = new ae.CompressedTexture([n[h]], r, o, l, ae.UnsignedByteType);
                          ((d.minFilter = ae.LinearFilter),
                            (d.magFilter = ae.LinearFilter),
                            (d.generateMipmaps = !1),
                            (d.needsUpdate = !0),
                            c.push(d));
                        }
                        var f = new ae.CubeTexture(c);
                        return (
                          (f.minFilter = c[0].minFilter),
                          (f.magFilter = c[0].magFilter),
                          (f.format = c[0].format),
                          (f.encoding = c[0].encoding),
                          (f.generateMipmaps = !1),
                          (f.needsUpdate = !0),
                          f
                        );
                      }
                      var m = new ae.CompressedTexture(t, r, o, l, ae.UnsignedByteType);
                      return (
                        (m.minFilter = 1 === t.length ? ae.LinearFilter : ae.LinearMipmapLinearFilter),
                        (m.magFilter = ae.LinearFilter),
                        (m.generateMipmaps = !1),
                        (m.needsUpdate = !0),
                        m
                      );
                    });
                  return (
                    h
                      .catch(function () {
                        return !0;
                      })
                      .then(function () {
                        t && n && ((t._taskLoad -= c), delete t._callbacks[n]);
                      }),
                    mt.set(e[0], { promise: h }),
                    h
                  );
                },
              },
              {
                key: "_initTranscoder",
                value: function () {
                  var e = this;
                  if (!this.transcoderPending) {
                    var t = new ae.FileLoader(this.manager);
                    (t.setPath(this.transcoderPath), t.setWithCredentials(this.withCredentials));
                    var r = new Promise(function (e, n) {
                        t.load("basis_transcoder.js", e, void 0, n);
                      }),
                      o = new ae.FileLoader(this.manager);
                    (o.setPath(this.transcoderPath),
                      o.setResponseType("arraybuffer"),
                      o.setWithCredentials(this.withCredentials));
                    var l = new Promise(function (e, t) {
                      o.load("basis_transcoder.wasm", e, void 0, t);
                    });
                    this.transcoderPending = Promise.all([r, l]).then(function (t) {
                      var r = Object(Q.a)(t, 2),
                        o = r[0],
                        l = r[1],
                        c = n.BasisWorker.toString(),
                        body = [
                          "/* constants */",
                          "let _EngineFormat = " + JSON.stringify(n.EngineFormat),
                          "let _TranscoderFormat = " + JSON.stringify(n.TranscoderFormat),
                          "let _BasisFormat = " + JSON.stringify(n.BasisFormat),
                          "/* basis_transcoder.js */",
                          o,
                          "/* worker */",
                          c.substring(c.indexOf("{") + 1, c.lastIndexOf("}")),
                        ].join("\n");
                      ((e.workerSourceURL = URL.createObjectURL(new Blob([body]))), (e.transcoderBinary = l));
                    });
                  }
                  return this.transcoderPending;
                },
              },
              {
                key: "_allocateWorker",
                value: function (e) {
                  var t = this;
                  return this._initTranscoder().then(function () {
                    if (t.workerPool.length < t.workerLimit) {
                      var n = new Worker(t.workerSourceURL);
                      ((n._callbacks = {}),
                        (n._taskLoad = 0),
                        n.postMessage({ type: "init", config: t.workerConfig, transcoderBinary: t.transcoderBinary }),
                        (n.onmessage = function (e) {
                          var t = e.data;
                          switch (t.type) {
                            case "transcode":
                              n._callbacks[t.id].resolve(t);
                              break;
                            case "error":
                              n._callbacks[t.id].reject(t);
                              break;
                            default:
                              console.error('THREE.BasisTextureLoader: Unexpected message, "' + t.type + '"');
                          }
                        }),
                        t.workerPool.push(n));
                    } else
                      t.workerPool.sort(function (a, b) {
                        return a._taskLoad > b._taskLoad ? -1 : 1;
                      });
                    var r = t.workerPool[t.workerPool.length - 1];
                    return ((r._taskLoad += e), r);
                  });
                },
              },
              {
                key: "dispose",
                value: function () {
                  for (var i = 0; i < this.workerPool.length; i++) this.workerPool[i].terminate();
                  return ((this.workerPool.length = 0), this);
                },
              },
            ]),
            n
          );
        })(ae.Loader);
      function gt(e) {
        var t = (function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0);
          } catch (e) {
            return !1;
          }
        })();
        return function () {
          var n,
            r = Object(Ze.a)(e);
          if (t) {
            var o = Object(Ze.a)(this).constructor;
            n = Reflect.construct(r, arguments, o);
          } else n = r.apply(this, arguments);
          return Object(Qe.a)(this, n);
        };
      }
      ((pt.BasisFormat = { ETC1S: 0, UASTC_4x4: 1 }),
        (pt.TranscoderFormat = {
          ETC1: 0,
          ETC2: 1,
          BC1: 2,
          BC3: 3,
          BC4: 4,
          BC5: 5,
          BC7_M6_OPAQUE_ONLY: 6,
          BC7_M5: 7,
          PVRTC1_4_RGB: 8,
          PVRTC1_4_RGBA: 9,
          ASTC_4x4: 10,
          ATC_RGB: 11,
          ATC_RGBA_INTERPOLATED_ALPHA: 12,
          RGBA32: 13,
          RGB565: 14,
          BGR565: 15,
          RGBA4444: 16,
        }),
        (pt.EngineFormat = {
          RGBAFormat: ae.RGBAFormat,
          RGBA_ASTC_4x4_Format: ae.RGBA_ASTC_4x4_Format,
          RGBA_BPTC_Format: ae.RGBA_BPTC_Format,
          RGBA_ETC2_EAC_Format: ae.RGBA_ETC2_EAC_Format,
          RGBA_PVRTC_4BPPV1_Format: ae.RGBA_PVRTC_4BPPV1_Format,
          RGBA_S3TC_DXT5_Format: ae.RGBA_S3TC_DXT5_Format,
          RGB_ETC1_Format: ae.RGB_ETC1_Format,
          RGB_ETC2_Format: ae.RGB_ETC2_Format,
          RGB_PVRTC_4BPPV1_Format: ae.RGB_PVRTC_4BPPV1_Format,
          RGB_S3TC_DXT1_Format: ae.RGB_S3TC_DXT1_Format,
        }),
        (pt.BasisWorker = function () {
          var e,
            t,
            n,
            r = _EngineFormat,
            o = _TranscoderFormat,
            l = _BasisFormat;
          onmessage = function (r) {
            var o,
              c = r.data;
            switch (c.type) {
              case "init":
                ((e = c.config),
                  (o = c.transcoderBinary),
                  (t = new Promise(function (e) {
                    ((n = { wasmBinary: o, onRuntimeInitialized: e }), BASIS(n));
                  }).then(function () {
                    n.initializeBasis();
                  })));
                break;
              case "transcode":
                t.then(function () {
                  try {
                    var e = c.taskConfig.lowLevel
                        ? (function (e) {
                            var t = e.basisFormat,
                              r = e.width,
                              o = e.height,
                              c = e.hasAlpha,
                              h = f(t, r, o, c),
                              d = h.transcoderFormat,
                              x = h.engineFormat,
                              w = n.getBytesPerBlockOrPixel(d);
                            m(n.isFormatSupported(d), "THREE.BasisTextureLoader: Unsupported format.");
                            var S = [];
                            if (t === l.ETC1S) {
                              var C = new n.LowLevelETC1SImageTranscoder(),
                                O = e.globalData,
                                L = O.endpointCount,
                                k = O.endpointsData,
                                M = O.selectorCount,
                                T = O.selectorsData,
                                P = O.tablesData;
                              try {
                                (m(C.decodePalettes(L, k, M, T), "THREE.BasisTextureLoader: decodePalettes() failed."),
                                  m(C.decodeTables(P), "THREE.BasisTextureLoader: decodeTables() failed."));
                                for (var i = 0; i < e.levels.length; i++) {
                                  var R = e.levels[i],
                                    D = e.globalData.imageDescs[i],
                                    A = y(d, R.width, R.height),
                                    E = new Uint8Array(A);
                                  (m(
                                    C.transcodeImage(
                                      d,
                                      E,
                                      A / w,
                                      R.data,
                                      v(d, R.width),
                                      _(d, R.height),
                                      R.width,
                                      R.height,
                                      R.index,
                                      D.rgbSliceByteOffset,
                                      D.rgbSliceByteLength,
                                      D.alphaSliceByteOffset,
                                      D.alphaSliceByteLength,
                                      D.imageFlags,
                                      c,
                                      !1,
                                      0,
                                      0,
                                    ),
                                    "THREE.BasisTextureLoader: transcodeImage() failed for level " + R.index + ".",
                                  ),
                                    S.push({ data: E, width: R.width, height: R.height }));
                                }
                              } finally {
                                C.delete();
                              }
                            } else
                              for (var I = 0; I < e.levels.length; I++) {
                                var j = e.levels[I],
                                  F = y(d, j.width, j.height),
                                  B = new Uint8Array(F);
                                (m(
                                  n.transcodeUASTCImage(
                                    d,
                                    B,
                                    F / w,
                                    j.data,
                                    v(d, j.width),
                                    _(d, j.height),
                                    j.width,
                                    j.height,
                                    j.index,
                                    0,
                                    j.data.byteLength,
                                    0,
                                    c,
                                    !1,
                                    0,
                                    0,
                                    -1,
                                    -1,
                                  ),
                                  "THREE.BasisTextureLoader: transcodeUASTCImage() failed for level " + j.index + ".",
                                ),
                                  S.push({ data: B, width: j.width, height: j.height }));
                              }
                            return { width: r, height: o, hasAlpha: c, mipmaps: S, format: x };
                          })(c.taskConfig)
                        : (function (e) {
                            var t = new n.BasisFile(new Uint8Array(e)),
                              r = t.isUASTC() ? l.UASTC_4x4 : l.ETC1S,
                              o = t.getImageWidth(0, 0),
                              c = t.getImageHeight(0, 0),
                              h = t.getNumLevels(0),
                              d = t.getHasAlpha(),
                              m = t.getNumImages();
                            function v() {
                              (t.close(), t.delete());
                            }
                            var _ = f(r, o, c, d),
                              y = _.transcoderFormat,
                              x = _.engineFormat;
                            if (!o || !c || !h) throw (v(), new Error("THREE.BasisTextureLoader:\tInvalid texture"));
                            if (!t.startTranscoding())
                              throw (v(), new Error("THREE.BasisTextureLoader: .startTranscoding failed"));
                            if (1 === m) {
                              for (var w = [], S = 0; S < h; S++) {
                                var C = t.getImageWidth(0, S),
                                  O = t.getImageHeight(0, S),
                                  L = new Uint8Array(t.getImageTranscodedSizeInBytes(0, S, y));
                                if (!t.transcodeImage(L, 0, S, y, 0, d))
                                  throw (v(), new Error("THREE.BasisTextureLoader: .transcodeImage failed."));
                                w.push({ data: L, width: C, height: O });
                              }
                              return (v(), { width: o, height: c, hasAlpha: d, mipmaps: w, format: x });
                            }
                            if (6 === m) {
                              for (var k = [], i = 0; i < m; i++) {
                                var M = 0,
                                  T = t.getImageWidth(i, M),
                                  P = t.getImageHeight(i, M),
                                  R = new Uint8Array(t.getImageTranscodedSizeInBytes(i, M, y));
                                if (!t.transcodeImage(R, i, M, y, 0, d))
                                  throw (v(), new Error("THREE.BasisTextureLoader: .transcodeImage failed."));
                                k.push({ data: R, width: T, height: P });
                              }
                              return (v(), { width: o, height: c, hasAlpha: d, cubeImages: k, format: x });
                            }
                            throw new Error("THREE.BasisTextureLoader: Array textures are not currently supported.");
                          })(c.buffers[0]),
                      t = e.width,
                      r = e.height,
                      o = e.hasAlpha,
                      h = e.mipmaps,
                      d = e.cubeImages,
                      x = e.format,
                      w = [];
                    if (d) {
                      for (var i = 0; i < d.length; i++) w.push(d[i].data.buffer);
                      self.postMessage(
                        { type: "transcode", id: c.id, width: t, height: r, hasAlpha: o, cubeImages: d, format: x },
                        w,
                      );
                    } else {
                      for (var S = 0; S < h.length; ++S) w.push(h[S].data.buffer);
                      self.postMessage(
                        { type: "transcode", id: c.id, width: t, height: r, hasAlpha: o, mipmaps: h, format: x },
                        w,
                      );
                    }
                  } catch (e) {
                    (console.error(e), self.postMessage({ type: "error", id: c.id, error: e.message }));
                  }
                });
            }
          };
          var c = [
              {
                if: "astcSupported",
                basisFormat: [l.UASTC_4x4],
                transcoderFormat: [o.ASTC_4x4, o.ASTC_4x4],
                engineFormat: [r.RGBA_ASTC_4x4_Format, r.RGBA_ASTC_4x4_Format],
                priorityETC1S: 1 / 0,
                priorityUASTC: 1,
                needsPowerOfTwo: !1,
              },
              {
                if: "bptcSupported",
                basisFormat: [l.ETC1S, l.UASTC_4x4],
                transcoderFormat: [o.BC7_M5, o.BC7_M5],
                engineFormat: [r.RGBA_BPTC_Format, r.RGBA_BPTC_Format],
                priorityETC1S: 3,
                priorityUASTC: 2,
                needsPowerOfTwo: !1,
              },
              {
                if: "dxtSupported",
                basisFormat: [l.ETC1S, l.UASTC_4x4],
                transcoderFormat: [o.BC1, o.BC3],
                engineFormat: [r.RGB_S3TC_DXT1_Format, r.RGBA_S3TC_DXT5_Format],
                priorityETC1S: 4,
                priorityUASTC: 5,
                needsPowerOfTwo: !1,
              },
              {
                if: "etc2Supported",
                basisFormat: [l.ETC1S, l.UASTC_4x4],
                transcoderFormat: [o.ETC1, o.ETC2],
                engineFormat: [r.RGB_ETC2_Format, r.RGBA_ETC2_EAC_Format],
                priorityETC1S: 1,
                priorityUASTC: 3,
                needsPowerOfTwo: !1,
              },
              {
                if: "etc1Supported",
                basisFormat: [l.ETC1S, l.UASTC_4x4],
                transcoderFormat: [o.ETC1, o.ETC1],
                engineFormat: [r.RGB_ETC1_Format, r.RGB_ETC1_Format],
                priorityETC1S: 2,
                priorityUASTC: 4,
                needsPowerOfTwo: !1,
              },
              {
                if: "pvrtcSupported",
                basisFormat: [l.ETC1S, l.UASTC_4x4],
                transcoderFormat: [o.PVRTC1_4_RGB, o.PVRTC1_4_RGBA],
                engineFormat: [r.RGB_PVRTC_4BPPV1_Format, r.RGBA_PVRTC_4BPPV1_Format],
                priorityETC1S: 5,
                priorityUASTC: 6,
                needsPowerOfTwo: !0,
              },
            ],
            h = c.sort(function (a, b) {
              return a.priorityETC1S - b.priorityETC1S;
            }),
            d = c.sort(function (a, b) {
              return a.priorityUASTC - b.priorityUASTC;
            });
          function f(t, n, c, f) {
            for (var m = t === l.ETC1S ? h : d, i = 0; i < m.length; i++) {
              var v = m[i];
              if (e[v.if] && v.basisFormat.includes(t) && (!v.needsPowerOfTwo || (x(n) && x(c))))
                return { transcoderFormat: v.transcoderFormat[f ? 1 : 0], engineFormat: v.engineFormat[f ? 1 : 0] };
            }
            return (
              console.warn(
                "THREE.BasisTextureLoader: No suitable compressed texture format found. Decoding to RGBA32.",
              ),
              { transcoderFormat: o.RGBA32, engineFormat: r.RGBAFormat }
            );
          }
          function m(e, t) {
            if (!e) throw new Error(t);
          }
          function v(e, t) {
            return Math.ceil(t / n.getFormatBlockWidth(e));
          }
          function _(e, t) {
            return Math.ceil(t / n.getFormatBlockHeight(e));
          }
          function y(e, t, r) {
            var l = n.getBytesPerBlockOrPixel(e);
            if (n.formatIsUncompressed(e)) return t * r * l;
            if (e === o.PVRTC1_4_RGB || e === o.PVRTC1_4_RGBA) {
              var c = (t + 3) & -4,
                h = (r + 3) & -4;
              return (Math.max(8, c) * Math.max(8, h) * 4 + 7) / 8;
            }
            return v(e, t) * _(e, r) * l;
          }
          function x(e) {
            return e <= 2 || (0 == (e & (e - 1)) && 0 !== e);
          }
        }));
      var vt = (function (e) {
          Object(Ke.a)(n, e);
          var t = gt(n);
          function n() {
            var e,
              r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (
              (Object(Ye.a)(this, n),
              ((e = t.call(this, r))._loader = new pt()),
              (e._transcoderPath = r.transcoderPath),
              (e._renderer = r.renderer),
              !e._transcoderPath)
            )
              throw new Error("ThreeBasisTextureLoader: transcoderPath is not defined");
            if (!e._renderer) throw new Error("ThreeBasisTextureLoader: renderer is not defined");
            return (e._loader.setTranscoderPath(e._transcoderPath), e._loader.detectSupport(e._renderer), e);
          }
          return (
            Object(Xe.a)(n, [
              {
                key: "load",
                value: function (e) {
                  var t = this,
                    path = e.path;
                  return new Promise(function (e, n) {
                    t._loader.load(path, e, null, n);
                  });
                },
              },
            ]),
            n
          );
        })(re.a),
        _t = n(78),
        yt = (n(236), n(202), n(67), n(237), n(324), n(147), n(105));
      function bt(e) {
        var t = (function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0);
          } catch (e) {
            return !1;
          }
        })();
        return function () {
          var n,
            r = Object(Ze.a)(e);
          if (t) {
            var o = Object(Ze.a)(this).constructor;
            n = Reflect.construct(r, arguments, o);
          } else n = r.apply(this, arguments);
          return Object(Qe.a)(this, n);
        };
      }
      var xt = new WeakMap(),
        wt = (function (e) {
          Object(Ke.a)(n, e);
          var t = bt(n);
          function n(e) {
            var r;
            return (
              Object(Ye.a)(this, n),
              ((r = t.call(this, e)).decoderPath = ""),
              (r.decoderConfig = {}),
              (r.decoderBinary = null),
              (r.decoderPending = null),
              (r.workerLimit = 4),
              (r.workerPool = []),
              (r.workerNextTaskID = 1),
              (r.workerSourceURL = ""),
              (r.defaultAttributeIDs = { position: "POSITION", normal: "NORMAL", color: "COLOR", uv: "TEX_COORD" }),
              yt.a.isSafari()
                ? (r.defaultAttributeTypes = {
                    position: "Float32Array",
                    normal: "Float32Array",
                    color: "Uint16Array",
                    uv: "Float32Array",
                    uv2: "Float32Array",
                    skinIndex: "Uint8Array",
                    skinWeight: "Float32Array",
                  })
                : (r.defaultAttributeTypes = {
                    position: "Float32Array",
                    normal: "Float32Array",
                    color: "Float32Array",
                    uv: "Float32Array",
                  }),
              r
            );
          }
          return (
            Object(Xe.a)(n, [
              {
                key: "setDecoderPath",
                value: function (path) {
                  return ((this.decoderPath = path), this);
                },
              },
              {
                key: "setDecoderConfig",
                value: function (e) {
                  return ((this.decoderConfig = e), this);
                },
              },
              {
                key: "setWorkerLimit",
                value: function (e) {
                  return ((this.workerLimit = e), this);
                },
              },
              {
                key: "load",
                value: function (e, t, n, r) {
                  var o = this,
                    l = new ae.FileLoader(this.manager);
                  (l.setPath(this.path),
                    l.setResponseType("arraybuffer"),
                    l.setRequestHeader(this.requestHeader),
                    l.setWithCredentials(this.withCredentials),
                    l.load(
                      e,
                      function (e) {
                        var n = {
                          attributeIDs: o.defaultAttributeIDs,
                          attributeTypes: o.defaultAttributeTypes,
                          useUniqueIDs: !1,
                        };
                        o.decodeGeometry(e, n).then(t).catch(r);
                      },
                      n,
                      r,
                    ));
                },
              },
              {
                key: "decodeDracoFile",
                value: function (e, t, n, r) {
                  var o;
                  ((o = yt.a.isSafari()
                    ? {
                        attributeIDs: n || this.defaultAttributeIDs,
                        attributeTypes: this.defaultAttributeTypes,
                        useUniqueIDs: !!n,
                      }
                    : {
                        attributeIDs: n || this.defaultAttributeIDs,
                        attributeTypes: r || this.defaultAttributeTypes,
                        useUniqueIDs: !!n,
                      }),
                    this.decodeGeometry(e, o).then(t));
                },
              },
              {
                key: "decodeGeometry",
                value: function (e, t) {
                  var n = this;
                  for (var r in t.attributeTypes) {
                    var o = t.attributeTypes[r];
                    void 0 !== o.BYTES_PER_ELEMENT && (t.attributeTypes[r] = o.name);
                  }
                  var l,
                    c = JSON.stringify(t);
                  if (xt.has(e)) {
                    var h = xt.get(e);
                    if (h.key === c) return h.promise;
                    if (0 === e.byteLength)
                      throw new Error(
                        "THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.",
                      );
                  }
                  var d = this.workerNextTaskID++,
                    f = e.byteLength,
                    m = this._getWorker(d, f)
                      .then(function (n) {
                        return (
                          (l = n),
                          new Promise(function (n, r) {
                            ((l._callbacks[d] = { resolve: n, reject: r }),
                              l.postMessage({ type: "decode", id: d, taskConfig: t, buffer: e }, [e]));
                          })
                        );
                      })
                      .then(function (e) {
                        return n._createGeometry(e.geometry);
                      });
                  return (
                    m
                      .catch(function () {
                        return !0;
                      })
                      .then(function () {
                        l && d && n._releaseTask(l, d);
                      }),
                    xt.set(e, { key: c, promise: m }),
                    m
                  );
                },
              },
              {
                key: "_createGeometry",
                value: function (e) {
                  var t = new ae.BufferGeometry();
                  e.index && t.setIndex(new ae.BufferAttribute(e.index.array, 1));
                  for (var i = 0; i < e.attributes.length; i++) {
                    var n = e.attributes[i],
                      r = n.name,
                      o = n.array,
                      l = n.itemSize;
                    t.setAttribute(r, new ae.BufferAttribute(o, l));
                  }
                  return t;
                },
              },
              {
                key: "_loadLibrary",
                value: function (e, t) {
                  var n = new ae.FileLoader(this.manager);
                  return (
                    n.setPath(this.decoderPath),
                    n.setResponseType(t),
                    n.setWithCredentials(this.withCredentials),
                    new Promise(function (t, r) {
                      n.load(e, t, void 0, r);
                    })
                  );
                },
              },
              {
                key: "preload",
                value: function () {
                  return (this._initDecoder(), this);
                },
              },
              {
                key: "_initDecoder",
                value: function () {
                  var e = this;
                  if (this.decoderPending) return this.decoderPending;
                  var t =
                      "object" !== ("undefined" == typeof WebAssembly ? "undefined" : Object(_t.a)(WebAssembly)) ||
                      "js" === this.decoderConfig.type,
                    n = [];
                  return (
                    t
                      ? n.push(this._loadLibrary("draco_decoder.js", "text"))
                      : (n.push(this._loadLibrary("draco_wasm_wrapper.js", "text")),
                        n.push(this._loadLibrary("draco_decoder.wasm", "arraybuffer"))),
                    (this.decoderPending = Promise.all(n).then(function (n) {
                      var r = n[0];
                      t || (e.decoderConfig.wasmBinary = n[1]);
                      var o = St.toString(),
                        body = [
                          "/* draco decoder */",
                          r,
                          "",
                          "/* worker */",
                          o.substring(o.indexOf("{") + 1, o.lastIndexOf("}")),
                        ].join("\n");
                      e.workerSourceURL = URL.createObjectURL(new Blob([body]));
                    })),
                    this.decoderPending
                  );
                },
              },
              {
                key: "_getWorker",
                value: function (e, t) {
                  var n = this;
                  return this._initDecoder().then(function () {
                    if (n.workerPool.length < n.workerLimit) {
                      var r = new Worker(n.workerSourceURL);
                      ((r._callbacks = {}),
                        (r._taskCosts = {}),
                        (r._taskLoad = 0),
                        r.postMessage({ type: "init", decoderConfig: n.decoderConfig }),
                        (r.onmessage = function (e) {
                          var t = e.data;
                          switch (t.type) {
                            case "decode":
                              r._callbacks[t.id].resolve(t);
                              break;
                            case "error":
                              r._callbacks[t.id].reject(t);
                              break;
                            default:
                              console.error('THREE.DRACOLoader: Unexpected message, "' + t.type + '"');
                          }
                        }),
                        n.workerPool.push(r));
                    } else
                      n.workerPool.sort(function (a, b) {
                        return a._taskLoad > b._taskLoad ? -1 : 1;
                      });
                    var o = n.workerPool[n.workerPool.length - 1];
                    return ((o._taskCosts[e] = t), (o._taskLoad += t), o);
                  });
                },
              },
              {
                key: "_releaseTask",
                value: function (e, t) {
                  ((e._taskLoad -= e._taskCosts[t]), delete e._callbacks[t], delete e._taskCosts[t]);
                },
              },
              {
                key: "debug",
                value: function () {
                  console.log(
                    "Task load: ",
                    this.workerPool.map(function (e) {
                      return e._taskLoad;
                    }),
                  );
                },
              },
              {
                key: "dispose",
                value: function () {
                  for (var i = 0; i < this.workerPool.length; ++i) this.workerPool[i].terminate();
                  return ((this.workerPool.length = 0), this);
                },
              },
            ]),
            n
          );
        })(ae.Loader);
      function St() {
        var e, t;
        function n(e, t, n, r, o, l) {
          var c = l.num_components(),
            h = n.num_points() * c,
            d = h * o.BYTES_PER_ELEMENT,
            f = (function (e, t) {
              switch (t) {
                case Float32Array:
                  return e.DT_FLOAT32;
                case Int8Array:
                  return e.DT_INT8;
                case Int16Array:
                  return e.DT_INT16;
                case Int32Array:
                  return e.DT_INT32;
                case Uint8Array:
                  return e.DT_UINT8;
                case Uint16Array:
                  return e.DT_UINT16;
                case Uint32Array:
                  return e.DT_UINT32;
              }
            })(e, o),
            m = e._malloc(d);
          t.GetAttributeDataArrayForAllPoints(n, l, f, d, m);
          var v = new o(e.HEAPF32.buffer, m, h).slice();
          return (e._free(m), { name: r, array: v, itemSize: c });
        }
        onmessage = function (r) {
          var o = r.data;
          switch (o.type) {
            case "init":
              ((e = o.decoderConfig),
                (t = new Promise(function (t) {
                  ((e.onModuleLoaded = function (e) {
                    t({ draco: e });
                  }),
                    DracoDecoderModule(e));
                })));
              break;
            case "decode":
              var l = o.buffer,
                c = o.taskConfig;
              t.then(function (e) {
                var t = e.draco,
                  r = new t.Decoder(),
                  h = new t.DecoderBuffer();
                h.Init(new Int8Array(l), l.byteLength);
                try {
                  var d = (function (e, t, r, o) {
                      var l,
                        c,
                        h = o.attributeIDs,
                        d = o.attributeTypes,
                        f = t.GetEncodedGeometryType(r);
                      if (f === e.TRIANGULAR_MESH) ((l = new e.Mesh()), (c = t.DecodeBufferToMesh(r, l)));
                      else {
                        if (f !== e.POINT_CLOUD) throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
                        ((l = new e.PointCloud()), (c = t.DecodeBufferToPointCloud(r, l)));
                      }
                      if (!c.ok() || 0 === l.ptr)
                        throw new Error("THREE.DRACOLoader: Decoding failed: " + c.error_msg());
                      var m = { index: null, attributes: [] };
                      for (var v in h) {
                        var _ = self[d[v]],
                          y = void 0,
                          x = void 0;
                        if (o.useUniqueIDs) ((x = h[v]), (y = t.GetAttributeByUniqueId(l, x)));
                        else {
                          if (-1 === (x = t.GetAttributeId(l, e[h[v]]))) continue;
                          y = t.GetAttribute(l, x);
                        }
                        m.attributes.push(n(e, t, l, v, _, y));
                      }
                      f === e.TRIANGULAR_MESH &&
                        (m.index = (function (e, t, n) {
                          var r = 3 * n.num_faces(),
                            o = 4 * r,
                            l = e._malloc(o);
                          t.GetTrianglesUInt32Array(n, o, l);
                          var c = new Uint32Array(e.HEAPF32.buffer, l, r).slice();
                          return (e._free(l), { array: c, itemSize: 1 });
                        })(e, t, l));
                      return (e.destroy(l), m);
                    })(t, r, h, c),
                    f = d.attributes.map(function (e) {
                      return e.array.buffer;
                    });
                  (d.index && f.push(d.index.array.buffer),
                    self.postMessage({ type: "decode", id: o.id, geometry: d }, f));
                } catch (e) {
                  (console.error(e), self.postMessage({ type: "error", id: o.id, error: e.message }));
                } finally {
                  (t.destroy(h), t.destroy(r));
                }
              });
          }
        };
      }
      var Ct = n(28),
        Ot = n(6);
      (n(96),
        n(254),
        n(255),
        n(85),
        n(240),
        n(241),
        n(242),
        n(243),
        n(244),
        n(245),
        n(246),
        n(247),
        n(248),
        n(249),
        n(250),
        n(251),
        n(252),
        n(253),
        n(474));
      function Lt(e, t) {
        var n = ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
        if (!n) {
          if (
            Array.isArray(e) ||
            (n = (function (e, t) {
              if (!e) return;
              if ("string" == typeof e) return kt(e, t);
              var n = Object.prototype.toString.call(e).slice(8, -1);
              "Object" === n && e.constructor && (n = e.constructor.name);
              if ("Map" === n || "Set" === n) return Array.from(e);
              if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return kt(e, t);
            })(e)) ||
            (t && e && "number" == typeof e.length)
          ) {
            n && (e = n);
            var i = 0,
              r = function () {};
            return {
              s: r,
              n: function () {
                return i >= e.length ? { done: !0 } : { done: !1, value: e[i++] };
              },
              e: function (e) {
                throw e;
              },
              f: r,
            };
          }
          throw new TypeError(
            "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
          );
        }
        var o,
          l = !0,
          c = !1;
        return {
          s: function () {
            n = n.call(e);
          },
          n: function () {
            var e = n.next();
            return ((l = e.done), e);
          },
          e: function (e) {
            ((c = !0), (o = e));
          },
          f: function () {
            try {
              l || null == n.return || n.return();
            } finally {
              if (c) throw o;
            }
          },
        };
      }
      function kt(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var i = 0, n = new Array(t); i < t; i++) n[i] = e[i];
        return n;
      }
      function Mt(e) {
        var t = (function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0);
          } catch (e) {
            return !1;
          }
        })();
        return function () {
          var n,
            r = Object(Ze.a)(e);
          if (t) {
            var o = Object(Ze.a)(this).constructor;
            n = Reflect.construct(r, arguments, o);
          } else n = r.apply(this, arguments);
          return Object(Qe.a)(this, n);
        };
      }
      var Tt = (function (e) {
        Object(Ke.a)(n, e);
        var t = Mt(n);
        function n(e) {
          var r;
          return (
            Object(Ye.a)(this, n),
            ((r = t.call(this, e)).dracoLoader = null),
            (r.ktx2Loader = null),
            (r.meshoptDecoder = null),
            (r.pluginCallbacks = []),
            r.register(function (e) {
              return new Et(e);
            }),
            r.register(function (e) {
              return new Ut(e);
            }),
            r.register(function (e) {
              return new Nt(e);
            }),
            r.register(function (e) {
              return new It(e);
            }),
            r.register(function (e) {
              return new jt(e);
            }),
            r.register(function (e) {
              return new Ft(e);
            }),
            r.register(function (e) {
              return new Bt(e);
            }),
            r.register(function (e) {
              return new Dt(e);
            }),
            r.register(function (e) {
              return new zt(e);
            }),
            r
          );
        }
        return (
          Object(Xe.a)(n, [
            {
              key: "load",
              value: function (e, t, n, r) {
                var o,
                  l = this;
                ((o =
                  "" !== this.resourcePath
                    ? this.resourcePath
                    : "" !== this.path
                      ? this.path
                      : ae.LoaderUtils.extractUrlBase(e)),
                  this.manager.itemStart(e));
                var c = function (t) {
                    (r ? r(t) : console.error(t), l.manager.itemError(e), l.manager.itemEnd(e));
                  },
                  h = new ae.FileLoader(this.manager);
                (h.setPath(this.path),
                  h.setResponseType("arraybuffer"),
                  h.setRequestHeader(this.requestHeader),
                  h.setWithCredentials(this.withCredentials),
                  h.load(
                    e,
                    function (data) {
                      try {
                        l.parse(
                          data,
                          o,
                          function (n) {
                            (t(n), l.manager.itemEnd(e));
                          },
                          c,
                        );
                      } catch (e) {
                        c(e);
                      }
                    },
                    n,
                    c,
                  ));
              },
            },
            {
              key: "setDRACOLoader",
              value: function (e) {
                return ((this.dracoLoader = e), this);
              },
            },
            {
              key: "setDDSLoader",
              value: function () {
                throw new Error(
                  'THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".',
                );
              },
            },
            {
              key: "setKTX2Loader",
              value: function (e) {
                return ((this.ktx2Loader = e), this);
              },
            },
            {
              key: "setMeshoptDecoder",
              value: function (e) {
                return ((this.meshoptDecoder = e), this);
              },
            },
            {
              key: "register",
              value: function (e) {
                return (this.pluginCallbacks.includes(e) || this.pluginCallbacks.push(e), this);
              },
            },
            {
              key: "unregister",
              value: function (e) {
                return (
                  this.pluginCallbacks.includes(e) && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1),
                  this
                );
              },
            },
            {
              key: "parse",
              value: function (data, path, e, t) {
                var content,
                  n = {},
                  r = {};
                if ("string" == typeof data) content = data;
                else if (ae.LoaderUtils.decodeText(new Uint8Array(data, 0, 4)) === Gt) {
                  try {
                    n[Rt.KHR_BINARY_GLTF] = new Wt(data);
                  } catch (e) {
                    return void (t && t(e));
                  }
                  content = n[Rt.KHR_BINARY_GLTF].content;
                } else content = ae.LoaderUtils.decodeText(new Uint8Array(data));
                var o = JSON.parse(content);
                if (void 0 === o.asset || o.asset.version[0] < 2)
                  t && t(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
                else {
                  var l = new Cn(o, {
                    path: path || this.resourcePath || "",
                    crossOrigin: this.crossOrigin,
                    requestHeader: this.requestHeader,
                    manager: this.manager,
                    ktx2Loader: this.ktx2Loader,
                    meshoptDecoder: this.meshoptDecoder,
                  });
                  l.fileLoader.setRequestHeader(this.requestHeader);
                  for (var i = 0; i < this.pluginCallbacks.length; i++) {
                    var c = this.pluginCallbacks[i](l);
                    ((r[c.name] = c), (n[c.name] = !0));
                  }
                  if (o.extensionsUsed)
                    for (var h = 0; h < o.extensionsUsed.length; ++h) {
                      var d = o.extensionsUsed[h],
                        f = o.extensionsRequired || [];
                      switch (d) {
                        case Rt.KHR_MATERIALS_UNLIT:
                          n[d] = new At();
                          break;
                        case Rt.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:
                          n[d] = new Xt();
                          break;
                        case Rt.KHR_DRACO_MESH_COMPRESSION:
                          n[d] = new $t(o, this.dracoLoader);
                          break;
                        case Rt.KHR_TEXTURE_TRANSFORM:
                          n[d] = new qt();
                          break;
                        case Rt.KHR_MESH_QUANTIZATION:
                          n[d] = new Kt();
                          break;
                        default:
                          f.includes(d) &&
                            void 0 === r[d] &&
                            console.warn('THREE.GLTFLoader: Unknown extension "' + d + '".');
                      }
                    }
                  (l.setExtensions(n), l.setPlugins(r), l.parse(e, t));
                }
              },
            },
          ]),
          n
        );
      })(ae.Loader);
      function Pt() {
        var e = {};
        return {
          get: function (t) {
            return e[t];
          },
          add: function (t, object) {
            e[t] = object;
          },
          remove: function (t) {
            delete e[t];
          },
          removeAll: function () {
            e = {};
          },
        };
      }
      var Rt = {
          KHR_BINARY_GLTF: "KHR_binary_glTF",
          KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
          KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
          KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
          KHR_MATERIALS_IOR: "KHR_materials_ior",
          KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS: "KHR_materials_pbrSpecularGlossiness",
          KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
          KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
          KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
          KHR_MATERIALS_VOLUME: "KHR_materials_volume",
          KHR_TEXTURE_BASISU: "KHR_texture_basisu",
          KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
          KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
          EXT_TEXTURE_WEBP: "EXT_texture_webp",
          EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
        },
        Dt = (function () {
          function e(t) {
            (Object(Ye.a)(this, e),
              (this.parser = t),
              (this.name = Rt.KHR_LIGHTS_PUNCTUAL),
              (this.cache = { refs: {}, uses: {} }));
          }
          return (
            Object(Xe.a)(e, [
              {
                key: "_markDefs",
                value: function () {
                  for (var e = this.parser, t = this.parser.json.nodes || [], n = 0, r = t.length; n < r; n++) {
                    var o = t[n];
                    o.extensions &&
                      o.extensions[this.name] &&
                      void 0 !== o.extensions[this.name].light &&
                      e._addNodeRef(this.cache, o.extensions[this.name].light);
                  }
                },
              },
              {
                key: "_loadLight",
                value: function (e) {
                  var t = this.parser,
                    n = "light:" + e,
                    r = t.cache.get(n);
                  if (r) return r;
                  var o,
                    l = t.json,
                    c = (((l.extensions && l.extensions[this.name]) || {}).lights || [])[e],
                    h = new ae.Color(16777215);
                  void 0 !== c.color && h.fromArray(c.color);
                  var d = void 0 !== c.range ? c.range : 0;
                  switch (c.type) {
                    case "directional":
                      ((o = new ae.DirectionalLight(h)).target.position.set(0, 0, -1), o.add(o.target));
                      break;
                    case "point":
                      (o = new ae.PointLight(h)).distance = d;
                      break;
                    case "spot":
                      (((o = new ae.SpotLight(h)).distance = d),
                        (c.spot = c.spot || {}),
                        (c.spot.innerConeAngle = void 0 !== c.spot.innerConeAngle ? c.spot.innerConeAngle : 0),
                        (c.spot.outerConeAngle =
                          void 0 !== c.spot.outerConeAngle ? c.spot.outerConeAngle : Math.PI / 4),
                        (o.angle = c.spot.outerConeAngle),
                        (o.penumbra = 1 - c.spot.innerConeAngle / c.spot.outerConeAngle),
                        o.target.position.set(0, 0, -1),
                        o.add(o.target));
                      break;
                    default:
                      throw new Error("THREE.GLTFLoader: Unexpected light type: " + c.type);
                  }
                  return (
                    o.position.set(0, 0, 0),
                    (o.decay = 2),
                    void 0 !== c.intensity && (o.intensity = c.intensity),
                    (o.name = t.createUniqueName(c.name || "light_" + e)),
                    (r = Promise.resolve(o)),
                    t.cache.add(n, r),
                    r
                  );
                },
              },
              {
                key: "createNodeAttachment",
                value: function (e) {
                  var t = this,
                    n = this.parser,
                    r = n.json.nodes[e],
                    o = ((r.extensions && r.extensions[this.name]) || {}).light;
                  return void 0 === o
                    ? null
                    : this._loadLight(o).then(function (e) {
                        return n._getNodeRef(t.cache, o, e);
                      });
                },
              },
            ]),
            e
          );
        })(),
        At = (function () {
          function e() {
            (Object(Ye.a)(this, e), (this.name = Rt.KHR_MATERIALS_UNLIT));
          }
          return (
            Object(Xe.a)(e, [
              {
                key: "getMaterialType",
                value: function () {
                  return ae.MeshBasicMaterial;
                },
              },
              {
                key: "extendParams",
                value: function (e, t, n) {
                  var r = [];
                  ((e.color = new ae.Color(1, 1, 1)), (e.opacity = 1));
                  var o = t.pbrMetallicRoughness;
                  if (o) {
                    if (Array.isArray(o.baseColorFactor)) {
                      var l = o.baseColorFactor;
                      (e.color.fromArray(l), (e.opacity = l[3]));
                    }
                    void 0 !== o.baseColorTexture && r.push(n.assignTexture(e, "map", o.baseColorTexture));
                  }
                  return Promise.all(r);
                },
              },
            ]),
            e
          );
        })(),
        Et = (function () {
          function e(t) {
            (Object(Ye.a)(this, e), (this.parser = t), (this.name = Rt.KHR_MATERIALS_CLEARCOAT));
          }
          return (
            Object(Xe.a)(e, [
              {
                key: "getMaterialType",
                value: function (e) {
                  var t = this.parser.json.materials[e];
                  return t.extensions && t.extensions[this.name] ? ae.MeshPhysicalMaterial : null;
                },
              },
              {
                key: "extendMaterialParams",
                value: function (e, t) {
                  var n = this.parser,
                    r = n.json.materials[e];
                  if (!r.extensions || !r.extensions[this.name]) return Promise.resolve();
                  var o = [],
                    l = r.extensions[this.name];
                  if (
                    (void 0 !== l.clearcoatFactor && (t.clearcoat = l.clearcoatFactor),
                    void 0 !== l.clearcoatTexture && o.push(n.assignTexture(t, "clearcoatMap", l.clearcoatTexture)),
                    void 0 !== l.clearcoatRoughnessFactor && (t.clearcoatRoughness = l.clearcoatRoughnessFactor),
                    void 0 !== l.clearcoatRoughnessTexture &&
                      o.push(n.assignTexture(t, "clearcoatRoughnessMap", l.clearcoatRoughnessTexture)),
                    void 0 !== l.clearcoatNormalTexture &&
                      (o.push(n.assignTexture(t, "clearcoatNormalMap", l.clearcoatNormalTexture)),
                      void 0 !== l.clearcoatNormalTexture.scale))
                  ) {
                    var c = l.clearcoatNormalTexture.scale;
                    t.clearcoatNormalScale = new ae.Vector2(c, c);
                  }
                  return Promise.all(o);
                },
              },
            ]),
            e
          );
        })(),
        It = (function () {
          function e(t) {
            (Object(Ye.a)(this, e), (this.parser = t), (this.name = Rt.KHR_MATERIALS_TRANSMISSION));
          }
          return (
            Object(Xe.a)(e, [
              {
                key: "getMaterialType",
                value: function (e) {
                  var t = this.parser.json.materials[e];
                  return t.extensions && t.extensions[this.name] ? ae.MeshPhysicalMaterial : null;
                },
              },
              {
                key: "extendMaterialParams",
                value: function (e, t) {
                  var n = this.parser,
                    r = n.json.materials[e];
                  if (!r.extensions || !r.extensions[this.name]) return Promise.resolve();
                  var o = [],
                    l = r.extensions[this.name];
                  return (
                    void 0 !== l.transmissionFactor && (t.transmission = l.transmissionFactor),
                    void 0 !== l.transmissionTexture &&
                      o.push(n.assignTexture(t, "transmissionMap", l.transmissionTexture)),
                    Promise.all(o)
                  );
                },
              },
            ]),
            e
          );
        })(),
        jt = (function () {
          function e(t) {
            (Object(Ye.a)(this, e), (this.parser = t), (this.name = Rt.KHR_MATERIALS_VOLUME));
          }
          return (
            Object(Xe.a)(e, [
              {
                key: "getMaterialType",
                value: function (e) {
                  var t = this.parser.json.materials[e];
                  return t.extensions && t.extensions[this.name] ? ae.MeshPhysicalMaterial : null;
                },
              },
              {
                key: "extendMaterialParams",
                value: function (e, t) {
                  var n = this.parser,
                    r = n.json.materials[e];
                  if (!r.extensions || !r.extensions[this.name]) return Promise.resolve();
                  var o = [],
                    l = r.extensions[this.name];
                  ((t.thickness = void 0 !== l.thicknessFactor ? l.thicknessFactor : 0),
                    void 0 !== l.thicknessTexture && o.push(n.assignTexture(t, "thicknessMap", l.thicknessTexture)),
                    (t.attenuationDistance = l.attenuationDistance || 0));
                  var c = l.attenuationColor || [1, 1, 1];
                  return ((t.attenuationTint = new ae.Color(c[0], c[1], c[2])), Promise.all(o));
                },
              },
            ]),
            e
          );
        })(),
        Ft = (function () {
          function e(t) {
            (Object(Ye.a)(this, e), (this.parser = t), (this.name = Rt.KHR_MATERIALS_IOR));
          }
          return (
            Object(Xe.a)(e, [
              {
                key: "getMaterialType",
                value: function (e) {
                  var t = this.parser.json.materials[e];
                  return t.extensions && t.extensions[this.name] ? ae.MeshPhysicalMaterial : null;
                },
              },
              {
                key: "extendMaterialParams",
                value: function (e, t) {
                  var n = this.parser.json.materials[e];
                  if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
                  var r = n.extensions[this.name];
                  return ((t.ior = void 0 !== r.ior ? r.ior : 1.5), Promise.resolve());
                },
              },
            ]),
            e
          );
        })(),
        Bt = (function () {
          function e(t) {
            (Object(Ye.a)(this, e), (this.parser = t), (this.name = Rt.KHR_MATERIALS_SPECULAR));
          }
          return (
            Object(Xe.a)(e, [
              {
                key: "getMaterialType",
                value: function (e) {
                  var t = this.parser.json.materials[e];
                  return t.extensions && t.extensions[this.name] ? ae.MeshPhysicalMaterial : null;
                },
              },
              {
                key: "extendMaterialParams",
                value: function (e, t) {
                  var n = this.parser,
                    r = n.json.materials[e];
                  if (!r.extensions || !r.extensions[this.name]) return Promise.resolve();
                  var o = [],
                    l = r.extensions[this.name];
                  ((t.specularIntensity = void 0 !== l.specularFactor ? l.specularFactor : 1),
                    void 0 !== l.specularTexture &&
                      o.push(n.assignTexture(t, "specularIntensityMap", l.specularTexture)));
                  var c = l.specularColorFactor || [1, 1, 1];
                  return (
                    (t.specularTint = new ae.Color(c[0], c[1], c[2])),
                    void 0 !== l.specularColorTexture &&
                      o.push(
                        n.assignTexture(t, "specularTintMap", l.specularColorTexture).then(function (e) {
                          e.encoding = ae.sRGBEncoding;
                        }),
                      ),
                    Promise.all(o)
                  );
                },
              },
            ]),
            e
          );
        })(),
        Ut = (function () {
          function e(t) {
            (Object(Ye.a)(this, e), (this.parser = t), (this.name = Rt.KHR_TEXTURE_BASISU));
          }
          return (
            Object(Xe.a)(e, [
              {
                key: "loadTexture",
                value: function (e) {
                  var t = this.parser,
                    n = t.json,
                    r = n.textures[e];
                  if (!r.extensions || !r.extensions[this.name]) return null;
                  var o = r.extensions[this.name],
                    source = n.images[o.source],
                    l = t.options.ktx2Loader;
                  if (!l) {
                    if (n.extensionsRequired && n.extensionsRequired.includes(this.name))
                      throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
                    return null;
                  }
                  return t.loadTextureImage(e, source, l);
                },
              },
            ]),
            e
          );
        })(),
        Nt = (function () {
          function e(t) {
            (Object(Ye.a)(this, e), (this.parser = t), (this.name = Rt.EXT_TEXTURE_WEBP), (this.isSupported = null));
          }
          return (
            Object(Xe.a)(e, [
              {
                key: "loadTexture",
                value: function (e) {
                  var t = this.name,
                    n = this.parser,
                    r = n.json,
                    o = r.textures[e];
                  if (!o.extensions || !o.extensions[t]) return null;
                  var l = o.extensions[t],
                    source = r.images[l.source],
                    c = n.textureLoader;
                  if (source.uri) {
                    var h = n.options.manager.getHandler(source.uri);
                    null !== h && (c = h);
                  }
                  return this.detectSupport().then(function (o) {
                    if (o) return n.loadTextureImage(e, source, c);
                    if (r.extensionsRequired && r.extensionsRequired.includes(t))
                      throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
                    return n.loadTexture(e);
                  });
                },
              },
              {
                key: "detectSupport",
                value: function () {
                  return (
                    this.isSupported ||
                      (this.isSupported = new Promise(function (e) {
                        var image = new Image();
                        ((image.src =
                          "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA"),
                          (image.onload = image.onerror =
                            function () {
                              e(1 === image.height);
                            }));
                      })),
                    this.isSupported
                  );
                },
              },
            ]),
            e
          );
        })(),
        zt = (function () {
          function e(t) {
            (Object(Ye.a)(this, e), (this.name = Rt.EXT_MESHOPT_COMPRESSION), (this.parser = t));
          }
          return (
            Object(Xe.a)(e, [
              {
                key: "loadBufferView",
                value: function (e) {
                  var t = this.parser.json,
                    n = t.bufferViews[e];
                  if (n.extensions && n.extensions[this.name]) {
                    var r = n.extensions[this.name],
                      o = this.parser.getDependency("buffer", r.buffer),
                      l = this.parser.options.meshoptDecoder;
                    if (!l || !l.supported) {
                      if (t.extensionsRequired && t.extensionsRequired.includes(this.name))
                        throw new Error(
                          "THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files",
                        );
                      return null;
                    }
                    return Promise.all([o, l.ready]).then(function (e) {
                      var t = r.byteOffset || 0,
                        n = r.byteLength || 0,
                        o = r.count,
                        c = r.byteStride,
                        h = new ArrayBuffer(o * c),
                        source = new Uint8Array(e[0], t, n);
                      return (l.decodeGltfBuffer(new Uint8Array(h), o, c, source, r.mode, r.filter), h);
                    });
                  }
                  return null;
                },
              },
            ]),
            e
          );
        })(),
        Gt = "glTF",
        Ht = 1313821514,
        Vt = 5130562,
        Wt = function e(data) {
          (Object(Ye.a)(this, e), (this.name = Rt.KHR_BINARY_GLTF), (this.content = null), (this.body = null));
          var t = new DataView(data, 0, 12);
          if (
            ((this.header = {
              magic: ae.LoaderUtils.decodeText(new Uint8Array(data.slice(0, 4))),
              version: t.getUint32(4, !0),
              length: t.getUint32(8, !0),
            }),
            this.header.magic !== Gt)
          )
            throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
          if (this.header.version < 2) throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
          for (var n = this.header.length - 12, r = new DataView(data, 12), o = 0; o < n;) {
            var l = r.getUint32(o, !0);
            o += 4;
            var c = r.getUint32(o, !0);
            if (((o += 4), c === Ht)) {
              var h = new Uint8Array(data, 12 + o, l);
              this.content = ae.LoaderUtils.decodeText(h);
            } else if (c === Vt) {
              var d = 12 + o;
              this.body = data.slice(d, d + l);
            }
            o += l;
          }
          if (null === this.content) throw new Error("THREE.GLTFLoader: JSON content not found.");
        },
        $t = (function () {
          function e(t, n) {
            if ((Object(Ye.a)(this, e), !n)) throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
            ((this.name = Rt.KHR_DRACO_MESH_COMPRESSION),
              (this.json = t),
              (this.dracoLoader = n),
              this.dracoLoader.preload());
          }
          return (
            Object(Xe.a)(e, [
              {
                key: "decodePrimitive",
                value: function (e, t) {
                  var n = this.json,
                    r = this.dracoLoader,
                    o = e.extensions[this.name].bufferView,
                    l = e.extensions[this.name].attributes,
                    c = {},
                    h = {},
                    d = {};
                  for (var f in l) {
                    var m = dn[f] || f.toLowerCase();
                    c[m] = l[f];
                  }
                  for (var v in e.attributes) {
                    var _ = dn[v] || v.toLowerCase();
                    if (void 0 !== l[v]) {
                      var y = n.accessors[e.attributes[v]],
                        x = ln[y.componentType];
                      ((d[_] = x), (h[_] = !0 === y.normalized));
                    }
                  }
                  return t.getDependency("bufferView", o).then(function (e) {
                    return new Promise(function (t) {
                      r.decodeDracoFile(
                        e,
                        function (e) {
                          for (var n in e.attributes) {
                            var r = e.attributes[n],
                              o = h[n];
                            void 0 !== o && (r.normalized = o);
                          }
                          t(e);
                        },
                        c,
                        d,
                      );
                    });
                  });
                },
              },
            ]),
            e
          );
        })(),
        qt = (function () {
          function e() {
            (Object(Ye.a)(this, e), (this.name = Rt.KHR_TEXTURE_TRANSFORM));
          }
          return (
            Object(Xe.a)(e, [
              {
                key: "extendTexture",
                value: function (e, t) {
                  return (
                    void 0 !== t.texCoord &&
                      console.warn(
                        'THREE.GLTFLoader: Custom UV sets in "' + this.name + '" extension not yet supported.',
                      ),
                    (void 0 === t.offset && void 0 === t.rotation && void 0 === t.scale) ||
                      ((e = e.clone()),
                      void 0 !== t.offset && e.offset.fromArray(t.offset),
                      void 0 !== t.rotation && (e.rotation = t.rotation),
                      void 0 !== t.scale && e.repeat.fromArray(t.scale),
                      (e.needsUpdate = !0)),
                    e
                  );
                },
              },
            ]),
            e
          );
        })(),
        Yt = (function (e) {
          Object(Ke.a)(n, e);
          var t = Mt(n);
          function n(e) {
            var r;
            (Object(Ye.a)(this, n), ((r = t.call(this)).isGLTFSpecularGlossinessMaterial = !0));
            var o = ["#ifdef USE_SPECULARMAP", "\tuniform sampler2D specularMap;", "#endif"].join("\n"),
              l = ["#ifdef USE_GLOSSINESSMAP", "\tuniform sampler2D glossinessMap;", "#endif"].join("\n"),
              c = [
                "vec3 specularFactor = specular;",
                "#ifdef USE_SPECULARMAP",
                "\tvec4 texelSpecular = texture2D( specularMap, vUv );",
                "\ttexelSpecular = sRGBToLinear( texelSpecular );",
                "\t// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture",
                "\tspecularFactor *= texelSpecular.rgb;",
                "#endif",
              ].join("\n"),
              h = [
                "float glossinessFactor = glossiness;",
                "#ifdef USE_GLOSSINESSMAP",
                "\tvec4 texelGlossiness = texture2D( glossinessMap, vUv );",
                "\t// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture",
                "\tglossinessFactor *= texelGlossiness.a;",
                "#endif",
              ].join("\n"),
              d = [
                "PhysicalMaterial material;",
                "material.diffuseColor = diffuseColor.rgb * ( 1. - max( specularFactor.r, max( specularFactor.g, specularFactor.b ) ) );",
                "vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );",
                "float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );",
                "material.roughness = max( 1.0 - glossinessFactor, 0.0525 ); // 0.0525 corresponds to the base mip of a 256 cubemap.",
                "material.roughness += geometryRoughness;",
                "material.roughness = min( material.roughness, 1.0 );",
                "material.specularColor = specularFactor;",
              ].join("\n"),
              f = {
                specular: { value: new ae.Color().setHex(16777215) },
                glossiness: { value: 1 },
                specularMap: { value: null },
                glossinessMap: { value: null },
              };
            return (
              (r._extraUniforms = f),
              (r.onBeforeCompile = function (e) {
                for (var t in f) e.uniforms[t] = f[t];
                e.fragmentShader = e.fragmentShader
                  .replace("uniform float roughness;", "uniform vec3 specular;")
                  .replace("uniform float metalness;", "uniform float glossiness;")
                  .replace("#include <roughnessmap_pars_fragment>", o)
                  .replace("#include <metalnessmap_pars_fragment>", l)
                  .replace("#include <roughnessmap_fragment>", c)
                  .replace("#include <metalnessmap_fragment>", h)
                  .replace("#include <lights_physical_fragment>", d);
              }),
              Object.defineProperties(Object(Ct.a)(r), {
                specular: {
                  get: function () {
                    return f.specular.value;
                  },
                  set: function (e) {
                    f.specular.value = e;
                  },
                },
                specularMap: {
                  get: function () {
                    return f.specularMap.value;
                  },
                  set: function (e) {
                    ((f.specularMap.value = e),
                      e ? (this.defines.USE_SPECULARMAP = "") : delete this.defines.USE_SPECULARMAP);
                  },
                },
                glossiness: {
                  get: function () {
                    return f.glossiness.value;
                  },
                  set: function (e) {
                    f.glossiness.value = e;
                  },
                },
                glossinessMap: {
                  get: function () {
                    return f.glossinessMap.value;
                  },
                  set: function (e) {
                    ((f.glossinessMap.value = e),
                      e
                        ? ((this.defines.USE_GLOSSINESSMAP = ""), (this.defines.USE_UV = ""))
                        : (delete this.defines.USE_GLOSSINESSMAP, delete this.defines.USE_UV));
                  },
                },
              }),
              delete r.metalness,
              delete r.roughness,
              delete r.metalnessMap,
              delete r.roughnessMap,
              r.setValues(e),
              r
            );
          }
          return (
            Object(Xe.a)(n, [
              {
                key: "copy",
                value: function (source) {
                  return (
                    Object(Ot.a)(Object(Ze.a)(n.prototype), "copy", this).call(this, source),
                    (this.specularMap = source.specularMap),
                    this.specular.copy(source.specular),
                    (this.glossinessMap = source.glossinessMap),
                    (this.glossiness = source.glossiness),
                    delete this.metalness,
                    delete this.roughness,
                    delete this.metalnessMap,
                    delete this.roughnessMap,
                    this
                  );
                },
              },
            ]),
            n
          );
        })(ae.MeshStandardMaterial),
        Xt = (function () {
          function e() {
            (Object(Ye.a)(this, e),
              (this.name = Rt.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS),
              (this.specularGlossinessParams = [
                "color",
                "map",
                "lightMap",
                "lightMapIntensity",
                "aoMap",
                "aoMapIntensity",
                "emissive",
                "emissiveIntensity",
                "emissiveMap",
                "bumpMap",
                "bumpScale",
                "normalMap",
                "normalMapType",
                "displacementMap",
                "displacementScale",
                "displacementBias",
                "specularMap",
                "specular",
                "glossinessMap",
                "glossiness",
                "alphaMap",
                "envMap",
                "envMapIntensity",
                "refractionRatio",
              ]));
          }
          return (
            Object(Xe.a)(e, [
              {
                key: "getMaterialType",
                value: function () {
                  return Yt;
                },
              },
              {
                key: "extendParams",
                value: function (e, t, n) {
                  var r = t.extensions[this.name];
                  ((e.color = new ae.Color(1, 1, 1)), (e.opacity = 1));
                  var o = [];
                  if (Array.isArray(r.diffuseFactor)) {
                    var l = r.diffuseFactor;
                    (e.color.fromArray(l), (e.opacity = l[3]));
                  }
                  if (
                    (void 0 !== r.diffuseTexture && o.push(n.assignTexture(e, "map", r.diffuseTexture)),
                    (e.emissive = new ae.Color(0, 0, 0)),
                    (e.glossiness = void 0 !== r.glossinessFactor ? r.glossinessFactor : 1),
                    (e.specular = new ae.Color(1, 1, 1)),
                    Array.isArray(r.specularFactor) && e.specular.fromArray(r.specularFactor),
                    void 0 !== r.specularGlossinessTexture)
                  ) {
                    var c = r.specularGlossinessTexture;
                    (o.push(n.assignTexture(e, "glossinessMap", c)), o.push(n.assignTexture(e, "specularMap", c)));
                  }
                  return Promise.all(o);
                },
              },
              {
                key: "createMaterial",
                value: function (e) {
                  var t = new Yt(e);
                  return (
                    (t.fog = !0),
                    (t.color = e.color),
                    (t.map = void 0 === e.map ? null : e.map),
                    (t.lightMap = null),
                    (t.lightMapIntensity = 1),
                    (t.aoMap = void 0 === e.aoMap ? null : e.aoMap),
                    (t.aoMapIntensity = 1),
                    (t.emissive = e.emissive),
                    (t.emissiveIntensity = 1),
                    (t.emissiveMap = void 0 === e.emissiveMap ? null : e.emissiveMap),
                    (t.bumpMap = void 0 === e.bumpMap ? null : e.bumpMap),
                    (t.bumpScale = 1),
                    (t.normalMap = void 0 === e.normalMap ? null : e.normalMap),
                    (t.normalMapType = ae.TangentSpaceNormalMap),
                    e.normalScale && (t.normalScale = e.normalScale),
                    (t.displacementMap = null),
                    (t.displacementScale = 1),
                    (t.displacementBias = 0),
                    (t.specularMap = void 0 === e.specularMap ? null : e.specularMap),
                    (t.specular = e.specular),
                    (t.glossinessMap = void 0 === e.glossinessMap ? null : e.glossinessMap),
                    (t.glossiness = e.glossiness),
                    (t.alphaMap = null),
                    (t.envMap = void 0 === e.envMap ? null : e.envMap),
                    (t.envMapIntensity = 1),
                    (t.refractionRatio = 0.98),
                    t
                  );
                },
              },
            ]),
            e
          );
        })(),
        Kt = function e() {
          (Object(Ye.a)(this, e), (this.name = Rt.KHR_MESH_QUANTIZATION));
        },
        Qt = (function (e) {
          Object(Ke.a)(n, e);
          var t = Mt(n);
          function n(e, r, o, l) {
            return (Object(Ye.a)(this, n), t.call(this, e, r, o, l));
          }
          return (
            Object(Xe.a)(n, [
              {
                key: "copySampleValue_",
                value: function (e) {
                  for (
                    var t = this.resultBuffer, n = this.sampleValues, r = this.valueSize, o = e * r * 3 + r, i = 0;
                    i !== r;
                    i++
                  )
                    t[i] = n[o + i];
                  return t;
                },
              },
            ]),
            n
          );
        })(ae.Interpolant);
      ((Qt.prototype.beforeStart_ = Qt.prototype.copySampleValue_),
        (Qt.prototype.afterEnd_ = Qt.prototype.copySampleValue_),
        (Qt.prototype.interpolate_ = function (e, t, n, r) {
          for (
            var o = this.resultBuffer,
              l = this.sampleValues,
              c = this.valueSize,
              h = 2 * c,
              d = 3 * c,
              td = r - t,
              p = (n - t) / td,
              f = p * p,
              m = f * p,
              v = e * d,
              _ = v - d,
              y = -2 * m + 3 * f,
              x = m - f,
              w = 1 - y,
              S = x - f + p,
              i = 0;
            i !== c;
            i++
          ) {
            var C = l[_ + i + c],
              O = l[_ + i + h] * td,
              L = l[v + i + c],
              k = l[v + i] * td;
            o[i] = w * C + S * O + y * L + x * k;
          }
          return o;
        }));
      var Zt = new ae.Quaternion(),
        Jt = (function (e) {
          Object(Ke.a)(n, e);
          var t = Mt(n);
          function n() {
            return (Object(Ye.a)(this, n), t.apply(this, arguments));
          }
          return (
            Object(Xe.a)(n, [
              {
                key: "interpolate_",
                value: function (e, t, r, o) {
                  var l = Object(Ot.a)(Object(Ze.a)(n.prototype), "interpolate_", this).call(this, e, t, r, o);
                  return (Zt.fromArray(l).normalize().toArray(l), l);
                },
              },
            ]),
            n
          );
        })(Qt),
        en = 0,
        tn = 1,
        nn = 2,
        rn = 3,
        an = 4,
        on = 5,
        sn = 6,
        ln = {
          5120: Int8Array,
          5121: Uint8Array,
          5122: Int16Array,
          5123: Uint16Array,
          5125: Uint32Array,
          5126: Float32Array,
        },
        un = {
          9728: ae.NearestFilter,
          9729: ae.LinearFilter,
          9984: ae.NearestMipmapNearestFilter,
          9985: ae.LinearMipmapNearestFilter,
          9986: ae.NearestMipmapLinearFilter,
          9987: ae.LinearMipmapLinearFilter,
        },
        cn = { 33071: ae.ClampToEdgeWrapping, 33648: ae.MirroredRepeatWrapping, 10497: ae.RepeatWrapping },
        hn = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT2: 4, MAT3: 9, MAT4: 16 },
        dn = {
          POSITION: "position",
          NORMAL: "normal",
          TANGENT: "tangent",
          TEXCOORD_0: "uv",
          TEXCOORD_1: "uv2",
          COLOR_0: "color",
          WEIGHTS_0: "skinWeight",
          JOINTS_0: "skinIndex",
        },
        fn = { scale: "scale", translation: "position", rotation: "quaternion", weights: "morphTargetInfluences" },
        mn = { CUBICSPLINE: void 0, LINEAR: ae.InterpolateLinear, STEP: ae.InterpolateDiscrete },
        pn = "OPAQUE",
        gn = "MASK",
        vn = "BLEND";
      function _n(e, path) {
        return "string" != typeof e || "" === e
          ? ""
          : (/^https?:\/\//i.test(path) && /^\//.test(e) && (path = path.replace(/(^https?:\/\/[^\/]+).*/i, "$1")),
            /^(https?:)?\/\//i.test(e) || /^data:.*,.*$/i.test(e) || /^blob:.*$/i.test(e) ? e : path + e);
      }
      function yn(e, object, t) {
        for (var n in t.extensions)
          void 0 === e[n] &&
            ((object.userData.gltfExtensions = object.userData.gltfExtensions || {}),
            (object.userData.gltfExtensions[n] = t.extensions[n]));
      }
      function bn(object, e) {
        void 0 !== e.extras &&
          ("object" === Object(_t.a)(e.extras)
            ? Object.assign(object.userData, e.extras)
            : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + e.extras));
      }
      function xn(e, t) {
        if ((e.updateMorphTargets(), void 0 !== t.weights))
          for (var i = 0, n = t.weights.length; i < n; i++) e.morphTargetInfluences[i] = t.weights[i];
        if (t.extras && Array.isArray(t.extras.targetNames)) {
          var r = t.extras.targetNames;
          if (e.morphTargetInfluences.length === r.length) {
            e.morphTargetDictionary = {};
            for (var o = 0, l = r.length; o < l; o++) e.morphTargetDictionary[r[o]] = o;
          } else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
        }
      }
      function wn(e) {
        for (var t = "", n = Object.keys(e).sort(), i = 0, r = n.length; i < r; i++) t += n[i] + ":" + e[n[i]] + ";";
        return t;
      }
      function Sn(e) {
        switch (e) {
          case Int8Array:
            return 1 / 127;
          case Uint8Array:
            return 1 / 255;
          case Int16Array:
            return 1 / 32767;
          case Uint16Array:
            return 1 / 65535;
          default:
            throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
        }
      }
      var Cn = (function () {
        function e() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          (Object(Ye.a)(this, e),
            (this.json = t),
            (this.extensions = {}),
            (this.plugins = {}),
            (this.options = n),
            (this.cache = new Pt()),
            (this.associations = new Map()),
            (this.primitiveCache = {}),
            (this.meshCache = { refs: {}, uses: {} }),
            (this.cameraCache = { refs: {}, uses: {} }),
            (this.lightCache = { refs: {}, uses: {} }),
            (this.textureCache = {}),
            (this.nodeNamesUsed = {}),
            "undefined" != typeof createImageBitmap && !1 === /Firefox/.test(navigator.userAgent)
              ? (this.textureLoader = new ae.ImageBitmapLoader(this.options.manager))
              : (this.textureLoader = new ae.TextureLoader(this.options.manager)),
            this.textureLoader.setCrossOrigin(this.options.crossOrigin),
            this.textureLoader.setRequestHeader(this.options.requestHeader),
            (this.fileLoader = new ae.FileLoader(this.options.manager)),
            this.fileLoader.setResponseType("arraybuffer"),
            "use-credentials" === this.options.crossOrigin && this.fileLoader.setWithCredentials(!0));
        }
        return (
          Object(Xe.a)(e, [
            {
              key: "setExtensions",
              value: function (e) {
                this.extensions = e;
              },
            },
            {
              key: "setPlugins",
              value: function (e) {
                this.plugins = e;
              },
            },
            {
              key: "parse",
              value: function (e, t) {
                var n = this,
                  r = this.json,
                  o = this.extensions;
                (this.cache.removeAll(),
                  this._invokeAll(function (e) {
                    return e._markDefs && e._markDefs();
                  }),
                  Promise.all(
                    this._invokeAll(function (e) {
                      return e.beforeRoot && e.beforeRoot();
                    }),
                  )
                    .then(function () {
                      return Promise.all([
                        n.getDependencies("scene"),
                        n.getDependencies("animation"),
                        n.getDependencies("camera"),
                      ]);
                    })
                    .then(function (t) {
                      var l = {
                        scene: t[0][r.scene || 0],
                        scenes: t[0],
                        animations: t[1],
                        cameras: t[2],
                        asset: r.asset,
                        parser: n,
                        userData: {},
                      };
                      (yn(o, l, r),
                        bn(l, r),
                        Promise.all(
                          n._invokeAll(function (e) {
                            return e.afterRoot && e.afterRoot(l);
                          }),
                        ).then(function () {
                          e(l);
                        }));
                    })
                    .catch(t));
              },
            },
            {
              key: "_markDefs",
              value: function () {
                for (
                  var e = this.json.nodes || [],
                    t = this.json.skins || [],
                    n = this.json.meshes || [],
                    r = 0,
                    o = t.length;
                  r < o;
                  r++
                )
                  for (var l = t[r].joints, i = 0, c = l.length; i < c; i++) e[l[i]].isBone = !0;
                for (var h = 0, d = e.length; h < d; h++) {
                  var f = e[h];
                  (void 0 !== f.mesh &&
                    (this._addNodeRef(this.meshCache, f.mesh), void 0 !== f.skin && (n[f.mesh].isSkinnedMesh = !0)),
                    void 0 !== f.camera && this._addNodeRef(this.cameraCache, f.camera));
                }
              },
            },
            {
              key: "_addNodeRef",
              value: function (e, t) {
                void 0 !== t && (void 0 === e.refs[t] && (e.refs[t] = e.uses[t] = 0), e.refs[t]++);
              },
            },
            {
              key: "_getNodeRef",
              value: function (e, t, object) {
                var n = this;
                if (e.refs[t] <= 1) return object;
                var r = object.clone();
                return (
                  (function e(t, r) {
                    var o = n.associations.get(t);
                    null != o && n.associations.set(r, o);
                    var l,
                      c = Lt(t.children.entries());
                    try {
                      for (c.s(); !(l = c.n()).done;) {
                        var h = Object(Q.a)(l.value, 2),
                          i = h[0];
                        e(h[1], r.children[i]);
                      }
                    } catch (e) {
                      c.e(e);
                    } finally {
                      c.f();
                    }
                  })(object, r),
                  (r.name += "_instance_" + e.uses[t]++),
                  r
                );
              },
            },
            {
              key: "_invokeOne",
              value: function (e) {
                var t = Object.values(this.plugins);
                t.push(this);
                for (var i = 0; i < t.length; i++) {
                  var n = e(t[i]);
                  if (n) return n;
                }
                return null;
              },
            },
            {
              key: "_invokeAll",
              value: function (e) {
                var t = Object.values(this.plugins);
                t.unshift(this);
                for (var n = [], i = 0; i < t.length; i++) {
                  var r = e(t[i]);
                  r && n.push(r);
                }
                return n;
              },
            },
            {
              key: "getDependency",
              value: function (e, t) {
                var n = e + ":" + t,
                  r = this.cache.get(n);
                if (!r) {
                  switch (e) {
                    case "scene":
                      r = this.loadScene(t);
                      break;
                    case "node":
                      r = this.loadNode(t);
                      break;
                    case "mesh":
                      r = this._invokeOne(function (e) {
                        return e.loadMesh && e.loadMesh(t);
                      });
                      break;
                    case "accessor":
                      r = this.loadAccessor(t);
                      break;
                    case "bufferView":
                      r = this._invokeOne(function (e) {
                        return e.loadBufferView && e.loadBufferView(t);
                      });
                      break;
                    case "buffer":
                      r = this.loadBuffer(t);
                      break;
                    case "material":
                      r = this._invokeOne(function (e) {
                        return e.loadMaterial && e.loadMaterial(t);
                      });
                      break;
                    case "texture":
                      r = this._invokeOne(function (e) {
                        return e.loadTexture && e.loadTexture(t);
                      });
                      break;
                    case "skin":
                      r = this.loadSkin(t);
                      break;
                    case "animation":
                      r = this.loadAnimation(t);
                      break;
                    case "camera":
                      r = this.loadCamera(t);
                      break;
                    default:
                      throw new Error("Unknown type: " + e);
                  }
                  this.cache.add(n, r);
                }
                return r;
              },
            },
            {
              key: "getDependencies",
              value: function (e) {
                var t = this.cache.get(e);
                if (!t) {
                  var n = this,
                    defs = this.json[e + ("mesh" === e ? "es" : "s")] || [];
                  ((t = Promise.all(
                    defs.map(function (t, r) {
                      return n.getDependency(e, r);
                    }),
                  )),
                    this.cache.add(e, t));
                }
                return t;
              },
            },
            {
              key: "loadBuffer",
              value: function (e) {
                var t = this.json.buffers[e],
                  n = this.fileLoader;
                if (t.type && "arraybuffer" !== t.type)
                  throw new Error("THREE.GLTFLoader: " + t.type + " buffer type is not supported.");
                if (void 0 === t.uri && 0 === e) return Promise.resolve(this.extensions[Rt.KHR_BINARY_GLTF].body);
                var r = this.options;
                return new Promise(function (e, o) {
                  n.load(_n(t.uri, r.path), e, void 0, function () {
                    o(new Error('THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".'));
                  });
                });
              },
            },
            {
              key: "loadBufferView",
              value: function (e) {
                var t = this.json.bufferViews[e];
                return this.getDependency("buffer", t.buffer).then(function (e) {
                  var n = t.byteLength || 0,
                    r = t.byteOffset || 0;
                  return e.slice(r, r + n);
                });
              },
            },
            {
              key: "loadAccessor",
              value: function (e) {
                var t = this,
                  n = this.json,
                  r = this.json.accessors[e];
                if (void 0 === r.bufferView && void 0 === r.sparse) return Promise.resolve(null);
                var o = [];
                return (
                  void 0 !== r.bufferView ? o.push(this.getDependency("bufferView", r.bufferView)) : o.push(null),
                  void 0 !== r.sparse &&
                    (o.push(this.getDependency("bufferView", r.sparse.indices.bufferView)),
                    o.push(this.getDependency("bufferView", r.sparse.values.bufferView))),
                  Promise.all(o).then(function (e) {
                    var o,
                      l,
                      c = e[0],
                      h = hn[r.type],
                      d = ln[r.componentType],
                      f = d.BYTES_PER_ELEMENT,
                      m = f * h,
                      v = r.byteOffset || 0,
                      _ = void 0 !== r.bufferView ? n.bufferViews[r.bufferView].byteStride : void 0,
                      y = !0 === r.normalized;
                    if (_ && _ !== m) {
                      var x = Math.floor(v / _),
                        w = "InterleavedBuffer:" + r.bufferView + ":" + r.componentType + ":" + x + ":" + r.count,
                        S = t.cache.get(w);
                      (S ||
                        ((o = new d(c, x * _, (r.count * _) / f)),
                        (S = new ae.InterleavedBuffer(o, _ / f)),
                        t.cache.add(w, S)),
                        (l = new ae.InterleavedBufferAttribute(S, h, (v % _) / f, y)));
                    } else
                      ((o = null === c ? new d(r.count * h) : new d(c, v, r.count * h)),
                        (l = new ae.BufferAttribute(o, h, y)));
                    if (void 0 !== r.sparse) {
                      var C = hn.SCALAR,
                        O = ln[r.sparse.indices.componentType],
                        L = r.sparse.indices.byteOffset || 0,
                        k = r.sparse.values.byteOffset || 0,
                        M = new O(e[1], L, r.sparse.count * C),
                        T = new d(e[2], k, r.sparse.count * h);
                      null !== c && (l = new ae.BufferAttribute(l.array.slice(), l.itemSize, l.normalized));
                      for (var i = 0, P = M.length; i < P; i++) {
                        var R = M[i];
                        if (
                          (l.setX(R, T[i * h]),
                          h >= 2 && l.setY(R, T[i * h + 1]),
                          h >= 3 && l.setZ(R, T[i * h + 2]),
                          h >= 4 && l.setW(R, T[i * h + 3]),
                          h >= 5)
                        )
                          throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
                      }
                    }
                    return l;
                  })
                );
              },
            },
            {
              key: "loadTexture",
              value: function (e) {
                var t = this.json,
                  n = this.options,
                  r = t.textures[e],
                  source = t.images[r.source],
                  o = this.textureLoader;
                if (source.uri) {
                  var l = n.manager.getHandler(source.uri);
                  null !== l && (o = l);
                }
                return this.loadTextureImage(e, source, o);
              },
            },
            {
              key: "loadTextureImage",
              value: function (e, source, t) {
                var n = this,
                  r = this.json,
                  o = this.options,
                  l = r.textures[e],
                  c = (source.uri || source.bufferView) + ":" + l.sampler;
                if (this.textureCache[c]) return this.textureCache[c];
                var h = self.URL || self.webkitURL,
                  d = source.uri || "",
                  f = !1;
                if (void 0 !== source.bufferView)
                  d = n.getDependency("bufferView", source.bufferView).then(function (e) {
                    f = !0;
                    var t = new Blob([e], { type: source.mimeType });
                    return (d = h.createObjectURL(t));
                  });
                else if (void 0 === source.uri)
                  throw new Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView");
                var m = Promise.resolve(d)
                  .then(function (e) {
                    return new Promise(function (n, r) {
                      var l = n;
                      (!0 === t.isImageBitmapLoader &&
                        (l = function (e) {
                          var t = new ae.Texture(e);
                          ((t.needsUpdate = !0), n(t));
                        }),
                        t.load(_n(e, o.path), l, void 0, r));
                    });
                  })
                  .then(function (t) {
                    (!0 === f && h.revokeObjectURL(d), (t.flipY = !1), l.name && (t.name = l.name));
                    var o = (r.samplers || {})[l.sampler] || {};
                    return (
                      (t.magFilter = un[o.magFilter] || ae.LinearFilter),
                      (t.minFilter = un[o.minFilter] || ae.LinearMipmapLinearFilter),
                      (t.wrapS = cn[o.wrapS] || ae.RepeatWrapping),
                      (t.wrapT = cn[o.wrapT] || ae.RepeatWrapping),
                      n.associations.set(t, { textures: e }),
                      t
                    );
                  })
                  .catch(function () {
                    return (console.error("THREE.GLTFLoader: Couldn't load texture", d), null);
                  });
                return ((this.textureCache[c] = m), m);
              },
            },
            {
              key: "assignTexture",
              value: function (e, t, n) {
                var r = this;
                return this.getDependency("texture", n.index).then(function (o) {
                  if (
                    (void 0 === n.texCoord ||
                      0 == n.texCoord ||
                      ("aoMap" === t && 1 == n.texCoord) ||
                      console.warn(
                        "THREE.GLTFLoader: Custom UV set " + n.texCoord + " for texture " + t + " not yet supported.",
                      ),
                    r.extensions[Rt.KHR_TEXTURE_TRANSFORM])
                  ) {
                    var l = void 0 !== n.extensions ? n.extensions[Rt.KHR_TEXTURE_TRANSFORM] : void 0;
                    if (l) {
                      var c = r.associations.get(o);
                      ((o = r.extensions[Rt.KHR_TEXTURE_TRANSFORM].extendTexture(o, l)), r.associations.set(o, c));
                    }
                  }
                  return ((e[t] = o), o);
                });
              },
            },
            {
              key: "assignFinalMaterial",
              value: function (e) {
                var t = e.geometry,
                  n = e.material,
                  r = void 0 === t.attributes.tangent,
                  o = void 0 !== t.attributes.color,
                  l = void 0 === t.attributes.normal;
                if (e.isPoints) {
                  var c = "PointsMaterial:" + n.uuid,
                    h = this.cache.get(c);
                  (h ||
                    ((h = new ae.PointsMaterial()),
                    ae.Material.prototype.copy.call(h, n),
                    h.color.copy(n.color),
                    (h.map = n.map),
                    (h.sizeAttenuation = !1),
                    this.cache.add(c, h)),
                    (n = h));
                } else if (e.isLine) {
                  var d = "LineBasicMaterial:" + n.uuid,
                    f = this.cache.get(d);
                  (f ||
                    ((f = new ae.LineBasicMaterial()),
                    ae.Material.prototype.copy.call(f, n),
                    f.color.copy(n.color),
                    this.cache.add(d, f)),
                    (n = f));
                }
                if (r || o || l) {
                  var m = "ClonedMaterial:" + n.uuid + ":";
                  (n.isGLTFSpecularGlossinessMaterial && (m += "specular-glossiness:"),
                    r && (m += "derivative-tangents:"),
                    o && (m += "vertex-colors:"),
                    l && (m += "flat-shading:"));
                  var v = this.cache.get(m);
                  (v ||
                    ((v = n.clone()),
                    o && (v.vertexColors = !0),
                    l && (v.flatShading = !0),
                    r &&
                      (v.normalScale && (v.normalScale.y *= -1),
                      v.clearcoatNormalScale && (v.clearcoatNormalScale.y *= -1)),
                    this.cache.add(m, v),
                    this.associations.set(v, this.associations.get(n))),
                    (n = v));
                }
                (n.aoMap &&
                  void 0 === t.attributes.uv2 &&
                  void 0 !== t.attributes.uv &&
                  t.setAttribute("uv2", t.attributes.uv),
                  (e.material = n));
              },
            },
            {
              key: "getMaterialType",
              value: function () {
                return ae.MeshStandardMaterial;
              },
            },
            {
              key: "loadMaterial",
              value: function (e) {
                var t,
                  n = this,
                  r = this.json,
                  o = this.extensions,
                  l = r.materials[e],
                  c = {},
                  h = l.extensions || {},
                  d = [];
                if (h[Rt.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS]) {
                  var f = o[Rt.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS];
                  ((t = f.getMaterialType()), d.push(f.extendParams(c, l, n)));
                } else if (h[Rt.KHR_MATERIALS_UNLIT]) {
                  var m = o[Rt.KHR_MATERIALS_UNLIT];
                  ((t = m.getMaterialType()), d.push(m.extendParams(c, l, n)));
                } else {
                  var v = l.pbrMetallicRoughness || {};
                  if (((c.color = new ae.Color(1, 1, 1)), (c.opacity = 1), Array.isArray(v.baseColorFactor))) {
                    var _ = v.baseColorFactor;
                    (c.color.fromArray(_), (c.opacity = _[3]));
                  }
                  (void 0 !== v.baseColorTexture && d.push(n.assignTexture(c, "map", v.baseColorTexture)),
                    (c.metalness = void 0 !== v.metallicFactor ? v.metallicFactor : 1),
                    (c.roughness = void 0 !== v.roughnessFactor ? v.roughnessFactor : 1),
                    void 0 !== v.metallicRoughnessTexture &&
                      (d.push(n.assignTexture(c, "metalnessMap", v.metallicRoughnessTexture)),
                      d.push(n.assignTexture(c, "roughnessMap", v.metallicRoughnessTexture))),
                    (t = this._invokeOne(function (t) {
                      return t.getMaterialType && t.getMaterialType(e);
                    })),
                    d.push(
                      Promise.all(
                        this._invokeAll(function (t) {
                          return t.extendMaterialParams && t.extendMaterialParams(e, c);
                        }),
                      ),
                    ));
                }
                !0 === l.doubleSided && (c.side = ae.DoubleSide);
                var y = l.alphaMode || pn;
                if (
                  (y === vn
                    ? ((c.transparent = !0), (c.depthWrite = !1))
                    : ((c.format = ae.RGBFormat),
                      (c.transparent = !1),
                      y === gn && (c.alphaTest = void 0 !== l.alphaCutoff ? l.alphaCutoff : 0.5)),
                  void 0 !== l.normalTexture &&
                    t !== ae.MeshBasicMaterial &&
                    (d.push(n.assignTexture(c, "normalMap", l.normalTexture)),
                    (c.normalScale = new ae.Vector2(1, 1)),
                    void 0 !== l.normalTexture.scale))
                ) {
                  var x = l.normalTexture.scale;
                  c.normalScale.set(x, x);
                }
                return (
                  void 0 !== l.occlusionTexture &&
                    t !== ae.MeshBasicMaterial &&
                    (d.push(n.assignTexture(c, "aoMap", l.occlusionTexture)),
                    void 0 !== l.occlusionTexture.strength && (c.aoMapIntensity = l.occlusionTexture.strength)),
                  void 0 !== l.emissiveFactor &&
                    t !== ae.MeshBasicMaterial &&
                    (c.emissive = new ae.Color().fromArray(l.emissiveFactor)),
                  void 0 !== l.emissiveTexture &&
                    t !== ae.MeshBasicMaterial &&
                    d.push(n.assignTexture(c, "emissiveMap", l.emissiveTexture)),
                  Promise.all(d).then(function () {
                    var r;
                    return (
                      c && c.format && delete c.format,
                      (r = t === Yt ? o[Rt.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].createMaterial(c) : new t(c)),
                      l.name && (r.name = l.name),
                      r.map && (r.map.encoding = ae.sRGBEncoding),
                      r.emissiveMap && (r.emissiveMap.encoding = ae.sRGBEncoding),
                      bn(r, l),
                      n.associations.set(r, { materials: e }),
                      l.extensions && yn(o, r, l),
                      r
                    );
                  })
                );
              },
            },
            {
              key: "createUniqueName",
              value: function (e) {
                for (var t = ae.PropertyBinding.sanitizeNodeName(e || ""), n = t, i = 1; this.nodeNamesUsed[n]; ++i)
                  n = t + "_" + i;
                return ((this.nodeNamesUsed[n] = !0), n);
              },
            },
            {
              key: "loadGeometries",
              value: function (e) {
                var t = this,
                  n = this.extensions,
                  r = this.primitiveCache;
                function o(e) {
                  return n[Rt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e, t).then(function (n) {
                    return Ln(n, e, t);
                  });
                }
                for (var l, c, h = [], i = 0, d = e.length; i < d; i++) {
                  var f = e[i],
                    m =
                      ((c = void 0),
                      (c = (l = f).extensions && l.extensions[Rt.KHR_DRACO_MESH_COMPRESSION])
                        ? "draco:" + c.bufferView + ":" + c.indices + ":" + wn(c.attributes)
                        : l.indices + ":" + wn(l.attributes) + ":" + l.mode),
                    v = r[m];
                  if (v) h.push(v.promise);
                  else {
                    var _ = void 0;
                    ((_ =
                      f.extensions && f.extensions[Rt.KHR_DRACO_MESH_COMPRESSION]
                        ? o(f)
                        : Ln(new ae.BufferGeometry(), f, t)),
                      (r[m] = { primitive: f, promise: _ }),
                      h.push(_));
                  }
                }
                return Promise.all(h);
              },
            },
            {
              key: "loadMesh",
              value: function (e) {
                for (
                  var t,
                    n = this,
                    r = this.json,
                    o = this.extensions,
                    l = r.meshes[e],
                    c = l.primitives,
                    h = [],
                    i = 0,
                    d = c.length;
                  i < d;
                  i++
                ) {
                  var f =
                    void 0 === c[i].material
                      ? (void 0 === (t = this.cache).DefaultMaterial &&
                          (t.DefaultMaterial = new ae.MeshStandardMaterial({
                            color: 16777215,
                            emissive: 0,
                            metalness: 1,
                            roughness: 1,
                            transparent: !1,
                            depthTest: !0,
                            side: ae.FrontSide,
                          })),
                        t.DefaultMaterial)
                      : this.getDependency("material", c[i].material);
                  h.push(f);
                }
                return (
                  h.push(n.loadGeometries(c)),
                  Promise.all(h).then(function (t) {
                    for (
                      var r = t.slice(0, t.length - 1), h = t[t.length - 1], d = [], f = 0, m = h.length;
                      f < m;
                      f++
                    ) {
                      var v = h[f],
                        _ = c[f],
                        y = void 0,
                        x = r[f];
                      if (_.mode === an || _.mode === on || _.mode === sn || void 0 === _.mode)
                        (!0 !==
                          (y = !0 === l.isSkinnedMesh ? new ae.SkinnedMesh(v, x) : new ae.Mesh(v, x)).isSkinnedMesh ||
                          y.geometry.attributes.skinWeight.normalized ||
                          y.normalizeSkinWeights(),
                          _.mode === on
                            ? (y.geometry = kn(y.geometry, ae.TriangleStripDrawMode))
                            : _.mode === sn && (y.geometry = kn(y.geometry, ae.TriangleFanDrawMode)));
                      else if (_.mode === tn) y = new ae.LineSegments(v, x);
                      else if (_.mode === rn) y = new ae.Line(v, x);
                      else if (_.mode === nn) y = new ae.LineLoop(v, x);
                      else {
                        if (_.mode !== en) throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + _.mode);
                        y = new ae.Points(v, x);
                      }
                      (Object.keys(y.geometry.morphAttributes).length > 0 && xn(y, l),
                        (y.name = n.createUniqueName(l.name || "mesh_" + e)),
                        bn(y, l),
                        _.extensions && yn(o, y, _),
                        n.assignFinalMaterial(y),
                        d.push(y));
                    }
                    for (var w = 0, S = d.length; w < S; w++) n.associations.set(d[w], { meshes: e, primitives: w });
                    if (1 === d.length) return d[0];
                    var C = new ae.Group();
                    n.associations.set(C, { meshes: e });
                    for (var O = 0, L = d.length; O < L; O++) C.add(d[O]);
                    return C;
                  })
                );
              },
            },
            {
              key: "loadCamera",
              value: function (e) {
                var t,
                  n = this.json.cameras[e],
                  r = n[n.type];
                if (r)
                  return (
                    "perspective" === n.type
                      ? (t = new ae.PerspectiveCamera(
                          ae.MathUtils.radToDeg(r.yfov),
                          r.aspectRatio || 1,
                          r.znear || 1,
                          r.zfar || 2e6,
                        ))
                      : "orthographic" === n.type &&
                        (t = new ae.OrthographicCamera(-r.xmag, r.xmag, r.ymag, -r.ymag, r.znear, r.zfar)),
                    n.name && (t.name = this.createUniqueName(n.name)),
                    bn(t, n),
                    Promise.resolve(t)
                  );
                console.warn("THREE.GLTFLoader: Missing camera parameters.");
              },
            },
            {
              key: "loadSkin",
              value: function (e) {
                var t = this.json.skins[e],
                  n = { joints: t.joints };
                return void 0 === t.inverseBindMatrices
                  ? Promise.resolve(n)
                  : this.getDependency("accessor", t.inverseBindMatrices).then(function (e) {
                      return ((n.inverseBindMatrices = e), n);
                    });
              },
            },
            {
              key: "loadAnimation",
              value: function (e) {
                for (
                  var t = this.json.animations[e], n = [], r = [], o = [], l = [], c = [], i = 0, h = t.channels.length;
                  i < h;
                  i++
                ) {
                  var d = t.channels[i],
                    f = t.samplers[d.sampler],
                    m = d.target,
                    v = void 0 !== m.node ? m.node : m.id,
                    input = void 0 !== t.parameters ? t.parameters[f.input] : f.input,
                    output = void 0 !== t.parameters ? t.parameters[f.output] : f.output;
                  (n.push(this.getDependency("node", v)),
                    r.push(this.getDependency("accessor", input)),
                    o.push(this.getDependency("accessor", output)),
                    l.push(f),
                    c.push(m));
                }
                return Promise.all([
                  Promise.all(n),
                  Promise.all(r),
                  Promise.all(o),
                  Promise.all(l),
                  Promise.all(c),
                ]).then(function (n) {
                  for (
                    var r = n[0],
                      o = n[1],
                      l = n[2],
                      c = n[3],
                      h = n[4],
                      d = [],
                      f = function (e, t) {
                        var n = r[e],
                          f = o[e],
                          m = l[e],
                          v = c[e],
                          _ = h[e];
                        if (void 0 === n) return "continue";
                        (n.updateMatrix(), (n.matrixAutoUpdate = !0));
                        var y = void 0;
                        switch (fn[_.path]) {
                          case fn.weights:
                            y = ae.NumberKeyframeTrack;
                            break;
                          case fn.rotation:
                            y = ae.QuaternionKeyframeTrack;
                            break;
                          case fn.position:
                          case fn.scale:
                          default:
                            y = ae.VectorKeyframeTrack;
                        }
                        var x = n.name ? n.name : n.uuid,
                          w = void 0 !== v.interpolation ? mn[v.interpolation] : ae.InterpolateLinear,
                          S = [];
                        fn[_.path] === fn.weights
                          ? n.traverse(function (object) {
                              !0 === object.isMesh &&
                                object.morphTargetInfluences &&
                                S.push(object.name ? object.name : object.uuid);
                            })
                          : S.push(x);
                        var C = m.array;
                        if (m.normalized) {
                          for (
                            var O = Sn(C.constructor), L = new Float32Array(C.length), k = 0, M = C.length;
                            k < M;
                            k++
                          )
                            L[k] = C[k] * O;
                          C = L;
                        }
                        for (var T = 0, P = S.length; T < P; T++) {
                          var track = new y(S[T] + "." + fn[_.path], f.array, C, w);
                          ("CUBICSPLINE" === v.interpolation &&
                            ((track.createInterpolant = function (e) {
                              return new (this instanceof ae.QuaternionKeyframeTrack ? Jt : Qt)(
                                this.times,
                                this.values,
                                this.getValueSize() / 3,
                                e,
                              );
                            }),
                            (track.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0)),
                            d.push(track));
                        }
                      },
                      m = 0,
                      v = r.length;
                    m < v;
                    m++
                  )
                    f(m);
                  var _ = t.name ? t.name : "animation_" + e;
                  return new ae.AnimationClip(_, void 0, d);
                });
              },
            },
            {
              key: "createNodeMesh",
              value: function (e) {
                var t = this.json,
                  n = this,
                  r = t.nodes[e];
                return void 0 === r.mesh
                  ? null
                  : n.getDependency("mesh", r.mesh).then(function (e) {
                      var t = n._getNodeRef(n.meshCache, r.mesh, e);
                      return (
                        void 0 !== r.weights &&
                          t.traverse(function (e) {
                            if (e.isMesh)
                              for (var i = 0, t = r.weights.length; i < t; i++)
                                e.morphTargetInfluences[i] = r.weights[i];
                          }),
                        t
                      );
                    });
              },
            },
            {
              key: "loadNode",
              value: function (e) {
                var t,
                  n,
                  r = this.json,
                  o = this.extensions,
                  l = this,
                  c = r.nodes[e],
                  h = c.name ? l.createUniqueName(c.name) : "";
                return ((t = []),
                (n = l._invokeOne(function (t) {
                  return t.createNodeMesh && t.createNodeMesh(e);
                })),
                n && t.push(n),
                void 0 !== c.camera &&
                  t.push(
                    l.getDependency("camera", c.camera).then(function (e) {
                      return l._getNodeRef(l.cameraCache, c.camera, e);
                    }),
                  ),
                l
                  ._invokeAll(function (t) {
                    return t.createNodeAttachment && t.createNodeAttachment(e);
                  })
                  .forEach(function (e) {
                    t.push(e);
                  }),
                Promise.all(t)).then(function (t) {
                  var n;
                  if (
                    (n =
                      !0 === c.isBone
                        ? new ae.Bone()
                        : t.length > 1
                          ? new ae.Group()
                          : 1 === t.length
                            ? t[0]
                            : new ae.Object3D()) !== t[0]
                  )
                    for (var i = 0, r = t.length; i < r; i++) n.add(t[i]);
                  if (
                    (c.name && ((n.userData.name = c.name), (n.name = h)),
                    bn(n, c),
                    c.extensions && yn(o, n, c),
                    void 0 !== c.matrix)
                  ) {
                    var d = new ae.Matrix4();
                    (d.fromArray(c.matrix), n.applyMatrix4(d));
                  } else
                    (void 0 !== c.translation && n.position.fromArray(c.translation),
                      void 0 !== c.rotation && n.quaternion.fromArray(c.rotation),
                      void 0 !== c.scale && n.scale.fromArray(c.scale));
                  return (l.associations.has(n) || l.associations.set(n, {}), (l.associations.get(n).nodes = e), n);
                });
              },
            },
            {
              key: "loadScene",
              value: function (e) {
                var t = this.json,
                  n = this.extensions,
                  r = this.json.scenes[e],
                  o = this,
                  l = new ae.Group();
                (r.name && (l.name = o.createUniqueName(r.name)), bn(l, r), r.extensions && yn(n, l, r));
                for (var c = r.nodes || [], h = [], i = 0, d = c.length; i < d; i++) h.push(On(c[i], l, t, o));
                return Promise.all(h).then(function () {
                  return (
                    (o.associations = (function (e) {
                      var t,
                        n = new Map(),
                        r = Lt(o.associations);
                      try {
                        for (r.s(); !(t = r.n()).done;) {
                          var l = Object(Q.a)(t.value, 2),
                            c = l[0],
                            h = l[1];
                          (c instanceof ae.Material || c instanceof ae.Texture) && n.set(c, h);
                        }
                      } catch (e) {
                        r.e(e);
                      } finally {
                        r.f();
                      }
                      return (
                        e.traverse(function (e) {
                          var t = o.associations.get(e);
                          null != t && n.set(e, t);
                        }),
                        n
                      );
                    })(l)),
                    l
                  );
                });
              },
            },
          ]),
          e
        );
      })();
      function On(e, t, n, r) {
        var o = n.nodes[e];
        return r
          .getDependency("node", e)
          .then(function (e) {
            return void 0 === o.skin
              ? e
              : r
                  .getDependency("skin", o.skin)
                  .then(function (e) {
                    for (var n = [], i = 0, o = (t = e).joints.length; i < o; i++)
                      n.push(r.getDependency("node", t.joints[i]));
                    return Promise.all(n);
                  })
                  .then(function (n) {
                    return (
                      e.traverse(function (e) {
                        if (e.isMesh) {
                          for (var r = [], o = [], l = 0, c = n.length; l < c; l++) {
                            var h = n[l];
                            if (h) {
                              r.push(h);
                              var d = new ae.Matrix4();
                              (void 0 !== t.inverseBindMatrices && d.fromArray(t.inverseBindMatrices.array, 16 * l),
                                o.push(d));
                            } else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', t.joints[l]);
                          }
                          e.bind(new ae.Skeleton(r, o), e.matrixWorld);
                        }
                      }),
                      e
                    );
                  });
            var t;
          })
          .then(function (e) {
            t.add(e);
            var l = [];
            if (o.children)
              for (var c = o.children, i = 0, h = c.length; i < h; i++) {
                var d = c[i];
                l.push(On(d, e, n, r));
              }
            return Promise.all(l);
          });
      }
      function Ln(e, t, n) {
        var r = t.attributes,
          o = [];
        function l(t, r) {
          return n.getDependency("accessor", t).then(function (t) {
            e.setAttribute(r, t);
          });
        }
        for (var c in r) {
          var h = dn[c] || c.toLowerCase();
          h in e.attributes || o.push(l(r[c], h));
        }
        if (void 0 !== t.indices && !e.index) {
          var d = n.getDependency("accessor", t.indices).then(function (t) {
            e.setIndex(t);
          });
          o.push(d);
        }
        return (
          bn(e, t),
          (function (e, t, n) {
            var r = t.attributes,
              o = new ae.Box3();
            if (void 0 !== r.POSITION) {
              var l = n.json.accessors[r.POSITION],
                c = l.min,
                h = l.max;
              if (void 0 !== c && void 0 !== h) {
                if ((o.set(new ae.Vector3(c[0], c[1], c[2]), new ae.Vector3(h[0], h[1], h[2])), l.normalized)) {
                  var d = Sn(ln[l.componentType]);
                  (o.min.multiplyScalar(d), o.max.multiplyScalar(d));
                }
                var f = t.targets;
                if (void 0 !== f) {
                  for (var m = new ae.Vector3(), v = new ae.Vector3(), i = 0, _ = f.length; i < _; i++) {
                    var y = f[i];
                    if (void 0 !== y.POSITION) {
                      var x = n.json.accessors[y.POSITION],
                        w = x.min,
                        S = x.max;
                      if (void 0 !== w && void 0 !== S) {
                        if (
                          (v.setX(Math.max(Math.abs(w[0]), Math.abs(S[0]))),
                          v.setY(Math.max(Math.abs(w[1]), Math.abs(S[1]))),
                          v.setZ(Math.max(Math.abs(w[2]), Math.abs(S[2]))),
                          x.normalized)
                        ) {
                          var C = Sn(ln[x.componentType]);
                          v.multiplyScalar(C);
                        }
                        m.max(v);
                      } else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
                    }
                  }
                  o.expandByVector(m);
                }
                e.boundingBox = o;
                var O = new ae.Sphere();
                (o.getCenter(O.center), (O.radius = o.min.distanceTo(o.max) / 2), (e.boundingSphere = O));
              } else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
            }
          })(e, t, n),
          Promise.all(o).then(function () {
            return void 0 !== t.targets
              ? (function (e, t, n) {
                  for (var r = !1, o = !1, i = 0, l = t.length; i < l; i++) {
                    var c = t[i];
                    if ((void 0 !== c.POSITION && (r = !0), void 0 !== c.NORMAL && (o = !0), r && o)) break;
                  }
                  if (!r && !o) return Promise.resolve(e);
                  for (var h = [], d = [], f = 0, m = t.length; f < m; f++) {
                    var v = t[f];
                    if (r) {
                      var _ = void 0 !== v.POSITION ? n.getDependency("accessor", v.POSITION) : e.attributes.position;
                      h.push(_);
                    }
                    if (o) {
                      var y = void 0 !== v.NORMAL ? n.getDependency("accessor", v.NORMAL) : e.attributes.normal;
                      d.push(y);
                    }
                  }
                  return Promise.all([Promise.all(h), Promise.all(d)]).then(function (t) {
                    var n = t[0],
                      l = t[1];
                    return (
                      r && (e.morphAttributes.position = n),
                      o && (e.morphAttributes.normal = l),
                      (e.morphTargetsRelative = !0),
                      e
                    );
                  });
                })(e, t.targets, n)
              : e;
          })
        );
      }
      function kn(e, t) {
        var n = e.getIndex();
        if (null === n) {
          var r = [],
            o = e.getAttribute("position");
          if (void 0 === o)
            return (
              console.error(
                "THREE.GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.",
              ),
              e
            );
          for (var i = 0; i < o.count; i++) r.push(i);
          (e.setIndex(r), (n = e.getIndex()));
        }
        var l = n.count - 2,
          c = [];
        if (t === ae.TriangleFanDrawMode)
          for (var h = 1; h <= l; h++) (c.push(n.getX(0)), c.push(n.getX(h)), c.push(n.getX(h + 1)));
        else
          for (var d = 0; d < l; d++)
            d % 2 == 0
              ? (c.push(n.getX(d)), c.push(n.getX(d + 1)), c.push(n.getX(d + 2)))
              : (c.push(n.getX(d + 2)), c.push(n.getX(d + 1)), c.push(n.getX(d)));
        c.length / 3 !== l &&
          console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
        var f = e.clone();
        return (f.setIndex(c), f);
      }
      function Mn(e) {
        var t = (function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0);
          } catch (e) {
            return !1;
          }
        })();
        return function () {
          var n,
            r = Object(Ze.a)(e);
          if (t) {
            var o = Object(Ze.a)(this).constructor;
            n = Reflect.construct(r, arguments, o);
          } else n = r.apply(this, arguments);
          return Object(Qe.a)(this, n);
        };
      }
      var Tn = (function (e) {
          Object(Ke.a)(n, e);
          var t = Mn(n);
          function n() {
            var e,
              r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return (
              Object(Ye.a)(this, n),
              ((e = t.call(this, r))._dracoDecoderPath = r.dracoDecoderPath),
              (e._gltfLoader = new Tt()),
              e._dracoDecoderPath &&
                ((e._dracoLoader = new wt()),
                e._dracoLoader.setDecoderPath(e._dracoDecoderPath),
                e._gltfLoader.setDRACOLoader(e._dracoLoader)),
              e
            );
          }
          return (
            Object(Xe.a)(n, [
              {
                key: "load",
                value: function (e) {
                  var t = this,
                    path = e.path;
                  return new Promise(function (e, n) {
                    t._gltfLoader.load(path, e, null, n);
                  });
                },
              },
            ]),
            n
          );
        })(re.a),
        Pn = n(360);
      function Rn(e) {
        var t = (function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0);
          } catch (e) {
            return !1;
          }
        })();
        return function () {
          var n,
            r = Object(Ze.a)(e);
          if (t) {
            var o = Object(Ze.a)(this).constructor;
            n = Reflect.construct(r, arguments, o);
          } else n = r.apply(this, arguments);
          return Object(Qe.a)(this, n);
        };
      }
      var Dn = (function (e) {
          Object(Ke.a)(n, e);
          var t = Rn(n);
          function n() {
            var e,
              r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (
              (Object(Ye.a)(this, n),
              ((e = t.call(this, r))._loader = new Pn.a()),
              (e._transcoderPath = r.transcoderPath),
              (e._renderer = r.renderer),
              !e._transcoderPath)
            )
              throw new Error("ThreeKTX2TextureLoader: transcoderPath is not defined");
            if (!e._renderer) throw new Error("ThreeKTX2TextureLoader: renderer is not defined");
            return (e._loader.setTranscoderPath(e._transcoderPath), e._loader.detectSupport(e._renderer), e);
          }
          return (
            Object(Xe.a)(n, [
              {
                key: "load",
                value: function (e) {
                  var t = this,
                    path = e.path;
                  return new Promise(function (e, n) {
                    t._loader.load(path, e, null, n);
                  });
                },
              },
            ]),
            n
          );
        })(re.a),
        An = n(356);
      function En(e) {
        var t = (function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0);
          } catch (e) {
            return !1;
          }
        })();
        return function () {
          var n,
            r = Object(Ze.a)(e);
          if (t) {
            var o = Object(Ze.a)(this).constructor;
            n = Reflect.construct(r, arguments, o);
          } else n = r.apply(this, arguments);
          return Object(Qe.a)(this, n);
        };
      }
      var In = (function (e) {
        Object(Ke.a)(n, e);
        var t = En(n);
        function n(e) {
          var r;
          return (
            Object(Ye.a)(this, n),
            ((r = t.call(this, e))._loader = new An.a()),
            r._loader.setDataType(ae.UnsignedByteType),
            r
          );
        }
        return (
          Object(Xe.a)(n, [
            {
              key: "load",
              value: function (e) {
                var t = this,
                  path = e.path;
                return new Promise(function (e, n) {
                  t._loader.load(path, e, null, n);
                });
              },
            },
          ]),
          n
        );
      })(re.a);
      function jn(e) {
        var t = (function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0);
          } catch (e) {
            return !1;
          }
        })();
        return function () {
          var n,
            r = Object(Ze.a)(e);
          if (t) {
            var o = Object(Ze.a)(this).constructor;
            n = Reflect.construct(r, arguments, o);
          } else n = r.apply(this, arguments);
          return Object(Qe.a)(this, n);
        };
      }
      var Fn = (function (e) {
        Object(Ke.a)(n, e);
        var t = jn(n);
        function n() {
          return (Object(Ye.a)(this, n), t.apply(this, arguments));
        }
        return (
          Object(Xe.a)(n, [
            {
              key: "load",
              value: function (e) {
                var path = e.path,
                  t = e.name;
                return new Promise(function (e, n) {
                  var r = new XMLHttpRequest();
                  (r.addEventListener("load", function () {
                    var data = JSON.parse(r.response);
                    e(data);
                  }),
                    r.addEventListener("error", function () {
                      n(new Error('ImageLoader : Error while loading resource "'.concat(t, '"')));
                    }),
                    r.open("GET", path),
                    r.send());
                });
              },
            },
          ]),
          n
        );
      })(re.a);
  return { image: et, hdr: In, texture: ut, BMFont: at, audio: st, json: Fn, basis: vt, gltf: Tn, ktx: Dn };
}
