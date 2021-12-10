var btnPageAdd = document.querySelector("#btnPageAdd");
var btnPageSearch = document.querySelector("#btnPageSearch");

var pageAdd = document.querySelector("#add-page");
var pageSearch = document.querySelector("#search-page");

btnPageAdd.addEventListener('click', showAddPage);
btnPageSearch.addEventListener('click', showSearchPage);

var formTitle = document.querySelector("#form-title");
var formCategory = document.querySelector("#form-category");
var formAnnotations = document.querySelector("#form-annotations");
var formButton = document.querySelector("#form-submit");

formButton.addEventListener('click', saveFav);
var urlCurrent = "";
var urlIconCurrent = "";

window.onload = function () {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let title = tabs[0].title;
        urlCurrent = tabs[0].url;
        urlIconCurrent = tabs[0].favIconUrl;
        formTitle.setAttribute("value", title);
    });
    getFavs();
}

function showAddPage() {
    pageAdd.style.display = "block";
    pageSearch.style.display = "none";
}
function showSearchPage() {
    getFavs();
    pageAdd.style.display = "none";
    pageSearch.style.display = "block";
}
function saveFav() {
    var dict = {};
     dict = {
        "title": formTitle.value,
        "category": formCategory.value,
        "annotations": formAnnotations.value,
        "url": urlCurrent,
        "icon": urlIconCurrent
    }
    var newJson = JSON.stringify(dict);

    chrome.storage.sync.get("STORAGE_KEY", function (result) {
        if (result['STORAGE_KEY'] != undefined) {
            newJson = result['STORAGE_KEY']+"#;#"+newJson;
        }
        chrome.storage.sync.set({"STORAGE_KEY": newJson}, function() {
            alert("Salvo com sucesso!");
            getFavs();
            showSearchPage();
        })
    });

}

function getFavs() {
    var divCategoryContainer = document.querySelector("#category-container");
    chrome.storage.sync.get("STORAGE_KEY", function (result) {
        divCategoryContainer.innerHTML = result["STORAGE_KEY"];
        console.log(result);
    });
}