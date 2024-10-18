"use strict";

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, Linking, Image, Platform } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, State, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Video from 'react-native-video';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { UserActionTrack } from "../utils/trackuseraction.js"; // Import tracking function
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const {
  width,
  height
} = Dimensions.get('window');
const Pip = ({
  access_token,
  campaigns,
  user_id
}) => {
  let pipBottomValue = height > 700 ? Platform.OS === 'ios' ? 320 : 278 : 285;
  const tabBarHeight = useBottomTabBarHeight();
  const navigation = useNavigation();
  const [isPipVisible, setPipVisible] = useState(true);
  const [isExpanded, setExpanded] = useState(false);
  const [position, setPosition] = useState({
    x: width - 160,
    y: height - (tabBarHeight + pipBottomValue)
  });
  const translationX = useRef(new Animated.Value(0)).current;
  const translationY = useRef(new Animated.Value(0)).current;
  const data = campaigns.find(val => val.campaign_type === 'PIP');
  useEffect(() => {
    if (data && data.id) {
      UserActionTrack(user_id, data.id, 'IMP');
    }
    navigation.setOptions({
      tabBarStyle: {
        display: isExpanded ? 'none' : 'flex'
      },
      headerShown: !isExpanded
    });
  }, [isExpanded, navigation, user_id, access_token]);
  const closePip = () => {
    setPipVisible(false);
    setExpanded(false);
  };
  const expandPip = () => {
    setExpanded(true);
    setPosition({
      x: 0,
      y: 0
    });
  };
  const onPanGestureEvent = Animated.event([{
    nativeEvent: {
      translationX: translationX,
      translationY: translationY
    }
  }], {
    useNativeDriver: true
  });
  const onHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
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

  return /*#__PURE__*/_jsx(GestureHandlerRootView, {
    children: data && isPipVisible && /*#__PURE__*/_jsx(PanGestureHandler, {
      onGestureEvent: isExpanded ? undefined : onPanGestureEvent,
      onHandlerStateChange: isExpanded ? undefined : onHandlerStateChange,
      children: /*#__PURE__*/_jsxs(Animated.View, {
        style: [isExpanded ? styles.floaterExpandedContainer : styles.floaterContainer, {
          transform: [{
            translateX: Animated.add(translationX, new Animated.Value(position.x))
          }, {
            translateY: Animated.add(translationY, new Animated.Value(position.y))
          }]
        }],
        children: [/*#__PURE__*/_jsx(View, {
          onTouchEnd: expandPip,
          style: {
            flex: 1
          },
          children: data && data.details && data.details.small_video && data.details.large_video && /*#__PURE__*/_jsx(Video, {
            repeat: true,
            resizeMode: "stretch",
            muted: true,
            source: {
              uri: isExpanded ? data.details.large_video : data.details.small_video
            },
            style: {
              borderRadius: isExpanded ? 0 : 15,
              position: 'absolute',
              overflow: 'hidden',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0
            }
          })
        }), /*#__PURE__*/_jsx(TouchableOpacity, {
          onPress: closePip,
          style: isExpanded ? styles.expandedClosePipButton : styles.closePipButton,
          children: /*#__PURE__*/_jsx(Image, {
            source: require('../assets/images/close.png'),
            style: isExpanded ? styles.expandedClosePipButtonText : styles.closePipButtonText
          })
        }), data && data.details && data.details.link && /*#__PURE__*/_jsx(View, {
          style: {
            display: isExpanded ? 'flex' : 'none',
            position: 'absolute',
            backgroundColor: 'white',
            width: width - 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            bottom: Platform.OS === 'ios' ? height * 0.045 : height * 0.025,
            left: 20
          },
          children: /*#__PURE__*/_jsx(TouchableWithoutFeedback, {
            onPress: () => {
              if (data.details.link) {
                Linking.openURL(data.details.link);
              }
              UserActionTrack(user_id, data.id, 'CLK');
              // const fetchData = async () => {
              //   try {
              //     await UserActionTrack(data.id, user_id, 'CLK');
              //   } catch (error) {
              //     console.error('Error in fetching data:', error);
              //   }
              // };
              // fetchData();
            },
            children: /*#__PURE__*/_jsx(Text, {
              style: {
                color: 'black',
                fontWeight: '500'
              },
              children: "Continue"
            })
          })
        })]
      })
    })
  });
};
const styles = StyleSheet.create({
  closePipButton: {
    padding: 5,
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'black',
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  closePipButtonText: {
    height: 8,
    width: 8
  },
  expandedClosePipButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? height * 0.1 : 25,
    right: 25
  },
  expandedClosePipButtonText: {
    height: 20,
    width: 20
  },
  floaterContainer: {
    backgroundColor: 'white',
    width: 140,
    height: 200,
    position: 'absolute',
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row'
    // zIndex: 10,  // Ensure the banner is on top
  },
  floaterExpandedContainer: {
    paddingTop: Platform.OS === 'ios' ? height * 0.07 : 0,
    paddingBottom: Platform.OS === 'ios' ? height * 0.025 : 0,
    backgroundColor: 'black',
    width: width,
    height: height,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row'
  },
  container: {
    flex: 1
  }
});
export default Pip;
//# sourceMappingURL=pip.js.map