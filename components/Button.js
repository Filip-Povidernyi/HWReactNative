import { TouchableOpacity, StyleSheet } from "react-native";


const Button = ({ children, onPress, buttonStyle }) => {
    return (
        <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
            {children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 100,
        backgroundColor: "#FF6C00",
        paddingVertical: 16,
        paddingHorizontal: 32,
    },
});

export default Button;