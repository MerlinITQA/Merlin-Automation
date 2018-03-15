//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//USEUNIT CommonCalender

  
function _001485874494281_109_AvailableTime_DisplayDateValidation()
{

Log.AppendFolder("_001485874494281_109_AvailableTime_DisplayDateValidation");
try
{
     InitializationEnviornment.initiliaze();
     AppLoginLogout.login();
   
     WrapperFunction.selectKeyword("Daily Admission");
     selectPackage("3 site Combi","Adult");
     selectDateFromSubWindow(CommonCalender.getTodaysDate()); //mm-dd-yyyy
     dt = CommonCalender.getTodaysDate(); // date only
     var expectedDate=aqConvert.DateTimeToFormatStr(dt, "%#m/%#d/%Y");
     Log.Message("expectedDate"+expectedDate);
     var actualDate= WrapperFunction.getTextValue(AvailableTime_DayMMDDYYYY);
     Log.Message("actualDate"+actualDate);
     if(equal(expectedDate,actualDate))
     {
        Log.Message("Date selected is correct, matches");
        Button.clickOnButton(buttonClosebutton);     
     }
     else
     {
        merlinLogError("Date selected is not correct, do not matches")
     }
    AppLoginLogout.logout();
  }
  catch(e)
  {
         merlinLogError("Exception in Test script");
         //Runner.Stop();
  }
}
 