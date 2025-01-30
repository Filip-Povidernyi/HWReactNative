import React, { useState } from "react";
import { Dimensions, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import image from "../assets/images/PhotoBG.png"
import AddIcon from "../icons/AddIcon";
import InputField from "../components/InputField";
import PasswordInput from "../components/PasswordInput";
import Button from "../components/Button";



const RegistrationScreen = () => {

    const [loginText, setLoginText] = useState("");
    const [emailText, setEmailText] = useState("");
    const [isLoginFocus, setIsLoginFocus] = useState(false);
    const [isEmailFocus, setIsEmailFocus] = useState(false);
    const [password, setPassword] = useState("");
    const [isPasswordFocus, setIsPasswordFocus] = useState(false);
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    const handleLoginChange = (value) => {
        setLoginText(value);
        setKeyboardVisible(true);
    };

    const handleEmailChange = (value) => {
        setEmailText(value);
        setKeyboardVisible(true);
    };

    const handlePasswordChange = (value) => {
        setPassword(value);
        setKeyboardVisible(true);
    };
    const HandleSubmit = () => {
        console.log([loginText, emailText, password]);
        setLoginText("");
        setEmailText("");
        setPassword("");
    };

    return (
        <ImageBackground
            source={image}
            resizeMode="cover"
            style={styles.bgimage}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={{ flex: 1, justifyContent: "flex-end", }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <View style={{
                        ...styles.registrContainer,
                        height: keyboardVisible ? 549 : 374,
                    }}>
                        <View style={styles.avatar}>
                            <AddIcon style={styles.iconAdd} />
                        </View>
                        <Text style={styles.title}>Реєстрація</Text>
                        <View style={styles.container}>
                            <View style={styles.inputsCont} >
                                <InputField
                                    value={loginText}
                                    placeholder="Логін"
                                    onFocus={() => setIsLoginFocus(true)}
                                    onBlur={() => setIsLoginFocus(false)}
                                    onTextChange={handleLoginChange}
                                    isFocus={isLoginFocus}
                                />
                                <InputField
                                    value={emailText}
                                    placeholder="Електронна пошта"
                                    keyboardType="email-address"
                                    onFocus={() => setIsEmailFocus(true)}
                                    onBlur={() => setIsEmailFocus(false)}
                                    onTextChange={handleEmailChange}
                                    isFocus={isEmailFocus}
                                />
                                <PasswordInput
                                    value={password}
                                    placeholder="Пароль"
                                    onFocus={() => setIsPasswordFocus(true)}
                                    onBlur={() => setIsPasswordFocus(false)}
                                    onTextChange={handlePasswordChange}
                                    isFocus={isPasswordFocus}
                                    autoCapitalize={false}
                                />
                            </View>
                            <View style={[styles.container, styles.btnContainer]}>
                                <Button onPress={HandleSubmit}>
                                    <Text style={[styles.baseText, styles.buttonText]}>
                                        Зареєстуватися
                                    </Text>
                                </Button>
                            </View>
                            <View style={[styles.container, styles.loginContainer]}>
                                <Text style={[styles.baseText, styles.passwordButtonText]}>
                                    Вже є акаунт?&ensp;
                                    <TouchableWithoutFeedback onPress={() => console.log('login btn pressed')}>
                                        <Text style={styles.linkText}>Увійти</Text>
                                    </TouchableWithoutFeedback>
                                </Text>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </ImageBackground >
    )
};

const styles = StyleSheet.create({
    container: {
        marginRight: 16,
        marginLeft: 16,
    },
    bgimage: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "flex-end",
    },
    registrContainer: {
        width: "100%",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        paddingTop: 92,
        backgroundColor: '#fff',
        alignSelf: "center",

    },
    avatar: {
        width: 120,
        height: 120,
        position: "relative",
        marginTop: -159,
        marginBottom: 32,
        alignSelf: "center",
        backgroundColor: "#f6f6f6",
        borderRadius: 16,
    },
    iconAdd: {
        position: "absolute",
        bottom: 16,
        right: -12,
    },
    title: {
        fontFamily: "Roboto-Medium",
        textAlign: "center",
        color: "#212121",
        fontSize: 30,
        fontWeight: 500,
        letterSpacing: 0.3,
        marginBottom: 33,

    },
    inputsCont: {
        gap: 16,
        marginBottom: 43,
    },
    inputTextContainer: {
        height: 50,
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
    baseText: {
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 18,
    },
    buttonText: {
        color: "#FFF",
        textAlign: "center",
    },
    btnContainer: {
        marginBottom: 16,
    },
    loginContainer: {
        alignItems: "center",
    },
});

export default RegistrationScreen;