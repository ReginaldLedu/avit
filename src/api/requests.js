import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const avitProApi = createApi({
  reducerPath: "avitProApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8090/" }),
  prepareHeaders: (headers) => {
    const { access_token } = JSON.parse(localStorage.getItem("access_token"));
    if (access_token) {
      headers.set("Authorization", `Bearer ${access_token}`);
    }
    return headers;
  },
  endpoints: (build) => ({
    fetchAllAds: build.query({
      query: () => ({
        url: "/ads",
      }),
    }),
    registerRTK: build.mutation({
      query: ({ email, password, name, surname, city }) => ({
        url: "http://localhost:8090/auth/register",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name, surname, city }),
      }),
    }),
    addPostTextRTK: build.mutation({
      query: ({ title, description, price, token }) => ({
        url: "http://localhost:8090/adstext",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, price }),
      }),
    }),
    addImageToThePost: build.mutation({
      query: ({ formData, id, token }) => ({
        url: `http://localhost:8090/ads/${id}/image`,
        method: "POST",
        headers: {
          "Content-Type": "mutipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }),
    }),
    getAllPostIMGRTK: build.query({
      query: () => ({
        url: "/images",
      }),
    }),
    removePost: build.mutation({
      query: ({ id, token }) => ({
        url: `http://localhost:8090/ads/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    changePostRTK: build.mutation({
      query: ({ title, description, price, id, token }) => ({
        url: `http://localhost:8090/ads/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, price }),
      }),
    }),
    addUserAvatar: build.mutation({
      query: ({ token, file }) => ({
        url: `http://localhost:8090/user/avatar`,
        method: "POST",
        headers: {
          "Content-Type": "mutipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        body: { file: file },
      }),
    }),
  }),
});

export const {
  useAddImageToThePostMutation,
  useRegisterRTKMutation,
  useFetchAllAdsQuery,
  useAddPostTextRTKMutation,
  useGetAllPostIMGRTKQuery,
  useRemovePostMutation,
  useChangePostRTKMutation,
  useAddUserAvatarMutation,
} = avitProApi;

/* export async function register({ email, password, name, surname, city }) {
  let response = await fetch("http://localhost:8090/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, surname, city }),
  });
  const result = await response.json();
  if (result.detail === "Could not validate credentials: Not enough segments") {
    console.log(result.status);
  }
} */

export async function addPostText({ title, description, price }, token) {
  let response = await fetch("http://localhost:8090/adstext", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description, price }),
  });
  const result = await response.json();
  console.log(result);
}

export async function addComment(postId, commentText, token) {
  let response = await fetch(`http://localhost:8090/ads/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text: commentText }),
  });
  const result = await response.json();
  console.log(result);
}

export async function refreshTokens(access_token, refresh_token) {
  fetch("http://localhost:8090/auth/login", {
    method: "PUT",
    body: JSON.stringify({
      access_token: access_token,
      refresh_token: refresh_token,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      localStorage.setItem("access_token", json.access_token);
      localStorage.setItem("refresh_token", json.refresh_token);
    })
    .then((json) => console.log(json));
}

export async function updateUserDataInAPI(
  userEmail,
  userName,
  userSurname,
  userPhone,
  userCity,
  token
) {
  fetch("http://localhost:8090/user", {
    method: "PATCH",
    body: JSON.stringify({
      role: "user",
      email: userEmail,
      name: userName,
      surname: userSurname,
      phone: userPhone,
      city: userCity,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

export async function fetchTokens({ email, password }) {
  let response = await fetch("http://localhost:8090/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const result = await response.json();
  console.log(result);
}

/* export const fetchTokens = ({ email, password }) => {
  return function (dispatch) {
    fetch("http://localhost:8090/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((json) => dispatch(getTokens(json)));
  };
}; */

export async function fetchUsers() {
  const response = await fetch("http://localhost:8090/user/all");
  const data = await response.json();
  console.log(data);
  return data;
}
