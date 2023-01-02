import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "react-native-screens/native-stack";

import Login from "../screens/Login";
import LoginScreen from "../screens/LoginScreen";
import Register from "../screens/Register";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="WelcomeScreen"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
    {/* <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{ headerLeft: () => null }}
    /> */}
  </Stack.Navigator>
);

export default AuthNavigator;
