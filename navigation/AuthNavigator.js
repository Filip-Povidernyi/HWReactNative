import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "../Screens/RegistrationScreen";
import LoginScreen from "../Screens/LoginScreen";
import PostsScreen from "../Screens/PostsScreen";
import Button from "../components/Button";
import LogOutIcon from "../icons/LogOutIcon";
import { colors } from "../styles/colorConstantStyle";
import { useNavigation } from "@react-navigation/native";


const MainStack = createStackNavigator();

const AuthNavigator = () => {

    const navigation = useNavigation();

    return (
        <MainStack.Navigator initialRouteName="Login">
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
            {/* <MainStack.Screen
                name="Home"
                component={PostsScreen}
                options={{
                    title: "Публікації",
                    headerStyle: {
                        backgroundColor: colors.white,
                    },
                    headerTintColor: colors.black_primary,
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        fontFamily: "Roboto",
                        fontSize: 17,
                        fontStyle: "normal",
                        fontWeight: "500",
                        lineHeight: 22,
                        letterSpacing: -0.408,
                    },
                    headerRightContainerStyle: {
                        paddingRight: 16
                    },
                    headerRight: () => (
                        <Button onPress={() => navigation.navigate("Login")}>
                            <LogOutIcon />
                        </ Button>
                    ),
                    headerLeft: null,
                }}
            /> */}
        </MainStack.Navigator>
    );
};

export default AuthNavigator;