import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";

import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import Screen from "../components/Screen";

const menuItems = [
  //   {
  //     title: "My ordering history",
  //     icon: {
  //       name: "format-list-bulleted",
  //       backgroundColor: colors.primary,
  //     },
  //   },
  {
    title: "Order cart",
    icon: {
      name: "cart",
      backgroundColor: colors.primary,
    },
    targetScreen: "Cart",
  },
  //   {
  //     title: "My Messages",
  //     icon: {
  //       name: "email",
  //       backgroundColor: colors.secondary,
  //     },
  //   },
];

function MeScreen({ navigation }) {
  const auth = getAuth();
  const handleLogout = () => {
    console.log("sign out");
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        //navigation.replace("WelcomeScreen");
      })
      .catch((error) => {
        // An error happened.
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + " " + errorMessage);
      });
  };
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title="Victor Ling"
          subTitle={auth.currentUser?.email}
          //image={require("../assets/mosh.jpg")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={handleLogout}
      />
      {/* <Text>Home Screen</Text>
      <Text>Email: {auth.currentUser?.email}</Text>
      <Text>ID: {auth.currentUser?.uid}</Text>
      <Text>{route.name}</Text>
      <AppButton title="Logout" onPress={handleLogout} /> */}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});

export default MeScreen;
