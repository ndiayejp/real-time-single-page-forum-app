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

            AppStorage.store(access_token,user)
            window.location = "/"
        }
    }

    hasToken(){
        const storedToken    =  AppStorage.currentToken()

        if(storedToken){
           return  Token.isValid(storedToken) ? true : false
        }
        return false
    }

    loggedIn(){
      return   this.hasToken()
    }

    logout(){
        AppStorage.clear()
        window.location = "/"
    }

    id(){
        const payload = Token.payload(AppStorage.getToken())
        return payload.sub
    }

}


export default User = new User()
