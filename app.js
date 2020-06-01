const express = require('express');
const morgan = require('morgan');
const debug = require('debug');

const app = express();
app.use(morgan('dev'));

app.get('/sum', (req,res)=>{
    const a = req.query.a;
    const b = req.query.b;
    const c = parseInt(a,10) + parseInt(b,10);
    res.send(`a + b = ${c}`)
})

app.get('/cipher',(req,res)=>{
    const text = req.query.text;
    const textUpperCase = text.toUpperCase();
    console.log(textUpperCase);
    const shift = parseInt(req.query.shift);
    const textArray = textUpperCase.split('');
    const list = [];
    textArray.forEach(thing=>{
        let newCode = thing.charCodeAt(0)+ shift;
        while(newCode<65){
            newCode += 26
        }
        while(newCode>90){
            newCode -= 26
        }
        list.push(newCode)});
    const cipher = list.map(number=>String.fromCharCode(number)).join(' ');
    res.send(cipher);
    

})

app.get('/lotto', (req, res) => {
    const arr = req.query.arr
    if (arr.length != 6) {
        return res.status(400).send('must give six numbers bewenn 1-20');
    }
    const arrNumbers = arr.map(number => parseInt(number))
    const winningNumbers = [];
    for (let i=0; i < 6; i++) {
        function getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
        }
        const randomNumber = getRandomIntInclusive(1, 20)
        winningNumbers.push(randomNumber)
    }
    const correctGuesses = winningNumbers.filter(number => arrNumbers.includes(number))
    
    let message = '';
    if (correctGuesses.length < 4){
        message = 'Sorry you lose'
    }
    else if (correctGuesses.length = 4) {
        message = 'Congrats you win a free ticket'
    }
    else if (correctGuesses.length = 5) {
        message = 'Congrats you win $100'
    }
    else if (correctGuesses = 6) {
        message = 'you won mega millions'
    }
    res.send(message)
    console.log(correctGuesses)
    console.log(arrNumbers)
    console.log(winningNumbers)
})

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});