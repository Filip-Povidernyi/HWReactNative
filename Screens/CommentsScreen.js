import { useEffect, useState } from "react";
import {
    View,
    Image,
    TextInput,
    TouchableWithoutFeedback,
    TouchableOpacity,
    FlatList,
    Keyboard,
    Platform,
    KeyboardAvoidingView,
    StyleSheet,
} from "react-native";

import { addDoc, collection, onSnapshot, query, Timestamp } from "firebase/firestore";

import { colors } from "../styles/colorConstantStyle";

import { useSelector } from "react-redux";
import selectUser from "../redux/redusers/userSelectors";
import { db } from "../config";
import Comment from "../components/Comment";
import SendIcon from "../icons/SendIcon";
import { getUserPosts } from "../utils/firestore";


const CommentsScreen = ({ route }) => {
    const { postId, photo, userId, index } = route.params;
    const user = useSelector(selectUser);


    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [commentText, setCommentText] = useState("")
    const [comment, setComment] = useState(false);
    const [comments, setComments] = useState(null);
    const [error, setError] = useState("");


    const getComments = async (userId) => {
        const postsData = await getUserPosts(userId);
        const commentsArr = postsData.posts.filter((item) => item.postId === postId);
        setComments(commentsArr[0].comments);
    }


    useEffect(() => {
        getComments(userId);
    }, []);

    const updateComments = async (userId, postId, data) => {
        const postsRef = doc(db, "posts", userId); // Референс до документа

        try {
            const docSnap = await getDoc(postsRef);
            if (docSnap.exists()) {
                const posts = docSnap.data().posts; // Завантажуємо масив постів
                console.log('posts', posts);

                // Знаходимо потрібний пост за його postId
                const postIndex = posts.findIndex((post) => post.postId === postId);
                if (postIndex !== -1) {
                    // Оновлюємо comments
                    posts[postIndex].comments = [
                        ...posts[postIndex].comments || [],
                        data,
                    ];

                    // Оновлюємо документ у Firestore
                    await updateDoc(postsRef, { posts });
                    console.log("Коментарі оновлені");
                } else {
                    console.log("Пост із таким postId не знайдено");
                }
            } else {
                console.log("Документ не знайдено");
            }
        } catch (error) {
            console.error("Помилка оновлення коментарів:", error);
        }
    };

    const commentDate = () => {
        const date = new Date();
        const formDate = date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        })
        const formTime = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
        return `${formDate} | ${formTime}`
    }

    const createComment = () => {
        return {
            text: commentText,
            date: commentDate(),
            avatar: user.profilePhoto,
        }
    }


    const sendSubmit = () => {
        setKeyboardVisible(false);
        const newComment = createComment();
        updateComments(userId, postId, newComment)
        setComments((prevComments) => (prevComments ? [...prevComments, newComment] : [newComment]));
        setCommentText("");
    };


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={{
                    ...styles.registrContainer,
                    height: keyboardVisible ? "100%" : "100%",
                    paddingTop: 32,
                    paddingBottom: keyboardVisible ? 450 : 16,
                }}>
                    <View style={styles.innerContainer}>
                        <Image source={{ uri: photo }} style={styles.image} />
                        <View style={styles.commentsContainer}>
                            {comments && comments.length > 0 ? (
                                <FlatList
                                    style={styles.commentsList}
                                    data={comments}
                                    renderItem={({ item }) => (
                                        <Comment
                                            text={item.text}
                                            date={item.date}
                                            avatar={item.avatar}
                                            align={item.align}
                                        />
                                    )}
                                />) : (<View />)
                            }
                        </View>
                        <View>
                            <View style={[styles.inputTextContainer, comment && styles.onFocused]}>
                                <TextInput
                                    style={styles.baseText}
                                    value={commentText}
                                    onChangeText={(text) => setCommentText(text)}
                                    placeholder="Коментувати..."
                                    multiline={true}
                                    placeholderTextColor={colors.text_gray}
                                    autoCapitalize="sentences"
                                    onFocus={() => { setComment(true), setKeyboardVisible(true) }}
                                    onBlur={() => { setComment(false), setKeyboardVisible(false) }}
                                />
                                <TouchableOpacity style={styles.sendBtn} onPress={sendSubmit}>
                                    <SendIcon />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 240,
        borderRadius: 8,
    },
    registrContainer: {
        width: "100%",
        backgroundColor: colors.white,
        alignSelf: "center",
        paddingHorizontal: 16,
    },
    innerContainer: {
        flex: 1,
        justifyContent: "space-between",
    },
    commentsContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
        marginTop: 32,
        marginBottom: 32,
    },
    inputTextContainer: {
        width: "100% ",
        height: 50,
        alignItems: "center",
        flexDirection: "row",
        borderColor: colors.border_gray,
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: colors.light_gray,
        paddingHorizontal: 16,
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        fontWeight: 400,
    },
    onFocused: {
        borderColor: colors.orange,
    },
    coverBtnContainer: {
        marginLeft: 16,
    },
    baseText: {
        flex: 1,
        paddingVertical: 10,
        fontSize: 16,
        color: colors.black_primary,
    },
    sendBtn: {
        height: 34,
        width: 34,
        borderRadius: 100,
        position: "absolute",
        right: 4,
        bottom: 8,
    },
    commentsList: {
        flex: 1,
        width: "100%",
    },
    keyboardAvoidingView: {
        flex: 1,
    },
});

export default CommentsScreen;