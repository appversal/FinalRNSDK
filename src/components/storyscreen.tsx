// StoryScreen.tsx
import React from 'react';
import { View, Text, ScrollView, Image, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { useNavigation , NavigationProp, RouteProp, useRoute} from '@react-navigation/native';


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
    StoryScreen: { storySlideData: StoryGroup; storyCampaignId: string };
  };

const StoryScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const {params} = useRoute<RouteProp<RootStackParamList, 'StoryScreen'>>();
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {params.storySlideData ? (
            <View style={styles.storyGroup}>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('StoryScreen', params)}
              >
                <View style={[styles.ring, { borderColor: params.storySlideData.ringColor }]}>
                  <Image source={{ uri: params.storySlideData.thumbnail }} style={styles.thumbnail} />
                </View>
              </TouchableWithoutFeedback>
              <Text style={styles.storyName}>{params.storySlideData.name}</Text>
            </View>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  storyGroup: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  ring: {
    height: 82,
    width: 82,
    borderRadius: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  thumbnail: {
    width: 65,
    height: 65,
    borderRadius: 35,
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

export default StoryScreen;
