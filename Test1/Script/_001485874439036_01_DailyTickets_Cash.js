//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//USEUNIT CommonCalender
//Application Login & Logout functioonality
  
function _001485874439036_PurchaseTicket_Cash()
{
Log.AppendFolder("_001485874439036_PurchaseTicket_Cash");
try{

    AppLoginLogout.login();
    WrapperFunction.selectKeyword("Daily Admission");
    // We are giving package name incorrect intentionally
    selectPackage("3 site Combi","Adult");
    aqUtils.Delay(5000);
    selectQuantityFromSubWindow(3);
    selectSubPackageFromSubWindow("Adult");
    selectQuantityFromSubWindow(2);
    selectSubPackageFromSubWindow("Children (Ages 3-12)");
    selectDateFromSubWindow(CommonCalender.getTodaysDate()); //mm-dd-yyyy
    selectAvailableTimeFromSubWindow("12:15 PM");
    selectNextButtonFromSubWindow();
    WrapperFunction.finilizeOrder()
    SelectPaymentType.selectPaymentType("Cash");
    
    WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
    var paymentTypeBal=WrapperFunction.getTextValue(PaymentType_BalanceLabel);
    paymentTypeBal= aqString.Replace(paymentTypeBal,"Balance: $","");
    WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
    
    Button.clickOnButton(applyButton);
    WrapperFunction.settlementCompleteOrder();
    WrapperFunction.validateTicket("Validate All");
   
    AppLoginLogout.logout(); 
    
}

catch(e)
{
 merlinLogError("Exception occured");
 //Runner.Stop();
}
}
 