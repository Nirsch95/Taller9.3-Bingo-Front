import axios from 'axios';

export class UserService {
    baseUrl = "http://localhost:5000/"

    async register(user) {
        const res = await axios.post(this.baseUrl, user);
        return res.data;
    }

    async login(user) {
        const res = await axios.post(`${this.baseUrl}login`, user);
        return res.data;
    }

    async getMe(token){
        const res = await axios.get(`${this.baseUrl}me`, {headers: {Authorization: `Bearer ${token}`}});
        localStorage.setItem('token', token);
        return res.data;
    }

    async logout(){
        const token = localStorage.getItem('token')
        const res = await axios.get(`${this.baseUrl}logout`, {headers: {Authorization: `Bearer ${token}`}});
        localStorage.removeItem('token')
        return res.data;
    }

}