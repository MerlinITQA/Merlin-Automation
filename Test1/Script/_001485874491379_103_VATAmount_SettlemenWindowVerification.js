//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//USEUNIT CommonCalender

  
function _001485874491379_103_VATAmount_SettlemenWindowVerification()
{

Log.AppendFolder("_001485874491379_103_VATAmount_SettlemenWindowVerification");
try
{    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    WrapperFunction.selectKeyword("Daily Admission");
    selectPackage("3 site Combi","Adult");
    selectQuantityFromSubWindow(1);
    selectSubPackageFromSubWindow("Adult");
    selectQuantityFromSubWindow(1);
    selectSubPackageFromSubWindow("Children (Ages 3-12)");
    selectDateFromSubWindow(CommonCalender.getTodaysDate()); //mm-dd-yyyy
    selectAvailableTimeFromSubWindow("11:15 AM");
    selectNextButtonFromSubWindow();
    selectFinalizeOrderbutton();
    // getting Error before finalize window
     verifyCartTotal();
    AppLoginLogout.logout();

}

catch(e)
{
       merlinLogError("Exception in Test script");
       
       //Runner.Stop();
}
}
 