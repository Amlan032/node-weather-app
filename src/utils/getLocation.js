const request = require("request")

const getCoordinates = (placeName, callback) => {
    const locationAPIKey = "pk.eyJ1IjoiYW1sYW4xMDEiLCJhIjoiY2x3encyamcwMGNkdjJxc2V3NGs5YjJvYyJ9.FUr-2-nRFpM7clFLrtPeSg"
    const locationUrl = "https://api.mapbox.com/search/geocode/v6/forward?q="+encodeURI(placeName)+"&access_token="+locationAPIKey
    console.log("URL: "+locationUrl)
    request({url : locationUrl, json : true}, (error, response) => {
        if(error){
            callback("Some error occurred while getting coordinates", undefined)
            return
        }
        try{
            const data = {
                fullAddress : response.body.features[0].properties.full_address,
                latitude : response.body.features[0].properties.coordinates.latitude,
                longitude : response.body.features[0].properties.coordinates.longitude
            }
            callback(undefined, data)
        }
        catch(e){
            callback("Exception occurred while getting coordinates: ", undefined)
        }
    })
}

module.exports = getCoordinates