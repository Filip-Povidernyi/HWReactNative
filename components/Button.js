import { TouchableOpacity } from "react-native";


const Button = ({ children, onPress, buttonStyle }) => {
    return (
        <TouchableOpacity style={[buttonStyle]} onPress={onPress}>
            {children}
        </TouchableOpacity>
    );
};


export default Button;