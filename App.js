import { ThemeProvider } from "react-native-rapi-ui";
import Navigation from "./src/routes/config";
import { StatusBar } from "expo-status-bar";
import { LogBox } from "react-native";

// console.disableYellowBox = true;
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <ThemeProvider theme="light" >
      <Navigation />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
