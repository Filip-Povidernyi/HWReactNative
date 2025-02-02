import React from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler';
import { ActivityIndicator, View } from "react-native";
import styles from "./styles/appStyles.js";
import StackNavigation from "./navigation/StackNavigation.js";


const App = () => {

  const [fontsLoaded] = useFonts({
    'Roboto-Medium': require('./assets/fonts/Roboto/static/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto/static/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.section}>
        <ActivityIndicator size="large" />
      </View>
    );
  };


  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  )
};

export default App;