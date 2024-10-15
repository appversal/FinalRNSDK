import React, { useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Linking, Dimensions } from 'react-native';
import { UserActionTrack } from '../utils/trackuseraction'; // Import the tracking function
import { CampaignFloater, UserData } from '../sdk';

export type FloaterProps = {
  access_token: string;
} & UserData

const Floater: React.FC<FloaterProps> = ({ access_token, campaigns, user_id }) => {
  const { width } = Dimensions.get('window');

  const data = campaigns.find((val) => val.campaign_type === 'FLT') as CampaignFloater;

  useEffect(() => {
    if (!data) {
      return;
    }

    const trackImpression = async () => {
      try {
        await UserActionTrack(user_id, data.id, 'IMP');
      } catch (error) {
        console.error('Error in tracking impression:', error);
      }
    };

    trackImpression();
  }, [data, user_id, access_token]);

  return (
    <>
      {data && data.details && data.details.image !== '' && (
        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={async () => {
              if (data.details.link) {
                Linking.openURL(data.details.link);
              }
              try {
                await UserActionTrack(user_id, data.id, 'CLK');
              } catch (error) {
                console.error('Error in tracking click:', error);
              }
            }}
            style={{
              width: width * 0.15,
              height: width * 0.15,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              position: 'absolute',
              right: 20,
              bottom: 20,
              overflow: 'hidden',
              borderRadius: 100,
            }}
          >
            <Image
              source={{ uri: data.details.image }}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    zIndex: 10,  // Ensure the banner is on top
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default Floater;
