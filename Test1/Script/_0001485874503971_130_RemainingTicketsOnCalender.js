//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//USEUNIT CommonCalender
//Application Login & Logout functioonality
  
function _0001485874503971_130_RemainingTicketsOnCalender()
{
Log.AppendFolder("_0001485874503971_130_RemainingTicketsOnCalender");
try{

    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    
    WrapperFunction.selectKeyword("Daily Admission");
    selectPackage("3 site Combi","Adult");
    aqUtils.Delay(5000);
    var adultQuantity=2;
    selectQuantityFromSubWindow(adultQuantity);
    selectSubPackageFromSubWindow("Adult");
    
    selectDateFromSubWindow(CommonCalender.getTodaysDate()); //mm-dd-yyyy
    selectAvailableTimeFromSubWindow("11:00 AM");
    //selectNextButtonFromSubWindow();
    
 
   // selectFinalizeOrderbutton();
   
    AppLoginLogout.logout(); 
 
}
catch(e)
{
 merlinLogError("Exception occured");
 //Runner.Stop(true);
}
}
 