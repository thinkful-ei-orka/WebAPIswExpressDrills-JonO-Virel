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



app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});