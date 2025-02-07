import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [],
    loading: false,
    error: null,
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
            state.loading = false;
            state.error = null;
        },
        addPost: (state, action) => {
            state.posts.push(action.payload);
            state.loading = false;
            state.error = null;
        },
        addComment: (state, action) => {
            const { postId, comment } = action.payload;
            const post = state.posts.find(post => post.id === postId);
            if (post) {
                if (!post.comments) {
                    post.comments = [];
                }
                post.comments.push(comment);
            }
        },
        updatePostLikes: (state, action) => {
            const { postId, likesCount } = action.payload;
            const post = state.posts.find(post => post.id === postId);
            if (post) {
                post.likes = likesCount;
            }
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        clearPosts: state => {
            state.posts = [];
            state.loading = false;
            state.error = null;
        },
    },
});

export const {
    setPosts,
    addPost,
    setLoading,
    setError,
    clearPosts,
    addComment,
    updatePostLikes,
} = postsSlice.actions;

export const postReducer = postsSlice.reducer;