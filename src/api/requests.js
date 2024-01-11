import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokens, removeUser } from "../store/sliceUsers";

/**
 * baseQueryWithReauth –это наша кастомная обертка над fetchBaseQuery, которая умеет обновлять access токен если запрос вернул 401 код.
 * Эта функция подразумевает, что access и refresh токены хранятся в redux сторе auth.
 *
 * args - это параметры конкретного запроса, там лежит url, method и другие параметры запроса
 * api и extraOptions - это доп. параметры с хелперами
 */
const baseQueryWithReauth = async (args, api, extraOptions) => {
  /**
   * fetchBaseQuery - это обертка от rtk-quert над fetch функцией
   * https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery
   *
   * fetchBaseQuery возвращает функцию, которую можно воспринимать как аналог fetch или axios функции.
   * то есть вызов "await baseQuery(...)" можно воспринимать как вызов "await fetch(...)"
   */
  const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8090/",
    // prepareHeaders - это часть api fetchBaseQuery, которая позволяет сформировать общие заголовки для всех запросов
    prepareHeaders: (headers, { getState }) => {
      // Мы достаем из стора access токен и прикрепляем его ко всем запросам, чтобы не пробрасывать токен в каждый запрос вручную
      // Мы находимся внутри callback функции, которая вызывается непосредственно перед каждым запросом,
      // таким образом все запросы всегда используют актуальный acces токен из redux стора
      const token = getState().avitProUser.tokens.access_token;

      // Чтобы выключить отображение debug логов в консоли браузера, включите уровень Verbose\Debug в консоли разработчика
      console.debug("Использую токен из стора", { token });

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  });

  // Делаем запрос
  const result = await baseQuery(args, api, extraOptions);
  console.debug("Результат первого запроса", { result });

  // Если запрос выполнился не с 401 кодом, то все хорошо, просто отдаем результат запроса наружу
  if (result?.error?.status !== 401) {
    return result;
  }

  // Ниже обрабатываем 401 код

  // Функция которая отчищает данные о юзере в сторе и отправляет на страницу логина
  const forceLogout = () => {
    console.debug("Принудительная авторизация!");
    api.dispatch(removeUser());
    // window.location.navigate("/");
  };

  // Функция getState возвращает состояние redux стейта целиком, ее нам предоставляет rtk query, она прилетает параметром запроса в функцию
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  console.debug("Данные пользователя", refreshToken, accessToken);
  // Если в сторе нет refresh токена, то помочь пользователю мы уже ничем не сможем, разлогиниваем его и отправляем авторизоваться руками
  if (!refreshToken) {
    return forceLogout();
  }

  // Делаем запрос за новым access токеном в API обновления токена
  const refreshResult = await baseQuery(
    {
      url: "/auth/login/",
      method: "PUT",
      body: {
        access_token: accessToken,
        refresh_token: refreshToken,
      },
      headers: {
        "content-type": "application/json",
      },
    },
    api,
    extraOptions
  );

  console.debug("Результат запроса на обновление токена", { refreshResult });

  // Если api обновления токена не вернуло новый access токен, то ничего сделать мы не можем, разлогиниваем юзера
  // Апи может не вернуть новый access токен по разным причинам, например у нас неверный refresh токен или refresh токен протух (обычно refresh токены не протухаю, но бывает и такое)
  // if (!refreshResult.data.access_token) {
  //   return forceLogout();
  // }
  if (refreshResult?.error?.status === 401) {
    return forceLogout();
  } else {
    if (!refreshResult.data.access_token) {
      return forceLogout();
    }

    // Мы наконец получили новый access токен, сохраняем его в стор, чтобы последующие запросы могли его использовать внутри prepareHeaders
    api.dispatch(getTokens(refreshResult.data));
    localStorage.setItem("access_token", refreshResult.data.access_token);
    localStorage.setItem("refresh_token", refreshResult.data.refresh_token);
  }

  // Делаем повторный запрос с теми же параметрами что и исходный,
  // но помним, что повторный запрос произойдет уже с новым токеном,
  // потому что для него вызовется callback prepareHeaders, который получит актуальный access токен из стора,
  // который мы положили в стор строчкой выше
  const retryResult = await baseQuery(args, api, extraOptions);

  // Если повторный запрос выполнился с 401 кодом, то что-то совсем пошло не так, отправляем на принудительную ручную авторизацию
  if (retryResult?.error?.status === 401) {
    return forceLogout();
  }

  console.debug("Повторный запрос завершился успешно");

  return retryResult;
};

export const avitProApi = createApi({
  reducerPath: "avitProApi",
  baseQuery: baseQueryWithReauth,
  /* baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8090/" }),*/
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
      query({ file, id, token }) {
        const formData = new FormData();
        formData.append("file", file);
        console.log(file);
        return {
          url: `http://localhost:8090/ads/${id}/image`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        };
      },
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
      query({ token, file }) {
        const formData = new FormData();
        formData.append("file", file);
        console.log(file);
        return {
          url: `http://localhost:8090/user/avatar`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        };
      },
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

export async function fetchUsers() {
  const response = await fetch("http://localhost:8090/user/all");
  const data = await response.json();
  console.log(data);
  return data;
}
