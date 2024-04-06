const mongoose = require('mongoose');

const TournamentSchema = new mongoose.Schema({
    id:String,
    pid:String,
    money:Number,
    num:Number,
    name:String,
});

const tournament = new mongoose.model("Tournament money" ,TournamentSchema);

module.exports = tournament; 