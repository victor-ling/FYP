import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import HomeScreen from "../screens/HomeScreen";
import HomeDetailsScreen from "../screens/HomeDetailsScreen";
import MenuDetailsScreen from "../screens/MenuDetailsScreen";
import CartScreen from "../screens/CartScreen";
import MeScreen from "../screens/MeScreen";

const Stack = createStackNavigator();

const MeNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Me" component={MeScreen} />
    <Stack.Screen
      name="Cart"
      component={CartScreen}
      options={{ headerShown: true, title: "Cart" }}
    />
  </Stack.Navigator>
);

export default MeNavigator;
