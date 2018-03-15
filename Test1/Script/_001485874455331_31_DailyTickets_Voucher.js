//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//USEUNIT CommonCalender
//USEUNIT ConvertReservationsToPurchase
//Application Login & Logout functioonality
  
function _001485874455331_31_DailyTickets_Voucher()
{
Log.AppendFolder("_001485874455331_31_DailyTickets_Voucher");
try{
    InitializationEnviornment.initiliaze();
     AppLoginLogout.login();
//    WrapperFunction.selectKeyword("Daily Admission");
//    selectPackage("3 site Combi","Adult");
//    aqUtils.Delay(5000);
//    selectQuantityFromSubWindow(3);
//    selectSubPackageFromSubWindow("Adult");
//    selectQuantityFromSubWindow(2);
//    selectSubPackageFromSubWindow("Children (Ages 3-12)");
//    selectDateFromSubWindow(CommonCalender.getTodaysDate()); //mm-dd-yyyy
//    selectAvailableTimeFromSubWindow("1:15AM");
//    selectNextButtonFromSubWindow();
    var groupNm=defaultGroupName;
    var paymentTypeForReservation = "Voucher";
    var keyWordNm ="Daily Admission";
    var packageNm ="Dated";
    var subPakNm ="Adult";
    var qtyT = 1;
    var dateD =CommonCalender.getTodaysDate();  
    addNewTicket(keyWordNm,packageNm,subPakNm,qtyT,dateD); 
    WrapperFunction.finilizeOrder()
    //SelectPaymentType.selectPaymentType("Voucher");
    selectPaymentTypeAddRequiredFields("Voucher");
    WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
    var paymentTypeBal=WrapperFunction.getTextValue(PaymentType_BalanceLabel);
    paymentTypeBal= aqString.Replace(paymentTypeBal,"Balance: $","");
    WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
    
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
 