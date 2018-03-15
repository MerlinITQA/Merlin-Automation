//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//USEUNIT CommonCalender

function _0001485874497586_117_DateTime_settlementScreenVerfication()
{

Log.AppendFolder("_0001485874497586_117_DateTime_settlementScreenVerfication");
try
{       InitializationEnviornment.initiliaze();
        AppLoginLogout.login();
        WrapperFunction.selectKeyword("Daily Admission");
        selectPackage("3 site Combi","Children (Ages 3-12)");
        
        selectQuantityFromSubWindow(1);
        selectSubPackageFromSubWindow("Children (Ages 3-12)");
        selectQuantityFromSubWindow(1);
        selectSubPackageFromSubWindow("Adult");
        
        selectDateFromSubWindow(CommonCalender.getTodaysDate()); //mm-dd-yyyy
        selectAvailableTimeFromSubWindow("12:30 AM");
        selectNextButtonFromSubWindow();
        selectFinalizeOrderbutton();
        
        var orderDateTimeValue=WrapperFunction.getTextValue(OrderDetailDateTime_Row1);
        Log.Message("orderDateTimeValue"+orderDateTimeValue);

        AppLoginLogout.logout();
}

catch(e)
{
       merlinLogError("Exception in Test script");
       //Runner.Stop();
}
}
 