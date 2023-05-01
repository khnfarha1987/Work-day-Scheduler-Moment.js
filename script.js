var $currentDay = $("#currentDay");
var $timeBlocks = $(".time-block");
var $scheduleArea = $(".schedule");

var toDoItems = [];
//each object has a hour property and a text property:

var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");

//Create array of objects:
function initializeSchedule() {
    //  console.log(toDoItems);

    //for each time block
    $timeBlocks.each(function () {
        var $thisBlock = $(this);
        var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

        var todoObj = {
            //set related todo hour to same as data-hour
            hour: thisBlockHr,
            //get text ready to accept string input
            text: "",
        }
        //add this todo object to todoitems array
        toDoItems.push(todoObj);
    });

    //once we have looped timeblocks then save this array of objects to local storage by stringifying it first
    localStorage.setItem("todos", JSON.stringify(toDoItems));
    //console.log(toDoItems);
}



