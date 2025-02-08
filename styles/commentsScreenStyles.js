import { StyleSheet } from "react-native";
import { colors } from "./colorConstantStyle";

export const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 240,
        borderRadius: 8,
    },
    registrContainer: {
        flex: 1,
        padding: 16,
        paddingBottom: 40,
        backgroundColor: colors.white,
    },

    innerContainer: {
        flex: 1,
    },
    commentsContainer: {
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
    keyboardAvoidingView: {
        flex: 1,
    },
    container: {
        flexDirection: "row",
        marginBottom: 24,
        width: "100%",
    },
    containerLeft: {
        flexDirection: "row",
    },
    containerRight: {
        flexDirection: "row-reverse",
    },
    avatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
    },
    avatarLeft: {
        marginRight: 16,
    },
    avatarRight: {
        marginLeft: 16,
    },
    textContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: "rgba(0, 0, 0, 0.03)",
        borderRadius: 6,
    },
    textContainerLeft: {
        borderTopLeftRadius: 0,
    },
    textContainerRight: {
        borderTopRightRadius: 0,
    },
    text: {
        fontFamily: "Roboto-Regular",
        fontSize: 13,
        lineHeight: 18,
        color: colors.black_primary,
    },
    date: {
        fontFamily: "Roboto-Regular",
        fontSize: 10,
        lineHeight: 12,
        color: colors.text_gray,
        marginTop: 8,
    },
    dateLeft: {
        textAlign: "right",
    },
    dateRight: {
        textAlign: "left",
    },
});