import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "../Screens/RegistrationScreen";
import LoginScreen from "../Screens/LoginScreen"
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../components/AppProvider";
import BottomTabNavigator from "./BottomTabNavigator";
import { Fragment } from "react";
import MapScreen from "../Screens/MapScreen";
import CommentsScreen from "../Screens/CommentsScreen";
import styles from "../styles/navigaterStyles";
import { colors } from "../styles/colorConstantStyle";
import Button from "../components/Button";
import BackArrow from "../icons/BackArrow";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../redux/redusers/userSelectors";


const MainStack = createStackNavigator();

const StackNavigation = () => {
    const isLogined = useSelector(selectIsAuth);


    return (
        <MainStack.Navigator
            initialRouteName={isLogined ? "Home" : "Login"}
            screenOptions={{
                headerRightContainerStyle: { paddingRight: 16 },
                headerLeftContainerStyle: { paddingLeft: 16 },
                headerStyle: styles.tabHeader,
                headerTitleStyle: styles.tabHeaderTitle,
                headerTitleAlign: "center",
            }}
            backBehavior="history">
            {isLogined ? (
                <Fragment>
                    <MainStack.Screen
                        name="Home"
                        component={BottomTabNavigator}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <MainStack.Screen
                        name="Map"
                        component={MapScreen}
                        options={({ navigation }) => ({
                            headerShown: true,
                            title: "Локація",
                            headerLeft: () => (
                                <Button onPress={() => navigation.goBack()}>
                                    <BackArrow />
                                </Button>
                            ),
                            headerRightContainerStyle: { paddingRight: 16 },
                            headerLeftContainerStyle: { paddingLeft: 16 },
                            headerStyle: styles.tabHeader,
                            headerTitleStyle: styles.tabHeaderTitle,
                            headerTitleAlign: "center",
                        })}
                    />
                    <MainStack.Screen
                        name="Comments"
                        component={CommentsScreen}
                        options={({ navigation }) => ({
                            title: "Коментарі",
                            headerStyle: { backgroundColor: colors.white, },
                            headerTitleStyle: styles.titleHeader,
                            headerLeft: () => (
                                <Button onPress={() => navigation.goBack()}>
                                    <BackArrow />
                                </Button>
                            ),
                        })}
                    />
                </Fragment>
            ) : (
                <Fragment>
                    <MainStack.Screen
                        name="Registration"
                        component={RegistrationScreen}
                        options={{ headerShown: false, }}
                    />
                    <MainStack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{ headerShown: false, }}
                    />
                </Fragment>
            )}
        </MainStack.Navigator>
    );
};

export default StackNavigation;