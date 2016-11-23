//Initialize  tabletop.js after everything is loaded to the page
window.onload = function () {
    init()
};
//initialize tabletop.js
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1kyBdnj7yU-tmdRbSC-hUElUimFngSvU64ym23PMYanA/pubhtml?gid=710197849&single=true';

function init() {
    Tabletop.init({
        key: public_spreadsheet_url
        , callback: showInfo
        , simpleSheet: true
    });
}
/**
 *This function retrieves the data from the google sheet and writes the real time data back to the website
 *return void
 */
function showInfo(data, tabletop) {
    //define an array with 6 elements that contains the number from 1 -6 in string forms
    var number = ["one", "two", "three", "four", "five", "six"];
    // initialize an empty array
    var name = [];
    if (data.length > 0) {
        //Retrieve the names of tutors who are currently working in the sandbox
        for (var i = 0; i < 6; i++) {
            if (data[0][number[i]] != "") {
                name.push(data[0][number[i]].toLowerCase().replace(/\s/g, ''));
            }
        }
        // declare a variable that contains the base url to the image
        var base_url = "http://cis.bentley.edu/sandbox/wp-content/uploads/TutorImage/";
        // Retrieve the image and append to the desinated location
        for (var i = 0; i < name.length; i++) {
            //create a div with class of working item
            var figure = document.createElement("figure");
            figure.setAttribute("class", "working-item");
            //create an image from the url
            var img = new Image();
            //get the name of the tutor based on the current index
            var tutor_name = name[i];
            // construct the url of the tutor image
            img.src = base_url + tutor_name + "-150x150.jpg";
            // append the img to the figure tag
            figure.appendChild(img);
            // create a figcaption element
            var figure_caption = document.createElement("figcaption");
            // put the name of the tutor in the figcaption tag
            figure_caption.innerHTML = tutor_name;
            //put the figcaption in the figure
            figure.appendChild(figure_caption);
            // put both figure in the working-now div
            document.getElementById("working-now").appendChild(figure);
        }
    }
    else {
        var message = document.createElement("h2");
        message.setAttribute("class", "working-message");
        message.innerHTML = "Sorry, we're closed right now. Please come back later";
        document.getElementById("working-now").appendChild(message);
    }
}