const express = require('express');
const router = express.Router();

const User = require('../models/user_model')
// router.use(cookieParser());

const getUser = async (email,password) => {
    const result = await User.find({"email":email , "password":password})
    return result;
}

const createUser = async (name , email,password) => {
    const testUser = new User({
        name : name,
        email : email,
        password : password,
    })
    try{
        
        const res = await testUser.save()

        const result = await User.find({"email":email , "password":password})

        return res;
        }
    catch (err) {
        console.error(err)
        return null;
    }
}
 


router.post('/login',async (req, res)=>{
    // console.log(req.query);
    console.log("body 1" , req.body);
    const val = await getUser(req.body.email , req.body.password)
    console.log(val) 
    if(val){
        console.log(val)
        res.send(val[0])
    }
    
    else
    res.send("")
})

router.post('/register',async(req, res)=>{
    console.log(req.body)

    const userNow = await createUser(req.body.name ,req.body.email , req.body.password)

    if(userNow){
    console.log(userNow._id)
    res.send(userNow._id)
    } 
    else{
        console.log("errrrr")
    }

})

module.exports = router;