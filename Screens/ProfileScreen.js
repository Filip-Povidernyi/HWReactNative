import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImageBackground, View, Image, TouchableOpacity, Text, FlatList, StyleSheet } from "react-native";
import { collection, getCountFromServer, onSnapshot, query, where } from "firebase/firestore";

import { db } from "../config";
import { signOutUser } from "../redux/redusers/userOperations";

import LogOutIcon from "../icons/LogOutIcon";
import MessageIcon from "../icons/MessageIcon";
import { MaterialIcons } from "@expo/vector-icons";
import PinIcon from "../icons/PinIcon";
import { selectUser } from "../redux/redusers/userSelectors";
import Button from "../components/Button";


const ProfileScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();

    const { id, avatar, name } = useSelector(selectUser);

    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        const postsRef = collection(db, "posts");

        const q = query(postsRef, where("id", "==", id));

        onSnapshot(q, async (querySnapshot) => {
            const posts = await Promise.all(
                querySnapshot.docs.map(async (doc) => {
                    const coll = collection(db, `posts/${doc.id}/comments`);
                    const snapshot = await getCountFromServer(coll);
                    console.log("ProfileScreen", posts);
                    return {
                        ...doc.data(),
                        postId: doc.id,
                        commentCount: snapshot.data().count,
                    };
                })
            );
            setPosts(posts);
        });
    };

    useEffect(() => {
        getPosts();
    }, []);


    return (
        <View style={styles.container}>
            <ImageBackground source={require("../assets/images/PhotoBG.png")} style={styles.imageBg}>
                <View style={styles.profileContainer}>
                    <View style={{ marginBottom: 40 }}>
                        <View style={styles.imgContainer}>
                            {avatar && <Image style={styles.avatar} source={{ uri: avatar }} />}
                            <TouchableOpacity
                                style={styles.icon}
                            >
                                <MaterialIcons name="close" size={20} color="#E8E8E8" />
                            </TouchableOpacity>
                        </View>
                        <Button onPress={() => dispatch(signOutUser())} buttonStyle={{ marginLeft: "auto", marginTop: -40 }}>
                            <LogOutIcon />
                        </Button>
                    </View>
                    <Text style={styles.name}>{name}</Text>
                    {posts && (
                        <FlatList
                            data={posts}
                            keyExtractor={(item) => item.postId}
                            renderItem={({ item }) => (
                                <View style={{ marginBottom: 34 }}>
                                    <Image style={styles.photo} source={{ uri: item.photo }} />
                                    <Text style={styles.title}>{item.title}</Text>

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
                                                    postId: item?.postId,
                                                    uri: item.photo,
                                                })
                                            }
                                        >
                                            <MessageIcon />
                                            <Text style={styles.count}>{item.commentCount}</Text>
                                        </TouchableOpacity>
                                        <View>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    navigation.navigate("Map", {
                                                        latitude: item?.coords?.latitude,
                                                        longitude: item?.coords?.longitude,
                                                    })
                                                }
                                                style={{ flexDirection: "row", alignItems: "center" }}
                                            >
                                                <PinIcon />
                                                <Text style={styles.place}>{item.place}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            )}
                        />
                    )}
                </View>
            </ImageBackground>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    imageBg: {
        flex: 1,
        width: "100%",
    },
    profileContainer: {
        // vkvjk
    },
    imgContainer: {
        // vkvjk
    },
    avatar: {
        // vkvjk
    },
    icon: {
        // vkvjk
    },
    name: {
        // vkvjk
    },
    photo: {
        // vkvjk
    },
    place: {
        // vkvjk
    },
    title: {
        // gas
    },

});

export default ProfileScreen;