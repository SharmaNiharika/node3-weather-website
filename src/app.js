const path = require('path')
const express = require ('express')
// const { title } = require('process')
const hbs=require('hbs')
const { title } = require('process')
const { error } = require('console')

const app = express()

const geocode = require('./utils/geocode')
const forecast=require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath =path.join(__dirname,'../templates/views')
const partialsPath =path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
//Documentation - https://expressjs.com/en/5x/api.html
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


app.get('',(req,res)=>{
    // res.render('index')
    res.render('index', {
        title: 'Weather',
        name: 'Niharika Sharma'
    })
})
app.get('/about',(req,res) => {
    // res.render('about')
    res.render('about',{
        title: 'About Me',
        name: 'Niharika Sharma'
    })
})

//Task-4- Create a same template for help route with diff title and name
//Task-5-- Create a partial for the footer - Setup a template for footer partial 'Created by name'- Render the partial at the bottom of all three pages.

app.get('/help',(req,res) =>{
    res.render('help',{
        helpText: 'Contact Niharika Sharma',
        title: 'Help',
        name: 'Niharika Sharma'
    })
})

// Makes everything inside /public accessible in browser
// Example:
// /public/index.html → opens automatically at http://localhost:3000
// 💡 This is how real websites serve HTML, CSS, JS
//SEtup static directory to serve
app.use(express.static(publicDirectoryPath))

// app.get('', (req,res) => {
//     // res.send('Hello Express!')
//     res.send('<h1>Hello Express!</h1>')
// })

// app.get('/help', (req,res)=>{
//     // res.send('Help Page')
//     res.send([{
//         name: 'Niharika'},
//         {age : 22
//     }])
// })

//Task-1 - Setup an about and weather route and render a Page

//Task-2 - setup about route to render html page and setup weather route to render object with forecast and location strings.

//Task-3 - Setup about and help route to render html page in public folder and test the work.

// app.get('/about', (req,res) => {
//     // res.send('About Page')
//     res.send('<h1>About</h1>')
// })

app.get ('/weather', (req,res) => {
    // res.send('Weather Page')
    // res.send({
    //     forecast: 'It is raining',
    //     location: 'Gurugram'
    // })
    // if(!req.query.address){
    //     return res.send({
    //         error: 'You must provide address term'
    //     })
    // }
    // console.log(req.query.address)
    // res.send({
    //     forecast: 'It is raining',
    //     location: 'Gurugram',
    //     address : req.query.address
    // })
    if(!req.query.address){
        return res.send({
            error: 'You must provide address term'
        })
    }
    // console.log(req.query.address)
    const address=req.query.address

    if(!address){
        return res.send({
            error: 'You must provide address term'
        })
    }else{
        geocode(address,(error,{latitude,longitude,location} ={}) =>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error,forecastData) =>{
            if(error){
                return res.send({error})
            }
            console.log(location)
            console.log(forecastData)
            res.send({
                forecast: forecastData,
                // location: 'Gurugram',
                location,
                address : address
            })
        })
    }) 
    }
    
})
//Task-6 -- Update weather route to accept address, If no address send back error message else send back static JSON, add address property and check
app.get ('/products', (req,res) => {
    // res.send('Weather Page')
    // console.log(req.query.search)
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.use('/help', (req, res) => {
    res.status(404).render('404', {
        title:'404',
        name: 'Niharika Sharma',
        errorMessage: 'Help Article Not Found'
    })
})
app.use((req, res) => {
    res.status(404).render('404',{
        title:'404',
        name: 'Niharika Sharma',
        errorMessage: 'Page Not Found'
    })
})

app.listen(3000, () =>{
    console.log('Server is up on port 3000.')
})