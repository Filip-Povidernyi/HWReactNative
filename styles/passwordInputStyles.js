import { StyleSheet } from "react-native";
import { colors } from "./colorConstantStyle";

const styles = StyleSheet.create({
    toggleButtonText: {
        color: colors.blue,
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 18,
    },
    passwordButton: {
        justifyContent: "space-between",
    },
});

export default styles;