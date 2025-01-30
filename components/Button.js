import { TouchableOpacity } from "react-native";
import styles from "../styles/buttonStyles";


const Button = ({ children, onPress, buttonStyle }) => {
    return (
        <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
            {children}
        </TouchableOpacity>
    );
};


export default Button;