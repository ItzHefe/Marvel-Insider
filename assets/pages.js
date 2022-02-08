// Movie / TV show landing page

var apiKey = 'k_9682875a';

//search title API to get the movie ID
fetch (
    'https://imdb-api.com/en/API/SearchTitle/k_9682875a/inception'
)
.then (function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data);
});

// search API to pull the rest of the information needed for the display page 
// actors use 'stars'
//director use 'director'
//'tagline'
//release date use 'year'
//quick bio use 'plot'
//rating use 'imDbRating'

fetch (
    'https://imdb-api.com/en/API/Title/k_9682875a/tt1375666/FullCast,Posters,Images,Ratings'
)
.then (function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data);
});