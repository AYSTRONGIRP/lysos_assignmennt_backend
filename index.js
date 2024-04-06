const express = require('express')
const app = express()
const cors = require("cors");
require('dotenv').config();

const connection = require('./view/connection');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(cors());

const moneyRoute = require('./routes/money');
const userRoute = require('./routes/user');
const tournamentRoute = require('./routes/tournament');
// app.
app.use('/money',moneyRoute)
app.use('/',userRoute)
app.use('/tournament',tournamentRoute)

const Tournament = require('./models/Tournament')
const PreviousWinner = require('./models/Previous._winner');
const User = require('./models/user_model')

app.listen(8080);

let ctname ;
let tournamentCount = 0;
let winner = ''
let minPid ;
let minNum ; 
let minMoney ;

async function myFunction() {
    // Your code to be executed goes here
    console.log("Executing myFunction..."); 

    let latestTournament;
    try {
        latestTournament = await PreviousWinner.findOne().sort({ id: -1 });
        console.log(latestTournament ,"last Tournament");
    } catch (err) {
        console.error("Error finding latest tournament entry:", err);
    }
    // console.log(latestTournament)
    minPid = 0 
    minNum = 0 
    minMoney = 0 
    try {
        // Find the tournament with the specified ctname
        const tournaments = await Tournament.find({ name: latestTournament.name });
        console.log(tournaments, "moneybowl");
    
        // Check if any tournaments are found
        if (tournaments.length > 0) {
            // Extract money, pid, and num values from all tournaments
            const moneyArray = tournaments.map(tournament => tournament.money);
            const pidArray = tournaments.map(tournament => tournament.pid);
            const numArray = tournaments.map(tournament => tournament.num);
    
            // Flatten the arrays (if money, pid, and num are arrays of arrays)
            const money = moneyArray.flat();
            const pid = pidArray.flat();
            const num = numArray.flat();
    
            // Find the minimum money and its index
            const minMoney = Math.min(...money);
            const minMoneyIndex = money.indexOf(minMoney);
    
            // Get the corresponding pid and num
            minPid = pid[minMoneyIndex];
            minNum = num[minMoneyIndex];
     
            console.log(minMoney, minPid, minNum);
        } else {
            console.log('Tournaments not found');
        }
    } catch (err) {
        console.error(err);
        console.log('Internal Server Error');
    }
    
    // name :String,
    // id:Number,
    // winner:String,
    // min_money:Number,
    // num:Number,
    console.log(minMoney ,'min money not implemented', minPid, minNum);
    if (latestTournament) {
        try {
            if(minNum==0 || minPid==0){
                console.log('no money input')
            }
            else{
                // latestTournament.id = minPid;
                latestTournament.num = minNum;
                // latestTournament.min_money = minMoney;
                console.log(minPid)
                const user = await User.findOne({ _id: minPid });
                latestTournament.winner= user.name;
            }
            
            await latestTournament.save();
            console.log(latestTournament , "saving winner")
            console.log("Latest tournament entry updated with winner ");
        } catch (err) {
            console.error("Error updating latest tournament entry:", err);
        }
    } 
 
    console.log(new Date().toString());
    const currentDate = new Date();

    // Format date and time
    const formattedDate = currentDate.toDateString().slice(4) + " " + currentDate.toTimeString().slice(0, 5);

    // Log the formatted date and time
    // console.log("Executing myFunction...");
    console.log(formattedDate);
    ctname = formattedDate

    tournamentCount++;

    // Create previous tournament entry
    try {
        const newTournament = new PreviousWinner({
            name: ctname,
            id: (latestTournament.id+1),
            winner: 'NO one participated', // You should specify the winner here
            num:0

        });

        console.log(newTournament,"checking id")
        // Save the tournament entry
        await newTournament.save(); 
 
        // Log success message
        console.log("Previous tournament entry created successfully.");
    } catch (err) {
        console.error("Error creating previous tournament entry:", err);
    } 


}

// myFunction()

// Calculate milliseconds until the next even minute
const now = new Date();
const msUntilNextEvenMinute = 60000 * (2 - (now.getMinutes() % 2)) - now.getSeconds() * 1000;


console.log(msUntilNextEvenMinute);
console.log(now.getMinutes() , "get minutes")
console.log((now.getMinutes() % 2))
console.log((2 - (now.getMinutes() % 2)))
console.log(60000 * (2 - (now.getMinutes() % 2)))
console.log(60000 * (2 - (now.getMinutes() % 2)) - now.getSeconds() * 1000)


// Execute the function initially after the delay
setTimeout(() => {
    myFunction();
    setInterval(() => {
        myFunction();
    }, 2 * 60 * 1000);
}, msUntilNextEvenMinute);