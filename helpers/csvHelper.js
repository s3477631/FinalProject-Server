const Papa = require('papaparse')
const { StringDecoder } = require('string_decoder')
const TimeFormat = require('hh-mm-ss')
const decoder = new StringDecoder('utf8');



async function parseCsv(data) {
  // console.log(data)
  const output = Buffer.from(data);
  //parses the data from a data buffer to a string
   let result = decoder.write(output)
//Papa parse converts the data to json
   let endresult = Papa.parse(result)
   //needs to be formatted & converted to seconds
   console.log(endresult)
   return correctFormat(endresult)
}
 async function correctFormat(endresult){
  let construct = endresult.data;
  let startend = {
    start:[],
    end:[]
  }


//
  for(i = 1; i < construct.length - 1; i++){
    //splits the start and end times and pushes to object array
    startend.start.push(construct[i][0])
    startend.end.push(construct[i][1])
  } 
  let outter = startend.end
  let inner = startend.start
 outter.pop()

 runtest(outter, inner)

}
async function runtest(outter, inner){


let convertstart = []
let convertend = []
//mapping the end times, converting to 24 hour time and converring to seconds
outter.map((currElement) => {
 
  if(currElement.slice(0, -3).trim().length == 4){ 

   if(currElement.slice(-2)== "PM"){
    convertstart.push(`${parseInt(currElement) + 12}:00`)
  }
  else { 
    convertstart.push(`${0}` + (currElement.slice(0, -3).trim()))
   }
  }
  else if(currElement.slice(0, -3).trim().length == 5){
    if(currElement.slice(-2)== "PM"){
    convertstart.push(parseInt(currElement) + 12)
    }
    else { 
      convertstart.push(currElement.slice(0, -3).trim())
    }
  }
})
inner.map((currElement) => {
 
  if(currElement.slice(0, -3).trim().length == 4){ 

   if(currElement.slice(-2)== "PM"){
    convertend.push(`${parseInt(currElement) + 12}:00`)
  }
  else { 
    convertend.push(`${0}` + (currElement.slice(0, -3).trim()))
   }
  }
  else if(currElement.slice(0, -3).trim().length == 5){
    if(currElement.slice(-2)== "PM"){
    convertend.push(parseInt(currElement) + 12)
    }
    else { 
      convertend.push(currElement.slice(0, -3).trim())
    }
  }
})
  runNext(convertend, convertstart)
  
  
// console.log(tetti)
// console.log(TimeFormat.toS(tetti))
}

function runNext(convertend, convertstart) {


  for (let z of convertstart){

    console.log("end " + TimeFormat.toS(z))
  }
  for (let i of convertend){

    console.log("start " + TimeFormat.toS(i))
  }
}






module.exports = parseCsv

