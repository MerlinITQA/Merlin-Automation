//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT CommonCalender
//USEUNIT SelectPaymentType

  
function _0001485874502030_126_Groups_MultiTickets()
{
Log.AppendFolder("_0001485874502030_126_Groups_MultiTickets");
    try
    {
    
        InitializationEnviornment.initiliaze();    
        AppLoginLogout.login();
        WrapperFunction.selectKeyword("Groups");
        // Meq Suggested  to Use "Group Admission"
        selectPackage("Group Admission","Adult");
        selectQuantityFromSubWindow(2);
        selectSubPackageFromSubWindow("Adult");
        selectQuantityFromSubWindow(2);
        selectSubPackageFromSubWindow("Children (Ages 3-12)");
                                 
        
        selectDateFromSubWindow(CommonCalender.getTodaysDate()); 
        selectAvailableTimeFromSubWindow("11:00 AM");
        selectNextButtonFromSubWindow();
        selectFinalizeOrderbutton();
        
        SelectPaymentType.selectPaymentType("Cash");
        WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
        var paymentTypeBal=WrapperFunction.getBalanceValue(PaymentType_BalanceLabel);
        WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
        Button.clickOnButton(applyButton);
        WrapperFunction.settlementCompleteOrder();
        validateTicket("Validate All");
        Button.clickOnButton(NewOrder_Button);
//        AppLoginLogout.logout();



    }

catch(e)
{
       merlinLogError("Exception in Test script");
       //Runner.Stop();
}
}
 