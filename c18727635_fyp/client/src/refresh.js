const refreshUrl = "http://localhost:5000/api/auth/refresh";

export const refreshToken = async () => {
    try{
        console.log("in refreshToken func");
        console.log("before passing refresh, refresh is:");
        console.log(Cookies.get('refresh'));

        //refresh cookie is reaching here
        //the 403 is due to an invalid token being passed here

        
        const res = await axios.post(refreshUrl, {token: Cookies.get('refresh')});
        
        //this has empty data for access and refresh?
        // setUser({
        //     ...user,
        //     accessToken: res.data.accessToken,
        //     refreshToken: res.data.refreshToken,
        // });
        //not reaching here some times so it is an issue with the post itself?
        console.log("user is");
        console.log(user);
        return res.data;
    } catch (err){
        console.log(err);
    }
}