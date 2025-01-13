import axios from "axios";
import { toast } from "sonner";

const API = axios.create({ baseURL: 'http://localhost:5000/' });
const user = JSON.parse(localStorage.getItem('auth'));

API.interceptors.request.use((req) => {
    if (localStorage.getItem('auth')) {
        req.headers.authorization = `Bearer ${user.token}`;
    }
    return req;
});
API.interceptors.response.use(
    response => response,
    error => {
      const { config, status, data: {message} } = error.response;
      const originalRequest = config;
    //   const refreshToken = localStorage.getItem(refreshTokenKey);
    //   if (status === 401) {
    //     return apiRefreshAccessToken(refreshToken)
    //       .then(response => {
    //         localStorage.setItem(accessTokenKey, response.data.access_token);
    //         return axios(originalRequest);
    //       })
    //       .catch(err => {
    //         configureStore().dispatch(logout());
    //         return err;
    //       });
    //   }

      if (status == 500 && message == "Token is Expires, Please Login again") {
        toast.error("Token is Expires, Please Login again");
        localStorage.clear();

      }
    // console.log(error.response, status, 'ttttttttttttttttttt')
      return Promise.reject(error);
    },
  );
export default API;
