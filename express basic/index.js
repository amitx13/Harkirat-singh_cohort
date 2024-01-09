const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const port = 3000

/* function middleware(req,res,next){
  console.log("In the Middleware :"+req.headers.counter);
  next();
}

app.use(middleware); */

app.use(bodyparser.json())

app.get('/handleSum', (req, res) => {
    // let counter = req.query.counter; when reading from query
    //console.log(req.headers)
    //let counter = req.headers.counter; when reading from header
    let counter = req.query.counter; //when reading from body

    let claculatedSum = claculateSum(counter);
    let claculatedMul = claculateMul(counter);
    /* console.log(claculatedSum);
    let result = "the calculated sum is :"+claculatedSum; */ //simple text is returned

    const answerObj = { //this object is converted into a json on .send()
      sum:claculatedSum,
      mul:claculatedMul
    }

  res.status(200).send(answerObj);
  //res.status(401).send(result); status 401 send along with the answer default status is 200
})

app.get('/',(req,res)=>{
  res.sendFile(__dirname+"/index.html");
})



/* app.get('/:username',(req,res) => {
  console.log(req.query)
  console.log(req.headers)
    let user = req.params.username;
    res.send(user);
}) */

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}/`)
})

 
function claculateSum(counter){
    let sum = 0;
    for(let i =0;i<=counter;i++){
        sum=sum+i;
    }
    return sum;
}

function claculateMul(counter){
    let mul = 1;
    for(let i=1;i<=counter;i++){
        mul=mul*i;
    }
    return mul;
}