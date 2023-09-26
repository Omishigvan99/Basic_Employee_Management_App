const LocalStrategy=require("passport-local").Strategy
const passport=require("passport")
const {AppUser}=require("../models/AppUserModel")
const {compare}=require("bcrypt")

async function verifyCallback(username,password,done){
    try{
        user=await AppUser.findOne({username:username})
        // console.log(user)
        if(!user){
            return done(null,false,{message:"Incorrect username"})
        }
        result=await compare(password,user.password)
        // console.log(result)
        if(result){
            return done(null,user)
        }else{
            return done(null,false,{message:"incorrect password"})
        }

    }catch(err){
        return done(err)
    }
}

strategy=new LocalStrategy(verifyCallback)

passport.use(strategy)

passport.serializeUser((user,done)=>{
    // console.log("called serialize")
    // console.log(user)
    done(null,user.id)
})

passport.deserializeUser((userid,done)=>{
    // console.log("deserialized got called")
    AppUser.findOne({_id:userid},(err,user)=>{
        if(err){
            done(err)
        }else{
            done(null,user)
            // console.log("deserialized"+user)
        }
    })
})

module.exports={
    passport
}