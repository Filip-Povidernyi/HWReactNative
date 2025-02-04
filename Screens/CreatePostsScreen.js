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
    Button,
} from "react-native";

import { colors } from "../styles/colorConstantStyle";
import { useEffect, useRef, useState } from "react";
import CameraIcon from "../icons/CameraIcon";
import PinIcon from "../icons/PinIcon";
import TrashIcon from "../icons/TrashIcon";
import styles from "../styles/createPostStyle";
import { useSelector } from "react-redux";
import selectUser from "../redux/redusers/userSelectors";
import { db, storage } from "../config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";


const CreatePostsScreen = ({ navigation }) => {
    const user = useSelector(selectUser);
    const [photo, setPhoto] = useState(null);
    const [title, setTitle] = useState("");
    const [place, setPlace] = useState("");
    const [location, setLocation] = useState(null);
    const [error, setError] = useState("")
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    const [facing, setFacing] = useState("back");
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

        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        const { uri } = await camera.current.takePictureAsync();
        await MediaLibrary.saveToLibraryAsync(uri);
        setPhoto(uri);
    };

    const isAllowed = !!photo && !!title && !!place;

    const uploadPhoto = async () => {
        const response = await fetch(photo || "");

        const file = await response.blob();

        const photoId = "ph_" + Math.random() * 1000;
        const imagesRef = ref(storage, `postImages/${photoId}`);

        await uploadBytesResumable(imagesRef, file);

        const url = await getDownloadURL(imagesRef);

        return url;
    };

    const uploadPost = async () => {
        const photo = await uploadPhoto();

        try {
            await addDoc(collection(db, "posts"), {
                photo,
                title,
                place,
                location: location.coords,
                uid: user.id,
            });
        } catch (error) {
            setError(error.message || "Error uploading post");
        }
    };

    const onSubmit = async () => {
        try {
            console.log("Uploading post...");
            await uploadPost();

            navigation.navigate("Home");

            setTitle("");
            setPhoto(null);
            setPlace("");
        } catch (error) {
            console.error("Error while submitting post:", error);
        }
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
                        <CameraView style={styles.camera} ref={camera} facing={facing}>
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
                                <CameraIcon size={24} color={photo ? colors.white : colors.underline_gray} />
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
                            onFocus={() => setKeyboardVisible(true)}
                            onBlur={() => setKeyboardVisible(false)}
                            value={title}
                            onChangeText={(text) => setTitle(text)}
                        />
                        <View style={{ position: "relative" }}>
                            <PinIcon style={styles.locationIcon} />
                            <TextInput
                                style={{ ...styles.createPostInput, paddingLeft: 28 }}
                                placeholder="Місцевість..."
                                onFocus={() => setKeyboardVisible(true)}
                                onBlur={() => setKeyboardVisible(false)}
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

