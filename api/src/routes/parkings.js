const { Router } = require('express');
const axios = require('axios')
const router = Router();


var { get10LowerParkings } = require('../utils/array');

const { YELP_SEARCH_URL_PARKING, YELP_API_KEY, YELP_SEARCH_LIMIT, YELP_SEARCH_TERM, YELP_SEARCH_SORT_BY } = process.env



router.get("/", async (req, res) => {

    const { searched_location } = req.query

    try {
        const response = await axios.get(YELP_SEARCH_URL_PARKING, { 
            params: { 
                term: YELP_SEARCH_TERM,
                sort_by: YELP_SEARCH_SORT_BY,
                location: searched_location,
                limit: YELP_SEARCH_LIMIT,
            },
            headers: {
                Authorization: 'Bearer ' + YELP_API_KEY,
              }
        });

        const businesses = response.data.businesses
        const total = response.data.total
        const pages = Math.ceil( response.data.total / YELP_SEARCH_LIMIT)

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



        res.send( { parkings: filteredParkings, total, pages, searched_location } )

    } catch (error) {
        res.status(400).send( {message: 'We couldn´t find any parking in that location, please try again'} )
    }

});

module.exports = router;