const express = require('express');
const router = express.Router();

const Tournament = require('../models/Tournament')

// router.use(cookieParser());

router.put('/add',async(req, res) => {
    console.log(req.body);
    const {pid , num , money , tname } = req.body;

    try {
        const result = await Tournament.findOneAndUpdate(
            { "pid": pid, "num": num , "name":tname}, // Filter criteria
            { $inc: { "money": money } }, // Increment the money property by 50
            { new: true ,upsert: true } // To return the updated document
        );

        console.log(result)

        res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }

});

router.get('/',async(req,res)=>{
    console.log(req.query);

    const {pid , number , tname} = req.query;

    const parsedNum = parseInt(number);

    try {
        const result = await Tournament.find({ "pid": pid, "num": parsedNum ,"name": tname });
        console.log(result,"number api call");
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ success: false, error: "Document not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }

})

module.exports = router;
// function addMoney(req, res) {
//     console.log(req.body)
// }