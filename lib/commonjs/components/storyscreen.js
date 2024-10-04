"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _native = require("@react-navigation/native");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// StoryScreen.tsx

const StoryScreen = () => {
  const navigation = (0, _native.useNavigation)();
  const {
    params
  } = (0, _native.useRoute)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: styles.container,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ScrollView, {
      horizontal: true,
      showsHorizontalScrollIndicator: false,
      children: params.storySlideData ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.storyGroup,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableWithoutFeedback, {
          onPress: () => navigation.navigate('StoryScreen', params),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: [styles.ring, {
              borderColor: params.storySlideData.ringColor
            }],
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
              source: {
                uri: params.storySlideData.thumbnail
              },
              style: styles.thumbnail
            })
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: styles.storyName,
          children: params.storySlideData.name
        })]
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: styles.noDataText,
          children: "No data available"
        })
      })
    })
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    backgroundColor: 'black',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  storyGroup: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  ring: {
    height: 82,
    width: 82,
    borderRadius: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2
  },
  thumbnail: {
    width: 65,
    height: 65,
    borderRadius: 35
  },
  storyName: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center'
  },
  noDataText: {
    color: 'white',
    fontSize: 14
  }
});
var _default = exports.default = StoryScreen;
//# sourceMappingURL=storyscreen.js.map