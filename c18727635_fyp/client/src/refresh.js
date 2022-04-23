import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";

const refreshUrl = "/api/auth/refresh";


export const axiosBASE = axios.create({baseURL:"http://localhost:5000/"});

export const axiosJWT = axios.create({baseURL:"http://localhost:5000/"}); 

// axiosJWT.get("/api")

export const setupAxios = async () => {

    axiosJWT.interceptors.request.use(async (config)=>{
        //     //before making a request
            console.log("in axios.interceptors")
            let currentDate = new Date();
            if(!Cookies.get('authorization')){
                console.log("no access token")
                return;
            }
            
            //check if this already exists
            const decodedToken = jwt_decode(Cookies.get('authorization'));
            console.log("decode expiry is:")
            console.log(decodedToken.exp);
    
    
            //if the token has expired
            if(decodedToken.exp * 1000 < currentDate.getTime()){
                console.log("refreshing token!")
                const data = await refreshToken(); //get a fresh access and refresh token

                config.headers["token"] = "Bearer " + data.accessToken;
                Cookies.set('authorization', data.accessToken);
                Cookies.set('refresh', data.refreshToken);
            }
            return config;
        },(error)=>{
    
            return Promise.reject(error);
        });    
}
  

export  const refreshToken = async () => {
    try{
        console.log("before passing refresh, refresh is:");
        console.log(Cookies.get('refresh'));

        //refresh cookie is reaching here
        //the 403 is due to an invalid token being passed here

        
        const res = await axiosBASE.post(refreshUrl, {token: Cookies.get('refresh')});
        
        //this has empty data for access and refresh?
     
        //not reaching here some times so it is an issue with the post itself?
     
    
        return res.data;
    } catch (err){
        console.log(err);
    }
}