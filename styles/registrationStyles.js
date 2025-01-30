import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        marginRight: 16,
        marginLeft: 16,
    },
    bgimage: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "flex-end",
    },
    registrContainer: {
        width: "100%",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        paddingTop: 92,
        backgroundColor: '#fff',
        alignSelf: "center",

    },
    avatar: {
        width: 120,
        height: 120,
        position: "relative",
        marginTop: -159,
        marginBottom: 32,
        alignSelf: "center",
        backgroundColor: "#f6f6f6",
        borderRadius: 16,
    },
    iconAdd: {
        position: "absolute",
        bottom: 16,
        right: -12,
    },
    title: {
        fontFamily: "Roboto-Medium",
        textAlign: "center",
        color: "#212121",
        fontSize: 30,
        fontWeight: 500,
        letterSpacing: 0.3,
        marginBottom: 33,

    },
    inputsCont: {
        gap: 16,
        marginBottom: 43,
    },
    inputTextContainer: {
        height: 50,
        borderColor: "#E8E8E8",
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: "#F6F6F6",
        paddingHorizontal: 16,
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        fontWeight: 400,
    },
    onFocused: {
        borderColor: "#FF6C00",
    },
    baseText: {
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 18,
    },
    buttonText: {
        color: "#FFF",
        textAlign: "center",
    },
    btnContainer: {
        marginBottom: 16,
    },
    loginContainer: {
        alignItems: "center",
    },
});

export default styles;