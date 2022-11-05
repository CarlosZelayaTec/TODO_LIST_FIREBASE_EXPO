import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import {
  TextInput,
  Button,
  themeColor,
} from "react-native-rapi-ui";

import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUser = async() => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert('Creado con exito');
    } catch (e) {
        Alert.alert(e);
    }
  }

  const SignIn = async () => {
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        navigation.push('Home', {"user": response.user.uid});
    } catch (e) {
        alert("Credenciales invalidas");
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      backgroundColor={themeColor.primary200}
    >
      <Image
        source={require("../../assets/login.png")}
        resizeMode="contain"
        style={styles.banner}
      />

      <View style={styles.containerInputs}>
        <TextInput
          placeholder="email"
          value={email}
          onChangeText={(e) => setEmail(e)}
        />
        <TextInput
          placeholder="contraseña"
          value={password}
          onChangeText={(e) => setPassword(e)}
          secureTextEntry={true}
        />
      </View>

      <View style={styles.containerButtons}>
        <Button text="Entrar" status="danger" onPress={SignIn} />
        <Button text="Registrarse" status="warning" onPress={createUser} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  banner: {
    width: "90%",
    height: "45%",
  },
  containerInputs: {
    margin: 10,
    height: 100,
    width: "80%",
    justifyContent: "space-around",
  },
  containerButtons: {
    height: 110,
    justifyContent: "space-between",
  },
});

export default Login;
