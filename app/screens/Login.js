import React, { useState } from "react";
import { Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";

import Screen from "../components/Screen";

function Login(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      if (user) {
        navigation.goBack();
      }
    });
    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("Register with: ", user.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + " " + errorMessage);
      });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Login in with: ", user.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + " " + errorMessage);
      });
  };

  return (
    <Screen style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/health-food-welcome.png")}
      />
      <AppTextInput
        autoCapitalize="none"
        autoCorrect={false}
        icon="email"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        // name="email"
        placeholder="Email"
        textContentType="emailAddress"
      />
      <AppTextInput
        autoCapitalize="none"
        autoCorrect={false}
        icon="lock"
        onChangeText={(text) => setPassword(text)}
        //name="password"
        placeholder="Password"
        secureTextEntry
        textContentType="password"
      />
      <AppButton title="Login" onPress={handleLogin} />
    </Screen>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },

  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});
