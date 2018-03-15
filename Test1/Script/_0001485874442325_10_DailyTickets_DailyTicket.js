//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//USEUNIT CommonCalender
//USEUNIT SelectQuantityFromHeader
//Application Login & Logout functioonality
  
function _0001485874442325_10_DailyTickets_DailyTicket()
{
Log.AppendFolder("_0001485874442325_10_DailyTickets_DailyTicket");
try{
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    //As per mail from Sinead - please use saver admission package 
    // 7/11/2017
    WrapperFunction.selectKeyword("Daily Admission");
	SelectQuantityFromHeader.selectQuantity(2);
    selectPackage("Date/Time","Children (Ages 3-12)");
    aqUtils.Delay(5000);
    selectQuantityFromSubWindow(1);
    selectSubPackageFromSubWindow("Adult");
    selectDateFromSubWindow(CommonCalender.getTodaysDate());
    selectNextButtonFromSubWindow();
    aqUtils.Delay(3000);
    selectFinalizeOrderbutton();
    
    SelectPaymentType.selectPaymentType("Cash");
    WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
    var paymentTypeBal=WrapperFunction.getBalanceValue(PaymentType_BalanceLabel);
    WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
    Button.clickOnButton(applyButton);
    WrapperFunction.settlementCompleteOrder();
    WrapperFunction.validateTicket("Don't Validate");
    Button.clickOnButton(NewOrder_Button);
    AppLoginLogout.logout(); 
   
   }

catch(e)
{
 merlinLogError("Exception occured");
 //Runner.Stop();
}
}
 