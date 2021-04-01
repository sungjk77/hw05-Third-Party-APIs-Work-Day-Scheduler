var txtArray = ["","","","","","","","",""];
var datetime = null,
    date = null,
    currentHour = null;

function update() {
    date = moment(new Date());
    datetime.html(date.format('dddd MMMM Do YYYY @ hh:mm A'));
};

$(document).ready(function() {
    datetime = $('#currentDay');
    update();
    setInterval(update, 6000);  //keeps updating every minute if I want to display time
});

function highlightHour(curH) {  //highlights every hour according to placement
    for(var i=9; i<=17; i++) {
        if (curH == i) {
           $("#"+i+"-row").addClass("present");
        } else if (curH > i) {
           timeVar="#"+i+"-row";
           $("#"+i+"-row").addClass("past");
        } else if (curH < i) {
           timeVar="#"+i+"-row";
           $("#"+i+"-row").addClass("future");
        }
    }
}

function saveText(num) {  //function to Save the text, passing what time slot variable
    var tempText = "#"+num+"-text";
    var txtArea = $(tempText).val();
    txtArray = loadText(txtArray);
    console.log("before save: "+txtArray);  //shows data before save
    if (!txtArea) {txtArea="";}
    txtArray[num-9]=txtArea;
    console.log("after save: "+txtArray);  //shows after it is saved
    localStorage.setItem("txtArray", JSON.stringify(txtArray));
    txtArray = loadText(txtArray);
}

function loadText(txtArray) {  //function to load the text from memory
    txtArray = JSON.parse(localStorage.getItem("txtArray"));
    if(!txtArray) {  //check to see if the variable exists
        console.log("- No saved information, Default created -");  //prints error message in console
        txtArray = ["","","","","","","","",""];  //resets to default values of blank
        return txtArray;
    }
    for (var i=0; i<txtArray.length; i++) {
        $("#"+(i+9)+"-text").val(txtArray[i]);  //creates variable name,advantage to jquery
    }
    console.log(txtArray);
    return txtArray;
  }
// run everything
txtArray = loadText(txtArray);
date = moment(new Date());
currentHour=(date.format('H')); //military time with capital H, easier to do math with
highlightHour(currentHour);