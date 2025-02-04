import { createAsyncThunk } from "@reduxjs/toolkit";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { addUser, getUser } from "../../utils/firestore";
import { auth } from "../../config";

export const signUp = createAsyncThunk(
    "auth/registration",
    async ({ email, password, name }, thunkAPI) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);

            const user = auth.currentUser;

            if (!user) return;

            // const url =
            //   data.profilePhoto &&
            //   (await uploadPhoto(data.profilePhoto, "avatars", uid));

            await addUser(user.uid, {
                uid: user.uid,
                email: user.email || "",
                name: user.name || "",
                // password: password || "",
            });

            return { uid: user.uid, email: user.email, name: user.name, photoURL: user.photoURL };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const signIn = createAsyncThunk("auth/logIn", async ({ email, password }, thunkAPI) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;

        if (!user) return;

        const userData = await getUser(user.uid);

        return userData;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const signOutUser = createAsyncThunk("auth/logOut", async (_, thunkAPI) => {
    try {
        await signOut(auth);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const isLogined = createAsyncThunk("auth/isLogined", async (_, thunkAPI) => {
    try {
        let uid = null;
        let email = null;
        let name = null;
        let profilePhoto = null;

        await onAuthStateChanged(auth, (user) => {
            console.log("Auth state changed:", user);

            if (user) {
                uid = user.uid;
                email = user.email;
                name = user.name;
                profilePhoto = user.photoURL;
            }
        });

        if (!email) {
            return thunkAPI.rejectWithValue("Don't have user email");
        }

        return { name, email, profilePhoto, uid };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});