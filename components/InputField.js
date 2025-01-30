import { StyleSheet, TextInput, View } from "react-native";

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
                placeholderTextColor="#BDBDBD"
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

const styles = StyleSheet.create({

    inputTextContainer: {
        height: 50,
        alignItems: "center",
        flexDirection: "row",
        borderColor: "#E8E8E8",
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: "#F6F6F6",
        paddingHorizontal: 16,
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        fontWeight: 400,
    },
    onFocused: {
        borderColor: "#FF6C00",
    },
    coverBtnContainer: {
        marginLeft: 16,
    },
    baseText: {
        paddingVertical: 10,
        fontSize: 16,
        color: "#212121",
    },
});


export default InputField;