import React, { useState, useEffect } from "react";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import {
  Button,
  FlatList,
  Image,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";

import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";

import { db } from "../../firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  documentId,
  setDoc,
  updateDoc,
  query,
  getDocs,
  where,
} from "firebase/firestore";

function HomeDetailsScreen({ route, navigation }) {
  const listing = route.params;

  const [theArray, setTheArray] = useState([]);
  useEffect(() => {
    const fetchMenu = async (props) => {
      // reset the array in every search
      if (theArray.length > 0) {
        // console.log(theArray);
        setTheArray((theArray) => []);
      }

      //get all documents from "menus" collection with specific document id
      const q = query(
        collection(db, "menus"),
        where("restaurantId", "==", listing.restaurantId)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const idAndDataArr = { ...doc.data(), menuId: doc.id };
        setTheArray((theArray) => [...theArray, idAndDataArr]);
      });
    };
    fetchMenu();
    console.log("bbbb");
    console.log(theArray);
  }, []);

  const [menu, setMenu] = useState("");
  const [price, setPrice] = useState("");
  const createMenuByNameAndPrice = async () => {
    try {
      const docRef = await addDoc(collection(db, "menus"), {
        menuName: menu,
        restaurantId: listing.restaurantId,
        price: price,
        quota: 10,
        image: "https://picsum.photos/300/200",
      });
      alert("menu created");
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <FlatList
      style={styles.detailsContainer}
      ListHeaderComponent={
        <>
          <Image style={styles.image} source={{ url: listing.image }} />

          <AppText style={styles.title}>
            Restaurant: {listing.restaurantName}
          </AppText>
          <View style={styles.userContainer}></View>
          {/* <AppText style={styles.title}>id: {listing.restaurantId}</AppText> */}
          {/* <AppText style={styles.price}>${listing.price}</AppText> */}

          {/* <AppTextInput
            value={menu}
            autoCapitalize="none"
            autoCorrect={false}
            icon="store-search"
            // keyboardType="email-address"
            onChangeText={(text) => setMenu(text)}
            //process the value when enter is pressed
            // name="email"
            placeholder="menu name"
            textContentType="none"
          />
          <AppTextInput
            value={price}
            autoCapitalize="none"
            autoCorrect={false}
            icon="store-search"
            // keyboardType="email-address"
            keyboardType="numeric"
            onChangeText={(text) => setPrice(text)}
            //process the value when enter is pressed
            // name="email"
            placeholder="price"
            textContentType="none"
          />
          <Button
            onPress={createMenuByNameAndPrice}
            title="Create menu by name and price"
          ></Button> */}
        </>
      }
      // style={styles.cardBackground}
      data={theArray}
      //extract the id
      keyExtractor={(listing) => listing.menuId}
      renderItem={({ item }) => (
        <ListItem
          image={{ url: item.image }}
          title={item.menuName}
          subTitle={"$" + item.price}
          onPress={() => navigation.navigate("MenuDetails", item)}
        />
      )}
      //  <View style={styles.userContainer}>
      //   <ListItem
      //     image={require("../assets/mosh.jpg")}
      //     title="Mosh Hamedani"
      //     subTitle="5 Listings"
      //   />
      // </View>

      ListFooterComponent={<View style={styles.space} />}
    />
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 20,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  space: {
    height: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 10,
  },
});

export default HomeDetailsScreen;
