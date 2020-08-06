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
           return  Token.isValid(storedToken) ? true : this.logout()
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
        if(this.loggedIn()){
            const payload = Token.payload(AppStorage.currentToken())
            return payload.sub
        }
    }

    owner(id){
        return this.id() === id
    }

}


export default User = new User()
