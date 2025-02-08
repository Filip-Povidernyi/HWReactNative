import { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/postsScreenStyles"
import MessageIcon from "../icons/MessageIcon";
import PinIcon from "../icons/PinIcon";
import { useSelector } from "react-redux";
import selectUser from "../redux/redusers/userSelectors";
import { getPosts } from "../utils/firestore";

const PostsScreen = ({ navigation }) => {

    const user = useSelector(selectUser);
    const userId = user.id;
    const avatar = user.profilePhoto;

    const [posts, setPosts] = useState([]);

    const getAllPosts = async () => {
        const result = await getPosts(userId);
        setPosts(result)
    };


    useEffect(() => {
        getAllPosts();
    }, []);

    return (

        <View style={styles.postsContainer}>
            <View style={styles.userContainer}>
                <Image
                    style={styles.avatarPhoto}
                    src={user.profilePhoto}
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
                                                postId: item.id,
                                                userId: item.userId,
                                                photo: item.photo,
                                                avatar,
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


export default PostsScreen;