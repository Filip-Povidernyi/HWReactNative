
export const selectId = (state) => state.user.userInfo.uid;
export const selectEmail = (state) => state.user.userInfo.email;
export const selectName = (state) => state.user.userInfo.name;
export const selectAvatar = (state) => state.user.userInfo.profilePhoto;
export const selectIsAuth = (state) => state.user.userInfo.isAuth;

const selectUser = (state) => ({
    id: state.user.userInfo.uid,
    email: state.user.userInfo.email,
    name: state.user.userInfo.name,
    profilePhoto: state.user.userInfo.profilePhoto,
    avatar: state.user.userInfo.profilePhoto,
    nickname: state.user.userInfo.name,
});

export default selectUser;