import axios from 'axios';

export class UserService{
    baseUrl = "http://localhost:5000/"

    async register(){
        const res = await axios.post(this.baseUrl + "register");
        return res.data;
    }

}