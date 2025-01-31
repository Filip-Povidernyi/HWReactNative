import { StyleSheet } from "react-native";
import { colors } from "./colorConstantStyle";

const styles = StyleSheet.create({
    tabBar: {
        borderTopWidth: 1,
        borderTopColor: colors.text_gray,
        height: 83,
        paddingTop: 9,
        paddingRight: 70,
        paddingLeft: 70,
    },
    tabHeader: {
        borderBottomWidth: 1,
        borderBottomColor: colors.text_gray,
    },
    tabHeaderTitle: {
        fontWeight: 500,
        fontSize: 17,
        lineHeight: 22,
        color: colors.black_primary,
    },
    tabIcon: {
        width: 70,
        height: 40,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    tabButtonActive: {
        justifyContent: "center",
        alignItems: "center",
        width: 70,
        height: 40,
        borderRadius: 100,
        backgroundColor: colors.orange,
    },
    titleHeader: {
        fontFamily: "Roboto",
        fontSize: 17,
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: 22,
        letterSpacing: -0.408,
    },
});

export default styles;