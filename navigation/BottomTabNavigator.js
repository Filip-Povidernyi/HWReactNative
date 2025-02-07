import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "../Screens/PostsScreen";
import { colors } from "../styles/colorConstantStyle";
import Button from "../components/Button";
import LogOutIcon from "../icons/LogOutIcon";
import CreatePostsScreen from "../Screens/CreatePostsScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import PostsIcon from "../icons/PostsIcon";
import styles from "../styles/navigaterStyles";
import CrossIcon from "../icons/CrossIcon";
import BackArrow from "../icons/BackArrow";
import ProfileIcon from "../icons/ProfileIcon";
import { useDispatch } from "react-redux";
import { signOutUser } from "../redux/redusers/userOperations";


const Tabs = createBottomTabNavigator();

const BottomTabNavigator = () => {
    const dispatch = useDispatch();

    const handleLoginOut = () => {
        dispatch(signOutUser());
    }

    return (
        <Tabs.Navigator
            initialRouteName="Posts"
            screenOptions={({ navigation }) => ({
                headerRightContainerStyle: { paddingRight: 16 },
                headerLeftContainerStyle: { paddingLeft: 16 },
                headerStyle: styles.tabHeader,
                headerTitleStyle: styles.tabHeaderTitle,
                headerTitleAlign: "center",
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
                tabBarItemStyle: styles.tabIcon,
            })}
            backBehavior="history">
            <Tabs.Screen
                name="Posts"
                component={PostsScreen}
                options={({ navigation }) => ({
                    title: "Публікації",
                    headerRight: () => (
                        <Button onPress={() => handleLoginOut(navigation)}>
                            <LogOutIcon />
                        </ Button>
                    ),
                    headerLeft: null,
                    tabBarIcon: ({ focused }) => (
                        <Button
                            onPress={() => navigation.navigate("Posts")}
                        >
                            <PostsIcon strokeColor={focused ? colors.orange : colors.black_80} />
                        </ Button>
                    )
                })}

            />
            <Tabs.Screen
                name="CreatePosts"
                component={CreatePostsScreen}
                options={({ navigation }) => ({
                    title: "Створити публікацію",
                    headerStyle: { backgroundColor: colors.white, },
                    headerTitleStyle: styles.titleHeader,
                    headerLeft: () => (
                        <Button onPress={() => {
                            if (navigation.canGoBack()) {
                                navigation.goBack();
                            } else {
                                navigation.navigate("Posts");
                            }
                        }}>
                            <BackArrow />
                        </Button>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <CrossIcon />
                    ),
                    tabBarStyle: { display: "none" },
                })}
            />
            <Tabs.Screen
                name="Profile"
                component={ProfileScreen}
                options={({ navigation }) => ({
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Button
                            onPress={() => navigation.navigate("Profile")}
                        >
                            <ProfileIcon strokeColor={focused ? colors.orange : colors.black_80} />
                        </ Button>
                    ),
                })}
            />
        </Tabs.Navigator>
    );
};

export default BottomTabNavigator;
