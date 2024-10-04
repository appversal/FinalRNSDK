/* eslint-disable @typescript-eslint/no-shadow */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {FC, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppStorys, Banner, Floater, Pip, Stories, StoryScreen} from '@appstorys/appstorys-react-native';

const Tab = createBottomTabNavigator();

const appId = '';
const accountId = '';
const screenName = 'Home Screen';
const user_id = '';
const attributes = {
  key: 'value',
};

const Screen: FC = () => {
  const [access_token, setAccess_token] = useState<string>();
  const [campaigns, setCampaigns] = useState<object>();

  useEffect(() => {
    async function init() {
      await AppStorys.verifyAccount(accountId, appId);
      await AppStorys.trackScreen(appId, screenName);
      const verifyUser = await AppStorys.verifyUser(user_id);

      if (verifyUser) {
        setCampaigns(verifyUser);
      }
      await AppStorys.trackUser(user_id, attributes);
      const access_token = await EncryptedStorage.getItem('access_token');
      if (access_token) {
        setAccess_token(access_token);
      }
    }

    init();
  }, []);

  if (!campaigns || !access_token) {
    return null;
  }

  // return <Pip access_token={access_token} data={campaigns.campaigns[0]} user_id={user_id} />;
  // return (
  //   <Banner access_token={access_token} data={campaigns.campaigns[2]} user_id={user_id} />
  // );
  // return (
  //   <Floater access_token={access_token} data={campaigns.campaigns[2]} user_id={user_id} />
  // );
  return (
    <Stories
      access_token={access_token}
      data={campaigns.campaigns[1]}
      user_id={user_id}
    />
  );
};

const App: FC = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Screen} />
          <Tab.Screen name="StoryScreen" component={StoryScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
