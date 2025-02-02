import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { CameraView, useCameraPermissions } from "expo-camera";

import {
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    View,
    Image,
    Text,
    TextInput,
    Keyboard,
    Platform,
    StyleSheet,
    Button,
} from "react-native";

import { colors } from "../styles/colorConstantStyle";
import { useEffect, useRef, useState } from "react";
import CameraIcon from "../icons/CameraIcon";
import PinIcon from "../icons/PinIcon";
import TrashIcon from "../icons/TrashIcon";
import styles from "../styles/createPostStyle";


const CreatePostsScreen = ({ navigation }) => {
    const [photo, setPhoto] = useState(null);
    const [title, setTitle] = useState("");
    const [place, setPlace] = useState("");

    const [permission, requestPermission] = useCameraPermissions();
    const camera = useRef(null);

    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }
        })();
    }, []);

    if (!permission) {

        return <View />;
    }

    if (!permission.granted) {

        return (
            <View style={styles.container}>
                <Text style={styles.message}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    const keyboardHide = () => {
        Keyboard.dismiss();
    };

    const takePicture = async () => {
        if (!camera) return;

        const cameraRes = await camera?.current?.takePictureAsync();
        if (!cameraRes) return;

        await MediaLibrary.saveToLibraryAsync(cameraRes?.uri);
        setPhoto(cameraRes?.uri);
    };

    const isAllowed = !!photo && !!title && !!place;

    const onSubmit = async () => {
        const location = await Location.getCurrentPositionAsync({});
        const coords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        };

        navigation.navigate("Home", { photo, title, place, coords });

        setTitle("");
        setPhoto(null);
        setPlace("");
    };

    const onReset = async () => {
        setTitle("");
        setPhoto(null);
        setPlace("");
    };

    return (
        <TouchableWithoutFeedback onPress={keyboardHide}>
            <View style={styles.createPostsContainer}>
                <View>
                    <View style={styles.cameraContainer}>
                        <CameraView style={styles.camera} ref={camera}>
                            {photo && (
                                <View style={styles.takePhotoContainer}>
                                    <Image style={styles.camera} source={{ uri: photo }} />
                                </View>
                            )}
                            <TouchableOpacity
                                style={{
                                    ...styles.photoBtnContainer,
                                    backgroundColor: photo ? colors.white_30 : colors.white,
                                }}
                                activeOpacity={0.8}
                                onPress={takePicture}
                            >
                                <CameraIcon />
                            </TouchableOpacity>
                        </CameraView>
                    </View>
                    <Text style={styles.textUploade}>
                        {!photo ? "Завантажте фото" : "Редагувати фото"}
                    </Text>

                    <KeyboardAvoidingView
                        behavior={Platform.OS == "ios" ? "padding" : "height"}
                    >
                        <TextInput
                            style={styles.createPostInput}
                            placeholder="Назва..."
                            placeholderTextColor={colors.text_gray}
                            value={title}
                            onChangeText={(text) => setTitle(text)}
                        />
                        <View style={{ position: "relative" }}>
                            <PinIcon style={styles.locationIcon} />
                            <TextInput
                                style={{ ...styles.createPostInput, paddingLeft: 28 }}
                                placeholder="Місцевість..."
                                placeholderTextColor={colors.text_gray}
                                value={place}
                                onChangeText={(text) => setPlace(text)}
                            />
                        </View>
                        <View
                            style={{
                                ...styles.createBtn,
                                backgroundColor: isAllowed ? colors.orange : colors.light_gray,
                            }}
                        >
                            <TouchableOpacity disabled={!isAllowed} onPress={onSubmit}>
                                <Text
                                    style={{
                                        ...styles.createBtnText,
                                        color: isAllowed ? colors.white : colors.text_gray,
                                    }}
                                >
                                    Опублікoвати
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </View>
                <View style={styles.resetBtn}>
                    <TouchableOpacity style={styles.resetBtn} onPress={onReset}>
                        <TrashIcon />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default CreatePostsScreen;

