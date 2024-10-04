"use strict";

import React, { useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Linking, Dimensions } from 'react-native';
import { UserActionTrack } from "../utils/trackuseraction.js"; // Import the tracking function
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
const Floater = ({
  data,
  user_id,
  access_token
}) => {
  const {
    width
  } = Dimensions.get('window');
  useEffect(() => {
    const trackImpression = async () => {
      try {
        await UserActionTrack(user_id, data.id, 'IMP');
      } catch (error) {
        console.error('Error in tracking impression:', error);
      }
    };
    trackImpression();
  }, [data, user_id, access_token]);
  return /*#__PURE__*/_jsx(_Fragment, {
    children: data && data.details && data.details.image !== '' && /*#__PURE__*/_jsx(View, {
      style: styles.container,
      children: /*#__PURE__*/_jsx(TouchableOpacity, {
        activeOpacity: 1,
        onPress: async () => {
          Linking.openURL(data.details.link);
          try {
            await UserActionTrack(user_id, data.id, 'CLK');
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
        children: /*#__PURE__*/_jsx(Image, {
          source: {
            uri: data.details.image
          },
          style: styles.image
        })
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
    justifyContent: 'flex-end'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  }
});
export default Floater;
//# sourceMappingURL=floater.js.map