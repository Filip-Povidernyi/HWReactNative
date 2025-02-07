import { createSelector } from 'reselect';

export const selectId = (state) => state.user.userInfo.uid;
export const selectEmail = (state) => state.user.userInfo.email;
export const selectDisplayName = (state) => state.user.userInfo.displayName;
export const selectAvatar = (state) => state.user.userInfo.profilePhoto;
export const selectIsAuth = (state) => state.user.userInfo.isAuth;
export const selectPosts = (state) => state.posts.posts;

const selectUser = createSelector(
    [selectId, selectEmail, selectDisplayName, selectAvatar, (state) => state.user.userInfo.password],
    (id, email, displayName, profilePhoto, password) => ({
        id,
        email,
        displayName,
        profilePhoto,
        avatar: profilePhoto,
        password,
    })
);

export default selectUser;
