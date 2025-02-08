import * as Location from "expo-location";
import * as ImagePicker from 'expo-image-picker';

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
import { useDispatch, useSelector } from "react-redux";
import selectUser from "../redux/redusers/userSelectors";
import { addPost } from "../utils/firestore";
import uploadImageToCloudinary from "../components/CloudinaryUpload";
import { CameraView, useCameraPermissions } from "expo-camera";


const CreatePostsScreen = ({ navigation }) => {
    const [photo, setPhoto] = useState(null);
    const [title, setTitle] = useState("");
    const [place, setPlace] = useState("");
    const [facing] = useState("back");
    const [permission, requestPermission] = useCameraPermissions();
    const camera = useRef(null);

    const [errorMsg, setErrorMsg] = useState(null);
    const user = useSelector(selectUser);


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
            <View style={styles.section}>
                <Text style={styles.message}>
                    Нам потрібен дозвіл на використання камери
                </Text>
                <TouchableOpacity onPress={requestPermission}>
                    <Text>Надати дозвіл</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const keyboardHide = () => {
        Keyboard.dismiss();
    };


    const takePicture = async () => {
        try {
            if (!camera.current) return;
            const photo = await camera.current.takePictureAsync();
            setPhoto(photo.uri);
        } catch (error) {
            console.log("Error taking picture:", error);
        }
    };


    const pickImage = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();


            if (!permissionResult.granted) {
                alert("Необхідний дозвіл на доступ до галереї");
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: false,
                quality: 1,
            });

            if (!result.canceled) {
                const uri = result.assets[0].uri
                setPhoto(uri);
            }
        } catch (error) {
            console.log('Error picking image', error)
        }
    }

    const isAllowed = !!photo && !!title && !!place;

    const onSubmit = async () => {
        try {

            const location = await Location.getCurrentPositionAsync({});
            const coords = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };

            const post = {
                id: user.id + Date.now().toString(32),
                userId: user.id,
                photo: await uploadImageToCloudinary(photo),
                title,
                place,
                coords
            };

            addPost(post);

            navigation.navigate("Posts");
            setTitle("");
            setPhoto(null);
            setPlace("");
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Failed to create post. Please try again.");
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
                        {!photo ? (
                            <CameraView style={styles.camera} facing={facing} ref={camera}>
                                <View style={styles.cameraContent}>
                                    <TouchableOpacity
                                        style={styles.cameraIconWrapper}
                                        onPress={takePicture}
                                    >
                                        <CameraIcon />
                                    </TouchableOpacity>
                                </View>
                            </CameraView>
                        ) : (
                            <>
                                <Image source={{ uri: photo }} style={styles.image} />
                                <TouchableOpacity
                                    style={styles.cameraIconWrapper}
                                    onPress={() => setPhoto(null)}
                                >
                                    <CameraIcon />
                                </TouchableOpacity>
                            </>
                        )}

                    </View>
                    <TouchableOpacity onPress={pickImage}>
                        <Text style={styles.textUploade}>
                            {!photo ? "Завантажте фото" : "Редагувати фото"}
                        </Text>
                    </TouchableOpacity>

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