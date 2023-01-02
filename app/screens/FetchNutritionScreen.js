import React, { useState, useEffect } from "react";
import { Button, FlatList, StyleSheet, Text } from "react-native";

import Screen from "../components/Screen";

import AppTextInput from "../components/AppTextInput";
import ListItem from "../components/lists/ListItem";

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

const FetchNutritionScreen = ({ navigation }) => {
  const [foodName, setFoodName] = useState("");
  const [theArray, setTheArray] = useState([]);
  const [jsonData, setJsonData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  //fetchFoodNutritionByName
  const onSubmitEditing = async () => {
    console.log(foodName);
    //reset the array in every search
    if (theArray.length > 0) {
      setTheArray((theArray) => []);
    }

    const convertSpace = (string) => {
      const trimStr = string.trim();
      const returnStr = trimStr.replace(/ /g, "%20");
      console.log(returnStr);
      return returnStr;
    };
    //https://api.edamam.com/api/food-database/v2/parser?app_id=c54f74f6&app_key=3381834bf219f64f0b303c729c98131d&ingr=cheese%20burger&nutrition-type=cooking
    const appId = "c54f74f6";
    const appKey = "3381834bf219f64f0b303c729c98131d";
    const ingredient = convertSpace(foodName);
    console.log("ingredient");
    console.log(ingredient);
    const nutritionType = "cooking";

    // const gatherInfoArr = (quantity, price) => {
    //   //const cartArr = [{ quantity: quantity }, { price: price }, listing];
    //   if (cartData.length > 0) {
    //     setCartData((cartData) => []);
    //   }
    //   //add 2 proprities to the clone listing obj
    //   const listingClone = cloneDeep(listing);
    //   // var clone = cloneDeep(oldObjCopy);
    //   listingClone.quantity = quantity;
    //   listingClone.price = price;
    //   setCartData((theArray) => [...theArray, listingClone]);
    // };

    function removeDuplicates(arr) {
      var unique = [];
      var uniqueId = [];
      arr.forEach((element) => {
        if (!uniqueId.includes(element.food.foodId)) {
          unique.push(element);
          uniqueId.push(element.food.foodId);
        }
      });
      return unique;
    }

    const fetchMenuByName = async () => {
      try {
        // reset the array in every search
        if (jsonData.length > 0) {
          // console.log(theArray);
          setTheArray((jsonData) => []);
        }
        //"https://api.edamam.com/api/food-database/v2/parser?app_id=c54f74f6&app_key=3381834bf219f64f0b303c729c98131d&ingr=cheese%20burger&nutrition-type=cooking"
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

        const json = await response.json();
        if (json.hints.length > 0) {
          console.log("json.hints.length > 0");
          // setJsonData([json.hints[0]]);
          // console.log([json.hints[0]]);

          //filter out the items with same id
          const uniqueIdArr = removeDuplicates(json.hints);

          console.log("uniqueIdArr");
          console.log(uniqueIdArr);
          setJsonData(uniqueIdArr);

          // setJsonData(json.hints);
          // console.log(json.hints);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    // useEffect(() => {
    //   fetchMenuByName();
    //   // gatherInfoArr(quantity, Number(listing[1].price) * quantity);
    // }, []);
    fetchMenuByName();
  };

  return (
    <Screen style={styles.screen}>
      <Text>Get food nutrition by food name!</Text>
      <AppTextInput
        value={foodName}
        autoCapitalize="none"
        autoCorrect={false}
        icon="store-search"
        onChangeText={(text) => setFoodName(text)}
        //process the value when enter is pressed
        onSubmitEditing={onSubmitEditing}
        placeholder="food name"
        textContentType="none"
      />
      <FlatList
        data={jsonData}
        //extract the id
        keyExtractor={(item) => item.food.foodId}
        renderItem={({ item }) => (
          <>
            <ListItem
              title={item.food.label}
              subTitle={
                item.food.nutrients.ENERC_KCAL.toFixed(0) +
                "kcal, " +
                item.measures[0].weight.toFixed(0) +
                "g"
              }
              // onPress={() => navigation.navigate("MenuDetails", item)}
            />
          </>
        )}
      />
    </Screen>
  );
};

export default FetchNutritionScreen;

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    // backgroundColor: colors.light,
  },
  container: {
    padding: 10,
  },
});
