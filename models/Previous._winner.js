const mongoose = require('mongoose');

const previousWinnerSchema = new mongoose.Schema({
    name :String,
    id:Number,
    winner:String,
    min_money:Number,
    num:Number,
})

const previousWinner = new mongoose.model("previousWinner",previousWinnerSchema)

module.exports = previousWinner
