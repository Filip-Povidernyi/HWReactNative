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

import { doc, collection, getDoc, onSnapshot, query, Timestamp, setDoc } from "firebase/firestore";

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
    const [comments, setComments] = useState([]);
    const [data, setData] = useState({});


    const getComments = async (userId) => {
        const postsData = await getUserPosts(userId);
        console.log('postsData', postsData)
        setData(postsData.posts);
        const commentsArr = postsData.posts.filter((item) => item.postId === postId);
        setComments(commentsArr[0].comments);
    }


    useEffect(() => {
        getComments(userId);
    }, []);


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
            postId,
            text: commentText,
            date: commentDate(),
            avatar: user.profilePhoto,
        }
    }


    const updateComments = async (postId, data) => {
        try {
            await setDoc(doc(db, "users", postId), data, { merge: true });
            console.log("User data updated to Firestore:", uid);
        } catch (error) {
            console.error("Error saving user data to Firestore:", error);
        }
    };

    const sendSubmit = () => {

        const newComment = createComment();
        console.log('newComment', newComment);
        data[index].comments = comments
        setComments((prevComments) => (prevComments ? [...prevComments, newComment] : [newComment]));
        console.log('comments', comments)
        setCommentText("");
        data[index].comments = comments;
        console.log('data', data)
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={{
                    ...styles.registrContainer,
                    height: keyboardVisible ? "70%" : "100%",
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