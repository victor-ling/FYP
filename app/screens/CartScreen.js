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
import { useDispatch, useSelector } from "react-redux";
import { cartTotalPriceSelector } from "../store/selectors";
import { clear } from "../store/cartReducer";

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

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const totalPrice = useSelector(cartTotalPriceSelector);
  const [isLoading, setLoading] = useState(true);
  const [totalMenu, setTotalMenu] = useState([]);

  // const listing = route.params;
  // console.log("listing");
  // console.log(listing.length);
  // console.log(listing);

  // const gatherInfoArr = () => {
  //   //const cartArr = [{ quantity: quantity }, { price: price }, listing];
  //   // if (listing.length > 0) {
  //   //   listing = [];
  //   // }
  //   setTotalMenu((theArray) => [...theArray, listing]);
  //   console.log("totalMenu");
  // };

  // useEffect(() => {
  //   gatherInfoArr();
  // }, [route]);

  return (
    <FlatList
      style={styles.detailsContainer}
      ListHeaderComponent={<></>}
      data={cart}
      keyExtractor={(item) => {
        item.menuId;
      }}
      renderItem={({ item }) => (
        <ListItem
          image={{ url: item.image }}
          title={item.menuName} //fetchRestaurantNameById
          subTitle={"Quantity:" + item.quantity}

          //   onPress={() => navigation.navigate("MenuDetails", item)}
        />
      )}
      ListFooterComponent={
        <>
          <View>
            {cart.length === 0 ? (
              <Text style={styles.checkoutText}>Your cart is empty</Text>
            ) : (
              <>
                <Text style={styles.checkoutText}>Total: ${totalPrice}</Text>
                <AppButton
                  title="Add another food"
                  onPress={() => {
                    // gatherInfoArr(quantity, Number(listing[1].price) * quantity);

                    navigation.navigate("Home");
                  }}
                />
                <AppButton
                  title="Clear the cart"
                  onPress={() => {
                    // gatherInfoArr(quantity, Number(listing[1].price) * quantity);

                    dispatch(clear());
                  }}
                />
                <View style={styles.space} />
              </>
            )}
          </View>
        </>
      }
    />
  );
};
export default CartScreen;

const styles = StyleSheet.create({
  checkoutText: {
    color: colors.medium,
  },
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
    marginVertical: 40,
  },
});
