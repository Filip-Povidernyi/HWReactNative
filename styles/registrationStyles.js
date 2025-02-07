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
    avatarContainer: {
        width: 120,
        height: 120,
        backgroundColor: colors.light_gray,
        borderRadius: 16,
        position: 'absolute',
        top: -60,
        left: '50%',
        transform: [{ translateX: -60 }],
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButton: {
        width: 25,
        height: 25,
        backgroundColor: colors.white,
        borderRadius: 12.5,
        borderWidth: 1,
        borderColor: colors.orange,
        position: 'absolute',
        bottom: 14,
        right: -12.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeButton: {
        borderColor: colors.light_gray,
    },
    addButtonText: {
        color: colors.orange,
        fontSize: 16,
        fontWeight: '300',
    },
    removeButtonText: {
        color: colors.text_gray,
    },
    logoutButtonWrapper: {
        position: 'absolute',
        top: 22,
        right: 16,
        width: 24,
        height: 24,
        zIndex: 1,
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
    textCont: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 16,
        color: colors.black_primary,
        marginRight: 8,
    },
});

export default styles;