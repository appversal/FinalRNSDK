"use strict";

import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Stories = ({
  campaigns,
  user_id
}) => {
  const navigation = useNavigation();
  const data = campaigns.find(val => val.campaign_type === 'STR');
  return /*#__PURE__*/_jsx(View, {
    style: styles.container,
    children: /*#__PURE__*/_jsx(ScrollView, {
      horizontal: true,
      showsHorizontalScrollIndicator: false,
      children: data?.details && Array.isArray(data.details) ? data.details.map((storyGroup, index) => /*#__PURE__*/_jsx(View, {
        style: styles.storyContainer,
        children: /*#__PURE__*/_jsxs(View, {
          style: styles.storyWrapper,
          children: [/*#__PURE__*/_jsx(TouchableWithoutFeedback, {
            onPress: () => navigation.navigate('StoryScreen', {
              storySlideData: storyGroup,
              storyCampaignId: data.id,
              user_id
            }),
            children: /*#__PURE__*/_jsx(View, {
              style: [styles.thumbnailContainer, {
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
        })
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
export default Stories;
//# sourceMappingURL=stories.js.map