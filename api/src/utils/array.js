
function get10LowerParkings(parkingsArray) {

    const sortArray = parkingsArray.sort(function (a, b) {
        if (a.rating > b.rating) {
          return 1;
        }
        if (a.rating < b.rating) {
          return -1;
        }
        return 0;
    });

    const lowerParkings = sortArray.slice(0, 10)

    return lowerParkings

}

module.exports = {
    get10LowerParkings
}