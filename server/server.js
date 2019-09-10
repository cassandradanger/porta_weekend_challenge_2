//Imports express from node modules
const express = require('express');
const bodyParser = require('body-parser');
//Make our app exist!
const app = express();

let historyArray = [];

// use things...
 //--bodyParser
 //without this line, req.body is NOT A THING
app.use(bodyParser.urlencoded({extended : true}));
// Serve static files...
app.use(express.static('server/public'))
// make a PORT...
const PORT = 5000;

app.get('/history', (req, res) => {
  res.send(historyArray);
})

// routing...
app.post('/addCalc', (req, res) => {
  console.log('add Calc');
  let data = req.body;
  console.log(data)
  //calc logic!
  makeCalculation(data);
  console.log(historyArray);
  //all good servers respond!
  res.sendStatus(201);
})

function makeCalculation(dataToCalculate) {
  // know which operator, and do the correct operation
  if(dataToCalculate.operator === '+') {
    //ADD TOGETHER!
    let result = Number(dataToCalculate.num1) + Number(dataToCalculate.num2);
    // Save the result in our history array
    dataToCalculate.result = result;
    
    historyArray.push(dataToCalculate);
  }
}


// listen for calls...
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`)
})


