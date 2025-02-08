import { createAsyncThunk } from "@reduxjs/toolkit";
import { addComment, addPost, getCommentsByPostId, getPostById, getPosts } from "../../utils/firestore";

export const createPost = createAsyncThunk(
    "post/createPost",
    async (postData, thunkAPI) => {
        try {
            const postId = postData.id;
            await addPost(postData, postId);
            return postData;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const loadPosts = createAsyncThunk(
    "post/loadPosts",
    async (userId, thunkAPI) => {
        try {
            return await getPosts(userId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const loadPostById = createAsyncThunk(
    "post/loadPostById",
    async (id, thunkAPI) => {
        return await getPostById(id);
    }
);

export const createComment = createAsyncThunk(
    "post/createComment",
    async (comment, thunkAPI) => {
        return await addComment(comment);
    }
);

export const loadComments = createAsyncThunk(
    "post/loadComments",
    async (id, thunkAPI) => {
        return await getCommentsByPostId(id);
    }
);