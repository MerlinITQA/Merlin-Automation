//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//USEUNIT CommonCalender
  
function _0001485874443088_12_Groups_Cash()
{
Log.AppendFolder("_0001485874443088_12_Groups_Cash");
    try
    {
    
         InitializationEnviornment.initiliaze();    
         AppLoginLogout.login();
        WrapperFunction.selectKeyword("Groups");
        // Meq Suggested  to Use "Group Admission"
        selectPackage("Group Admission","Adult");
        selectQuantityFromSubWindow(2);
        selectSubPackageFromSubWindow("Adult");
        selectDateFromSubWindow(CommonCalender.getTodaysDate()); 
        selectAvailableTimeFromSubWindow("11:00 AM");
        selectNextButtonFromSubWindow();
        selectFinalizeOrderbutton();
        
        SelectPaymentType.selectPaymentType("Cash");
        WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
        var paymentTypeBal=WrapperFunction.getBalanceValue(PaymentType_BalanceLabel);
        paymentTypeBal= aqConvert.StrToFloat(paymentTypeBal);
        WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
        Button.clickOnButton(applyButton);
        aqUtils.Delay(1000);
        WrapperFunction.settlementCompleteOrder();
        validateTicket("Validate All");
        if(buttonClosebutton.Exists && buttonClosebutton.VisibleOnScreen){
          Button.clickOnButton(buttonClosebutton);
          }
      
        
        Button.clickOnButton(NewOrder_Button);
        AppLoginLogout.logout();

    }

catch(e)
{
       merlinLogError("Exception in Test script");
       //Runner.Stop();
}
}
 