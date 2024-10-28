import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Chat, Home, UserProfile } from "../screens";
import Tabbar from "../components/Tabbar/Tabbar";

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <Tabbar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="User-profile" component={UserProfile} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
