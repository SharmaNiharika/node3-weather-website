const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'https://api.open-meteo.com/v1/forecast?latitude='+latitude+'&longitude='+longitude+'&hourly=temperature_2m&past_days=0&forecast_days=7'

    request({url : url,json: true}, (error,response) => {
    // const data =JSON.parse(response.body)
    //console.log(data)
    // console.log(response.body.hourly.time[0])
    if(error){
        callback('No internet!', undefined)
    }else if(!response.body.hourly){
        callback('Address not Correct. Try another address',undefined)
    }
    else{
        callback(undefined, 'It is currently '+ response.body.hourly.temperature_2m[0] +' temperature.')
    }
})
}

module.exports = forecast