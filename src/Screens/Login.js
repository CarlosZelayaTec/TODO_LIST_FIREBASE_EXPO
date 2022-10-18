import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  TextInput,
  Button,
  themeColor,
} from "react-native-rapi-ui";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        <Button text="Entrar" status="danger" />
        <Button text="Registrarse" status="warning" />
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
