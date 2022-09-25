var db=require('../config/connection')
var collection=require('../config/collections')
const bcrypt=require('bcrypt')
module.exports={
    doSignup:((userData)=>{
        return new Promise(async(resolve, reject) => {
            userData.password=await bcrypt.hash(userData.password,10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData)
                resolve()
            })
        }),
    
    doLogin:((userData)=>{
        return new Promise(async (resolve,reject)=>{
            let loginStatus=false
            let response={}
            let user=await db.get().collection(collection.USER_COLLECTION).findOne({email:userData.ClientEmail})
            
            if(user){
                bcrypt.compare(userData.ClientPassword,user.password).then((status)=>{
                    if(status){
                        console.log("login Success");
                        response.user=user
                        response.status=true
                        resolve(response)
                    }else{
                        console.log("login Wrong Password ");
                        resolve({status:false})
                    }
                })
            }else{
                console.log("login Failed");
                resolve({status:false})
            }
        })
    })
    
}