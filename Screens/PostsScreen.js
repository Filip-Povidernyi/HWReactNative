import { useEffect, useState } from "react";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../styles/colorConstantStyle";
import MessageIcon from "../icons/MessageIcon";
import PinIcon from "../icons/PinIcon";

const PostsScreen = ({ navigation, route }) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (route.params) {
            setPosts((prevState) => [...prevState, route.params]);
        }
    }, [route.params]);

    return (
        <GestureHandlerRootView>
            <View style={styles.postsContainer}>
                <View style={styles.userContainer}>
                    <Image
                        style={styles.avatarPhoto}
                        source={require("../assets/images/avatar.png")}
                        resizeMode="cover"
                    />
                    <View style={styles.userData}>
                        <Text style={styles.userName}>Natali Romanova</Text>
                        <Text style={styles.userEmail}>email@example.com</Text>
                    </View>
                </View>

                <View>
                    <FlatList
                        data={posts}
                        keyExtractor={(item, indx) => indx.toString()}
                        ItemSeparatorComponent={() => <View style={{ height: 34 }} />}
                        renderItem={({ item }) => (
                            <View>
                                <Image style={styles.postPhoto} source={{ uri: item.photo }} />
                                <Text style={styles.postTitle}>{item.title}</Text>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{ flexDirection: "row", alignItems: "center" }}
                                        onPress={() =>
                                            navigation.navigate("Comments", { post: item })
                                        }
                                    >
                                        <MessageIcon />
                                        <Text style={styles.count}>0</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate("Map", {
                                                latitude: item.coords.latitude,
                                                longitude: item.coords.longitude,
                                            })
                                        }
                                        style={{ flexDirection: "row", alignItems: "center" }}
                                    >
                                        <PinIcon />
                                        <Text style={styles.place}>{item.place}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    postsContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 32,
        paddingBottom: 34,
        backgroundColor: colors.white,
    },
    userContainer: {
        gap: 8,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginBottom: 32,
    },
    avatarPhoto: {
        width: 60,
        height: 60,
        borderRadius: 16,
    },
    userData: {
        gap: 0,
    },
    userName: {
        color: colors.black_primary,
        fontFamily: "Roboto-Bold",
        fontSize: 13,
    },
    userEmail: {
        color: colors.black80,
        fontFamily: "Roboto-Regular",
        fontSize: 11,
    },
    postPhoto: {
        marginBottom: 8,
        width: "100%",
        height: 240,
        overflow: "hidden",
        objectFit: "cover",
        borderRadius: 8,
    },
    postTitle: {
        marginBottom: 11,
        fontFamily: "Roboto-Medium",
        fontSize: 16,
        color: colors.black_primary,
    },

})

export default PostsScreen;