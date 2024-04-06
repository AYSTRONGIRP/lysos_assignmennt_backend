const express = require('express');
const router = express.Router();

const Tournament = require('../models/Tournament')
const PreviousWinner = require('../models/Previous._winner');

router.get('/',async(req,res)=>{
    // console.log(req.query);
    // const { id , name } = req.query;

    try {
        const entries = await PreviousWinner.find().sort({ id: -1 }).limit(20); // Sort by descending order of createdAt
        // console.log(entries)
        res.status(200).json(entries);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }

})

module.exports = router;