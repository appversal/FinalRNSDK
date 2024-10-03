import React, { useEffect, useState} from 'react';

import {View, Image, TouchableOpacity, Dimensions, Linking, StyleSheet} from 'react-native';

import { UserActionTrack } from '../utils/trackuseraction';

export interface BannerProps {
    data: {
        id: string;
        details: {
            image: string;
            link: string;
        };
    };
    user_id: string;
    access_token: string;
}

const Banner: React.FC<BannerProps> = ({data, user_id, access_token}) => {
    const [isBannerVisible, setIsBannerVisible] = useState(true);

    useEffect(()=> {
        if(data && data.id) {
            UserActionTrack(user_id, data.id, 'IMP');
        }
    }, [data, user_id, access_token]);

    const closeBanner = () => {
        setIsBannerVisible(false);
    };

    const {width, height} = Dimensions.get('window');

    return (
        <>
            {data && data.details && data.details.image !== '' && isBannerVisible && (
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => {
                        UserActionTrack(user_id, data.id, 'CLK');
                        Linking.openURL(data.details.link);
                    }}
                    style = {[styles.banner, { width: width * 0.92, height: height * 0.1 }]}
                    >
                        <Image source = {{uri: data.details.image}} style = {[styles.banner, { width: width * 0.92, height: height * 0.1 }]} />
                    <TouchableOpacity onPress={closeBanner} style={styles.closeButton}>
                        <Image source={require('./assets/images/close.png')} style={styles.closeIcon} />
                    </TouchableOpacity>
                    </TouchableOpacity>
                    </View>
            )}
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
      },
      banner: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        position: 'absolute',
        bottom: 16,
        overflow: 'visible',
      },
      bannerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      },
      closeButton: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: 'black',
        borderRadius: 15,
        padding: 4.5,
        justifyContent: 'center',
        alignItems: 'center',
      },
      closeIcon: {
        height: 8,
        width: 8,
      },
});

export default Banner;