const { generateRandomString } = require("victor-dev-toolbox");

const  user = {
    username:"gaylordspices",
    password:"123456789"
}

class Authentication {

    async login(data){
        
        
        const username = data.username;
        const password = data.password;
        if(username === user.username && password === user.password){
            const token = this.generateToken();
            return {status:'success', message:"Login Successful", token};
        } else{
            return {status:'error', message:"Wrong email or password"};

        }

    }

    generateToken(){
        return generateRandomString(150)
    }

}

module.exports ={
    Authentication
}