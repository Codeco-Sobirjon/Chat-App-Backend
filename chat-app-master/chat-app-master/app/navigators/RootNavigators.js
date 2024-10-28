import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import { Chat } from "../screens";

const RootStack = createNativeStackNavigator();
const RootNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="TabStack"
    >
      <RootStack.Screen name="TabStack" component={TabNavigator} />
      <RootStack.Screen name="Chat" component={Chat} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
