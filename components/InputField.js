import { TextInput, View } from "react-native";
import styles from "../styles/iputFieldStyles";
import { colors } from "../styles/colorConstantStyle";

const InputField = (
    {
        value,
        keyboardType,
        onTextChange,
        placeholder,
        autoCapitalize,
        contentType,
        outerStyles,
        coverBtn,
        secureTextEntry,
        isFocus,
        onFocus,
        onBlur
    }
) => {

    return (
        <View style={[styles.inputTextContainer, isFocus && styles.onFocused, outerStyles]}>
            <TextInput
                style={styles.baseText}
                value={value}
                onChangeText={onTextChange}
                placeholder={placeholder}
                keyboardType={keyboardType}
                placeholderTextColor={colors.text_gray}
                autoCapitalize={autoCapitalize}
                autoCorrect={false}
                textContentType={contentType}
                secureTextEntry={secureTextEntry}
                maxLength={320}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            {coverBtn}
        </View>

    )
};


export default InputField;