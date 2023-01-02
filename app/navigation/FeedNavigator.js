import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import HomeScreen from "../screens/HomeScreen";
import HomeDetailsScreen from "../screens/HomeDetailsScreen";
import MenuDetailsScreen from "../screens/MenuDetailsScreen";
import CartScreen from "../screens/CartScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    {/*  */}
    {/* <Stack.Screen name="Listings" component={ListingsScreen} /> */}
    {/* <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} /> */}
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen
      name="HomeDetails"
      component={HomeDetailsScreen}
      options={{ headerShown: true, title: "Menu" }}
    />
    <Stack.Screen
      name="MenuDetails"
      component={MenuDetailsScreen}
      options={{ headerShown: true, title: "Menu Details" }}
    />
    <Stack.Screen
      name="Cart"
      component={CartScreen}
      options={{ headerShown: true, title: "Cart" }}
    />
  </Stack.Navigator>
);

export default FeedNavigator;
