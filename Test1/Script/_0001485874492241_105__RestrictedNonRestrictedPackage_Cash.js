//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//USEUNIT CommonCalender
//USEUNIT ConvertReservationsToPurchase
  
function _0001485874492241_105__RestrictedNonRestrictedPackage_Cash()
{

Log.AppendFolder("_0001485874492241_105__RestrictedNonRestrictedPackage_Cash");
try
{
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
      var groupNm=defaultGroupName;
         var paymentTypeForReservation = "Cash";
         var keyWordNm ="Daily Admission";
         var packageNm ="Dated";
         var subPakNm ="Adult";
         var qtyT = 1;
         var dateD =CommonCalender.getTodaysDate();  
         addNewTicket(keyWordNm,packageNm,subPakNm,qtyT,dateD);  
         addNewTicket(keyWordNm,packageNm,"Children (Ages 3-12)",qtyT,dateD); 
         addNewTicket(keyWordNm,"Date/Time","Children (Ages 3-12)",2,dateD); 
//    WrapperFunction.selectKeyword("Daily Admission");
//    selectPackage("3 site Combi","Adult");
//    selectQuantityFromSubWindow(1);
//    selectSubPackageFromSubWindow("Adult");
//    selectDateFromSubWindow(CommonCalender.getTodaysDate()); //mm-dd-yyyy
//    selectAvailableTimeFromSubWindow("12:15 AM");
//    selectNextButtonFromSubWindow();
//    
//    selectPackage("Non Merlin Combo","Individual");
//    selectQuantityFromSubWindow(1);
//    selectSubPackageFromSubWindow("Individual");
//    selectDateFromSubWindow(CommonCalender.getTodaysDate()); //mm-dd-yyyy
//    selectNextButtonFromSubWindow();    
    selectFinalizeOrderbutton();
    ConvertReservationsToPurchase.selectPaymentTypeAddRequiredFields("Cash");
    WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
    var paymentTypeBal=WrapperFunction.getBalanceValue(PaymentType_BalanceLabel);
    WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
    Button.clickOnButton(applyButton);
    SettlementCompleteOrderButton();
    validateTicket("Don't Validate");
    Button.clickOnButton(NewOrder_Button);
    AppLoginLogout.logout(); 
}

catch(e)
{
       merlinLogError("Exception in Test script");
       //Runner.Stop();
}
}
 