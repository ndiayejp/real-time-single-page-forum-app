import { at } from "lodash"

class Token{

    isValid(token){
        const payload = this.payload(token)
        if(payload){
            return payload.iss==`${process.env.MIX_APP_URL}/api/auth/login` || `${process.env.MIX_APP_URL}/api/auth/register` ? true : false
        }
        return false
    }

    payload(token){
        const payload = token.split('.')[1]
        return this.decode(payload)
    }

    decode(payload){
        if(this.isBase64(payload)){
            return JSON.parse(atob(payload))
        }
        return false
    }

    isBase64(str){
         try {
           return btoa(atob(str)).replace(/=/g,"") ==str
         } catch (error) {
             return false
         }
    }
}

export default Token = new Token()
