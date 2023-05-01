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

//color changes: timeblock colors depending on time and depends on past, present and future.
function setUpTimeBlocks() {
    $timeBlocks.each(function () {
        var $thisBlock = $(this);
        var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

        //add style to time blocks to show where we are in the day
        if (thisBlockHr == currentHour) {
            //color for present
            $thisBlock.addClass("present").removeClass("past future");
        }
        if (thisBlockHr < currentHour) {
            //color for past
            $thisBlock.addClass("past").removeClass("present future");
        }
        if (thisBlockHr > currentHour) {
            //color for future
            $thisBlock.addClass("future").removeClass("past present");
        }
    });
}

function renderSchedule() {

    toDoItems = localStorage.getItem("todos");
    toDoItems = JSON.parse(toDoItems);

    //loop array then assign the text to the timeBlock with data-hour equal to hour. 
    //make a variable where [data-hour={hour}] then plug it in to the selector $('[data-hour={hour}')
    for (var i = 0; i < toDoItems.length; i++) {
        var itemHour = toDoItems[i].hour;
        var itemText = toDoItems[i].text;

        $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
    }

    console.log(toDoItems);
}

function saveHandler() {
    var $thisBlock = $(this).parent();

    var hourToUpdate = $(this).parent().attr("data-hour");
    var itemToAdd = (($(this).parent()).children("textarea")).val();

    //which item we need to update based on the hour of the button clicked matching
    for (var j = 0; j < toDoItems.length; j++) {
        if (toDoItems[j].hour == hourToUpdate) {
            //set its text to what was added to textarea
            toDoItems[j].text = itemToAdd;
        }
    }
    localStorage.setItem("todos", JSON.stringify(toDoItems));
    renderSchedule();
}


