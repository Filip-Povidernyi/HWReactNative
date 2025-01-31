import React, { useState } from "react";
import { ImageBackground, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import image from "../assets/images/PhotoBG.png"
import InputField from "../components/InputField";
import PasswordInput from "../components/PasswordInput";
import Button from "../components/Button";
import styles from "../styles/registrationStyles";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../components/AppProvider";



const LoginScreen = () => {

    const [emailText, setEmailText] = useState("");
    const [isEmailFocus, setIsEmailFocus] = useState(false);
    const [password, setPassword] = useState("");
    const [isPasswordFocus, setIsPasswordFocus] = useState(false);
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const navigation = useNavigation();
    const { setIsLogined } = useAppContext();


    const HandleSubmit = () => {
        console.log([emailText, password]);
        setEmailText("");
        setPassword("");
        setIsLogined(true);
        // navigation.navigate("Home");
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
                        height: keyboardVisible ? 248 : 489,
                        paddingTop: 32,
                    }}>
                        <Text style={styles.title}>Увійти</Text>
                        <View style={styles.container}>
                            <View style={styles.inputsCont} >
                                <InputField
                                    autoCapitalize="none"
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
                                    autoCapitalize="none"
                                />
                            </View>
                            <View style={styles.btnContainer}>
                                <Button onPress={HandleSubmit} buttonStyle={styles.button}>
                                    <Text style={[styles.baseText, styles.buttonText]}>
                                        Увійти
                                    </Text>
                                </Button>
                            </View>
                            <View style={[styles.container, styles.loginContainer]}>
                                <Text style={[styles.baseText, styles.passwordButtonText]}>
                                    Немає акаунту?&ensp;
                                    <TouchableWithoutFeedback onPress={() => navigation.navigate("Registration")}>
                                        <Text style={styles.linkText}>Зареєстpуватися</Text>
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


export default LoginScreen;