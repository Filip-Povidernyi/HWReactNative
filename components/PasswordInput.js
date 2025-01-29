import { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import InputField from "./InputField";

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

const styles = StyleSheet.create({
    toggleButtonText: {
        color: "#1B4371",
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 18,
    },
    passwordButton: {
        justifyContent: "space-between",
    },
});

export default PasswordInput