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
import { useAppContext } from "../components/AppProvider";
import { useNavigation } from "@react-navigation/native";


const Tabs = createBottomTabNavigator();

const BottomTabNavigator = () => {
    const { setIsLogined } = useAppContext();
    const navigation = useNavigation();

    const handleLoginOut = () => {
        setIsLogined(false);
    }

    return (
        <Tabs.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerRightContainerStyle: { paddingRight: 16 },
                headerLeftContainerStyle: { paddingLeft: 16 },
                headerStyle: styles.tabHeader,
                headerTitleStyle: styles.tabHeaderTitle,
                headerTitleAlign: "center",
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
                tabBarItemStyle: styles.tabIcon,
            }}
            backBehavior="history">
            <Tabs.Screen
                name="Home"
                component={PostsScreen}
                options={{
                    title: "Публікації",
                    headerRight: () => (
                        <Button onPress={() => handleLoginOut(navigation)}>
                            <LogOutIcon />
                        </ Button>
                    ),
                    headerLeft: null,
                    tabBarIcon: ({ focused }) => (
                        <Button
                            onPress={() => navigation.navigate("Home")}
                        >
                            <PostsIcon strokeColor={focused ? colors.orange : colors.black_80} />
                        </ Button>
                    )
                }}

            />
            <Tabs.Screen
                name="CreatePosts"
                component={CreatePostsScreen}
                options={{
                    title: "Створити публікацію",
                    headerStyle: { backgroundColor: colors.white, },
                    headerTitleStyle: styles.titleHeader,
                    headerLeft: () => (
                        <Button onPress={() => navigation.goBack()}>
                            <BackArrow />
                        </Button>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <CrossIcon />
                    ),
                    tabBarStyle: { display: "none" },
                }}
            />
            <Tabs.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Button
                            onPress={() => navigation.navigate("Profile")}
                        >
                            <ProfileIcon strokeColor={focused ? colors.orange : colors.black_80} />
                        </ Button>
                    ),
                }}
            />
        </Tabs.Navigator>
    );
};

export default BottomTabNavigator;
