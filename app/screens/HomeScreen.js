import React, { useState, useEffect } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";

import Card from "../components/Card";
import Screen from "../components/Screen";
import colors from "../config/colors";
import defaultStyles from "../config/styles";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";
import { db } from "../../firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
} from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  //const navigation = useNavigation();
  const route = useRoute();

  const [search, setSearch] = useState("");

  const [theArray, setTheArray] = useState([]);
  //   const testing = [
  //     {
  //       restaurantName: "789 restaurant",
  //     },
  //     {
  //       restaurantName: "78 restaurant",
  //     },
  //   ];
  //   const listings = [
  //     {
  //       id: 1,
  //       title: "Red jacket for sale",
  //       price: 100,
  //     },
  //     {
  //       id: 2,
  //       title: "Couch in great condition",
  //       price: 1000,
  //     },
  //   ];

  const onSubmitEditing = async () => {
    console.log(search);
    //reset the array in every search
    if (theArray.length > 0) {
      setTheArray((theArray) => []);
    }
    //get all documents from "restaurants" collection
    // const q = query(collection(db, "restaurants"));

    // const q = query(
    //   collection(db, "restaurants"),
    //   where("restaurantName", "==", search),
    // ); //

    //query for prefix (eg search: "123" --> "123 restaurant")
    const q = query(
      collection(db, "restaurants"),
      where("restaurantName", ">=", search),
      where("restaurantName", "<=", search + "\uf8ff")
    ); //

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // const idAndDataArr = [{ restaurantId: doc.id }, doc.data()];
      const idAndDataArr = { ...doc.data(), restaurantId: doc.id };
      setTheArray((theArray) => [...theArray, idAndDataArr]);
    });

    console.log(theArray);
  };
  useEffect(() => {
    onSubmitEditing();
  }, []);

  return (
    <Screen style={styles.screen}>
      <AppTextInput
        autoCapitalize="none"
        autoCorrect={false}
        icon="store-search"
        // keyboardType="email-address"
        onChangeText={(text) => setSearch(text)}
        //process the value when enter is pressed
        onSubmitEditing={onSubmitEditing}
        // name="email"
        placeholder="search for restaurant"
        textContentType="none"
      />
      <FlatList
        // style={styles.cardBackground}
        data={theArray}
        // keyExtractor={(listing) => listing.restaurantName.toString()}
        //extract the id
        keyExtractor={(listing) => listing.restaurantId}
        renderItem={({ item }) => (
          <Card
            title={item.restaurantName}
            // subTitle={"$" + item.price}
            image={{ url: item.image }}
            onPress={() => navigation.navigate("HomeDetails", item)}
          />
        )}
      />
      {/* <Text>Home Screen</Text>
      <Text>Email: {auth.currentUser?.email}</Text>
      <Text>ID: {auth.currentUser?.uid}</Text>
      <Text>{route.name}</Text>
      <AppButton title="Logout" onPress={handleLogout} /> */}
    </Screen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    // backgroundColor: colors.light,
  },
  container: {
    padding: 10,
  },
  cardBackground: {
    backgroundColor: defaultStyles.colors.light,
  },
});
