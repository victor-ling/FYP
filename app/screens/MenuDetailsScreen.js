import React, { useState, useEffect } from "react";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import {
  ActivityIndicator,
  Button,
  div,
  FlatList,
  Image,
  View,
  StyleSheet,
  ScrollView,
  Text,
} from "react-native";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import NumericInput from "react-native-numeric-input";

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

import { addToCart } from "../store/cartReducer";
import { useDispatch, useSelector } from "react-redux";
import cloneDeep from "lodash/cloneDeep";

function MenuDetailsScreen({ route, navigation }) {
  //items passed from HomeDetailsScreen
  const listing = route.params;

  const dispatch = useDispatch();

  const [theArray, setTheArray] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [menu, setMenu] = useState("");
  const [price, setPrice] = useState("");
  const [jsonData, setJsonData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchMenu = async () => {
      // reset the array in every search
      if (theArray.length > 0) {
        console.log(theArray);
        setTheArray((theArray) => []);
      }

      //get all documents from "menus" collection with specific document id
      //get one dish only, later on will fetch the nutrition info for this dish
      const q = query(
        collection(db, "menus"),
        where(documentId(), "==", listing.menuId)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const idAndDataArr = [doc.id, doc.data()];
        setTheArray((theArray) => [...theArray, idAndDataArr]);
      });
    };
    fetchMenu();
    console.log("menuDetailsScreen");
    console.log(theArray);
  }, []);

  const convertSpace = (string) => {
    const trimStr = string.trim();
    const returnStr = trimStr.replace(/ /g, "%20");
    console.log(returnStr);
    return returnStr;
  };
  //https://api.edamam.com/api/food-database/v2/parser?app_id=c54f74f6&app_key=3381834bf219f64f0b303c729c98131d&ingr=cheese%20burger&nutrition-type=cooking
  const appId = "c54f74f6";
  const appKey = "3381834bf219f64f0b303c729c98131d";
  const ingredient = convertSpace(listing.menuName);
  // console.log("ingredient");
  // console.log(ingredient);
  const nutritionType = "cooking";

  const gatherInfoArr = (quantity, price) => {
    //const cartArr = [{ quantity: quantity }, { price: price }, listing];
    if (cartData.length > 0) {
      setCartData((cartData) => []);
    }
    //add 2 proprities to the clone listing obj
    const listingClone = cloneDeep(listing);
    // var clone = cloneDeep(oldObjCopy);
    listingClone.quantity = quantity;
    listingClone.price = price;
    setCartData((theArray) => [...theArray, listingClone]);
  };

  const fetchMenuByName = async () => {
    try {
      // reset the array in every search
      if (jsonData.length > 0) {
        // console.log(theArray);
        setTheArray((jsonData) => []);
      }
      const response = await fetch(
        "https://api.edamam.com/api/food-database/v2/parser?app_id=" +
          appId +
          "&app_key=" +
          appKey +
          "&ingr=" +
          ingredient +
          "&nutrition-type=" +
          nutritionType
      );
      //   const response = await fetch(
      //     "https://api.edamam.com/api/food-database/v2/parser?app_id=c54f74f6&app_key=3381834bf219f64f0b303c729c98131d&ingr=cheese%20burger&nutrition-type=cooking"
      //   );
      const json = await response.json();
      if (json.parsed.length > 0) {
        setJsonData(json.parsed);
        console.log(json.parsed);
      } else if (json.hints.length > 0) {
        console.log("json.hints.length > 0");
        setJsonData([json.hints[0]]);
        console.log([json.hints[0]]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    // try {
    //   const docRef = await addDoc(collection(db, "menus"), {
    //     menuName: menu,
    //     restaurantId: listing[0],
    //     price: price,
    //     quota: 10,
    //     image: "https://picsum.photos/300/200",
    //   });
    //   alert("menu created");
    //   console.log("Document written with ID: ", docRef.id);
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    // }
  };

  useEffect(() => {
    fetchMenuByName();
    // gatherInfoArr(quantity, Number(listing[1].price) * quantity);
  }, []);

  //call gatherInfoArr whenever props "quantity" changes
  useEffect(() => {
    gatherInfoArr(quantity, Number(listing.price));
  }, [quantity]);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          style={styles.detailsContainer}
          ListHeaderComponent={
            <>
              <Image style={styles.image} source={{ url: listing.image }} />

              <AppText style={styles.title}>Dish: {listing.menuName}</AppText>
              <AppText style={styles.price}>
                Price: ${Number(listing.price) * quantity}
                {/*  *  */}
              </AppText>
              {/* <AppText style={styles.title}>id: {listing.menuId}</AppText> */}
              {/* <AppText style={styles.price}>${listing.price}</AppText> */}
              <View style={[styles.rowContainer, styles.userContainer]}>
                <AppText style={styles.title}>Quantity: </AppText>
                <NumericInput
                  value={quantity}
                  minValue={1}
                  maxValue={99}
                  onChange={(value) => {
                    setQuantity(value);
                    console.log(quantity);
                  }}
                />
              </View>

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
          data={jsonData}
          //extract the id
          keyExtractor={(item) => item.food.foodId}
          renderItem={({ item }) => (
            <>
              <ListItem
                title="Carbohydrate, by difference"
                subTitle={item.food.nutrients.CHOCDF + "g"}
                //   onPress={() => navigation.navigate("MenuDetails", item)}
              />
              <ListItem
                title="Energy"
                subTitle={item.food.nutrients.ENERC_KCAL + "kcal"}
                //   onPress={() => navigation.navigate("MenuDetails", item)}
              />
              <ListItem
                title="Total lipid (fat)"
                subTitle={item.food.nutrients.FAT + "g"}
                //   onPress={() => navigation.navigate("MenuDetails", item)}
              />
              <ListItem
                title="Fiber, total dietary"
                subTitle={item.food.nutrients.FIBTG + "g"}
                //   onPress={() => navigation.navigate("MenuDetails", item)}
              />
              <ListItem
                title="Protein"
                subTitle={item.food.nutrients.PROCNT + "g"}
                //   onPress={() => navigation.navigate("MenuDetails", item)}
              />
            </>
          )}
          //  <View style={styles.userContainer}>
          //   <ListItem
          //     image={require("../assets/mosh.jpg")}
          //     title="Mosh Hamedani"
          //     subTitle="5 Listings"
          //   />
          // </View>

          ListFooterComponent={
            <>
              <AppButton
                title="Add to cart"
                onPress={() => {
                  // gatherInfoArr(quantity, Number(listing[1].price) * quantity);
                  dispatch(addToCart(cartData[0]));
                  //navigation.navigate("Cart", cartData);
                }}
              />
              <View style={styles.space} />
            </>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  rowContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  space: {
    height: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginBottom: 20,
  },
});

export default MenuDetailsScreen;
