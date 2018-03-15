//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//USEUNIT CommonCalender
//USEUNIT PlaceReservationOrder
//Application Login & Logout functioonality
  
function _001485874455847_32_DailyTickets_CashCardCombination()
{
Log.AppendFolder("_001485874455847_32_DailyTickets_CashCardCombination");
try{
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
   // WrapperFunction.selectKeyword("Daily Tickets");
   // selectPackage("Ultimate Flexible Ticket","Adult");
     var groupNm=defaultGroupName;
    var paymentTypeForReservation = "Cash";
    var keyWordNm ="Daily Admission";
    var packageNm ="Dated";
    var subPakNm ="Adult";
    var qtyT = 1;
    var dateD =CommonCalender.getTodaysDate();  
     addNewTicket(keyWordNm,packageNm,subPakNm,qtyT,dateD);  
    aqUtils.Delay(5000);
//    selectQuantityFromSubWindow(1);
//    selectSubPackageFromSubWindow("Adult");
//    selectDateFromSubWindow(CommonCalender.getTodaysDate()); 
//    selectNextButtonFromSubWindow();
     WrapperFunction.finilizeOrder()
    aqUtils.Delay(3000);
    selectPaymentTypeAddRequiredFields("Check"); 
    var paymentTypeBalBefore=WrapperFunction.getBalanceValue(PaymentType_BalanceLabel);
    Log.Message("paymentTypeBalBefore :"+paymentTypeBalBefore);
    var paymentTypeBalAfterDecimalPlace=getFloorValue(paymentTypeBalBefore);
    Log.Message("paymentTypeBalAfterDecimalPlace :"+paymentTypeBalAfterDecimalPlace);
    roundingValue = paymentTypeBalBefore - paymentTypeBalAfterDecimalPlace;
    WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBalAfterDecimalPlace);
    Button.clickOnButton(applyButton);
    Button.clickOnButton(CashButton);     
    roundingValue = aqConvert.StrToFloat(roundingValue);
    roundingValue =roundingValue +.001;
    WrapperFunction.setTextValue(PayamountTextBox,roundingValue); 
    Button.clickOnButton(applyButton);
    
    WrapperFunction.settlementCompleteOrder();
    WrapperFunction.validateTicket("Don't Validate");
    AppLoginLogout.logout(); 
   
   }

catch(e)
{
 merlinLogError("Exception occured");
 //Runner.Stop();
}
}
 