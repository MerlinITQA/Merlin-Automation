//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//USEUNIT SelectQuantityFromHeader
function C16045_Date_time_is_displayed_on_Settlement()
{

try
 {
        Log.AppendFolder("C16045_Date_time_is_displayed_on_Settlement");
        var time = "9:00 AM";   
        InitializationEnviornment.initiliaze();
        AppLoginLogout.login();
        WrapperFunction.selectKeyword("Daily Admission");
		SelectQuantityFromHeader.selectQuantity(2);
        selectPackage("Date/Time","Adult");
        aqUtils.Delay(5000);
        selectDateFromSubWindow(CommonCalender.getTodaysDate());
        selectAvailableTimeFromSubWindow(time);
        selectNextButtonFromSubWindow();
        selectFinalizeOrderbutton();
        aqUtils.Delay(1000);
        toDate =aqConvert.DateTimeToFormatStr( CommonCalender.getTodaysDate(), "%#m/%#d/%Y");
        var flag = false;
        var cCount = settlement_scroller.ChildCount;
         for(let i=0;i<cCount;i++){
            var cap = settlement_scroller.Child(i).Caption;
            if(cap.startsWith(toDate)){
             flag = true;
             break;
            }
        }
        if(flag){
        Log.Message("The date/time displayed in the order details corresponds to the date/time selected");
        }else{
          merlinLogError("Incorrect Date and time is displayed in settlement page");
        }
  }
  catch(e)
  {
         merlinLogError("Exception in Test script");
  } finally { 
	    Log.PopLogFolder();
    }      
  AppLoginLogout.logout();
}
 