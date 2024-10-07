"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StoryScreen = void 0;
var _reactNative = require("react-native");
var _react = require("react");
var _reactNativeVideo = _interopRequireDefault(require("react-native-video"));
var _native = require("@react-navigation/native");
var _trackuseraction = require("../utils/trackuseraction.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const closeImage = require('../assets/images/close.png');
const shareImage = require('../assets/images/share.png');
const StoryScreen = () => {
  const navigation = (0, _native.useNavigation)();
  navigation.setOptions;
  const {
    params
  } = (0, _native.useRoute)();
  const {
    height,
    width
  } = _reactNative.Dimensions.get('window');
  const [content, setContent] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    if (!params) {
      return;
    }
    const slides = params.storySlideData.slides;
    // Transform the storySlideData to add the 'finish' field to each element
    const transformedData = slides.map(storySlide => ({
      ...storySlide,
      // Keep the existing properties
      finish: 0 // Add the 'finish' property with value 0
    }));

    // Set the transformed data to the state
    setContent(transformedData);
    navigation.setOptions({
      headerShown: false
    });
  }, [params, navigation]);
  const [current, setCurrent] = (0, _react.useState)(0);
  console.log(JSON.stringify(content[current], null, 2));
  const [, setVideoDuration] = (0, _react.useState)(5); // Default to 5 seconds for fallback

  // Share function
  const shareContent = async () => {
    try {
      await _reactNative.Share.share({
        message: 'Check this out: ' + content[current]?.link,
        url: content[current]?.content ?? undefined
      });
    } catch (error) {
      console.error('Error sharing content: ', error);
    }
  };
  const progress = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const start = duration => {
    console.log(`Starting animation for ${duration / 1000} seconds`);
    _reactNative.Animated.timing(progress, {
      toValue: 1,
      duration: duration,
      useNativeDriver: false
    }).start(({
      finished
    }) => {
      if (finished) {
        next();
      }
    });
  };
  const next = () => {
    const fetchData = async () => {
      try {
        await (0, _trackuseraction.UserActionTrack)(params.user_id, params.storyCampaignId, 'IMP');

        // console.log(userTrackData);
      } catch (error) {
        console.error('Error in fetching data:', error);
      }
    };
    fetchData();
    if (current !== content.length - 1) {
      let tempData = [...content];
      if (tempData[current]) {
        tempData[current].finish = 1;
      }
      setContent(tempData);
      // Uncomment this line plz
      setCurrent(current + 1);
      progress.setValue(0);
    } else {
      close();
    }
  };
  const previous = () => {
    if (current - 1 >= 0) {
      let tempData = [...content];
      if (tempData[current]) {
        tempData[current].finish = 0;
      }
      setContent(tempData);
      progress.setValue(0);
      setCurrent(current - 1);
    }
  };
  const close = () => {
    console.log('Close function called');
    progress.setValue(0);
    navigation.goBack();
  };

  // PanResponder for swipe down gesture
  const panResponder = (0, _react.useRef)(_reactNative.PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 10,
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 150) {
        close();
      }
    }
  })).current;
  if (!params) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: {
        backgroundColor: 'black'
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: {
          color: 'white',
          fontSize: 14
        },
        children: "No data available"
      })
    });
  }
  const {
    storyCampaignId,
    storySlideData,
    user_id
  } = params;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: {
      flex: 1,
      backgroundColor: 'black',
      paddingTop: _reactNative.Platform.OS === 'ios' ? height * 0.07 : height * 0.02,
      paddingBottom: height * 0.1
    },
    ...panResponder.panHandlers,
    children: [content && content.length !== 0 && typeof content[current]?.image === 'string' && content[current]?.image !== '' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
      source: {
        uri: content[current]?.image
      },
      onLoadEnd: () => {
        progress.setValue(0);
        start(5000); // Image lasts 5 seconds
      },
      style: {
        height: '100%',
        width: width,
        resizeMode: 'cover',
        top: 0
      }
    }), content && content.length !== 0 && typeof content[current]?.video === 'string' && content[current]?.video !== '' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeVideo.default, {
      source: {
        uri: content[current]?.video
      },
      style: {
        height: '100%',
        width: width
      },
      resizeMode: "cover",
      onLoad: data => {
        console.log('Video loaded with duration:', data.duration);
        setVideoDuration(data.duration);
        progress.setValue(0);
        start(data.duration * 1000); // Start based on video duration
      },
      onError: error => console.error('Video error:', error),
      onEnd: next // Move to next content when video ends
      ,
      paused: false
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: {
        width: width - 5,
        position: 'absolute',
        top: _reactNative.Platform.OS === 'ios' ? height * 0.08 : height * 0.03,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row'
      },
      children: content.map((_, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: {
          flexDirection: 'row',
          flex: 1,
          height: 3,
          backgroundColor: 'grey',
          marginLeft: 5,
          borderRadius: 2
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
          style: {
            flex: current === index ? progress : content[index]?.finish ?? 1,
            height: 3,
            borderRadius: 2,
            backgroundColor: 'rgba(211, 202, 202, 1)'
          }
        })
      }, index))
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: {
        width: width,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        top: _reactNative.Platform.OS === 'ios' ? height * 0.094 : height * 0.045
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: {
          flexDirection: 'row',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          paddingRight: 26,
          paddingLeft: 20
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
          },
          children: [storySlideData && storySlideData.thumbnail && storySlideData.thumbnail != '' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
            source: {
              uri: storySlideData.thumbnail
            },
            style: {
              width: 40,
              height: 40,
              borderRadius: 20
            }
          }), storySlideData && storySlideData.name && storySlideData.name != '' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: {
              marginLeft: 12,
              fontSize: 15,
              fontWeight: '500',
              color: 'white'
            },
            children: storySlideData.name
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            bottom: 2
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
            onPress: shareContent,
            style: {},
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
              source: shareImage,
              style: {
                height: 20,
                width: 20,
                margin: 16
              }
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
            onPress: close,
            style: {},
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
              source: closeImage,
              style: {
                height: 18,
                width: 18
              }
            })
          })]
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: {
        marginTop: height * 0.15,
        width: width,
        height: height,
        position: 'absolute',
        top: 0,
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
        style: {
          width: '50%',
          height: '100%'
        },
        onPress: previous
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
        style: {
          width: '50%',
          height: '100%'
        },
        onPress: next
      })]
    }), content && content[current] && content[current]?.button_text && content[current]?.link && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: {
        position: 'absolute',
        bottom: height * 0.037,
        width: width,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
        activeOpacity: 1,
        onPress: () => {
          if (typeof content[current]?.link === 'string') {
            _reactNative.Linking.openURL(content[current]?.link);
          }
          const fetchData = async () => {
            try {
              await (0, _trackuseraction.UserActionTrack)(user_id, storyCampaignId, 'CNV');

              // console.log(userTrackData);
            } catch (error) {
              console.error('Error in fetching data:', error);
            }
          };
          fetchData();
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: {
            backgroundColor: 'white',
            borderRadius: 8,
            paddingHorizontal: 18,
            paddingVertical: 12
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: {
              color: 'black'
            },
            children: content[current]?.button_text
          })
        })
      })
    })]
  });
};
exports.StoryScreen = StoryScreen;
//# sourceMappingURL=storyscreen.js.map