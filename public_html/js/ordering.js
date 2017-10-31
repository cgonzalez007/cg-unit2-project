/* 
 * November 2017 Chris Gonzalez 
 */
$(function () {
    $('#menu-accordion').accordion({
        collapsible: true,
        heightStyle: "content"
    });

    initFirebase();

    populateLunchSpecials();

//    $("#items").append(card);

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

function populateLunchSpecials() {
    var $items = $('#items');

    var query = firebase.database().ref("site/lunch-specials");

    query.once("value")
            .then(function (snapshot) {
                snapshot.forEach(function (childSnapshot) {

                    var card = '<div class="card col-md-3 col-sm-12" style="width: 20rem;">'
                            + '<img class="card-img-top" src="'+ childSnapshot.child("img-src").val() +'" alt="'+ childSnapshot.child("name").val() +'">'
                            + '<div class="card-block">'
                            + '<h4 class="card-title">'+ childSnapshot.child("name").val() +'</h4>'
                            + '<p class="card-text"'+ childSnapshot.child("description").val() +'</p>'
                            + '<a href="#" class="btn btn-primary">Go somewhere</a>'
                            + '</div>'
                            + '</div>'
                            ;



                    $items.append(card);


                });
            });

}

// could be used to display items...

var card = '<div class="card col-md-3 col-sm-12" style="width: 20rem;">'
        + '<img class="card-img-top" src="..." alt="Card image cap">'
        + '<div class="card-block">'
        + '<h4 class="card-title">Card title</h4>'
        + '<p class="card-text">Some quick example text.</p>'
        + '<a href="#" class="btn btn-primary">Go somewhere</a>'
        + '</div>'
        + '</div>'
        ;