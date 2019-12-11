import axios from 'axios';
const headers = {'Content-Type': 'application/json'};
const burl = "http://172.20.10.11:8000";
import {AsyncStorage} from 'react-native';

export default {
    signup : function(email,password, role) {

        return axios.post(burl + '/signup',{
            "user":{
                'email' : email,
                'password' : password,
                'role': role
            }
        },{
            headers: headers
        })
    },
    login : function(email,password) {
        return axios.post(burl + '/login',{
            "user":{
                'email' : email,
                'password' : password,
            }
        },{
            headers: headers
        })
    },
    getProfile: async function(token){
        const res = await axios.get(burl + '/user/' + token ,{
            headers: headers
        })
        if(res.status === 200) return true;
        else return false;

    },
    loggedIn: async function(){
        let token = await this.getToken()
        let profil;
        if(token === '') profil = false
        else profil = await this.getProfile(token);
        return profil;
    },
    setToken: async function(token){
        try {
            await AsyncStorage.setItem('token', token);
        } catch (error) {
            // Error saving data
        }
    },
    getToken: async function() {
        try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
                return value;
            }else {
                return '';
            }
        } catch (error) {
            // Error retrieving data
        }
    },
    logout: function(){
        AsyncStorage.removeItem('token');
    },
}