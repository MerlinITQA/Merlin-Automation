//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//USEUNIT CommonCalender
//Application Login & Logout functioonality
  
function _0001485874454224_28_DailyTickets_Cheque_Check()
{
Log.AppendFolder("_0001485874454224_28_DailyTickets_Cheque_Check");
try{

    /*As per Meq :MJ 17/03/2016 - Daily ticket refers to any ticket with a calendar
    e.g. you can use Daily Admission > Dated (second package)*/

    AppLoginLogout.login();

    WrapperFunction.selectKeyword("Daily Admission");
    selectPackage("3 site Combi","Adult");
    aqUtils.Delay(5000);
    selectQuantityFromSubWindow(3);
    selectSubPackageFromSubWindow("Adult");
    selectQuantityFromSubWindow(2);
    selectSubPackageFromSubWindow("Children (Ages 3-12)");
    selectDateFromSubWindow(CommonCalender.getTodaysDate()); //mm-dd-yyyy
    selectAvailableTimeFromSubWindow("11:15 AM");
    selectNextButtonFromSubWindow();
	aqUtils.Delay(2000);
    WrapperFunction.finilizeOrder()
    
    // Facing Value to select Check from Drop down
    SelectPaymentType.selectPaymentType("Check");
    
    
    WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
    var paymentTypeBal=WrapperFunction.getBalanceValue(PaymentType_BalanceLabel);
    WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
    Button.clickOnButton(applyButton);
    WrapperFunction.settlementCompleteOrder();
    WrapperFunction.validateTicket("Validate All");
    Button.clickOnButton(NewOrder_Button);
    AppLoginLogout.logout(); 
    
}

catch(e)
{
 merlinLogError("Exception occured");
 //Runner.Stop();
}
}
 