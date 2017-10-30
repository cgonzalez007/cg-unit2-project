$(function () {
    initFirebase();
});

function initFirebase() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDrbbjK0tYP8IvpjoM3pCOHMvtFV_Gnm3s",
        authDomain: "cg-unit2-project.firebaseapp.com",
        databaseURL: "https://cg-unit2-project.firebaseio.com",
        projectId: "cg-unit2-project",
        storageBucket: "cg-unit2-project.appspot.com",
        messagingSenderId: "302302304461"
    };
    firebase.initializeApp(config);
}

function initMap() {
    var uluru = {lat: 43.0968, lng: -88.3494};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map,
        title: "King's Wok"
    });
}
