import React, { useState } from "react";
import { Image, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import image from "../assets/images/PhotoBG.png"
import InputField from "../components/InputField";
import PasswordInput from "../components/PasswordInput";
import styles from "../styles/registrationStyles.js"
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { signUp } from "../redux/redusers/userOperations.js";
import * as ImagePicker from 'expo-image-picker';
import uploadImageToCloudinary from "../components/CloudinaryUpload.js";



const RegistrationScreen = ({ navigation, route }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isLoginFocus, setIsLoginFocus] = useState(false);
    const [isEmailFocus, setIsEmailFocus] = useState(false);
    const [password, setPassword] = useState("");
    const [isPasswordFocus, setIsPasswordFocus] = useState(false);
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState('https://res.cloudinary.com/dmlknrojl/image/upload/v1738920244/sobvsvglbnxt0vljueeh.png');
    const [isAvatarLoading, setIsAvatarLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch()


    const onAddAvatar = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                const avatarUpload = await uploadImageToCloudinary(result.assets[0].uri);
                setSelectedAvatar(avatarUpload);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Помилка', 'Не вдалося вибрати зображення');
        }
    };

    const onRemoveAvatar = () => {
        setSelectedAvatar(null);
    };



    const HandleSubmit = () => {

        dispatch(signUp({ email, password, name, selectedAvatar }));

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
                        paddingTop: 92,
                    }}>
                        <View style={styles.avatarContainer}>
                            {isAvatarLoading ? (
                                <View style={[styles.avatar, styles.centered]}>
                                    <ActivityIndicator color={colors.accent} />
                                </View>
                            ) : (
                                <Image
                                    src={selectedAvatar}
                                    style={styles.avatar}
                                />
                            )}
                            <TouchableOpacity
                                style={[
                                    styles.addButton,
                                    selectedAvatar && styles.removeButton,
                                ]}
                                onPress={selectedAvatar ? onRemoveAvatar : onAddAvatar}
                            >
                                <Text
                                    style={[
                                        styles.addButtonText,
                                        selectedAvatar && styles.removeButtonText,
                                    ]}
                                >
                                    {selectedAvatar ? 'x' : '+'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.title}>Реєстрація</Text>
                        <View style={styles.container}>
                            <View style={styles.inputsCont} >
                                <InputField
                                    value={name}
                                    placeholder="Логін"
                                    onFocus={() => { setIsLoginFocus(true); setKeyboardVisible(true) }}
                                    onBlur={() => { setIsLoginFocus(false); setKeyboardVisible(false) }}
                                    onTextChange={(value) => setName(value)}
                                    isFocus={isLoginFocus}
                                />
                                <InputField
                                    value={email}
                                    autoCapitalize="none"
                                    placeholder="Електронна пошта"
                                    keyboardType="email-address"
                                    onFocus={() => { setIsEmailFocus(true); setKeyboardVisible(true) }}
                                    onBlur={() => { setIsEmailFocus(false); setKeyboardVisible(false) }}
                                    onTextChange={(value) => setEmail(value)}
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
                                    <Text style={[styles.baseText, styles.buttonText]} disabled={isLoading || isAvatarLoading}>
                                        Зареєстpуватися
                                    </Text>
                                </Button>
                            </View>
                            <View style={[styles.container, styles.loginContainer]}>
                                <Text style={[styles.baseText, styles.passwordButtonText]}>
                                    Вже є акаунт?&ensp;
                                    <TouchableWithoutFeedback onPress={() => navigation.navigate("Login")}>
                                        <Text style={styles.baseText}>Увійти</Text>
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