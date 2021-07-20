const { Router } = require('express');
const axios = require('axios')
const router = Router();

var geoip = require('geoip-lite');

var { get10LowerParkings } = require('../utils/array');

const { YELP_SEARCH_URL_PARKING, YELP_API_KEY, YELP_SEARCH_LIMIT, YELP_SEARCH_TERM, YELP_SEARCH_SORT_BY } = process.env

router.get("/ip", async (req, res) => {

    // const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
    const ip = '186.84.22.236'

    const location = await geoip.lookup(ip);

    console.log(location.city)


    res.send('Aqui obtienes la IP')

});

router.get("/parkings", async (req, res) => {

    try {

        const response = await axios.get(YELP_SEARCH_URL_PARKING, { 
            params: { 
                term: YELP_SEARCH_TERM,
                sort_by: YELP_SEARCH_SORT_BY,
                location: 'New York',
                limit: YELP_SEARCH_LIMIT,
                offset: 2
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
                rating: parking.rating,
                review_count: parking.review_count,
                url: parking.url,
                image_url: parking.image_url,

            }
        })

        res.send( { parkings: filteredParkings, total, pages } )

    } catch (error) {
        console.log(error)
        res.send(error)
    }

});

module.exports = router;