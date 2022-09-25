var db=require('../config/connection')
var collection=require('../config/collections')
var objectid = require('objectid')
module.exports={

    addProfile:((profile)=>{
        console.log(profile);
        return new Promise((resolve,reject)=>{
        db.get().collection(collection.PRODUCT_COLLECTION).insertOne(profile).then((data)=>{
            console.log(data.insertedId)
            
            })
        resolve()
        })
    }),
    getAllProfiles:(()=>{
        return new Promise(async(resolve,reject)=>{
            let allprofiles=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(allprofiles)
        }) 
    })
    ,
    deleteProfile:((proId)=>{
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id:objectid(proId) }).then((data)=>{
            console.log(data);
            resolve(data)
            })

        })
    })
    ,
    getProfileDetails:((proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectid(proId)}).then((profile)=>{
                resolve(profile)
            })
        })
    })
    ,
    updateProfile:((proId,proDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION)
            .updateOne({_id:objectid(proId)},{
                $set:{
                    pr_gname:proDetails.pr_gname,
                    pr_age:proDetails.pr_age,
                    pr_game:proDetails.pr_game,
                    pr_email:proDetails.pr_email,
                    pr_level:proDetails.pr_level,
                    pr_info:proDetails.pr_info
                }
            }).then((response)=>{
                resolve()
            })
        })
    })

}