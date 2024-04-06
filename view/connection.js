const mongoose = require('mongoose');
(async function(){
    console.log(process.env.mongo_db)
    await mongoose.connect(process.env.mongo_db)
    .then(()=>{console.log("connection done")})
    .catch((err)=>{console.log("connection error",err)});
    console.log("connection Immediately Invoked Function Expressions")
    
})();