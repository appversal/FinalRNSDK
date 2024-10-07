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
const Stories = ({
  campaigns,
  user_id
}) => {
  const navigation = (0, _native.useNavigation)();
  const data = campaigns.find(val => val.campaign_type === 'STR');
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: styles.container,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ScrollView, {
      horizontal: true,
      showsHorizontalScrollIndicator: false,
      children: data?.details && Array.isArray(data.details) ? data.details.map((storyGroup, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.storyContainer,
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.storyWrapper,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableWithoutFeedback, {
            onPress: () => navigation.navigate('StoryScreen', {
              storySlideData: storyGroup,
              storyCampaignId: data.id,
              user_id
            }),
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: [styles.thumbnailContainer, {
                borderColor: storyGroup.ringColor
              }],
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
                source: {
                  uri: storyGroup.thumbnail
                },
                style: styles.thumbnail
              })
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.storyName,
            children: storyGroup.name
          })]
        })
      }, index)) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
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
    position: 'absolute',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  storyContainer: {
    flexDirection: 'row',
    flex: 1,
    height: 135,
    width: 98,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    justifyContent: 'center'
  },
  storyWrapper: {
    marginTop: 6,
    flexDirection: 'column',
    alignItems: 'center'
  },
  thumbnailContainer: {
    height: 82,
    width: 82,
    borderRadius: 45,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  thumbnail: {
    width: 65,
    height: 65,
    borderRadius: 35,
    overflow: 'hidden'
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
var _default = exports.default = Stories;
//# sourceMappingURL=stories.js.map