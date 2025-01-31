import React from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler';
// import { createStackNavigator } from "@react-navigation/stack";
// import ProfileScreen from "./Screens/ProfileScreen";
// import PostsScreen from "./Screens/PostsScreen";
// import MapScreen from "./Screens/MapScreen";
// import CreatePostsScreen from "./Screens/CreatePostsScreen";
// import CommentsScreen from "./Screens/CommentsScreen";
// import Button from "./components/Button";
// import LogOutIcon from "./icons/LogOutIcon";
// import { colors } from "./styles/colorConstantStyle";
import { ActivityIndicator, View } from "react-native";
import styles from "./styles/appStyles.js";
import AuthNavigator from "./navigation/AuthNavigator.js";
import BottomTabNavigator from "./navigation/BottomTabNavigator.js";
import { AppProvider, useAppContext } from "./components/AppProvider.js";


const App = () => {

  const [fontsLoaded] = useFonts({
    'Roboto-Medium': require('./assets/fonts/Roboto/static/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto/static/Roboto-Regular.ttf'),
  });

  const { isLogined } = useAppContext();

  if (!fontsLoaded) {
    return (
      <View style={styles.section}>
        <ActivityIndicator size="large" />
      </View>
    );
  };


  return (
    <NavigationContainer>
      {isLogined ? (
        <BottomTabNavigator />
      ) : (
        <AuthNavigator />
      )}
      {/* <MainStack.Navigator>
          <MainStack.Screen
            name="Map"
            component={MapScreen}
          />
          <MainStack.Screen
            name="Comments"
            component={CommentsScreen}
          />
        </MainStack.Navigator> */}
    </NavigationContainer>
  )
};

export default App;