import React, { useEffect, useState } from "react";
import { Image, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import image from "../assets/images/PhotoBG.png"
import styles from "../styles/registrationStyles.js"
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../redux/redusers/userOperations.js";
import * as ImagePicker from 'expo-image-picker';
import selectUser from "../redux/redusers/userSelectors.js";
import LogOutIcon from "../icons/LogOutIcon.js";
import { FlatList } from "react-native-gesture-handler";
import { getPosts, getUserPosts, updateUserInFirestore } from "../utils/firestore.js";
import MessageIcon from "../icons/MessageIcon.js";
import PinIcon from "../icons/PinIcon.js";
import uploadImageToCloudinary from "../components/CloudinaryUpload.js";
import LikeIcon from "../icons/LikeIcon.js";



const RegistrationScreen = ({ navigation }) => {

    const user = useSelector(selectUser);
    const userId = user.id;

    const dispatch = useDispatch();

    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(user.avatar);
    const [isAvatarLoading, setIsAvatarLoading] = useState(false);
    const [posts, setPosts] = useState([]);



    const getAllPosts = async (userId) => {
        const result = await getUserPosts(userId);
        const allPosts = result.posts;
        setPosts(allPosts);
    };

    useEffect(() => {
        getAllPosts(userId);
    }, []);

    const handleLoginOut = () => {
        dispatch(signOutUser());
    };

    const onAddAvatar = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                const avatarUpload = await uploadImageToCloudinary(result.assets[0].uri);
                setSelectedAvatar(avatarUpload);
                await updateUserInFirestore(user.id, { profilePhoto: avatarUpload });
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Помилка', 'Не вдалося вибрати зображення');
        }
    };

    const onRemoveAvatar = () => {
        setSelectedAvatar(null);
    };


    return (
        <ImageBackground
            source={image}
            resizeMode="cover"
            style={styles.bgimage}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={{ flex: 1, justifyContent: "flex-end", }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <View style={{
                        ...styles.registrContainer,
                        height: keyboardVisible ? 374 : 549,
                        paddingTop: 92,
                    }}>
                        <Button onPress={() => handleLoginOut(navigation)} buttonStyle={styles.logoutButtonWrapper}>
                            <LogOutIcon />
                        </ Button>
                        <View style={styles.avatarContainer}>
                            {isAvatarLoading ? (
                                <View style={[styles.avatar, styles.centered]}>
                                    <ActivityIndicator color={colors.accent} />
                                </View>
                            ) : (
                                <Image
                                    source={{ uri: selectedAvatar }}
                                    style={styles.avatar}
                                />
                            )}
                            <TouchableOpacity
                                style={[
                                    styles.addButton,
                                    selectedAvatar && styles.removeButton,
                                ]}
                                onPress={selectedAvatar ? onRemoveAvatar : onAddAvatar}
                            >
                                <Text
                                    style={[
                                        styles.addButtonText,
                                        selectedAvatar && styles.removeButtonText,
                                    ]}
                                >
                                    {selectedAvatar ? 'x' : '+'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.title}>{user.displayName}</Text>
                        <View style={{ paddingBottom: 130 }}>
                            {posts && posts.length > 0 ? (
                                <FlatList
                                    data={posts}
                                    keyExtractor={(item, indx) => indx.toString()}
                                    initialNumToRender={4}
                                    maxToRenderPerBatch={4}
                                    windowSize={2}
                                    ItemSeparatorComponent={() => <View style={{ height: 34 }} />}
                                    renderItem={({ item }) => (
                                        <View style={{ paddingHorizontal: 16 }}>
                                            <Image style={styles.postPhoto} src={item.photo} />
                                            <Text style={styles.postTitle}>{item.title}</Text>
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <View style={{
                                                    flexDirection: "row", gap: 24,
                                                }}>
                                                    <TouchableOpacity
                                                        style={{ flexDirection: "row", alignItems: "center" }}
                                                        onPress={() =>
                                                            navigation.navigate("Comments", {
                                                                postId: item.postId,
                                                                photo: item.photo,
                                                                userId,
                                                            })
                                                        }
                                                    >
                                                        <MessageIcon />
                                                        <Text style={styles.count}>{item.commentCount || 0}</Text>
                                                    </TouchableOpacity>
                                                    <View style={{ flexDirection: "row" }}>
                                                        <LikeIcon />
                                                        <Text style={styles.count}>{item.likeCount || (item.postId - 1738929940500)}</Text>
                                                    </View>
                                                </View>
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
                                />

                            ) : (
                                <View style={styles.textCont}>
                                    <Text style={styles.text}>Ще немає жодного посту</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </ImageBackground >
    )
};

export default RegistrationScreen;