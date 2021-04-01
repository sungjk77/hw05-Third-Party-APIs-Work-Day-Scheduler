// // TODO: 4. What is the current time in the format: hours:minutes:seconds
// var time = moment().format("hh:mm:ss");
// $("#4a").text(time);
// console.log(time);

// // TODO: 5. What is the current Unix timestamp?
// var update = function () {

// var unix = moment().format("X");
// $("#5a").text(unix);

// // TODO: 6. Parse the following Unix timestamp, 1318781876, and convert into any time/date format.
// var unixFormat = moment.unix(unix).format("MMM Do, YYYY, hh:mm:ss");
// $("#currentDay").text(unixFormat);
// }
var txtArray = ["","","","","","","","",""];;

var datetime = null,
    date = null,
    currentHour = null;

// var update = function () {
function update() {
    date = moment(new Date())
    datetime.html(date.format('dddd MMMM Do YYYY'));
};

$(document).ready(function(){
    datetime = $('#currentDay')
    update();
    setInterval(update, 1000);
});

function highlightHour(curH) {
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
date = moment(new Date())
currentHour=(date.format('H'));
highlightHour(currentHour);

function saveText(num) {
  var tempText = "#"+num+"-text";
  var txtArea = $(tempText).val();
  txtArray = loadText(txtArray);
  console.log("before save: "+txtArray);
   if (!txtArea) {
       txtArea="";
   }
   txtArray[num-9]=txtArea;
   console.log("after save: "+txtArray);
   localStorage.setItem("txtArray", JSON.stringify(txtArray));
   txtArray = loadText(txtArray);
}

function loadText(txtArray) {
    txtArray = JSON.parse(localStorage.getItem("txtArray"));

    if(!txtArray) {  //check to see if the variable exists
        console.log("No saved information");  //prints error message in console
        txtArray = ["","","","","","","","",""];  //resets to default
        return txtArray;
    }

    for (var i=0; i<txtArray.length; i++) {
        var tempNum = i+9;
        $("#"+tempNum+"-text").val(txtArray[i]);
    }
  console.log(txtArray);
  return txtArray;
}

txtArray = loadText(txtArray);

// if(!txtArray) {
//     txtArray = ["","","","","","","","",""];
//     console.log("no stored information");
//     loadText(txtArray);
// }