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
   //needs to be formatted & converted to secondss
   let v = await convertSeconds(endresult)
   console.log(endresult.data)
   return v
 }  
 
// async function convertSeconds(endresult){ 
// let data = endresult.data
// let endtimes = []
// let starttimes = []
// data.filter((val) => {
//   // Start time checks to see if its an afternoon start
//     if(val[0].includes("PM")){
//           starttimes.push(TimeFormat.toS(`${parseInt(val[0].slice(0, 1)) + 12 +':'+ val[0].slice(2, 4)}`))                 
//     }      
//     else { 
//       if(val[0].length == 7){ 
//          starttimes.push(TimeFormat.toS(`0${val[0].slice(0, 5).trim()}`))
//         }
//           else if (val[0].length == 8) {
//              starttimes.push(TimeFormat.toS(val[0].slice(0, 5)))
//          }
//     }
//     // End time
//     if(val[1] != undefined && val[1].length == 7){
//       endtimes.push(
//        TimeFormat.toS(
//          `${parseInt(val[1]
//            .slice(0, 1)) 
//            + 12 +':'+ val[1]
//            .slice(2, 4)}`
//           )
//         )
//    }                               
// })
// // console.log((endtimes[10]-starttimes[10])/60)
// let dur =  starttimes.map((k, index) => endtimes[index] - starttimes[index])
// let breaks = { 
//   start: starttimes, 
//   end: endtimes, 
//   duration: dur,
//   times: breaksessions(dur, starttimes)
// }
// return breaks
// }
// function breaksessions(dur, starttimes){ 

//   return dur.map((value, k) => {
//        if((value / 60) > 4 && (value/60) < 5){
//         let shift4to5 = `${(starttimes[k] + 60)/60}` + "-" + `${(starttimes[k] + 75)/60}`
     
//         return shift4to5
//           // return value
//           // return (starttimes[dur.indexOf(value)])/60
//         }
//        if((value / 60) > 5 && (value/60) < 7){
//             let shift5to7 =`${(starttimes[k] + 60)/60}` + "-" + `${(starttimes[k] + 75)/60}`
  
//             return shift5to7
//           //  return (starttimes[dur.indexOf(value)])
//         }
//        if((value / 60) > 7 && (value/60) < 9){
//           // return valuess
//           let shift7to9 =`${(starttimes[k] + 60)/60}` + "-" + `${(starttimes[k] + 75)/60}`

//           return shift7to9
//         }
//         if((value / 60) < 9){
//           let shift9more = starttimes[k] + 60

//           return shift9more/60
//           // return value 
//           // return (starttimes[dur.indexOf(value)])/60
//         }
//   })
// }

// // 4-5 hours 15 min break   
// // 5-7 hours 15 min break; 30 min
// // 7-9 hours 2 x 15 min break; 30 min 
// // 9+ hours 2 x 15 min break; 2 x 30 min

// // Meal breaks and rest breaks must not be taken within 1 hour of start/end of shift or 1 hour within previous break


// module.exports = parseCsv

