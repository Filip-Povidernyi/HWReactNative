import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler';
import { ActivityIndicator, Text, View } from "react-native";
import styles from "./styles/appStyles.js";
import StackNavigation from "./navigation/StackNavigation.js";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/Store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { authStateChanged } from "./utils/auth.js";


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
    <Provider store={store.store}>
      <PersistGate
        loading={<Text>...Loading</Text>}
        persistor={store.persistor}
      >
        <AuthListener />
      </PersistGate>
    </Provider>
  )
};

const AuthListener = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    authStateChanged(dispatch);
  }, [dispatch]);
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  )
};

export default App;