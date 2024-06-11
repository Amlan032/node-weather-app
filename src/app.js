const path = require("path")
const express = require("express")
const hbs = require("hbs")

const getCoordinates = require("./utils/getLocation.js")
const getWeatherData = require("./utils/getWeatherData.js")

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

//setup static files directory for express
app.use(express.static(publicDirectoryPath))


app.get("/", (req, resp) => {
    // resp.render("index", {
    //     title : "Dynamic Weather App",
    //     name : "Amlan"
    // })
    resp.render("weather")
})

app.get("/about", (req, resp) => {
    resp.render("about", {
        title : "HBS title"
    })
})

app.get("/help", (req, resp) => {
    resp.send({
        name : "Tom",
        age : 20
    })
})

app.get("/weather", (req, resp) => {
    if(!req.query.address){
        resp.send({
            error : "No address provided"
        })
        return
    }
    getCoordinates(req.query.address, (error, data) => {
        if(error){
            resp.send({
                errorMsg : error
            })
        }
        else{
            // console.log("Latitude",data.latitude)
            // console.log("Longitude", data.longitude)
            // console.log("Full Address", data.fullAddress)
            getWeatherData(data.latitude, data.longitude, (error, weatherData) => {
                if(error){
                    resp.send({
                        errorMsg : error
                    })
                }
                else{
                    resp.send({
                        "actual_Temp": weatherData.temp,
                        "feels_like": weatherData.feelTemp,
                        "location": data.fullAddress
                    })
                    // console.log("Actual Temp:", weatherData.temp)
                    // console.log("Feels like: ", weatherData.feelTemp)
                    // console.log("Location :", data.fullAddress)
                }
            })
        }
    })
})

app.get("/products", (req, resp) => {
    console.log(req.query)
    const queryParams = req.query
    resp.send({
        products : queryParams
    })
})

app.get("/help/*", (req, resp) => {
    resp.render("notfound", {
        errorMsg : "This help page is not available"
    })
})

app.get("*", (req, resp) => {
    resp.render("notfound", {
        errorMsg : "This page is not available."
    })
})

app.listen(3000, () => {
    console.log("Server is up and running on port 3000")
})
