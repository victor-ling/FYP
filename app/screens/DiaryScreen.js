import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import Screen from "../components/Screen";
import Card from "../components/Card";
import { ListItem } from "../components/lists";

const menuItems = [
  //   {
  //     title: "My ordering history",
  //     icon: {
  //       name: "format-list-bulleted",
  //       backgroundColor: colors.primary,
  //     },
  //   },
  {
    title: "Burger",
    subtitle: "182 kcal, 323 g",
  },
  {
    title: "Cheese Burger",
    subtitle: "1822 kcal, 3223 g",
  },
  //   {
  //     title: "My Messages",
  //     icon: {
  //       name: "email",
  //       backgroundColor: colors.secondary,
  //     },
  //   },
];

const DiaryScreen = ({ navigation }) => {
  return (
    <Screen>
      <View style={styles.detailsContainer}>
        <Text>DiaryScreen</Text>
        <View>
          {/* <Text>Breakfast</Text> */}
          <Card title="Breakfast">
            <FlatList
              data={menuItems}
              keyExtractor={(menuItem) => menuItem.title}
              renderItem={({ item }) => (
                <ListItem title={item.title} subTitle={item.subtitle} />
              )}
            />
            <Button
              title="ADD FOOD"
              onPress={() => navigation.navigate("FetchNutrition")}
            ></Button>
          </Card>
          {/*  subTitle={"$" + item.price}
             image={{ url: item.image }}
             onPress={() => navigation.navigate("HomeDetails", item)} */}
        </View>
        <View>
          {/* <Text>Breakfast</Text> */}
          <Card title="Lunch">
            <FlatList
              data={menuItems}
              keyExtractor={(menuItem) => menuItem.title}
              renderItem={({ item }) => (
                <ListItem title={item.title} subTitle={item.subtitle} />
              )}
            />
            <Button
              title="ADD FOOD"
              onPress={() => navigation.navigate("FetchNutrition")}
            ></Button>
          </Card>
          {/*  subTitle={"$" + item.price}
             image={{ url: item.image }}
             onPress={() => navigation.navigate("HomeDetails", item)} */}
        </View>
        <View>
          {/* <Text>Breakfast</Text> */}
          <Card title="Dinner">
            <FlatList
              data={menuItems}
              keyExtractor={(menuItem) => menuItem.title}
              renderItem={({ item }) => (
                <ListItem title={item.title} subTitle={item.subtitle} />
              )}
            />
            <Button
              title="ADD FOOD"
              onPress={() => navigation.navigate("FetchNutrition")}
            ></Button>
          </Card>
          {/*  subTitle={"$" + item.price}
             image={{ url: item.image }}
             onPress={() => navigation.navigate("HomeDetails", item)} */}
        </View>
      </View>
    </Screen>
  );
};

export default DiaryScreen;

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
});
