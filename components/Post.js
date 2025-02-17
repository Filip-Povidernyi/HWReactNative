import { View, Text, Image, StyleSheet } from "react-native";
import { colors } from "../styles/colorConstantStyle";
import { TouchableOpacity } from "react-native";
import LikeIcon from "../icons/LikeIcon";
import PinIcon from "../icons/PinIcon";
import MessageIcon from "../icons/MessageIcon";


const Post = ({
    image,
    title,
    location,
    onLocationPress = () => { },
    onCommentsPress = () => { },
}) => {
    const truncatedLocation =
        location?.length > 30 ? location.substring(0, 27) + "..." : location;

    return (
        <View style={styles.container}>
            <Image source={image} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
            <View style={styles.locationContainer}>
                <View style={styles.btnsContainer}>
                    <TouchableOpacity
                        style={styles.commentsContainer}
                        onPress={onCommentsPress}
                    >
                        <View style={styles.commentsContainer}>
                            <MessageIcon />
                            <Text style={styles.comments}>0</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.commentsContainer}>
                        <LikeIcon />
                        <Text style={styles.comments}>0</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.locationContainer}
                    onPress={onLocationPress}
                >
                    <View style={styles.locationContainer}>
                        <PinIcon />
                        <Text style={styles.location}>{truncatedLocation}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 8,
        marginBottom: 32,
    },
    commentsContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    image: {
        width: "100%",
        height: 240,
        borderRadius: 8,
    },
    title: {
        fontFamily: "Roboto-Medium",
        fontSize: 16,
        color: colors.black_primary,
    },
    btnsContainer: {
        flexDirection: "row",
        gap: 24,
    },
    locationContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 4,
    },
    location: {
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        textDecorationLine: "underline",
        color: colors.black_primary,
    },
    comments: {
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        color: colors.text_gray,
    },
});

export default Post;