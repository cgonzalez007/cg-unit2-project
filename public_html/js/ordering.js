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

    $('#lunch-specials').click(function(e){
        $('#items').empty();
        populateLunchSpecials();
    });
    
    $('#special-combo-platter').click(function(e){
        $('#items').empty();
        populateSpecialComboPlatters();
    });

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
    
    $('.category-info').hide();
    
    $('#lunch-specials-info').show();
    
    var query = firebase.database().ref("site/lunch-specials").orderByChild("number");

    query.once("value")
            .then(function (snapshot) {
                snapshot.forEach(function (childSnapshot) {

                    var card = '<div class="card col-md-3 col-sm-12 menu-card text-center" style="width: 20rem;">'
                            + '<br><img class="card-img-top img-responsive img-thumbnail menu-img modal-content" src="'+ childSnapshot.child("img-src").val() +'" alt="'+ childSnapshot.child("name").val() +'">'
                            + '<div class="card-block">'
                            + '<h4 class="card-title">'
                            +'<br>$' + childSnapshot.child("price").val().toFixed(2) + '<br><br>' + childSnapshot.child("name").val() + ' ' + '(' + 'L.'+ childSnapshot.child("number").val() + ')' 
                            + '</h4>'
                            + '<p class="card-text"'+ childSnapshot.child("description").val() +'</p>'
                            + '<a href="#" class="btn btn-default add-btn">Add</a>'
                            + '</div>'
                            + '</div>'
                            ;



                    $('#items').append(card);


                });
            });

}

function populateSpecialComboPlatters(){
    $('.category-info').hide();
    
    $('#special-combo-platter-info').show();
    
    var query = firebase.database().ref("site/lunch-specials").orderByChild("name");

    query.once("value")
            .then(function (snapshot) {
                snapshot.forEach(function (childSnapshot) {

                    var card = '<div class="card col-md-3 col-sm-12 menu-card text-center" style="width: 20rem;">'
                            + '<br><img class="card-img-top img-responsive img-thumbnail menu-img modal-content" src="'+ childSnapshot.child("img-src").val() +'" alt="'+ childSnapshot.child("name").val() +'">'
                            + '<div class="card-block">'
                            + '<h4 class="card-title"><br>' + childSnapshot.child("name").val() + ' ' + '(' + 'L.'+ childSnapshot.child("number").val() + ')' 
                            + '<br><br>$' + childSnapshot.child("price").val().toFixed(2) + '</h4>'
                            + '<p class="card-text"'+ childSnapshot.child("description").val() +'</p>'
                            + '<a href="#" class="btn btn-default add-btn">Add</a>'
                            + '</div>'
                            + '</div>'
                            ;



                    $('#items').append(card);


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