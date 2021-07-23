
export function addFavouriteLocal(parking) {

    const favouriteParking = {...parking, date: new Date()}
    let favourites = JSON.parse(localStorage.getItem('favourites')) 

    if(!favourites) {
        favourites = {
            locations: [{text: parking.city, lower: parking.city.toLowerCase()}],
            parkings: [favouriteParking],
            total_pages: 1
        }

        const newFavourites = JSON.stringify(favourites)
        localStorage.setItem('favourites', newFavourites)
        return favourites
    }

    const verifyParking = favourites.parkings.filter(favourite => favourite.id === parking.id)

    if(verifyParking.length > 0) {
        return {message: `${parking.name} is already in Favourites`}
    }

    favourites.parkings.unshift(favouriteParking)
    favourites.total_pages = Math.ceil(favourites.parkings.length / 5)

    const verifyLocation = favourites.locations.filter(location => location.text === parking.city)

    if(verifyLocation.length === 0) {
        favourites.locations.push({text: parking.city, lower: parking.city.toLowerCase()})
    }

    const newFavourites = JSON.stringify(favourites)
    localStorage.setItem('favourites', newFavourites)
    return favourites
    
}

export function deleteFavouriteLocal(parking) {

    let favourites = JSON.parse(localStorage.getItem('favourites'))

    favourites.parkings = favourites.parkings.filter(favourite => favourite.id !== parking.id) 

    const newLocations = []

    favourites.parkings.forEach(parking => {
        const verifyLocation = newLocations.filter(location => location.text === parking.city)
        if(verifyLocation.length === 0) {
            newLocations.push({text: parking.city, lower: parking.city.toLowerCase()})
        }
    })

    favourites.locations = newLocations

    favourites.total_pages = Math.ceil(favourites.parkings.length / 5)

    const newFavourites = JSON.stringify(favourites)

    localStorage.setItem('favourites', newFavourites)

    return favourites

}


export function searchFavouriteParkings( word, favourites) {
    if(word) {
        const searchedParkings = favourites.parkings.filter(parking => parking.name.toLowerCase().includes(word.toLowerCase()) || parking.city.toLowerCase().includes(word.toLowerCase()))
        
        const newLocations = []

        searchedParkings.forEach(parking => {
            const verifyLocation = newLocations.filter(location => location.text === parking.city)
            if(verifyLocation.length === 0) {
                newLocations.push({text: parking.city, lower: parking.city.toLowerCase()})
            }
        })

        return {
            ...favourites,
            parkings: searchedParkings,
            locations: newLocations,
            total_pages: Math.ceil( searchedParkings.length / 5 ),
        }
    }
    return favourites
}


export function filterFavouriteParkings( filter, favourites) {

    const filteredParkings = favourites.parkings.filter(parking => parking.city === filter)
    return {
        ...favourites,
        parkings: filteredParkings,
        total_pages: Math.ceil(filteredParkings.length / 5),
        page: 0,
    }
}


export const sortFavouritesParkings = (parameter, type, favourites) => {

    if(typeof favourites.parkings[0][parameter] === 'number') {
        if(type === 'asc') {
            return {
                ...favourites,
                parkings: favourites.parkings.sort((a, b) => a[parameter] - b[parameter])
            }
        }
        //desc
        return {
            ...favourites,
            parkings: favourites.parkings.sort((a, b) => b[parameter] - a[parameter])
        }
    }

    if(type === 'asc') {
        return {
            ...favourites,
            parkings: favourites.parkings.sort(function(a, b) {
                var keyA = a[parameter].toLowerCase(); 
                var keyB = b[parameter].toLowerCase(); 
                if (keyA < keyB) {
                  return -1;
                }
                if (keyA > keyB) {
                  return 1;
                }
                return 0;
              })
        }
    }
    //desc
    return {
        ...favourites,
        parkings: favourites.parkings.sort(function(a, b) {
            var keyA = a[parameter].toLowerCase(); 
            var keyB = b[parameter].toLowerCase(); 
            if (keyA > keyB) {
              return -1;
            }
            if (keyA < keyB) {
              return 1;
            }
            return 0;
          })
    }
}

export function favouritesPage( page, favourites ) {

    if(page) {
        return favourites.parkings.slice((page) * 5, (page+1) * 5)
    }
    return favourites.parkings.slice(0 , 5)

}

export function getFavouritesLocal( data ) {

    let favourites = JSON.parse(localStorage.getItem('favourites'))

    if(!favourites) {
        favourites = {
            locations:[],
            parkings:[],
            total_pages:0
        }
        const newFavourites = JSON.stringify(favourites)
        localStorage.setItem('favourites', newFavourites)
    }

    if(favourites) {

        if(data.searchWord) {
            favourites = searchFavouriteParkings( data.searchWord, favourites)
        }

        if(data.filter &&  favourites.parkings.length > 0) {
            favourites = filterFavouriteParkings( data.filter, favourites)
        }
        
        if(data.parameter && data.type &&  favourites.parkings.length > 0) {
            favourites = sortFavouritesParkings(data.parameter, data.type, favourites)
        }

        return {
            locations: favourites.locations,
            toShow: favouritesPage( data.page, favourites ),
            total_pages: favourites.total_pages,
            searchWord: data.searchWord || '',
            filter: data.filter || '',
            parameter: data.parameter || '',
            type: data.type || '',
            page: data.page || 0,
        }

    }


}