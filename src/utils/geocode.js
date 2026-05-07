const request = require('request')

const geocode = (address, callback) =>{
    const url = 'https://geocoding-api.open-meteo.com/v1/search?name='+ address +'&count=10&language=en&format=json'

    request({url : url,json: true}, (error,response) => {
    // const data =JSON.parse(response.body)
    //console.log(data)
    // console.log(response.body.hourly.time[0])
    if(error){
        callback('No internet!', undefined)
    }else if(!response.body.results){
        callback('Address not Correct. Try another address',undefined)
    }
    else{
        callback(undefined, {
            latitude : response.body.results[0].latitude,
            longitude : response.body.results[0].longitude,
            location: response.body.results[0].name
        })
            
    }
})
}
// geocode('Berlin',(error,data) =>{
//     console.log('Error', error);
//     console.log('Data', data);
// });
module.exports = geocode