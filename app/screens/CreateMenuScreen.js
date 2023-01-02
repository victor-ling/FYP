import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text } from "react-native";

import Screen from "../components/Screen";

import AppTextInput from "../components/AppTextInput";

import { db } from "../../firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  updateDoc,
  query,
  getDocs,
} from "firebase/firestore";

const CreateMenuScreen = () => {
  //const [search, setSearch] = useState("");

  const [restaurant, setRestaurant] = useState("");
  //const [email, setEmail] = useState('');

  const createRestaurantByName = async () => {
    // Add a new document in collection "restaurant"
    // setDoc(doc(db, "restaurants", "LA"), {
    //     restaurantName: "Los Angeles"
    //   });
    try {
      const docRef = await addDoc(collection(db, "restaurants"), {
        restaurantName: restaurant,
      });
      alert("data submitted");
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const updateImage = async () => {
    // Add a new document in collection "restaurant"
    // setDoc(doc(db, "restaurants", "LA"), {
    //     restaurantName: "Los Angeles"
    //   });
    const q = query(collection(db, "restaurants")); //

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (document) => {
      const restaurantsRef = doc(db, "restaurants", document.id);
      await updateDoc(restaurantsRef, {
        image: "https://picsum.photos/300/200",
      });
    });

    try {
      const docRef = await addDoc(collection(db, "restaurants"), {
        restaurantName: restaurant,
      });
      alert("data submitted");
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // const createMenu = async () => {
  //   try {
  //     const docRef = await addDoc(collection(db, "menus"), {
  //       menuName: restaurant,
  //       restaurantId: ,
  //       price: 25.5,
  //       quota: 10,
  //       image: "https://picsum.photos/300/200",
  //     });
  //     alert("menu created");
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // }

  return (
    <Screen style={styles.screen}>
      <Text>Create Restaurant!</Text>
      <AppTextInput
        value={restaurant}
        autoCapitalize="none"
        autoCorrect={false}
        icon="store-search"
        // keyboardType="email-address"
        onChangeText={(text) => setRestaurant(text)}
        //process the value when enter is pressed

        // name="email"
        placeholder="restaurant name"
        textContentType="none"
      />
      <Button
        onPress={createRestaurantByName}
        title="Create Restaurant by name"
      ></Button>
      <Button onPress={updateImage} title="Update image"></Button>
    </Screen>
  );
};

export default CreateMenuScreen;

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    // backgroundColor: colors.light,
  },
  container: {
    padding: 10,
  },
});
