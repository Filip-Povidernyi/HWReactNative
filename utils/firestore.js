import { addDoc, collection, doc, getDoc, getDocs, setDoc, updateDoc, arrayUnion, query, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../config";



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
        await setDoc(doc(db, "users", uid), data, { merge: true });
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



export const addPost = async (post) => {
    try {

        await setDoc(doc(db, "posts", post.userId), post, { merge: true, });
        console.log("Post added:", post);
        return post;
    } catch (error) {
        console.error("Error adding post:", error);
        throw error;
    }
};


export const getPosts = async (userId) => {
    try {

        const postsQuery = query(
            collection(db, "posts"),
            where("userId", "==", userId)
        );
        const querySnapshot = await getDocs(postsQuery);

        const posts = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        console.log("Posts for user:", userId, posts);
        return posts;
    } catch (error) {
        console.error("Error fetching posts by userId:", error);
        throw error;
    }
};


export const getPostById = async (id) => {
    try {

        const postsQuery = query(
            collection(db, "posts"),
            where("id", "==", id)
        );
        const querySnapshot = await getDocs(postsQuery);

        const posts = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        console.log("Post with id: ", id, posts);
        return posts;
    } catch (error) {
        console.error("Error fetching posts by userId:", error);
        throw error;
    }
};

export const getCommentsByPostId = async (id) => {
    try {

        const postsQuery = query(
            collection(db, "comments"),
            where("postId", "==", id)
        );
        const querySnapshot = await getDocs(postsQuery);

        const comments = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        console.log("Comments to post with id: ", id, comments);
        return comments;
    } catch (error) {
        console.error("Error fetching posts by userId:", error);
        throw error;
    }
};

export const addComment = async (comment) => {
    try {
        console.log("comment", comment);
        await setDoc(doc(db, "comments", comment.id), comment, {
            merge: true,
        });
        console.log("Comment added:", comment);
        return comment;
    } catch (error) {
        console.error("Error adding comment:", error);
        throw error;
    }
};

