"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _native = require("@react-navigation/native");
var _trackuseraction = require("../utils/trackuseraction.js");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Stories = ({
  campaigns,
  user_id
}) => {
  const navigation = (0, _native.useNavigation)();
  const data = campaigns.find(val => val.campaign_type === 'STR');
  function onNavigate(storyGroup) {
    // UserActionTrack(user_id, data.id, 'CLK').catch((e) => console.log('Error in tracking impression:', e));
    navigation.navigate('StoryScreen', {
      storySlideData: storyGroup,
      storyCampaignId: data.id,
      user_id
    });
  }
  (0, _react.useEffect)(() => {
    if (data && data.id) {
      (0, _trackuseraction.UserActionTrack)(user_id, data.id, 'IMP');
    }
    // if (data?.details && Array.isArray(data.details)) {
    // UserActionTrack(user_id, data.id, 'IMP').catch((e) => console.log('Error in fetching data:', e));
    // }
  }, [data, user_id]);
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
            onPress: () => {
              onNavigate(storyGroup);
              (0, _trackuseraction.UserActionTrack)(user_id, data.id, 'CLK');
            },
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
      }, index)) : null
    })
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    // backgroundColor: 'green',
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