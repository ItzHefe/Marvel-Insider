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
var posterEl = $('movie-poster');

var apiKey = 'k_9682875a';
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

// //localStorage check element
// function find(t) {
//     for (var i = 0; i < lsTitle.length; i++) {
//         if (t.toUppercase === lsTitle[i]) {
//             return -1;
//         }
//     }
//     return 1;
// }


//click on submit button to run function based on user input
$("#submit-Btn").on("click", displayTitle);
function displayTitle(event) {
    event.preventDefault();
    if (userSearchEl.val().trim() !== "") {
        title = userSearchEl.val().trim();
        currentTitle(title);
    }
}

//need to update to dynamically call in the locally stored search title
function funcTitle(title){
    var queryURL= "https://imdb-api.com/en/API/SearchTitle/k_9682875a/inception";
    $.ajax({
        url:queryURL,
        method:'GET',
    }).then(function(response){
        console.log(response);
        currentTitle(response.id);
    });
};

//will need to update to dynamically change for searched values
function currentTitle(id){
    var queryURL= "https://imdb-api.com/en/API/Title/k_9682875a/"+ id +"/FullCast,Posters,Images,Ratings";
    $.ajax({
        url:queryURL,
        method:'GET',
    }).then(function(response){
        console.log(response);
        $(currentTitleEl).html(response.title);
        $(ratingEl).html(response.imDbRating);
        $(taglineEl).html(response.tagline);
        $(bioEl).html(response.plot);
        $(releaseDateEl).html(response.year);
        $(directorEl).html(response.director);
        $(actorEl).html(response.stars);
        //using image for now but check pasters for better images??
        $(posterEl).append(reponse.image);
    });
};