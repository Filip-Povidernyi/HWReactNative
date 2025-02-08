import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    Image,
    FlatList,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Text,
} from "react-native";
import { colors } from "../styles/colorConstantStyle";
import SendIcon from "../icons/SendIcon"
import { addComment, getCommentsByPostId, getPostById } from "../utils/firestore";
import { TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { styles } from "../styles/commentsScreenStyles";


const CommentsScreen = ({ route }) => {
    const { postId, userId, photo, avatar } = route?.params;
    const [comment, setComment] = useState("");
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [keyboard, setKeyboard] = useState(false);


    const getPost = async () => {
        try {
            const result = await getPostById(postId);
            setPost(result);
        } catch (err) {
            console.log('getPost', err)
        }
    };

    useEffect(() => {
        getPost();
        getPostComments();
    }, [sendSubmit]);

    const getPostComments = async () => {
        try {
            const result = await getCommentsByPostId(postId);
            console.log('result', result)
            setComments(result);
        } catch (err) {
            console.log('getPost', err)
        }
    }

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

    const sendSubmit = (comment) => {

        addComment({
            id: userId + Date().toString(),
            avatar,
            comment,
            postId,
            userId,
            date: commentDate(),
        }),

            setComment("");
    };


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={{
                    ...styles.registrContainer,
                    height: keyboard ? "100%" : "100%",
                    paddingTop: 32,
                    paddingBottom: keyboard ? 450 : 16,
                }}>
                    <View style={styles.innerContainer}>
                        <Image source={{ uri: photo }} style={styles.image} />
                        <View style={styles.commentsContainer}>
                            <FlatList
                                style={{ width: "100%", flex: 1 }}
                                data={comments}
                                renderItem={({ item }) => (
                                    <View style={[styles.container, styles.containerRight,]}>
                                        <Image source={{ uri: avatar }} style={[styles.avatarRight]} />
                                        <View style={[styles.textContainer, styles.textContainerRight]}>
                                            <Text style={styles.text}>{comment}</Text>
                                            <Text style={[styles.date, styles.dateRight]}>
                                                {item.date}
                                            </Text>
                                        </View>
                                    </View>
                                )}
                            />
                        </View>
                        <View>
                            <View style={[styles.inputTextContainer, comment && styles.onFocused]}>
                                <TextInput
                                    style={styles.baseText}
                                    value={comment}
                                    onChangeText={(text) => setComment(text)}
                                    placeholder="Коментувати..."
                                    multiline={true}
                                    placeholderTextColor={colors.text_gray}
                                    autoCapitalize="sentences"
                                    onFocus={() => { setIsFocused(true), setKeyboard(true) }}
                                    onBlur={() => { setIsFocused(false), setKeyboard(false) }}
                                />
                                <TouchableOpacity style={styles.sendBtn} onPress={() => sendSubmit(comment)}>
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

export default CommentsScreen;