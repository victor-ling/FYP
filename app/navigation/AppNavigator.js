import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import CreateMenuScreen from "../screens/CreateMenuScreen";
import DiaryNavigator from "./DiaryNavigator";
import FeedNavigator from "./FeedNavigator";
import MeNavigator from "./MeNavigator";
import MeScreen from "../screens/MeScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator>
    {/* add tabs here */}
    {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
    <Tab.Screen
      name="FeedNavigator"
      component={FeedNavigator}
      options={{ tabBarLabel: "Home" }}
    />
    <Tab.Screen
      name="DiaryNavigator"
      component={DiaryNavigator}
      options={{ tabBarLabel: "Diary" }}
    />
    {/* <Tab.Screen name="Create" component={CreateMenuScreen} /> */}
    <Tab.Screen
      name="MeNavigator"
      component={MeNavigator}
      options={{ tabBarLabel: "Me" }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
