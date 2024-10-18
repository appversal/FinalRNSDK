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
// Import the tracking function

const Floater = ({
  access_token,
  campaigns,
  user_id
}) => {
  const {
    width
  } = _reactNative.Dimensions.get('window');
  const data = campaigns.find(val => val.campaign_type === 'FLT');
  (0, _react.useEffect)(() => {
    if (!data) {
      return;
    }
    const trackImpression = async () => {
      try {
        await (0, _trackuseraction.UserActionTrack)(user_id, data.id, 'IMP');
      } catch (error) {
        console.error('Error in tracking impression:', error);
      }
    };
    trackImpression();
  }, [data, user_id, access_token]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: data && data.details && data.details.image !== '' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.container,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
        activeOpacity: 1,
        onPress: async () => {
          if (data.details.link) {
            _reactNative.Linking.openURL(data.details.link);
          }
          try {
            await (0, _trackuseraction.UserActionTrack)(user_id, data.id, 'CLK');
          } catch (error) {
            console.error('Error in tracking click:', error);
          }
        },
        style: {
          width: width * 0.15,
          height: width * 0.15,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          position: 'absolute',
          right: 20,
          bottom: 20,
          overflow: 'hidden',
          borderRadius: 100
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
          source: {
            uri: data.details.image
          },
          style: styles.image
        })
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
    justifyContent: 'flex-end',
    zIndex: 10 // Ensure the banner is on top
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  }
});
var _default = exports.default = Floater;
//# sourceMappingURL=floater.js.map