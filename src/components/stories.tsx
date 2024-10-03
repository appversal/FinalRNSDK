import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

interface StoryGroup {
  ringColor: string;
  thumbnail: string;
  name: string;
}

export interface StoriesProps {
  data: {
    id: string;
    details: StoryGroup[];
  };
}

type RootStackParamList = {
  StoryScreen: {
    storySlideData: StoryGroup;
    storyCampaignId: string;
  };
};

const Stories: React.FC<StoriesProps> = ({ data }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data && data.details && Array.isArray(data.details) ? (
          data.details.map((storyGroup, index) => (
            <View key={index} style={styles.storyContainer}>
              <View style={styles.storyWrapper}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('StoryScreen', { storySlideData: storyGroup, storyCampaignId: data.id })}>
                  <View style={[styles.thumbnailContainer, { borderColor: storyGroup.ringColor }]}>
                    <Image source={{ uri: storyGroup.thumbnail }} style={styles.thumbnail} />
                  </View>
                </TouchableWithoutFeedback>
                <Text style={styles.storyName}>{storyGroup.name}</Text>
              </View>
            </View>
          ))
        ) : (
          <View>
            <Text style={styles.noDataText}>No data available</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    position: 'absolute',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  storyContainer: {
    flexDirection: 'row',
    flex: 1,
    height: 135,
    width: 98,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    justifyContent: 'center',
  },
  storyWrapper: {
    marginTop: 6,
    flexDirection: 'column',
    alignItems: 'center',
  },
  thumbnailContainer: {
    height: 82,
    width: 82,
    borderRadius: 45,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: 65,
    height: 65,
    borderRadius: 35,
    overflow: 'hidden', 
  },
  storyName: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
  noDataText: {
    color: 'white',
    fontSize: 14,
  },
});

export default Stories;
