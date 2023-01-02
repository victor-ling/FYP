import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import HomeScreen from "../screens/HomeScreen";
import DiaryScreen from "../screens/DiaryScreen";
import HomeDetailsScreen from "../screens/HomeDetailsScreen";
import MenuDetailsScreen from "../screens/MenuDetailsScreen";
import CartScreen from "../screens/CartScreen";
import FetchNutritionScreen from "../screens/FetchNutritionScreen";

const Stack = createStackNavigator();

const DiaryNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Diary" component={DiaryScreen} />
    <Stack.Screen name="FetchNutrition" component={FetchNutritionScreen} />
    {/* <Stack.Screen
      name="HomeDetails"
      component={HomeDetailsScreen}
      options={{ headerShown: true, title: "Menu" }}
    />
     */}
  </Stack.Navigator>
);

export default DiaryNavigator;
