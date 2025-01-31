import { StyleSheet } from "react-native";
import { colors } from "./colorConstantStyle";

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
        backgroundColor: colors.white,
        alignSelf: "center",

    },
    avatar: {
        width: 120,
        height: 120,
        position: "relative",
        marginTop: -159,
        marginBottom: 32,
        alignSelf: "center",
        backgroundColor: colors.light_gray,
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
        color: colors.black_primary,
        fontSize: 30,
        fontWeight: 500,
        letterSpacing: 0.3,
        marginBottom: 33,

    },
    inputsCont: {
        gap: 16,
        marginBottom: 43,
    },
    baseText: {
        color: colors.blue,
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 18,
    },
    buttonText: {
        color: colors.white,
        textAlign: "center",
    },
    btnContainer: {
        marginBottom: 16,
    },
    loginContainer: {
        alignItems: "center",
    },
    button: {
        borderRadius: 100,
        backgroundColor: colors.orange,
        paddingVertical: 16,
        paddingHorizontal: 32,
    },
});

export default styles;