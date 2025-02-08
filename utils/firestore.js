import { addDoc, collection, doc, getDoc, getDocs, setDoc, updateDoc, arrayUnion, query, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../config";
import { createAsyncThunk } from "@reduxjs/toolkit";



export const addUser = async (userId, userData) => {
    try {
        await setDoc(doc(db, "users", userId), userData, { merge: true });
        console.log("User added:", userId, userData);
    } catch (error) {
        console.error("Error adding user:", error);
    }
};

export const getUser = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("User data:", docSnap.data());
        return docSnap.data();
    } else {
        console.log("No such document!");
        return null;
    }
};

export const updateUserInFirestore = async (uid, data) => {
    try {
        await setDoc(doc(db, "posts", uid), data, { merge: true });
        console.log("User data updated to Firestore:", uid);
    } catch (error) {
        console.error("Error saving user data to Firestore:", error);
    }
};


export const uploadImage = async (userId, file, fileName) => {
    try {
        const imageRef = ref(storage, `profilePhotos/${userId}/${fileName}`);

        console.log("Uploading to:", imageRef.fullPath);
        const result = await uploadBytes(imageRef, file);
        console.log("Upload result:", result);
        return imageRef;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};

export const getImageUrl = async (imageRef) => {
    const url = await getDownloadURL(imageRef);
    return url;
};

// export const addPost = async (post) => {
//     try {
//         const postsRef = collection(db, 'posts');
//         const docRef = await addDoc(postsRef, {
//             ...post,
//             createdAt: new Date().toISOString()
//         });
//         return { id: docRef.id, ...post };
//     } catch (error) {
//         console.error('Error adding post:', error);
//         throw error;
//     }
// };
export const addPost = createAsyncThunk(
    'posts/addPost',
    async ({ userId, post }, thunkAPI) => {
        try {
            const postRef = doc(db, 'posts', userId);
            const postId = Date.now().toString();

            await setDoc(postRef, {
                posts: arrayUnion({ ...post, postId }),
            }, { merge: true });

            console.log('Post added:', post);
            return post;
        } catch (error) {
            console.error('Error adding post:', error);
            return thunkAPI.rejectWithValue(error.message);
        }
    });

export const addComment = async (postId, comment) => {
    try {
        await setDoc(doc(db, 'posts', postId), { postId, posts: [post] }, { merge: true });
        console.log('Post added:', userId);
    } catch (error) {
        console.error('Error adding post:', error);
    }
};

export const getUserPosts = async (userId) => {
    const docRef = doc(db, "posts", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("User data:", docSnap.data());
        return docSnap.data();
    } else {
        console.log("No such document!");
        return null;
    }
    // try {
    //     const postsRef = collection(db, 'posts');
    //     const q = query(
    //         postsRef,
    //         where('userId', '==', userId),
    //     );

    //     const querySnapshot = await getDocs(q);
    //     const posts = [];
    //     querySnapshot.forEach((doc) => {
    //         posts.push({ id: doc.id, ...doc.data() });
    //     });

    //     return posts;
    // } catch (error) {
    //     console.error('Error getting user posts:', error);
    //     throw error;
    // }
};


export const getPosts = async () => {
    try {
        const postsCollection = collection(db, "posts");
        const querySnapshot = await getDocs(postsCollection);

        const allPosts = [];
        querySnapshot.forEach((doc) => {
            allPosts.push({ id: doc.id, ...doc.data() });
        });

        return allPosts;
    } catch (error) {
        console.error("Помилка отримання всіх постів:", error);
        throw error;
    }
    // const docRef = doc(db, "posts");
    // console.log('docRef', docRef)
    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
    //     console.log("User data:", docSnap.data());
    //     return docSnap.data();
    // } else {
    //     console.log("No document!");
    //     return null;
    // }
};

