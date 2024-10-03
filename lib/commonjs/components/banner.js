"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _trackuseraction = require("../utils/trackuseraction.js");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Banner = ({
  data,
  user_id,
  access_token
}) => {
  const [isBannerVisible, setIsBannerVisible] = (0, _react.useState)(true);
  (0, _react.useEffect)(() => {
    if (data && data.id) {
      (0, _trackuseraction.UserActionTrack)(user_id, data.id, 'IMP');
    }
  }, [data, user_id, access_token]);
  const closeBanner = () => {
    setIsBannerVisible(false);
  };
  const {
    width,
    height
  } = _reactNative.Dimensions.get('window');
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: data && data.details && data.details.image !== '' && isBannerVisible && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.container,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
        onPress: () => {
          (0, _trackuseraction.UserActionTrack)(user_id, data.id, 'CLK');
          _reactNative.Linking.openURL(data.details.link);
        },
        style: [styles.banner, {
          width: width * 0.92,
          height: height * 0.1
        }],
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
          source: {
            uri: data.details.image
          },
          style: [styles.banner, {
            width: width * 0.92,
            height: height * 0.1
          }]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
          onPress: closeBanner,
          style: styles.closeButton,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
            source: require('./assets/images/close.png'),
            style: styles.closeIcon
          })
        })]
      })
    })
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  banner: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'absolute',
    bottom: 16,
    overflow: 'visible'
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  closeButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'black',
    borderRadius: 15,
    padding: 4.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeIcon: {
    height: 8,
    width: 8
  }
});
var _default = exports.default = Banner;
//# sourceMappingURL=banner.js.map