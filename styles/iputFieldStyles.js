import { StyleSheet } from "react-native";
import { colors } from "./colorConstantStyle";

const styles = StyleSheet.create({

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
});

export default styles;