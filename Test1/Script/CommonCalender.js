//USEUNIT POSObjectMapping
//USEUNIT ApplicationOpen

/**
 * @author mnpatil
 */
 
Date.prototype.monthNames = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
  ];
  Date.prototype.getMonthName = function() {
      return this.monthNames[this.getMonth()];
  };
  Date.prototype.getShortMonthName = function () {
      return this.getMonthName().substr(0, 3);
  };

/** @function
@name CommonCalender.GetTodaysDate
@description Get Todays Date.
*/
function getTodaysDate()
{
  let CurrentDate = aqDateTime.Today();
  return CurrentDate;
}

/** @function
@name CommonCalender.GetTomorrowsDate
@description Get Tomorrows Date.
*/
function getTomorrowsDate()
{
  // Obtain the current date
  let CurrentDate = getTodaysDate();

  // Convert the date/time value to a string and post it to the log
  Today = aqConvert.DateTimeToStr(CurrentDate);
  Log.Message("Today is " + Today);

  // Calculate the tomorrow’s date, convert the returned date to a string and post this string to the log
  Tomorrow = aqDateTime.AddDays(CurrentDate, 1);
  ConvertedTomorrowDate = aqConvert.DateTimeToStr(Tomorrow);
  Log.Message("Tomorrow will be " + ConvertedTomorrowDate);
  return Tomorrow;
}

/** @function
@name CommonCalender.SetNextDate
@description Set Tomorrows date.
@param {Object} dateChooser is a date chooser.
*/
function setNextDate(dateChooser)
{
     dateChooser.FlexObject.selectedDate = getTomorrowsDate();
}

/** @function
@name CommonCalender.SetFutureDate
@description Set Future date.
@param {Object} dateChooser is a date chooser
@param {Object} newDate is a date.
*/
function SetFutureDate(dateChooser,newDate)
{
    dateChooser.FlexObject.selectedDate = newDate;
    
}

/** @function
@name CommonCalender.getMonthName
@description Set Future date.
@param {Object} newSetDate is a date chooser
*/
function getMonthName(newSetDate){
 var newDate = new Date(newSetDate);
 return monthName=newDate.getShortMonthName();
}  