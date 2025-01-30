import React, { useState } from "react";
import { ImageBackground, Keyboard, KeyboardAvoidingView, Platform, Text, TouchableWithoutFeedback, View } from "react-native";
import image from "../assets/images/PhotoBG.png"
import AddIcon from "../icons/AddIcon";
import InputField from "../components/InputField";
import PasswordInput from "../components/PasswordInput";
import Button from "../components/Button"
import styles from "../styles/registrationStyles.js"



const RegistrationScreen = () => {

    const [loginText, setLoginText] = useState("");
    const [emailText, setEmailText] = useState("");
    const [isLoginFocus, setIsLoginFocus] = useState(false);
    const [isEmailFocus, setIsEmailFocus] = useState(false);
    const [password, setPassword] = useState("");
    const [isPasswordFocus, setIsPasswordFocus] = useState(false);
    const [keyboardVisible, setKeyboardVisible] = useState(false);


    const HandleSubmit = () => {
        console.log([loginText, emailText, password]);
        setLoginText("");
        setEmailText("");
        setPassword("");
        console.log(keyboardVisible)
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
                        height: keyboardVisible ? 374 : 549,
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
                                    onFocus={() => { setIsLoginFocus(true); setKeyboardVisible(true) }}
                                    onBlur={() => { setIsLoginFocus(false); setKeyboardVisible(false) }}
                                    onTextChange={(value) => setLoginText(value)}
                                    isFocus={isLoginFocus}
                                />
                                <InputField
                                    value={emailText}
                                    placeholder="Електронна пошта"
                                    keyboardType="email-address"
                                    onFocus={() => { setIsEmailFocus(true); setKeyboardVisible(true) }}
                                    onBlur={() => { setIsEmailFocus(false); setKeyboardVisible(false) }}
                                    onTextChange={(value) => setEmailText(value)}
                                    isFocus={isEmailFocus}
                                />
                                <PasswordInput
                                    value={password}
                                    placeholder="Пароль"
                                    onFocus={() => { setIsPasswordFocus(true); setKeyboardVisible(true) }}
                                    onBlur={() => { setIsPasswordFocus(false); setKeyboardVisible(false) }}
                                    onTextChange={(value) => setPassword(value)}
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
export default RegistrationScreen;