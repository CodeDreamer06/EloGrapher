import axios from 'axios';

export default class ApiService {
    static async fetchUserData(usernames, action) {
        const userStats = await Promise.all(usernames.map(async username => {
            try {
                const response = await axios.get(`https://api.chess.com/pub/player/${username}/stats`);
                return response.data;
            }
            catch(error) {
                console.log(error);
            }
            }))
            
            const userDetails = await Promise.all(usernames.map(async username => {
                try {
                    const response = await axios.get(`https://api.chess.com/pub/player/${username}`);
                    return response.data;
                }
                catch(error) {
                    console.log(error);
                }
                }))
            
            action(userStats, userDetails);
    }

    static async getDataForUser(username, action) {
        await this.fetchUserData([username], action);
    }

    static async getRatingGraph(name, type = 'rapid', daysAgo = 30, action) {
        try {
            const response = await axios.get('https://cors-anywhere.herokuapp.com/'+ `https://www.chess.com/callback/live/stats/${name}/chart?daysAgo=${daysAgo}&type=${type}`)
            let keys = ['timestamp', 'rating']
            const [timestamps, ratings] = response.data.reduce((a,b) => (keys.map((value, i) => {a[i].push(b[value])}), a), [[],[]]);
            action(timestamps, ratings)
        }
        catch(error) {
            console.log(error)
        }
    }
}