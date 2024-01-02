import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './src/screen/Home'
import Setting from './src/screen/Setting'

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{
      // headerShown:false,
      tabBarShowLabel: false,
      tabBarStyle: styles.tabBar,
    }} >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => <Icon name="home" size={30} color="#0082f7" />,
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: () => <Icon name="person" size={30} color="#0082f7" />
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    padding: 0,
    left: 16,
    right: 16,
    bottom: 18,
    height: 60,
    borderRadius: 16,
  }
})

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}