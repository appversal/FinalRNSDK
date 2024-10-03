"use strict";

import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Dimensions, Linking, StyleSheet } from 'react-native';
import { UserActionTrack } from "../utils/trackuseraction.js";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const Banner = ({
  data,
  user_id,
  access_token
}) => {
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  useEffect(() => {
    if (data && data.id) {
      UserActionTrack(user_id, data.id, 'IMP');
    }
  }, [data, user_id, access_token]);
  const closeBanner = () => {
    setIsBannerVisible(false);
  };
  const {
    width,
    height
  } = Dimensions.get('window');
  return /*#__PURE__*/_jsx(_Fragment, {
    children: data && data.details && data.details.image !== '' && isBannerVisible && /*#__PURE__*/_jsx(View, {
      style: styles.container,
      children: /*#__PURE__*/_jsxs(TouchableOpacity, {
        onPress: () => {
          UserActionTrack(user_id, data.id, 'CLK');
          Linking.openURL(data.details.link);
        },
        style: [styles.banner, {
          width: width * 0.92,
          height: height * 0.1
        }],
        children: [/*#__PURE__*/_jsx(Image, {
          source: {
            uri: data.details.image
          },
          style: [styles.banner, {
            width: width * 0.92,
            height: height * 0.1
          }]
        }), /*#__PURE__*/_jsx(TouchableOpacity, {
          onPress: closeBanner,
          style: styles.closeButton,
          children: /*#__PURE__*/_jsx(Image, {
            source: require('../assets/images/close.png'),
            style: styles.closeIcon
          })
        })]
      })
    })
  });
};
const styles = StyleSheet.create({
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
export default Banner;
//# sourceMappingURL=banner.js.map