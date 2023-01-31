import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import { TextInput, Button, themeColor } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/config";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLogged = async () => {
    try {
      const value = await AsyncStorage.getItem("@user_token");

      if (value !== null) navigation.replace("Home");
    } catch (e) {
      alert(e);
    }
  };

  const createUser = async () => {
    try {
      if (!!email && !!password) {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert("Creado con exito");
      } else {
        Alert.alert("Debe rellenar los campos vacíos");
      }
    } catch (e) {
      Alert.alert(e);
    }
  };

  const SignIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      await AsyncStorage.setItem("@user_token", response.user.uid);
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } catch (e) {
      alert("Credenciales invalidas");
    }
  };

  useEffect(() => {
    isLogged();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      backgroundColor={themeColor.black100}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          source={require("../../assets/background.jpg")}
          resizeMode="cover"
          style={styles.inner}
        >
          <View style={styles.containerItems}>
            <Image
              source={require("../../assets/user.png")}
              resizeMode="cover"
              style={styles.photo}
            />
            <View style={styles.containerInputs}>
              <TextInput
                placeholder="email"
                value={email}
                rightContent={
                  <Ionicons name="mail" size={23} color={themeColor.gray200} />
                }
                onChangeText={(e) => setEmail(e)}
              />
              <TextInput
                placeholder="contraseña"
                rightContent={
                  <Ionicons
                    name="lock-closed"
                    size={23}
                    color={themeColor.gray200}
                  />
                }
                value={password}
                onChangeText={(e) => setPassword(e)}
                secureTextEntry={true}
              />
            </View>
          </View>

          <View style={styles.containerButtons}>
            <Button
              text="Entrar"
              status="danger"
              onPress={SignIn}
              style={styles.buttons}
            />
            <Button
              text="Registrarse"
              onPress={createUser}
              style={[
                styles.buttons,
                { backgroundColor: themeColor.succes500 },
              ]}
            />
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    width: "90%",
    height: "45%",
  },
  containerInputs: {
    height: 150,
    width: "80%",
    justifyContent: "space-around",
    marginTop: 20,
  },
  containerButtons: {
    height: 110,
    justifyContent: "space-between",
  },
  buttons: {
    minWidth: "60%",
  },
  inner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 20,
  },
  photo: {
    width: "35%",
    height: "25%",
  },
  containerItems: {
    width: "100%",
    alignItems: "center",
    height: "60%",
    justifyContent: "flex-end",
  },
});

export default Login;
