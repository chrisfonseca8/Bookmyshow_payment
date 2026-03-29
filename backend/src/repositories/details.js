const { shows, Movie } = require('../models');

async function getDetails(movieId) {
    const response = await shows.findAll({
        where: {
            movieId: movieId
        },
        include: [{
            model: Movie,
            as: 'MovieDetail'
        }]
    })

    return response
}

module.exports = {
    getDetails
}