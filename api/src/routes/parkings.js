const { Router } = require('express');
const axios = require('axios')
const router = Router();


var { get10LowerParkings } = require('../utils/array');

const { YELP_SEARCH_URL_PARKING, YELP_SEARCH_URL_DETAILS, YELP_API_KEY, YELP_SEARCH_LIMIT, YELP_SEARCH_TERM, YELP_SEARCH_SORT_BY } = process.env



router.get("/", async (req, res) => {

    let { searched_location, offset } = req.query
    if(!offset) {
        offset = 0
    }

    try {
        const response = await axios.get(YELP_SEARCH_URL_PARKING, { 
            params: { 
                term: YELP_SEARCH_TERM,
                sort_by: YELP_SEARCH_SORT_BY,
                location: searched_location,
                limit: YELP_SEARCH_LIMIT,
                offset: offset * YELP_SEARCH_LIMIT,
            },
            headers: {
                Authorization: 'Bearer ' + YELP_API_KEY,
              }
        });

        const businesses = response.data.businesses
        const total = response.data.total
        let pages = Math.ceil( response.data.total / YELP_SEARCH_LIMIT)

        if(pages > 1) {
            pages = pages -1
        }

        const lower10parkings = get10LowerParkings(businesses)

        const filteredParkings = lower10parkings.map(parking => {
            return {
                id: parking.id,
                name: parking.name,
                address: parking.location.display_address,
                city: parking.location.city,
                rating: parking.rating,
                review_count: parking.review_count,
                url: parking.url,
                image_url: parking.image_url,
                score: Math.round((parking.review_count * parking.rating) / (parking.review_count + 1) * 10) / 10
            }
        })

        const locations = []

        filteredParkings.forEach( parking => {
            if(!locations.includes(parking.city)) {
                locations.push(parking.city)
            }
        })

        const page = offset + 1

        res.send( { parkings: filteredParkings, total, pages, page, searched_location, locations } )

    } catch (error) {

        res.status(400).send( {message: 'We couldn´t find any parking in that location, please try again'} )
    }

});

router.get("/nearby", async (req, res) => {

    let { position, offset } = req.query
    if(!offset) {
        offset = 0
    }
    
    try {
        const response = await axios.get(YELP_SEARCH_URL_PARKING, { 
            params: { 
                term: YELP_SEARCH_TERM,
                sort_by: YELP_SEARCH_SORT_BY,
                latitude: position.latitude,
                longitude: position.longitude,
                limit: YELP_SEARCH_LIMIT,
                offset: offset * YELP_SEARCH_LIMIT,
            },
            headers: {
                Authorization: 'Bearer ' + YELP_API_KEY,
              }
        });

        const businesses = response.data.businesses
        const total = response.data.total
        let pages = Math.ceil( response.data.total / YELP_SEARCH_LIMIT)

        if(pages > 1) {
            pages = pages -1
        }

        const lower10parkings = get10LowerParkings(businesses)

        const filteredParkings = lower10parkings.map(parking => {
            return {
                id: parking.id,
                name: parking.name,
                address: parking.location.display_address,
                city: parking.location.city,
                rating: parking.rating,
                review_count: parking.review_count,
                url: parking.url,
                image_url: parking.image_url,
                score: Math.round((parking.review_count * parking.rating) / (parking.review_count + 1) * 10) / 10
            }
        })

        const locations = []

        filteredParkings.forEach( parking => {
            if(!locations.includes(parking.city)) {
                locations.push(parking.city)
            }
        })

        const page = offset + 1

        const searched_location = locations[0]

        res.send( { parkings: filteredParkings, total, pages, page, searched_location, locations } )

    } catch (error) {
        res.status(400).send( {message: 'We couldn´t find any parking in that location, please try again'} )
    }

});

router.get("/details", async (req, res) => {

    let { id } = req.query

    try {
        const response = await axios.get(YELP_SEARCH_URL_DETAILS + id, { 
            headers: {
                Authorization: 'Bearer ' + YELP_API_KEY,
              }
        });

        const score = Math.round((response.data.review_count * response.data.rating) / (response.data.review_count +1) * 10) / 10

        const businessDetails = {
            id: response.data.id,
            name: response.data.name,
            url: response.data.url,
            rating: response.data.rating,
            review_count: response.data.review_count,
            score,
            phone: response.data.phone,
            display_phone: response.data.display_phone,
            city: response.data.location.city,
            zip_code: response.data.location.zip_code,
            country: response.data.location.country,
            state: response.data.location.state,
            photos: response.data.photos,
            open: !response.data.is_closed,
        }
        
        res.send(businessDetails)
        // res.send(response.data)

    } catch (error) {
        console.log(error)
        res.status(400).send( {message: 'We couldn´t find any parking in that location, please try again'} )
    }

});


module.exports = router;