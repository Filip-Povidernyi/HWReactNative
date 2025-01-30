import React from "react";
import { StyleSheet, View } from "react-native";
import RegistrationScreen from "./Screens/RegistrationScreen";
import { useFonts } from "expo-font";


export default App = () => {

  const [fontsLoaded] = useFonts({
    'Roboto-Medium': require('./assets/fonts/Roboto/static/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto/static/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  };

  return (
    <View style={{ flex: 1, }}>
      <RegistrationScreen />
    </View>
  )
};
