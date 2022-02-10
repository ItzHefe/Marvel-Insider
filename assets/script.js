var apiKey = 'k_9682875a';

var title = "";
var userSearchEl = document.querySelector('#mySearch');
var uSearch = [];

$("#submit-btn").on("click", runSearch);
function runSearch(event) {
    event.preventDefault()
    if (userSearchEl.value.trim() !== "") {
        uSearch.push(userSearchEl.value.trim());
        localStorage.setItem("titlename",JSON.stringify(uSearch));
    }
};

$("#submit-btn").on("click", changePage);
function changePage() {
    window.location.replace('./pages.html');
}
