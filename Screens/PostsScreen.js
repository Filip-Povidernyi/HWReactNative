import { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../styles/colorConstantStyle";
import MessageIcon from "../icons/MessageIcon";
import PinIcon from "../icons/PinIcon";
import { useSelector } from "react-redux";
import selectUser from "../redux/redusers/userSelectors";
import { getUserPosts } from "../utils/firestore";

const PostsScreen = ({ navigation }) => {

    const user = useSelector(selectUser);
    const userId = user.id;

    const [posts, setPosts] = useState([]);

    const getAllPosts = async () => {
        const result = await getUserPosts(user.id);
        setPosts(result.posts)
    };


    useEffect(() => {
        getAllPosts();
    }, []);

    return (

        <View style={styles.postsContainer}>
            <View style={styles.userContainer}>
                <Image
                    style={styles.avatarPhoto}
                    src={
                        user.profilePhoto
                    }
                    resizeMode="cover"
                />
                <View style={styles.userData}>
                    <Text style={styles.userName}>{user.displayName}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                </View>
            </View>
            <View style={{ paddingBottom: 130 }}>
                {posts && posts.length > 0 ?
                    (<FlatList
                        data={posts}
                        keyExtractor={(item, indx) => indx.toString()}
                        ItemSeparatorComponent={() => <View style={{ height: 34 }} />}
                        renderItem={({ item, index }) => (
                            <View>
                                <Image style={styles.postPhoto} src={item.photo} />
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
                                            navigation.navigate("Comments", {
                                                postId: item.postId,
                                                photo: item.photo,
                                                userId,
                                                index,
                                            })
                                        }
                                    >
                                        <MessageIcon />
                                        <Text style={styles.count}>{item.commentCount || 0}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate("Map", {
                                                coords: item.coords,
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
                    />) : (
                        null
                    )
                }
            </View>
        </View>
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