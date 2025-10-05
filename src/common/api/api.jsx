import axios from "axios";

export const BACKEND_DOMAIN = import.meta.env.VITE_BACKEND_URL_NEW;
export const BACKEND_BASE = import.meta.env.VITE_BACKEND_BASE;


// create axios instance
export const APIBaseUrl = axios.create({
  baseURL: `${BACKEND_DOMAIN}${BACKEND_BASE}`,
});


// RESPONSE interceptor (handle 401)
APIBaseUrl.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      try {
        // await UserLogoutApi({ user_id: userId });
      } catch (logoutError) {
        console.error("Logout failed", logoutError);
      }
      // store.dispatch(UserLogout());
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

// REQUEST interceptor (add headers)
APIBaseUrl.interceptors.request.use(
  (config) => {
    try {
      // ---- Add your API key here ----
      config.headers["x-api-key"] = import.meta.env.VITE_API_KEY; 
      // or hardcode: config.headers["x-api-key"] = "your_api_key_here";

      // If you also need token:
      // const state = store.getState();
      // if (state?.login?.isLoggedIn && state?.login?.user_data?.accessToken) {
      //   config.headers["Authorization"] = `Bearer ${state.login.user_data.accessToken}`;
      // }

    } catch (e) {
      console.error("Error accessing state:", e);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
