import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "../config";
import { setUserInfo, clearUserInfo } from "../redux/redusers/userSlice";
import { addUser } from "./firestore";

export const registerDB = async (email, password, name) => {
    try {
        const credentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = credentials.user;

        await addUser(user.uid, { uid: user.uid, name: name || '', email: user.email || '', password })
    } catch (error) {
        console.log("Registration Error: ", error);
    };
};

export const loginDB = async ({ email, password }, dispatch) => {
    try {
        const credentials = await signInWithEmailAndPassword(auth, email, password);
        console.log(credentials);
        const user = credentials.user;

        dispatch(setUserInfo({
            uid: user.uid,
            email: user.email || '',
            name: user.name || '',
            avatar: user.avatar || '',
        }));
        return user;
    } catch (error) {
        console.log(error);
    };
};

export const logOutDB = async (dispatch) => {
    try {
        await signOut(auth);
        dispatch(clearUserInfo());
    } catch (error) {
        console.log("Log out error: ", error);
    };
};

export const authStateChanged = (dispatch) => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userData = await getUser(user.uid);

            dispatch(setUserInfo({
                ...userData,
                uid: user.uid,
                email: user.email || '',
            }))
        } else {
            dispatch(clearUserInfo());
        };
    });
};

export const updateUserProfile = async (update) => {
    const user = auth.currentUser;
    if (user) {
        try {
            await updateProfile(user, update);
        } catch (error) {
            throw error;
        };
    };
};