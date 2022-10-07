import axios from 'axios';

export class GameService {
    async getAll(){
        const res = await axios.get();
        return res.data;
    }
}