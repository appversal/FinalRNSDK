"use strict";

// Stories.tsx
import React from 'react';
import { View, Text, ScrollView, Image, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const StoryScreen = ({
  data
}) => {
  const navigation = useNavigation();
  return /*#__PURE__*/_jsx(View, {
    style: styles.container,
    children: /*#__PURE__*/_jsx(ScrollView, {
      horizontal: true,
      showsHorizontalScrollIndicator: false,
      children: data && data.details && Array.isArray(data.details) ? data.details.map((storyGroup, index) => /*#__PURE__*/_jsxs(View, {
        style: styles.storyGroup,
        children: [/*#__PURE__*/_jsx(TouchableWithoutFeedback, {
          onPress: () => navigation.navigate('StoryScreen', {
            storySlideData: storyGroup,
            storyCampaignId: data.id
          }),
          children: /*#__PURE__*/_jsx(View, {
            style: [styles.ring, {
              borderColor: storyGroup.ringColor
            }],
            children: /*#__PURE__*/_jsx(Image, {
              source: {
                uri: storyGroup.thumbnail
              },
              style: styles.thumbnail
            })
          })
        }), /*#__PURE__*/_jsx(Text, {
          style: styles.storyName,
          children: storyGroup.name
        })]
      }, index)) : /*#__PURE__*/_jsx(View, {
        children: /*#__PURE__*/_jsx(Text, {
          style: styles.noDataText,
          children: "No data available"
        })
      })
    })
  });
};
const styles = StyleSheet.create({
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
export default StoryScreen;
//# sourceMappingURL=storyscreen.js.map