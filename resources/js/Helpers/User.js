import Token from "./Token"
import AppStorage from "./AppStorage"

class User{
    login(data){
        axios.post('/api/auth/login',data)
        .then(res=> this.responseAfterLogin(res))
        .catch((err)=>{
            this.errors = err.response.data
        })
    }

    responseAfterLogin(res){

        const access_token = res.data.access_token

        const user = res.data.user
        if(Token.isValid(access_token)){
            console.log(access_token)
            AppStorage.store(user,access_token)
        }
    }

    hasToken(){
        const storeToken    =  AppStorage.getToken()
        if(storeToken){
           return  Token.isValid(storeToken) ? true : false
        }
        return false
    }

    loggedIn(){
        this.hasToken()
    }

    logout(){
        AppStorage.clear()
    }

    id(){
        const payload = Token.payload(AppStorage.getToken())
        return payload.sub
    }

}


export default User = new User()
