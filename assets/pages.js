// Movie / TV show landing page
var title = "";
var submitBtnEl = $('#submit-Btn');
var userSearchEl = $('#title-input');
var currentTitleEl = $('#movie-result');
var ratingEl = $('#rating');
var taglineEl = $('#tagline');
var bioEl = $('#movie-bio');
var releaseDateEl = $('#release-date');
var directorEl = $('#director');
var actorEl = $('#actors');
var posterEl = $('#movie-poster');
var posterImage = $('#movie-image');
var streamEl = $('#stream');


var ytKey = 'AIzaSyB4FHf5As3BVZRi3cl0KQjVyGsqAJLCW5k';
var apiKey = 'k_9682875a';
var apiKey2 = 'k_0111stv5';
var apiKey3 = 'k_1p5sxkhz';
var lsTitle = [];

//search title API to get the movie ID
// fetch(
//     'https://imdb-api.com/en/API/SearchTitle/k_9682875a/inception'
// )
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     });

// search API to pull the rest of the information needed for the display page 
// actors use 'stars'
//director use 'director'
//'tagline'
//release date use 'year'
//quick bio use 'plot'
//rating use 'imDbRating'

// fetch(
//     'https://imdb-api.com/en/API/Title/k_9682875a/tt1375666/FullCast,Posters,Images,Ratings'
// )
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     });

//localStorage check element
function find(t) {
    for (var i = 0; i < lsTitle.length; i++) {
        if (t === lsTitle[i]) {
            return -1;
        }
    }
    return 1;
}

var savedTitle = JSON.parse(localStorage.getItem('titlename')) || [];
$(window).on("load", funcTitle)

//click on submit button to run function based on user input
$("#submit-Btn").on("click", displayTitle);
function displayTitle(event) {
    event.preventDefault();
    if (userSearchEl.value !== "") {
        lsTitle.push(userSearchEl.val());
        console.log(userSearchEl.val());
        localStorage.setItem("titlename", JSON.stringify(lsTitle));
    }
    savedTitle = JSON.parse(localStorage.getItem('titlename')) || [];
    if (userSearchEl.value !== "") {
        title = userSearchEl.value;
        funcTitle(title);
    }
};

//need to update to dynamically call in the locally stored search title
function funcTitle(title) {
    var queryURL = "https://imdb-api.com/en/API/SearchTitle/" + apiKey + "/" + savedTitle;
    $.ajax({
        url: queryURL,
        method: 'GET',
    }).then(function (response) {
        console.log(response);
        currentTitle(response.results[0].id);
        streamLocation(response.results[0].id);
    });
};

//will need to update to dynamically change for searched values
function currentTitle(id) {
    var queryURL = "https://imdb-api.com/en/API/Title/" + apiKey + "/" + id + "/FullCast,Posters,Images,Ratings";
    $.ajax({
        url: queryURL,
        method: 'GET',
    }).then(function (response) {
        console.log(response);
        $(currentTitleEl).html(response.title);
        $(ratingEl).html(response.imDbRating);
        $(taglineEl).html(response.tagline);
        $(bioEl).html(response.plot);
        $(releaseDateEl).html(response.year);
        $(directorEl).html(response.directors);
        $(actorEl).html(response.stars);
        //using image for now but check pasters for better images??
        $(posterImage).attr('src', response.image);
    });
};

function streamLocation(id) {
    var streamURL = "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup?source_id=" + id + "&source=imdb&country=us";
    var settings ={
        url: streamURL,
        method: 'GET',
        headers: {
            "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
            "x-rapidapi-key": "98c5b8db8amshc08c3e74e647d6bp1d9439jsnddc7ed8522e9"
        }
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
        //$(streamEl).html(response.collection.locations[0].display_name);

        var displayNames = response.collection.locations.map(function (item) {
            return item.display_name;
        }) 
        $(streamEl).html(displayNames.toString());
    })
};
