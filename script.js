var $currentDay = $("#currentDay");
var $timeBlocks = $(".time-block");
var $scheduleArea = $(".schedule");

var toDoItems = [];
//each object has a hour property and a text property

var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");
