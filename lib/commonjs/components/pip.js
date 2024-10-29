"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNativeVideo = _interopRequireDefault(require("react-native-video"));
var _bottomTabs = require("@react-navigation/bottom-tabs");
var _native = require("@react-navigation/native");
var _trackuseraction = require("../utils/trackuseraction.js");
var _reactNativeFs = _interopRequireDefault(require("react-native-fs"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Import tracking function

const {
  width,
  height
} = _reactNative.Dimensions.get("window");
const Pip = ({
  access_token,
  campaigns,
  user_id
}) => {
  let pipBottomValue = height > 700 ? _reactNative.Platform.OS === "ios" ? 320 : 278 : 285;
  const tabBarHeight = (0, _bottomTabs.useBottomTabBarHeight)();
  const navigation = (0, _native.useNavigation)();
  const [isPipVisible, setPipVisible] = (0, _react.useState)(true);
  const [isExpanded, setExpanded] = (0, _react.useState)(false);
  const [position, setPosition] = (0, _react.useState)({
    x: width - 160,
    y: height - (tabBarHeight + pipBottomValue)
  });
  const [smallVideoPath, setSmallVideoPath] = (0, _react.useState)("");
  const [largeVideoPath, setLargeVideoPath] = (0, _react.useState)("");
  const translationX = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const translationY = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const data = campaigns.find(val => val.campaign_type === "PIP");
  const downloadVideo = async (url, filename) => {
    try {
      const downloadResult = await _reactNativeFs.default.downloadFile({
        fromUrl: url,
        toFile: `${_reactNativeFs.default.DocumentDirectoryPath}/${filename}`
      }).promise;
      if (downloadResult.statusCode === 200) {
        console.log("Downloaded successfully");
      } else {
        console.log("Download failed");
      }
    } catch (error) {
      console.error("Error in downloading video:", error);
    }
  };
  const checkAndDownloadSmallVideo = async url => {
    try {
      const filename = url.split("/").pop().split("?")[0];
      const fileExists = await _reactNativeFs.default.exists(`${_reactNativeFs.default.DocumentDirectoryPath}/${filename}`);
      if (!fileExists) {
        await downloadVideo(url, filename);
        setSmallVideoPath(`${_reactNativeFs.default.DocumentDirectoryPath}/${filename}`);
      } else {
        setSmallVideoPath(`${_reactNativeFs.default.DocumentDirectoryPath}/${filename}`);
      }
    } catch (error) {
      console.error("Error in checking and downloading video:", error);
    }
  };
  const checkAndDownloadLargeVideo = async url => {
    try {
      const filename = url.split("/").pop().split("?")[0];
      const fileExists = await _reactNativeFs.default.exists(`${_reactNativeFs.default.DocumentDirectoryPath}/${filename}`);
      if (!fileExists) {
        await downloadVideo(url, filename);
        setLargeVideoPath(`${_reactNativeFs.default.DocumentDirectoryPath}/${filename}`);
      } else {
        setLargeVideoPath(`${_reactNativeFs.default.DocumentDirectoryPath}/${filename}`);
      }
    } catch (error) {
      console.error("Error in checking and downloading video:", error);
    }
  };
  (0, _react.useEffect)(() => {
    if (data && data.id) {
      (0, _trackuseraction.UserActionTrack)(user_id, data.id, "IMP");
      const smallVideoUrl = data.details.small_video;
      checkAndDownloadSmallVideo(smallVideoUrl);
    }
    navigation.setOptions({
      tabBarStyle: {
        display: isExpanded ? "none" : "flex"
      },
      headerShown: false
    });
  }, [isExpanded, navigation, user_id, access_token]);
  const closePip = () => {
    setPipVisible(false);
    setExpanded(false);
  };
  const expandPip = () => {
    setExpanded(true);
    checkAndDownloadLargeVideo(data.details.large_video);
    setPosition({
      x: 0,
      y: 0
    });
  };
  const onPanGestureEvent = _reactNative.Animated.event([{
    nativeEvent: {
      translationX: translationX,
      translationY: translationY
    }
  }], {
    useNativeDriver: true
  });
  const onHandlerStateChange = event => {
    if (event.nativeEvent.oldState === _reactNativeGestureHandler.State.ACTIVE) {
      const {
        translationX: tx,
        translationY: ty
      } = event.nativeEvent;
      const newX = position.x + tx;
      const newY = position.y + ty;
      // const nearestCorner = getNearestCorner(newX, newY);
      // if (!nearestCorner) {
      //   return;
      // }
      // animateToCorner(nearestCorner);
      setPosition({
        x: newX,
        y: newY
      });
      translationX.setValue(0);
      translationY.setValue(0);
    }
  };

  // const corners: { [key: string]: { x: number; y: number } } = {
  //   topLeft: { x: 20, y: 20 },
  //   topRight: { x: width - 160, y: 20 },
  //   bottomLeft: { x: 20, y: height - (tabBarHeight + pipBottomValue) },
  //   bottomRight: { x: width - 160, y: height - (tabBarHeight + pipBottomValue) },
  // };

  // const getNearestCorner = (x: number, y: number) => {
  //   let nearestCorner = 'topLeft';
  //   let minDistance = Infinity;

  //   Object.entries(corners).forEach(([corner, coords]) => {
  //     const distance = Math.sqrt(Math.pow(coords.x - x, 2) + Math.pow(coords.y - y, 2));
  //     if (distance < minDistance) {
  //       nearestCorner = corner;
  //       minDistance = distance;
  //     }
  //   });

  //   return corners[nearestCorner];
  // };

  // const animateToCorner = (corner: { x: number; y: number }) => {
  //   Animated.timing(translationX, {
  //     toValue: corner.x - position.x,
  //     duration: 500,
  //     easing: Easing.inOut(Easing.ease),
  //     useNativeDriver: true,
  //   }).start();

  //   Animated.timing(translationY, {
  //     toValue: corner.y - position.y,
  //     duration: 500,
  //     easing: Easing.inOut(Easing.ease),
  //     useNativeDriver: true,
  //   }).start();
  // };

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeGestureHandler.GestureHandlerRootView, {
    children: data && isPipVisible && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeGestureHandler.PanGestureHandler, {
      onGestureEvent: isExpanded ? undefined : onPanGestureEvent,
      onHandlerStateChange: isExpanded ? undefined : onHandlerStateChange,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Animated.View, {
        style: [isExpanded ? styles.floaterExpandedContainer : styles.floaterContainer, {
          transform: [{
            translateX: _reactNative.Animated.add(translationX, new _reactNative.Animated.Value(position.x))
          }, {
            translateY: _reactNative.Animated.add(translationY, new _reactNative.Animated.Value(position.y))
          }]
        }],
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          onTouchEnd: expandPip,
          style: {
            flex: 1
          },
          children: data && data.details && data.details.small_video && data.details.large_video && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeVideo.default, {
            repeat: true,
            resizeMode: "stretch",
            muted: true,
            source: {
              uri: isExpanded ? `file://${smallVideoPath}` : `file://${largeVideoPath}`
            },
            style: {
              borderRadius: isExpanded ? 0 : 15,
              position: "absolute",
              overflow: "hidden",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0
            }
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
          onPress: closePip,
          style: isExpanded ? styles.expandedClosePipButton : styles.closePipButton,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
            source: require("../assets/images/close.png"),
            style: isExpanded ? styles.expandedClosePipButtonText : styles.closePipButtonText
          })
        }), data && data.details && data.details.link && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: {
            display: isExpanded ? "flex" : "none",
            position: "absolute",
            backgroundColor: "white",
            width: width - 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 4,
            bottom: _reactNative.Platform.OS === "ios" ? height * 0.045 : height * 0.025,
            left: 20
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeGestureHandler.TouchableWithoutFeedback, {
            onPress: () => {
              if (data.details.link) {
                _reactNative.Linking.openURL(data.details.link);
              }
              (0, _trackuseraction.UserActionTrack)(user_id, data.id, "CLK");
              // const fetchData = async () => {
              //   try {
              //     await UserActionTrack(data.id, user_id, 'CLK');
              //   } catch (error) {
              //     console.error('Error in fetching data:', error);
              //   }
              // };
              // fetchData();
            },
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: {
                color: "black",
                fontWeight: "500"
              },
              children: "Continue"
            })
          })
        })]
      })
    })
  });
};
const styles = _reactNative.StyleSheet.create({
  closePipButton: {
    padding: 5,
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "black",
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  closePipButtonText: {
    height: 8,
    width: 8
  },
  expandedClosePipButton: {
    position: "absolute",
    top: _reactNative.Platform.OS === "ios" ? height * 0.1 : 25,
    right: 25
  },
  expandedClosePipButtonText: {
    height: 20,
    width: 20
  },
  floaterContainer: {
    backgroundColor: "white",
    width: 140,
    height: 200,
    position: "absolute",
    borderRadius: 15,
    display: "flex",
    flexDirection: "row"
    // zIndex: 10,  // Ensure the banner is on top
  },
  floaterExpandedContainer: {
    paddingTop: _reactNative.Platform.OS === "ios" ? height * 0.07 : 0,
    paddingBottom: _reactNative.Platform.OS === "ios" ? height * 0.025 : 0,
    backgroundColor: "black",
    width: width,
    height: height,
    position: "absolute",
    display: "flex",
    flexDirection: "row"
  },
  container: {
    flex: 1
  }
});
var _default = exports.default = Pip;
//# sourceMappingURL=pip.js.map