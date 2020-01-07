import axios from 'axios';
const headers = {'Content-Type': 'application/json'};
const burl = "http://192.168.1.16:8000";
import {AsyncStorage} from 'react-native';
import { Platform } from "react-native";

export default {
    InitializeUser : async function(lastname ,firstname, description, avatar, id) {
        let token = await this.getToken();

        const data = new FormData();
        data.append('lastname', lastname);
        data.append('firstname', firstname);
        data.append('description', description);
        data.append('avatarUri', avatar.uri);
        data.append('token', token);
        data.append('fileData', {
            uri : Platform.OS === "android" ? avatar.uri : avatar.uri.replace("file://", ""),
            type: Platform.OS === "android" ? 'image/jpeg' : avatar.type,
            name: id,
        });

        const res = await axios.post(burl + '/initlializeUser',data,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            },
        });

        return res.status === 200 ? res : false;

    },
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
    signin : function(email,password) {
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
        if(res.status === 200) return res.data;
        else return false;

    },
    loggedIn: async function(){
        let token = await this.getToken();
        let profil;
        if(token === '') profil = false;
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