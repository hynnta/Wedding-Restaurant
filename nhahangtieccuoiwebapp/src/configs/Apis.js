import axios from "axios"
import cookie from "react-cookies"

export const endpoints = {
    "menus": "/menus/",
    "sanhs": "/sanhs/",
    "login": "/o/token/",
    "hoadon": `/hoadons/`,
    "register": "/users/",
    "reports": "/reports/",
    "dichvus": "/dichvus/",
    "tieccuoi": "/tieccuoi/",
    "loaisanhs": "/loaisanhs/",
    "chitiethoadon": `/chitiethoadons/`,
    "current-user": "/users/current-user/",
    "sanhs-detail": (sanhId) => `/sanhs/${sanhId}/`,
    "dichvus-detail": (dichuvuId) => `/dichvus/${dichuvuId}/`,
    "tieccuoi-user": (userId) => `/users/${userId}/tieccuois/`,
    "tieccuoi-detail": (tieccuoiId) => `/tieccuoi-detail/${tieccuoiId}/`,
    "tieccuoi-reports": (tieccuoiId) => `/tieccuoi-detail/${tieccuoiId}/reports/`,
}

export const authApi = () => {
    return axios.create({
        baseURL: 'http://anhtuan222001.pythonanywhere.com',
        headers: {
            'Authorization': `Bearer ${cookie.load('token')}`
        }
    })
}

export default axios.create({
    baseURL: "http://anhtuan222001.pythonanywhere.com"
})