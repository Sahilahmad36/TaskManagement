import axios from "axios";
import jwt_decode from "jwt-decode";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshToken = async () => {
  const refreshToken = JSON.parse(localStorage.getItem("mern-task-management/user")).refreshToken;
  try {
    const { data } = await axios.post(
      `https://taskmanageapp.onrender.com/api/auth/refresh_token`,
      {
        token: refreshToken,
      }
    );
    localStorage.setItem("mern-task-management/user", JSON.stringify(data));
  } catch (e) {
    console.log(e);
    localStorage.removeItem("mern-task-management/user");
  }
};


api.interceptors.request.use(
  async function (config) {
    
    if (!localStorage.getItem("mern-task-management/user")) return config;
    const { exp } = jwt_decode(
      JSON.parse(localStorage.getItem("mern-task-management/user")).accessToken
    );
    if (exp < Date.now() / 1000) await refreshToken();
    Object.assign(config.headers, {
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("mern-task-management/user")).accessToken,
    });
    return config;
  },
  function (error) {
  
    return Promise.reject(error);
  }
);


export default api;
