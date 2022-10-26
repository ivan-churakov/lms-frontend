import axios from "axios";

export const SIGN_UP_URL = "http://localhost:8333/auth/sign_up";
export const GET_ME_URL = "http://localhost:8333/auth/get_me";
export const REFRESH_URL = "http://localhost:8333/auth/refresh";
export const LOGIN_URL = "http://localhost:8333/auth/login";
export const LECTURES_URL = "http://localhost:8333/users/get-lectures";
export const COURSES_URL = "http://localhost:8333/courses/get-all";

export const signUp = axios.create({
    withCredentials: true,
    baseURL: SIGN_UP_URL,
})
export const login = axios.create({
    withCredentials: true,
    baseURL: LOGIN_URL,
})
export const getLectures = axios.create({
    withCredentials: true,
    baseURL: LECTURES_URL,
})
export const getCourses = axios.create({
    withCredentials: true,
    baseURL: COURSES_URL,
})
export const getMe = axios.create({
    withCredentials: true,
    baseURL: GET_ME_URL,
})
export const refresh = axios.create({
    withCredentials: true,
    baseURL: REFRESH_URL,
})

signUp.interceptors.request.use((config) => {
    // @ts-ignore
    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
    return config;
})

getLectures.interceptors.request.use((config) => {
    // @ts-ignore
    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
    return config;
})

getCourses.interceptors.request.use((config) => {
    // @ts-ignore
    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
    return config;
})

getMe.interceptors.request.use((config) => {
    // @ts-ignore
    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
    return config;
})

refresh.interceptors.request.use((config) => {
    // @ts-ignore
    config.headers.Authorization = `Bearer ${localStorage.getItem('refresh_token')}`
    return config;
})


export const refreshToken = (callback: (error: any) => void) => {
    refresh({
        method: 'post',
        url: 'http://localhost:8333/auth/refresh',
    })
        .then(res => {
            if(res) {
                localStorage.setItem('access_token', res?.data);
                callback(200);
            }
        })
        .catch(error => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
            if(error.response.status === 401) {
                callback(401);
            }
        })
}