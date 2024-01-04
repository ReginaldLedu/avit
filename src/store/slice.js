import { createSlice } from "@reduxjs/toolkit";

export const avitProSlice = createSlice({
  name: "avitProToolkit",
  initialState: {
    allPosts: [],
    filteredPosts: [],
    currentPost: {
      id: 3,
    },
    allUserPosts: [],
    addPostSwitchOn: false,
    currentUserPosts: [],
    sellerPosts: [],
    commentSwitchOn: false,
    comments: [],
    allPostIMG: [],
  },
  reducers: {
    allPostsFill: (state, action) => {
      state.allPosts = action.payload;
    },
    filteredPostsFill: (state, action) => {
      state.filteredPosts.push(action.payload);
    },
    getCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    },
    getAllUsersPosts: (state, action) => {
      state.allUserPosts = action.payload;
    },
    addPost: (state) => {
      state.addPostSwitchOn = true;
    },
    closeAddPost: (state) => {
      state.addPostSwitchOn = false;
    },
    getCurrentUserPosts: (state, action) => {
      state.currentUserPosts = action.payload;
    },
    getSellerPosts: (state, action) => {
      state.sellerPosts = action.payload;
    },
    addComment: (state) => {
      state.commentSwitchOn = true;
    },
    closeCommentBox: (state) => {
      state.commentSwitchOn = false;
    },
    getComments: (state, action) => {
      state.comments = action.payload;
    },
    getAllPostImg: (state, action) => {
      state.allPostIMG = action.payload;
    },
  },
});

export default avitProSlice.reducer;
export const {
  allPostsFill,
  getCurrentPost,
  filteredPostsFill,
  getAllUsersPosts,
  addPost,
  closeAddPost,
  getCurrentUserPosts,
  getSellerPosts,
  addComment,
  closeCommentBox,
  getComments,
  getAllPostImg,
} = avitProSlice.actions;
