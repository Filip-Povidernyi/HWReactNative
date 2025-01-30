import { useState } from "react"
import { Text, TouchableOpacity } from "react-native"
import InputField from "./InputField";
import styles from "../styles/passwordInputStyles";

const PasswordInput = (
    { value,
        placeholder,
        onFocus,
        onBlur,
        onTextChange,
        isFocus,
        autoCapitalize }
) => {

    const [passwordVisible, setPasswordVisible] = useState(true);

    return (
        <InputField
            value={value}
            placeholder={placeholder}
            onTextChange={onTextChange}
            secureTextEntry={passwordVisible}
            outerStyles={styles.passwordButton}
            isFocus={isFocus}
            onBlur={onBlur}
            onFocus={onFocus}
            autoCapitalize={autoCapitalize}
            coverBtn={<TouchableOpacity
                style={styles.toggleBtn}
                onPress={() => setPasswordVisible((prev) => !prev)}
            >
                <Text style={styles.toggleButtonText}>{passwordVisible ? "Показати" : "Приховати"}</Text>
            </TouchableOpacity>}
        />
    )
}


export default PasswordInput